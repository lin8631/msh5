module app.login {

    export class keyItem extends ui.login.keyItemUI {
        public static className = "app.login.keyItem";

        a1:Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
        0,1,2,3,4,5,6,7,8,9]
        a2:Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
        0,1,2,3,4,5,6,7,8,9]
        updateData(data: any, index: number) {
            if(index <= 25) {
                if(data.tip == 1)
                    this.img.skin = "keyboard/Common.SoftKey.BtLowCase." + this.a1[index] + ".normal.0.png";
                else
                    this.img.skin = "keyboard/Common.SoftKey.BtHighCase." + this.a1[index] + ".normal.0.png";
            }
            else {
                this.img.skin = "keyboard/Common.SoftKey.BtNum." + this.a1[index] + ".normal.0.png";
            }
        }

        onClose() {

        }

        /////

    }
}