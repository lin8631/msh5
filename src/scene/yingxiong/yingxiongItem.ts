module app.yingxiong {

    export class yingxiongItem extends ui.yingxiong.yingxiongItemUI {
        public static className = "app.yingxiong.yingxiongItem";

        updateData(data: any, index: number) {
            this._img.visible = data ? true : false;
            this.pinzhi.visible = data ? true : false;
            this._lv.text = "";
            this.cc.visible = false;
            this.select.visible = false;
            this._star.visible = false;
            this.isjuexing.visible = false;
            if(data) {
                this._star.visible = true;
                this._lv.text = "Lv " + data.lv;
                // this.select.visible = data.sel;
                this.isjuexing.visible = data.isjuexing;
                this._starNum.text = data.star;
                this.cc.visible = data.sel;
                this.pinzhi.skin = "homeland/img_pingzhikuang" + data["json"].pinzhi + ".png";
                // this.cc.visible = data.cc;
                this._name.text = data["json"].Name;
                // console.log(msMoudle.herojson, data["json"])
                this._img.skin = "res/Character/Cap/" + msMoudle.herojson[Number(data["json"].id)-1001].head + ".img/info.icon.png";
            }

        }

        onClose() {

        }

        /////

    }
}