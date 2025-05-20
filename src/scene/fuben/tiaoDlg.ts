/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    export class tiaoDlg extends ui.fuben.tiaoDlgUI implements ui.fuben.ItiaoDlgUI {
        public static className = "app.fuben.tiaoDlg";

        constructor(){
            super();
        }

        // m_names = ["忍苦树林（一层）", "忍苦树林（二层）", "忍苦树林（三层）", "忍苦树林（四层）", "忍苦树林（五层）", "沉睡森林（一层）", "沉睡森林（二层）", "沉睡森林（三层）", "沉睡森林（四层）", "沉睡森林（五层）", "沉睡森林（六层）", "沉睡森林（七层）",
        // "三号线一号地区B1", "三号线一号地区B2", "三号线1号车库", "三号线二号地区B1", "三号线二号地区B2", "三号线2号车库", "三号线三号地区B1", "三号线三号地区B2", "三号线三号地区B3"];
        // m_map = ["101000100", "101000101", "101000102", "101000103", "101000104", "105040310", "105040311",
        // "105040312", "105040313", "105040314", "105040315", "105040316",
        // "103000900", "103000901", "103000902", "103000903", "103000904", "103000905", "103000906", "103000907", "103000908"];

        //, "忍苦树林（二层）"  "忍苦树林（四层）", "忍苦树林（五层）",
        //, "沉睡森林（二层）" . "沉睡森林（四层）",     "沉睡森林（六层）", "沉睡森林（七层）",
        //"三号线一号地区B2", "三号线1号车库", "三号线二号地区B2", "三号线2号车库", , "三号线三号地区B2", "三号线三号地区B3""三号线3号车库"
        //火山心藏ⅠI
        m_names = ["忍苦树林（一层）", "忍苦树林（三层）",
        "沉睡森林（一层）", "沉睡森林（三层）", "沉睡森林（五层）",
        "三号线一号地区B1", "三号线二号地区B1", "三号线三号地区B1",
        "火山心藏Ⅰ"];
        //, "101000101"     ,"101000103", "101000104",
        //"105040311",  "105040313",     "105040315", "105040316",
        //"103000901", "103000902", "103000904",  "103000905", , "103000907", "103000908" "103000909"
        //280020001
        m_map = ["101000100", "101000102",
        "105040310","105040312", "105040314",
        "103000900", "103000903", "103000906",
        "280020000"];

        onInitialize(){

            this.x = (Laya.stage.width - 640) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 420) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        updateData(){
            this.lstTiao.vScrollBarSkin = "";
            this.lstTiao.dataModel = this.m_names;
        }

        onLstTiaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "btnGo") {
                msMoudle.help = null;

                msMoudle.isTiaoTiao = true;
                msMoudle.tiaotiao_map = this.m_map[index] + ".img";
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                this.close();
                ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {

        }
        //
    }
}