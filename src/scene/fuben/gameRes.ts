/// <reference path="./../../core/ms/Maple/Mob.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    export class gameRes extends ui.fuben.gameResUI implements ui.fuben.IgameResUI {
        public static className = "app.fuben.gameRes";

        onInitialize(){
            this.updateData();

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;
        }

        updateData() : void {

        }

        onBtnYesClick(e: Laya.Event): void {
            let dlg = ui.manager.getDialogByName("app.fuben.huodongDlg").dlg;
            if(dlg && dlg.games) {
                for(let i:number = 0; i < dlg.games.length; i++) {
                    if(dlg.games[i]) {
                        dlg.games[i].clearUp();
                    }
                }
                ui.manager.getDialogByName("app.fuben.huodongDlg").dlg.close();
            }
            Laya.loader.clearRes("atlas/StarGame.atlas");
            Laya.SoundManager.playMusic(msMoudle._music);
            this.close();
            /////背景音乐还原

        }

        //
    }
}