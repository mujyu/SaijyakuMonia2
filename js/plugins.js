// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Pk_CommonMenuEvents","status":true,"description":"Tweek your main menu, More info in the Plugin.","parameters":{}},
{"name":"SAN_MapGenerator","status":true,"description":"自動マップ生成 ver1.00a\r\n自動的にマップを生成しイベントを配置します。","parameters":{}},
{"name":"YEP_CoreEngine","status":true,"description":"v1.17 Needed for the majority of Yanfly Engine Scripts. Also\r\ncontains bug fixes found inherently in RPG Maker.","parameters":{"---Screen---":"","Screen Width":"1224","Screen Height":"768","Scale Battlebacks":"true","Scale Title":"true","Scale Game Over":"true","Open Console":"false","Reposition Battlers":"true","GameFont Load Timer":"0","---Gold---":"","Gold Max":"999999999","Gold Font Size":"20","Gold Icon":"313","Gold Overlap":"A lotta","---Items---":"","Default Max":"99","Quantity Text Size":"20","---Stats---":"","Max Level":"9999999","Actor MaxHP":"9999999999","Actor MaxMP":"999999","Actor Parameter":"9999999999","Enemy MaxHP":"97009600000000","Enemy MaxMP":"999999999","Enemy Parameter":"9999999999","---Battle---":"","Animation Rate":"4","Flash Target":"false","---Font---":"","Chinese Font":"SimHei, Heiti TC, sans-serif","Korean Font":"Dotum, AppleGothic, sans-serif","Default Font":"GameFont, Verdana, Arial, Courier New","Font Size":"28","Text Align":"left","---Windows---":"","Digit Grouping":"true","Line Height":"36","Icon Width":"32","Icon Height":"32","Face Width":"144","Face Height":"144","Window Padding":"18","Text Padding":"6","Window Opacity":"192","Gauge Outline":"true","Gauge Height":"18","Menu TP Bar":"true","---Window Colors---":"","Color: Normal":"0","Color: System":"16","Color: Crisis":"17","Color: Death":"18","Color: Gauge Back":"19","Color: HP Gauge 1":"20","Color: HP Gauge 2":"21","Color: MP Gauge 1":"22","Color: MP Gauge 2":"23","Color: MP Cost":"23","Color: Power Up":"24","Color: Power Down":"25","Color: TP Gauge 1":"28","Color: TP Gauge 2":"29","Color: TP Cost Color":"29"}},
{"name":"liply_memoryleak_patch","status":true,"description":"メモリリークパッチ","parameters":{}},
{"name":"YEP_BattleStatusWindow","status":true,"description":"v1.05 A simple battle status window that shows the\nfaces of your party members in horizontal format.","parameters":{"---Visual---":"","No Action Icon":"16","Name Font Size":"20","Param Font Size":"20","Param Y Buffer":"7","Param Current Max":"false","Adjust Columns":"false","---Actor Switching---":"","Left / Right":"true","PageUp / PageDown":"true","Allow Turn Skip":"true","---Front View---":"","Show Animations":"true","Show Sprites":"false","Align Animations":"true","X Offset":"24","Y Offset":"-16"}},
{"name":"YEP_BattleEngineCore","status":true,"description":"v1.38a Have more control over the flow of the battle system\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi + Math.randomInt(Math.floor(10))","Default System":"dtb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.1","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"120","Physical Animation":"52","Magical Animation":"51","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"screenWidth - 16 - (maxSize + 2) * 32 + index * 32","Home Position Y":"screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.5","Default Y Anchor":"1.0","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.7","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"使用者","Ally Help Text":"味方","Allies Help Text":"味方","Enemy Help Text":"敵","Enemies Help Text":"敵","All Help Text":"全体 %1","Random Help Text":"%2 Random %1","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"true","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"true","Show State Text":"true","Show Buff Text":"true","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"true","Show Critical Text":"true","Show Miss Text":"true","Show Evasion Text":"true","Show HP Text":"true","Show MP Text":"true","Show TP Text":"true"}},
{"name":"YEP_X_ActSeqPack1","status":true,"description":"v1.10 (Requires YEP_BattleEngineCore.js) Basic functions are\nadded to the Battle Engine Core's action sequences.","parameters":{"Default Volume":"90","Default Pitch":"100","Default Pan":"0"}},
{"name":"YEP_EquipCore","status":true,"description":"v1.15 Allows for the equipment system to be more flexible to\nallow for unique equipment slots per class.","parameters":{"---General---":"","Text Align":"center","Finish Command":"完了","Remove Text":"はずす","Remove Icon":"16","Empty Text":"<装備なし>","Empty Icon":"16","---Rules---":"","Non-Removable Types":"1","Non-Optimized Types":"5"}},
{"name":"T_dashMotion","status":true,"description":"簡易的なダッシュモーションを実装します","parameters":{}},
{"name":"YEP_ItemCore","status":true,"description":"v1.24 Changes the way Items are handled for your game\nand the Item Scene, too.","parameters":{"---General---":"","Max Items":"0","Max Weapons":"100","Max Armors":"100","Starting ID":"3000","Random Variance":"5","Negative Variance":"false","Name Format":"%1%2%3%4","Name Spacing":"true","Boost Format":"(+%1)","---Item Scene---":"","Updated Scene Item":"true","List Equipped Items":"true","Show Icon":"true","Icon Size":"128","Font Size":"20","Command Alignment":"center","Recovery Format":"%1 Heal","Add State":"+State","Add Buff":"+Buff","Remove State":"-State","Remove Buff":"-Buff","Maximum Icons":"4","Use Command":"使用 %1","Carry Format":"%1/%2","--Independent Items--":"","Midgame Note Parsing":"false"}},
{"name":"YEP_X_ItemUpgradeSlots","status":true,"description":"v1.06a (Requires YEP_ItemCore.js) Allows independent items to\nbe upgradeable and gain better stats.","parameters":{"Default Slots":"5","Slot Variance":"1","Upgrade Command":"強化 %1","Show Only":"true","Slots Available":"Slots Available","Show Slot Upgrades":"true","Slot Upgrade Format":"\\}Slot%1: %2\\{","Default Sound":"Heal2"}},
{"name":"YEP_StatusMenuCore","status":true,"description":"v1.01a Changes the Status menu for your characters into\na hub that displays more character information.","parameters":{"---Settings---":"","Command Order":"General Parameters Elements States Attributes Custom Cancel","Command Window Width":"240","Command Window Rows":"4","Command Alignment":"left","---General---":"","General Command":"全体","Parameters Text":"ステータス","Experience Text":"経験値","Total Format":"次のレベルまで合計経験値","EXP Gauge Color 1":"30","EXP Gauge Color 2":"31","---Parameters---":"","Parameters Command":"ステータス","Graph Text":"ステータスゲージ","ATK Color":"#ed1c24 #f26c4f","DEF Color":"#f7941d #fdc689","MAT Color":"#605ca8 #bd8cbf","MDF Color":"#448ccb #a6caf4","AGI Color":"#39b54a #82ca9c","LUK Color":"#fff568 #fffac3","---Resist Colors---":"","Above 300%":"10","200% to 300%":"20","150% to 200%":"14","120% to 150%":"6","100% to 120%":"0","80% to 100%":"24","50% to 80%":"29","1% to 50%":"23","Exactly 0%":"31","Below 0%":"27","---Elements---":"","Elements Command":"各種属性ダメージ割合","Elements Decimal":"2","Element Column 1":"1","Element Column 2":"2 3 4 8 9","Element Column 3":"","Element Column 4":"","---State---":"","States Command":"状態異常割合","States Decimal":"2","States Column 1":"1 4 5 6 7","States Column 2":"8 12 14 15","States Column 3":"","States Column 4":"","---Attributes---":"","Attributes Command":"各種効果割合","Attribute Font Size":"20","Attribute Decimal":"0","Attributes Column 1":"hit eva cri mev cnt","Attributes Column 2":"","Attributes Column 3":"","Attributes Column 4":"","hit Name":"命中率","eva Name":"回避率","cri Name":"会心率","cev Name":"Critical Evasion Rate","mev Name":"魔法回避率","mrf Name":"Magic Reflect Rate","cnt Name":"反撃確率","hrg Name":"HP Regen Rate","mrg Name":"MP Regen Rate","trg Name":"TP Regen Rate","tgr Name":"Aggro Rate","grd Name":"Guard Effect","rec Name":"Recovery Effect","pha Name":"Pharmacology Effect","mcr Name":"MP Cost Rate","tcr Name":"TP Charge Rate","pdr Name":"Physical Damage Rate","mdr Name":"Magical Damage Rate","fdr Name":"Floor Damage Rate","exr Name":"Experience Rate"}},
{"name":"YEP_X_BattleStatistics","status":false,"description":"v1.01 (Requires YEP_StatusMenuCore.js) Logs the battle\nstatistics of actors for your players to view.","parameters":{"Command Name":"Statistics","Battle Count Text":"","Battle Count Format":"","Kill Count Text":"撃破数","Kill Count Format":"全体撃破割合%1％","Death Count Text":"死亡回数","Death Count Format":"全体死亡割合%1％","Assist Count Text":"撃破貢献率","Assist Count Format":"全体撃破貢献率%1％","Damage Dealt":"合計与ダメージ","Damage Taken":"合計被ダメージ","Healing Dealt":"Healing Performed","Healing Taken":"Healing Received"}},
{"name":"YEP_X_VisualHpGauge","status":true,"description":"v1.06 (Requires YEP_BattleEngineCore.js) Reveal HP Gauges\nwhen a battler is selected or takes damage in battle.","parameters":{"---General---":"","Display Actor":"true","Defeat First":"false","Always Visible":"false","---Appearance---":"","Minimum Gauge Width":"144","Gauge Height":"18","Back Color":"19","HP Color 1":"20","HP Color 2":"21","Gauge Duration":"30","Gauge Position":"false","Y Buffer":"-16","Use Thick Gauges":"true","---Text Display---":"","Show HP":"false","Show Value":"false","Show Max":"false"}},
{"name":"shopadvance","status":true,"description":"ショップで装備品を購入する際、詳細な情報を\r\n表示することができます","parameters":{}},
{"name":"TMCostShow","status":true,"description":"ＭＰ消費とＴＰ消費が両方設定されたスキルのコストを\n無理やり両方表示します。","parameters":{"mpCostHeader":"MP","tpCostHeader":"TP","conjunction":"/","costWidthText":"000","maxCostNum":"2","---TMSkillCostEx---":"以下はTMSkillCostEx併用時に利用","hpCostHeader":"HP","expCostHeader":"EXP","expCostFooter":"","goldCostHeader":"","goldCostFooter":"G","hpCostColor":"21","expCostColor":"16","goldCostColor":"0"}},
{"name":"TerraxLighting","status":true,"description":"v1.4.6 Creates an extra layer that darkens a map and adds lightsources!","parameters":{"Player radius":"325","Add to options":"No","Option menu entry":"Lighting effects","Reset Lights":"No","Save DaynightHours":"0","Save DaynightMinutes":"0","Save DaynightSeconds":"0","Flashlight offset":"0","Screensize X":"1224","Screensize Y":"768","Kill Switch":"No"}},
{"name":"CommonPopupCore","status":true,"description":"ver1.04/汎用的なポップアップの仕組みを提供するためのベースプラグインです。","parameters":{"Text Back Color":"rgba(0,0,0,0.6)","Text Back FileName":"popup_back%d"}},
{"name":"BattleEffectPopup","status":true,"description":"戦闘行動結果ポップアッププラグイン","parameters":{"クリティカル":"CRITICAL!","クリティカルカラー":"255,0,0,255","回避":"Avoid!","回避カラー":"0,128,255,255","ミス":"Miss!","ミスカラー":"0,0,0,0","魔法反射":"Reflection!","魔法反射カラー":"0,128,255,255","反撃":"Counter!","反撃カラー":"0,128,255,255","弱点":"Weakness!","弱点カラー":"0,255,128,255","耐性":"Resistance!","耐性カラー":"0,0,128,255","味方ダメージカラー":"0,0,0,0","敵ダメージカラー":"0,0,0,0","フォントサイズ":"42","メッセージ最大幅":"240","フラッシュ時間":"60","X座標補正":"0","Y座標補正":"-40","画像使用":"OFF"}},
{"name":"GetInformation","status":true,"description":"ver1.11/アイテムの入手などにスライドアニメするインフォメーションを追加するプラグインです。","parameters":{"Info Disable Switch Id":"10","Use Battle Info":"true","Use Rewards Info":"true","Info Pattern":"GrowUp","Info Font Size":"20","Info Count":"120","Info Delay":"20","Info MoveWait":"100","Info MoveFade":"10","Info Position":"","Info Slide Action":"","Info Sup X":"0","Info Sup Y":"0","Info Width":"816","Gold Icon Index":"314","Actor Icon Start Index":"320","Battle Show List":"item,gold,exp,skill,params,level,abp,classLevel","Get Gold Text":"「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[24]手に入れた！","Lost Gold Text":"「\\I[_icon]_num\\C[14]\\G\\C[0]」 を\\C[2]失った・・・","Get Item Text":"「\\I[_icon]_name」 を\\C[24]手に入れた！\\n\\C[6]_desc1","Lost Item Text":"「\\I[_icon]_name」 を\\C[2]失った・・・\\n\\C[6]_desc1","Get Item Text Num":"「\\I[_icon]_name」 を\\C[14]_num個\\C[24]手に入れた！\\n\\C[6]_desc1","Lost Item Text Num":"「\\I[_icon]_name」を\\C[14]_num個\\C[2]失った・・・\\n\\C[6]_desc1","Get Skill Text":"_actorは「\\I[_icon]_name」 を\\C[24]覚えた！\\n\\C[6]_desc1","Lost Skill Text":"_actorは「\\I[_icon]_name」を \\C[2]忘れてしまった・・・\\n\\C[6]_desc1","Exp Up Text":"_actorは\\C[14]_num\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！","Exp Down Text":"_actorは\\C[14]_num\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・","Lv Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_num\\C[24]上がった！","Lv Down Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_num\\C[2]下がった・・・","Param Up Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Param Down Text":"_actorは\\C[4]_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・","Abp Up Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[24]得た！","Abp Down Text":"_actorは\\C[14]_numポイント\\C[0]の\\C[4]_name\\C[0]を\\C[2]失った・・・","Class Lv Up Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[24]上がった！","Class Lv Down Text":"_actorは\\C[4]_classの_name\\C[0]が\\C[14]_numポイント\\C[2]下がった・・・"}},
{"name":"EscapeLostGold","status":true,"description":"逃走すると所持金を落とすプラグイン","parameters":{"lostRate":"0.12","lostMessage":"を落とした！","lostMaxGold":"99999999"}},
{"name":"DP_FixEscapeRatio","status":true,"description":"逃走の成功確率を設定できます。v1.00","parameters":{"Use Param":"false","Ratio":"65"}},
{"name":"EscapeFadeOut","status":true,"description":"サイドビューで逃走時の前向き退却のモーションをフェードアウトに変更します","parameters":{"EffectDuration":"12"}},
{"name":"TMMapHpGauge","status":true,"description":"マップシーンに顔グラフィックとＨＰゲージを表示します。\n必要に応じてＭＰや変数などをゲージで表示することもできます。","parameters":{"gaugeWindowX":"860","gaugeWindowY":"5","gaugeWindowWidth":"288","gaugeWindowHeight":"64","gaugeAType":"VN","gaugeAX":"12","gaugeAY":"12","gaugeAWidth":"144","gaugeAHeight":"36","gaugeAFontSize":"28","gaugeAParam":"6","gaugeAMax":"0","gaugeAName":"空腹度","gaugeAColor":"#ff60c0 #ffa0e0","gaugeBType":"","gaugeBX":"12","gaugeBY":"12","gaugeBWidth":"144","gaugeBHeight":"36","gaugeBFontSize":"28","gaugeBParam":"0","gaugeBMax":"0","gaugeBName":"BP","gaugeBColor":"#ff60c0 #ffa0e0","gaugeCType":"","gaugeCX":"12","gaugeCY":"12","gaugeCWidth":"144","gaugeCHeight":"36","gaugeCFontSize":"28","gaugeCParam":"0","gaugeCMax":"0","gaugeCName":"CP","gaugeCColor":"#ff60c0 #ffa0e0","faceOffsetX":"-4","faceOffsetY":"8","stateIconMax":"4","stateIconX":"156","stateIconY":"24","shakeTime":"20","startVisible":"1","collideOpacity":"128","messageBusyHide":"1","eventBusyHide":"1"}},
{"name":"MOT_LifeParameters","status":true,"description":"空腹、水分、疲労、睡眠、体調パラメータを追加します","parameters":{"===各パラメータの初期現在値===":"","空腹度の現在値":"0","水分量の現在値":"0","疲労度の現在値":"0","眠気の現在値":"0","体調の現在値":"100","===各パラメータの初期最大値===":"","空腹度の最大値":"100","水分量の最大値":"100","疲労度の最大値":"100","眠気の最大値":"100","体調の最大値":"100","===各パラメータの上限値===":"","空腹度の上限値":"999","水分量の上限値":"999","疲労度の上限値":"999","眠気の上限値":"999","体調の上限値":"999","===1歩毎の増減量===":"","空腹度の増減量:歩行":"0","水分量の増減量:歩行":"0","疲労度の増減量:歩行":"0.03","眠気の増減量:歩行":"0","体調の増減量:歩行":"0","===ダッシュ時の1歩毎の増加量===":"","空腹度の増減量:ダッシュ":"0","水分量の増減量:ダッシュ":"0","疲労度の増減量:ダッシュ":"0.06","眠気の増減量:ダッシュ":"0","体調の増減量:ダッシュ":"0","===時間経過による増減量===":"","空腹度の更新フレーム数":"0","水分量の更新フレーム数":"0","疲労度の更新フレーム数":"360","眠気の更新フレーム数":"0","体調の更新フレーム数":"0","空腹度の増減量:時間":"0","水分量の増減量:時間":"0","疲労度の増減量:時間":"0.05","眠気の増減量:時間":"0","体調の増減量:時間":"0","===描画設定設定===":"","===満腹度===":"","満腹度:項目名":"満腹度","満腹度:項目名のフォントサイズ":"22","満腹度:フォントカラー":"#FFD700","満腹度:値の表示形式":"1","満腹度:値のフォントサイズ":"18","満腹度:現在値の通常フォントカラー":"#FFFFFF","満腹度:現在値の危険フォントカラー":"#E3FC45","満腹度:現在値の重度フォントカラー":"#FF326F","満腹度:ゲージカラー1":"#FF9533","満腹度:ゲージカラー2":"#FFD600","===水分量===":"","水分量:項目名":"水分量","水分量:項目名のフォントサイズ":"22","水分量:フォントカラー":"#00BAFF","水分量:値の表示形式":"1","水分量:値のフォントサイズ":"18","水分量:現在値の通常フォントカラー":"#FFFFFF","水分量:現在値の危険フォントカラー":"#E3FC45","水分量:現在値の重度フォントカラー":"#FF326F","水分量:ゲージカラー1":"#338BFF","水分量:ゲージカラー2":"#00ABFF","===疲労度===":"","疲労度:項目名":"疲労度","疲労度:項目名のフォントサイズ":"22","疲労度:フォントカラー":"#8FFF00","疲労度:値の表示形式":"1","疲労度:値のフォントサイズ":"18","疲労度:現在値の通常フォントカラー":"#FFFFFF","疲労度:現在値の危険フォントカラー":"#E3FC45","疲労度:現在値の重度フォントカラー":"#FF326F","疲労度:ゲージカラー1":"#33FF6C","疲労度:ゲージカラー2":"#00FF94","===眠気===":"","眠気:項目名":"眠気","眠気:項目名のフォントサイズ":"22","眠気:フォントカラー":"#C400FF","眠気:値の表示形式":"1","眠気:値のフォントサイズ":"18","眠気:現在値の通常フォントカラー":"#FFFFFF","眠気:現在値の危険フォントカラー":"#E3FC45","眠気:現在値の重度フォントカラー":"#FF326F","眠気:ゲージカラー1":"#E054DF","眠気:ゲージカラー2":"#DB00FF","===体調===":"","体調:項目名":"体調","体調:項目名のフォントサイズ":"22","体調:フォントカラー":"#FF00F5","体調:値の表示形式":"1","体調:値のフォントサイズ":"18","体調:現在値の通常フォントカラー":"#FFFFFF","体調:現在値の危険フォントカラー":"#E3FC45","体調:現在値の重度フォントカラー":"#FF326F","体調:ゲージカラー1":"#FF33CC","体調:ゲージカラー2":"#FF00B0"}},
{"name":"Yami_8DIR","status":true,"description":"","parameters":{}},
{"name":"Torigoya_SaveCommand","status":true,"description":"プラグインコマンドからセーブを実行できるようにします。","parameters":{}},
{"name":"ALT_StandingPictureMove","status":true,"description":"パラメータに\"立ち絵\"として予め設定したピクチャを、プラグインコマンドで動かします。立ち絵は16枚まで登録可能。","parameters":{"default_position_y":"0","Stand_1_PictureNumber":"","Stand_1_CharacterName":"","Stand_1_FileName":"","Stand_2_PictureNumber":"","Stand_2_CharacterName":"","Stand_2_FileName":"","Stand_3_PictureNumber":"","Stand_3_CharacterName":"","Stand_3_FileName":"","Stand_4_PictureNumber":"","Stand_4_CharacterName":"","Stand_4_FileName":"","Stand_5_PictureNumber":"","Stand_5_CharacterName":"","Stand_5_FileName":"","Stand_6_PictureNumber":"","Stand_6_CharacterName":"","Stand_6_FileName":"","Stand_7_PictureNumber":"","Stand_7_CharacterName":"","Stand_7_FileName":"","Stand_8_PictureNumber":"","Stand_8_CharacterName":"","Stand_8_FileName":"","Stand_9_PictureNumber":"","Stand_9_CharacterName":"","Stand_9_FileName":"","Stand_10_PictureNumber":"","Stand_10_CharacterName":"","Stand_10_FileName":"","Stand_11_PictureNumber":"","Stand_11_CharacterName":"","Stand_11_FileName":"","Stand_12_PictureNumber":"","Stand_12_CharacterName":"","Stand_12_FileName":"","Stand_13_PictureNumber":"","Stand_13_CharacterName":"","Stand_13_FileName":"","Stand_14_PictureNumber":"","Stand_14_CharacterName":"","Stand_14_FileName":"","Stand_15_PictureNumber":"","Stand_15_CharacterName":"","Stand_15_FileName":"","Stand_16_PictureNumber":"","Stand_16_CharacterName":"","Stand_16_FileName":""}},
{"name":"scrollText","status":true,"description":"","parameters":{}},
{"name":"AltSaveScreen","status":true,"description":"セーブ／ロード画面のレイアウトを変更します。","parameters":{}},
{"name":"ArkDG_SaveScreen","status":true,"description":"Alternative save/load screen layout with a lot of functions.","parameters":{"------ICONS------":"","Unused_Save_Icon":"187","Used_Save_Icon":"189","Play_Time_Icon":"220","StatusWindow_Icons":"y","Gold_Icon":"208","Location_Icon":"190","--NAMES AND VERBS--":"","Time_Name":"プレイ時間","Gold_Name":"マネ","Gold_Currency":"","Location_Name":"セーブ場所","Save_Verb":"セーブ","Load_Verb":"ロード","Erase_Verb":"消去","Level_Text":"レベル","--ADVANCED CONFIG--":"","Save_File_Name":"file","Player_Save_Name":"default,n,Tell me your name:","MAX_SAVE_FILES":"20","FILE_COLUMNS":"4","FILE_VISIBLE_ROWS":"3","Use_save_switch":"0","Save_Switch_Id":"53","Actor_Grafics_Mode":"0","Show_MapThumbnail":"0","Title_Screen":"0","--GRAFICS POSITIONS--*":"","File_v_Status_Sizes":"8","Save_File_ID_X":"4","Save_File_ID_Y":"0","Playtime_X":"4","Playtime_Y":"35","Gold_X":"6","Gold_Y":"157","Party_Based_Lvl_Pos":"0","Level_X":"48","Level_Y":"115","Location_X":"-6","Location_Y":"157","Action_Window_X":"0","Action_Window_Y":"0","Action_Window_Width":"150","Actors_X":"60","Actors_Y":"145","Map_Thumbnail_X":"-249","Map_Thumbnail_Y":"5","Map_Thumbnail_Height":"143","Map_Thumbnail_Width":"187","Thumbnail_Compression":"0.7"}},
{"name":"Vitsuno_Difficulty","status":true,"description":"難易度により能力値や報酬倍率を変更できるようになります。","parameters":{"Init Difficulty ID":"2","Use Option":"0","Option Name":"難易度","--(Difficulty ID:1)--":"","1 : Name":"モニア","1 : Param Rate":"0.7,0.7,0.4,0.7,0.4,0.7,0.1,0.7","1 : Drop Rate":"1.0,1.0,0.6,0.6,0.6","--(ID:2)-------------":"","2 : Name":"ノーマル","2 : Param Rate":"1.5,1.1,1.1,1.1,1.1,1.1,1.0,1.1","2 : Drop Rate":"2.0,2.0,1.0,1.0,1.0","--(ID:3)-------------":"","3 : Name":"ハード","3 : Param Rate":"2.5,1.5,1.5,1.5,1.5,1.5,2.5,1.5","3 : Drop Rate":"2.5,2.5,1.2,1.2,1.2","--(ID:4)-------------":"","4 : Name":"ベリーハード","4 : Param Rate":"3.6,1.9,1.9,1.9,1.9,1.9,3.6,1.9","4 : Drop Rate":"3.0,3.0,1.4,1.4,1.4","--(ID:5)-------------":"","5 : Name":"やめなよ。","5 : Param Rate":"5.5,2.5,2.5,2.5,2.5,2.5,5.5,2.5","5 : Drop Rate":"5.0,5.0,1.6,1.6,1.6","--(ID:6)-------------":"","6 : Name":"非推奨","6 : Param Rate":"8.5,4.5,4.5,4.5,4.5,4.5,7.5,4.5","6 : Drop Rate":"15.0,15.0,4.6,4.6,4.6","--(ID:7)-------------":"","7 : Name":"","7 : Param Rate":"1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0","7 : Drop Rate":"1.0,1.0,1.0,1.0,1.0","--(ID:8)-------------":"","8 : Name":"","8 : Param Rate":"1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0","8 : Drop Rate":"1.0,1.0,1.0,1.0,1.0"}},
{"name":"OriginalTimer","status":true,"description":"オリジナルタイマー","parameters":{"TimerSave":"NO"}},
{"name":"BattleRecord","status":true,"description":"戦績プラグイン","parameters":{}},
{"name":"Oggy_SnowTitle","status":true,"description":"タイトル画面に雪を降らせます。","parameters":{"Snow Power":"3"}},
{"name":"WeatherOnBattle","status":true,"description":"戦闘中も天候アニメを表示します","parameters":{}},
{"name":"StateRingIcon","status":true,"description":"リングステートプラグイン","parameters":{"X半径":"64","Y半径":"16","周期":"0","一列配置上限":"1","反時計回り":"OFF","ターン数表示":"ON","ターン数X座標":"0","ターン数Y座標":"0","味方ターン数表示":"ON"}}
];
