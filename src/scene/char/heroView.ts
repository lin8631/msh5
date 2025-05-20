/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Pet.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Skill.ts" />

module app.char {
    import cssCharacter = CharacterRole.Character;
    import cssPet = PetRole.Pet;
    import cssMsg = MsgRole.Msg;

    export class heroView extends ui.char.heroViewUI implements ui.char.IheroViewUI {
        public static className = "app.char.heroView";

        char:cssCharacter;
        private m_msg:cssMsg;
        onInitialize(){
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.m_msg = new cssMsg();

            // if(ms.herodata.BagSlots2.length <= 0) {
                // ms.herodata.BagSlots2 = [];
                // for(let i:number = 0; i < msMoudle.AllWeapon2.length; i++) {
                //     msMoudle.getWeapon2(msMoudle.AllWeapon2[i]);
                // }
                // for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
                //     if(msMoudle.getWeaponType(msMoudle.AllWeapon[i]) == "单手剑") {
                //         msMoudle.getWeapon2(msMoudle.AllWeapon[i]);
                //     }
                // }
            //     for(let i:number = 0; i < msMoudle.AllCoat.length; i++) {
            //         msMoudle.getWeapon2(msMoudle.AllCoat[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllPants.length; i++) {
            //         msMoudle.getWeapon2(msMoudle.AllPants[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllShoes.length; i++) {
            //         msMoudle.getWeapon2(msMoudle.AllShoes[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllGlove.length; i++) {
            //         msMoudle.getWeapon2(msMoudle.AllGlove[i]);
            //     }
                // for(let i:number = 0; i < msMoudle.AllCap.length; i++) {
                //     msMoudle.getWeapon2(msMoudle.AllCap[i]);
                // }
            //     for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
            //         msMoudle.getWeapon2(msMoudle.AllCape[i]);
            //     }
            // }
            // if(ms.hairList.length <= 0) {
                // for(let i:number = 0; i < msMoudle.AllBody.length; i++) {
                //     ms.bodyList[ms.bodyList.length] = msMoudle.AllBody[i];
                // }
                // for(let i:number = 0; i < msMoudle.AllFace.length; i++) {
                //     ms.faceList[ms.faceList.length] = msMoudle.AllFace[i];
                // }
                // for(let i:number = 0; i < msMoudle.AllHair.length; i++) {
                //     ms.hairList[ms.hairList.length] = msMoudle.AllHair[i];
                // }
            // }

            this.updateData();
        }


        updateData() : void {
            this.part_weapon.partname.text = "武器";
            this.part_weapon.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tWeapon]);

            this.part_coat.partname.text = "上衣";
            this.part_coat.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tCoat]);

            this.part_pants.partname.text = "裤子";
            this.part_pants.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tPants]);

            this.part_shoes.partname.text = "鞋子";
            this.part_shoes.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tShoes]);

            this.part_cap.partname.text = "帽子";
            this.part_cap.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tCap]);

            this.part_cape.partname.text = "披风";
            this.part_cape.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tCape]);

            this.part_glove.partname.text = "手套";
            this.part_glove.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tGlove]);

            this.part_hair.partname.text = "头发";
            this.part_hair.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tHair]);

            this.part_body.partname.text = "肤色";
            this.part_body.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tBody]);

            this.part_face.partname.text = "脸型";
            this.part_face.on(Laya.Event.CLICK, this, this.EquipShow, [msMoudle.partType.tFace]);

            this.showImg(msMoudle.partType.tWeapon, "N");
            this.showImg(msMoudle.partType.tCoat, "N");
            this.showImg(msMoudle.partType.tPants, "N");
            this.showImg(msMoudle.partType.tShoes, "N");
            this.showImg(msMoudle.partType.tCap, "N");
            this.showImg(msMoudle.partType.tCape, "N");
            this.showImg(msMoudle.partType.tGlove, "N");

            let eSlots = msMoudle.getSlotByJob(ms.selHero);
            if(eSlots) {
                this.showImg(msMoudle.partType.tWeapon, eSlots[msMoudle.partType.tWeapon] ? eSlots[msMoudle.partType.tWeapon].id + ".img" : "N");
                this.showImg(msMoudle.partType.tCoat, eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "N");
                this.showImg(msMoudle.partType.tPants, eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "N");
                this.showImg(msMoudle.partType.tShoes, eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N");
                this.showImg(msMoudle.partType.tCap, eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N");
                this.showImg(msMoudle.partType.tCape, eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N");
                this.showImg(msMoudle.partType.tGlove, eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N");
            }

            // if(ms.bodyList.length > 0)
                this.showImg(msMoudle.partType.tBody, ms.selbody[ms.selHero]);
            // if(ms.faceList.length > 0)
                this.showImg(msMoudle.partType.tFace, ms.selface[ms.selHero]);
            // if(ms.hairList.length > 0)
                this.showImg(msMoudle.partType.tHair, ms.selhair[ms.selHero]);

            this.lstBag.vScrollBarSkin = "";
            this.lstBag.dataModel = new Array(16);

            this.char = new cssCharacter();
            this.char.m_name = ms.m_job[ms.selHero];
            let E:any = {};
            E.body = "00002000.img";
            E.head = "00012000.img";
            if(ms.selbody[ms.selHero] != "N" && ms.selbody[ms.selHero]) {
                E.body = ms.selbody[ms.selHero];
                E.head = "000" + (Number(ms.selbody[ms.selHero].split(".")[0]) + 10000) + ".img";
            }
            E.face = "00020012.img";
            if(ms.selface[ms.selHero] != "N")
                E.face = ms.selface[ms.selHero];
            E.hair = "00030020.img";
            if(ms.selhair[ms.selHero] != "N")
                E.hair = ms.selhair[ms.selHero];

            E.coat = "01040002.img";
            E.pants = "01060002.img";
            E.weapon = msMoudle.getWeaponByJob(ms.selHero);
            E.shoes = "N";
            E.glove = "N";
            //扎昆头盔类似gm帽子改配置zmap
            E.cap = "N";//01002357.img 01002140 01002017
            E.cape = "N";
            E.longcoat = "N";
            if(eSlots) {
                E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";
                E.weapon = msMoudle.getWeaponByJob(ms.selHero);

                if(eSlots[msMoudle.partType.tWeapon]) {
                    E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
                }

                E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                //扎昆头盔类似gm帽子改配置zmap
                E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                E.longcoat = "N";
            }

            // if(ms.pet) {
            //     if(ms.pet.id != "N") {
            //         this.pet = new cssPet();
            //         this.pet.changeAll(this.m_sp, ms.pet.id, this.char.m_x + 50, this.char.m_y);
            //     }
            // }
            if(ms.ring) {
                if(ms.ring.id != "N") this.char.m_ring = ms.ring.id;
            }

            this.char.changeAll(this.body, E, 0, 0);

            this.m_index = 0;
            this.onBtnWeaponClick(null);
        }

        m_index:number = 0;
        reset(btn:any) : void {
            let btns = [this.btnWeapon, this.btnCoat, this.btnPants, this.btnShoes, this.btnGlove, this.btnCap, this.btnCape, this.btnHair,this.btnBody, this.btnFace];
            for(let i:number = 0; i < btns.length; i++) {
                btns[i].color = "#000000";
            }
            btn.color = "#be531e";
        }

        updataByType() : void {
            let tIndex:number = 0;
            if(ms.herodata.BagSlots2.length > msMoudle.FASHIONMAX) {
                ms.herodata.BagSlots2.length = msMoudle.FASHIONMAX;
                msMoudle.toast("背包容量已经超过了" + msMoudle.FASHIONMAX);
            }
            if(this.m_index == msMoudle.partType.tWeapon) {
                this.weapon_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    ///
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tWeapon) {
                        this.weapon_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                    ///
                }
                this.lstBag.dataModel = this.weapon_datas;
            }
            else if(this.m_index == msMoudle.partType.tCoat) {
                this.coat_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tCoat) {
                        this.coat_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.coat_datas;
            }
            else if(this.m_index == msMoudle.partType.tPants) {
                this.pants_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tPants) {
                        this.pants_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.pants_datas;
            }
            else if(this.m_index == msMoudle.partType.tShoes) {
                this.shoes_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tShoes) {
                        this.shoes_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.shoes_datas;
            }
            else if(this.m_index == msMoudle.partType.tGlove) {
                this.glove_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tGlove) {
                        this.glove_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.glove_datas;
            }
            else if(this.m_index == msMoudle.partType.tCap) {
                this.cap_datas = new Array(16);
                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tCap) {
                        this.cap_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.cap_datas;
            }
            else if(this.m_index == msMoudle.partType.tCape) {
                this.cape_datas = new Array(16);

                for(let i:number = 0; i < ms.herodata.BagSlots2.length; i++) {
                    if(ms.herodata.BagSlots2[i].part == msMoudle.partType.tCape) {
                        this.cape_datas[tIndex] = ms.herodata.BagSlots2[i];
                        tIndex++;
                    }
                }
                this.lstBag.dataModel = this.cape_datas;
            }
        }

        onBtnRankClick(e: Laya.Event): void {
            // this.close()
            ui.manager.getDialogByName("app.char.charDlg").dlg.close();
            ui.show(app.createChar.fashionDlg);
        }

        m_data:Array<any> = [];
        onBtnBodyClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tBody;
            this.reset(this.btnBody);
            this.m_data = new Array(16)
            for(let i:number = 0; i < ms.bodyList.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = ms.bodyList[i];
                this.m_data[i].part = msMoudle.partType.tBody;
            }
            this.lstBag.dataModel = this.m_data;
        }
        onBtnFaceClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tFace;
            this.reset(this.btnFace)
            this.m_data = new Array(16)
            for(let i:number = 0; i < ms.faceList.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = ms.faceList[i];
                this.m_data[i].part = msMoudle.partType.tFace;
            }
            this.lstBag.dataModel = this.m_data;
        }
        weapon_datas:Array<model.Equip> = [];
        onBtnWeaponClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tWeapon;
            this.reset(this.btnWeapon)
            this.updataByType();
        }
        coat_datas:Array<model.Equip> = [];
        onBtnCoatClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCoat;
            this.reset(this.btnCoat)
            this.updataByType();
        }
        pants_datas:Array<model.Equip> = [];
        onBtnPantsClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tPants;
            this.reset(this.btnPants)
            this.updataByType();
        }
        shoes_datas:Array<model.Equip> = [];
        onBtnShoesClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tShoes;
            this.reset(this.btnShoes)
            this.updataByType();
        }
        glove_datas:Array<model.Equip> = [];
        onBtnGloveClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tGlove;
            this.reset(this.btnGlove)
            this.updataByType();
        }
        cap_datas:Array<model.Equip> = [];
        onBtnCapClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCap;
            this.reset(this.btnCap)
            this.updataByType();
        }
        cape_datas:Array<model.Equip> = [];
        onBtnCapeClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCape;
            this.reset(this.btnCape)
            this.updataByType();
        }
        onBtnHairClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tHair;
            this.reset(this.btnHair)
            this.m_data = new Array(16)
            for(let i:number = 0; i < ms.hairList.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = ms.hairList[i];
                this.m_data[i].part = msMoudle.partType.tHair;
            }
            this.lstBag.dataModel = this.m_data;
        }

        onLstBagCellClick(e: Laya.Event, index: number): void {
            // ui.manager.getDialogByName("app.char.charDlg").dlg.close();
            // ui.show(app.createChar.fashionDlg);



            // let wea_id = "";

            // if(this.m_index == msMoudle.partType.tWeapon) {
            //     if(this.weapon_datas[index]) {
            //         wea_id = this.weapon_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCoat) {
            //     if(this.coat_datas[index]) {
            //         wea_id = this.coat_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tPants) {
            //     if(this.pants_datas[index]) {
            //         wea_id = this.pants_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tShoes) {
            //     if(this.shoes_datas[index]) {
            //         wea_id = this.shoes_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCap) {
            //     if(this.cap_datas[index]) {
            //         wea_id = this.cap_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCape) {
            //     if(this.cape_datas[index]) {
            //         wea_id = this.cape_datas[index].id + ".img";
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tGlove) {
            //     if(this.glove_datas[index]) {
            //         wea_id = this.glove_datas[index].id + ".img";
            //     }
            // }

            // else if(this.m_index == msMoudle.partType.tHair) {
            //     if(ms.hairList[index]) {
            //         wea_id = ms.hairList[index] + ".img";
            //         this.char.changePart(msMoudle.partType.tHair, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tHair, wea_id);
            //         this.showImg(msMoudle.partType.tHair, wea_id);

            //         if(!ms.selhair[ms.selHero]) ms.selhair[ms.selHero] = "N";
            //         let org = (ms.selhair[ms.selHero] == "N") ? "N" : ms.selhair[ms.selHero].split(".")[0];
            //         ms.selhair[ms.selHero] = wea_id;
            //         ms.hairList.splice(index, 1);
            //         if(org != "N") ms.hairList[ms.hairList.length] = org.split(".")[0];
            //         // this.updataByType();
            //         this.onBtnHairClick(null);
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tBody) {
            //     if(ms.bodyList[index]) {
            //         wea_id = ms.bodyList[index] + ".img";
            //         this.char.changePart(msMoudle.partType.tBody, wea_id);
            //         this.char.changePart(msMoudle.partType.tHead, "000" + (Number(ms.bodyList[index]) + 10000) + ".img");

            //         msMoudle.mapP.char.changePart(msMoudle.partType.tBody, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tHead, "000" + (Number(ms.bodyList[index]) + 10000) + ".img");

            //         this.showImg(msMoudle.partType.tBody, wea_id);

            //         if(!ms.selbody[ms.selHero]) ms.selbody[ms.selHero] = "N";
            //         let org = (ms.selbody[ms.selHero] == "N") ? "N" : ms.selbody[ms.selHero].split(".")[0];
            //         ms.selbody[ms.selHero] = wea_id;
            //         ms.bodyList.splice(index, 1);
            //         if(org != "N") ms.bodyList[ms.bodyList.length] = org.split(".")[0];
            //         // this.updataByType();
            //         this.onBtnBodyClick(null);
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tFace) {
            //     if(ms.faceList[index]) {
            //         wea_id = ms.faceList[index] + ".img";
            //         this.char.changePart(msMoudle.partType.tFace, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tFace, wea_id);
            //         this.showImg(msMoudle.partType.tFace, wea_id);

            //         if(!ms.selface[ms.selHero]) ms.selface[ms.selHero] = "N";
            //         let org = (ms.selface[ms.selHero] == "N") ? "N" : ms.selface[ms.selHero].split(".")[0];
            //         ms.selface[ms.selHero] = wea_id;
            //         ms.faceList.splice(index, 1);
            //         if(org != "N") ms.faceList[ms.faceList.length] = org.split(".")[0];
            //         // this.updataByType();
            //         this.onBtnFaceClick(null);
            //     }
            // }

            // ////
            // if(wea_id != "") {
            //     if(this.m_index == msMoudle.partType.tFace || this.m_index == msMoudle.partType.tBody || this.m_index == msMoudle.partType.tHair) {

            //     }
            //     else {
            //         this.m_msg.equipLoadShow2(wea_id.split(".")[0], this, "装备", "丢弃", index);
            //     }
            // }
            // //
        }

        onCellDo(index: number) : void {
            // let wea_id = "";
            // if(this.m_index == msMoudle.partType.tWeapon) {
            //     if(this.weapon_datas[index]) {
            //         wea_id = this.weapon_datas[index].id + ".img";

            //         let wtype = msMoudle.getWeaponType(wea_id);
            //         if(ms.selHero == 0 && (wtype == "枪" || wtype == "矛") ||
            //             ms.selHero == 1 && (wtype == "长杖" || wtype == "短杖" || wtype == "法杖") ||
            //             ms.selHero == 2 && wtype == "短刀" ||
            //             ms.selHero == 3 && wtype == "弓" ||
            //             ms.selHero == 6 && (wtype == "单手剑" || wtype == "单手斧" || wtype == "单手钝器") ||
            //             ms.selHero == 5 && (wtype == "长杖" || wtype == "短杖" || wtype == "法杖") ||
            //             ms.selHero == 4 && (wtype == "双手剑" || wtype == "双手斧" || wtype == "双手钝器") ||
            //             ms.selHero == 7 && (wtype == "长杖" || wtype == "短杖" || wtype == "法杖") ||
            //             ms.selHero == 8 && wtype == "弩" ||
            //             ms.selHero == 9 && wtype == "拳套" ||
            //             ms.selHero == 10 && wtype == "拳甲" ||
            //             ms.selHero == 11 && wtype == "短枪" ||
            //             ms.selHero == 12 && wtype == "双手剑"
            //             ) {

            //             this.char.changePart(msMoudle.partType.tWeapon, wea_id);
            //             msMoudle.mapP.char.changePart(msMoudle.partType.tWeapon, wea_id);
            //             this.showImg(msMoudle.partType.tWeapon, wea_id);

            //             ms.herodata.wearEquip2(this.weapon_datas[index]);

            //             ////这里不对，明天早上修改
            //             this.updataByType();
            //         }
            //         else {
            //             msMoudle.toast("该职业无法穿戴");
            //         }
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCoat) {
            //     if(this.coat_datas[index]) {
            //         wea_id = this.coat_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tCoat, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tCoat, wea_id);
            //         this.showImg(msMoudle.partType.tCoat, wea_id);

            //         ms.herodata.wearEquip2(this.coat_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tPants) {
            //     if(this.pants_datas[index]) {
            //         wea_id = this.pants_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tPants, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tPants, wea_id);
            //         this.showImg(msMoudle.partType.tPants, wea_id);

            //         ms.herodata.wearEquip2(this.pants_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tShoes) {
            //     if(this.shoes_datas[index]) {
            //         wea_id = this.shoes_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tShoes, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tShoes, wea_id);
            //         this.showImg(msMoudle.partType.tShoes, wea_id);

            //         ms.herodata.wearEquip2(this.shoes_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCap) {
            //     if(this.cap_datas[index]) {
            //         wea_id = this.cap_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tCap, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tCap, wea_id);
            //         this.showImg(msMoudle.partType.tCap, wea_id);

            //         ms.herodata.wearEquip2(this.cap_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCape) {
            //     if(this.cape_datas[index]) {
            //         wea_id = this.cape_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tCape, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tCape, wea_id);
            //         this.showImg(msMoudle.partType.tCape, wea_id);

            //         ms.herodata.wearEquip2(this.cape_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tGlove) {
            //     if(this.glove_datas[index]) {
            //         wea_id = this.glove_datas[index].id + ".img";
            //         this.char.changePart(msMoudle.partType.tGlove, wea_id);
            //         msMoudle.mapP.char.changePart(msMoudle.partType.tGlove, wea_id);
            //         this.showImg(msMoudle.partType.tGlove, wea_id);

            //         ms.herodata.wearEquip2(this.glove_datas[index]);

            //         this.updataByType();
            //     }
            // }
        }

        onRmvDo(index: number) : void {
            // let wea_id = "";
            // if(this.m_index == msMoudle.partType.tWeapon) {
            //     if(this.weapon_datas[index]) {
            //         wea_id = this.weapon_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.weapon_datas[index]);

            //         ////这里不对，明天早上修改
            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCoat) {
            //     if(this.coat_datas[index]) {
            //         wea_id = this.coat_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.coat_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tPants) {
            //     if(this.pants_datas[index]) {
            //         wea_id = this.pants_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.pants_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tShoes) {
            //     if(this.shoes_datas[index]) {
            //         wea_id = this.shoes_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.shoes_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCap) {
            //     if(this.cap_datas[index]) {
            //         wea_id = this.cap_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.cap_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tCape) {
            //     if(this.cape_datas[index]) {
            //         wea_id = this.cape_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.cape_datas[index]);

            //         this.updataByType();
            //     }
            // }
            // else if(this.m_index == msMoudle.partType.tGlove) {
            //     if(this.glove_datas[index]) {
            //         wea_id = this.glove_datas[index].id + ".img";

            //         ms.herodata.sellEquip2(this.glove_datas[index]);

            //         this.updataByType();
            //     }
            // }
        }

        EquipShow(parttype:number) : void {
            // ui.manager.getDialogByName("app.char.charDlg").dlg.close();
            // ui.show(app.createChar.fashionDlg);


            // if(parttype == msMoudle.partType.tHair) {
            //     this.part_hair.img.skin = "";
            //     if(ms.selhair[ms.selHero] && ms.selhair[ms.selHero] != "N")
            //         ms.hairList[ms.hairList.length] = ms.selhair[ms.selHero].split(".")[0];
            //     ms.selhair[ms.selHero] = "N";

            //     this.char.changePart(msMoudle.partType.tHair, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tHair, "N");

            //     // this.updataByType();
            //     this.onBtnHairClick(null);
            // }
            // else if(parttype == msMoudle.partType.tBody) {
            //     this.part_body.img.skin = "";
            //     if(ms.selbody[ms.selHero] && ms.selbody[ms.selHero] != "N")
            //         ms.bodyList[ms.bodyList.length] = ms.selbody[ms.selHero].split(".")[0];
            //     ms.selbody[ms.selHero] = "N";

            //     this.char.changePart(msMoudle.partType.tBody, "N");
            //     this.char.changePart(msMoudle.partType.tHead, "N");

            //     msMoudle.mapP.char.changePart(msMoudle.partType.tBody, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tHead, "N");

            //     // this.updataByType();
            //     this.onBtnBodyClick(null);
            // }
            // else if(parttype == msMoudle.partType.tFace) {
            //     this.part_face.img.skin = "";
            //     if(ms.selface[ms.selHero] && ms.selface[ms.selHero] != "N")
            //         ms.faceList[ms.faceList.length] = ms.selface[ms.selHero].split(".")[0];
            //     ms.selface[ms.selHero] = "N";

            //     this.char.changePart(msMoudle.partType.tFace, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tFace, "N");

            //     // this.updataByType();
            //     this.onBtnFaceClick(null);
            // }
            // else {
            //     let eSlots = ms.herodata.EquipSlots2;
            //     if(ms.selHero == 0) {}
            //     else if(ms.selHero == 1) {eSlots = ms.herodata.EquipSlots3}
            //     else if(ms.selHero == 2) {eSlots = ms.herodata.EquipSlots4}
            //     else if(ms.selHero == 3) {eSlots = ms.herodata.EquipSlots5}
            //     else if(ms.selHero == 4) {eSlots = ms.herodata.EquipSlots6}
            //     else if(ms.selHero == 5) {eSlots = ms.herodata.EquipSlots7}
            //     else if(ms.selHero == 6) {eSlots = ms.herodata.EquipSlots8}
            //     else if(ms.selHero == 7) {eSlots = ms.herodata.EquipSlots9}
            //     else if(ms.selHero == 8) {eSlots = ms.herodata.EquipSlots10}
            //     else if(ms.selHero == 9) {eSlots = ms.herodata.EquipSlots11}
            //     else if(ms.selHero == 10) {eSlots = ms.herodata.EquipSlots12}
            //     else if(ms.selHero == 11) {eSlots = ms.herodata.EquipSlots13}
            //     else if(ms.selHero == 12) {eSlots = ms.herodata.EquipSlots14}
            //     else if(ms.selHero == 13) {eSlots = ms.herodata.EquipSlots15}
            //     else if(ms.selHero == 14) {eSlots = ms.herodata.EquipSlots16}
            //     else if(ms.selHero == 15) {eSlots = ms.herodata.EquipSlots17}
            //     if(eSlots[parttype]) {
            //         this.m_msg.equipLoadShow2(eSlots[parttype].id.split(".")[0], this, "卸下", "", parttype);
            //     }
            // }
        }

        onEqpDo(parttype:number) : void {
            // let eSlots = msMoudle.getSlotByJob(ms.selHero);
            // if(parttype == msMoudle.partType.tWeapon) {
            //     this.part_weapon.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tWeapon, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tWeapon, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tCoat) {
            //     this.part_coat.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tCoat, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tCoat, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tPants) {
            //     this.part_pants.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tPants, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tPants, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tShoes) {
            //     this.part_shoes.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tShoes, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tShoes, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tCap) {
            //     this.part_cap.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tCap, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tCap, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tCape) {
            //     this.part_cape.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tCape, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tCape, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
            // else if(parttype == msMoudle.partType.tGlove) {
            //     this.part_glove.img.skin = "";
            //     this.char.changePart(msMoudle.partType.tGlove, "N");
            //     msMoudle.mapP.char.changePart(msMoudle.partType.tGlove, "N");

            //     if(eSlots[parttype]) {
            //         ms.herodata.putoffEquip2(eSlots[parttype]);
            //         this.updataByType();
            //     }
            // }
        }

        // onBtnBackClick(e: Laya.Event): void {
        //     // this.close();
        //     if(msMoudle.isScreen()) {
        //         if(msMoudle.mainT) {
        //             if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
        //                 msMoudle.mainT.cz_sp.visible = true;
        //             }
        //         }
        //     }
        // }

        // initbody:string = "00002000.img";
        // inithead:string = "00012000.img";
        // inithair:string = msMoudle.getSexHair(ms.herodata.Sex);
        // initface:string = "00020012.img";

        showImg(parttype:number, id:string) : void {
            let img = "";
            if(id != "N") {
                if(msMoudle.partDirs[parttype] == "Hair")
                    img = "res/Character/" + msMoudle.partDirs[parttype]  + "/" + id + "/default.hair.png";
                else if(msMoudle.partDirs[parttype] == "Body")
                    img = "res/Character/" + msMoudle.partDirs[parttype]  + "/" + id + "/swingT2.0.body.png";
                else if(msMoudle.partDirs[parttype] == "Face")
                    img = "res/Character/" + msMoudle.partDirs[parttype]  + "/" + id + "/default.face.png";
                else
                    img = "res/Character/" + msMoudle.partDirs[parttype]  + "/" + id + "/info.icon.png";
            }
            if(parttype == msMoudle.partType.tWeapon)
                this.part_weapon.img.skin = img;
            else if(parttype == msMoudle.partType.tCoat)
                this.part_coat.img.skin = img;
            else if(parttype == msMoudle.partType.tPants)
                this.part_pants.img.skin = img;
            else if(parttype == msMoudle.partType.tShoes)
                this.part_shoes.img.skin = img;
            else if(parttype == msMoudle.partType.tCap)
                this.part_cap.img.skin = img;
            else if(parttype == msMoudle.partType.tCape)
                this.part_cape.img.skin = img;
            else if(parttype == msMoudle.partType.tGlove)
                this.part_glove.img.skin = img;
            else if(parttype == msMoudle.partType.tHair) {
                this.part_hair.img.skin = img;
                // this.part_hair.img.scale(1, 1);
            }
            else if(parttype == msMoudle.partType.tBody)
                this.part_body.img.skin = img;
            else if(parttype == msMoudle.partType.tFace)
                this.part_face.img.skin = img;
        }

        onClose() {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }

        //
    }
}