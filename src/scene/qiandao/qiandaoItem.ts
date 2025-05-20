module app.qiandao {

    export class qiandaoItem extends ui.qiandao.qiandaoItemUI  {
        public static className = "app.qiandao.qiandaoItem";

        updateData(data: any, index: number) {
            if(data) {
                this._name.text = "第" + data["json"].shopid + "天";
                this._img.skin = data["json"].icon;
                this.btnReward.visible = data.select;
                this._wancheng.visible = data.lingqu;
            }
        }

        onClose() {

        }

        /////

    }
}