module app.common {

    export class ChatView extends ui.common.ChatViewUI implements ui.common.IChatViewUI {
        public static className = "app.common.ChatView";
        chatMsgs : Array<model.Chat> = [];
        cView : mail.MyScrollView;
        testView : Laya.VBox;
        isInit = true;

        onInitialize(){
            this.iptChat.prompt = '输入聊天内容';
            this.iptChat.hitTestPrior = true;

            this.btnSend.hitTestPrior = true;

            // this.iptChat.on(Laya.Event.ENTER, this, (e:any)=>{
            //     this.onBtnSendClick(null);
            // });

            let width = 355;
            let height = 70;
            let x= 0;
            let y = 0;

            this.cView = new mail.MyScrollView(width, height, 0);
            this.cView.mouseThrough = true;
            this.cView.x = x;
            this.cView.y = y;
            this.boxChat.addChild(this.cView);
            this.boxChat.mouseThrough = true;
            this.mouseThrough = true;

            this.updateData();

            this.iptChat.on(Laya.Event.BLUR, this, this.onBlur);
            this.iptChat.on(Laya.Event.FOCUS, this, this.onFocus);
        }

        onBlur() : void {
            msMoudle.fcd = false;
        }

        onFocus() : void {
            msMoudle.fcd = true;
        }

        onClose() {
            super.onClose();
        }

        onBtnBackClick(e: Laya.Event): void {
            // if(ui.manager.getDialogByName("app.homeland.MajorCityDlg")) {
            //     if(ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg) {
            //         ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.onBtnChatClick(null);
            //     }
            // }
        }

        updateData(){

            // let chat : model.Chat = new model.Chat();
            // chat.args = [];
            // chat.chatMode = CHAT_TYPE.SYSTEM;
            // chat.args[1] = "欢迎进入游戏！";
            // if(this.chatMsgs.length >= 10) this.chatMsgs.splice(0, 0);
            // this.chatMsgs.push(chat);

            // let item : ChatItem = new ChatItem();
            // item.updateData(chat, 0);
            // this.cView.addItem(item, item.height, 0);

            // let emojis: any[] = [];
            // for(let i=0; i<43; ++ i) {
            //     let emoji: any = {};
            //     emoji.name = "" + (i+1);
            //     emoji.index = i + 1;
            //     emoji.icon = "" + (i+1);
            //     emojis.push(emoji);
            // }
            // this.lstEmojis.vScrollBarSkin = "";
            // this.lstEmojis.dataModel = emojis;

            if(msMoudle.getRandValue(0, 0, 100) < 50) {
                Laya.timer.once(60000, this, this.AITalk);
            }
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.testChat.WorldTalk();
            // if(msMoudle.yz == "N") {
            //     this.WorldTalk("该帐号未激活可试玩10分钟");
            //     this.WorldTalk("联系Q1044571564免费激活");
            // }
            this.WorldTalk("欢迎来到组队版本！");
            this.WorldTalk("当前时间：" + app.utils.formatSeconds2(new Date().getTime() / 1000));
            this.WorldTalk("祝您游戏愉快！");
            // this.WorldTalk("祝您游戏愉快！");
            // this.WorldTalk("祝您游戏愉快！");
            // this.WorldTalk("祝您游戏愉快！");
            // Laya.timer.loop(5000, this, ()=> {
            //     this.WorldTalk("祝您游戏愉快！");
            // });

            // this.WorldTalk("使用第非法软件是对作者不尊重的行为，如若发现，我们将严肃处理！");

            // this.WorldTalk("沉迷游戏益脑，适度游戏伤身。");
            // this.WorldTalk("合理安排时间，享受健康生活。");

            ///对方假冒你
            //1.提高门槛----又需要直接试玩，又需要经过官方验证
            //你的帐号未激活可试玩10分钟,请联系Q1044571564激活帐号----1服可注册(体验版本)
            //----2服可注册(只能管理员转移数据)
        }

        AITalk() : void {
            msMoudle.guaTest();
            /*
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            "|1/|", "|2/|", "|14/|", "|27/|",  "|35/|", "|38/|",
            */
            let talks:Array<any> = ["大家好","游戏挺好的", "有人吗?", "我回来了", "宠物好可爱", "坐骑好看", "我系街上最亮的那个仔", "???", "....", "我就看看不说话", "我撒面?", "what's up man?", "最帅的人来啦", "滴！打卡成功！", "我又来啦！", "啦啦啦", "好好玩", "大家好，我是新人。", "爱滴魔力转圈圈", "打不过扎昆", "日常冒泡",
            "暗中观察", "...", "???", "嘿嘿", "嘻嘻", "好吧", "我就看看不说话", "不错", "专心刷材料", "游戏不错", "不错不错", "我来咯", "。", "呃", "呃呃呃", "大尬好，我系渣渣辉", "......", "呃", "呃", "呃", "呃", "呃", "呃", "呃", "呃", "这个游戏最靓的仔"];
            Laya.timer.clear(this, this.AITalk);

            this.WorldTalk(msMoudle.getRandomName() + ":" + talks[msMoudle.getRandValue(0, 0, talks.length)]);
            ///在这里写ai
            // let chatMode = CHAT_TYPE.WORLD;
            // this.showWord(talks[msMoudle.getRandValue(0, 0, talks.length)], msMoudle.getRandomName(), chatMode);
            // let rnk = msMoudle.getRandValue(3, 0, 5);
            // Laya.timer.once(60000 * rnk, this, this.AITalk);
        }

        public WorldTalk(str:string) : void {
            let chatMode = CHAT_TYPE.SYSTEM;
            this.showWord(str, ms.testname, chatMode);
        }

        _id:12345;
        onLstChatRecordsCellClick(e: Laya.Event, index: number): void {}
        onIptChatChange(oldValue: string, newValue: string): void {}
        onBtnChannelClick(e: Laya.Event): void {}
        cantalk:boolean = true;
        onBtnSendClick(e: Laya.Event): void {
            // if(ms.herodata.ZS >= 1) {
                this.imgEmojiMask.visible = this.imgEmoji.visible = false;

                let str = this.iptChat.text;
                if(str == null || str == "") {
                    msMoudle.toast("发送内容不能为空");
                    return;
                }

                if(!this.cantalk) {
                    msMoudle.toast("不能发言太快");
                    return ;
                }
                if(str.length > 12)  {
                    msMoudle.toast("聊天内容过长无法发送");
                    return ;
                }
                if(ms.herodata.ZS == 0) {
                    msMoudle.toast("1转以后才可以聊天");
                    return ;
                }
                // if(true) {
                //     msMoudle.toast("聊天功能正在维护中，暂无法使用");
                //     return ;
                // }

                this.cantalk = false;
                Laya.timer.once(2000, this, ()=> {
                    this.cantalk = true;
                });
                //发送聊天
                // if(ms._user == "l6670052") {
                //     if(msMoudle.mainT) {
                //         if(msMoudle.mainT.m_msgList) {
                //             msMoudle.mainT.m_msgList.msgShow(0, str, true);
                //         }
                //     }
                //     if(msMoudle.char) {
                //         msMoudle.char.speack(str);
                //     }
                // }
                // else {

                if(ms._user == "cj85351") {
                    this.iptChat.text = "";
                    msMoudle.char.speack(str);
                    return ;
                }

                    let message = new Net.Message();
                    message.xieyi = 555 + ms._dpip;
                    message.msdata = ms._user + "wz$$" + ms.herodata.Name + ":" + str;
                    msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                        if(data["msdata"] && data["xieyi"] == 555 + ms._dpip) {

                            if(msMoudle.char) {
                                msMoudle.char.speack(str);
                            }
                            // this.WorldTalk(ms.herodata.Name + str);

                        }
                    }});
                // }
                // let chatMode = CHAT_TYPE.WORLD;
                // this.showWord(str, ms.testname, chatMode);
            // }
            // else {
            //     msMoudle.toast("转生1次后才能发言");
            // }
            this.iptChat.text = "";
        }
        onBtnEmojiClick(e: Laya.Event): void {
            this.imgEmojiMask.visible = this.imgEmoji.visible = !this.imgEmoji.visible;
        }
        onImgEmojiMaskClick(e: Laya.Event): void {
            this.imgEmoji.visible = false;
            this.imgEmojiMask.visible = false;
        }
        onLstEmojisCellClick(e: Laya.Event, index: number): void {
            let emoji = this.lstEmojis.dataModel[index];
            let str = this.iptChat.text;
            str += "|" + emoji.name + "/|";
            this.iptChat.text = str;

            /////这里隐藏
            this.imgEmojiMask.visible = this.imgEmoji.visible = !this.imgEmoji.visible;
        }

        showWord(word : string, name : string, type : number, subType ?: number) {
            if(word == null || word == "") {
                msMoudle.toast("发送内容不能为空");
            }
            else {
                let chat : model.Chat = new model.Chat();
                chat.chatMode = type;
                chat.args = [];
                chat.args[1] = word;
                chat.name = name;
                manager.chat.chats.push(chat);

                if(type == CHAT_TYPE.WORLD) {
                    if((manager.chat.filterMode & (1<<CHAT_TYPE.WORLD-1)) > 0) {
                        this.showWord2(chat);
                    }
                }
                else if(type == CHAT_TYPE.SYSTEM) {
                    if((manager.chat.filterMode & (1<<CHAT_TYPE.SYSTEM-1)) > 0) {
                        this.showWord2(chat);
                    }
                }
                else {
                    this.showWord2(chat);
                }

            }
        }


        chatItems:Array<ChatItem> = [];

        showWord2(chat : model.Chat) {
            if(this.chatMsgs.length >= 3) this.chatMsgs.splice(0, 1);
            this.chatMsgs.push(chat);

            if(this.chatItems.length < 3) {
                let tIndex = this.chatItems.length;
                this.chatItems[tIndex] = new ChatItem();
                this.chatItems[tIndex].updateData(this.chatMsgs[tIndex], tIndex);
                this.cView.addItem(this.chatItems[tIndex], this.chatItems[tIndex].height, 0);
            }
            else {
                for(let i:number = 0; i < 3; i++) {
                    this.chatItems[i].updateData(this.chatMsgs[i], i);
                }
            }
        }

        // addShowEquip(equip : model.Equipment, info : any) {
        //     let word = manager.player.role.name + t.TXT_CHAT_SHOW + "<";
        //     word += "type=0";
        //     word += ";name=" + equip.config.name;
        //     word += ";color=" + utils.getColorByQuality(equip.config.quality);
        //     word += ";index=" + equip.index;
        //     word += ";info=" + JSON.stringify(info);
        //     word += "/>";
        //     // console.log("XX, word is " + word);
        //     // console.log("length is " + word.length);
        //     manager.chat.sendChat(2, "0," + word, 201, 0, ()=>{
        //         msMoudle.toast(t.TXT_CHAT_EQUIP_SHOW_OK);
        //         this.showWord(word, manager.player.role.name, 2);
        //     });
        // }

        // addShowFashion(fashion : model.Fashion) {
        //     let word = manager.player.role.name + t.TXT_CHAT_SHOW + "<";
        //     word += "type=1";
        //     word += ";name=" + fashion.config.name;
        //     word += ";color=" + utils.getColorByQuality(fashion.config.quality);
        //     word += ";index=" + fashion.index;
        //     word += "/>";
        //     manager.chat.sendChat(2, "0," + word, 201, 0, ()=>{
        //         msMoudle.toast(t.TXT_CHAT_FASHION_SHOW_OK);
        //         this.showWord(word, manager.player.role.name, 2);
        //     });
        // }

        // addShowPet(pet : model.Pet, info : string) {
        //     let word = manager.player.role.name + t.TXT_CHAT_SHOW + "<";
        //     word += "type=4";
        //     word += ";name=" + pet.config.name;
        //     word += ";color=#44a7ff";
        //     word += ";index=" + pet.index;
        //     word += ";lvl=" + pet.lvl;
        //     word += ";star=" + pet.star;
        //     word += ";skill=" + info;
        //     word += "/>";
        //     // console.log(word);
        //     manager.chat.sendChat(2, "0," + word, 201, 0, ()=>{
        //         msMoudle.toast(t.TXT_CHAT_PET_SHOW_OK);
        //         this.showWord(word, manager.player.role.name, 2);
        //     });
        // }

        // addShowTrade(trade : model.TradeInfo) {
        //     let word = manager.player.role.name + t.TXT_CHAT_SHOW_TRADE + "<";
        //     word += "type=11";
        //     word += ";name=[" + trade.adver + "|";
        //     word += ";color=#dc4cd9";
        //     word += ";index=" + trade.index;
        //     word += ";id=" + trade.id;
        //     word += "/>";
        //     // console.log(word);
        //     manager.chat.sendChat(2, "0," + word, 0, 0, ()=>{
        //         msMoudle.toast(t.TXT_CHAT_TRADE_SHOW_OK);
        //         this.showWord(word, manager.player.role.name, 2);
        //     });
        // }

        // clickName(chatRole: model.ChatRole) {
        //     if(chatRole.nickName == manager.player.role.name) return;
        //     this.iptChat.text = "";
        //     this.iptChat.focus = true;
        //     this.iptChat.select();
        //     this.iptChat.text = "#{0} ".format(chatRole.nickName);
        //     // manager.chat.chatMode = CHAT_TYPE.PRIVATE;
        //     this.tabFilter.selectedIndex = 2;
        //     this.lblCurMode.text = t["TXT_CHAT_TYPE"+CHAT_TYPE.PRIVATE];
        //     this.imgChatMode.visible = false;
        //     manager.chat.chatRole = new model.ChatRole();
        //     manager.chat.chatRole.update(chatRole);
        // }
    }
}