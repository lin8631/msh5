/// <reference path="./../../../core/ms/Maple/NameTag.ts" />
/// <reference path="./../../../scene/Other/Guide.ts" />
/// <reference path="./../../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../../core/ms/Maple/ChatBalloon.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />
/// //<reference path="./../../../core/ms/Maple/Map.ts" />

module NpcRole {
    import cssNametag = NametagRole.NameTag;
    import cssGuide = GuideMoudle.Guide;
    import cssSkill = SkillRole.Skill;
    import cssChatBalloon = ChatBalloonRole.ChatBalloon;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class Npc extends Laya.Sprite {

        public m_map:Array<any> = [];
        private m_parent:any;
        public m_sp:Laya.Sprite;
        public m_nametag_sp:Laya.Sprite;
        public m_chatballon:cssChatBalloon;
        private m_nametag:cssNametag;

        private npcAni:Laya.Image;
        private npcData:Array<any> = [];

        public m_id:string;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_action:string = "stand";       //也可以加一个动作列表(随机播放)
        private m_npcMsg:any;
        public be:cssBasicEff;

        public clearUp() : void {
            Laya.timer.clear(this, this.autoMove);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.NpcSpeak);
            Laya.timer.clear(this, this.Reward);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);

            Laya.loader.clearRes("res/Map/Npc/" + this.m_id + "/index.html");
            msMoudle.wz[this.m_id] = null;

            this.m_map = [];
            this.npcData = [];
            this.m_npcMsg = [];

            if(this.m_nametag) {
                this.m_nametag.clearUp();
                this.m_nametag = null;
            }
            if(this.npcAni) {
                this.npcAni.removeSelf();
                this.npcAni.destroy(true);
                this.npcAni = null;
            }
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_chatballon) {
                this.m_chatballon.removeSelf();
                this.m_chatballon.clearUp();
                this.m_chatballon = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
        }

        onLoading() : void {}
        onLifeLoaded(npcMsg:any) : void {

            if(!msMoudle.wz[this.m_id]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[this.m_id] = msMoudle.loadWZ(cs, "res/Map/Npc/" + this.m_id + "/index.html", "ms");
            }

            let data:any = msMoudle.wz[this.m_id];
            let npcInfo:any = data["info"];
            // if(!npcInfo) {
            //     // console.log(id);
            //     return ;
            // }
            if(npcInfo) {
                let link = npcInfo["info.link"];
                if(link) {
                    let id = link;
                    if(id.length == 4) id = "000" + id;
                    else if(id.length == 5) id = "00" + id;
                    else if(id.length == 6) id = "0" + id;
                    npcMsg.id = Number(id);
                    this.m_id = id + ".img";

                    let res:any = [];
                    if(!Laya.loader.getRes("res/Map/Npc/" + this.m_id + "/index.html")) {
                        res.push({ url: "res/Map/Npc/" + this.m_id + "/index.html" });
                    }
                    if(res.length > 0) {
                        Laya.loader.load(res, Laya.Handler.create(this, this.onLifeLoaded, [npcMsg]),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);
                    }
                    else {
                        this.onLifeLoaded(npcMsg);
                    }
                }
                else {
                    this.ShowLife(npcMsg);
                }
            }
            else {
                this.ShowLife(npcMsg);
            }

        }

        ShowLife(npcMsg:any) : void {
            if(!msMoudle.wz[this.m_id]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[this.m_id] = msMoudle.loadWZ(cs, "res/Map/Npc/" + this.m_id + "/index.html", "ms");
            }

            let data:any = msMoudle.wz[this.m_id];

            if(data[this.m_action]) {
                this.loadActs(data[this.m_action]);
                this.setPos(this.m_x, this.m_y);

                let res:Array<any> = [];
                for(let frameIndex:number = 0; frameIndex < this.npcData.length; frameIndex++) {
                    if(!Laya.loader.getRes(this.npcData[frameIndex].tex)) {
                        res.push({ url: this.npcData[frameIndex].tex });
                    }
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {

                        for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                        msMoudle.resTip(res, true);

                        this.onNpc(npcMsg);
                    });
                }
                else {
                    this.onNpc(npcMsg);
                }

                // Laya.timer.loop(1000, this, this.autoMove);
            }
        }

        autoMove() : void {
            this.setPos(this.m_x, this.m_y);
        }

        public changeAll(P:any, id:string, npcMsg:any) : void {
            this.m_id = id;
            this.m_npcMsg = npcMsg;
            this.m_x = Number(npcMsg.x);
            this.m_y = Number(npcMsg.y);

            this.m_parent = P;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_sp);

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_nametag_sp);

            this.m_chatballon = new cssChatBalloon();

            this.npcAni = new Laya.Image();
            this.npcAni.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
            this.npcAni.hitTestPrior = true;
            this.m_sp.addChild(this.npcAni);

            if(!msMoudle.wz[id]) {
                let res:any = [];
                if(!Laya.loader.getRes("res/Map/Npc/" + this.m_id + "/index.html")) {
                    res.push({ url: "res/Map/Npc/" + this.m_id + "/index.html" });
                }
                if(res.length > 0) {
                    Laya.loader.load(res, Laya.Handler.create(this, this.onLifeLoaded, [npcMsg]),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);
                }
                else {
                    this.onLifeLoaded(npcMsg);
                }
            }
            else {
                this.onLifeLoaded(npcMsg);
            }
        }
        m_loadRes:Array<any> = [];
        npc_name:string = "";
        // npc_speck:string = "";
        onNpc(npcMsg:any) : void {
            this.doAction(0);
            ///地图且NPC双重检测
            let name:string = msMoudle.wz["Npc.img"][Number(npcMsg.id)] ? msMoudle.wz["Npc.img"][Number(npcMsg.id)][Number(npcMsg.id) + ".name"] : "";

            this.npc_name = name;
            // this.npc_speck =

            if(msMoudle.tiaotiao_map == "101000101.img") {  //1
                if(this.m_id == "1043000.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "101000104.img") {//2
                if(this.m_id == "1043001.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "105040311.img") {//3
                if(this.m_id == "1063000.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "105040313.img") {//4
                if(this.m_id == "1063001.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "105040316.img") {//5
                if(this.m_id == "1063002.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "103000902.img") {//6
                if(this.m_id == "1052008.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "103000905.img") {//7
                if(this.m_id == "1052009.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "103000909.img") {//8
                if(this.m_id == "1052010.img") Laya.timer.loop(1000, this, this.Reward);
            }
            else if(msMoudle.tiaotiao_map == "280020001.img") {//9
                if(this.m_id == "2032003.img") Laya.timer.loop(1000, this, this.Reward);
            }

            // if(name == "汉斯") name = "图鉴";
            // console.log(name, npcMsg.id)
            /*
            弗兰德里 9030000
            斯克鲁 吉 9030100
             9250025
            沅芷 9310074
            廖曼婷丶 9310073
            国宝丶奶嘴 9310072
            卩丶筱咫灬妮 9310071
            丶幸福浅释 9310070
            段段 9310059
            金猪 9310022
            */
            if(this.m_chatballon) {
                if(name == "休彼德蔓") {
                    // this.m_chatballon.loadChatBalloon(this, "【点击打开快捷入口】\n▇  1、废弃组队任务\n▇  2、跳跳比赛\n▇  3、月秒组队任务\n▇  4、远征BOSS\n▇  5、怪物嘉年华");
                    this.m_chatballon.loadChatBalloon(this, "点我进入各BOSS地图");
                    this.m_sp.zOrder = 10001;
                    this.m_nametag_sp.zOrder = 10001;
                }
            //     if(name == "斯克鲁 吉") {
            //         this.m_sp.visible = true;
            //         this.m_nametag_sp.visible = true;
            //     }
            //     else if(name == "罗杰") {
            //         this.m_chatballon.loadChatBalloon(this, "想要老子的财宝？去找吧！我在它全放在了那里！");
            //     }
            //     else if(name == "希娜") {
            //         // this.m_chatballon.loadChatBalloon(this, "你是来救我的？");
            //     }
                else if(name == "段段") {
                    name = "向导";
            //         this.m_sp.visible = true;
            //         this.m_nametag_sp.visible = true;
                }
            //     else if(name == "金猪") {
            //         if(this.be) {
            //             this.be.clearUp();
            //             this.be = null;
            //         }
            //         this.m_sp.visible = true;
            //         this.m_nametag_sp.visible = true;
            //     }
            //     else {
            //         if(this.m_id == "2510025.img") {
            //             name = "小仙女妹妹";
            //             this.m_chatballon.loadChatBalloon(this, "爱滴魔力转圈圈！");
            //             this.m_sp.visible = true;
            //             this.m_chatballon.m_sp.visible = true;
            //             this.m_nametag_sp.visible = true;
            //         }
            //         else if(this.m_id == "2510027.img") {
            //             //1
            //             name = "小仙女姐姐";
            //             this.m_chatballon.loadChatBalloon(this, "你相信命运？");
            //             this.m_sp.visible = true;
            //             this.m_chatballon.m_sp.visible = true;
            //             this.m_nametag_sp.visible = true;
            //         }
            //         else if(this.m_id == "2510002.img") {
            //             //2
            //             name = "森林女王";
            //             this.m_chatballon.loadChatBalloon(this, "又来了陌生人？");
            //             this.m_sp.visible = true;
            //             this.m_chatballon.m_sp.visible = true;
            //             this.m_nametag_sp.visible = true;
            //         }
            //         else if(this.m_id == "2500001.img") {
            //             name = "奇怪的鸟";
            //             this.m_chatballon.loadChatBalloon(this, "你那有我需要的东西？");
            //             this.m_sp.visible = true;
            //             this.m_chatballon.m_sp.visible = true;
            //             this.m_nametag_sp.visible = true;
            //         }
            //     }
            }

            this.m_nametag = new cssNametag();
            this.m_nametag.loadNameTag(this, name, "medal.2");
            // this.m_nametag.loadNameTag(this, this.m_id, "medal.2");


            // msMoudle.getNpcStateByCheck(this.m_id);
        }

        changeState(m_id:string, task:number) : void {
            // console.log("xxxxx", m_id, task)
            if(this.be) {
                this.be.clearUp();
                this.be = null;
            }
            // if(this.m_chatballon) {
            //     if(this.m_chatballon.m_sp)
            //         this.m_chatballon.m_sp.visible = false;
            // }
            if(task != -1) {
                //0可接1已接2完成
                this.be = new cssBasicEff();
                this.be.m_loop = true;
                this.be.loadBasicEff(this.m_sp, task.toString(), 0, 0);
                if(this.npcData && this.npcData[0])
                    this.be.setPos(0, Number(this.npcData[0].orgy) - 25);
            }
            // else {
            //     this.m_chatballon = new cssChatBalloon();
            //     this.m_chatballon.loadChatBalloon(this, "敢对我刀刃相向，该说你是有勇气还是无知呢。");
            //     this.m_chatballon.m_sp.visible = true;
            // }
        }

        private NpcSpeak() : void {
            if(this.m_chatballon.m_sp.visible) {
                this.m_chatballon.m_sp.visible = false;
                Laya.timer.clear(this, this.NpcSpeak);
                Laya.timer.loop(750, this, this.NpcSpeak);
            }
            else {
                this.m_chatballon.m_sp.visible = true;
                Laya.timer.clear(this, this.NpcSpeak);
                Laya.timer.loop(5000, this, this.NpcSpeak);
            }
        }

        getNpcStateByCheck() : boolean {
            let id:string = ms.QuestId;
            let step:number = ms.QuestStep
            let data = msMoudle.wz["Check.img"][id];
            let npc:string = "N";
            ///可以通过这里设置状态
            if(data) {
                //正在交谈的对象
                let _npc = data[id + "." + step + ".npc"];      ///这里NPC的确认是有问题的
                if(_npc) {
                    ///检查npc是否正确
                    // <tr><td>1007.1.item.0.id</td><td>4000000</td></tr>
                    // <tr><td>1007.1.item.0.count</td><td>5</td></tr>
                    // <tr><td>1007.1.item.0.order</td><td>1</td></tr>
                    // <tr><td>1007.1.item.1.id</td><td>4000001</td></tr>
                    // <tr><td>1007.1.item.1.count</td><td>1</td></tr>
                    // <tr><td>1007.1.item.1.order</td><td>1</td></tr>
                    // console.log("*****")
                    let _item:number = 0;
                    while(true) {
                        let _id = data[id + "." + step + ".item." + _item + ".id"];
                        if(_id) {
                            let _num = Number(data[id + "." + step + ".item." + _item + ".count"]);
                            let itemNum = msMoudle.getItemNum(_id);
                            if(itemNum < _num) {
                                return false;
                            }
                        }
                        else break;
                        _item++;
                    }
                }
                else return false;
                //
            }
            return true;
        }

        private onClick(e: Event) : void {

            // if(this.m_id == "9250025.img" || this.m_id == "9310074.img" || this.m_id == "9310073.img" ||
            // this.m_id == "9310072.img" || this.m_id == "9310071.img" || this.m_id == "9310070.img")
                // return ;
            msMoudle.mainT.m_touch = false;
            Laya.timer.once(100, this, ()=> {
                msMoudle.mainT.m_touch = true;
            });
            msMoudle.mainT.m__X = 0;

            let npc:string = msMoudle.getNpcStateByCheck();
            if(Number(npc) == Number(msMoudle.rmvImg(this.m_id)) ) {
                if(this.getNpcStateByCheck()) {
                    ui.show(app.quest.questDlg, {black:true})
                }
                else {
                    msMoudle.toast("条件未完成")
                }
            }
            else {
                //彩虹村到南港
                if(this.m_id == "0022000.img") {
                    msMoudle.help = null;
                    msMoudle.tiaotiao_map = "104000000.img";
                    msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                }
                //魔法密林到天空之城
                else if(this.m_id == "1032007.img") {
                    // msMoudle.toast("对方不想和你说话");
                    msMoudle.help = null;
                    msMoudle.tiaotiao_map = "200090010.img";
                    msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                }
                //怪物嘉年华
                else if(this.m_id == "2042000.img") {
                    ui.show(app.worldmap.bossMapDlg, {black:true});
                }
                //天空之城到玩具城
                //其他点击npc暂不反应
                else {
                    if(ms.user != "s520") {
                        if(msMoudle.qudao == false) {
                            // msMoudle.toast("对方不想和你说话" + this.m_id);
                            ui.show(app.quest.speckDlg, {params:[this.npc_name + "@" + "#k\\n当前NPC正在休眠请勿打扰......" +"#k\\n游戏问题反馈：" + msMoudle.maplejson["充值QQ"] + "#k\\n游戏建议提交：" + msMoudle.maplejson["客服QQ"] + "#k\\n支付问题联系：" + msMoudle.maplejson["充值QQ"] + "#k\\n推广问题咨询：" + msMoudle.maplejson["客服QQ"] + "#k\\n代理问题咨询：2768820569#k\\n其他问题联系：2768820569"],black:true})
                        }
                    }
                }
            }
            // //显示什么
            // let g:cssGuide = new cssGuide();
            // g.m_center = false;
            // g.m_touch = false;
            // if(this.m_id == "9310059.img") {
            //     if(ms.herodata.Lv >= 10) {
            //         msMoudle.team_guanka = 0;
            //         ui.show(app.fuben.fubenDlg, {black:true});
            //     }
            //     else {
            //         msMoudle.toast("需要角色达到10级");
            //     }
            // }
            // else if(this.m_id == "9030100.img") {
            //     // // if(ms.herodata.Lv >= 20) {
            //     // //     ui.show(app.pvp.pvpDlg, {black:true});  //角色pk
            //     // // }
            //     // // else {
            //     // //     msMoudle.toast("需要角色达到20级");
            //     // // }
            //     // msMoudle.MapInit();

            //     // // "100020101", "100020200", "101030101", "102010000", "103020300",
            //     // // "120040100", "200010110", "211040100", "220060000", "230010000"
            //     // msMoudle.tiaotiao_map = "102010000.img";    //101030101
            //     // //000050000

            //     // // if(ms.tiaotiao > 0) {
            //     // msMoudle.isTiaoTiao = true;
            //     // ui.show(app.fuben.jumpDlg, {params:[10], black:true});

            //     // ui.show(app.battle.csDlg, {black:true})

            // }
            // else if(this.m_id == "9030000.img") {
            //     msMoudle.team_guanka = 0;
            //     ui.show(app.boss.bossDlg, {black:true});
            // }
            // else if(this.m_id == "0002000.img") {

            // }
            // // else if(this.m_id == "1022008.img") {
            // //     // ui.show(app.tujian.tujianDlg, {black:true});    //图鉴收集
            // //     ui.show(app.zhaomu.tujianDlg, {black:true});
            // // }
            // else if(this.m_id == "2510025.img") {
            //     // ui.show(app.fuben.jumpDlg, {params:[3], black:true});
            //     ///增加时间
            // }
            // else if(this.m_id == "2510027.img") {
            //     //
            //     //增加经验

            // }
            // else if(this.m_id == "2510002.img") {
            //     // ui.show(app.tujian.tujianDlg, {black:true});    //图鉴收集
            // }
            // else if(this.m_id == "2510001.img") {

            // }
            // else if(this.m_id == "9310022.img") {
            //     if(ms.herodata.Lv >= 5) {
            //         ui.show(app.battle.moveDlg, {black:true});
            //     }
            //     else {
            //         msMoudle.toast("需要角色达到5级");
            //     }
            // }
        }

        Reward() : void {
            if(this.m_x >= msMoudle.char.m_x - 100 && this.m_x <= msMoudle.char.m_x + 100 &&
            this.m_y >= msMoudle.char.m_y - 100 && this.m_y <= msMoudle.char.m_y + 100) {
                // msMoudle.toast("通关了");
                // if(msMoudle.mainT.rocker) msMoudle.mainT.rocker.visible = false;
                // if(msMoudle.mainT.rockerBg) msMoudle.mainT.rockerBg.visible = false;
                // if(msMoudle.mainT.rockerBgBig) msMoudle.mainT.rockerBgBig.visible = false;
                // if(msMoudle.mainT.rockerJump) msMoudle.mainT.rockerJump.visible = false;

                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = false;
                        }
                    }
                }

                ui.show(app.battle.BattleRewardDlg);
                Laya.timer.clear(this, this.Reward);
            }
        }

        private loadActs(data:any) : void {
            let frameindex:number = 0;
            while(true) {
                let root = this.m_action + "." + frameindex;
                if(data[root]) {
                    this.linkNpc(data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }
        }

        private linkNpc(data:any, root:string, frameindex:number) : void {
            if(this.m_id == "1012115.img" || this.m_id == "1012116.img") this.m_action = "blackShadow";
            let msg = msMoudle.getCharacterInfo(data[root], this.m_action, this.m_id);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            let strMarker:string = "res/Map/Npc/" + this.m_id + "/" + msg.strMarker;
            let delayroot:any = msg.root.split(".");
            let delay:number = Number(data[delayroot[0] + "." + delayroot[1] + ".delay"]);
            // console.log(data[root] + "  " + msg.strMarker + "  " + msg.root + "  " + delay + "  " + msg.act);
            this._(data, root, frameindex, strMarker, delay);
        }

        private doAction(frameIndex:number) : void {
            if(this.npcData.length > 0) {
                if(frameIndex >= this.npcData.length) {
                    frameIndex = 0;
                }
                this.npcAni.skin = this.npcData[frameIndex].tex;
                if(this.m_npcMsg.f == 1) {
                    this.npcAni.scaleX = -1;
                    let tex:any = Laya.loader.getRes(this.npcData[frameIndex].tex);
                    this.npcAni.pos(this.npcData[frameIndex].orgx + tex.width, this.npcData[frameIndex].orgy);
                }
                else {
                    this.npcAni.scaleX = 1;
                    this.npcAni.pos(this.npcData[frameIndex].orgx, this.npcData[frameIndex].orgy);
                }
                this.npcAni.zOrder = this.npcData[frameIndex].z;

                if(this.npcData.length > 1) Laya.timer.once(this.npcData[frameIndex].delay ? this.npcData[frameIndex].delay : 500, this, this.doAction, [frameIndex + 1]);
            }
        }

        private _(data:any, root:string, frameindex:number, strMarker:string, delay:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z = data[root + ".z"];
            this.npcData[frameindex] = new Object();
            this.npcData[frameindex].tex = strMarker;
            this.npcData[frameindex].orgx = -Number(oringinInfo.x);
            this.npcData[frameindex].orgy = -Number(oringinInfo.y);
            this.npcData[frameindex].delay = delay;
            // this.npcData[frameindex].z = z?Number(z)+1000:0;
            this.npcData[frameindex].z = 10000;
        }

        private setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(x, y);
            this.m_nametag_sp.pos(this.m_x, this.m_y);

            if(this.be) {
                // this.be.loadBasicEff(this.m_sp, task.toString(), 0, Number(this.npcData[0].orgy) - 25);
                if(this.npcData && this.npcData[0])
                    this.be.setPos(0, Number(this.npcData[0].orgy) - 25);
            }

            if(msMoudle.char) {
                if(this.m_x >= msMoudle.char.m_x - Laya.stage.width &&
                    this.m_x <= msMoudle.char.m_x + Laya.stage.width &&
                    this.m_y >= msMoudle.char.m_y - Laya.stage.height &&
                    this.m_y <= msMoudle.char.m_y + Laya.stage.height) {
                    if(this.m_sp) this.m_sp.visible = true;
                }
                else
                    if(this.m_sp) this.m_sp.visible = false;
            }
        }

        //
    }
}