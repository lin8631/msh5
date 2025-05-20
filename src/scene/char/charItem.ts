module app.char {

    export class charItem extends ui.char.charItemUI  {
        public static className = "app.char.charItem";

        updateData(data: any, index: number) {
            this._equip.visible = false;
            this.gray = false;
            this.name_sp.visible = false;
            if(data) {
                this.gray = data.have ? false : true;
                this.name_sp.visible = true;
                this._equip.visible = data.wear;
                this._img.skin = data["json"].img;
                this._name.text = data["json"].name;
            }
        }

        onClose() {

        }

        /////

    }
}