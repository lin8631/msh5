/// <reference path="./utils/Utils.ts" />
/// <reference path="./manager/Manager.ts" />
//它用于声明文件间的依赖。三斜线引用告诉编译器在编译过程中要引入的额外的文件。 
//三斜线指令仅可放在包含它的文件的最顶端，不含注释，否则仅当注释处理
//方法一：用路径声明依赖的
// / <reference path="..." />
//方法二：声明对某个包的依赖。
// / <reference types="..." />

namespace app {

    export class MainEntry {

        public socketManager: Net.SocketManage;

        constructor() {

            //初始化引擎
            Laya.init(1068, 600, Laya.WebGL);

            this.initVersion();

            //屏幕适配 屏幕模式 自动横屏
            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

            //水平对齐  设置舞台水平居中对齐
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

            //垂直对齐  设置舞台垂直居中对齐
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

            //设置舞台缩放模式
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;

            //背景颜色
            Laya.stage.bgColor = "#000000";

            // //设置Laya提供的worker.js路径
            // Laya.WorkerLoader.workerPath = "libs/worker.js";
            // //开启worker线程
            // Laya.WorkerLoader.enable = true;

            //变量
            let P = this;
            
            //数组
            let res:Array<any> = [];

            res.push({ url: "res/Data/maple2.json"});

            //没test.json文件？？
            res.push({ url: "res/test.json"});
            msLoad.load(res).done(dlg => {
                msMoudle.maplejson = Laya.loader.getRes("res/Data/maple2.json");
                msMoudle.distxt = msMoudle.maplejson["distxt"];
                P.initUI();
                P.showAni();
                P.loadRes();
                // P.initNet();
            });
        }

        showAni() : void {
            Laya.timer.loop(1000, this, ()=> {
                msMoudle.allTime++;         //在线总时长
                msMoudle.onLineTime++;         //在线总时长
            });
            this.cAnis = new Laya.Image();
            this.cAnis.anchorX = 0.5;
            this.cAnis.anchorY = 0.5;
            Laya.stage.addChild(this.cAnis);
            this.cAnis.zOrder = 9999999999;
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, ()=> {
                this.cAnis.pos(Laya.stage.mouseX, Laya.stage.mouseY)
                Laya.timer.clear(this, this.easyAni);
                this.easyAni(0, 6);
            });
        }

        private loadRes() : void {
            let res:Array<any> = [];
            res.push({ url: "atlas/common.atlas"});
            res.push({ url: "res/guide/RunnerGameUI.Effect.ItemGet.0.png"});
            res.push({ url: "res/guide/RunnerGameUI.Effect.ItemGet.1.png"});
            res.push({ url: "res/guide/RunnerGameUI.Effect.ItemGet.2.png"});
            res.push({ url: "res/guide/RunnerGameUI.Effect.ItemGet.3.png"});

            //将这个从game.min.js中移除，然后加载
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    ui.show(app.logo.logoDlg);
                });
            }
            else ui.show(app.logo.logoDlg);
            Laya.stage.hitTestPrior = false;        ///不先检查自己

            let url = app.utils.getSiteURL();
            if(url.indexOf("/mxd079.html") >= 0) {
                msMoudle.qudao = true;
                msMoudle.setName = ["风之大陆"];
                // console.log(url);
            }
            else {
                msMoudle.qudao = false;
            }
        }

        cAnis:Laya.Image;
        easyAni(frame:number, maxframe:number) : void {
            if(frame > maxframe) {
                this.cAnis.skin = "";
                return ;
            }
            //点击特效
            this.cAnis.skin = "res/guide/RunnerGameUI.Effect.ItemGet." + frame + ".png";
            Laya.timer.once(100, this, this.easyAni, [frame + 1, maxframe], true)
        }
            //二维码对象
        // qrcode:any;
        // qrcodeSp:Laya.Sprite;

        private initVersion() : void {
            laya.net.URL.basePath += utils.getBaseResPath();
        }

        private initUI() : void {
            //自定义组件
            laya.ui.View.regComponent("ListView", ui.ListView);
            // laya.ui.View.regComponent("ImageButton", ui.ImageButton);
            // laya.ui.View.regComponent("SpineViewer", ui.SpineViewer);
            // laya.ui.View.regComponent("HTMLDivElement", Laya.HTMLDivElement);
            ui.manager.init();

            if(Laya.Browser.window) {
                if(msMoudle.s_wid == 0 || msMoudle.s_hei == 0) {
                    msMoudle.s_wid = Laya.Browser.window.screen.width;
                    msMoudle.s_hei = Laya.Browser.window.screen.height;
                }
                if(msMoudle.s_iwid == 0 || msMoudle.s_ihei == 0) {
                    msMoudle.s_iwid = Laya.Browser.window.innerWidth;
                    msMoudle.s_ihei = Laya.Browser.window.innerHeight;
                }
                if(msMoudle.s_owid == 0 || msMoudle.s_ohei == 0) {
                    msMoudle.s_owid = Laya.Browser.window.outerWidth;
                    msMoudle.s_ohei = Laya.Browser.window.outerHeight;
                }
            }

            msMoudle.pt = navigator.platform;
        }

        // xiaxian:boolean = false;
        // DelayKaSi() : void {
        //     if(this.xiaxian == false) {

        //     }
        //     else {

        //     }
        // }

        // export var allTime:number = 0;          //在线总时长
        // export var lastTx:number = 0;           //点击坐标
        // export var lastTy:number = 0;
        // export var lastTxyAll:number = 0;       //总点击数量
        // export var lastTxyAll_bt:number = 0;    //最多不同点击数量



        ////
    }

}
new app.MainEntry();