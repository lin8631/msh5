module app.fuben {

    export class fubenItem extends ui.fuben.fubenItemUI  {
        public static className = "app.fuben.fubenItem";

        updateData(data: any, index: number) {
            this._name.text = "";
            // this._name.color = "#FFFFFF";
            this._sel.visible = false;
            this._img.alpha = 0.9;
            if(data) {
                if(data.ok)
                    this._name.text = data.title + "层";
                else
                    this._name.text = "???"
                this.gray = data.ok ? false : true;
                if(data.sel) {
                    this._img.alpha = 1;
                    // this._name.color = "#35f904";
                    this._sel.visible = true;
                }
            }
        }

        onClose() {

        }

        /////

    }
}