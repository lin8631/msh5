
module app.common {

    export class ChatItem extends ui.common.ChatItemUI {
        public static className = "app.common.ChatItem";
        richText : mail.RichText = null;

        constructor(){
            super();
        }

        updateData(data: model.Chat, index:number) {
            let name = data.name;
            let type = data.chatMode;
            let word = data.args[1];
            let wordColor = this.lblName.color;
            let wordOffX = 0;
            if(type != CHAT_TYPE.SYSTEM) {
                name = "[" + name + "]";
            }
            if(type == CHAT_TYPE.WORLD) {
                this.imgType.skin = "chat/img_shijie.png";
                // wordColor = "#1cd2ff";
                this.lblName.color = "#3148c1";
            }
            if(type == CHAT_TYPE.SYSTEM) {
                name = "";//"提示"            //////提示
                this.imgType.skin = "chat/img_xitong.png";
                // wordColor = "#1cd2ff";
                this.lblName.color = "#3148c1";//3148c1
                this.imgChatBg.skin = "common/img_liaotianqipao1.png";
            }
            this.lblName.text = name;
            this.lblName.x = this.imgType.width;
            if(type == CHAT_TYPE.SYSTEM) {
                this.lblName.x += 4;
                this.lblName.y += 2;
            }
            this.imgChatBg.x = this.imgType.width + this.lblName.width;
            this.imgType.visible = false;
            // if(word.indexOf("欢迎进入") >= 0) {}
            // else {
                // this.imgChatBg.x -= 15;
                this.imgChatBg.x = 5;
            // }

            // if(wordColor == "#1cd2ff") {
            //     wordColor = "#ffffff";
            // }
            if(this.richText) {
                this.removeChild(this.richText);
                this.richText = null;
            }
            let start = word.indexOf("|");
            let end = word.indexOf("/|");
            while(start > -1 && end > -1 && start < end) {
                let str = word.substr(0, start);
                let emojiName = word.substr(start+1, end-start-1);
                if(Number(emojiName) > 0 && Number(emojiName) < 45) {
                    str += "<type=100";
                    str += ";url=chat/" + emojiName + ".png";
                    str += ";scale=0.7";
                    str += ";name=" + emojiName;
                    str += "/>";
                }
                if(end < word.length-2) {
                    str += word.substr(end+2);
                }
                word = str;
                start = word.indexOf("|");
                end = word.indexOf("/|");
            }
            // if(word.indexOf("欢迎进入") < 0) {
                wordColor = "#ffff00";
            // }
            this.richText = new app.mail.RichText({"maxWidth":520, "fontName":null, "fontSize":18, "color":wordColor});
            this.richText.setVerticalSpace(3);
            this.richText.pos(this.imgChatBg.x, 0);
            data.showWords = this.richText.addContent(word, null);
            this.addChild(this.richText);
            let size = this.richText.getRealContentSize();
            let height = size.y;
            // this.imgChatBg.width = size.x + 33;
            // if(height > 39) {
            //     this.imgChatBg.height = height + 0;//16;
            //     this.height = this.imgChatBg.height + 11;
            // }
            // else {
            //     this.height = 44;
            // }
            this.imgChatBg.visible = false;
            // if(word.indexOf("欢迎进入") >= 0) {
            //     this.imgChatBg.visible = true;
            //     this.height = 30;
            // }
            // else {
                this.height = 20;
            // }
        }

        //
    }
}