/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.pvp {
    import cssMsg = MsgRole.Msg;

    export class pmsgDlg extends ui.pvp.pmsgDlgUI implements ui.pvp.IpmsgDlgUI {
        public static className = "app.pvp.pmsgDlg";

        m_params:any;
        m_index:number = 0;
        constructor(params:any, index:number){
            super();
            this.m_params = params;
            this.m_index = index;
        }

        onInitialize(){
            this.x = (Laya.stage.width - 360) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;
            this.updateData();
        }

        updateData(){

        }

        onBtnYesClick(e: Laya.Event): void {

            if(this.m_params[this.m_index].id == ms._user) {
                msMoudle.toast2("你不能挑战你自己");
            }
            else {
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.bg.visible = false;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.vs.visible = true;

                if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                    if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                        ui.manager.getDialogByName("app.battle.moveDlg").dlg.bg.visible = false;
                    }
                }

                //初始化
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.name1.text = ms.herodata.Name;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.lv1.text = "当前等级" + ms.herodata.Lv;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.head1.skin = msMoudle.characterjson[ms.herodata.Sex].head;

                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.name2.text = this.m_params[this.m_index].name;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.lv2.text = "当前等级" + this.m_params[this.m_index].lv;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.head2.skin = msMoudle.characterjson[this.m_params[this.m_index].sex].head;

                msMoudle.pvpID = this.m_params[this.m_index].id;

                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.m_left.x = -60 - Laya.stage.width / 2;
                ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.m_right.x = 237 + Laya.stage.width / 2;
                Laya.Tween.to(ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.m_left, { x: -60 }, 450, Laya.Ease["backInOut"]);
                Laya.Tween.to(ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.m_right, { x: 237 }, 450, Laya.Ease["backInOut"]);

                Laya.timer.once(3000, this, ()=> {
                    msMoudle.isPvp = true;
                    msMoudle.specialPvp = true;

                    msMoudle.gameP.gotoScene("222010402_gai.img");
                    // msMoudle.gameP.ding1.visible = false;
                    // msMoudle.gameP.ding2.visible = false;
                    // msMoudle.gameP.ding3.visible = false;

                    if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                        if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                            ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
                        }
                    }

                    ui.manager.getDialogByName("app.pvp.pvp2Dlg").dlg.close();
                });
            }
            this.close();

        }
        onBtnNoClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {

        }
        //
    }
}