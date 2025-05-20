namespace app {

    export class role extends Laya.Sprite {
        //通用
        private mName:string;                   //名称
        private mX:number;                      //位置
        private mY:number;
        private caller:any;
        public mNode:Laya.Sprite;
        public isLoop:boolean = true;           //是否重复
        public mScale:number = 1;               //缩放
        public isChouKa:boolean = false;        //是否抽卡
        //帧动画
        private mFrame:number;                  //帧动画帧数
        private _Data:Array<any> = [];          //帧动画数据记录
        private _Ani:Laya.Image;                //帧动画
        //龙骨动画
        private _LGAni:Laya.Skeleton;           //龙骨动画
        private mFactory:Laya.Templet;          //龙骨动画模板
        private mAct:string = "attack";

        constructor() {
            super();
        }

        public changeAllByLG(pNode:any, name:string, act:string, x:number, y:number) : void {
            this.mAct = act;
            this._(pNode, name, x, y);
            this.dealLG();
        }

        public changeAllByZDH(pNode:any, name:string, x:number, y:number, frame:number) : void {
            this._(pNode, name, x, y, frame);
            this.dealZDH();
        }

        private doAction(frameIndex:number) : void {
            if(this._Data) {
                if(this._Data.length > 0) {
                    if(frameIndex >= this._Data.length) {
                        if(this.isLoop) {
                            frameIndex = 0;
                        }
                        else {
                            if(this.isChouKa) {
                                this._Ani.skin = "";
                                this.clearUp();
                            }
                            return ;
                        }
                    }
                    let _data:any = this._Data[frameIndex];
                    this._Ani.skin = _data.tex;
                    this._Ani.zOrder = 1;
                    this._Ani.scale(this.mScale, this.mScale);
                    this._Ani.pos(_data.orgx, _data.orgy);
                    if(this._Data.length > 1)
                        Laya.timer.once(_data.delay, this, this.doAction, [frameIndex + 1]);
                }
            }
        }

        private _(pNode:any, name:string, x:number, y:number, frame?:number) : void {
            this.caller = pNode;
            this.mName = name;
            this.mX = x;
            this.mY = y;
            if(frame) this.mFrame = frame;

            this.mNode = new Laya.Sprite();
            this.mNode.zOrder = 9999999999 + 1;
            pNode.addChild(this.mNode);
            this.mNode.pos(x, y);
        }

        private dealLG() : void {
            let mFactory:Laya.Templet = new Laya.Templet();
            mFactory.loadAni(this.mName);
            mFactory.on(Laya.Event.COMPLETE, this, ()=> {
                this._LGAni = mFactory.buildArmature(0);
                this.mNode.addChild(this._LGAni);
                this._LGAni.play(this.mAct,false);
                this._LGAni.once(laya.events.Event.STOPPED, this, this.LGEnd);
            });
        }

        private LGEnd() : void {
             this._LGAni.paused();
        }

        private dealZDH() : void {
            //图片帧初始化
            this._Ani = new Laya.Image();
            this.mNode.addChild(this._Ani);
            //图片帧数据
            this._Data = [];
            for(let i:number = 0; i < this.mFrame; i++) {
                this._Data[i] = new Object();
                this._Data[i].orgx = 0;
                this._Data[i].orgy = 0;
                this._Data[i].delay = (this.mFrame == 5) ? 600 : 50;
                this._Data[i].tex = this.mName + "_" + (i + 1) + ".png";
            }
            ///加载完成之后再播放
            if(this.mFrame > 0) {
                this.doAction(0);
            }
        }

        public clearUp() : void {
            //关闭帧动画定时器
            Laya.timer.clear(this, this.doAction);

            //清除帧动画
            if(this._Ani) {
                Laya.timer.clearAll(this._Ani);
                this._Ani.removeSelf();
                this._Ani.destroy();
                this._Ani = null;
            }
            //清除龙骨动画
            if(this._LGAni) {
                Laya.timer.clearAll(this._LGAni);
                this._LGAni.removeSelf();
                this._LGAni.destroy();
                this._LGAni = null;
            }
            //清除当前动画节点
            if(this.mNode) {
                Laya.timer.clearAll(this.mNode);
                this.mNode.removeSelf();
                this.mNode.destroy();
                this.mNode = null;
            }
            Laya.timer.clearAll(this);
        }

        //
    }

}