module app.battle {

    export class yuchengItem extends ui.battle.yuchengItemUI  {
        public static className = "app.battle.yuchengItem";

        updateData(data: any, index: number) {
            // this._img.visible = data ? true : false;
            this.pinzhi.visible = data ? true : false;
            this._select.visible = false;
            this._lv.text = "";
            this._star.visible = false;
            this.isjuexing.visible = false;
            if(data) {
                this._star.visible = true;
                this.isjuexing.visible = data["json"].juexing;
                this._starNum.text = data["json"].star;
                this._lv.text = "Lv " + data["json"].Lv;
                this._select.visible = data.sel;
                this.pinzhi.skin = "homeland/img_pingzhikuang" + data["json"].pinzhi + ".png";
                // this.cc.visible = data.cc;
                this._name.text = data["json"].Name;
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