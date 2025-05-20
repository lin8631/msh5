/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.createChar {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class buyDlg extends ui.createChar.buyDlgUI implements ui.createChar.IbuyDlgUI {
        public static className = "app.createChar.buyDlg";

        onInitialize(){

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            // this.m_msg = new cssMsg();
            this.updateData();
        }

        onBtnYesClick(e: Laya.Event): void {
            if(ms.zuanshi() >= Number(msMoudle.maplejson["换装费用"])) {
                ui.manager.getDialogByName("app.createChar.fashionDlg").dlg.saveQuit();
                ms.saveServer();
            }
            else {
                msMoudle.toast("黑金不足" + msMoudle.maplejson["换装费用"]);
                ui.manager.getDialogByName("app.createChar.fashionDlg").dlg.imgShow();
            }
            this.close();
        }

        onBtnNoClick(e: Laya.Event): void {
            this.close();
            ui.manager.getDialogByName("app.createChar.fashionDlg").dlg.imgShow();
        }

        onClose() {

        }

        updateData(){

        }

    }
}