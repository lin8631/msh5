/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Pet.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Skill.ts" />

module app.char {

    export class abiView extends ui.char.abiViewUI {
        public static className = "app.char.abiView";

        onInitialize( ){

            this.updateData();
        }


        updateData() : void {

        }

        onClose() {

        }

        //
    }
}