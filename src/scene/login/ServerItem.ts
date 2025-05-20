module app.login {

    export class ServerItem extends ui.login.ServerItemUI {
        public static className = "app.login.ServerItem";

        updateData(data: any, index: number) {
            this.imgNew.visible = false;
            if(data) {
                if(data.Status == 0) this.imgStatus.skin = "homeland/img_xitongfanmang.png";
                else if(data.Status == 1) this.imgStatus.skin = "homeland/img_xitongfanmang.png";
                else if(data.Status == 2) this.imgStatus.skin = "homeland/img_xitongfanmang.png";
                this.lblId.text = data.name;
                this.imgNew.visible = data.isNew;
            }
        }

        onClose() {

        }

        /////

    }
}