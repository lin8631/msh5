
/// <reference path="../../utils/Utils.ts" />
module app.common {

    export class EmojiItem extends ui.common.EmojiItemUI  {
        public static className = "app.common.EmojiItem";

        updateData(data: any, index: number) {
            if(data == null || data.icon == null) return;
            this.imgIcon.skin = "chat/" + data.icon + ".png";
        }
    }
}