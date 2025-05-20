/// <reference path="./../../../core/ms/Maple/Mob.ts" />
/// <reference path="./../../../core/ms/Maple/Npc.ts" />
/// <reference path="./../../../core/ms/Maple/Character.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />

module LifeRole {
    import cssBasicEff = BasicEffRole.BasicEff;
    import cssMob = MobRole.Mob;
    import cssNpc = NpcRole.Npc;
    import cssCharacter = CharacterRole.Character;

    export class Life extends Laya.Sprite {

        public m_map:Array<any> = [];
        private m_parent:any;
        public m_sp:Laya.Sprite;
        public m_x:number = 0;
        public m_y:number = 0;
        private mapid:string;
        private mapleft:number;
        private mapright:number;
        private mapup:number;
        private mapdown:number;
        private maplv:number = 1;
        private mapboss:boolean = false;
        private m_foothold: FootholdRole.Foothold;
        public m_lifes_npc:Array<any> = [];
        public m_lifes_mob:Array<any> = [];

        public m_npcsAni:Array<any> = [];
        public m_mobsAni:Array<any> = [];
        public m_charsAni:Array<any> = [];

        public clearUp() : void {
            Laya.timer.clear(this, this.updateMob);
            Laya.timer.clear(this, this.updateMobTest);
            for(let i:number = 0; i < this.m_npcsAni.length; i++) {
                if(this.m_npcsAni[i]) {
                    this.m_npcsAni[i].clearUp();
                    this.m_npcsAni[i] = null;
                }
            }
            this.m_npcsAni = [];
            for(let i:number = 0; i < this.m_mobsAni.length; i++) {
                if(this.m_mobsAni[i]) {
                    this.m_mobsAni[i].clearUp();
                    this.m_mobsAni[i] = null;
                }
            }
            for(let i:number = 0; i < this.m_lifes_npc.length; i++) {
                Laya.loader.clearRes("res/Map/Npc/" + this.m_lifes_npc[i] + ".img/index.html", true);
                msMoudle.wz[this.m_lifes_npc[i] + ".img"] = null;
            }
            for(let i:number = 0; i < this.m_lifes_mob.length; i++) {
                Laya.loader.clearRes("res/Mob/" + this.m_lifes_mob[i] + ".img/index.html", true);
                msMoudle.wz[this.m_lifes_mob[i] + ".img"] = null;
            }
            this.m_mobsAni = [];
            this.m_map = [];
            // bossId = "";
            // bossId = "";
        }

        public clearMob() : void {
            Laya.timer.clear(this, this.updateMob);
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.m_mobsAni.length; i++) {
                if(this.m_mobsAni[i]) {
                    this.m_mobsAni[i].clearUp();
                    this.m_mobsAni[i] = null;
                }
            }
            this.m_mobsAni.length = 0;
        }

        ////初次创建
        public loadLife(data:any, P:any, mapid:string, mapleft:number, mapright:number, maptop:number, mapdown:number, maplv:number, foothold?:FootholdRole.Foothold) : void {
            msMoudle.wujin_guanka++;
            // bossId = "";
            // bossId = "";

            this.mapid = mapid;
            this.mapleft = mapleft;
            this.mapright = mapright;
            this.mapup = maptop;
            this.mapdown = mapdown;
            this.maplv = maplv;
            this.m_foothold = foothold;

            this.m_map = data;
            this.m_parent = P;

            if(msMoudle.isWuJin && msMoudle.isAuMap(this.mapid)) {
                if(msMoudle.wujin_tip == 0) {
                    ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "女神塔:" + msMoudle.wujin_guanka + "层";
                    ms.test_nvshen++;      //女神层数

                    if(msMoudle.wujin_guanka > ms.max_nvshen) ms.max_nvshen = msMoudle.wujin_guanka;
                }
                else if(msMoudle.wujin_tip == 1) {
                    ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "死神塔:" + msMoudle.wujin_guanka + "层";
                    ms.test_sishen++;      //死神次数

                    if(msMoudle.wujin_guanka > ms.max_sishen) ms.max_sishen = msMoudle.wujin_guanka;
                }
                //扎昆2种小怪
                else if(msMoudle.wujin_tip == 2) {
                    ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "深渊召唤:" + msMoudle.wujin_guanka + "层";
                    ms.test_shenyuan++;     //深渊次数
                }
                // else if(msMoudle.wujin_tip == 3) {
                //     ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "光与暗:" + msMoudle.wujin_guanka + "层";
                // }
                if(msMoudle.wujin_guanka > 1) {
                    let MAXN = 5;
                    // if(ms._user == "llk007") {
                    //     MAXN = 2;
                    // }
                    ///高级卷轴
                    // if(msMoudle.getRandValue(0, 0, 100) < MAXN * (msMoudle.wujin_tip + 1)) {
                    //     msMoudle._(); msMoudle.getItem("2040599");
                    //     // msMoudle.toast("你获得了1个高级卷轴");
                    //     if(msMoudle.mainT) {
                    //         if(msMoudle.mainT.m_msgList) {
                    //             msMoudle.mainT.m_msgList.msgShow(0, "获取高级卷轴", true);
                    //         }
                    //     }
                    // }
                    if(msMoudle.wujin_tip <= 1) {
                        // msMoudle._(); msMoudle.updateCaiLiao1(3 * (msMoudle.wujin_tip + 1));
                        // msMoudle._(); msMoudle.updateJueXing1(3 * (msMoudle.wujin_tip + 1))
                        // msMoudle._(); msMoudle.updateCaiLiao2(3 * (msMoudle.wujin_tip + 1));
                        msMoudle._(); msMoudle.updateRongYu(25 * (msMoudle.wujin_tip + 1));
                        msMoudle._(); msMoudle.updateJiFen(msMoudle.wujin_tip + 1);
                        if(msMoudle.mainT) {
                            if(msMoudle.mainT.m_msgList) {
                                // msMoudle.mainT.m_msgList.msgShow(0, "获取" + (3 * (msMoudle.wujin_tip + 1))+ "材料," + (25 * (msMoudle.wujin_tip + 1)) + "枫叶");
                                msMoudle.mainT.m_msgList.msgShow(0, "获取" + (25 * (msMoudle.wujin_tip + 1)) + "枫叶");
                                msMoudle.mainT.m_msgList.msgShow(0, "获取" + (msMoudle.wujin_tip + 1) + "积分");
                            }
                        }
                    }
                    else if(msMoudle.wujin_tip == 2) {
                        ///高级卷轴
                        // if(msMoudle.getRandValue(0, 0, 100) < 5 * (msMoudle.wujin_tip + 1)) {
                        //     msMoudle._(); msMoudle.getItem("2049000");
                        //     // msMoudle.toast("你获得了1个高级卷轴");
                        //     if(msMoudle.mainT) {
                        //         if(msMoudle.mainT.m_msgList) {
                        //             msMoudle.mainT.m_msgList.msgShow(0, "获取高级卷轴", true);
                        //         }
                        //     }
                        // }
                        // else {
                            let itemId = msMoudle.rnkJuanZhou();
                            msMoudle._(); msMoudle.getItem(itemId);
                            if(msMoudle.mainT) {
                                if(msMoudle.mainT.m_msgList) {
                                    msMoudle.mainT.m_msgList.msgShow(0, "获取卷轴", true);
                                }
                            }
                        // }
                    //     if(msMoudle.mainT) {
                    //         if(msMoudle.mainT.m_msgList) {
                    //             let rnk = msMoudle.getRandValue(0, 0, 100);
                    //             let getNum = 1;
                    //             msMoudle.updatelhs(getNum);      //每层给灵魂石
                    //             msMoudle.mainT.m_msgList.msgShow(0, "获取" + getNum + "灵魂石");
                    //             // for(let i:number = 0; i < 100; i++) {
                    //                 // msMoudle._(); msMoudle.getItem("2040599");
                    //                 // msMoudle._(); msMoudle.getItem("2040598");
                    //                 // msMoudle._(); msMoudle.getItem("2040597");
                    //                 // msMoudle._(); msMoudle.getItem("2040596");
                    //                 // msMoudle._(); msMoudle.getItem("2040595");
                    //             // }
                    //             if(rnk < 1) {
                    //                 msMoudle.updateqinglong(getNum);
                    //                 msMoudle.mainT.m_msgList.msgShow(0, "获取" + getNum + "青龙残卷");
                    //             }
                    //             else if(rnk < 2) {
                    //                 msMoudle.updatebaihu(getNum);
                    //                 msMoudle.mainT.m_msgList.msgShow(0, "获取" + getNum + "白虎残卷");
                    //             }
                    //             else if(rnk < 3) {
                    //                 msMoudle.updatexuanwu(getNum);
                    //                 msMoudle.mainT.m_msgList.msgShow(0, "获取" + getNum + "玄武残卷");
                    //             }
                    //             else if(rnk < 4) {
                    //                 msMoudle.updatezhuque(getNum);
                    //                 msMoudle.mainT.m_msgList.msgShow(0, "获取" + getNum + "朱雀残卷");
                    //             }
                    //         }
                    //     }
                    }
                    ms.saveServer();
                }
            }

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_sp);

            ////特殊处理的地图---自动战斗的地图
            if(msMoudle.isAuMap(this.mapid)) {
                if(msMoudle.isPvp == false) {
                    this.updateLife(this.maplv); //怪物
                }
                else {
                    if(msMoudle.specialPvp) {
                        this.updatePvPHero(this.m_sp);
                    }
                    // else {
                    //     this.updateHero(this.m_sp);     //pvp
                    // }
                }
            }
            //副本连续的
            else if(this.mapid == "000020000_gai.img") {
                if(msMoudle.team_guanka == 1) {
                    this.updateTask(1, 8, 1); //第一关
                }
                else if(msMoudle.team_guanka == 2) {
                    this.updateTask(5, 8, 2); //第一关
                }
                else if(msMoudle.team_guanka == 3) {
                    this.updateTask(30, 1, 3); //第一关
                }
            }
            /////以后手动的就不需要再什么了
            ////野外扎昆
            else {
                this.updateLife(this.maplv); //怪物
            }
            /////冒险岛正常地图
            // else {
            //     let lifeInfo:any = this.m_map["life"];
            //     if(lifeInfo) {
            //         let i:number = 0;
            //         while(true) {
            //             let type:string = "life." + i + ".type";
            //             if(lifeInfo[type]) {
            //                 this.linkLife(i, lifeInfo, type);
            //                 i = i + 1;
            //             }
            //             else break;
            //         }
            //     }
            //     ////自动战斗这里太快了，如果怪物没有加载则直接胜利了
            //     ////
            // }
        }

        public updateTask(maplv:number, mob_num:number, guanka:number) : void {
            this.clearMob();
            this.maplv = maplv;
            let mobNum:number = mob_num;

            let mobId:string = "";
            let bossId:string = "";
            if(guanka == 1) {
                mobId = "3501002";
                this.mapboss = false;
            }
            else if(guanka == 2) {
                mobId = "2400112";
                this.mapboss = false;
            }
            else if(guanka == 3) {
                bossId = "7130401";
                this.mapboss = true;
            }

            let lifeInfo:any = this.m_map["life"];
            if(lifeInfo) {
                // Laya.timer.once(250, this, ()=> {
                    for(let i:number = 0; i < mobNum; i++) {
                        lifeInfo = new Object();
                        lifeInfo["life." + (100 + i) + ".f"] = "0";
                        if(bossId != "")
                            lifeInfo["life." + (100 + i) + ".id"] = bossId;
                        else
                            lifeInfo["life." + (100 + i) + ".id"] = mobId;
                        lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                        lifeInfo["life." + (100 + i) + ".type"] = "nm";
                        let rnk:string = Math.floor( msMoudle.getRandValue(Number(this.mapleft)+80, Number(this.mapleft)+80, Number(this.mapright)-80 ) ) + "";
                        lifeInfo["life." + (100 + i) + ".x"] = rnk;
                        lifeInfo["life." + (100 + i) + ".y"] = "215";
                        lifeInfo["life." + (100 + i) + ".rx0"] = Math.floor(Number(this.mapleft) + 80) + "";
                        lifeInfo["life." + (100 + i) + ".rx1"] = Math.floor(Number(this.mapright) - 80) + "";
                        let type:string = "life." + (100 + i) + ".type";
                        this.linkLife(100 + i, lifeInfo, type);
                    }
                    //刷怪定时器
                    Laya.timer.once(3000, this, this.updateMobTest);
                // });
            }
        }

        private updateMobTest() : void {
            let end:boolean = false;
            let aniList:any = this.m_mobsAni;

            let _:number = 0;
            for(let i:number = 0; i < aniList.length; i++) {
                let mob = aniList[i];
                if(mob) {
                    if(mob.m_isdead) {          //怪物死亡
                        _++;
                    }
                }
            }

            if(_ == aniList.length) {
                if(msMoudle.isWuJin) {
                    let back:Laya.Image = new Laya.Image();
                    back.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                    back.zOrder = 10000000;
                    Laya.stage.addChild(back);
                    back.alpha = 0;
                    msMoudle._alphasp3(back, 500);
                    Laya.timer.once(500, this, ()=> {
                        if(back) {
                            msMoudle.mainT.clearGuanKa();
                            msMoudle.mapP.loadWujin();
                            msMoudle._alphasp(back, 1250);
                            Laya.timer.once(1250, this, ()=> {
                                if(back) {
                                    back.removeSelf();
                                    back = null;
                                }
                            });
                        }
                    });
                }
                else {
                    if(this.mapid == "000020000_gai.img" ) {

                        if(msMoudle.team_guanka == 1 || msMoudle.team_guanka == 2) {
                            // msMoudle.Effect("quest.party.clear");
                            // Laya.timer.once(3000, this, ()=> {
                                msMoudle.team_guanka++;
                                ///在这里切换
                                let back:Laya.Image = new Laya.Image();
                                back.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                                back.zOrder = 10000000;
                                Laya.stage.addChild(back);
                                back.alpha = 0;
                                msMoudle._alphasp3(back, 500);
                                Laya.timer.once(500, this, ()=> {
                                    if(back) {
                                        //场景切换
                                        msMoudle.team_guanka_num = 0;       //第一/二关
                                        msMoudle.team_guanka1_num = 0;      //第三关
                                        msMoudle.team_guanka2_num = 0;
                                        msMoudle.team_guanka3_num = 0;

                                        msMoudle.mainT.clearGuanKa();
                                        msMoudle.mapP.loadGuanKa();
                                        msMoudle._alphasp(back, 1250);
                                        Laya.timer.once(1250, this, ()=> {
                                            if(back) {
                                                back.removeSelf();
                                                back = null;
                                            }
                                        });
                                    }
                                });
                            // });
                            end = true;
                            Laya.timer.clear(this, this.updateMobTest);
                            return ;
                        }
                        else if(msMoudle.team_guanka == 3) {
                            // msMoudle.Effect("quest.party.clear");
                            // Laya.timer.once(3000, this, ()=> {
                            //     msMoudle.gameP.gotoScene("910000000.img");
                            // });
                            if(ms.cur_fuben == ms.fuben) {
                                if(ms.fuben < 10) ms.fuben++;
                            }
                            ui.show(app.battle.BattleRewardDlg);

                            Laya.timer.clear(msMoudle.gameP, msMoudle.gameP.updateTime);
                            end = true;
                            Laya.timer.clear(this, this.updateMobTest);
                            return ;
                        }
                    }
                }
            }

            if(end == false)
                Laya.timer.once(1000, this, this.updateMobTest);
        }

        public updateLife(maplv:number) : void {
            this.clearMob();

            this.maplv = maplv;
            let mobId:string = "";
            let bossId:string = "";
            let dlg = ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg;
            if(msMoudle.isBoss) {
                for(let key in msMoudle.bossjson) {
                    if(msMoudle.bossjson[key].lv == this.maplv) {
                        mobId = msMoudle.bossjson[key].id;
                        bossId = msMoudle.bossjson[key].boss;
                        if(msMoudle.isAuMap(this.mapid)) {
                            dlg.guanka.text = msMoudle.bossjson[key].map;
                        }
                        break;
                    }
                }
            }
            else if(msMoudle.isWorldBoss) {
                if(msMoudle.isAuMap(this.mapid)) {
                    if(msMoudle.WorldBossLv == 80) {
                        dlg.guanka.text = "蜈蚣王";
                        // mobId = "2400017";
                        bossId = "5220004";
                    }
                    else if(msMoudle.WorldBossLv == 100) {
                        dlg.guanka.text = "闹钟";
                        // mobId = "2400017";
                        bossId = "8500001";
                    }
                    else {
                        mobId = "";
                        bossId = "";
                        if(msMoudle.WorldBossLv == 120) dlg.guanka.text = "扎昆";
                        else if(msMoudle.WorldBossLv == 140) dlg.guanka.text = "黑龙";
                        // else if(msMoudle.WorldBossLv == 160) dlg.guanka.text = "进阶扎昆";
                        // else if(msMoudle.WorldBossLv == 180) dlg.guanka.text = "进阶黑龙";
                    }
                }
            }
            else if(msMoudle.isWuJin) {

                if(msMoudle.wujin_tip == 0) {
                    mobId = "2400112";
                    dlg.guanka.text = "女神塔:" + msMoudle.wujin_guanka + "层";
                }
                else if(msMoudle.wujin_tip == 1) {
                    mobId = "6130101";
                    dlg.guanka.text = "死神塔:" + msMoudle.wujin_guanka + "层";
                }
                else if(msMoudle.wujin_tip == 2) {
                    //8230046
                    mobId = "9300003";
                    dlg.guanka.text = "深渊召唤:" + msMoudle.wujin_guanka + "层";
                }
                // else if(msMoudle.wujin_tip == 3) {
                //     mobId = "6300005";
                //     dlg.guanka.text = "光与暗:" + msMoudle.wujin_guanka + "层";
                // }
                bossId = "";
            }
            else {
                for(let key in msMoudle.mobjson) {
                    if(msMoudle.mobjson[key].lv == this.maplv) {
                        mobId = msMoudle.mobjson[key].id;
                        bossId = msMoudle.mobjson[key].boss;
                        if(msMoudle.isAuMap(this.mapid)) {
                            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "关卡：" + msMoudle.mobjson[key].lv;
                        }
                        break;
                    }
                }
            }
            this.mapboss = false;
            let lifeInfo:any = this.m_map["life"];
            if(lifeInfo) {
                if(msMoudle.isAuMap(this.mapid)) {
                    if(msMoudle.isWorldBoss && (msMoudle.WorldBossLv == 120) ) {// || msMoudle.WorldBossLv == 160
                        let mobNum:number = 9;//20
                        let mobs = ["8800003", "8800004","8800005", "8800006", "8800007","8800008", "8800009", "8800010", "8800000"];
                        // mobNum = 7;
                        // Laya.timer.once(250, this, ()=> {
                            for(let i:number = 0; i < mobNum; i++) {
                                lifeInfo = new Object();
                                lifeInfo["life." + (100 + i) + ".f"] = "0";
                                lifeInfo["life." + (100 + i) + ".id"] = mobs[i];
                                lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                                lifeInfo["life." + (100 + i) + ".type"] = "nm";
                                lifeInfo["life." + (100 + i) + ".x"] = Number(this.mapleft) + Laya.stage.width / 2;
                                lifeInfo["life." + (100 + i) + ".y"] = "215";
                                lifeInfo["life." + (100 + i) + ".rx0"] = Math.floor(Number(this.mapleft) + 80) + "";
                                lifeInfo["life." + (100 + i) + ".rx1"] = Math.floor(Number(this.mapright) - 80) + "";
                                let type:string = "life." + (100 + i) + ".type";
                                this.linkLife(100 + i, lifeInfo, type);
                            }
                            //刷怪定时器
                            Laya.timer.once(3000, this, this.updateMob);
                        // });
                    }
                    else if(msMoudle.isWorldBoss && (msMoudle.WorldBossLv == 140)) {// || msMoudle.WorldBossLv == 180
                        let mobNum:number = 8;//20
                        // let mobs = ["8810002", "8810003", "8810004", "8810005", "8810006", "8810007","8810008", "8810009"];
                        let mobs = ["8810007", "8810009", "8810002", "8810004", "8810005", "8810006", "8810008", "8810003"];
                        // Laya.timer.once(250, this, ()=> {
                            for(let i:number = 0; i < mobNum; i++) {
                                lifeInfo = new Object();
                                lifeInfo["life." + (100 + i) + ".f"] = "0";
                                lifeInfo["life." + (100 + i) + ".id"] = mobs[i];
                                lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                                lifeInfo["life." + (100 + i) + ".type"] = "nm";
                                lifeInfo["life." + (100 + i) + ".x"] = Number(this.mapleft) + Laya.stage.width / 2;
                                lifeInfo["life." + (100 + i) + ".y"] = "240";
                                lifeInfo["life." + (100 + i) + ".rx0"] = Math.floor(Number(this.mapleft) + 80) + "";
                                lifeInfo["life." + (100 + i) + ".rx1"] = Math.floor(Number(this.mapright) - 80) + "";
                                let type:string = "life." + (100 + i) + ".type";
                                this.linkLife(100 + i, lifeInfo, type);
                            }
                            //刷怪定时器
                            Laya.timer.once(3000, this, this.updateMob);
                        // });
                    }
                    else {
                        if(msMoudle.isWuJin) {
                            let mobNum:number = 13 + msMoudle.getRandValue(1, 0, 3);//20
                            if(msMoudle.wujin_tip == 1) mobNum = 1;
                            if(msMoudle.wujin_tip == 2) mobNum = 3;
                            // if(msMoudle.wujin_tip == 3) mobNum = 5;
                            let lifeInfo:any = this.m_map["life"];
                            if(lifeInfo) {
                                // Laya.timer.once(250, this, ()=> {
                                    for(let i:number = 0; i < mobNum; i++) {
                                        lifeInfo = new Object();
                                        lifeInfo["life." + (100 + i) + ".f"] = "0";
                                        if(bossId != "")
                                            lifeInfo["life." + (100 + i) + ".id"] = bossId;
                                        else
                                            lifeInfo["life." + (100 + i) + ".id"] = mobId;
                                        lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                                        lifeInfo["life." + (100 + i) + ".type"] = "nm";
                                        let rnk:string = Math.floor( msMoudle.getRandValue(Number(this.mapleft)+160, Number(this.mapleft)+160, Number(this.mapright)-160 ) ) + "";
                                        // console.log(this.mapleft + "  " + this.mapright + "  " + rnk)
                                        lifeInfo["life." + (100 + i) + ".x"] = rnk;
                                        lifeInfo["life." + (100 + i) + ".y"] = "215";
                                        lifeInfo["life." + (100 + i) + ".rx0"] = Math.floor(Number(this.mapleft) + 80) + "";
                                        lifeInfo["life." + (100 + i) + ".rx1"] = Math.floor(Number(this.mapright) - 80) + "";
                                        let type:string = "life." + (100 + i) + ".type";
                                        this.linkLife(100 + i, lifeInfo, type);
                                    }
                                    //刷怪定时器
                                    Laya.timer.once(3000, this, this.updateMobTest);
                                // });
                            }
                        }
                        else {
                            let mobNum:number = 20;//20

                            if(ms.cur_guanka == 1) mobNum = 5;
                            else if(ms.cur_guanka == 2) mobNum = 10;

                            if(bossId != "") {
                                mobNum = 1;
                                this.mapboss = true;
                            }

                            // Laya.timer.once(250, this, ()=> {
                                for(let i:number = 0; i < mobNum; i++) {
                                    lifeInfo = new Object();
                                    lifeInfo["life." + (100 + i) + ".f"] = "0";
                                    if(bossId != "")
                                        lifeInfo["life." + (100 + i) + ".id"] = bossId;
                                    else
                                        lifeInfo["life." + (100 + i) + ".id"] = mobId;
                                    lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                                    lifeInfo["life." + (100 + i) + ".type"] = "nm";
                                    let rnk:string = Math.floor( msMoudle.getRandValue(Number(this.mapleft)+80, Number(this.mapleft)+80, Number(this.mapright)-80 ) ) + "";
                                    if(msMoudle.isWorldBoss) {
                                        rnk = ((Number(this.mapleft) + Number(this.mapright)) / 2) + "";
                                    }

                                    // console.log(this.mapleft + "  " + this.mapright + "  " + rnk)
                                    lifeInfo["life." + (100 + i) + ".x"] = rnk;
                                    lifeInfo["life." + (100 + i) + ".y"] = "215";
                                    lifeInfo["life." + (100 + i) + ".rx0"] = Math.floor(Number(this.mapleft) + 80) + "";
                                    lifeInfo["life." + (100 + i) + ".rx1"] = Math.floor(Number(this.mapright) - 80) + "";
                                    let type:string = "life." + (100 + i) + ".type";
                                    this.linkLife(100 + i, lifeInfo, type);
                                }
                                ///Boss关卡附加10个小怪
                                // if(this.mapboss == true) {
                                //     for(let i:number = 1; i <= 10; i++) {
                                //         lifeInfo = new Object();
                                //         lifeInfo["life." + (100 + i) + ".f"] = "0";
                                //         lifeInfo["life." + (100 + i) + ".id"] = 3501002;
                                //         lifeInfo["life." + (100 + i) + ".mobTime"] = "0";
                                //         lifeInfo["life." + (100 + i) + ".type"] = "nm";

                                //         let rnk:string = ((Number(this.mapleft) + Number(this.mapright)) / 2 + msMoudle.getRandValue(-200, 0, 400)).toFixed(0);

                                //         // console.log(this.mapleft + "  " + this.mapright + "  " + rnk)
                                //         lifeInfo["life." + (100 + i) + ".x"] = rnk;
                                //         lifeInfo["life." + (100 + i) + ".y"] = "215";
                                //         lifeInfo["life." + (100 + i) + ".rx0"] = Number(Number(this.mapleft) + 80).toFixed(0);
                                //         lifeInfo["life." + (100 + i) + ".rx1"] = Number(Number(this.mapright) - 80).toFixed(0);
                                //         let type:string = "life." + (100 + i) + ".type";
                                //         this.linkLife(100 + i, lifeInfo, type, true);
                                //     }
                                // }
                                //刷怪定时器
                                Laya.timer.once(3000, this, this.updateMob);
                            // });
                        }
                    }
                }
                else {
                    let lifeInfo:any = this.m_map["life"];
                    //扎昆
                    if(this.mapid == "280030100.img") {
                        let mobNum:number = 9;//20
                        let mobs = ["8800003", "8800004","8800005", "8800006", "8800007","8800008", "8800009", "8800010", "8800000"];
                        lifeInfo = new Object();
                        for(let i:number = 0; i < mobNum; i++) {
                            lifeInfo["life." + i + ".f"] = "0";
                            lifeInfo["life." + i + ".id"] = mobs[i];
                            lifeInfo["life." + i + ".mobTime"] = "0";
                            lifeInfo["life." + i + ".type"] = "m";
                            lifeInfo["life." + i + ".x"] = "33";
                            lifeInfo["life." + i + ".y"] = "-215";
                            lifeInfo["life." + i + ".rx0"] = Number(this.mapleft) + 80;
                            lifeInfo["life." + i + ".rx1"] = Number(this.mapright) - 80;
                        }
                    }
                    //黑龙
                    else  if(this.mapid == "240060200.img") {
                        let mobNum:number = 9;//8;
                        let mobs = ["8810007", "8810009", "8810002", "8810004", "8810005", "8810006", "8810008", "8810003", "8810018"];
                        lifeInfo = new Object();
                        for(let i:number = 0; i < mobNum; i++) {
                            lifeInfo["life." + i + ".f"] = "0";
                            lifeInfo["life." + i + ".id"] = mobs[i];
                            lifeInfo["life." + i + ".mobTime"] = "0";
                            lifeInfo["life." + i + ".type"] = "m";
                            lifeInfo["life." + i + ".x"] = "33";
                            lifeInfo["life." + i + ".y"] = (Number(this.mapdown) - 250) + "";
                            lifeInfo["life." + i + ".cy"] = (Number(this.mapdown) - 250) + "";
                            if(i == 8) {
                                lifeInfo["life." + i + ".cy"] = (Number(this.mapdown) - 120) + "";
                            }
                            lifeInfo["life." + i + ".rx0"] = Number(this.mapleft) + 80;
                            lifeInfo["life." + i + ".rx1"] = Number(this.mapright) - 80;
                        }
                    }
                    //蜈蚣王
                    if(this.mapid == "701010323.img") {
                        let mobNum:number = 1;
                        let mobs = ["5220004"];
                        lifeInfo = new Object();
                        for(let i:number = 0; i < mobNum; i++) {
                            lifeInfo["life." + i + ".f"] = "0";
                            lifeInfo["life." + i + ".id"] = mobs[i];
                            lifeInfo["life." + i + ".mobTime"] = "3600";
                            lifeInfo["life." + i + ".type"] = "m";
                            lifeInfo["life." + i + ".x"] = (Number(this.mapleft) +700) + "";
                            lifeInfo["life." + i + ".y"] = (Number(this.mapdown) - 200) + "";
                            lifeInfo["life." + i + ".cy"] = (Number(this.mapdown) - 200) + "";
                            lifeInfo["life." + i + ".rx0"] = Number(this.mapleft) + 80;
                            lifeInfo["life." + i + ".rx1"] = Number(this.mapright) - 80;
                        }
                    }
                    //闹钟王
                    if(this.mapid == "220080001.img") {
                        let mobNum:number = 1;
                        let mobs = ["8500001"];
                        lifeInfo = new Object();
                        for(let i:number = 0; i < mobNum; i++) {
                            lifeInfo["life." + i + ".f"] = "0";
                            lifeInfo["life." + i + ".id"] = mobs[i];
                            lifeInfo["life." + i + ".mobTime"] = "0";
                            lifeInfo["life." + i + ".type"] = "m";
                            lifeInfo["life." + i + ".x"] = (Number(this.mapleft) + 400) + "";
                            lifeInfo["life." + i + ".y"] = (Number(this.mapdown) - 200) + "";
                            lifeInfo["life." + i + ".cy"] = (Number(this.mapdown) - 200) + "";
                            lifeInfo["life." + i + ".rx0"] = Number(this.mapleft) + 80;
                            lifeInfo["life." + i + ".rx1"] = Number(this.mapright) - 80;
                        }
                    }
                    let _mId = Number(this.mapid.split(".")[0]);
                    //自由市场
                    if(_mId > 910000000 && _mId < 9100000023) {
                        let markInfo = msMoudle.maplejson["market_boss"];
                        if(markInfo) {
                            let mobInfos = markInfo[_mId - 910000001];
                            if(mobInfos) {
                                for(let i=0; i<mobInfos.length; ++i) {
                                    let mobInfo = mobInfos[i];
                                    lifeInfo["life." + i + ".f"] = "0";
                                    lifeInfo["life." + i + ".id"] = mobInfo[0];
                                    lifeInfo["life." + i + ".mobTime"] = mobInfo[1];
                                    lifeInfo["life." + i + ".type"] = "m";
                                    if(!lifeInfo["life." + i + ".x"]) lifeInfo["life." + i + ".x"] = lifeInfo["life.0.x"];
                                    if(!lifeInfo["life." + i + ".y"]) lifeInfo["life." + i + ".y"] = lifeInfo["life.0.y"];
                                    if(!lifeInfo["life." + i + ".cy"]) lifeInfo["life." + i + ".cy"] = lifeInfo["life.0.cy"];
                                    if(!lifeInfo["life." + i + ".rx0"]) lifeInfo["life." + i + ".rx0"] = lifeInfo["life.0.rx0"];
                                    if(!lifeInfo["life." + i + ".rx1"]) lifeInfo["life." + i + ".rx1"] = lifeInfo["life.0.rx1"];
                                }
                            }
                        }
                    }

                    let i:number = 0;
                    while(true) {
                        let type = "life." + i + ".type";
                        if(lifeInfo[type]) {
                            // console.log(i, type,lifeInfo);
                            this.linkLife2(i, lifeInfo, type);
                            i = i + 1;
                        }
                        else break;
                    }
                    //刷怪定时器
                    Laya.timer.once(3000, this, this.updateMob);
                }
            }
        }

        public linkLife(i:number, lifeInfo:any, type:string, bossguai:boolean = false) : void {
            let id = lifeInfo["life." + i + ".id"];         //通过id获取更详细的信息

            if(msMoudle.isAuMap(this.mapid) && lifeInfo[type] == "n") return ;
            //有可能是目录链接
            ////跳关的地图需要断开
            // if(id.length == 4) id = "000" + id;
            // else if(id.length == 5) id = "00" + id;
            // else if(id.length == 6) id = "0" + id;
            // if(this.mapid == "101000103.img" || this.mapid == "101000100.img") {
                // this.mapid == msMoudle.tiaotiao_map)
                // console.log(id);
                // return ;
            // }


            this.loadLifeById1(1, id, lifeInfo, i, type, bossguai);
            // console.log(id)
            // console.log(msMoudle.wz[id + ".img"])
            // if(msMoudle.wz[id + ".img"]) {
                // let npcInfo:any = msMoudle.wz[id + ".img"]["info"];
                // if(!npcInfo) {
                //     console.log(id);
                //     return ;
                // }
                // let link = npcInfo["info.link"];
                // if(link) id = link;
            // if(msMoudle.wz[id + ".img"]) {
            //     this.addLife1(id, lifeInfo, i, type, bossguai);
            // }
            // else {
            //     console.log("life错误" + id)
            // }
        }

        /////这里可能还需要提前优化
        loadLifeById1(time:number,id:any, lifeInfo:any, i:number, type:any, bossguai:any) : void {
            if(id.length == 4) id = "000" + id;
            else if(id.length == 5) id = "00" + id;
            else if(id.length == 6) id = "0" + id;
            if(msMoudle.wz[id + ".img"]) {
                this.onLifeLoaded1(time, id, lifeInfo, i, type, bossguai);
            }
            else {
                // console.log("life1级info" + id);
                let res:any = [];
                if(lifeInfo[type] == "n")
                    res.push({ url: "res/Map/Npc/" + id + ".img/index.html" });
                else
                    res.push({ url: "res/Mob/" + id + ".img/index.html" });

                msLoad.load(res).done(dlg => {
                    this.onLifeLoaded1(time, id, lifeInfo, i, type, bossguai);
                });
            }
        }

        onLifeLoaded1(time:number, id:any, lifeInfo:any, i:number, type:any, bossguai:any):void {
            let cs:CssParser.Txt = new CssParser.Txt();
            if(!msMoudle.wz[id + ".img"]) {
                let path:string = "";
                if(lifeInfo[type] == "n") {
                    path = "res/Map/Npc/" + id + ".img/index.html";
                    if(msMoudle.findKeyFromArr(id, this.m_lifes_npc) == false) this.m_lifes_npc.push(id);
                }
                else {
                    path = "res/Mob/" + id + ".img/index.html";
                    if(msMoudle.findKeyFromArr(id, this.m_lifes_mob) == false) this.m_lifes_mob.push(id);
                }
                msMoudle.wz[id + ".img"] = msMoudle.loadWZ(cs, path, "ms");
            }
            if(time == 1) {
                let npcInfo:any = msMoudle.wz[id + ".img"]["info"];
                if(!npcInfo) {
                    // console.log(id);
                    return ;
                }
                let link = npcInfo["info.link"];
                if(link) id = link;
            }
            //再次加载id
            if(msMoudle.wz[id + ".img"]) {
                ////成功
                this.addLife1(id, lifeInfo, i, type, bossguai);

                //add sync
                Sync.loadLifeOver = true;
            }
            else {
                // console.log("life不存在" + id);
                if(time == 1) {
                    this.loadLifeById1(2, id, lifeInfo, i, type, bossguai);
                }
                else {
                    console.log("life不存在" + id);
                }
            }
        }
        onLoading() : void {}

        addLife1(id:any, lifeInfo:any, i:number, type:any, bossguai:any) : void {
            let x = lifeInfo["life." + i + ".x"];
            let y = lifeInfo["life." + i + ".y"];
            let fh = lifeInfo["life." + i + ".fh"];
            let cy = lifeInfo["life." + i + ".cy"];
            let rx0 = lifeInfo["life." + i + ".rx0"];       //移动区域
            let rx1 = lifeInfo["life." + i + ".rx1"];
            let f = lifeInfo["life." + i + ".f"];

            let lifeMsg:any = new Object();
            lifeMsg.id = id;
            lifeMsg.fh = fh;
            lifeMsg.cy = Number(cy);
            lifeMsg.x = Number(x);
            lifeMsg.y =  cy ? Number(cy) : Number(y);
            if(msMoudle.isAuMap(this.mapid) && this.mapid != "240050400.img") lifeMsg.y = msMoudle.char.m_y;
            lifeMsg.rx0 = Number(rx0);
            lifeMsg.rx1 = Number(rx1);
            lifeMsg.f = f;


            if(lifeInfo[type] == "n") {

                // if(this.m_npcsAni.length < 10) {
                    // console.log("npc ---" + id);
                    let tIndex:number = this.m_npcsAni.length;
                    this.m_npcsAni[tIndex] = new cssNpc();
                    this.m_npcsAni[tIndex].changeAll(this.m_sp, (id + ".img"), lifeMsg);
                // }
            }
            else if(lifeInfo[type] == "m") {
                if(msMoudle.isAuMap(this.mapid) == false) {
                    //
                    if(msMoudle.wz[id + ".img"]) {
                        // if(!msMoudle.wz[this.m_id]) console.log("错误mobid", this.m_id, this.m_action)
                        // console.log("mob " + id)
                        let incInfo:any = msMoudle.wz[id + ".img"]["info"];
                        let hp:number = Number(incInfo["info.maxHP"]);
                        // let pad:number = Number(incInfo["info.PADamage"]);
                        // let pdd:number = Number(incInfo["info.PDDamage"]);
                        // let mad:number = Number(incInfo["info.MADamage"]);
                        // let mdd:number = Number(incInfo["info.MDDamage"]);

                        lifeMsg.hp = hp + msMoudle.getRandValue(1, 0, 5);;
                        lifeMsg.maxhp = hp + msMoudle.getRandValue(1, 0, 5);;

                        let tIndex:number = this.m_mobsAni.length;
                        this.m_mobsAni[tIndex] = new cssMob();
                        this.m_mobsAni[tIndex].changeAll(this.m_sp, (id + ".img"), lifeMsg);
                        this.m_mobsAni[tIndex].m_index = i;
                    }
                    else {
                        console.log("mobid不存在" + id);
                    }
                }
            }
            //地图特殊处理
            else if(lifeInfo[type] == "nm") {
                if(this.mapid != "240050400.img") lifeMsg.y -= 25;
                ///////////
                let tIndex:number = this.m_mobsAni.length;
                this.m_mobsAni[tIndex] = new cssMob();
                this.m_mobsAni[tIndex].m_isdead = false;
                this.m_mobsAni[tIndex]._autofight = true;
                if(msMoudle.isWorldBoss && (msMoudle.WorldBossLv == 120) )// || msMoudle.WorldBossLv == 160
                    this.m_mobsAni[tIndex]._automove = false;
                // || msMoudle.WorldBossLv == 180
                else if(msMoudle.isWorldBoss && (msMoudle.WorldBossLv == 140) )this.m_mobsAni[tIndex]._automove = false;
                this.m_mobsAni[tIndex].changeAll(this.m_sp, (id + ".img"), lifeMsg);

                let mob = this.m_mobsAni[tIndex];
                if(msMoudle.isBoss) {
                    if(bossguai) {
                        mob.m_lv = 10 * ms.cur_bossguanka;//100
                        mob.m_hp = 28 + mob.m_lv * 100 * (ms.cur_bossguanka + 1) / 2;         //对应角色的攻击
                        mob.m_maxhp = mob.m_hp;
                        mob.m_atk = 26 + Math.floor(mob.m_lv * 6); //
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 100;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                    }
                    else {
                        mob.m_lv = 100 * ms.cur_bossguanka;//1000
                        mob.m_hp = mob.m_lv * 100 * (ms.cur_bossguanka + 1) / 2;         //对应角色的攻击
                        mob.m_maxhp = mob.m_hp;
                        mob.m_atk = 26 + Math.floor(mob.m_lv * 1.75); //
                        if(ms.cur_bossguanka == 10) {
                            mob.m_atk = 26 + Math.floor(mob.m_lv * 4.5); //
                        }
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 100;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                        mob.m_isboss = true;
                    }
                }
                else if(msMoudle.isWorldBoss) {
                    if(bossguai) {
                        mob.m_lv = 80;//100
                        mob.m_hp = 10000;         //对应角色的攻击
                        if(msMoudle.WorldBossLv == 100) {
                            mob.m_lv = 100;//100
                            mob.m_hp = 20000;         //对应角色的攻击
                        }
                        mob.m_maxhp = mob.m_hp;
                        mob.m_atk = 26 + Math.floor(mob.m_lv * 3); //
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 100;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                    }
                    else {
                        mob.m_lv = 800;//1000
                        mob.m_hp = 1000000;         //对应角色的攻击
                        if(msMoudle.WorldBossLv == 100) {
                            mob.m_lv = 1200;//1000
                            mob.m_hp = 5000000;         //对应角色的攻击
                        }
                        else if(msMoudle.WorldBossLv == 120) {// || msMoudle.WorldBossLv == 160
                            if(i == 108) {      //这里需要验证
                                mob.m_lv = 1200;
                                mob.m_hp = 10000000;         //对应角色的攻击
                                // if(msMoudle.WorldBossLv == 160) {
                                //     mob.m_lv = 3600;
                                //     mob.m_hp = 50000000;         //对应角色的攻击
                                // }
                            }
                            else {
                                mob.m_lv = 1;//1500
                                mob.m_hp = 0;         //对应角色的攻击
                                mob.m_isdead = true;
                            }
                        }
                        else if(msMoudle.WorldBossLv == 140) {// || msMoudle.WorldBossLv == 180
                            if(i == 106) {          //还有这里
                                mob.m_lv = 1000;
                                mob.m_hp = 100000000;         //对应角色的攻击
                                // if(msMoudle.WorldBossLv == 180) {
                                //     mob.m_lv = 3000;
                                //     mob.m_hp = 100000000;         //对应角色的攻击
                                // }
                            }
                            else {
                                mob.m_lv = 1000;//1500
                                mob.m_hp = 0;         //对应角色的攻击
                                // if(msMoudle.WorldBossLv == 180) {
                                //     mob.m_lv = 3000;
                                //     mob.m_hp = 0;         //对应角色的攻击
                                // }
                                mob.m_isdead = true;
                            }
                        }
                        mob.m_maxhp = mob.m_hp;
                        mob.m_atk = mob.m_lv * 1.5; //
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 105;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                        mob.m_isboss = true;
                    }
                }
                else if(msMoudle.isFuben) {
                    mob.m_lv = this.maplv + ((ms.cur_fuben - 1) * 10);
                    mob.m_hp = 28 + mob.m_lv * 50;         //对应角色的攻击
                    mob.m_maxhp = mob.m_hp;
                    mob.m_atk = 10 + Math.floor(mob.m_lv * 6); //
                    mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                    mob.m_target = 100;
                    mob.m_baoji = 0;
                    mob.m_miss = 0;
                    if(msMoudle.team_guanka == 3) mob.m_isboss = true;
                }
                else {
                    if(msMoudle.isWuJin) {
                        mob.m_lv = msMoudle.wujin_guanka;
                        if(msMoudle.wujin_tip == 1) mob.m_lv *= 10;
                        else if(msMoudle.wujin_tip == 2) mob.m_lv *= 50;
                        // else if(msMoudle.wujin_tip == 3) mob.m_lv *= 50;

                        ///大号加难度
                        if(ms._user == "llk007") {
                            mob.m_lv *= 1.5;
                        }

                        mob.m_hp = 2500 * mob.m_lv;         //对应角色的攻击
                        mob.m_atk = 500 + 100 * mob.m_lv;
                        if(msMoudle.wujin_tip == 1)  mob.m_hp *= 10;
                        // else if(msMoudle.wujin_tip == 2)  mob.m_hp *= 10;
                        // else if(msMoudle.wujin_tip == 3)  mob.m_hp *= 10;
                        mob.m_maxhp = mob.m_hp;
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 150;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                    }
                    else {
                        mob.m_lv = ms.cur_guanka;
                        mob.m_hp = mob.m_lv * 20 - 10;         //对应角色的攻击
                        mob.m_atk = 1 + Math.floor(mob.m_lv * 2); //
                        if(mob.m_lv >= 10) {
                            mob.m_atk += Math.round((mob.m_lv - 10) * mob.m_lv / 2);
                            mob.m_hp += Math.round(mob.m_lv * mob.m_lv / 2);
                        }

                        mob.m_maxhp = mob.m_hp;
                        mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
                        mob.m_target = 100;
                        mob.m_baoji = 0;
                        mob.m_miss = 0;
                    }
                }
            }
            else {
                console.log("未知生物");
            }
        }

        loadLifeById2(time:number,id:any, lifeInfo:any, i:number, type:any) : void {
            if(id.length == 4) id = "000" + id;
            else if(id.length == 5) id = "00" + id;
            else if(id.length == 6) id = "0" + id;
            if(lifeInfo[type] == "n") {
                this.onLifeLoaded2(time, id, lifeInfo, i, type);
            }
            else {

                if(msMoudle.wz[id + ".img"]) {
                    this.onLifeLoaded2(time, id, lifeInfo, i, type);
                }
                else {
                    // console.log("life1级info" + id);
                    let res:any = [];
                    if(lifeInfo[type] == "n")
                        res.push({ url: "res/Map/Npc/" + id + ".img/index.html" });
                    else
                        res.push({ url: "res/Mob/" + id + ".img/index.html" });

                    msLoad.load(res).done(dlg => {
                        this.onLifeLoaded2(time, id, lifeInfo, i, type);
                    });
                }
            }
        }

        onLifeLoaded2(time:number, id:any, lifeInfo:any, i:number, type:any):void {

            if(lifeInfo[type] == "n") {
                this.addLife2(id, lifeInfo, i, type);
            }
            else {
                let cs:CssParser.Txt = new CssParser.Txt();
                if(!msMoudle.wz[id + ".img"]) {
                    let path:string = "";
                    if(lifeInfo[type] == "n") {
                        path = "res/Map/Npc/" + id + ".img/index.html";
                        if(msMoudle.findKeyFromArr(id, this.m_lifes_npc) == false) this.m_lifes_npc.push(id);
                    }
                    else {
                        path = "res/Mob/" + id + ".img/index.html";
                        if(msMoudle.findKeyFromArr(id, this.m_lifes_mob) == false) this.m_lifes_mob.push(id);
                    }
                    msMoudle.wz[id + ".img"] = msMoudle.loadWZ(cs, path, "ms");
                }
                if(time == 1) {
                    let npcInfo:any = msMoudle.wz[id + ".img"]["info"];
                    if(!npcInfo) {
                        // console.log(id);
                        return ;
                    }
                    let link = npcInfo["info.link"];
                    if(link) id = link;
                }
                //再次加载id
                if(msMoudle.wz[id + ".img"]) {
                    ////成功
                    this.addLife2(id, lifeInfo, i, type);
                }
                else {
                    // console.log("life不存在" + id);
                    if(time == 1) {
                        this.loadLifeById2(2, id, lifeInfo, i, type);
                    }
                    else {
                        console.log("life不存在" + id);
                    }
                }
            }
        }

        public linkLife2(i:number, lifeInfo:any, type:string) : void {
            let id = lifeInfo["life." + i + ".id"];         //通过id获取更详细的信息

            // console.log("###", id)

            /////这里可以预先弄life.wz 然后npc 和 mob 判断是否有，如果有就不load了
            //有可能是目录链接
            // if(msMoudle.wz[id + ".img"]) {
            //     let npcInfo:any = msMoudle.wz[id + ".img"]["info"];
            //     if(npcInfo) {
            //         let link = npcInfo["info.link"];
            //         if(link) id = link;
            //     }
            // }

            // if(this.mapid == "230010001.img")
                // id = "2400112"

            this.loadLifeById2(1, id, lifeInfo, i, type);
            // id = "2400112"//
            // console.log("mob----", id);
            // return ;
            // if(msMoudle.wz[id + ".img"]) {
            //     this.addLife2(id, lifeInfo, i, type);
            // }
            // else {
            //     console.log("life错误" + id)
            // }

        }

        addLife2(id:any, lifeInfo:any, i:number, type:any) : void {
            let x = lifeInfo["life." + i + ".x"];
            let y = lifeInfo["life." + i + ".y"];
            let fh = lifeInfo["life." + i + ".fh"];
            let cy = lifeInfo["life." + i + ".cy"];
            let rx0 = lifeInfo["life." + i + ".rx0"];       //移动区域
            let rx1 = lifeInfo["life." + i + ".rx1"];
            let f = lifeInfo["life." + i + ".f"];
            let mobTime = lifeInfo["life." + i + ".mobTime"];
            let z = this.m_foothold ? this.m_foothold.fh_zmap[fh] : -1;
            // console.log(fh, z)

            let lifeMsg:any = new Object();
            lifeMsg.id = id;
            lifeMsg.fh = fh;
            lifeMsg.cy = Number(cy);
            lifeMsg.x = Number(x);
            lifeMsg.y =  cy ? Number(cy) : Number(y);
            lifeMsg.rx0 = Number(rx0);
            lifeMsg.rx1 = Number(rx1);
            lifeMsg.f = f;
            lifeMsg.z = z;

            // if(msMoudle.mapP && msMoudle.mapP.m_id && msMoudle.isSyncMap(msMoudle.mapP.m_id) == false) mobTime = 0;
            // else {
            //     if(mobTime && mobTime > 3600) mobTime = 3600;
            // }
            mobTime = 0;

            lifeMsg.mobTime = mobTime ? Number(mobTime) : 0;
            // console.log("##lifeMsg.mobTime=", i, lifeMsg.mobTime, mobTime)
            if(lifeInfo[type] == "n") {
                // console.log("npc ---" + id);
                if(this.m_npcsAni.length <= 12) {
                    let tIndex:number = this.m_npcsAni.length;
                    this.m_npcsAni[tIndex] = new cssNpc();
                    this.m_npcsAni[tIndex].changeAll(this.m_parent, (id + ".img"), lifeMsg);
                }
            }
            else if(lifeInfo[type] == "m") {
                if(msMoudle.wz[id + ".img"]) {
                    let incInfo = msMoudle.wz[id + ".img"]["info"];
                    let maxHP = incInfo["info.maxHP"];
                    let pad:number = Number(incInfo["info.PADamage"]  || "0");
                    let pdd:number = Number(incInfo["info.PDDamage"]  || "0");
                    let mad:number = Number(incInfo["info.MADamage"]  || "0");
                    let mdd:number = Number(incInfo["info.MDDamage"]  || "0");
                    let speed:number = Number(incInfo["info.speed"] || "0");
                    let exp:number = Number(incInfo["info.exp"] || "0");
                    let noFlip = Number(incInfo["info.noFlip"] || "0");

                    let _mId = Number(this.mapid.split(".")[0]);
                    let initAtk = "";
                    //自由市场
                    if(_mId > 910000000 && _mId < 9100000023) {
                        let markInfo = msMoudle.maplejson["market_boss"];
                        if(markInfo) {
                            let mobInfos = markInfo[_mId - 910000001];
                            if(mobInfos && mobInfos[i]) {
                                let mobInfo = mobInfos[i];
                                maxHP = mobInfo[2];
                                pad = mad = mobInfo[3];
                                pdd = mdd = mobInfo[4];
                                exp = mobInfo[5];
                                initAtk = mobInfo[6];
                            }
                        }
                    }
                    //远征地图
                    for(let key in msMoudle.maplejson["yz_boss"]) {
                        if(msMoudle.maplejson["yz_boss"][key]) {
                            let mobInfo = msMoudle.maplejson["yz_boss"][key][0];
                            if(mobInfo) {
                                if(mobInfo[0] == id) {
                                    maxHP = mobInfo[2];
                                    pad = mad = mobInfo[3];
                                    pdd = mdd = mobInfo[4];
                                    exp = mobInfo[5];
                                    initAtk = mobInfo[6];
                                }
                            }
                        }
                    }

                    lifeMsg.maxhp = lifeMsg.hp = Number(maxHP);// + msMoudle.getRandValue(1, 0, 5);
                    lifeMsg.atk = pad > mad ? pad : mad;
                    lifeMsg.def = pdd > mdd ? pdd : mdd;

                    let tIndex:number = this.m_mobsAni.length;
                    this.m_mobsAni[tIndex] = new cssMob();
                    this.m_mobsAni[tIndex].m_hp = lifeMsg.hp;
                    this.m_mobsAni[tIndex].m_maxhp = lifeMsg.maxhp;
                    this.m_mobsAni[tIndex].m_atk = lifeMsg.atk;
                    this.m_mobsAni[tIndex].m_def = lifeMsg.def;
                    this.m_mobsAni[tIndex].m_speed = 100 + speed;
                    this.m_mobsAni[tIndex].m_noFlip = noFlip;
                    this.m_mobsAni[tIndex].m_exp = exp;
                    this.m_mobsAni[tIndex].m_initAtk = initAtk;
                    this.m_mobsAni[tIndex].m_isdead = false;
                    this.m_mobsAni[tIndex].m_multiSkill = true;
                    // this.m_mobsAni[tIndex].m_initAtk = "attack5";

                    if(Sync.mapInfo) {
                        let mobInfo: any = null;
                        for(let k=0; k<Sync.mapInfo.length; ++k) {
                            if(Sync.mapInfo[k] && Sync.mapInfo[k].index == i) {
                                mobInfo = Sync.mapInfo[k];
                                break;
                            }
                        }
                        if(mobInfo) {
                            // console.log("###has mobInfo, i=", i)
                            lifeMsg.x = mobInfo.x;
                            lifeMsg.y = mobInfo.y;
                            this.m_mobsAni[tIndex].m_hp = mobInfo.hp;
                            this.m_mobsAni[tIndex].m_dir = mobInfo.dir;
                        }
                    }

                    //扎昆
                    if(this.mapid == "280030100.img") {
                        this.m_mobsAni[tIndex].m_nametag_show = false;  //
                        // this.m_mobsAni[tIndex]._autofight = false;
                        this.m_mobsAni[tIndex]._autofight = true;
                        this.m_mobsAni[tIndex]._automove = false;
                        // this.m_mobsAni[tIndex].m_hp = this.m_mobsAni[tIndex].m_maxhp;

                        this.m_mobsAni[tIndex].m_isdead = true;
                    }
                    //黑龙
                    else if(this.mapid == "240060200.img") {
                        this.m_mobsAni[tIndex].m_nametag_show = false;  //
                        // this.m_mobsAni[tIndex]._autofight = false;
                        this.m_mobsAni[tIndex]._autofight = true;
                        this.m_mobsAni[tIndex]._automove = false;

                        this.m_mobsAni[tIndex].m_isdead = true;
                    }
                    else {
                        this.m_mobsAni[tIndex]._autofight = true;
                        if(this.m_mobsAni[tIndex].m_hp <= 0) {
                            this.m_mobsAni[tIndex].m_isdead = true;
                        }
                    }
                    // this.m_mobsAni[tIndex].m_hp = 1;
                    this.m_mobsAni[tIndex].m_index = i;
                    this.m_mobsAni[tIndex].changeAll(this.m_sp, (id + ".img"), lifeMsg, i);

                    //保存地图原始数据。前面赋值是为了保证changeAll里面执行正常
                    lifeMsg.x = Number(x);
                    lifeMsg.y =  cy ? Number(cy) : Number(y);

                    if(msMoudle.isBossMap(this.mapid)) {
                        this.bossAppear(tIndex);
                    }
                }
                else {
                    console.log("mobid不存在" + id)
                }
            }
        }

        private bossAppear(tIndex: number) {
            this.m_mobsAni[tIndex].m_isdead = false;
            this.m_mobsAni[tIndex].m_hp = this.m_mobsAni[tIndex].m_maxhp;
        }

        private updateMob() : void {
            let end:boolean = false;
            let aniList:any = this.m_mobsAni;
            let _:number = 0;
            let reward_mob:any = null;
            for(let i:number = 0; i < aniList.length; i++) {
                let mob = aniList[i];
                if(mob) {
                    //扎昆洞穴
                    if(msMoudle.mapP.m_id == "280030100.img") {
                        if(mob.m_isdead) {          //怪物死亡
                            if(mob.msgData.id == "8800000") {
                                reward_mob = mob;
                            }
                            _++;
                        }
                    }
                    //黑龙洞穴
                    else if(msMoudle.mapP.m_id == "240060200.img") {
                        if(mob.m_isdead) {          //怪物死亡
                            if(mob.msgData.id == "8810003") {
                                reward_mob = mob;
                            }
                            _++;
                        }
                    }
                    else if(msMoudle.mapP && (msMoudle.isAuMap(msMoudle.mapP.m_id) == false || msMoudle.guaji) && msMoudle.mapP.m_id != "000020000_gai.img") {
                        if(mob.m_isdead && mob.msgData.mobTime >= 0 && mob.msgData.mobTime < 1000) {
                            mob.m_dead_time += 1000;
                            let DeadTime = 10000;
                            // if(msMoudle.guaji) DeadTime *= 2;
                            if(mob.m_dead_time > DeadTime) {
                                mob.m_isdead = false;
                                mob.m_dead_time = 0;
                                mob.m_nametag_sp.visible = true;
                                mob.m_down_t = 0;
                                mob.m_up_t = 0;
                                ///////////////////////////////刷怪
                                //重置Ai状态
                                mob.AiData.timeN = 0;
                                mob.AiData.actionN = "stand";
                                mob.AiData.dirN = 1;
                                // mob.m_hp = msMoudle.getHp();
                                // mob.m_maxhp = msMoudle.getHp();

                                // let incInfo:any = msMoudle.wz[mob.m_id]["info"];
                                // let maxHP = incInfo["info.maxHP"];
                                // let pad:number = Number(incInfo["info.PADamage"]  || "0");
                                // let pdd:number = Number(incInfo["info.PDDamage"]  || "0");
                                // let mad:number = Number(incInfo["info.MADamage"]  || "0");
                                // let mdd:number = Number(incInfo["info.MDDamage"]  || "0");

                                mob.m_hp = mob.m_maxhp;//Number(maxHP);
                                // mob.m_maxhp = Number(maxHP);
                                // mob.m_atk = pad > mad ? pad : mad;
                                // mob.m_def = pdd > mdd ? pdd : mdd;

                                mob.hpBar.visible = false;
                                // mob.m_nametag_sp.addChild(mob.hpBar)
                                mob.hpBar.value = 1;
                                mob.m_sp.visible = true;
                                //设置mob初始状态/位置
                                mob.changeByName("stand", 0);
                                mob.setPos(mob.msgData.x, mob.msgData.y);
                            }
                        }
                    }
                    else {
                        if(mob.m_isdead) {          //怪物死亡
                            _++;
                        }
                    }
                }
            }
            if(_ == aniList.length && aniList.length > 0) {
                if(msMoudle.guaji == false && msMoudle.isAuMap(this.mapid)) {
                    if(msMoudle.isBoss) {
                        if(ms.cur_bossguanka == ms.bossguanka) ms.bossguanka++;
                    }
                    else {
                        if(ms.cur_guanka == ms.guanka) ms.guanka++;
                    }
                    end = true;
                    Laya.timer.clear(this, this.updateMob);
                    ui.show(app.battle.BattleRewardDlg);
                    return ;
                }
                //扎昆
                else if(msMoudle.mapP.m_id == "280030100.img") {
                    if(reward_mob) {
                        reward_mob.m_candie = true;
                        reward_mob.changeByName("die1", 1);////
                        end = true;
                        Laya.timer.clear(this, this.updateMob);
                    }
                }
                //黑龙
                else if(msMoudle.mapP.m_id == "240060200.img") {
                    if(!msMoudle.isBossMap()) {
                        if(reward_mob) {
                            reward_mob.m_candie = true;
                            reward_mob.changeByName("die1", 1);////
                            end = true;
                            Laya.timer.clear(this, this.updateMob);
                        }
                    }
                }
            }

            if(end == false)
                Laya.timer.once(1000, this, this.updateMob);
        }

        // public updateHero(m_sp:any) : void {
        //     if(msMoudle.isPvp) {
        //         ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "王者之地";
        //     }
        //     for(let i:number = 0; i < (ms.pvpnandu); i++) {
        //         let tIndex:number = this.m_mobsAni.length;
        //         this.m_mobsAni[tIndex] = new cssCharacter();
        //         let E:any = {};
        //         if(i == 0) {
        //             // let _rnk = msMoudle.getRandValue(0, 0, msMoudle.characterjson.length);
        //             let _rnk = ms.pvpTeam[ms.pvpguanka].head;
        //             let data = msMoudle.characterjson[_rnk];
        //             E.weapon = data.weapon;
        //             E.fweapon = data.fweapon;
        //             E.cap = data.cap;
        //             E.longcoat = data.longcoat;
        //             this.m_mobsAni[tIndex].m_name = msMoudle.getRandomName();
        //             this.m_mobsAni[tIndex].m_pvpid = -1;
        //         }
        //         else {
        //             let _rnk = ms.pvpTeam[ms.pvpguanka].player[i - 1];
        //             let data = msMoudle.herojson[_rnk];
        //             E.weapon = data.weapon;
        //             E.fweapon = data.fweapon;
        //             E.cap = data.cap;
        //             E.longcoat = data.longcoat;
        //             this.m_mobsAni[tIndex].m_name = data.name;
        //             // this.m_mobsAni[tIndex].m_pvpid = _rnk;
        //             this.m_mobsAni[tIndex].m_pvpid = -1;
        //         }
        //         let lifeMsg:any = new Object();
        //         this.m_mobsAni[tIndex].msgData = lifeMsg;
        //         this.m_mobsAni[tIndex]._autofight = true;
        //         this.m_mobsAni[tIndex]._pvp = true;
        //         this.m_mobsAni[tIndex].m_lv = ms.pvplv;

        //         this.m_mobsAni[tIndex].m_hp = ms.pvplv * 50 * 5;
        //         this.m_mobsAni[tIndex].m_maxhp = ms.pvplv * 50 * 5;
        //         this.m_mobsAni[tIndex].m_minatk = 10 + Math.round(ms.pvplv * 3.5); //
        //         this.m_mobsAni[tIndex].m_maxatk = 10 + Math.round(ms.pvplv * 3.5); //
        //         this.m_mobsAni[tIndex].m_def = ms.pvplv;
        //         this.m_mobsAni[tIndex].m_baoji = 5;
        //         this.m_mobsAni[tIndex].m_miss = 5;
        //         this.m_mobsAni[tIndex].m_target = 100;

        //         // this.m_skill_1 = otherheroservedata[this.teamIndex].Skill_1;

        //         this.m_mobsAni[tIndex].m_special = true;
        //         let rnk:number =msMoudle.getRandValue(50, 0, 700);
        //         this.m_mobsAni[tIndex].changeAll(m_sp, E, msMoudle.char.m_x + 400 - rnk, msMoudle.char.m_y + 150);
        //     }

        //     //刷怪定时器
        //     Laya.timer.once(1000, this, ()=> {
        //         Laya.timer.loop(1000, this, this.updateMob);
        //     });
        // }

        ///天梯赛
        public updatePvPHero(m_sp:any) : void {
            let P = this;
            if(msMoudle.isPvp) {
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.guanka.text = "荣耀之地";
            }

            //获取对手信息
            let message = new Net.Message();
            message.xieyi = 301 + ms._dpip;
            message.msdata = { "user": msMoudle.pvpID, "password":"123456" };
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                if(data["code"] == 0) {
                    let herodata:any = JSON.parse(data["msdata"]._context);
                    // console.log("######", herodata)
                    // let herodata = null;
                    P.getByServer(herodata, m_sp, P);
                }
            }});
        }
        //
        public getByServer(herodata:any, m_sp:any, P:any) : void {
            // console.log();
            let kaigua = false;
            if(kaigua || msMoudle.xianzhiTest(herodata.user) == true) {// ||
                // Laya.timer.once(1000, P, ()=> {
                    Laya.timer.once(3000, P, P.updateMob);
                // });
            }
            else {
                let hdata:app.model.CharStatus = new app.model.CharStatus();
                hdata.ResetAll();
                let otherherodata:Array<app.model.HeroStatus> = [];
                let otherheroservedata:Array<app.model.HeroStatus> = [];
                if(herodata) {
                    if(herodata.herodata != null) {
                        // hdata = herodata.herodata;
                        ms.updData(hdata, herodata.herodata);
                        //主角装备
                        hdata.EquipSlots = [];
                        for(let i:number = 0; i < herodata.herodata.EquipSlots.length; i++) {
                            if(herodata.herodata.EquipSlots[i]) {
                                hdata.EquipSlots[i] = new app.model.Equip();
                                hdata.EquipSlots[i].ResetAll();
                                ms.eqpData(hdata.EquipSlots[i], herodata.herodata.EquipSlots[i]);
                            }
                        }
                        hdata.BagSlots = [];
                    }
                    if(herodata.otherherodata != null) {
                        otherherodata = [];
                        for(let i:number = 0; i < herodata.otherherodata.length; i++) {
                            otherherodata[i] = new app.model.HeroStatus();
                            otherherodata[i].ResetAll();
                            ms.updData(otherherodata[i], herodata.otherherodata[i]);
                        }
                    }
                    if(herodata.otherheroservedata != null) {
                        otherheroservedata = [];
                        for(let i:number = 0; i < herodata.otherheroservedata.length; i++) {
                            otherheroservedata[i] = new app.model.HeroStatus();
                            otherheroservedata[i].ResetAll();
                            ms.updData(otherheroservedata[i], herodata.otherheroservedata[i]);
                        }
                    }
                    let tamingmob:any = new Object();
                    if(herodata.tamingmob != null) tamingmob = herodata.tamingmob;
                    else {
                        tamingmob.openid = 0;
                        tamingmob.tamingmob1 = "N";
                        tamingmob.tamingmob2 = "N";
                    }
                    let pet:any = new Object();
                    if(herodata.pet != null) pet = herodata.pet;
                    else {
                        pet.openid = 0;
                        pet.id = "N";
                    }
                    let ring:any = new Object();
                    if(herodata.ring != null) ring = herodata.ring;
                    else {
                        ring.openid = 0;
                        ring.id = "N";
                    }
                    let chair:any = new Object();
                    if(herodata.chair != null) chair = herodata.chair;
                    else {
                        chair.openid = 0;
                        chair.id = "N";
                    }
                    // let fashion:any = new Object();
                    // if(herodata.fashion != null) fashion = herodata.fashion;
                    // else {
                    //     fashion.openid = 0;
                    //     fashion.id = "N";
                    // }

                    // console.log(hdata);
                    // console.log(otherherodata);
                    // console.log(tamingmob);
                    // console.log(pet);
                    // console.log(fashion);

                    let p_hp = 0;
                    //坐骑
                    let p_atkspeed = 0;
                    let p_walkspeed = 0;
                    //宠物
                    let p_def = 0;
                    let p_atk = 0;         //0.25
                    //时装
                    let p_miss = 0;        //25
                    let p_target = 0;
                    let p_baoji = 0;
                    //坐骑
                    if(tamingmob) {
                        if(tamingmob.openid != 0) {
                            for(let key in msMoudle.payjson) {
                                if(msMoudle.payjson[key].id + ".img" == tamingmob.tamingmob1) {
                                    let ___ = msMoudle.payjson[key];
                                    p_atkspeed = Number(___.atkspeed) / 100;
                                    p_walkspeed = Number(___.walkspeed) / 100;
                                    p_baoji = Number(___.baoji);
                                    break;
                                }
                            }
                        }
                    }
                    //宠物
                    if(pet) {
                        if(pet.openid != 0) {
                            for(let key in msMoudle.payjson) {
                                if(msMoudle.payjson[key].id + ".img" == pet.id) {
                                    let ___ = msMoudle.payjson[key];
                                    p_def = Number(___.def) / 100;
                                    p_atk = Number(___.atk) / 100;
                                    break;
                                }
                            }
                        }
                    }
                    //戒指
                    if(ring) {
                        if(ring.openid != 0) {
                            for(let key in msMoudle.payjson) {
                                if(msMoudle.payjson[key].id == ring.id) {
                                    let ___ = msMoudle.payjson[key];
                                    p_baoji = Number(___.baoji);
                                    p_miss = Number(___.miss);
                                    p_target = Number(___.target);
                                    break;
                                }
                            }
                        }
                    }
                    //椅子
                    if(chair) {
                        if(chair.openid != 0) {
                            for(let key in msMoudle.payjson) {
                                if(msMoudle.payjson[key].id== chair.id) {
                                    let ___ = msMoudle.payjson[key];
                                    p_hp += Number(___.hp) / 100;
                                    break;
                                }
                            }
                        }
                    }
                    //转生
                    if(hdata.ZS > 0) {
                        p_hp += 0.01 * hdata.ZS;
                        p_def += 0.01 * hdata.ZS;
                        p_atk += 0.01 * hdata.ZS;
                    }
                    //修炼
                    for(let i:number = 0; i < hdata.XL.length; i++) {
                        if(hdata.XL[i] > 0) {
                            if(i == 0) {
                                p_hp += 0.01 * hdata.XL[i];
                            }
                            else if(i == 1) {
                                p_atk += 0.01 * hdata.XL[i];
                            }
                            else if(i == 2) {
                                p_def += 0.01 * hdata.XL[i];
                            }
                            else if(i == 3) {
                                p_target += 1 * hdata.XL[i];
                            }
                            else if(i == 4) {
                                p_miss += 1 * hdata.XL[i];
                            }
                            else if(i == 5) {
                                p_baoji += 1 * hdata.XL[i];
                            }
                            else if(i == 6) {
                                p_atkspeed += 0.01 * hdata.XL[i];
                                p_walkspeed += 0.01 * hdata.XL[i];
                            }
                        }
                    }

                    //收集宠物
                    if(herodata.petbagsdata.length > 0) {
                        for(let i:number = 0; i < herodata.petbagsdata.length; i++) {
                            if(i == 0) p_hp += 0.01;
                            else if(i == 1) p_atk += 0.01;
                            else if(i == 2) p_def += 0.01;
                            else if(i == 3) p_hp += 0.01;
                            else if(i == 4) p_atk += 0.01;
                            else if(i == 5) p_def += 0.01;
                            else if(i == 6) p_hp += 0.01;
                            else if(i == 7) p_atk += 0.01;
                            else if(i == 8) p_def += 0.01;
                            else if(i == 9) p_hp += 0.01;
                            else if(i == 10) p_atk += 0.01;
                            else if(i == 11) p_def += 0.01;
                        }
                    }
                    //收集坐骑
                    if(herodata.tamingmobbagsdata.length > 0) {
                        p_baoji += herodata.tamingmobbagsdata.length;
                    }
                    //职业
                    for(let i:number = 0; i < herodata.m_job.length; i++) {
                        if(herodata.m_job[i] != "") {
                            if(i == 0) p_atk += 0.01;
                            else if(i == 1) {}
                            else if(i == 2) {
                                p_atkspeed += 0.01;
                                p_walkspeed += 0.01;
                            }
                            else if(i == 3) p_def += 0.01;
                            else if(i == 4) p_atk += 0.01;
                            else if(i == 5) p_hp += 0.01;
                            else if(i == 6) p_atk += 0.01;
                            else if(i == 7) p_hp += 0.01;
                            else if(i == 8) p_def += 0.01;
                            else if(i == 9) {
                                p_atkspeed += 0.01;
                                p_walkspeed += 0.01;
                            }
                            else if(i == 10) p_def += 0.01;
                            else if(i == 11) p_def += 0.01;
                            else if(i == 12) p_atk += 0.01;
                            else if(i == 13) p_hp += 0.01;
                            else if(i == 14) p_atk += 0.01;
                            else if(i == 15) p_atk += 0.01;
                            else if(i == 16) p_atk += 0.01;
                            else if(i == 17) p_def += 0.01;
                            else if(i == 18) p_atk += 0.01;
                            else if(i == 19) p_atk += 0.01;
                            else if(i == 20) p_atk += 0.01;
                            else if(i == 21) p_hp += 0.01;
                            else if(i == 22) p_atk += 0.01;
                            else if(i == 23) p_hp += 0.01;
                            else if(i == 24) p_def += 0.01;
                            else if(i == 25) p_def += 0.01;
                            else if(i == 26) p_def += 0.01;
                            else if(i == 27) p_atk += 0.01;
                            else if(i == 28) p_atk += 0.01;
                            else if(i == 29) p_hp += 0.01;
                            else if(i == 30) p_def += 0.01;
                            else if(i == 31) p_atk += 0.01;
                            else if(i == 32) p_atk += 0.01;
                            else if(i == 33) p_atk += 0.01;
                            else if(i == 34) p_atk += 0.01;
                            else if(i == 35) p_hp += 0.01;
                            else if(i == 36) p_def += 0.01;
                            else if(i == 37) {
                                p_atkspeed += 0.01;
                                p_walkspeed += 0.01;
                            }
                            else if(i == 38) p_def += 0.01;
                        }
                    }
                    /////
                    for(let i:number = 0; i < otherherodata.length + 1; i++) {

                        let tIndex:number = P.m_mobsAni.length;
                        P.m_mobsAni[tIndex] = new cssCharacter();
                        let lifeMsg:any = new Object();
                        P.m_mobsAni[tIndex].msgData = lifeMsg;
                        P.m_mobsAni[tIndex]._autofight = true;
                        P.m_mobsAni[tIndex]._pvp = true;

                        P.m_mobsAni[tIndex].p_hp = p_hp;
                        //坐骑
                        P.m_mobsAni[tIndex].p_atkspeed = p_atkspeed;
                        P.m_mobsAni[tIndex].p_walkspeed = p_walkspeed;
                        //宠物
                        P.m_mobsAni[tIndex].p_def = p_def;
                        P.m_mobsAni[tIndex].p_atk = p_atk;         //0.25
                        //时装
                        P.m_mobsAni[tIndex].p_miss = p_miss;        //25
                        P.m_mobsAni[tIndex].p_target = p_target;
                        P.m_mobsAni[tIndex].p_baoji = p_baoji;

                        // console.log(otherherodata[i]);

                        let E:any = {};
                        if(i == 0) {
                            let _rnk = hdata.Sex;
                            let data = msMoudle.characterjson[_rnk];
                            E.weapon = hdata.EquipSlots[0] ? (hdata.EquipSlots[0].id + ".img") : data.testweapon;
                            E.fweapon = data.fweapon;
                            // E.cap = data.cap;
                            // E.longcoat = data.longcoat;
                            // if(fashion) {
                            //     if(fashion.id != "N") E.longcoat = fashion.id;
                            // }

                            E.body = "00002000.img";
                            E.head = "00012000.img";
                            if(herodata.selbody[herodata.selHero] != "N" && herodata.selbody[herodata.selHero]) {
                                E.body = herodata.selbody[herodata.selHero];
                                E.head = "000" + (Number(herodata.selbody[herodata.selHero].split(".")[0]) + 10000) + ".img";
                            }
                            E.face = "00020012.img";
                            if(herodata.selface[herodata.selHero] != "N")
                                E.face = herodata.selface[herodata.selHero];
                            E.hair = "00030020.img";
                            if(herodata.selhair[herodata.selHero] != "N")
                                E.hair = herodata.selhair[herodata.selHero];

                            // let eSlots = herodata.herodata.FlionSlots;
                            // if(herodata.selHero == 0) {}
                            // else if(herodata.selHero == 1) {eSlots = herodata.herodata.EquipSlots3}
                            // else if(herodata.selHero == 2) {eSlots = herodata.herodata.EquipSlots4}
                            // else if(herodata.selHero == 3) {eSlots = herodata.herodata.EquipSlots5}
                            // else if(herodata.selHero == 4) {eSlots = herodata.herodata.EquipSlots6}
                            // else if(herodata.selHero == 5) {eSlots = herodata.herodata.EquipSlots7}
                            // else if(herodata.selHero == 6) {eSlots = herodata.herodata.EquipSlots8}
                            // else if(herodata.selHero == 7) {eSlots = herodata.herodata.EquipSlots9}
                            // else if(herodata.selHero == 8) {eSlots = herodata.herodata.EquipSlots10}
                            // else if(herodata.selHero == 9) {eSlots = herodata.herodata.EquipSlots11}
                            // else if(herodata.selHero == 10) {eSlots = herodata.herodata.EquipSlots12}
                            // else if(herodata.selHero == 11) {eSlots = herodata.herodata.EquipSlots13}
                            // else if(herodata.selHero == 12) {eSlots = herodata.herodata.EquipSlots14}
                            // else if(herodata.selHero == 13) {eSlots = herodata.herodata.EquipSlots15}
                            // else if(herodata.selHero == 14) {eSlots = herodata.herodata.EquipSlots16}
                            // else if(herodata.selHero == 15) {eSlots = herodata.herodata.EquipSlots17}
                            // else if(herodata.selHero == 16) {eSlots = herodata.herodata.EquipSlots18}
                            // else if(herodata.selHero == 17) {eSlots = herodata.herodata.EquipSlots19}
                            // else if(herodata.selHero == 18) {eSlots = herodata.herodata.EquipSlots20}
                            // else if(herodata.selHero == 19) {eSlots = herodata.herodata.EquipSlots21}
                            // else if(herodata.selHero == 20) {eSlots = herodata.herodata.EquipSlots22}
                            // else if(herodata.selHero == 21) {eSlots = herodata.herodata.EquipSlots23}
                            // else if(herodata.selHero == 22) {eSlots = herodata.herodata.EquipSlots24}
                            // else if(herodata.selHero == 23) {eSlots = herodata.herodata.EquipSlots25}
                            // else if(herodata.selHero == 24) {eSlots = herodata.herodata.EquipSlots26}
                            // else if(herodata.selHero == 25) {eSlots = herodata.herodata.EquipSlots27}
                            // else if(herodata.selHero == 26) {eSlots = herodata.herodata.EquipSlots28}
                            // else if(herodata.selHero == 27) {eSlots = herodata.herodata.EquipSlots29}
                            // else if(herodata.selHero == 28) {eSlots = herodata.herodata.EquipSlots30}
                            // else if(herodata.selHero == 29) {eSlots = herodata.herodata.EquipSlots31}
                            // else if(herodata.selHero == 30) {eSlots = herodata.herodata.EquipSlots32}
                            // else if(herodata.selHero == 31) {eSlots = herodata.herodata.EquipSlots33}
                            // else if(herodata.selHero == 32) {eSlots = herodata.herodata.EquipSlots34}
                            // else if(herodata.selHero == 33) {eSlots = herodata.herodata.EquipSlots35}
                            // else if(herodata.selHero == 34) {eSlots = herodata.herodata.EquipSlots36}
                            // else if(herodata.selHero == 35) {eSlots = herodata.herodata.EquipSlots37}
                            // else if(herodata.selHero == 36) {eSlots = herodata.herodata.EquipSlots38}
                            // else if(herodata.selHero == 37) {eSlots = herodata.herodata.EquipSlots39}
                            // else if(herodata.selHero == 38) {eSlots = herodata.herodata.EquipSlots40}
                            // else if(herodata.selHero == 39) {eSlots = herodata.herodata.EquipSlots41}
                            // else if(herodata.selHero == 40) {eSlots = herodata.herodata.EquipSlots42}

                            E.coat = "01040002.img";
                            E.pants = "01060002.img";
                            E.weapon = msMoudle.getWeaponByJob(herodata.selHero);
                            E.shoes = "N";
                            E.glove = "N";
                            //扎昆头盔类似gm帽子改配置zmap
                            E.cap = "N";//01002357.img 01002140 01002017
                            E.cape = "N";

                            let eSlots = herodata.herodata.FlionSlots[herodata.selHero];
                            // console.log(eSlots);

                            if(eSlots) {
                                E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                                E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";

                                E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                                E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                                //扎昆头盔类似gm帽子改配置zmap
                                E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                                E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                            }
                            // E.longcoat = "N";

                            P.m_mobsAni[tIndex].m_name = hdata.Name;
                            P.m_mobsAni[tIndex].m_lv = hdata.Lv;
                            P.m_mobsAni[tIndex].m_pvpid = -1;

                            P.m_mobsAni[tIndex].m_hp = hdata.MaxHP.GetSum() + 10 * hdata.Lv;
                            P.m_mobsAni[tIndex].m_maxhp = P.m_mobsAni[tIndex].m_hp
                            let pad:any = hdata.CalcAttackRange();
                            P.m_mobsAni[tIndex].m_minatk = pad.minatk;
                            P.m_mobsAni[tIndex].m_maxatk = pad.maxatk;
                            P.m_mobsAni[tIndex].m_def = hdata.PDDamage.GetSum();
                            P.m_mobsAni[tIndex].m_baoji = hdata.CriticalRate.GetSum();
                            P.m_mobsAni[tIndex].m_miss = hdata.Evasion.GetSum();
                            P.m_mobsAni[tIndex].m_target = hdata.Accurate.GetSum();

                            // console.log("生命" + p_hp)
                            // console.log("攻击" + p_atk)
                            // console.log("防御" + p_def)
                            // console.log("命中" + p_target)
                            // console.log("闪避" + p_miss)
                            // console.log("暴击" + p_baoji)
                            // console.log("攻速" + p_atkspeed)
                            // console.log("移速" + p_walkspeed)
                        }
                        else {
                            for(let j:number = 0; j < otherheroservedata.length; j++) {
                                if(otherheroservedata[j].openid == otherherodata[i-1].openid) {
                                    let _rnk = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
                                    for(let key in msMoudle.herojson) {
                                        if(msMoudle.herojson[key].id == otherherodata[i-1].id) {
                                            _rnk = key;
                                            break;
                                        }
                                    }
                                    let data = msMoudle.herojson[_rnk];
                                    E.weapon = data.weapon;
                                    E.fweapon = data.fweapon;
                                    E.cap = data.cap;
                                    E.longcoat = data.longcoat;

                                    if(otherheroservedata[j].juexing > 0)
                                        E.cape = data.cape;
                                    P.m_mobsAni[tIndex].m_lv = otherheroservedata[j].Lv;
                                    P.m_mobsAni[tIndex].m_name = data.name;
                                    P.m_mobsAni[tIndex].m_pvpid = _rnk;

                                    P.m_mobsAni[tIndex].m_hp = Math.round(otherheroservedata[j].MaxHP.GetSum());
                                    P.m_mobsAni[tIndex].m_maxhp = Math.round(P.m_mobsAni[tIndex].m_hp);
                                    P.m_mobsAni[tIndex].m_minatk = Math.round(otherheroservedata[j].PADamage.GetSum());
                                    P.m_mobsAni[tIndex].m_maxatk = Math.round(otherheroservedata[j].PADamage.GetSum());
                                    P.m_mobsAni[tIndex].m_def = Math.round(otherheroservedata[j].PDDamage.GetSum());
                                    P.m_mobsAni[tIndex].m_baoji = Math.round(otherheroservedata[j].CriticalRate.GetSum());
                                    P.m_mobsAni[tIndex].m_miss = Math.round(otherheroservedata[j].Evasion.GetSum());
                                    P.m_mobsAni[tIndex].m_target = Math.round(otherheroservedata[j].Accurate.GetSum());

                                    ///防止某些号没有更新
                                    if(herodata.herodata.LH) {
                                        P.m_mobsAni[tIndex].m_hp += 200 * (herodata.herodata.LH);
                                        P.m_mobsAni[tIndex].m_maxhp += 200 * (herodata.herodata.LH);
                                        P.m_mobsAni[tIndex].m_minatk += 100 * (herodata.herodata.LH);
                                        P.m_mobsAni[tIndex].m_maxatk += 100 * (herodata.herodata.LH);
                                        P.m_mobsAni[tIndex].m_def += 10 * (herodata.herodata.LH);
                                    }

                                    break;
                                }
                            }
                        }

                        P.m_mobsAni[tIndex].m_hp = Math.round((1 + p_hp) * P.m_mobsAni[tIndex].m_hp);
                        P.m_mobsAni[tIndex].m_maxhp = P.m_mobsAni[tIndex].m_hp;

                        P.m_mobsAni[tIndex].m_special = true;
                        let rnkX:number = Number(this.mapright) - msMoudle.getRandValue(80, 0, 200);
                        P.m_mobsAni[tIndex].changeAll(m_sp, E, rnkX, msMoudle.char.m_y);
                    }
                    //刷怪定时器
                    // Laya.timer.once(1000, P, ()=> {
                        Laya.timer.once(3000, P, P.updateMob);
                    // });
                }
            }
        }

        ////
    }

}