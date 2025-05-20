/// <reference path="./../../../core/ms/Maple/Character.ts" />

module AvatarMegaphoneRole {

    import cssCharacter = CharacterRole.Character;

    export class AvatarMegaphone extends Laya.Sprite {

        private m_parent:any;
        private m_sp:Laya.Sprite;

        private AvatarMegaphoneData:Array<any> = [];
        private AvatarMegaphoneAni:Laya.Image;
        private AvatarMegaphonetxt:Laya.HTMLDivElement;
        private char:cssCharacter;

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            this.AvatarMegaphoneData = [];
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            if(this.AvatarMegaphoneAni) {
                this.AvatarMegaphoneAni.removeSelf();
                this.AvatarMegaphoneAni.destroy(true);
                this.AvatarMegaphoneAni = null;
            }
            if(this.AvatarMegaphonetxt) {
                this.AvatarMegaphonetxt.removeSelf();
                this.AvatarMegaphonetxt.destroy(true);
                this.AvatarMegaphonetxt = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
        }

        public loadAvatarMegaphone(P:any, flag:boolean = false, payVal:number = 0, sp:string = "") : void {

            this.m_parent = Laya.stage;
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 19999999999;
            this.m_parent.addChild(this.m_sp);
            this.m_sp.visible = false;

            this.AvatarMegaphoneAni = new Laya.Image();
            this.m_sp.addChild(this.AvatarMegaphoneAni);

            this.AvatarMegaphonetxt = new Laya.HTMLDivElement();
            this.AvatarMegaphonetxt.pos(120, 14);
            this.AvatarMegaphonetxt.style.fontSize = 14;
            this.AvatarMegaphonetxt.style.width = 100;
            this.AvatarMegaphonetxt.style.wordWrap = true;
            this.AvatarMegaphonetxt.style.valign = "bottom";
            this.AvatarMegaphonetxt.style.bold = true;
            this.AvatarMegaphonetxt.style.color = "#605a5a";
            this.AvatarMegaphoneAni.addChild(this.AvatarMegaphonetxt);
            this.AvatarMegaphonetxt.style.leading = 5;

            let rnkName:string = msMoudle.getRandomName();
            let m = [5, 10, 30, 50, 100];
            let m2 = [5, 10, 30];
            let _payVal = m[msMoudle.getRandValue(0, 0, m.length)];
            if(msMoudle.getRandValue(0, 0, 100) < 75)
                _payVal = m2[msMoudle.getRandValue(0, 0, m2.length)];
            if(flag == true) {
                rnkName = ms.testname;
                _payVal = payVal;
            }
            let html:string = "#k玩家：#b" + rnkName + "#k在游戏中充值了#p" + _payVal + "¥#k，大家快去恭喜他吧！"
            if(sp != "") html = "#k" + sp;

            let d = html.split("#");
            let newhtml = "";
            for(let i:number = 0; i < d.length; i++) {
                if(d[i].indexOf("k") >= 0) {
                    let str = d[i];
                    str = str.replace("k", "")
                    newhtml += "<span>" + str + "</span>";
                }
                else if(d[i].indexOf("b") >= 0) {
                    let str = d[i];
                    str = str.replace("b", "")
                    newhtml += "<span style='color:#A96762;font-weight:bold'>" + str + "</span>";
                }
                else if(d[i].indexOf("p") >= 0) {
                    let str = d[i];
                    str = str.replace("p", "")
                    newhtml += "<span color='#d26ae3'>" + str + "</span>";
                }
            }
            this.AvatarMegaphonetxt.innerHTML = newhtml;

            if(flag == false) {
                this.char = new cssCharacter();
                let E:any = {};
                let selbody = msMoudle.AllBody[msMoudle.getRandValue(0, 0, msMoudle.AllBody.length)] + ".img";
                E.body = selbody;
                E.head = "000" + (Number(selbody.split(".")[0]) + 10000) + ".img";
                E.face = msMoudle.AllFace[msMoudle.getRandValue(0, 0, msMoudle.AllFace.length)] + ".img";
                E.hair = msMoudle.AllHair[msMoudle.getRandValue(0, 0, msMoudle.AllHair.length)] + ".img";
                E.weapon = msMoudle.AllWeapon[msMoudle.getRandValue(0, 0, msMoudle.AllWeapon.length)] + ".img";
                E.coat = msMoudle.AllCoat[msMoudle.getRandValue(0, 0, msMoudle.AllCoat.length)] + ".img";
                E.pants = msMoudle.AllPants[msMoudle.getRandValue(0, 0, msMoudle.AllPants.length)] + ".img";
                E.shoes = msMoudle.AllShoes[msMoudle.getRandValue(0, 0, msMoudle.AllShoes.length)] + ".img";
                E.glove = msMoudle.AllGlove[msMoudle.getRandValue(0, 0, msMoudle.AllGlove.length)] + ".img";
                E.cap = msMoudle.AllCap[msMoudle.getRandValue(0, 0, msMoudle.AllCap.length)] + ".img";
                E.cape = msMoudle.AllCape[msMoudle.getRandValue(0, 0, msMoudle.AllCape.length)] + ".img";
            //     if(msMoudle.getRandValue(0, 0, 100) < 50) E.cap = "01003035.img";
            //     else E.cap = "01003816.img";
            //     E.longcoat = msMoudle.AllFashion[msMoudle.getRandValue(0, 0, msMoudle.AllFashion.length)] + ".img";
            //     E.cape = "N";
                this.char.m_name = rnkName;
                this.char.m_lv = ms.herodata.Lv;
                this.char.changeAll(this.AvatarMegaphoneAni, E, 85, 85);
            }
            else {
                this.char = new cssCharacter();
                let E:any = {};
                E.fweapon = ms.testfweapon;
                E.coat = "01040002.img";
                E.pants = "01060002.img";
                // E.cap = ms.testcap;
                E.weapon = ms.herodata.EquipSlots[0] ? (ms.herodata.EquipSlots[0].id + ".img") : ms.testweapon;
                // E.longcoat = ms.testlongcoat;
                // if(ms.fashion) {
                //     if(ms.fashion.id != "N") E.longcoat = ms.fashion.id;
                // }
                // if(ms.tamingmob) {
                //     E.tamingmob =  ms.tamingmob.tamingmob1;
                //     E.tamingmob0 =  ms.tamingmob.tamingmob2;
                // }
                this.char.m_name = ms.testname;
                this.char.m_lv = ms.herodata.Lv;
                this.char.changeAll(this.AvatarMegaphoneAni, E, 85, 85);
            }

            this.AvatarMegaphoneData = [];

            let data:any = msMoudle.wz["MapHelper.img"]["AvatarMegaphone"];
            let i:number = 0;
            while(true) {
                let root:string = "AvatarMegaphone.Bright." + i;
                if(data[root]) {
                    this.linkAvatarMegaphone(data, root, i);
                    i = i + 1;
                }
                else break;
            }

            let res:Array<any> = [];
            for(let i:number = 0; i < this.AvatarMegaphoneData.length; i++) {
                if(!Laya.loader.getRes(this.AvatarMegaphoneData[i].tex))
                    res.push({ url: this.AvatarMegaphoneData[i].tex });
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {

                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);

                    this.onAni();
                });
            }
            else {
                this.onAni();
            }
        }
        m_loadRes:Array<any> = [];
        onAni() : void {
            this.doAction(0);
            if(this.m_sp) {
                this.m_sp.visible = true;
                let TimeLine = new Laya.TimeLine();
                TimeLine.addLabel("avatarMegaphone_1_", 0).to(this.m_sp, {x:300}, 0,null, 0);
                TimeLine.addLabel("avatarMegaphone_2_", 0).to(this.m_sp, {x:0}, 500,null, 0);
                TimeLine.play(0, false);
                TimeLine.once(Laya.Event.COMPLETE, this,this.AvatarMegaphoneComplete);
            }
        }

        private linkAvatarMegaphone(data:any, root:string, i:number) : void {
            let msg:any = msMoudle.getWindowInfo(data[root], "MapHelper.img");

            let strMarker:string = "res/Map/MapHelper.img/" + msg.strMarker;

            let tIndex:number = this.AvatarMegaphoneData.length;
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z = data[root + ".z"];
            this.AvatarMegaphoneData[tIndex] = new Object();
            this.AvatarMegaphoneData[tIndex].tex = strMarker;
            this.AvatarMegaphoneData[tIndex].orgx = -Number(oringinInfo.x);
            this.AvatarMegaphoneData[tIndex].orgy = -Number(oringinInfo.y);
            this.AvatarMegaphoneData[tIndex].delay = 150;
            this.AvatarMegaphoneData[tIndex].z = z?Number(z) : 0;
        }

        private doAction(frameIndex:number) : void {
            if(this.AvatarMegaphoneData.length > 0) {
                if(frameIndex >= this.AvatarMegaphoneData.length) frameIndex = 0;
                let tex:any = Laya.loader.getRes(this.AvatarMegaphoneData[frameIndex].tex);
                this.AvatarMegaphoneAni.skin = this.AvatarMegaphoneData[frameIndex].tex;
                this.AvatarMegaphoneAni.pos(this.AvatarMegaphoneData[frameIndex].orgx + (Laya.stage.width - tex.width),
                    this.AvatarMegaphoneData[frameIndex].orgy);
                this.AvatarMegaphoneAni.zOrder = this.AvatarMegaphoneData[frameIndex].z;

                if(this.AvatarMegaphoneData.length > 1) Laya.timer.once(this.AvatarMegaphoneData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
            }
        }

        private AvatarMegaphoneComplete() : void {

        }
        //

    }

}