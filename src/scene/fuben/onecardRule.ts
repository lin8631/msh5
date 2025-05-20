/// <reference path="./../../core/ms/Maple/Mob.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    export class onecardRule extends ui.fuben.onecardRuleUI implements ui.fuben.IonecardRuleUI {
        public static className = "app.fuben.onecardRule";

        onInitialize(){
            this.updateData();

            this.x = (Laya.stage.width - 300) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 383) / 2 - (Laya.stage.height - 600) / 2;
        }

        updateData() : void {

        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }


        //
    }
}