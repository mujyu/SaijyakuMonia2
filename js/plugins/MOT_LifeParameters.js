//=============================================================================
// MOT_LifeParameters.js
//=============================================================================
// MOTplugin - 生活パラメータ追加
// 作者: 翠 (http://midori.wp.xdomain.jp/)
// Version: 1.0
// 最終更新日: 2016/02/16
//=============================================================================
//■更新履歴
/*
  2016/02/16 - 公開
  2016/02/16 - 疲労度、眠気のパラメータが0のときに文字色が赤くなってたのを100%時に変更
               移動時等でアクターが死亡していても各パラメータが増減していたバグを修正
  

*/
//=============================================================================
/*■利用規約
 *-クレジットの表記
 *  クレジットの表記は基本的に不要です。
 *  表記する場合はホームページを参照してください。
 *  営利目的での使用する場合は表記してください。
 *
 *  表記例
 *  スクリプト素材 翠 (http://midori.wp.xdomain.jp/)
 *  または
 *  スクリプト素材 HM Project (http://midori.wp.xdomain.jp/)
 *
 *-スクリプトの改変/配布
 *  スクリプトの改変はご自由に行ってください。
 *  改変を行って発生したバグ等には対処しません。
 *
 *-スクリプトの再配布
 *  そのままの再配布は禁止とさせていただきます。
 *  改造した物を配布する場合、オリジナルのクレジットを残してもらえれば
 *  配布することを可能とします。
 *  ※改造の有無に関わらず素材を有料で配布する場合は禁止とさせていただきます。
 *  ※ゲームに含まれる場合のみ再配布可能とします。
 *
 *-使用可能なゲームのジャンル
 *  エログロなんでも使用可能です。
 *
*/
//=============================================================================
/*:
 * @plugindesc 空腹、水分、疲労、睡眠、体調パラメータを追加します
 * @author 翠
 * @help
 * ■利用規約
 * 本プラグインの中に記述してある物、または配布サイト
 * の利用規約をご確認ください。
 *
 * ■プラグイン概要
 *   アクター毎に空腹、水分、疲労、睡眠、体調パラメータを追加します
 *   装備による各パラメータの変動はまだ作成していません
 *   ステートによる増減、アイテムによる増減に対応しています。
 *
 * 　現状イベントコマンドのスクリプトを使用して、コモンイベとか自力で組める人向けです。
 *
 *　追加パラメータのゲージの描画に対応していますが
 *　デフォルトの解像度で5本のゲージを全て描画する場合
 *　領域が足りないので、このプラグインの一番下に
 *　ゲージを描画するサンプルを記述してありますので参考にして
 *　各自必要な数だけゲージを描画させてください
 *　
 *　各パラメータの増減量を0にするとそのパラメータは未使用になりますが
 *　パラメータ自体は残っているので、ゲージ部分を描画しても意味はありません。
 *
 *　パラメータが～以下のとき～のステートを与えたいとかはコモンイベントで行ってください
 *　$gameParty.members()[1].hng とかやればメンバーの満腹度が参照できます
 *　参照できるパラメータは下記に記述してある｢ダメージ計算式での引用方法｣のパラメータと同一なので
 *　参考にしてください。
 *
 *　それか直接アップデートの箇所に記述してください。
 *
 * ■使用方法
 * ====アクターのメモ欄に記述====
 *※xの値は数値で指定してください、小数点は使用不可です
 *　<initMaxHng:x> //空腹度の最大値の初期値を設定します
 *　<initMaxWat:x> //水分量の最大値の初期値を設定します
 *　<initMaxFig:x> //疲労度の最大値の初期値を設定します
 *　<initMaxSlp:x> //眠気の最大値の初期値を設定します
 *　<initMaxPsl:x> //体調の最大値の初期値を設定します
 *
 *　<initHng:x> //空腹度の現在値の初期値を設定します
 *　<initWat:x> //水分量の現在値の初期値を設定します
 *　<initFig:x> //疲労度の現在値の初期値を設定します
 *　<initSlp:x> //眠気の現在値の初期値を設定します
 *　<initPsl:x> //体調の現在値の初期値を設定します
 *
 *　<LimitHng:x> //空腹度の最大値の上限を設定します
 *　<LimitWat:x> //水分量の最大値の上限を設定します
 *　<LimitFig:x> //疲労度の最大値の上限を設定します
 *　<LimitSlp:x> //眠気の最大値の上限を設定します
 *　<LimitPsl:x> //体調の最大値の上限を設定します
 *
 * ※プラグインで設定した歩行、ダッシュ、時間による増減の値をアクター毎に補正をかけます
 * 　歩行+ダッシュ、時間の2回判定が行われます
 * 　小数点は使用可能です
 *　<CorrectionHng:x> //空腹度の増減に指定した値分補正をかけます
 *　<CorrectiontWat:x> //水分量の増減に指定した値分補正をかけます
 *　<CorrectionFig:x> //疲労度の増減に指定した値分補正をかけます
 *　<CorrectionSlp:x> //眠気の増減に指定した値分補正をかけます
 *　<CorrectionPsl:x> //体調の増減に指定した値分補正をかけます
 *
 * ====ステートのメモ欄に記述====
 *※歩数、時間経過、戦闘時の増減に影響を受けます
 *　有効度は Invalid > Double > Half の順に判定されますので
 *　無効、半減のステートがアクターに付与されていた場合
 *　無効だけが有効になり、他の状態は無視されます
 *
 *※stateで判別を行います、YEPのパッシブステートは別のメソッドで管理しているため
 *　パッシブで設定しても有効になりません、対応はしませんので各自で改造してください
 *
 *　<HalfHng> //空腹度の現在値の増減量を半減します
 *　<HalfWat> //水分量の現在値の増減量を半減します
 *　<HalfFig> //疲労度の現在値の増減量を半減します
 *　<HalfSlp> //眠気の現在値の増減量を半減します
 *　<HalfPsl> //体調の現在値の増減量を半減します
 *
 *　<DoubleHng> //空腹度の現在値の増減量を倍増します
 *　<DoubleWat> //水分量の現在値の増減量を倍増します
 *　<DoubleFig> //疲労度の現在値の増減量を倍増します
 *　<DoubleSlp> //眠気の現在値の増減量を倍増します
 *　<DoublePsl> //体調の現在値の増減量を倍増します
 *
 *　<InvalidHng> //空腹度の現在値の増減量を無効にします
 *　<InvalidWat> //水分量の現在値の増減量を無効にします
 *　<InvalidFig> //疲労度の現在値の増減量を無効にします
 *　<InvalidSlp> //眠気の現在値の増減量を無効にします
 *　<InvalidPsl> //体調の現在値の増減量を無効にします
 *
 * ====スキル、アイテムのメモ欄に記述====
 *　※条件が複数あるので空腹度などによる使用制限は行っていません。
 *　　上限なら使用不可にしたい場合、各自改造を行ってください
 *
 * 　※スキルに記述して戦闘時使用する場合、連続回数分判定が行われます
 *
 *　<ChangeLifeHng:x>  //空腹度の現在値を増減させます
 *　<ChangeLifeWat:x>  //水分量の現在値を増減させます
 *　<ChangeLifeFig:x>  //疲労度の現在値を増減させます
 *　<ChangeLifeSlp:x>  //眠気の現在値を増減させます
 *　<ChangeLifePsl:x>  //体調の現在値を増減させます
 *　
 *　<ChangeLifeMaxHng:x>  //空腹度の最大値を増減させます
 *　<ChangeLifeMaxWat:x>  //水分量の最大値を増減させます
 *　<ChangeLifeMaxFig:x>  //疲労度の最大値を増減させます
 *　<ChangeLifeMaxSlp:x>  //眠気の最大値を増減させます
 *　<ChangeLifeMaxPsl:x>  //体調の最大値を増減させます
 *
 * ====イベントコマンドのスクリプトに記述====
 *　$gameParty.members()などで取得したアクターに対して使用します
 *　
 *　setLifeparams(pid,val) //指定したパラメータの現在値に指定した値を代入します
 *　changeLifeparams(pid,val) //指定したパラメータの現在値に指定した値分増減させます
 *
 *　setLifeMaxparams(pid,val) //指定したパラメータの最大値に指定した値を代入します
 *　changeLifeMaxparams(pid,val) //指定したパラメータの最大値に指定した値分増減させます
 *
 *　◆pid
 *　　0:満腹度(最大満腹度)
 *　　1:水分量(最大水分量)
 *　　2:疲労度(最大疲労度)
 *　　3:眠気(最大眠気度)
 *　　4:体調(最大体調)
 *　◆val
 *　　数値を指定してください、小数点も可能です
 *
 * ====ダメージ計算式での引用方法====
 * アイテム、スキルのダメージ計算式で各パラメータを使用することができます
 * 敵キャラにも一応パラメータ自体は持っているので指定してもエラーは出ませんが
 * 各パラメータの値は初期値のままです
 *  //現在値
 * 	hng
 * 	wat
 * 	fig
 * 	slp
 * 	psl
 *
 *  //最大値
 * 	mhng
 *  mwat
 *  mfig
 *  mslp
 *  mpsl
 *
 *=============================================================================
 *=============================================================================
 * @param ===各パラメータの初期現在値===
 * @desc 個別に設定しない場合、この値が適応されます
 * @default
 *
 * @param 空腹度の現在値
 * @desc
 * @default 0
 *
 * @param 水分量の現在値
 * @desc
 * @default 0
 *
 * @param 疲労度の現在値
 * @desc
 * @default 0
 *
 * @param 眠気の現在値
 * @desc
 * @default 0
 *
 * @param 体調の現在値
 * @desc
 * @default 100
 *
 * @param ===各パラメータの初期最大値===
 * @desc 個別に設定しない場合、この値が適応されます
 * @default
 *
 * @param 空腹度の最大値
 * @desc
 * @default 100
 *
 * @param 水分量の最大値
 * @desc
 * @default 100
 *
 * @param 疲労度の最大値
 * @desc
 * @default 100
 *
 * @param 眠気の最大値
 * @desc
 * @default 100
 *
 * @param 体調の最大値
 * @desc
 * @default 100
 *
 * @param ===各パラメータの上限値===
 * @desc 個別に設定しない場合、この値が適応されます
 * @default
 *
 * @param 空腹度の上限値
 * @desc
 * @default 999
 *
 * @param 水分量の上限値
 * @desc
 * @default 999
 *
 * @param 疲労度の上限値
 * @desc
 * @default 999
 *
 * @param 眠気の上限値
 * @desc
 * @default 999
 *
 * @param 体調の上限値
 * @desc
 * @default 999
 *
 * @param ===1歩毎の増減量===
 * @desc 移動時に増減する値、小数点も可能です
 * @default
 *
 * @param 空腹度の増減量:歩行
 * @desc 未使用時は0を指定
 * @default -1.0
 *
 * @param 水分量の増減量:歩行
 * @desc 未使用時は0を指定
 * @default -1.0
 *
 * @param 疲労度の増減量:歩行
 * @desc 未使用時は0を指定
 * @default 1.0
 *
 * @param 眠気の増減量:歩行
 * @desc 未使用時は0を指定
 * @default 1.0
 *
 * @param 体調の増減量:歩行
 * @desc 未使用時は0を指定
 * @default -1.0
 *
 * @param ===ダッシュ時の1歩毎の増加量===
 * @desc ダッシュ時に、1歩毎の増減量に加算される値、小数点も可能です
 * @default
 *
 * @param 空腹度の増減量:ダッシュ
 * @desc 未使用時は0を指定
 * @default -0.4
 *
 * @param 水分量の増減量:ダッシュ
 * @desc 未使用時は0を指定
 * @default -0.3
 *
 * @param 疲労度の増減量:ダッシュ
 * @desc 未使用時は0を指定
 * @default 0.5
 *
 * @param 眠気の増減量:ダッシュ
 * @desc 未使用時は0を指定
 * @default 0.2
 *
 * @param 体調の増減量:ダッシュ
 * @desc 未使用時は0を指定
 * @default -0.2
 *
 * @param ===時間経過による増減量===
 * @desc 設定したフレーム数毎に増減される値、小数点も可能です
 * @default
 *
 * @param 空腹度の更新フレーム数
 * @desc 60 == 1秒、未使用なら0指定
 * @default 240
 *
 * @param 水分量の更新フレーム数
 * @desc 60 == 1秒、未使用なら0指定
 * @default 240
 *
 * @param 疲労度の更新フレーム数
 * @desc 60 == 1秒、未使用なら0指定
 * @default 360
 *
 * @param 眠気の更新フレーム数
 * @desc 60 == 1秒、未使用なら0指定
 * @default 360
 *
 * @param 体調の更新フレーム数
 * @desc 60 == 1秒、未使用なら0指定
 * @default 480
 *
 * @param 空腹度の増減量:時間
 * @desc
 * @default -0.2
 *
 * @param 水分量の増減量:時間
 * @desc
 * @default -0.2
 *
 * @param 疲労度の増減量:時間
 * @desc
 * @default 0.05
 *
 * @param 眠気の増減量:時間
 * @desc
 * @default 0.05
 *
 * @param 体調の増減量:時間
 * @desc
 * @default 0.1
 *
 *
 * @param ===描画設定設定===
 * @desc 描画する際の個別設定
 * @default
 *
 * @param ===満腹度===
 * @desc
 * @default
 *
 * @param 満腹度:項目名
 * @desc 項目に表示される文字列
 * @default 満腹度
 *
 * @param 満腹度:項目名のフォントサイズ
 * @desc 項目のフォントサイズ
 * @default 22
 *
 * @param 満腹度:フォントカラー
 * @desc 項目名のフォントカラー
 * @default #FFD700
 *
 * @param 満腹度:値の表示形式
 * @desc 0:999/999 1: 100% ■0だと従来通り,1だと％表記
 * @default 1
 *
 * @param 満腹度:値のフォントサイズ
 * @desc 現在値、最大値のフォントサイズ
 * @default 18
 *
 * @param 満腹度:現在値の通常フォントカラー
 * @desc 平常時のフォントカラー
 * @default #FFFFFF
 *
 * @param 満腹度:現在値の危険フォントカラー
 * @desc 少なくなったときのフォントカラー
 * @default #E3FC45
 *
 * @param 満腹度:現在値の重度フォントカラー
 * @desc もう駄目なときのフォントカラー
 * @default #FF326F
 *
 * @param 満腹度:ゲージカラー1
 * @desc ゲージカラーの1
 * @default #FF9533
 *
 * @param 満腹度:ゲージカラー2
 * @desc ゲージカラーの2
 * @default #FFD600
 *
 * @param ===水分量===
 * @desc
 * @default
 *
 * @param 水分量:項目名
 * @desc 項目に表示される文字列
 * @default 水分量
 *
 * @param 水分量:項目名のフォントサイズ
 * @desc 項目のフォントサイズ
 * @default 22
 *
 * @param 水分量:フォントカラー
 * @desc 項目名のフォントカラー
 * @default #00BAFF
 *
 * @param 水分量:値の表示形式
 * @desc 0:999/999 1: 100% ■0だと従来通り,1だと％表記
 * @default 1
 *
 * @param 水分量:値のフォントサイズ
 * @desc 現在値、最大値のフォントサイズ
 * @default 18
 *
 * @param 水分量:現在値の通常フォントカラー
 * @desc 平常時のフォントカラー
 * @default #FFFFFF
 *
 * @param 水分量:現在値の危険フォントカラー
 * @desc 少なくなったときのフォントカラー
 * @default #E3FC45
 *
 * @param 水分量:現在値の重度フォントカラー
 * @desc もう駄目なときのフォントカラー
 * @default #FF326F
 *
 * @param 水分量:ゲージカラー1
 * @desc ゲージカラーの1
 * @default #338BFF
 *
 * @param 水分量:ゲージカラー2
 * @desc ゲージカラーの2
 * @default #00ABFF
 *
 * @param ===疲労度===
 * @desc
 * @default
 *
 * @param 疲労度:項目名
 * @desc 項目に表示される文字列
 * @default 疲労度
 *
 * @param 疲労度:項目名のフォントサイズ
 * @desc 項目のフォントサイズ
 * @default 22
 *
 * @param 疲労度:フォントカラー
 * @desc 項目名のフォントカラー
 * @default #8FFF00
 *
 * @param 疲労度:値の表示形式
 * @desc 0:999/999 1: 100% ■0だと従来通り,1だと％表記
 * @default 1
 *
 * @param 疲労度:値のフォントサイズ
 * @desc 現在値、最大値のフォントサイズ
 * @default 18
 *
 * @param 疲労度:現在値の通常フォントカラー
 * @desc 平常時のフォントカラー
 * @default #FFFFFF
 *
 * @param 疲労度:現在値の危険フォントカラー
 * @desc 少なくなったときのフォントカラー
 * @default #E3FC45
 *
 * @param 疲労度:現在値の重度フォントカラー
 * @desc もう駄目なときのフォントカラー
 * @default #FF326F
 *
 * @param 疲労度:ゲージカラー1
 * @desc ゲージカラーの1
 * @default #33FF6C
 *
 * @param 疲労度:ゲージカラー2
 * @desc ゲージカラーの2
 * @default #00FF94
 *
 * @param ===眠気===
 * @desc
 * @default
 *
 * @param 眠気:項目名
 * @desc 項目に表示される文字列
 * @default 眠気
 *
 * @param 眠気:項目名のフォントサイズ
 * @desc 項目のフォントサイズ
 * @default 22
 *
 * @param 眠気:フォントカラー
 * @desc 項目名のフォントカラー
 * @default #C400FF
 *
 * @param 眠気:値の表示形式
 * @desc 0:999/999 1: 100% ■0だと従来通り,1だと％表記
 * @default 1
 *
 * @param 眠気:値のフォントサイズ
 * @desc 現在値、最大値のフォントサイズ
 * @default 18
 *
 * @param 眠気:現在値の通常フォントカラー
 * @desc 平常時のフォントカラー
 * @default #FFFFFF
 *
 * @param 眠気:現在値の危険フォントカラー
 * @desc 少なくなったときのフォントカラー
 * @default #E3FC45
 *
 * @param 眠気:現在値の重度フォントカラー
 * @desc もう駄目なときのフォントカラー
 * @default #FF326F
 *
 * @param 眠気:ゲージカラー1
 * @desc ゲージカラーの1
 * @default #E054DF
 *
 * @param 眠気:ゲージカラー2
 * @desc ゲージカラーの2
 * @default #DB00FF
 *
 * @param ===体調===
 * @desc
 * @default
 *
 * @param 体調:項目名
 * @desc 項目に表示される文字列
 * @default 体調
 *
 * @param 体調:項目名のフォントサイズ
 * @desc 項目のフォントサイズ
 * @default 22
 *
 * @param 体調:フォントカラー
 * @desc 項目名のフォントカラー
 * @default #FF00F5
 *
 * @param 体調:値の表示形式
 * @desc 0:999/999 1: 100% ■0だと従来通り,1だと％表記
 * @default 1
 *
 * @param 体調:値のフォントサイズ
 * @desc 現在値、最大値のフォントサイズ
 * @default 18
 *
 * @param 体調:現在値の通常フォントカラー
 * @desc 平常時のフォントカラー
 * @default #FFFFFF
 *
 * @param 体調:現在値の危険フォントカラー
 * @desc 少なくなったときのフォントカラー
 * @default #E3FC45
 *
 * @param 体調:現在値の重度フォントカラー
 * @desc もう駄目なときのフォントカラー
 * @default #FF326F
 *
 * @param 体調:ゲージカラー1
 * @desc ゲージカラーの1
 * @default #FF33CC
 *
 * @param 体調:ゲージカラー2
 * @desc ゲージカラーの2
 * @default #FF00B0
 *
 *
 *
 *
 */
 //=============================================================================
var MOT = MOT || {};
MOT.LIFE = MOT.LIFE || {};
 //=============================================================================
MOT.Parameters = PluginManager.parameters('MOT_LifeParameters');
MOT.Param = MOT.Param || {};
//=============================================================================
MOT.Param.InitLifeHng = Number(MOT.Parameters['空腹度の現在値']);
MOT.Param.InitLifeWat = Number(MOT.Parameters['水分量の現在値']);
MOT.Param.InitLifeFig = Number(MOT.Parameters['疲労度の現在値']);
MOT.Param.InitLifeSlp = Number(MOT.Parameters['眠気の現在値']);
MOT.Param.InitLifePsl = Number(MOT.Parameters['体調の現在値']);

MOT.Param.InitLifeMaxHng = Number(MOT.Parameters['空腹度の最大値']);
MOT.Param.InitLifeMaxWat = Number(MOT.Parameters['水分量の最大値']);
MOT.Param.InitLifeMaxFig = Number(MOT.Parameters['疲労度の最大値']);
MOT.Param.InitLifeMaxSlp = Number(MOT.Parameters['眠気の最大値']);
MOT.Param.InitLifeMaxPsl = Number(MOT.Parameters['体調の最大値']);

MOT.Param.LifeHngLimit = Number(MOT.Parameters['空腹度の上限値']);
MOT.Param.LifeWatLimit = Number(MOT.Parameters['水分量の上限値']);
MOT.Param.LifeFigLimit = Number(MOT.Parameters['疲労度の上限値']);
MOT.Param.LifeSlpLimit = Number(MOT.Parameters['眠気の上限値']);
MOT.Param.LifePslLimit = Number(MOT.Parameters['体調の上限値']);

MOT.Param.LifeHngMove = parseFloat(MOT.Parameters['空腹度の増減量:歩行']);
MOT.Param.LifeWatMove = parseFloat(MOT.Parameters['水分量の増減量:歩行']);
MOT.Param.LifeFigMove = parseFloat(MOT.Parameters['疲労度の増減量:歩行']);
MOT.Param.LifeSlpMove = parseFloat(MOT.Parameters['眠気の増減量:歩行']);
MOT.Param.LifePslMove = parseFloat(MOT.Parameters['体調の増減量:歩行']);

MOT.Param.LifeHngDash = parseFloat(MOT.Parameters['空腹度の増減量:ダッシュ']);
MOT.Param.LifeWatDash = parseFloat(MOT.Parameters['水分量の増減量:ダッシュ']);
MOT.Param.LifeFigDash = parseFloat(MOT.Parameters['疲労度の増減量:ダッシュ']);
MOT.Param.LifeSlpDash = parseFloat(MOT.Parameters['眠気の増減量:ダッシュ']);
MOT.Param.LifePslDash = parseFloat(MOT.Parameters['体調の増減量:ダッシュ']);

MOT.Param.LifeHngFrame = Number(MOT.Parameters['空腹度の更新フレーム数']);
MOT.Param.LifeWatFrame = Number(MOT.Parameters['水分量の更新フレーム数']);
MOT.Param.LifeFigFrame = Number(MOT.Parameters['疲労度の更新フレーム数']);
MOT.Param.LifeSlpFrame = Number(MOT.Parameters['眠気の更新フレーム数']);
MOT.Param.LifePslFrame = Number(MOT.Parameters['体調の更新フレーム数']);

MOT.Param.LifeHngUpdate = parseFloat(MOT.Parameters['空腹度の増減量:時間']);
MOT.Param.LifeWatUpdate = parseFloat(MOT.Parameters['水分量の増減量:時間']);
MOT.Param.LifeFigUpdate = parseFloat(MOT.Parameters['疲労度の増減量:時間']);
MOT.Param.LifeSlpUpdate = parseFloat(MOT.Parameters['眠気の増減量:時間']);
MOT.Param.LifePslUpdate = parseFloat(MOT.Parameters['体調の増減量:時間']);


MOT.Param.LifeHngStrName = String(MOT.Parameters['満腹度:項目名']);
MOT.Param.LifeHngStrSize = Number(MOT.Parameters['満腹度:項目名のフォントサイズ']);
MOT.Param.LifeHngStrColor = String(MOT.Parameters['満腹度:フォントカラー']);
MOT.Param.LifeHngViewPt = Number(MOT.Parameters['満腹度:値の表示形式']);
MOT.Param.LifeHngViewSize = Number(MOT.Parameters['満腹度:値のフォントサイズ']);
MOT.Param.LifeHngColor1 = String(MOT.Parameters['満腹度:現在値の通常フォントカラー']);
MOT.Param.LifeHngColor2 = String(MOT.Parameters['満腹度:現在値の危険フォントカラー']);
MOT.Param.LifeHngColor3 = String(MOT.Parameters['満腹度:現在値の重度フォントカラー']);
MOT.Param.LifeHngGColor1 = String(MOT.Parameters['満腹度:ゲージカラー1']);
MOT.Param.LifeHngGColor2 = String(MOT.Parameters['満腹度:ゲージカラー2']);

MOT.Param.LifeWatStrName = String(MOT.Parameters['水分量:項目名']);
MOT.Param.LifeWatStrSize = Number(MOT.Parameters['水分量:項目名のフォントサイズ']);
MOT.Param.LifeWatStrColor = String(MOT.Parameters['水分量:フォントカラー']);
MOT.Param.LifeWatViewPt = Number(MOT.Parameters['水分量:値の表示形式']);
MOT.Param.LifeWatViewSize = Number(MOT.Parameters['水分量:値のフォントサイズ']);
MOT.Param.LifeWatColor1 = String(MOT.Parameters['水分量:現在値の通常フォントカラー']);
MOT.Param.LifeWatColor2 = String(MOT.Parameters['水分量:現在値の危険フォントカラー']);
MOT.Param.LifeWatColor3 = String(MOT.Parameters['水分量:現在値の重度フォントカラー']);
MOT.Param.LifeWatGColor1 = String(MOT.Parameters['水分量:ゲージカラー1']);
MOT.Param.LifeWatGColor2 = String(MOT.Parameters['水分量:ゲージカラー2']);

MOT.Param.LifeFigStrName = String(MOT.Parameters['疲労度:項目名']);
MOT.Param.LifeFigStrSize = Number(MOT.Parameters['疲労度:項目名のフォントサイズ']);
MOT.Param.LifeFigStrColor = String(MOT.Parameters['疲労度:フォントカラー']);
MOT.Param.LifeFigViewPt = Number(MOT.Parameters['疲労度:値の表示形式']);
MOT.Param.LifeFigViewSize = Number(MOT.Parameters['疲労度:値のフォントサイズ']);
MOT.Param.LifeFigColor1 = String(MOT.Parameters['疲労度:現在値の通常フォントカラー']);
MOT.Param.LifeFigColor2 = String(MOT.Parameters['疲労度:現在値の危険フォントカラー']);
MOT.Param.LifeFigColor3 = String(MOT.Parameters['疲労度:現在値の重度フォントカラー']);
MOT.Param.LifeFigGColor1 = String(MOT.Parameters['疲労度:ゲージカラー1']);
MOT.Param.LifeFigGColor2 = String(MOT.Parameters['疲労度:ゲージカラー2']);

MOT.Param.LifeSlpStrName = String(MOT.Parameters['眠気:項目名']);
MOT.Param.LifeSlpStrSize = Number(MOT.Parameters['眠気:項目名のフォントサイズ']);
MOT.Param.LifeSlpStrColor = String(MOT.Parameters['眠気:フォントカラー']);
MOT.Param.LifeSlpViewPt = Number(MOT.Parameters['眠気:値の表示形式']);
MOT.Param.LifeSlpViewSize = Number(MOT.Parameters['眠気:値のフォントサイズ']);
MOT.Param.LifeSlpColor1 = String(MOT.Parameters['眠気:現在値の通常フォントカラー']);
MOT.Param.LifeSlpColor2 = String(MOT.Parameters['眠気:現在値の危険フォントカラー']);
MOT.Param.LifeSlpColor3 = String(MOT.Parameters['眠気:現在値の重度フォントカラー']);
MOT.Param.LifeSlpGColor1 = String(MOT.Parameters['眠気:ゲージカラー1']);
MOT.Param.LifeSlpGColor2 = String(MOT.Parameters['眠気:ゲージカラー2']);

MOT.Param.LifePslStrName = String(MOT.Parameters['体調:項目名']);
MOT.Param.LifePslStrSize = Number(MOT.Parameters['体調:項目名のフォントサイズ']);
MOT.Param.LifePslStrColor = String(MOT.Parameters['体調:フォントカラー']);
MOT.Param.LifePslViewPt = Number(MOT.Parameters['体調:値の表示形式']);
MOT.Param.LifePslViewSize = Number(MOT.Parameters['体調:値のフォントサイズ']);
MOT.Param.LifePslColor1 = String(MOT.Parameters['体調:現在値の通常フォントカラー']);
MOT.Param.LifePslColor2 = String(MOT.Parameters['体調:現在値の危険フォントカラー']);
MOT.Param.LifePslColor3 = String(MOT.Parameters['体調:現在値の重度フォントカラー']);
MOT.Param.LifePslGColor1 = String(MOT.Parameters['体調:ゲージカラー1']);
MOT.Param.LifePslGColor2 = String(MOT.Parameters['体調:ゲージカラー2']);

//=============================================================================
// Game_BattlerBase
//=============================================================================
//============================================================
//■追加メソッド定義
//============================================================
Object.defineProperties(Game_BattlerBase.prototype, {
    //現在値
	hng:  { get: function() { return this._hng; } , configurable: true },
	wat:  { get: function() { return this._wat; } , configurable: true },
	fig:  { get: function() { return this._fig; } , configurable: true },
	slp:  { get: function() { return this._slp; } , configurable: true },
	psl:  { get: function() { return this._psl; } , configurable: true },

    //最大値
	mhng: { get: function() { return this._mhng; }, configurable: true },
    mwat: { get: function() { return this._mwat; }, configurable: true },
    mfig: { get: function() { return this._mfig; }, configurable: true },
    mslp: { get: function() { return this._mslp; }, configurable: true },
    mpsl: { get: function() { return this._mpsl; }, configurable: true },
});

//============================================================
//■追加パラメータの初期値設定
//============================================================
MOT.LIFE.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    this._hng = MOT.Param.InitLifeHng;
    this._wat = MOT.Param.InitLifeWat;
    this._fig = MOT.Param.InitLifeFig;
    this._slp = MOT.Param.InitLifeSlp;
    this._psl = MOT.Param.InitLifePsl;
    this._mhng = MOT.Param.InitLifeMaxHng;
    this._mwat = MOT.Param.InitLifeMaxWat;
    this._mfig = MOT.Param.InitLifeMaxFig;
    this._mslp = MOT.Param.InitLifeMaxSlp;
    this._mpsl = MOT.Param.InitLifeMaxPsl;
    this._lifeParams = [this.hng,this.wat,this.fig,this.slp,this.psl];
    this._lifeMaxParams = [this.mhng,this.mwat,this.mfig,this.mslp,this.mpsl];
    MOT.LIFE.Game_BattlerBase_initMembers.call(this);
};
//============================================================
//■追加パラメータの略式取得用　現在値
//============================================================
Game_BattlerBase.prototype.getLifeParams = function(pid) {
    return this._lifeParams[pid];
};
//============================================================
//■追加パラメータの略式取得用　最大値
//============================================================
Game_BattlerBase.prototype.getLifeParams = function(pid) {
    return this._lifeMaxParams[pid];
};
//============================================================
//■追加パラメータの略式取得用　再設定
//============================================================
Game_BattlerBase.prototype.reSetLifeParams = function() {
    this._lifeParams = [this.hng,this.wat,this.fig,this.slp,this.psl];
    this._lifeMaxParams = [this.mhng,this.mwat,this.mfig,this.mslp,this.mpsl];
};
//============================================================
//■追加パラメータの割合取得
//============================================================
//空腹割合
Game_BattlerBase.prototype.hngRate = function() {
    return this.hng / this.mhng;
};
//水分割合
Game_BattlerBase.prototype.watRate = function() {
    return this.wat / this.mwat;
};
//疲労割合
Game_BattlerBase.prototype.figRate = function() {
    return this.fig / this.mfig;
};
//睡眠割合
Game_BattlerBase.prototype.slpRate = function() {
    return this.slp / this.mslp;
};
//体調割合
Game_BattlerBase.prototype.pslRate = function() {
    return this.psl  / this.mpsl ;
};
//=============================================================================
// Game_Actor
//=============================================================================
MOT.LIFE.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	MOT.LIFE.Game_Actor_setup.call(this,actorId)
    var actor = $dataActors[actorId];
	this.initsetLifeMaxParams(actor);
    this.initsetLifeParams(actor);
    this.reSetLifeParams();
};

//============================================================
//■数値変換
//============================================================
Game_Actor.prototype.convertNumber = function(method) {
    return Number(method);
};
//============================================================
//■各種最大値設定
//============================================================
Game_Actor.prototype.initsetLifeMaxParams = function(actor) {
    var actormeta = actor.meta;
    if (actormeta.initMaxHng) {this._mhng = this.convertNumber(actormeta.initMaxHng)}
    if (actormeta.initMaxWat) {this._mwat = this.convertNumber(actormeta.initMaxWat)}
    if (actormeta.initMaxFig) {this._mfig = this.convertNumber(actormeta.initMaxFig)}
    if (actormeta.initMaxSlp) {this._mslp = this.convertNumber(actormeta.initMaxSlp)}
    if (actormeta.initMaxPsl) {this._mpsl = this.convertNumber(actormeta.initMaxPsl)}
    this.isLifeMaxUpperLimit();
    this.isLifeMaxLowerLimit();
};
//============================================================
//■各種現在値設定
//============================================================
Game_Actor.prototype.initsetLifeParams = function(actor) {
    var actormeta = actor.meta;
    if (actormeta.initHng) {this._hng = this.convertNumber(actormeta.initHng)}
    if (actormeta.initWat) {this._wat = this.convertNumber(actormeta.initWat)}
    if (actormeta.initFig) {this._fig = this.convertNumber(actormeta.initFig)}
    if (actormeta.initSlp) {this._slp = this.convertNumber(actormeta.initSlp)}
    if (actormeta.initPsl) {this._psl = this.convertNumber(actormeta.initPsl)}
    this.isLifeUpperLimit();
    this.isLifeLowerLimit();
};
//============================================================
//■最大値上限チェック
//============================================================
Game_Actor.prototype.isLifeMaxUpperLimit = function() {
    var actor = $dataActors[this._actorId];
    var actormeta = actor.meta;
    var max;
    max = (actormeta.LimitHng)? this.convertNumber(actormeta.LimitHng) : MOT.Param.LifeHngLimit;
    if (this.mhng > max) this._mhng = max;
    max = (actormeta.LimitWat)? this.convertNumber(actormeta.LimitWat) : MOT.Param.LifeWatLimit;
    if (this.mwat > max) this._mwat = max;
    max = (actormeta.LimitFig)? this.convertNumber(actormeta.LimitFig) : MOT.Param.LifeFigLimit;
    if (this.mfig > max) this._mfig = max;
    max = (actormeta.LimitSlp)? this.convertNumber(actormeta.LimitSlp) : MOT.Param.LifeSlpLimit;
    if (this.mslp > max) this._mslp = max;
    max = (actormeta.LimitPsl)? this.convertNumber(actormeta.LimitPsl) : MOT.Param.LifePslLimit;
    if (this.mpsl > max) this._mpsl = max;
};
//============================================================
//■現在値上限チェック
//============================================================
Game_Actor.prototype.isLifeUpperLimit = function() {
    if (this.hng > this.mhng) this._hng = this.mhng;
    if (this.wat > this.mwat) this._wat = this.mwat;
    if (this.fig > this.mfig) this._fig = this.mfig;
    if (this.slp > this.mslp) this._slp = this.mslp;
    if (this.psl > this.mpsl) this._psl = this.mpsl;
};
//============================================================
//■最大値下限チェック
//============================================================
Game_Actor.prototype.isLifeMaxLowerLimit = function() {
    if (this.mhng < 0) this._mhng = 0;
    if (this.mwat < 0) this._mwat = 0;
    if (this.mfig < 0) this._mfig = 0;
    if (this.mslp < 0) this._mslp = 0;
    if (this.mpsl < 0) this._mpsl = 0;
};
//============================================================
//■現在値下限チェック
//============================================================
Game_Actor.prototype.isLifeLowerLimit = function() {
    if (this.hng < 0) this._hng = 0;
    if (this.wat  < 0) this._wat = 0;
    if (this.fig  < 0) this._fig = 0;
    if (this.slp  < 0) this._slp = 0;
    if (this.psl  < 0) this._psl = 0;
};
//============================================================
//■現在値パラメータ代入
//============================================================
Game_Actor.prototype.setLifeparams = function(pid,val) {
    switch (pid) {
      case 0:
        this._hng = val;
        break;
      case 1:
        this._wat = val;
        break;
      case 2:
        this._fig = val;
        break;
      case 3:
        this._slp = val;
        break;
      case 4:
        this._psl = val;
        break;
    }
    this.isLifeUpperLimit();
    this.isLifeLowerLimit();
};
//============================================================
//■現在値パラメータ変動
//============================================================
Game_Actor.prototype.changeLifeparams = function(pid,val) {
    switch (pid) {
      case 0:
        this._hng += val;
        break;
      case 1:
        this._wat += val;
        break;
      case 2:
        this._fig += val;
        break;
      case 3:
        this._slp += val;
        break;
      case 4:
        this._psl += val;
        break;
    }
    this.isLifeUpperLimit();
    this.isLifeLowerLimit();
};
//============================================================
//■最大値パラメータ代入
//============================================================
Game_Actor.prototype.setLifeMaxparams = function(pid,val) {
    switch (pid) {
      case 0:
        this._mhng += val;
        break;
      case 1:
        this._mwat += val;
        break;
      case 2:
        this._mfig += val;
        break;
      case 3:
        this._mslp += val;
        break;
      case 4:
        this._mpsl += val;
        break;
    }
    this.isLifeMaxUpperLimit();
    this.isLifeMaxLowerLimit();
};
//============================================================
//■最大値パラメータ変動
//============================================================
Game_Actor.prototype.changeLifeMaxparams = function(pid,val) {
    switch (pid) {
      case 0:
        this._mhng += val;
        break;
      case 1:
        this._mwat += val;
        break;
      case 2:
        this._mfig += val;
        break;
      case 3:
        this._mslp += val;
        break;
      case 4:
        this._mpsl += val;
        break;
    }
    this.isLifeMaxUpperLimit();
    this.isLifeMaxLowerLimit();
};


//=============================================================================
// Game_Party
//=============================================================================

//============================================================
//■歩行時のパラメータ増減
//============================================================
MOT.LIFE.Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
Game_Party.prototype.onPlayerWalk = function() {
    MOT.LIFE.Game_Party_onPlayerWalk.call(this);
    this.members().forEach(function(actor) {
    if (actor.isAlive()) {
        var mactor = $dataActors[actor._actorId];
        var hng = 0;
        var wat = 0;
        var fig = 0;
        var slp = 0;
        var psl = 0;

        var hng_rate = 1;
        var wat_rate = 1;
        var fig_rate = 1;
        var slp_rate = 1;
        var psl_rate = 1;
        hng += MOT.Param.LifeHngMove;
        wat += MOT.Param.LifeWatMove;
        fig += MOT.Param.LifeFigMove;
        slp += MOT.Param.LifeSlpMove;
        psl += MOT.Param.LifePslMove;
        if ($gamePlayer.isDashing()) {
            hng += MOT.Param.LifeHngDash;
            wat += MOT.Param.LifeWatDash;
            fig += MOT.Param.LifeFigDash;
            slp += MOT.Param.LifeSlpDash;
            psl += MOT.Param.LifePslDash;
        }
        if (mactor.meta.CorrectionHng) {hng += parseFloat(mactor.meta.CorrectionHng)}
        if (mactor.meta.CorrectiontWat) {wat += parseFloat(mactor.meta.CorrectiontWat)}
        if (mactor.meta.CorrectionFig) {fig += parseFloat(mactor.meta.CorrectionFig)}
        if (mactor.meta.CorrectionSlp) {slp += parseFloat(mactor.meta.CorrectionSlp)}
        if (mactor.meta.CorrectionPsl) {psl += parseFloat(mactor.meta.CorrectionPsl)}
        for (var i = 0; i < actor._states.length; i++){
            var state = $dataStates[actor._states[i]].meta;
            if (state.HalfHng){ hng_rate = 0.5}
            if (state.DoubleHng){ hng_rate = 2}
            if (state.InvalidHng){ hng_rate = 0}
            if (state.HalfWat){ wat_rate = 0.5}
            if (state.DoubleWat){ wat_rate = 2}
            if (state.InvalidHng){ wat_rate = 0}
            if (state.HalfFig){ fig_rate = 0.5}
            if (state.DoubleFig){ fig_rate = 2}
            if (state.InvalidFig){ fig_rate = 0}
            if (state.HalfSlp){ slp_rate = 0.5}
            if (state.DoubleSlp){ slp_rate = 2}
            if (state.InvalidSlp){ slp_rate = 0}
            if (state.HalfPsl){ psl_rate = 0.5}
            if (state.DoublePsl){ psl_rate = 2}
            if (state.InvalidPsl){ psl_rate = 0}
        }
        actor.changeLifeparams(0,hng * hng_rate);
        actor.changeLifeparams(1,wat * wat_rate);
        actor.changeLifeparams(2,fig * fig_rate);
        actor.changeLifeparams(3,slp * slp_rate);
        actor.changeLifeparams(4,psl * psl_rate);
    }
    });
};
//=============================================================================
// Game_Map
//=============================================================================
//============================================================
//■フレーム更新
//============================================================
MOT.LIFE.Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    MOT.LIFE.Game_Map_update.call(this,sceneActive)
    this.updateHng();
    this.updateWat();
    this.updateFig();
    this.updateSlp();
    this.updatePsl();
};
//============================================================
//■フレーム更新【空腹】
//============================================================
Game_Map.prototype.updateHng = function() {
    if (MOT.Param.LifeHngFrame === 0) return false
    if (Math.floor(Graphics.frameCount) % MOT.Param.LifeHngFrame + 1 === MOT.Param.LifeHngFrame){
        $gameParty.members().forEach(function(actor) {
        if (actor.isAlive()) {
            var mactor = $dataActors[actor._actorId];
            var hng = MOT.Param.LifeHngUpdate;
            var hng_rate = 1;
            for (var i = 0; i < actor._states.length; i++){
                var state = $dataStates[actor._states[i]].meta;
                if (state.HalfHng){ hng_rate = 0.5}
                if (state.DoubleHng){ hng_rate = 2}
                if (state.InvalidHng){ hng_rate = 0}
            }
            if (mactor.meta.CorrectionHng) {hng += parseFloat(mactor.meta.CorrectionHng)}
            actor.changeLifeparams(0,hng * hng_rate);
        }
        });
    }
};
//============================================================
//■フレーム更新【水分】
//============================================================
Game_Map.prototype.updateWat = function() {
    if (MOT.Param.LifeWatFrame === 0) return false
    if (Math.floor(Graphics.frameCount) % MOT.Param.LifeWatFrame + 1 === MOT.Param.LifeWatFrame){
        $gameParty.members().forEach(function(actor) {
        if (actor.isAlive()) {
            var mactor = $dataActors[actor._actorId];
            var wat = MOT.Param.LifeWatUpdate;
            var wat_rate = 1;
            for (var i = 0; i < actor._states.length; i++){
                var state = $dataStates[actor._states[i]].meta;
                if (state.HalfWat){ wat_rate = 0.5}
                if (state.DoubleWat){ wat_rate = 2}
                if (state.InvalidHng){ wat_rate = 0}
            }
            if (mactor.meta.CorrectiontWat) {wat += parseFloat(mactor.meta.CorrectiontWat)}
            actor.changeLifeparams(1,wat * wat_rate);
        }
        });
    }
};
//============================================================
//■フレーム更新【疲労】
//============================================================
Game_Map.prototype.updateFig = function() {
    if (MOT.Param.LifeFigFrame === 0) return false
    if (Math.floor(Graphics.frameCount) % MOT.Param.LifeFigFrame + 1 === MOT.Param.LifeFigFrame){
        $gameParty.members().forEach(function(actor) {
        if (actor.isAlive()) {
            var mactor = $dataActors[actor._actorId];
            var fig = MOT.Param.LifeFigUpdate;
            var fig_rate = 1;
            for (var i = 0; i < actor._states.length; i++){
                var state = $dataStates[actor._states[i]].meta;
                if (state.HalfFig){ fig_rate = 0.5}
                if (state.DoubleFig){ fig_rate = 2}
                if (state.InvalidFig){ fig_rate = 0}
            }
            if (mactor.meta.CorrectionFig) {fig += parseFloat(mactor.meta.CorrectionFig)}
            actor.changeLifeparams(2,fig * fig_rate);
        }
        });
    }
};
//============================================================
//■フレーム更新【睡眠】
//============================================================
Game_Map.prototype.updateSlp = function() {
    if (MOT.Param.LifeSlpFrame === 0) return false
    if (Math.floor(Graphics.frameCount) % MOT.Param.LifeSlpFrame + 1 === MOT.Param.LifeSlpFrame){
        $gameParty.members().forEach(function(actor) {
        if (actor.isAlive()) {
            var mactor = $dataActors[actor._actorId];
            var slp = MOT.Param.LifeSlpUpdate;
            var slp_rate = 1;
            for (var i = 0; i < actor._states.length; i++){
                var state = $dataStates[actor._states[i]].meta;
                if (state.HalfSlp){ slp_rate = 0.5}
                if (state.DoubleSlp){ slp_rate = 2}
                if (state.InvalidSlp){ slp_rate = 0}
            }
            if (mactor.meta.CorrectionSlp) {slp += parseFloat(mactor.meta.CorrectionSlp)}
            actor.changeLifeparams(3,slp * slp_rate);
          }

        });
    }
};
//============================================================
//■フレーム更新【体調】
//============================================================
Game_Map.prototype.updatePsl = function() {
    if (MOT.Param.LifePslFrame === 0) return false
    if (Math.floor(Graphics.frameCount) % MOT.Param.LifePslFrame + 1 === MOT.Param.LifePslFrame){
        $gameParty.members().forEach(function(actor) {
        if (actor.isAlive()) {
            var mactor = $dataActors[actor._actorId];
            var psl = MOT.Param.LifePslUpdate;
            var psl_rate = 1;
            for (var i = 0; i < actor._states.length; i++){
                var state = $dataStates[actor._states[i]].meta;
                if (state.HalfPsl){ psl_rate = 0.5}
                if (state.DoublePsl){ psl_rate = 2}
                if (state.InvalidPsl){ psl_rate = 0}
            }
        	if (mactor.meta.CorrectionPsl) {psl += parseFloat(mactor.meta.CorrectionPsl)}
            actor.changeLifeparams(4,psl * psl_rate);
        }
        });
    }
};
//=============================================================================
// Game_Map
//=============================================================================
//============================================================
//■アイテム使用
//============================================================
MOT.LIFE.Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
Scene_ItemBase.prototype.useItem = function() {
    MOT.LIFE.Scene_ItemBase_useItem.call(this);
    this.applyLifeItem();
    this.checkCommonEvent();
    this.checkGameover();
    this._actorWindow.refresh();
};

Scene_ItemBase.prototype.applyLifeItem = function() {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    var item = this.item();
    var hng = 0;
    var wat = 0;
    var fig = 0;
    var slp = 0;
    var psl = 0;
    var mhng = 0;
    var mwat = 0;
    var mfig = 0;
    var mslp = 0;
    var mpsl = 0;
    if (item.meta.ChangeLifeHng) hng = parseFloat(item.meta.ChangeLifeHng);
    if (item.meta.ChangeLifeWat) wat = parseFloat(item.meta.ChangeLifeWat);
    if (item.meta.ChangeLifeFig) fig = parseFloat(item.meta.ChangeLifeFig);
    if (item.meta.ChangeLifeSlp) slp = parseFloat(item.meta.ChangeLifeSlp);
    if (item.meta.ChangeLifePsl) psl = parseFloat(item.meta.ChangeLifePsl);
    if (item.meta.ChangeLifeMaxHng) mhng = parseFloat(item.meta.ChangeLifeMaxHng);
    if (item.meta.ChangeLifeMaxWat) mwat = parseFloat(item.meta.ChangeLifeMaxWat);
    if (item.meta.ChangeLifeMaxFig) mfig = parseFloat(item.meta.ChangeLifeMaxFig);
    if (item.meta.ChangeLifeMaxSlp) mslp = parseFloat(item.meta.ChangeLifeMaxSlp);
    if (item.meta.ChangeLifeMaxPsl) mpsl = parseFloat(item.meta.ChangeLifeMaxPsl);
    var temp_arrlocal = [hng,wat,fig,slp,psl];
    var temp_arrmax = [mhng,mwat,mfig,mslp,mpsl];
    this.itemTargetActors().forEach(function(target) {
        for (var i = 0; i < temp_arrmax.length; i++){
            if (temp_arrmax[i] != 0) {target.changeLifeMaxparams(i,temp_arrmax[i])}
            if (temp_arrlocal[i] != 0) {target.changeLifeparams(i,temp_arrlocal[i])}
        }
    }, this);
};

//=============================================================================
// Game_Action
//=============================================================================
//============================================================
//■アイテム使用
//============================================================
MOT.LIFE.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    MOT.LIFE.Game_Action_apply.call(this,target)
    var item = this.item();
    var hng = 0;
    var wat = 0;
    var fig = 0;
    var slp = 0;
    var psl = 0;
    var mhng = 0;
    var mwat = 0;
    var mfig = 0;
    var mslp = 0;
    var mpsl = 0;
    if (item.meta.ChangeLifeHng) hng = parseFloat(item.meta.ChangeLifeHng);
    if (item.meta.ChangeLifeWat) wat = parseFloat(item.meta.ChangeLifeWat);
    if (item.meta.ChangeLifeFig) fig = parseFloat(item.meta.ChangeLifeFig);
    if (item.meta.ChangeLifeSlp) slp = parseFloat(item.meta.ChangeLifeSlp);
    if (item.meta.ChangeLifePsl) psl = parseFloat(item.meta.ChangeLifePsl);
    if (item.meta.ChangeLifeMaxHng) mhng = parseFloat(item.meta.ChangeLifeMaxHng);
    if (item.meta.ChangeLifeMaxWat) mwat = parseFloat(item.meta.ChangeLifeMaxWat);
    if (item.meta.ChangeLifeMaxFig) mfig = parseFloat(item.meta.ChangeLifeMaxFig);
    if (item.meta.ChangeLifeMaxSlp) mslp = parseFloat(item.meta.ChangeLifeMaxSlp);
    if (item.meta.ChangeLifeMaxPsl) mpsl = parseFloat(item.meta.ChangeLifeMaxPsl);
    var temp_arrlocal = [hng,wat,fig,slp,psl];
    var temp_arrmax = [mhng,mwat,mfig,mslp,mpsl];
    for (var i = 0; i < temp_arrmax.length; i++){
        if (temp_arrmax[i] != 0) {target.changeLifeMaxparams(i,temp_arrmax[i])}
        if (temp_arrlocal[i] != 0) {target.changeLifeparams(i,temp_arrlocal[i])}
    }
};



//=============================================================================
// Window
//=============================================================================
Window_Base.prototype.drawActorHng = function(actor, x, y, width) {
    width = width || 186;
    this.drawGauge(x, y, width, actor.hngRate(), MOT.Param.LifeHngGColor1, MOT.Param.LifeHngGColor2);
    this.changeTextColor(MOT.Param.LifeHngStrColor);
    this.contents.fontSize =MOT.Param.LifeHngStrSize;
    this.drawText(MOT.Param.LifeHngStrName, x, y, 80);
    this.contents.fontSize =MOT.Param.LifeHngViewSize;
    this.drawHngCurrentAndMax(actor,actor.hng, actor.mhng, x, y, width, this.hngColor(actor), this.normalColor());
};
Window_Base.prototype.hngColor = function(actor) {
    if (actor.hng === 0) {
        return MOT.Param.LifeHngColor3;
    } else if (actor.hng < actor.mhng / 4) {
        return MOT.Param.LifeHngColor2;
    } else {
        return MOT.Param.LifeHngColor1;
    }
};
Window_Base.prototype.drawActorWat = function(actor, x, y, width) {
    width = width || 186;
    this.drawGauge(x, y, width, actor.watRate(), MOT.Param.LifeWatGColor1, MOT.Param.LifeWatGColor2);
    this.changeTextColor(MOT.Param.LifeWatStrColor);
    this.contents.fontSize =MOT.Param.LifeWatStrSize;
    this.drawText(MOT.Param.LifeWatStrName, x, y, 80);
    this.contents.fontSize =MOT.Param.LifeWatViewSize;
    this.drawWatCurrentAndMax(actor,actor.wat, actor.mwat, x, y, width, this.watColor(actor), this.normalColor());
};
Window_Base.prototype.watColor = function(actor) {
    if (actor.wat === 0) {
        return MOT.Param.LifeWatColor3;
    } else if (actor.wat < actor.mwat / 4) {
        return MOT.Param.LifeWatColor2;
    } else {
        return MOT.Param.LifeWatColor1;
    }
};
Window_Base.prototype.drawActorFig = function(actor, x, y, width) {
    width = width || 186;
    this.drawGauge(x, y, width, actor.figRate(), MOT.Param.LifeFigGColor1, MOT.Param.LifeFigGColor2);
    this.changeTextColor(MOT.Param.LifeFigStrColor);
    this.contents.fontSize =MOT.Param.LifeFigStrSize;
    this.drawText(MOT.Param.LifeFigStrName, x, y, 80);
    this.contents.fontSize =MOT.Param.LifeFigViewSize;
    this.drawFigCurrentAndMax(actor,actor.fig, actor.mfig, x, y, width, this.figColor(actor), this.normalColor());
};
Window_Base.prototype.figColor = function(actor) {
    if (actor.fig === actor.mfig) {
        return MOT.Param.LifeFigColor3;
    } else if (actor.fig > actor.mfig * 0.7) {
        return MOT.Param.LifeFigColor2;
    } else {
        return MOT.Param.LifeFigColor1;
    }
};
Window_Base.prototype.drawActorSlp = function(actor, x, y, width) {
    width = width || 186;
    this.drawGauge(x, y, width, actor.slpRate(), MOT.Param.LifeSlpGColor1, MOT.Param.LifeSlpGColor2);
    this.changeTextColor(MOT.Param.LifeSlpStrColor);
    this.contents.fontSize =MOT.Param.LifeSlpStrSize;
    this.drawText(MOT.Param.LifeSlpStrName, x, y, 80);
    this.contents.fontSize =MOT.Param.LifeSlpViewSize;
    this.drawSlpCurrentAndMax(actor,actor.slp, actor.mslp, x, y, width, this.slpColor(actor), this.normalColor());
};
Window_Base.prototype.slpColor = function(actor) {
    if (actor.slp === actor.mslp) {
        return MOT.Param.LifeSlpColor3;
    } else if (actor.slp > actor.mslp * 0.7) {
        return MOT.Param.LifeSlpColor2;
    } else {
        return MOT.Param.LifeSlpColor1;
    }
};

Window_Base.prototype.drawActorPsl = function(actor, x, y, width) {
    width = width || 186;
    this.drawGauge(x, y, width, actor.pslRate(), MOT.Param.LifePslGColor1, MOT.Param.LifePslGColor2);
    this.changeTextColor(MOT.Param.LifePslStrColor);
    this.contents.fontSize =MOT.Param.LifePslStrSize;
    this.drawText(MOT.Param.LifePslStrName, x, y, 80);
    this.contents.fontSize =MOT.Param.LifePslViewSize;
    this.drawPslCurrentAndMax(actor,actor.psl, actor.mpsl, x, y, width, this.pslColor(actor), this.normalColor());
};
Window_Base.prototype.pslColor = function(actor) {
    if (actor.psl === 0) {
        return MOT.Param.LifePslColor3;
    } else if (actor.isAlive() && actor.psl < actor.mpsl / 4) {
        return MOT.Param.LifePslColor2;
    } else {
        return MOT.Param.LifePslColor1;
    }
};

Window_Base.prototype.drawHngCurrentAndMax = function(actor,current, max, x, y, width, color1, color2) {
	var par = Math.floor(actor.hngRate() * 100);
    var labelWidth = this.textWidth(MOT.Param.LifeHngStrName);
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
	if (MOT.Param.LifeHngViewPt === 0) {
		if (x3 >= x + labelWidth) {
	        this.changeTextColor(color1);
	        this.drawText(current, x3, y, valueWidth, 'right');
	        this.changeTextColor(color2);
	        this.drawText('/', x2, y, slashWidth, 'right');
	        this.drawText(max, x1, y, valueWidth, 'right');
	    } else {
			this.changeTextColor(color1);
	        this.drawText(current, x1, y, valueWidth, 'right');
	    }
	}else{
		this.changeTextColor(color1);
		this.drawText(par + '%', x1, y, valueWidth, 'right');
	}
};
Window_Base.prototype.drawWatCurrentAndMax = function(actor,current, max, x, y, width, color1, color2) {
	var par = Math.floor(actor.watRate() * 100);
    var labelWidth = this.textWidth(MOT.Param.LifeWatStrName);
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
	if (MOT.Param.LifeWatViewPt === 0) {
		if (x3 >= x + labelWidth) {
	        this.changeTextColor(color1);
	        this.drawText(current, x3, y, valueWidth, 'right');
	        this.changeTextColor(color2);
	        this.drawText('/', x2, y, slashWidth, 'right');
	        this.drawText(max, x1, y, valueWidth, 'right');
	    } else {
			this.changeTextColor(color1);
	        this.drawText(current, x1, y, valueWidth, 'right');
	    }
	}else{
		this.changeTextColor(color1);
		this.drawText(par + '%', x1, y, valueWidth, 'right');
	}
};
Window_Base.prototype.drawFigCurrentAndMax = function(actor,current, max, x, y, width, color1, color2) {
	var par = Math.floor(actor.figRate() * 100);
    var labelWidth = this.textWidth(MOT.Param.LifeFigStrName);
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
	if (MOT.Param.LifeFigViewPt === 0) {
		if (x3 >= x + labelWidth) {
	        this.changeTextColor(color1);
	        this.drawText(current, x3, y, valueWidth, 'right');
	        this.changeTextColor(color2);
	        this.drawText('/', x2, y, slashWidth, 'right');
	        this.drawText(max, x1, y, valueWidth, 'right');
	    } else {
			this.changeTextColor(color1);
	        this.drawText(current, x1, y, valueWidth, 'right');
	    }
	}else{
		this.changeTextColor(color1);
		this.drawText(par + '%', x1, y, valueWidth, 'right');
	}
};
Window_Base.prototype.drawSlpCurrentAndMax = function(actor,current, max, x, y, width, color1, color2) {
	var par = Math.floor(actor.slpRate() * 100);
    var labelWidth = this.textWidth(MOT.Param.LifeSlpStrName);
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
	if (MOT.Param.LifeSlpViewPt === 0) {
		if (x3 >= x + labelWidth) {
	        this.changeTextColor(color1);
	        this.drawText(current, x3, y, valueWidth, 'right');
	        this.changeTextColor(color2);
	        this.drawText('/', x2, y, slashWidth, 'right');
	        this.drawText(max, x1, y, valueWidth, 'right');
	    } else {
			this.changeTextColor(color1);
	        this.drawText(current, x1, y, valueWidth, 'right');
	    }
	}else{
		this.changeTextColor(color1);
		this.drawText(par + '%', x1, y, valueWidth, 'right');
	}
};
Window_Base.prototype.drawPslCurrentAndMax = function(actor,current, max, x, y, width, color1, color2) {
	var par = Math.floor(actor.pslRate() * 100);
    var labelWidth = this.textWidth(MOT.Param.LifePslStrName);
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
	if (MOT.Param.LifePslViewPt === 0) {
		if (x3 >= x + labelWidth) {
	        this.changeTextColor(color1);
	        this.drawText(current, x3, y, valueWidth, 'right');
	        this.changeTextColor(color2);
	        this.drawText('/', x2, y, slashWidth, 'right');
	        this.drawText(max, x1, y, valueWidth, 'right');
	    } else {
			this.changeTextColor(color1);
	        this.drawText(current, x1, y, valueWidth, 'right');
	    }
	}else{
		this.changeTextColor(color1);
		this.drawText(par + '%', x1, y, valueWidth, 'right');
	}
};
//=============================================================================
// ■メニューのステータスの表示サンプル
//=============================================================================

Window_Status.prototype.drawBlock3 = function(y) {
    this.drawParameters(48, y);
    this.drawEquipments(432, y);
    //ここからゲージ表示
    var y2 = y + (this.lineHeight() * 6)
    //this.drawActorHng(this._actor, 48, y2, 186, 'right'); //満腹
	//this.drawActorWat(this._actor, 48, y2 + this.lineHeight(), 186, 'right'); //水分
	//this.drawActorFig(this._actor, 48, y2, 186, 'right'); //疲労
	//this.drawActorSlp(this._actor, 48, y2 + (this.lineHeight() * 3), 186, 'right'); //眠気
	//this.drawActorPsl(this._actor, 48, y2 + (this.lineHeight() * 4), 186, 'right'); //体調
};



