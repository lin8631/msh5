module app.battle {

    export class csItem extends ui.battle.csItemUI  {
        public static className = "app.battle.csItem";

        updateData(data: any, index: number) {
            this._name.text = "";
            if(data) {
                this._name.text = data.name;
                // this._lv.text = data.lv + "级";
                this._lv.text = "";
            }
        }

        onClose() {

        }

        /////

    }
}