module app.battle {

    export class rewardItem extends ui.battle.rewardItemUI  {
        public static className = "app.battle.rewardItem";

        updateData(data: any, index: number) {
            this._num.text = "";
            this._name.text = "";
            this._pinzhi.skin = "";
            if(data) {
                this._img.skin = data.img;
                if(data.num > 1) this._num.text = "X" + data.num;
                this._name.text = data.name;
                this._pinzhi.skin = "homeland/img_pingzhikuang" + data.pinzhi + ".png";
            }
        }

        onClose() {

        }

        /////

    }
}