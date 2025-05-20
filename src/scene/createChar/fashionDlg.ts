/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../scene/Other/Guide.ts" />

namespace app.createChar {

    import cssCharacter = CharacterRole.Character;
    import cssGuide = GuideMoudle.Guide;

    export class fashionDlg extends ui.createChar.fashionDlgUI implements ui.createChar.IfashionDlgUI{
        public static className = "app.createChar.fashionDlg";
        private m_Arr:Array<any> = [];
        private m_select:number = 1;
        private m_name:string;
        private char:cssCharacter;

        onInitialize(): void {

            this.bg.width = Laya.stage.width;
            this.bg.height = Laya.stage.height;

            for(let key in msMoudle.characterjson) {
                this.m_Arr[this.m_Arr.length] = msMoudle.characterjson[key];
            }

            let sp:Laya.Sprite = new Laya.Sprite();
            sp.graphics.drawRect((800-Laya.stage.width)/2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            sp.zOrder = 999999999;
            this.addChild(sp);
            Laya.Tween.to(sp, {alpha:0}, 500);

            this.showHero(0);

            Laya.stage.addChild(this.lstfashion);
            this.lstfashion.x = (Laya.stage.width - 150 - 280);
            this.lstfashion.vScrollBarSkin = "";
            this.lstfashion.dataModel = new Array(100);

            this.onBtnWeaponClick(null);

            this.onBtnRandClick(null);
        }

        m_index:number = 0;
        reset(btn:any) : void {
            let btns = [this.btnWeapon, this.btnCoat, this.btnPants, this.btnShoes, this.btnGlove, this.btnCap, this.btnCape, this.btnHair,this.btnBody, this.btnFace];
            for(let i:number = 0; i < btns.length; i++) {
                btns[i].strokeColor = "#2f2b2b";
            }
            btn.strokeColor = "#093799";
        }

        getAllWeapon() : any {
            let allWeapons:Array<any> = [];
            for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {

                if(ms.selHero == 0) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "枪" || WeaponType == "矛") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 1 || ms.selHero == 5 || ms.selHero == 7 || ms.selHero == 13 || ms.selHero == 23 || ms.selHero == 25 || ms.selHero == 29 || ms.selHero == 35) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短杖" || WeaponType == "长杖" || WeaponType == "手杖") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 2 || ms.selHero == 32) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短刀" || WeaponType == "刀") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 3 || ms.selHero == 36) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "弓") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 4) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双手剑" || WeaponType == "双手斧" || WeaponType == "双手钝器") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 6 || ms.selHero == 27 || ms.selHero == 28 || ms.selHero == 33 || ms.selHero == 34) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "单手剑" || WeaponType == "单手斧" || WeaponType == "单手钝器") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 8) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "弩") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 9 || ms.selHero == 37) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳套") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 10 || ms.selHero == 18 || ms.selHero == 26) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳甲") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 11 || ms.selHero == 38) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短枪") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 12) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双手剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 14) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "能量剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 15) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "太刀") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 16) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "锁链") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 17) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "魔力手套") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 19) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "扇") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 20) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "大剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 21) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "灵魂手统") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 22) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "矛") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 24) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双弩") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 30) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳炮") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(ms.selHero == 31) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "远古弓") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "单手剑" || WeaponType == "单手斧" || WeaponType == "单手钝器") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
            }
            return allWeapons;
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();


            msMoudle.help = null;
            msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);

            // msMoudle.gameP.gotoScene(ms.lastmap);


            ms.saveServer();
            Laya.timer.once(3000, null, ()=> {
                ms.saveServer();
            });
            // let a = true;
            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = true;
            //         }
            //     }
            // }
        }



        save_body:string = "N";
        save_face:string = "N";
        save_hair:string = "N";
        save_coat:string = "N";
        save_pants:string = "N";
        save_weapon:string = "N";
        save_shoes:string = "N";
        save_glove:string = "N";
        save_cap:string = "N";
        save_cape:string = "N";
        onBtnSaveClick(e: Laya.Event): void {
            this.lstfashion.visible = false;
            ui.show(app.createChar.buyDlg, {black:true});
        }

        public imgShow() : void {
            this.lstfashion.visible = true;
        }

        public saveQuit() : void {
            // if(ms.jinbi() >= 50000) {
            //     msMoudle._(); msMoudle.updateJinBi(-50000);
                // msMoudle.toast("保存成功");
                let E:any = {};
                if(this.save_body != "N") {
                    ms.selbody[ms.selHero] = this.save_body;
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tBody, this.save_body + ".img");
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tHead, "000" + (Number(this.save_body) + 10000) + ".img");
                    E.body = this.save_body + ".img";
                    E.head = "000" + (Number(this.save_body) + 10000) + ".img"
                }
                if(this.save_face != "N") {
                    ms.selface[ms.selHero] = this.save_face;
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tFace, this.save_face + ".img");
                    E.face = this.save_face + ".img";
                }
                if(this.save_hair != "N") {
                    ms.selhair[ms.selHero] = this.save_hair;
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tHair, this.save_hair + ".img");
                    E.hair = this.save_hair + ".img";
                }
                if(this.save_coat != "N") {
                    msMoudle.getSlotWeapon(this.save_coat, msMoudle.partType.tCoat)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tCoat, this.save_coat + ".img");
                    E.coat = this.save_face + ".img";
                }
                if(this.save_pants != "N") {
                    msMoudle.getSlotWeapon(this.save_pants, msMoudle.partType.tPants)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tPants, this.save_pants + ".img");
                    E.pants = this.save_face + ".img";
                }
                if(this.save_weapon != "N") {
                    msMoudle.getSlotWeapon(this.save_weapon, msMoudle.partType.tWeapon)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tWeapon, this.save_weapon + ".img");
                    E.weapon = this.save_face + ".img";
                }
                if(this.save_shoes != "N") {
                    msMoudle.getSlotWeapon(this.save_shoes, msMoudle.partType.tShoes)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tShoes, this.save_shoes + ".img");
                    E.shoes = this.save_face + ".img";
                }
                if(this.save_glove != "N") {
                    msMoudle.getSlotWeapon(this.save_glove, msMoudle.partType.tGlove)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tGlove, this.save_glove + ".img");

                    E.glove = this.save_face + ".img";
                }
                if(this.save_cap != "N") {
                    msMoudle.getSlotWeapon(this.save_cap, msMoudle.partType.tCap)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tCap, this.save_cap + ".img");

                    E.cap = this.save_face + ".img";
                }
                if(this.save_cape != "N") {
                    msMoudle.getSlotWeapon(this.save_cape, msMoudle.partType.tCape)
                    // msMoudle.mapP.char.changePart(msMoudle.partType.tCape, this.save_cape + ".img");

                    E.cape = this.save_face + ".img";
                }
                this.onBtnBackClick(null);
            // }
            // else {
            //     msMoudle.toast("金币不足");
            // }
        }

        m_data:Array<any> = [];
        onBtnBodyClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tBody;
            this.reset(this.btnBody);
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllBody.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllBody[i];
                this.m_data[i].part = msMoudle.partType.tBody;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        onBtnFaceClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tFace;
            this.reset(this.btnFace)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllFace.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllFace[i];
                this.m_data[i].part = msMoudle.partType.tFace;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        weapon_datas:Array<model.Equip> = [];
        onBtnWeaponClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tWeapon;
            this.reset(this.btnWeapon)
            this.m_data = new Array(24)
            let allweapon = this.getAllWeapon();
            for(let i:number = 0; i < allweapon.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = allweapon[i];
                this.m_data[i].part = msMoudle.partType.tWeapon;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        coat_datas:Array<model.Equip> = [];
        onBtnCoatClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCoat;
            this.reset(this.btnCoat)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllCoat.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllCoat[i];
                this.m_data[i].part = msMoudle.partType.tCoat;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        pants_datas:Array<model.Equip> = [];
        onBtnPantsClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tPants;
            this.reset(this.btnPants)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllPants.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllPants[i];
                this.m_data[i].part = msMoudle.partType.tPants;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        shoes_datas:Array<model.Equip> = [];
        onBtnShoesClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tShoes;
            this.reset(this.btnShoes)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllShoes.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllShoes[i];
                this.m_data[i].part = msMoudle.partType.tShoes;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        glove_datas:Array<model.Equip> = [];
        onBtnGloveClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tGlove;
            this.reset(this.btnGlove)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllGlove.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllGlove[i];
                this.m_data[i].part = msMoudle.partType.tGlove;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        cap_datas:Array<model.Equip> = [];
        onBtnCapClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCap;
            this.reset(this.btnCap)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllCap.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllCap[i];
                this.m_data[i].part = msMoudle.partType.tCap;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        cape_datas:Array<model.Equip> = [];
        onBtnCapeClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tCape;
            this.reset(this.btnCape)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllCape[i];
                this.m_data[i].part = msMoudle.partType.tCape;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }
        onBtnHairClick(e: Laya.Event): void {
            this.m_index = msMoudle.partType.tHair;
            this.reset(this.btnHair)
            this.m_data = new Array(24)
            for(let i:number = 0; i < msMoudle.AllHair.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].id = msMoudle.AllHair[i];
                this.m_data[i].part = msMoudle.partType.tHair;
                this.m_data[i].cc = false;
            }
            this.lstfashion.dataModel = this.m_data;
            this.lstfashion.scrollBar.value = 0;
        }

        selectFash(index:number) : void {
            for(let i:number = 0; i < this.m_data.length; i++) {
                if(this.m_data[i]) this.m_data[i].cc = false;
            }
            this.m_data[index].cc = true;
        }

        m_weapon:string = "N";
        m_coat:string = "N";
        m_pants:string = "N";
        m_shoes:string = "N";
        m_glove:string = "N";
        m_cap:string = "N";
        m_cape:string = "N";
        m_hair:string = "N";
        m_body:string = "N";
        m_face:string = "N";

        can_touch:boolean = true;
        onBtnRandClick(e: Laya.Event): void {
            if(this.can_touch) {
                this.can_touch = false;

                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                }
                this.char = new cssCharacter();
                let allweapon = this.getAllWeapon();
                let E:any = {};
                let selbody = msMoudle.AllBody[msMoudle.getRandValue(0, 0, msMoudle.AllBody.length)] + ".img";
                E.body = selbody;
                E.head = "000" + (Number(selbody.split(".")[0]) + 10000) + ".img";
                E.face = msMoudle.AllFace[msMoudle.getRandValue(0, 0, msMoudle.AllFace.length)] + ".img";
                E.hair = msMoudle.AllHair[msMoudle.getRandValue(0, 0, msMoudle.AllHair.length)] + ".img";

                let _coat = msMoudle.AllCoat[msMoudle.getRandValue(0, 0, msMoudle.AllCoat.length)];
                let _pants = msMoudle.AllPants[msMoudle.getRandValue(0, 0, msMoudle.AllPants.length)];
                let _weapon = allweapon[msMoudle.getRandValue(0, 0, allweapon.length)];
                let _shoes = msMoudle.AllShoes[msMoudle.getRandValue(0, 0, msMoudle.AllShoes.length)];
                let _glove = msMoudle.AllGlove[msMoudle.getRandValue(0, 0, msMoudle.AllGlove.length)];
                let _cap = "N";//msMoudle.AllCap[msMoudle.getRandValue(0, 0, msMoudle.AllCap.length)]
                let _cape = msMoudle.AllCape[msMoudle.getRandValue(0, 0, msMoudle.AllCape.length)];

                E.weapon = _weapon + ".img";
                E.coat = _coat + ".img";
                E.pants = _pants + ".img";
                E.shoes = _shoes + ".img";
                E.glove = _glove + ".img";
                // E.cap =  + ".img";
                E.cape = _cape + ".img";

                this.char.m_nametag_show = false;
                this.char.changeAll(this, E, 200, 335);
                this.char.setDir(-1);

                ////保存形态信息
                let _selbody = E.body;
                let _face = E.face;
                let _hair = E.hair;

                this.save_body = _selbody;
                this.save_face = _face;
                this.save_hair = _hair;
                this.save_coat = _coat;
                this.save_pants = _pants;
                this.save_weapon = _weapon;
                this.save_shoes = _shoes;
                this.save_glove = _glove;
                this.save_cap = _cap;
                this.save_cape = _cape;

                Laya.timer.once(1000, this, ()=> {
                    this.can_touch = true;
                });
            }
            else {
                msMoudle.toast("请不要点击太快");
            }
        }

        onLstfashionCellClick(e: Laya.Event, index: number): void {
            if(!this.m_data[index]) return ;

            if(this.m_index == msMoudle.partType.tWeapon) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tWeapon, wea_id);

                this.save_weapon = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tWeapon)

            }
            else if(this.m_index == msMoudle.partType.tCoat) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCoat, wea_id);

                this.save_coat = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCoat)
            }
            else if(this.m_index == msMoudle.partType.tPants) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tPants, wea_id);

                this.save_pants = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tPants)
            }
            else if(this.m_index == msMoudle.partType.tShoes) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tShoes, wea_id);

                this.save_shoes = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tShoes)
            }
            else if(this.m_index == msMoudle.partType.tCap) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCap, wea_id);

                this.save_cap = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCap)
            }
            else if(this.m_index == msMoudle.partType.tCape) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCape, wea_id);

                this.save_cape = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCape)
            }
            else if(this.m_index == msMoudle.partType.tGlove) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tGlove, wea_id);

                this.save_glove = this.m_data[index].id;
                // msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tGlove)
            }
            else if(this.m_index == msMoudle.partType.tHair) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tHair, wea_id);

                this.save_hair = wea_id;
            }
            else if(this.m_index == msMoudle.partType.tBody) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tBody, wea_id);
                this.char.changePart(msMoudle.partType.tHead, "000" + (Number(this.m_data[index].id) + 10000) + ".img");

                this.save_body = wea_id;
            }
            else if(this.m_index == msMoudle.partType.tFace) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tFace, wea_id);

                this.save_face = wea_id;
            }
            this.lstfashion.dataModel = this.m_data;
        }

        // skill:SkillRole.Skill;
        // showSucc(i:number) : void {
        //     let data:any = msMoudle.wz["122.img"]["skill.1221003"];
        //     if(this.skill) {
        //         this.skill.clearUp();
        //         this.skill.removeSelf();
        //         this.skill = null;
        //     }
        //     this.skill = new SkillRole.Skill();
        //     this.skill.changeAll(null, this.char.m_state_sp, "1221003", 0, 0, data, 1);
        // }

        onClose(){
        //     if(this.skill) {
        //         this.skill.clearUp();
        //         this.skill.removeSelf();
        //         this.skill = null;
        //     }
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            if(this.lstfashion) {
                this.lstfashion.removeSelf();
                this.lstfashion = null;
            }
        }

        private showHero(index:number) : void {
            if(!this.char) {
                this.char = new cssCharacter();
                this.char.m_nametag_show = false;
                let E:any = {};
                E.weapon = this.m_Arr[index].weapon;
                E.fweapon = this.m_Arr[index].fweapon;
                E.coat = "01040002.img";
                E.pants = "01060002.img";
                this.char.m_name = this.m_name;
                this.char.changeAll(this, E, 200, 335);
                this.char.setDir(-1);
            }
        }


        //

    }
}