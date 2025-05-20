
module app.event {

    export class CommonItem extends ui.event.CommonItemUI {
        public static className = "app.event.CommonItem";

        constructor(){
            super();
        }

        //index<0的情况用来设置不显示名字
        updateData(data: any, index:number) {

            if(data) {

            }


        }

    }
}