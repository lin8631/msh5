/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.battle {

    export class chooseDlg extends ui.battle.chooseDlgUI implements ui.battle.IchooseDlgUI {
        public static className = "app.battle.chooseDlg";

        constructor(params:any){
            super();
        }

        onInitialize(){

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            // let a = true;
            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = false;
            //         }
            //     }
            // }

            this.updateData();
        }

        onBtnYesClick(e: Laya.Event): void {
            ui.manager.getDialogByName("app.battle.selDlg").dlg.selOK();
            this.close();
        }
        onBtnNoClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {
        }

        // daan:number = 0;
        updateData(){

        }

    }
}