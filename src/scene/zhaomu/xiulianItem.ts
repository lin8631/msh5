module app.zhaomu {

    export class xiulianItem extends ui.zhaomu.xiulianItemUI  {
        public static className = "app.zhaomu.xiulianItem";

        updateData(data: any, index: number) {
            this.buy.visible = true;
            this._num.visible = true;
            this._num.color = "#FFFFFF";
            this.full.visible = false;
            this._numbg.visible = true;
            // this.show.visible = false;
            if(data) {
                // this.show.visible = true;
                this._img.skin = "homeland/job" + (index + 1) + ".png";
                this.msg.text = data.name + "修炼";
                this._lv.text = "Lv." + data.lv;
                this._num.text = ms.cailiao2() + "/" + 25 * (data.lv + 1);

                if(ms.cailiao2() >= 25 * (data.lv + 1)) this._num.color = "#35f904";

                if(index < 3) {
                    // if(data.lv >= 35) {
                        // this.buy.visible = false;
                        // this._num.visible = false;
                        // this.full.visible = true;
                        // this._numbg.visible = false;
                    // }
                }
                else {
                    if(data.lv >= 10) {
                        this.buy.visible = false;
                        this._num.visible = false;
                        this.full.visible = true;
                        this._numbg.visible = false;
                    }
                }
            }
        }

        onClose() {

        }

        /////

    }
}