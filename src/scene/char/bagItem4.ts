module app.char {

    export class bagItem4 extends ui.char.bagItem4UI  {
        public static className = "app.char.bagItem4";

        updateData(data: any, index: number) {
            this._img.skin = "";
            this._num.text = "";
            this._suo.visible = false;
            this.cc.visible = false;
            if(data) {
                let edata:any;
                if(data["json"].type == 0) {
                    edata = msMoudle.getItemMsg(data["json"].id);
                }
                else if(data["json"].type == 1) edata = msMoudle.getEqpMsg(data["json"].id, false);
                if(edata) {
                    this._img.skin = edata.img;
                    if(data["json"].num > 1) this._num.text = data["json"].num;
                }
                if(data["json"].suo) this._suo.visible = true;
                this.cc.visible = data.sel;
            }
        }

        onClose() {

        }

        /////

    }
}