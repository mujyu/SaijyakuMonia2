//=============================================================================
//
// EscapeLostGold.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// 
// ver1.1
// ・落とす金額がゼロの場合にメッセージを表示させない様に変更
// ・戦闘メッセージとの間にスペースを挿入
// ・落とす所持金のMAXを追加
// 
// ver1.0
// ・プラグイン公開
// 
//=============================================================================
/*:
 * @plugindesc 逃走すると所持金を落とすプラグイン
 * @author kotonoha*（http://ktnh5108.pw/）
 * 
 * @help 逃走成功時に、任意の確率で所持金を落とすプラグインです。
 * 落とす金額は、デフォルトでは戦闘フィールドに居るモンスターの所持金トータルの25％で計算しています。
 * 倒したモンスターは計算に含まれません。
 *
 * ※逃走率に関与する部分を改変しておりますので、他の戦闘系プラグインと競合する恐れがあります。ご注意ください。
 * ※改変、再配布、商用利用は自由です。
 * 
 * @param lostRate
 * @desc 戦闘フィールドに居るモンスターの所持金から計算した落とす金額の割合（1=100％）
 * @default 0.25
 * 
 * @param lostMessage
 * @desc 所持金を落とした時の戦闘メッセージ
 * @default を落っことした！
 * 
 * @param lostMaxGold
 * @desc 落とす最大金額
 * @default 65535
 *
 */

(function() {

	var parameters = PluginManager.parameters('EscapeLostGold');
	var lostRate = Number(parameters['lostRate']);
	var lostMessage = String(parameters['lostMessage']);
	var lostMaxGold = Number(parameters['lostMaxGold']);

	Game_Troop.prototype.LostgoldTotal = function() {
	    return this.aliveMembers().reduce(function(r, enemy) {
	        return r + enemy.gold();
	    }, 0) * this.goldRate();
	};

	BattleManager.processEscape = function() {
	    $gameParty.removeBattleStates();
	    $gameParty.performEscape();
	    SoundManager.playEscape();
	    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
	    if (success) {
	        this.displayEscapeSuccessMessage();
	        var lsgold = Math.floor($gameTroop.LostgoldTotal() * lostRate);
			if (lsgold !== 0) {
				if (lsgold <= lostMaxGold) {
				$gameMessage.add(lsgold + TextManager.currencyUnit + ' ' + lostMessage);
		        $gameParty.loseGold(lsgold);
		        }else{
				$gameMessage.add(lostMaxGold + TextManager.currencyUnit + ' ' + lostMessage);
		        $gameParty.loseGold(lostMaxGold);
		        }
	        }
	        this._escaped = true;
	        this.processAbort();
	    } else {
	        this.displayEscapeFailureMessage();
	        this._escapeRatio += 0.1;
	        $gameParty.clearActions();
	        this.startTurn();
	    }
	    return success;
	};

})();