/// <reference path="./Base.ts" />

namespace app.model {

    export class CharStatus extends Base {

        @field()
        id:number = 0;             //英雄表id
        @field()
        openid:number = 0;         //英雄唯一id
        // @field()
        // head:string = "";           //头像
        @field()
        juexing:number = 0;         //觉醒状态
        @field()
        star:number = 0;            //星级
        @field()
        pinzhi:number = 0;          //品质
        @field()
        state:number = 0;           //是否上阵
        /////////////////////////////////////
        @field()
        Job:number = 0;         //职业
        @field()
        tJobs:Array<any> = [112, 122, 132, 212, 222, 232, 312, 322, 412, 422];      //可转职业
        @field()
        pJobs:Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];      //可转职业第几转
        @field()
        XL:Array<any> = [0, 0, 0, 0, 0, 0, 0, 0];
        @field()
        ZS:number = 0;          //转生次数
        @field()
        LH:number = 0;          //轮回次数
        // @field()
        // XunL:Array<any> = [0, 0, 0, 0, 0];      //训练
        @field()
        Lv:number = 1;          //等级
        @field()
        Exp:number = 0;          //等级
        @field()
        Name:string = "玩家";     //名称
        @field()
        Sex:number = 0;          //性别
        @field()
        Skill_1:string = "N";     //佩戴技能1
        @field()
        Skill_2:string = "N";     //佩戴技能2
        @field()
        Skill_3:string = "N";     //佩戴技能3
        @field()
        Skill_4:string = "N";     //佩戴技能4


        //////以下属性也通通不存粗
        @field()
        Str: model.CharProp = new model.CharProp(99999);        //力量
        @field()
        Dex: model.CharProp = new model.CharProp(99999);        //敏捷
        @field()
        Inte: model.CharProp = new model.CharProp(99999);       //智力
        @field()
        Luck: model.CharProp = new model.CharProp(99999);       //运气
        // @field()
        // HP: model.CharProp = new model.CharProp(999999);       //生命上限
        @field()
        MaxHP: model.CharProp = new model.CharProp(999999);       //生命上限
        // @field()
        // MP: model.CharProp = new model.CharProp(999999);       //魔法上限
        @field()
        MaxMP: model.CharProp = new model.CharProp(999999);       //魔法上限
        @field()
        PADamage: model.CharProp = new model.CharProp(9999);         //物理攻击力
        @field()
        MADamage: model.CharProp = new model.CharProp(9999);         //魔法攻击力
        @field()
        PDDamage: model.CharProp = new model.CharProp(9999);         //物理防御力
        @field()
        MDDamage: model.CharProp = new model.CharProp(9999);         //魔法防御力
        @field()
        Accurate: model.CharProp = new model.CharProp(200);        //命中率
        @field()
        Evasion: model.CharProp = new model.CharProp(200);         //闪避率
        @field()
        CriticalRate: model.CharProp = new model.CharProp(200);        //暴击率
        @field()
        CriticalDamageMax: model.CharProp = new model.CharProp(999);  //最大暴击伤害     (暂时不用)
        @field()
        CriticalDamageMin: model.CharProp = new model.CharProp(999);  //最小暴击伤害     (暂时不用)
        @field()
        Mastery: model.CharProp = new model.CharProp(999);         //熟练度     (暂时为100)
        @field()
        DamageRate: model.CharProp = new model.CharProp(999);      //伤害加成     (暂时不用)
        @field()
        BossDamageRate: model.CharProp = new model.CharProp(999);  //Boss伤害加成     (暂时不用)
        @field()
        AttackSpeed: model.CharProp = new model.CharProp(999);        //攻击速度
        @field()
        WalkSpeed: model.CharProp = new model.CharProp(999);        //移动速度

        //0-武器、1-套装、2-披风、3-鞋子
        EquipSlots: Array<model.Equip> = [];        //装备
        BagSlots: Array<model.Equip> = [];          //背包
        /////新的装备结构
        FlionSlots :Array<any> = [];

        // EquipSlots2 :Array<model.Equip> = [];           //龙骑士
        // EquipSlots3 :Array<model.Equip> = [];           //主教
        // EquipSlots4 :Array<model.Equip> = [];           //独行客
        // EquipSlots5 :Array<model.Equip> = [];           //神射手
        // EquipSlots6 :Array<model.Equip> = [];           //英雄
        // EquipSlots7 :Array<model.Equip> = [];           //冰雷
        // EquipSlots8 :Array<model.Equip> = [];           //圣骑士
        // EquipSlots9 :Array<model.Equip> = [];           //火毒
        // EquipSlots10 :Array<model.Equip> = [];           //箭神
        // EquipSlots11 :Array<model.Equip> = [];           //无影人
        // EquipSlots12 :Array<model.Equip> = [];           //冲锋队长
        // EquipSlots13 :Array<model.Equip> = [];           //船长
        // EquipSlots14 :Array<model.Equip> = [];           //狂龙战士
        // EquipSlots15 :Array<model.Equip> = [];           //夜光法师
        // EquipSlots16 :Array<model.Equip> = [];           //尖兵
        // EquipSlots17 :Array<model.Equip> = [];           //剑豪
        // EquipSlots18 :Array<model.Equip> = [];           //魔影链士
        // EquipSlots19 :Array<model.Equip> = [];           //圣晶使者
        // EquipSlots20 :Array<model.Equip> = [];           //影魂异人
        // EquipSlots21 :Array<model.Equip> = [];           //虎影
        // EquipSlots22 :Array<model.Equip> = [];           //神之子
        // EquipSlots23 :Array<model.Equip> = [];           //爆莉萌天使
        // EquipSlots24 :Array<model.Equip> = [];           //战神
        // EquipSlots25 :Array<model.Equip> = [];           //龙神
        // EquipSlots26 :Array<model.Equip> = [];           //双弩精灵
        // EquipSlots27 :Array<model.Equip> = [];           //幻影
        // EquipSlots28 :Array<model.Equip> = [];           //隐月
        // EquipSlots29 :Array<model.Equip> = [];           //恶魔猎手
        // EquipSlots30 :Array<model.Equip> = [];           //恶魔复仇者
        // EquipSlots31 :Array<model.Equip> = [];           //唤灵斗师
        // EquipSlots32 :Array<model.Equip> = [];           //爆破手
        // EquipSlots33 :Array<model.Equip> = [];           //古迹猎人
        // EquipSlots34 :Array<model.Equip> = [];           //暗影双刀
        // EquipSlots35 :Array<model.Equip> = [];           //米哈尔
        // EquipSlots36 :Array<model.Equip> = [];           //魂骑士
        // EquipSlots37 :Array<model.Equip> = [];           //炎术士
        // EquipSlots38 :Array<model.Equip> = [];           //风灵使者
        // EquipSlots39 :Array<model.Equip> = [];           //夜行者
        // EquipSlots40 :Array<model.Equip> = [];           //奇袭者
        // EquipSlots41 :Array<model.Equip> = [];
        // EquipSlots42 :Array<model.Equip> = [];

        // EquipSlots44 :Array<model.Equip> = [];
        // EquipSlots22 :Array<model.Equip> = [];           //超能力者,//火炮手
        // EquipSlots22 :Array<model.Equip> = [];           //阴阳师---
        // EquipSlots24 :Array<model.Equip> = [];           //林之灵----
        // EquipSlots32 :Array<model.Equip> = [];           //豹弩游侠
        // EquipSlots33 :Array<model.Equip> = [];           //机械师
        //龙的传人---
        BagSlots2 :Array<model.Equip> = [];

        suoEquip(slot:model.Equip) : void {
            slot.suo = !slot.suo;
            ms.saveServer();
        }
        suoItem(itemid:number) : void {
            for(let i:number = 0; i < this.BagSlots.length; i++) {
                if(this.BagSlots[i].openid == itemid) {
                    this.BagSlots[i].suo = !this.BagSlots[i].suo;
                    break;
                }
            }
        }

        //穿戴装备
        wearEquip(slot:model.Equip) : void {
            //如果槽位本身有装备
            if(this.EquipSlots[slot.part]) {
                //装备中的加入背包
                this.BagSlots[this.BagSlots.length] = this.EquipSlots[slot.part];
                //新的穿上
                this.EquipSlots[slot.part] = slot;
            }
            else {
                //新的穿上
                this.EquipSlots[slot.part] = slot;
            }
            //清除之前背包的
            for(let i:number = 0; i < this.BagSlots.length; i++) {
                if(this.BagSlots[i].openid == slot.openid) {
                    this.BagSlots.splice(i, 1);
                    break;
                }
            }
            this.ReCalAdd();
            if(msMoudle.char) {
                msMoudle.char.updHeroDataFast();
            }
            //更新主城上面的形象
            // if(slot.part == 0) msMoudle.char.changePart(msMoudle.partType.tWeapon, slot.id + ".img");
            ms.saveServer();
        }
        // wearEquip2(slot:model.Equip) : void {
        //     let eslosts:Array<any> = [
        //         this.EquipSlots2,
        //         this.EquipSlots3,
        //         this.EquipSlots4,
        //         this.EquipSlots5,
        //         this.EquipSlots6,
        //         this.EquipSlots7,
        //         this.EquipSlots8,
        //         this.EquipSlots9,
        //         this.EquipSlots10,
        //         this.EquipSlots11,
        //         this.EquipSlots12,
        //         this.EquipSlots13,
        //         this.EquipSlots14,
        //         this.EquipSlots15,
        //         this.EquipSlots16,
        //         this.EquipSlots17,
        //         this.EquipSlots18,
        //         this.EquipSlots19,
        //         this.EquipSlots20,
        //         this.EquipSlots21,
        //         this.EquipSlots22,
        //         this.EquipSlots23,
        //         this.EquipSlots24,
        //         this.EquipSlots25,
        //         this.EquipSlots26,
        //         this.EquipSlots27,
        //         this.EquipSlots28,
        //         this.EquipSlots29,
        //         this.EquipSlots30,
        //         this.EquipSlots31,
        //         this.EquipSlots32,
        //         this.EquipSlots33,
        //         this.EquipSlots34,
        //         this.EquipSlots35,
        //         this.EquipSlots36,
        //         this.EquipSlots37,
        //         this.EquipSlots38,
        //         this.EquipSlots39,
        //         this.EquipSlots40,
        //         this.EquipSlots41,
        //         this.EquipSlots42
        //     ];

        //     if(eslosts[ms.selHero]) {
        //         if(eslosts[ms.selHero][slot.part]) {
        //             //装备中的加入背包
        //             this.BagSlots2[this.BagSlots2.length] = eslosts[ms.selHero][slot.part];
        //             //新的穿上
        //             eslosts[ms.selHero][slot.part] = slot;
        //         }
        //         else {
        //             //新的穿上
        //             eslosts[ms.selHero][slot.part] = slot;
        //         }
        //     }

        //     //清除之前背包的
        //     for(let i:number = 0; i < this.BagSlots2.length; i++) {
        //         if(this.BagSlots2[i].openid == slot.openid) {
        //             this.BagSlots2.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // this.ReCalAdd2();
        //     ms.saveServer();
        // }

        //脱掉装备
        putoffEquip(slot:model.Equip) : void {
            //加入背包
            this.BagSlots[this.BagSlots.length] = slot;
            //穿上的去除
            this.EquipSlots[slot.part] = null;
            this.ReCalAdd();
            //更新主城上面的形象
            // if(slot.part == 0) msMoudle.char.changePart(msMoudle.partType.tWeapon, "N");
            if(msMoudle.char) {
                msMoudle.char.updHeroDataFast();
            }
            ms.saveServer();
        }
        // putoffEquip2(slot:model.Equip) : void {
        //     //加入背包
        //     this.BagSlots2[this.BagSlots2.length] = slot;

        //     let eslosts:Array<any> = [
        //         this.EquipSlots2,
        //         this.EquipSlots3,
        //         this.EquipSlots4,
        //         this.EquipSlots5,
        //         this.EquipSlots6,
        //         this.EquipSlots7,
        //         this.EquipSlots8,
        //         this.EquipSlots9,
        //         this.EquipSlots10,
        //         this.EquipSlots11,
        //         this.EquipSlots12,
        //         this.EquipSlots13,
        //         this.EquipSlots14,
        //         this.EquipSlots15,
        //         this.EquipSlots16,
        //         this.EquipSlots17,
        //         this.EquipSlots18,
        //         this.EquipSlots19,
        //         this.EquipSlots20,
        //         this.EquipSlots21,
        //         this.EquipSlots22,
        //         this.EquipSlots23,
        //         this.EquipSlots24,
        //         this.EquipSlots25,
        //         this.EquipSlots26,
        //         this.EquipSlots27,
        //         this.EquipSlots28,
        //         this.EquipSlots29,
        //         this.EquipSlots30,
        //         this.EquipSlots31,
        //         this.EquipSlots32,
        //         this.EquipSlots33,
        //         this.EquipSlots34,
        //         this.EquipSlots35,
        //         this.EquipSlots36,
        //         this.EquipSlots37,
        //         this.EquipSlots38,
        //         this.EquipSlots39,
        //         this.EquipSlots40,
        //         this.EquipSlots41,
        //         this.EquipSlots42
        //     ];

        //     if(eslosts[ms.selHero])
        //         eslosts[ms.selHero][slot.part] = null;

        //     // this.ReCalAdd2();
        //     //更新主城上面的形象
        //     // if(slot.part == 0) msMoudle.char.changePart(msMoudle.partType.tWeapon, "N");
        //     ms.saveServer();
        // }

        //出售装备
        sellEquip(slot:model.Equip, force:boolean = false) : void {
            if(!slot.suo || force) {
                //分解出来神秘卷轴

                //返还幻兽卷轴

                //清除之前背包的
                for(let i:number = 0; i < this.BagSlots.length; i++) {
                    if(this.BagSlots[i].openid == slot.openid) {
                        //suc次数
                        // let suc = this.BagSlots[i].suc;
                        // suc = Math.floor(suc * 0.7) - 10;
                        // if(suc > 0) {
                        //     for(let _:number = 0; _ < suc; _++) msMoudle._(); msMoudle.getItem("2040599");
                        // }
                        if(this.BagSlots[i].succlst) {
                            if(this.BagSlots[i].succlst["2040595"]) {
                                msMoudle._(); msMoudle.getItem("2040595")
                            }
                            else if(this.BagSlots[i].succlst["2040596"]) {
                                msMoudle._(); msMoudle.getItem("2040596")
                            }
                            else if(this.BagSlots[i].succlst["2040597"]) {
                                msMoudle._(); msMoudle.getItem("2040597")
                            }
                            else if(this.BagSlots[i].succlst["2040598"]) {
                                msMoudle._(); msMoudle.getItem("2040598")
                            }
                        }
                        this.BagSlots.splice(i, 1);
                        break;
                    }
                }
                ms.saveServer();
            }
            else {
                msMoudle.toast("该装备已加锁");
            }
        }
        // sellEquip2(slot:model.Equip) : void {
        //     //清除之前背包的
        //     for(let i:number = 0; i < this.BagSlots2.length; i++) {
        //         if(this.BagSlots2[i].openid == slot.openid) {
        //             this.BagSlots2.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // this.ReCalAdd2();
        //     ms.saveServer();
        // }

        sellAll() : void {
            let spItem:Array<string> = [];
            let tArr:Array<number> = [];
            for(let i:number = 0; i < this.BagSlots.length; i++)
                tArr[i] = this.BagSlots[i].openid;
            for(let _:number = 0; _ < tArr.length; _++) {
                for(let i:number = 0; i < this.BagSlots.length; i++) {
                    if(!this.BagSlots[i].suo) {
                        if(this.BagSlots[i].type == 1) {
                            msMoudle._(); msMoudle.updateJinBi( (this.BagSlots[i].reqLevel + 1) * 10);
                        }
                        else {
                            msMoudle._(); msMoudle.updateJinBi(100);
                        }
                        if(this.BagSlots[i].succlst) {
                            if(this.BagSlots[i].succlst["2040595"]) spItem[spItem.length] = "2040595";
                            else if(this.BagSlots[i].succlst["2040596"]) spItem[spItem.length] = "2040596";
                            else if(this.BagSlots[i].succlst["2040597"]) spItem[spItem.length] = "2040597";
                            else if(this.BagSlots[i].succlst["2040598"]) spItem[spItem.length] = "2040598";
                        }
                        this.BagSlots.splice(i, 1);
                        break;
                    }
                }
            }
            for(let i:number = 0; i < spItem.length; i++) {
                msMoudle._(); msMoudle.getItem(spItem[i]);
            }
            msMoudle.toast("一键贩卖成功！");
            ms.saveServer();
            if(ui.manager.getDialogByName("app.char.charDlg").dlg)
                ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
        }

        heCheng(rmvItems:any) : void {
            let spItem:Array<string> = [];
            // let lvs:Array<number> = [];
            for(let _:number = 0; _ < rmvItems.length; _++) {
                for(let i:number = 0; i < this.BagSlots.length; i++) {
                    if(this.BagSlots[i].openid == rmvItems[_]) {
                        if(this.BagSlots[i].succlst) {
                            if(this.BagSlots[i].succlst["2040595"]) spItem[spItem.length] = "2040595";
                            else if(this.BagSlots[i].succlst["2040596"]) spItem[spItem.length] = "2040596";
                            else if(this.BagSlots[i].succlst["2040597"]) spItem[spItem.length] = "2040597";
                            else if(this.BagSlots[i].succlst["2040598"]) spItem[spItem.length] = "2040598";
                        }
                        // lvs.push(this.BagSlots[i].reqLevel ? this.BagSlots[i].reqLevel : 1)
                        this.BagSlots.splice(i, 1);
                        break;
                    }
                }
            }
            //幻兽卷轴
            for(let i:number = 0; i < spItem.length; i++) {
                msMoudle._(); msMoudle.getItem(spItem[i]);
            }
            //随机装备
            let len = rmvItems.length / 2;
            for(let i:number = 0; i < len; i++) {
                // let lv = lvs[i * 2 + 1] + lvs[i * 2];
                msMoudle._(); msMoudle.getWeapon(msMoudle.rnkEqp(100, true));
            }
        }

        //销毁装备
        destoryEquip(slot:model.Equip) : void {
            //加入背包
            // this.BagSlots[this.BagSlots.length] = slot;
            //穿上的去除
            this.EquipSlots[slot.part] = null;
            this.ReCalAdd();
            ms.saveServer();
        }
        // destoryEquip2(slot:model.Equip) : void {
        //     let eslosts:Array<any> = [
        //         this.EquipSlots2,
        //         this.EquipSlots3,
        //         this.EquipSlots4,
        //         this.EquipSlots5,
        //         this.EquipSlots6,
        //         this.EquipSlots7,
        //         this.EquipSlots8,
        //         this.EquipSlots9,
        //         this.EquipSlots10,
        //         this.EquipSlots11,
        //         this.EquipSlots12,
        //         this.EquipSlots13,
        //         this.EquipSlots14,
        //         this.EquipSlots15,
        //         this.EquipSlots16,
        //         this.EquipSlots17,
        //         this.EquipSlots18,
        //         this.EquipSlots19,
        //         this.EquipSlots20,
        //         this.EquipSlots21,
        //         this.EquipSlots22,
        //         this.EquipSlots23,
        //         this.EquipSlots24,
        //         this.EquipSlots25,
        //         this.EquipSlots26,
        //         this.EquipSlots27,
        //         this.EquipSlots28,
        //         this.EquipSlots29,
        //         this.EquipSlots30,
        //         this.EquipSlots31,
        //         this.EquipSlots32,
        //         this.EquipSlots33,
        //         this.EquipSlots34,
        //         this.EquipSlots35,
        //         this.EquipSlots36,
        //         this.EquipSlots37,
        //         this.EquipSlots38,
        //         this.EquipSlots39,
        //         this.EquipSlots40,
        //         this.EquipSlots41,
        //         this.EquipSlots42
        //     ];

        //     if(eslosts[ms.selHero])
        //         eslosts[ms.selHero][slot.part] = null;

        //     ms.saveServer();
        // }

        //强化装备
        strEquip() : void {
            this.ReCalAdd();
            ms.saveServer();
        }

        //增加次数
        shenEquip() : void {
            this.ReCalAdd();
            ms.saveServer();
        }

        //重新计算
        ReCalAdd() : void {
            this.ResetAllAdd();
            for(let i:number = 0; i < 13; i++) {
                if(this.EquipSlots[i]) {
                    this.Str.gearAdd += this.EquipSlots[i].Str.GetSum();
                    this.Dex.gearAdd += this.EquipSlots[i].Dex.GetSum();
                    this.Inte.gearAdd += this.EquipSlots[i].Inte.GetSum();
                    this.Luck.gearAdd += this.EquipSlots[i].Luck.GetSum();
                    this.MaxHP.gearAdd += this.EquipSlots[i].MaxHP.GetSum();
                    this.PADamage.gearAdd += this.EquipSlots[i].PADamage.GetSum();
                    this.MADamage.gearAdd += this.EquipSlots[i].MADamage.GetSum();
                    this.PDDamage.gearAdd += this.EquipSlots[i].PDDamage.GetSum();
                    this.MDDamage.gearAdd += this.EquipSlots[i].MDDamage.GetSum();
                }
            }

            ////

            ///羁绊
            let jbdata:any = msMoudle.getJbSucc();
            let jbnum = jbdata.length / 3;
            //羁绊
            for(let _:number = 0; _ < jbnum; _++) {
                // jbdata[_]
                let jobs = jbdata[_ + 1 * jbnum].split("#");
                let N = jobs.length;
                let succ:boolean = true;
                for(let i:number = 0; i < N; i++) {
                    if(msMoudle.findIndexByName(jobs[i]) == false) {
                        succ = false;
                        break;
                    }
                }
                if(succ) {
                    //羁绊生效
                    let addData:any = null;
                    if(_ == 0) {
                        if(ms.selHero == 0) addData =msMoudle.d_lqs;
                        else if(ms.selHero == 1) addData =msMoudle.d_zj;
                        else if(ms.selHero == 2) addData =msMoudle.d_dxk;
                        else if(ms.selHero == 3) addData =msMoudle.d_sss;
                        else if(ms.selHero == 4) addData =msMoudle.d_yx;
                        else if(ms.selHero == 5) addData =msMoudle.d_bl;
                        else if(ms.selHero == 6) addData =msMoudle.d_sqs;
                        else if(ms.selHero == 7) addData =msMoudle.d_hd;
                        else if(ms.selHero == 8) addData =msMoudle.d_js;
                        else if(ms.selHero == 9) addData =msMoudle.d_wyr;
                        else if(ms.selHero == 10) addData =msMoudle.d_cfdz;
                        else if(ms.selHero == 11) addData =msMoudle.d_cz;
                        else if(ms.selHero == 12) addData =msMoudle.d_klzs;
                        else if(ms.selHero == 13) addData =msMoudle.d_ygfs;
                        else if(ms.selHero == 14) addData =msMoudle.d_jb;
                        else if(ms.selHero == 15) addData =msMoudle.d_jh;
                        else if(ms.selHero == 16) addData =msMoudle.d_myls;
                        else if(ms.selHero == 17) addData =msMoudle.d_sjsz;
                        else if(ms.selHero == 18) addData =msMoudle.d_yhyr;
                        else if(ms.selHero == 19) addData =msMoudle.d_hy;
                        else if(ms.selHero == 20) addData =msMoudle.d_szz;
                        else if(ms.selHero == 21) addData =msMoudle.d_blmts;
                        else if(ms.selHero == 22) addData =msMoudle.d_zs;
                        else if(ms.selHero == 23) addData =msMoudle.d_ls;
                        else if(ms.selHero == 24) addData =msMoudle.d_snjl;
                        else if(ms.selHero == 25) addData =msMoudle.d_hy;
                        else if(ms.selHero == 26) addData =msMoudle.d_yy;
                        else if(ms.selHero == 27) addData =msMoudle.d_emls;
                        else if(ms.selHero == 28) addData =msMoudle.d_fcz;
                        else if(ms.selHero == 29) addData =msMoudle.d_hl;
                        else if(ms.selHero == 30) addData =msMoudle.d_bps;
                        else if(ms.selHero == 31) addData =msMoudle.d_gjlr;
                        else if(ms.selHero == 32) addData =msMoudle.d_aysd;
                        else if(ms.selHero == 33) addData =msMoudle.d_mhe;
                        else if(ms.selHero == 34) addData =msMoudle.d_hqs;
                        else if(ms.selHero == 35) addData =msMoudle.d_yss;
                        else if(ms.selHero == 36) addData =msMoudle.d_flsz;
                        else if(ms.selHero == 37) addData =msMoudle.d_yxz;
                        else if(ms.selHero == 38) addData = msMoudle.d_qxz;
                        else if(ms.selHero == 39) addData = msMoudle.d_ctj;
                        else if(ms.selHero == 40) addData = msMoudle.d_bzhw;
                    }
                    else if(_ == 1) {
                        if(ms.selHero == 0) addData =msMoudle.d_lqs2;
                        else if(ms.selHero == 1) addData =msMoudle.d_zj2;
                        else if(ms.selHero == 2) addData =msMoudle.d_dxk2;
                        else if(ms.selHero == 3) addData =msMoudle.d_sss2;
                        else if(ms.selHero == 4) addData =msMoudle.d_yx2;
                        else if(ms.selHero == 5) addData =msMoudle.d_bl2;
                        else if(ms.selHero == 6) addData =msMoudle.d_sqs2;
                        else if(ms.selHero == 7) addData =msMoudle.d_hd2;
                        else if(ms.selHero == 8) addData =msMoudle.d_js2;
                        else if(ms.selHero == 9) addData =msMoudle.d_wyr2;
                        else if(ms.selHero == 10) addData =msMoudle.d_cfdz2;
                        else if(ms.selHero == 11) addData =msMoudle.d_cz2;
                        else if(ms.selHero == 12) addData =msMoudle.d_klzs2;
                        else if(ms.selHero == 13) addData =msMoudle.d_ygfs2;
                        else if(ms.selHero == 14) addData =msMoudle.d_jb2;
                        else if(ms.selHero == 15) addData =msMoudle.d_jh2;
                        else if(ms.selHero == 16) addData =msMoudle.d_myls2;
                        else if(ms.selHero == 17) addData =msMoudle.d_sjsz2;
                        else if(ms.selHero == 18) addData =msMoudle.d_yhyr2;
                        else if(ms.selHero == 19) addData =msMoudle.d_hy2;
                        else if(ms.selHero == 20) addData =msMoudle.d_szz2;
                        else if(ms.selHero == 21) addData =msMoudle.d_blmts2;
                        else if(ms.selHero == 22) addData =msMoudle.d_zs2;
                        else if(ms.selHero == 23) addData =msMoudle.d_ls2;
                        else if(ms.selHero == 24) addData =msMoudle.d_snjl2;
                        else if(ms.selHero == 25) addData =msMoudle.d_hy2;
                        else if(ms.selHero == 26) addData =msMoudle.d_yy2;
                        else if(ms.selHero == 27) addData =msMoudle.d_emls2;
                        else if(ms.selHero == 28) addData =msMoudle.d_fcz2;
                        else if(ms.selHero == 29) addData =msMoudle.d_hl2;
                        else if(ms.selHero == 30) addData =msMoudle.d_bps2;
                        else if(ms.selHero == 31) addData =msMoudle.d_gjlr2;
                        else if(ms.selHero == 32) addData =msMoudle.d_aysd2;
                        else if(ms.selHero == 33) addData =msMoudle.d_mhe2;
                        else if(ms.selHero == 34) addData =msMoudle.d_hqs2;
                        else if(ms.selHero == 35) addData =msMoudle.d_yss2;
                        else if(ms.selHero == 36) addData =msMoudle.d_flsz2;
                        else if(ms.selHero == 37) addData =msMoudle.d_yxz2;
                        else if(ms.selHero == 38) addData = msMoudle.d_qxz2;
                        else if(ms.selHero == 39) addData = msMoudle.d_ctj2;
                        else if(ms.selHero == 40) addData = msMoudle.d_bzhw2;
                    }
                    else if(_ == 2) {
                        if(ms.selHero == 0) addData =msMoudle.d_lqs3;
                        else if(ms.selHero == 1) addData =msMoudle.d_zj3;
                        else if(ms.selHero == 2) addData =msMoudle.d_dxk3;
                        else if(ms.selHero == 3) addData =msMoudle.d_sss3;
                        else if(ms.selHero == 4) addData =msMoudle.d_yx3;
                        else if(ms.selHero == 5) addData =msMoudle.d_bl3;
                        else if(ms.selHero == 6) addData =msMoudle.d_sqs3;
                        else if(ms.selHero == 7) addData =msMoudle.d_hd3;
                        else if(ms.selHero == 8) addData =msMoudle.d_js3;
                        else if(ms.selHero == 9) addData =msMoudle.d_wyr3;
                        else if(ms.selHero == 10) addData =msMoudle.d_cfdz3;
                        else if(ms.selHero == 11) addData =msMoudle.d_cz3;
                        else if(ms.selHero == 12) addData =msMoudle.d_klzs3;
                        else if(ms.selHero == 13) addData =msMoudle.d_ygfs3;
                        else if(ms.selHero == 14) addData =msMoudle.d_jb3;
                        else if(ms.selHero == 15) addData =msMoudle.d_jh3;
                        else if(ms.selHero == 16) addData =msMoudle.d_myls3;
                        else if(ms.selHero == 17) addData =msMoudle.d_sjsz3;
                        else if(ms.selHero == 18) addData =msMoudle.d_yhyr3;
                        else if(ms.selHero == 19) addData =msMoudle.d_hy3;
                        else if(ms.selHero == 20) addData =msMoudle.d_szz3;
                        else if(ms.selHero == 21) addData =msMoudle.d_blmts3;
                        else if(ms.selHero == 22) addData =msMoudle.d_zs3;
                        else if(ms.selHero == 23) addData =msMoudle.d_ls3;
                        else if(ms.selHero == 24) addData =msMoudle.d_snjl3;
                        else if(ms.selHero == 25) addData =msMoudle.d_hy3;
                        else if(ms.selHero == 26) addData =msMoudle.d_yy3;
                        else if(ms.selHero == 27) addData =msMoudle.d_emls3;
                        else if(ms.selHero == 28) addData =msMoudle.d_fcz3;
                        else if(ms.selHero == 29) addData =msMoudle.d_hl3;
                        else if(ms.selHero == 30) addData =msMoudle.d_bps3;
                        else if(ms.selHero == 31) addData =msMoudle.d_gjlr3;
                        else if(ms.selHero == 32) addData =msMoudle.d_aysd3;
                        else if(ms.selHero == 33) addData =msMoudle.d_mhe3;
                        else if(ms.selHero == 34) addData =msMoudle.d_hqs3;
                        else if(ms.selHero == 35) addData =msMoudle.d_yss3;
                        else if(ms.selHero == 36) addData =msMoudle.d_flsz3;
                        else if(ms.selHero == 37) addData =msMoudle.d_yxz3;
                        else if(ms.selHero == 38) addData = msMoudle.d_qxz3;
                        else if(ms.selHero == 39) addData = msMoudle.d_ctj3;
                        else if(ms.selHero == 40) addData = msMoudle.d_bzhw3;
                    }
                    if(addData) {
                        // console.log("羁绊生效" + _, addData);
                        if(addData.str > 0) this.Str.gearAdd += Number(addData.str);
                        if(addData.dex > 0) this.Dex.gearAdd += Number(addData.dex);
                        if(addData.inte > 0) this.Inte.gearAdd += Number(addData.inte);
                        if(addData.luk > 0) this.Luck.gearAdd += Number(addData.luk);
                        // this.MaxHP.gearAdd += this.EquipSlots[i].MaxHP.GetSum();
                        if(addData.pad > 0) this.PADamage.gearAdd += Number(addData.pad);
                        if(addData.mad > 0) this.MADamage.gearAdd += Number(addData.mad);
                        if(addData.pdd > 0) this.PDDamage.gearAdd += Number(addData.pdd);
                        if(addData.mdd > 0) this.MDDamage.gearAdd += Number(addData.mdd);
                    }
                    ///
                }
            }

            // this.Str.gearAdd += 1000;

        }

        // ReCalAdd2() : void {
        //     this.ResetAllAdd();

        // }



        //重置所有  (第一次创建角色初始化一次、其他装备.buf等等才需要用)
        ResetAll() : void {
            this.Str.ResetAll();
            this.Dex.ResetAll();
            this.Inte.ResetAll();
            this.Luck.ResetAll();
            this.MaxHP.ResetAll();
            this.MaxMP.ResetAll();
            this.PADamage.ResetAll();
            this.MADamage.ResetAll();
            this.PDDamage.ResetAll();
            this.MDDamage.ResetAll();
            this.Accurate.ResetAll();
            this.Evasion.ResetAll();
            this.CriticalRate.ResetAll();
            this.CriticalDamageMax.ResetAll();
            this.CriticalDamageMin.ResetAll();
            this.Mastery.ResetAll();
            this.DamageRate.ResetAll();
            this.BossDamageRate.ResetAll();
            this.AttackSpeed.ResetAll();
            this.WalkSpeed.ResetAll();
        }

        //移除所有附加的属性
        ResetAllAdd() : void {
            this.Str.ResetAdd();
            this.Dex.ResetAdd();
            this.Inte.ResetAdd();
            this.Luck.ResetAdd();
            this.MaxHP.ResetAdd();
            this.MaxMP.ResetAdd();
            this.PADamage.ResetAdd();
            this.MADamage.ResetAdd();
            this.PDDamage.ResetAdd();
            this.MDDamage.ResetAdd();
            this.Accurate.ResetAdd();
            this.Evasion.ResetAdd();
            this.CriticalRate.ResetAdd();
            this.CriticalDamageMax.ResetAdd();
            this.CriticalDamageMin.ResetAdd();
            this.Mastery.ResetAdd();
            this.DamageRate.ResetAdd();
            this.BossDamageRate.ResetAdd();
            this.AttackSpeed.ResetAdd();
            this.WalkSpeed.ResetAdd();
        }

        //角色升级
        LeaveUp(addLv:number) : void {
            // if(this.Lv >= 200) return ;
            if(addLv <= 0) return ;

            for(let i:number = 0; i < addLv; i++) {
                ////这里还要有问题
                // if (this.Job == 0) {
                    this.MaxHP.baseVal += msMoudle.getRandValue(12, 0, 5);
                    this.MaxMP.baseVal += msMoudle.getRandValue(10, 0, 3);
                // } else if ((this.Job >= 100) && (this.Job <= 132)) {
                //     this.MaxHP.baseVal += msMoudle.getRandValue(48, 0, 5);
                //     this.MaxMP.baseVal += msMoudle.getRandValue(4, 0, 3);
                // } else if ((this.Job >= 200) && (this.Job <= 232))  {
                //     this.MaxHP.baseVal += msMoudle.getRandValue(10, 0, 5);
                //     this.MaxMP.baseVal += msMoudle.getRandValue(48, 0, 4);
                // }else if (((this.Job >= 300) && (this.Job <= 322)) || ((this.Job >= 400) && (this.Job <= 434)))  {
                //     this.MaxHP.baseVal += msMoudle.getRandValue(20, 0, 5);
                //     this.MaxMP.baseVal += msMoudle.getRandValue(14, 0, 3);
                // } else {
                //     this.MaxHP.baseVal += msMoudle.getRandValue(24, 0, 15);
                //     this.MaxMP.baseVal += msMoudle.getRandValue(12, 0, 13);
                // }
                this.MaxMP.baseVal += this.Inte.GetSum() / 10;
                this.MaxHP.baseVal = Math.min(this.MaxHP.totalMax, Math.abs(this.MaxHP.baseVal));
                this.MaxMP.baseVal = Math.min(this.MaxMP.totalMax, Math.abs(this.MaxMP.baseVal));

                ///血量恢复满状态

                ////升级属性调整
                if(this.ZS == 0) {
                    this.Str.baseVal += 1;
                    this.Dex.baseVal += 1;
                    this.Inte.baseVal += 1;
                    this.Luck.baseVal += 1;
                }
                for(let _:number = 0; _ < 5; _++) {
                    let rnk = msMoudle.getRandValue(0, 0, 4);
                    if(rnk == 0) this.Str.baseVal += 1;
                    else if(rnk == 1) this.Dex.baseVal += 1;
                    else if(rnk == 2) this.Inte.baseVal += 1;
                    else this.Luck.baseVal += 1;
                }
            }
            msMoudle.getLiBaoMsg();
            //立即更新攻击力
            if(msMoudle.char) {
                this.ReCalAdd();
                msMoudle.char.updHeroDataFast();
                //满血
                msMoudle.char.m_hp = msMoudle.char.m_maxhp;
                msMoudle.hp = msMoudle.char.m_hp;
                msMoudle.maxhp = msMoudle.char.m_maxhp;
                msMoudle.updateHP();
            }
            // ms.saveServer();
        }

        //范围伤害计算
        CalcAttackRange() : Object {

            this.ReCalAdd();

            let max:number, min:number;
            //穿了装备
            if(this.EquipSlots[0]) {
                let WeaponType = msMoudle.getWeaponType(this.EquipSlots[0].id);
                max = this.CalcAttackMax(this.Str.GetSum(),this.Dex.GetSum(),
                    this.Inte.GetSum(),this.Luck.GetSum(),
                    this.PADamage.GetSum(),this.MADamage.GetSum(),
                    WeaponType);
            }
            else {
                let WeaponType = msMoudle.getWeaponType("01302000");
                max = this.CalcAttackMax(this.Str.GetSum(),this.Dex.GetSum(),
                    this.Inte.GetSum(),this.Luck.GetSum(),
                    17,this.MADamage.GetSum(),
                    WeaponType);
            }
            min = max * this.Mastery.GetSum() / 100;
            return {minatk:Math.round(min), maxatk:Math.round(max)};
        }

        CalcAttackMax(str:number, dex:number, inte:number, luk:number, pad:number, mad:number,
            WeaponType:string) : number {
                // console.log(str + "  " + dex + "  " + inte + "  " + luk + "  " + pad + "  " + mad)

                ////限制伤害
                // let padmax = pad;
                // let madmax = mad;
                let addpad = 0;
                // if(padmax >= 1000) {
                //     padmax = 1000;
                //     if(padmax - 1000 > addpad)
                //         addpad = padmax - 1000;
                // }
                // if(madmax >= 1000) {
                //     madmax = 1000;
                //     if(madmax - 1000 > addpad)
                //         addpad = madmax - 1000;
                // }

                // switch (WeaponType)
                // {
                //     case GearType.ohSword:
                //     case GearType.ohAxe:
                //     case GearType.ohBlunt:
                if( (WeaponType == "单手剑" || WeaponType == "单手斧" || WeaponType == "单手钝器") && ms.selHero == 6 || ms.selHero == 27 || ms.selHero == 28 || ms.selHero == 33 || ms.selHero == 34)
                    return (str * 4 + dex) * 1.2 * pad * 0.01 + addpad;
                //     case GearType.dagger:
                else if( (WeaponType == "能量剑" || WeaponType == "短刀" || WeaponType == "刀") && ms.selHero == 2 || ms.selHero == 14 || ms.selHero == 32)
                    return (str + dex + luk * 4) * 1.3 * pad * 0.01 + addpad;
                //     case GearType.cane:
                //         return (dex + luk * 4) * 1.3 * pad * 0.01;
                //     case GearType.wand:
                //     case GearType.staff:
                else if( (WeaponType == "短杖" || WeaponType == "长杖" || WeaponType == "手杖" || WeaponType == "魔力手套") && (ms.selHero == 1 || ms.selHero == 5 || ms.selHero == 7 || ms.selHero == 13 || ms.selHero == 17 || ms.selHero == 23 || ms.selHero == 25 || ms.selHero == 29 || ms.selHero == 35) )
                        return (inte * 4 + luk) * 1.0 * mad * 0.01 + addpad;
                //     case GearType.thSword:
                //     case GearType.thAxe:
                //     case GearType.thBlunt:
                else if( (WeaponType == "双手剑" || WeaponType == "双手斧" || WeaponType == "双手钝器") && (ms.selHero == 4 || ms.selHero == 12) )
                    return (str * 4 + dex) * 1.32 * pad * 0.01 + addpad;
                //     case GearType.spear:
                //     case GearType.polearm:
                else if( (WeaponType == "枪" || WeaponType == "矛" || WeaponType == "大剑" || WeaponType == "太刀" || WeaponType == "灵魂手统" || WeaponType == "拳炮") && (ms.selHero == 0 || ms.selHero == 15 || ms.selHero == 21 || ms.selHero == 22 || ms.selHero == 30) )
                    return (str * 4 + dex) * 1.49 * pad * 0.01 + addpad;
                else if( (WeaponType == "弓" || WeaponType == "远古弓") && (ms.selHero == 3 || ms.selHero == 31 || ms.selHero == 36))
                    return (dex * 4 + str) * 1.2 * pad * 0.01 + addpad;
                else if( (WeaponType == "弩" || WeaponType == "双弩") && (ms.selHero == 8 || ms.selHero == 24) )
                    return (dex * 4 + str) * 1.35 * pad * 0.01 + addpad;
                // case GearType.throwingGlove:
                else if( (WeaponType == "拳套" || WeaponType == "锁链" || WeaponType == "扇") && (ms.selHero == 9 || ms.selHero == 16 || ms.selHero == 19 || ms.selHero == 37) )
                    return (dex + luk * 4) * 1.75 * pad * 0.01 + addpad;
                // // case GearType.knuckle:
                else if(WeaponType == "拳甲" && (ms.selHero == 10 || ms.selHero == 18 || ms.selHero == 26) )
                    return (str * 4 + dex) * 1.7 * pad * 0.01 + addpad;
                // // case GearType.gun:
                else if(WeaponType == "短枪" && (ms.selHero == 11 || ms.selHero == 38) )
                    return (dex * 4 + str) * 1.5 * pad * 0.01 + addpad;
                // // case GearType.dualBow:
                // //     return (dex * 4 + str) * 1.3 * pad * 0.01;
                // // case GearType.handCannon:
                // //     return (str * 4 + dex) * 1.5 * pad * 0.01;
                //赤手空拳
                // case GearType.barehand:
                else {
                    // return str * 1 * pad * 0.01 + addpad;
                    // if(ms.selHero >= 39)
                        // return (str + dex + luk + inte) * 1.5 * pad * 0.01 + addpad;
                    // else
                    return (str + dex + luk + inte) * 1 * pad * 0.01 + addpad;
                }
                    // return pad;
                    // return (str * 4 + dex) * 1.43 * 1 * 0.01;
            // }

        }

        fillConfig() {

        }
    }
}