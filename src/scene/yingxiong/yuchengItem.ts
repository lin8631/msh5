module app.yingxiong {

    export class yuchengItem extends ui.yingxiong.yuchengItemUI  {
        public static className = "app.yingxiong.yuchengItem";

        updateData(data: any, index: number) {
            // this._img.visible = data ? true : false;
            this.pinzhi.visible = data ? true : false;
            this._select.visible = false;
            this._lv.text = "";
            if(data) {
                this._lv.text = "Lv " + data["json"].lv;
                this._select.visible = data.sel;
                this.pinzhi.skin = "homeland/img_pingzhikuang" + data["json"].pinzhi + ".png";
                // this.cc.visible = data.cc;
                this._name.text = data["json"].name;
                // this._img.skin = data["json"].head;
                this._img.skin = "res/Character/Cap/" + msMoudle.herojson[Number(data["json"].id)-1001].head + ".img/info.icon.png";
                this.pinzhi.gray = data.sel;
            }
        }

        onClose() {

        }

        /////

    }
}