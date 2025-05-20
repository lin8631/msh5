/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Pet.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Skill.ts" />

module app.char {
    import cssCharacter = CharacterRole.Character;
    import cssPet = PetRole.Pet;
    import cssMsg = MsgRole.Msg;
    import cssSkill = SkillRole.Skill;

    export class charDlg extends ui.char.charDlgUI implements ui.char.IcharDlgUI {
        public static className = "app.char.charDlg";

        private char:cssCharacter;
        private pet:cssPet;
        private m_index:number = 0;
        private m_msg:cssMsg;
        private skillArr:Array<any> = [];
        private sArr:Array<any> = [];

        onInitialize(){
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (Laya.stage.width - 960) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
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

            this._eff.visible = false;
            // this.eqp_star.partname.text = "时装";
            this.eqp_tamingmob.partname.text = "坐骑";
            this.eqp_pet.partname.text = "宠物";
            this.eqp_ring.partname.text = "戒指";
            this.eqp_chair.partname.text = "椅子";

            // msMoudle.updatelhs(1000000);
            // msMoudle._(); msMoudle.updateJinBi(10000000);
            // msMoudle._(); msMoudle.updateCaiLiao1(20000);
            // msMoudle._(); msMoudle.updateJueXing1(20000);

            //
            // msMoudle._(); msMoudle.updateRongYu(200000);
            // msMoudle._(); msMoudle.updateJiFen(14000);
            // msMoudle._(); msMoudle.updateCaiLiao2(65000);
            // msMoudle._(); msMoudle.getItem("2040598")

            // msMoudle._(); msMoudle.getItem("2040596")
            // msMoudle._(); msMoudle.getItem("2040597")
            // msMoudle._(); msMoudle.getItem("2040595")

            // msMoudle._(); msMoudle.updateCaiLiao2(200000);
            // msMoudle._(); msMoudle.updateRongYu(1000000);
            // msMoudle._(); msMoudle.updateZuanShi(10000);
            // for(let i:number = 0; i < 500; i++) {           //这是第1-3名
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }

            // msMoudle._(); msMoudle.updateCaiLiao2(100000);
            // msMoudle._(); msMoudle.updateRongYu(500000);
            // msMoudle._(); msMoudle.updateZuanShi(7000);
            // for(let i:number = 0; i < 350; i++) {           //这是第4-5名
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }

            // msMoudle._(); msMoudle.updateCaiLiao2(50000);
            // msMoudle._(); msMoudle.updateRongYu(100000);
            // msMoudle._(); msMoudle.updateZuanShi(3500);
            // for(let i:number = 0; i < 175; i++) {           //这是第6-10名
                // msMoudle._(); msMoudle.getItem("2040599")
            // }

            // for(let i:number = 0; i < 300; i++) {
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }

            // msMoudle._(); msMoudle.updateJiFen(3000);

            // msMoudle._(); msMoudle.getWeapon("01382234")  //假x阿丽莎
            // msMoudle._(); msMoudle.getWeapon("01382235")  //阿丽莎
            // msMoudle._(); msMoudle.getWeapon("01005140")  //999
            // msMoudle._(); msMoudle.getWeapon("01472261")//160拳套
            // msMoudle._(); msMoudle.getWeapon("01052789");//120衣服
            // msMoudle._(); msMoudle.getWeapon("01382259");//160杖
            // msMoudle._(); msMoudle.getWeapon("01432214");//160枪
            // msMoudle._(); msMoudle.getWeapon("01402251");//160双手
            // msMoudle._(); msMoudle.getWeapon("01462239");//160弩
            // msMoudle._(); msMoudle.getWeapon("01402179")//假01402179
            // msMoudle._(); msMoudle.getWeapon("01402180")//真01402180
            // msMoudle._(); msMoudle.getWeapon("01072358")   //永恒鞋子
            // msMoudle._(); msMoudle.getWeapon("01082237")   //永恒手套
            // msMoudle._(); msMoudle.getWeapon("01442023")//黑拖把

            //新年大礼包
            //999帽子+阿丽莎+解放的刀+100神秘+5W修炼+15W枫叶+1W积分=648
            // msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
            // msMoudle._(); msMoudle.getWeapon("01005140")   //999
            // msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
            // for(let i:number = 0; i < 100 * 1; i++) {
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }
            // msMoudle._(); msMoudle.updateCaiLiao2(50000 * 1);
            // msMoudle._(); msMoudle.updateRongYu(150000 * 1);
            // msMoudle._(); msMoudle.updateJiFen(10000 * 1);

            //盾牌 1092058

            //假礼包
            // msMoudle._(); msMoudle.getWeapon("01382234")  //假x阿丽莎
            // msMoudle._(); msMoudle.getWeapon("01402179")//假01402179
            // for(let i:number = 0; i < 50 * 1; i++) {
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }
            // msMoudle._(); msMoudle.updateCaiLiao2(250000);
            // msMoudle._(); msMoudle.updateRongYu(70000 * 1);
            // msMoudle._(); msMoudle.updateJiFen(5000 * 1);


            // msMoudle._(); msMoudle.updateRongYu(150000 * 1.4);
            // msMoudle._(); msMoudle.updateJiFen(10000 * 1.4);
            // for(let i:number = 0; i < 50; i++) {
            //     msMoudle._(); msMoudle.getItem("2040821");
            // }
            // for(let i:number = 0; i < 100 * 1.3; i++) {
            //     msMoudle._(); msMoudle.getItem("2040599")
            // }


            // for(let i:number = 0; i < 50; i++) {
            //     for(let i:number = 0; i < msMoudle.AllJuanZhousBC.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhousBC[i]);
            //     }
            // }

            // msMoudle._(); msMoudle.getWeapon("01052789");//120衣服
            // msMoudle._(); msMoudle.getWeapon("01382259");//160武器
            // msMoudle._(); msMoudle.getWeapon("01102172");//120披风
            // msMoudle._(); msMoudle.getWeapon("01092058");//120盾牌
            // msMoudle._(); msMoudle.getWeapon("01302333");
            // msMoudle._(); msMoudle.getWeapon("01092049");

            // msMoudle._(); msMoudle.getWeapon("01022060");
            // msMoudle._(); msMoudle.getWeapon("01012132");
            // msMoudle._(); msMoudle.getWeapon("01142133");
            // msMoudle._(); msMoudle.getWeapon("01122034");
            // msMoudle._(); msMoudle.getWeapon("01032061");



            // for(let i:number = 0; i < 15; i++)
                    // msMoudle._(); msMoudle.getItem("2040599")   //神卷
            //         // msMoudle._(); msMoudle.getItem("2043303")  //短剑攻击必成卷
            //         // msMoudle._(); msMoudle.getItem("2043303")
            //     // }
            // // }
            // }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous1.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous1[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous2.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous2[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous3.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous3[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous4.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous4[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous5.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous5[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous6.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous6[i]);
            //     }
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous7.length; i++) {
            //         msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhous7[i]);
            //     }
            // }
            // msMoudle._(); msMoudle.getItem("2040599");

            // msMoudle._(); msMoudle.getWeapon("01382057")
            // /

            // msMoudle._(); msMoudle.getWeapon("01092059");
            // msMoudle._(); msMoudle.getWeapon("01092058");
            // msMoudle._(); msMoudle.getWeapon("01092057");
            // msMoudle._(); msMoudle.getWeapon("01092049");
            // msMoudle._(); msMoudle.getWeapon("01092042");
            // msMoudle._(); msMoudle.getWeapon("01052789");
            // msMoudle._(); msMoudle.getWeapon("01102172");
            // msMoudle._(); msMoudle.getWeapon("01332073");
            //     }
            // }
            // let xxxx:Array<any> = [
            //     "01302193","01302264","01302275",
            //     "01302285","01302292","01302297","01302312","01302314","01302315",
            //     "01302316","01302333","01332170","01332226","01332235","01332257","01332261",
            //     "01332274","01382102","01382104","01382105","01382124","01382125","01382126",
            //     "01382158","01382169","01382192","01382209","01382231",
            //     "01382244","01382245","01382259","01452189","01452196","01452202","01452226"
            // ];
            //
            // for(let i:number = 0; i < xxxx.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(xxxx[i]);
            // }

            // ms.herodata.BagSlots = [];
            // for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllWeapon[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllLongCoat.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllLongCoat[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllCape[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllShield.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllShield[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory1[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory2[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory3[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory4[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory5[i]);
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(msMoudle.AllAccessory6[i]);
            // }

            // let xx = ["01372032", "01382036","01382037",
            // "01382057","01382059", "01382060"];
            // for(let i:number = 0; i < xx.length; i++) {
            //     msMoudle._(); msMoudle.getWeapon(xx[i]);
            // }
            // ms.herodata.ZS = 30;

            // ms.herodata.Str.baseVal = 9999;
            // ms.herodata.Dex.baseVal = 9999;
            // ms.herodata.Inte.baseVal = 9999;
            // ms.herodata.Luck.baseVal = 9999;

            // this.jinbi.text = Math.floor(ms.jinbi()) + "";
            // this.rongyu.text = Math.floor(ms.rongyu()) + "";
            // this.zuanshi.text = Math.floor(ms.zuanshi()) + "";

            if(ms.selHero >= 39) {
                this.btnJB.visible = false;
                this.jb_txt.visible = false;
            }

            this.updateData();
            this.onBtnAbiClick2(null);
        }

        onBtnFenJieClick(e: Laya.Event): void {
            ui.show(app.battle.selectDlg, {black:true});
        }

        onBtnJBClick(e: Laya.Event): void {
            // ui.show(app.battle.selectDlg, {black:true});
            // msMoudle.toast("xxxx");

            this.m_msg.jbShow();
        }

        onJobmsgClick(e: Laya.Event): void {

        }

        // //使用武器
        // mainWeapon() : string {

        //     return "";
        // }
        // //主要属性
        // mainStr() : string {
        //     return "";
        // }

        onEqp_tamingmobClick2(e: Laya.Event): void {

        }
        onEqp_petClick2(e: Laya.Event): void {

        }
        onEqp_ringClick2(e: Laya.Event): void {

        }
        onEqp_chairClick2(e: Laya.Event): void {

        }


        updateData() : void {
            this.lstBag.vScrollBarSkin = "";
            // this.lstStar.vScrollBarSkin = "";
            this.lstTamingMob.vScrollBarSkin = "";
            this.lstPet.vScrollBarSkin = "";
            this.lstRing.vScrollBarSkin = "";

            this.curjob.text = msMoudle.m_job[ms.selHero];

            this.m_msg = new cssMsg();

            this.onEqp();

            this.onAbi();

            this.onHero();
        }

        onHero(chairid:string = "N", tamingmob:boolean = false) : void {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }


            this.char = new cssCharacter();
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


            E.weapon = msMoudle.getWeaponByJob(ms.selHero);
            E.coat = "01040002.img";
            E.pants = "01060002.img";
            E.shoes = "N";
            E.glove = "N";
            //扎昆头盔类似gm帽子改配置zmap
            E.cap = "N";//01002357.img 01002140 01002017
            E.cape = "N";
            E.longcoat = "N";

            let eSlots = msMoudle.getSlotByJob(ms.selHero);
            if(eSlots) {
                if(eSlots[msMoudle.partType.tWeapon]) {
                    E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
                }
                E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";
                E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                //扎昆头盔类似gm帽子改配置zmap
                E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                E.longcoat = "N";
            }

            if(ms.ring) {
                if(ms.ring.id != "N") this.char.m_ring = ms.ring.id;
            }
            if(chairid != "N") {
                this.char.m_chair = chairid;
            }
            else {
                if(tamingmob) {
                    E.tamingmob =    ms.tamingmob.tamingmob1;//01902000  01902028    01902032
                    E.tamingmob0 =   ms.tamingmob.tamingmob2;//01912000  01912021    01912025
                }
            }
            this.char.m_name = ms.testname;
            this.char.m_lv = ms.herodata.Lv;
            // console.log(ms.ring.id)
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            this.char.changeAll(this._show, E, 0, 0);
        }

        showPet() : void {
            if(this.pet) {
                this.pet.clearUp();
                this.pet = null;
            }
            if(ms.pet.id != "N") {
                this.pet = new cssPet();
                this.pet.changeAll(this._show, ms.pet.id, 0 + 40, 0)
            }
        }

        onEqp1Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[0]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[0], "卸下", "砸卷");
            }
        }
        onEqp2Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[1]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[1], "卸下", "砸卷");
            }
        }
        onEqp3Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[2]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[2], "卸下", "砸卷");
            }
        }
        onEqp4Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[3]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[3], "卸下", "砸卷");
            }
        }
        onEqp5Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[4]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[4], "卸下", "砸卷");
            }
        }
        onEqp6Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[5]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[5], "卸下", "砸卷");
            }
        }
        onEqp7Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[6]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[6], "卸下", "砸卷");
            }
        }
        onEqp8Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[7]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[7], "卸下", "砸卷");
            }
        }
        onEqp9Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[8]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[8], "卸下", "砸卷");
            }
        }
        onEqp10Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[9]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[9], "卸下", "砸卷");
            }
        }
        onEqp11Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[10]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[10], "卸下", "砸卷");
            }
        }
        onEqp12Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[11]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[11], "卸下", "砸卷");
            }
        }
        onEqp13Click2(e: Laya.Event): void {
            if(ms.herodata.EquipSlots[12]) {
                this.m_msg.equipShow(ms.herodata.EquipSlots[12], "卸下", "砸卷");
            }
        }

        onBtnAbiClick2(e: Laya.Event): void {
            this.btnAbi.gray = false;
            this.btnStar.gray = true;
            this.btnTamingMob.gray = true;
            this.btnPet.gray = true;
            this.btnRing.gray = true;
            this.btnChair.gray = true;

            this.lstBag.visible = true;
            this.lstChair.visible = false;
            this.lstTamingMob.visible = false;
            this.lstPet.visible = false;
            this.lstRing.visible = false;

            this._show.visible = true;
            this.lstChair.dataModel = [];
            this.lstTamingMob.dataModel = [];
            this.lstPet.dataModel = [];
            this.lstRing.dataModel = [];

            this._eff.visible = false;
            this.onBag();

            this.charshow.visible = true;
            this.fashshow.visible = false;
        }

        onBtnStarClick2(e: Laya.Event): void {
            this.btnAbi.gray = true;
            this.btnStar.gray = false;
            this.btnTamingMob.gray = true;
            this.btnPet.gray = true;
            this.btnRing.gray = true;
            this.btnChair.gray = true;

            this.lstBag.visible = false;
            // this.lstStar.visible = true;
            this.lstTamingMob.visible = false;
            this.lstPet.visible = false;
            this.lstRing.visible = false;
            this.lstChair.visible = false;

            this.lstBag.dataModel = [];
            this.lstTamingMob.dataModel = [];
            this.lstPet.dataModel = [];
            this.lstChair.dataModel = [];
            this._show.visible = false;
            this._eff.visible = false;

            // this.onStar();
            this.charshow.visible = false;
            this.fashshow.visible = true;
            // this.fashshow.up
        }

        onBtnTamingMobClick2(e: Laya.Event): void {
            // ui.show(app.tamingmob.tamingmobDlg, {black:true});
            this.btnAbi.gray = true;
            this.btnStar.gray = true;
            this.btnTamingMob.gray = false;
            this.btnPet.gray = true;
            this.btnRing.gray = true;
            this.btnChair.gray = true;

            this.lstBag.visible = false;
            this.lstChair.visible = false;
            this.lstTamingMob.visible = true;
            this.lstPet.visible = false;
            this.lstRing.visible = false;

            this._show.visible = true;
            this.lstBag.dataModel = [];
            this.lstChair.dataModel = [];
            this.lstPet.dataModel = [];
            this.lstRing.dataModel = [];


            this._eff.visible = true;
            this.onTamingMob();

            this.charshow.visible = true;
            this.fashshow.visible = false;
        }

        onBtnPetClick2(e: Laya.Event): void {
            this.btnAbi.gray = true;
            this.btnStar.gray = true;
            this.btnTamingMob.gray = true;
            this.btnPet.gray = false;
            this.btnRing.gray = true;
            this.btnChair.gray = true;

            this.lstBag.visible = false;
            this.lstChair.visible = false;
            this.lstTamingMob.visible = false;
            this.lstPet.visible = true;
            this.lstRing.visible = false;

            this._show.visible = true;
            this.lstBag.dataModel = [];
            this.lstChair.dataModel = [];
            this.lstTamingMob.dataModel = [];
            this.lstRing.dataModel = [];


            this._eff.visible = true;
            this.onPet();

            this.charshow.visible = true;
            this.fashshow.visible = false;
        }

        onBtnRingClick2(e: Laya.Event): void {
            this.btnAbi.gray = true;
            this.btnStar.gray = true;
            this.btnTamingMob.gray = true;
            this.btnPet.gray = true;
            this.btnRing.gray = false;
            this.btnChair.gray = true;

            this.lstBag.visible = false;
            this.lstChair.visible = false;
            this.lstTamingMob.visible = false;
            this.lstPet.visible = false;
            this.lstRing.visible = true;

            this._show.visible = true;
            this.lstBag.dataModel = [];
            this.lstChair.dataModel = [];
            this.lstTamingMob.dataModel = [];
            this.lstPet.dataModel = [];

            this._eff.visible = true;

            this.onRing();

            this.charshow.visible = true;
            this.fashshow.visible = false;
        }

        onBtnChairClick2(e: Laya.Event): void {
            this.btnAbi.gray = true;
            this.btnStar.gray = true;
            this.btnTamingMob.gray = true;
            this.btnPet.gray = true;
            this.btnRing.gray = true;
            this.btnChair.gray = false;

            this.lstBag.visible = false;
            this.lstChair.visible = true;
            this.lstTamingMob.visible = false;
            this.lstPet.visible = false;
            this.lstRing.visible = false;

            this._show.visible = true;
            this.lstBag.dataModel = [];
            this.lstTamingMob.dataModel = [];
            this.lstPet.dataModel = [];
            this.lstRing.dataModel = [];

            this._eff.visible = true;

            this.onChair();

            this.charshow.visible = true;
            this.fashshow.visible = false;
        }

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 360, 240);
            this.close();
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }
        onEqp() : void {
            let slots:Array<any> = [this.eqp1.img, this.eqp2.img, this.eqp3.img, this.eqp4.img, this.eqp5.img, this.eqp6.img,
            this.eqp7.img, this.eqp8.img, this.eqp9.img, this.eqp10.img, this.eqp11.img, this.eqp12.img, this.eqp13.img];
            for(let i:number = 0; i < 13; i++) {
                slots[i].skin = "";
                if(ms.herodata.EquipSlots[i]) {
                    if(msMoudle.isWeapon(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Weapon/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isLongCoat(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/LongCoat/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isCape(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Cape/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isShield(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Shield/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";

                    else if(msMoudle.isGlove(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Glove/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isShoes(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Shoes/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isCap(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Cap/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory1(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory1/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory2(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory2/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory3(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory3/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory4(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory4/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory5(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory5/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                    else if(msMoudle.isAccessory6(Number(ms.herodata.EquipSlots[i].id)))
                        slots[i].skin = "res/Character/Accessory6/" + ms.herodata.EquipSlots[i].id + ".img/info.icon.png";
                }
            }
        }
        onAbi() : void {
            this._abl._name.text = ms.herodata.Name;
            this._abl._lv.text = ms.herodata.Lv.toString();
            this._abl._hp.text = (ms.herodata.MaxHP.GetSum() + 10 * ms.herodata.Lv) .toFixed(0);
            let pad:any = ms.herodata.CalcAttackRange();
            this._abl._pad.text = pad.minatk + "~" + pad.maxatk;
            this._abl._mad.text = (ms.herodata.MADamage.GetSum() + ms.herodata.Inte.GetSum()).toFixed(0);
            this._abl._pdd.text = ms.herodata.PDDamage.GetSum().toFixed(0);
            this._abl._mdd.text = ms.herodata.MDDamage.GetSum().toFixed(0);
            this._abl._miss.text = ms.herodata.Evasion.GetSum().toFixed(0);
            this._abl._target.text = ms.herodata.Accurate.GetSum().toFixed(0);
            this._abl._str.text = ms.herodata.Str.ToStringDetail();
            this._abl._dex.text = ms.herodata.Dex.ToStringDetail();
            this._abl._int.text = ms.herodata.Inte.ToStringDetail();
            this._abl._luck.text = ms.herodata.Luck.ToStringDetail();

            /////记录最大属性和伤害
            let maxstr = ms.herodata.Str.GetSum();
            let maxdex = ms.herodata.Dex.GetSum();
            let maxluk = ms.herodata.Luck.GetSum();
            let maxint = ms.herodata.Inte.GetSum();
            if(ms.max_atk < pad.maxatk) {
                ms.max_atk = pad.max_atk;
                if(ms.max_atk < pad.minatk) ms.max_atk = pad.minatk;
            }
            if(ms.max_str < maxstr) ms.max_str = maxstr;
            if(ms.max_dex < maxdex) ms.max_dex = maxdex;
            if(ms.max_luk < maxluk) ms.max_luk = maxluk;
            if(ms.max_int < maxint) ms.max_int = maxint;
        }
        ckArr:Array<any> = [];
        onBag() : void {
            this.ckArr = new Array(20);
            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                this.ckArr[i] = ms.herodata.BagSlots[i];
            }
            this.lstBag.dataModel = this.ckArr;

            if(ms.herodata.BagSlots.length >= msMoudle.BAGMAX) {
                msMoudle.toast2("你的包裹已经满" + msMoudle.BAGMAX + "个物品了");
            }

            this.onHero();
            if(this.pet) {
                this.pet.clearUp();
                this.pet = null;
            }
            // msMoudle.mapP.changeForce();
        }

        mKArr:Array<any> = [];
        onTamingMob() : void {
            this.eqp_tamingmob.img.skin = "";
            this.offTamingMob();

            this.mKArr = new Array(16);
            for(let i:number = 0; i < ms.tamingmobbagsdata.length; i++) {
                if(ms.tamingmobbagsdata[i]) {
                    this.mKArr[i] = new Object();
                    this.mKArr[i].openid = ms.tamingmobbagsdata[i].openid;
                    this.mKArr[i].id = ms.tamingmobbagsdata[i].id;
                    this.mKArr[i].type = "tamingmob";
                    if(ms.tamingmobbagsdata[i].openid == ms.tamingmob.openid) {
                        this.mKArr[i].sel = true;
                        this.eqp_tamingmob.img.skin = "res/Character/TamingMob/" + ms.tamingmobbagsdata[i].id + ".img/info.icon.png"

                        this.onTamingMobById(this.mKArr[i].id);
                    }
                    else this.mKArr[i].sel = false;
                }
            }
            this.lstTamingMob.dataSource = this.mKArr;

            this.onHero("N", true);
            // msMoudle.mapP.changeForce();
            if(this.pet) {
                this.pet.clearUp();
                this.pet = null;
            }
        }

        onPet() : void {
            this.eqp_pet.img.skin = "";
            this.offPet();

            this.mKArr = new Array(16);
            for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                if(ms.petbagsdata[i]) {
                    this.mKArr[i] = new Object();
                    this.mKArr[i].openid = ms.petbagsdata[i].openid;
                    this.mKArr[i].id = ms.petbagsdata[i].id;
                    this.mKArr[i].type = "pet";
                    if(ms.petbagsdata[i].openid == ms.pet.openid) {
                        this.mKArr[i].sel = true;
                        this.eqp_pet.img.skin = "res/Pet/" + ms.petbagsdata[i].id + ".img/info.icon.png";

                        this.onPetById(this.mKArr[i].id);
                    }
                    else this.mKArr[i].sel = false;
                }
            }
            this.lstPet.dataSource = this.mKArr;

            this.onHero();
            this.showPet();
            // msMoudle.mapP.changeForce();
        }

        onRing() : void {
            this.eqp_ring.img.skin = "";
            this.offRing();

            this.mKArr = new Array(16);
            for(let i:number = 0; i < ms.ringbagsdata.length; i++) {
                if(ms.ringbagsdata[i]) {
                    this.mKArr[i] = new Object();
                    this.mKArr[i].openid = ms.ringbagsdata[i].openid;
                    this.mKArr[i].id = ms.ringbagsdata[i].id;
                    this.mKArr[i].type = "ring";
                    if(ms.ringbagsdata[i].openid == ms.ring.openid) {
                        this.mKArr[i].sel = true;
                        this.eqp_ring.img.skin = "res/Character/Ring/" + ms.ringbagsdata[i].id + ".img/info.icon.png";

                        this.onRingById(this.mKArr[i].id);
                    }
                    else this.mKArr[i].sel = false;
                }
            }
            this.lstRing.dataSource = this.mKArr;

            this.onHero();
            // msMoudle.mapP.changeForce();
            if(this.pet) {
                this.pet.clearUp();
                this.pet = null;
            }
        }

        onChair() : void {
            this.eqp_chair.img.skin = "";
            this.offChair();

            this.mKArr = new Array(16);
            for(let i:number = 0; i < ms.chairbagsdata.length; i++) {
                if(ms.chairbagsdata[i]) {
                    this.mKArr[i] = new Object();
                    this.mKArr[i].openid = ms.chairbagsdata[i].openid;
                    this.mKArr[i].id = ms.chairbagsdata[i].id;
                    this.mKArr[i].type = "chair";
                    if(ms.chairbagsdata[i].openid == ms.chair.openid) {
                        this.mKArr[i].sel = true;
                        this.eqp_chair.img.skin = "res/Character/Chair/0301.img/" + ms.chairbagsdata[i].id + ".info.icon.png"

                        this.onChairById(this.mKArr[i].id);
                    }
                    else this.mKArr[i].sel = false;
                }
            }
            this.lstChair.dataSource = this.mKArr;

            this.onHero(ms.chair.id);
            if(this.pet) {
                this.pet.clearUp();
                this.pet = null;
            }
            // msMoudle.mapP.changeForce(true);
        }

        offChair() : void {
            this.jc1.text = "未装扮椅子"
            this.jc2.text = ""
            this.jc3.text = ""
            this.jc4.text = ""
        }
        onChairById(id:any) : void {
            for(let key in msMoudle.payjson) {
                if(msMoudle.payjson[key].id == id) {
                    let ___ = msMoudle.payjson[key];
                    this.jc1.text = "生命:+" + ___.hp + "%"
                    this.jc2.text = "体力上限:+" + ___.hp + "%"
                    break;
                }
            }
        }
        // offFashion() : void {
        //     this.jc1.text = "未装扮时装"
        //     this.jc2.text = ""
        //     this.jc3.text = ""
        //     this.jc4.text = ""
        // }
        // onFashionById(id:any) : void {
        //     for(let key in msMoudle.payjson) {
        //         if(msMoudle.payjson[key].id == id) {
        //             let ___ = msMoudle.payjson[key];
        //             this.jc1.text = "命中率:+" + ___.target + "%"
        //             this.jc2.text = "回避率:+" + ___.miss + "%"
        //             break;
        //         }
        //     }
        // }

        offTamingMob() : void {
            this.jc1.text = "未装扮坐骑"
            this.jc2.text = ""
            this.jc3.text = ""
            this.jc4.text = ""
        }
        onTamingMobById(id:any) : void {
            for(let key in msMoudle.payjson) {
                if(msMoudle.payjson[key].id == id) {
                    let ___ = msMoudle.payjson[key];
                    this.jc1.text = "攻击速度:+" + ___.atkspeed + "%"
                    this.jc2.text = "移动速度:+" + ___.walkspeed + "%"
                    this.jc3.text = "暴击率:+" + ___.baoji + "%"
                    break;
                }
            }
        }
        offRing() : void {
            this.jc1.text = "未装备戒指"
            this.jc2.text = ""
            this.jc3.text = ""
            this.jc4.text = ""
        }
        onRingById(id:any) : void {
            for(let key in msMoudle.payjson) {
                if(msMoudle.payjson[key].id == id) {
                    let ___ = msMoudle.payjson[key];
                    this.jc1.text = "命中:+" + ___.target + "%"
                    this.jc2.text = "闪避:+" + ___.miss + "%"
                    this.jc3.text = "暴击率:+" + ___.baoji + "%"
                    break;
                }
            }
        }
        offPet() : void {
            this.jc1.text = "未装扮宠物"
            this.jc2.text = ""
            this.jc3.text = ""
            this.jc4.text = ""
        }
        onPetById(id:any) : void {
             for(let key in msMoudle.payjson) {
                if(msMoudle.payjson[key].id == id) {
                    let ___ = msMoudle.payjson[key];
                    this.jc1.text = "攻击力:+" + ___.atk + "%"
                    this.jc2.text = "防御力:+" + ___.def + "%"
                    this.jc3.text = "魔法攻击力:+" + ___.atk + "%"
                    this.jc4.text = "魔法防御力:+" + ___.def + "%"
                    break;
                }
            }
        }


        onLstBagCellClick(e: Laya.Event, index: number): void {
            if(this.ckArr[index]) {
                if(this.ckArr[index].type == 0) this.m_msg.itemShow(this.ckArr[index].id, "", "出售", true);
                else if(this.ckArr[index].type == 1) this.m_msg.equipShow(this.ckArr[index], "更换", "分解");
            }
        }
        // onLstStarCellClick(e: Laya.Event, index: number): void {
        //     if(this.mKArr[index]) {
        //         if(this.mKArr[index].sel) {
        //             this.mKArr[index].sel = false;
        //             ms.fashion.id = "N";
        //             ms.fashion.openid = 0;
        //             this.eqp_star.img.skin = "";
        //             this.offFashion();
        //         }
        //         else {
        //             // this.m_msg.lifeShow(ms.fashionbagsdata[index], 2);
        //             ms.fashion = new Object();
        //             ms.fashion.id = ms.fashionbagsdata[index].id + ".img";
        //             ms.fashion.openid = ms.fashionbagsdata[index].openid;

        //             for(let i:number = 0; i < this.mKArr.length; i++) {
        //                 if(this.mKArr[i]) this.mKArr[i].sel = false;
        //             }
        //             this.mKArr[index].sel = true;
        //             if(this.mKArr[index].type == 1) {
        //                 let edata = msMoudle.getEqpMsg(this.mKArr[index].id);
        //                 this.eqp_star.img.skin = edata.img;

        //                 this.onFashionById(this.mKArr[index].id);
        //             }
        //         }
        //         this.lstStar.dataSource = this.mKArr;
        //         this.onHero();
        //         msMoudle.mapP.changeForce();

        //         ms.saveServer();
        //     }
        // }
        onLstTamingMobCellClick(e: Laya.Event, index: number): void {
            if(this.mKArr[index]) {
                if(this.mKArr[index].sel) {
                    this.mKArr[index].sel = false;
                    ms.tamingmob.openid = 0;
                    ms.tamingmob.tamingmob1 = "N";
                    ms.tamingmob.tamingmob2 = "N";
                    this.eqp_tamingmob.img.skin = "";
                    this.offTamingMob();
                }
                else {
                    // this.m_msg.lifeShow(ms.tamingmobbagsdata[index], 4);
                    if(ms.tamingmobbagsdata[index].id == "01902005") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01902005.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "01912005.img";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01902000") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01902000.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "01912000.img";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01902028") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01902028.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "01912021.img";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01902032") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01902032.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "01912025.img";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932152") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932152.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932211") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932211.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932351") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932351.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932407") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932407.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932407") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932407.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932140") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932140.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    else if(ms.tamingmobbagsdata[index].id == "01932108") {
                        ms.tamingmob.openid = ms.tamingmobbagsdata[index].openid;
                        ms.tamingmob.tamingmob1 =    "01932108.img";//01902000  01902028    01902032
                        ms.tamingmob.tamingmob2 =   "N";//01912000  01912021    01912025
                    }
                    msMoudle.tamingmob1 = ms.tamingmob.tamingmob1;
                    msMoudle.tamingmob2 = ms.tamingmob.tamingmob2;
                    for(let i:number = 0; i < this.mKArr.length; i++) {
                        if(this.mKArr[i]) this.mKArr[i].sel = false;
                    }
                    this.mKArr[index].sel = true;
                    this.eqp_tamingmob.img.skin = "res/Character/TamingMob/" + ms.tamingmobbagsdata[index].id + ".img/info.icon.png"

                    this.onTamingMobById(this.mKArr[index].id);
                }
                this.lstTamingMob.dataSource = this.mKArr;

                this.onHero("N", true);
                msMoudle.mapP.changeForce();

                ms.saveServer();

                this.showSucc();
            }
        }
        onLstPetCellClick(e: Laya.Event, index: number): void {
            if(this.mKArr[index]) {
                if(this.mKArr[index].sel) {
                    this.mKArr[index].sel = false;
                    ms.pet.openid = 0;
                    ms.pet.id = "N";
                    this.eqp_pet.img.skin = "";
                    this.offPet();
                }
                else {
                    // this.m_msg.lifeShow(ms.petbagsdata[index].id, 3);
                    ms.pet.id = ms.petbagsdata[index].id + ".img";
                    ms.pet.openid = ms.petbagsdata[index].openid;
                    for(let i:number = 0; i < this.mKArr.length; i++) {
                        if(this.mKArr[i]) {
                            this.mKArr[i].sel = false;
                        }
                    }
                    this.mKArr[index].sel = true;
                    this.eqp_pet.img.skin = "res/Pet/" + ms.petbagsdata[index].id + ".img/info.icon.png";

                    this.onPetById(this.mKArr[index].id);
                }
                this.lstPet.dataSource = this.mKArr;

                this.showPet();
                //带上、卸下、带上就会处问题
                // msMoudle.mapP.changePet();

                ms.saveServer();
            }
        }

        onLstRingCellClick(e: Laya.Event, index: number): void {
            if(this.mKArr[index]) {
                if(this.mKArr[index].sel) {
                    this.mKArr[index].sel = false;
                    ms.ring.id = "N";
                    ms.ring.openid = 0;
                    this.eqp_ring.img.skin = "";
                    this.offRing();
                }
                else {
                    ms.ring = new Object();
                    ms.ring.id = ms.ringbagsdata[index].id;
                    ms.ring.openid = ms.ringbagsdata[index].openid;

                    for(let i:number = 0; i < this.mKArr.length; i++) {
                        if(this.mKArr[i]) this.mKArr[i].sel = false;
                    }
                    this.mKArr[index].sel = true;
                    // if(this.mKArr[index].type == 5) {
                        // let edata = msMoudle.getEqpMsg(this.mKArr[index].id);
                        this.eqp_ring.img.skin = "res/Character/Ring/" + this.mKArr[index].id + ".img/info.icon.png";//edata.img;

                        this.onRingById(this.mKArr[index].id);
                    // }
                }
                this.lstRing.dataSource = this.mKArr;
                this.onHero();
                // if(msMoudle.char) {
                    // msMoudle.char.m_ring = this.mKArr[index].id;
                    msMoudle.mapP.changeForce();
                // }
                ms.saveServer();
            }
        }
        onLstChairCellClick(e: Laya.Event, index: number): void {
            if(this.mKArr[index]) {
                if(this.mKArr[index].sel) {
                    this.mKArr[index].sel = false;
                    ms.chair.id = "N";
                    ms.chair.openid = 0;
                    this.eqp_chair.img.skin = "";
                    this.offChair();
                }
                else {
                    ms.chair = new Object();
                    ms.chair.id = ms.chairbagsdata[index].id;
                    ms.chair.openid = ms.chairbagsdata[index].openid;

                    for(let i:number = 0; i < this.mKArr.length; i++) {
                        if(this.mKArr[i]) this.mKArr[i].sel = false;
                    }
                    this.mKArr[index].sel = true;
                    // if(this.mKArr[index].type == 5) {
                        // let edata = msMoudle.getEqpMsg(this.mKArr[index].id);
                        this.eqp_chair.img.skin = "res/Character/Chair/0301.img/" + this.mKArr[index].id + ".info.icon.png"

                        this.onChairById(this.mKArr[index].id);
                    // }
                }
                this.lstChair.dataSource = this.mKArr;
                this.onHero(ms.chair.id);
                // if(msMoudle.char) {
                    // msMoudle.char.m_ring = this.mKArr[index].id;
                    msMoudle.mapP.changeForce(true);
                // }
                ms.saveServer();
            }
        }

        skill:cssSkill;
        showSucc() : void {
            let data:any = msMoudle.wz["000.img"]["skill.0001004"];
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            this.skill = new cssSkill();
            this.skill.changeAll(null, this.char.m_state_sp, "0001004", 0, 0, data, 1);
        }

        onClose() {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
        }

        //
    }
}