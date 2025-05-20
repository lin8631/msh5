module app.char {

    export class bagItem2 extends ui.char.bagItem2UI  {
        public static className = "app.char.bagItem2";

        updateData(data: any, index: number) {
            this.partname.text = "";
            this.img.skin = "";
            this.cash.visible = false;
            // this.img.scale(1.5, 1.5);
            this.cc.visible = false;
            if(data) {
                // this._name.visible = true;
                // this._name.text = data.id;
                if(data.part == msMoudle.partType.tHair) {
                    this.img.skin = "res/Character/" + msMoudle.partDirs[data.part]  + "/" + data.id + ".img/default.hair.png";
                    this.cash.visible = true;
                }
                else if(data.part == msMoudle.partType.tBody) {
                    this.img.skin = "res/Character/" + msMoudle.partDirs[data.part]  + "/" + data.id + ".img/swingT2.0.body.png";
                    this.cash.visible = true;
                }
                else if(data.part == msMoudle.partType.tFace) {
                    this.img.skin = "res/Character/" + msMoudle.partDirs[data.part]  + "/" + data.id + ".img/default.face.png";
                    this.cash.visible = true;
                }
                else
                    this.img.skin = "res/Character/" + msMoudle.partDirs[data.part]  + "/" + data.id + ".img/info.icon.png";

                if(msMoudle.findKeyFromArr(data.id, msMoudle.AllCash)) {
                    this.cash.visible = true;
                }

                if(data.cc) this.cc.visible = true;
            }
        }

        onClose() {

        }

        /////

    }
}