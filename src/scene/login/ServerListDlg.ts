module app.login {

    export class ServerListDlg extends ui.login.ServerListDlgUI implements ui.login.IServerListDlgUI {
        public static className = "app.login.ServerListDlg";

        onInitialize(){
            msMoudle.popShow(this, (800 - 620) / 2, (600 - 380) / 2);
            this.updateData();
        }

        onClose() {

        }

        updateData(){
            let serList = new Array(msMoudle.setName.length);
            for(let i:number = 0; i < msMoudle.setName.length; i++) {
                serList[i] = new Object();
                serList[i].id = (i + 1);
                serList[i].name = msMoudle.setName[i];
                serList[i].isNew = true;
                serList[i].Status = 0;
            }
            // serList[3].isNew = false;
            this.lstAll.dataModel = serList;
        }

        onBtnBackClick(e: Laya.Event): void {
            msMoudle.popClose(this, 310, 190);
        }

        onLstRecentsCellClick(e: Laya.Event, index: number): void {
            msMoudle.popClose(this, 310, 190);
        }
        onLstAllCellClick(e: Laya.Event, index: number): void {
            laya.net.LocalStorage.setJSON("server", index);
            ui.manager.getDialogByName("app.login.loginDlg").dlg.updataServer();
            msMoudle.popClose(this, 310, 190);
        }

        //
    }
}