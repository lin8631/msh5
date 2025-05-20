module app.boss {

    export class showItem extends ui.boss.showItemUI {
        public static className = "app.boss.showItem";

        updateData(data: any, index: number) {
            // let id:string = (data["json"].boss == "") ? data["json"].id : data["json"].boss;
            // this._img.skin = "res/Mob/" + id + ".img/stand.0.png";
            // this._name.text = msMoudle.wz["Mob.img"][Number(id)] ? msMoudle.wz["Mob.img"][Number(id)][Number(id) + ".name"] : id;

            // this.lock.gray = true;
            // this.lock.alpha = 0;
            // // this.lock.visible = true;
            // if(data.state == 0) {
            //     this.lock.skin = "homeland/img_suo.png";
            // }
            // else if(data.state == 1) {
            //     // this.lock.visible = false;
            // }
            // else if(data.state == 2) {
            //     this.lock.gray = false;
            //     this.lock.skin = "homeland/txt_xin.png";
            // }

        }

        onClose() {

        }

        /////

    }
}