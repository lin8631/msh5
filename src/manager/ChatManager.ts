namespace app {
    export class ChatManager extends laya.events.EventDispatcher {

        public firstRequire = true;
        public chats : Array<model.Chat> = new Array<model.Chat>();
        public newChats : Array<model.Chat> = new Array<model.Chat>();
        public chatMode : number = CHAT_TYPE.WORLD;
        public sysLastId : number = 0;
        public worldLastId : number = 0;
        public privateLastId : number = 0;
        public guildLastId : number = 0;
        public chatRole : model.Chat;
        public filterMode = 63; //63 全部， 1 世界， 2 队伍， 4 家族， 8 私聊， 16 喇叭， 32 系统。 位&运算
        private lastSendTime = 0;
    }
}
