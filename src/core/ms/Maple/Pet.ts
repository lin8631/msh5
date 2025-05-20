/// <reference path="./../../../core/ms/Maple/NameTag.ts" />

module PetRole {
    import cssNametag = NametagRole.NameTag;

    export class Pet extends Laya.Sprite {
        public m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 1;
        private m_sp:Laya.Sprite;
        public m_nametag_sp:Laya.Sprite;
        private m_nametag:cssNametag;

        private m_action:string = "stand0";//stand1
        private m_id:string;
        private petData:Array<any> = [];
        private petAni:Laya.Image;
        public m_down_t:number = 0;
        public m_up_t:number = 0;

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            if(this.petAni) {
                this.petAni.removeSelf();
                this.petAni.destroy(true);
                this.petAni = null;
            }
            if(this.m_nametag) {
                this.m_nametag.clearUp();
                this.m_nametag = null;
            }
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.petData = [];
            this.m_down_t = 0;
            this.m_up_t = 0;
        }

        public changeAll(P:any, id:string, x:number, y:number) : void {
            this.m_parent = P;
            this.m_x = x;
            this.m_y = y;
            this.m_id = id;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 10001;
            this.m_parent.addChild(this.m_sp);

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 9999;
            // this.m_parent.addChild(this.m_nametag_sp);

            let p = this.m_id.split(".");
            let name:string = this.m_id[0];
            if(msMoudle.wz["Pet.img"][Number(p[0])]) name = msMoudle.wz["Pet.img"][Number(p[0])][Number(p[0]) + ".name"]
            this.m_nametag = new cssNametag();
            this.m_nametag.loadNameTag(this, name, "pet.3");

            this.petAni = new Laya.Image();
            // this.petAni.anchorX = 0.5;
            // this.petAni.anchorY = 0.5;
            this.m_sp.addChild(this.petAni);

            this.setPos(x, y);

            let res:any = [];
            if(!Laya.loader.getRes("res/Pet/" + this.m_id + "/index.html")) {
                res.push({ url: "res/Pet/" + this.m_id + "/index.html" });
            }
            if(res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(this, this.loadAllResed, []),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);
            }
            else {
                this.loadAllResed();
            }
        }

        onLoading() : void {}

        loadAllResed() : void {
            let cs:CssParser.Txt = new CssParser.Txt();
            if(!msMoudle.wz[this.m_id]) {
                msMoudle.wz[this.m_id] = msMoudle.loadWZ(cs,"res/Pet/" + this.m_id + "/index.html", "ms");
            }
            this.loadActs();
        }

        public changeByNameForce(id:string) : void {
            Laya.timer.clear(this, this.doAction);
            this.petData = [];
            this.m_id = id;
            this.loadActs();
        }

        private loadActs() : void {
            if(msMoudle.wz[this.m_id]) {
                this.petData = new Array();
                let data:any = msMoudle.wz[this.m_id][this.m_action];
                if(data) {
                    let frameindex:number = 0;
                    while(true) {
                        let root:string = this.m_action + "." + frameindex;
                        if(data[root]) {
                            this.linkPet(data, root, frameindex);
                            frameindex = frameindex + 1;
                        }
                        else break;
                    }
                }
                let res:Array<any> = [];
                for(let i:number = 0; i < this.petData.length; i++) {
                    if(!Laya.loader.getRes(this.petData[i].tex)) {
                        res.push({ url: this.petData[i].tex });
                    }
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {

                        for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                        msMoudle.resTip(res, true);

                        this.doAction(0);
                    });
                }
                else {
                    this.doAction(0);
                }
            }
        }
        m_loadRes:Array<any> = [];
        private linkPet(data:any, root:string, frameindex:number) : void {
            let msg:any = msMoudle.getMobInfo(data[root], this.m_action, this.m_id);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            let strMarker:string = "res/Pet/" + this.m_id + "/" + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            this._(data, root, frameindex, strMarker, delay?delay:150);
        }

        private doAction(frameIndex:number) : void {
            if(this.petData.length > 0) {
                if(frameIndex >= this.petData.length) frameIndex = 0;
                if(this.petData[frameIndex]) {
                    // let tex:any = Laya.loader.getRes(this.petData[frameIndex].tex);
                    // if(tex) {
                        if(this.petAni) {
                            this.petAni.skin = this.petData[frameIndex].tex;
                            // this.petAni.pos(this.petData[frameIndex].orgx + tex.width / 2,
                            //     this.petData[frameIndex].orgy + tex.height / 2);
                            this.petAni.pos(this.petData[frameIndex].orgx,
                                this.petData[frameIndex].orgy);
                        }
                        // this.petAni.zOrder = this.petData[frameIndex].z;
                        if(this.petData.length > 1) Laya.timer.once(this.petData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
                    // }
                }
            }
        }

        private _(data:any, root:string, frameindex:number, strMarker:string, delay:number) : void {

            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z:any = data[root + ".z"];

            this.petData[frameindex] = new Object();
            this.petData[frameindex].tex = strMarker;
            this.petData[frameindex].delay = Number(delay);
            this.petData[frameindex].z = z ? Number(z) : 0;
            this.petData[frameindex].orgx = -Number(oringinInfo.x);
            this.petData[frameindex].orgy = -Number(oringinInfo.y);
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(x, y);
            this.m_nametag_sp.pos(this.m_x, this.m_y);
        }

        private setDir(dir:number) : void {
            this.m_dir = dir;
            if(this.m_sp) this.m_sp.scaleX = dir;
        }

        public changeByName(id:string) : void {
            this.m_action = id;
            Laya.timer.clear(this, this.doAction);
            this.loadActs();
        }

        //
    }
}