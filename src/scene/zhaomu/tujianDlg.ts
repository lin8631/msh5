/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Npc.ts" />

module app.zhaomu {

    import cssCharacter = CharacterRole.Character;
    import cssNpc = NpcRole.Npc;

    export class tujianDlg extends ui.zhaomu.tujianDlgUI  {

        public static className = "app.zhaomu.tujianDlg";
        private npc:cssNpc;

        onInitialize(){
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);

            this.lst_tj.vScrollBarSkin = "";
            this.updateData();
        }

        onClose() {

        }

        updateData(){
            let Arr:Array<any> = [];
            for(let key in msMoudle.herojson) {
                Arr[Arr.length] = msMoudle.herojson[key];
            }
            Arr.sort((n1,n2) => {
                if(n1.pinzhi > n2.pinzhi) return -1;
                if(n1.pinzhi < n2.pinzhi) return 1;
                return 0;
            });
            this.lst_tj.dataModel = Arr;
        }


        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 360, 240);
            this.close();
            // ui.show(app.battle.moveDlg, {black:true});
            // ui.show(app.zhaomu.zhaomuDlg);
            ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = true;
        }

    }
}