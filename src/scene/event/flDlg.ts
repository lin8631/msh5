/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.event {

    export class flDlg extends ui.event.flDlgUI implements ui.event.IflDlgUI {
        public static className = "app.event.flDlg";

        protected onInitialize() {

            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 400) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        onClose():void {

        }

        updateData() {

        }

        onBtnOKClick(e: Laya.Event): void {
            if(ms.fuli == false) {
                if(this.reward.text == "") {
                    msMoudle.toast("请输入福利码");
                }
                else {
                    let woods:Array<string> = ["01032035", "01122015", "01122074", "01012325", "01092030", "01002419", "01102071", "01082252", "01302030", "01312106", "01332025", "01342026", "01382012", "01412011", "01422014", "01432012", "01442024", "01452022", "01462019", "01472032", "01482020", "01492020"];
                    if(this.reward.text == "888") {
                        if(ms.test_cz > 0) {
                            //全部枫叶装备
                            for(let i:number = 0; i < woods.length; i++) {
                                msMoudle._(); msMoudle.getWeapon(woods[i]);
                            }
                            this.succ();
                        }
                        else {
                            //福分福利装
                            for(let i:number = 0; i < 3; i++) {
                                let rnk = msMoudle.getRandValue(0, 0, woods.length);
                                msMoudle._(); msMoudle.getWeapon(woods[rnk]);
                            }
                            this.succ();
                        }
                    }
                    else {
                        msMoudle.toast("福利码错误");
                    }
                }
            }
            else {
                msMoudle.toast("你已经领取过了");
            }
        }

        succ() : void {
            ms.fuli = true;
            msMoudle.toast("领取成功");
            Laya.timer.once(2000, this, this.delayUpdate);
        }

        delayUpdate() : void {
            ms.saveServer();
        }

        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 300, 200);
            this.close();
            ui.show(app.battle.moveDlg, {black:true});
        }

        //

    }

}
