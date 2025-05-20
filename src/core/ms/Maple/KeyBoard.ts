/// <reference path="./../../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />

module KeyBoardRole {

    import cssMsg = MsgRole.Msg;
    import cssSkill = SkillRole.Skill;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class KeyBoard extends Laya.Sprite {
        public m_parent:any;
        private m_hero:any;
        private m_pet:any;
        private m_heroList:Array<any> = [];
        private m_itemList:Array<any> = [];
        private m_msgList:cssMsg;
        private m_helper:any;
        private is_sea:boolean = false;

        public upkey:boolean = false;
        public downkey:boolean = false;
        public leftkey:boolean = false;
        public rightkey:boolean = false;

        private VRTop:number = 0;
        private VRLeft:number = 0;
        private VRBottom:number = 0;
        private VRRight:number = 0;

        private wudi:boolean = false;
        private wudi_time:number = 0;
        private m_control:boolean = true;
        private m_forcecontrol:boolean = true;
        private mapId:string;
        private jump_action:string = "jump";

        public clearUp() : void {
            Laya.stage.off(laya.events.Event.KEY_UP, this, this.onKeyUp);
            Laya.stage.off(laya.events.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.timer.clear(this, this.double_tim);

            Laya.stage.off(laya.events.Event.MOUSE_DOWN, this, this.onJump);
            Laya.stage.off(laya.events.Event.MOUSE_MOVE, this, this.onJump);
            Laya.stage.off(laya.events.Event.MOUSE_UP, this, this.onJump);
            Laya.stage.off(laya.events.Event.CLICK, this, this.onJump2);
            // Laya.stage.off(laya.events.Event.DOUBLE_CLICK, this, this.onJump3);
            Laya.timer.clear(this, this.wudiFrame);
            Laya.timer.clear(this, this.controlFrame);
            Laya.timer.clear(this, this.doubleFrame);
            // Laya.timer.clear(this, this.addMP);
            Laya.timer.clear(this, this.delayLoop);
            Laya.timer.clear(this, this.doSomeThing);
            Laya.timer.clear(this, this.DoSomeThingTest);
            Laya.timer.clear(this, this.clickHero);

            //msMoudle.gameP.di
            Laya.stage.off(Laya.Event.CLICK, this, this.onD);
            Laya.stage.off(Laya.Event.CLICK, this, this.onU);

            if(this.cz_sp) {
                this.cz_sp.removeSelf();
                this.cz_sp = null;
            }
        }

        public lodKeyBoard(P:any, VRTop:any, VRLeft:any, VRBottom:any, VRRight:any, id:any) : void {

            if(msMoudle.sailMap(msMoudle.mapP.m_id)) {
                this.is_sea = true;
            }

            this.m_parent = P;
            this.mapId = id;

            msMoudle.mainP = this.m_parent;
            msMoudle.mainT = this;

            this.m_hero = this.m_parent.char;
            this.m_pet = this.m_parent.pet;

            this.m_heroList = this.m_parent.heroList;
            this.m_msgList = this.m_parent.m_msg;
            this.m_helper = this.m_parent.m_helper;

            this.VRTop = Number(VRTop);
            this.VRLeft = Number(VRLeft);
            this.VRBottom = Number(VRBottom);
            this.VRRight = Number(VRRight);

            // msMoudle.gameP.kb.visible = false;
            if(this.mapId == "101000103.img" || this.mapId == "101000100.img" ||
                this.mapId == msMoudle.tiaotiao_map) {
                this.initUI();
            }
            else {
                if(msMoudle.isAuMap(this.mapId) == false) {
                    Laya.stage.on(Laya.Event.CLICK, this, msMoudle.mainT.onD);
                    Laya.stage.on(Laya.Event.CLICK, this, msMoudle.mainT.onU);
                }
            }
            // Laya.timer.once(100, this, this.delayLoop);
        }

        addX:number = 0;
        addX2:number = 0;
        public newX:number = 15;
        public newY:number = 600 - 15;
        private initUI() : void {

            this.addX = 0;
            this.addX2 = 0;
            let addX3 = 5;
            if(Laya.stage.width > 800) {
                this.addX += (Laya.stage.width - 800) / 5;
                this.addX = this.addX > 120 ? 120 : this.addX;

                this.addX2 += (Laya.stage.width - 800) / 10;
                this.addX2 = this.addX2 > 35 ? 35 : this.addX2;
            }

            this.cz_sp = new Laya.Image();
            this.cz_sp.zOrder = 9999999998;
            Laya.stage.addChild(this.cz_sp);
            let a = false;

            if(msMoudle.gameP && msMoudle.gameP.keyhead) this.cz_sp.addChild(msMoudle.gameP.keyhead);

            if(msMoudle.isScreen(a)) {//简单改这里可以？？？

                ///多利用透明区域
                this.rockerJump = new Laya.Image();
                // this.rockerJump.zOrder = 9999999999;
                    this.rockerJump.width = 132;
                    this.rockerJump.height = 132;
                // }
                this.rockerJump.anchorX = 0.5;
                this.rockerJump.anchorY = 0.5;
                // this.rockerJump.alpha = 0.5;

                this.rockerJump.skin = "res/UI/img_yaogan222.png";
                // this.rockerJump.graphics.drawCircle(66, 66, 66, "#000000");
                this.rockerJump.pos(Laya.stage.width - 85-this.addX2, 600 - 105);// - this.m_parent.m_sp.x
                this.rockerJump.on(Laya.Event.MOUSE_DOWN, this, this.onJump);
                this.rockerJump.on(Laya.Event.MOUSE_MOVE, this, this.onJump);
                this.rockerJump.on(Laya.Event.MOUSE_UP, this, this.onJump);
                this.rockerJump.on(Laya.Event.CLICK, this, this.onJump2);
                // this.rockerJump.on(Laya.Event.DOUBLE_CLICK, this, this.onJump3);
                this.cz_sp.addChild(this.rockerJump);

                if(true) {
                    let txtsp:Laya.Image = new Laya.Image();
                    txtsp.scale(0.66, 0.66);
                    // txtsp.alpha = 0.5;
                    txtsp.pos(Laya.stage.width - 140-this.addX2, 600 - 140);
                    this.cz_sp.addChild(txtsp);
                    txtsp.skin = "res/UI/txt/18.png";
                }

                //攻击
                this.rockPng(this.rockerAtk, 75, Laya.stage.width - 257-this.addX2+70, 600 - 80, this.onAtk, null, "", "rockerAtk");
                //技能1
                this.rockPng(this.rockerSk1, 75, Laya.stage.width - 222-this.addX2+50, 600 - 200, this.onSk1, this.onSk1_up, msMoudle.m_skill, "rockerSk1");
                //技能2
                this.rockPng(this.rockerSk2, 75, Laya.stage.width - 90-this.addX2+50, 600 - 200, this.onSk2, this.onSk2_up,  msMoudle.m_skill2, "rockerSk2");
                //技能3
                this.rockPng(this.rockerSk3, 75, Laya.stage.width - 355-this.addX2+85, 600 - 75, this.onSk3, this.onSk3_up,  msMoudle.m_skill3, "rockerSk3");
                //state
                this.rockPng(this.rockerState, 75, Laya.stage.width - 30-this.addX2, 600 - 285, this.onState, null, msMoudle.m_skill4, "rockerState");//
                //state2
                this.rockPng(this.rockerState2, 75, Laya.stage.width - 450-this.addX2+110, 600 - 75, this.onState2, null, msMoudle.m_skill5, "rockerState2");

                //表情
                this.rockPng(this.rockerFace, 75, Laya.stage.width - 545-this.addX2+135, 600 - 75, this.onFace, null, "", "rockerFace");
                //坐骑
                this.rockPng(this.rockerTamingmob, 75, Laya.stage.width - 325-addX3+75, 450, this.onTamingMob, null, "", "rockerTamingmob");
                //特殊药水
                this.rockPng(this.rockerWater1, 75, Laya.stage.width - 190-addX3+70, 355, this.onWater1, null, "", "rockerWater1");




                // this.rockTxt(this.rockerFace, 75, Laya.stage.width - 545-this.addX2, 600 - 75, this.onFace, "表情", 16, "rockerFace");

                // this.rockTxt(this.rockerTamingmob, 75, Laya.stage.width - 325-addX3, 440, this.onTamingMob, "骑乘", 16, "rockerTamingmob");

                // this.rockTxt(this.rockerWater1, 75, Laya.stage.width - 190-addX3, 285, this.onWater1, "特殊药水", 16, "rockerWater1");

                this.showRocker();
            }
            else {


                let mainbar = new Laya.Image();
                mainbar.anchorX = 0.5;
                mainbar.skin = "res/UI/base.backgrnd.png";
                mainbar.y = 529;
                mainbar.x = Laya.stage.width / 2;
                this.cz_sp.addChild(mainbar);

                let mainbar2 = new Laya.Image();
                mainbar2.skin = "res/UI/base.backgrnd2.png";
                mainbar.addChild(mainbar2);

                let bardi = new Laya.Image();
                bardi.skin = "res/UI/gauge.bar.png"
                bardi.x = 215;
                bardi.y = 37;
                mainbar.addChild(bardi);

                //hp
                this.hpbar = new Laya.Image();
                this.hpbar.skin = "res/UI/gauge.gray.png";
                bardi.addChild(this.hpbar);
                this.hpbar.anchorX = 1;
                this.hpbar.width = 108 * 0.5;
                this.hpbar.x = 108;
                this.hpbar.y = 15;

                //mp
                this.mpbar = new Laya.Image();
                this.mpbar.skin = "res/UI/gauge.gray.png";
                bardi.addChild(this.mpbar);
                this.mpbar.anchorX = 1;
                this.mpbar.width = 108 * 0;
                this.mpbar.x = 110 + 108;
                this.mpbar.y = 15;

                //exp
                this.expbar = new Laya.Image();
                this.expbar.skin = "res/UI/gauge.gray.png";
                bardi.addChild(this.expbar);
                this.expbar.anchorX = 1;
                this.expbar.width = 115 * 0.5;
                this.expbar.x = 223 + 115;
                this.expbar.y = 15;

                let bardi2 = new Laya.Image();
                bardi2.skin = "res/UI/gauge.graduation.png"
                bardi.addChild(bardi2);

                //job
                let jobtxt = new Laya.Text();
                jobtxt.fontSize = 14;
                jobtxt.color = "#FFFFFF";
                jobtxt.text = msMoudle.m_job[ms.selHero];
                mainbar2.addChild(jobtxt);
                jobtxt.x = 82;
                jobtxt.y = 39;
                //name
                let nametxt = new Laya.Text();
                nametxt.fontSize = 14;
                nametxt.color = "#FFFFFF";
                nametxt.text = ms.herodata.Name;
                mainbar2.addChild(nametxt);
                nametxt.x = 82;
                nametxt.y = 54;
                //lv
                this.lvtxt = new Laya.Text();
                this.lvtxt.fontSize = 19;
                this.lvtxt.color = "#FFFFFF";
                this.lvtxt.text = ms.herodata.Lv + "";
                mainbar2.addChild(this.lvtxt);
                this.lvtxt.x = 32;
                this.lvtxt.y = 45;

                //说明
                let msgtxt = new Laya.Text();
                msgtxt.fontSize = 12;
                msgtxt.color = "#000000";
                msgtxt.text = "w(上)、s(下)、a(左)、d(右)、j(跳跃)、k(攻击)、t(坐骑)、y(表情)、n(瞬移)、space(药水)、L,I,O,P(技能)";
                mainbar2.addChild(msgtxt);
                msgtxt.x = 5;
                msgtxt.y = 14;

                //skillbar
                let skillbar = new Laya.Image();
                skillbar.skin = "res/UI/base.CNQuickSlot.png";
                mainbar2.addChild(skillbar);
                skillbar.x = 575;
                skillbar.y = -9;

                //04031006.info.icon.png


                let icon1 = new Laya.Image();
                icon1.skin = "res/UI/maple.key.0.0.png";
                icon1.anchorX = 0.5;
                icon1.anchorY = 0.5;
                icon1.width = 25;
                icon1.height = 25;
                icon1.pos(5+18, 22);
                skillbar.addChild(icon1);
                this.keysp(icon1, 0, 0, 43);

                let icon2 = new Laya.Image();
                icon2.skin = "res/UI/maple.key.1.0.png";
                icon2.anchorX = 0.5;
                icon2.anchorY = 0.5;
                icon2.width = 25;
                icon2.height = 25;
                icon2.pos(40+18, 22);
                skillbar.addChild(icon2);
                this.keysp(icon2, 0, 0, 31);

                let icon3 = new Laya.Image();
                icon3.skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill5[0]) / 10000) + ".img/skill." + msMoudle.m_skill5[0] + ".icon.png";
                icon3.anchorX = 0.5;
                icon3.anchorY = 0.5;
                icon3.width = 25;
                icon3.height = 25;
                icon3.pos(80+18, 22);
                skillbar.addChild(icon3);
                this.keysp(icon3, 0, 0, 49);


                let icon4 = new Laya.Image();
                icon4.skin = "res/Skill/000.img/skill.0001004.icon.png";
                icon4.anchorX = 0.5;
                icon4.anchorY = 0.5;
                icon4.width = 25;
                icon4.height = 25;
                icon4.pos(115+18, 22);
                skillbar.addChild(icon4);
                this.keysp(icon4, 0, 0, 20);


                let icon5 = new Laya.Image();
                if(ms.test_sk < 3) icon5.skin = "res/UI/04031005.info.icon.png";
                else icon5.skin = "res/UI/04031006.info.icon.png";
                icon5.anchorX = 0.5;
                icon5.anchorY = 0.5;
                icon5.width = 25;
                icon5.height = 25;
                icon5.pos(150+18, 22);
                skillbar.addChild(icon5);
                this.keysp(icon5, -5, 0, 57);

                let icon6 = new Laya.Image();
                icon6.skin = "res/UI/KeyConfig.icon.101.png";
                icon6.anchorX = 0.5;
                icon6.anchorY = 0.5;
                icon6.width = 25;
                icon6.height = 25;
                icon6.pos(185+18, 22);
                skillbar.addChild(icon6);
                this.keysp(icon6, 0, 0, 21);

                let icon7 = new Laya.Image();
                icon7.skin = "res/UI/maple.key.2.0.png";
                icon7.anchorX = 0.5;
                icon7.anchorY = 0.5;
                icon7.width = 25;
                icon7.height = 25;
                icon7.pos(5+18, 37+20);
                skillbar.addChild(icon7);
                this.keysp(icon7, 0, 0, 30);

                let icon8 = new Laya.Image();
                icon8.skin = "res/UI/maple.key.3.0.png";
                icon8.anchorX = 0.5;
                icon8.anchorY = 0.5;
                icon8.width = 25;
                icon8.height = 25;
                icon8.pos(40+18, 37+20);
                skillbar.addChild(icon8);
                this.keysp(icon8, 0, 0, 32);

                let icon9 = new Laya.Image();
                icon9.skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill[ms.selHero] + ".icon.png";
                icon9.anchorX = 0.5;
                icon9.anchorY = 0.5;
                icon9.width = 25;
                icon9.height = 25;
                icon9.pos(80+18, 37+20);
                skillbar.addChild(icon9);
                this.keysp(icon9, 0, 0, 38);



                let icon10 = new Laya.Image();
                icon10.skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill2[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill2[ms.selHero] + ".icon.png";
                icon10.anchorX = 0.5;
                icon10.anchorY = 0.5;
                icon10.width = 25;
                icon10.height = 25;
                icon10.pos(115+18, 37+20);
                skillbar.addChild(icon10);
                this.keysp(icon10, 0, 0, 23);

                let icon11 = new Laya.Image();
                icon11.skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill3[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill3[ms.selHero] + ".icon.png";
                icon11.anchorX = 0.5;
                icon11.anchorY = 0.5;
                icon11.width = 25;
                icon11.height = 25;
                icon11.pos(150+18, 37+20);
                skillbar.addChild(icon11);
                this.keysp(icon11, 0, 0, 11);

                let icon12 = new Laya.Image();
                icon12.skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill4[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill4[ms.selHero] + ".icon.png";
                icon12.anchorX = 0.5;
                icon12.anchorY = 0.5;
                icon12.width = 25;
                icon12.height = 25;
                icon12.pos(185+18, 37+20);
                skillbar.addChild(icon12);
                this.keysp(icon12, 0, 0, 25);

            }


            if(msMoudle.jy) {
                //交易
                this.rockPng(this.rockerJY, 75, Laya.stage.width - 25-this.addX2, 600 - 345+20 -80, this.onJY, null, "", "rockerJY");
            }
            Laya.stage.on(laya.events.Event.KEY_UP, this, this.onKeyUp);
            Laya.stage.on(laya.events.Event.KEY_DOWN, this, this.onKeyDown);


            if(msMoudle.mapP) {
                if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {

                    // Laya.timer.loop(1000, this, this.addMP);




                    // this.rockTxt(this.rockerGJ, 60, Laya.stage.width -465-addX3, 135, this.onGJ, "挂机", 16, "rockerGJ");
                    //挂机
                    // this.rockTxt(this.rockerGJ, 60, Laya.stage.width -425-addX3, 260, this.onGJ, "挂机", 16, "rockerGJ");
                    //探索
                    // this.rockTxt(this.rockerFuBen1, 60, Laya.stage.width -255-addX3, 250, this.onFuBen1, "探索", 16, "rockerFuBen1");

                    //情报
                    this.rockTxt(this.rockerQB, 40, Laya.stage.width -371-addX3, 120, this.onQB, "情报", 16, "rockerQB");
                    //地图
                    this.rockTxt(this.rockerPoint, 40, Laya.stage.width - 307-addX3, 120, this.onPoint, "地图", 16, "rockerPoint");
                    //星缘
                    this.rockTxt(this.rockerFuBen3, 40, Laya.stage.width - 243-addX3, 120, this.onFuBen3, "星缘", 16, "rockerFuBen3");
                    //英雄
                    this.rockTxt(this.rockerChar, 40, Laya.stage.width - 178-addX3, 120, this.onHero, "英雄", 16, "rockerChar");
                    //职业
                    this.rockTxt(this.rockSetting, 40, Laya.stage.width - 114-addX3, 120, this.onJob, "职业", 16, "rockSetting");
                    //装备
                    this.rockTxt(this.rockPlayer, 40, Laya.stage.width - 50-addX3, 120, this.onAvatar, "装备", 16, "rockPlayer");
                    //技能
                    // this.rockTxt(this.rockerSkill, 60, Laya.stage.width - 295, 145, this.onSkill, "技能", 16);



                    //签到、充值、礼包、任务、商店、表情
                    this.rockTxt(this.rockerQianDao, 40, Laya.stage.width - 371-addX3, 50, this.qiandao, "签到", 16, "rockerQianDao");
                    this.rockTxt(this.rockerChongZhi, 40, Laya.stage.width - 307-addX3, 50, this.chongzhi, "充值", 16, "rockerChongZhi");
                    this.rockTxt(this.rockerLiBao, 40, Laya.stage.width - 243-addX3, 50, this.libao, "礼包", 16, "rockerLiBao");
                    this.rockTxt(this.rockerRenWu, 40, Laya.stage.width - 178-addX3, 50, this.renwu, "任务", 16, "rockerRenWu");
                    this.rockTxt(this.rockerShop, 40, Laya.stage.width - 114-addX3, 50, this.shop, "商店", 16, "rockerShop");
                    this.rockTxt(this.rockerZM, 40, Laya.stage.width - 50-addX3, 50, this.onZhaoMu, "招募", 16, "rockerZM");


                    //扭蛋
                    // this.rockTxt(this.rockQuick, 60, Laya.stage.width - 135-addX3, 135, this.onQuick, "扭蛋", 16, "rockQuick");



                    if(msMoudle.gameP) {
                        msMoudle.gameP.sphead.visible = true;

                        // msMoudle.gameP.exp.width = Laya.stage.width * (ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));//318
                        ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
                        msMoudle.mainT.updateLv();
                        // msMoudle.gameP.lv.text = "Lv. " + ms.herodata.Lv;
                        this.cz_sp.addChild(msMoudle.gameP.sphead);
                    }
                    //
                }
            }

        }

        lvtxt : Laya.Text;
        hpbar : Laya.Image;
        mpbar : Laya.Image;
        expbar : Laya.Image;
        public updateLv() : void {
            if(msMoudle.isScreen()) {
                msMoudle.gameP.lv.text = ms.herodata.Lv + "";
                msMoudle.gameP._name.text = ms.herodata.Name;
            }
            else {
                if(this.lvtxt) {
                    msMoudle.gameP.lv.visible = false;
                    this.lvtxt.text = ms.herodata.Lv + "";
                }
            }
        }

        public updateExp(pro:number) : void {
            if(pro > 1) pro = 1;
            if(this.expbar) {
                this.expbar.width = 115 * (1 - pro);
            }
        }

        public updateHp() : void {
            if(this.hpbar) {
                this.hpbar.width = 108 * (1 - msMoudle.hp / msMoudle.maxhp)
            }
        }

        public updateMp() : void {

        }

        keysp(P:any, x:number, y:number, key:number) : void {
            let sp = new Laya.Image();
            sp.skin = "res/UI/KeyConfig.key." + key + ".png";
            if(key != 57) {
                sp.scale(1.5, 1.5);
                sp.pos(x - 5, y - 7);
            }
            else sp.pos(x, y - 7);
            P.addChild(sp);
        }

        showsllll:Array<any> = [];

        public showRocker() : void {

            this.newX = 15;
            this.newX += this.addX;
            this.newY = 600 - 35;

            if(this.rockerBg) {
                this.rockerBg.off(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
                this.rockerBg.off(Laya.Event.MOUSE_UP, this, this.mouseHandler);
                this.rockerBg.off(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
                this.rockerBg.off(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
            }
            if(this.rockerBgBig) {
                this.rockerBgBig.off(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
                this.rockerBgBig.off(Laya.Event.MOUSE_UP, this, this.mouseHandler);
                this.rockerBgBig.off(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
                this.rockerBgBig.off(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
            }

            if(this.rockerBg) {
                this.rockerBg.removeSelf();
                this.rockerBg = null;
            }
            if(this.rockerBgBig) {
                this.rockerBgBig.removeSelf();
                this.rockerBgBig = null;
            }
            if(this.rocker) {
                this.rocker.removeSelf();
                this.rocker = null;
            }
            // ms.rocker_type = 2;
            // if(ms.rocker_type == 1) {
                this.leftN = 300;

                this.rockerBg = new Laya.Image();
                this.rockerBg.zOrder = 9999999999;
                // this.rockerBg.skin = "res/UI/img_yaogan2.png";
                this.rockerBg.width = 200;
                this.rockerBg.height = 200;
                // this.rockerBg.alpha = 0.9;
                // this.rockerBg.pos(115, 120);
                // this.rockerBg.graphics.drawCircle(100, 100, 100, "#000000");
                this.rockerBg.skin = "res/UI/img_yaogan226.png"
                // this.rockerBg.hitTestPrior = false;
                // this.rockerBg.mouseThrough = true;

                this.rockerBg.pos(this.newX, this.newY - this.rockerBg.height);
                this.cz_sp.addChild(this.rockerBg);

                let dirsp = new Laya.Image();
                dirsp.zOrder = 9999999999;
                // dirsp.skin = "res/UI/img_yaogan2.png";
                dirsp.width = 170;
                dirsp.height = 170;
                dirsp.pos(this.newX + 15, this.newY - this.rockerBg.height + 15);
                this.cz_sp.addChild(dirsp);

                this.rockerBgBig = new Laya.Image();
                this.rockerBgBig.zOrder = 9999999999;
                this.rockerBgBig.skin = ""//"res/UI/img_fangxiang1.png";
                this.rockerBgBig.width = 370;//this.leftN;
                this.rockerBgBig.height = 240;
                this.rockerBgBig.alpha = 0;//0.4;
                this.rockerBgBig.pos(this.newX - (370 - 270) / 2, this.newY - this.rockerBgBig.height);
                this.cz_sp.addChild(this.rockerBgBig);
                // this.rockerBgBig.hitTestPrior = false;
                // this.rockerBgBig.mouseThrough = true;

                this.rocker = new Laya.Image();
                this.rocker.zOrder = 9999999999;
                this.rocker.skin = "res/UI/img_yaogan.png";
                this.rocker.alpha = 0.5;
                this.rocker.width = 60;
                this.rocker.height = 60;
                this.cz_sp.addChild(this.rocker);
                this.rocker.pos(this.newX + this.rockerBg.width / 2 - this.rocker.width / 2,
                this.newY - this.rockerBg.height / 2 - this.rocker.height / 2);

            // }
            // else if(ms.rocker_type == 2) {
            //     this.leftN = 375;

            //     this.rockerBg = new Laya.Image();
            //     this.rockerBg.zOrder = 9999999999;
            //     // this.rockerBg.skin = "res/UI/img_fangxiang1.png";
            //     this.rockerBg.width = 180;
            //     this.rockerBg.height = 180;
            //     this.rockerBg.alpha = 0.4;
            //     this.rockerBg.graphics.drawCircle(90, 90, 90, "#000000");
            //     this.rockerBg.pos(this.newX, this.newY - this.rockerBg.height);
            //     this.cz_sp.addChild(this.rockerBg);

            //     this.rockerBgBig = new Laya.Image();
            //     this.rockerBgBig.zOrder = 9999999999;
            //     this.rockerBgBig.skin = "res/UI/img_fangxiang1.png";
            //     this.rockerBgBig.width = 375;
            //     this.rockerBgBig.height = 375;
            //     this.rockerBgBig.alpha = 0//0.2;
            //     this.rockerBgBig.pos(0,600-this.rockerBgBig.height);
            //     this.cz_sp.addChild(this.rockerBgBig);

            //     this.rocker = new Laya.Image();
            //     this.rocker.zOrder = 9999999999;
            //     this.rocker.skin = "res/UI/img_yaogan.png";
            //     this.rocker.alpha = 0.8;
            //     this.rocker.width = 60;
            //     this.rocker.height = 60;
            //     this.cz_sp.addChild(this.rocker);
            //     this.rocker.pos(this.newX + this.rockerBg.width / 2 - this.rocker.width / 2,
            //     this.newY - this.rockerBg.height / 2 - this.rocker.height / 2);
            // }

            //正中心
            this.center_x = this.newX + this.rockerBg.width / 2;
            this.center_y = this.newY - this.rockerBg.height / 2;

            this.cz_sp.visible = false;

            // 需要再套一层更大的圈
            // rockerBg的透明取增大到屏幕的2/3
            // 监听focus/以及回来的事件

            // if(ms.rocker_type == 1) {
            //     this.rockerBg.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
            //     this.rockerBg.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
            //     this.rockerBg.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
            //     this.rockerBg.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
            // }
            // else if(ms.rocker_type == 2) {
                this.rockerBgBig.on(Laya.Event.MOUSE_DOWN, this, this.mouseHandler);
                this.rockerBgBig.on(Laya.Event.MOUSE_UP, this, this.mouseHandler);
                this.rockerBgBig.on(Laya.Event.MOUSE_MOVE, this, this.mouseHandler);
                this.rockerBgBig.on(Laya.Event.MOUSE_OUT, this, this.mouseHandler);
            // }
        }

        qiandao() : void {
            if(ms.dayreward) {
                //签到
                // this.btnBoss.visible = false;
                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.getChildByName("签到").visible = false;
                }
                ms.dayreward = false;

                let showReward:Array<any> = [];
                for(let i:number = 0; i < 4; i++) {
                    showReward[i] = new Object();
                    if(i == 0) {
                        let _num = 25 + (ms.daytotal - 1) * 25;
                        if(_num > 200) _num = 200;
                        if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
                        else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
                        else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
                        showReward[i].itemid = "1234561";
                        showReward[i].num = _num;
                        showReward[i].pinzhi = 5;
                        showReward[i].name = "枫叶";
                        showReward[i].type = 0;
                        showReward[i].img = "homeland/02028044.info.icon.png";
                        msMoudle._(); msMoudle.updateRongYu(showReward[0].num);
                    }
                    else if(i == 1) {
                        let _num = 5 + (ms.daytotal - 1) * 5;
                        if(_num > 35) _num = 35;
                        if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
                        else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
                        else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
                        showReward[i].itemid = "800000000";
                        showReward[i].num = _num;
                        showReward[i].pinzhi = 6;
                        showReward[i].name = "觉醒石";
                        showReward[i].type = 0;
                        showReward[i].img = "homeland/04001129.info.icon.png";
                        msMoudle._(); msMoudle.updateJueXing1(showReward[i].num)
                    }
                    else if(i == 2) {
                        let _num = 5 + (ms.daytotal - 1) * 5;
                        if(_num > 35) _num = 35;
                        if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
                        else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
                        else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
                        showReward[i].itemid = "600000002";
                        showReward[i].num = _num;
                        showReward[i].pinzhi = 6;
                        showReward[i].name = "修炼石";
                        showReward[i].type = 0;
                        showReward[i].img = "homeland/04001190.info.icon.png";
                        msMoudle._(); msMoudle.updateCaiLiao2(showReward[i].num)
                    }
                    else {
                        let _num = 5 + (ms.daytotal - 1) * 5;
                        if(_num > 35) _num = 35;
                        if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
                        else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
                        else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
                        showReward[i].itemid = "700000000";
                        showReward[i].num = _num;
                        showReward[i].pinzhi = 6;
                        showReward[i].name = "升星石";
                        showReward[i].type = 0;
                        showReward[i].img = "homeland/04001017.info.icon.png";
                        msMoudle._(); msMoudle.updateCaiLiao1(showReward[i].num)
                    }
                }
                //这里还需要存档
                ui.show(app.battle.rewardDlg, {params:[showReward, true]});
            }
            else {
                msMoudle.toast("今日已经领取过了");
            }
        }

        chongzhi() : void {
            ui.show(app.event.FirstRechargeDlg, {black:true});
        }

        libao() : void {
            ui.show(app.libao.LiBaoDlg, {black:true});
        }

        renwu() : void {
            ui.show(app.task.taskDlg, {black:true});
        }

        shop() : void {
            ui.show(app.shop.shopDlg, {black:true});
        }

        public showAll(show:boolean = true) : void {
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                // msMoudle.mainT.cz_sp.getChildByName("rockerFuBen1").visible = show;
                // msMoudle.mainT.cz_sp.getChildByName("探索_name").visible = show;

                // msMoudle.mainT.cz_sp.getChildByName("rockerGJ").visible = show;
                // msMoudle.mainT.cz_sp.getChildByName("挂机_name").visible = show;

                msMoudle.mainT.cz_sp.getChildByName("rockerQB").visible = show;
                msMoudle.mainT.cz_sp.getChildByName("情报_name").visible = show;

                msMoudle.mainT.cz_sp.getChildByName("rockerFuBen3").visible = show;
                msMoudle.mainT.cz_sp.getChildByName("星缘_name").visible = show;

                msMoudle.mainT.cz_sp.getChildByName("rockerChar").visible = show;
                msMoudle.mainT.cz_sp.getChildByName("英雄_name").visible = show;

                // msMoudle.mainT.cz_sp.getChildByName("rockerTamingmob").visible = show;
                // msMoudle.mainT.cz_sp.getChildByName("骑乘_name").visible = show;

                // msMoudle.mainT.cz_sp.getChildByName("rockerPoint").visible = show;
                // msMoudle.mainT.cz_sp.getChildByName("地图_name").visible = show;

                // msMoudle.mainT.cz_sp.getChildByName("rockQuick").visible = show;
                // msMoudle.mainT.cz_sp.getChildByName("扭蛋_name").visible = show;

                msMoudle.mainT.cz_sp.getChildByName("rockSetting").visible = show;
                msMoudle.mainT.cz_sp.getChildByName("职业_name").visible = show;

                msMoudle.mainT.cz_sp.getChildByName("rockPlayer").visible = show;
                msMoudle.mainT.cz_sp.getChildByName("装备_name").visible = show;
                // if(show == false) {
                //     Laya.timer.once(5000, this, ()=>{
                //         if(msMoudle.isScreen()) {
                //             if(msMoudle.mainT) {
                //                 if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //                     msMoudle.mainT.cz_sp.visible = false;
                //                 }
                //             }
                //         }

                //         ui.show(app.battle.BattleRewardDlg);
                //     });
                // }
            }
        }

        rockPng(rockNode:Laya.Image, size:number, x:number, y:number, cb:any, cb2:any = null, m_skill:any, name:string = "") : void {
            rockNode = new Laya.Image();
            // rockNode.zOrder = 9999999999;
            // rockNode.alpha = 0.5;
            rockNode.width = size;
            rockNode.height = size;
            rockNode.anchorX = 0.5;
            rockNode.anchorY = 0.5;
            rockNode.skin = "res/UI/img_yaogan222.png"
            // rockNode.graphics.drawCircle(size/2, size/2, size/2, "#000000");
            rockNode.pos(x, y);
            // rockNode.on(Laya.Event.CLICK, this, cb);
            rockNode.on(Laya.Event.MOUSE_DOWN, this, cb);
            if(cb2) {
                rockNode.on(Laya.Event.MOUSE_UP, this, cb2);
                rockNode.on(Laya.Event.MOUSE_OUT, this, cb2);
            }
            // rockNode.mouseThrough = true;
            this.cz_sp.addChild(rockNode);
            if(name == "rockerState2") {
                this.new_sp(this.cz_sp, "res/Skill/"  + Math.floor(Number(m_skill[0]) / 10000) + ".img/skill." + m_skill[0] + ".icon.png", size * 0.5, size * 0.5, x, y, name);
            }
            else if(name == "rockerAtk") {
                this.new_sp(this.cz_sp, "res/UI/Shaman.macro.Macroicon.0.iconMouseOver.png", size * 0.5, size * 0.5, x, y, name);
            }
            else if(name == "rockerFace") {
                this.new_sp(this.cz_sp, "res/UI/KeyConfig.icon.101.png", size * 0.5, size * 0.5, x, y, name);
            }
            else if(name == "rockerTamingmob") {
                this.new_sp(this.cz_sp, "res/Skill/000.img/skill.0001004.icon.png", size * 0.5, size * 0.5, x, y, name);
            }
            else if(name == "rockerWater1") {
                if(ms.test_sk < 3) {
                    this.new_sp(this.cz_sp, "res/UI/04031005.info.icon.png", size * 0.5, size * 0.5, x, y, name);
                }
                else {
                    this.new_sp(this.cz_sp, "res/UI/04031006.info.icon.png", size * 0.5, size * 0.5, x, y, name);
                }
            }
            else if(name == "rockerJY") {
                this.new_sp(this.cz_sp, "homeland/05060007.info.icon.png", size * 0.6, size * 0.6, x, y, name);
            }
            else {
                this.new_sp(this.cz_sp, "res/Skill/"  + Math.floor(Number(m_skill[ms.selHero]) / 10000) + ".img/skill." + m_skill[ms.selHero] + ".icon.png", size * 0.5, size * 0.5, x, y, name);
            }
        }
        rockTxt(rockNode:Laya.Image, size:number, x:number, y:number, cb:any, name:string, fontSize:number, name2:string = "") : void {

            let cNode = new Laya.Image();
            // rockNode.zOrder = 9999999999;
            cNode.name = name2;
            // cNode.alpha = 0.5;
            cNode.width = size;//60X60
            cNode.height = size + 30;
            cNode.anchorX = 0.5;
            // cNode.anchorY = 0.5;
            cNode.pos(x, y - size / 2);
            cNode.on(Laya.Event.CLICK, this, cb);
            this.cz_sp.addChild(cNode);

            rockNode = new Laya.Image();
            // rockNode.zOrder = 9999999999;
            // rockNode.name = name2;
            // rockNode.alpha = 0.5;
            rockNode.width = size;//60X60
            rockNode.height = size;
            // rockNode.anchorX = 0.5;
            // rockNode.anchorY = 0.5;
            // rockNode.pos(x, y);
            // rockNode.on(Laya.Event.CLICK, this, cb);
            cNode.addChild(rockNode);

            let redsp:Laya.Image = new Laya.Image();
            // redsp.zOrder = 9999999999;
            redsp.skin = "homeland/img_tishi.png";
            // redsp.skin = "";
            redsp.name = name;
            redsp.scale(0.7, 0.7);
            redsp.pos(x + 10, y - 35);
            this.cz_sp.addChild(redsp);
            if(name != "签到")
            redsp.visible = false;

            if(name == "攻击") {
                rockNode.alpha = 0.5;
                rockNode.graphics.drawCircle(size/2, size/2, size/2, "#000000");
                let txtsp:Laya.Image = new Laya.Image();
                txtsp.width = 50;
                txtsp.height = 50;
                txtsp.pos(x - 25, y - 25);
                this.cz_sp.addChild(txtsp);
                txtsp.skin = "res/UI/Shaman.macro.Macroicon.0.iconMouseOver.png";
            }
            else if(name == "骑乘") {
                rockNode.alpha = 0.5;
                rockNode.graphics.drawCircle(size/2, size/2, size/2, "#000000");
                let txtsp:Laya.Image = new Laya.Image();
                txtsp.width = 50;
                txtsp.height = 50;
                txtsp.pos(x - 25, y - 25);
                this.cz_sp.addChild(txtsp);
                txtsp.skin = "res/Skill/000.img/skill.0001004.icon.png";
            }
            else if(name == "特殊药水") {
                rockNode.alpha = 0.5;
                rockNode.graphics.drawCircle(size/2, size/2, size/2, "#000000");
                let txtsp:Laya.Image = new Laya.Image();
                txtsp.width = 50;
                txtsp.height = 50;
                txtsp.pos(x - 25, y - 25);
                this.cz_sp.addChild(txtsp);
                if(ms.test_sk < 3) txtsp.skin = "res/UI/04031005.info.icon.png";
                else txtsp.skin = "res/UI/04031006.info.icon.png";
            }
            else if(name == "表情") {
                rockNode.alpha = 0.5;
                rockNode.graphics.drawCircle(size, size, size/2, "#000000");
                let txtsp:Laya.Image = new Laya.Image();
                rockNode.anchorX = 0.5;
                rockNode.anchorY = 0.5;
                txtsp.width = 50;
                txtsp.height = 50;
                txtsp.pos(x - 25, y - 25);
                this.cz_sp.addChild(txtsp);
                txtsp.skin = "res/UI/KeyConfig.icon.101.png";
            }
            else {
                let txtsp:Laya.Image = new Laya.Image();
                txtsp.scale(0.75, 0.75);
                txtsp.pos(x - 30, y + 18);
                txtsp.name = name + "_name";
                this.cz_sp.addChild(txtsp);

                if(name == "签到") {
                    rockNode.skin = "res/UI/icon/1.png";
                    txtsp.skin = "res/UI/txt/1.png";
                }
                else if(name == "充值") {
                    rockNode.skin = "res/UI/icon/2.png";
                    txtsp.skin = "res/UI/txt/2.png";
                }
                else if(name == "礼包") {
                    rockNode.skin = "res/UI/icon/3.png";
                    txtsp.skin = "res/UI/txt/3.png";
                }
                else if(name == "任务") {
                    rockNode.skin = "res/UI/icon/4.png";
                    txtsp.skin = "res/UI/txt/4.png";
                }
                else if(name == "商店") {
                    rockNode.skin = "res/UI/icon/5.png";
                    txtsp.skin = "res/UI/txt/5.png";
                }
                else if(name == "招募") {
                    rockNode.skin = "res/UI/icon/6.png";
                    txtsp.skin = "res/UI/txt/6.png";
                }
                else if(name == "情报") {
                    rockNode.skin = "res/UI/icon/7.png";
                    txtsp.skin = "res/UI/txt/7.png";
                }
                else if(name == "星缘") {
                    rockNode.skin = "res/UI/icon/8.png";
                    txtsp.skin = "res/UI/txt/8.png";
                }
                else if(name == "英雄") {
                    rockNode.skin = "res/UI/icon/9.png";
                    txtsp.skin = "res/UI/txt/9.png";
                }
                else if(name == "职业") {
                    rockNode.skin = "res/UI/icon/10.png";
                    txtsp.skin = "res/UI/txt/10.png";
                }
                else if(name == "扭蛋") {
                    // rockNode.skin = "res/UI/icon/11.png";
                    // txtsp.skin = "res/UI/txt/11.png";
                }
                else if(name == "装备") {
                    rockNode.skin = "res/UI/icon/12.png";
                    txtsp.skin = "res/UI/txt/12.png";
                }
                // else if(name == "挂机") {
                //     rockNode.skin = "res/UI/icon/13.png";
                //     txtsp.skin = "res/UI/txt/13.png";
                // }
                // else if(name == "探索") {
                //     rockNode.skin = "res/UI/icon/14.png";
                //     txtsp.skin = "res/UI/txt/14.png";
                // }
                // else if(name == "骑乘") {
                //     rockNode.skin = "res/UI/icon/15.png";
                //     txtsp.skin = "res/UI/txt/15.png";
                // }
                else if(name == "地图") {
                    rockNode.skin = "res/UI/icon/16.png";
                    txtsp.skin = "res/UI/txt/16.png";
                }
            }
            // else
            //     rockNode.skin = "res/circle.png";

            // this.new_txt(this.cz_sp, name, fontSize, x, y);
        }

        // public new_txt(P:any, str:string, size:number = 20, x:number, y:number) : any {
        //     let txt:Laya.Label = new Laya.Label();
        //     // txt.zOrder = 9999999999;
        //     txt.text = str;
        //     txt.anchorX = 0.5;
        //     txt.anchorY = 0.5;
        //     txt.name = str + "_name";
        //     txt.fontSize = size;
        //     txt.color = "#FFFFFF";
        //     txt.stroke = 2;
        //     // txt.strokeColor = "#1977c1";
        //     txt.pos(x, y);
        //     P.addChild(txt);

        //     let redsp:Laya.Image = new Laya.Image();
        //     // redsp.zOrder = 9999999999;
        //     redsp.skin = "homeland/img_tishi.png";
        //     redsp.name = str;
        //     redsp.scale(0.7, 0.7);
        //     redsp.pos(x + 10, y - 40);
        //     P.addChild(redsp);
        //     if(str != "签到")
        //     redsp.visible = false;
        // }

        public new_sp(P:any, str:string, w:number, h:number, x:number, y:number, name:string = "") : any {
            let sp:Laya.Image = new Laya.Image();
            // sp.zOrder = 9999999999;
            sp.skin = str;
            sp.anchorX = 0.5;
            sp.anchorY = 0.5;
            sp.name = name;
            if(w > 0) sp.width = w;
            if(h > 0) sp.height = h;
            // sp.centerX = 0;
            // sp.centerY = 0;
            sp.pos(x, y);
            P.addChild(sp);
        }

        public center_x:number;
        public center_y:number;
        public joystick_x:number;
        public joystick_y:number;
        public PI:number = 3.1415926535898;
        public rocker:Laya.Image;
        public cz_sp:Laya.Image;
        public rockerBg:Laya.Image;
        public rockerBgBig:Laya.Image;
        public rockerJump:Laya.Image;
        public rockerAtk:Laya.Image;
        public rockerTamingmob:Laya.Image;
        public rockerWater1:Laya.Image;
        public rockerJY:Laya.Image;
        public rockerWater2:Laya.Image;
        public rockerPet:Laya.Image;
        public rockerQB:Laya.Image;
        public rockerGJ:Laya.Image;
        public rockerFuBen1:Laya.Image;
        // public rockerFuBen2:Laya.Image;
        public rockerFuBen3:Laya.Image;
        public rockerQuick:Laya.Image;
        public rockerChar:Laya.Image;
        public rockerSkill:Laya.Image;
        public rockerState:Laya.Image;
        public rockerState2:Laya.Image;
        public rockerFace:Laya.Image;
        public rockerSk1:Laya.Image;
        public rockerSk2:Laya.Image;
        public rockerSk3:Laya.Image;
        public rockerPoint:Laya.Image;
        public rockerQianDao:Laya.Image;
        public rockerChongZhi:Laya.Image;
        public rockerLiBao:Laya.Image;
        public rockerRenWu:Laya.Image;
        public rockerShop:Laya.Image;
        public rockerZM:Laya.Image;

        public rockFaces:Array<Laya.Image> = [];
        public rockQuick:Laya.Image;
        public rockSetting:Laya.Image;
        public rockPlayer:Laya.Image;

        public mX:number = 0;
        public mY:number = 0;
        private is_move:boolean = false;

        private an:Array<any> = [];

        private mouseHandler(e: Event): void {
            switch (e.type) {
                case Laya.Event.MOUSE_DOWN:
                    this.mX = Laya.stage.mouseX - (Laya.stage.width - 1080) / 2;
                    this.mY = Laya.stage.mouseY - (Laya.stage.height - 600) / 2;
                    this.joyStickBegin();
                    break;
                case Laya.Event.MOUSE_UP:
                case Laya.Event.MOUSE_OUT:
                    // if(Laya.stage.mouseY >= 598) break;
                    this.mX = Laya.stage.mouseX - (Laya.stage.width - 1080) / 2;
                    this.mY = Laya.stage.mouseY - (Laya.stage.height - 600) / 2;
                    this.joyStickEnd();
                    // msMoudle.dircishu = 0;
                    break;
                case Laya.Event.MOUSE_MOVE:
                    this.mX = Laya.stage.mouseX - (Laya.stage.width - 1080) / 2;
                    this.mY = Laya.stage.mouseY - (Laya.stage.height - 600) / 2;
                    this.is_move = true;
                    break;
            }
        }

        ////遥感2是必须要废弃的
        ////大遥感的左右2测需要扩大一点【但是又不能和点击NPC冲突】
        ////

        leftN = 300;
        public joyStickBegin() : void {
            if(this.m_hero && this.m_hero.m_action) {
                // if(ms.rocker_type == 1) {
                    let location:any = {x:this.mX, y:this.mY};
                    this.is_move = true;
                    this.rocker.pos(this.newX - this.rocker.width / 2, this.newY - this.rocker.height / 2);
                // }
                // else if(ms.rocker_type == 2) {
                //     let location:any = {x:this.mX, y:this.mY};
                //     if(location.x < this.leftN) {
                //         this.is_move = true;
                //         this.newX = Laya.stage.mouseX;
                //         this.newY = Laya.stage.mouseY;
                //         if(this.newX - this.rockerBg.width / 2 <= 0) this.newX = this.rockerBg.width / 2;
                //         if(this.newY + this.rockerBg.height / 2 >= 600) this.newY = 600 - this.rockerBg.height / 2;

                //         //直接设置左右
                //         if(this.m_control) {
                //             if(this.m_hero.m_action == "ladder") {
                //                 if(this.newX - this.rockerBg.width / 2 >= this.rockerBg.x - this.rockerBg.width / 2 &&
                //                 this.newX - this.rockerBg.width / 2 <= this.rockerBg.x + this.rockerBg.width / 2) {
                //                     if(this.newY - this.rocker.height / 2 < this.rockerBg.y - 25) {
                //                         this.upkey = true;
                //                         this.downkey = false;
                //                         this.leftkey = false;
                //                         this.rightkey = false;
                //                     }
                //                     if(this.newY - this.rocker.height / 2 > this.rockerBg.y + 25) {
                //                         this.upkey = false;
                //                         this.downkey = true;
                //                         this.leftkey = false;
                //                         this.rightkey = false;
                //                     }
                //                 }
                //             }
                //             else {
                //                 if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                //                     if(this.newY - this.rocker.height / 2 >= this.rockerBg.y - this.rockerBg.width / 2 &&
                //                         this.newY - this.rocker.height / 2 <= this.rockerBg.y + this.rockerBg.width / 2) {
                //                         if(this.newX - this.rockerBg.width / 2 < this.rockerBg.x - 25) {
                //                             this.upkey = false;
                //                             this.downkey = false;
                //                             this.leftkey = true;
                //                             this.rightkey = false;
                //                         }
                //                         else if(this.newX - this.rockerBg.width / 2 > this.rockerBg.x + 25) {
                //                             this.upkey = false;
                //                             this.downkey = false;
                //                             this.leftkey = false;
                //                             this.rightkey = true;
                //                         }
                //                     }
                //                 }
                //             }
                //             /////
                //         }

                //         this.rockerBg.pos(this.newX - this.rockerBg.width / 2,
                //             this.newY - this.rockerBg.height / 2);
                //         this.rocker.pos(this.newX - this.rocker.width / 2, this.newY - this.rocker.height / 2);
                //         this.center_x = this.newX;
                //         this.center_y = this.newY;
                //     }
                // }
            }
        }
        public joyStickMove() : void {
            if(this.m_hero && this.m_hero.m_action) {
                let location:any = {x:Laya.stage.mouseX, y:Laya.stage.mouseY};
                if(this.is_move && this.m_control == true && location.x < 500) {//this.leftN
                    let x:number = location.x - this.center_x;
                    let y:number = location.y - this.center_y;

                    let angle:number = Math.atan2(y, x) * 180 / this.PI;
                    let distance:number = Math.sqrt(Math.pow((this.center_x - location.x),2) + Math.pow((this.center_y - location.y),2));

                    // if(ms.rocker_type == 1) {
                    //     this.rocker.pos(location.x - this.rocker.width / 2, location.y - this.rocker.height / 2);
                    // }
                    // else {
                    // if(ms.rocker_type == 1) {
                        // if(this.leftkey == true || this.rightkey == true) {
                        //     if(distance > this.rockerBg.width / 2) {
                        //     }
                        //     else {
                        //         this.rocker.pos(location.x - this.rocker.width / 2, location.y - this.rocker.height / 2);
                        //     }
                        // }
                        // else {
                            if(distance > this.rockerBg.width / 2) {
                                // if(this.upkey == true || this.downkey == true) {
                                    // this.joyStickBegin();
                                // }
                                // else {
                                    this.rocker.pos(location.x - this.rocker.width / 2, location.y - this.rocker.height / 2);
                                // }
                            }
                            else {
                                this.rocker.pos(location.x - this.rocker.width / 2, location.y - this.rocker.height / 2);
                            }
                        // }
                    // }
                    // else if(ms.rocker_type == 2) {
                    //     if(distance > this.rockerBg.width / 2) {
                    //         this.joyStickBegin();
                    //     }
                    //     else {
                    //         this.rocker.pos(location.x - this.rocker.width / 2, location.y - this.rocker.height / 2);
                    //     }
                    // }

                    if(this.m_control) {
                        let N = 3;
                        //这里弄出一个长方形
                        if(distance < 5) {
                            // console.log("什么都不做");
                            // this.onOnThing();
                        }
                        else {
                            if(angle >= 67.5 && angle < 112.5) {
                                // console.log("下")
                                if(distance < N) {}
                                else {
                                    this.upkey = false;
                                    this.downkey = true;
                                    this.leftkey = false;
                                    this.rightkey = false;
                                }
                            }
                            else if(angle >= 22.5 && angle < 67.5) {
                                // console.log("右下")
                                if(angle >= 22.5 && angle < 45 || distance < N) {       //右
                                    this.upkey = false;
                                    this.downkey = false;
                                    this.leftkey = false;
                                    this.rightkey = true;
                                }
                                else {
                                    this.upkey = false;
                                    this.downkey = true;
                                    this.leftkey = false;
                                    this.rightkey = false;
                                }
                            }
                            else if(angle >= -22.5 && angle < 22.5) {
                                // console.log("右")
                                this.upkey = false;
                                this.downkey = false;
                                this.leftkey = false;
                                this.rightkey = true;
                            }
                            else if(angle >= -67.5 && angle < -22.5) {
                                // console.log("右上")
                                if(angle >= -67.5 && angle < -45) { //上
                                    this.upkey = true;
                                    this.downkey = false;
                                    this.leftkey = false;
                                    this.rightkey = false;
                                }
                                else {      //右
                                    this.upkey = false;
                                    this.downkey = false;
                                    this.leftkey = false;
                                    this.rightkey = true;
                                }
                            }
                            else if(angle >= -112.5 && angle < -67.5) {
                                // console.log("上")
                                this.upkey = true;
                                this.downkey = false;
                                this.leftkey = false;
                                this.rightkey = false;
                            }
                            else if(angle >= -157.5 && angle < -112.5) {
                                // console.log("左上")
                                if(angle >= -125.0 && angle < -112.5) {//上
                                    this.upkey = true;
                                    this.downkey = false;
                                    this.leftkey = false;
                                    this.rightkey = false;
                                }
                                else {      //左
                                    this.upkey = false;
                                    this.downkey = false;
                                    this.leftkey = true;
                                    this.rightkey = false;
                                }
                            }
                            else if(angle > -180.0 && angle < -157.5 || angle > 157.0 && angle < 180.0) {
                                // console.log("左")
                                this.upkey = false;
                                this.downkey = false;
                                this.leftkey = true;
                                this.rightkey = false;
                            }
                            else if(angle >= 112.5 && angle < 157.0) {
                                // console.log("左下")
                                if(angle >= 112.5 && angle < 135.0 || distance < N) {       //下
                                    this.upkey = false;
                                    this.downkey = true;
                                    this.leftkey = false;
                                    this.rightkey = false;
                                }
                                else {      //左
                                    this.upkey = false;
                                    this.downkey = false;
                                    this.leftkey = true;
                                    this.rightkey = false;
                                }
                            }

                            Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                        }
                    }
                }
            }
        }
        public joyStickEnd() : void {
            if(this.m_hero && this.m_hero.m_action) {
                this.is_move = false;
                this.joystick_x = this.center_x; this.joystick_y = this.center_y;
                this.upkey = false;
                this.downkey = false;
                this.leftkey = false;
                this.rightkey = false;



                // if(ms.rocker_type == 1) {
                    this.rocker.pos(this.newX + this.rockerBg.width / 2 - this.rocker.width / 2,
                        this.newY - this.rockerBg.height / 2 - this.rocker.height / 2);
                // }
                // else if(ms.rocker_type == 2) {
                //     this.rocker.pos(this.newX - this.rocker.width / 2, this.newY - this.rocker.height / 2);
                // }

                Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
            }
        }

        public DoSomeThingTest() : void {
            this.joyStickMove();
        }

        lastX = - 9999;
        lastY = -9999;
        lastViewX = -9999;
        lastViewY = -9999;
        private mapMove() {
            let width = Laya.stage.width;
            let height = Laya.stage.height;
            let sc_width = (this.VRRight - this.VRLeft)
            if(this.lastX == -9999) {
                let x = Math.max(this.m_hero.m_x, width/2 + this.VRLeft);
                x = Math.min(x, this.VRRight - width/2);

                let y = Math.max(this.m_hero.m_y, height/2 + this.VRTop);
                y = Math.min(y, this.VRBottom - height/2);
                x = Math.floor(x);
                y = Math.floor(y);
                // this.pos(width/2-x, height/2-y);
                this.lastX = this.m_hero.m_x;
                this.lastY = this.m_hero.m_y;
                this.lastViewX = width/2 - x;
                this.lastViewY = height/2 - y;
                this.checkMapBounds();

                this.lastViewX = width/2 - this.m_hero.m_x;
                this.lastViewY = height/2 - this.m_hero.m_y;
                return;
            }

            if(ms.zhaomu == false) return ;

            let dt = 1 / 60;
            let off = 28;
            let dx = this.m_hero.m_x - this.lastX;
            let dy = this.m_hero.m_y - this.lastY;
            let adx = Math.max(Math.abs(dx) - off, 0.);
            let ady = Math.max(Math.abs(dy) - off, 0.);
            let sx = adx == 0 ? 0 : (Math.pow(adx, 1.5) + off) * (dx < 0 ? -1 : 1) * dt * 0.2;
            let sy = ady == 0 ? 0 : (Math.pow(ady, 1.5) + off) * (dy < 0 ? -1 : 1) * dt * 0.2;
            if (Math.abs(sx) > Math.abs(dx)) { sx = dx; }
            if (Math.abs(sy) > Math.abs(dy)) { sy = dy; }

            if(sx == 0 && sy == 0) return ;
            if(sc_width >= width) this.lastX += sx;
            this.lastY += sy;
            if(sc_width >= width) this.lastViewX -= sx;
            this.lastViewY -= sy;
            // this.m_parent.pos(this.lastViewX, this.lastViewY);
            this.checkMapBounds();

        }

        checkMapBounds() {
            let width = Laya.stage.width;
            let height = Laya.stage.height;
            let x = this.lastViewX;
            let y = this.lastViewY;
            if(this.VRLeft + x > 0) {
                x = -this.VRLeft;
            }
            else if(this.VRRight + x < width) {
                x = width - this.VRRight;
            }
            if(this.VRTop + y > 0) {
                y = -this.VRTop;
            }
            else if(this.VRBottom + y < height) {
                y = height - this.VRBottom;
            }

            if(msMoudle.mapP) {
                if(msMoudle.mapP.m_id  == "865010011.img") {
                    y += 50;
                }
                else if(msMoudle.mapP.m_id == "272020200.img") {
                    y += -50;
                }
                if(msMoudle.mapP.m_id == "302020100_gai.img") {
                    y += -125;
                }
            }

            if(this.m_parent) {
                if(this.m_parent.m_sp)
                    this.m_parent.m_sp.pos(x, y);
                if(this.m_parent.m_back)
                    this.m_parent.m_back.setPos(- x, - y);
                if(this.m_parent.m_tile)
                    this.m_parent.m_tile.setPos(- x, - y);
            }
        }

        public delayLoop() : void {

            if(this.cz_sp) this.cz_sp.visible = true;

            this.lastFrameTime = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.doSomeThing);            //主帧
            //
            if(this.mapId == "101000103.img" || this.mapId == "101000100.img" ||
                this.mapId == msMoudle.tiaotiao_map) {
                    Laya.timer.frameLoop(1, this, this.DoSomeThingTest);        //遥感
                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                        if(ms.petbagsdata.length >= 12) {
                            Laya.timer.loop(2000, this, this.pickPetLoop);                  //自动拾取
                        }
                        Laya.timer.loop(200, this, this.pickLoop)
                    }
                }
            else {
                Laya.timer.loop(200, this, this.pickLoop);                  //自动拾取
                if(msMoudle.isAuMap(this.mapId) == false) {
                    if(this.mapId == "000020000_gai.img" && (msMoudle.team_guanka == 1 || msMoudle.team_guanka == 2 || msMoudle.team_guanka == 3) ) {
                    }
                    else {
                        Laya.timer.frameLoop(1, this, this.clickHero);              //点击人物移动
                        // Laya.timer.frameLoop(1, this, this.DclickHero);              //点击人物移动
                    }
                }
            }

            // let xxxxxx = 0;
            // Laya.timer.loop(100, this, ()=> {
            //     this.m_msgList.msgShow(0, "获得" + xxxxxx++, true);
            // });
        }

        private clickHero() : void {
            if(ui.manager.getDialogByName("app.battle.reward2Dlg"))
                if(ui.manager.getDialogByName("app.battle.reward2Dlg").dlg) {
                    this.m__X = 0;
                    this.m__Y = 0;
                }
            if(this.m__X >= -1.5 * (ms.speed / 1) && this.m__X <= 1.5 * (ms.speed / 1)) {
                this.m__X = 0;
                this.rightkey = false;
                this.leftkey = false;
            }
            else {
                if(this.m__X > 1.5 * (ms.speed / 1)) {
                    this.rightkey = true;
                    this.leftkey = false;
                    // while(this.m__X > 0) {
                    //     this.rightMove(msMoudle.char, 2);
                    // }
                }
                else if(this.m__X < -1.5 * (ms.speed / 1)) {
                    this.leftkey = true;
                    this.rightkey = false;
                    // while(this.m__X < 0) {
                    //     this.leftMove(msMoudle.char, 2);
                    // }
                }
                else {
                    this.rightkey = false;
                    this.leftkey = false;
                }
            }
            if(this.mapId == "141060000_gai.img") {
                if(this.m__Y >= -1.5 * (ms.speed / 1) && this.m__Y <= 1.5 * (ms.speed / 1)) {
                    this.m__Y = 0;
                    this.upkey = false;
                    this.downkey = false;
                }
                else {
                    if(this.m__Y > 1.5 * (ms.speed / 1)) {
                        this.downkey = true;
                        this.upkey = false;
                    }
                    else if(this.m__Y < -1.5 * (ms.speed / 1)) {
                        this.upkey = true;
                        this.downkey = false;
                    }
                    else {
                        this.downkey = false;
                        this.upkey = false;
                    }
                }
            }
        }

        public m__X:number = 0;
        public m__Y:number = 0;
        public m_touch:boolean = true;
        private onD(e: Event) : void {
            if(ms.herodata.Lv > 1) {
                if(this.m_touch && msMoudle.m__touch) { //hide
                    this.m__X = Math.round(Laya.stage.mouseX - (this.m_parent.m_sp.x + msMoudle.char.m_x));// - (Laya.stage.width - 800) / 2
                    this.m__Y = Math.round(Laya.stage.mouseY - (this.m_parent.m_sp.y + msMoudle.char.m_y));
                }
            }
        }

        private onU(e: Event) : void {
            if(msMoudle.m__touch == false)
                this.m_touch = true;
        }

        private pickLoop() : void {
            // this.judgeHelper();
            this.ItemPick();
        }

        pickPetLoop() : void {
            this.ItemPick(true);
        }

        /////按键操作
        public onKeyDown(event:Laya.Event) : void {
            if(this.m_control == true && msMoudle.fcd == false) {
                if(event.keyCode == Laya.Keyboard.W) {
                    this.upkey = true;
                    this.downkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.S) {
                    this.downkey = true;
                    this.upkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.A) {
                    this.leftkey = true;
                    this.rightkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.D) {
                    this.rightkey = true;
                    this.leftkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.L) {
                    this.onSk1();
                }
                else if(event.keyCode == Laya.Keyboard.I) {
                    this.onSk2();
                }
                else if(event.keyCode == Laya.Keyboard.O) {
                    this.onSk3();
                }
                else if(event.keyCode == Laya.Keyboard.J) {
                    this.onJump();
                }
            }
        }
        public onKeyUp(event:Laya.Event) : void {
            if(this.m_control == true && msMoudle.fcd == false) {
                if(event.keyCode == Laya.Keyboard.W) {
                    this.upkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.S) {
                    this.downkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.A) {
                    this.leftkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.D) {
                    this.rightkey = false;
                    // if(this.m_control && this.m_hero && ((this.m_hero.m_action && this.m_hero.m_action.indexOf("stand") > -1) || this.m_hero.m_up_t != 0 || this.m_hero.m_down_t != 0))
                        Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                }
                else if(event.keyCode == Laya.Keyboard.J) {
                    this.onJump();
                    this.onJump2();////
                }
                else if(event.keyCode == Laya.Keyboard.K) {
                    this.onAtk();
                }
                else if(event.keyCode == Laya.Keyboard.SPACE) {
                    this.onWater1();
                }
                else if(event.keyCode == Laya.Keyboard.L) {
                    this.onSk1_up();
                }
                else if(event.keyCode == Laya.Keyboard.P) {
                    this.onState();
                }
                else if(event.keyCode == Laya.Keyboard.I) {
                    this.onSk2_up();
                }
                else if(event.keyCode == Laya.Keyboard.N) {
                    this.onState2();
                }
                else if(event.keyCode == Laya.Keyboard.O) {
                    this.onSk3_up();
                }
                else if(event.keyCode == Laya.Keyboard.Y) {
                    this.onFace();
                }
                else if(event.keyCode == Laya.Keyboard.T) {
                    this.onTamingMob();
                }
                //
            }
        }


        public clearGuanKa() : void {
            if(msMoudle.mapP.m_life) {
                msMoudle.mapP.m_life.clearUp();
            }
        }

        public clearMap() : void {
            this.clearUp();
            if(msMoudle.gameP) {
                if(msMoudle.gameP.cool) {
                    msMoudle.gameP.cool.clearUp();
                    msMoudle.gameP.cool = null;
                }
            }
            if(this.m_parent.m_av) {
                this.m_parent.m_av.clearUp();
                this.m_parent.m_av = null;
            }
            if(this.m_parent.m_msg) {
                this.m_parent.m_msg.clearUp();
                this.m_parent.m_msg = null;
            }
            Laya.timer.clear(this.m_parent, this.m_parent.showAvatarMegaphone);
            Laya.timer.clear(this.m_parent, this.m_parent.showAvatarMegaphoneED);
            Laya.timer.clear(this.m_parent, this.m_parent.getExp);
            Laya.timer.clear(this.m_parent, this.m_parent.getMainExp);
            Laya.timer.clear(Laya.stage, Sync.reportMyStatus);
            Laya.timer.clear(Laya.stage, Sync.reportMobs);
            Laya.timer.clear(Laya.stage, Sync.reportAttackMobs);
            Laya.timer.clear(Laya.stage, Sync.enterMap);
            Laya.timer.clear(Laya.stage, Sync.reportMap);
            Sync.leaveMap();
            if(this.m_msgList) {
                this.m_msgList.clearUp();       //msg一直有问题
                this.m_msgList = null;
            }
            if(this.m_parent.m_back) {
                this.m_parent.m_back.clearUp();
                this.m_parent.m_back = null;
            }
            if(this.m_parent.m_obj) {
                this.m_parent.m_obj.clearUp();
                this.m_parent.m_obj = null;
            }
            if(this.m_parent.m_tile) {
                this.m_parent.m_tile.clearUp();
                this.m_parent.m_tile = null;
            }
            if(this.m_parent.m_foothld) {
                this.m_parent.m_foothld.clearUp();
                this.m_parent.m_foothld = null;
            }
            if(this.m_parent.m_life) {
                this.m_parent.m_life.clearUp();
                this.m_parent.m_life = null;
            }
            if(this.m_parent.m_reactor) {
                this.m_parent.m_reactor.clearUp();
                this.m_parent.m_reactor = null;
            }
            if(this.m_helper) {
                this.m_helper.clearUp();
                this.m_helper = null;
            }
            if(this.m_parent.m_water) {
                this.m_parent.m_water.clearUp();
                this.m_parent.m_water = null;
            }
            if(this.m_parent.m_mini) {
                this.m_parent.m_mini.clearUp();
                this.m_parent.m_mini = null;
            }
            if(this.m_parent.char) {
                this.m_parent.char.clearUp();
                this.m_parent.char = null;
            }
            if(this.m_parent.heroList) {
                for(let i:number = 0; i < this.m_parent.heroList.length; i++) {
                    if(this.m_parent.heroList[i]) {
                        this.m_parent.heroList[i].clearUp();
                        this.m_parent.heroList[i] = null;
                    }
                }
                this.m_parent.heroList = [];
            }
            if(this.m_parent.otherchar) {
                for(let i:number = 0; i < this.m_parent.otherchar.length; i++) {
                    if(this.m_parent.otherchar[i]) {
                        this.m_parent.otherchar[i].clearUp();
                        this.m_parent.otherchar[i] = null;
                    }
                }
                this.m_parent.otherchar = [];
            }
            if(Sync.realPlayers) {
                for(let i:number = 0; i < Sync.realPlayers.length; i++) {
                    if(Sync.realPlayers[i]) {
                        Sync.realPlayers[i].clearUp();
                        Sync.realPlayers[i] = null;
                    }
                }
                Sync.realPlayers = [];
            }
            if(this.m_parent.team_hero) {
                for(let i:number = 0; i < this.m_parent.team_hero.length; i++) {
                    if(this.m_parent.team_hero[i]) {
                        this.m_parent.team_hero[i].clearUp();
                        this.m_parent.team_hero[i] = null;
                    }
                }
                this.m_parent.team_hero = [];
            }

            if(this.m_parent.summonList) {
                for(let i:number = 0; i < this.m_parent.summonList.length; i++) {
                    if(this.m_parent.summonList[i]) {
                        this.m_parent.summonList[i].clearUp();
                        this.m_parent.summonList[i] = null;
                    }
                }
                this.m_parent.summonList = [];
            }

            if(ms.petbagsdata.length > 0) {
                for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                    if(ms.petbagsdata[i] && this.m_pet[i]) {
                        this.m_pet[i].clearUp();
                        this.m_pet[i] = null;
                    }
                }
            }
            if(this.m_parent.skill) {
                this.m_parent.skill.clearUp();
                this.m_parent.skill = null;
            }
            for(let i:number = 0; i < this.m_itemList.length; i++) {
                if(this.m_itemList[i]) {
                    this.m_itemList[i].clearUp();
                }
            }
            this.m_itemList = [];

            //////清理
            msMoudle.wz[this.m_parent.m_id] = null;
            for(let i:number = 0; i < this.m_parent.test_tile.length; i++) {
                msMoudle.wz[this.m_parent.test_tile[i] + ".img"] = null;
            }
            for(let i:number = 0; i < this.m_parent.test_obj.length; i++) {
                msMoudle.wz[this.m_parent.test_obj[i] + ".img"] = null;
            }
            for(let i:number = 0; i < this.m_parent.test_back.length; i++) {
                msMoudle.backwz[this.m_parent.test_back[i] + ".img"] = null;
            }
            /////character相关清理
            //"res/Character/Body/00002000.img/index.html"

            for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
                msMoudle.wz[msMoudle.AllWeapon[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory1[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory2[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory3[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory4[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory5[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++) {
                msMoudle.wz[msMoudle.AllAccessory6[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
                msMoudle.wz[msMoudle.AllCape[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllCoat.length; i++) {
                msMoudle.wz[msMoudle.AllCoat[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllPants.length; i++) {
                msMoudle.wz[msMoudle.AllPants[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllGlove.length; i++) {
                msMoudle.wz[msMoudle.AllGlove[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllShoes.length; i++) {
                msMoudle.wz[msMoudle.AllShoes[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllFace.length; i++) {
                msMoudle.wz[msMoudle.AllFace[i] + ".img"] = null;
            }
            for(let i:number = 0; i < msMoudle.AllHair.length; i++) {
                msMoudle.wz[msMoudle.AllHair[i] + ".img"] = null;
            }

            if(msMoudle.wz["0301.img"]) {
                msMoudle.wz["0301.img"] = null;
            }

            //清理预加载技能
            if(msMoudle.rmvPng) {
                for(let i:number = 0; i < this.m_parent.m_pre_skill_png.length; i++) {
                    if(this.m_parent.m_pre_skill_png[i]) {
                        Laya.Loader.clearRes(this.m_parent.m_pre_skill_png[i]);
                    }
                }
                msMoudle.rmvPng = false;
            }
            this.m_parent.kb = null;
        }

        lastFrameTime = 0;
        private doSomeThing() : void {
            let curTime = new Date().getTime();
            let difTime = curTime - this.lastFrameTime;
            this.lastFrameTime = curTime;

            if(this.leftkey == true) {
                this.onLeft();
            }
            else if(this.rightkey == true) {
                this.onRight();
            }
            else if(this.upkey == true) {
                this.onUp();
            }
            else if(this.downkey == true) {
                this.ondown();
            }

            //做成30帧的
            // console.log("xxxx", difTime);
            // serverTime
            if(difTime < 20) {
                this.TimeMove();
            }
            else {
                //剩下的问题就是这里了
                let cnt = Math.round(difTime / 16.67);
                for(let i=0; i<cnt; ++i) {
                    this.TimeMove();
                }
            }

            if(this.m_parent && this.m_parent.m_mini) {
                if(this.m_parent.m_mini.m_end) {
                    this.m_parent.m_mini.updateMini();
                }
            }

            this.mapMove();

        }

        TimeMove() : void {

            this.CharacterMove(this.m_hero);

            for(let i=0; i<Sync.realPlayers.length; ++i) {
                let player = Sync.realPlayers[i];
                if(player && player.m_action) {
                    this.PlayerMove(player);
                    if(player.m_down_t == 0) this.otherJump(player);
                    if(player.m_up_t == 0) this.FreeDownPlayer(player);
                }
            }

            if(this.mapId == msMoudle.tiaotiao_map || this.mapId == "302020100_gai.img") {

                if(ms.petbagsdata.length > 0) {
                    for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                        if(i <= 11) {
                            if(ms.petbagsdata[i] && this.m_pet[i]) {
                                this.PetMove(this.m_hero, this.m_pet[i], i);
                                if(this.m_pet[i].m_down_t == 0) this.PetJump(this.m_pet[i]);
                                if(this.m_pet[i].m_up_t == 0) this.FreeDownPet(this.m_pet[i]);
                            }
                        }
                    }
                }

                // if(this.m_pet && ms.pet != "N") {
                //     this.PetMove();
                //     if(this.m_pet.m_down_t == 0) this.PetJump(this.m_pet);
                //     if(this.m_pet.m_up_t == 0) this.FreeDownPet(this.m_pet);
                // }
            }
            this.JudgeBound();
            // this.MobMove();
            this.Jump(this.m_hero);
            if(this.mapId != "141060000_gai.img") {
                if(this.m_hero.m_up_t == 0) {
                    this.FreeDown(this.m_hero);
                }

                ///其他npc
                for(let i:number = 0; i < msMoudle.mapP.otherchar.length; i++) {
                    if(msMoudle.mapP.otherchar[i]) {
                        if(msMoudle.mapP.otherchar[i].m_up_t == 0) {
                            this.FreeDown(msMoudle.mapP.otherchar[i], 1);
                        }
                    }
                }
                //其他队伍
                for(let i:number = 0; i < msMoudle.mapP.team_hero.length; i++) {
                    if(msMoudle.mapP.team_hero[i]) {
                        if(msMoudle.mapP.team_hero[i].m_up_t == 0) {
                            this.FreeDown(msMoudle.mapP.team_hero[i], 1);
                        }
                    }
                }
                //自己的英雄
                for(let i:number = 0; i < this.m_heroList.length; i++) {
                    if(this.m_heroList[i]) {
                        if(this.m_heroList[i].m_up_t == 0) {
                            this.FreeDown(this.m_heroList[i], 1);
                        }
                    }
                }
            }
            if(msMoudle.mapP.m_life) {
                if(msMoudle.mapP.m_life.m_mobsAni) {
                    for(let i:number = 0; i < msMoudle.mapP.m_life.m_mobsAni.length; i++) {
                        if(msMoudle.mapP.m_life.m_mobsAni[i].m_up_t == 0) this.FreeDownMob(msMoudle.mapP.m_life.m_mobsAni[i]);
                    }
                }
            }
            if(msMoudle.mainP.summonList) {
                for(let i:number = 0; i < msMoudle.mainP.summonList.length; i++) {
                    if(msMoudle.mainP.summonList[i].m_up_t == 0) this.FreeDownMob(msMoudle.mainP.summonList[i]);
                }
            }
            for(let i:number = 0; i < this.m_itemList.length; i++) {
                if(this.m_itemList[i] && this.m_itemList[i].m_up_t == 0 && this.m_itemList[i].itemState == true)
                this.FreeDownItem(this.m_itemList[i]);
            }
        }

        private CharacterMove(role:any) : void {
            if(this.m_forcecontrol == false) return ;
            //没有按键相应
            if(role && role.m_action) {
                if(this.upkey == false && this.downkey == false && this.leftkey == false && this.rightkey == false) {
                    if(role.m_action.indexOf("walk") >= 0 || role.m_action.indexOf("prone") >= 0) {
                        if(role._autofight == false) {               //这里肯定也不对
                            role.changeByName("stand", 0);
                        }
                    }
                }
                else {
                    if(this.leftkey == true && this.rightkey == false) {
                        let N:number = 2.4;
                        if(this._doublej || this._huoye && role.m_special == false) {
                            let T = 4;
                            if(this._huoye) T = 100;
                            let iswall:boolean = false;
                            for(let i:number = 0; i < T; i++) {
                                if(role.m_action == this.jump_action || this._huoye) {
                                    if(this.onLine(role, 0)) {
                                        iswall = true;
                                        break;
                                    }
                                    if(this.onWall(role, role.m_dir) == false) {
                                        if(this._doubledis >= N * (ms.speed / 1)) {
                                            this.leftMove(role, N * (ms.speed / 1));
                                            this._doubledis -= N * (ms.speed / 1);
                                        }
                                    }
                                    else {
                                        iswall = true;
                                        this.rightkey = false;
                                        this.leftkey = false;
                                        this.m_control = false;
                                        break;
                                    }
                                }
                            }
                            if(this._huoye) {
                                this._huoye = false;
                                this.rightkey = false;
                                this.leftkey = false;
                                this.m_control = true;
                            }
                        }
                        else {
                            let iswall:boolean = false;
                            if(role.m_action.indexOf("walk") >= 0 || role.m_action == this.jump_action ||
                                ( (role.canJumpAtk() && role.m_dir == 1) && (role.m_down_t > 0 || role.m_up_t > 0) ) ) {
                                if(this.onWall(role, role.m_dir) == false) {
                                    this.leftMove(role, N * (ms.speed / 1));
                                }
                                else {
                                    iswall = true;
                                }
                            }
                            if(iswall == false) {
                                ///直接爬绳子
                                if(this.m_hero.m_action == this.jump_action) {
                                    if(this.onRope(this.m_hero, false)) {
                                        this.m_hero.m_down_t = 0;
                                        this.m_hero.m_up_t = 0;
                                        this.m_hero.changeByName("ladder", 0);
                                        Sync.reportMyOperate("ladder", [], []);
                                        if(this.m_hero.m_special == false) {
                                            this.m_push = false;
                                            this.m_double_time = false;
                                            this.can_dj = false;
                                            Laya.timer.clear(this, this.double_tim);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(this.rightkey == true && this.leftkey == false) {
                        let N:number = 2.4;
                        if(this._doublej || this._huoye && role.m_special == false) {
                            let iswall:boolean = false;
                            let T = 4;
                            if(this._huoye) T = 100;
                            for(let i:number = 0; i < T; i++) {
                                if(role.m_action == this.jump_action || this._huoye) {//
                                    if(this.onLine(role, 0)) {
                                        iswall = true;
                                        break;
                                    }
                                    if(this.onWall(role, role.m_dir) == false) {
                                        if(this._doubledis >= N * (ms.speed / 1)) {
                                            this.rightMove(role, N * (ms.speed / 1));
                                            this._doubledis -= N * (ms.speed / 1);
                                        }
                                    }
                                    else {
                                        iswall = true;
                                        this.rightkey = false;
                                        this.leftkey = false;
                                        this.m_control = false;
                                        break;
                                    }
                                }
                            }
                            if(this._huoye) {
                                this._huoye = false;
                                this.rightkey = false;
                                this.leftkey = false;
                                this.m_control = true;
                            }
                        }
                        else {
                            let iswall:boolean = false;
                            if(role.m_action.indexOf("walk") >= 0 || role.m_action == this.jump_action ||
                                ( (role.canJumpAtk() && role.m_dir == -1) && (role.m_down_t > 0 || role.m_up_t > 0) ) ) {//
                                if(this.onWall(role, role.m_dir) == false) {
                                    this.rightMove(role, N * (ms.speed / 1));
                                }
                                else {
                                    iswall = true;
                                }
                            }
                            if(iswall == false) {
                                ///直接爬绳子
                                if(this.m_hero.m_action == this.jump_action) {
                                    if(this.onRope(this.m_hero, false)) {
                                        this.m_hero.m_down_t = 0;
                                        this.m_hero.m_up_t = 0;
                                        this.m_hero.changeByName("ladder", 0);
                                        Sync.reportMyOperate("ladder", [], []);
                                        if(this.m_hero.m_special == false) {
                                            this.m_push = false;
                                            this.m_double_time = false;
                                            this.can_dj = false;
                                            Laya.timer.clear(this, this.double_tim);
                                        }
                                    }
                                }
                            }
                        }

                    }
                    if(this.upkey == true && this.downkey == false) {
                        let N:number = 2;
                        if(this._doublej && role.m_special == false) N = 1;
                        if(role.m_action == "ladder") {
                            // N = this.onRopeHeight(-N, role);
                            this.upMove(role, 2);
                        }
                        else {
                            if(this.mapId == "141060000_gai.img") {
                                N = 2;
                                if(this.FreeUp(role, -1) == false) this.upMove(role, N);
                            }
                        }
                    }
                    if(this.downkey == true && this.upkey == false) {
                        let N:number = 2;
                        if(this._doublej && role.m_special == false) N = 1;
                        if(role.m_action == "ladder" || this.mapId == "0010203.img") {
                            // N = this.onRopeHeight(N);
                            this.downMove(role, N);
                        }
                        else {
                            if(this.mapId == "141060000_gai.img") {
                                N = 2;
                                if(this.FreeUp(role, 1) == false) this.downMove(role, N);
                            }
                        }
                    }
                }
            }
        }

        private PlayerMove(role:any) : void {
            if((role.key_left || role.key_right) && (role.m_action.indexOf("stand") >= 0 || role.m_action.indexOf("prone") >= 0)) {
                role.setDir(role.key_left ? 1 : -1);
                role.changeByName("walk", 0);
            }
            else if((!role.key_left && !role.key_right) && role.m_action.indexOf("walk") >= 0) {
                role.changeByName("stand", 0);
            }
            if((!role.key_left && !role.key_right && role.key_down) && role.m_action.indexOf("stand") >= 0) {
                role.changeByName("prone", 0);
            }
            else if((!role.key_left && !role.key_right && !role.key_down) && role.m_action.indexOf("prone") >= 0) {
                role.changeByName("stand", 0);
            }
            if(role.m_action == "ladder") {
                if(role.key_up && !role.key_down) {
                    this.HeroupMove(role, 2);
                }
                else if(!role.key_up && role.key_down) {
                    this.HerodownMove(role, 2);
                }
            }
            if(((role.key_left || role.key_right) && (role.m_action.indexOf("walk") >= 0 || ((role.m_up_t != 0 || role.m_down_t != 0) && (role.m_action.indexOf("jump") >= 0 || role.canJumpAtk())) )) || role.isDoubleJump) {

            }
            else {
                return;
            }

            let dir = role.m_dir;
            let N = 2.4 * ms.speed;
            let T = 1;
            if(role.isDoubleJump) T = 4;
            for(let i:number = 0; i < T; i++) {
                if((role.m_action == this.jump_action) && this.onLine(role, 1)) {
                    // role.isDoubleJump = false;
                    // role.key_left = role.key_right = false;
                    break;
                }
                if(dir == 1) {
                    if(this.onWall(role, role.m_dir) == false) {
                        if(role.isDoubleJump) {
                            if(role.doubledis >= N) {
                                this.HeroleftMove(role, N);
                                role.doubledis -= N;
                            }
                        }
                        else {
                            this.HeroleftMove(role, N);
                        }
                        // role.setPos(role.m_x - N, role.m_y);
                    }
                }
                else {
                    if(this.onWall(role, role.m_dir) == false) {
                        if(role.isDoubleJump) {
                            if(role.doubledis >= N) {
                                this.HerorightMove(role, N);
                                role.doubledis -= N;
                            }
                        }
                        else {
                            this.HerorightMove(role, N);
                        }
                        // role.setPos(role.m_x + N, role.m_y);
                    }
                }
            }
        }
        private PetMove(hero:any, role:any, index:number) : void {

            if(role && hero) {
                if(hero.m_x > role.m_x) role.setDir(-1);
                else role.setDir(1);

                // if(hero.m_action == "ladder") {
                //     if(role.m_action != "hang") {
                //         this.m_parent.m_basiceff.loadPetEff(this.m_parent.m_sp, role.m_id.split(".")[0], role.m_x, role.m_y);
                //         role.changeByName("hang");
                //     }
                //     role.setPos(hero.m_x, hero.m_y-4);
                // }
                // else {
                    if(hero.m_x < role.m_x - (350 + index * 30) || hero.m_x > role.m_x + (350 + index * 30) ||
                        hero.m_y < role.m_y - 300 || hero.m_y > role.m_y + 300) {
                        role.setPos(hero.m_x, hero.m_y);
                        // this.m_parent.m_basiceff.loadPetEff(this.m_parent.m_sp, "Teleport", hero.m_x, hero.m_y);
                        role.changeByName("stand0");
                    }
                    else {
                        if(hero.m_x < role.m_x - (100 + index * 30) ) {
                            if(role.m_action == "stand0") role.changeByName("move");
                            if(this.onWall(role, role.m_dir) == false) this.PetleftMove(role, 1.8);
                            else {
                                if(role.m_up_t == 0 && role.m_down_t == 0) {
                                    role.m_up_t = 0.000001;
                                    if(role.m_action != this.jump_action)
                                        role.changeByName(this.jump_action);
                                }
                            }
                        }
                        else if(hero.m_x > role.m_x + (100 + index * 30) ) {
                            if(role.m_action == "stand0") role.changeByName("move");
                            if(this.onWall(role, role.m_dir) == false) this.PetrightMove(role, 1.8);
                            else {
                                if(role.m_up_t == 0 && role.m_down_t == 0) {
                                    role.m_up_t = 0.000001;
                                    if(role.m_action != this.jump_action)
                                        role.changeByName(this.jump_action);
                                }
                            }
                        }
                        else {
                            if(role.m_action != "stand0") {
                                role.changeByName("stand0");
                            }
                        }
                    }
            }
        }
        ////////////////////////////////////////////////////////
        /////////公共逻辑
        private onLine(role:any, hero_type:number = 0) : boolean {
            //斜坡的处理
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;
                    let y:number = role.m_y;
                    for(let i:number = 0; i < line.length; i++) {
                        if(line[i].x1 != line[i].x2) {//先保证不是墙
                            if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                                //跟斜率有关系y = kx + b
                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                y = k * role.m_x + b;
                                //斜坡必须拖回来
                                if(y >= role.m_y - 5 && y <= role.m_y + 5) {
                                // if(y >= role.m_y - 3 && y <= role.m_y + 3) {

                                    /////只有是角色才有这个地方
                                    //这个判断会导致角色很容易掉坑，但是去掉下爬梯子会出问题
                                    if(this.downkey == false || this.leftkey || this.rightkey) {
                                    // if(!(this.downkey && role.m_action.indexOf("ladder") > -1)) {
                                        if(y > role.m_y) {
                                            // let N = 2;
                                            if(hero_type == 1) {
                                                this.HerodownMove(role, y - role.m_y);
                                            }
                                            else {
                                                this.downMove(role, y - role.m_y);
                                                // if(Math.abs(role.m_y - y) < 1) N = Math.abs(role.m_y - y);
                                                // this.downMove(role, N);
                                            }
                                        }
                                        if(role.m_y > y) {
                                            // let N = 2;
                                            if(hero_type == 1) {
                                                this.HeroupMove(role, role.m_y - y);
                                            }
                                            else {
                                                this.upMove(role, role.m_y - y);
                                                // if(Math.abs(role.m_y - y) < 1) N = Math.abs(role.m_y - y);
                                                // this.upMove(role, N);
                                            }
                                        }
                                    }

                                    ///解决部分npc下落斜坡的问题
                                    if(role.m_action.indexOf("stand") < 0) {
                                        if(role.m_down_t == 0 && role.m_action.indexOf(this.jump_action) >= 0) {
                                            role.changeByName("stand");
                                        }
                                    }

                                    if(role.m_special == false) {
                                        this.m_push = false;
                                        this.m_double_time = false;
                                        this.can_dj = false;
                                        Laya.timer.clear(this, this.double_tim);
                                    }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
        private onLinePlayer(role:any, hero_type:number = 0) : boolean {
            //斜坡的处理
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;
                    let y:number = role.m_y;
                    for(let i:number = 0; i < line.length; i++) {
                        if(line[i].x1 != line[i].x2) {//先保证不是墙
                            if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                                //跟斜率有关系y = kx + b
                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                y = k * role.m_x + b;
                                //斜坡必须拖回来
                                if(y >= role.m_y - 5 && y <= role.m_y + 5) {
                                    // if(this.downkey == false) {
                                        if(y > role.m_y) this.MobdownMove(role, y - role.m_y);
                                        if(role.m_y > y) this.MobupMove(role, role.m_y - y);
                                    // }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
        private onLineMob(role:any, hero_type:number = 0) : boolean {
            //斜坡的处理
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;
                    let y:number = role.m_y;
                    for(let i:number = 0; i < line.length; i++) {
                        if(line[i].x1 != line[i].x2) {//先保证不是墙
                            if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                                //跟斜率有关系y = kx + b
                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                y = k * role.m_x + b;
                                //斜坡必须拖回来
                                if(y >= role.m_y - 3 && y <= role.m_y + 3) {
                                    // if(this.downkey == false) {
                                        if(y > role.m_y) this.MobdownMove(role, y - role.m_y);
                                        if(role.m_y > y) this.MobupMove(role, role.m_y - y);
                                    // }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
        private onLinePet(role:any, hero_type:number = 0) : boolean {
            //斜坡的处理
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;
                    let y:number = role.m_y;
                    for(let i:number = 0; i < line.length; i++) {
                        if(line[i].x1 != line[i].x2) {//先保证不是墙
                            if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                                //跟斜率有关系y = kx + b
                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                y = k * role.m_x + b;
                                //斜坡必须拖回来
                                if(y >= role.m_y - 3 && y <= role.m_y + 3) {
                                    // if(this.downkey == false) {
                                        if(y > role.m_y) this.PetdownMove(role, y - role.m_y);
                                        if(role.m_y > y) this.PetupMove(role, role.m_y - y);
                                    // }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }
        private onLineItem(role:any, hero_type:number = 0) : boolean {
            //斜坡的处理
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;
                    let y:number = role.m__y;
                    for(let i:number = 0; i < line.length; i++) {
                        if(line[i].x1 != line[i].x2) {//先保证不是墙
                            if(role.m__x >= line[i].x1 && role.m__x <= line[i].x2) {//先保证基本条件成立
                                //跟斜率有关系y = kx + b
                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                y = k * role.m__x + b;
                                //斜坡必须拖回来
                                if(y >= role.m__y - 3 && y <= role.m__y + 3) {
                                    // if(this.downkey == false) {
                                        // if(y > role.m__y) this.ItemdownMove(role, y - role.m__y);
                                        // if(role.m__y > y) this.ItemdownMove(role, role.m__y - y);
                                    // }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        ///斜率可以提前算
        private FreeDown(role:any, hero_type:number = 0) : void {
            if(role.m_action) {
                if(role.m_action != "ladder") {
                    //判断点是否在线上
                    if(this.onLine(role, hero_type) == false) {
                        if(role.canJumpAtk() == false) {
                            if(role.m_action != this.jump_action) role.changeByName(this.jump_action, 0);
                        }
                        if(this.m_parent.m_foothld) {
                            if(this.m_parent.m_foothld.line) {
                                let line = this.m_parent.m_foothld.line;

                                //距离当前位置最近的y
                                let leave_min:number = role.m_y;
                                if(role.m_down_t > 0.8) {
                                    leave_min = role.m_y + (msMoudle.fallSpeed / 120);
                                }
                                else {
                                    // console.log("@@@@@@", 4)
                                    role.m_down_t = role.m_down_t + 0.1;
                                    leave_min = role.m_y + (msMoudle.gravityAcc / 1000) * (role.m_down_t * role.m_down_t) / 2;
                                }
                                for(let i:number = 0; i < line.length; i++) {
                                    //保证在区域内
                                    let min_w = line[i].x1;
                                    let max_w = line[i].x2;
                                    if(min_w > max_w) {
                                        let t = min_w;
                                        min_w = max_w;
                                        max_w = t;
                                    }
                                    if(role.m_x >= min_w && role.m_x <= max_w) {
                                        let min_h = line[i].y1;
                                        let max_h = line[i].y2;
                                        if(min_h > max_h) {
                                            let t = min_h;
                                            min_h = max_h;
                                            max_h = t;
                                        }
                                        let h:number = max_h;
                                        // for(let h:number = max_h; h <= max_h; h++) {
                                            if(h >= role.m_y) {//保证是人物下方的线
                                                //跟斜率有关系y = kx + b
                                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                                let heroy:number = k * role.m_x + b;
                                                ///没有考虑负数的情况
                                                ///改动了这里
                                                if(leave_min > heroy && heroy > role.m_y) {// && heroy > role.m_y
                                                    leave_min = heroy;   //更新需要下降的距离
                                                    // console.log("222", leave_min, role.m_y, heroy, line[i].x1, line[i].x2, line[i].y1, line[i].y2)
                                                }
                                                //
                                            }
                                        // }
                                    }
                                }
                                // console.log("222", leave_min, role.m_y)
                                if(leave_min > role.m_y) {
                                    if(hero_type == 1) this.HerodownMove(role, leave_min - role.m_y);
                                    else this.downMove(role, leave_min - role.m_y);
                                }


                            }
                        }
                    }
                    else {

                        // if(role.m_action == this.jump_action) {           //这个肯定不对
                        // if(role._autofight == false || role.m_action == this.jump_action) {
                            if(role.canJumpAtk()) {
                                //技能完成
                                role.m_down_t = 0;
                            }
                            else {
                                role.m_down_t = 0;
                                // console.log("UUU",role.m_action )
                                if(role.m_action == this.jump_action) {       //注意怪物分开处理
                                // if(role.m_action.indexOf("stand") < 0 && role.m_action.indexOf("walk") < 0) {
                                    role.m_down_t = 0;
                                    if( (this.leftkey == true && this.rightkey == false) ||
                                        (this.leftkey == false && this.rightkey == true) )
                                        role.changeByName("walk", 0);
                                    else role.changeByName("stand", 0);
                                }
                            }

                            if(this._doublej && role.m_special == false && role.teamIndex == 100) {
                                this._doublej = false;
                                this._doubledis = 0;
                                this.m_control = true;
                                // Sync.reportMyOperate("pos", []);
                            }
                        // }

                    }
                }
            }
        }
        private FreeUp(role:any, dir:number) : boolean {
            let leaseU:number = -99999;
            let leaseD:number = 99999;

            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {

                    let line = this.m_parent.m_foothld.line;

                    let lasti:number = 0;
                    for(let i:number = 0; i < line.length; i++) {
                        let minh:number = line[i].x1;
                        let maxh:number = line[i].x2;
                        if(minh > maxh) {
                            let t = maxh;
                            maxh = minh;
                            minh = t;
                        }
                        if(maxh > minh) {
                            ///横线
                            if(line[i].y1 == line[i].y2 && role.m_x >= minh && role.m_x <= maxh) {
                                if(dir == 1) {          //下面
                                    //在下面且离我最近的     取最小的
                                    if(line[i].y1 > role.m_y) {
                                        if(line[i].y1 < leaseD) {
                                            leaseD = line[i].y1;
                                            lasti = i;
                                        }
                                    }
                                }
                                if(dir == -1) {
                                    //在上面且离我最近的  最最大的
                                    if(line[i].y1 < role.m_y) {
                                        if(line[i].y1 > leaseU) {
                                            leaseU = line[i].y1;
                                            lasti = i;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(dir == 1) {
                        if(role.m_y + 10 > leaseD) return true;
                    }
                    if(dir == -1) {     //上
                        if(role.m_y - 10 < leaseU) return true;
                    }

                }
            }

            return false;
        }
        private onWall(role:any, dir:number) : boolean {
            let leaseR:number = 99999;
            let leaseL:number = -99999;
            if(this.m_parent.m_foothld) {
                if(this.m_parent.m_foothld.line) {
                    let line = this.m_parent.m_foothld.line;

                    let lasti:number = 0;
                    for(let i:number = 0; i < line.length; i++) {
                        let minh:number = line[i].y1;
                        let maxh:number = line[i].y2;
                        if(minh > maxh) {
                            let t = maxh;
                            maxh = minh;
                            minh = t;
                        }
                        if(maxh > minh) {
                            if(line[i].x1 == line[i].x2 && role.m_y - 6 >= minh && role.m_y <= maxh+3) {
                                if(dir == 1) {
                                    //在左边且离我最近的墙
                                    if(line[i].x1 < role.m_x) {
                                        if(line[i].x1 > leaseL) {
                                            leaseL = line[i].x1;
                                            lasti = i;
                                        }
                                    }
                                }
                                if(dir == -1) {
                                    //在右边且离我最近的墙
                                    if(line[i].x1 > role.m_x) {
                                        if(line[i].x1 < leaseR) {
                                            leaseR = line[i].x1;
                                            lasti = i;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(dir == 1) {
                        if(role.m_x - 10 < leaseL) return true;
                    }
                    if(dir == -1) {
                        if(role.m_x + 10 > leaseR) return true;
                    }
                }
            }
            return false;
        }
        //攀爬物
        public onRope(role:any, flag:boolean = true) : boolean {
            for(let i:number = 0; i < this.m_parent.m_foothld.ladder.length; i++) {
                ///首先确定是个绳子
                if(this.m_parent.m_foothld.ladder[i].x1 == this.m_parent.m_foothld.ladder[i].x2) {
                    let N = 10;
                    if(flag == false) N = 1;
                    //
                    if(role.m_x >= this.m_parent.m_foothld.ladder[i].x1 - N &&
                        role.m_x <= this.m_parent.m_foothld.ladder[i].x1 + N) {
                        let minh = this.m_parent.m_foothld.ladder[i].y1;
                        let maxh = this.m_parent.m_foothld.ladder[i].y2;
                        if(minh > maxh) {
                            let t = maxh;
                            maxh = minh;
                            minh = t;
                        }
                        //向上
                        if(this.upkey == true && this.downkey == false) {
                            if(role.m_y - 2 >= minh && role.m_y - 2 <= maxh) {
                                // msMoudle.toast("1111")
                                if(role.m_x != this.m_parent.m_foothld.ladder[i].x1) {
                                    role.setPos(this.m_parent.m_foothld.ladder[i].x1, role.m_y);
                                }
                                return true;
                            }
                        }
                        //向下
                        if(this.downkey == true && this.upkey == false) {
                            if(role.m_y + 4 >= minh && role.m_y + 4 <= maxh) {
                                // msMoudle.toast("2222")
                                if(role.m_x != this.m_parent.m_foothld.ladder[i].x1) {
                                    role.setPos(this.m_parent.m_foothld.ladder[i].x1, role.m_y);
                                }
                                return true;
                            }
                        }
                        // //防止爬绳子上跳问题
                        if(role.m_y >= minh && role.m_y <= maxh) {
                            // msMoudle.toast("3333")
                            if(role.m_x != this.m_parent.m_foothld.ladder[i].x1) {
                                role.setPos(this.m_parent.m_foothld.ladder[i].x1, role.m_y);
                            }
                            return true;
                        }

                    }
                }
            }
            return false;
        }
        public onRopeHeight(N:any, role:any) : any {
            for(let i:number = 0; i < this.m_parent.m_foothld.ladder.length; i++) {
                if(this.m_parent.m_foothld.ladder[i].x1 == this.m_parent.m_foothld.ladder[i].x2) {
                    if(role.m_x >= this.m_parent.m_foothld.ladder[i].x1 - 10 &&
                        role.m_x <= this.m_parent.m_foothld.ladder[i].x1 + 10) {

                        let minh = this.m_parent.m_foothld.ladder[i].y1;
                        let maxh = this.m_parent.m_foothld.ladder[i].y2;
                        if(minh > maxh) {
                            let t = maxh;
                            maxh = minh;
                            minh = t;
                        }

                        /////问题应该就在这附近@@@@@@@@
                        //已经在绳子上
                        if(role.m_y + N >= minh && role.m_y + N <= maxh) {
                            // msMoudle.toast(N + "")
                            return Math.abs(N);
                        }
                        else {
                            //向上
                            if(N < 0) {
                                if(role.m_y - minh + 2 >= 0) {
                                    // msMoudle.toast((role.m_y - minh + 2) + "")
                                    role.changeByName("stand", 0);
                                    return role.m_y - minh + 2;
                                }
                            }
                        }

                        ///
                    }
                }
            }
            return 0;
        }
        private FreeDownPlayer(role:any) : void {
            if(role.m_action) {
                if(role.m_action != "ladder") {
                    //判断点是否在线上
                    if(this.onLinePlayer(role) == false) {
                        if(role.canJumpAtk() == false) {
                            if(role.m_action != this.jump_action) {
                                role.changeByName(this.jump_action, 0);
                            }
                        }
                        if(this.m_parent.m_foothld) {
                            if(this.m_parent.m_foothld.line) {
                                let line = this.m_parent.m_foothld.line;
                                //距离当前位置最近的y
                                let leave_min:number = role.m_y;
                                if(role.m_down_t > 0.8) leave_min = role.m_y + (msMoudle.fallSpeed / 120);
                                else {
                                    // console.log("@@@@@@", 1)
                                    role.m_down_t = role.m_down_t + 0.1;
                                    leave_min = role.m_y + (msMoudle.gravityAcc / 1000) * (role.m_down_t * role.m_down_t) / 2;
                                }
                                for(let i:number = 0; i < line.length; i++) {
                                    //保证在区域内
                                    let min_w = line[i].x1;
                                    let max_w = line[i].x2;
                                    if(min_w > max_w) {
                                        let t = min_w;
                                        min_w = max_w;
                                        max_w = t;
                                    }
                                    if(role.m_x >= min_w && role.m_x <= max_w) {
                                        let min_h = line[i].y1;
                                        let max_h = line[i].y2;
                                        if(min_h > max_h) {
                                            let t = min_h;
                                            min_h = max_h;
                                            max_h = t;
                                        }
                                        let h:number = max_h;
                                        // for(let h:number = max_h; h <= max_h; h++) {
                                            if(h >= role.m_y) {//保证是人物下方的线
                                                //跟斜率有关系y = kx + b
                                                let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                                let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                                let heroy:number = k * role.m_x + b;
                                                if(leave_min > heroy && heroy > role.m_y) leave_min = heroy;   //更新需要下降的距离
                                            }
                                        // }
                                    }
                                }
                                if(leave_min > role.m_y) {
                                    this.MobdownMove(role, leave_min - role.m_y);
                                }
                            }
                        }
                    }
                    else {
                        if(role.canJumpAtk()) {
                            //技能完成
                            role.m_down_t = 0;
                        }
                        else {
                            // console.log("UUU",role.m_action )
                            role.m_down_t = 0;
                            if(role.m_action == this.jump_action) {       //注意怪物分开处理
                            // if(role.m_action.indexOf("stand") < 0 && role.m_action.indexOf("walk") < 0) {
                                role.m_down_t = 0;
                                if(role.key_down && !role.key_left && !role.key_right) {
                                    role.changeByName("prone", 0);
                                }
                                else {
                                    if( (role.key_left && !role.key_right) ||
                                        (!role.key_left && role.key_right) )
                                        role.changeByName("walk", 0);
                                    else role.changeByName("stand", 0);
                                }
                            }
                            if(role.isDoubleJump) {
                                role.doubleFrame();
                            }
                        }
                    }
                }
            }
        }
        private FreeDownMob(role:any) : void {
            //判断点是否在线上
            if(this.onLineMob(role) == false) {
                if(this.m_parent.m_foothld) {
                    if(this.m_parent.m_foothld.line) {
                        let line = this.m_parent.m_foothld.line;
                        //距离当前位置最近的y
                        let leave_min:number = role.m_y;
                        if(role.m_down_t > 0.8) leave_min = role.m_y + (msMoudle.fallSpeed / 120);
                        else {
                            // console.log("@@@@@@", 1)
                            role.m_down_t = role.m_down_t + 0.1;
                            leave_min = role.m_y + (msMoudle.gravityAcc / 1000) * (role.m_down_t * role.m_down_t) / 2;
                        }
                        for(let i:number = 0; i < line.length; i++) {
                            //保证在区域内
                            let min_w = line[i].x1;
                            let max_w = line[i].x2;
                            if(min_w > max_w) {
                                let t = min_w;
                                min_w = max_w;
                                max_w = t;
                            }
                            if(role.m_x >= min_w && role.m_x <= max_w) {
                                let min_h = line[i].y1;
                                let max_h = line[i].y2;
                                if(min_h > max_h) {
                                    let t = min_h;
                                    min_h = max_h;
                                    max_h = t;
                                }
                                let h:number = max_h;
                                // for(let h:number = max_h; h <= max_h; h++) {
                                    if(h >= role.m_y) {//保证是人物下方的线
                                        //跟斜率有关系y = kx + b
                                        let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                        let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                        let heroy:number = k * role.m_x + b;
                                        if(leave_min > heroy && heroy > role.m_y) leave_min = heroy;   //更新需要下降的距离
                                    }
                                // }
                            }
                        }
                        if(leave_min > role.m_y) {
                            this.MobdownMove(role, leave_min - role.m_y);
                        }
                    }
                }
            }
            else {
                role.m_down_t = 0;
            }
        }
        private FreeDownPet(role:any) : void {
            //判断点是否在线上
            if(this.onLinePet(role) == false) {

                if(this.m_hero.m_action != "ladder") {
                    if(role.m_action != this.jump_action) role.changeByName(this.jump_action);
                }

                if(this.m_hero.m_y < role.m_y) {
                    if(role.m_up_t == 0 && role.m_down_t == 0) {
                        role.m_up_t = 0.000001;
                        return ;
                    }
                }
                if(this.m_parent.m_foothld) {
                    if(this.m_parent.m_foothld.line) {
                        let line = this.m_parent.m_foothld.line;
                        //距离当前位置最近的y
                        let leave_min:number = role.m_y;
                        if(role.m_down_t > 0.8) leave_min = role.m_y + (msMoudle.fallSpeed / 120);
                        else {
                            // console.log("@@@@@@", 2)
                            role.m_down_t = role.m_down_t + 0.1;
                            leave_min = role.m_y + (msMoudle.gravityAcc / 1000) * (role.m_down_t * role.m_down_t) / 2;
                        }
                        for(let i:number = 0; i < line.length; i++) {
                            //保证在区域内
                            let min_w = line[i].x1;
                            let max_w = line[i].x2;
                            if(min_w > max_w) {
                                let t = min_w;
                                min_w = max_w;
                                max_w = t;
                            }
                            if(role.m_x >= min_w && role.m_x <= max_w) {
                                let min_h = line[i].y1;
                                let max_h = line[i].y2;
                                if(min_h > max_h) {
                                    let t = min_h;
                                    min_h = max_h;
                                    max_h = t;
                                }
                                let h:number = max_h;
                                // for(let h:number = max_h; h <= max_h; h++) {
                                    if(h >= role.m_y) {//保证是人物下方的线
                                        //跟斜率有关系y = kx + b
                                        let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                        let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                        let heroy:number = k * role.m_x + b;
                                        if(leave_min > heroy && heroy > role.m_y) leave_min = heroy;   //更新需要下降的距离
                                    }
                                // }
                            }
                        }
                        if(leave_min > role.m_y) {
                            this.PetdownMove(role, leave_min - role.m_y);
                        }
                    }
                }
            }
            else {
                if(role.m_action == this.jump_action) role.changeByName("stand0");
                role.m_down_t = 0;
            }
        }
        private FreeDownItem(role:any) : void {
            //判断点是否在线上
            if(this.onLineItem(role) == false) {
                if(this.m_parent.m_foothld) {
                    if(this.m_parent.m_foothld.line) {
                        let line = this.m_parent.m_foothld.line;
                        //距离当前位置最近的y
                        let leave_min:number = role.m__y;
                        if(role.m_down_t > 0.8) leave_min = role.m__y + (msMoudle.fallSpeed / 120);
                        else {
                            // console.log("@@@@@@", 3)
                            role.m_down_t = role.m_down_t + 0.1;
                            leave_min = role.m__y + (msMoudle.gravityAcc / 1000) * (role.m_down_t * role.m_down_t) / 2;
                        }
                        for(let i:number = 0; i < line.length; i++) {
                            //保证在区域内
                            let min_w = line[i].x1;
                            let max_w = line[i].x2;
                            if(min_w > max_w) {
                                let t = min_w;
                                min_w = max_w;
                                max_w = t;
                            }
                            if(role.m__x >= min_w && role.m__x <= max_w) {
                                let min_h = line[i].y1;
                                let max_h = line[i].y2;
                                if(min_h > max_h) {
                                    let t = min_h;
                                    min_h = max_h;
                                    max_h = t;
                                }
                                let h:number = max_h;
                                // for(let h:number = max_h; h <= max_h; h++) {
                                    if(h >= role.m__y) {//保证是人物下方的线
                                        //跟斜率有关系y = kx + b
                                        let k:number = line[i].k;//(line[i].y2 - line[i].y1) / (line[i].x2 - line[i].x1);
                                        let b:number = line[i].b;//line[i].y2 - k * line[i].x2;
                                        let heroy:number = k * role.m__x + b;
                                        if(leave_min > heroy && heroy > role.m__y) leave_min = heroy;   //更新需要下降的距离
                                    }
                                // }
                            }
                        }
                        if(leave_min > role.m__y) {
                            this.ItemdownMove(role, leave_min - role.m__y);
                        }
                    }
                }
            }
            else {
                role.m_down_t = 0;
            }
        }
        private Jump(role:any) : void {
            if(role.m_up_t > 0) {
                let _Time:number = 1.4;
                if(this.m_control == false) _Time = 1.2;
                if(role.m_up_t < _Time) {
                    this.upMove(role, msMoudle.jumpSpeed / (80) );
                    role.m_up_t = role.m_up_t + 0.1;
                    ///跳跃直接爬绳子是这里
                    if(role.m_up_t >= 1 && role.m_up_t <= 1.1) {
                        if(role.m_special == false && this.leftkey == false && this.rightkey == false) {
                            ///直接爬绳子
                            if(role.m_action == this.jump_action) {
                                if(this.onRope(role, true)) {
                                    role.m_down_t = 0;
                                    role.m_up_t = 0;
                                    role.changeByName("ladder", 0);
                                    Sync.reportMyOperate("ladder", [], []);
                                    if(role.m_special == false) {
                                        this.m_push = false;
                                        this.m_double_time = false;
                                        this.can_dj = false;
                                        Laya.timer.clear(this, this.double_tim);
                                    }
                                    return ;
                                }
                            }
                        }
                    }
                    if(role.m_special == false) {
                        if(this.m_push) {
                            if(this.is_sea) {
                                this.doPush();
                                this.m_push = false;
                            }
                            else {
                                if(role.m_up_t >= 0.9 && role.m_up_t <= 1.1) {
                                    this.doPush();
                                    this.m_push = false;
                                }
                            }
                        }
                    }
                }
                else {
                    role.m_up_t = 0;
                }
            }
        }
        private otherJump(role:any) : void {
            if(role.m_up_t > 0) {
                let _Time:number = 1.4;
                if(role.isDoubleJump) _Time = 1.2;
                if(role.m_up_t < _Time) {
                    // this.upMove(role, msMoudle.jumpSpeed / (80) );
                    role.setPos(role.m_x, role.m_y - msMoudle.jumpSpeed / (80))
                    role.m_up_t = role.m_up_t + 0.1;
                    ///跳跃直接爬绳子是这里
                    if(role.m_up_t >= 1 && role.m_up_t <= 1.1) {
                        if(role.m_special == false && this.leftkey == false && this.rightkey == false) {
                            ///直接爬绳子
                            if(role.m_action == this.jump_action) {
                                if(this.onRope(role, true)) {
                                    role.m_down_t = 0;
                                    role.m_up_t = 0;
                                    role.changeByName("ladder", 0);
                                    return ;
                                }
                            }
                        }
                    }
                    // if(role.m_special == false) {
                    //     if(this.m_push) {
                    //         if(this.is_sea) {
                    //             this.doPush();
                    //             this.m_push = false;
                    //         }
                    //         else {
                    //             if(role.m_up_t >= 0.9 && role.m_up_t <= 1.1) {
                    //                 this.doPush();
                    //                 this.m_push = false;
                    //             }
                    //         }
                    //     }
                    // }
                }
                else {
                    role.m_up_t = 0;
                }
            }
        }
        private PetJump(role:any) : void {
            if(role.m_up_t > 0) {
                if(role.m_up_t < 1.4) {
                    this.PetupMove(role, msMoudle.jumpSpeed / 80);
                    role.m_up_t = role.m_up_t + 0.1;
                }
                else {
                    role.m_up_t = 0;
                    role.m_down_t = 0.000001;
                }
            }
        }

        private MobJump(role:any) : void {
            if(role.m_up_t > 0) {
                if(role.m_up_t < 1.4) {
                    this.MobupMove(role, msMoudle.jumpSpeed / 80);
                    role.m_up_t = role.m_up_t + 0.1;
                }
                else role.m_up_t = 0;
            }
        }
        private ItemPick(petpick:boolean = false) : void {
            if(this.m_itemList) {
                for(let i:number = 0; i < this.m_itemList.length; i++) {
                    //拾取
                    if(this.m_itemList[i].pickoffEnd == true && this.m_itemList[i].pickEnd == false && this.m_itemList[i].m_clear == false && !this.m_itemList[i].isSendPickReq) {
                        if( (this.m_itemList[i].m__x >= this.m_hero.m_x - 20 && this.m_itemList[i].m__x <= this.m_hero.m_x + 20 &&
                            this.m_itemList[i].m__y >= this.m_hero.m_y - 50 && this.m_itemList[i].m__y <= this.m_hero.m_y + 20) || msMoudle.shiqu || petpick) {
                            ///没有从这里删除掉
                            this.m_itemList[i].PickItem(this.m_hero, i, petpick);
                            // if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                            //     this.m_itemList.splice(i, 1);
                            // }

                            if(!petpick)
                                break;
                        }
                    }
                    //自动消失
                    if(this.m_itemList[i]) {
                        if(this.m_itemList[i].m_clear == true) {
                            this.m_itemList.splice(i, 1);
                        }
                    }
                }
            }
            if(msMoudle.shiqu) {
                msMoudle.shiqu = false;
            }
        }

        public showPickMsg(uniqueId: number) {//i: number) {
            if(!this.m_itemList || !this.m_msgList) return;
            let itemT:any;
            for(let i=0; i<msMoudle.mainT.m_itemList.length; ++i) {
                let item = msMoudle.mainT.m_itemList[i];
                if(item && item.uniqueId == uniqueId) {
                    itemT = item;
                    break;
                }
            }
            if(!itemT) return;
            let data:any = itemT.m_award;
            if(!data) return;
            //进背包
            if(data.type == 0) {
                if(data.name == "金币") {
                    let len:number = msMoudle.getRandValue(1 + data.lv, 0, 2 * data.lv);
                    this.m_msgList.msgShow(0, "获得" + len + data.name, true);
                    msMoudle._(); msMoudle.updateJinBi(len);
                }
                else if(data.name == "枫叶") {
                    let len:number = msMoudle.getRandValue(1, 0, 5);
                    this.m_msgList.msgShow(0, "获得" + len + data.name, true);
                    msMoudle._(); msMoudle.updateRongYu(len);
                    ms.saveServer();
                }
                else if(data.name == "升星石") {
                    let len:number = 1;
                    this.m_msgList.msgShow(0, "获得" + data.name, true);
                    msMoudle._(); msMoudle.updateCaiLiao1(len);
                }
                else if(data.name == "觉醒石") {
                    let len:number = 1;
                    this.m_msgList.msgShow(0, "获得" + data.name, true);
                    msMoudle._(); msMoudle.updateJueXing1(len);
                }
                else if(data.name == "修炼石") {
                    let len:number = 1;
                    this.m_msgList.msgShow(0, "获得" + data.name, true);
                    msMoudle._(); msMoudle.updateCaiLiao2(len);
                }
                else {
                    this.m_msgList.msgShow(0, "获得" + data.name, true);
                    if(data.cash == 0) {
                        msMoudle._(); msMoudle.getItem(data.id);
                    }
                    else if(data.cash == 2) {
                        ///
                        msMoudle.addItem(data.id, 1);
                    }
                    ms.saveServer();
                }
            }
            else {
                if(data.cash) {
                    // this.m_msgList.msgShow(0, "获得时装" + data.name, true);
                    // msMoudle.getWeapon2(data.id);
                    // ms.saveServer();
                }
                else {
                    this.m_msgList.msgShow(0, "获得" + data.name, true);
                    msMoudle._(); msMoudle.getWeapon(data.id);
                    ms.saveServer();
                }
            }

            ///捡到保存
            ms.saveServer();
        }
        ///////////Character
        //位置变化
        private leftMove(role:any, N:number) : void {
            //400
            let wid = Laya.stage.width / 2; //400
            // if((this.VRRight - this.VRLeft) < Laya.stage.width) wid = (this.VRRight - this.VRLeft) / 2;
            if(role) {
                if(role.m_sp) {
                    if(role.m_x - N >= this.VRLeft) {
                        role.setPos(role.m_x - N, role.m_y);
                        this.m__X += N;                             ///这个m__X是记录点击英雄走了多远的
                        return ;
                        let globalPos:Laya.Point = role.m_sp.localToGlobal(new Laya.Point(0, 0));
                        if(role.m_x - N <= this.VRLeft + (wid - 50) || role.m_x >= this.VRRight - (wid - 50) ) {
                            //这种情况地图也可能动
                            if(this.m_parent.m_back.m_x - N > this.VRLeft && globalPos.x < wid - 50) {
                                this.m_parent.m_sp.pos(this.m_parent.m_sp.x + N, this.m_parent.m_sp.y);
                                // this.m_parent.m_back.setPos(this.m_parent.m_back.m_x - N, -this.m_parent.m_sp.y);
                                this.m_parent.m_back.setPos(this.m_parent.m_back.m_x - N, this.m_parent.m_back.m_y);
                                this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x - N, this.m_parent.m_tile.m_y);
                            }
                            role.setPos(role.m_x - N, role.m_y);
                            this.m__X += N;                             ///这个m__X是记录点击英雄走了多远的
                        }
                        else {
                            if(globalPos.x - N >= wid - 50 && globalPos.x - N <= wid + 50) {
                                role.setPos(role.m_x - N, role.m_y);
                                this.m__X += N;
                            }
                            else {
                                role.setPos(role.m_x - N, role.m_y);
                                this.m__X += N;
                                //这种情况地图一定不能动
                                if(this.m_parent.m_back.m_x - N > this.VRLeft) {
                                    this.m_parent.m_sp.pos(this.m_parent.m_sp.x + N, this.m_parent.m_sp.y);
                                    // this.m_parent.m_back.setPos(this.m_parent.m_back.m_x - N, -this.m_parent.m_sp.y);
                                    this.m_parent.m_back.setPos(this.m_parent.m_back.m_x - N, this.m_parent.m_back.m_y);
                                    this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x - N, this.m_parent.m_tile.m_y);
                                }
                            }
                        }
                    }
                }
            }
        }
        private rightMove(role:any, N:number) : void {
            //400
            let wid = Laya.stage.width / 2; //400
            // if((this.VRRight - this.VRLeft) < Laya.stage.width) wid = (this.VRRight - this.VRLeft) / 2;
            if(role) {
                if(role.m_sp) {
                    if(role.m_x + N <= this.VRRight) {
                        role.setPos(role.m_x + N, role.m_y);
                        this.m__X -= N;
                        return ;
                        let globalPos:Laya.Point = role.m_sp.localToGlobal(new Laya.Point(0, 0));
                        if(role.m_x <= this.VRLeft + (wid - 50) || role.m_x + N >= this.VRRight - (wid - 50) ) {
                            //这种情况地图也可能动
                            if(this.m_parent.m_back.m_x + Laya.stage.width + N < this.VRRight && globalPos.x > wid + 50) {
                                this.m_parent.m_sp.pos(this.m_parent.m_sp.x - N, this.m_parent.m_sp.y);
                                // this.m_parent.m_back.setPos(this.m_parent.m_back.m_x + N, -this.m_parent.m_sp.y);
                                this.m_parent.m_back.setPos(this.m_parent.m_back.m_x + N, this.m_parent.m_back.m_y);
                                this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x + N, this.m_parent.m_tile.m_y);
                            }
                            role.setPos(role.m_x + N, role.m_y);
                            this.m__X -= N;
                        }
                        else {
                            if(globalPos.x + N >= wid - 50 && globalPos.x + N <= wid + 50) {
                                role.setPos(role.m_x + N, role.m_y);
                                this.m__X -= N;
                            }
                            else {
                                role.setPos(role.m_x + N, role.m_y);
                                this.m__X -= N;
                                //这种情况地图一定不能动
                                if(this.m_parent.m_back.m_x + Laya.stage.width + N < this.VRRight) {
                                    this.m_parent.m_sp.pos(this.m_parent.m_sp.x - N, this.m_parent.m_sp.y);
                                    // this.m_parent.m_back.setPos(this.m_parent.m_back.m_x + N, -this.m_parent.m_sp.y);
                                    this.m_parent.m_back.setPos(this.m_parent.m_back.m_x + N, this.m_parent.m_back.m_y);
                                    this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x + N, this.m_parent.m_tile.m_y);
                                }
                            }
                        }
                    }
                }
            }
        }
        private upMove(role:any, N:number) : void {
            if(role) {
                if(role.m_sp) {
                    if(role.m_y - N >= this.VRTop) {
                        role.setPos(role.m_x, role.m_y - N);
                        this.m__Y += N;
                        return ;

                        if(role.m_y <= this.VRTop + 300 ||
                            role.m_y - N >= this.VRBottom - 300) {
                            role.setPos(role.m_x, role.m_y - N);
                            this.m__Y += N;
                        }
                        else {
                            let globalPos:Laya.Point = role.m_sp.localToGlobal(new Laya.Point(0, 0));
                            if(globalPos.y - N >= 250 && globalPos.y - N <= 300) {
                                role.setPos(role.m_x, role.m_y - N);
                                this.m__Y += N;
                            }
                            else {
                                role.setPos(role.m_x, role.m_y - N);
                                this.m_parent.m_sp.pos(this.m_parent.m_sp.x, this.m_parent.m_sp.y + N);
                                // this.m_parent.m_back.setPos(-this.m_parent.m_sp.x, this.m_parent.m_back.m_y - N);
                                this.m_parent.m_back.setPos(this.m_parent.m_back.m_x, this.m_parent.m_back.m_y - N);
                                this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x, this.m_parent.m_tile.m_y - N);
                                this.m__Y += N;
                            }
                        }

                    }


                }
            }
        }
        private downMove(role:any, N:number) : void {
            if(role) {
                if(role.m_sp) {
                    if(role.m_y + N <= this.VRBottom) {
                        role.setPos(role.m_x, role.m_y + N);
                        this.m__Y -= N;
                        return ;
                        if(role.m_y + N <= this.VRTop + 300 ||
                            role.m_y >= this.VRBottom - 300) {
                            role.setPos(role.m_x, role.m_y + N);
                            this.m__Y -= N;
                        }
                        else {
                            let globalPos:Laya.Point = role.m_sp.localToGlobal(new Laya.Point(0, 0));
                            if(globalPos.y + N >= 250 && globalPos.y + N <= 300) {
                                role.setPos(role.m_x, role.m_y + N);
                                this.m__Y -= N;
                            }
                            else {
                                role.setPos(role.m_x, role.m_y + N);
                                this.m_parent.m_sp.pos(this.m_parent.m_sp.x, this.m_parent.m_sp.y - N);
                                // this.m_parent.m_back.setPos(-this.m_parent.m_sp.x, this.m_parent.m_back.m_y + N);
                                this.m_parent.m_back.setPos(this.m_parent.m_back.m_x, this.m_parent.m_back.m_y + N);
                                this.m_parent.m_tile.setPos(this.m_parent.m_tile.m_x, this.m_parent.m_tile.m_y + N);
                                this.m__Y -= N;
                            }
                        }
                    }
                }
            }
        }

        private HeroleftMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x - N >= this.VRLeft + mRange) {
                role.setPos(role.m_x - N, role.m_y);
            }
        }
        private HerorightMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x + N <= this.VRRight - mRange) {
                role.setPos(role.m_x + N, role.m_y);
            }
        }
        private HeroupMove(role:any, N:number) : void {
            // N = 2;
            // if(role.m_y - N >= this.VRTop) {
                // if(this.FreeUp(role, -1) == false) this.upMove(role, N);
                    role.setPos(role.m_x, role.m_y - N);
            // }
        }
        private HerodownMove(role:any, N:number) : void {
            // N = 2;
            // if(role.m_y + N <= this.VRBottom) {
                // if(this.FreeUp(role, 1) == false) //this.downMove(role, N);
                    role.setPos(role.m_x, role.m_y + N);
            // }
        }

        //状态变化
        private onLeft() : void {
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                if(this.m_hero.m_complete) {
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0 || this.m_hero.m_action == this.jump_action) {
                        if(this.m_control == true) this.m_hero.setDir(1);
                    }
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("prone") >= 0) {
                        this.m_hero.changeByName("walk", 0);
                    }

                    if(msMoudle.char.m_x < this.VRLeft + 2) {
                        this.m__X = 0;
                        this.rightkey = false;
                        this.leftkey = false;
                    }
                }
            }
        }
        private onRight() : void {
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                if(this.m_hero.m_complete) {
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0 || this.m_hero.m_action == this.jump_action) {
                        if(this.m_control == true) this.m_hero.setDir(-1);
                    }
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("prone") >= 0) {
                        this.m_hero.changeByName("walk", 0);
                    }

                    if(msMoudle.char.m_x > this.VRRight - 2) {
                        this.m__X = 0;
                        this.rightkey = false;
                        this.leftkey = false;
                    }
                }
            }
        }

        private onUp() : void {
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                if(this.m_hero.m_action != "ladder") {
                    if(this.onRope(this.m_hero)) {
                        this.m_hero.m_down_t = 0;
                        this.m_hero.m_up_t = 0;
                        this.m_hero.changeByName("ladder", 0);
                        Sync.reportMyOperate("ladder", [], []);
                        if(this.m_hero.m_special == false) {
                            this.m_push = false;
                            this.m_double_time = false;
                            this.can_dj = false;
                            Laya.timer.clear(this, this.double_tim);
                        }
                    }
                    else {
                        ////
                        if(this.m_hero.m_action.indexOf("prone") >= 0 ||
                            this.m_hero.m_action.indexOf("walk") >= 0)
                                this.m_hero.changeByName("stand", 0);
                    }
                }
                else {
                    if(this.onRope(this.m_hero)) {}
                    else {
                        this.m_hero.changeByName("stand", 0);
                        Sync.reportMyOperate("ladderOff", [], []);
                    }
                }

                if(this.m_hero.m_action) {
                    if(this.m_hero.m_action.indexOf("stand") >= 0 && msMoudle.can_into) {
                        msMoudle.can_into = false;
                        msMoudle.loopCanInfo();
                        this.judgeHelper();
                        return;
                    }
                    else if(this.m_hero.m_action.indexOf("ladder") >= 0) {
                        this.judgeHelper();
                        return;
                    }
                }
            }
        }
        private ondown() : void {
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;

                if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                    if(this.onRope(this.m_hero)) {
                        if(this.m_hero.m_action != "ladder") {
                            this.m_hero.changeByName("ladder", 0);
                            Sync.reportMyOperate("ladder", [], []);
                            if(this.m_hero.m_special == false) {
                                this.m_push = false;
                                this.m_double_time = false;
                                this.can_dj = false;
                                Laya.timer.clear(this, this.double_tim);
                            }
                        }
                    }
                    else {
                        if(this.m_hero.m_action == "ladder") {
                            this.m_hero.changeByName("stand", 0);
                        }
                        //废弃下爬
                        if(this.m_hero.m_action.indexOf("walk") >= 0) {
                            this.m_hero.changeByName("stand", 0);
                        }
                        if(this.m_hero.m_action.indexOf("prone") < 0) {
                            this.m_hero.changeByName("prone", 0);
                        }
                    }
                }
                else {
                    if(this.m_hero.m_action == "ladder") {
                        if(this.onLine(this.m_hero)) {
                            if(this.m_hero.m_action.indexOf("stand") < 0) {
                                this.m_hero.changeByName("stand", 0);
                                Sync.reportMyOperate("ladderOff", [], []);
                            }
                        }
                    }
                }

                if(this.m_hero.m_action) {
                    if(this.m_hero.m_action.indexOf("ladder") >= 0) {
                        this.judgeHelper();
                        return;
                    }
                }
            }
        }
        private onJump() : void {
            // msMoudle.tiaocishu = 0;
            // msMoudle.toast(this.m_hero.m_action + " " + this.m_hero.m_up_t + " " + this.m_hero.m_down_t)
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_hero.m_up_t == 0 && this.m_hero.m_down_t == 0) {
                    Sync.reportMyOperate("j", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                        if(this.m_hero.m_action != this.jump_action)
                            this.m_hero.changeByName(this.jump_action, 0);
                        msMoudle.playSound("res/Sound/Jump");
                        this.m_hero.m_up_t = 0.000001;
                        /////测试测试
                        // this.m_hero.m_up_t = 0.1;
                    }
                    else {
                        if(this.m_hero.m_action == "ladder") {
                            if( (this.leftkey == true && this.rightkey == false) ||
                                (this.leftkey == false && this.rightkey == true) ) {
                                if(this.m_hero.m_action != this.jump_action) {
                                    this.m_hero.changeByName(this.jump_action, 0);
                                }
                                msMoudle.playSound("res/Sound/Jump");
                                this.m_hero.m_up_t = 0.3;
                            }
                        }
                    }
                }
            }
        }

        private onJump2() : void {
            // msMoudle.tiaocishu = 0;
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_hero.m_up_t == 0 && this.m_hero.m_down_t == 0) {
                    if(this.m_hero.m_action.indexOf("prone") >= 0) {
                        let move_N = 250;
                        ///找下面的线最近的
                        ///这里满足的话才瞬移修正值
                        move_N = this.findudMin(this.m_hero, move_N);
                        if(move_N >= 2) {
                            this.showShunyiEffect();
                            for(let i = 0; i < Math.floor(move_N/2); i++) {
                                this.downMove(this.m_hero, 2);//向下
                            }
                            Sync.reportMyOperate("sy", [this.m_hero.m_x, this.m_hero.m_y], []);
                        }
                        return ;
                    }
                }


                if(this.is_sea) {
                    this.doPush();
                }
                else {
                    if( (this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") && msMoudle.isTiaoMap(msMoudle.mapP.m_id) == false) { //跳跳关卡
                        this.douJump(this.m_hero);
                    }
                }

                //
            }

        }

        public douJump(char: any) : void {
            let jump_ = this.is_sea ? this.jump_action : "jump";
            if(char.m_action.indexOf(jump_) >= 0) {
                if(this.m_push == false) {
                    //连续按左右键盘，第一次按跳居然可以触发，一些障碍点也可以触发
                    //爬楼梯也有问题
                    if(this._doublej == false && this.m_control) {
                        if( (char.m_up_t == 0 && (char.m_down_t != 0 && char.m_down_t < 0.5) ) || char.m_up_t > 0.5) {
                            //
                            // msMoudle.toast("aaa")
                            if(this.m_double_time) {
                                // Sync.reportMyOperate("jj");
                                this.m_push = true;
                                char.m_up_t = 1;
                                char.m_down_t = 0;

                                this.m_double_time = false;
                                this.can_dj = false;
                                Laya.timer.clear(this, this.double_tim);
                            }
                            else {
                                //连续点这里会有无限次
                                if(this.can_dj == false) {
                                    this.can_dj = true;
                                    Laya.timer.once(100, this, this.double_tim, [], true);
                                }
                            }

                        }
                    }
                }
            }
        }


        public playerdouJump(char: any, curX:number, getX:number) : void {
            // this.m_push = true;
            char.isDoubleJump = true;

            char.doubledis = 307;

            // console.log("curX", curX, "getX", getX);
            if(curX && getX) {
                //如果当前位置大于发送时的位置
                if(curX > getX) char.doubledis = 307 - Math.abs(curX - getX) * char.m_dir;
                if(curX < getX) char.doubledis = 307 + Math.abs(curX - getX) * char.m_dir;
            }

            char.startDJ();
            char.m_up_t = 0.36;//0.5;//0.48;//0.36;
            char.m_down_t = 0;
            char.key_left = char.m_dir == 1;
            char.key_right = char.m_dir == -1;

            // return;
            // let jump_ = this.is_sea ? this.jump_action : "jump";

            // if(char.m_action.indexOf(jump_) >= 0) {
            //     if(this.m_push == false) {
            //         //连续按左右键盘，第一次按跳居然可以触发，一些障碍点也可以触发
            //         //爬楼梯也有问题
            //         if( (char.m_up_t == 0 && (char.m_down_t != 0 && char.m_down_t < 0.5) ) || char.m_up_t > 0.5) {
            //             //
            //             // msMoudle.toast("aaa")
            //             if(this.m_double_time) {
            //                 this.m_push = true;
            //                 char.m_up_t = 1;
            //                 char.m_down_t = 0;
            //                 this.m_double_time = false;
            //                 //this.can_dj = false;
            //                 Laya.timer.clear(this, this.double_tim);
            //             }
            //             else {
            //                 //连续点这里会有无限次
            //                 // if(this.can_dj == false) {
            //                 //     this.can_dj = true;
            //                 //     Laya.timer.once(100, this, this.double_tim, [], true);
            //                 // }
            //             }

            //         }
            //     }
            // }
        }

        public playerJump(char: any) : void {
            char.m_up_t = 0;
            char.m_down_t = 0;
            // msMoudle.tiaocishu = 0;
            // msMoudle.toast(char.m_action + " " + char.m_up_t + " " + char.m_down_t)
            if(char && char.m_action) {
                if(char.m_up_t == 0 && char.m_down_t == 0) {
                    if(char.m_action.indexOf("stand") >= 0 || char.m_action.indexOf("walk") >= 0) {
                        // if(char.m_action != this.jump_action)
                        // char.changeByName(this.jump_action, 0);
                        msMoudle.playSound("res/Sound/Jump");
                        char.m_up_t = 0.000001;
                        char.m_down_t = 0;
                        /////测试测试
                        // this.m_hero.m_up_t = 0.1;
                    }
                    else {
                        if(char.m_action == "ladder") {
                            // if( (this.leftkey == true && this.rightkey == false) ||
                            //     (this.leftkey == false && this.rightkey == true) ) {
                            if((char.key_left && !char.key_right) || (!char.key_left && char.key_right)) {
                                if(char.m_action != this.jump_action)
                                    char.changeByName(this.jump_action, 0);
                                msMoudle.playSound("res/Sound/Jump");
                                char.m_up_t = 0.3;
                                char.m_down_t = 0;
                            }
                        }
                    }
                }
            }
        }

        can_dj:boolean = false;
        double_tim() : void {
            this.can_dj = false;
            this.m_double_time = true;
            // msMoudle.toast("xx" + this.m_double_time)
        }

        m_double_time:boolean = false;
        m_push:boolean = false;
        // onJump3() : void {
        //     // msMoudle.tiaocishu = 0;
        //     msMoudle.toast("xxx");
        // }

        doPush() : void {
            if(this.m_hero && this.m_hero.m_action) {
                if(this.is_sea) {
                    // console.log("ppp" + this.m_hero.m_down_t)
                    if(this.m_hero.m_down_t != 0) {
                        if(this.m_hero.m_action.indexOf(this.jump_action) >= 0) {
                            if( (this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") && msMoudle.isTiaoMap(msMoudle.mapP.m_id) == false) { //跳跳关卡
                                this.doubleJump();
                            }
                        }
                    }
                }
                else {
                    if(this.m_hero.m_action.indexOf(this.jump_action) >= 0) {
                        if( (this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") && msMoudle.isTiaoMap(msMoudle.mapP.m_id) == false) { //跳跳关卡
                            this.doubleJump();
                        }
                    }
                }
            }
        }

        private onAtk() : void {

            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }
                if(ms.selHero == 10 || ms.selHero == 12 || ms.selHero >= 39) {
                    msMoudle.toast("该状态无法普通攻击");
                    return ;
                }
                // this.judgeHelper();
                if(this.m_control == true) {
                    // if(ms.selHero == 11) {
                    //     if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                    //         this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                    //         //取最近,弹道的要同y轴才行
                    //         this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill[ms.selHero]);
                    //         // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                    //         this.m_hero.showSkillById("5210000");//this.m_parent.m_life
                    //     }
                    //     return ;
                    // }

                    if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") {
                        if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0 || this.m_hero.m_action == this.jump_action) {
                            this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                            this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                            let rnk:number = msMoudle.getRandValue(0, 0, this.m_hero.m_attack_list.length);
                            this.m_hero.showAtk(this.m_hero.m_attack_list[rnk], this.m_parent.m_life.m_mobsAni);
                            Sync.reportMyOperate("k", [rnk], []);
                            // this.m_hero.showAtk("shoot1", this.m_parent.m_life);
                        }
                    }
                    else {
                        // msMoudle.toast("坐骑状态下不可使用");
                        this.showSucc();
                    }
                }
            }
        }

        //
        //64121013 64121014 64121015 64121052
        //152101006 152110001 152110002 152120001
        //155121102 155121215 155121041 155121042 155111006
        //164121003 164121044
        //101100201 101110200 101110203 101121100
        //101120102 101120104 101120202
        //65111101 65121100 65121007
        //65121100 65121101   65121053
        //21110020  21120022 21121016  21111012
        //22141011
        //22111011
        //23111002 23121002 23121003 23121052 23111005
        //24101000 24111006 24121010 24121004
        //25120002 25121005 25121006 25121007 25121131
        //31111000 31111003 31121003 31121007
        //31211002 31221002 31221052 31211004
        //32121052 32121004 32101001 32121054
        //37120001 37120002 37120023 37121005
        //3311010 3321004 3321015 3301010
        //4341004 4341009 4341011
        //5311000
        //11121055 11111120 11121004 11121054
        //12101021 12111003 12111005 12101023
        //51101005 51121007 51121052 51121006
        //15121001 15121002 15120003 15121052 15121053
        //14111022 14121001 14121002 14121054 14111025
        //12111021 12121002 12121052
        //13111021 13121000 13121052 13121054
        //14111008 14121001 14121052 14121053

        skillsArr:Array<string> = [];
        test__ = 0;
        test__state:boolean = true;
        public onSk1() : void {
            msMoudle.key_down = true;
            // if(this.test__state) {
            //     msMoudle.m_skill[ms.selHero] = this.showsllll[this.test__];
            //     this.test__++;
            //     if(this.test__ >= this.showsllll.length) this.test__ = 0;
            // }
            // msMoudle.mainT.m_msgList.msgShow(0, msMoudle.m_skill[ms.selHero], true);

            if(msMoudle.m_skill[ms.selHero] == "61111008" || msMoudle.m_skill[ms.selHero] == "5121003" || msMoudle.m_skill[ms.selHero] == "5221006"){
                msMoudle.toast("已经是该状态了")
                return ;
            }
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }


                if(msMoudle.m_skill[ms.selHero] == "4211006") {
                    if(ms.jinbi() < 5000) {
                        msMoudle.toast("金币不足5000");
                        return ;
                    }
                }
                //枪连击
                    if(this.m_control == true) {

                        if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") {

                            if(msMoudle.m_skill[ms.selHero] == "1311001" || msMoudle.m_skill[ms.selHero] == "4111005" || msMoudle.m_skill[ms.selHero] == "14121002") {
                                if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0
                                    || this.m_hero.m_action == this.jump_action) {
                                    this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;

                                    //取最近,弹道的要同y轴才行
                                    this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill[ms.selHero]);
                                    // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;

                                    this.m_hero.showSkillById(msMoudle.m_skill[ms.selHero]);//this.m_parent.m_life
                                    if(msMoudle.m_skill[ms.selHero] == "4211006") {
                                        if(ms.jinbi() >= 5000) {
                                            msMoudle._(); msMoudle.updateJinBi(-5000);
                                        }
                                    }

                                }
                            }
                            else {
                                if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {

                                    if(msMoudle.m_skill[ms.selHero] == "2121005" || msMoudle.m_skill[ms.selHero] == "2221005" || msMoudle.m_skill[ms.selHero] == "2321003" || msMoudle.m_skill[ms.selHero] == "3221005" || msMoudle.m_skill[ms.selHero] == "3121006" || msMoudle.m_skill[ms.selHero] == "3311009" || msMoudle.m_skill[ms.selHero] == "22171081") {
                                        if(msMoudle.gameP && msMoudle.gameP.cool) {
                                            if(msMoudle.mapP.summonList.length > 0) {
                                                msMoudle.toast("不能召唤更多了");
                                                return ;
                                            }

                                            // msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill[ms.selHero], msMoudle.isSyncMap(msMoudle.mapP.m_id));
                                            msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill[ms.selHero], false, false);
                                            return ;
                                        }
                                    }

                                    this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                                    // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                                    this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill[ms.selHero]);
                                    this.m_hero.showSkillById(msMoudle.m_skill[ms.selHero]);//this.m_parent.m_life
                                    if(msMoudle.m_skill[ms.selHero] == "4211002") {
                                        this.luoye();   ///快速移动也可以这么处理、但是现在还有问题
                                    }
                                    if(msMoudle.m_skill[ms.selHero] == "4211006") {
                                        if(ms.jinbi() >= 5000) {
                                            msMoudle._(); msMoudle.updateJinBi(-5000);
                                        }
                                    }



                                    // return ;

                                    // if(msMoudle.m_skill[ms.selHero] == "41121002") {
                                    //     this.fastMove(300);
                                    // }
                                }
                            }
                        }
                        else {
                            // msMoudle.toast("坐骑下不支持技能");
                            this.showSucc();
                        }
                    }
                // }
                // else {
                //     msMoudle.toast("MP不足");
                // }
            }
        }
        public onSk1_up() : void {
            msMoudle.key_down = false;

        }
        public onSk2() : void {
            msMoudle.key_down = true;
            // if(this.test__state) {
            //     this.m_hero.changeByNameForce("stand");
            //     return ;
            // }
            // msMoudle.mainT.m_msgList.msgShow(0, msMoudle.m_skill2[ms.selHero], true);

            if(msMoudle.m_skill2[ms.selHero] == "61111008" || msMoudle.m_skill2[ms.selHero] == "5121003" || msMoudle.m_skill2[ms.selHero] == "5221006") {
                msMoudle.toast("已经是该状态了")
                return ;
            }
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }
                //龙咆哮
                    if(this.m_control == true) {
                        // if(ms.selHero == 11) {
                        //     if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                        //         this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                        //         //取最近,弹道的要同y轴才行
                        //         this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill2[ms.selHero]);
                        //         // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                        //         this.m_hero.showSkillById(msMoudle.m_skill2[ms.selHero]);//this.m_parent.m_life
                        //     }
                        //     return ;
                        // }
                        if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") {
                            if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0 ||
                            ( (msMoudle.m_skill2[ms.selHero] == "4121007" || msMoudle.m_skill2[ms.selHero] == "14111022") && this.m_hero.m_action == this.jump_action) ) {

                                if(msMoudle.m_skill2[ms.selHero] == "2121005" || msMoudle.m_skill2[ms.selHero] == "2221005" || msMoudle.m_skill2[ms.selHero] == "2321003" || msMoudle.m_skill2[ms.selHero] == "3221005" || msMoudle.m_skill2[ms.selHero] == "3121006" || msMoudle.m_skill2[ms.selHero] == "3311009" || msMoudle.m_skill2[ms.selHero] == "22171081") {
                                    if(msMoudle.gameP && msMoudle.gameP.cool) {
                                        if(msMoudle.mapP.summonList.length > 0) {
                                            msMoudle.toast("不能召唤更多了");
                                            return ;
                                        }
                                        // msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill2[ms.selHero], msMoudle.isSyncMap(msMoudle.mapP.m_id));
                                        msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill2[ms.selHero], false, false);
                                        return ;
                                    }
                                }

                                this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                                // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                                this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill2[ms.selHero]);
                                this.m_hero.showSkillById(msMoudle.m_skill2[ms.selHero]);//this.m_parent.m_life
                                // if(msMoudle.m_skill2[ms.selHero] == "41121002") {
                                //     this.fastMove(300);
                                // }

                            }
                        }
                        else {
                            // msMoudle.toast("坐骑下不支持技能");
                            this.showSucc();
                        }
                    }
                // }
                // else {
                //     msMoudle.toast("MP不足");
                // }
            }
        }
        public onSk2_up() : void {
            msMoudle.key_down = false;
        }
        public onSk3() : void {
            msMoudle.key_down = true;
            ///3321040

            // if(this.test__state) {
            //     msMoudle.m_skill3[ms.selHero] = this.showsllll[this.test__];
            //     if(this.test__ < 0) this.test__ = this.showsllll.length - 1;
            //     this.test__--;
            // }
            // msMoudle.mainT.m_msgList.msgShow(0, msMoudle.m_skill3[ms.selHero], true);

            if(msMoudle.m_skill3[ms.selHero] == "61111008" || msMoudle.m_skill3[ms.selHero] == "5121003" || msMoudle.m_skill3[ms.selHero] == "5221006") {
                msMoudle.toast("已经是该状态了")
                return ;
            }
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }
                //无双枪
                    if(this.m_control == true) {
                        // if(ms.selHero == 11) {
                        //     if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                        //         this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                        //         //取最近,弹道的要同y轴才行
                        //         this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill3[ms.selHero]);
                        //         // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                        //         this.m_hero.showSkillById(msMoudle.m_skill3[ms.selHero]);//this.m_parent.m_life
                        //     }
                        //     return ;
                        // }
                        if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") {
                            // //快速移动
                            // if(msMoudle.m_skill3[ms.selHero] == "2301001") {
                            //     let move_N = 200;
                            //     ///找下面的线最近的
                            //     ///这里满足的话才瞬移修正值
                            //     move_N = this.findudMin(this.m_hero, move_N);
                            //     if(move_N >= 2) {
                            //         this.show();
                            //         for(let i = 0; i < Math.floor(move_N/2); i++) {
                            //             this.downMove(this.m_hero, 2);//向下
                            //         }
                            //     }
                            // }
                            // else {
                                if(msMoudle.m_skill3[ms.selHero] == "2121005" || msMoudle.m_skill3[ms.selHero] == "2221005" || msMoudle.m_skill3[ms.selHero] == "2321003" || msMoudle.m_skill3[ms.selHero] == "3221005" || msMoudle.m_skill3[ms.selHero] == "3121006" || msMoudle.m_skill3[ms.selHero] == "3311009" || msMoudle.m_skill3[ms.selHero] == "22171081") {
                                    if(msMoudle.gameP && msMoudle.gameP.cool) {
                                        if(msMoudle.mapP.summonList.length > 0) {
                                            msMoudle.toast("不能召唤更多了");
                                            return ;
                                        }
                                        // msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill3[ms.selHero], msMoudle.isSyncMap(msMoudle.mapP.m_id));
                                        msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill3[ms.selHero], false, false);
                                        return ;
                                    }
                                }

                                if(msMoudle.m_skill3[ms.selHero] == "1311003") {
                                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0
                                        || this.m_hero.m_action == this.jump_action) {
                                        this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                                        // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                                        this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill3[ms.selHero]);
                                        this.m_hero.showSkillById(msMoudle.m_skill3[ms.selHero]);
                                    }
                                }
                                else {
                                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                                        this.m_hero.m_armyList = this.m_parent.m_life.m_mobsAni;
                                        // this.m_hero.____x = this.m_parent.m_life.m_mobsAni;
                                        this.m_hero.____x = this.MinDis(this.m_parent.m_life.m_mobsAni, this.m_hero, msMoudle.m_skill3[ms.selHero]);
                                        this.m_hero.showSkillById(msMoudle.m_skill3[ms.selHero]);
                                    }
                                }



                                // if(msMoudle.m_skill3[ms.selHero] == "41121002") {
                                //     this.fastMove(300);
                                // }
                            // }
                        }
                        else {
                            // msMoudle.toast("坐骑下不支持技能");
                            this.showSucc();
                        }
                    }
                // }
                // else {
                //     msMoudle.toast("MP不足");
                // }
            }
        }
        public onSk3_up() : void {
            msMoudle.key_down = false;
        }
        public onState() : void {

            if(msMoudle.m_skill4[ms.selHero] == "61111008" || msMoudle.m_skill4[ms.selHero] == "5121003" || ms.selHero >= 39) {
                msMoudle.toast("已经是该状态了")
                return ;
            }
            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_forcecontrol == false) return ;
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }
                //状态
                if(this.m_control == true) {
                    // if(ms.selHero == 11) {
                    //     if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                    //         this.m_hero.showSkillById(msMoudle.m_skill4[ms.selHero]);
                    //     }
                    //     return ;
                    // }
                    if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N") {
                        if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {

                            if(msMoudle.m_skill4[ms.selHero] == "2121005" || msMoudle.m_skill4[ms.selHero] == "2221005" || msMoudle.m_skill4[ms.selHero] == "2321003" || msMoudle.m_skill4[ms.selHero] == "3221005" || msMoudle.m_skill4[ms.selHero] == "3121006" || msMoudle.m_skill4[ms.selHero] == "3311009" || msMoudle.m_skill4[ms.selHero] == "22171081") {
                                if(msMoudle.gameP && msMoudle.gameP.cool) {
                                    if(msMoudle.mapP.summonList.length > 0) {
                                        msMoudle.toast("不能召唤更多了");
                                        return ;
                                    }
                                    // msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill4[ms.selHero], msMoudle.isSyncMap(msMoudle.mapP.m_id));
                                    msMoudle.gameP.cool.ZhaoHuan(msMoudle.m_skill4[ms.selHero], false, false);
                                    return ;
                                }
                            }

                            if(msMoudle.m_skill4[ms.selHero] == "1111002") {
                                this.m_hero.showStateById(msMoudle.m_skill4[ms.selHero]);
                            }
                            else {
                                this.m_hero.showSkillById(msMoudle.m_skill4[ms.selHero]);
                            }


                            // if(msMoudle.gameP)
                            //     msMoudle.gameP.updateBuff(msMoudle.m_skill4[ms.selHero]);
                        }
                    }
                    else {
                        // console.log("坐骑下不支持技能");
                        this.showSucc();
                    }
                }
            }
        }

        public onState2() : void {
            // if(this.test__state) this.test__state = !this.test__state;
            // return ;

            if(this.m_hero && this.m_hero.m_action) {
                if(this.m_hero.m_up_t == 0 && this.m_hero.m_down_t == 0) {
                    //左右瞬移
                    if(this.m_hero.m_action.indexOf("stand") >= 0 || this.m_hero.m_action.indexOf("walk") >= 0) {
                        ///找下面的线最近的
                        ///这里满足的话才瞬移修正值
                        this.showShunyiEffect();

                        this.fastMove(250);

                        Sync.reportMyOperate("sy", [this.m_hero.m_x, this.m_hero.m_y], []);
                    }
                    //下瞬移
                    else if(this.m_hero.m_action.indexOf("prone") >= 0) {
                        let move_N = 250;
                        ///找下面的线最近的
                        ///这里满足的话才瞬移修正值
                        move_N = this.findudMin(this.m_hero, move_N);
                        if(move_N >= 2) {
                            this.showShunyiEffect();
                            for(let i = 0; i < Math.floor(move_N/2); i++) {
                                this.downMove(this.m_hero, 2);//向下
                            }
                            Sync.reportMyOperate("sy", [this.m_hero.m_x, this.m_hero.m_y], []);
                        }
                    }
                }
            }
        }

        fastMove(move_N:number = 250, flag:boolean = false, role?:any) : void {
            // let move_N = 250;
            // if(!role && role.m_dir) return ;
            if(!role) role = this.m_hero;

            let move_Y = 0;
            if(role.m_dir == 1) {
                for(let i = 0; i < Math.floor(move_N/2); i++) {
                    if(this.onWall(role, role.m_dir) == false) {
                        if(flag == false) {
                            if(this.onLine(role)) {
                                if(role.m_id == ms.user)
                                    this.leftMove(role, 2);//向下
                                else {
                                    this.HeroleftMove(role, 2);//向下
                                }
                            }
                        }
                        else {
                            if(role.m_id == ms.user)
                                this.leftMove(role, 2);//向下
                            else {
                                this.HeroleftMove(role, 2);//向下
                            }
                        }
                    }
                }
            }
            else if(role.m_dir == -1) {
                for(let i = 0; i < Math.floor(move_N/2); i++) {
                    if(this.onWall(role, role.m_dir) == false) {
                        if(flag == false) {
                            if(this.onLine(role)) {
                                if(role.m_id == ms.user)
                                    this.rightMove(role, 2);//向下
                                else {
                                    this.HerorightMove(role, 2);//向下

                                }
                            }
                        }
                        else {
                            if(role.m_id == ms.user)
                                this.rightMove(role, 2);//向下
                            else {
                                this.HerorightMove(role, 2);//向下
                            }
                        }
                    }
                }
            }
            // move_Y = this.findlrMin(this.m_hero, move_Y);
            // if(move_Y >= 2) {
            //     let N = Math.abs(Math.floor(move_Y/2));
            //     for(let i = 0; i < N; i++) {
            //             this.downMove(this.m_hero, 2);//向下
            //     }
            // }
            // else if(move_Y <= -2) {
            //     let N = Math.abs(Math.floor(move_Y/2));
            //     for(let i = 0; i < N; i++) {
            //             this.upMove(this.m_hero, 2);//向下
            //     }
            // }
            //强制拉回line
            // if(move_Y != 0 && flag == false) {
            //     this.upMove(this.m_hero, 2);//向下
            //     this.upMove(this.m_hero, 2);//向下
            //     this.upMove(this.m_hero, 2);//向下
            // }
        }

        onHero() : void {
            ui.show(app.yingxiong.YXDlg, {black:true});
        }

        onChar() : void {
            // ui.show(app.char.charDlg, {black:true});
        }

        // onSkill() : void {
        //     ui.show(app.char.skillDlg, {black:true});
        // }

        skill:cssSkill;
        showSucc() : void {
            if(msMoudle.tamingmob1 == "" && msMoudle.tamingmob2 == "") return ;
            if(msMoudle.tamingmob1 != "N" || msMoudle.tamingmob2 != "N" || this.m_hero.partIndex[msMoudle.partType.tTamingMob] ||
            this.m_hero.partIndex[msMoudle.partType.tTamingMob0] != "N") {
                msMoudle.tamingmob1 = "N";
                msMoudle.tamingmob2 = "N";
                this.m_hero.partIndex[msMoudle.partType.tTamingMob] =    "N";
                this.m_hero.partIndex[msMoudle.partType.tTamingMob0] =   "N";
                // msMoudle.mapP.changeForce();
                this.m_hero.changeByNameForce("stand", 0);

                this.tamingmobOff();
            }

            this.showTamingmobEff(this.m_hero);
        }

        showTamingmobEff(char:any) : void {
            let data:any = msMoudle.wz["000.img"]["skill.0001004"];
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            this.skill = new cssSkill();
            this.skill.changeAll(null, char.m_state_sp, "0001004", 0, 0, data, 1);
            msMoudle.playSound("res/Sound/Skill.img/0001004.Use")
        }

        tamingmobOn() {
            Sync.toggleTamingMob();
        }

        tamingmobOff() {
            // if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N" && this.m_hero.partIndex[msMoudle.partType.tTamingMob0] == "N") {
            //     return;
            // }
            Sync.toggleTamingMob(false);
        }

        onTamingMob() : void {
            if(msMoudle.char && msMoudle.char.m_bianshen) {
                msMoudle.toast("当前状态不能骑乘");
                return ;
            }
            if(this.is_sea == false) {
                if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] == "N" && this.m_hero.partIndex[msMoudle.partType.tTamingMob0] == "N") {

                    if(ms.tamingmob.tamingmob1 == "N" && ms.tamingmob.tamingmob2 == "N") {
                        msMoudle.toast("你还没有拥有坐骑");
                    }
                    else {
                        msMoudle.tamingmob1 = ms.tamingmob.tamingmob1;
                        msMoudle.tamingmob2 = ms.tamingmob.tamingmob2;
                        this.m_hero.partIndex[msMoudle.partType.tTamingMob] =    ms.tamingmob.tamingmob1;//01902000  01902028    01902032
                        this.m_hero.partIndex[msMoudle.partType.tTamingMob0] =   ms.tamingmob.tamingmob2;//01912000  01912021    01912025
                        if(this.m_hero.partIndex[msMoudle.partType.tTamingMob] != "N" || this.m_hero.partIndex[msMoudle.partType.tTamingMob0] != "N") {
                            this.m_hero.changeByNameForce("stand", 0);
                            this.tamingmobOn();

                            this.showTamingmobEff(this.m_hero);
                        }
                    }
                }
                else {
                    msMoudle.toast("你已经处于骑乘状态了");
                }
            }
            else {
                msMoudle.toast("该地图不能骑乘");
            }
        //     ui.show(app.tamingmob.tamingmobDlg, {black:true});
        }

        onChat() : void {
            msMoudle.gameP.onBtnChatClick();
        }

        // onPet() : void {
        //     ui.show(app.pet.petDlg, {black:true});
        // }

        private MinDis(____x:any, role:any, skillid:string, dis:number = 300) : any {
            let mobLeaveArray:Array<any> = [];
            let newhitArray:Array<any> = [];
            let hitArray:Array<any> = [];
            let bullet = msMoudle.isBSkill(skillid);
            //范围性远程
            if(skillid == "3111003" || skillid == "3111004" || skillid == "3211003" || skillid == "3211004" || skillid == "13111000") {
                bullet = false;
            }
            for(let i:number = 0; i < ____x.length; i++) {
                if(bullet) {
                    let m_head_x = 0;
                    let m_head_y = 0;
                    // if(____x[i].mobData[0].head) {
                    //     m_head_x = Number(____x[i].mobData[0].head.x);
                    //     m_head_y = Number(____x[i].mobData[0].head.y);
                    // }
                    if(role.m_y >= (____x[i].m_y ) - 90 && role.m_y <= (____x[i].m_y ) + 30) {
                        if(role.m_dir == -1) {
                            if( (____x[i].m_x + m_head_x) > role.m_x && Math.abs( (____x[i].m_x + m_head_x) - role.m_x) <= dis) {
                                mobLeaveArray[mobLeaveArray.length] = ____x[i];
                            }
                        }
                        else {
                            if( (____x[i].m_x + m_head_x) < role.m_x && Math.abs( (____x[i].m_x + m_head_x) - role.m_x) <= dis) {
                                mobLeaveArray[mobLeaveArray.length] = ____x[i];
                            }
                        }
                    }
                }
                else {
                    mobLeaveArray[mobLeaveArray.length] = ____x[i];
                }
            }
            if(bullet) {
                if(mobLeaveArray.length > 1) {
                    mobLeaveArray.sort((n1,n2) => {
                        if(n1.m_x > n2.m_x) return 1 * -role.m_dir;
                        if(n1.m_x < n2.m_x) return -1 * -role.m_dir;
                        return 0;
                    });
                }
            }
            else {
                mobLeaveArray.sort((n1,n2) => {
                    if(Math.abs(n1.m_x - role.m_x) > Math.abs(n2.m_x - role.m_x)) return 1;
                    if(Math.abs(n1.m_x - role.m_x) < Math.abs(n2.m_x - role.m_x)) return -1;
                    return 0;
                });
            }
            // msMoudle.toast("" + mobLeaveArray.length)
            return mobLeaveArray;
        }

        onPoint() : void {
            // ms.test_dt++;
            // if(ms.herodata.Lv < 5) {
            //     //新人认证
            //     if(ms.fuli == 0 && ms.test_cz == 0) {
            //         msMoudle.toast2("帐号未认证，请加联系QQ2717069196完成认证并领取500枫叶");
            //         return ;
            //     }
            // }

            // msMoudle.toast("测试");
            // ui.show(app.battle.csDlg, {black:true})
            ui.show(app.worldmap.worldmapDlg, {black:true})

            // msMoudle.tiaotiao_map = msMoudle.allMaps[msMoudle.map_index];
            // console.log("索引", msMoudle.map_index, msMoudle.allMaps[msMoudle.map_index])
            // // msMoudle.tiaotiao_map = msMoudle.allMaps[msMoudle.getRandValue(0, 0, msMoudle.allMaps.length)]
            // msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
            // msMoudle.map_index++;
        }
        onWater1() : void {
            // msMoudle.toast("药水1");
            msMoudle.playSound("res/Sound/02000000.Use");

            if(msMoudle.char) {


                if(ms.test_sk < 3)
                    msMoudle.char.m_hp += Math.floor(msMoudle.char.m_maxhp / 2);
                else
                    msMoudle.char.m_hp = msMoudle.char.m_maxhp;


                if(msMoudle.char.m_hp > msMoudle.char.m_maxhp)
                    msMoudle.char.m_hp = msMoudle.char.m_maxhp;
                msMoudle.hp = msMoudle.char.m_hp;
                msMoudle.maxhp = msMoudle.char.m_maxhp;
                msMoudle.updateHP();
            }

        }
        onWater2() : void {
            msMoudle.toast("药水2");
        }

        onJY() : void {
            ui.show(app.homeland.ziyouDlg, {black:true});
        }

        onAvatar() : void {
            // ms.test_zb++;
            // ui.show(app.char.heroDlg, {black:true})
            ui.show(app.char.charDlg, {black:true});
        }
        onJob() : void {
            ui.show(app.battle.selDlg, {black:true})
        }
        onQB() : void {
            // ms.test_qb++;
            // if(msMoudle.tiaotiao_map == "280030100.img" || msMoudle.tiaotiao_map == "240060200.img" ||      msMoudle.tiaotiao_map == "551030200.img") {// || msMoudle.tiaotiao_map == "230040420.img"
            // if(msMoudle.tiaotiao_map == "240060200.img") {
            //     msMoudle.toast("该地图无法查看");
            // }
            // else {
                if(msMoudle.mapP && msMoudle.mapP.m_life.m_mobsAni) {
                    if(msMoudle.mapP.m_life.m_mobsAni.length > 0) {
                        ui.show(app.zhaomu.baikeDlg, {black:true});
                    }
                    else {
                        msMoudle.toast("该地图无法查看");
                    }
                }
                else {
                    msMoudle.toast("该地图无法查看");
                }
            // }
        }
        public onGJ() : void {

            if(msMoudle.mapP && msMoudle.mapP.m_id) {// && msMoudle.isSyncMap(msMoudle.mapP.m_id) == true) {
                // msMoudle.toast("该地图无法挂机");
                // return ;
                //boss地图
                let bMap = msMoudle.maplejson["b_map"].split(",");
                for(let i:number = 15; i < bMap.length; i++) {
                    if(msMoudle.mapP.m_id == bMap[i] + ".img") {
                        msMoudle.toast("该地图无法挂机");
                        return ;
                    }
                }
            }

            // if(msMoudle.gameP && msMoudle.gameP.cool) {
            //     msMoudle.gameP.cool.ZhaoHuan("3121006");
            //     msMoudle.gameP.cool.ZhaoHuan("3221005");
            //     msMoudle.gameP.cool.ZhaoHuan("2321003");
            //     msMoudle.mapP.showMyTeam(true);
            // }
            // return ;



            //组队状态下不允许挂机
            if(Sync.partyId > 0) {
                msMoudle.toast("组队状态下不支持挂机，退出组队并重进地图即可");
                return ;
            }

            if(msMoudle.mapP && msMoudle.mapP.m_life.m_mobsAni) {
                if(msMoudle.mapP.m_life.m_mobsAni.length > 0) {}
                else {
                    msMoudle.toast("该地图不支持挂机");
                    return ;
                }
            }
            else {
                msMoudle.toast("该地图不支持挂机");
                return ;
            }

            // if(ms.otherherodata.length > 0)
            //     msMoudle.mapP.showMyTeam(true);
            // else
            //     msMoudle.toast("你当前没有上阵任何英雄");

            if(ms.herodata.Lv >= 10) {
                if(ms.dayguaji > 5) {// && ms.huoli > 0

                    ///选择英雄界面
                    ui.show(app.battle.addTeamDlg, {params:[null, false, false, true]});
                    // this.GJ();
                }
                else {
                    msMoudle.toast("挂机点不足");
                }
            }
            else {
                msMoudle.toast("该功能10级开启");
            }
        }

        public GJ() : void {
            msMoudle.guaji = true;
            this.showSucc();
            if(msMoudle.mapP) {
                msMoudle.char.startAutoFight();
                if(msMoudle.specialPvp == false && msMoudle.m_zhuque) {
                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                        for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                            if(ms.herodata.EquipSlots[i]) {
                                let succlst = ms.herodata.EquipSlots[i].succlst;
                                if(succlst) {
                                    for(let key in succlst) {
                                        if(key == "2040598") {  //朱雀卷轴
                                            msMoudle.char.m_skill_1 = "1311006";     //龙咆哮
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                msMoudle.mapP.showMyTeam(true);
            }

            if(msMoudle.maplejson["挂机黑屏"] == "1")
                ui.show(app.common.guajiDlg, {black:true});
            else
                ui.show(app.common.guajiDlg, {white:true});
        }

        onFuBen1() : void {
            // msMoudle.team_guanka = 0;
            // ui.show(app.boss.bossDlg, {black:true});
        }
        onFuBen2() : void {
            if(ms.herodata.Lv >= 10) {
                msMoudle.team_guanka = 0;
                ui.show(app.fuben.fubenDlg, {black:true});
            }
            else {
                msMoudle.toast("需要角色达到10级");
            }
        }
        onFuBen3() : void {

            if(msMoudle.isBossMap()) {
                msMoudle.toast("当前地图无法进入");
                return;
            }

            // ms.test_xy++;
            // if(ms.herodata.Lv >= 5) {
                ui.show(app.battle.moveDlg, {black:true});
            // }
            // else {
            //     msMoudle.toast("需要角色达到5级");
            // }
        }

        onSetting() : void {
            ui.show(app.common.VoiceDlg, {black:true});
        }
        onQuick() : void {
            ui.show(app.battle.questDlg, {black:true})
        }

        /**
         * 播放瞬移效果
         * @param isMyself 是不是播放自己的瞬移动画
         * @param char
         */
        showShunyiEffect(isMyself = true, char?: any) : void {
            msMoudle.playSound("res/Sound/Skill.img/2101002.Use")
            let be = new cssBasicEff();
            be.loadBasicEff((isMyself ? this.m_hero : char).m_state_sp, "Summoned", 0, 0);
            // if(isMyself) {
            //     msMoudle.char.m_skillId = "2101002";
            //     Sync.reportMyOperate("skill", [dir, distance]);
            // }
        }
        /**
         * 播放二段跳效果
         * @param isMyself 是不是播放自己的二段跳动画
         */
        showDoubleJumpEffect(isMyself = true, char?: any) {
            msMoudle.playSound("res/Sound/Skill.img/4111006.Use")
            let be:cssBasicEff = new cssBasicEff();
            be.loadBasicEff((isMyself ? this.m_hero : char).m_sp, "RunningEffect2", 0, 0);
            // if(isMyself) {
            //     msMoudle.char.m_skillId = "4111006";
            //     Sync.reportMyOperate("skill", []);
            // }
        }
        onZhaoMu() : void {
            ui.show(app.zhaomu.zhaomuDlg);

            // Laya.timer.loop(2000, msMoudle.mainT, ()=>{
            //     msMoudle.mainT.onKeyDown({keyCode: Laya.Keyboard.L})
            //     msMoudle.mainT.onKeyUp({keyCode: Laya.Keyboard.SPACE})
            // })
        }

        faceClickTime = 0;
        onFace() : void {
            let curTime = Sync.serverTime();
            if(curTime - this.faceClickTime < 1000) {
                msMoudle.toast("操作过于频繁");
                return;
            }
            this.faceClickTime = curTime;
            if(this.m_control == true) {
                if(this.m_hero) {
                    let index = msMoudle.getRandValue(0, 0, 6);
                    this.m_hero.m_emjIdx = index;
                    this.showFaceByIndex(this.m_hero, index);
                    Sync.reportMyOperate("emj", [index], []);
                    this.m_hero.m_emjIdx = -1;
                }
            }
        }
        showFaceByIndex(char:any, index:number) : void {
            if(index == 0) char.changeExpress("smile");
            else if(index == 1) char.changeExpress("troubled");
            else if(index == 2) char.changeExpress("cry");
            else if(index == 3) char.changeExpress("angry");
            else if(index == 4) char.changeExpress("bewildered");
            else if(index == 5) char.changeExpress("stunned");
        }
        ///////////Mob
        private MobleftMoveNew(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            let m_x = role.m_x;
            if(role.m_x - N >= this.VRLeft + mRange) role.setPos(role.m_x - N, role.m_y);
            if(!this.onLineMob(role)) role.setPos(m_x, role.m_y);
        }
        private MobrightMoveNew(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            let m_x = role.m_x;
            if(role.m_x + N <= this.VRRight - mRange) role.setPos(role.m_x + N, role.m_y);
            if(!this.onLineMob(role)) role.setPos(m_x, role.m_y);
        }
        private MobleftMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x - N >= this.VRLeft + mRange) role.setPos(role.m_x - N, role.m_y);
        }
        private MobrightMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x + N <= this.VRRight - mRange) role.setPos(role.m_x + N, role.m_y);
        }
        private MobupMove(role:any, N:number) : void {
            if(role.m_y - N >= this.VRTop) role.setPos(role.m_x, role.m_y - N);
        }
        private MobdownMove(role:any, N:number) : void {
            if(role.m_y + N <= this.VRBottom) role.setPos(role.m_x, role.m_y + N);
        }

        private SummonleftMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x - N >= this.VRLeft + mRange) role.setPos(role.m_x - N, role.m_y);
        }
        private SummonrightMove(role:any, N:number) : void {
            let mRange = 0;//msMoudle.getMapRange();
            if(role.m_x + N <= this.VRRight - mRange) role.setPos(role.m_x + N, role.m_y);
        }

        ///////////Item
        private ItemdownMove(role:any, N:number) : void {
            if(role.m__y + N <= this.VRBottom) role.setPos(role.m__x, role.m__y + N);
        }
        ///////////Pet
        private PetleftMove(role:any, N:number) : void {
            if(role.m_x - N >= this.VRLeft) role.setPos(role.m_x - N, role.m_y);
        }
        private PetrightMove(role:any, N:number) : void {
            if(role.m_x + N <= this.VRRight) role.setPos(role.m_x + N, role.m_y);
        }
        private PetupMove(role:any, N:number) : void {
            if(role.m_y - N >= this.VRTop) role.setPos(role.m_x, role.m_y - N);
        }
        private PetdownMove(role:any, N:number) : void {
            if(role.m_y + N <= this.VRBottom) role.setPos(role.m_x, role.m_y + N);
        }
        //
        findudMin(role:any, move_N:number) : number {
            let changY = 999999;
            if(this.m_parent.m_foothld) {
                let line = this.m_parent.m_foothld.line;
                ////不应该找线
                for(let i:number = 0; i < line.length; i++) {
                    if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                        if(this.upkey) {
                            if(line[i].y1 < role.m_y) {
                                let cy = Math.abs(line[i].y1 - role.m_y);
                                if(cy < changY && cy >= 50) {//50
                                    changY = cy;
                                }
                            }
                        }
                        else {
                            //这里只取了y1，在斜坡大概率出问题
                            let y = line[i].k * role.m_x + line[i].b;
                            if(y > role.m_y) {
                                let cy = y - role.m_y;
                                if(cy < changY && cy >= 50) {//50
                                    changY = cy;
                                }
                            }
                            // if(line[i].y1 > role.m_y) {
                            //     let cy = Math.abs(line[i].y1 - role.m_y);
                            //     if(cy < changY && cy >= 50) {//50
                            //         changY = cy;
                            //     }
                            // }
                        }
                    }
                }
            }
            if(changY == 999999 || changY > move_N) return 0;
            return changY;
        }
        findlrMin(role:any, move_N:number) : number {
            let changU = 999999;
            let changD = 999999;
            if(this.m_parent.m_foothld && this.onLine(role, 0) == false) {
                let line = this.m_parent.m_foothld.line;
                ////不应该找线
                //优先向下的
                for(let i:number = 0; i < line.length; i++) {
                    if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                        if(line[i].y1 == role.m_y) return 0;
                        if(line[i].y1 > role.m_y) {
                            let cy = Math.abs(line[i].y1 - role.m_y);
                            if(cy < changD && cy < 100) changD = cy;
                        }
                    }
                }
                //查找向上的可能
                for(let i:number = 0; i < line.length; i++) {
                    if(role.m_x >= line[i].x1 && role.m_x <= line[i].x2) {//先保证基本条件成立
                        if(line[i].y1 == role.m_y) return 0;
                        if(line[i].y1 < role.m_y) {
                            let cy = Math.abs(line[i].y1 - role.m_y);
                            if(cy < changU && cy < 100) changU = cy;
                        }
                    }
                }
            }
            if(changU == changD) return 0;
            if(changU < changD) return -changU;
            else return changD;
        }
        //
        judgeHelper() : void {
            // msMoudle.toast("xxx")
            if(this.m_helper) {
                msMoudle.help = this.m_helper.getHelper(this.m_hero);
                if(msMoudle.help) {


                    if(msMoudle.help.script && msMoudle.help.script == "market00") {
                        msMoudle.playSound("res/Sound/Game.img/Portal")

                        this.m_hero.partIndex[msMoudle.partType.tTamingMob] =    "N";
                        this.m_hero.partIndex[msMoudle.partType.tTamingMob0] =   "N";
                        this.m_hero.changeByNameForce("stand", 0);
                        this.clearUp();
                        msMoudle.tiaotiao_map = "100000000.img";
                        msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                        return ;
                    }

                    //找地图内
                    let tm = msMoudle.help.tm + ".img";
                    for(let i:number = tm.length; i < 13; i++) tm = "0" + tm;
                    if(tm && tm != "") {
                        if(tm == this.mapId || tm == "999999999.img") {
                            /////第一期不处理
                            for(let j:number = 0; j < this.m_helper.helper.length; j++) {
                                let nexthelp:any = this.m_helper.helper[j];
                                if(msMoudle.help.tn == nexthelp.pn) { // || msMoudle.help.pn == nexthelp.tn) {
                                    if(nexthelp.y < this.m_hero.m_y) {
                                        let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                                        for(let _:number = 0; _ < N / 2; _++) {
                                            this.upMove(this.m_hero, 2);//向上
                                        }
                                    }
                                    if(nexthelp.y > this.m_hero.m_y) {
                                        let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                                        for(let _:number = 0; _ < N / 2; _++) {
                                            this.downMove(this.m_hero, 2);//向下
                                        }
                                    }
                                    if(nexthelp.x > this.m_hero.m_x) {
                                        let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                                        for(let _:number = 0; _ < N / 2; _++) {
                                            this.rightMove(this.m_hero, 2);//向右
                                        }
                                    }
                                    if(nexthelp.x < this.m_hero.m_x) {
                                        let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                                        for(let _:number = 0; _ < N / 2; _++) {
                                            this.leftMove(this.m_hero, 2);//向左
                                        }
                                    }
                                    Sync.reportMyOperate("transport", [nexthelp.x, nexthelp.y], []);
                                    break;
                                }
                                // else if(msMoudle.help.pn == nexthelp.tn) {
                                //     if(nexthelp.y < this.m_hero.m_y) {
                                //         let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                                //         for(let _:number = 0; _ < N / 2; _++) {
                                //             this.upMove(this.m_hero, 2);//向上
                                //         }
                                //     }
                                //     if(nexthelp.y > this.m_hero.m_y) {
                                //         let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                                //         for(let _:number = 0; _ < N / 2; _++) {
                                //             this.downMove(this.m_hero, 2);//向下
                                //         }
                                //     }
                                //     if(nexthelp.x > this.m_hero.m_x) {
                                //         let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                                //         for(let _:number = 0; _ < N / 2; _++) {
                                //             this.rightMove(this.m_hero, 2);//向右
                                //         }
                                //     }
                                //     if(nexthelp.x < this.m_hero.m_x) {
                                //         let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                                //         for(let _:number = 0; _ < N / 2; _++) {
                                //             this.leftMove(this.m_hero, 2);//向左
                                //         }
                                //     }
                                //     break;
                                // }
                            }
                        }
                        else {
                            // if(ms.herodata.Lv < 5 && ms.test_cz == 0) {
                            //     //新人认证
                            //     if(ms.fuli == 0) {
                            //         msMoudle.toast2("帐号未认证，请加联系QQ2717069196完成认证并领取500枫叶");
                            //         return ;
                            //     }
                            // }

                            ///目前还需要
                            if(msMoudle.findKeyFromArr(tm, msMoudle.allMaps)) {
                            // if(msMoudle.isSpMap(tm)) {
                            // if(msMoudle.isAuMap(tm) == false && tm != "000020000_gai.img") {

                                msMoudle.playSound("res/Sound/Game.img/Portal")

                                this.m_hero.partIndex[msMoudle.partType.tTamingMob] =    "N";
                                this.m_hero.partIndex[msMoudle.partType.tTamingMob0] =   "N";
                                this.m_hero.changeByNameForce("stand", 0);
                                this.clearUp();
                                msMoudle.tiaotiao_map = tm;
                                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                            }
                            else {
                                msMoudle.toast("该地图配置不存在" + tm)
                            }
                        }
                    }
                    // console.log(msMoudle.help);
                    // console.log(this.mapId + "  " + msMoudle.help.tm + "  " + tm);
                    // Laya.timer.clear(this, this.pickLoop);
                    // Laya.timer.clear(this, this.pickPetLoop);
                }
            }
        }

        public quickMove(nexthelp:any) : void {
            if(nexthelp.y < this.m_hero.m_y) {
                let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                for(let _:number = 0; _ < N / 2; _++) {
                    this.upMove(this.m_hero, 2);//向上
                }
            }
            if(nexthelp.y > this.m_hero.m_y) {
                let N = Math.round(Math.abs(nexthelp.y - this.m_hero.m_y));
                for(let _:number = 0; _ < N / 2; _++) {
                    this.downMove(this.m_hero, 2);//向下
                }
            }
            if(nexthelp.x > this.m_hero.m_x) {
                let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                for(let _:number = 0; _ < N / 2; _++) {
                    this.rightMove(this.m_hero, 2);//向右
                }
            }
            if(nexthelp.x < this.m_hero.m_x) {
                let N = Math.round(Math.abs(nexthelp.x - this.m_hero.m_x));
                for(let _:number = 0; _ < N / 2; _++) {
                    this.leftMove(this.m_hero, 2);//向左
                }
            }
        }

        //
        private JudgeBound() : void {
            if(this.wudi == false) {
                if(msMoudle.char && msMoudle.char.m_action) {
                    if(msMoudle.isTiaoMap(msMoudle.mapP.m_id)) {
                        if(msMoudle.char.m_action.indexOf("stand") >= 0 || msMoudle.char.m_action.indexOf("walk") >= 0 || msMoudle.char.m_action.indexOf("jump") >= 0) {
                            if(this.m_parent.m_obj) {
                                for(let i:number = 0; i < this.m_parent.m_obj.hitBound.length; i++) {
                                    if(this.m_parent.m_obj.hitBound[i] && msMoudle.char.hitBound) {
                                        if(this.m_parent.m_obj.hitBound[i].getBounds().width > 0) {
                                            if(this.m_parent.m_obj.hitBound[i].getBounds().intersects(msMoudle.char.hitBound.getBounds())) {
                                                if(msMoudle.char.hitBound.getBounds().width != 0) {
                                                    // console.log("碰撞了");
                                                    this.heroHit();
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ///保护罩子
                    if(ms.tamingmobbagsdata.length < 8) {
                        if(msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                            if(this.m_parent.m_life) {
                                if(this.m_parent.m_life.m_mobsAni) {
                                    for(let i:number = 0; i < this.m_parent.m_life.m_mobsAni.length; i++) {
                                        let mob = this.m_parent.m_life.m_mobsAni[i];
                                        if(mob.m_isdead == false) {
                                            // if(msMoudle.char.m_action.indexOf("stand") >= 0 || msMoudle.char.m_action.indexOf("walk") >= 0 || msMoudle.char.m_action.indexOf(this.jump_action) >= 0 || msMoudle.char.m_action.indexOf("prone") >= 0 || msMoudle.char.m_action.indexOf(this.jump_action) >= 0) {
                                                if(mob.hitBound.getBounds().width > 0) {
                                                    if(mob.hitBound.getBounds().intersects(msMoudle.char.hitBound.getBounds())) {
                                                        if(msMoudle.char.hitBound.getBounds().width != 0) {
                                                            // console.log("碰撞了");
                                                            // this.heroHit();
                                                            if(this.m_hero) {
                                                                let hit:Array<any> = [];
                                                                if(msMoudle.guaji) hit[0] = {num : 0, bj:false};
                                                                else {
                                                                    let atkNum = mob.m_atk - msMoudle.char.m_def;
                                                                    atkNum = atkNum > 0 ? atkNum : 0;
                                                                    hit[0] = {num : mob.m_atk, bj:false};
                                                                }
                                                                mob.showHit(msMoudle.char, hit, 0);
                                                            }
                                                            this.mobHit();
                                                            // msMoudle.toast("碰撞了")
                                                            break;
                                                        }
                                                    }
                                                }
                                            // }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ////
                }
            }
        }

        public heroHit() : void {
            if(this.wudi == false) {
                //做碰撞之后的一些逻辑处理
                this.wudi = true;
                this.wudi_time = 1000;
                this.m_control = false;

                if(this.m_hero.m_action != this.jump_action) {
                    this.m_hero.changeByName(this.jump_action, 0);
                }
                this.m_hero.m_up_t = 0.000001;

                //默认左边
                this.rightkey = (this.m_hero.m_dir == 1) ? true : false;
                this.leftkey = (this.m_hero.m_dir == -1) ? true : false;
                Laya.timer.once(2000, this, this.wudiFrame);
                Laya.timer.once(600, this, this.controlFrame);  //500不可操控时间
            }
        }

        public mobHit() : void {
            if(this.wudi == false) {
                //做碰撞之后的一些逻辑处理
                this.wudi = true;
                this.wudi_time = 1000;
                // this.m_control = false;

                // if(this.m_hero.m_action != this.jump_action) {
                    // this.m_hero.changeByName(this.jump_action, 0);
                // }
                // this.m_hero.m_up_t = 0.000001;

                //默认左边
                // this.rightkey = (this.m_hero.m_dir == 1) ? true : false;
                // this.leftkey = (this.m_hero.m_dir == -1) ? true : false;
                Laya.timer.once(2000, this, this.wudiFrame);
                // Laya.timer.once(600, this, this.controlFrame);  //500不可操控时间
            }
        }

        _doublej:boolean = false;
        _doubledis:number = 0;
        _huoye:boolean = false;
        public doubleJump() : void {
            if(this.is_sea) {
                // msMoudle.toast("xxxx" + this.m_hero.m_down_t)
                if(this.m_hero.m_down_t > 0.8) {
                    this.m_hero.m_up_t = 0.18//0.36;
                    this.m_hero.m_down_t = 0;

                    Sync.reportMyOperate("sj", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);

                }
            }
            else {
                if(this._doublej == false) {
                    Sync.reportMyOperate("jj", [this.upkey, this.downkey, this.leftkey, this.rightkey], []);

                    // msMoudle.playSound("res/Sound/Skill.img/4111006.Use")
                    // let be:cssBasicEff = new cssBasicEff();
                    // be.loadBasicEff(this.m_hero.m_sp, "RunningEffect2", 0, 0);
                    this.showDoubleJumpEffect();



                    //二段跳
                    this._doublej = true;
                    this._doubledis = 307;

                    //如果是其他玩家要做相应的处理

                    this.m_control = false;
                    if(this.m_hero.m_action != this.jump_action) {
                        this.m_hero.changeByName(this.jump_action, 0);
                    }
                    this.m_hero.m_up_t = 0.36;
                    //默认左边
                    this.rightkey = (this.m_hero.m_dir == -1) ? true : false;
                    this.leftkey = (this.m_hero.m_dir == 1) ? true : false;
                    // Laya.timer.once(600, this, this.controlFrame);  //500不可操控时间
                    Laya.timer.once(500, this, this.doubleFrame);
                }
            }
        }

        public luoye() : void {
            this._huoye = true;
            this.m_control = false;
            this.rightkey = (this.m_hero.m_dir == -1) ? true : false;
            this.leftkey = (this.m_hero.m_dir == 1) ? true : false;
        }

        doubleFrame() : void {
            this.rightkey = false;
            this.leftkey = false;
            // Sync.reportMyOperate("dir", [this.upkey, this.downkey, this.leftkey, this.rightkey])
        }

        private wudiFrame() : void {
            this.wudi = false;
        }

        private controlFrame() : void {
            this.wudi_time = 0;
            this.rightkey = false;
            this.leftkey = false;
            this.m_control = true;
         }

        //

    }
}