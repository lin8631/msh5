module app.select {

    export class selectItem extends ui.select.selectItemUI {
        public static className = "app.select.selectItem";

        updateData(data: any, index: number) {
            this.icon.skin = "";
            this.selectnum.text = "";
            if(data) {
                let newdata = msMoudle.getItemMsg(data.id);
                if(newdata) this.icon.skin = newdata.img;
                this.selectname.text = newdata.name;
                if(data.num > 1) this.selectnum.text = data.num;
            }
        }

        onClose() {

        }

        /////

    }
}