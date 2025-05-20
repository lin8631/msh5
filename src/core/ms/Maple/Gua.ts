module Gua {

    //最好第一次上线再校验一次充值

    /*
        钻石来源
        100.GM发放 101.充值  102.系统任务 103.认证
        钻石消耗
        201.商店消耗 202.职业 203.扭蛋

        装备强化
        1.总强化次数----该装备
        2.成功卷轴列表
        3.失败次数
    */

    //10001 非法获取阿丽莎
    //10002 非法获取999
    //10003 非法获取真01402180
    //10004 199非法
    //10005 充值不足
    //10006 0元党限制
    //10007 宠物异常
    //10008 职业数量异常
    //10009 充值数据异常
    //10010 钻石异常
    //10011 枫叶异常
    //10012 金币异常
    //10013 神秘卷轴异常(扭蛋次数)
    //10014 装备数据异常
    //10015 角色属性异常
    //10016 坐骑异常
    //10017 椅子异常
    //10018 戒子异常
    //10019 神秘异常
    //10020 英雄异常
    //10021 积分异常
    //10022 材料异常
    //10023 point非法

    export function checkData() : number {
        //检查自己身上穿的装备的属性
        for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
            let cur_eqp:app.model.Equip = ms.herodata.EquipSlots[i];
            if(cur_eqp) {
                let itemId = cur_eqp.id;
                //获取初始数据
                let eqp:any = msMoudle.getEqpMsg(itemId);
                //砸卷数据
                //总砸卷次数
                let azj = cur_eqp.succM[0];
                //总砸卷成功次数
                let asucc = cur_eqp.succM[0] - cur_eqp.succM[1];
                //总砸卷失败次数
                let afail = cur_eqp.succM[1];
                //初始可用次数
                let tuc = eqp.tuc;
                //判断成功次数是否正确
                let succ = 0;
                let show = 0;
                let shenmi = 0;
                let zhuque = 0;
                for(let key in cur_eqp.succlst) {
                    succ += cur_eqp.succlst[key];
                    if(key != "2040599" && key != "2040598") show += cur_eqp.succlst[key];
                    else {
                        if(key == "2040599") {
                            shenmi += cur_eqp.succlst[key];
                        }
                        else if(key == "2040598") {
                            zhuque = cur_eqp.succlst[key];  //不可能有人买多个
                        }
                    }
                }
                //砸卷次数校验失败
                if(succ != azj) return 1;
                //显示次数错误
                if(cur_eqp.suc != show) {
                    // console.log("xxxx", cur_eqp.suc, show)
                    return 2;
                }
                //剩余次数错误
                if(cur_eqp.tuc != (shenmi + eqp.tuc - show - afail - zhuque)) {
                    // console.log(cur_eqp.tuc, (shenmi + eqp.tuc - show - afail - zhuque))
                    return 3;
                }
                //属性验证
                let item:any = new Object();
                item.incMHP = 0;
                item.incMMP = 0;
                item.incSTR = 0;
                item.incDEX = 0;
                item.incINT = 0;
                item.incLUK = 0;
                item.incPAD = 0;
                item.incPDD = 0;
                item.incMAD = 0;
                item.incMDD = 0;

                for(let key in cur_eqp.succlst) {
                    if(key != "2040599" && key != "2040598") {
                        let msg:any = Gua.getItemMsg(Number(key));
                        let num = cur_eqp.succlst[key];
                        if(msg.incMHP > 0) item.incMHP += msg.incMHP * num;
                        if(msg.incMMP > 0) item.incMMP += msg.incMMP * num;
                        if(msg.incSTR > 0) item.incSTR += msg.incSTR * num;
                        if(msg.incDEX > 0) item.incDEX += msg.incDEX * num;
                        if(msg.incINT > 0) item.incINT += msg.incINT * num;
                        if(msg.incLUK > 0) item.incLUK += msg.incLUK * num;
                        if(msg.incPAD > 0) item.incPAD += msg.incPAD * num;
                        if(msg.incPDD > 0) item.incPDD += msg.incPDD * num;
                        if(msg.incMAD > 0) item.incMAD += msg.incMAD * num;
                        if(msg.incMDD > 0) item.incMDD += msg.incMDD * num;
                    }
                }

                //HP
                if(eqp.incMHP + item.incMHP != cur_eqp.MaxHP.GetSum()) {
                    // console.log("11111")
                    return 4;
                }
                //MP
                if(eqp.incMMP + item.incMMP != cur_eqp.MaxMP.GetSum()) {
                    // console.log("222")
                    return 5;
                }
                //力量
                if(eqp.incSTR + item.incSTR != cur_eqp.Str.GetSum()) {
                    // console.log("3")
                    return 6;
                }
                //敏捷
                if(eqp.incDEX + item.incDEX != cur_eqp.Dex.GetSum()) {
                    // console.log("4")
                    return 7;
                }
                //智力
                if(eqp.incINT + item.incINT != cur_eqp.Inte.GetSum()) {
                    // console.log("5")
                    return 8;
                }
                //运气
                if(eqp.incLUK + item.incLUK != cur_eqp.Luck.GetSum()) {
                    // console.log("6")
                    return 9;
                }
                //物理攻击力
                if(eqp.incPAD + item.incPAD != cur_eqp.PADamage.GetSum()) {
                    // console.log("7")
                    return 10;
                }
                //物理防御力
                if(eqp.incPDD + item.incPDD != cur_eqp.PDDamage.GetSum()) {
                    // console.log("8")
                    return 11;
                }
                //物理魔法力
                if(eqp.incMAD + item.incMAD != cur_eqp.MADamage.GetSum()) {
                    // console.log("9")
                    return 12;
                }
                //物理防御力
                if(eqp.incMDD + item.incMDD != cur_eqp.MDDamage.GetSum()) {
                    // console.log("10")
                    return 13;
                }

                // console.log(eqp, cur_eqp);
            }
        }
        return 0;
    }

    export function getItemMsg(itemId:number) : any {
        let mulu:any = Math.floor(Number(itemId) / 10000);
        let data:any = msMoudle.wz["0" + mulu + ".img"]["0" + Number(itemId)];
        let rw:any = new Object();
        rw.incMHP = data["0" + itemId + ".info.incMHP"]?Number(data["0" + itemId + ".info.incMHP"]):0;     //HP总值
        rw.incMMP = data["0" + itemId + ".info.incMMP"]?Number(data["0" + itemId + ".info.incMMP"]):0;     //MP总值
        rw.incPAD = data["0" + itemId + ".info.incPAD"]?Number(data["0" + itemId + ".info.incPAD"]):0;     //攻击力
        rw.incMAD = data["0" + itemId + ".info.incMAD"]?Number(data["0" + itemId + ".info.incMAD"]):0;     //魔法力
        rw.incPDD = data["0" + itemId + ".info.incPDD"]?Number(data["0" + itemId + ".info.incPDD"]):0;     //物理防御力
        rw.incMDD = data["0" + itemId + ".info.incMDD"]?Number(data["0" + itemId + ".info.incMDD"]):0;     //魔法防御力
        rw.incACC = data["0" + itemId + ".info.incACC"]?Number(data["0" + itemId + ".info.incACC"]):0;     //命中率
        rw.incEVA = data["0" + itemId + ".info.incEVA"]?Number(data["0" + itemId + ".info.incEVA"]):0;     //回避率
        rw.incSPEED = data["0" + itemId + ".info.incSPEED"]?Number(data["0" + itemId + ".info.incSPEED"]):0;     //移动速度
        rw.incJUMP = data["0" + itemId + ".info.incJUMP"]?Number(data["0" + itemId + ".info.incJUMP"]):0;     //跳跃力
        rw.incSTR = data["0" + itemId + ".info.incSTR"]?Number(data["0" + itemId + ".info.incSTR"]):0;     //力量
        rw.incDEX = data["0" + itemId + ".info.incDEX"]?Number(data["0" + itemId + ".info.incDEX"]):0;     //敏捷
        rw.incINT = data["0" + itemId + ".info.incINT"]?Number(data["0" + itemId + ".info.incINT"]):0;     //智力
        rw.incLUK = data["0" + itemId + ".info.incLUK"]?Number(data["0" + itemId + ".info.incLUK"]):0;     //运气
        rw.incSHEN = data["0" + itemId + ".info.incSHEN"]?Number(data["0" + itemId + ".info.incSHEN"]):0;   //新增
        return rw;
    }

    // this.m_eqp.MaxHP.gearAdd += gitem.incMHP;//HP总值
    // this.m_eqp.MaxMP.gearAdd += gitem.incMMP;//MP总值
    // this.m_eqp.PADamage.gearAdd += gitem.incPAD;//攻击力
    // this.m_eqp.MADamage.gearAdd += gitem.incMAD;//魔法力
    // this.m_eqp.PDDamage.gearAdd += gitem.incPDD;//物理防御力
    // this.m_eqp.MDDamage.gearAdd += gitem.incMDD;//魔法防御力
    // this.m_eqp.Accurate.gearAdd += gitem.incACC;//命中率
    // this.m_eqp.Evasion.gearAdd += gitem.incEVA;//回避率
    // // this.m_eqp.WalkSpeed.gearAdd += gitem.incSPEED;//移动速度
    // // this.m_eqp.incJUMP += gitem.incJUMP;//跳跃力
    // this.m_eqp.Str.gearAdd += gitem.incSTR;//力量
    // this.m_eqp.Dex.gearAdd += gitem.incDEX;//敏捷
    // this.m_eqp.Inte.gearAdd += gitem.incINT;//智力
    // this.m_eqp.Luck.gearAdd += gitem.incLUK;//运气

    //每500块钱可以出一个
    export function test() : number {
        // return 0;
        //背包装备验证
        if(true) {
            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                if(ms.herodata.BagSlots[i]) {
                //500充值之前不允许获得的装备
                    if(ms.test_cz < 500 && ms.jyxh[1] == 0) {
                        //阿丽莎
                        if(ms.herodata.BagSlots[i].id == "01382235") return 10001;
                        //999
                        else if(ms.herodata.BagSlots[i].id == "01005140") return 10002;
                        //真01402180
                        else if(ms.herodata.BagSlots[i].id == "01402180") return 10003;
                    }

                    // //防止500以上
                    // if(ms.shops[0] < 100) {
                    //     //阿丽莎
                    //     if(ms.herodata.BagSlots[i].id == "01382235") return 10001;
                    //     //999
                    //     else if(ms.herodata.BagSlots[i].id == "01005140") return 10002;
                    //     //真01402180
                    //     else if(ms.herodata.BagSlots[i].id == "01402180") return 10003;
                    // }

                    //高级认证199
                    // if(ms.test_cz < 100 || ms.m_tg != 3) {
                    //     if(ms.herodata.BagSlots[i].id == "01002140") return 10004;
                    // }
                }
            }
        }
        //装备验证
        if(true) {
            for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                if(ms.herodata.EquipSlots[i]) {
                    //500充值之前不允许获得的装备
                    if(ms.test_cz < 500 && ms.jyxh[1] == 0) {
                        //阿丽莎
                        if(ms.herodata.EquipSlots[i].id == "01382235") return 10001;
                        //999
                        else if(ms.herodata.EquipSlots[i].id == "01005140") return 10002;
                        //真01402180
                        else if(ms.herodata.EquipSlots[i].id == "01402180") return 10003;
                    }

                    // //防止500以上
                    // if(Gua.checkTime("2021.1.21")) {
                    //     if(ms.shops[0] < 100) {
                    //         //阿丽莎
                    //         if(ms.herodata.EquipSlots[i].id == "01382235") return 10001;
                    //         //999
                    //         else if(ms.herodata.EquipSlots[i].id == "01005140") return 10002;
                    //         //真01402180
                    //         else if(ms.herodata.EquipSlots[i].id == "01402180") return 10003;
                    //     }
                    // }

                    //高级认证199
                    // if(ms.test_cz < 100 || ms.m_tg != 3) {
                    //     if(ms.herodata.EquipSlots[i].id == "01002140") return 10004;
                    // }
                }
            }
            //高级认证199
            if(ms.test_cz < 100 && ms.m_tg == 3) return 10004;
        }

        //交易点券
        if(ms.jyly[0] + ms.jyly[1] + ms.jyxh[0] + ms.jyxh[1] != ms.martPoint())
            return 10023;

        //自身属性验证
        if(true) {
            //总属性
            let asx = ms.herodata.Str.baseVal + ms.herodata.Dex.baseVal + ms.herodata.Inte.baseVal + ms.herodata.Luck.baseVal;

            let lv = ms.herodata.Lv;        //当前等级
            let zs = ms.herodata.ZS;        //当前转生次数

            //属性重算
            let recal = 44;//44是创建的属性
            if(ms.herodata.ZS == 0) {
                let addlv = lv - 1;
                recal += addlv * 4 + addlv * 5;
            }
            else {
                let addzs = zs - 1; //满转生次数

                recal += 199 * 4 + 199 * 5;     //一转满属性
                if(addzs > 0) recal += addzs * 199 * 5; //满转属性
                let addlv = lv - 1;
                recal += addlv * 5;     //当前级数
            }

            //多5点是因为洗点的bug导致的
            if( Math.abs(recal - asx) > 5 + ms.herodata.ZS) {
                // console.log("????", recal, asx, 5 + ms.herodata.ZS)
                return 10015;//1349 1358 5
                //16845 16880 21 80-45=35 7
            }
            else {
                //非法数据
                var Evasion = ms.herodata.Evasion.baseVal;
                var CriticalRate = ms.herodata.CriticalRate.baseVal;
                var CriticalDamageMax = ms.herodata.CriticalDamageMax.baseVal;
                var CriticalDamageMin = ms.herodata.CriticalDamageMin.baseVal;
                var DamageRate = ms.herodata.DamageRate.baseVal;
                var BossDamageRate = ms.herodata.BossDamageRate.baseVal;
                var AttackSpeed = ms.herodata.AttackSpeed.baseVal;
                var WalkSpeed = ms.herodata.WalkSpeed.baseVal;
                var PADamage = ms.herodata.PADamage.baseVal;
                var MADamage = ms.herodata.MADamage.baseVal;
                // var MaxHP = ms.herodata.MaxHP.baseVal;
                // var MaxMP = ms.herodata.MaxMP.baseVal;

                //还有攻击和血量没有检查
                if(Evasion || CriticalRate || CriticalDamageMax || CriticalDamageMin || DamageRate || BossDamageRate || AttackSpeed || WalkSpeed || PADamage || MADamage) {// || MaxHP || MaxMP
                    // console.log("???", Evasion,CriticalRate,CriticalDamageMax,CriticalDamageMin,DamageRate,BossDamageRate,AttackSpeed,WalkSpeed,PADamage,MADamage)
                    return 10015;
                }
            }
            // else {
            //     // console.log("2222", recal, asx);//557 566 = 9
            //     return 10015;
            // }

            // 0,17,0,10,10,10,10],"ZS":2,"LH":9,"Lv":166,"Exp":2234070,"Name":"S丶幽冥","Sex":0,"Skill_1":"N","Skill_2":"N","Skill_3":"N","Skill_4":"N","Str":{"baseVal":914,"gearAdd":487},"Dex":{"baseVal":936,"gearAdd":481},"Inte":{"baseVal":928,"gearAdd":469},"Luck":{"baseVal":877,"gearAdd":468},"MaxHP":{"baseVal":8124},"MaxMP":{"baseVal":58014.7},"PADamage":{"gearAdd":406},"MADamage":{"gearAdd":538},"PDDamage":{"gearAdd":496},"MDDamage":{"gearAdd":109},"Accurate":{"baseVal":100},"Mastery":{"baseVal":75},"EquipSlots":

            // "MaxHP":{"baseVal":999999},"MaxMP":{"baseVal":999999},
            //"PADamage":{"baseVal":123456789,"gearAdd":100},"MADamage":{"baseVal":123456789},"PDDamage":{"baseVal":9800,"gearAdd":277},"MDDamage":{"baseVal":9800,"gearAdd":143},"Accurate":{"baseVal":200},
            //"Mastery":{"baseVal":123456789},

            //"Evasion":{"baseVal":200},"CriticalRate":{"baseVal":123456789},"CriticalDamageMax":{"baseVal":123456789},"CriticalDamageMin":{"baseVal":123456789},
            // "DamageRate":{"baseVal":123456789},"BossDamageRate":{"baseVal":123456789},"AttackSpeed":{"baseVal":123456789},"WalkSpeed":{"baseVal":123456789},"EquipSlots":
        }

        //数据检查
        if(Gua.checkTime("2020.11.1")) {
            // console.log("test");
            let ch = Gua.checkData();
            if(ch != 0) {
                console.log("error ", ch);
                return 10014;
            }
        }

        if(ms.jc_cal[0] != ms.jc_cal[1]) {
            return 10088;   //函数调用异常
        }
        // if(Gua.checkTime("2021.1.7")) {
        //     Laya.timer.scale = 0;
        // }

        //神卡检测
        // if(Gua.checkTime("2020.11.8")) {
        //     if(ms.test_sk * 15 > ms.shops[1]) return 10020;
        // }
        ///钻石相关的
        if(true) {      //钻石

            let all_ly = 0;//总来源
            for(let i:number = 0; i < ms.zsly.length; i++) {
                if(ms.zsly[i]) all_ly += ms.zsly[i];
            }
            let all_xh = 0;//总消耗
            for(let i:number = 0; i < ms.zsxh.length; i++) {
                if(ms.zsxh[i]) all_xh += ms.zsxh[i];
            }

            //宠物，职业，戒指，椅子，扭蛋次数，职业数量
            //实际钻石消耗
            if(true) {//ms.test_cz < 100
                //神秘卷轴数量
                let asm = 0;
                for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                    if(ms.herodata.BagSlots[i]) {
                        if(ms.herodata.BagSlots[i].id == "2040599") {
                            asm += ms.herodata.BagSlots[i].num;
                        }
                        if(ms.herodata.BagSlots[i].succlst) {
                            for(let key in ms.herodata.BagSlots[i].succlst) {
                                if(key == "2040599") {
                                    asm += ms.herodata.BagSlots[i].succlst[key];
                                }
                            }
                        }
                    }
                }
                for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                    if(ms.herodata.EquipSlots[i]) {
                        if(ms.herodata.EquipSlots[i].succlst) {
                            for(let key in ms.herodata.EquipSlots[i].succlst) {
                                if(key == "2040599") {
                                    asm += ms.herodata.EquipSlots[i].succlst[key];
                                }
                            }
                        }
                    }
                }
                if(asm > 30 + ms.shops[0]) {
                    console.log("asm", asm, ms.shops[0]);
                    return 10013;
                }

                let rezs = 0;
                //扭蛋消耗
                rezs += 25 * ms.shops[0];
                //其他道具消耗
                for(let i:number = 2; i < ms.shops.length; i++) {
                    if(msMoudle.shopjson[i - 2] && ms.shops[i] > 0) {
                        if(msMoudle.shopjson[i - 2].pricetype == 3) {
                            rezs += msMoudle.shopjson[i - 2].price * ms.shops[i];
                        }
                    }
                }
                //职业消耗
                let free = 0;   //已经使用的免费次数
                if(ms.zy100 == 1) free++;
                if(ms.zy160 == 1) free++;
                if(ms.zy200 == 1) free++;
                //黑金职业数量
                let jobNum = 0;
                for(let i:number = 0; i < ms.m_job.length; i++) if(ms.m_job[i] != "" && i < 39) jobNum++;
                //等级的也不让改
                if(ms.test_cz == 0) {
                    if(ms.herodata.ZS == 0) {
                        if(ms.herodata.Lv < 100 && jobNum > 1) return 10008;
                        else if(ms.herodata.Lv < 160 && jobNum > 2) return 10008;
                        else if(ms.herodata.Lv < 200 && jobNum > 3) return 10008;
                    }
                }
                if(jobNum - 4 > 0) {
                    rezs += 500 * (jobNum - 4);
                    // console.log("职业", 500 * (jobNum - 4) )
                }

                //宠物消耗
                for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                    if(ms.petbagsdata[i]) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.petbagsdata[i].id) {
                                if(msMoudle.payjson[key].pricetype == 3) {
                                    rezs += msMoudle.payjson[key].price;
                                    // console.log("pet", msMoudle.payjson[key].price)
                                    break;
                                }
                            }
                        }
                    }
                }
                //坐骑消耗
                for(let i:number = 0; i < ms.tamingmobbagsdata.length; i++) {
                    if(ms.tamingmobbagsdata[i]) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.tamingmobbagsdata[i].id) {
                                if(msMoudle.payjson[key].pricetype == 3) {
                                    rezs += msMoudle.payjson[key].price;
                                    // console.log("tamingmob", msMoudle.payjson[key].price)
                                    break;
                                }
                            }
                        }
                    }
                }
                //戒指消耗
                for(let i:number = 0; i < ms.ringbagsdata.length; i++) {
                    if(ms.ringbagsdata[i]) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.ringbagsdata[i].id) {
                                if(msMoudle.payjson[key].pricetype == 3) {
                                    rezs += msMoudle.payjson[key].price;
                                    // console.log("ring", msMoudle.payjson[key].price)
                                    break;
                                }
                            }
                        }
                    }
                }
                //椅子消耗
                for(let i:number = 0; i < ms.chairbagsdata.length; i++) {
                    if(ms.chairbagsdata[i]) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.chairbagsdata[i].id) {
                                if(msMoudle.payjson[key].pricetype == 3) {
                                    rezs += msMoudle.payjson[key].price;
                                    // console.log("chair", msMoudle.payjson[key].price)
                                    break;
                                }
                            }
                        }
                    }
                }

                if(rezs > Math.abs(all_xh)) {
                    console.log("rezs", rezs, all_xh)
                    return 10010;
                }

                if(all_ly + all_xh != ms.zuanshi()) {
                    console.log("ly_xh", all_ly, all_xh, all_ly + all_xh, ms.zuanshi())
                    return 10010;
                }
            }
        }

        //积分
        if(true) {
            let ajf = 0;
            if(ms.tiaogk > 9) ms.tiaogk = 9;
            //跳跳关卡获取
            for(let i:number = 0; i < ms.tiaogk; i++) ajf += (i + 1) * 250;
            //女神获取
            ajf += ms.test_nvshen;
            //死神获取
            ajf += ms.test_sishen * 2;

            //积分职业数量
            let jobNum = 0;
            let njf = 0;
            for(let i:number = 39; i < ms.m_job.length; i++) if(ms.m_job[i] != "") jobNum++;
            njf += jobNum * 5000;
            //轮回
            for(let i:number = 5; i < ms.herodata.LH; i++) njf += 50 * (i - 5 + 1);

            if(njf > ajf) {
                console.log("njf", njf);
                return 10021;
            }
        }

        //枫叶
        if(true) {
            //转生检测
            let azs:number = 0;
            for(let i:number = 0; i < ms.herodata.ZS; i++) azs += 10000 + 5000 *  i;
            //商店检测
            for(let i:number = 2; i < ms.shops.length; i++) {
                if(msMoudle.shopjson[i - 2] && ms.shops[i] > 0) {
                    if(msMoudle.shopjson[i - 2].pricetype == 2) {
                        azs += msMoudle.shopjson[i - 2].price * ms.shops[i];
                    }
                }
            }
            if(ms.ryxh[0] == 0) ms.ryxh[0] = -azs;
            if(ms.ryly[0] == 0) ms.ryly[0] = ms.rongyu() + Math.abs(ms.ryxh[0]);
            if(!ms.ryly[1]) ms.ryly[1] = 0;
            if(ms.ryly[0] + ms.ryxh[0] + ms.ryly[1] != ms.rongyu()) return 10011;
            if(Math.abs(ms.ryxh[0]) < azs) {
                console.log("ary", azs);
                return 10011;
            }
        }

        //金币
        if(true) {
            let ajb:number = 0;
            //商店检测
            for(let i:number = 2; i < ms.shops.length; i++) {
                if(msMoudle.shopjson[i - 2] && ms.shops[i] > 0) {
                    if(msMoudle.shopjson[i - 2].pricetype == 1) {
                        ajb += msMoudle.shopjson[i - 2].price * ms.shops[i];
                    }
                }
            }
            if(ms.jbxh[0] == 0) ms.jbxh[0] = -ajb;
            if(ms.jbly[0] == 0) ms.jbly[0] = ms.jinbi() + Math.abs(ms.jbxh[0]);
            if(!ms.jbly[1]) ms.jbly[1] = 0;
            if(ms.jbly[0] + ms.jbxh[0] + ms.jbly[1] != ms.jinbi()) return 10012;
            if(Math.abs(ms.jbxh[0]) < ajb) {
                console.log("ajb", ajb);
                return 10012;
            }
        }

        //材料
        if(true) {
            //修炼检测
            let axl:number = 0;
            for(let i:number = 0; i < ms.herodata.XL.length;i++) {
                let n = ms.herodata.XL[i];
                if(n > 0) axl += (n * n / 2) * 25;
            }

            if(ms.clxh[0] == 0) ms.clxh[0] = -axl;
            if(ms.clly[0] == 0) ms.clly[0] = ms.cailiao1() + ms.cailiao2() + ms.juexing1() + Math.abs(ms.clxh[0]);
            if(ms.clly[0] + ms.clxh[0] != ms.cailiao1() + ms.cailiao2() + ms.juexing1()) {
                return 10022;
            }
            if(Math.abs(ms.clxh[0]) < axl) {
                console.log("axl", axl);
                return 10022;
            }
        }

        //函数调用(经验应该是通过这里修改的)
        let _ = 0;
        for(let i:number = 0; i < ms.czly.length; i++) {
            if(ms.czly[i] == 5 || ms.czly[i] == 10 || ms.czly[i] == 30 || ms.czly[i] == 50 || ms.czly[i] == 100 || ms.czly[i] == 200 || ms.czly[i] == 300 || ms.czly[i] == 500) _ += ms.czly[i];    //充值作假
            else return 10006;
        }
        if(Gua.checkTime("2021.1.1")) {
            // if(ms.test_cz != _) return 10006;   //充值与记录不符合
            if(ms.zsly[2] > 50) return 10006;   //任务获得有问题
            //服务器的充值记录
        }

        //暂时只验证任务
        if(true) {//Gua.checkTime("2021.1.1")
            //金币

            //枫叶

        }

         //如果>100级，没有充值/登录小于三天,检测
        if(msMoudle.maplejson["强制检测"] == "1") {
            ///等级限制
            // if(ms.herodata.Lv >= 100 && ms.test_cz == 0) return 10005;
            // if(ms.herodata.Lv >= 150 && ms.test_cz <= 5) return 10005;
            // if(ms.herodata.Lv == 200 && ms.test_cz < 10) return 10005;
            //充值限制
            if(ms.test_cz == 0) {
                //金币不能大于100万
                if(ms.ajb > 500000) return 10006;
                //枫叶不能大于10万
                if(ms.ary > 80000) return 10006;
                //钻石不可能大于50
                if(ms.zuanshi() > 50) return 10006;
                //积分
                // if(ms.ajf > 500) return 10006;
                //交易点
                if(ms.martPoint() > 0) return 10006;
                //修炼
                // for(let i:number = 0; i < ms.herodata.XL.length;i++) {
                // if(ms.herodata.XL[i] > 10) return 10006;
                // }
                //轮回不能大于10
                // if(ms.herodata.LH > 20)  return 10006;
                //神秘不能大于3
                if(ms.asm > 3) return 10006;
            }
            else if(ms.test_cz > 0 && ms.test_cz < 50) {
                //金币不能大于100万
                if(ms.ajb > 1000000) return 10006;
                //枫叶不能大于10万
                if(ms.ary > 200000) return 10006;
                //钻石不可能大于50
                if(ms.zuanshi() > 2000) return 10006;
                //神秘不能大于3
                if(ms.asm > 30) return 10006;
            }
            else if(ms.test_cz >= 50 && ms.test_cz < 100) {
                //金币不能大于100万
                if(ms.ajb > 2000000) return 10006;
                //枫叶不能大于10万
                if(ms.ary > 300000) return 10006;
                //钻石不可能大于50
                if(ms.zuanshi() > 5000) return 10006;
                //神秘不能大于3
                if(ms.asm > 60) return 10006;
            }
            else if(ms.test_cz >= 100 && ms.test_cz < 200) {
                // //金币不能大于100万
                // if(ms.ajb > 3000000) return 10006;
                // //枫叶不能大于10万
                // if(ms.ary > 400000) return 10006;
                // //钻石不可能大于50
                // if(ms.zuanshi() > 10000) return 10006;
                // //神秘不能大于3
                // if(ms.asm > 90) return 10006;
            }
            else if(ms.test_cz > 200 && ms.test_cz < 300) {
                // //金币不能大于100万
                // if(ms.ajb > 4000000) return 10006;
                // //枫叶不能大于10万
                // if(ms.ary > 400000) return 10006;
                // //钻石不可能大于50
                // if(ms.zuanshi() > 15000) return 10006;
                // //神秘不能大于3
                // if(ms.asm > 120) return 10006;
            }
            else if(ms.test_cz > 300 && ms.test_cz < 500) {
                // //金币不能大于100万
                // if(ms.ajb > 5000000) return 10006;
                // //枫叶不能大于10万
                // if(ms.ary > 400000) return 10006;
                // //钻石不可能大于50
                // if(ms.zuanshi() > 20000) return 10006;
                // //神秘不能大于3
                // if(ms.asm > 150) return 10006;
            }
            else if(ms.test_cz > 500) {

            }
        }

        //充值验算
        if(Math.abs(ms.acz - ms.test_cz) > 5) return 10009;

        return 0;
    }

    export function zuanshi(num:number, ly:number = 0) : void {
        if(num != 0) {
            if(ly == 100) ms.zsly[0] += num;
            else if(ly == 101) ms.zsly[1] += num;
            else if(ly == 102) ms.zsly[2] += num;    //任务获取
            else if(ly == 103) ms.zsly[3] += num;

            else if(ly == 201) ms.zsxh[0] += num;
            else if(ly == 202) ms.zsxh[1] += num;
            else if(ly == 203) ms.zsxh[2] += num;

            // msMoudle.zsly_rnk0 = msMoudle.getRandValue(1000, 0, 500);
            // msMoudle.zsly_rnk1 = msMoudle.getRandValue(2000, 0, 500);
            // msMoudle.zsly_rnk2 = msMoudle.getRandValue(4000, 0, 500);
            // msMoudle.zsly_rnk3 = msMoudle.getRandValue(6000, 0, 500);
        }
    }

    export function jiaoyi(num:number, ly:number = 0) : void {
        if(num > 0) {
            if(ly == 100) ms.jyly[0] += num;    //兑换
            if(ly == 101) ms.jyly[1] += num;    //卖出
        }
        else {
            ms.jyxh[1] += num;
        }
    }

    export function rongyu(num:number, ly:number = 0) : void {
        //任务获取
        // if(ly == msMoudle.zsly_rnk2) {
        //     if(num > 0) ms.ryly[1] += num;
        //     else ms.ryxh[0] += num;
        // }
        // else {
            if(num > 0) ms.ryly[0] += num;
            else ms.ryxh[0] += num;
        // }
    }

    export function jinbi(num:number, ly:number = 0) : void {
        //任务获取
        // if(ly == msMoudle.zsly_rnk2) {
        //     if(num > 0) ms.jbly[1] += num;
        //     else ms.jbxh[0] += num;
        // }
        // else {
            if(num > 0) ms.jbly[0] += num;
            else ms.jbxh[0] += num;
        // }
    }

    export function cailiao(num:number, ly:number = 0) : void {
        if(num > 0) ms.clly[0] += num;
        else ms.clxh[0] += num;
    }

    export function getByServer(herodata:any) : any {
        let hdata:app.model.CharStatus = new app.model.CharStatus();
        hdata.ResetAll();
        let otherherodata:Array<app.model.HeroStatus> = [];
        let otherheroservedata:Array<app.model.HeroStatus> = [];
        if(herodata) {
            if(herodata.herodata != null) {
                // hdata = herodata.herodata;
                ms.updData(hdata, herodata.herodata);
                //主角装备
                hdata.EquipSlots = [];
                for(let i:number = 0; i < herodata.herodata.EquipSlots.length; i++) {
                    if(herodata.herodata.EquipSlots[i]) {
                        hdata.EquipSlots[i] = new app.model.Equip();
                        hdata.EquipSlots[i].ResetAll();
                        ms.eqpData(hdata.EquipSlots[i], herodata.herodata.EquipSlots[i]);
                    }
                }
                hdata.BagSlots = [];
            }
            //其他英雄
            if(herodata.otherherodata != null) {
                otherherodata = [];
                for(let i:number = 0; i < herodata.otherherodata.length; i++) {
                    otherherodata[i] = new app.model.HeroStatus();
                    otherherodata[i].ResetAll();
                    ms.updData(otherherodata[i], herodata.otherherodata[i]);
                }
            }
            if(herodata.otherheroservedata != null) {
                otherheroservedata = [];
                for(let i:number = 0; i < herodata.otherheroservedata.length; i++) {
                    otherheroservedata[i] = new app.model.HeroStatus();
                    otherheroservedata[i].ResetAll();
                    ms.updData(otherheroservedata[i], herodata.otherheroservedata[i]);
                }
            }
            /////
        }

        return hdata;
    }


    export function checkTime(time:string = "2020.11.1") : boolean {
        let riqi = ms.stime.split("-");
        let t = time.split(".");
        if(Number(riqi[0]) > Number(t[0])) return true;  //年
        else {
            if(Number(riqi[0]) == Number(t[0])) {
                if(Number(riqi[1]) > Number(t[1])) return true;  //月
                else {
                    if(Number(riqi[1]) == Number(t[1])) {
                        if(Number(riqi[2]) > Number(t[2])) return true;  //日
                    }
                }
            }
        }
        return false;
    }

    //
}