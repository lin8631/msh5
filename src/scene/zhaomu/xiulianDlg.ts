/// <reference path="./../../core/ms/Maple/Msg.ts" />
module app.zhaomu {

    import cssMsg = MsgRole.Msg;
    export class xiulianDlg extends ui.zhaomu.xiulianDlgUI implements ui.zhaomu.IxiulianDlgUI  {

        public static className = "app.zhaomu.xiulianDlg";
        private m_msg:cssMsg;

        onInitialize(){
            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 500) / 2 - (Laya.stage.height - 600) / 2;

            this.m_msg = new cssMsg();
            this.lstXiuLian.hScrollBarSkin = "";
            this.updateData();
        }

        onClose() {

        }

        updateData(){
            let xx:Array<any> = ["生命", "攻击", "防御", "命中", "闪避", "暴击", "速度", "召唤"];
            let tArr:Array<any> = new Array(8);
            for(let i:number = 0; i < 8; i++) {
                tArr[i] = new Object();
                tArr[i].name = xx[i];
                if(!ms.herodata.XL[i]) ms.herodata.XL[i] = 0;
                tArr[i].lv = ms.herodata.XL[i];
            }
            this.lstXiuLian.dataModel = tArr;
        }

        onLstXiuLianCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "buy") {
                if(ms.cailiao2() >= 25 * (ms.herodata.XL[index] + 1)) {
                    msMoudle._(); msMoudle.updateCaiLiao2(-25 * (ms.herodata.XL[index] + 1))
                    msMoudle.toast("修炼成功");

                    ms.herodata.XL[index]++;
                    this.updateData();

                    ms.saveServer();
                }
                else {
                    msMoudle.toast2("材料不足");
                }
            }
            else if(childVarName == "_img") {
                this.m_msg.itemShow(6000000020 + index);
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
            if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                    ui.manager.getDialogByName("app.battle.moveDlg").dlg.visible = true;
                }
            }
        }

    }
}