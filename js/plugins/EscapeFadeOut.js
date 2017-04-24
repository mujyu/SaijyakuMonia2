//=============================================================================
// 
// EscapeFadeOut.js
// 
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// 
// 2016/01/20 ver1.0 プラグイン公開
//
//============================================================================

/*:
 * @plugindesc サイドビューで逃走時の前向き退却のモーションをフェードアウトに変更します
 * @author kotonoha（http://ktnh5108.pw/）
 *
 * @help サイドビューで逃走時の前向き退却のモーションをフェードアウトに変更します
 *
 * @param EffectDuration
 * @desc フェードアウトの速度（数値が大きいほどフェードアウトが遅くなります）
 * @default 12
 * 
 */

(function() {

    var parameters = PluginManager.parameters('EscapeFadeOut');
	var EffectDuration = Number(parameters['EffectDuration']);

	Sprite_Actor.prototype.retreat = function() {
    	this._effectDuration = EffectDuration;
    	this.blendMode = Graphics.BLEND_ADD;
    	this.setBlendColor([255, 128, 128, 128]);
    	this.opacity *= this._effectDuration / (this._effectDuration + 1);
	};

})();