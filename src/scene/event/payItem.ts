module app.event {

    export class payItem extends ui.event.payItemUI  {
        public static className = "app.event.payItem";

        updateData(data: any, index: number) {
            this._num.text = "";
            this._name.text = "";
            this._pinzhi.skin = "";
            if(data) {
                this._img.skin = data.img;
                if(data.num > 1) this._num.text = "X" + data.num;
                // this._name.text = data.name;
                this._pinzhi.skin = "homeland/img_pingzhikuang" + data.pinzhi + ".png";
            }
        }

        onClose() {

        }

        /////

    }
}