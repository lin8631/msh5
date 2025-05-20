/// <reference path="./BaseView.ts" />
namespace ui {
    export class BaseDialog extends BaseView {
        private _dataModel: any;

        btnHelp: Laya.Button;
        constructor() {
            super();

        }

        get dataModel(): any {
            return this._dataModel;
        }

        set dataModel(value: any) {
            this._dataModel = value;
            this.updateData(value);
        }

        protected updateData(data: any) {

        }

        get displayLayer(): DisplayLayer {
            return ui.manager.getDisplayLayer(this);
        }

        show(opt?: ShowOptions) {
            ui.manager.show(this, DisplayLayer.MAIN, opt);

        }

        popup(opt?: ShowOptions) {
            ui.manager.show(this, DisplayLayer.POPUP, opt);
        }

        close(result: DialogResult = DialogResult.No, data?: any) {
            ui.manager.close(this, result, data);
        }

        //通用事件
        // onBtnBackClick(e: Laya.Event): void {
        //     this.close();
        // }

        // onBtnTipsClick(e: Laya.Event): void {
        //     let btnTips = this["btnTips"] as Laya.Button;
        //     if(btnTips == null) return;
        //     let tag = Number(btnTips.tag);
        //     if(tag > 0) {
        //         //读取配置
        //         //
        //         // let config = Data.getHelp(tag);
        //         // if(config) {
        //         //     ui.popup(app.common.AidDlg, {closeOnClick: true, params:[config.des]}).done(dlg => {
        //         //         dlg.on(Laya.Event.CLOSE, this, null);
        //         //     });
        //         // }
        //     }
        // }
        ////
    }
}
