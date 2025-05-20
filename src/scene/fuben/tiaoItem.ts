module app.fuben {

    export class tiaoItem extends ui.fuben.tiaoItemUI  {
        public static className = "app.fuben.tiaoItem";

        updateData(data: any, index: number) {
            this.btnGo.visible = false;
            this.tg.text = "";
            if(data) {
                this._name.text = data;
                this._jifen.text = 250 * (index + 1) + "积分";
                if(ms.tiaogk == index) {
                    this.btnGo.visible = true;
                }
                else if(ms.tiaogk > index) {
                    this.tg.text = "已通关";
                }
                else {
                    this.tg.text = "未开始";
                }
            }
        }

        onClose() {

        }

        /////

    }
}