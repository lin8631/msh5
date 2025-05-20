/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.battle {

    import cssMsg = MsgRole.Msg;

    export class BattleRewardDlg extends ui.battle.BattleRewardDlgUI implements ui.battle.IBattleRewardDlgUI {
        public static className = "app.battle.BattleRewardDlg";
        private m_data:Array<any> = [];
        private m_index:number = 0;
        private m_msg:cssMsg;
        private rnkReward:Array<any> = [];

        constructor(params:any){
            super();

            this.m_data = params;
        }

        onInitialize(){

            let design_width = (600 / Laya.Browser.height) * Laya.Browser.width;///这个没问题
            let design_height = (600 / Laya.Browser.height) * Laya.Browser.height;

            this.x = 0;
            this.m_msg = new cssMsg();
            this.updateData();
        }

        onClose() {

        }

        onBtnCClick(e: Laya.Event): void {
            //返回主城
            if(msMoudle.mapP.m_id == "101000101.img") {
                msMoudle._(); msMoudle.updateJiFen(250);
                ms.tiaogk = 1;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "101000104.img") {
                msMoudle._(); msMoudle.updateJiFen(500);
                ms.tiaogk = 2;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "105040311.img") {
                msMoudle._(); msMoudle.updateJiFen(750);
                ms.tiaogk = 3;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "105040313.img") {
                msMoudle._(); msMoudle.updateJiFen(1000);
                ms.tiaogk = 4;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "105040316.img") {
                msMoudle._(); msMoudle.updateJiFen(1250);
                ms.tiaogk = 5;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "103000902.img") {
                msMoudle._(); msMoudle.updateJiFen(1500);
                ms.tiaogk = 6;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "103000905.img") {
                msMoudle._(); msMoudle.updateJiFen(1750);
                ms.tiaogk = 7;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "103000909.img") {
                msMoudle._(); msMoudle.updateJiFen(2000);
                ms.tiaogk = 8;
                ms.saveServer();
            }
            else if(msMoudle.mapP.m_id == "280020001.img") {
                msMoudle._(); msMoudle.updateJiFen(2250);
                ms.tiaogk = 9;
                ms.saveServer();
            }

            if(msMoudle.isTiaoMap(msMoudle.mapP.m_id)) {
                msMoudle.tiaotiao_map = "910000000.img"
                ms.lastmap = "910000000.img"
            }

            // else {
            msMoudle.MapInit();
            msMoudle.gameP.gotoScene(ms.lastmap);
            // }
            msMoudle.boss_win = false;
            this.close();
        }

        updateData(){
            // this.lstReward.vScrollBarSkin = "";


            ///随机奖励
            let rnkReward:Array<any> = [];
            //没有体力了
            // if(ms.huoli <= 0) {
            //     rnkReward = [];
            //     this.lstReward.dataModel = rnkReward;
            //     this.lstReward.mouseThrough = true;
            //     this.btnC.graphics.drawRect( -(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            //     this.btnC.alpha = 0.8;
            //     return ;
            // }

            //跳跳
            if(msMoudle.isTiaoTiao) {
                console.log("TiaoTiao");
                ms.d600++;
                rnkReward = this.TiaoFight();
            }
            //BOSS
            else if(msMoudle.isBoss) {
                console.log("Boss")
                ms.d604++;
                rnkReward = this.BossFight();
                let getlv:number = msMoudle.getLvJinBi(ms.cur_bossguanka);
                getlv *= 10;
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(getlv);

                ms.test_lingzhu++;     //领主次数
            }
            //副本
            // else if(msMoudle.isFuben) {
            //     console.log("Fuben")
            //     ms.d603++;
            //     rnkReward = this.FubenFight();
            //     let getlv:number = msMoudle.getLvJinBi(ms.cur_fuben);
            //     getlv *= 10;
            //     ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(getlv);

            //     ms.test_fuben++;
            // }
            //竞技场
            else if(msMoudle.isPvp) {
                console.log("Pvp")
                // if(!msMoudle.specialPvp) {
                //     ms.d602++;
                //     ms.test_pvp++;
                // }
                rnkReward = this.PvpFight();
                let getlv:number = msMoudle.getLvJinBi(ms.herodata.Lv);
                // getlv *= 10;
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(getlv);

                ///没有充钱的绝对上不了
                if(msMoudle.specialPvp && ms.test_cz >= 10) {
                    let message = new Net.Message();
                    message.xieyi = 302 + ms._dpip;
                    //可能是因为json的问题，回头试试转成string试试
                    message.msdata = {'user': ms._user, 'lv': ms.herodata.Lv, 'name': ms.herodata.Name, 'sex': ms.herodata.Sex, 'msg': ms.herodata.ZS + "/" + ms.max_nvshen + "/" + ms.max_sishen,
                    'password':'123456','duishou':msMoudle.pvpID};
                    msMoudle.wsocket.sendFastMsg({param: message, success: (data: any) => {
                        if(data["code"] == 0) {}
                    }});
                }

                // let message = new Net.Message();
                // message.xieyi = 105 + ms._dpip;
                // message.msdata = { 'user': 'Susake', 'password':'123456'};
                // msMoudle.wsocket.requestApi(message).done(data => {
                //     if(data["code"] == 0) {}
                // });

            }
            //世界BOSS
            else if(msMoudle.isWorldBoss) {
                console.log("WorldBoss")
                if(msMoudle.WorldBossLv == 80) {
                    ms.d605++;
                }
                else if(msMoudle.WorldBossLv == 100) {
                    ms.d606++;
                }
                else if(msMoudle.WorldBossLv == 120) {
                    ms.d607++;
                }
                else if(msMoudle.WorldBossLv == 140) {
                    ms.d608++;
                }
                rnkReward = this.WorldBossFight();
                let getlv:number = msMoudle.getLvJinBi(ms.guanka);
                getlv *= 10;
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(getlv);

                ms.test_boss++;        //boss次数
            }
            //关卡
            else {
                // console.log("guanka")
                ms.d601++;
                rnkReward = this.PuTongFight();
                let getlv:number = msMoudle.getLvJinBi(ms.cur_guanka);
                if(ms.cur_guanka < 30) getlv *= 20;
                else getlv *= 10;
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(getlv);

                ms.test_guanka++;      //关卡次数
            }

            this.lstReward.dataModel = rnkReward;
            this.lstReward.mouseThrough = true;

            this.btnC.graphics.drawRect( -(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.btnC.alpha = 0.8;
        }

        onLstRewardCellClick(e: Laya.Event, index: number): void {
            if(msMoudle.isEquip(this.rnkReward[index].itemid)) this.m_msg.equipLoadShow(this.rnkReward[index].itemid);
            else this.m_msg.itemShow(Number(this.rnkReward[index].itemid));
        }

        //上面的金币和经验有问题
        public PuTongFight() : any {
            for(let i:number = 0; i < 1; i++) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                //升星石
                this.rnkReward[tIndex].img = "homeland/04001017.info.icon.png";
                this.rnkReward[tIndex].itemid = "700000000";
                this.rnkReward[tIndex].num = 1;
                this.rnkReward[tIndex].name = "升星石";
                this.rnkReward[tIndex].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao1(1)
            }
            //金币
            if(true) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                this.rnkReward[tIndex].img = "homeland/02022995.info.icon.png";
                this.rnkReward[tIndex].itemid = "9000000";
                this.rnkReward[tIndex].num = 100;
                this.rnkReward[tIndex].name = "金币";
                this.rnkReward[tIndex].pinzhi = 1;
                msMoudle._(); msMoudle.updateJinBi(this.rnkReward[tIndex].num);
            }
            this.MoveReward();
            return this.rnkReward;
        }
        //
        public TiaoFight() : any {
            let getNum = msMoudle.getRandValue(5, 0, 10);
            for(let i:number = 0; i < 1; i++) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                //觉醒石
                this.rnkReward[tIndex].img = "homeland/04001129.info.icon.png";
                this.rnkReward[tIndex].itemid = "800000000";
                this.rnkReward[tIndex].num = getNum;
                this.rnkReward[tIndex].name = "觉醒石";
                this.rnkReward[tIndex].pinzhi = 6;
                msMoudle._(); msMoudle.updateJueXing1(getNum);
            }
            for(let i:number = 0; i < 1; i++) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                //修炼石
                this.rnkReward[tIndex].img = "homeland/04001190.info.icon.png";
                this.rnkReward[tIndex].itemid = "600000002";
                this.rnkReward[tIndex].num = getNum;
                this.rnkReward[tIndex].name = "修炼石";
                this.rnkReward[tIndex].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao2(getNum);
            }
            for(let i:number = 0; i < 1; i++) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                //升星石
                this.rnkReward[tIndex].img = "homeland/04001017.info.icon.png";
                this.rnkReward[tIndex].itemid = "700000000";
                this.rnkReward[tIndex].num = getNum;
                this.rnkReward[tIndex].name = "升星石";
                this.rnkReward[tIndex].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao1(getNum);
            }
            //枫叶
            if(true) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                this.rnkReward[tIndex].img = "homeland/02028044.info.icon.png";
                this.rnkReward[tIndex].itemid = "1234561";
                this.rnkReward[tIndex].num = 50;
                this.rnkReward[tIndex].name = "枫叶";
                this.rnkReward[tIndex].pinzhi = 5;
                msMoudle._(); msMoudle.updateRongYu(this.rnkReward[tIndex].num);
            }
            //装备
            for(let i:number = 1; i < getNum; i++) {
                let tIndex:number = this.rnkReward.length;
                if(i == 1) {
                    if(msMoudle.getRandValue(0, 0, 100) <= 20) {
                        let id = msMoudle.rnkEqp();
                        if(id != "") {
                            this.rnkReward[tIndex] = new Object();
                            msMoudle._(); msMoudle.getWeapon(id);
                            let eqp = msMoudle.getEqpMsg(id);
                            this.rnkReward[tIndex].img = eqp.img;
                            this.rnkReward[tIndex].itemid = eqp.id;
                            this.rnkReward[tIndex].name = eqp.name;
                            this.rnkReward[tIndex].num = 1;
                            this.rnkReward[tIndex].pinzhi = 5;
                        }
                    }
                }
                else {
                    if(msMoudle.getRandValue(0, 0, 100) <= 10) {
                        let id = msMoudle.rnkJuanZhou();
                        this.rnkReward[tIndex] = new Object();
                        msMoudle._(); msMoudle.getItem(id);
                        let eqp = msMoudle.getItemMsg(Number(id));
                        this.rnkReward[tIndex].img = eqp.img;
                        this.rnkReward[tIndex].itemid = eqp.id;
                        this.rnkReward[tIndex].name = eqp.name;
                        this.rnkReward[tIndex].num = 1;
                        this.rnkReward[tIndex].pinzhi = 5;
                    }
                }
            }
            this.MoveReward();
            return this.rnkReward;
        }
        //小boss战斗
        public BossFight() : any {
            let rnk = msMoudle.getRandValue(1, 0, ms.cur_bossguanka);
            for(let i:number = 0; i < rnk; i++) {
                this.rnkReward[i] = new Object();
                //修炼石
                this.rnkReward[i].img = "homeland/04001190.info.icon.png";
                this.rnkReward[i].itemid = "600000002";
                this.rnkReward[i].num = 1;
                this.rnkReward[i].name = "修炼石";
                this.rnkReward[i].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao2(1);
            }
            //装备
            for(let i:number = 1; i < 3; i++) {
                let tIndex:number = this.rnkReward.length;
                if(i == 1) {
                    if(msMoudle.getRandValue(0, 0, 100) <= 10) {
                        let id = msMoudle.rnkEqp();
                        if(id != "") {
                            this.rnkReward[tIndex] = new Object();
                            msMoudle._(); msMoudle.getWeapon(id);
                            let eqp = msMoudle.getEqpMsg(id);
                            this.rnkReward[tIndex].img = eqp.img;
                            this.rnkReward[tIndex].itemid = eqp.id;
                            this.rnkReward[tIndex].name = eqp.name;
                            this.rnkReward[tIndex].num = 1;
                            this.rnkReward[tIndex].pinzhi = 5;
                        }
                    }
                }
                else {
                    if(msMoudle.getRandValue(0, 0, 100) <= 5) {
                        let id = msMoudle.rnkJuanZhou();
                        this.rnkReward[tIndex] = new Object();
                        msMoudle._(); msMoudle.getItem(id);
                        let eqp = msMoudle.getItemMsg(Number(id));
                        this.rnkReward[tIndex].img = eqp.img;
                        this.rnkReward[tIndex].itemid = eqp.id;
                        this.rnkReward[tIndex].name = eqp.name;
                        this.rnkReward[tIndex].num = 1;
                        this.rnkReward[tIndex].pinzhi = 5;
                    }
                }
            }
            this.MoveReward();
            return this.rnkReward;
        }
        //副本
        public FubenFight() : any {
            let rnk = msMoudle.getRandValue(1, 0, ms.cur_fuben);
            for(let i:number = 0; i < rnk; i++) {
                this.rnkReward[i] = new Object();
                //觉醒石
                this.rnkReward[i].img = "homeland/04001129.info.icon.png";
                this.rnkReward[i].itemid = "800000000";
                this.rnkReward[i].num = 1;
                this.rnkReward[i].name = "觉醒石";
                this.rnkReward[i].pinzhi = 6;
                msMoudle._(); msMoudle.updateJueXing1(1);
            }
            //金币
            if(true) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                this.rnkReward[tIndex].img = "homeland/02022995.info.icon.png";
                this.rnkReward[tIndex].itemid = "9000000";
                this.rnkReward[tIndex].num = 100;
                this.rnkReward[tIndex].name = "金币";
                this.rnkReward[tIndex].pinzhi = 1;
                msMoudle._(); msMoudle.updateJinBi(this.rnkReward[tIndex].num);
            }

            this.MoveReward();
            return this.rnkReward;
        }
        //pvp战斗
        public PvpFight() : any {
            let rnk = msMoudle.getRandValue(1, 0, 3);;
            for(let i:number = 0; i < rnk; i++) {
                this.rnkReward[i] = new Object();
                //升星石
                this.rnkReward[i].img = "homeland/04001017.info.icon.png";
                this.rnkReward[i].itemid = "700000000";
                this.rnkReward[i].num = 1;
                this.rnkReward[i].name = "升星石";
                this.rnkReward[i].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao1(1)
            }
            //金币
            if(true) {
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                this.rnkReward[tIndex].img = "homeland/02022995.info.icon.png";
                this.rnkReward[tIndex].itemid = "9000000";
                this.rnkReward[tIndex].num = 100;
                this.rnkReward[tIndex].name = "金币";
                this.rnkReward[tIndex].pinzhi = 1;
                msMoudle._(); msMoudle.updateJinBi(this.rnkReward[tIndex].num);
            }
            //装备
            for(let i:number = 1; i < 3; i++) {
                let tIndex:number = this.rnkReward.length;
                if(i == 1) {
                    if(msMoudle.getRandValue(0, 0, 100) <= 10) {
                        let id = msMoudle.rnkEqp();
                        if(id != "") {
                            this.rnkReward[tIndex] = new Object();
                            msMoudle._(); msMoudle.getWeapon(id);
                            let eqp = msMoudle.getEqpMsg(id);
                            this.rnkReward[tIndex].img = eqp.img;
                            this.rnkReward[tIndex].itemid = eqp.id;
                            this.rnkReward[tIndex].name = eqp.name;
                            this.rnkReward[tIndex].num = 1;
                            this.rnkReward[tIndex].pinzhi = 5;
                        }
                    }
                }
                else {
                    if(msMoudle.getRandValue(0, 0, 100) <= 5) {
                        let id = msMoudle.rnkJuanZhou();
                        this.rnkReward[tIndex] = new Object();
                        msMoudle._(); msMoudle.getItem(id);
                        let eqp = msMoudle.getItemMsg(Number(id));
                        this.rnkReward[tIndex].img = eqp.img;
                        this.rnkReward[tIndex].itemid = eqp.id;
                        this.rnkReward[tIndex].name = eqp.name;
                        this.rnkReward[tIndex].num = 1;
                        this.rnkReward[tIndex].pinzhi = 5;
                    }
                }
            }
            this.MoveReward();
            return this.rnkReward;
        }
        //世界boss战斗
        public WorldBossFight() : any {
            let rnk = 7;
            if(msMoudle.WorldBossLv == 80) rnk = 2;
            else if(msMoudle.WorldBossLv == 100) rnk = 4;
            else if(msMoudle.WorldBossLv == 120) rnk = 6;
            else if(msMoudle.WorldBossLv == 140) {
                rnk = 7;
                msMoudle.boss_win = true;
            }
            else if(msMoudle.WorldBossLv == 160) rnk = 8;
            else if(msMoudle.WorldBossLv == 180) {
                rnk = 9;
                msMoudle.boss_win = true;
            }
            for(let i:number = 0; i < rnk; i++) {
                let R = 20;
                if(msMoudle.WorldBossLv == 140) R = 20;
                else if(msMoudle.WorldBossLv == 160) R = 25;
                else if(msMoudle.WorldBossLv == 180) R = 30;
                if(msMoudle.getRandValue(0, 0, 100) < R) {
                    let ___ = msMoudle.getRandValue(0, 0, 4);
                    //装备
                    if(___ <= 2) {
                        let id = msMoudle.rnkEqp();//
                        if(id != "") {
                            let tIndex:number = this.rnkReward.length;
                            this.rnkReward[tIndex] = new Object();
                            msMoudle._(); msMoudle.getWeapon(id);
                            let eqp = msMoudle.getEqpMsg(id);
                            this.rnkReward[tIndex].img = eqp.img;
                            this.rnkReward[tIndex].itemid = eqp.id;
                            this.rnkReward[tIndex].name = eqp.name;
                            this.rnkReward[tIndex].num = 1;
                            this.rnkReward[tIndex].pinzhi = 5;
                        }
                    }
                    //卷轴
                    else {
                        if(msMoudle.WorldBossLv == 120) {
                            if(msMoudle.getRandValue(0, 0, 100) < 6) {
                                let tIndex:number = this.rnkReward.length;
                                let id = msMoudle.rnkJuanZhou();
                                this.rnkReward[tIndex] = new Object();
                                msMoudle._(); msMoudle.getItem(id);
                                let eqp = msMoudle.getItemMsg(Number(id));
                                this.rnkReward[tIndex].img = eqp.img;
                                this.rnkReward[tIndex].itemid = eqp.id;
                                this.rnkReward[tIndex].name = eqp.name;
                                this.rnkReward[tIndex].num = 1;
                                this.rnkReward[tIndex].pinzhi = 5;
                            }
                            else {
                                let tIndex:number = this.rnkReward.length;
                                let id = msMoudle.rnkJuanZhou();
                                this.rnkReward[tIndex] = new Object();
                                msMoudle._(); msMoudle.getItem(id);
                                let eqp = msMoudle.getItemMsg(Number(id));
                                this.rnkReward[tIndex].img = eqp.img;
                                this.rnkReward[tIndex].itemid = eqp.id;
                                this.rnkReward[tIndex].name = eqp.name;
                                this.rnkReward[tIndex].num = 1;
                                this.rnkReward[tIndex].pinzhi = 5;
                            }
                        }
                        else if(msMoudle.WorldBossLv == 140 || msMoudle.WorldBossLv == 160 || msMoudle.WorldBossLv == 180) {
                            if(msMoudle.getRandValue(0, 0, 100) < 9) {
                                let tIndex:number = this.rnkReward.length;
                                let id = msMoudle.rnkJuanZhou();
                                this.rnkReward[tIndex] = new Object();
                                msMoudle._(); msMoudle.getItem(id);
                                let eqp = msMoudle.getItemMsg(Number(id));
                                this.rnkReward[tIndex].img = eqp.img;
                                this.rnkReward[tIndex].itemid = eqp.id;
                                this.rnkReward[tIndex].name = eqp.name;
                                this.rnkReward[tIndex].num = 1;
                                this.rnkReward[tIndex].pinzhi = 5;
                            }
                            else {
                                let tIndex:number = this.rnkReward.length;
                                let id = msMoudle.rnkJuanZhou();
                                this.rnkReward[tIndex] = new Object();
                                msMoudle._(); msMoudle.getItem(id);
                                let eqp = msMoudle.getItemMsg(Number(id));
                                this.rnkReward[tIndex].img = eqp.img;
                                this.rnkReward[tIndex].itemid = eqp.id;
                                this.rnkReward[tIndex].name = eqp.name;
                                this.rnkReward[tIndex].num = 1;
                                this.rnkReward[tIndex].pinzhi = 5;
                            }
                        }
                        else {
                            let tIndex:number = this.rnkReward.length;
                            let id = msMoudle.rnkJuanZhou();
                            this.rnkReward[tIndex] = new Object();
                            msMoudle._(); msMoudle.getItem(id);
                            let eqp = msMoudle.getItemMsg(Number(id));
                            this.rnkReward[tIndex].img = eqp.img;
                            this.rnkReward[tIndex].itemid = eqp.id;
                            this.rnkReward[tIndex].name = eqp.name;
                            this.rnkReward[tIndex].num = 1;
                            this.rnkReward[tIndex].pinzhi = 5;
                        }
                    }
                }
            }
            // if(msMoudle.WorldBossLv == 140) {
            // if(true) {
            //     let ___Num = msMoudle.getRandValue(1, 0, rnk * 3);
            //     let tIndex:number = this.rnkReward.length;
            //     this.rnkReward[tIndex] = new Object();
            //     //升星石
            //     this.rnkReward[tIndex].img = "homeland/04001017.info.icon.png";
            //     this.rnkReward[tIndex].itemid = "700000000";
            //     this.rnkReward[tIndex].num = ___Num;
            //     this.rnkReward[tIndex].name = "升星石";
            //     this.rnkReward[tIndex].pinzhi = 6;
            //     msMoudle._(); msMoudle.updateCaiLiao1(___Num)
            // }
            // if(true) {
            //     let ___Num = msMoudle.getRandValue(1, 0, rnk * 3);
            //     let tIndex:number = this.rnkReward.length;
            //     this.rnkReward[tIndex] = new Object();
            //     //觉醒石
            //     this.rnkReward[tIndex].img = "homeland/04001129.info.icon.png";
            //     this.rnkReward[tIndex].itemid = "800000000";
            //     this.rnkReward[tIndex].num = ___Num;
            //     this.rnkReward[tIndex].name = "觉醒石";
            //     this.rnkReward[tIndex].pinzhi = 6;
            //     msMoudle._(); msMoudle.updateJueXing1(___Num);
            // }
            if(true) {
                let ___Num = msMoudle.getRandValue(1, 0, rnk * 3);
                let tIndex:number = this.rnkReward.length;
                this.rnkReward[tIndex] = new Object();
                //修炼石
                this.rnkReward[tIndex].img = "homeland/04001190.info.icon.png";
                this.rnkReward[tIndex].itemid = "600000002";
                this.rnkReward[tIndex].num = ___Num;
                this.rnkReward[tIndex].name = "修炼石";
                this.rnkReward[tIndex].pinzhi = 6;
                msMoudle._(); msMoudle.updateCaiLiao2(___Num);
            }
            // }
            return this.rnkReward;
        }

        MoveReward() : void {
            if(true) {
                if(msMoudle.getRandValue(0, 0, 100) < 10) {
                    let ___:number = msMoudle.getRandValue(0, 0, 3);
                    let tIndex:number = this.rnkReward.length;
                    this.rnkReward[tIndex] = new Object();
                    this.rnkReward[tIndex].img = "homeland/04001374.info.icon.png";
                    this.rnkReward[tIndex].num = 1;
                    this.rnkReward[tIndex].pinzhi = 5;

                    if(___ == 0) {
                        this.rnkReward[tIndex].itemid = "1234531";
                        this.rnkReward[tIndex].name = "转盘券";
                        ms.zhuanpan += 1;
                    }
                    else if(___ == 1) {
                        this.rnkReward[tIndex].itemid = "1234532";
                        this.rnkReward[tIndex].name = "修炼场入场券";
                        ms.miwu += 1;
                    }
                    // else if(___ == 2) {
                    //     this.rnkReward[tIndex].itemid = "1234533";
                    //     this.rnkReward[tIndex].name = "林中城入场券";
                    //     ms.tiaotiao += 1;
                    // }
                    // else if(___ == 3) {
                    //     // ms.xiangzi += 1;
                    //     this.rnkReward[tIndex].itemid = "1234531";
                    //     this.rnkReward[tIndex].name = "转盘券";
                    //     ms.zhuanpan += 1;
                    // }
                    else if(___ == 2) {
                        this.rnkReward[tIndex].itemid = "1234535";
                        this.rnkReward[tIndex].name = "伟大航路入场券";
                        ms.zhuzhu += 1;
                    }
                }
            }
        }

        /////
    }
}