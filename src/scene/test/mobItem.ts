module app.test {

    export class mobItem extends ui.test.mobItemUI {
        public static className = "app.test.mobItem";

        updateData(data: any, index: number) {
            this._name.text = "";
            this._img.skin = "";
            if(data) {
                // let item = msMoudle.getSkillMsg(data.name);
                // let item = msMoudle.getItemMsg(data.name);
                // if(item) {
                //     this._name.text = item.name + "(" + data.name + ")";
                //     this._name.fontSize = 16;

                // }
                // else
                    this._name.text = data.name;
                    this._img.skin = "res/Mob/" + data.id + ".img/stand.0.png";
                this._name.color = data.col;
            }
        }

        onClose() {

        }

        /////

    }
}