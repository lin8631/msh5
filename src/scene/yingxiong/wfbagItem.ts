module app.yingxiong {

    export class wfbagItem extends ui.yingxiong.wfbagItemUI  {
        public static className = "app.yingxiong.wfbagItem";

        updateData(data: any, index: number) {
            this._img.skin = "";
            this._num.text = "";
            this._txt.text = "";
            this._suo.visible = false;
            this.cash.visible = false;
            this.cc.visible = false;
            if(data) {
                let edata:any;
                if(data.type == 0) {
                    edata = msMoudle.getItemMsg(data.id);
                }
                else if(data.type == 1) edata = msMoudle.getEqpMsg2(data.id, false);
                if(edata) {
                    this._img.skin = edata.img;
                    // if(!this._img.skin) console.log(data.id);
                    if(data.num > 1) this._num.text = data.num;
                    this._txt.text = data.id;
                    if(edata.cash == 1) this.cash.visible = true;
                }
                if(data.suo) this._suo.visible = true;
                if(data.cc) this.cc.visible = true;
            }
        }

        onClose() {

        }

        /////

    }
}