require=function e(t,i,n){function r(a,s){if(!i[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var l=i[a]={exports:{}};t[a][0].call(l.exports,function(e){var i=t[a][1][e];return r(i?i:e)},l,l.exports,e,t,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)r(n[a]);return r}({AudioControl:[function(e,t){Fire._RFpush("38f164e9c2b844baa46f0d4d7d7205dd");var i={};i.play_finished=function(){var e=Fire.Entity.find("/Audio/done"),t=e.getComponent(Fire.AudioSource);t.play()},i.play_bobo=function(){var e=Fire.Entity.find("/Audio/bobo"),t=e.getComponent(Fire.AudioSource);t.play()},t.exports=i,Fire._RFpop()},{}],Board:[function(e,t){Fire._RFpush("fbbb16a7f4a84ff59ef689649c3168ec");var i=e("Cell"),n=e("Cube"),r=Fire.defineComponent(function(){this._tempGrid=null,this.delCubeRowList=[],this.delCubeColList=[]});r.prop("_board",[],Fire.HideInInspector),r.prop("grid",null,Fire.ObjectType(Fire.Entity),Fire.HideInInspector),r.prop("count",new Fire.Vec2(10,10)),r.prop("size",new Fire.Vec2(30,30)),r.prop("spacing",2,Fire.Integer),r.prop("_createOrClean",!1,Fire.HideInInspector),r.getset("createOrClean",function(){return this._createOrClean},function(e){e!=this._createOrClean&&(this._createOrClean=e,this._createOrClean?this.create():this.clean())}),r.prototype.create=function(){this._board=[],this._tempGrid||(this._tempGrid=Fire.Entity.find("/Prefabs/cube"));for(var e=this.size.x+this.spacing,t=this.size.y+this.spacing,n=0,r=this.count.x;r>n;++n){this._board[n]=[];for(var o=0,r=this.count.y;r>o;++o){var a=Fire.instantiate(this._tempGrid);a.parent=this.entity,a.name=n+":"+o,a.transform.position=new Fire.Vec2(n*e,o*t);var s=(a.getComponent(Fire.SpriteRenderer),a.addComponent(i));s.offset=new Fire.Vec2(n,o),this._board[n][o]=s}}this._createOrClean=!0},r.prototype.onLoad=function(){this.entity.on("putCube",function(e){var t=e.target.getComponent(i);this.delline(t)}.bind(this))},r.prototype.delline=function(e){var t=!0,i=!0,n=null,r=0,o=0,a=[],s=[];for(r=e.offset.x;r>=0;--r){if(n=this.getCell(r,e.offset.y),!n.hasCube){t=!1;break}a.push(n)}if(t)for(r=e.offset.x;r<this.count.x;++r){if(n=this.getCell(r,e.offset.y),!n.hasCube){t=!1;break}a.push(n)}for(o=e.offset.y;o>=0;--o){if(n=this.getCell(e.offset.x,o),!n.hasCube){i=!1;break}s.push(n)}if(i)for(o=e.offset.y;o<this.count.y;++o){if(n=this.getCell(e.offset.x,o),!n.hasCube){i=!1;break}s.push(n)}t&&this.delCubeRowList.push(a),i&&this.delCubeColList.push(s)},r.prototype.clean=function(){for(var e=0,t=0,e=this.count.x;e>t;++t)for(var i=0,e=this.count.y;e>i;++i)this._board[t][i]&&(this._board[t][i].entity.destroy(),Fire.Engine.isPlaying||Fire.FObject._deferredDestroy());this._board=[],this._createOrClean=!1},r.prototype.getCell=function(e,t){return e>-1&&10>e&&t>-1&&10>t?this._board[e][t]:null},r.prototype.canPutCubeToCell=function(e,t){for(var i=0,r=e._children.length;r>i;++i){var o=e._children[i].getComponent(n),a=o.position,s=this.getCell(t.x+a.x,t.y+a.y);if(!s||s.hasCube&&!s.readyClear)return!1}return!0},t.exports=r,Fire._RFpop()},{Cell:"Cell",Cube:"Cube"}],Button:[function(){Fire._RFpush("cc304a3ca44e43488b9c400d9fab8945");var e=Fire.defineComponent(function(){this._btnRender=null});e.prop("normal",null,Fire.ObjectType(Fire.Sprite)),e.prop("hover",null,Fire.ObjectType(Fire.Sprite)),e.prop("pressed",null,Fire.ObjectType(Fire.Sprite)),e.prop("disabled",null,Fire.ObjectType(Fire.Sprite)),e.prototype.onLoad=function(){this._btnRender=this.entity.getComponent(Fire.SpriteRenderer),this._btnRender.sprite=this.normal,this.entity.on("mousedown",function(){this._btnRender.sprite=this.pressed}.bind(this)),this.entity.on("mouseup",function(){this._btnRender.sprite=this.normal}.bind(this))},Fire._RFpop()},{}],Cell:[function(e,t){Fire._RFpush("d2a358201e6d4a36b7fd92369c3dd36d");var i=Fire.defineComponent();i.prop("offset",new Fire.Vec2(0,0)),i.prop("hasCube",!1),i.prop("cube",null,Fire.HideInInspector),i.prop("readyClear",!1,Fire.HideInInspector),i.prototype.clean=function(){this.entity.destroy()},i.prototype.putCube=function(e){e.entity.parent=this.entity,e.transform.position=new Fire.Vec2(0,0),this.hasCube=!0,this.cube=e,this.entity.dispatchEvent(new Fire.Event("putCube",!0)),this.entity.on("curb clear",function(){this.hasCube=!1,this.readyClear=!1,this.cube=null}.bind(this))},t.exports=i,Fire._RFpop()},{}],CubeGroup:[function(e,t){Fire._RFpush("931bfcf8d031410f9e7daeca279cedae");var i=Fire.defineComponent(function(){this.stopAnimation=!0}),n=e("Cube"),r=null,o=e("AudioControl"),a=null,s=null;i.prop("_creatCubes",!1,Fire.HideInInspector),i.prop("_creatThree",!1,Fire.HideInInspector),i.getset("CreatThree",function(){return this._creatThree},function(e){e!=this._creatThree&&(this._creatThree=e),e&&this.create3(32)}),i.getset("CreatCubes",function(){return this._creatCubes},function(e){if(e!==this._creatCubes)if(this._creatCubes=e,e){this.createRandom(32)}else this.clear()});var u=[{y:0,x:0},{y:0,x:-1},{y:0,x:1},{y:-1,x:0},{y:-1,x:1},{y:-1,x:-1},{y:1,x:-1},{y:1,x:0},{y:1,x:1}],p=[{y:1,x:0},{y:0,x:0},{y:0,x:1}],l=[{y:0,x:0},{y:-1,x:0},{y:0,x:1}],c=[{y:0,x:0},{y:0,x:-1},{y:-1,x:0}],h=[{y:0,x:0},{y:0,x:-1},{y:1,x:0}],d=[{y:0,x:0},{y:1,x:0},{y:2,x:0},{y:0,x:1},{y:0,x:2}],f=[{y:0,x:0},{y:0,x:1},{y:0,x:2},{y:-1,x:0},{y:-2,x:0}],m=[{y:0,x:0},{y:0,x:-1},{y:0,x:-2},{y:-1,x:0},{y:-2,x:0}],_=[{y:0,x:0},{y:0,x:-1},{y:0,x:-2},{y:2,x:0},{y:1,x:0}],y=[{y:0,x:0},{y:0,x:1},{y:1,x:0},{y:1,x:1}],F=[{y:0,x:0}],C=[{y:0,x:0},{y:0,x:1}],b=[{y:0,x:0},{y:1,x:0}],g=[{y:0,x:0},{y:0,x:-1},{y:0,x:1}],v=[{y:0,x:0},{y:1,x:0},{y:-1,x:0}],x=[{y:0,x:0},{y:0,x:-1},{y:0,x:1},{y:0,x:2}],A=[{y:0,x:0},{y:-1,x:0},{y:1,x:0},{y:2,x:0}],w=[{y:0,x:0},{y:0,x:-1},{y:0,x:1},{y:0,x:2},{y:0,x:-2}],T=[{y:0,x:0},{y:-1,x:0},{y:-2,x:0},{y:1,x:0},{y:2,x:0}];i.prototype._gridType=[u,y,F,p,l,c,h,d,f,m,_,C,b,g,v,x,A,w,T];var I=function(e){return e[e.Box_9=0]="Box_9",e[e.Box_4=1]="Box_4",e[e.Box_1=2]="Box_1",e[e.Curved_3_0=3]="Curved_3_0",e[e.Curved_3_90=4]="Curved_3_90",e[e.Curved_3_180=5]="Curved_3_180",e[e.Curved_3_270=6]="Curved_3_270",e[e.Curved_5_0=7]="Curved_5_0",e[e.Curved_5_90=8]="Curved_5_90",e[e.Curved_5_180=9]="Curved_5_180",e[e.Curved_5_270=10]="Curved_5_270",e[e.Line_2_0=11]="Line_2_0",e[e.Line_2_90=12]="Line_2_90",e[e.Line_3_0=13]="Line_3_0",e[e.Line_3_90=14]="Line_3_90",e[e.Line_4_0=15]="Line_4_0",e[e.Line_4_90=16]="Line_4_90",e[e.Line_5_0=17]="Line_5_0",e[e.Line_5_90=18]="Line_5_90",e}({});i.prop("_select",I.Box_9,Fire.Enum(I),Fire.HideInInspector),i.getset("select",function(){return this._select},function(e){e!=this._select&&(this._select=e)},Fire.Enum(I)),i.prototype.gridType={Box_9:u,Box_4:y,Box_1:F,Curved_3_0:p,Curved_3_90:l,Curved_3_180:c,Curved_3_270:h,Curved_5_0:d,Curved_5_90:f,Curved_5_180:m,Curved_5_270:_,Line_2_0:C,Line_2_90:b,Line_3_0:g,Line_3_90:v,Line_4_0:x,Line_4_90:A,Line_5_0:w,Line_5_90:T};var R=new Fire.Color(97/255,190/255,227/255,1),L=new Fire.Color(253/255,197/255,76/255,1),S=new Fire.Color(218/255,192/255,90/255,1),M=new Fire.Color(83/255,211/255,174/255,1),E=new Fire.Color(229/255,107/255,129/255,1),D=new Fire.Color(243/255,80/255,12/255,1),G=new Fire.Color(85/255,192/255,67/255,1);i.prototype._Colors=[R,L,S,M,E,D,G],i.prototype.Colors={blue:R,yellow:L,red:S,lightblue:M,pink:E,orange:D,green:G};var P=0,O=0,V=!0,B=null;i.prototype.create=function(e,t,i){var r=this._Colors[Math.floor(7*Math.random())];i&&(r=i);var o=this.entity.find("../Prefabs/cube"),s=new Fire.Entity("group");s.parent=this.entity;for(var u=0;u<t.length;u++){var p=Fire.instantiate(o);p.parent=s,p.name="child_"+u;var l=p.addComponent(n);l.position=new Fire.Vec2(t[u].x,t[u].y),p.getComponent(Fire.SpriteRenderer).color=r,p.transform.position=new Vec2(t[u].x*e,t[u].y*e)}return s.transform.scale=new Fire.Vec2(.8,.8),s.on("mousedown",function(){V=!1,B=s,B.transform.scale=new Fire.Vec2(.9,.9)}.bind(this)),s.on("mouseup",function(){B=null}.bind(this)),a=s,s},i.prototype.createRandom=function(e){var t=0;t=Math.floor(19*Math.random());var i=this._gridType[t];return this.create(e,i)},i.prototype.move=function(e,t,i){var n=r,o=new Fire.Vec2(e,t),a=s.screenToWorld(o);i.transform.position=new Fire.Vec2(a.x+n.x,a.y-n.y)};var k=[],H=[];i.prototype.create3=function(e){H=[],k=[];for(var t=0;3>t;t++){var i=this.createRandom(e);i.transform.position=new Fire.Vec2(-5*e+5*e*t,i.transform.position.y);var n={id:i.id,position:i.transform.position};H.push(n),k.push(i)}return this.entity.transform.scale=new Fire.Vec2(0,0),this.play(),k},i.prototype.clear=function(){try{a.destroy()}catch(e){}},i.prototype.resetPosition=function(e){for(var t=(e.transform.position,0);t<k.length;t++)if(k[t].id===e.id)for(var i=0;i<H.length;i++)H[i].id===e.id&&(e.transform.position=H[i].position,e.transform.scale=new Fire.Vec2(.8,.8))},i.prototype.onLoad=function(){if(Fire.Engine.isPlaying){var t=e("Game");Fire.Input.on("mousedown",function(e){P=e.screenX,O=e.screenY}.bind(this)),Fire.Input.on("mousemove",function(e){V||this.move(e.screenX,e.screenY,B)}.bind(this)),Fire.Input.on("mouseup",function(){if(V=!0,B){var e=t.instance.putBoard(B);e||this.resetPosition(B),o.play_bobo(),B=null}}.bind(this)),s=Fire.Entity.find("/Main Camera").getComponent(Fire.Camera),r=Fire.Entity.find("/CubeGroup").transform.position}},i.prototype.play=function(){this.stopAnimation=!1},i.prototype.animation=function(){this.entity.transform.scale=new Fire.Vec2(this.entity.transform.scale.x+5*Fire.Time.deltaTime,this.entity.transform.scale.x+5*Fire.Time.deltaTime),this.entity.transform.scale.x+Fire.Time.deltaTime>=1&&(this.entity.transform.scale=new Fire.Vec2(1,1),this.stopAnimation=!0)},i.prototype.update=function(){this.stopAnimation||this.animation()},t.exports=i,Fire._RFpop()},{AudioControl:"AudioControl",Cube:"Cube",Game:"Game"}],Cube:[function(e,t){Fire._RFpush("1b94adf1d4114c4480e3a5fe8e59c19b");var i=Fire.defineComponent(function(){this.stopAnimation=!0});i.prop("_position",new Fire.Vec2(0,0),Fire.HideInInspector),i.prop("_play",!1,Fire.HideInInspector),i.getset("play",function(){return this._play},function(e){e!==this._play&&(this._play=e),e&&this.playAnimation()}),i.getset("position",function(){return this._position},function(e){e!=this._position&&(this._position=e)}),i.prototype.clear=function(){this.entity.dispatchEvent(new Fire.Event("curb clear",!0)),this.entity.destroy()},i.prototype.playAnimation=function(){this.stopAnimation=!1},i.prototype.animation=function(){this.entity.transform.scale=new Fire.Vec2(this.entity.transform.scale.x-5*Fire.Time.deltaTime,this.entity.transform.scale.x-5*Fire.Time.deltaTime),this.entity.transform.scale.x-Fire.Time.deltaTime<=0&&(this.stopAnimation=!0,this.clear())},i.prototype.update=function(){this.stopAnimation||this.animation()},t.exports=i,Fire._RFpop()},{}],GameMenu:[function(){Fire._RFpush("6634f146f45a4791a3ab864e29497a89");var e=Fire.defineComponent(function(){});e.prototype.onLoad=function(){this.homeUUID="e41bbde0-cee8-475f-b96c-169db4f6d69d",this.gameUUID="e958312b-03e3-4a03-a2fe-6e7f40f634d6",this.menu=Fire.Entity.find("/Menu");var e=Fire.Entity.find("/Button/btn_Menu");e.on("mouseup",function(){this.menu.active=!0}.bind(this));var t=Fire.Entity.find("/Menu/btn_Continue");t.on("mouseup",function(){this.menu.active=!1}.bind(this));var i=Fire.Entity.find("/Menu/btn_Restart");i.on("mouseup",function(){Fire.Engine.loadScene(this.gameUUID)}.bind(this));var n=Fire.Entity.find("/Menu/btn_Home");n.on("mouseup",function(){Fire.Engine.loadScene(this.homeUUID)}.bind(this));var r=Fire.Entity.find("/GameOver/btn_Restart");r.on("mouseup",function(){Fire.Engine.loadScene(this.gameUUID)}.bind(this));var o=Fire.Entity.find("/GameOver/btn_Home");o.on("mouseup",function(){Fire.Engine.loadScene(this.homeUUID)}.bind(this))},Fire._RFpop()},{}],Game:[function(e,t){Fire._RFpush("ff42982fad42403380ce38c75cf236f8");var i=e("Board"),n=(e("Cell"),e("Cube")),r=e("CubeGroup"),o=e("AudioControl"),a=Fire.defineComponent(function(){this.board=null,this.cubeGroup=null,this.cubeGroupList=[],this.fraction=0,this.idleCellList=[],this.scoreText=null,this._scoreValue=null,this.isJump=!1,this.jumpFirst=!0,a.instance=this});a.instance=null,a.prototype.onLoad=function(){this.tempCube||(this.tempCube=Fire.Entity.find("/Prefabs/cube")),this.scoreText=Fire.Entity.find("/GameOver/score");var e=Fire.Entity.find("/Board");this.board=e.getComponent(i),this.board.create();var t=Fire.Entity.find("/CubeGroup");this.cubeGroup=t.getComponent(r),0===this.cubeGroupList.length&&(this.cubeGroupList=this.cubeGroup.create3(32));var n=Fire.Entity.find("/Score/value");this._scoreValue=n.getComponent(Fire.BitmapText)},a.prototype.update=function(){this.isJump&&this.jumpAnimation()},a.prototype.putBoard=function(e){if(e||e._children){var t=this.board.transform.getWorldToLocalMatrix(),i=t.transformPoint(e.transform.worldPosition),r=Math.round(i.x/(this.board.size.x+this.board.spacing/2)),o=Math.round(i.y/(this.board.size.y+this.board.spacing/2)),a=new Vec2(r,o),s=this.board.canPutCubeToCell(e,a),u=e._children.length;if(s){var p=0,l=0,c=[];for(p=0,l=e._children.length;l>p;++p)c.push(e._children[p]);for(p=0,l=c.length;l>p;++p){var h=c[p].getComponent(n),i=h.position,d=this.board.getCell(a.x+i.x,a.y+i.y);d.putCube(h)}for(p=0,l=this.cubeGroupList.length;l>p;++p){var f=this.cubeGroupList[p];if(f.id===e.id){this.cubeGroupList.splice(p,1);break}}this.addFraction(u),e.destroy(),this.removeLine(),this.updateIdleCellList(),0===this.cubeGroupList.length&&(this.cubeGroupList=this.cubeGroup.create3(32));var m=this.pass();m||this.gameOver()}return s}},a.prototype.removeLine=function(){(this.board.delCubeRowList.length>0||this.board.delCubeColList.length>0)&&o.play_finished();var e=0,t=0,i=null;for(e=0;e<this.board.delCubeRowList.length;e++)for(i=this.board.delCubeRowList[e],t=0;t<i.length;t++)i[t].readyClear=!0,i[t].cube.playAnimation();for(e=0;e<this.board.delCubeColList.length;e++)for(i=this.board.delCubeColList[e],t=0;t<i.length;t++)i[t].readyClear=!0,i[t].cube.playAnimation();this.board.delCubeRowList=[],this.board.delCubeColList=[],this._scoreValue.transform.scale=new Fire.Vec2(.5,.5),this.isJump=!0},a.prototype.addFraction=function(e){var t=this.fraction,i=this.board.delCubeRowList.length,n=i*this.board.count.x;i>1&&(n=(1+.5*(i-1))*this.board.count.x*i),i=this.board.delCubeColList.length;var r=i*this.board.count.x;i>1&&(r=(1+.5*(i-1))*this.board.count.y*i),this.fraction=t+e+n+r,this._scoreValue.text=this.fraction},a.prototype.updateIdleCellList=function(){this.idleCellList=[];for(var e=0;e<this.board.count.x;++e)for(var t=0;t<this.board.count.x;++t){var i=this.board.getCell(e,t);(!i.hasCube||i.cube&&i.readyClear)&&this.idleCellList.push(i)}},a.prototype.jumpAnimation=function(){this.jumpFirst?(this._scoreValue.transform.scaleX+=10*Fire.Time.deltaTime,this._scoreValue.transform.scaleY+=10*Fire.Time.deltaTime,this._scoreValue.transform.scaleX>=1.5&&(this.jumpFirst=!1)):(this._scoreValue.transform.scaleX-=10*Fire.Time.deltaTime,this._scoreValue.transform.scaleY-=10*Fire.Time.deltaTime,this._scoreValue.transform.scaleX<=1&&(this._scoreValue.transform.scale=new Fire.Vec2(1,1),this.isJump=!1,this.jumpFirst=!0))},a.prototype.pass=function(){for(var e=this.cubeGroupList,t=this.idleCellList,i=e.length,n=t.length,r=!1,o=0;i>o;o++){for(var a=0;n>a;a++){var s=new Fire.Vec2(t[a].offset.x,t[a].offset.y),r=this.board.canPutCubeToCell(e[o],s);if(r)break}if(r)break}return r},a.prototype.gameOver=function(){var e=this.scoreText.getComponent(Fire.BitmapText);e.text=this.fraction;var t=Fire.Entity.find("/GameOver");t.transform.scale=new Fire.Vec2(1,1),this.isScore=!0},t.exports=a,Fire._RFpop()},{AudioControl:"AudioControl",Board:"Board",Cell:"Cell",Cube:"Cube",CubeGroup:"CubeGroup"}],MainMenu:[function(){Fire._RFpush("49613786df3344ea98ede46a5af69786");var e=Fire.defineComponent(function(){});e.prototype.onLoad=function(){this.gameUUID="e958312b-03e3-4a03-a2fe-6e7f40f634d6";var e=Fire.Entity.find("/btn_play");e.on("mouseup",function(){Fire.Engine.loadScene(this.gameUUID)}.bind(this))},Fire._RFpop()},{}],Toggle:[function(){Fire._RFpush("e0ac2b810a73466d9f305d401ca23234");var e=Fire.defineComponent(function(){this._btnRender=null,this._tiggle=!1});e.prop("normal",null,Fire.ObjectType(Fire.Sprite)),e.prop("pressed",null,Fire.ObjectType(Fire.Sprite)),e.prototype.onLoad=function(){this._btnRender=this.entity.getComponent(Fire.SpriteRenderer),this._btnRender.sprite=this.normal,this.entity.on("mousedown",function(){this._tiggle=!this._tiggle,this._btnRender.sprite=this._tiggle?this.pressed:this.normal}.bind(this))},Fire._RFpop()},{}],"audio-clip":[function(e,t){Fire._RFpush(),Fire.AudioClip=function(){var e=Fire.extend("Fire.AudioClip",Fire.Asset);return e.prop("rawData",null,Fire.RawType("audio")),e.get("buffer",function(){return Fire.AudioContext.getClipBuffer(this)}),e.get("length",function(){return Fire.AudioContext.getClipLength(this)}),e.get("samples",function(){return Fire.AudioContext.getClipSamples(this)}),e.get("channels",function(){return Fire.AudioContext.getClipChannels(this)}),e.get("frequency",function(){return Fire.AudioContext.getClipFrequency(this)}),e}(),Fire.AudioClip.prototype.createEntity=function(e){var t=new Fire.Entity(this.name),i=t.addComponent(Fire.AudioSource);i.clip=this,e&&e(t)},t.exports=Fire.AudioClip,Fire._RFpop()},{}],"audio-legacy":[function(){Fire._RFpush(),function(){function e(e,t){var i=document.createElement("audio");i.addEventListener("canplaythrough",function(){t(null,i)},!1),i.addEventListener("error",function(i){t('LoadAudioClip: "'+e+'" seems to be unreachable or the file is empty. InnerMessage: '+i,null)},!1),i.src=e,i.load()}var t=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;if(!t){var i={};Fire.LoadManager.registerRawTypes("audio",e),i.initSource=function(e){e._audio=null},i.getCurrentTime=function(e){return e&&e._audio&&e._playing?e._audio.currentTime:0},i.updateTime=function(e,t){if(e&&e._audio){{e._audio.duration}e._audio.currentTime=t}},i.updateMute=function(e){e&&e._audio&&(e._audio.muted=e.mute)},i.updateVolume=function(e){e&&e._audio&&(e._audio.volume=e.volume)},i.updateLoop=function(e){e&&e._audio&&(e._audio.loop=e.loop)},i.updateAudioClip=function(e){e&&e.clip&&(e._audio=e.clip.rawData)},i.pause=function(e){e._audio&&e._audio.pause()},i.stop=function(e){e._audio&&(e._audio.pause(),e._audio.currentTime=0)},i.play=function(e){e&&e.clip&&e.clip.rawData&&(!e._playing||e._paused)&&(this.updateAudioClip(e),this.updateVolume(e),this.updateLoop(e),this.updateMute(e),e._audio.play(),e._audio.addEventListener("ended",function(){e.onPlayEnd.bind(e)},!1))},i.getClipBuffer=function(){return Fire.error("Audio does not contain the attribute!"),null},i.getClipLength=function(){return target.clip.rawData.duration},i.getClipSamples=function(){return Fire.error("Audio does not contain the attribute!"),null},i.getClipChannels=function(){return Fire.error("Audio does not contain the attribute!"),null},i.getClipFrequency=function(){return Fire.error("Audio does not contain the attribute!"),null},Fire.AudioContext=i}}(),Fire._RFpop()},{}],"audio-source":[function(){Fire._RFpush();var e=function(){var e=Fire.extend("Fire.AudioSource",Fire.Component,function(){this._playing=!1,this._paused=!1,this._startTime=0,this._lastPlay=0,this._buffSource=null,this._volumeGain=null,this.onEnd=null});return Fire.addComponentMenu(e,"AudioSource"),Object.defineProperty(e.prototype,"isPlaying",{get:function(){return this._playing&&!this._paused}}),Object.defineProperty(e.prototype,"isPaused",{get:function(){return this._paused}}),Object.defineProperty(e.prototype,"time",{get:function(){return Fire.AudioContext.getCurrentTime(this)},set:function(e){Fire.AudioContext.updateTime(this,e)}}),e.prop("_playbackRate",1,Fire.HideInInspector),e.getset("playbackRate",function(){return this._playbackRate},function(e){this._playbackRate!==e&&(this._playbackRate=e,Fire.AudioContext.updatePlaybackRate(this))}),e.prop("_clip",null,Fire.HideInInspector),e.getset("clip",function(){return this._clip},function(e){this._clip!==e&&(this._clip=e,Fire.AudioContext.updateAudioClip(this))},Fire.ObjectType(Fire.AudioClip)),e.prop("_loop",!1,Fire.HideInInspector),e.getset("loop",function(){return this._loop},function(e){this._loop!==e&&(this._loop=e,Fire.AudioContext.updateLoop(this))}),e.prop("_mute",!1,Fire.HideInInspector),e.getset("mute",function(){return this._mute},function(e){this._mute!==e&&(this._mute=e,Fire.AudioContext.updateMute(this))}),e.prop("_volume",1,Fire.HideInInspector),e.getset("volume",function(){return this._volume},function(e){this._volume!==e&&(this._volume=Math.clamp(e),Fire.AudioContext.updateVolume(this))},Fire.Range(0,1)),e.prop("playOnAwake",!0),e.prototype.onPlayEnd=function(){this.onEnd&&this.onEnd(),this._playing=!1,this._paused=!1},e.prototype.pause=function(){this._paused||(Fire.AudioContext.pause(this),this._paused=!0)},e.prototype.play=function(){(!this._playing||this._paused)&&(this._paused?Fire.AudioContext.play(this,this._startTime):Fire.AudioContext.play(this,0),this._playing=!0,this._paused=!1)},e.prototype.stop=function(){this._playing&&(Fire.AudioContext.stop(this),this._playing=!1,this._paused=!1)},e.prototype.onLoad=function(){this._playing&&this.stop()},e.prototype.onStart=function(){},e.prototype.onEnable=function(){this.playOnAwake&&this.play()},e.prototype.onDisable=function(){this.stop()},e}();Fire.AudioSource=e,Fire._RFpop()},{}],"audio-web-audio":[function(){Fire._RFpush(),function(){function e(e,t,i,r){var o=!1,a=setTimeout(function(){r('The operation of decoding audio data already timeout! Audio url: "'+i+'". Set Fire.AudioContext.MaxDecodeTime to a larger value if this error often occur. See fireball-x/dev#318 for details.',null)},n.MaxDecodeTime);e.decodeAudioData(t,function(e){o||(r(null,e),clearTimeout(a))},function(e){o||(r(null,'LoadAudioClip: "'+i+'" seems to be unreachable or the file is empty. InnerMessage: '+e),clearTimeout(a))})}function t(t,i,n){var r=i&&function(n,r){r?e(Fire.nativeAC,r.response,t,i):i('LoadAudioClip: "'+t+'" seems to be unreachable or the file is empty. InnerMessage: '+n,null)};Fire.LoadManager._loadFromXHR(t,r,n,"arraybuffer")}var i=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;if(i){Fire.nativeAC||(Fire.nativeAC=new i),Fire.LoadManager.registerRawTypes("audio",t);var n={};n.MaxDecodeTime=3e3,n.getCurrentTime=function(e){return e._paused?e._startTime:e._playing?e._startTime+this.getPlayedTime(e):0},n.getPlayedTime=function(e){return(Fire.nativeAC.currentTime-e._lastPlay)*e._playbackRate},n.updateTime=function(e,t){e._lastPlay=Fire.nativeAC.currentTime,e._startTime=t,e.isPlaying&&(this.pause(e),this.play(e))},n.updateMute=function(e){e._volumeGain&&(e._volumeGain.gain.value=e.mute?-1:e.volume-1)},n.updateVolume=function(e){e._volumeGain&&(e._volumeGain.gain.value=e.volume-1)},n.updateLoop=function(e){e._buffSource&&(e._buffSource.loop=e.loop)},n.updateAudioClip=function(e){e.isPlaying&&(this.stop(e,!1),this.play(e))},n.updatePlaybackRate=function(e){this.isPaused||(this.pause(e),this.play(e))},n.pause=function(e){e._buffSource&&(e._startTime+=this.getPlayedTime(e),e._buffSource.onended=null,e._buffSource.stop())},n.stop=function(e,t){e._buffSource&&(t||(e._buffSource.onended=null),e._buffSource.stop())},n.play=function(e,t){if(e.clip&&e.clip.rawData){var i=Fire.nativeAC.createBufferSource(),n=Fire.nativeAC.createGain();i.connect(n),n.connect(Fire.nativeAC.destination),i.connect(Fire.nativeAC.destination),i.buffer=e.clip.rawData,i.loop=e.loop,i.playbackRate.value=e.playbackRate,i.onended=e.onPlayEnd.bind(e),n.gain.value=e.mute?-1:e.volume-1,e._buffSource=i,e._volumeGain=n,e._startTime=t||0,e._lastPlay=Fire.nativeAC.currentTime,i.start(0,this.getCurrentTime(e))}},n.getClipBuffer=function(e){return e.rawData},n.getClipLength=function(e){return e.rawData?e.rawData.duration:-1},n.getClipSamples=function(e){return e.rawData?e.rawData.length:-1},n.getClipChannels=function(e){return e.rawData?e.rawData.numberOfChannels:-1},n.getClipFrequency=function(e){return e.rawData?e.rawData.sampleRate:-1},Fire.AudioContext=n}}(),Fire._RFpop()},{}],"sprite-animation-clip":[function(e,t){Fire._RFpush();var i=Fire.extend("Fire.SpriteAnimationClip",Fire.CustomAsset,function(){this._frameInfoFrames=null});Fire.addCustomAssetMenu(i,"Create/New Sprite Animation"),i.WrapMode=function(e){return e[e.Default=0]="Default",e[e.Once=1]="Once",e[e.Loop=2]="Loop",e[e.PingPong=3]="PingPong",e[e.ClampForever=4]="ClampForever",e}({}),i.StopAction=function(e){return e[e.DoNothing=0]="DoNothing",e[e.DefaultSprite=1]="DefaultSprite",e[e.Hide=2]="Hide",e[e.Destroy=3]="Destroy",e}({});var n=Fire.define("FrameInfo").prop("sprite",null,Fire.ObjectType(Fire.Sprite)).prop("frames",0,Fire.Integer);i.prop("wrapMode",i.WrapMode.Default,Fire.Enum(i.WrapMode)),i.prop("stopAction",i.StopAction.DoNothing,Fire.Enum(i.StopAction)),i.prop("speed",1),i.prop("_frameRate",60,Fire.HideInInspector),i.getset("frameRate",function(){return this._frameRate},function(e){e!==this._frameRate&&(this._frameRate=Math.round(Math.max(e,1)))}),i.prop("frameInfos",[],Fire.ObjectType(n)),i.prototype.getTotalFrames=function(){for(var e=0,t=0;t<this.frameInfos.length;++t)e+=this.frameInfos[t].frames;return e},i.prototype.getFrameInfoFrames=function(){if(null===this._frameInfoFrames){this._frameInfoFrames=new Array(this.frameInfos.length);for(var e=0,t=0;t<this.frameInfos.length;++t)e+=this.frameInfos[t].frames,this._frameInfoFrames[t]=e}return this._frameInfoFrames},t.exports=i,Fire._RFpop()},{}],"sprite-animation-state":[function(e,t){function i(e,t){for(var i=0,n=e.length-1;n>=i;){var r=i+n>>1;if(e[r]===t)return r;e[r]>t?n=r-1:i=r+1}return~i}function n(e,t,i){if(0===t)return 0;if(0>e&&(e=-e),i===r.WrapMode.Loop)return e%(t+1);if(i===r.WrapMode.PingPong){var n=Math.floor(e/t);if(e%=t,n%2===1)return t-e}else{if(0>e)return 0;if(e>t)return t}return e}Fire._RFpush();var r=e("sprite-animation-clip"),o=function(e,t){return t?(this.name=e,this.clip=t,this.wrapMode=t.wrapMode,this.stopAction=t.stopAction,this.speed=t.speed,this._frameInfoFrames=t.getFrameInfoFrames(),this.totalFrames=this._frameInfoFrames.length>0?this._frameInfoFrames[this._frameInfoFrames.length-1]:0,this.length=this.totalFrames/t.frameRate,this.frame=-1,this.time=0,void(this._cachedIndex=-1)):void Fire.error("Unspecified sprite animation clip")};o.prototype.getCurrentIndex=function(){if(this.totalFrames>1){this.frame=Math.floor(this.time*this.clip.frameRate),this.frame<0&&(this.frame=-this.frame);var e;if(this.wrapMode!==r.WrapMode.PingPong)e=n(this.frame,this.totalFrames-1,this.wrapMode);else{e=this.frame;var t=Math.floor(e/this.totalFrames);e%=this.totalFrames,1===(1&t)&&(e=this.totalFrames-1-e)}if(this._cachedIndex-1>=0&&e>=this._frameInfoFrames[this._cachedIndex-1]&&e<this._frameInfoFrames[this._cachedIndex])return this._cachedIndex;var o=i(this._frameInfoFrames,e+1);return 0>o&&(o=~o),this._cachedIndex=o,o}return 1===this.totalFrames?0:-1},t.exports=o,Fire._RFpop()},{"sprite-animation-clip":"sprite-animation-clip"}],"sprite-animation":[function(e,t){Fire._RFpush();var i=e("sprite-animation-clip"),n=e("sprite-animation-state"),r=Fire.extend("Fire.SpriteAnimation",Fire.Component,function(){this.animations=[],this._nameToState={},this._curAnimation=null,this._spriteRenderer=null,this._defaultSprite=null,this._lastFrameIndex=-1,this._curIndex=-1,this._playStartFrame=0});Fire.addComponentMenu(r,"Sprite Animation"),r.prop("defaultAnimation",null,Fire.ObjectType(i)),r.prop("animations",[],Fire.ObjectType(i)),r.prop("_playAutomatically",!0,Fire.HideInInspector),r.getset("playAutomatically",function(){return this._playAutomatically},function(e){this._playAutomatically=e}),r.prototype.getAnimState=function(e){this._spriteRenderer=this.entity.getComponent(Fire.SpriteRenderer);var t=new n(e.name,e);return t},r.prototype.init=function(){var e=null!==this.nameToState;if(e===!1){this.sprite_=this.entity.getComponent(Fire.Sprite),this._defaultSprite=sprite_,this.nameToState={};for(var t=0;t<this.animations.length;++t){var i=this.animations[t];if(null!==i){var r=new n(i);this.nameToState[r.name]=r,this.defaultAnimation===i&&(this.curAnimation=r,this.lastFrameIndex=-1)}}}},r.prototype.play=function(e,t){this._curAnimation=e,null!==this._curAnimation&&(this._curIndex=-1,this._curAnimation.time=t,this._playStartFrame=Fire.Time.frameCount,this.sample())},r.prototype.onLoad=function(){if(this.enabled&&this._playAutomatically&&this.defaultAnimation){var e=this.getAnimState(this.defaultAnimation);this.play(e,0)}},r.prototype.lateUpdate=function(){if(null!==this._curAnimation&&Fire.Time.frameCount>this._playStartFrame){var e=Fire.Time.deltaTime*this._curAnimation.speed;this.step(e)}},r.prototype.step=function(e){if(null!==this._curAnimation){this._curAnimation.time+=e,this.sample();var t=!1;(this._curAnimation.wrapMode===i.WrapMode.Once||this._curAnimation.wrapMode===i.WrapMode.Default||this._curAnimation.wrapMode===i.WrapMode.ClampForever)&&(this._curAnimation.speed>0&&this._curAnimation.frame>=this._curAnimation.totalFrames?this._curAnimation.wrapMode===i.WrapMode.ClampForever?(t=!1,this._curAnimation.frame=this._curAnimation.totalFrames,this._curAnimation.time=this._curAnimation.frame/this._curAnimation.clip.frameRate):(t=!0,this._curAnimation.frame=this._curAnimation.totalFrames):this._curAnimation.speed<0&&this._curAnimation.frame<0&&(this._curAnimation.wrapMode===i.WrapMode.ClampForever?(t=!1,this._curAnimation.time=0,this._curAnimation.frame=0):(t=!0,this._curAnimation.frame=0))),t&&this.stop(this._curAnimation)}else this._curIndex=-1},r.prototype.sample=function(){if(null!==this._curAnimation){var e=this._curAnimation.getCurrentIndex();e>=0&&e!=this._curIndex&&(this._spriteRenderer.sprite=this._curAnimation.clip.frameInfos[e].sprite),this._curIndex=e}else this._curIndex=-1},r.prototype.stop=function(e){if(null!==e){e===this._curAnimation&&(this._curAnimation=null),e.time=0;var t=e.stopAction;switch(t){case i.StopAction.DoNothing:break;case i.StopAction.DefaultSprite:this._spriteRenderer.sprite=this._defaultSprite;break;case i.StopAction.Hide:this._spriteRenderer.enabled=!1;break;case i.StopAction.Destroy:}this._curAnimation=null}},t.exports=r,Fire._RFpop()},{"sprite-animation-clip":"sprite-animation-clip","sprite-animation-state":"sprite-animation-state"}]},{},["audio-clip","audio-legacy","audio-source","audio-web-audio","sprite-animation-clip","sprite-animation-state","sprite-animation","AudioControl","Board","Cell","Cube","CubeGroup","Game","GameMenu","MainMenu","Button","Toggle"]);
//# sourceMappingURL=project.js.map