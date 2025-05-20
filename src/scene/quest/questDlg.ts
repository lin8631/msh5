/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.quest {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class questDlg extends ui.quest.questDlgUI  implements ui.quest.IquestDlgUI {
        public static className = "app.quest.questDlg";
        // private m_msg:cssMsg;

        constructor(params:any){
            super();

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }
        }

        pEle: Laya.HTMLDivElement;
        onInitialize(){
            this.content.vScrollBarSkin = "";
            // this.m_msg = new cssMsg();
            // if(this.lingqu == true) {
            //     this.btnYes.visible = false;
            //     this.btnNo.visible = false;
            //     this.btnContinue.visible = true;

                // let show = msMoudle.wz["Say.img"][this.questId + ".1"][this.questId + ".1.stop.npc.0"];
                // this.title.text = msMoudle.wz["QuestInfo.img"][this.questId][this.questId + ".name"];
                // this.content.text = show;
            // }
            // else {
            //     if(this.sNpc != "N") this.updateData();
            // }

            //只是为了顺便显示标题
            let data = msMoudle.wz["Quest.img"][ms.QuestId];
            if(data) {
                let name = data[ms.QuestId + ".name"];
                this.title.text = name;
            }

            this.SayTask(ms.QuestId, ms.QuestStep);

            this.updateData();

            this.showOne();
        }

        talkstep:number = 0;
        canClose:boolean = false;
        //任务交谈
        public SayTask(id:string, step:number) : void {
            let data = msMoudle.wz["Say.img"][id];
            let root = data[id + "." + step + "." + this.talkstep];
            if(!root) {
                root = data[id + "." + step + ".yes.0"];
                this.canClose = true;
            }
            if(root) {
                if(!this.pEle) {
                    this.pEle = new Laya.HTMLDivElement();
                    this.pEle.style.fontSize = 18;
                    this.pEle.style.width = 345;
                    this.pEle.style.wordWrap = true;
                    this.pEle.style.leading = 5;
                    this.pEle.style.color = "#605a5a";
                    this.content.addChild(this.pEle);
                }
                msMoudle.createParagraph(this.pEle, root, false);
                // console.log(root);
            }
            else {
                if(this.talkstep > 0) {
                    this.ActTask(ms.QuestId, ms.QuestStep);
                }
                this.close();
            }

            // return false;
            // <tr><td>1000.0.0</td><td>是位新的旅行者吧？还很陌生吧？我会告诉你一些，好好听着，跟我一起做。首先，如果想跟我们说话的话请用鼠标#b双击#k我们。按下#b左、右方向键#k可以移动，按下#bAlt键#k就可以跳跃。</td></tr>
            // <tr><td>1000.0.1</td><td>和方向键一同按下的话可以对角线跳跃。回头练习一下吧。想要到达目的地，有时候还需要用到绳索或梯子。按下#r方向键↑#k的话可以从绳索或梯子上去。这些都很重要，请好好记住。</td></tr>
            // <tr><td>1000.0.2</td><td>啊~ 太阳晒的好厉害哦。我这白玉般的皮肤都要坏掉了... 有件事情想要拜托您，可以吗...? 请去找离这里不远处正在晒衣服的#r#p2100# 姐姐#k借来#b镜子#k吧。</td></tr>
            // <tr><td>1000.0.3</td><td>想确认任务进行程度如何，就可以按快捷键 #bQ#k开启 #b任务窗#k后，再按 #b任务告知#k.只要任务登录到任务告知上就可以直接时时确认进行情况。 </td></tr>
            // <tr><td>1000.0.yes.0</td><td>谢谢。#r#p2100# 姐姐#k应该在东部小山正努力晒衣服呢... #i4031003# 是这样的镜子。\n\n...哦对了！如果想知道刚刚接到的#b任务#k内容，可按下键盘的#b快捷键 Q#k进行确认。</td></tr>
            // <tr><td>1000.0.no.0</td><td>不想接受我的请求吗？唔~ 如果改变心意的再来找我吧。</td></tr>
            // <tr><td>1000.1.stop.npc.0</td><td>还没有去见#r#p2100# 姐姐#k吗？应该就在东部小山那里啊... 离这里很近，应该很容易找到的。</td></tr>

            // <tr><td>1001.0.0</td><td>这什么时候才能晒完啊…唉呀…啊？你是说我的镜子？ 是不是#p2101#托你来的...？</td></tr>
            // <tr><td>1001.0.1</td><td>哎呀~ 都不会亲自来拿…真的是懒到骨子里去了。这是我的镜子。</td></tr>
            // <tr><td>1001.1.0</td><td>啊！#p2100#你带姐姐的镜子来了！非常感谢。看看…皮肤有没有被晒黑吧…？ 哦呵~</td></tr>
            // <tr><td>1001.1.yes.0</td><td>地图上可以看到发出蓝色光芒的地点，那就是#b可以到达其它地方的传送点#k。在那地方前面站着按着键盘的#b方向键↑#k，你就能到别的地方。祝你一路顺风~</td></tr>
            // <tr><td>1001.1.stop.npc.0</td><td>还没有把镜子带给 #b#p2101##k吧? 要抓紧噢~ </td></tr>
            // <tr><td>1001.1.stop.item.0</td><td>你把镜子弄丢了吗？还是还没收下镜子？你按下#bI#k键可以确认道具栏里有什么东西，请你确认看看，如果没有，再去找姐姐吧，让她帮忙找一下。</td></tr>
            // <tr><td>1001.1.lost.0</td><td>这什么时候才能晒完啊…唉呀…啊？你是说我的镜子？ 是不是#p2101#托你来的...？</td></tr>

            // return true;
        }

        //任务达成
        public ActTask(id:string, step:number) : void {
            let data = msMoudle.wz["Act.img"][id];

            // console.log(id, "交谈" + step + "奖励")
            //获取奖励
            let exp = data[id + "." + step + ".exp"];
            if(!exp) exp = 0;

            if(exp > 0) {
                // console.log("Exp+" + Number(exp))
                msMoudle.getExp(Number(exp));
                if(msMoudle.mainT && msMoudle.mainT.m_msgList)
                    msMoudle.mainT.m_msgList.msgShow(0, "获得经验值EXP+" + exp, true);
            }

            let frame = 0;
            while(true) {
                let item = data[id + "." + step + ".item." + frame + ".id"];
                if(item) {
                    let count = data[id + "." + step + ".item." + frame + ".count"];
                    if(Number(count) > 0) {

                        // msMoudle.toast(item)
                        //这里有可能是装备
                        if(msMoudle.isCap(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isCape(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isShoes(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isCoat(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isPants(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isLongCoat(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isShield(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isGlove(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory1(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory2(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory3(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory4(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory5(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else if(msMoudle.isAccessory6(Number(item))) {
                            msMoudle._(); msMoudle.getWeapon("0" + item);
                        }
                        else {
                            console.log("道具增加", item, count);
                            msMoudle.addItem(item, Number(count));
                        }

                        // console.log("道具增加", item, count);
                        // msMoudle.addItem(item, Number(count));
                        // if(msMoudle.mainT && msMoudle.mainT.m_msgList)
                        //     msMoudle.mainT.m_msgList.msgShow(0, "道具增加" + exp, true);
                    }
                    else {
                        console.log("道具减少", item, count);
                        msMoudle.rmvItem(item, Number(count));
                        // if(msMoudle.mainT && msMoudle.mainT.m_msgList)
                        //     msMoudle.mainT.m_msgList.msgShow(0, "道具减少" + exp, true);
                    }
                    frame++;
                }
                else break;
            }
            // console.log("当前背包", ms.tBags, id, step);
            // <tr><td>1001.0.item.0.id</td><td>4031003</td></tr>
            // <tr><td>1001.0.item.0.count</td><td>1</td></tr>
            // <tr><td>1001.0.item.0.potentialGrade</td><td>C级</td></tr>
            // <tr><td>1001.1.exp</td><td>1</td></tr>
            // <tr><td>1001.1.item.0.id</td><td>4031003</td></tr>
            // <tr><td>1001.1.item.0.count</td><td>-1</td></tr>

            let nextQuest = data[id + "." + step + ".nextQuest"];
            if(nextQuest) {
                /////这里标记不一定正确
                ms.tQuests[id] = 2; //标记任务完成

                // console.log("开始下一个任务", nextQuest);
                ms.QuestId = nextQuest;
                ms.QuestStep = 0;
                // this.QuestTask(msMoudle.QuestId);
                // this.LookTask();
                //手动点击
                let npc:string = msMoudle.getNpcStateByCheck();
                msMoudle.QuestTask(ms.QuestId);
                // this.clickAllNpc(npc);
            }
            else {
                // console.log("当前任务新阶段")
                ms.QuestStep++;

                nextQuest = data[id + "." + ms.QuestStep + ".nextQuest"];
                if(nextQuest) {
                    /////这里标记不一定正确
                    ms.tQuests[id] = 2; //标记任务完成

                    // console.log("开始下一个任务", nextQuest);
                    ms.QuestId = nextQuest;
                    ms.QuestStep = 0;
                    // this.QuestTask(msMoudle.QuestId);
                    // this.LookTask();
                    //手动点击
                    let npc:string = msMoudle.getNpcStateByCheck();
                    msMoudle.QuestTask(ms.QuestId);
                    // this.clickAllNpc(npc);
                }
                else {
                    let npc:string = msMoudle.getNpcStateByCheck();
                    msMoudle.QuestTask(ms.QuestId);
                }

                // let npc:string = msMoudle.getNpcStateByCheck();
            }

            // <tr><td>1000.1.nextQuest</td><td>1001</td></tr>
            // <tr><td>1001.0.item.0.id</td><td>4031003</td></tr>
            // <tr><td>1001.0.item.0.count</td><td>1</td></tr>
            // <tr><td>1001.0.item.0.potentialGrade</td><td>C级</td></tr>
            // <tr><td>1001.1.exp</td><td>1</td></tr>
            // <tr><td>1001.1.item.0.id</td><td>4031003</td></tr>
            // <tr><td>1001.1.item.0.count</td><td>-1</td></tr>
            // <tr><td>1001.1.item.0.potentialGrade</td><td>C级</td></tr>
            // <tr><td>1003.1.nextQuest</td><td>1004</td></tr>
            // <tr><td>1004.1.exp</td><td>3</td></tr>
            // <tr><td>1005.0.item.0.id</td><td>4031000</td></tr>
            // <tr><td>1005.0.item.0.count</td><td>1</td></tr>
            // <tr><td>1005.0.item.0.potentialGrade</td><td>C级</td></tr>
            // <tr><td>1005.1.nextQuest</td><td>1006</td></tr>
            // <tr><td>1005.1.item.0.id</td><td>4031000</td></tr>
            // <tr><td>1005.1.item.0.count</td><td>-1</td></tr>
            // <tr><td>1005.1.item.0.potentialGrade</td><td>C级</td></tr>
        }

        // LookTask() : void {
        //     console.log("查看当前任务", msMoudle.QuestId)
        //     ms.QuestStep = 0;
        //     this.QuestTask(msMoudle.QuestId);
        // }

        //查看任务信息
        // public QuestTask(id:string) : void {

        //     // <tr><td>1000.name</td><td>借来莎丽的镜子</td></tr>
        //     // <tr><td>1000.parent</td><td>莎丽的镜子</td></tr>
        //     // <tr><td>1000.order</td><td>1</td></tr>
        //     // <tr><td>1000.area</td><td>20</td></tr>
        //     // <tr><td>1000.blocked</td><td>1</td></tr>
        //     // <tr><td>1000.0</td><td>去找希娜。</td></tr>
        //     // <tr><td>1000.1</td><td>在菇菇村见到了希娜，她正在担心太阳会把她的皮肤给晒伤。所以希娜要从她姐姐莎丽那里借来镜子。</td></tr>
        //     // <tr><td>1000.2</td><td>受到希娜的请求，要去找莎丽借镜子。</td></tr>
        //     let data = msMoudle.wz["Quest.img"][id];
        //     if(data) {
        //         let name = data[id + ".name"];
        //         // let root:string = id + "." + ms.QuestStep;
        //         // let ctx:string = data[root];
        //         // let frame = 1;
        //         // while(true) {
        //         //     let root:string = id + "." + frame;
        //         //     let str = data[root];
        //         //     if(str) {
        //         //         ctx += str;
        //         //         ctx += "\n";
        //         //         frame++;
        //         //     }
        //         //     else break;
        //         // }
        //         // console.log("Quest.img", name,ctx);
        //         this.title.text = name;
        //         // msMoudle.gameP.task_name.text = name;
        //         // msMoudle.gameP.task_txt.text = ctx;
        //     }
        //     //
        // }


        onBtnYesClick(e: Laya.Event): void {
            // // this.onYesOrNo("yes");
            // let data = msMoudle.wz["Say.img"][msMoudle.QuestId];
            // let yes = data[msMoudle.QuestId + "." + ms.QuestStep + ".yes." + this.talkstep];
            // let no = data[msMoudle.QuestId + "." + ms.QuestStep + ".no." + this.talkstep];

            // this.SayTask(msMoudle.QuestId, ms.QuestStep, yes);
        }
        onBtnNoClick(e: Laya.Event): void {
            // // this.onYesOrNo("no");
            // let data = msMoudle.wz["Say.img"][ms.QuestId];
            // let yes = data[msMoudle.QuestId + "." + ms.QuestStep + ".yes." + this.talkstep];
            // let no = data[ms.QuestId + "." + ms.QuestStep + ".no." + this.talkstep];

            // this.SayTask(ms.QuestId, ms.QuestStep, null, no);
        }
        onBtnContinueClick(e: Laya.Event): void {
            /*
            //步骤拆解
            1000.0.0    --默认显示  -->下一项
            1000.0.1    -->下一项
            1000.0.2    -->下一项
            1000.0.3    -->yes  no  stop   选择
            /////从这里开始就要选择yes no了
            1000.0.yes.0

            1001.0.0    --默认显示  -->下一项
            1001.0.1    ---点击ok对话结束

            1001.1.0    --默认显示
            1001.1.yes.0
            */
            if(this.canClose) {
                // console.log("关闭")
                this.ActTask(ms.QuestId, ms.QuestStep);
                this.close();
                return ;
            }
            this.talkstep++;
            this.SayTask(ms.QuestId, ms.QuestStep);
        }
        //
        updateData(){
            // let show1 = msMoudle.wz["Say.img"][this.questId + "." + this.Talkstate][this.questId + "." + this.Talkstate + "." + this.qIndex];
            // //如果找不到自己的对话就去找别人的
            // if(!show1) {
            //     this.questId = msMoudle.npcMsg[this.qNpc.npc].questId;
            //      show1 = msMoudle.wz["Say.img"][this.questId + "." + this.Talkstate][this.questId + "." + this.Talkstate + "." + this.qIndex];
            // }

            // this.content.text = show1;
            //选择项还是next
            // let yes = msMoudle.wz["Say.img"][this.questId + "." + this.Talkstate][this.questId + "." + this.Talkstate + ".yes." + this.qIndex];
            // let no = msMoudle.wz["Say.img"][this.questId + "." + this.Talkstate][this.questId + "." + this.Talkstate + ".no." + this.qIndex];
            // if(yes && no) this.showTwo();
            // else this.showOne();
        }

        showOne() : void {
            this.btnYes.visible = false;
            this.btnNo.visible = false;
            this.btnContinue.visible = true;
        }

        // showTwo() : void {
        //     this.btnYes.visible = true;
        //     this.btnNo.visible = true;
        //     this.btnContinue.visible = false;
        // }

        onClose() {
            ms.saveServer(true);
            if(this.pEle) {
                this.pEle.removeSelf();
                this.pEle = null;
            }
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            // this.close();
        }

        //
    }
}