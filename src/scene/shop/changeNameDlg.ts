/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.shop {

    export class changeNameDlg extends ui.shop.changeNameDlgUI implements ui.shop.IchangeNameDlgUI {
        public static className = "app.shop.changeNameDlg";

        constructor() {
            super();
        }

        onInitialize(){
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (800 - 300) / 2;
            this.y = (600 - 210) / 2;

            this.updateData();
        }

        updateData(){

        }

         onBtn_querenClick(e: Laya.Event): void {
            if(this._name.text.length > 0) {
                msMoudle.toast("修改成功");
                ms.herodata.Name = this._name.text;
                ms.testname = this._name.text;
                // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg._name.text = ms.herodata.Name;
                ms.saveServer();
                this.close();
            }
         }

        onClose() {

        }
        //
    }
}