/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.select {

    import cssBasicEff = BasicEffRole.BasicEff;

    export class selectDlg extends ui.select.selectDlgUI implements ui.select.IselectDlgUI {
        public static className = "ui.select.selectDlg";

        private m_msg:MsgRole.Msg;
        private m_eqp:app.model.Equip;

        constructor(params:app.model.Equip){
            super();
            this.m_eqp = params;
        }

        onInitialize(){

            this.x = (800 - 600) / 2;
            this.y = (600 - 350) / 2;

            this.m_msg = new MsgRole.Msg();
            this.lstJuanZhou.vScrollBarSkin = "";

            this.updateData(true);
        }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {

        }

        onLstJuanZhouCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "use") {
                this.onUse(index, this.cur_select[index]);
            }
            else if(childVarName == "icon") {
                this.onShowMsgD(index, this.cur_select[index]);
            }
        }

        public onUse(index:number, data:app.model.Equip) : void {
            if(this.m_eqp) {
                // if(this.m_eqp.suc >= 100) {
                //     msMoudle.toast("该装备砸卷次数已满");
                //     return ;
                // }
                let gitem:any = msMoudle.getItemMsg(data.id);
                let shen:number = gitem.incSHEN;
                if(shen > 0) {
                    let be:cssBasicEff = new cssBasicEff();
                    msMoudle.toast("成功");
                    //Fishing Success
                    let _show = ui.manager.getDialogByName("app.char.charDlg").dlg._show;
                    be.loadBasicEff(_show, "Success", 0, 0);
                    ///防止外挂
                    data.num -= 1;
                    msMoudle.test_shenmi -= 1;
                    // ms.asucc++;
                    this.m_eqp.succM[0]++;

                    if(data.num == 0) {
                        for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                            if(ms.herodata.BagSlots[i].openid == data.openid) {
                                ms.herodata.BagSlots.splice(i, 1);
                                break;
                            }
                        }
                    }
                    this.m_eqp.tuc += 1;

                    //记录砸卷轴记录
                    if(this.m_eqp.succlst[data.openid]) this.m_eqp.succlst[data.openid]++;
                    else this.m_eqp.succlst[data.openid] = 1;

                    ms.herodata.shenEquip(); //强化

                    ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onEqp();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onAbi();

                    this.updateData();
                    // this.close();
                }
                else {
                    if(this.m_eqp.tuc > 0) {
                        //消耗
                        this.m_eqp.tuc -= 1;
                        data.num -= 1;
                        if(data.num == 0) {
                            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                                if(ms.herodata.BagSlots[i].openid == data.openid) {
                                    ms.herodata.BagSlots.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        let succ:number = msMoudle.getRandValue(0, 0, 100);
                        let cursed:number = msMoudle.getRandValue(0, 0, 100);
                        let be:cssBasicEff = new cssBasicEff();
                        let _show = ui.manager.getDialogByName("app.char.charDlg").dlg._show;
                        if(cursed < gitem.cursed) {
                            msMoudle.toast("道具销毁了");
                            be.loadBasicEff(_show, "Failure", 0, 0);
                            ms.herodata.destoryEquip(this.m_eqp);
                            // ms.afail++;
                            ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                            ui.manager.getDialogByName("app.char.charDlg").dlg.onEqp();
                            ui.manager.getDialogByName("app.char.charDlg").dlg.onAbi();

                            this.close();
                        }
                        else {
                            if(succ < gitem.success) {
                                msMoudle.toast("成功");
                                //Fishing Success
                                be.loadBasicEff(_show, "Success", 0, 0);
                                // ms.asucc++;
                                this.m_eqp.succM[0]++;
                                let addprop:boolean = true;
                                ////先临时这么处理
                                if(data.openid == 2040595 || data.openid == 2040596 || data.openid == 2040597 || data.openid == 2040598) {
                                    addprop = false;
                                }

                                //记录砸卷轴记录
                                if(this.m_eqp.succlst[data.openid]) {
                                    this.m_eqp.succlst[data.openid]++;
                                }
                                else this.m_eqp.succlst[data.openid] = 1;

                                // }
                                if(addprop) {
                                    //属性加成
                                    this.m_eqp.MaxHP.gearAdd += gitem.incMHP;//HP总值
                                    this.m_eqp.MaxMP.gearAdd += gitem.incMMP;//MP总值
                                    this.m_eqp.PADamage.gearAdd += gitem.incPAD;//攻击力
                                    this.m_eqp.MADamage.gearAdd += gitem.incMAD;//魔法力
                                    this.m_eqp.PDDamage.gearAdd += gitem.incPDD;//物理防御力
                                    this.m_eqp.MDDamage.gearAdd += gitem.incMDD;//魔法防御力
                                    this.m_eqp.Accurate.gearAdd += gitem.incACC;//命中率
                                    this.m_eqp.Evasion.gearAdd += gitem.incEVA;//回避率
                                    // this.m_eqp.WalkSpeed.gearAdd += gitem.incSPEED;//移动速度
                                    // this.m_eqp.incJUMP += gitem.incJUMP;//跳跃力
                                    this.m_eqp.Str.gearAdd += gitem.incSTR;//力量
                                    this.m_eqp.Dex.gearAdd += gitem.incDEX;//敏捷
                                    this.m_eqp.Inte.gearAdd += gitem.incINT;//智力
                                    this.m_eqp.Luck.gearAdd += gitem.incLUK;//运气
                                    this.m_eqp.suc += 1;
                                }
                            }
                            else {
                                msMoudle.toast("失败");
                                be.loadBasicEff(_show, "Failure", 0, 0);
                                this.m_eqp.succM[1]++;
                                // ms.afail++;
                                //记录砸卷轴记录
                                // if(this.m_eqp.faillst[data.openid]) this.m_eqp.faillst[data.openid]++;
                                // else this.m_eqp.faillst[data.openid] = 1;
                            }
                            //更新
                            ms.herodata.strEquip(); //强化

                            ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                            ui.manager.getDialogByName("app.char.charDlg").dlg.onEqp();
                            ui.manager.getDialogByName("app.char.charDlg").dlg.onAbi();
                            this.updateData();
                        }

                    }
                    else {
                        msMoudle.toast2("可升级次数不足");
                    }
                }
            }
        }

        cur_select:Array<app.model.Equip> = [];
        updateData(flag:boolean = false){
            this.cur_select = [];
            if(this.m_eqp) {
                for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                    if(ms.herodata.BagSlots[i].type == 0) {
                        let item = msMoudle.getItemMsg(ms.herodata.BagSlots[i].id);
                        if(ms.herodata.BagSlots[i].id == "2040599") {
                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                        }
                        else {
                            if(this.m_eqp.part == 0) {  //武器
                                let type = msMoudle.getWeaponType(this.m_eqp.id);
                                // console.log("type" + type, item)
                                if(item.name.indexOf("全身") < 0 && item.name.indexOf("盾牌") < 0 && item.name.indexOf("披风") < 0
                                    && item.name.indexOf("手套") < 0 && item.name.indexOf("鞋子") < 0 && item.name.indexOf("头盔") < 0
                                    && item.name.indexOf("耳环") < 0 && item.name.indexOf("项链") < 0 && item.name.indexOf("腰带") < 0) {
                                    if(type == "弓") {
                                        if(item.name.indexOf("弓") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "弩") {
                                        if(item.name.indexOf("弩") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "手杖" || type == "短杖" || type == "长杖") {
                                        if(item.name.indexOf("杖") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "单手剑") {
                                        if(item.name.indexOf("单手剑") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "双手剑") {
                                        if(item.name.indexOf("双手剑") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "单手斧") {
                                        if(item.name.indexOf("单手斧") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "双手斧") {
                                        if(item.name.indexOf("双手斧") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "单手钝器") {
                                        if(item.name.indexOf("单手钝器") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "双手钝器") {
                                        if(item.name.indexOf("双手钝器") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "枪" || type == "太刀") {
                                        if(item.name.indexOf("枪") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "矛") {
                                        if(item.name.indexOf("矛") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "短刀") {
                                        if(item.name.indexOf("短剑") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "拳套") {
                                        if(item.name.indexOf("拳套") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "拳甲") {
                                        if(item.name.indexOf("拳甲") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "短枪") {
                                        if(item.name.indexOf("短枪") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "能量剑") {
                                        if(item.name.indexOf("能量剑") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                    else if(type == "太刀") {
                                        if(item.name.indexOf("太刀") >= 0 || item.name.indexOf("朱雀") >= 0) {
                                            this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                                        }
                                    }
                                }

                            }
                            else if(this.m_eqp.part == 1) {     //全身铠甲
                                if(item.name.indexOf("全身") >= 0 || item.name.indexOf("青龙") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 2) {     //披风
                                if(item.name.indexOf("披风") >= 0 || item.name.indexOf("白虎") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 3) {     //盾牌
                                if(item.name.indexOf("盾牌") >= 0 || item.name.indexOf("玄武") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 4) {     //手套
                                if(item.name.indexOf("手套") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 5) {     //鞋子
                                if(item.name.indexOf("鞋子") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 6) {     //帽子
                                if(item.name.indexOf("头盔") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 7) {     //耳环
                                if(item.name.indexOf("耳环") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 8) {     //项链
                                if(item.name.indexOf("项链") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            else if(this.m_eqp.part == 9) {     //腰带
                                if(item.name.indexOf("腰带") >= 0)
                                    this.cur_select[this.cur_select.length] = ms.herodata.BagSlots[i];
                            }
                            // else if(this.m_eqp.part == 10) {     //脸饰
                            // }
                            // else if(this.m_eqp.part == 11) {     //眼饰
                            // }
                            // else if(this.m_eqp.part == 12) {     //勋章
                            // }
                            //
                        }
                    }
                }
            }
            if(this.cur_select.length > 0)
                this.lstJuanZhou.dataModel = this.cur_select;
            else {
                if(flag) msMoudle.toast2("没有可用的卷轴");
                this.close();
            }
        }

        public onShowMsgD(index:number, data:app.model.Equip) : void {

            this.m_msg.itemShow(data.id);
        }

        //
    }
}