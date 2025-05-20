module app.worldmap {

    export class partyItem extends ui.worldmap.partyItemUI {
        public static className = "app.worldmap.partyItem";

        updateData(data: any, index: number) {

            this.lblName.text = "";
            for(let i=0; i<6; ++i)
                this["name" + (i+1)].text = "";

            if(data) {
                this.lblName.text = data.mNames[0] + "的冒险小队(" + data.members.length + "/6)";
                this.lblName.color = data.myParty ? "#dd2233" : "#111111";
                this.btnJoin.visible = Sync.partyId < 1;

                for(let i:number = 0; i < data.mNames.length; i++) {
                    this["name" + (i+1)].text = data.mNames[i];
                }
            }
        }

        onClose() {

        }

        /////

    }
}