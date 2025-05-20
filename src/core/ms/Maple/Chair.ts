module ChairRole {

    export class Chair extends Laya.Sprite {

        private m_sp:Laya.Sprite;
        private chairAni:Laya.Image;
        private chairData:Array<any> = [];

        public clearUp() : void {
            if(this.chairAni) {
                this.chairAni.removeSelf();
                this.chairAni.destroy(true);
                this.chairAni = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.chairData = [];
        }

        public setChair(hero : any, id:string) : void {

            this.m_sp = new Laya.Sprite();
            hero.m_sp.addChild(this.m_sp);

            this.chairAni = new Laya.Image();
            this.m_sp.addChild(this.chairAni);

            let res:Array<any> = [];
            if(!Laya.loader.getRes("res/Character/Chair/0301.img/index.html"))
                res.push({ url: "res/Character/Chair/0301.img/index.html" });
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    this.chairLoaded(id);
                });
            }
            else {
                this.chairLoaded(id);
            }
        }

        onLoading(pro:number) : void {

        }

        chairLoaded(id:any) : void {
            if(!msMoudle.wz["0301.img"]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz["0301.img"] = msMoudle.loadWZ(cs,"res/Character/Chair/0301.img/index.html", "ms");
            }

            let data:any = msMoudle.wz["0301.img"][id];

            this.chairData = [];

            let frame:number = 0;
            while(true) {
                let root:string = id + ".effect." + frame;
                if(data[root]) {
                    this.linkChair(data, id, root, frame);
                    frame++;
                }
                else break;
            }
            let res:Array<any> = [];
            for(let i:number = 0; i < this.chairData.length; i++) {
                if(!Laya.loader.getRes(this.chairData[i].tex)) {
                    res.push({ url: this.chairData[i].tex });
                }
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    // console.log(this.chairData)
                    this.doAction(0);
                });
            }
            else {
                // console.log(this.chairData)
                this.doAction(0);
            }
        }

        linkChair(data:any, id:string, root:string, frameIndex:number) : void {
            this.chairData[frameIndex] = new Object();
            this.chairData[frameIndex].bodyRelMove = msMoudle.Vec2FromArr(data[id + ".info.bodyRelMove"]);
            this.chairData[frameIndex].sitLeft = data[id + ".info.sitLeft"];
            this.chairData[frameIndex].direction = data[id + ".info.direction"];
            this.chairData[frameIndex].z = data[id + ".effect.z"];
            this.chairData[frameIndex].sitAction = data[id + ".info.sitAction"];
            this.chairData[frameIndex].fixed = data[id + ".effect.fixed"];

            let msg:any = msMoudle.getWindowInfo(data[root], null);
            let strMarker:string = "res/Character/Chair/0301.img/" + msg.strMarker;
            this.chairData[frameIndex].tex = strMarker;
            this.chairData[frameIndex].delay = 500;
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                this.chairData[frameIndex].orgx = -Number(oringinInfo.x);
                this.chairData[frameIndex].orgy = -Number(oringinInfo.y);
            }
        }

        doAction(frameIndex:number) : void {
            if(this.chairData[frameIndex]) {
                if(frameIndex >= this.chairData.length) {
                    frameIndex = 0;
                }
                let tex = Laya.loader.getRes(this.chairData[frameIndex].tex);
                if(tex) {
                    this.chairAni.pos(this.chairData[frameIndex].orgx,
                    this.chairData[frameIndex].orgy - 50);
                    this.chairAni.skin = this.chairData[frameIndex].tex;
                }
                if(this.chairData.length > 1) {
                    Laya.timer.once(this.chairData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
                }
            }
        }

        //
    }

}