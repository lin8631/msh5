module app.char {

    export class bagItem3 extends ui.char.bagItem3UI  {
        public static className = "app.char.bagItem3";

        updateData(data: any, index: number) {
            this._img.skin = "";
            this._num.text = "";
            this._suo.visible = false;
            if(data) {
                let edata:any;
                if(data.type == 0) {
                    edata = msMoudle.getItemMsg(data.id);
                }
                else if(data.type == 1) edata = msMoudle.getEqpMsg(data.id, false);
                if(edata) {
                    this._img.skin = edata.img;
                    if(data.num > 1) this._num.text = data.num;
                }
                if(data.suo) this._suo.visible = true;
            }
        }

        onClose() {

        }

        /////

    }
}