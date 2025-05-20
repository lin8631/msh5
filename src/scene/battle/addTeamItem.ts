module app.battle {

    export class addTeamItem extends ui.battle.addTeamItemUI  {
        public static className = "app.battle.addTeamItem";

        updateData(data: any, index: number) {
            this._img.visible = data ? true : false;
            this.pinzhi.visible = data ? true : false;
            this._lv.text = "";
            this.cc.visible = false;
            this._star.visible = false;
            this.isjuexing.visible = false;
            if(data) {
                this._star.visible = true;
                this.isjuexing.visible = data.juexing;
                this._starNum.text = data.star;
                this._lv.text = "Lv " + data.Lv;
                this.bg.gray = data.cc;
                this.pinzhi.skin = "homeland/img_pingzhikuang" + data["json"].pinzhi + ".png";
                this.cc.visible = data.cc;
                this._name.text = data["json"].Name;
                for(let key in msMoudle.herojson) {
                    if(msMoudle.herojson[key].id == data["json"].id) {
                        break;
                    }
                }
                // this._img.skin = data["json"].head;
                this._img.skin = "res/Character/Cap/" + msMoudle.herojson[Number(data["json"].id)-1001].head + ".img/info.icon.png";
            }
        }

        onClose() {

        }

        /////

    }
}