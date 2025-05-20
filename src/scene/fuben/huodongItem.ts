module app.fuben {

    export class huodongItem extends ui.fuben.huodongItemUI  {
        public static className = "app.fuben.huodongItem";

        updateData(data: any, index: number) {
            if(data) {
                this._name.text = data;
            }
        }

        onClose() {

        }

        /////

    }
}