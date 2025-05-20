module app.battle {

    export class selshwoDlg extends ui.battle.selshwoDlgUI implements ui.battle.IselshwoDlgUI {
        public static className = "app.battle.selshwoDlg";

        m_index:number = 0;
        constructor(params:any){
            super();

            this.m_index = params;
        }

        onInitialize(){

            this.x = (Laya.stage.width - 680) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 420) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        public updateData(){
            this.lstTxt.vScrollBarSkin = "";

            if(this.m_index == 0) {
                this.title.text = "伤害影响因素规则";
                this.txt1.visible = true;
            }
            else {
                this.title.text = "职业羁绊";
                this.txt1.visible = false;
            }

        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {

        }

    }
}