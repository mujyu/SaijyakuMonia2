var LAppDefine = {
    
    // デバッグ。trueのときにログを表示する。
    DEBUG_LOG : true,
    DEBUG_MOUSE_LOG : false, // マウス関連の冗長なログ
    // DEBUG_DRAW_HIT_AREA : false, // 当たり判定の可視化
    // DEBUG_DRAW_ALPHA_MODEL : false, // 半透明のモデル描画を行うかどうか。
    
    //  全体の設定
    
    // 画面
    VIEW_MAX_SCALE : 2,
    VIEW_MIN_SCALE : 0.8,

    VIEW_LOGICAL_LEFT : -1,
    VIEW_LOGICAL_RIGHT : 1,

    VIEW_LOGICAL_MAX_LEFT : -2,
    VIEW_LOGICAL_MAX_RIGHT : 2,
    VIEW_LOGICAL_MAX_BOTTOM : -2,
    VIEW_LOGICAL_MAX_TOP : 2,
    
    // モーションの優先度定数
    PRIORITY_NONE : 0,
    PRIORITY_IDLE : 1,
    PRIORITY_NORMAL : 2,
    PRIORITY_FORCE : 3,
    
    // モデルの後ろにある背景の画像ファイル
    //BACK_IMAGE_NAME : "assets/image/back_class_normal.png",

    //  モデル定義
    MODEL_HARU : "img/pictures/haru2/haru.model.json",
//変更してみる　Slip 20160625
//    MODEL_TEST : "img/pictures/test/testmodel.model.json",
    MODEL_TEST : "img/pictures/miranda/miranda.model.json",


    //MODEL_HARU_A : "assets/live2d/haru/haru_01.model.json",
    //MODEL_HARU_B : "assets/live2d/haru/haru_02.model.json",
    MODEL_SHIZUKU : "img/pictures/shizuku/shizuku.model.json",
    MODEL_WANKO : "img/pictures/wanko/wanko.model.json",
    
    // 外部定義ファイル(json)と合わせる
    MOTION_GROUP_IDLE : "idle", // アイドリング
    MOTION_GROUP_EXPRESSION : "expression", // 表情変更(Slip追加)
    MOTION_GROUP_TAP_BODY : "tap_body", // 体をタップしたとき
    MOTION_GROUP_FLICK_HEAD : "flick_head", // 頭を撫でた時
    MOTION_GROUP_PINCH_IN : "pinch_in", // 拡大した時
    MOTION_GROUP_PINCH_OUT : "pinch_out", // 縮小した時
    MOTION_GROUP_SHAKE : "shake", // シェイク

    // 外部定義ファイル(json)と合わせる
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body"
    
};


function LAppLive2DManager()
{
    // console.log("--> LAppLive2DManager()");
    // 3Dバッファの初期化
    var width = Graphics.width;
    var height = Graphics.height;
    

    // ビュー行列
    var ratio = height / width;
    var left = -1;
    var right = 1;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();

    // デバイスに対応する画面の範囲。 Xの左端, Xの右端, Yの下端, Yの上端
    this.viewMatrix.setScreenRect(left, right, bottom, top);
    
    // デバイスに対応する画面の範囲。 Xの左端, Xの右端, Yの下端, Yの上端
    this.viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
                                     LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
                                     LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
                                     LAppDefine.VIEW_LOGICAL_MAX_TOP); 

    this.viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
    this.viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(1,(width / height));
    
    this.viewProjMatrix = new Float32Array(16);
    L2DMatrix44.mul(this.projMatrix.getArray(), this.viewMatrix.getArray(), this.viewProjMatrix);
    
    // モデルデータ
    this.models = [];  // LAppModel
    
    //  サンプル機能
    this.count = -1;
    this.reloadFlg = false; // モデル再読み込みのフラグ
    
    Live2D.init();
    Live2DFramework.setPlatformManager(new PlatformManager);
    
}

LAppLive2DManager.prototype.createModel = function()
{
    // console.log("--> LAppLive2DManager.createModel()");
    
    var model = new LAppModel(this);
    this.models.push(model);
    
    return model;
}


LAppLive2DManager.prototype.getModel = function(idx)
{
    // console.log("--> LAppLive2DManager.getModel(" + idx + ")");
    
    if (idx >= this.models.length) return null;
    
    return this.models[idx];
};


/*
 * モデルを解放する
 * ないときはなにもしない
 */
LAppLive2DManager.prototype.releaseModel = function(idx, gl)
{
    // console.log("--> LAppLive2DManager.releaseModel(" + no + ")");
    
    if (this.models.length <= idx) return;

    this.models[idx].release(gl);
    
    delete this.models[idx];
    this.models.splice(idx, 1);
};

LAppLive2DManager.prototype.releaseAll = function(gl){
    if( this.models.length <= 0) return;
    
    for(var i=0;i<this.models.length; i++)
    {
        this.releaseModel(0, gl);
    }
}


/*
 * モデルの数
 */
LAppLive2DManager.prototype.numModels = function()
{
    return this.models.length;
};


/*
 * ドラッグしたとき、その方向を向く設定する
 */
LAppLive2DManager.prototype.setDrag = function(x, y)
{
    for (var i = 0; i < this.models.length; i++)
    {
        this.models[i].setDrag(x, y);
    }
}

function ModelSettingJson()
{    
    this.NAME = "name";
    this.ID = "id";
    this.MODEL = "model";
    this.TEXTURES = "textures";
    this.HIT_AREAS = "hit_areas";
    this.PHYSICS = "physics";
    this.POSE = "pose";
    this.EXPRESSIONS = "expressions";
    this.MOTION_GROUPS = "motions";
    this.SOUND = "sound";
    this.FADE_IN = "fade_in";
    this.FADE_OUT = "fade_out";
    this.LAYOUT = "layout";
    this.INIT_PARAM = "init_param";
    this.INIT_PARTS_VISIBLE = "init_parts_visible";
    this.VALUE = "val";
    this.FILE = "file";

    this.json = {};
}


ModelSettingJson.prototype.loadModelSetting = function(path, callback)
{    
    var thisRef = this;
    var pm = Live2DFramework.getPlatformManager();
    pm.loadBytes(path, function(buf) {
        var str = String.fromCharCode.apply(null,new Uint8Array(buf));
        thisRef.json = JSON.parse(str);
        callback();
    });
};

		
ModelSettingJson.prototype.getTextureFile = function(n)
{    
    if (this.json[this.TEXTURES] == null || this.json[this.TEXTURES][n] == null)
        return null;
    
    return this.json[this.TEXTURES][n];
}
		

ModelSettingJson.prototype.getModelFile = function()
{        
    return this.json[this.MODEL];
};


ModelSettingJson.prototype.getTextureNum = function()
{    
    if (this.json[this.TEXTURES] == null) return 0;
    
    return this.json[this.TEXTURES].length;
}


ModelSettingJson.prototype.getHitAreaNum = function()
{
    if (this.json[this.HIT_AREAS] == null)
        return 0;

    return this.json[this.HIT_AREAS].length;
}


ModelSettingJson.prototype.getHitAreaID = function(n)
{
    if (this.json[this.HIT_AREAS] == null || 
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.ID];
}


ModelSettingJson.prototype.getHitAreaName = function(n)
{
    if (this.json[this.HIT_AREAS] == null || 
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.NAME];
}


ModelSettingJson.prototype.getPhysicsFile = function()
{
    return this.json[this.PHYSICS];
}


ModelSettingJson.prototype.getPoseFile = function()
{
    return this.json[this.POSE];
}


ModelSettingJson.prototype.getExpressionNum = function()
{
    return (this.json[this.EXPRESSIONS] == null) ? 0 : this.json[this.EXPRESSIONS].length;
}


ModelSettingJson.prototype.getExpressionFile = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.FILE];
}


ModelSettingJson.prototype.getExpressionName = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.NAME];
}


ModelSettingJson.prototype.getLayout = function()
{
    return this.json[this.LAYOUT];
}


ModelSettingJson.prototype.getInitParamNum = function()
{
    return (this.json[this.INIT_PARAM] == null) ? 0 : this.json[this.INIT_PARAM].length;
}


ModelSettingJson.prototype.getMotionNum = function(name)
{
    if (this.json[this.MOTION_GROUPS] == null || 
        this.json[this.MOTION_GROUPS][name] == null)
        return 0;
    
    return this.json[this.MOTION_GROUPS][name].length;
}


ModelSettingJson.prototype.getMotionFile = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null || 
        this.json[this.MOTION_GROUPS][name] == null || 
        this.json[this.MOTION_GROUPS][name][n] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.FILE];
}


ModelSettingJson.prototype.getMotionSound = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null || 
        this.json[this.MOTION_GROUPS][name] == null || 
        this.json[this.MOTION_GROUPS][name][n] == null || 
        this.json[this.MOTION_GROUPS][name][n][this.SOUND] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.SOUND];
}


ModelSettingJson.prototype.getMotionFadeIn = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null || 
        this.json[this.MOTION_GROUPS][name] == null || 
        this.json[this.MOTION_GROUPS][name][n] == null || 
        this.json[this.MOTION_GROUPS][name][n][this.FADE_IN] == null)
        return 1000;

    return this.json[this.MOTION_GROUPS][name][n][this.FADE_IN];
}


ModelSettingJson.prototype.getMotionFadeOut = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null || 
        this.json[this.MOTION_GROUPS][name] == null || 
        this.json[this.MOTION_GROUPS][name][n] == null || 
        this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT] == null)
        return 1000;
    
    return this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT];
}


ModelSettingJson.prototype.getInitParamID = function(n)
{
    if (this.json[this.INIT_PARAM] == null || 
        this.json[this.INIT_PARAM][n] == null)
        return null;
    
    return this.json[this.INIT_PARAM][n][this.ID];
}


ModelSettingJson.prototype.getInitParamValue = function(n)
{
    if (this.json[this.INIT_PARAM] == null || this.json[this.INIT_PARAM][n] == null)
        return NaN;
    
    return this.json[this.INIT_PARAM][n][this.VALUE];
}


ModelSettingJson.prototype.getInitPartsVisibleNum = function()
{
    return (this.json[this.INIT_PARTS_VISIBLE] == null) ? 0 : this.json[this.INIT_PARTS_VISIBLE].length;
}


ModelSettingJson.prototype.getInitPartsVisibleID = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return null;
    return this.json[this.INIT_PARTS_VISIBLE][n][this.ID];
}


ModelSettingJson.prototype.getInitPartsVisibleValue = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return NaN;
    
    return this.json[this.INIT_PARTS_VISIBLE][n][this.VALUE];
}


//============================================================
//============================================================
//  class LAppModel     extends L2DBaseModel         
//============================================================
//============================================================
function LAppModel(live2dMgr)
{
    //L2DBaseModel.apply(this, arguments);
    L2DBaseModel.prototype.constructor.call(this);
    
    this.modelHomeDir = "";
    this.modelSetting = null;
    this.tmpMatrix = new Float32Array(16);
    this.live2dMgr = live2dMgr;
}

LAppModel.prototype = new L2DBaseModel();

/*
 * モデルを初期化する
 */
LAppModel.prototype.load = function(gl, modelSettingPath, callback)
{
    //Slip 2016/08/21
    var texture = new PIXI.Texture(new PIXI.BaseTexture());
    PIXI.Sprite.call(this, texture);
    this._bitmap = null;

    this.setUpdating(true);
    this.setInitialized(false);

    this.modelHomeDir = modelSettingPath.substring(0, modelSettingPath.lastIndexOf("/") + 1); 

    this.modelSetting = new ModelSettingJson();
    
    var thisRef = this;
    
    this.modelSetting.loadModelSetting(modelSettingPath, function(){
        // モデルデータを読み込む
        var path = thisRef.modelHomeDir + thisRef.modelSetting.getModelFile();
        thisRef.loadModelData(path, function(model){
            
			for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
			{
                // テクスチャを読み込む
                var texPaths = thisRef.modelHomeDir + 
                    thisRef.modelSetting.getTextureFile(i);
                
			thisRef.loadTexture(gl, i, texPaths, function() {
                    // すべてのテクスチャを読み込んだ後の処理
                    if( thisRef.isTexLoaded ) {

	            //Slip　2016/07/01 追加　表示フラグ 初期値は非表示
	            thisRef.visible = false;

                        // 表情
                        if (thisRef.modelSetting.getExpressionNum() > 0)
                        {
                            // 古い表情を削除
                            thisRef.expressions = {};
                            
                            for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
                            {
                                var expName = thisRef.modelSetting.getExpressionName(j);
                                var expFilePath = thisRef.modelHomeDir + 
                                    thisRef.modelSetting.getExpressionFile(j);
                                
                                thisRef.loadExpression(expName, expFilePath);
                            }
                        }
                        else
                        {
                            thisRef.expressionManager = null;
                            thisRef.expressions = {};
                        }
                        
                        
                        // 自動目パチ
                        if (thisRef.eyeBlink == null)
                        {
                            thisRef.eyeBlink = new L2DEyeBlink();
                        }
                        
                        // 物理演算
                        if (thisRef.modelSetting.getPhysicsFile() != null)
                        {
                            thisRef.loadPhysics(thisRef.modelHomeDir + 
                                                thisRef.modelSetting.getPhysicsFile());
                        }
                        else
                        {
                            thisRef.physics = null;
                        }
                        
                        
                        // パーツ切り替え
                        if (thisRef.modelSetting.getPoseFile() != null)
                        {
                            thisRef.loadPose(
                                thisRef.modelHomeDir +
                                thisRef.modelSetting.getPoseFile(),
                                function() {
                                    thisRef.pose.updateParam(thisRef.live2DModel);
                                }
                            );
                        }
                        else
                        {
                            thisRef.pose = null;
                        }
                        
                        
                        // レイアウト
                        if (thisRef.modelSetting.getLayout() != null)
                        {
                            var layout = thisRef.modelSetting.getLayout();
                            if (layout["width"] != null)
                                thisRef.modelMatrix.setWidth(layout["width"]);
                            if (layout["height"] != null)
                                thisRef.modelMatrix.setHeight(layout["height"]);

                            if (layout["x"] != null)
                                thisRef.modelMatrix.setX(layout["x"]);
                            if (layout["y"] != null)
                                thisRef.modelMatrix.setY(layout["y"]);
                            if (layout["center_x"] != null)
                                thisRef.modelMatrix.centerX(layout["center_x"]);
                            if (layout["center_y"] != null)
                                thisRef.modelMatrix.centerY(layout["center_y"]);
                            if (layout["top"] != null)
                                thisRef.modelMatrix.top(layout["top"]);
                            if (layout["bottom"] != null)
                                thisRef.modelMatrix.bottom(layout["bottom"]);
                            if (layout["left"] != null)
                                thisRef.modelMatrix.left(layout["left"]);
                            if (layout["right"] != null)
                                thisRef.modelMatrix.right(layout["right"]);
                        }
                        
                        //Slip 2016/07/17 レイアウト変更（左寄り）
                        thisRef.modelMatrix.setX(-1.25);
                        thisRef.modelMatrix.setY(0.85);
                        //Slip 2016/08/21 拡大率
                        thisRef.modelMatrix.setWidth(1.5);

                        for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
                        {
                            // パラメータを上書き
                            thisRef.live2DModel.setParamFloat(
                                thisRef.modelSetting.getInitParamID(j),
                                thisRef.modelSetting.getInitParamValue(j)
                            );
                        }

                        for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
                        {
                            // パーツの透明度を設定
                            thisRef.live2DModel.setPartsOpacity(
                                thisRef.modelSetting.getInitPartsVisibleID(j),
                                thisRef.modelSetting.getInitPartsVisibleValue(j)
                            );
                        }
                        
                        
                        // パラメータを保存。次回のloadParamで読みだされる
                        thisRef.live2DModel.saveParam();
                        thisRef.live2DModel.setGL(gl);
                        
                        // アイドリングはあらかじめ読み込んでおく。
                        thisRef.preloadMotionGroup(LAppDefine.MOTION_GROUP_IDLE);
                        thisRef.mainMotionManager.stopAllMotions();

                        thisRef.setUpdating(false); // 更新状態の完了
                        thisRef.setInitialized(true); // 初期化完了

                        if (typeof callback == "function") callback();
                        
                    }
                });
            }
        });
    });
};


/*
 * GCだけで解放されないメモリを解放
 */
LAppModel.prototype.release = function(gl)
{
    // this.live2DModel.deleteTextures();
    var pm = Live2DFramework.getPlatformManager();

    gl.deleteTexture(pm.texture);
}


/*
 * モーションファイルをあらかじめ読み込む
 */
LAppModel.prototype.preloadMotionGroup = function(name)
{
    var thisRef = this;
    
    for (var i = 0; i < this.modelSetting.getMotionNum(name); i++)
    {
        var file = this.modelSetting.getMotionFile(name, i);
        this.loadMotion(file, this.modelHomeDir + file, function(motion) {
            motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
            motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));
        });
        
    }
}


LAppModel.prototype.update = function()
{
    // console.log("--> LAppModel.update()");

    var thisRef = this;

    if(this.live2DModel == null) 
    {
        console.error("Failed to update.");
        
        return;
    }
    
    //Slip 追加　表示フラグ 2016/07/01
　　thisRef.visible = $gameLive2d._visible;

    //Slip 追加　表情パラメータ 2016/07/10
    this.setExpression($gameLive2d._expression);

    var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    var timeSec = timeMSec / 1000.0;
    var t = timeSec * 2 * Math.PI; // 2πt
    
    // 待機モーション判定
    if (this.mainMotionManager.isFinished())
    {
        // モーションの再生がない場合、待機モーションの中からランダムで再生する
        //this.startRandomMotion(LAppDefine.MOTION_GROUP_IDLE, LAppDefine.PRIORITY_IDLE);
        this.startMotion(LAppDefine.MOTION_GROUP_EXPRESSION,$gameLive2d._motion_no,LAppDefine.PRIORITY_IDLE);
    }

    //-----------------------------------------------------------------		
    
    // 前回セーブされた状態をロード
    this.live2DModel.loadParam();
    
    /* インスタンスが作られていたら更新 */
    
    var update = this.mainMotionManager.updateParam(this.live2DModel); // モーションを更新
    if (!update) {
        // 目ぱち
        if(this.eyeBlink != null) {
            this.eyeBlink.updateParam(this.live2DModel);
        }
    }

    // 状態を保存
    this.live2DModel.saveParam();
    
    //-----------------------------------------------------------------		
    
    // 表情でパラメータ更新（相対変化）
    if (this.expressionManager != null && 
        this.expressions != null && 
        !this.expressionManager.isFinished())
    {
        this.expressionManager.updateParam(this.live2DModel); 
    }

    // ドラッグによる顔の向きの調整
    // -30から30の値を加える
    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", this.dragX * 30, 1); 
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", this.dragY * 30, 1);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", (this.dragX * this.dragY) * -30, 1);

    // ドラッグによる体の向きの調整
    // -10から10の値を加える
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", this.dragX*10, 1); 

    // ドラッグによる目の向きの調整
    // -1から1の値を加える
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1); 
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1);


    // 呼吸など
//    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 
//                                     Number((15 * Math.sin(t / 6.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 
                                    Number((8 * Math.sin(t / 3.5345))), 0.5);
//   this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", 
//                                     Number((10 * Math.sin(t / 5.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 
                                     Number((4 * Math.sin(t / 15.5345))), 0.5);
    this.live2DModel.setParamFloat("PARAM_BREATH", 
                                   Number((0.5 + 0.5 * Math.sin(t / 3.2345))), 1);
    
    // 物理演算
    if (this.physics != null)
    {
        this.physics.updateParam(this.live2DModel); // 物理演算でパラメータ更新
    }
    
    // リップシンクの設定
    if (this.lipSync == null)
    {
        this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y",
                                       this.lipSyncValue);
    }
    
    // ポーズ
    if( this.pose != null ) {
        this.pose.updateParam(this.live2DModel);
    }
        
    this.live2DModel.update();
};


/*
 * 表情をランダムに切り替える
 */
LAppModel.prototype.setRandomExpression = function()
{
    var tmp = [];
    for (var name in this.expressions)
    {
        tmp.push(name);
    }

    var no = parseInt(Math.random() * tmp.length);

    this.setExpression(tmp[no]);
}


/*
 * モーションをランダムで再生する
 */
LAppModel.prototype.startRandomMotion = function(name, priority)
{
    var max = this.modelSetting.getMotionNum(name);
    var no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
}


/*
 * モーションの開始。
 * 再生できる状態かチェックして、できなければ何もしない。
 * 再生出来る場合は自動でファイルを読み込んで再生。
 * 音声付きならそれも再生。
 * フェードイン、フェードアウトの情報があればここで設定。なければ初期値。
 */
LAppModel.prototype.startMotion = function(name, no, priority)
{
    // console.log("startMotion : " + name + " " + no + " " + priority);
    
    var motionName = this.modelSetting.getMotionFile(name, no);
    
    if (motionName == null || motionName == "")
    {
        if (LAppDefine.DEBUG_LOG)
            console.error("Failed to motion.");
        return;
    }

    if (priority == LAppDefine.PRIORITY_FORCE) 
    {
        this.mainMotionManager.setReservePriority(priority);
    }
    else if (!this.mainMotionManager.reserveMotion(priority))
    {
        if (LAppDefine.DEBUG_LOG)
            console.log("Motion is running.")
        return;
    }

    var thisRef = this;
    var motion;

    if (this.motions[name] == null) 
    {
        this.loadMotion(null, this.modelHomeDir + motionName, function(mtn) {
            motion = mtn;
            
            // フェードイン、フェードアウトの設定
            thisRef.setFadeInFadeOut(name, no, priority, motion);
            
        });
    }
    else 
    {
        motion = this.motions[name];
        
        // フェードイン、フェードアウトの設定
        thisRef.setFadeInFadeOut(name, no, priority, motion);
    }
}


LAppModel.prototype.setFadeInFadeOut = function(name, no, priority, motion)
{
    var motionName = this.modelSetting.getMotionFile(name, no);
    
    motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
    motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));
    
    
    if (LAppDefine.DEBUG_LOG)
            console.log("Start motion : " + motionName);

    if (this.modelSetting.getMotionSound(name, no) == null)
    {
        this.mainMotionManager.startMotionPrio(motion, priority);
    }
    else
    {
        var soundName = this.modelSetting.getMotionSound(name, no);
        // var player = new Sound(this.modelHomeDir + soundName);
        
        var snd = document.createElement("audio");
        snd.src = this.modelHomeDir + soundName;
        
        if (LAppDefine.DEBUG_LOG)
            console.log("Start sound : " + soundName);
        
        snd.play();
        this.mainMotionManager.startMotionPrio(motion, priority);
    }
}


/*
 * 表情を設定する
 */
LAppModel.prototype.setExpression = function(name)
{
    var motion = this.expressions[name];
    
    if (LAppDefine.DEBUG_LOG)
        console.log("Expression : " + name);
        
    this.expressionManager.startMotion(motion, false);
}

//Slip 2016/08/21
LAppModel.prototype._renderWebGL_PIXI = PIXI.Sprite.prototype._renderWebGL;

LAppModel.prototype._renderWebGL = function(renderer)
{
    //if(!this.visible || this.alpha <= 0)return;
    
    //var spriteBatch =  renderSession.spriteBatch;
    //spriteBatch.stop();
    
    //Slip 2016/08/21
    if (this._bitmap) {
        this._bitmap.touch();
    }
    if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
        if (this._bitmap) {
            this._bitmap.checkDirty();
        }
        //this._renderWebGL_PIXI(renderer);
    }    

    if (this.initialized && !this.updating)
    {
        this.update();
        this.draw(renderer.gl);
    }
}

/*
 * 描画
 */
LAppModel.prototype.draw = function(gl)
{
    //console.log("--> LAppModel.draw()");
    
    // if(this.live2DModel == null) return;
    
    // 通常
    //MatrixStack.push();
    
    //MatrixStack.multMatrix(this.modelMatrix.getArray());
    
    //this.tmpMatrix = MatrixStack.getMatrix()
    L2DMatrix44.mul(this.live2dMgr.viewProjMatrix, this.modelMatrix.getArray(), this.tmpMatrix);
    this.live2DModel.setMatrix(this.tmpMatrix);
    this.live2DModel.draw();
    
    //MatrixStack.pop();
    
};
        

/*
 * 当たり判定との簡易テスト。
 * 指定IDの頂点リストからそれらを含む最大の矩形を計算し、点がそこに含まれるか判定
 */
LAppModel.prototype.hitTest = function(id, testX, testY)
{
    var len = this.modelSetting.getHitAreaNum();
    for (var i = 0; i < len; i++)
    {        
        if (id == this.modelSetting.getHitAreaName(i))
        {
            var drawID = this.modelSetting.getHitAreaID(i);
            
            return this.hitTestSimple(drawID, testX, testY);
        }
    }
    
    return false; // 存在しない場合はfalse
}
/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */

//============================================================
//============================================================
//  class PlatformManager     extend IPlatformManager
//============================================================
//============================================================
function PlatformManager()
{

}

//============================================================
//    PlatformManager # loadBytes()
//============================================================
PlatformManager.prototype.loadBytes       = function(path/*String*/, callback)
{
    var request = new XMLHttpRequest();
	request.open("GET", path, true);
	request.responseType = "arraybuffer";
	request.onload = function(){
		switch(request.status){
		case 200:
			callback(request.response);
			break;
		default:
			console.error("Failed to load (" + request.status + ") : " + path);
			break;
		}
	}
	request.send(null);
	//return request;
}

//============================================================
//    PlatformManager # loadString()
//============================================================
PlatformManager.prototype.loadString      = function(path/*String*/)
{
    
    this.loadBytes(path, function(buf) {        
        return buf;
    });
    
}

//============================================================
//    PlatformManager # loadLive2DModel()
//============================================================
PlatformManager.prototype.loadLive2DModel = function(path/*String*/, callback)
{
    var model = null;
    
    // load moc
	this.loadBytes(path, function(buf){
		model = Live2DModelWebGL.loadModel(buf);
        callback(model);
	});

}

//============================================================
//    PlatformManager # loadTexture()
//============================================================
PlatformManager.prototype.loadTexture     = function(gl/*GL*/,model/*ALive2DModel*/, no/*int*/, path/*String*/, callback)
{ 
    // load textures
    var loadedImage = new Image();
    loadedImage.src = path;
        
    var thisRef = this;
    loadedImage.onload = function() {
                
        // create texture
        var canvas = document.getElementById("glcanvas");
        //var gl = getWebGLContext(canvas, {premultipliedAlpha : true});
        var texture = gl.createTexture();	 // テクスチャオブジェクトを作成する
        if (!texture){ console.error("Failed to generate gl texture name."); return -1; }

        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);	// imageを上下反転
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
                      gl.UNSIGNED_BYTE, loadedImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);	//imageを上下反転を戻す

        // 画像からWebGLテクスチャ化を生成し、モデルに登録
        model.setTexture(no, texture);// モデルにテクスチャをセット
        
        // テクスチャオブジェクトを解放
        texture = null;
        
        if (typeof callback == "function") callback();
    };
    
    loadedImage.onerror = function() { 
        console.error("Failed to load image : " + path); 
    }
}


//============================================================
//    PlatformManager # parseFromBytes(buf)
//    ArrayBuffer から JSON に変換する
//============================================================
PlatformManager.prototype.jsonParseFromBytes = function(buf){
    
    var jsonStr;
    
    // BOMの有無に応じて処理を分ける
    // UTF-8のBOMは0xEF 0xBB 0xBF（10進数：239 187 191）
    var bomCode = new Uint8Array(buf, 0, 3);
    if (bomCode[0] == 239 && bomCode[1] == 187 && bomCode[2] == 191) {
        jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf, 3));
    } else {
        jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf));
    }
    
    var jsonObj = JSON.parse(jsonStr);
    
    return jsonObj;
};


//============================================================
//    PlatformManager # log()
//============================================================
PlatformManager.prototype.log             = function(txt/*String*/)
{
    console.log(txt);
}

/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */

function MatrixStack() {}

// 行列スタック。4x4行列を基本とするので、16ごとの区切りの配列。
MatrixStack.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

// 現在のスタックの深さ。初期は0でpushするごとに+1。
MatrixStack.depth = 0;

// 現在の行列
MatrixStack.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

// 計算用
MatrixStack.tmp = new Array(16);


/*
 * スタックをリセット
 */
MatrixStack.reset = function()
{
    this.depth = 0;
}
		
		
/*
 * 単位行列にする
 */
MatrixStack.loadIdentity = function()
{
    for (var i = 0; i < 16; i++)
    {
        this.currentMatrix[i] = (i % 5 == 0) ? 1 : 0;
    }
}
		
		
/*
 * 現在の行列を保存
 */
MatrixStack.push = function()
{    
    var offset = this.depth * 16;
    var nextOffset = (this.depth + 1) * 16;
    
    if (this.matrixStack.length < nextOffset + 16)
    {
        this.matrixStack.length = nextOffset + 16;
    }

    for (var i = 0; i < 16; i++)
    {
        this.matrixStack[nextOffset + i] = this.currentMatrix[i];
    }

    this.depth++;
}
		
		
/*
 * 一つ前の行列へ
 */
MatrixStack.pop = function()
{
    this.depth--;
    if (this.depth < 0)
    {
        myError("Invalid matrix stack.");
        this.depth = 0;
    }

    var offset = this.depth * 16;
    for (var i = 0; i < 16; i++)
    {
        this.currentMatrix[i] = this.matrixStack[offset + i];
    }
}
		
		
/*
 * 現在の行列を取得
 */
MatrixStack.getMatrix = function()
{
    return this.currentMatrix;
}
		
		
/*
 * 行列を掛け合わせる
 */
MatrixStack.multMatrix = function(matNew)
{
    var i, j, k;

    for (i = 0; i < 16; i++)
    {
        this.tmp[i] = 0;
    }

    for (i = 0; i < 4; i++)
    {
        for (j = 0; j < 4; j++)
        {
            for (k = 0; k < 4; k++)
            {
                this.tmp[i + j * 4] += this.currentMatrix[i + k * 4] * matNew[k + j * 4];
            }
        }
    }
    for (i = 0; i < 16; i++)
    {
        this.currentMatrix[i] = this.tmp[i];
    }
}
