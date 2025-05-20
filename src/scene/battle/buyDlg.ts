/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.battle {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class buyDlg extends ui.battle.buyDlgUI implements ui.battle.IbuyDlgUI {
        public static className = "app.battle.buyDlg";

        private m_data:any;
        private m_msg:cssMsg;

        constructor(params:any){
            super();

            this.m_data = params;
        }

        onInitialize(){

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            // this.m_msg = new cssMsg();
            this.updateData();
        }

        onBtnYesClick(e: Laya.Event): void {
            //番外角色可通过积分获取
            if(this.m_data >= 39) {
                if(ms.jifen() >= 5000) {
                    msMoudle._(); msMoudle.updateJiFen(-5000);
                    ui.manager.getDialogByName("app.battle.selDlg").dlg.addHero(this.m_data);
                    ms.saveServer();
                    this.close();
                    return ;
                }
                else {
                    msMoudle.toast("该角色只能通过积分开启");
                    this.close();
                }
            }
            else {
                if(ms.herodata.Lv >= 100 && ms.zy100 == 0) {
                    ms.zy100 = 1;
                    ui.manager.getDialogByName("app.battle.selDlg").dlg.addHero(this.m_data);
                    ms.saveServer();
                    this.close();
                    return ;
                }
                if(ms.herodata.Lv >= 160 && ms.zy160 == 0) {
                    ms.zy160 = 1;
                    ui.manager.getDialogByName("app.battle.selDlg").dlg.addHero(this.m_data);
                    ms.saveServer();
                    this.close();
                    return ;
                }
                if(ms.herodata.Lv >= 200 && ms.zy200 == 0) {
                    ms.zy200 = 1;
                    ui.manager.getDialogByName("app.battle.selDlg").dlg.addHero(this.m_data);
                    ms.saveServer();
                    this.close();
                    return ;
                }
                // this.tj1.text = "100级可免费开启一个职业(" + ms.zy100 + "/1)";
                // this.tj2.text = "160级可免费开启一个职业(" + ms.zy160 + "/1)";
                // this.tj3.text = "200级可免费开启一个职业(" + ms.zy200 + "/1)";
                // this.tj4.text = "5000积分可兑换一个职业(" + ms.jifen() + ")";
                if(ms.zuanshi() >= 500) {
                    msMoudle._(); msMoudle.updateZuanShi(-500, 202);
                    ui.manager.getDialogByName("app.battle.selDlg").dlg.addHero(this.m_data);
                    ms.saveServer();
                }
                else {
                    msMoudle.toast("黑金不足");
                }
                this.close();
            }
        }
        onBtnNoClick(e: Laya.Event): void {
            // this.isTure(0);
            this.close();
        }

        onClose() {
        }

        // daan:number = 0;
        updateData(){
            // this.content.text = "花费200黑金开启该职业？";
            this.tj1.text = "100级可免费开启一个职业(" + ms.zy100 + "/1)";
            this.tj2.text = "160级可免费开启一个职业(" + ms.zy160 + "/1)";
            this.tj3.text = "200级可免费开启一个职业(" + ms.zy200 + "/1)";
            this.tj4.text = "5000积分可兑换一个职业(" + ms.jifen() + ")";
        }

    }
}