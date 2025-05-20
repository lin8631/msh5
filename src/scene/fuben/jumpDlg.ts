/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {
    import cssMsg = MsgRole.Msg;

    export class jumpDlg extends ui.fuben.jumpDlgUI implements ui.fuben.IjumpDlgUI {
        public static className = "app.fuben.jumpDlg";

        m_index:number;
        constructor(params:any, index:number){
            super();
            this.m_index = params;
        }

        onInitialize(){
            if(this.m_index == 1 || this.m_index == 2 || this.m_index == 4 || this.m_index == 5) {
                this.x = (Laya.stage.width - 360) / 2 - (Laya.stage.width - 800) / 2;
                this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;
            }
            else {
                if(this.m_index == 10) {
                    msMoudle.popShow(this, (800 - 360) / 2, (600 - 240) / 2);
                }
                else {
                    msMoudle.popShow(this, (800 - 360) / 2, (600 - 240) / 2, true);
                }
            }
            this.updateData();
        }

        updateData(){
            if(this.m_index == 1) this.msg.text = "前往林中城挑战？";
            else if(this.m_index == 2) this.msg.text = "前往迷雾森林修炼？";
            else if(this.m_index == 3) this.msg.text = "是否前往村庄？";
            else if(this.m_index == 4) this.msg.text = "前往OX问答？";
            else if(this.m_index == 5) this.msg.text = "前往伟大航海？";
            else if(this.m_index == 10) this.msg.text = "前往野外探索？";
        }

         onBtn_querenClick(e: Laya.Event): void {
            if(this.m_index == 1 || this.m_index == 10) {
                // let goto = msMoudle.getRandValue(0, 0, 3);
                // if(goto == 0) {
                    // msMoudle.tiaotiao_map = "105040310.img";
                    // msMoudle.tiaotiao_nandu = 1;
                // }
                // else if(goto == 1) {
                //     msMoudle.tiaotiao_map = "105040311.img";
                //     msMoudle.tiaotiao_nandu = 2;
                // }
                // else {
                //     msMoudle.tiaotiao_map = "105040312.img";
                //     msMoudle.tiaotiao_nandu = 3;
                // }
                if(this.m_index == 1) ms.dboss2--;
                // else if(this.m_index == 10) ms.dboss1--;
                // msMoudle.gameP.ding1.visible = false;
                // msMoudle.gameP.ding2.visible = false;
                // msMoudle.gameP.ding3.visible = false;
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                    if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                        ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
                    }
                }
            }
            else if(this.m_index == 2 || this.m_index == 4) {
                msMoudle.gameP.gotoScene("302020100_gai.img");
                ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
            }
            else if(this.m_index == 3) msMoudle.gameP.gotoScene("910000000.img");
            else if(this.m_index == 5) {
                msMoudle.gameP.gotoScene("141060000_gai.img");
                ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
            }
            this.close();
         }

        onBtn_closeClick(e: Laya.Event): void {
            if(this.m_index == 1 || this.m_index == 2 || this.m_index == 4 || this.m_index == 5) {
                this.close();
            }
            else {
                if(this.m_index == 10) {
                    msMoudle.popClose(this, 180, 120);
                }
                else {
                    msMoudle.popClose(this, 180, 120, true);
                }
            }
        }

        onClose() {

        }
        //
    }
}