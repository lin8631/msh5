/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../scene/Other/Guide.ts" />

namespace app.createChar {

    import cssCharacter = CharacterRole.Character;
    import cssGuide = GuideMoudle.Guide;

    export class CreateCharDlg extends ui.createChar.CreateCharDlgUI implements ui.createChar.ICreateCharDlgUI{
        public static className = "app.createChar.CreateCharDlg";
        private m_Arr:Array<any> = [];
        private m_select:number = 0;
        private m_name:string;
        private char:cssCharacter;
        private sel_hero:number = 0;

        onInitialize(): void {

            this.bg.width = Laya.stage.width;
            this.bg.height = Laya.stage.height;

            this.jobname.text = msMoudle.m_job[ms.selHero];
            this.onBtnRandomNameClick();

            for(let key in msMoudle.characterjson) {
                this.m_Arr[this.m_Arr.length] = msMoudle.characterjson[key];
            }

            let sp:Laya.Sprite = new Laya.Sprite();
            sp.graphics.drawRect((800-Laya.stage.width)/2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            sp.zOrder = 999999999;
            this.addChild(sp);
            Laya.Tween.to(sp, {alpha:0}, 500);

            this.showHero(0);
            this.selectHero(0, null);

            Laya.stage.addChild(this.centersp);
            this.centersp.x = Laya.stage.width / 2 - 250;
            // Laya.stage.addChild(this.leftsp);
            // this.leftsp.x = -225;
            Laya.stage.addChild(this.lstfashion);
            this.lstfashion.x = (Laya.stage.width - 150 - 280);
            this.lstfashion.vScrollBarSkin = "";
            this.lstfashion.dataModel = new Array(100);

            this.onBtnWeaponClick(null);
        }

        onBtnLeftClick(e: Laya.Event): void {
            if(this.can_touch) {
                this.sel_hero--;
                if(this.sel_hero < 0) this.sel_hero = 9;
                ms.selHero = this.sel_hero;
                this.onBtnWeaponClick(null);
                this.jobname.text = msMoudle.m_job[ms.selHero];
                this.onBtnRandClick(null);
            }
            else {
                msMoudle.toast("请不要点击太快");
            }
        }

        onBtnRightClick(e: Laya.Event): void {
            if(this.can_touch) {
                this.sel_hero++;
                if(this.sel_hero > 9) this.sel_hero = 0;
                ms.selHero = this.sel_hero;
                this.onBtnWeaponClick(null);
                this.jobname.text = msMoudle.m_job[ms.selHero];
                this.onBtnRandClick(null);
            }
            else {
                msMoudle.toast("请不要点击太快");
            }
        }

        // onStandClick(e: Laya.Event): void {
        //     this.char.changeByName("stand", 0);
        // }
        // onWalkClick(e: Laya.Event): void {
        //     this.char.changeByName("walk", 0);
        // }
        // onAttackClick(e: Laya.Event): void {
        //     let rnk:number = msMoudle.getRandValue(0, 0, this.char.m_attack_list.length);
        //     this.char.changeByName(this.char.m_attack_list[rnk], 0);
        // }

        m_index:number = 0;
        reset(btn:any) : void {
            let btns = [this.btnWeapon, this.btnCoat, this.btnPants, this.btnShoes, this.btnGlove, this.btnCap, this.btnCape, this.btnHair,this.btnBody, this.btnFace];
            for(let i:number = 0; i < btns.length; i++) {
                btns[i].strokeColor = "#2f2b2b";
            }
            btn.strokeColor = "#093799";
        }

        getAllWeapon(sel_hero:number) : any {
            let allWeapons:Array<any> = [];
            for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
                let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                if(sel_hero == 0) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "枪" || WeaponType == "矛") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 1 || sel_hero == 5 || sel_hero == 7 || sel_hero == 13 || sel_hero == 23 || sel_hero == 25 || sel_hero == 29 || sel_hero == 35) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短杖" || WeaponType == "长杖" || WeaponType == "手杖") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 2 || sel_hero == 32) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短刀" || WeaponType == "刀") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 3 || sel_hero == 36) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "弓") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 4) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双手剑" || WeaponType == "双手斧" || WeaponType == "双手钝器") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 6 || sel_hero == 27 || sel_hero == 28 || sel_hero == 33 || sel_hero == 34) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "单手剑" || WeaponType == "单手斧" || WeaponType == "单手钝器") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 8) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "弩") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 9 || sel_hero == 37) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳套") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 10 || sel_hero == 18 || sel_hero == 26) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳甲") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 11 || sel_hero == 38) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "短枪") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 12) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双手剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 14) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "能量剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 15) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "太刀") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 16) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "锁链") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 17) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "魔力手套") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 19) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "扇") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 20) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "大剑") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 21) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "灵魂手统") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 22) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "矛") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 24) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "双弩") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 30) {
                    let WeaponType = msMoudle.getWeaponType(msMoudle.AllWeapon[i]);
                    if(WeaponType == "拳炮") {
                        allWeapons[allWeapons.length] = msMoudle.AllWeapon[i];
                    }
                }
                else if(sel_hero == 31) {
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
            let allweapon = this.getAllWeapon(this.sel_hero);
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
                let allweapon = this.getAllWeapon(this.sel_hero);
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

                ms.selbody[ms.selHero] = _selbody;
                ms.selface[ms.selHero] = _face;
                ms.selhair[ms.selHero] = _hair;
                msMoudle.getSlotWeapon(_coat, msMoudle.partType.tCoat)
                msMoudle.getSlotWeapon(_pants, msMoudle.partType.tPants)
                msMoudle.getSlotWeapon(_weapon, msMoudle.partType.tWeapon)
                msMoudle.getSlotWeapon(_shoes, msMoudle.partType.tShoes)
                msMoudle.getSlotWeapon(_glove, msMoudle.partType.tGlove)
                msMoudle.getSlotWeapon(_cap, msMoudle.partType.tCap)
                msMoudle.getSlotWeapon(_cape, msMoudle.partType.tCape)

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

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tWeapon)

            }
            else if(this.m_index == msMoudle.partType.tCoat) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCoat, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCoat)
            }
            else if(this.m_index == msMoudle.partType.tPants) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tPants, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tPants)
            }
            else if(this.m_index == msMoudle.partType.tShoes) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tShoes, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tShoes)
            }
            else if(this.m_index == msMoudle.partType.tCap) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCap, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCap)
            }
            else if(this.m_index == msMoudle.partType.tCape) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tCape, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tCape)
            }
            else if(this.m_index == msMoudle.partType.tGlove) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tGlove, wea_id);

                msMoudle.getSlotWeapon(this.m_data[index].id, msMoudle.partType.tGlove)
            }
            else if(this.m_index == msMoudle.partType.tHair) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tHair, wea_id);

                ms.selhair[ms.selHero] = wea_id;
            }
            else if(this.m_index == msMoudle.partType.tBody) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tBody, wea_id);
                this.char.changePart(msMoudle.partType.tHead, "000" + (Number(this.m_data[index].id) + 10000) + ".img");

                ms.selbody[ms.selHero] = wea_id;
            }
            else if(this.m_index == msMoudle.partType.tFace) {
                this.selectFash(index);
                let wea_id:string = this.m_data[index].id + ".img";
                this.char.changePart(msMoudle.partType.tFace, wea_id);

                ms.selface[ms.selHero] = wea_id;
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
            if(this.centersp) {
                this.centersp.removeSelf();
                this.centersp = null;
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

        private selectHero(index:number, char:any) : void {

            // this.showSucc(index);

            ////装备外型
            ms.testweapon = this.m_Arr[index].weapon;
            ms.testcap = this.m_Arr[index].cap;
            ms.testfweapon = this.m_Arr[index].fweapon;
            ms.testlongcoat = this.m_Arr[index].longcoat;
            ms.testname = this.m_name;
        }

        onBtnStartClick(): void {
            //重置
            for(let i:number = 0; i < ms.m_job.length; i++) ms.m_job[i] = "";
            ms.m_job[ms.selHero] = msMoudle.m_job[ms.selHero];

            ms.testname = this.iptCharName.text;
            ///角色初始属性
            ms.herodata.Name = ms.testname;
            ms.herodata.Lv = 1;             //等级            ----面板
            ms.herodata.Job = 0;//AllJuanZhous            //职业            ----面板
            ms.herodata.Str.baseVal = 11;   //力量            ----面板
            ms.herodata.Dex.baseVal = 11;   //敏捷            ----面板
            ms.herodata.Inte.baseVal = 11;//4;   //智力            ----面板
            ms.herodata.Luck.baseVal = 11;//4;   //运气            ----面板
            let inithp = msMoudle.getRandValue(200, 0, 50);
            let initmp = 100;
            // ms.herodata.HP.baseVal = inithp;
            ms.herodata.MaxHP.baseVal = inithp;     //初始生命       ----面板
            // ms.herodata.MP.baseVal = initmp;
            ms.herodata.MaxMP.baseVal = initmp;

            ms.herodata.PADamage.baseVal = 0;   //物理攻击力
            ms.herodata.MADamage.baseVal = 0;   //魔法攻击力
            ms.herodata.PDDamage.baseVal = 0;   //物理防御力
            ms.herodata.MDDamage.baseVal = 0;   //魔法防御力
            ms.herodata.Accurate.baseVal = 100;  //命中率
            ms.herodata.Evasion.baseVal = 0;     //闪避率
            ms.herodata.CriticalRate.baseVal = 0;   //暴击率
            ms.herodata.Mastery.baseVal = 75;    //熟练度     (暂时为100)
            ms.herodata.DamageRate.baseVal = 0; //攻击力（百分比）
            ms.herodata.AttackSpeed.baseVal = 0;   //攻击速度
            ms.herodata.WalkSpeed.baseVal = 0;  //移动速度

            //初始技能
            ms.herodata.Skill_1 = "N";
            ms.herodata.Skill_2 = "N";
            ms.herodata.Skill_3 = "N";
            ms.herodata.Skill_4 = "N";

            msReward._r1();
            ///////////
            if(ms.story) {
                msMoudle.gameP = Laya.stage;
                let g:cssGuide = new cssGuide();
                g.m_center = true;
                g.m_updata("gamestart", null);
                this.close();
            }
            else {
                let back:Laya.Image = new Laya.Image();
                back.graphics.drawRect(0, 0, Laya.stage.width, 600, "#000000");
                back.zOrder = 10000000;
                Laya.stage.addChild(back);
                back.alpha = 0;
                msMoudle._alphasp3(back, 1000);
                Laya.timer.once(2000, this, ()=> {
                    if(back) {
                        console.log("maincity")
                        ui.show(app.homeland.MajorCityDlg);

                        if(back) {
                            back.removeSelf();
                            back = null;
                        }
                        this.close();
                    }
                });
            }
        }

        onBtnRandomNameClick(): void {
            //随机名字生成
            this.m_name = msMoudle.getRandomName();
            this.iptCharName.text = this.m_name;
        }


    }
}