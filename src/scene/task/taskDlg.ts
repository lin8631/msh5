/// <reference path="./../../core/ms/Maple/Msg.ts" />

namespace app.task {

    import cssMsg = MsgRole.Msg;

    export class taskDlg extends ui.task.taskDlgUI implements ui.task.ItaskDlgUI{

        public static className = "app.task.taskDlg";
        private m_msg:cssMsg;

        onInitialize(): void {
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.lstTask.vScrollBarSkin = "";
            this.updataTask();

            this.btnRenWu.gray = false;
            this.btnChengJiu.gray = true;
            this.btnDay.gray = true;
        }

        onBtnRenWuClick(e: Laya.Event): void {
            if(this.btnRenWu.gray == true) {
                this.btnRenWu.gray = false;
                this.btnChengJiu.gray = true;
                this.btnDay.gray = true;
                this.updataTask();
            }
        }
        onBtnChengJiuClick(e: Laya.Event): void {
            if(this.btnChengJiu.gray == true) {
                this.btnChengJiu.gray = false;
                this.btnRenWu.gray = true;
                this.btnDay.gray = true;
                this.updataChengJiu();
            }
        }

        onBtnDayClick(e: Laya.Event): void {
            if(this.btnDay.gray == true) {
                this.btnChengJiu.gray = true;
                this.btnRenWu.gray = true;
                this.btnDay.gray = false;
                this.updataDay();
            }
        }

        onLstTaskCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "taskprosp") {
                this.onUpdate(index, this._alltask[index]);
            }
            else if(childVarName == "reward1") {
                this.onShowMsgD(index, 0, this._alltask[index]);
            }
            else if(childVarName == "reward2") {
                this.onShowMsgD(index, 1, this._alltask[index]);
            }
            else if(childVarName == "reward3") {
                this.onShowMsgD(index, 2, this._alltask[index]);
            }
        }

        public onShowMsgD(index:number, _:number, data:any) : void {
            if(data) {
                let reward = data.reward.split("#");
                if(reward[2 * _]) {
                    // console.log(reward[2 * _])
                    this.m_msg = new cssMsg();
                    if(reward[2 * _] == "9000000" || reward[2 * _] == "1234561" || reward[2 * _] == "1234562" ||
                    reward[2 * _] == "700000000" || reward[2 * _] == "800000000" || reward[2 * _] == "600000002") {
                        this.m_msg.itemShow(reward[2 * _]);
                    }
                    else if(msMoudle.isJuanZhou(Number(reward[2 * _]))) {
                        this.m_msg.itemShow(Number(reward[2 * _]));
                    }
                    else {
                        this.m_msg.equipLoadShow(reward[2 * _]);
                    }
                }
            }
        }

        public onUpdate(index:number, data:any) : void {
            let showReward:Array<any> = [];

            let items = data.item.split("#");
            //从背包删除数据
            // for(let i:number = 0; i < ms.bagsdata.length; i++) {
            //     if(ms.bagsdata[i]) {
            //         if(ms.bagsdata[i].id == items[0]) {
            //             ms.bagsdata[i].num -= Number(items[1]);
            //             if(ms.bagsdata[i].num == 0) {
            //                 ms.bagsdata.splice(i, 1);
            //             }
            //             break;
            //         }
            //     }
            // }
            //更新task
            ms.tasksdata[ms.tasksdata.length] = data.index;

            if(this.btnRenWu.gray == false) this.updataTask();
            else if(this.btnChengJiu.gray == false) this.updataChengJiu();
            else if(this.btnDay.gray == false) this.updataDay();

            //更新背包奖励
            let rewards = data.reward.split("#");
            for(let i:number = 0; i < rewards.length / 2; i++) {
                let tIndex:number = showReward.length;
                showReward[tIndex] = new Object();
                if(rewards[2 * i] == "9000000" || rewards[2 * i] == "1234561" || rewards[2 * i] == "1234562") {
                    msMoudle.huobiReward(rewards[2 * i], Number(rewards[2 * i + 1]));
                    showReward[tIndex].pinzhi = 4;
                    showReward[tIndex].num = Number(rewards[2 * i + 1]);
                    showReward[tIndex].type = 0;
                    if(rewards[2 * i] == "9000000") {
                        showReward[tIndex].itemid = "9000000";
                        showReward[tIndex].name = "金币";
                        showReward[tIndex].img = "homeland/02022995.info.icon.png";
                    }
                    else if(rewards[2 * i] == "1234561") {
                        showReward[tIndex].itemid = "1234561";
                        showReward[tIndex].name = "枫叶";
                        showReward[tIndex].img = "homeland/02028044.info.icon.png";
                    }
                    else if(rewards[2 * i] == "1234562") {
                        showReward[tIndex].itemid = "1234562";
                        showReward[tIndex].name = "黑金";
                        showReward[tIndex].img = "homeland/02048719.info.icon.png";
                    }
                }
                else if(rewards[2 * i] == "700000000" || rewards[2 * i] == "800000000" || rewards[2 * i] == "600000002") {
                    showReward[tIndex].pinzhi = 5;
                    showReward[tIndex].num = Number(rewards[2 * i + 1]);
                    showReward[tIndex].type = 0;
                    if(rewards[2 * i] == "700000000") {
                        showReward[tIndex].itemid = "700000000";
                        showReward[tIndex].name = "升星石";
                        showReward[tIndex].img = "homeland/04001017.info.icon.png";
                        msMoudle._(); msMoudle.updateCaiLiao1(showReward[tIndex].num)
                    }
                    else if(rewards[2 * i] == "800000000") {
                        showReward[tIndex].itemid = "800000000";
                        showReward[tIndex].name = "觉醒石";
                        showReward[tIndex].img = "homeland/04001129.info.icon.png";
                        msMoudle._(); msMoudle.updateJueXing1(showReward[tIndex].num)
                    }
                    else if(rewards[2 * i] == "600000002") {
                        showReward[tIndex].itemid = "600000002";
                        showReward[tIndex].name = "修炼石";
                        showReward[tIndex].img = "homeland/04001190.info.icon.png";
                        msMoudle._(); msMoudle.updateCaiLiao2(showReward[tIndex].num)
                    }
                }
                else if(msMoudle.isJuanZhou(Number(rewards[2 * i]))) {
                    let _reward = msMoudle.getItemMsg(Number(rewards[2 * i]));
                    msMoudle._(); msMoudle.getItem(_reward.id);
                    showReward[tIndex].pinzhi = 5;
                    showReward[tIndex].num = 1;
                    showReward[tIndex].type = 0;
                    showReward[tIndex].itemid = _reward.id;
                    showReward[tIndex].name = _reward.name;
                    showReward[tIndex].img = _reward.img;
                }
                else {
                    let _reward = msMoudle.getEqpMsg(rewards[2 * i]);
                    msMoudle._(); msMoudle.getWeapon(_reward.id);
                    showReward[tIndex].pinzhi = 5;
                    showReward[tIndex].num = 1;
                    showReward[tIndex].type = 1;
                    showReward[tIndex].itemid = _reward.id;
                    showReward[tIndex].name = _reward.name;
                    showReward[tIndex].img = _reward.img;
                }
            }


            ui.show(app.battle.rewardDlg, {params:[showReward]});
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updataHead();
        }

        _alltask:Array<any> = [];
        public updataDay() : void {
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = false;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("任务").visible = false;
            }
            msMoudle.task_tap = 0;
            msMoudle.chengjiu_tap = 0;
            msMoudle.day_tap = 0;
            this._tishi0.visible = false;
            this._tishi1.visible = false;
            this._tishi2.visible = false;
            this._alltask = [];
            this._alltask = msMoudle.getDayMsg();
            msMoudle.getTaskMsg();
            msMoudle.getChengJiuMsg();
            this.lstTask.dataModel = this._alltask;
            if(msMoudle.task_tap == 1) this._tishi1.visible = true;
            if(msMoudle.chengjiu_tap == 1) this._tishi0.visible = true;
            if(msMoudle.day_tap == 1) this._tishi2.visible = true;
        }

        public updataTask() : void {
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = false;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("任务").visible = false;
            }
            msMoudle.task_tap = 0;
            msMoudle.chengjiu_tap = 0;
            msMoudle.day_tap = 0;
            this._tishi0.visible = false;
            this._tishi1.visible = false;
            this._tishi2.visible = false;
            this._alltask = [];
            this._alltask = msMoudle.getTaskMsg();
            msMoudle.getDayMsg();
            msMoudle.getChengJiuMsg();
            this.lstTask.dataModel = this._alltask;
            if(msMoudle.task_tap == 1) this._tishi1.visible = true;
            if(msMoudle.chengjiu_tap == 1) this._tishi0.visible = true;
            if(msMoudle.day_tap == 1) this._tishi2.visible = true;
        }

        public updataChengJiu() : void {
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = false;
            msMoudle.task_tap = 0;
            msMoudle.chengjiu_tap = 0;
            msMoudle.day_tap = 0;
            this._tishi0.visible = false;
            this._tishi1.visible = false;
            this._tishi2.visible = false;
            this._alltask = [];
            this._alltask = msMoudle.getChengJiuMsg();
            msMoudle.getTaskMsg();
            msMoudle.getDayMsg();
            this.lstTask.dataModel = this._alltask;
            if(msMoudle.task_tap == 1) this._tishi1.visible = true;
            if(msMoudle.chengjiu_tap == 1) this._tishi0.visible = true;
            if(msMoudle.day_tap == 1) this._tishi2.visible = true;
        }

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 360, 240);
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

    }
}