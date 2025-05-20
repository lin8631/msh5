/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.libao {

    import cssMsg = MsgRole.Msg;

    export class LiBaoDlg extends ui.libao.LiBaoDlgUI implements ui.libao.ILiBaoDlgUI {
        public static className = "app.libao.LiBaoDlg";
        private m_msg:cssMsg;

        onInitialize(){
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.updateData();
        }


        onClose() {

        }

        _alltask:Array<any> = [];
        updateData(){
            this.m_msg = new cssMsg();

            this.lstLiBao.vScrollBarSkin = "";

            this.tip0.visible = false;
            // this.tip1.visible = false;
            this.tip2.visible = false;

            this.libao.gray = false;
            // this.day.gray = true;
            this.chongzhi.gray = true;

            this.onLibaoClick(null);
        }

        libao_type:number = 1;
        onLibaoClick(e: Laya.Event): void {
            this.libao.gray = false;
            // this.day.gray = true;
            this.chongzhi.gray = true;

            this.libao_type = 1;
            this.updataLiBao();
        }
        onDayClick(e: Laya.Event): void {
            this.libao.gray = true;
            // this.day.gray = false;
            this.chongzhi.gray = true;
            this.libao_type = 3;
            // this.updataDay();
        }
        onChongzhiClick(e: Laya.Event): void {
            this.libao.gray = true;
            // this.day.gray = true;
            this.chongzhi.gray = false;
            this.libao_type = 2;
            this.updataChongZhi();
        }

        updataLiBao() : void {
            msMoudle.lv_tap = 0;
            msMoudle.cz_tap = 0;
            this.tip0.visible = false;
            this.tip2.visible = false;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = false;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("礼包").visible = false;
            }
            this._alltask = [];
            this._alltask = msMoudle.getLiBaoMsg();
            msMoudle.getChongZhiLiBaoMsg();

            if(msMoudle.lv_tap == 1) this.tip0.visible = true;
            if(msMoudle.cz_tap == 1) this.tip2.visible = true;

            this.lstLiBao.dataModel = this._alltask;
        }

        // updataDay() : void {
        //     ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = false;
        //     this._alltask = [];
        //     this._alltask = msMoudle.getDayLiBaoMsg();
        //     this.lstLiBao.dataModel = this._alltask;
        // }

        updataChongZhi() : void {
            msMoudle.lv_tap = 0;
            msMoudle.cz_tap = 0;
            this.tip0.visible = false;
            this.tip2.visible = false;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = false;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("礼包").visible = false;
            }
            this._alltask = [];
            this._alltask = msMoudle.getChongZhiLiBaoMsg();
            msMoudle.getLiBaoMsg();

            if(msMoudle.lv_tap == 1) this.tip0.visible = true;
            if(msMoudle.cz_tap == 1) this.tip2.visible = true;

            this.lstLiBao.dataModel = this._alltask;
        }

        onLstLiBaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
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
            else if(childVarName == "reward4") {
                this.onShowMsgD(index, 3, this._alltask[index]);
            }
        }

        public onShowMsgD(index:number, _:number, data:any) : void {
            if(data) {
                let reward = data.reward.split("#");
                if(reward[2 * _]) {
                    // console.log(reward[2 * _])
                    this.m_msg = new cssMsg();
                    if(reward[2 * _] == "9000000" || reward[2 * _] == "1234561" || reward[2 * _] == "1234562" || reward[2 * _] == "987654321" || reward[2 * _] == "700000000" ||reward[2 * _] == "800000000" || reward[2 * _] == "600000002" || reward[2 * _] == "1234531" || reward[2 * _] == "1234532" || reward[2 * _] == "1234533" || reward[2 * _] == "1234534" || reward[2 * _] == "1234535" || reward[2 * _] == "900000000") { //
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
            //更新task
            if(this.libao_type == 1) {
                ms.tasksdata[ms.tasksdata.length] = data.index;
                this.updataLiBao();
            }
            else if(this.libao_type == 2) {
                ms.czValue = 0;
                this.updataChongZhi();
            }

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
                else if(rewards[2 * i] == "987654321" || rewards[2 * i] == "700000000" || rewards[2 * i] == "800000000" || rewards[2 * i] == "600000002") {
                    showReward[tIndex].pinzhi = 4;
                    showReward[tIndex].num = Number(rewards[2 * i + 1]);
                    showReward[tIndex].type = 0;
                    if(rewards[2 * i] == "987654321") {
                        let rnk:number = msMoudle.getRandValue(1000, 0, 49000);
                        msMoudle._(); msMoudle.updateJinBi(rnk);
                        showReward[tIndex].itemid = "987654321";
                        showReward[tIndex].name = "金币袋";
                        showReward[tIndex].img = "homeland/04000334.info.icon.png";
                    }
                    else if(rewards[2 * i] == "700000000") {
                        msMoudle._(); msMoudle.updateCaiLiao1(Number(rewards[2 * i + 1]))
                        showReward[tIndex].itemid = "700000000";
                        showReward[tIndex].name = "升星石";
                        showReward[tIndex].img = "homeland/04001017.info.icon.png";
                    }
                    else if(rewards[2 * i] == "800000000") {
                        msMoudle._(); msMoudle.updateJueXing1(Number(rewards[2 * i + 1]))
                        showReward[tIndex].itemid = "800000000";
                        showReward[tIndex].name = "觉醒石";
                        showReward[tIndex].img = "homeland/04001129.info.icon.png";
                    }
                    else if(rewards[2 * i] == "600000002") {        //觉醒
                        msMoudle._(); msMoudle.updateCaiLiao2(Number(rewards[2 * i + 1]));
                        showReward[tIndex].itemid = "600000002";
                        showReward[tIndex].name = "修炼石";
                        showReward[tIndex].img = "homeland/04001190.info.icon.png";
                    }
                }
                else if(rewards[2 * i] == "1234531" || rewards[2 * i] == "1234532" || rewards[2 * i] == "1234533" || rewards[2 * i] == "1234534" || rewards[2 * i] == "1234535" ||  rewards[2 * i] == "900000000") {
                    showReward[tIndex].pinzhi = 5;
                    showReward[tIndex].num = Number(rewards[2 * i + 1]);
                    showReward[tIndex].type = 0;
                    showReward[tIndex].itemid = rewards[2 * i];
                    showReward[tIndex].img = "homeland/04001374.info.icon.png";
                    if(rewards[2 * i] == "1234531") {
                        showReward[tIndex].name = "转盘券";
                        ms.zhuanpan += showReward[tIndex].num;
                    }
                    else if(rewards[2 * i] == "1234532") {
                        showReward[tIndex].name = "修炼场入场券";
                        ms.miwu += showReward[tIndex].num;
                    }
                    else if(rewards[2 * i] == "1234533") {
                        showReward[tIndex].name = "林中城入场券";
                        ms.tiaotiao += showReward[tIndex].num;
                    }
                    else if(rewards[2 * i] == "1234534") {
                        showReward[tIndex].name = "转盘券";
                        ms.zhuanpan += showReward[tIndex].num;
                    }
                    else if(rewards[2 * i] == "1234535") {
                        showReward[tIndex].name = "伟大航路入场券";
                        ms.zhuzhu += showReward[tIndex].num;
                    }
                    else if(rewards[2 * i] == "900000000") {
                        showReward[tIndex].name = "入场券";
                        // ms.zhuzhu += showReward[tIndex].num;
                        for(let __ = 0; __ < showReward[tIndex].num; __++) {
                            let getRnk = msMoudle.getRandValue(0, 0, 100);
                            if(getRnk < 33) {
                                ms.zhuanpan += 1;
                            }
                            else if(getRnk < 66) {
                                ms.miwu += 1;
                            }
                            else {
                                ms.zhuzhu += 1;
                            }
                        }
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

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 360, 240);
            this.close();
            let a = true;
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