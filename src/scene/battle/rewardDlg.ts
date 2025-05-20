/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.battle {
    import cssMsg = MsgRole.Msg;

    export class rewardDlg extends ui.battle.rewardDlgUI implements ui.battle.IrewardDlgUI {
        public static className = "app.battle.rewardDlg";
        private m_index:number = 0;
        private m_data:any;
        private m_msg:cssMsg;

        private flag:boolean = false;
        constructor(params:any, flag:boolean = false){
            super();
            this.flag = flag;
            this.m_data = params;
        }

        onInitialize(){
            // msMoudle.dlgShow();
            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.m_msg = new cssMsg();
            this.updateData();
        }

        onBtnCClick(e: Laya.Event): void {
            this.close();
            if(this.flag) {
                let a = true;
                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                }
            }
            // if(this.flag) {
            //     msMoudle.dlgClose();
            // }
        }

        onClose() {
            // msMoudle.dlgClose();
        }

        updateData(){

            this.lstReward.vScrollBarSkin = "";
            this.lstReward.dataModel = this.m_data;
            this.lstReward.mouseThrough = true;

            // this.btnC.pos(0, 0);
            this.btnC.graphics.drawRect( -(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.btnC.alpha = 0.8;

            ms.saveServer();
        }

        onLstRewardCellClick(e: Laya.Event, index: number): void {
            this.m_index = index;
            if(this.m_data[index].type == 1) this.m_msg.equipLoadShow(this.m_data[index].itemid);
            else this.m_msg.itemShow(Number(this.m_data[index].itemid));
        }

    }
}