module BufEffMoudle{

    export class BufEff extends Laya.Sprite {

        private m_ani:Laya.Image;
        private m_parent:any;
        private m_h:number = 0;
        private timeline:Array<any> = [];
        private show:Array<any> = [];
        private m_x:number;
        private m_y:number;
        private mFrame:number;

        /////眩晕
        public ShowStun(P:any, R:any, frameNum:number, name:string, x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.mFrame = frameNum;
            this.m_parent = P;
            this.m_h = R.getBounds().height;
            this.m_ani = new Laya.Image();
            this.m_ani.pos(this.m_x, this.m_y);
            this.m_parent.addChild(this.m_ani);

            this.doAction(0);
        }

        doAction(frame:number) : void {
            if(this.mFrame > 0) {
                if(frame >= this.mFrame) frame = 0;
                this.m_ani.skin = "BasicEff/stun" + frame + ".png";
                Laya.timer.once(125, this, this.doAction, [frame + 1]);
            }
        }

        //////冰冻
        public ShowCool(P:any, R:any, frameNum:number, name:string, coolz:number, cooli:number) : void {
            // this._TBuf(P, coolz, cooli);
            // this.m_h = R.getBounds().height;
            // this.m_ani.interval = 125;
            // Laya.Animation.createFrames(this.aniUrls(frameNum), name);
            // this.m_ani.play(0, true, name);
            // let texture = new Laya.Texture();
            // texture = Laya.Loader.getRes("BasicEff/cool.png");
            // this.m_ani.frames[0].drawTexture(texture, 0, 0);
        }
        /////持续中毒
        public ShowPoison(P:any, frameNum:any, name:any, x:number, y:number) : void {
            // this.m_ani = new Laya.Animation();
            // this.m_parent = P;
            // this.m_parent.addChild(this.m_ani);
            // this.m_ani.pos(x, y);
            // this.m_ani.interval = 100;
            // this.m_ani.zOrder = 200000;
            // Laya.Animation.createFrames(this.aniUrls(frameNum), name);
            // this.m_ani.play(0, true, name);
            // this.m_ani.once(Laya.Event.COMPLETE, this,this.clearUp);
            // for(let i:number = 0; i < frameNum; i++) {
            //     let texture = new Laya.Texture();
            //     texture = Laya.Loader.getRes("BasicEff/poison" + i + ".png");
            //     this.m_ani.frames[i].drawTexture(texture, -19, -20);
            // }
        }

        ///buf
        public ShowBuf(P:any, name:string, x:number, y:number, buflist:any) : void {
            this.m_parent = P;
            if(buflist.length > 0) {
                this.ShowDelay(this.m_parent, x, y - 100, 2, name, buflist);
            }
        }

        ///debuf
        public ShowDeBuf(P:any, name:string, x:number, y:number, buflist:any) : void {
            this.m_parent = P;
            if(buflist.length > 0) {
                this.ShowDelay(this.m_parent, x, y - 100, 1, name, buflist);
            }
        }

        private ShowDelay(parent:any, x:number, y:number, type:number, name:any, buflist:any):void {
            //伤害次数
            let offsetX = 0;
            let nowtime = Math.random();
            if(nowtime < 0.5) offsetX = -offsetX;
            this.timeline[0] = new Array();
            this.show[0] = new Array();
            // let m_time = new Date().getTime();
            //具体伤害
            this.show[0][0] = new Laya.Sprite();
            this.timeline[0][0] = new Laya.TimeLine();
            let texture = new Laya.Texture();
            if(type == 2) {
                if(buflist[0] == 1) texture = Laya.loader.getRes("res/UI/BasicEff.img/buf_atk.png");
                else if(buflist[0] == 2) texture = Laya.loader.getRes("res/UI/BasicEff.img/buf_def.png");
                else if(buflist[0] == 3) texture = Laya.loader.getRes("res/UI/BasicEff.img/buf_baoji.png");
                else if(buflist[0] == 4) texture = Laya.loader.getRes("res/UI/BasicEff.img/buf_miss.png");
                else if(buflist[0] == 5) texture = Laya.loader.getRes("res/UI/BasicEff.img/buf_target.png");
            }
            else if(type == 1) {
                if(buflist[0] == 1) texture = Laya.loader.getRes("res/UI/BasicEff.img/debuf_atk.png");
                else if(buflist[0] == 2) texture = Laya.loader.getRes("res/UI/BasicEff.img/debuf_def.png");
                else if(buflist[0] == 3) texture = Laya.loader.getRes("res/UI/BasicEff.img/debuf_baoji.png");
                else if(buflist[0] == 4) texture = Laya.loader.getRes("res/UI/BasicEff.img/debuf_miss.png");
                else if(buflist[0] == 5) texture = Laya.loader.getRes("res/UI/BasicEff.img/debuf_target.png");
            }
            this.show[0][0].texture = texture;
            this.show[0][0].pivot(texture.width / 2, texture.height / 2).pos(x + texture.width / 2, y + 40 * 0);
            parent.addChild(this.show[0][0]);
            this.show[0][0].zOrder = 200000;
            texture = null;
            //该序号向上逐渐消失
            this.timeline[0][0].addLabel("buf_1_" + 0 + "_" + name + "_0_" ,0).to(this.show[0][0],{scaleX: 1.4,scaleY: 1.4, y:y + 40 * 0 - 50, alpha: 255 / 255}, 200, null, 0)
            this.timeline[0][0].addLabel("buf_2_" + 0 + "_" + name + "_0_" ,0).to(this.show[0][0],{}, 300, null, 0);
            this.timeline[0][0].addLabel("buf_3_" + 0 + "_" + name + "_0_" ,0).to(this.show[0][0],{scaleX: 0.7,scaleY: 0.7, x:x - offsetX, y:y + 40 * 0 - 100, alpha: 0}, 250, null, 0);
            //开始播放
            this.timeline[0][0].once(Laya.Event.COMPLETE, this,this.onCompleteB, [parent, 0, 0]);
            this.timeline[0][0].play(0, false);
        }

        private onCompleteB(parent:any, i:number, j:number):void {
            if(this.show[i][j]) {
                this.show[i][j].removeSelf();
                this.show[i][j] = null;
            }
		}

        // private _TBuf(P:any, z:number, i:number) : void {
        //     // this.m_parent = P;
        //     // this.m_ani = new Laya.Animation();
        //     // this.m_ani.zOrder = z;
        //     // this.m_ani.pos(this.m_x, this.m_y);
        //     this.m_parent.addChild(this.m_ani);
        // }

        public clearUp() {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            if(this.m_ani) {
                this.m_ani.removeSelf();
                this.m_ani.destroy(true);
                this.m_ani = null;
            }
        }

    }
}