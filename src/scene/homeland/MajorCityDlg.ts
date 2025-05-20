/// <reference path="./../../core/ms/Maple/Map.ts" />
/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />
/// <reference path="./../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../core/ms/Maple/Cool.ts" />

module app.homeland {
    import cssBasicEff = BasicEffRole.BasicEff;
    import cssMap = MapRole.Map;
    import cssCharacter = CharacterRole.Character;
    import cssMsg = MsgRole.Msg;
    import cssSkill = SkillRole.Skill;
    import cssCool = CoolRole.Cool;

    export class MajorCityDlg extends ui.homeland.MajorCityDlgUI implements ui.homeland.IMajorCityDlgUI {
        public static className = "app.homeland.MajorCityDlg";
        private hArr:Array<any> = [this.h1, this.h2, this.h3, this.h4, this.h5, this.h6, this.h7];
        private m_msg:cssMsg;
        public cool:cssCool

        onInitialize(){

            Laya.loader.clearRes("common/fengmian.jpg");
            Laya.loader.clearRes("atlas/keyboard.atlas");
            Laya.loader.clearRes("atlas/createChar.atlas");

            this.x = -(Laya.stage.width - 800) / 2;

            this.chair_buf.partname.text = "椅子";
            this.tamingmob_buf.partname.text = "坐骑";
            this.pet_buf.partname.text = "宠物";
            this.ring_buf.partname.text = "戒指";

            msMoudle.test_rnk = -msMoudle.getRandValue(100, 0, 100);

            msMoudle.test_jinbi = msMoudle.test_rnk;
            msMoudle.test_rongyu = msMoudle.test_rnk;
            msMoudle.test_zuanshi = msMoudle.test_rnk;
            msMoudle.test_jifen = msMoudle.test_rnk;
            msMoudle.test_cailiao1 = msMoudle.test_rnk;
            msMoudle.test_cailiao2 = msMoudle.test_rnk;
            msMoudle.test_juexing1 = msMoudle.test_rnk;

            msMoudle.test_lv = msMoudle.test_rnk;
            msMoudle.test_zs = msMoudle.test_rnk;
            msMoudle.test_shenmi = msMoudle.test_rnk;

            msMoudle.test_jinbi += ms.jinbi();
            msMoudle.test_rongyu += ms.rongyu();
            msMoudle.test_zuanshi += ms.zuanshi();
            msMoudle.test_jifen += ms.jifen();
            msMoudle.test_cailiao1 += ms.cailiao1();
            msMoudle.test_cailiao2 += ms.cailiao2();
            msMoudle.test_juexing1 += ms.juexing1();

            msMoudle.test_lv += ms.herodata.Lv;
            msMoudle.test_zs += ms.herodata.ZS;

            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                if(ms.herodata.BagSlots[i].id == "2040599") {
                    msMoudle.test_shenmi += ms.herodata.BagSlots[i].num;
                    break;
                }
            }

            this.updateData();

            Laya.timer.frameLoop(1, this, this.GGAni);
        }

        GGAni() : void {
            if(this.gtxt1 && this.gtxt2) {
                if(this.gtxt1.x == 0) {
                    this.gtxt2.x = this.gtxt1.width;
                }
                if(this.gtxt2.x == 0) {
                    this.gtxt1.x = this.gtxt2.width;
                }
                this.gtxt1.x -= 1;
                this.gtxt2.x -= 1;
            }

            // if(this.gtxt3 && this.gtxt4) {
            //     if(this.gtxt3.x == 0) {
            //         this.gtxt4.x = this.gtxt3.width;
            //     }
            //     if(this.gtxt4.x == 0) {
            //         this.gtxt3.x = this.gtxt4.width;
            //     }
            //     this.gtxt3.x -= 1;
            //     this.gtxt4.x -= 1;
            // }
        }

        onChair_bufClick2(e: Laya.Event): void {

        }
        onTamingmob_bufClick2(e: Laya.Event): void {

        }
        onPet_bufClick2(e: Laya.Event): void {

        }

        onRing_bufClick2(e: Laya.Event): void {

        }

        onClose() {

        }

        public updateBuff() : void {
            // this.lstBuf.alpha = 0.8;
            msMoudle.mxd_buf = [];

            if(msMoudle.mapP) {
                this.lstBuf.visible = true;
                this.testChat.visible = false;
                if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                    this.testChat.visible = true;
                }
                if(msMoudle.isTiaoMap(msMoudle.mapP.m_id)) {
                    this.lstBuf.visible = false;
                    this.testChat.visible = false;
                }
            }
            for(let i:number = 0; i < msMoudle.m_skill4.length; i++) {
                msMoudle.mxd_buf[i] = new Object();
                msMoudle.mxd_buf[i].have = false;
                msMoudle.mxd_buf[i].img = msMoudle.m_skill4[i];
                if(ms.m_job[i] != "") msMoudle.mxd_buf[i].have = true;
            }
            this.lstBuf.dataSource = msMoudle.mxd_buf;
        }

        onLstBufCellClick(e: Laya.Event, index: number): void {
            // msMoudle.toast("xxxx" +  msMoudle.mxd_buf[index]);
            // this.m_msg.itemShow(msMoudle.mxd_buf[index]);
        }

        onTaskMsg2Click2(e: Laya.Event): void {
            let data = msMoudle.wz["Quest.img"][ms.QuestId];
            if(data) {
                ui.show(app.quest.detailDlg, {black:true});
            }
        }

        onMore1Click(e: Laya.Event): void {
            // ui.show(app.worldmap.bossMapDlg, {black:true});
            // msMoudle.toast("暂未开放");
            // msMoudle.help = null;
            // msMoudle.tiaotiao_map = "980000000.img";
            // msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
        }
        onMore2Click(e: Laya.Event): void {

        }

        hs:Array<any> = [this.h1, this.h2, this.h3, this.h4, this.h5, this.h6, this.h7];
        pEle: Laya.HTMLDivElement;
        updateData(){

            this.lstBuf.hScrollBarSkin = "";
            // this.lstBuf.width = Laya.stage.width / 0.85 - 10;
            this.expdi.width = Laya.stage.width + 1;
            this.testChat.mouseThrough = true;
            this.ggdi.width = Laya.stage.width;
            // this.ggdi2.width = Laya.stage.width;

            this.m_msg = new cssMsg();

            // ms.m_job = ["龙骑士", "主教", "独行客", "神射手", "英雄", "冰雷", "圣骑士", "火毒", "箭神", "无影人",
            // "冲锋队长", "船长", "狂龙战士", "夜光法师", "尖兵", "剑豪", "魔影链士", "圣晶使者", "影魂异人", "虎影", "神之子", "爆莉萌天使", "战神", "龙神", "双弩精灵", "幻影", "隐月", "恶魔猎手", "恶魔复仇者", "唤灵斗师", "爆破手", "古迹猎人", "暗影双刀", "米哈尔", "魂骑士", "炎术士", "风灵使者", "夜行者", "奇袭者", "草薙京", "不知火舞",
            // "诸葛亮", "曹操", "貂蝉", "赵云", "关羽", "张飞", "马超", "黄忠", "司马懿"]

            // ms.m_job.length = 40;

            let cur_time = app.utils.formatSeconds3(new Date().getTime() / 1000);

            if(ms.test_cz == 1) ms.test_cz = 0;
            if(msMoudle.maxhp == 0 && msMoudle.maxmp == 0) {
                this.hp.width = 169;
                this.mp.width = 169;
            }

            ////来区分老玩家
            if( (ms.herodata.Lv == 1 && ms.herodata.ZS == 0) || ms.test_cz == 0) {
                ms.stime = cur_time;
            }

            if(cur_time != ms.riqi) {
                ms.riqi = cur_time;
                ms.d600 = 0;
                ms.d601 = 0;
                ms.d602 = 0;
                ms.d603 = 0;
                ms.d604 = 0;
                ms.d605 = 0;
                ms.d606 = 0;
                ms.d607 = 0;
                ms.d608 = 0;
                ms.dboss1 = 3;
                ms.dboss2 = 2;
                ms.dboss3 = 3;
                ms.dboss4 = 3;
                // ms.huoli = 9000;
                // if(ms.chair) {
                //     if(ms.chair.openid != 0) {
                //         for(let key in msMoudle.payjson) {
                //             if(msMoudle.payjson[key].id == ms.chair.id) {
                //                 let ___ = msMoudle.payjson[key];
                //                 ms.huoli *= (1 + Number(___.hp) / 100);
                //                 break;
                //             }
                //         }
                //     }
                // }
                //每日在线时长
                ms.dayguaji = 60 * 1000 * 100;
                ms.dayguaji += 5 * 60 * 1000 * ms.chairbagsdata.length;
                if(ms.chairbagsdata.length == 8) ms.dayguaji += 10 * 60 * 1000;

                let chairtypes:Array<string> = [];
                for(let i:number = 0; i < ms.chairbagsdata.length; i++) {
                    if(ms.chairbagsdata[i]) {
                        if(msMoudle.findKeyFromArr(ms.chairbagsdata[i].id, chairtypes) == false) {
                            chairtypes[chairtypes.length] = ms.chairbagsdata[i].id;
                        }
                    }
                }

                let _add = [0, 1, 2, 4, 6, 9, 12, 16, 20, 25, 30];
                ms.dayguaji *= (1 + _add[chairtypes.length] / 100);
                ms.dayguaji = Math.round(ms.dayguaji);

                // ms.error = 0;
                let tasks = ["60000", "60001", "60002", "60003", "60004", "60005", "60006", "60007", "60008"];
                for(let j:number = 0; j < tasks.length; j++) {
                    for(let i:number = 0; i < ms.tasksdata.length; i++) {
                        if(ms.tasksdata[i] == tasks[j]) {
                            ms.tasksdata.splice(i, 1);
                            break;
                        }
                    }
                }
                //每日奖励
                ms.dayreward = true;
                ms.daytotal++;

                //次日恢复
                if(ms.error != 0) ms.error = 0;
            }

            // if(ms.desFashion6 == true) {
            //     // msMoudle.reAbi();
            //     ms.herodata.BagSlots2 = [];
            //     ms.desFashion6 = false;
            // }

            this.pEle = new Laya.HTMLDivElement();
            this.pEle.style.fontSize = 18;
            this.pEle.style.width = 336;
            this.pEle.style.wordWrap = true;
            this.pEle.style.leading = 5;
            this.pEle.style.color = "#FFFFFF";
            this.content.addChild(this.pEle);

            if(msMoudle.ItemList.length == 0) {
                /////全部材料
                let data0 = msMoudle.wz["0400.img"];
                let data1 = msMoudle.wz["0401.img"]
                let data2 = msMoudle.wz["0402.img"]
                let data3 = msMoudle.wz["0403.img"]

                for(let key in data0) {
                    let item = msMoudle.getItemMsg(Number(key));
                    if(item) {
                        if(item.name && item.desc) {
                            // console.log(key, item.name);
                            msMoudle.ItemList[msMoudle.ItemList.length] = key;
                        }
                    }
                }
                for(let key in data1) {
                    let item = msMoudle.getItemMsg(Number(key));
                    if(item) {
                        if(item.name && item.desc) {
                            // console.log(key, item.name);
                            msMoudle.ItemList[msMoudle.ItemList.length] = key;
                        }
                    }
                }
                for(let key in data2) {
                    let item = msMoudle.getItemMsg(Number(key));
                    if(item) {
                        if(item.name && item.desc) {
                            // console.log(key, item.name);
                            msMoudle.ItemList[msMoudle.ItemList.length] = key;
                        }
                    }
                }
                for(let key in data3) {
                    let item = msMoudle.getItemMsg(Number(key));
                    if(item) {
                        if(item.name && item.desc) {
                            // console.log(key, item.name);
                            msMoudle.ItemList[msMoudle.ItemList.length] = key;
                        }
                    }
                }

                if(ms.tBagsArr.length == 0) {
                    ///初始化
                    for(let i:number = 0; i < msMoudle.ItemList.length; i++) {
                        ms.tBagsArr[i] = 0;
                    }
                }
            }

            this.gotoMainCity();

            this._dibu.x = (Laya.stage.width - 800) / 2;
            this._biaoti.x += (Laya.stage.width - 800) / 2;
            this.map_time.x += (Laya.stage.width - 800) / 2;
            this.boss_hp.x += (Laya.stage.width - 800) / 2;
            this.btnBack2.x += (Laya.stage.width - 800) / 2;
            // this.testChat.x += (Laya.stage.width - 800) / 2;
            // this.ding1.pos(0, 1);
            // this.ding2.pos(130, 1);
            // this.ding3.pos(260, 1);
            // this.btnHero.pos(55, 90);
            // this.btnShop.pos(160, 90);
            // this.btnTask.pos(260, 85);
            // this.btnBoss.pos(135, 190);
            // this.btnLB.pos(46, 190);
            // this.btnPay.pos(46, 280);
            // this.btnChar.pos(Laya.stage.width - 45, 155);
            // this.btnZY.pos(Laya.stage.width - 45, 250);
            // this.btnChat.pos(Laya.stage.width - 45, 250);//322
            // this.btnSpeed.pos(Laya.stage.width - 40, 322);
            // this.btnTJ.pos(Laya.stage.width - 45, 55);
            // this.guide.pos(Laya.stage.width - 210, 115);
            // this.bufstate.pos(Laya.stage.width - 300, 0);

            this._head.x = (Laya.stage.width - 700) / 2;
            // for(let i:number = 0; i < this.hs.length; i++) this.hs[i].x = (Laya.stage.width - 110);
            // Laya.stage.addChild(this.ding1);
            // Laya.stage.addChild(this.ding2);
            // Laya.stage.addChild(this.ding3);
            // Laya.stage.addChild(this.btnBoss);
            // Laya.stage.addChild(this.btnLB);
            // Laya.stage.addChild(this.btnChar);
            // Laya.stage.addChild(this.btnZY);
            // Laya.stage.addChild(this.btnChat);
            // Laya.stage.addChild(this.btnSpeed);
            // Laya.stage.addChild(this.btnHero);
            // Laya.stage.addChild(this.btnTask);
            // Laya.stage.addChild(this.btnShop);
            // Laya.stage.addChild(this.btnTJ);
            // Laya.stage.addChild(this.guide);
            // Laya.stage.addChild(this.bufstate);

            // this.ding1.visible = false;
            // this.ding2.visible = false;
            // this.ding3.visible = false;
            // this.btnHero.visible = false;
            // this.btnShop.visible = false;
            // this.btnTask.visible = false;
            // this.btnBoss.visible = false;
            // this.btnLB.visible = false;
            // this.btnChar.visible = false;
            // this.btnZY.visible = false;
            // this.btnChat.visible = false;
            // this.btnSpeed.visible = false;
            // this.bufstate.visible = false;

            // this.btnTJ.visible = false;
            // this.guide.visible = false;

            // if(ms.herodata.Sex == 0) this.btnChar.skin = "homeland/head1.png";
            // else this.btnChar.skin = "homeland/head2.png";

            this.updataSuo();
            this.updSkill();
            for(let i:number = 0; i < this.pNode.length; i++)
                this.pNode[i].on(Laya.Event.CLICK, this,this.SkillClick, [i]);

            msMoudle.intoGame = true;
            // msMoudle.updateHuoLi(0);


            // let url = app.utils.getSiteURL();
            // console.log(url);
            //现金红包
            //累计推广充值（100～1000）返10%，累计推广充值（1000～1W）反20%，累计推广充值(1W~5W)反30%
            // if(Gua.checkTime("2021.1.6")) {
            //     if(ms.test_ly == "QQ群" && ms.test_cz == 0) {
            //         if(url && url.indexOf(".html") >= 0 && url.indexOf("?v") >= 0) {
            //             let ly:any = url.split("?v");
            //             if(ly) {
            //                 for(let i:number = 0; i < ly[1].length; i++) ms.test_ly += ly[1][i] += "_";
            //             }
            //         }
            //     }
            // }

            //保存数据
            ms.saveServer();
            Laya.timer.loop(1000, this, this.save); //改成队列查询

            // ms.a = ""
            // ms.b = {};
            // Laya.timer.loop(2000, this, () => {
            //     let message = new Net.Message();
            //     message.xieyi = 10094 + ms._dpip;
            //     message.msdata = {id: ms.user};
            //     msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            //         // console.log("getPartyList, ", data);
            //         let partyList = data["partyList"] || [];

            //         for(let i=0; i<partyList.length; ++i) {
            //             let party = partyList[i];
            //             if(party) {

            //                 for(let t = 0; t < party.members.length; t++) {
            //                     if(!ms.b[party.members[t]]) {
            //                         ms.b[party.members[t]] = 1;
            //                         ms.a +=  party.members[t] + "#";
            //                         console.log(ms.a);
            //                     }
            //                 }

            //             }
            //         }
            //     }});
            // });

        }

        save() : void {
            ms.allTime++;
            ms.delaySave();
        }

        updExp(pro:number) : void {
            if(msMoudle.isScreen()) {
                this.expdi.visible = true;
                if(pro > 1) pro = 1;
                if(this.expbar) {
                    this.expbar.width = (Laya.stage.width + 1) * pro;
                }
            }
            else {
                this.expdi.visible = false;
                msMoudle.mainT.updateExp(pro);
            }
        }

        onBtnAutoClick(e: Laya.Event): void {
            if(msMoudle.guaji) return ;
            if(msMoudle.guaji == false) {
                if(msMoudle.mainT) {
                    msMoudle.mainT.onGJ();
                }
            }
        }

        onBtnTeamClick(e: Laya.Event): void {
            if(msMoudle.guaji) return ;
            // if(msMoudle.mapP && msMoudle.mapP.m_id && msMoudle.isSyncMap(msMoudle.mapP.m_id) == true) {
                Sync.getPartyList(()=>{
                    ui.show(app.worldmap.partyDlg, {black:true});
                })
            // }
            // else {
            //     msMoudle.toast("队伍数量已达服务器上限，请稍后再试");
            //     // ui.show(app.worldmap.partyDlg, {black:true});
            // }
        }

        onBtnMarketClick(e: Laya.Event): void {
            ui.show(app.homeland.ziyouDlg, {black:true});
        }

        onGuaJi() : void {
            // if(msMoudle.gtouch == false && msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id) && msMoudle.guaji == false) {
            //     msMoudle.toast2("长时间未操作，自动断开了游戏")
            //     ms.herodata = null;
            //     Laya.timer.clear(this, this.onGuaJi);
            //     return ;
            // }
            // if(msMoudle.gtouch) {
            //     msMoudle.gtouch = false;
            // }
        }

        onReward() : void {
            // ui.show(app.skill.skillDlg, {black:true});
            let message = new Net.Message();
            message.xieyi = 111 + ms._dpip;
            message.msdata = ms._user;
            //改成了2
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                // console.log(data);

                if(data["msdata"] && data["xieyi"] == 111 + ms._dpip) {
                    if(data["msdata"]._context.length > 0) {
                        // console.log("1111");
                        let ___ = JSON.parse(data["msdata"]._context);
                        if(___.pay) {
                            if(___.pay.length > 0) {
                                let _data:any = ___.pay.split("#");
                                for(let i:number = 0; i < _data.length; i++) {
                                    if(_data[i].length > 0) {
                                        let msg =  _data[i].split("!");
                                        // console.log(msg);
                                        if(msg[1] == ms._user) {
                                            if(msg[0] == "chongzhi") {

                                                let isFirst:boolean = false;
                                                if(ms.test_cz == 0) isFirst = true;

                                                if(Number(msg[2]) > ms.czValue)
													ms.czValue = Number(msg[2]);
                                                // if(ui.manager.getDialogByName("app.homeland.MajorCityDlg")) {
                                                //     if(ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg) {
                                                //         ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = true;
                                                //     }
                                                // }
                                                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                                                    msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
                                                }
                                                msMoudle.toast2("成功充值了" + msg[2] + "元");
                                                let m = Number(msg[2]);
                                                if(m == 5) {
                                                    msMoudle._(); msMoudle.updateRongYu(525);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateRongYu(525);
                                                    }
                                                }
                                                else if(m == 10) {
                                                    msMoudle._(); msMoudle.updateZuanShi(105, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(105, 101);
                                                    }
                                                }
                                                else if(m == 30) {
                                                    msMoudle._(); msMoudle.updateZuanShi(320, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(320, 101);
                                                    }
                                                }
                                                else if(m == 50) {
                                                    msMoudle._(); msMoudle.updateZuanShi(550, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(550, 101);
                                                    }
                                                }
                                                else if(m == 100) {
                                                    msMoudle._(); msMoudle.updateZuanShi(1150, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(1150, 101);
                                                    }
                                                }
                                                else if(m == 200) {
                                                    msMoudle._(); msMoudle.updateZuanShi(2400, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(2400, 101);
                                                    }
                                                }
                                                else if(m == 300) {
                                                    msMoudle._(); msMoudle.updateZuanShi(3600, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(3600, 101);
                                                    }
                                                }
                                                else if(m == 500) {
                                                    msMoudle._(); msMoudle.updateZuanShi(6000, 101);
                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateZuanShi(6000, 101);
                                                    }
                                                }

                                                if(m >= 1) {

                                                    ms.test_cz += Number(m);
                                                    ms.czly.push(Number(m));
                                                    ms.acz += Number(m);

                                                    if(isFirst) {
                                                        ms.test_cz += Number(m);
                                                        ms.czly.push(Number(m));
                                                        ms.acz += Number(m);
                                                    }

                                                    if(isFirst) {
                                                        msMoudle._(); msMoudle.updateJinBi(9999);
                                                        msMoudle._(); msMoudle.updateRongYu(100);
                                                        msMoudle._(); msMoudle.getWeapon("01302032");
                                                        msMoudle._(); msMoudle.getItem("2043012");
                                                        msMoudle._(); msMoudle.buyOneHero(1);
                                                    }

                                                }
                                                ///告诉支付程序我成功拿到了奖励
                                                msMoudle.mapP.payAvatarMegaphone(m);
                                                ///告诉后台成功了
                                                let message = new Net.Message();
                                                message.xieyi = 112 + ms._dpip;
                                                message.msdata = { "user": msg[1], "state":msg[0], "num" : msg[2]};
                                                msMoudle.wsocket.sendFastMsg({param: message, success: (data: any) => {
                                                    if(data["code"] == 0) {}
                                                }});

                                                //这里不要连着发
                                                // Laya.timer.once(1000, this, ()=> {
                                                    ms.saveServer();
                                                // });

                                            }
                                            else if(msg[0] == "xitong") {
                                                let m = Number(msg[2]);
                                                if(m == 110 || m == 111 || m == 112 ||
                                                    m == 120 || m == 121 || m == 122) {
                                                    msMoudle.toast2("恭喜你认证成功了");

                                                    if(m == 110) {
                                                        ms.m_tg = 1;
                                                        ms.test_cz += 5;
                                                        ms.czly.push(5);
                                                        ms.acz += 5;
                                                        msMoudle._(); msMoudle.updateRongYu(1000);
                                                        msMoudle._(); msMoudle.updateZuanShi(100, 103);
                                                        msMoudle._(); msMoudle.getWeapon("01002419");
                                                        for(let i:number = 0; i < 1; i++) {
                                                            msMoudle._(); msMoudle.getItem("2040599")
                                                        }
                                                    }
                                                    else if(m == 111) {
                                                        ms.m_tg = 2;
                                                        ms.test_cz += 30;
                                                        ms.czly.push(30);
                                                        ms.acz += 30;
                                                        msMoudle._(); msMoudle.updateRongYu(3000);
                                                        msMoudle._(); msMoudle.updateZuanShi(500, 103);
                                                        msMoudle._(); msMoudle.getWeapon("01002357");
                                                        for(let i:number = 0; i < 3; i++) {
                                                            msMoudle._(); msMoudle.getItem("2040599")
                                                        }
                                                    }
                                                    else if(m == 112) {
                                                        ms.m_tg = 3;
                                                        ms.test_cz += 100;
                                                        ms.czly.push(100);
                                                        ms.acz += 100;
                                                        msMoudle._(); msMoudle.updateRongYu(10000);
                                                        msMoudle._(); msMoudle.updateZuanShi(1000, 103);
                                                        msMoudle._(); msMoudle.getWeapon("01002140");
                                                        for(let i:number = 0; i < 6; i++) {
                                                            msMoudle._(); msMoudle.getItem("2040599")
                                                        }
                                                    }
                                                    if(msMoudle.maplejson["充值QQ"] == 1044571564) {
                                                        //QQ推广
                                                        if(m == 120) {
                                                            msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
                                                            if(ms.shops[0]< 100) {
                                                                ms.shops[0]+=100;
                                                                ms.zsly[1]+=25*100;
                                                                ms.zsxh[0]-=25*100;
                                                            }
                                                        }
                                                        //抖音推广
                                                        else if(m == 121) {
                                                            msMoudle._(); msMoudle.getWeapon("01005140")   //999
                                                            if(ms.shops[0]< 100) {
                                                                ms.shops[0]+=100;
                                                                ms.zsly[1]+=25*100;
                                                                ms.zsxh[0]-=25*100;
                                                            }
                                                        }
                                                        //快手推广
                                                        else if(m == 122) {
                                                            msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
                                                            if(ms.shops[0]< 100) {
                                                                ms.shops[0]+=100;
                                                                ms.zsly[1]+=25*100;
                                                                ms.zsxh[0]-=25*100;
                                                            }
                                                        }
                                                    }
                                                }
                                                //枫叶
                                                else if(m == 100 || m == 200 || m == 500 || m == 1000 || m == 2000 || m == 3000 || m == 5000 || m == 10000) {
                                                    msMoudle.toast2("系统发放了" + msg[2] + "枫叶");
                                                    msMoudle._(); msMoudle.updateRongYu(m);
                                                    // if(m == 500) {
                                                    //     ms.fuli = 1;
                                                    // }
                                                }
                                                //英雄
                                                else if(m >= 1001 && m <= 1020) {
                                                    msMoudle._(); msMoudle.buyOneHero(m - 1001);
                                                    msMoudle.toast2("系统发放了英雄" + m);
                                                }
                                                //卷轴(
                                                else if(msMoudle.isJuanZhou(Number(msg[2]))) {
                                                    let item = msMoudle.getItemMsg(Number(msg[2]));
                                                    if(item) {
                                                        msMoudle.toast2("系统发放了" + item.name);
                                                        msMoudle._(); msMoudle.getItem(msg[2]);
                                                        //如果在背包界面还得刷新背包
                                                    }
                                                }
                                                //装备
                                                else {
                                                    let item = msMoudle.getEqpMsg(msg[2]);
                                                    if(item) {
                                                        msMoudle.toast2("系统发放了" + item.name);
                                                        msMoudle._(); msMoudle.getWeapon(msg[2])
                                                        //如果在背包界面还得刷新背包
                                                    }
                                                }
                                                ///告诉后台成功了
                                                let message = new Net.Message();
                                                message.xieyi = 112 + ms._dpip;
                                                message.msdata = { "user": msg[1], "state":msg[0], "num" : msg[2]};
                                                msMoudle.wsocket.sendFastMsg({param: message, success: (data: any) => {
                                                    if(data["code"] == 0) {}
                                                }});
                                                // 这里不要连着发
                                                // Laya.timer.once(500, this, ()=> {
                                                    ms.saveServer(true);
                                                // });

                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }});

            //
        }


        ////聊天的入口
        // cantouch:boolean = true;
        // tweenState:boolean = true;
        onBtnChatClick(e: Laya.Event): void {
        //     // if(ms.herodata.Lv >= 30) {
        //         if (this.cantouch) {
        //             this.cantouch = false;
        //             if (this.tweenState) {
        //                 this.tweenState = false;
        //                 this.testChat.visible = true;
        //                 this.chatbg.width = Laya.stage.width;
        //                 this.chatbg.height = Laya.stage.height;
        //                 this.chatbg.graphics.clear();
        //                 this.chatbg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        //                 this.chatbg.alpha = 0.8;
        //                 // msMoudle.dlgShow();
        //                 if(msMoudle.mainT) {
        //                     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
        //                         msMoudle.mainT.cz_sp.visible = false;
        //                     }
        //                 }
        //                 Laya.Tween.to(this.testChat, { y: 190 }, 450, Laya.Ease["backInOut"]);
        //                 Laya.timer.once(425, this, () => {
        //                     this.cantouch = true;
        //                     if(this.tweenState) this.testChat.visible = false;
        //                 });
        //             }
        //             else {
        //                 this.tweenState = true;
        //                 this.chatbg.graphics.clear();
        //                 this.chatbg.alpha = 1;
        //                 this.chatbg.width = 0;
        //                 this.chatbg.height = 0;
        //                 this.testChat.y = 240 + 370;
        //                 // Laya.Tween.to(this.testChat, { y: 240 + 370 }, 250, null);
        //                 // Laya.timer.once(225, this, () => {
        //                     this.cantouch = true;
        //                     if(this.tweenState) this.testChat.visible = false;
        //                 // });
        //                 // msMoudle.dlgClose();
        //                 if(msMoudle.mainT) {
        //                     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
        //                         msMoudle.mainT.cz_sp.visible = true;
        //                     }
        //                 }
        //             }
        //         }
        //     // }
        //     // else {
        //     //     msMoudle.toast2("需要角色达到30级");
        //     // }
        }

        onChatbgClick(e: Laya.Event): void {

        }

        onBtnRankClick(e: Laya.Event): void {
            ui.show(app.pvp.pvp2Dlg, {black:true});
        }

        onBtnPayClick(e: Laya.Event): void {
            // ui.show(app.event.FirstRechargeDlg, {black:true});
            // ui.show(app.event.FirstRechargeDlg1, {black:true});
        }

        updataSuo() : void {
            // if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //     msMoudle.mainT.cz_sp.getChildByName("技能").visible = false;
            // }
            if(!ms.wear_skill[0]) {// && ms.herodata.Lv >= 5) {
                this.skill_new1.visible = true;
                // if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //     // msMoudle.mainT.cz_sp.getChildByName("技能").visible = true;
                // }
            }
            if(!ms.wear_skill[1]) {// && ms.herodata.Lv >= 10) {
                this.skill_new2.visible = true;
                // if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //     // msMoudle.mainT.cz_sp.getChildByName("技能").visible = true;
                // }
            }
            if(!ms.wear_skill[2]){// && ms.herodata.Lv >= 15) {
                this.skill_new3.visible = true;
                // if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //     // msMoudle.mainT.cz_sp.getChildByName("技能").visible = true;
                // }

            }
            if(!ms.wear_skill[3]) {// && ms.herodata.Lv >= 20) {
                this.skill_new4.visible = true;
                // if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //     msMoudle.mainT.cz_sp.getChildByName("技能").visible = true;
                // }
            }

            // if(ms.herodata.Lv >= 5)
            this.skill_suo1.visible = false;
            // if(ms.herodata.Lv >= 10)
            this.skill_suo2.visible = false;
            // if(ms.herodata.Lv >= 15)
            this.skill_suo3.visible = false;
            // if(ms.herodata.Lv >= 20)
            this.skill_suo4.visible = false;
        }

        ShowGuide(guide_id:number) : void {
        //     if(ms.guide_ok) {
        //         this.jiangli_sp.skin = "homeland/character_title_7.png";
        //         this.jiangli.text = "领取";
        //         this.jiangli.color = "#07ec47";
        //     }
        //     else {
        //         this.jiangli_sp.skin = "";
        //         this.jiangli.text = "奖励";
        //         this.jiangli.color = "#FFFFFF";
        //     }
        //     //
        //     let all:boolean = true;
        //     for(let key in msMoudle.mubiaojson) {
        //         if(msMoudle.mubiaojson[key].mubiao == guide_id) {
        //             this.guide_txt.text = msMoudle.mubiaojson[key]._;
        //             this.jiangli_num.text = "X" + msMoudle.mubiaojson[key].price;
        //             all = false;
        //             break;
        //         }
        //     }
        //     if(all) if(all) this.guide.visible = false;
        }

        onJiangli_spClick(e: Laya.Event): void {
            // if(ms.guide_ok) {
            //     ms.guide_index++;
            //     ms.guide_ok = false;
            //     // this.ShowGuide(ms.guide_index);
            //     let showReward:Array<any> = [];
            //     showReward[0] = new Object();
            //     showReward[0].itemid = "1234561";
            //     showReward[0].name = "枫叶";
            //     showReward[0].img = "homeland/02028044.info.icon.png";
            //     showReward[0].num = 10;
            //     showReward[0].pinzhi = 1;
            //     if(showReward[0].itemid == "1234561") {
            //         msMoudle._(); msMoudle.updateRongYu(showReward[0].num);
            //     }
            //     ui.show(app.battle.rewardDlg, {params:[showReward]});
            // }
        }

        pNode:Array<any> = [this.s1, this.s2, this.s3, this.s4];
        pNmae:Array<any> = [this.name1, this.name2, this.name3, this.name4];
        updSkill() : void {
            let showArr:Array<any> = [];                //技能节点
            let skillId:Array<number> = [];                //技能ID
            let tTime:Array<any> = [];    //时间
            for(let i:number = 0; i < ms.wear_skill.length; i++) {
                // this.pNode[i].off(Laya.Event.CLICK, this,this.SkillClick);
                if(ms.wear_skill[i]) {
                    showArr[i] = this.pNode[i];
                    skillId[i] = ms.wear_skill[i];
                    for(let key in msMoudle.skilljson) {
                        if(msMoudle.skilljson[key].id == ms.wear_skill[i]) {
                            this.pNmae[i].text = msMoudle.skilljson[key].name;
                            tTime[i] = msMoudle.skilljson[key].time;
                            break;
                        }
                    }
                }
                else {
                    this.pNmae[i].text = "技能槽";
                }
            }
            if(this.cool) {
                this.cool.clearUp();
                this.cool = null;
            }
            this.cool = new cssCool();
            this.cool.loadCool(showArr, tTime, skillId, 0);
        }

        SkillClick(i:number) : void {
            if(msMoudle.mapP.m_id == "910000000.img" || msMoudle.mapP.m_id == "302020100_gai.img") {
                if(!ms.wear_skill[0] && ms.herodata.Lv >= 5 && i == 0) ui.show(app.char.skillDlg, {black:true});
                if(!ms.wear_skill[1] && ms.herodata.Lv >= 10 && i == 1) ui.show(app.char.skillDlg, {black:true});
                if(!ms.wear_skill[2] && ms.herodata.Lv >= 15 && i == 2) ui.show(app.char.skillDlg, {black:true});
                if(!ms.wear_skill[3] && ms.herodata.Lv >= 20 && i == 3) ui.show(app.char.skillDlg, {black:true});
            }
        }

        onBtnTJClick(e: Laya.Event): void {
            msMoudle.dlgShow();
            let back:Laya.Image = new Laya.Image();
            back.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            back.zOrder = 10000000;
            // back.x = (design_width - 800) / 2;
            Laya.stage.addChild(back);
            back.alpha = 0;
            msMoudle._alphasp3(back, 500);
            Laya.timer.once(500, this, ()=> {
                // msMoudle.gameP._dibu.visible = false;
                if(back) {
                    ui.show(app.zhaomu.zhaomuDlg);
                    if(back) {
                        back.removeSelf();
                        back = null;
                    }
                }
            });
        }

        onBtnBossClick(e: Laya.Event): void {
            // //签到
            // this.btnBoss.visible = false;
            // ms.dayreward = false;

            // let showReward:Array<any> = [];
            // for(let i:number = 0; i < 4; i++) {
            //     showReward[i] = new Object();
            //     if(i == 0) {
            //         let _num = 25 + (ms.daytotal - 1) * 25;
            //         if(_num > 200) _num = 200;
            //         if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
            //         else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
            //         else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
            //         showReward[i].itemid = "1234561";
            //         showReward[i].num = _num;
            //         showReward[i].pinzhi = 5;
            //         showReward[i].name = "枫叶";
            //         showReward[i].type = 0;
            //         showReward[i].img = "homeland/02028044.info.icon.png";
            //         msMoudle._(); msMoudle.updateRongYu(showReward[0].num);
            //     }
            //     else if(i == 1) {
            //         let _num = 5 + (ms.daytotal - 1) * 5;
            //         if(_num > 35) _num = 35;
            //         if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
            //         else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
            //         else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
            //         showReward[i].itemid = "800000000";
            //         showReward[i].num = _num;
            //         showReward[i].pinzhi = 6;
            //         showReward[i].name = "觉醒石";
            //         showReward[i].type = 0;
            //         showReward[i].img = "homeland/04001129.info.icon.png";
            //         msMoudle._(); msMoudle.updateJueXing1(showReward[i].num)
            //     }
            //     else if(i == 2) {
            //         let _num = 5 + (ms.daytotal - 1) * 5;
            //         if(_num > 35) _num = 35;
            //         if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
            //         else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
            //         else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
            //         showReward[i].itemid = "600000002";
            //         showReward[i].num = _num;
            //         showReward[i].pinzhi = 6;
            //         showReward[i].name = "修炼石";
            //         showReward[i].type = 0;
            //         showReward[i].img = "homeland/04001190.info.icon.png";
            //         msMoudle._(); msMoudle.updateCaiLiao2(showReward[i].num)
            //     }
            //     else {
            //         let _num = 5 + (ms.daytotal - 1) * 5;
            //         if(_num > 35) _num = 35;
            //         if(ms.m_tg == 1) _num = Math.floor(_num * (1 + 0.5));
            //         else if(ms.m_tg == 2) _num = Math.floor(_num * (1 + 1));
            //         else if(ms.m_tg == 3) _num = Math.floor(_num * (1 + 1.5));
            //         showReward[i].itemid = "700000000";
            //         showReward[i].num = _num;
            //         showReward[i].pinzhi = 6;
            //         showReward[i].name = "升星石";
            //         showReward[i].type = 0;
            //         showReward[i].img = "homeland/04001017.info.icon.png";
            //         msMoudle._(); msMoudle.updateCaiLiao1(showReward[i].num)
            //     }
            // }
            // //这里还需要存档
            // ui.show(app.battle.rewardDlg, {params:[showReward, true]});

        }

        onBtnLBClick(e: Laya.Event): void {
            //礼包
            // ui.show(app.libao.LiBaoDlg, {black:true});
        }

        onBtnNewClick(e: Laya.Event): void {
            //传送门
            // ui.show(app.tujian.tujianDlg, {black:true});
        }

        onBtnCharClick(e: Laya.Event): void {
            if(msMoudle.mapP.m_id == "910000000.img" || msMoudle.mapP.m_id == "302020100_gai.img")
                ui.show(app.char.charDlg, {black:true});
            else {
                msMoudle.toast("当前状态下不可操作！");
            }
        }

        onBtnZYClick2(e: Laya.Event): void {
            ui.show(app.homeland.ziyouDlg, {black:true});
        }

        onBtnTaskClick(e: Laya.Event): void {
            // ui.show(app.task.taskDlg, {black:true});
        }

        onBtnShopClick(e: Laya.Event): void {
            // ui.show(app.shop.shopDlg, {black:true});
        }

        onBtnHeroClick(e: Laya.Event): void {
            if(ms.herosdata.length > 0)
                ui.show(app.yingxiong.YXDlg, {black:true});
            else
                msMoudle.toast2("你没有招募的英雄");
        }

        onBtnBackClick(e: Laya.Event): void {
            this.btnBack.visible = false;

            msMoudle.gameP.gotoScene(ms.lastmap);
        }
        onBtnBack2Click(e: Laya.Event): void {
            msMoudle.gameP.gotoScene(ms.lastmap);
        }

        onBtnSpeedClick(e: Laya.Event): void {
            ui.show(app.common.VoiceDlg, {black:true});
            // if(ms.herodata.lv >= 18) {
                // ms.speed += 0.5;
                // if(ms.speed > 2) {
                //     ms.speed = 1;
                // }
                // if(ms.speed == 1) this.speedtxt.text = "X1";
                // else if(ms.speed == 1.5) this.speedtxt.text = "X2";
                // else if(ms.speed == 2) this.speedtxt.text = "X3";
            // Laya.timer.scale = ms.speed;
        }

//////
        public LvUp(index:number) : void {
            let h:any = this.hs[index - 1];
            if(index == 1) {
                let leaveup:number = ms.herodata.Lv;
                let needjinbi:number = msMoudle.getLvExp(leaveup);
                if(ms.herodata.Exp >= needjinbi) {
                    ////这里如果升级多次会有问题
                    let add_lv:number = 0;
                    while(true) {
                        let _need:number = msMoudle.getLvExp( ms.herodata.Lv);
                        if(ms.herodata.Exp >= _need) {
                            ms.herodata.Exp -= _need;
                            // ms.herodata.Lv++;
                            if(ms.herodata.Lv + 1 <= 200) add_lv++;
                            msMoudle.updateLv(1);
                            this.updataSuo();
                        }
                        else break;
                    }

                    msMoudle.char.m_lv = ms.herodata.Lv;
                    ////升级
                    ms.herodata.LeaveUp(add_lv);
                    msMoudle.gameP.lv.text = ms.herodata.Lv + "";
                    msMoudle.gameP._name.text = ms.herodata.Name;
                    msMoudle.char.m_hp = msMoudle.char.m_maxhp = ms.herodata.MaxHP.GetSum();

                    if(msMoudle.mapP.m_id == "302020100_gai.img" || msMoudle.guaji) {
                        // console.log(msMoudle.mapP.m_id)
                        if(msMoudle.char) {
                            if(msMoudle.char.m_state_sp) {
                                let be:cssBasicEff = new cssBasicEff();
                                be.loadBasicEff(msMoudle.char.m_state_sp, "LevelUp", 0, 0);
                            }
                        }
                    }
                }
            }
            else {
                if(ms.otherherodata[index - 2] && msMoudle.mapP.heroList[index - 2]) {
                    let leaveup:number = ms.otherherodata[index - 2].Lv;

                    let add_lv:number = 0;
                    let needjinbi:number = msMoudle.getLvExp(leaveup);
                    if(ms.otherherodata[index - 2].Exp >= needjinbi) {
                        while(true) {
                            let _need:number = msMoudle.getLvExp(ms.otherherodata[index - 2].Lv);
                            if(ms.otherherodata[index - 2].Exp >= _need) {
                                ms.otherherodata[index - 2].Exp -= _need;
                                ms.otherherodata[index - 2].Lv++;
                                add_lv++;
                            }
                            else break;
                        }
                        if(msMoudle.mapP.m_id == "302020100_gai.img" || msMoudle.guaji) {
                            // console.log(msMoudle.mapP.m_id)
                            if(msMoudle.mapP.heroList[index - 2]) {
                                if(msMoudle.mapP.heroList[index - 2].m_state_sp) {
                                    let be:cssBasicEff = new cssBasicEff();
                                    be.loadBasicEff(msMoudle.mapP.heroList[index - 2].m_state_sp, "LevelUp", 0, 0);//
                                }
                            }
                        }
                        ////升级
                        // ms.otherherodata[index - 2].LeaveUp(add_lv);
                        ////保存最新的服务器数据
                        for(let __:number = 0; __ < ms.otherheroservedata.length; __++) {
                            if(ms.otherheroservedata[__].openid == ms.otherherodata[index - 2].openid) {
                                ms.otherheroservedata[__].Lv = ms.otherherodata[index - 2].Lv;
                                ms.otherheroservedata[__].Exp = ms.otherherodata[index - 2].Exp;

                                msMoudle.serverAbi(ms.otherheroservedata[__], false);

                                ms.otherherodata[index - 2].MaxHP.baseVal = ms.otherheroservedata[__].MaxHP.baseVal;
                                ms.otherherodata[index - 2].PADamage.baseVal = ms.otherheroservedata[__].PADamage.baseVal;
                                ms.otherherodata[index - 2].PDDamage.baseVal = ms.otherheroservedata[__].PDDamage.baseVal;
                                ms.otherherodata[index - 2].MADamage.baseVal = ms.otherheroservedata[__].MADamage.baseVal;
                                ms.otherherodata[index - 2].MDDamage.baseVal = ms.otherheroservedata[__].MDDamage.baseVal;

                                ms.otherherodata[index - 2].CriticalRate.baseVal = ms.otherheroservedata[__].CriticalRate.baseVal;
                                ms.otherherodata[index - 2].Evasion.baseVal = ms.otherheroservedata[__].Evasion.baseVal;
                                ms.otherherodata[index - 2].Accurate.baseVal = ms.otherheroservedata[__].Accurate.baseVal;

                                break;
                            }
                        }
                        ///////
                    }
                }
                // else return ;
            }
        }

        public updateAllExp(allexp:number, save:boolean = true) : void {
            if(allexp > 0) {
                let num:number = 1;
                for(let i:number = 2; i <= 7; i++) {
                    if(msMoudle.mapP.heroList[i-2]) {
                        if(msMoudle.mapP.heroList[i-2].m_hp > 0) num++;
                    }
                }
                let addexp:number = Math.ceil(allexp / num);
                for(let i:number = 1; i <= 7; i++) {
                    if(i == 1) ms.herodata.Exp += addexp;
                    else {
                        if(ms.otherherodata[i - 2]) {
                            ms.otherherodata[i - 2].Exp += addexp;
                            ////保存最新的服务器数据
                            for(let __:number = 0; __ < ms.otherheroservedata.length; __++) {
                                if(ms.otherheroservedata[__].openid == ms.otherherodata[i - 2].openid) {
                                    ms.otherheroservedata[__].Lv = ms.otherherodata[i - 2].Lv;
                                    ms.otherheroservedata[__].Exp = ms.otherherodata[i - 2].Exp;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            this.updataHead(save);
        }

        private updataHead(save:boolean = true) : void {
            // console.log("####")
            // console.log(ms.otherherodata)
            let lvaddd:boolean = false;
            for(let i:number = 1; i <= 7; i++) {
                let h:any = this.hs[i - 1];
                h._name.text = "未上阵英雄";
                h.head.skin = "";
                h._pinzhi.skin = "";
                // h.di.visible = false;

                let _continue:boolean = true;
                let leaveup:number = ms.herodata.Lv;
                if(i >= 2) {
                    if(ms.otherherodata[i - 2] && ms.otherherodata[i - 2].id != 0) leaveup = ms.otherherodata[i - 2].Lv;
                    else _continue = false;
                }
                if(_continue) {
                    let isadd:boolean = false;
                    let needjinbi:number = msMoudle.getLvExp(leaveup);
                    if(i == 1) {
                        if(ms.herodata.Exp >= needjinbi) isadd = true;
                    }
                    else {
                        if(ms.otherherodata[i - 2].Exp >= needjinbi) isadd = true;
                    }

                    if(isadd) {
                        this.LvUp(i);
                        lvaddd = true;
                    }
                    // h.di.visible = true;
                    if(i == 1) {
                        h._jinbi.text = ms.herodata.Exp + "/" + needjinbi ;
                        h.di.value = ms.herodata.Exp / needjinbi;
                        h._name.text = ms.herodata.Name + " Lv." +  ms.herodata.Lv;
                        h._pinzhi.skin = "homeland/img_pingzhikuang5.png";
                        if(ms.herodata.Sex == 0) h.head.skin = "homeland/head1.png";
                        else h.head.skin = "homeland/head2.png";

                        // this._exp.text = (ms.herodata.Exp + 1) + "/" + needjinbi;
                        // this._name.text = ms.herodata.Name;
                        // this._lv.text = ms.herodata.Lv.toString();
                    }
                    else {
                        h._jinbi.text = ms.otherherodata[i - 2].Exp + "/" + needjinbi;
                        h.di.value = ms.otherherodata[i - 2].Exp / needjinbi;
                        h.head.skin = "res/Character/Cap/" + msMoudle.herojson[Number(ms.otherherodata[i - 2].id)-1001].head + ".img/info.icon.png";

                        if(ms.otherherodata[i - 2].pinzhi > 0) {
                            h._pinzhi.skin = "homeland/img_pingzhikuang" + ms.otherherodata[i - 2].pinzhi + ".png";
                        }
                        h._name.text = ms.otherherodata[i - 2].Name + " Lv." + ms.otherherodata[i - 2].Lv;
                    }

                }
            }
            if(save || lvaddd) {
                ms.saveServer();
            }
        }

//////

        public map:cssMap;
        private gotoMainCity() : void {

            msMoudle.__();

            msReward._r1();

            msMoudle.gameP = this;

            // http://120.77.245.27/bin/index.html
            //910000000
            if(!this.map) this.map = new cssMap();
            else msMoudle.mainT.clearMap();

            console.log("ms.lastmap", ms.lastmap)

            //910000000
            //230040400
            // msMoudle.tiaotiao_map = "230040400.img";
            // msMoudle.tiaotiao_map = "240040510.img";

            // msMoudle.tiaotiao_map = "104000400.img";
            // msMoudle.tiaotiao_map = "101030404.img"


            // msMoudle.tiaotiao_map = "110040000.img"

            // msMoudle.tiaotiao_map = "100000200.img"
            // msMoudle.tiaotiao_map = "701010323.img"
            // msMoudle.tiaotiao_map = "200010300.img"

            // msMoudle.tiaotiao_map = "250010304.img"
            // msMoudle.tiaotiao_map = "103000900.img"

            // ms.lastmap = "910000000.img";

            msMoudle.tiaotiao_map = ms.lastmap;

            if(!msMoudle.idOldMap(ms.lastmap) || msMoudle.isBossMap((ms.lastmap)))
            msMoudle.tiaotiao_map = "910000000.img";


            this.map.Entry(msMoudle.gameP.di, msMoudle.tiaotiao_map);//913000000 105040310 302020100

            // if(true) {
            //     msMoudle.toast("xxxxx");
            //     // ms.saveServer();
            // }

            // Laya.timer.loop(10000, this, ()=> {
            //     if(msMoudle.tiaotiao_map == "240060200_gai.img") {
            //         msMoudle.isWorldBoss = false;
            //         this.gotoScene("910000000.img");
            //     }
            //     else {
            //         msMoudle.isWorldBoss = true;
            //         msMoudle.WorldBossLv = 140;
            //         this.gotoScene("240060200_gai.img");
            //     }
            // });

            Laya.timer.once(3500, this, this.onReward);
        }

        private gotoScene(mapid:string) : void {

            msMoudle.__(25);
            // msMoudle.gameP.ding1.visible = false;
            // msMoudle.gameP.ding2.visible = false;
            // msMoudle.gameP.ding3.visible = false;

            msMoudle.team_guanka_num = 0;       //第一/二关
            msMoudle.team_guanka1_num = 0;      //第三关
            msMoudle.team_guanka2_num = 0;
            msMoudle.team_guanka3_num = 0;
            msMoudle.mainT.clearMap();

            if(msMoudle.idOldMap(mapid)) {
                if(msMoudle.isTiaoMap(mapid) == false && !msMoudle.isBossMap(mapid)) {
                    ms.lastmap = mapid;
                }
            }

            msMoudle.gameP.map.Entry(msMoudle.gameP.di, mapid);//tm

            //切换地图就存储
            ms.saveServer();

            Laya.timer.once(3500, this, this.onReward);
        }

        timeTick:number;
        imgTimes : Array<Laya.Clip> = [this.clip1, this.clip2, this.clip3, this.clip4, this.clip5, this.clip6];
        startShowTime(_time:number) {

            this.timeTick = _time;

            let date = new Date();
            let curTime = Math.floor(date.getTime() / 1000);
            // this.timeTick = 5000;
            // console.log("###enter fish, curTime=" + curTime + ", this.timeTick=" + this.timeTick)
            if(curTime < this.timeTick) {
                let arr = utils.getLetters(this.timeTick - curTime);
                for(let i=0; i<this.imgTimes.length; ++i) {
                    this.updateImgNum(this.imgTimes[i], arr[i]);
                }
                Laya.timer.clear(this, this.updateTime);
                Laya.timer.loop(1000, this, this.updateTime);
            }
        }

        updateTime() {
            let date = new Date();
            let curTime = Math.floor(date.getTime() / 1000);
            if(curTime < this.timeTick) {
                let arr = utils.getLetters(this.timeTick - curTime);
                for(let i=0; i<this.imgTimes.length; ++i) {
                    this.updateImgNum(this.imgTimes[i], arr[i]);
                }
            }
            else {
                //
                // console.log("时间到了");
                msMoudle.gameP.btnBack2.visible = false;
                Laya.timer.clear(this, this.updateTime);
                Laya.timer.clear(msMoudle.mapP, msMoudle.mapP.getExp);
                msMoudle.team_guanka = 0;
                msMoudle.Effect("summerboating.timeout");
            }
        }

        updateImgNum(clip : Laya.Clip, num : number) {
            if(num < 0 || num > 9) return;
            clip.index = (num + 9) % 10;
        }

        //

    }
}