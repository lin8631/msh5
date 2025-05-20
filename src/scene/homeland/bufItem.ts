module app.homeland {

    export class bufItem extends ui.homeland.bufItemUI {
        public static className = "app.homeland.bufItem";

        updateData(data: any, index: number) {
            this.img.skin = "";
            this.alpha = 0.75;
            this.img.gray = true;
            if(data) {
                if(data.have) this.img.gray = false;
                this.img.skin = "res/Skill/"  + Math.floor(Number(data.img) / 10000) + ".img/skill." + data.img + ".icon.png";
            }
        }

        onClose() {

        }

        /////

    }
}