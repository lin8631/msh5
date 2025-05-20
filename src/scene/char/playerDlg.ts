/// <reference path="./../../scene/Other/Guide.ts" />
module app.char {

    import cssMsg = MsgRole.Msg;
    import cssCharacter = CharacterRole.Character;

    export class playerDlg extends ui.char.playerDlgUI implements ui.char.IplayerDlgUI {
        public static className = "app.char.playerDlg";

        private m_msg:cssMsg;
        private char:cssCharacter;
        private m_id:string;

        constructor(params:any){
            super();

            if(params) this.m_id = params;
        }

        onInitialize(){

            // msMoudle.popShow(this, (800 - 480) / 2, (600 - 320) / 2);
            this.x = (Laya.stage.width - 960) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.eqp1.partname.text = "武器";
            this.eqp2.partname.text = "防具";
            this.eqp3.partname.text = "披风";
            this.eqp4.partname.text = "盾牌";
            this.eqp5.partname.text = "手套";
            this.eqp6.partname.text = "鞋子";
            this.eqp7.partname.text = "帽子";
            this.eqp8.partname.text = "耳环";
            this.eqp9.partname.text = "项链";
            this.eqp10.partname.text = "腰带";
            this.eqp11.partname.text = "脸饰";
            this.eqp12.partname.text = "眼饰";
            this.eqp13.partname.text = "勋章";

            this.m_msg = new cssMsg();

            this.updateData();
        }


        public updateData(){

            let P = this;
            //获取对手信息
            let message = new Net.Message();
            message.xieyi = 308 + ms._dpip;
            message.msdata = { "user": this.m_id, "password":"123456" };
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                if(data["code"] == 0) {
                    let herodata:any = JSON.parse(data["msdata"]._context);
                    // console.log("######")
                    // let herodata = null;
                    let hdata = Gua.getByServer(herodata);
                    // console.log(hdata);

                    P.onAbi(hdata);
                    P.onEqp(hdata);
                    P.onShow();
                }
            }});
        }

        onAbi(herodata:any) : void {
            if(herodata) {
                this._abl._name.text = herodata.Name;
                this._abl._lv.text = herodata.Lv.toString();
                this._abl._hp.text = (herodata.MaxHP.GetSum() + 10 * herodata.Lv) .toFixed(0);
                let pad:any = herodata.CalcAttackRange();
                this._abl._pad.text = pad.minatk + "~" + pad.maxatk;
                this._abl._mad.text = (herodata.MADamage.GetSum() + herodata.Inte.GetSum()).toFixed(0);
                this._abl._pdd.text = herodata.PDDamage.GetSum().toFixed(0);
                this._abl._mdd.text = herodata.MDDamage.GetSum().toFixed(0);
                this._abl._miss.text = herodata.Evasion.GetSum().toFixed(0);
                this._abl._target.text = herodata.Accurate.GetSum().toFixed(0);
                this._abl._str.text = herodata.Str.ToStringDetail();
                this._abl._dex.text = herodata.Dex.ToStringDetail();
                this._abl._int.text = herodata.Inte.ToStringDetail();
                this._abl._luck.text = herodata.Luck.ToStringDetail();
            }
        }

        onShow() : void {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            for(let i:number = 0; i < Sync.realPlayers.length; i++) {
                if(Sync.realPlayers[i].m_id == this.m_id) {
                    this.char = new cssCharacter();
                    this.char.m_nametag_show = false;
                    this.char.changeAll(this._show, Sync.realPlayers[i].m_E, 0, 0);
                    break;
                }
            }
        }

        m_herodata:any = null;
        onEqp(herodata:any) : void {
            if(herodata) {
                this.m_herodata = herodata;
                let slots:Array<any> = [this.eqp1.img, this.eqp2.img, this.eqp3.img, this.eqp4.img, this.eqp5.img, this.eqp6.img,
                this.eqp7.img, this.eqp8.img, this.eqp9.img, this.eqp10.img, this.eqp11.img, this.eqp12.img, this.eqp13.img];
                for(let i:number = 0; i < 13; i++) {
                    slots[i].skin = "";
                    if(herodata.EquipSlots[i]) {
                        if(msMoudle.isWeapon(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Weapon/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isLongCoat(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/LongCoat/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isCape(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Cape/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isShield(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Shield/" + herodata.EquipSlots[i].id + ".img/info.icon.png";

                        else if(msMoudle.isGlove(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Glove/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isShoes(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Shoes/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isCap(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Cap/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory1(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory1/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory2(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory2/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory3(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory3/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory4(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory4/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory5(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory5/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                        else if(msMoudle.isAccessory6(Number(herodata.EquipSlots[i].id)))
                            slots[i].skin = "res/Character/Accessory6/" + herodata.EquipSlots[i].id + ".img/info.icon.png";
                    }
                }
            }
        }


        onEqp1Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[0]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[0]);
            }
        }
        onEqp2Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[1]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[1]);
            }
        }
        onEqp3Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[2]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[2]);
            }
        }
        onEqp4Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[3]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[3]);
            }
        }
        onEqp5Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[4]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[4]);
            }
        }
        onEqp6Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[5]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[5]);
            }
        }
        onEqp7Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[6]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[6]);
            }
        }
        onEqp8Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[7]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[7]);
            }
        }
        onEqp9Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[8]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[8]);
            }
        }
        onEqp10Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[9]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[9]);
            }
        }
        onEqp11Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[10]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[10]);
            }
        }
        onEqp12Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[11]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[11]);
            }
        }
        onEqp13Click2(e: Laya.Event): void {
            if(this.m_herodata && this.m_herodata.EquipSlots[12]) {
                this.m_msg.equipShow(this.m_herodata.EquipSlots[12]);
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onClose() {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }

    }
}