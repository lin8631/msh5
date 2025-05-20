/// <reference path="./../../scene/Other/Guide.ts" />
module app.battle {

    import cssGuide = GuideMoudle.Guide;
    export class moveDlg extends ui.battle.moveDlgUI implements ui.battle.ImoveDlgUI {
        public static className = "app.battle.moveDlg";

        constructor(params:any, fuben:boolean = false){
            super();
        }

        onInitialize(){

            // msMoudle.popShow(this, (800 - 480) / 2, (600 - 320) / 2);
            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 320) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.lstMove.vScrollBarSkin = "";

            this.updateData();

        }

        lvs:Array<number> = [];
        names:Array<string> = ["迷雾森林", "修炼", "幸运转盘", "伟大航路", "蜈蚣王", "闹钟", "扎昆", "转生", "暗黑龙穴", "玩家排名", "女神塔", "死神塔", "推广与代理", "轮回", "设置", "图鉴", "收集", "天赋", "跳跳任务", "金猪", "扭蛋机", "合成", "福利"]
        imgs:Array<string> = [
            ".0.disabled.0.png",
            ".802.mouseOver.0.png",
            ".36.mouseOver.0.png",
            ".4.mouseOver.0.png",
            ".26.mouseOver.0.png",
            ".23.mouseOver.0.png",
            ".812.mouseOver.0.png",
            ".802.mouseOver.0.png",
            ".17.disabled.0.png",
            ".1.mouseOver.0.png",
            "SlideMenu.3.BtMain.11.mouseOver.0.png",
            "SlideMenu.3.BtMain.11.mouseOver.0.png",
            ".30.mouseOver.0.png",
            ".802.mouseOver.0.png",
            ".30.mouseOver.0.png",
            ".30.mouseOver.0.png",
            ".30.mouseOver.0.png",
            ".802.mouseOver.0.png",
            "SlideMenu.3.BtMain.11.mouseOver.0.png",
            ".36.mouseOver.0.png",
            ".36.mouseOver.0.png",
            ".36.mouseOver.0.png",
            ".36.mouseOver.0.png"
            ];
        public updateData(){
            this.lvs = [ms.miwu, 0, ms.zhuanpan, ms.zhuzhu, 60, 80, 100, 200, 120, 0, 125, 150, 0, 60, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let tArr:Array<any> = [];
            for(let i:number = 0; i < 23; i++) {
                tArr[i] = new Object();
                tArr[i].img = this.imgs[i];
                tArr[i].name = this.names[i];
                tArr[i].lv = this.lvs[i];
            }
            this.lstMove.dataModel = tArr;
        }

        onLstMoveCellClick(e: Laya.Event, index: number): void {
            if(index == 0) {this.onBtn1Click(null);}
            else if(index == 1) {this.onBtn6Click(null);}
            else if(index == 2) {this.onBtn10Click(null);}
            else if(index == 3) {this.onBtn12Click(null);}
            else if(index == 4) {this.onBtn7Click(null);}
            else if(index == 5) {this.onBtn8Click(null);}
            else if(index == 6) {this.onBtn3Click(null);}
            else if(index == 7) {this.onBtn9Click(null);}
            else if(index == 8) {this.onBtn5Click(null);}//黑龙
            else if(index == 9) {this.onBtn11Click(null);}//pvp排名
            else if(index == 10) {this.onBtn2Click(null);}//女神塔
            else if(index == 11) {this.onBtn14Click(null);}
            else if(index == 12) {this.onBtn15Click(null);}//推广员
            else if(index == 13) {this.onBtn16Click(null);}//{this.onBtn15Click(null);} //合成
            else if(index == 14) {this.onBtn17Click(null);}
            else if(index == 15) {this.onBtn18Click(null);}
            else if(index == 16) {this.onBtn19Click(null);}
            // else if(index == 17) {this.onBtn20Click(null);}
            else if(index == 17) {this.onBtn22Click(null);}
            else if(index == 18) {this.onBtn21Click(null);}
            else if(index == 19) {this.onBtn23Click(null);}
            else if(index == 20) {this.onBtn24Click(null);}
            else if(index == 21) {this.onBtn25Click(null);}
            else if(index == 22) {this.onBtn26Click(null);}
            // else if(index == 15) {}//图鉴 (组合额外获得属性加成)
            // else if(index == 16) {this.onBtn16Click(null);}//进阶II
        }

        onBtn1Click(e: Laya.Event): void {
            if(ms.miwu > 0) {
                if(ms.guanka >= 5) {
                    msMoudle.MapInit();
                    // ui.show(app.fuben.jumpDlg, {params:[2], black:true});
                    ui.show(app.battle.addTeamDlg, {params:[this, false, true]});
                }
                else {
                    msMoudle.toast2("当前地图探索关卡低于5关");
                }
            }
            else {
                msMoudle.toast2("您没有入场券(探索关卡越高，获得经验越高)");
            }
        }
        onBtn3Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 100) {
                // if(ms.dboss3 > 0) {
                    msMoudle.MapInit();

                    msMoudle.WorldBossLv = 120;
                    msMoudle.isWorldBoss = true;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                // }
                // else {
                //     msMoudle.toast2("今日挑战次数已用尽!");
                // }
            }
            else {
                msMoudle.toast2("需要角色达到100级(有3%几率爆必成卷轴)");
            }
        }
        onBtn5Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 120) {
                // if(ms.dboss4 > 0) {
                    msMoudle.MapInit();

                    msMoudle.WorldBossLv = 140;
                    msMoudle.isWorldBoss = true;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                // }
                // else {
                //     msMoudle.toast2("今日挑战次数已用尽!");
                // }
            }
            else {
                msMoudle.toast2("需要角色达到120级(有几率获得黑暗卷轴)");
            }
        }
        onBtn2Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 125) {
                // ms.dboss4 = 3;
                if(ms.dboss4 > 0) {
                    msMoudle.MapInit();

                    msMoudle.isWuJin = true;
                    msMoudle.wujin_tip = 0;
                    msMoudle.wujin_guanka = 0;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                }
                else {
                    msMoudle.toast2("当日挑战次数已用尽");
                }
            }
            else {
                msMoudle.toast2("需要角色达到125级(可获得大量奖励)");
            }

            // ui.show(app.battle.addTeamDlg, {params:[this, false, false, true]});

            // this.close();
        }
        onBtn4Click(e: Laya.Event): void {
            // msMoudle.MapInit();

            // if(ms.tiaotiao > 0) {
            //     msMoudle.isTiaoTiao = true;
            //     ui.show(app.fuben.jumpDlg, {params:[1], black:true});
            //     // ui.show(app.fuben.tiaoDlg, {black:true});
            // }
            // else {
            //     msMoudle.toast2("您没有入场券!");
            // }
        }
        onBtn6Click(e: Laya.Event): void {
            // if(ms.herodata.Lv >= 60) {
                this.visible = false;
                ui.show(app.zhaomu.xiulianDlg);
            // }
            // else {
            //     msMoudle.toast2("需要角色达到60级");
            // }
        }
        onBtn7Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 60) {
                // if(ms.dboss1 > 0) {
                    msMoudle.MapInit();

                    msMoudle.WorldBossLv = 80;
                    msMoudle.isWorldBoss = true;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                // }
                // else {
                //     msMoudle.toast2("今日挑战次数已用尽!");
                // }
            }
            else {
                msMoudle.toast2("需要角色达到60级(有几率爆80级装备)");
            }
        }
        onBtn8Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 80) {
                // if(ms.dboss2 > 0) {
                    msMoudle.MapInit();

                    msMoudle.WorldBossLv = 100;
                    msMoudle.isWorldBoss = true;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                // }
                // else {
                //     msMoudle.toast2("今日挑战次数已用尽!");
                // }
            }
            else {
                msMoudle.toast2("需要角色达到80级(有几率爆100级装备)");
            }
        }
        onBtn9Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 200) {
                ui.show(app.zhaomu.jobDlg);
            }
            else {
                msMoudle.toast2("需要角色达到200级");
            }
        }
        onBtn10Click(e: Laya.Event): void {
            if(ms.zhuanpan > 0) {
                ui.show(app.event.TurntableDlg);    //转盘
            }
            else {
                msMoudle.toast2("您没有入场券!");
            }
        }
        onBtn11Click(e: Laya.Event): void {
            //等级不能相差太大
            //禁止使用主动技能
            //对方加血加错队伍了

            // if(ms.herodata.Lv >= 100) {
                ui.show(app.pvp.pvp2Dlg);
            // }
            // else {
            //     msMoudle.toast2("需要角色达到100级");
            // }
        }
        onBtn12Click(e: Laya.Event): void {
            if(ms.zhuzhu > 0) {
                ui.show(app.fuben.jumpDlg, {params:[5], black:true});
            }
            else {
                msMoudle.toast2("您没有入场券!");
            }
        }

        onBtn14Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 150) {
                if(ms.dboss3 > 0) {
                    msMoudle.MapInit();

                    msMoudle.isWuJin = true;
                    msMoudle.wujin_tip = 1;
                    msMoudle.wujin_guanka = 0;
                    ui.show(app.battle.addTeamDlg, {params:[this]});
                }
                else {
                    msMoudle.toast2("当日挑战次数已用尽");
                }
            }
            else {
                msMoudle.toast2("需要角色达到150级(可获得大量奖励)");
            }
        }
        onBtn15Click(e: Laya.Event): void {
            if(msMoudle.qudao == false) {
                this.close();
                ui.show(app.event.tgDlg, {black:true});
            }
            // if(ms.herodata.Lv >= 135) {
            //     msMoudle.MapInit();

            //     msMoudle.WorldBossLv = 160;
            //     msMoudle.isWorldBoss = true;
            //     ui.show(app.battle.addTeamDlg, {params:[this]});
            // }
            // else {
            //     msMoudle.toast2("需要角色达到135级(可获得大量奖励)");
            // }
            // if(ms.dboss1 > 0) {
                // msMoudle.MapInit();

                // msMoudle.tiaotiao_map = "000050000.img";
                // // if(ms.tiaotiao > 0) {
                //     msMoudle.isTiaoTiao = true;
                //     ui.show(app.fuben.jumpDlg, {params:[10], black:true});
            // }
            // else {
            //     msMoudle.toast2("当日挑战次数已用尽");
            // }
                // ui.show(app.fuben.tiaoDlg, {black:true});
            // }
            // else {
            //     msMoudle.toast2("您没有入场券!");
            // }
        }
        onBtn16Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 60) {
                ui.show(app.zhaomu.lunhuiDlg);
                // msMoudle.toast("xxxx")
                // msMoudle.MapInit();

                // msMoudle.WorldBossLv = 180;
                // msMoudle.isWorldBoss = true;
                // ui.show(app.battle.addTeamDlg, {params:[this]});
            }
            else {
                msMoudle.toast2("需要角色达到60级!");
            }
        }

        onBtn17Click(e: Laya.Event): void {
            ui.show(app.common.VoiceDlg, {black:true});
        }

        onBtn18Click(e: Laya.Event): void {
            //图鉴
            ui.show(app.zhaomu.allDlg);//, {black:true}
        }

        onBtn19Click(e: Laya.Event): void {
            //收集
            ui.show(app.zhaomu.shoujiDlg);
        }

        onBtn20Click(e: Laya.Event): void {
            if(ms.herodata.Lv >= 200) {
                msMoudle.MapInit();
                msMoudle.isWuJin = true;
                msMoudle.wujin_tip = 2;
                msMoudle.wujin_guanka = 0;
                ui.show(app.battle.addTeamDlg, {params:[this]});
            }
            else {
                msMoudle.toast2("需要角色达到200级!");
            }
        }

        onBtn21Click(e: Laya.Event): void {

            ui.show(app.fuben.tiaoDlg);

            // if(ms.herodata.Lv >= 200) {
            //     ui.show(app.tujian.dazaoDlg);
            // }
            // else {
            //     msMoudle.toast2("需要角色达到200级!");
            // }
        }

        onBtn22Click(e: Laya.Event): void {
            ui.show(app.char.skillDlg);
        }

        onBtn23Click(e: Laya.Event): void {
            this.close();

            ui.show(app.fuben.huodongDlg, {black:true})
        }

        onBtn24Click(e: Laya.Event): void {
            // msMoudle.toast("xxx");
            ui.show(app.battle.questDlg, {black:true})
            this.close();
        }

        onBtn25Click(e: Laya.Event): void {
            ui.show(app.battle.hecheng2Dlg)
        }

        onBtn26Click(e: Laya.Event): void {
            this.close();
            ui.show(app.event.flDlg, {black:true});
        }

        onBtn13Click(e: Laya.Event): void {
            this.close();
            ui.show(app.zhaomu.tujianDlg, {black:true});
        }

        onBtnBackClick(e: Laya.Event): void {
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

        onClose() {}

    }
}