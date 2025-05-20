module app.char {
    export class petItem extends ui.char.pettemUI  {
        public static className = "app.char.petItem";

        updateData(data: any, index: number) {
            this._equip.visible = false;
            this._pinzhi.skin = "";
            if(data) {
                this._pinzhi.skin = "homeland/img_pingzhikuang5.png";

                if(data.type == "pet")
                this._img.skin = "res/Pet/" + data.id + ".img/info.icon.png";
                else if(data.type == "ring")
                this._img.skin = "res/Character/Ring/" + data.id + ".img/info.icon.png";
                else if(data.type == "tamingmob")
                this._img.skin = "res/Character/TamingMob/" + data.id + ".img/info.icon.png"
                else if(data.type == "chair")
                this._img.skin = "res/Character/Chair/0301.img/" + data.id + ".info.icon.png"

                this._equip.visible = data.sel;
            }
        }

        onClose() {

        }

        /////

    }
}