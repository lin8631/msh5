module app.battle {

    export class moveItem extends ui.battle.moveItemUI  {
        public static className = "app.battle.moveItem";

        updateData(data: any, index: number) {
            this._lv.text = "";
            this._name.text = "";
            this._time.text = "0次";
            this._time.color = "#FFFFFF";
            this._time.strokeColor = "#000000";
            if(data) {
                this._name.text = data.name;
                this._img.skin = "homeland/SlideMenu.0.BtMain" + data.img;
                if(index >= 4) {
                    if(data.lv > 0) this._lv.text = data.lv + "级";
                    this._time.text = "";
                    if(index == 10) {
                        this._time.text = ms.dboss4 + "次";
                        this._time.color = "#FFFFFF";
                        this._time.strokeColor = "#1920b7";
                    }
                    else if(index == 11) {
                        this._time.text = ms.dboss3 + "次";
                        this._time.color = "#FFFFFF";
                        this._time.strokeColor = "#1920b7";
                    }
                }
                else {
                    if(data.lv > 0) {
                        this._time.text = data.lv + "次";
                        this._time.color = "#7cf84c";
                    }
                    if(index == 1) this._time.text = "";
                }
            }
        }

        onClose() {

        }

        /////

    }
}