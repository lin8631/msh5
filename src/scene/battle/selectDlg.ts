/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.battle {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class selectDlg extends ui.battle.selectDlgUI implements ui.battle.IselectDlgUI {
        public static className = "app.battle.selectDlg";

        private m_data:any;
        private m_msg:cssMsg;

        constructor(params:any){
            super();

            this.m_data = params;
        }

        onInitialize(){

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = false;
            //         }
            //     }
            // }

            // this.m_msg = new cssMsg();
            this.updateData();
        }

        onBtnYesClick(e: Laya.Event): void {
            ms.herodata.sellAll();
            this.close();
        }
        onBtnNoClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {
        }

        updateData(){

        }

    }
}