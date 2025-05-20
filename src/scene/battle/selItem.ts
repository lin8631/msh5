module app.battle {
    import cssCharacter = CharacterRole.Character;
    export class selItem extends ui.battle.selItemUI  {
        public static className = "app.battle.selItem";
        private hero: cssCharacter;

        updateData(data: any, index: number) {
            if(this.hero) {
                this.hero.clearUp();
                this.hero = null;
            }
            // this._name.text = "";
            // this.di.visible = false;
            this.tip.visible = false;
            this._show.skin = "";
            if(index >= 39)
                this._name.text = msMoudle.m_job[index] + "(积)";
            else
                this._name.text = msMoudle.m_job[index];
            if(data != "") {

                // this.bg.skin = "homeland/Arbeit.slotBackgrnd.png";

                // this.di.visible = true;
                this.hero = new cssCharacter();
                this.hero.m_name = ms.m_job[index];
                let E:any = {};

                // if(ms.bodyList.length > 0) {
                    if(ms.selbody[index]) {
                        if(ms.selbody[index] != "N") {
                            E.body = ms.selbody[index];
                            E.head = "000" + (Number(ms.selbody[index].split(".")[0]) + 10000) + ".img";
                        }
                    }
                // }
                // if(ms.faceList.length > 0) {
                    if(ms.selface[index]) {
                        if(ms.selface[index] != "N")
                            E.face = ms.selface[index];
                    }
                // }
                E.hair = "00030020.img";
                // if(ms.hairList.length > 0) {
                    if(ms.selhair[index]) {
                        if(ms.selhair[index] != "N")
                            E.hair = ms.selhair[index];
                    }
                // }

                this.hero.initweapon = msMoudle.getWeaponByJob(index);
                E.weapon = msMoudle.getWeaponByJob(index);
                E.coat = "01040002.img";
                E.pants = "01060002.img";
                E.shoes = "N";
                E.glove = "N";
                //扎昆头盔类似gm帽子改配置zmap
                E.cap = "N";//01002357.img 01002140 01002017
                E.cape = "N";

                let eSlots = msMoudle.getSlotByJob(index);
                if(eSlots) {
                    E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                    E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";
                    if(eSlots[msMoudle.partType.tWeapon]) E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
                    E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                    E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                    //扎昆头盔类似gm帽子改配置zmap
                    E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                    E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                }


                E.longcoat = "N";
                this.hero.m_nametag_show = false;
                if(ms.selHero != index) this.hero.is_oneFrame = true;
                this.hero.changeAll(this._body, E, 0, 0);
                if(ms.selHero == index) {
                    this.tip.visible = true;
                    if(this.hero && this.hero.m_action) {
                        if(this.hero.m_action.indexOf("walk") < 0) {
                            this.hero.changeByName("walk", 0);
                        }
                    }
                }

                // this._name.text = data;
            }
            else {
                this._show.skin = "common/CharSelect.buyCharacter_.7.png";

                // if(index > 2)
                    // this._name.text = "未开放";
                // this.bg.skin = "event/characterCard.CardBackgrnd.99.png";
            }
        }

        onClose() {
            if(this.hero) {
                this.hero.clearUp();
                this.hero = null;
            }
        }

        /////

    }
}