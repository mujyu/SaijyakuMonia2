//=============================================================================
// AKUNOU_DrawSkillCost0.js
// Version: 1.02
// ----------------------------------------------------------------------------
// 河原 つつみ
// 連絡先 ：『アクマの脳髄』http://www.akunou.com/
//=============================================================================

/*:
 * @plugindesc スキルウィンドウで、消費MPと消費TPが0の場合にも 0 と表示します。
 * @author Tsutumi Kawahara
 * @help
 * プラグインコマンド:
 *   必要なし
 * プラグイン ON にするだけで適用されるスクリプトです。
 */

(function() {

    //-------------------------------------------------------------------------
    // Window_SkillList
    //-------------------------------------------------------------------------

    var akunou1_drawSkillCost = Window_SkillList.prototype.drawSkillCost;

    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        akunou1_drawSkillCost.call(this, skill, x, y, width);
        if (this._actor.skillTpCost(skill) == 0 && this._actor.skillMpCost(skill) == 0) {
            this.resetTextColor();
            this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
        }
    };

})();
