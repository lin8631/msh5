module BasicEffRole {
    export class BasicEff extends Laya.Sprite {
        public m_parent:any;
        private m_sp:Laya.Sprite;

        public m_x:number = 0;
        public m_y:number = 0;

        private effAni:Laya.Image;
        private effData:Array<any> = [];
        private m_dir:number = 1;
        public m_loop:boolean = false;

        public loadBasicEff(P:any, eff:string, x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;

            this.m_parent = P;
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999999;
            if(this.m_parent) {
                this.m_parent.addChild(this.m_sp);
            }

            this.effAni = new Laya.Image();
            this.m_sp.addChild(this.effAni);

            if(eff == "LevelUp") {
                msMoudle.playSound("res/Sound/Game.img/LevelUp")
            }
            else if(eff == "Success") {
                msMoudle.playSound("res/Sound/Game.img/EnchantSuccess")
            }
            else if(eff == "Failure") {
                msMoudle.playSound("res/Sound/Game.img/EnchantFailure")
            }

            let data:any = msMoudle.wz["BasicEff.img"];
            if(eff == "Failure" || eff == "Success") data = data["Enchant"];
            else if(eff == "0" || eff == "1" || eff == "2") data = data["QuestIcon"];
            else if(eff == "Summoned") data = data["Summoned"];
            else if(eff == "RunningEffect2") data = data["RunningEffect2"];
            else if(eff == "AranGetSkill") data = data["AranGetSkill"];
            else if(eff == "ZeroAura0") data = data["ZeroAura0"];
            else data = data["LevelUp"];
            let frameindex:number = 0;
            while(true) {
                let root:string;
                if(eff == "Failure") root = "Enchant.Failure." + frameindex;
                else if(eff == "Success") root = "Enchant.Success." + frameindex;
                else if(eff == "LevelUp") root = "LevelUp." + frameindex;
                else if(eff == "Summoned") root = "Summoned." + frameindex;
                else if(eff == "RunningEffect2") root = "RunningEffect2." + frameindex;
                else if(eff == "AranGetSkill") root = "AranGetSkill." + frameindex;
                else if(eff == "ZeroAura0") root = "ZeroAura0." + frameindex;
                else if(eff == "0" || eff == "1" || eff == "2") root = "QuestIcon." + eff + "." + frameindex;
                if(data[root]) {
                    this.linkBasicEff(frameindex, data, root, eff);
                    frameindex = frameindex + 1;
                }
                else break;
            }
            let res:Array<any> = [];
            for(let i:number = 0; i < this.effData.length; i++) {
                if(!Laya.loader.getRes(this.effData[i].tex)) {
                    res.push({ url: this.effData[i].tex });
                }
            }
            // console.log(this.effData)

            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    // for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    this.doAction(0);
                    this.m_sp.pos(this.m_x, this.m_y);
                });
            }
            else {
                this.doAction(0);
                this.m_sp.pos(this.m_x, this.m_y);
            }
        }
        private linkBasicEff(i:number, data:any, root:string, eff:string = null) : void {
            let msg = msMoudle.getWindowInfo(data[root], null);
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let delay:any = data[root + ".delay"];

            let strMarker:string = "BasicEff/" + msg.strMarker;
            if(eff == "AranGetSkill" || eff == "ZeroAura0") {
                strMarker = "res/BasicEff.img/" + msg.strMarker;
                // console.log(strMarker)
                this.m_loop = true;
            }

            this.effData[i] = new Object();
            this.effData[i].tex = strMarker;
            this.effData[i].orgx = -Number(oringinInfo.x) + this.m_x;
            this.effData[i].orgy = -Number(oringinInfo.y) + this.m_y;
            this.effData[i].delay = delay ? Number(delay) : 150;
        }

        m_eff:string;
        public loadEffectEff(P:any, eff:string, x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_eff = eff;

            this.m_parent = P;
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999999;
            if(this.m_parent) {
                this.m_parent.addChild(this.m_sp);
            }
            this.effAni = new Laya.Image();
            this.m_sp.addChild(this.effAni);

            let data:any = msMoudle.wz["Effect.img"];
            data = data[eff.split(".")[0]];
            let frameindex:number = 0;
            while(true) {
                let root:string;
                root = eff + "." + frameindex;
                if(data[root]) {
                    this.linkEffectEff(frameindex, data, root);
                    frameindex = frameindex + 1;
                }
                else break;
            }
            let res:Array<any> = [];
            for(let i:number = 0; i < this.effData.length; i++) {
                if(!Laya.loader.getRes(this.effData[i].tex))
                    res.push({ url: this.effData[i].tex });
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    // for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);
                    this.doAction(0);
                });
            }
            else {
                this.doAction(0);
            }
        }
        private linkEffectEff(i:number, data:any, root:string) : void {
            let msg = msMoudle.getWindowInfo(data[root], null);
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let delay:any = data[root + ".delay"];

            let strMarker:string = "res/Effect.img/" + msg.strMarker;

            this.effData[i] = new Object();
            this.effData[i].tex = strMarker;
            this.effData[i].orgx = -Number(oringinInfo.x) + this.m_x;
            this.effData[i].orgy = -Number(oringinInfo.y) + this.m_y;
            this.effData[i].delay = delay ? Number(delay) : 100;
        }

        public loadPetEff(P:any, eff:string, x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;

            this.m_parent = P;
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999999;
            if(this.m_parent) {
                this.m_parent.addChild(this.m_sp);
            }

            this.effAni = new Laya.Image();
            this.m_sp.addChild(this.effAni);
            let data:any;
            if(eff == "Teleport") data = msMoudle.wz["PetEff.img"]["Basic"];
            else data = msMoudle.wz["PetEff.img"][eff];
            let frameindex:number = 0;
            while(true) {
                let root:string;
                if(eff == "Teleport") root = "Basic.Teleport." + frameindex;
                else root = eff + ".warp." + frameindex;
                if(data[root]) {
                    this.linkPetEff(frameindex, data, root);
                    frameindex = frameindex + 1;
                }
                else break;
            }
            let res:Array<any> = [];
            for(let i:number = 0; i < this.effData.length; i++) {
                if(!Laya.loader.getRes(this.effData[i].tex)) {
                    res.push({ url: this.effData[i].tex });
                }
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    // for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    this.doAction(0);
                });
            }
            else {
                this.doAction(0);
            }
        }
        // m_loadRes:Array<any> = [];
        private linkPetEff(i:number, data:any, root:string) : void {
            let msg = msMoudle.getWindowInfo(data[root], null);
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let delay:any = data[root + ".delay"];

            let strMarker:string = "res/Pet/PetEff.img/" + msg.strMarker;

            this.effData[i] = new Object();
            this.effData[i].tex = strMarker;
            this.effData[i].orgx = -Number(oringinInfo.x);
            this.effData[i].orgy = -Number(oringinInfo.y);
            this.effData[i].delay = delay ? Number(delay) : 150;
        }

        public doAction(frameIndex:number) : void {
            if(frameIndex >= this.effData.length) {
                frameIndex = 0;
                if(this.m_loop == false) {

                    if(this.m_eff == "summerboating.timeout") {
                        msMoudle.gameP.gotoScene(ms.lastmap);
                    }

                    this.clearUp();
                    return ;
                }
            }
            if(this.effData[frameIndex]) {
                this.effAni.skin = this.effData[frameIndex].tex;
                this.effAni.pos(this.effData[frameIndex].orgx, this.effData[frameIndex].orgy);
                Laya.timer.once(this.effData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
            }
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(this.m_x, this.m_y);
        }

        public setScale(_scale:number) : void {
            this.m_sp.scale(_scale, _scale);
        }

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            // Laya.loader.cancelLoadByUrls(this.m_loadRes);
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp = null;
            }
            this.effData = [];
        }

        //
    }
}