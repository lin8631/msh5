module app.battle {

    export class bwItem extends ui.battle.bwItemUI  {
        public static className = "app.battle.bwItem";

        hiv:Laya.HTMLDivElement;

        updateData(data: any, index: number) {
            if(this.hiv) {
                this.hiv.removeSelf();
                this.hiv = null;
            }

            this.hiv = new Laya.HTMLDivElement();
            this.hiv.style.fontSize = 18;
            this.hiv.style.width = 345;
            this.hiv.style.wordWrap = true;
            this.hiv.style.leading = 5;
            // this.hiv.style.underline = true;
            this.hiv.style.color = "#952242"//"#605a5a";
            this.addChild(this.hiv);
            // console.log(data);

            let newhtml = "";
            newhtml += "<span style='color:#952242;font-weight:bold'>" + data.name + "</span>";
            // if(data.lv > 0) {
            //     newhtml += "<span color='#952242'>" + "（" + "</span>";
            //     newhtml += "<span style='color:#227095;font-weight:bold'>" + "推荐Lv." + data.lv + "</span>";
            //     newhtml += "<span color='#952242'>" + "）" + "</span>";
            // }
            this.hiv.innerHTML = newhtml;
        }

        onClose() {
            if(this.hiv) this.hiv = null;
        }

        /////

    }
}