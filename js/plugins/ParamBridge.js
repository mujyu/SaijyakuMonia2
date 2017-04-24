//=============================================================================
// ParamBridge.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 追加ステータス最大二つのゲージを表示。
 * @author まっつＵＰ
 *
 * @param exparam0
 * @desc 追加ステータス
 * @default 満腹度
 * 
 * @param exparam1
 * @desc 追加ステータス
 * @default 渇き
 * 
 * @param startact
 * @desc この変数の次のIDからアクターを数えます。
 * @default 20
 * 
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * このプラグインがONの時はメニュー画面のクラスが表示されなくなります。
 * 
 * exparam0とexparam1には追加するステータスの名前を入れます。
 * 
 * startactには数値を入れてください。
 * この変数の次のIDからアクターにつき二つずつ変数を参照します。
 * （この参照する変数には0~100の範囲の数値を入れてください。
 *   exparam0かexparam1またはその両方に相当する変数が
 * 　この範囲内の数値でない場合はそのゲージを描画せず左につめます。）
 * startactのIDの変数の値自体は参照しません。
 * startactのIDの変数にはそのIDの値が自動で入ります。
 * 
 * <どこの変数IDに特定のアクターの追加パラメータが入っているかの計算方法>
 * 特定のアクターのexparam0
 * 変数ID = （特定のアクターのexparam1の変数ID） - 1
 * 
 * 特定のアクターのexparam1
 * 変数ID = （startactの値） + （アクターID） * 2
 * 
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {
    
    var parameters = PluginManager.parameters('ParamBridge');
    var PBexparam0 = String(parameters['exparam0'] || '満腹度');
    var PBexparam1 = String(parameters['exparam1'] || '渇き');
    var PBstartact = Number(parameters['startact'] || 20);
    
    Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    //this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 1, width2);
    //this.drawActorTp(actor, x2, y + lineHeight * 2, width2);
    $gameVariables.setValue(PBstartact,PBstartact); //パラメータで設定した変数に自身のIDを格納する。
    this.drawActorExparam(actor, x2, y + lineHeight * 2, width2);    
};

Window_Base.prototype.drawActorExparam = function(actor, x, y, width) {
    var ac = actor._actorId; //対象のアクターのID
    var idcalc2 = PBstartact + ac * 2;
    var idcalc1 = idcalc2 - 1;
    var param0 = $gameVariables.value(idcalc1); //アクターの追加パラメータ用変数の値を取得
    var param1 = $gameVariables.value(idcalc2);
    var PBname = PBexparam0; //表示するパラメータ名
    var width = 96;
    var j = 0;
    if(param0 < 0 || param0 > 100) j += 1;
    if(param1 < 0 || param1 > 100) j += 2;
    
    for(var i = 0; i <= 1; i++){
        
    if(j >= 2){
        i += j - 2;　//jが２以上の場合はfor文を一回通過する。
        j = 0;     
    }else{
        if(j === 1){ //二番目のパラメータに値を交換する。
            i = 2;
            param0 = param1;
            PBname = PBexparam1;
        }
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, param0 / 100, color1, color2); //rateを出すため100で割っている。
    this.changeTextColor(this.systemColor());
    this.drawText(PBname, x, y, 44); //パラメータ名
    this.changeTextColor(this.tpColor(actor));
    this.drawText(param0, x + width - 64, y, 64, 'right'); //パラメータの値
    j = 1;
    x += width + 6; //繰り返すときにゲージの位置をずらすため。
    }
    }
};
    
})();
