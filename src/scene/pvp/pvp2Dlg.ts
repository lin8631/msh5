module app.pvp {

    export class pvp2Dlg extends ui.pvp.pvp2DlgUI implements ui.pvp.Ipvp2DlgUI {

        public static className = "app.pvp.pvp2Dlg";

        onInitialize(){

            // Laya.stage.addChild(this.bg);
            // this.bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

            if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                    ui.manager.getDialogByName("app.battle.moveDlg").dlg.bg.visible = false;
                }
            }

            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 450) / 2 - (Laya.stage.height - 600) / 2;
            // msMoudle.popShow(this, (800 - 400) / 2, (600 - 500) / 2);

            this.lstPvp.vScrollBarSkin = "";
            this.updateData();
        }

        onClose() {

        }

        tArr:Array<any> = [];
        updateData(){
            //获取对手信息
            let message = new Net.Message();
            message.xieyi = 300 + ms._dpip;
            message.msdata = {};
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                if(data["code"] == 0) {
                    if(data["msdata"]._context.length > 0) {
                        let datalist:any = JSON.parse(data["msdata"]._context);
                        if(datalist) {
                            let myrnk = 100;
                            for(let key in datalist) {
                                if(datalist[key].id == ms._user) {
                                    myrnk = Number(key) + 1;;
                                    break;
                                }
                            }
                            for(let key in datalist) {
                                this.tArr[key] = new Object();
                                // this.tArr[key].rank = datalist[key].rank;
                                this.tArr[key].id = datalist[key].id;
                                this.tArr[key].name = datalist[key].name;
                                this.tArr[key].lv = datalist[key].lv;
                                this.tArr[key].sex = datalist[key].sex;
                                if(datalist[key].msg) this.tArr[key].msg = datalist[key].msg;
                                this.tArr[key].myrnk = myrnk;
                                this.lstPvp.dataModel = this.tArr;
                            }
                        }
                    }
                }
            }});

        }

        onLstPvpCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "battle") {
                ///后续加个充值的点数，对应黑金数量
                if(msMoudle.guaTest()) return ;
                if(msMoudle.xianzhiTest(ms._user) == true) {//
                    msMoudle.toast("你的账号被限制pk了!");
                    return ;
                }
                // if(ms.huoli <= 0) {
                //     msMoudle.toast("体力不足");
                //     return ;
                // }
                if(ms.herodata.Lv >= 50) {
                    ui.show(app.pvp.pmsgDlg, {params:[this.tArr, index],white:true});
                }
                else {
                    msMoudle.toast("需要角色达到50级!");
                }
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
            // msMoudle.popClose(this, 200, 250);
            if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                    ui.manager.getDialogByName("app.battle.moveDlg").dlg.bg.visible = true;
                }
            }
        }

    }
}