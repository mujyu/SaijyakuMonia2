
var Live2dCharInitDesc = function()
{
    this.gl = null;
    this.width = 100;// 画面横
    this.height = 100;// 画面縦
    this.type = "Live2D Model Setting";
    this.name ="haru";
    this.model ="img/pictures/haru/haru.moc";
    this.textures =[
            "img/pictures/haru/haru.1024/texture_00.png",
            "img/pictures/haru/haru.1024/texture_01.png",
            "img/pictures/haru/haru.1024/texture_02.png"
        ];
}

var Live2dChar = function(initdesc) {

    PIXI.DisplayObjectContainer.call( this );
    
    this.initdesc = initdesc;

    /*
    * Live2Dモデルのインスタンス
    */
    this.live2DModel = null;
    
    /*
    * アニメーションを停止するためのID
    */
    this.requestID = null;
    
    /*
    * モデルのロードが完了したら true
    */
    this.loadLive2DCompleted = false;
    
    /*
    * モデルの初期化が完了したら true
    */
    this.initLive2DCompleted = false;
    
    /*
    * WebGL Image型オブジェクトの配列
    */
    this.loadedTextures = [];
    
    
    
    // Live2Dの初期化
    Live2D.init();
    console.log("Live2D init");


	// Init and start Loop
	this.initLoop(initdesc.gl);
};
// constructor
Live2dChar.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
Live2dChar.prototype.constructor = Live2dChar;


Live2dChar.prototype.initLoop = function(gl/*HTML5 canvasオブジェクト*/) 
{

	//var gl = Simple.getWebGLContext(canvas, para);
	if (!gl) {
        this.myerror("Failed to create WebGL context.");
        return;
    }
    
	// mocファイルからLive2Dモデルのインスタンスを生成
    {
        var scope = this;
        this.loadBytes(this.initdesc.model, function(buf){
            //console.log("load byte has done anyway");
            scope.live2DModel = Live2DModelWebGL.loadModel(buf);
            //console.log(scope.live2DModel);
        });
        //console.log("load loadBytes");
    }

	// テクスチャの読み込み
    {
        var loadCount = 0;
        var texMax = this.initdesc.textures.length;
        var scope = this;
        for(var i = 0; i < texMax; i++){
            var newimage = new Image();
            var texpath = scope.initdesc.textures[i];

            newimage.src = texpath;
            var tex = new PIXI.BaseTexture(newimage);
            scope.loadedTextures[i] = tex;
        }
        console.log("load textures");
    }

};
Live2dChar.prototype._renderWebGL = function(renderSession)
{
    // if the sprite is not visible or the alpha is 0 then no need to render this element
    if(!this.visible || this.alpha <= 0)return;
    
    var spriteBatch =  renderSession.spriteBatch;
    spriteBatch.stop();
    
    //this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, true);
    this.draw(this.initdesc.gl);
    spriteBatch.start();
    renderSession.shaderManager.setShader(renderSession.shaderManager.complexPrimitiveShader);
};


Live2dChar.prototype.draw = function(gl/*WebGLコンテキスト*/)
{
	// Canvasをクリアする
	//gl.clear(gl.COLOR_BUFFER_BIT);
    //console.log("try draw");
	// Live2D初期化
	if( ! this.live2DModel )
    {
        console.log("live2DModel has not loaded yet =" + this.live2DModel);
        return; //ロードが完了していないので何もしないで返る
    }
	
    for(var i=0;i<this.loadedTextures.length;++i){
        if( !this.loadedTextures[i].hasLoaded){
            return;
        }
    }
   
	// ロード完了後に初回のみ初期化する
	if( ! this.initLive2DCompleted ){
        //console.log("init live2d model");
		this.initLive2DCompleted = true;

        // 画像からWebGLテクスチャを生成し、モデルに登録
        for( var i = 0; i < this.loadedTextures.length; i++ ){
            //Image型オブジェクトからテクスチャを生成
            var texName = this.createTexture(gl, this.loadedTextures[i].source);
            
            this.live2DModel.setTexture(i, texName); //モデルにテクスチャをセット
        }

        // OpenGLのコンテキストをセット
        this.live2DModel.setGL(gl);
        

        // 表示位置を指定するための行列を定義する
        
            // ビュー行列
        var ratio = this._height / this._width;
        var left = -1;
        var right = 1;
        var bottom = -ratio;
        var top = ratio;

        var viewMatrix = new L2DViewMatrix();

        // デバイスに対応する画面の範囲。 Xの左端, Xの右端, Yの下端, Yの上端
        viewMatrix.setScreenRect(left, right, bottom, top);

        //viewMatrix.setMaxScale(2);
        //viewMatrix.setMinScale(0.8);
        console.log("view=" + this.getDebugMsgForMatrix(viewMatrix));

        var projMatrix = new L2DMatrix44();
        projMatrix.multScale(1, (this.initdesc.width / this.initdesc.height));
        console.log("proj=" + this.getDebugMsgForMatrix(projMatrix));
        //var s = 2.0 / this.live2DModel.getCanvasWidth(); //canvasの横幅を-1..1区間に収める
        //var matrix4x4 = [ s,0,0,0 , 0,-s,0,0 , 0,0,1,0 , -1.0,1,0,1 ];
        
        // ワールドマトリクス
        var worldMatrix = new L2DModelMatrix(this.live2DModel.getCanvasWidth(), this.live2DModel.getCanvasHeight());
        worldMatrix.setWidth(1);
        worldMatrix.setCenterPosition(0,0);
            console.log("world=" + this.getDebugMsgForMatrix(worldMatrix));
        var matrix4x4 = new Float32Array(16);
        L2DMatrix44.mul(projMatrix.getArray(), viewMatrix.getArray(), matrix4x4);
        
        L2DMatrix44.mul(matrix4x4, worldMatrix.getArray(), matrix4x4);
        this.live2DModel.setMatrix( matrix4x4 );
        //var s = 2.0 / this.live2DModel.getCanvasWidth(); //canvasの横幅を-1..1区間に収める
        //var matrix4x4 = [ s,0,0,0 , 0,-s,0,0 , 0,0,1,0 , -1.0,1,0,1 ];
        //var matrix4x4 = [ s,0,0,0 , 0,s,0,0 , 0,0,1,0 , 0,0,0,1 ];
        //this.live2DModel.setMatrix(matrix4x4);
		// 初期化の時にキャンパスサイズが必要
		// 縦横比は維持したまま、移動やサイズの変更ができる。
		// この場合は横幅を10に、スプライトの中心を原点にしている。
		/*var mmat = new L2DModelMatrix(this.live2DModel.getCanvasWidth(), this.live2DModel.getCanvasHeight());
		mmat.setWidth( 2 );
		mmat.setCenterPosition(0,0);

		this.live2DModel.setMatrix( mmat.getArray() );
*/
        
	}

	// キャラクターのパラメータを適当に更新
    var t = UtSystem.getTimeMSec() * 0.001 * 2 * Math.PI; //1秒ごとに2π(1周期)増える
    var cycle = 3.0; //パラメータが一周する時間(秒)
    // PARAM_ANGLE_Xのパラメータが[cycle]秒ごとに-30から30まで変化する
    this.live2DModel.setParamFloat("PARAM_ANGLE_X", 30 * Math.sin(t/cycle));

    
    // Live2Dモデルを更新して描画
    this.live2DModel.update(); // 現在のパラメータに合わせて頂点等を計算
    this.live2DModel.draw();	// 描画
};

Live2dChar.prototype.getDebugMsgForMatrix = function(m){
    //console.log(m);
    var arr = m.getArray();
    var sz = "";
    for(var i=0;i<arr.length;++i){
        sz += arr[i] + " ";
    }
    return sz;
}


/*
* Image型オブジェクトからテクスチャを生成
*/
Live2dChar.prototype.createTexture = function(gl/*WebGLコンテキスト*/, image/*WebGL Image*/) 
{
	var texture = gl.createTexture(); //テクスチャオブジェクトを作成する
	if ( !texture ){
        this.mylog("Failed to generate gl texture name.");
        return -1;
    }
    
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);	//imageを上下反転
    
	gl.activeTexture( gl.TEXTURE0 );
	gl.bindTexture( gl.TEXTURE_2D , texture );
	gl.texImage2D( gl.TEXTURE_2D , 0 , gl.RGBA , gl.RGBA , gl.UNSIGNED_BYTE , image);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    
    
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture( gl.TEXTURE_2D , null );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);	//imageを上下反転を戻す
	return texture;
};


/*
* ファイルをバイト配列としてロードする
*/
Live2dChar.prototype.loadBytes = function(path , callback)
{
    //console.log("loadBytes");
	var request = new XMLHttpRequest();
    //console.log(request);
    
	request.open("GET", path , true);
	request.responseType = "arraybuffer";
    var scope = this;
	request.onload = function(){
		switch( request.status ){
		case 200:
			callback( request.response );
			break;
		default:
            Graphics.printError( "Failed to load (" + request.status + ") : " + path );
			break;
		}
	}
    
    request.send(null); 
};