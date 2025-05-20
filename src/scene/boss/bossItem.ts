module app.boss {

    export class bossItem extends ui.boss.bossItemUI  {
        public static className = "app.boss.bossItem";

        updateData(data: any, index: number) {
            this._guanka.text = "";
            this.fight.visible = false;
            this.lock.skin = "";
            if(data) {
                let id:string = (data["json"].boss == "") ? data["json"].id : data["json"].boss;

                // this._name.text = msMoudle.wz["Mob.img"][Number(id)] ? msMoudle.wz["Mob.img"][Number(id)][Number(id) + ".name"] : id;
                this._guanka.text = "第" + (index + 1) + "关";
                if(data.state == 0) {
                    this._img.skin = "homeland/aswan.BtHelp.mouseOver.0.png";
                }
                else if(data.state == 1) {
                    this._img.skin = "res/Mob/" + id + ".img/stand.0.png";
                }
                else if(data.state == 2) {
                    this.lock.skin = "homeland/txt_xin.png";
                    this._img.skin = "res/Mob/" + id + ".img/stand.0.png";
                }
                this._select.visible = data.select;
                if(data.select) {
                    if(data.state != 0) this.fight.visible = true;
                }
            }
        }

        onClose() {

        }

        /////

    }
}