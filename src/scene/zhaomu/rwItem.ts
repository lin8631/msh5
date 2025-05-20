module app.zhaomu {

    export class rwItem extends ui.zhaomu.rwItemUI  {
        public static className = "app.zhaomu.rwItem";

        updateData(data: any, index: number) {
            this.img.skin = "";
            if(data) {
                this.img.skin = data.img;
            }
        }

        onClose() {

        }

        /////

    }
}