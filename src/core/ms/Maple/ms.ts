/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />
/// <reference path="./../../../core/ms/Maple/TextEff.ts" />


//ios comand + shirf + g  /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport
//https://blog.csdn.net/SysProgram/article/details/81453871

module msMoudle {

    import cssBasicEff = BasicEffRole.BasicEff;
    import cssTextEff = TextEffMoudle.TextEff;

    //所有wz数据
    export var server_time:number = 1;  //服务器时间
    export var error_time:number = 100;
    export var g_time:number = 0;
    export var last_time:number = -100;
    export var mxd_buf:Array<any> = [];
    export var wz:any = new Object();
    // export var wz2:any = new Object();
    export var backwz = new Object();
    export var zMap:Array<any> = [];
    export var mapleSize:number = 1;
    export var releaseRes:Array<any> = [];
    export var wsocket:Net.SocketManage;
    export var a:number = 0;
    export var b:number = 0;
    export var c:number = 0;
    export var d:number = 0;
    export var e:number = 0;
    export var map_index:number = 200;
    export var tamingmob1:string = "";
    export var tamingmob2:string = "";
    export var online:boolean = false;
    export var yule:number = 1;
    export var QQ:string = "1044571564";    //联系人
    export var daili:boolean = false;        //是否代理
    export var qudao:boolean = false;       //是否有渠道
    export var jy:boolean = false;
    export var banben:string = "";       //代理版本(自己版本这个不填),其他代理从dl1开始
    export var fcd:boolean = false;  //焦点状态
    export var pNum:number = 0;
    export var distxt:string = "";

    export var s_wid:number = 0;
    export var s_hei:number = 0;
    export var s_iwid:number = 0;
    export var s_ihei:number = 0;
    export var s_owid:number = 0;
    export var s_ohei:number = 0;
    export var pt:string = "";

    //随机
    // export var zsly_rnk0:number = 100;
    // export var zsly_rnk1:number = 101;
    // export var zsly_rnk2:number = 102;
    // export var zsly_rnk3:number = 103;

    // export var zsxh_rnk1:number = 201;
    // export var zsxh_rnk2:number = 202;
    // export var zsxh_rnk3:number = 203;

    export var hp:number = 0;
    export var maxhp:number = 0;        //玩家血量
    export var maxmp:number = 0;        //玩家魔法
    export var ItemList:Array<string> = [];
    export var key_down:boolean = false;

    export var jcTime:number = 10;           //检测时间
    export var allTime:number = 0;          //在线总时长
    //test
    export var onLineTime:number = 0;       //在线时长
    export var lastTx:number = 0;           //点击坐标
    export var lastTy:number = 0;
    export var lastTxyAll:number = 0;       //总点击数量
    export var lastTxyAll_bt:number = 0;    //最多不同点击数量
    export var lastTxyObj:Object = new Object();
    export var guaji:boolean = false;
    export var loadPng:boolean = true;
    export var rmvPng:boolean = false;
    export var numberEff:number = 1377;        //伤害数字

    export var enterTime:number = 0;        //加速标记时间

    export var lastHeorX:number = 0;        //角色位置
    export var lastHeorY:number = 0;
    export var lastHeorAll:number = 0;      //最多连续角色位置
    // export var touchXY:any = new Object();
    // export var tiaocishu:number = 0;
    // export var dircishu:number = 0;
    export var jump_time:number = 0;
    export var m_fenshen:boolean = false;
    // export var m_bianshen:boolean = false;
    // export var m_bs_id:string = "1210";//1200 1201 1210 1211 1000 1001 1100 1101 2002
    export var m_zhuque:boolean = true;
    export var m_title:string = "N";
    //-100改成随机数
    export var test_rnk:number = -100;
    export var test_jinbi:number = -100;        //金币
    export var test_rongyu:number = -100;       //枫叶
    export var test_zuanshi:number = -100;      //黑金
    export var test_jifen:number = -100;
    export var test_zs:number = -100;           //转生
    export var test_cailiao1:number = -100;     //
    export var test_cailiao2:number = -100;     //
    export var test_juexing1:number = -100;     //

    export var BAGMAX:number = 200;             //背包数量
    export var FASHIONMAX:number = 30;         //时装数量
    export var gtouch:boolean = true;

    // export var test_ssjh:number = -100; //圣兽精华
    // export var test_lhs:number = -100;  //灵魂石
    // export var test_qinglong:number = -100; //青龙碎片
    // export var test_baihu:number = -100;    //白虎碎片
    // export var test_xuanwu:number = -100;   //玄武碎片
    // export var test_zhuque:number = -100;   //朱雀碎片

    export var test_shenmi:number = -100;       //神秘卷轴
    export var test_zhihuan:number = -100;      //置换石
    export var test_lv:number = -100;

    export var shiqu:boolean = false;
    export var m_job:Array<string> = ["龙骑士", "主教", "独行客", "神射手", "英雄", "冰雷", "圣骑士", "火毒", "箭神", "无影人",
    "冲锋队长", "船长", "狂龙战士", "夜光法师", "尖兵", "剑豪", "魔影链士", "圣晶使者", "影魂异人", "虎影", "神之子", "爆莉萌天使", "战神", "龙神", "双弩精灵", "幻影", "隐月", "恶魔猎手", "恶魔复仇者", "唤灵斗师", "爆破手", "古迹猎人", "暗影双刀", "米哈尔", "魂骑士", "炎术士", "风灵使者", "夜行者", "奇袭者", "草薙京", "不知火舞",
    "诸葛亮", "曹操", "貂蝉", "赵云", "关羽", "张飞", "马超", "黄忠", "司马懿"]//"机械师", "豹弩", "超能力者", "阴阳师", "龙的传人", "林之灵"];

    //// else if(selHero == 33) sks = ["530", "531", "532"];//火炮手
        // else if(selHero == 30) sks = ["3310", "3311", "3312"];//豹弩
        // else if(selHero == 31) sks = ["3510", "3511", "3512"];//机械师
        //超能力者
        //阴阳师
        //龙的传人
        //林之灵

    ///时装-----这里肯定需要整改
    export function getSlotByJob(index:number) : any {

        // if(!ms.herodata.FlionSlots) {
            // ms.herodata.FlionSlots = new Array(50);
            for(let i:number = 0; i < 50; i++) {
                if(!ms.herodata.FlionSlots[i]) {
                    ms.herodata.FlionSlots[i] = [];
                }
            }
        // }

        return ms.herodata.FlionSlots[index];
        // let slots:Array<any> = [
        //     ms.herodata.EquipSlots2,
        //     ms.herodata.EquipSlots3,
        //     ms.herodata.EquipSlots4,
        //     ms.herodata.EquipSlots5,
        //     ms.herodata.EquipSlots6,
        //     ms.herodata.EquipSlots7,
        //     ms.herodata.EquipSlots8,
        //     ms.herodata.EquipSlots9,
        //     ms.herodata.EquipSlots10,
        //     ms.herodata.EquipSlots11,
        //     ms.herodata.EquipSlots12,
        //     ms.herodata.EquipSlots13,
        //     ms.herodata.EquipSlots14,
        //     ms.herodata.EquipSlots15,
        //     ms.herodata.EquipSlots16,
        //     ms.herodata.EquipSlots17,
        //     ms.herodata.EquipSlots18,
        //     ms.herodata.EquipSlots19,
        //     ms.herodata.EquipSlots20,
        //     ms.herodata.EquipSlots21,
        //     ms.herodata.EquipSlots22,
        //     ms.herodata.EquipSlots23,
        //     ms.herodata.EquipSlots24,
        //     ms.herodata.EquipSlots25,
        //     ms.herodata.EquipSlots26,
        //     ms.herodata.EquipSlots27,
        //     ms.herodata.EquipSlots28,
        //     ms.herodata.EquipSlots29,
        //     ms.herodata.EquipSlots30,
        //     ms.herodata.EquipSlots31,
        //     ms.herodata.EquipSlots32,
        //     ms.herodata.EquipSlots33,
        //     ms.herodata.EquipSlots34,
        //     ms.herodata.EquipSlots35,
        //     ms.herodata.EquipSlots36,
        //     ms.herodata.EquipSlots37,
        //     ms.herodata.EquipSlots38,
        //     ms.herodata.EquipSlots39,
        //     ms.herodata.EquipSlots40,
        //     ms.herodata.EquipSlots41,
        //     ms.herodata.EquipSlots42
        // ];
        // return slots[0]
    }

    export var char:any;                            //角色
    export var guaList:Array<any> = [];             //外挂列表
    export var yz:string = "N";
    export var setName = ["S101 非交易区", "S102 交易区"];

    //主逻辑节点
    export var mainP:any;       //父节点
    export var mapP:any;        //
    export var mainT:any;       //this
    export var gameP:any;       //gamesp
    export var intoGame:boolean = false;

    export var m__i:number = -1;
    export var m__reactorInfo:any;
    export var m__id:string;
    export var m__touch:boolean = true;
    export var check_auto:boolean = false;

    export var team_guanka:number = 0;
    export var team_guanka_num:number = 0;//怪物、答题数量
    export var team_guanka1_num:number = 0;//垃圾
    export var team_guanka2_num:number = 0;//矿石
    export var team_guanka3_num:number = 0;//药草
    export var testa:number = 0;
    export var testb:number = 0;
    export var testc:number = 0;
    export var testd:number = 0;
    export var teste:number = 0;

    ////////////////////////////////////////////////////////////////////////////////////////////
    export var isBoss:boolean = false;
    export var isFuben:boolean = false;
    export var isPvp:boolean = false;
    export var specialPvp:boolean = false;
    export var pvpID:string;
    export var WorldBossLv:number = 80;
    export var isWorldBoss:boolean = false;
    export var isTiaoTiao:boolean = false;
    export var isWuJin:boolean = false;
    export var wujin_tip:number = 0;
    export var wujin_guanka:number = 0;

    export function QuestTask(id:string) : void {

        // <tr><td>1000.name</td><td>借来莎丽的镜子</td></tr>
        // <tr><td>1000.parent</td><td>莎丽的镜子</td></tr>
        // <tr><td>1000.order</td><td>1</td></tr>
        // <tr><td>1000.area</td><td>20</td></tr>
        // <tr><td>1000.blocked</td><td>1</td></tr>
        // <tr><td>1000.0</td><td>去找希娜。</td></tr>
        // <tr><td>1000.1</td><td>在菇菇村见到了希娜，她正在担心太阳会把她的皮肤给晒伤。所以希娜要从她姐姐莎丽那里借来镜子。</td></tr>
        // <tr><td>1000.2</td><td>受到希娜的请求，要去找莎丽借镜子。</td></tr>
        let data = msMoudle.wz["Quest.img"][id];
        if(data) {
            let name = data[id + ".name"];
            let root:string = id + "." + ms.QuestStep;
            let ctx:string = "";
            if(data[root]) ctx = data[root];
            // console.log("Quest.img", name,ctx);

            if(name.length > 7) {
                let newctx = "";
                for(let i:number = 0; i < 7; i++) newctx += name[i];
                msMoudle.gameP.task_name.text = newctx + "...(进行中)";     //完成状态
            }
            else {
                msMoudle.gameP.task_name.text = name + "(进行中)";     //完成状态
            }

            if(ctx.length > 20) {
                let newctx = "";
                for(let i:number = 0; i < 20; i++) {
                    newctx += ctx[i];
                }
                newctx += "......";
                ctx = newctx;
            }
            msMoudle.createParagraph(msMoudle.gameP.pEle, ctx, false);
        }
        else {
            msMoudle.gameP.task_name.text = "";
            msMoudle.gameP.taskMsg2.visible = false;
            msMoudle.createParagraph(msMoudle.gameP.pEle, "当前没有可进行的任务......", false);
        }
        //
    }

    export function getNpcStateByCheck() : string {
        let id:string = ms.QuestId;
        let step:number = ms.QuestStep
        let data = msMoudle.wz["Check.img"][id];
        let npc:string = "N";
        ///可以通过这里设置状态
        if(data) {
            ////更新全部的状态
            ///这样判断会不会不太好？？
            if(!data[id + "." + step + ".npc"]) {
                // console.log("所有任务完成", ms.tQuests);
                ms.tQuests[ms.QuestId] = 2;
                if(msMoudle.mapP.m_life.m_npcsAni) {
                    for(let i:number = 0; i < msMoudle.mapP.m_life.m_npcsAni.length; i++) {
                        msMoudle.mapP.m_life.m_npcsAni[i].changeState(msMoudle.mapP.m_life.m_npcsAni[i].m_id, -1);
                    }
                }
                ///新的任务
                let Qdata = msMoudle.wz["Quest.img"]
                let newQ = Number(ms.QuestId);
                let find = false;
                for(let key in Qdata) {
                    if(Number(key) > newQ) {
                        ms.QuestId = Number(key) + "";
                        find = true;
                        break;
                    }
                }
                //找不到任务
                if(find == false) {
                    ms.QuestId = (newQ + 1) + "";
                }

                ms.QuestStep = 0;
                msMoudle.QuestTask(ms.QuestId);
                return ;
            }
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
                let itemsucc:boolean = true;
                let _item:number = 0;
                while(true) {
                    let _id = data[id + "." + step + ".item." + _item + ".id"];
                    if(_id) {
                        let _num = Number(data[id + "." + step + ".item." + _item + ".count"]);
                        let itemNum = msMoudle.getItemNum(_id);
                        if(itemNum < _num) {
                            itemsucc = false;
                            break;
                        }
                        // console.log("###", _id, _num);
                    }
                    else break;
                    _item++;
                }
                // if(itemsucc == false) return "N";
                // if(itemsucc) {
                    npc = _npc;
                    let curnpc = _npc;
                    if(curnpc.length == 4) curnpc = "000" + curnpc;
                    else if(curnpc.length == 5) curnpc = "00" + curnpc;
                    else if(curnpc.length == 6) curnpc = "0" + curnpc;

                    if(msMoudle.mapP.m_life.m_npcsAni) {
                        for(let i:number = 0; i < msMoudle.mapP.m_life.m_npcsAni.length; i++) {
                            if(msMoudle.mapP.m_life.m_npcsAni[i].m_id == curnpc + ".img") {
                                if(itemsucc) {
                                    msMoudle.mapP.m_life.m_npcsAni[i].changeState(curnpc + ".img", 2);
                                }
                                else {
                                    msMoudle.mapP.m_life.m_npcsAni[i].changeState(curnpc + ".img", 1);
                                }
                            }
                            else {
                                msMoudle.mapP.m_life.m_npcsAni[i].changeState(curnpc + ".img", -1);
                            }
                        }
                    }
                // }
            }
            //
        }

        return npc;
    }

    export function getItemNum(id:any) : number {
        for(let i:number = 0; i < msMoudle.ItemList.length; i++) {
            if(Number(msMoudle.ItemList[i]) == Number(id)) {
                return ms.tBagsArr[i];
            }
        }
        return 0;
    }

    export function addItem(id:any, num:number) : void {
        for(let i:number = 0; i < msMoudle.ItemList.length; i++) {
            if(Number(msMoudle.ItemList[i]) == Number(id)) {
                ms.tBagsArr[i] += num;
                if(ms.tBagsArr[i] >= 999) ms.tBagsArr[i] = 999;
                // ms.saveServer();
                break;
            }
        }
    }

    export function rmvItem(id:any, num:number) : void {
        for(let i:number = 0; i < msMoudle.ItemList.length; i++) {
            if(Number(msMoudle.ItemList[i]) == Number(id)) {
                ms.tBagsArr[i] -= num;
                // ms.saveServer();
                break;
            }
        }
    }

    export function createParagraph(pEle:Laya.HTMLDivElement, txt:string, show:boolean = true): void {
        let txtArr = txt.split("#");
        let newhtml = "";
        // console.log(txt);
        let res:Array<any> = [];
        for(let i:number = 0; i < txtArr.length; i++) {
            // console.log(data[i])
            //换行
            ////
            if(txtArr[i].indexOf("k") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("k", "")
                newhtml += "<span>" + str + "</span>";

                if(h) newhtml += "<br />";
            }
            else if(txtArr[i].indexOf("b") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("b", "")
                newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                if(h) newhtml += "<br />";
            }
            else if(txtArr[i].indexOf("e") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("e", "")
                newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                if(h) newhtml += "<br />";
            }
            else if(txtArr[i].indexOf("n") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("n", "")
                newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                if(h) newhtml += "<br />";
            }
            else if(txtArr[i].indexOf("p") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("p", "")
                let name:string = msMoudle.wz["Npc.img"][str] ? msMoudle.wz["Npc.img"][str][str + ".name"] : str;
                newhtml += "<span color='#d26ae3'>" + name + "</span>";
                if(h) newhtml += "<br />";
            }
            //地图名称
            else if(txtArr[i].indexOf("m") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("m", "")
                let name = str;
                for(let key in msMoudle.wz["Map.img"] ) {
                    // let id = msMoudle.rmvImg(this.m_id);
                    if(msMoudle.wz["Map.img"][key][key + "." + name + ".mapName"]) {
                        name = msMoudle.wz["Map.img"][key][key + "." + name + ".mapName"];
                        break;
                    }
                }
                // let name:string = msMoudle.wz["Npc.img"][str] ? msMoudle.wz["Npc.img"][str][str + ".name"] : str;
                newhtml += "<span color='#d26ae3'>" + name + "</span>";
                if(h) newhtml += "<br />";
            }
            //物品名称
            else if(txtArr[i].indexOf("i") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("i", "")
                let item = msMoudle.getItemMsg(Number(str));
                if(item) {
                    newhtml += "<span color='#d26ae3'>" + item.name + "</span>";
                    // newhtml += "<img src='" + item.img + "'></img>";
                    res.push({ url: item.img });
                }
                if(h) newhtml += "<br />";
            }
            //物品图标
            else if(txtArr[i].indexOf("t") >= 0) {
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("t", "")
                let item = msMoudle.getItemMsg(Number(str));
                if(item) {
                    // newhtml += "<span color='#d26ae3'>" + item.name + "</span>";
                    newhtml += "<img src='" + item.img + "'></img>";
                    res.push({ url: item.img });
                }
                if(h) newhtml += "<br />";
            }
            else if(txtArr[i].indexOf("r") >= 0) {
                //暂时什么都不处理

            }
            //背包中的数量
            else if(txtArr[i].indexOf("c") >= 0) {
                //暂时什么都不处理
                let str = txtArr[i];
                let h = false;
                if(str.indexOf("\\n\\n") >= 0) {
                    str = str.replace("\\n\\n", "")
                    h = true;
                }
                else if(str.indexOf("\\n") >= 0) {
                    str = str.replace("\\n", "")
                    h = true;
                }
                str = str.replace("c", "")
                // let item = msMoudle.getItemMsg(Number(str));
                // if(item) {
                let itemNum = msMoudle.getItemNum(str);
                newhtml += "<span color='#d26ae3'>" + itemNum + "</span>";
                    // newhtml += "<img src='" + item.img + "'></img>";
                    // res.push({ url: item.img });
                // }
                if(h) newhtml += "<br />";
            }
            else {
                newhtml += "<span>" + txtArr[i] + "</span>";
            }
        }

        ///可获得物品
        if(show) {
            let id = ms.QuestId;
            let step = ms.QuestStep;
            let data = msMoudle.wz["Act.img"][id];
            let istitle:boolean = false;
            if(data) {
                // console.log(ms.QuestId, "交谈" + step + "奖励")
                //获取奖励
                let exp = data[id + "." + step + ".exp"];
                if(!exp) exp = 0;
                if(exp > 0) {
                    if(istitle == false) {
                        newhtml += "<br />";
                        newhtml += "<span style='color:#605a5a;font-weight:bold'>" + "可获得奖励" + "</span>";
                        istitle = true;
                    }
                    newhtml += "<br />";
                    newhtml += "<span color='#d26ae3'>" + "Exp+" + Number(exp) + "</span>";
                    // console.log("Exp+" + Number(exp))
                }
                let frame = 0;
                while(true) {
                    let item = data[id + "." + step + ".item." + frame + ".id"];
                    if(item) {
                        let count = data[id + "." + step + ".item." + frame + ".count"];
                        if(Number(count) > 0) {
                            if(istitle == false) {
                                newhtml += "<br />";
                                newhtml += "<span style='color:#605a5a;font-weight:bold'>" + "可获得奖励" + "</span>";
                                istitle = true;
                            }
                            // console.log("道具增加", item, count);
                            let itemMsg = msMoudle.getItemMsg(Number(item));
                            if(itemMsg) {
                                newhtml += "<br />";
                                // newhtml += "<span>" + str + "</span>";
                                newhtml += "<span>" + Number(count) + "个" + itemMsg.name + "</span>";
                                newhtml += "<img src='" + itemMsg.img + "'></img>";
                                res.push({ url: itemMsg.img });
                            }
                        }
                        frame++;
                    }
                    else break;
                }
            }
        }

        ////先加载后显示
        let newres:Array<any> = [];
        for(let i:number = 0; i < res.length; i++) {
            if(!Laya.loader.getRes(res[i].url)) {
                newres.push(res[i]);
            }
        }
        if(newres.length > 0) {
            msLoad.load(newres).done(dlg => {
                pEle.innerHTML = newhtml;
            });
        }
        else {
            pEle.innerHTML = newhtml;
        }
    }

    //3321014 3221001 3111006
    //2121005   2221005 2321003 3221005 3121006
    export var m_skill3:Array<string> = ["1311003", "2321003", "4201005", "3101005", "1001004", "2201004", "1001004","2101004", "3111006", "4111002", "5121052", "5211008", "61121201",
    "27121202", "36101008","41121018", "64001002", "152120001", "155121041", "164121044",
    "100001283", "65121007", "21121016", "22171081", "23121052",
    "24121010", "25121007", "31121003", "31221052", "32101001", "37120023", "3321040", "4331000", "51121052", "11121004",
    "12121052", "13121052", "14121052", "15121052",
    "600000001", "600010001", "600020001", "600030001", "600040001", "600050001", "600060001", "600070001", "600080001", "600090001", "600100001"]
    export var m_skill:Array<string> = ["1311001", "2301002", "4211006","3111003", "1111008", "2201005", "1001005", "2111003", "3211003", "4111005", "5121016", "5221017", "61121222",
    "27111303", "36121052","41121002", "64111003", "152110001", "155111006", "164001000",
    "101121200", "65111101", "21110020", "22171095", "23121002",
    "24101000", "25121005", "31121052", "31211002", "32121052", "37120001", "3321017", "4341004", "51101005", "11121055",
    "12111021", "13111000", "14121002", "15121002",
    "600000003", "600010003", "600020003", "600030003", "600040003", "600050003", "600060003", "600070003", "600080003", "600090003", "600100003"]
    export var m_skill2:Array<string> = ["1311006", "2321008", "4211004", "3111004", "1121008", "2221007", "1221011","2121007", "3211004", "4121007", "5121001", "5221003", "61121052",
    "27121052", "36121053","41121052", "64121052", "152121007", "155121215", "164121003",
    "101120102", "65121003", "21120022", "22171062", "23111002",
    "24111006", "25121006", "31111003", "31221002", "32121004", "37120002", "3311009", "4341009", "51121007", "11111120",
    "12121002", "13121001", "14111022", "15121001",
    "600000004", "600010004", "600020004", "600030004", "600040004", "600050004", "600060004", "600070004", "600080004", "600090004", "600100004"]
    /////技能4，5没有统计怪物，可能伤害技能不会起作用
    export var m_skill4:Array<string> = ["1311008", "2311003", "4201003", "3121006", "1111002", "2221005", "1201006","2121005", "3221005", "4111001", "5121003", "5221006", "61111008",
    "27121006", "36121054","41121054", "64121054", "152121042", "155121042", "164121007",
    "101120202", "65121053", "21111012", "22171082", "23111005",
    "24121004", "25121131", "31121007", "31211004", "32121054", "37121005", "3310006", "4301003", "51121006", "11121054",
    "12101023", "13121000", "4111002", "15121053",
    "600000002", "600010002", "600020002", "600030002", "600040002", "600050002", "600060002", "600070002", "600080002", "600090002", "600100002"]
    export var m_skill5:Array<string> = ["2101002"]
    // export var m_skill5:Array<string> = ["1311007", "2301004", "4211005", "1121000", "1101006", "2201001", "1121002","2111005", "1121011", "1301007", "5121003", "5221006", "61111008"]
    //武装专用技能投弹攻击、速射、烈焰喷射、寒冰喷射、海鸥空袭
    //64121013 64121014 64121015 64121052
    //37120001 37121003
    //31121000 31121052

    export function getSkillsByHero(selHero:number) : any {
        let sks:any = [];
        if(selHero == 0) sks = ["100","130", "131", "132"];   //龙骑士
        else if(selHero == 1) sks = ["200","230", "231", "232"];  //主教
        else if(selHero == 2) sks = ["400","420","421", "422"];   //独行客
        else if(selHero == 3) sks = ["300","310", "311", "312"];  //神射手
        else if(selHero == 4) sks = ["100","110", "111", "112"];  //英雄
        else if(selHero == 5) sks = ["200","220", "221", "222"];  //冰雷
        else if(selHero == 6) sks = ["100","120", "121", "122"];  //圣骑士
        else if(selHero == 7) sks = ["200","210", "211", "212"];  //火毒
        else if(selHero == 8) sks = ["300","320", "321", "322"];  //箭神
        else if(selHero == 9) sks = ["400","410", "411", "412"];  //无影人
        else if(selHero == 10) sks = ["500","510", "511", "512"]; //冲锋队长
        else if(selHero == 11) sks = ["500","520", "521", "522"]; //船长
        else if(selHero == 12) sks = ["6100","6110", "6111", "6112"];//狂龙战士
        else if(selHero == 13) sks = ["2700","2710", "2711", "2712"];//夜光法师
        else if(selHero == 14) sks = ["3600","3610", "3611", "3612"];//尖兵
        else if(selHero == 15) sks = ["4100","4110", "4111", "4112"];//剑豪
        else if(selHero == 16) sks = ["6400","6410", "6411", "6412"];//魔影链士
        else if(selHero == 17) sks = ["15200","15210", "15211", "15212"];//圣晶使者
        else if(selHero == 18) sks = ["15500","15510", "15511", "15512"];//影魂异人
        else if(selHero == 19) sks = ["16400","16410", "16411", "16412"];//虎影
        else if(selHero == 20) sks = ["10000","10110", "10111", "10112"];//神之子
        else if(selHero == 21) sks = ["6500","6510", "6511", "6512"];//暴利萌天使
        else if(selHero == 22) sks = ["2100","2110", "2111", "2112"];//战神
        else if(selHero == 23) sks = ["2200","2210", "2211", "2212", "2213", "2214", "2215", "2216", "2217", "2218"];//龙神
        else if(selHero == 24) sks = ["2300","2310", "2311", "2312"];//双弩精灵
        else if(selHero == 25) sks = ["2400","2410", "2411", "2412"];//幻影
        else if(selHero == 26) sks = ["2500","2510", "2511", "2512"];//隐月
        else if(selHero == 27) sks = ["3100","3110", "3111", "3112"];//恶魔猎手
        else if(selHero == 28) sks = ["3100","3120", "3121", "3122"];//复仇者
        else if(selHero == 29) sks = ["3200","3210", "3211", "3212"];//唤灵
        else if(selHero == 30) sks = ["3700","3710", "3711", "3712"];//爆破手
        else if(selHero == 31) sks = ["300","330", "331", "332"];//古迹猎人
        else if(selHero == 32) sks = ["400","430", "431", "432", "433", "434"];//暗影双刀
        else if(selHero == 33) sks = ["5100","5110", "5111", "5112"];//米哈尔
        else if(selHero == 34) sks = ["1100","1110", "1111", "1112"];//魂骑士
        else if(selHero == 35) sks = ["1200","1210", "1211", "1212"];//炎术士
        else if(selHero == 36) sks = ["1300","1310", "1311", "1312"];//风灵使者
        else if(selHero == 37) sks = ["1400","1410", "1411", "1412"];//夜行者
        else if(selHero == 38) sks = ["1500","1510", "1511", "1512"];//奇袭者

        else if(selHero == 39) sks = ["60000"];
        else if(selHero == 40) sks = ["60001"];
        else if(selHero == 41) sks = ["60002"];
        else if(selHero == 42) sks = ["60003"];
        else if(selHero == 43) sks = ["60004"];
        else if(selHero == 44) sks = ["60005"];
        else if(selHero == 45) sks = ["60006"];
        else if(selHero == 46) sks = ["60007"];
        else if(selHero == 47) sks = ["60008"];
        else if(selHero == 48) sks = ["60009"];
        else if(selHero == 49) sks = ["60010"];

        // else if(selHero == 33) sks = ["530", "531", "532"];//火炮手
        // else if(selHero == 30) sks = ["3310", "3311", "3312"];//豹弩
        // else if(selHero == 31) sks = ["3510", "3511", "3512"];//机械师
        //超能力者
        //阴阳师
        //龙的传人
        //林之灵
        return sks;
    }

    // || skillid == "22171095"
    export function isTileSkill(skillid:string) : boolean {
        if(skillid == "2121007" || skillid == "2221007" || skillid == "2321008" || skillid == "5121001") return true;
        return false;
    }

    export function isAftSkill(skillid:string) : boolean {
        if(skillid == "1311003") return true;// || skillid == "600000003"
        return false;
    }

    export function isBSkill(skillid:string) : boolean {
        if(skillid == "2301005"         //圣光箭
        || skillid == "2001005"         //魔法双击
        || skillid == "3221007"
        || skillid == "3111006"
        || skillid == "3221001"
        || skillid == "13121001"
        || skillid == "3101005"
        || skillid == "3111004"      //范围性远程
        || skillid == "3111006"
        || skillid == "3111003"      //范围性远程
        || skillid == "2101004"
        || skillid == "2111006"
        || skillid == "2121003"
        || skillid == "3211003"
        || skillid == "3211004"
        || skillid == "4121006"
        || skillid == "4121007"


        || skillid == "14121002"
        || skillid == "13111000"
        // || skillid == "13111021"


        || skillid == "5221007"
        || skillid == "5211002"
        || skillid == "5221008"
        || skillid == "5121002"
        )
        return true;
        return false;
    }

    //所有掉落技能（主动技能）
    export var AllSkills:Array<any> = [
        //000(通用)   只保留坐骑技能
        /////////////////////////////////////////////////////////////////////////
        "1001004", "1001005",     //100(战士)   没有值得做的技能
        "1101004", "1101006", "1101007",      //110(剑客)
        "1111002", "1111007", "1111008",      //111(勇士)
        "1121000", "1121002", "1121008", "1121010", "1121011",      //112(英雄)
        "1201006", //120(准骑士)
        "1211003", "1211005", "1211007", "1211009",     //121(骑士)
        "1221003", "1221011",   //122(圣骑士)
        "1301006", "1301007",   //130(枪战士)
        "1311001", "1311003", "1311006", "1311007", "1311008",  //131(龙骑士)
        "1320006", "1321003", "1321012",    //132(黑骑士)
        "2101004",
        "2111003", "2111005",
        "2121007", "2121002",
        "2201004", "2201005", "2201003", "2201001",
        "2211002",
        "2221007",
        "2301002", "2301005", "2301004",
        "2311003",
        "2321008",
        "3101005",
        "3111003", "3111004", "3111006",
        "3121002",
        "3211003", "3211004",
        "3221006",
        "4111005", "4111002", "4111001",
        "4121007",
        "4201005", "4201003",
        "4211006", "4211004", "4211005",
        "5121003", "5221006", "61111008",
        "61121100",
        "4341009",
        "27121006", "36121054","41121054",
        //被动
        "1000000", "1000001", "1000002", "1001003", "1101007",
    ];

    //被动
    export var AllPasSkills:Array<any> = [
        "1000000", "1000001", "1000002", "1001003", "1101007",
    ];

    export function getWeaponByJob(selHero:number) : string {
        if(selHero == 0) return "01432000.img";//枪
        else if(selHero == 1) return "01382000.img";//杖
        else if(selHero == 2) return "01332000.img";//短刀
        else if(selHero == 3) return "01452000.img";//弓
        else if(selHero == 4) return "01402000.img";//双手剑
        else if(selHero == 5) return "01382000.img";//杖
        else if(selHero == 6) return "01302000.img";//单手剑
        else if(selHero == 7) return "01382000.img";//杖
        else if(selHero == 8) return "01462000.img";//弩
        else if(selHero == 9) return "01472000.img";//拳套
        else if(selHero == 10) return "01482000.img";//拳甲
        else if(selHero == 11) return "01492000.img";//短枪-火枪
        else if(selHero == 12) return "01402000.img";//双手剑
        else if(selHero == 13) return "01382000.img";//杖
        else if(selHero == 14) return "01242003.img";//能量剑
        else if(selHero == 15) return "01572000.img";//太刀
        else if(selHero == 16) return "01272008.img";//锁链
        else if(selHero == 17) return "01282003.img";//魔力手套
        else if(selHero == 18) return "01482000.img";//拳甲
        else if(selHero == 19) return "01552055.img";//扇子,01552055
        else if(selHero == 20) return "01562006.img";//大剑
        else if(selHero == 21) return "01222109.img";//手统
        else if(selHero == 22) return "01442000.img";//矛
        else if(selHero == 23) return "01382000.img";//杖
        else if(selHero == 24) return "01522105.img";//双弩
        else if(selHero == 25) return "01362082.img";//手杖
        else if(selHero == 26) return "01482000.img";//拳甲
        else if(selHero == 27) return "01302000.img";//单手剑
        else if(selHero == 28) return "01302000.img";//单手剑
        else if(selHero == 29) return "01382000.img";//杖///////////
        // else if(selHero == 30) return "01462000.img";
        // else if(selHero == 31) return "01492000.img";//
        else if(selHero == 30) return "01582008.img";//拳炮
        else if(selHero == 31) return "01592021.img";//远古弓
        else if(selHero == 32) return "01332000.img";//短刀
        else if(selHero == 33) return "01302000.img";//单手剑
        else if(selHero == 34) return "01302000.img";//单手剑
        else if(selHero == 35) return "01382000.img";//杖
        else if(selHero == 36) return "01452000.img";//弓
        else if(selHero == 37) return "01472000.img";//拳套
        else if(selHero == 38) return "01482000.img";//拳甲
        else if(selHero == 39) return "01302000.img";
        else if(selHero == 40) return "01302000.img";
        else if(selHero == 41) return "01302000.img";
        else if(selHero == 42) return "01302000.img";
        else if(selHero == 43) return "01302000.img";
        else if(selHero == 44) return "01302000.img";
        else if(selHero == 45) return "01302000.img";
        else if(selHero == 46) return "01302000.img";
        else if(selHero == 47) return "01302000.img";
        else if(selHero == 48) return "01302000.img";
        else if(selHero == 49) return "01302000.img";
        else if(selHero == 50) return "01302000.img";
    }

    export function MapInit() : void {
        msMoudle.isWuJin = false;
        msMoudle.isTiaoTiao = false;
        msMoudle.isBoss = false;
        msMoudle.isFuben = false;
        msMoudle.isPvp = false;
        msMoudle.isWorldBoss = false;
    }

    export var boss_win:boolean = false;
    export var tiaotiao_map:string = "105040310.img";   //"105040310", "105040311"
    export var tiaotiao_nandu:number = 1;
    export var addExp:number = 1;
    //共有91种怪物   ----除了闹钟是大boss以外，剩下90关卡

    export var PRIFIX:Array<string> = ["哀伤的","爱哭鬼","安静的","安稳的","傲娇的","八重齿","白发","暴风","暴走的","奔放的","冰霜的","不思议","彩色的","怅然的","畅快的","潮流的","沉静的","沉闷的","沉默的","沉郁的","沉着的","诚恳的","诚心的","诚意的","诚挚的"];
    export var MALENAME:Array<string> = ["若伊","若娜","若拉","小乖","香远","丽影","阿木","银铃","小芳","芳芳","小八","八酱","喵酱","玲玲","啊绫","美人","妖精","娜娜","小娜","小鱼","潇雨","猫猫","玄子","国宝","熊猫","蕊","小蕊","七夜","笑笑","泪","星星","淑女","梦","小梦","晓梦","牡丹","姗姗","小珊","天使","蜜蜜","小蜜","小秘","莫莫","沫沫","么么","美子","雯雯","小雯","晓雯","乐乐","小仙","仙儿","格格","小倩","倩倩","小茜","公主","小诺","小鬼","雪舞","琪琪","温柔","小姐","心儿","欣儿","馨儿","小静","虹虹","傲雪","扶子","素素","雨滴","小夏","小嫣","语嫣","天涯","阿欣","青青","大白","小白","白白","樱花","梧桐","月影","小花","小兔","蘑菇","小丫","晨曦","如梦","囡囡","海棠","婷婷","嘟嘟","兔兔","糖糖","三月","风铃","落落","薇薇安","妮子","丹丹","糖果","菲菲","羽毛","萝莉","落雪","花飞","暗香","夏天","小妖","淡淡","浅浅","小可","桃子","香香","小七","漫漫","黑骑","旗木","漩涡","巅峰","回忆","独恋","传说","司马","纳兰","自由","浪漫","守护","华丽","王者","幻想","旋律","优雅","精彩","辉煌","荣耀","梦之","寻梦","精英","记忆","迷糊","善良","永恒"];

    export function  getRandomName(): string {
        let randName: string = this.PRIFIX[this.getRandValue(0, 0, PRIFIX.length)];
        randName += this.MALENAME[this.getRandValue(0, 0, MALENAME.length)];
        return randName;
    }

    export function resTip(res:any, force:boolean = false) : void {
        for(let r:number = 0; r < res.length; r++) {
            let __tex = Laya.loader.getRes(res[r].url);
            if(__tex) {
                if(__tex.width >= 512 || __tex.height >= 512 || force) {
                    ///不放入大图和集里面
                    __tex.bitmap.enableMerageInAtlas = false;   //新增的这里
                    msMoudle.releaseRes[msMoudle.releaseRes.length] = res[r].url;
                }
            }
            else {
                console.log("资源标记错误" + res[r]);
                res.splice(r, 1);
            }
        }
    }

    export function loadWZ(cs:CssParser.Txt, str:string, ms:string, wzname:string = "") : any {
        let data = cs.loadHtml(Laya.loader.getRes(str), str, ms, wzname);
        //
        // for(let key in data) {
        //     console.log(str, key , "大小", data[key])
        // }
        msMoudle.doWZ(str);
        return data;
    }
    export function doWZ(str:string) : void {
        Laya.loader.clearRes(str, true);
    }

    export function loadJson(str:string, parttype:string) : void {
        let data = Laya.loader.getRes(str);
        // console.log(data)
        for(let key in data) {
            if(data[key]) {
                msMoudle.wz[key] = data[key];
                // if(parttype == "Head")
                // console.log(key)
            }
        }
        Laya.loader.clearRes(str, true);
        data = null;
    }

    // export function getNumByNmae(name:string) : number {
    //     if(name == "9000000") return ms.jinbi();
    //     else if(name == "1234561") return ms.rongyu();
    //     // else if(name == "600000003") return ms.ssjh;
    //     // else if(name == "600000004") return ms.qinglong;
    //     // else if(name == "600000005") return ms.baihu;
    //     // else if(name == "600000006") return ms.xuanwu;
    //     // else if(name == "600000007") return ms.zhuque;
    //     else if(name == "800000000") return ms.juexing1();
    //     else if(name == "700000000") return ms.cailiao1();
    //     else if(name == "600000002") return ms.cailiao2();
    //     else if(name == "2040599") {
    //         for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
    //             if(ms.herodata.BagSlots[i].openid == 2040599) {
    //                 return  ms.herodata.BagSlots[i].num;
    //             }
    //         }
    //         return 0;
    //     }
    //     else if(name == "600000008") return ms.lhs;
    //     return 0;
    // }

    export var bodyPng:Array<any> = [
        "alert.0.arm",
        "alert.0.body",
        "alert.0.lHand",
        "alert.0.rHand",
        "alert.1.arm",
        "alert.1.body",
        "alert.1.lHand",
        "alert.1.rHand",
        "alert.2.arm",
        "alert.2.body",
        "alert.2.lHand",
        "alert.2.rHand",
        "heal.1.arm",
        "heal.1.body",
        "jump.0.arm",
        "jump.0.body",
        "jump.0.lHand",
        "jump.0.rHand",
        "ladder.0.body",
        "ladder.1.body",

        // "proneStab.0.body",
        // "proneStab.1.arm",
        // "proneStab.1.body",

        "rope.0.body",
        "rope.1.body",
        "shoot1.0.arm",
        "shoot1.0.body",
        "shoot1.1.arm",
        "shoot1.1.body",
        "shoot2.0.arm",
        "shoot2.0.body",
        "shoot2.1.arm",
        "shoot2.1.body",
        "shoot2.2.arm",
        "shoot2.2.body",
        "shoot2.3.arm",
        "shoot2.3.body",
        "shoot2.4.arm",
        "shoot2.4.body",
        "shootF.0.arm",
        "shootF.0.body",
        "shootF.1.arm",
        "shootF.1.body",
        "sit.0.arm",
        "sit.0.body",
        "stabO1.0.arm",
        "stabO1.0.body",
        "stabO1.1.arm",
        "stabO1.1.body",
        "stabO2.0.arm",
        "stabO2.0.body",
        "stabO2.1.arm",
        "stabO2.1.body",
        "stabOF.0.arm",
        "stabOF.0.body",
        "stabOF.1.arm",
        "stabOF.1.body",
        "stabOF.2.arm",
        "stabOF.2.body",
        "stabT1.0.arm",
        "stabT1.0.body",
        "stabT1.0.hand",
        "stabT1.1.arm",
        "stabT1.1.body",
        "stabT1.1.hand",
        "stabT1.2.arm",
        "stabT1.2.body",
        "stabT1.2.hand",
        "stabT2.0.arm",
        "stabT2.0.body",
        "stabT2.0.hand",
        "stabT2.1.arm",
        "stabT2.1.body",
        "stabT2.1.hand",
        "stabT2.2.arm",
        "stabT2.2.body",
        "stabT2.2.hand",
        "stabTF.2.arm",
        "stabTF.2.armOverHair",
        "stabTF.2.body",
        "stand1.0.arm",
        "stand1.0.body",
        "stand1.1.arm",
        "stand1.1.body",
        "stand1.2.arm",
        "stand1.2.body",
        "stand2.0.arm",
        "stand2.0.body",
        "stand2.0.hand",
        "stand2.1.arm",
        "stand2.1.body",
        "stand2.1.hand",
        "stand2.2.arm",
        "stand2.2.body",
        "stand2.2.hand",
        "swingO1.0.arm",
        "swingO1.0.body",
        "swingO1.1.arm",
        "swingO1.1.body",
        "swingO1.2.arm",
        "swingO1.2.body",
        "swingO2.0.arm",
        "swingO2.0.body",
        "swingO2.1.arm",
        "swingO2.1.body",
        "swingO2.2.arm",
        "swingO2.2.body",
        "swingO3.0.arm",
        "swingO3.0.body",
        "swingO3.1.arm",
        "swingO3.1.body",
        "swingO3.2.arm",
        "swingO3.2.body",
        "swingOF.0.body",
        "swingOF.0.hand",
        "swingOF.1.body",
        "swingOF.2.body",
        "swingOF.3.arm",
        "swingOF.3.body",
        "swingP1.0.arm",
        "swingP1.0.armOverHair",
        "swingP1.0.body",
        "swingP1.1.arm",
        "swingP1.1.body",
        "swingP1.2.arm",
        "swingP1.2.body",
        "swingP2.0.arm",
        "swingP2.0.body",
        "swingP2.1.arm",
        "swingP2.1.body",
        "swingP2.2.arm",
        "swingP2.2.body",
        "swingPF.0.arm",
        "swingPF.0.body",
        "swingPF.0.hand",
        "swingPF.1.arm",
        "swingPF.1.body",
        "swingPF.1.hand",
        "swingPF.2.arm",
        "swingPF.2.armOverHair",
        "swingPF.2.body",
        "swingPF.3.arm",
        "swingPF.3.body",
        "swingT1.0.arm",
        "swingT1.0.armOverHair",
        "swingT1.0.body",
        "swingT1.1.arm",
        "swingT1.1.armOverHair",
        "swingT1.1.body",
        "swingT1.2.arm",
        "swingT1.2.body",
        "swingT2.0.body",

        "swingT2.1.arm",
        "swingT2.1.body",
        "swingT2.2.arm",
        "swingT2.2.body",
        "swingT3.0.arm",
        "swingT3.0.body",
        "swingT3.1.arm",
        "swingT3.1.body",
        "swingT3.2.arm",
        "swingT3.2.body",
        "swingTF.0.body",
        "swingTF.1.arm",
        "swingTF.1.body",
        "swingTF.2.arm",
        "swingTF.2.body",
        "swingTF.3.arm",
        "swingTF.3.body",
        "walk1.0.arm",
        "walk1.0.body",
        "walk1.1.arm",
        "walk1.1.body",
        "walk1.2.arm",
        "walk1.2.body",
        "walk1.3.arm",
        "walk1.3.body",
        "walk2.0.arm",
        "walk2.0.body",
        "walk2.0.hand",
        "walk2.1.arm",
        "walk2.1.body",
        "walk2.1.hand",
        "walk2.2.arm",
        "walk2.2.body",
        "walk2.2.hand",
        "walk2.3.arm",
        "walk2.3.body",
        "walk2.3.hand"
    ];

    export var mobList:Array<any> = [];

    export var skillList:Array<any> = [
        //主动技能预先载
        "000", "121", "132", "130", "122", "300", "410", "232", "312", "322", "131", "411"
        // , "100", "110", "111", "112",
        // "120", "121", "122",
        // "130", "131", "132",
        // "200", "210", "211", "212",
        // "220", "221", "222",
        // "230", "231", "232",
        // "300", "310", "311", "312",
        // "320", "321", "322",
        // "400", "410", "411", "412",
        // "420", "421", "422"
        // "500", "510", "511", "512",
        // "520", "521", "522",
        // "2700", "2710", "2711", "2712",
        // "3600", "3610", "3611", "3612",
        // "4100", "4110", "4111", "4112",
        // "6000", "6100", "6110", "6111", "6112",
        // "6400","6410","6411","6412",        //
        // "15200","15210","15211","15212",
        // "15500","15510","15511","15512",
        // "16400","16410","16411","16412",
        // // "4200", "4210", "4211", "4212",     //缺少阴阳师,林之灵110000
        // "14200", "14210", "14211", "14212",
        // "10100", "10110", "10111", "10112",
        // "6500", "6510", "6511", "6512",
        // "2100", "2110", "2111", "2112", //
        // "2200", "2210", "2211", "2212", "2213", "2214", "2215", "2216", "2217", "2218",
        // "2300", "2310", "2311", "2312",
        // "2400", "2410", "2411", "2412",
        // "2500", "2510", "2511", "2512",
        // "3100", "3110", "3111", "3112", //恶魔猎手
        // "3101", "3120", "3121", "3122", //恶魔复仇者
        // "3200", "3210", "3211", "3212",
        // "3300", "3310", "3311", "3312",
        // "3500", "3510", "3511", "3512",
        // "3700", "3710", "3711", "3712",
        // "330", "331", "332",    //古迹猎人
        // "430", "431", "432", "433", "434",
        // "530", "531", "532",
        // // "570", "571", "572",    //龙的传人
        // "1100", "1110", "1111", "1112",
        // "1200", "1210", "1211", "1212",//
        // "1300", "1310", "1311", "1312",
        // "1400", "1410", "1411", "1412",
        // "1500", "1510", "1511", "1512",
        // "5100", "5110", "5111", "5112"
    ];
    export var preSkillList:Array<any> = [
        "100",
        "110",
        "111",
        "112",
        "120",
        "200",
        "210",
        "211",
        "212",
        "220",
        "221",
        "222",
        "230",
        "231",
        "310",
        "311",
        "320",
        "321",
        "330",
        "331",
        "332",
        "400",
        "412",
        "420",
        "421",
        "422",
        "430",
        "431",
        "432",
        "433",
        "434",
        "500",
        "510",
        "511",
        "512",
        "520",
        "521",
        "522",
        "530",
        "531",
        "532",
        "1100",
        "1110",
        "1111",
        "1112",
        "1200",
        "1210",
        "1211",
        "1212",
        "1300",
        "1310",
        "1311",
        "1312",
        "1400",
        "1410",
        "1411",
        "1412",
        "1500",
        "1510",
        "1511",
        "1512",
        "2100",
        "2110",
        "2111",
        "2112",
        "2200",
        "2210",
        "2211",
        "2212",
        "2213",
        "2214",
        "2215",
        "2216",
        "2217",
        "2218",
        "2300",
        "2310",
        "2311",
        "2312",
        "2400",
        "2410",
        "2411",
        "2412",
        "2500",
        "2510",
        "2511",
        "2512",
        "2700",
        "2710",
        "2711",
        "2712",
        "3100",
        "3101",
        "3110",
        "3111",
        "3112",
        "3120",
        "3121",
        "3122",
        "3200",
        "3210",
        "3211",
        "3212",
        "3300",
        "3310",
        "3311",
        "3312",
        "3500",
        "3510",
        "3511",
        "3512",
        "3600",
        "3610",
        "3611",
        "3612",
        "3700",
        "3710",
        "3711",
        "3712",
        "4100",
        "4110",
        "4111",
        "4112",
        "5100",
        "5110",
        "5111",
        "5112",
        "6000",
        "6100",
        "6110",
        "6111",
        "6112",
        "6400",
        "6410",
        "6411",
        "6412",
        "6500",
        "6510",
        "6511",
        "6512",
        "10000",
        "10100",
        "10110",
        "10111",
        "10112",
        "14200",
        "14210",
        "14211",
        "14212",
        "15200",
        "15210",
        "15211",
        "15212",
        "15500",
        "15510",
        "15511",
        "15512",
        "16400",
        "16410",
        "16411",
        "16412",
        "60000",
        "60001",
        "60002",
        "60003",
        "60004",
        "60005",
        "60006",
        "60007",
        "60008",
        "60009",
        "60010"
    ];
    /*
    //新旧版(船长，冲锋队长)
    500 510 511 512
    520 521 522
    580 581 582
    590 591 592
    */

    export var _sound:string = "";
    export function playSound(id:string, loops?: number, complete?: Laya.Handler) {
        // if(!Laya.Browser.window["conch"]) {
        return Laya.SoundManager.playSound(id + ".wav", loops, complete);//收集H5是wav,pc网页是mp3
        // }
        // else {
        //     Laya.SoundManager.playSound(id + ".wav");//wav/ogg
        // }
    }
    export var _music:string = "";
    export function playMusic(id:string) : void {
        if(id != msMoudle._music) Laya.SoundManager.destroySound(msMoudle._music);
        msMoudle._music = id;
        Laya.SoundManager.playMusic(id);
    }

    export function getSexCoat(sex:number): string {
        if(sex == 0) return "01040002.img";
        else return "01041002.img";
    }
    export function getSexPants(sex:number): string {
        if(sex == 0) return "01060002.img";
        else return "01061001.img";
    }

    export function getSexHair(sex:number): string {
        if(sex == 0) return "00030020.img";
        else return "00031000.img";
    }

    //本地json数据
    export var characterjson:any;   //主角表
    export var shopjson:any;        //商店表
    export var itemjson:any;        //道具表
    export var guidejson:any;       //引导表
    export var storyjson:any;       //剧情表
    export var mobjson:any;         //关卡怪物表
    export var bossjson:any;        //Boss表
    export var worldbossjson:any;   //世界BOSS表
    export var herojson:any;        //英雄表
    export var skilljson:any;       //技能表
    export var cailiaojson:any;     //材料表
    export var dazaojson:any;       //打造表
    export var heishijson:any;      //黑市表
    export var qiangshenjson:any;   //强身表
    export var qiandaojson:any;     //签到表
    export var huodongjson:any;     //活动表
    export var petjson:any;         //宠物表
    export var tamingmobjson:any;   //坐骑表
    export var tujianjson:any;      //图鉴表
    export var zhuanpanjson:any;    //转盘表
    export var oxjson:any;          //ox表
    export var mubiaojson:any;      //目标表
    export var payjson:any;      //充值表
    export var maplejson:any;   //配置表

    //界面参数
    export var AllAfterimage:Array<any> = [
        "ancientBow","axe", "barehands", "bow", "cane", "cannon", "crossBow", "dualBow", "gun", "knuckle",
        "mace", "poleArm", "spear", "swordOL", "swordOS", "swordTF", "swordTK", "swordTL",
        "swordTS", "swordZB", "swordZL"
    ];
    export var AllAccessory1:Array<any> = [];
    export var AllAccessory2:Array<any> = [];
    export var AllAccessory3:Array<any> = [];
    export var AllAccessory4:Array<any> = [];
    export var AllAccessory5:Array<any> = [];
    export var AllAccessory6:Array<any> = [];
    export var AllBody:Array<any> = [
        "00002001",
        "00002002",
        "00002003",
        "00002004",
        "00002006",
        "00002007",
        "00002008",
        "00002009",
        "00002010",
        "00002011",
    ];
    export var AllHead:Array<any> = [
        "00012001",
        "00012002",
        "00012003",
        "00012004",
        "00012006",
        "00012007",
        "00012008",
        "00012009",
        "00012010",
        "00012011",
    ];
    export var AllFace:Array<any> = [
        "00020000",
        "00020001",
        "00020002",
        "00020003",
        "00020004",
        "00020005",
        "00020006",
        "00020007",
        "00020008",
        "00020009",
        "00020010",
        "00020011",
        "00020013",
        "00020014",
        "00020015",
        "00020016",
        "00020017",
        "00020018",
        "00020019",
        "00020020",
        "00020021",
        "00020022",
        "00020023",
        "00020024",
        "00020025",
        "00020026",
        "00020027",
        "00020028",
        "00020029",
        "00020100",
        "00020101",
        "00020102",
        "00020103",
        "00020104",
        "00020105",
        "00020106",
        "00020107",
        "00020108",
        "00020109",
        "00020110",
        "00020111",
        "00020112",
        "00020113",
        "00020114",
        "00020115",
        "00020117",
        "00020118",
        "00020119",
        "00020120",
        "00020121",
        "00020122",
        "00020123",
        "00020124",
        "00020125",
        "00020126",
        "00020127",
        "00020128",
        "00020129",
        "00020200",
        "00020201",
        "00020202",
        "00020203",
        "00020204",
        "00020205",
        "00020206",
        "00020207",
        "00020208",
        "00020209",
        "00020210",
        "00020211",
        "00020212",
        "00020213",
        "00020214",
        "00020215",
        "00020216",
        "00020217",
        "00020218",
        "00020219",
        "00020220",
        "00020221",
        "00020222",
        "00020223",
        "00020224",
        "00020225",
        "00020226",
        "00020227",
        "00020228",
        "00020229",
        "00020300",
        "00020301",
        "00020302",
        "00020303",
        "00020304",
        "00020305",
        "00020306",
        "00020307",
        "00020308",
        "00020309",
        "00020310",
        "00020311",
        "00020312",
        "00020313",
        "00020314",
        "00020315",
        "00020316",
        "00020317",
        "00020318",
        "00020319",
        "00020320",
        "00020321",
        "00020322",
        "00020323",
        "00020324",
        "00020325",
        "00020326",
        "00020327",
        "00020328",
        "00020329",
        "00020400",
        "00020401",
        "00020402",
        "00020403",
        "00020404",
        "00020405",
        "00020406",
        "00020407",
        "00020408",
        "00020409",
        "00020410",
        "00020411",
        "00020412",
        "00020413",
        "00020414",
        "00020415",
        "00020416",
        "00020417",
        "00020418",
        "00020419",
        "00020420",
        "00020421",
        "00020422",
        "00020423",
        "00020424",
        "00020425",
        "00020426",
        "00020427",
        "00020428",
        "00020429",
        "00020500",
        "00020501",
        "00020502",
        "00020503",
        "00020504",
        "00020505",
        "00020506",
        "00020507",
        "00020508",
        "00020509",
        "00020510",
        "00020511",
        "00020512",
        "00020513",
        "00020514",
        "00020515",
        "00020516",
        "00020517",
        "00020518",
        "00020519",
        "00020520",
        "00020521",
        "00020522",
        "00020523",
        "00020524",
        "00020525",
        "00020526",
        "00020527",
        "00020528",
        "00020529",
        "00020600",
        "00020601",
        "00020602",
        "00020603",
        "00020604",
        "00020605",
        "00020606",
        "00020607",
        "00020608",
        "00020609",
        "00020610",
        "00020611",
        "00020612",
        "00020613",
        "00020614",
        "00020615",
        "00020616",
        "00020617",
        "00020618",
        "00020619",
        "00020620",
        "00020621",
        "00020622",
        "00020623",
        "00020624",
        "00020625",
        "00020626",
        "00020627",
        "00020628",
        "00020629",
        "00020700",
        "00020701",
        "00020702",
        "00020703",
        "00020704",
        "00020705",
        "00020706",
        "00020707",
        "00020708",
        "00020709",
        "00020710",
        "00020711",
        "00020712",
        "00020713",
        "00020714",
        "00020715",
        "00020716",
        "00020717",
        "00020718",
        "00020719",
        "00020720",
        "00020721",
        "00020722",
        "00020723",
        "00020724",
        "00020725",
        "00020726",
        "00020727",
        "00020728",
        "00020729",
        "00020800",
        "00020801",
        "00020802",
        "00020803",
        "00020804",
        "00020805",
        "00020806",
        "00020807",
        "00020808",
        "00020809",
        "00020810",
        "00020811",
        "00020812",
        "00020813",
        "00020814",
        "00020816",
        "00020817",
        "00020818",
        "00020819",
        "00020820",
        "00020821",
        "00020822",
        "00020823",
        "00020824",
        "00020826",
        "00021000",
        "00021001",
        "00021002",
        "00021003",
        "00021004",
        "00021005",
        "00021006",
        "00021007",
        "00021008",
        "00021009",
        "00021010",
        "00021011",
        "00021012",
        "00021013",
        "00021014",
        "00021015",
        "00021016",
        "00021017",
        "00021018",
        "00021019",
        "00021020",
        "00021021",
        "00021022",
        "00021023",
        "00021024",
        "00021025",
        "00021026",
        "00021027",
        "00021100",
        "00021101",
        "00021102",
        "00021103",
        "00021104",
        "00021105",
        "00021106",
        "00021107",
        "00021108",
        "00021109",
        "00021110",
        "00021111",
        "00021112",
        "00021113",
        "00021114",
        "00021115",
        "00021116",
        "00021117",
        "00021118",
        "00021119",
        "00021120",
        "00021121",
        "00021122",
        "00021123",
        "00021124",
        "00021125",
        "00021126",
        "00021127",
        "00021200",
        "00021201",
        "00021202",
        "00021203",
        "00021204",
        "00021205",
        "00021206",
        "00021207",
        "00021208",
        "00021209",
        "00021210",
        "00021211",
        "00021212",
        "00021213",
        "00021214",
        "00021215",
        "00021216",
        "00021217",
        "00021218",
        "00021219",
        "00021220",
        "00021221",
        "00021222",
        "00021223",
        "00021224",
        "00021225",
        "00021226",
        "00021227",
        "00021300",
        "00021301",
        "00021302",
        "00021303",
        "00021304",
        "00021305",
        "00021306",
        "00021307",
        "00021308",
        "00021309",
        "00021310",
        "00021311",
        "00021312",
        "00021313",
        "00021314",
        "00021315",
        "00021316",
        "00021317",
        "00021318",
        "00021319",
        "00021320",
        "00021321",
        "00021322",
        "00021323",
        "00021324",
        "00021325",
        "00021326",
        "00021327",
        "00021400",
        "00021401",
        "00021402",
        "00021403",
        "00021404",
        "00021405",
        "00021406",
        "00021407",
        "00021408",
        "00021409",
        "00021410",
        "00021411",
        "00021412",
        "00021413",
        "00021414",
        "00021415",
        "00021416",
        "00021417",
        "00021418",
        "00021419",
        "00021420",
        "00021421",
        "00021422",
        "00021423",
        "00021424",
        "00021425",
        "00021426",
        "00021427",
        "00021500",
        "00021501",
        "00021502",
        "00021503",
        "00021504",
        "00021505",
        "00021506",
        "00021507",
        "00021508",
        "00021509",
        "00021510",
        "00021511",
        "00021512",
        "00021513",
        "00021514",
        "00021515",
        "00021516",
        "00021517",
        "00021518",
        "00021519",
        "00021520",
        "00021521",
        "00021522",
        "00021523",
        "00021524",
        "00021525",
        "00021526",
        "00021527",
        "00021600",
        "00021601",
        "00021602",
        "00021603",
        "00021604",
        "00021605",
        "00021606",
        "00021607",
        "00021608",
        "00021609",
        "00021610",
        "00021611",
        "00021612",
        "00021613",
        "00021614",
        "00021615",
        "00021616",
        "00021617",
        "00021618",
        "00021619",
        "00021620",
        "00021621",
        "00021622",
        "00021623",
        "00021624",
        "00021625",
        "00021626",
        "00021627",
        "00021700",
        "00021701",
        "00021702",
        "00021703",
        "00021704",
        "00021705",
        "00021706",
        "00021707",
        "00021708",
        "00021709",
        "00021710",
        "00021711",
        "00021712",
        "00021713",
        "00021714",
        "00021715",
        "00021716",
        "00021717",
        "00021718",
        "00021719",
        "00021720",
        "00021721",
        "00021722",
        "00021723",
        "00021724",
        "00021725",
        "00021726",
        "00021727",
        "00021800",
        "00021801",
        "00021802",
        "00021803",
        "00021804",
        "00021805",
        "00021806",
        "00021807",
        "00021808",
        "00021809",
        "00021810",
        "00021811",
        "00021812",
        "00021813",
        "00021814",
        "00021816",
        "00021817",
        "00021818",
        "00021819",
        "00021821",
        "00021822",
        "00021824",
        "00021825",
        "00021826"
    ];
    export var AllCoat:Array<any> = [];
    export var AllPants:Array<any> = [];
    export var AllShoes:Array<any> = [];
    export var AllGlove:Array<any> = [];
    export var AllCap:Array<any> = [];
    export var AllHair:Array<any> = [
        "00030000",
        "00030001",
        "00030002",
        "00030003",
        "00030004",
        "00030005",
        "00030006",
        "00030007",
        "00030010",
        "00030021",
        "00030022",
        "00030023",
        "00030024",
        "00030025",
        "00030026",
        "00030027",
        "00030030",
        "00030031",
        "00030032",
        "00030033",
        "00030034",
        "00030035",
        "00030036",
        "00030037",
        "00030040",
        "00030041",
        "00030042",
        "00030043",
        "00030044",
        "00030045",
        "00030046",
        "00030047",
        "00030050",
        "00030051",
        "00030052",
        "00030053",
        "00030054",
        "00030055",
        "00030056",
        "00030057",
        "00030060",
        "00030061",
        "00030062",
        "00030063",
        "00030064",
        "00030065",
        "00030066",
        "00030067",
        "00030070",
        "00030080",
        "00030090",
        "00030100",
        "00030101",
        "00030102",
        "00030103",
        "00030104",
        "00030105",
        "00030106",
        "00030107",
        "00030110",
        "00030111",
        "00030112",
        "00030113",
        "00030114",
        "00030115",
        "00030116",
        "00030117",
        "00030120",
        "00030121",
        "00030122",
        "00030123",
        "00030124",
        "00030125",
        "00030126",
        "00030127",
        "00030130",
        "00030131",
        "00030132",
        "00030133",
        "00030134",
        "00030135",
        "00030136",
        "00030137",
        "00030140",
        "00030141",
        "00030142",
        "00030143",
        "00030144",
        "00030146",
        "00030147",
        "00030150",
        "00030151",
        "00030152",
        "00030153",
        "00030154",
        "00030155",
        "00030156",
        "00030157",
        "00030160",
        "00030161",
        "00030162",
        "00030163",
        "00030164",
        "00030165",
        "00030166",
        "00030167",
        "00030170",
        "00030171",
        "00030172",
        "00030173",
        "00030174",
        "00030175",
        "00030176",
        "00030177",
        "00030180",
        "00030181",
        "00030182",
        "00030183",
        "00030184",
        "00030185",
        "00030186",
        "00030187",
        "00030190",
        "00030191",
        "00030192",
        "00030193",
        "00030194",
        "00030195",
        "00030196",
        "00030197",
        "00030200",
        "00030201",
        "00030202",
        "00030203",
        "00030204",
        "00030205",
        "00030206",
        "00030207",
        "00030210",
        "00030211",
        "00030212",
        "00030213",
        "00030214",
        "00030215",
        "00030216",
        "00030217",
        "00030220",
        "00030221",
        "00030222",
        "00030223",
        "00030224",
        "00030225",
        "00030226",
        "00030227",
        "00030230",
        "00030231",
        "00030232",
        "00030233",
        "00030234",
        "00030235",
        "00030236",
        "00030237",
        "00030240",
        "00030241",
        "00030242",
        "00030243",
        "00030244",
        "00030245",
        "00030246",
        "00030247",
        "00030250",
        "00030251",
        "00030252",
        "00030253",
        "00030254",
        "00030255",
        "00030256",
        "00030257",
        "00030260",
        "00030261",
        "00030262",
        "00030263",
        "00030264",
        "00030265",
        "00030266",
        "00030267",
        "00030270",
        "00030271",
        "00030272",
        "00030273",
        "00030274",
        "00030275",
        "00030276",
        "00030277",
        "00030280",
        "00030281",
        "00030282",
        "00030283",
        "00030284",
        "00030285",
        "00030286",
        "00030287",
        "00030290",
        "00030291",
        "00030292",
        "00030293",
        "00030294",
        "00030295",
        "00030296",
        "00030297",
        "00030300",
        "00030301",
        "00030302",
        "00030303",
        "00030304",
        "00030305",
        "00030306",
        "00030307",
        "00030310",
        "00030311",
        "00030312",
        "00030313",
        "00030314",
        "00030315",
        "00030316",
        "00030317",
        "00030320",
        "00030321",
        "00030322",
        "00030323",
        "00030324",
        "00030325",
        "00030326",
        "00030327",
        "00030330",
        "00030331",
        "00030332",
        "00030333",
        "00030334",
        "00030335",
        "00030336",
        "00030337",
        "00030340",
        "00030341",
        "00030342",
        "00030343",
        "00030344",
        "00030345",
        "00030346",
        "00030347",
        "00030350",
        "00030351",
        "00030352",
        "00030353",
        "00030354",
        "00030355",
        "00030356",
        "00030357",
        "00030360",
        "00030361",
        "00030362",
        "00030363",
        "00030364",
        "00030365",
        "00030366",
        "00030367",
        "00030370",
        "00030371",
        "00030372",
        "00030373",
        "00030374",
        "00030375",
        "00030376",
        "00030377",
        "00030400",
        "00030401",
        "00030402",
        "00030403",
        "00030404",
        "00030405",
        "00030406",
        "00030407",
        "00030410",
        "00030411",
        "00030412",
        "00030413",
        "00030414",
        "00030415",
        "00030416",
        "00030417",
        "00030420",
        "00030421",
        "00030422",
        "00030423",
        "00030424",
        "00030425",
        "00030426",
        "00030427",
        "00030440",
        "00030441",
        "00030442",
        "00030443",
        "00030444",
        "00030445",
        "00030446",
        "00030447",
        "00030450",
        "00030451",
        "00030452",
        "00030453",
        "00030454",
        "00030455",
        "00030456",
        "00030457",
        "00030460",
        "00030461",
        "00030462",
        "00030463",
        "00030464",
        "00030465",
        "00030466",
        "00030467",
        "00030470",
        "00030471",
        "00030472",
        "00030473",
        "00030474",
        "00030475",
        "00030476",
        "00030477",
        "00030480",
        "00030481",
        "00030482",
        "00030483",
        "00030484",
        "00030485",
        "00030486",
        "00030487",
        "00030490",
        "00030491",
        "00030492",
        "00030493",
        "00030494",
        "00030495",
        "00030496",
        "00030497",
        "00030510",
        "00030511",
        "00030512",
        "00030513",
        "00030514",
        "00030515",
        "00030516",
        "00030517",
        "00030520",
        "00030521",
        "00030522",
        "00030523",
        "00030524",
        "00030525",
        "00030526",
        "00030527",
        "00030530",
        "00030531",
        "00030532",
        "00030533",
        "00030534",
        "00030535",
        "00030536",
        "00030537",
        "00030540",
        "00030541",
        "00030542",
        "00030543",
        "00030544",
        "00030545",
        "00030546",
        "00030547",
        "00030550",
        "00030551",
        "00030552",
        "00030553",
        "00030554",
        "00030555",
        "00030556",
        "00030557",
        "00030560",
        "00030561",
        "00030562",
        "00030563",
        "00030564",
        "00030565",
        "00030566",
        "00030567",
        "00030600",
        "00030601",
        "00030602",
        "00030603",
        "00030604",
        "00030605",
        "00030606",
        "00030607",
        "00030610",
        "00030611",
        "00030612",
        "00030613",
        "00030614",
        "00030615",
        "00030616",
        "00030617",
        "00030620",
        "00030621",
        "00030622",
        "00030623",
        "00030624",
        "00030625",
        "00030626",
        "00030627",
        "00030630",
        "00030631",
        "00030632",
        "00030633",
        "00030634",
        "00030635",
        "00030636",
        "00030637",
        "00030640",
        "00030641",
        "00030642",
        "00030643",
        "00030644",
        "00030645",
        "00030646",
        "00030647",
        "00030650",
        "00030651",
        "00030652",
        "00030653",
        "00030654",
        "00030655",
        "00030656",
        "00030657",
        "00030660",
        "00030661",
        "00030662",
        "00030663",
        "00030664",
        "00030665",
        "00030666",
        "00030667",
        "00030670",
        "00030671",
        "00030672",
        "00030673",
        "00030674",
        "00030675",
        "00030676",
        "00030677",
        "00030680",
        "00030681",
        "00030682",
        "00030683",
        "00030684",
        "00030685",
        "00030686",
        "00030687",
        "00030700",
        "00030701",
        "00030702",
        "00030703",
        "00030704",
        "00030705",
        "00030706",
        "00030707",
        "00030710",
        "00030711",
        "00030712",
        "00030713",
        "00030714",
        "00030715",
        "00030716",
        "00030717",
        "00030720",
        "00030721",
        "00030722",
        "00030723",
        "00030724",
        "00030725",
        "00030726",
        "00030727",
        "00030730",
        "00030731",
        "00030732",
        "00030733",
        "00030734",
        "00030735",
        "00030736",
        "00030737",
        "00030740",
        "00030741",
        "00030742",
        "00030743",
        "00030744",
        "00030745",
        "00030746",
        "00030747",
        "00030750",
        "00030751",
        "00030752",
        "00030753",
        "00030754",
        "00030755",
        "00030756",
        "00030757",
        "00030760",
        "00030761",
        "00030762",
        "00030763",
        "00030764",
        "00030765",
        "00030766",
        "00030767",
        "00030770",
        "00030771",
        "00030772",
        "00030773",
        "00030774",
        "00030775",
        "00030776",
        "00030777",
        "00030780",
        "00030781",
        "00030782",
        "00030783",
        "00030784",
        "00030785",
        "00030786",
        "00030787",
        "00030790",
        "00030791",
        "00030792",
        "00030793",
        "00030794",
        "00030795",
        "00030796",
        "00030797",
        "00030800",
        "00030801",
        "00030802",
        "00030803",
        "00030804",
        "00030805",
        "00030806",
        "00030807",
        "00030810",
        "00030811",
        "00030812",
        "00030813",
        "00030814",
        "00030815",
        "00030816",
        "00030817",
        "00030820",
        "00030821",
        "00030822",
        "00030823",
        "00030824",
        "00030825",
        "00030826",
        "00030827",
        "00030830",
        "00030831",
        "00030832",
        "00030833",
        "00030834",
        "00030835",
        "00030836",
        "00030837",
        "00030840",
        "00030841",
        "00030842",
        "00030843",
        "00030844",
        "00030845",
        "00030846",
        "00030847",
        "00030850",
        "00030851",
        "00030852",
        "00030853",
        "00030854",
        "00030855",
        "00030856",
        "00030857",
        "00030860",
        "00030861",
        "00030862",
        "00030863",
        "00030864",
        "00030865",
        "00030866",
        "00030867",
        "00030870",
        "00030871",
        "00030872",
        "00030873",
        "00030874",
        "00030875",
        "00030876",
        "00030877",
        "00030880",
        "00030881",
        "00030882",
        "00030883",
        "00030884",
        "00030885",
        "00030886",
        "00030887",
        "00030890",
        "00030891",
        "00030892",
        "00030893",
        "00030894",
        "00030895",
        "00030896",
        "00030897",
        "00030900",
        "00030901",
        "00030902",
        "00030903",
        "00030904",
        "00030905",
        "00030906",
        "00030907",
        "00030910",
        "00030911",
        "00030912",
        "00030913",
        "00030914",
        "00030915",
        "00030916",
        "00030917",
        "00030920",
        "00030921",
        "00030922",
        "00030923",
        "00030924",
        "00030926",
        "00030927",
        "00030928",
        "00030930",
        "00030931",
        "00030932",
        "00030933",
        "00030934",
        "00030935",
        "00030936",
        "00030937",
        "00030940",
        "00030941",
        "00030942",
        "00030943",
        "00030944",
        "00030945",
        "00030946",
        "00030947",
        "00030950",
        "00030951",
        "00030952",
        "00030953",
        "00030954",
        "00030955",
        "00030956",
        "00030957",
        "00030990",
        "00030991",
        "00030992",
        "00030993",
        "00030994",
        "00030995",
        "00030996",
        "00030997",
        "00031001",
        "00031002",
        "00031003",
        "00031004",
        "00031005",
        "00031006",
        "00031007",
        "00031010",
        "00031011",
        "00031012",
        "00031013",
        "00031014",
        "00031015",
        "00031016",
        "00031017",
        "00031020",
        "00031021",
        "00031022",
        "00031023",
        "00031024",
        "00031025",
        "00031026",
        "00031027",
        "00031030",
        "00031031",
        "00031032",
        "00031033",
        "00031034",
        "00031035",
        "00031036",
        "00031037",
        "00031040",
        "00031041",
        "00031042",
        "00031043",
        "00031044",
        "00031045",
        "00031046",
        "00031047",
        "00031050",
        "00031051",
        "00031052",
        "00031053",
        "00031054",
        "00031055",
        "00031056",
        "00031057",
        "00031060",
        "00031061",
        "00031062",
        "00031063",
        "00031064",
        "00031065",
        "00031066",
        "00031067",
        "00031070",
        "00031071",
        "00031072",
        "00031073",
        "00031074",
        "00031075",
        "00031076",
        "00031077",
        "00031080",
        "00031081",
        "00031082",
        "00031083",
        "00031084",
        "00031085",
        "00031086",
        "00031087",
        "00031090",
        "00031091",
        "00031092",
        "00031093",
        "00031094",
        "00031095",
        "00031096",
        "00031097",
        "00031100",
        "00031101",
        "00031102",
        "00031103",
        "00031104",
        "00031105",
        "00031106",
        "00031107",
        "00031110",
        "00031111",
        "00031112",
        "00031113",
        "00031114",
        "00031115",
        "00031116",
        "00031117",
        "00031120",
        "00031121",
        "00031122",
        "00031123",
        "00031124",
        "00031125",
        "00031126",
        "00031127",
        "00031130",
        "00031131",
        "00031132",
        "00031133",
        "00031134",
        "00031135",
        "00031136",
        "00031137",
        "00031140",
        "00031141",
        "00031142",
        "00031143",
        "00031144",
        "00031145",
        "00031146",
        "00031147",
        "00031150",
        "00031151",
        "00031152",
        "00031153",
        "00031154",
        "00031155",
        "00031156",
        "00031157",
        "00031160",
        "00031161",
        "00031162",
        "00031163",
        "00031164",
        "00031165",
        "00031166",
        "00031167",
        "00031170",
        "00031171",
        "00031172",
        "00031173",
        "00031174",
        "00031175",
        "00031176",
        "00031177",
        "00031180",
        "00031181",
        "00031182",
        "00031183",
        "00031184",
        "00031185",
        "00031186",
        "00031187",
        "00031190",
        "00031191",
        "00031192",
        "00031193",
        "00031194",
        "00031195",
        "00031196",
        "00031197",
        "00031200",
        "00031201",
        "00031202",
        "00031203",
        "00031204",
        "00031205",
        "00031206",
        "00031207",
        "00031210",
        "00031211",
        "00031212",
        "00031213",
        "00031214",
        "00031215",
        "00031216",
        "00031217",
        "00031220",
        "00031221",
        "00031222",
        "00031223",
        "00031224",
        "00031225",
        "00031226",
        "00031227",
        "00031230",
        "00031231",
        "00031232",
        "00031233",
        "00031234",
        "00031235",
        "00031236",
        "00031237",
        "00031240",
        "00031241",
        "00031242",
        "00031243",
        "00031244",
        "00031245",
        "00031246",
        "00031247",
        "00031250",
        "00031251",
        "00031252",
        "00031253",
        "00031254",
        "00031255",
        "00031256",
        "00031257",
        "00031260",
        "00031261",
        "00031262",
        "00031263",
        "00031264",
        "00031265",
        "00031266",
        "00031267",
        "00031270",
        "00031271",
        "00031272",
        "00031273",
        "00031274",
        "00031275",
        "00031276",
        "00031277",
        "00031280",
        "00031281",
        "00031282",
        "00031283",
        "00031284",
        "00031285",
        "00031286",
        "00031287",
        "00031290",
        "00031291",
        "00031292",
        "00031293",
        "00031294",
        "00031295",
        "00031296",
        "00031297",
        "00031300",
        "00031301",
        "00031302",
        "00031303",
        "00031304",
        "00031305",
        "00031306",
        "00031307",
        "00031310",
        "00031311",
        "00031312",
        "00031313",
        "00031314",
        "00031315",
        "00031316",
        "00031317",
        "00031320",
        "00031321",
        "00031322",
        "00031323",
        "00031324",
        "00031325",
        "00031326",
        "00031327",
        "00031330",
        "00031331",
        "00031332",
        "00031333",
        "00031334",
        "00031335",
        "00031336",
        "00031337",
        "00031340",
        "00031341",
        "00031342",
        "00031343",
        "00031344",
        "00031345",
        "00031346",
        "00031347",
        "00031350",
        "00031351",
        "00031352",
        "00031353",
        "00031354",
        "00031355",
        "00031356",
        "00031357",
        "00031400",
        "00031401",
        "00031402",
        "00031403",
        "00031404",
        "00031405",
        "00031406",
        "00031407",
        "00031410",
        "00031411",
        "00031412",
        "00031413",
        "00031414",
        "00031415",
        "00031416",
        "00031417",
        "00031420",
        "00031421",
        "00031422",
        "00031423",
        "00031424",
        "00031425",
        "00031426",
        "00031427",
        "00031440",
        "00031441",
        "00031442",
        "00031443",
        "00031444",
        "00031445",
        "00031446",
        "00031447",
        "00031450",
        "00031451",
        "00031452",
        "00031453",
        "00031454",
        "00031455",
        "00031456",
        "00031457",
        "00031460",
        "00031461",
        "00031462",
        "00031463",
        "00031464",
        "00031465",
        "00031466",
        "00031467",
        "00031470",
        "00031471",
        "00031472",
        "00031473",
        "00031474",
        "00031475",
        "00031476",
        "00031477",
        "00031480",
        "00031481",
        "00031482",
        "00031483",
        "00031484",
        "00031485",
        "00031486",
        "00031487",
        "00031490",
        "00031491",
        "00031492",
        "00031493",
        "00031494",
        "00031495",
        "00031496",
        "00031497",
        "00031510",
        "00031511",
        "00031512",
        "00031513",
        "00031514",
        "00031515",
        "00031516",
        "00031517",
        "00031520",
        "00031521",
        "00031522",
        "00031523",
        "00031524",
        "00031525",
        "00031526",
        "00031527",
        "00031530",
        "00031531",
        "00031532",
        "00031533",
        "00031534",
        "00031535",
        "00031536",
        "00031537",
        "00031540",
        "00031541",
        "00031542",
        "00031543",
        "00031544",
        "00031545",
        "00031546",
        "00031547",
        "00031550",
        "00031551",
        "00031552",
        "00031553",
        "00031554",
        "00031555",
        "00031556",
        "00031557",
        "00031560",
        "00031561",
        "00031562",
        "00031563",
        "00031564",
        "00031565",
        "00031566",
        "00031567",
        "00031610",
        "00031611",
        "00031612",
        "00031613",
        "00031614",
        "00031615",
        "00031616",
        "00031617",
        "00031620",
        "00031621",
        "00031622",
        "00031623",
        "00031624",
        "00031625",
        "00031626",
        "00031627",
        "00031630",
        "00031631",
        "00031632",
        "00031633",
        "00031634",
        "00031635",
        "00031636",
        "00031637",
        "00031640",
        "00031641",
        "00031642",
        "00031643",
        "00031644",
        "00031645",
        "00031646",
        "00031647",
        "00031650",
        "00031651",
        "00031652",
        "00031653",
        "00031654",
        "00031655",
        "00031656",
        "00031657",
        "00031660",
        "00031661",
        "00031662",
        "00031663",
        "00031664",
        "00031665",
        "00031667",
        "00031670",
        "00031671",
        "00031672",
        "00031673",
        "00031674",
        "00031675",
        "00031676",
        "00031677",
        "00031680",
        "00031681",
        "00031682",
        "00031683",
        "00031684",
        "00031685",
        "00031686",
        "00031687",
        "00031690",
        "00031691",
        "00031692",
        "00031693",
        "00031694",
        "00031695",
        "00031696",
        "00031697",
        "00031700",
        "00031701",
        "00031702",
        "00031703",
        "00031704",
        "00031705",
        "00031706",
        "00031707",
        "00031710",
        "00031711",
        "00031712",
        "00031713",
        "00031714",
        "00031715",
        "00031716",
        "00031717",
        "00031720",
        "00031721",
        "00031722",
        "00031723",
        "00031724",
        "00031725",
        "00031726",
        "00031727",
        "00031730",
        "00031731",
        "00031732",
        "00031733",
        "00031734",
        "00031735",
        "00031736",
        "00031737",
        "00031740",
        "00031741",
        "00031742",
        "00031743",
        "00031744",
        "00031745",
        "00031746",
        "00031747",
        "00031750",
        "00031751",
        "00031752",
        "00031753",
        "00031754",
        "00031755",
        "00031756",
        "00031757",
        "00031760",
        "00031761",
        "00031762",
        "00031763",
        "00031764",
        "00031765",
        "00031766",
        "00031767",
        "00031770",
        "00031771",
        "00031772",
        "00031773",
        "00031774",
        "00031775",
        "00031776",
        "00031777",
        "00031780",
        "00031781",
        "00031782",
        "00031783",
        "00031784",
        "00031785",
        "00031786",
        "00031787",
        "00031790",
        "00031791",
        "00031792",
        "00031793",
        "00031794",
        "00031795",
        "00031796",
        "00031797",
        "00031800",
        "00031801",
        "00031802",
        "00031803",
        "00031804",
        "00031805",
        "00031806",
        "00031807",
        "00031810",
        "00031811",
        "00031812",
        "00031813",
        "00031814",
        "00031815",
        "00031816",
        "00031817",
        "00031820",
        "00031821",
        "00031822",
        "00031823",
        "00031824",
        "00031825",
        "00031826",
        "00031827",
        "00031830",
        "00031831",
        "00031832",
        "00031833",
        "00031834",
        "00031835",
        "00031836",
        "00031837",
        "00031840",
        "00031841",
        "00031842",
        "00031843",
        "00031844",
        "00031845",
        "00031846",
        "00031847",
        "00031850",
        "00031851",
        "00031852",
        "00031853",
        "00031854",
        "00031855",
        "00031856",
        "00031857",
        "00031860",
        "00031861",
        "00031862",
        "00031863",
        "00031864",
        "00031865",
        "00031866",
        "00031867",
        "00031870",
        "00031871",
        "00031872",
        "00031873",
        "00031874",
        "00031875",
        "00031876",
        "00031877",
        "00031880",
        "00031881",
        "00031882",
        "00031883",
        "00031884",
        "00031885",
        "00031886",
        "00031887",
        "00031890",
        "00031891",
        "00031892",
        "00031893",
        "00031894",
        "00031895",
        "00031896",
        "00031897",
        "00031910",
        "00031911",
        "00031912",
        "00031913",
        "00031914",
        "00031915",
        "00031916",
        "00031917",
        "00031920",
        "00031921",
        "00031922",
        "00031923",
        "00031924",
        "00031925",
        "00031926",
        "00031927",
        "00031930",
        "00031931",
        "00031932",
        "00031933",
        "00031934",
        "00031935",
        "00031936",
        "00031937",
        "00031940",
        "00031941",
        "00031942",
        "00031943",
        "00031944",
        "00031945",
        "00031946",
        "00031947",
        "00031950",
        "00031951",
        "00031952",
        "00031953",
        "00031954",
        "00031955",
        "00031956",
        "00031957",
        "00033000",
        "00033001",
        "00033002",
        "00033003",
        "00033004",
        "00033005",
        "00033006",
        "00033007",
        "00033030",
        "00033031",
        "00033032",
        "00033033",
        "00033034",
        "00033035",
        "00033036",
        "00033037",
        "00033040",
        "00033041",
        "00033042",
        "00033043",
        "00033044",
        "00033045",
        "00033046",
        "00033047",
        "00033050",
        "00033051",
        "00033052",
        "00033053",
        "00033054",
        "00033055",
        "00033056",
        "00033057",
        "00034000",
        "00034001",
        "00034002",
        "00034003",
        "00034004",
        "00034005",
        "00034006",
        "00034007",
        "00034010",
        "00034011",
        "00034012",
        "00034013",
        "00034014",
        "00034015",
        "00034016",
        "00034017",
        "00034040",
        "00034041",
        "00034042",
        "00034043",
        "00034045",
        "00034046",
        "00034047",
        "00034050",
        "00034051",
        "00034052",
        "00034053",
        "00034054",
        "00034055",
        "00034056",
        "00034057",
        "00034060",
        "00034061",
        "00034062",
        "00034063",
        "00034064",
        "00034065",
        "00034066",
        "00034067"
    ];
    //所有掉落装备
    export var AllWeapon:Array<any> = [];
    export var test_fweapon:Array<string> = [
        "01702000",
        "01702001",
        "01702002",
        "01702003",
        "01702004",
        "01702005",
        "01702006",
        "01702007",
        "01702008",
        "01702009",
        "01702010",
        "01702011",
        "01702012",
        "01702013",
        "01702014",
        "01702015",
        "01702016",
        "01702017",
        "01702018",
        "01702019",
        "01702020",
        "01702021",
        "01702022",
        "01702023",
        "01702024",
        "01702025",
        "01702026",
        "01702027",
        "01702028",
        "01702029",
        "01702030",
        "01702031",
        "01702032",
        "01702033",
        "01702034",
        "01702035",
        "01702036",
        "01702037",
        "01702038",
        "01702039",
        "01702040",
        "01702041",
        "01702042",
        "01702043",
        "01702044",
        "01702045",
        "01702046",
        "01702047",
        "01702048",
        "01702049",
        "01702050",
        "01702051",
        "01702055",
        "01702056",
        "01702057",
        "01702058",
        "01702059",
        "01702060",
        "01702061",
        "01702062",
        "01702063",
        "01702064",
        "01702065",
        "01702066",
        "01702067",
        "01702068",
        "01702069",
        "01702070",
        "01702071",
        "01702072",
        "01702073",
        "01702074",
        "01702078",
        "01702079",
        "01702080",
        "01702081",
        "01702082",
        "01702083",
        "01702084",
        "01702085",
        "01702086",
        "01702087",
        "01702088",
        "01702089",
        "01702090",
        "01702091",
        "01702092",
        "01702093",
        "01702094",
        "01702096",
        "01702098",
        "01702099",
        "01702100",
        "01702103",
        "01702104",
        "01702105",
        "01702106",
        "01702107",
        "01702108",
        "01702109",
        "01702110",
        "01702111",
        "01702112",
        "01702113",
        "01702114",
        "01702115",
        "01702116",
        "01702117",
        "01702118",
        "01702119",
        "01702120",
        "01702121",
        "01702122",
        "01702123",
        "01702124",
        "01702125",
        "01702127",
        "01702131",
        "01702132",
        "01702133",
        "01702134",
        "01702136",
        "01702138",
        "01702139",
        "01702140",
        "01702141",
        "01702142",
        "01702143",
        "01702144",
        "01702145",
        "01702146",
        "01702147",
        "01702148",
        "01702149",
        "01702150",
        "01702151",
        "01702152",
        "01702153",
        "01702154",
        "01702155",
        "01702157",
        "01702158",
        "01702159",
        "01702160",
        "01702162",
        "01702163",
        "01702164",
        "01702165",
        "01702166",
        "01702167",
        "01702168",
        "01702169",
        "01702170",
        "01702172",
        "01702173",
        "01702174",
        "01702177",
        "01702179",
        "01702180",
        "01702181",
        "01702182",
        "01702187",
        "01702188",
        "01702189",
        "01702190",
        "01702191",
        "01702195",
        "01702196",
        "01702199",
        "01702200",
        "01702201",
        "01702202",
        "01702203",
        "01702207",
        "01702209",
        "01702210",
        "01702211",
        "01702212",
        "01702213",
        "01702216",
        "01702217",
        "01702218",
        "01702219",
        "01702221",
        "01702222",
        "01702224",
        "01702226",
        "01702228",
        "01702229",
        "01702230",
        "01702232",
        "01702233",
        "01702235",
        "01702237",
        "01702238",
        "01702239",
        "01702240",
        "01702248",
        "01702249",
        "01702250",
        "01702251",
        "01702323",
        "01702375",
        "01702400",
        "01702423",
        "01702433",
        "01702437",
        "01702444",
        "01702529",
        "01702565"
    ];

    export var AllLongCoat:Array<any> = [];
    export var AllCape:Array<any> = [];
    export var AllShield:Array<any> = [];
    //所有卷轴
    //单手剑
    export var AllJuanZhous1:Array<any> = [
        // "2043000",  //单手剑攻击卷轴   成功率100
        "2043001",  //单手剑攻击卷轴   成功率60
        "2043002",  //单手剑攻击卷轴   成功率10
        // "2043003",  //单手剑攻击必成卷
        // "2043004",  //单手剑攻击诅咒卷轴 成功率70
        // "2043005",  //单手剑攻击诅咒卷轴 成功率30
        // "2043006",  //单手剑魔力诅咒卷轴70
        // "2043007",  //单手剑魔力诅咒卷轴30
        "2043008",  //单手剑魔力卷轴10
        "2043009",  //单手剑魔力卷轴60
        // "2043010",  //单手剑魔力卷轴100
        "2043011",  //单手剑攻击卷轴 成功率65
        "2043012"   //单手剑攻击卷轴 成功率：15
    ];
    //双手剑
    export var AllJuanZhous14:Array<any> = [
        // "2044000",    //双手剑攻击卷轴</td></tr>
        "2044001",    //双手剑攻击卷轴</td></tr>
        "2044002",    //双手剑攻击卷轴</td></tr>
        // "2044003",    //双手剑攻击必成卷</td></tr>
        // "2044004",    //双手剑攻击诅咒卷轴</td></tr>
        // "2044005",    //双手剑攻击诅咒卷轴</td></tr>
        "2044006",    //双手剑攻击卷轴</td></tr>
        "2044007"    //双手剑攻击卷轴</td></tr>
    ];
    //枪
    export var AllJuanZhous15:Array<any> = [
        // "2044300",    //枪攻击卷轴</td></tr>
        "2044301",    //枪攻击卷轴</td></tr>
        "2044302",    //枪攻击卷轴</td></tr>
        // "2044303",    //枪攻击必成卷</td></tr>
        // "2044304",    //枪攻击诅咒卷轴</td></tr>
        // "2044305",    //枪攻击诅咒卷轴</td></tr>
        "2044306",    //枪攻击卷轴</td></tr>
        "2044307"    //枪攻击卷轴</td></tr>
    ];
    //矛
    export var AllJuanZhous16:Array<any> = [
        // "2044400",    //矛攻击卷轴</td></tr>
        "2044401",    //矛攻击卷轴</td></tr>
        "2044402",    //矛攻击卷轴</td></tr>
        // "2044403",    //矛攻击必成卷</td></tr>
        // "2044404",    //矛攻击诅咒卷轴</td></tr>
        // "2044405",    //矛攻击诅咒卷轴</td></tr>
        "2044406",    //矛攻击卷轴</td></tr>
        "2044407"    //矛攻击卷轴</td></tr>
    ];
    //单手钝器
    export var AllJuanZhous17:Array<any> = [
        // "2043200",    //单手钝器攻击卷轴</td></tr>
        "2043201",    //单手钝器攻击卷轴</td></tr>
        "2043202",    //单手钝器攻击卷轴</td></tr>
        // "2043203",    //单手钝器攻击必成卷</td></tr>
        // "2043204",    //单手钝器攻击诅咒卷轴</td></tr>
        // "2043205",    //单手钝器攻击诅咒卷轴</td></tr>
        "2043206",    //单手钝器攻击卷轴</td></tr>
        "2043207"    //单手钝器攻击卷轴</td></tr>
    ];
    //双手钝器
    export var AllJuanZhous18:Array<any> = [
        // "2044200",    //双手钝器攻击卷轴</td></tr>
        "2044201",    //双手钝器攻击卷轴</td></tr>
        "2044202",    //双手钝器攻击卷轴</td></tr>
        // "2044203",    //双手钝器攻击必成卷</td></tr>
        // "2044204",    //双手钝器攻击诅咒卷轴</td></tr>
        // "2044205",    //双手钝器攻击诅咒卷轴</td></tr>
        "2044206",    //双手钝器攻击卷轴</td></tr>
        "2044207"    //双手钝器攻击卷轴</td></tr>
    ];
    //单手斧
    export var AllJuanZhous19:Array<any> = [
        // "2043100",    //单手斧攻击卷轴</td></tr>
        "2043101",    //单手斧攻击卷轴</td></tr>
        "2043102",    //单手斧攻击卷轴</td></tr>
        // "2043103",    //单手斧攻击必成卷</td></tr>
        // "2043104",    //单手斧攻击诅咒卷轴</td></tr>
        // "2043105",    //单手斧攻击诅咒卷轴</td></tr>
        "2043106",    //单手斧攻击卷轴</td></tr>
        "2043107"    //单手斧攻击卷轴</td></tr>
    ];
    //双手斧
    export var AllJuanZhous20:Array<any> = [
        // "2044100",    //双手斧攻击卷轴</td></tr>
        "2044101",    //双手斧攻击卷轴</td></tr>
        "2044102",    //双手斧攻击卷轴</td></tr>
        // "2044103",    //双手斧攻击必成卷</td></tr>
        // "2044104",    //双手斧攻击诅咒卷轴</td></tr>
        // "2044105",    //双手斧攻击诅咒卷轴</td></tr>
        "2044106",    //双手斧攻击卷轴</td></tr>
        "2044107"    //双手斧攻击卷轴</td></tr>
    ];
    //弩
    export var AllJuanZhous21:Array<any> = [
        // "2044600",    //弩攻击卷轴</td></tr>
        "2044601",    //弩攻击卷轴</td></tr>
        "2044602",    //弩攻击卷轴</td></tr>
        // "2044603",    //弩攻击必成卷</td></tr>
        // "2044604",    //弩攻击诅咒卷轴</td></tr>
        // "2044605",    //弩攻击诅咒卷轴</td></tr>
        "2044606",    //弩攻击卷轴</td></tr>
        "2044607"    //弩攻击卷轴</td></tr>
    ];
    //拳套
    export var AllJuanZhous22:Array<any> = [
        // "2044700",    //拳套攻击卷轴</td></tr>
        "2044701",    //拳套攻击卷轴</td></tr>
        "2044702",    //拳套攻击卷轴</td></tr>
        // "2044703",    //拳套攻击必成卷</td></tr>
        // "2044704",    //拳套攻击诅咒卷轴</td></tr>
        // "2044705",    //拳套攻击诅咒卷轴</td></tr>
        "2044706",    //拳套攻击卷轴</td></tr>
        "2044707"    //拳套攻击卷轴</td></tr>
    ];
    //拳甲
    export var AllJuanZhous23:Array<any> = [
        // "2044800",    // 拳甲攻击卷轴</td></tr>
        "2044801",    // 拳甲攻击卷轴</td></tr>
        "2044802",    // 拳甲攻击卷轴</td></tr>
        // "2044803",    // 拳甲攻击卷轴</td></tr>50%</td></tr>
        // "2044804",    // 拳甲攻击卷轴</td></tr>
        // "2044805",    // 拳甲命中率卷轴</td></tr>
        // "2044806",    // 拳甲命中率卷轴</td></tr>
        // "2044807",    // 拳甲命中率卷轴</td></tr>
        // "2044808",    // 拳甲命中率卷轴</td></tr>
        // "2044809",    // 拳甲命中率卷轴</td></tr>
        // "2044810",    //[5周年]拳甲攻击卷轴40%</td></tr>
        "2044811"    // 拳甲攻击卷轴</td></tr>
        // "2044815",    //拳甲攻击必成卷</td></tr>
    ];
    //短枪
    export var AllJuanZhous24:Array<any> = [
    //    "2044900",    //短枪攻击卷轴</td></tr>
       "2044901",    //短枪攻击卷轴</td></tr>
       "2044902",    //短枪攻击卷轴</td></tr>
    //    "2044903",    //短枪攻击卷轴</td></tr>
    //    "2044904",    //短枪攻击卷轴</td></tr>
    //    "2044905",    //[5周年]短枪攻击卷轴40%</td></tr>
       "2044906"    //短枪攻击卷轴</td></tr>
    //    "2044908",    //短枪攻击必成卷</td></tr>
    ];
    //能量剑
    export var AllJuanZhous25:Array<any> = [
        // "2042400",    //能量剑攻击力卷轴</td></tr>
        "2042401",    //能量剑攻击力卷轴</td></tr>
        "2042402",    //能量剑攻击力卷轴</td></tr>
        // "2042403",    //能量剑攻击力卷轴</td></tr>
        // "2042404",    //能量剑攻击力卷轴</td></tr>
        "2042405",    //能量剑攻击力卷轴</td></tr>
        "2042406"    //能量剑攻击力卷轴</td></tr>
    ];
    //太刀
    export var AllJuanZhous26:Array<any> = [
    ];

    //全身
    export var AllJuanZhous2:Array<any> = [
        // "2040500",  //全身铠甲敏捷卷轴  成功率100
        "2040501",  //全身铠甲敏捷卷轴  成功率60
        "2040502",  //全身铠甲敏捷卷轴  成功率10
        // "2040503",  //全身铠甲防御卷轴  成功率100
        "2040504",  //全身铠甲防御卷轴  成功率60
        "2040505",  //全身铠甲防御卷轴  成功率10
        // "2040506",  //全身盔甲敏捷必成卷
        // "2040507",  //全身盔甲防御必成卷
        // "2040508",  //全身铠甲敏捷诅咒卷轴    成功率70
        // "2040509",  //全身铠甲敏捷诅咒卷轴    成功率30
        // "2040510",  //全身铠甲防御诅咒卷轴    成功率70
        // "2040511",  //全身铠甲防御诅咒卷轴    成功率70
        // "2040512",  //全身铠甲智力卷轴      成功率100
        "2040513",  //全身铠甲智力卷轴  成功率60
        "2040514",  //全身铠甲智力卷轴  成功率10
        // "2040515",  //全身铠甲运气卷轴  成功率100
        "2040516",  //全身铠甲运气卷轴  成功率60
        "2040517",  //全身铠甲运气卷轴  成功率10
        // "2040518",  //全身盔甲智力卷轴  成功率：70
        // "2040519",  //全身盔甲智力卷轴  成功率：30
        // "2040520",  //全身盔甲幸运卷轴  成功率：70
        // "2040521",  //全身盔甲幸运卷轴  成功率：30
        "2040522",  //全身盔甲敏捷卷轴  成功率：65
        "2040523",  //全身盔甲敏捷卷轴  成功率：15
        "2040524",  //全身盔甲防御卷轴  成功率：65
        "2040525",  //全身盔甲防御卷轴  成功率：15
        "2040526",  //全身盔甲智力卷轴  成功率：65
        "2040527",  //全身盔甲智力卷轴  成功率：15
        "2040528",  //全身盔甲幸运卷轴  成功率：65
        "2040529"  //全身盔甲幸运卷轴  成功率：15
    ];
    //弓
    export var AllJuanZhous3:Array<any> = [
        // "2044500",  //弓攻击卷轴 成功率100
        "2044501",  //弓攻击卷轴 成功率60
        "2044502",  //弓攻击卷轴 成功率10
        // "2044503",  //弓攻击必成卷
        // "2044504",  //弓攻击诅咒卷轴   成功率70
        // "2044505",  //弓攻击诅咒卷轴   成功率30
        "2044506",  //弓攻击卷轴 成功率：65
        "2044507"   //弓攻击卷轴 成功率：15
    ];
    //杖
    export var AllJuanZhous4:Array<any> = [
        // "2043700",  //短杖魔力卷轴    成功率100
        "2043701",  //短杖魔力卷轴    成功率60
        "2043702",  //短杖魔力卷轴    成功率10
        // "2043703",  //短杖攻击必成卷
        // "2043704",  //短杖魔力诅咒卷轴  成功率70
        // "2043705",  //短杖魔力诅咒卷轴  成功率30
        "2043706",  //短杖魔力卷轴    成功率：65
        "2043707",  //短杖魔力卷轴    成功率：15
        // "2043800",  //长杖魔力卷轴    成功率100
        "2043801",  //长杖魔力卷轴    成功率60
        "2043802",  //长杖魔力卷轴    成功率10
        // "2043803",  //长杖攻击必成卷
        // "2043804",  //长杖魔力诅咒卷轴  成功率70
        // "2043805",  //长杖魔力诅咒卷轴  成功率30
        "2043806",  //长杖魔力卷轴    成功率：65
        "2043807"   //长杖魔力卷轴    成功率：15
    ];
    //披风
    export var AllJuanZhous5:Array<any> = [
        // "2041000",  //披风魔防卷轴    成功率100
        "2041001",  //披风魔防卷轴    成功率60
        "2041002",  //披风魔防卷轴    成功率10
        // "2041003",  //披风防御卷轴    成功率100
        "2041004",  //披风防御卷轴    成功率60
        "2041005",  //披风防御卷轴    成功率10
        // "2041006",  //披风体力卷轴    成功率100
        "2041007",  //披风体力卷轴    成功率60
        "2041008",  //披风体力卷轴    成功率10
        // "2041009",  //披风魔力卷轴    成功率100
        "2041010",  //披风魔力卷轴    成功率60
        "2041011",  //披风魔力卷轴    成功率10
        // "2041012",  //披风力量卷轴    成功率100
        "2041013",  //披风力量卷轴    成功率60
        "2041014",  //披风力量卷轴    成功率10
        // "2041015",  //披风智力卷轴    成功率100
        "2041016",  //披风智力卷轴    成功率60
        "2041017",  //披风智力卷轴    成功率10
        // "2041018",  //披风敏捷卷轴    成功率100
        "2041019",  //披风敏捷卷轴    成功率60
        "2041020",  //披风敏捷卷轴    成功率10
        // "2041021",  //披风运气卷轴    成功率100
        "2041022",  //披风运气卷轴    成功率60
        "2041023",  //披风运气卷轴    成功率10
        // "2041024",  //披风魔法防御必成卷
        // "2041025",  //披风物理防御必成卷
        // "2041026",  //披风魔防诅咒卷轴  成功率70
        // "2041027",  //披风魔防诅咒卷轴  成功率30
        // "2041028",  //披风防御诅咒卷轴  成功率70
        // "2041029",  //披风防御诅咒卷轴  成功率30
        // "2041030",  //披风体力诅咒卷轴  成功率70
        // "2041031",  //披风体力诅咒卷轴  成功率30
        // "2041032",  //披风魔力诅咒卷轴  成功率70
        // "2041033",  //披风魔力诅咒卷轴  成功率30
        // "2041034",  //披风力量诅咒卷轴  成功率70
        // "2041035",  //披风力量诅咒卷轴  成功率30
        // "2041036",  //披风智力诅咒卷轴  成功率70
        // "2041037",  //披风智力诅咒卷轴  成功率30
        // "2041038",  //披风敏捷诅咒卷轴  成功率70
        // "2041039",  //披风敏捷诅咒卷轴  成功率30
        // "2041040",  //披风运气诅咒卷轴  成功率70
        // "2041041",  //披风运气诅咒卷轴  成功率30
        "2041042",  //披风魔法防御卷轴  成功率：65
        "2041043",  //披风魔法防御卷轴  成功率：15
        "2041044",  //披风物理防御卷轴  成功率：65
        "2041045",  //披风物理防御卷轴  成功率：15
        "2041046",  //披风体力卷轴    成功率：65
        "2041047",  //披风体力卷轴    成功率：15
        "2041048",  //披风魔力卷轴    成功率：65
        "2041049",  //披风魔力卷轴    成功率：15
        "2041050",  //披风力量卷轴 成功率：65
        "2041051",  //披风力量卷轴 成功率：15
        "2041052",  //披风智力卷轴  成功率：65
        "2041053",  //披风智力卷轴  成功率：15
        "2041054",  //披风敏捷卷轴    成功率：65
        "2041055",  //披风敏捷卷轴    成功率：15
        "2041056",  //披风幸运卷轴    成功率：65
        "2041057"   //披风幸运卷轴    成功率：15
    ];
    //盾牌
    export var AllJuanZhous6:Array<any> = [
        // "2040900",  //盾牌防御卷轴    成功率100
        "2040901",  //盾牌防御卷轴    成功率60
        "2040902",  //盾牌防御卷轴    成功率10
        // "2040903",  //盾牌防御必成卷
        // "2040904",  //盾牌防御诅咒卷轴  成功率70
        // "2040905",  //盾牌防御诅咒卷轴  成功率30
        // "2040906",  //盾牌运气卷轴    成功率70
        // "2040907",  //盾牌运气卷轴    成功率30
        // "2040908",  //盾牌体力卷轴    成功率70
        // "2040909",  //盾牌体力卷轴    成功率30
        "2040910",  //盾牌防御卷轴    成功率:65
        "2040911",  //盾牌防御卷轴    成功率:15
        "2040914",  //盾牌攻击卷轴60
        "2040915",  //盾牌攻击卷轴10
        // "2040916",  //盾牌攻击诅咒卷轴70
        // "2040917",  //盾牌攻击诅咒卷轴30
        "2040919",  //盾牌魔力卷轴60
        "2040920"  //盾牌魔力卷轴10
        // "2040921",  //盾牌魔力诅咒卷轴70
        // "2040922"   //盾牌魔力诅咒卷轴30
    ];
    //短刀
    export var AllJuanZhous7:Array<any> = [
        // "2043300",  //短剑攻击卷轴    成功率100
        "2043301",  //短剑攻击卷轴    成功率60
        "2043302",  //短剑攻击卷轴    成功率10
        // "2043303",  //短剑攻击必成卷
        // "2043304",  //短剑攻击诅咒卷轴  成功率70
        // "2043305",  //短剑攻击诅咒卷轴  成功率30
        "2043306",  //短剑攻击卷轴    成功率：65
        "2043307"   //短剑攻击卷轴    成功率：15
    ];
    //项链
    export var AllJuanZhous8:Array<any> = [
        "2041201",    //项链运气卷轴10%</td></tr>
        "2041202",    //项链运气卷轴60%</td></tr>
        // "2041203",    //项链运气卷轴100%</td></tr>
        // "2041204",    //项链运气诅咒卷轴30%</td></tr>
        // "2041205",    //项链运气诅咒卷轴70%</td></tr>
        "2041206",    //项链力量卷轴10%</td></tr>
        "2041207",    //项链力量卷轴60%</td></tr>
        // "2041208"    //项链力量卷轴100%</td></tr>
        // "2041209",    //项链力量诅咒卷轴30%</td></tr>
        // "2041210"    //项链力量诅咒卷轴70%</td></tr>
    ];
    //腰带
    export var AllJuanZhous9:Array<any> = [
        "2041301",    //腰带力量卷轴60%</td></tr>
        "2041304",    //腰带智力卷轴60%</td></tr>
        "2041307",    //腰带敏捷卷轴60%</td></tr>
        "2041310"    //腰带运气卷轴60%</td></tr>
    ]
    //耳环
    export var AllJuanZhous10:Array<any> = [
        // "2040300",    //耳环智力卷轴</td></tr>
        "2040301",    //耳环智力卷轴</td></tr>
        "2040302",    //耳环智力卷轴</td></tr>
        // "2040303",    //耳环智力必成卷</td></tr>
        // "2040304",    //耳环智力诅咒卷轴</td></tr>
        // "2040305",    //耳环智力诅咒卷轴</td></tr>
        // "2040306",    //耳环敏捷卷轴</td></tr>
        // "2040307",    //耳环敏捷卷轴</td></tr>
        // "2040308",    //耳环防御力诅咒卷轴70%</td></tr>
        // "2040309",    //耳环防御力诅咒卷轴30%</td></tr>
        "2040310",    //耳环防御力卷轴10%</td></tr>
        "2040311",    //耳环防御力卷轴60%</td></tr>
        // "2040312",    //耳环防御力卷轴100%</td></tr>
        "2040313",    //耳环智力卷轴</td></tr>
        "2040314"    //耳环智力卷轴</td></tr>
    ];
    //手套
    export var AllJuanZhous11:Array<any> = [
        // "2040800",    //手套敏捷卷轴</td></tr>
        "2040801",    //手套敏捷卷轴</td></tr>
        "2040802",    //手套敏捷卷轴</td></tr>
        // "2040803",    //手套攻击卷轴</td></tr>
        "2040804",    //手套攻击卷轴</td></tr>
        "2040805",    //手套攻击卷轴</td></tr>
        // "2040806",    //手套敏捷必成卷</td></tr>
        // "2040807",    //手套攻击诅咒卷轴</td></tr>
        // "2040808",    //手套敏捷诅咒卷轴</td></tr>
        // "2040809",    //手套敏捷诅咒卷轴</td></tr>
        // "2040810",    //手套攻击诅咒卷轴</td></tr>
        // "2040811",    //手套攻击诅咒卷轴</td></tr>
        // "2040812",    //手套体力卷轴</td></tr>
        // "2040813",    //手套体力卷轴</td></tr>
        // "2040814",    //手套魔力诅咒卷轴70%</td></tr>
        // "2040815",    //手套魔力诅咒卷轴30%</td></tr>
        "2040816",    //手套魔力卷轴10%</td></tr>
        "2040817",    //手套魔力卷轴60%</td></tr>
        // "2040818",    //手套魔力卷轴100%</td></tr>
        "2040819",    //手套敏捷卷轴</td></tr>
        "2040820",    //手套敏捷卷轴</td></tr>
        "2040821",    //手套攻击卷轴</td></tr>
        "2040822"    //手套攻击卷轴</td></tr>
        // "2040823",    //手套体力卷轴</td></tr>
        // "2040824",    //手套体力卷轴</td></tr>
        // "2040825"    //手套体力卷轴</td></tr>
    ]
    //鞋子
    export var AllJuanZhous12:Array<any> = [
        // "2040700",    //鞋子敏捷度卷轴</td></tr>
        "2040701",    //鞋子敏捷度卷轴</td></tr>
        "2040702",    //鞋子敏捷度卷轴</td></tr>
        // "2040703",    //鞋子跳跃卷轴</td></tr>
        // "2040704",    //鞋子跳跃卷轴</td></tr>
        // "2040705",    //鞋子跳跃卷轴</td></tr>
        // "2040706",    //鞋子速度卷轴</td></tr>
        // "2040707",    //鞋子速度卷轴</td></tr>
        // "2040708",    //鞋子速度卷轴</td></tr>
        // "2040709",    //鞋子敏捷必成卷</td></tr>
        // "2040710",    //鞋子跳跃必成卷</td></tr>
        // "2040711",    //鞋子速度必成卷</td></tr>
        // "2040712",    //鞋子敏捷诅咒卷轴</td></tr>
        // "2040713",    //鞋子敏捷诅咒卷轴</td></tr>
        // "2040714",    //鞋子跳跃诅咒卷轴</td></tr>
        // "2040715",    //鞋子跳跃诅咒卷轴</td></tr>
        // "2040716",    //鞋子速度诅咒卷轴</td></tr>
        // "2040717",    //鞋子速度诅咒卷轴</td></tr>
        "2040718",    //鞋子敏捷卷轴</td></tr>
        "2040719"    //鞋子敏捷卷轴</td></tr>
        // "2040720",    //鞋子跳跃卷轴</td></tr>
        // "2040721",    //鞋子跳跃卷轴</td></tr>
        // "2040722",    //鞋子速度卷轴</td></tr>
        // "2040723",    //鞋子速度卷轴</td></tr>
        // "2040727"    //鞋子防滑卷轴</td></tr>
    ];
    //帽子
    export var AllJuanZhous13:Array<any> = [
        // "2040000",    //头盔防御卷轴</td></tr>
        "2040001",    //头盔防御卷轴</td></tr>
        "2040002",    //头盔防御卷轴</td></tr>
        // "2040003",    //头盔体力卷轴</td></tr>
        "2040004",    //头盔体力卷轴</td></tr>
        "2040005",    //头盔体力卷轴</td></tr>
        // "2040006",    //头盔防御必成卷</td></tr>
        // "2040007",    //头盔体力必成卷</td></tr>
        // "2040008",    //头盔防御诅咒卷轴</td></tr>
        // "2040009",    //头盔防御诅咒卷轴</td></tr>
        // "2040010",    //头盔体力诅咒卷轴</td></tr>
        // "2040011",    //头盔体力诅咒卷轴</td></tr>
        // "2040012",    //头盔智力卷轴</td></tr>
        // "2040013",    //头盔智力卷轴</td></tr>
        // "2040014",    //头盔命中率诅咒卷轴70%</td></tr>
        // "2040015",    //头盔命中率诅咒卷轴30%</td></tr>
        // "2040016",    //头盔命中率卷轴10%</td></tr>
        // "2040017",    //头盔命中率卷轴60%</td></tr>
        // "2040018",    //头盔命中率卷轴100%</td></tr>
        "2040019",    //头盔防御卷轴</td></tr>
        "2040020",    //头盔防御卷轴</td></tr>
        "2040021",    //头盔体力卷轴</td></tr>
        "2040022"    //头盔体力卷轴</td></tr>
        // "2040027",    //头盔敏捷卷轴</td></tr>
        // "2040028",    //头盔敏捷卷轴</td></tr>
        // "2040029",    //头盔敏捷卷轴</td></tr>
        // "2040030",    //头盔敏捷卷轴</td></tr>
        // "2040031"    //头盔敏捷卷轴</td></tr>
    ];

    export function allJuanZhou(bc:boolean = false) : any {
            let allJuanZhou:Array<string> = [];
            // for(let i:number = 0; i < msMoudle.AllJuanZhous100.length; i++)
            //     allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous100[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous1.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous1[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous2.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous2[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous3.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous3[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous4.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous4[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous5.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous5[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous6.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous6[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous7.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous7[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous8.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous8[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous9.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous9[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous10.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous10[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous11.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous11[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous12.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous12[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous13.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous13[i];

            for(let i:number = 0; i < msMoudle.AllJuanZhous14.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous14[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous15.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous15[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous16.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous16[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous17.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous17[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous18.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous18[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous19.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous19[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous20.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous20[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous21.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous21[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous22.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous22[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous23.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous23[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous24.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous24[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous25.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous25[i];
            for(let i:number = 0; i < msMoudle.AllJuanZhous26.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous26[i];

            if(bc) {
                for(let i:number = 0; i < msMoudle.AllJuanZhousBC.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhousBC[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous200.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous200[i];
            }

            return allJuanZhou;
        }

    //戒指
    export var AllRing:Array<any> = [
        "01112900", "01112904", "01112901", "01112903", "01112905", "01112906"//"01112908"
    ];
    //100%卷轴
    export var AllJuanZhous100:Array<any> = [
        "2043000",  //单手剑攻击卷轴   成功率100
        "2043010",  //单手剑魔力卷轴100
        "2040500",  //全身铠甲敏捷卷轴  成功率100
        "2040503",  //全身铠甲防御卷轴  成功率100
        "2040512",  //全身铠甲智力卷轴      成功率100
        "2040515",  //全身铠甲运气卷轴  成功率100
        "2044500",  //弓攻击卷轴 成功率100
        "2043700",  //短杖魔力卷轴    成功率100
        "2043800",  //长杖魔力卷轴    成功率100
        "2041000",  //披风魔防卷轴    成功率100
        "2041003",  //披风防御卷轴    成功率100
        "2041006",  //披风体力卷轴    成功率100
        "2041009",  //披风魔力卷轴    成功率100
        "2041012",  //披风力量卷轴    成功率100
        "2041015",  //披风智力卷轴    成功率100
        "2041018",  //披风敏捷卷轴    成功率100
        "2041021",  //披风运气卷轴    成功率100
        "2040900",  //盾牌防御卷轴    成功率100
        "2043300"  //短剑攻击卷轴    成功率100
    ];
    //必成卷轴
    export var AllJuanZhousBC:Array<any> = [
        // "2043003",  //单手剑攻击必成卷
        // "2043303",  //短剑攻击必成卷
        // "2040903",  //盾牌防御必成卷
        // "2041024",  //披风魔法防御必成卷
        // "2041025",  //披风物理防御必成卷
        // "2043803",  //长杖攻击必成卷
        // "2043703",  //短杖攻击必成卷
        // "2044503",  //弓攻击必成卷
        // "2040506",  //全身盔甲敏捷必成卷
        // "2040507",  //全身盔甲防御必成卷
        // "2040303",    //耳环智力必成卷</td></tr>
        // "2040806",    //手套敏捷必成卷</td></tr>
        // "2040709",    //鞋子敏捷必成卷</td></tr>
        // "2040006",    //头盔防御必成卷</td></tr>
        // "2040007",    //头盔体力必成卷</td></tr>
        // "2044003",    //双手剑攻击必成卷</td></tr>
        // "2044303",    //枪攻击必成卷</td></tr>
        // "2044403",    //矛攻击必成卷</td></tr>
        // "2043203",    //单手钝器攻击必成卷</td></tr>
        // "2044203",    //双手钝器攻击必成卷</td></tr>
        // "2043103",    //单手斧攻击必成卷</td></tr>
        // "2044103",    //双手斧攻击必成卷</td></tr>
        // "2044603",    //弩攻击必成卷</td></tr>
        // "2044703",    //拳套攻击必成卷</td></tr>
        // "2044815",    //拳甲攻击必成卷</td></tr>
        // "2049000", //祝福卷轴
        "2040599"   //神卷
        //
    ];
    //幻兽卷轴
    export var AllJuanZhous200:Array<any> = [
        // "2040595",
        // "2040596",
        // "2040597",
        "2040598"
    ];
    //所有时装
    export var AllFashion:Array<any> = [
        "01052001",
        "01052078",
        "01052083",
        "01052084",
        "01052094",
        "01052135",
        "01052245",
        "01052448",
        "01052540",
        "01052542",
        "01052587",
        "01052611",
        "01052661",
        "01052667",
        "01052708",
        "01052709",
        "01052774",
        "01052850",
        "01052875"
    ]
    //所有宠物
    export var AllPet:Array<any> = [
        "5000006", "5000015", "5000029", "5000032", "5000035", "5000067", "5000301", "5000229", "5000055", "5000330",
        "5001006", "5000317"
    ]

    //所有坐骑
    export var AllTamingMob:Array<any> = [
        "01902005","01902000", "01902028", "01902032", "01932211", "01932407", "01932140", "01932108"//"01932351", "01932152",

    ];

    //获得角色职业
    export function getJobType(job:any) : any {
        if(job == 100) return "战士"
        else if(job == 110) return "剑客"
        else if(job == 111) return "勇士"
        else if(job == 112) return "英雄"
        else if(job == 120) return "准骑士"
        else if(job == 121) return "骑士"
        else if(job == 122) return "圣骑士"
        else if(job == 130) return "枪战士"
        else if(job == 131) return "龙骑士"
        else if(job == 132) return "黑骑士"
        else if(job == 200) return "魔法师"
        else if(job == 210) return "牧师"
        else if(job == 211) return "祭司"
        else if(job == 212) return "主教"
        else if(job == 220) return "火毒法师"
        else if(job == 221) return "火毒巫师"
        else if(job == 222) return "火毒魔导师"
        else if(job == 230) return "冰雷法师"
        else if(job == 231) return "冰雷巫师"
        else if(job == 232) return "冰雷魔导师"
        else if(job == 300) return "弓箭手"
        else if(job == 310) return "猎人"
        else if(job == 311) return "射手"
        else if(job == 312) return "神射手"
        else if(job == 320) return "弩弓手"
        else if(job == 321) return "游侠"
        else if(job == 322) return "箭神"
        else if(job == 400) return "飞侠"
        else if(job == 410) return "侠客"
        else if(job == 411) return "独行客"
        else if(job == 412) return "侠盗"
        else if(job == 420) return "刺客"
        else if(job == 421) return "无影人"
        else if(job == 422) return "隐士"
        else if(job == 500) return "海盗"
        else if(job == 510) return "火枪手"
        else if(job == 511) return "大副"
        else if(job == 512) return "船长"
        else if(job == 520) return "拳手"
        else if(job == 521) return "斗士"
        else if(job == 522) return "冲锋队长"
        else if(job == 2700) return "夜光法师"
        else if(job == 2710) return "夜光法师"
        else if(job == 2711) return "夜光法师"
        else if(job == 2712) return "夜光法师"
        else if(job == 3600) return "尖兵"
        else if(job == 3610) return "尖兵"
        else if(job == 3611) return "尖兵"
        else if(job == 3612) return "尖兵"
        else if(job == 4100) return "剑豪"
        else if(job == 4110) return "剑豪"
        else if(job == 4111) return "剑豪"
        else if(job == 4112) return "剑豪"
        else if(job == 6000) return "狂龙战士"
        else if(job == 6100) return "狂龙战士"
        else if(job == 6110) return "狂龙战士"
        else if(job == 6111) return "狂龙战士"
        else if(job == 6112) return "狂龙战士"
        else if(job == 6400) return "魔影链士"
        else if(job == 6410) return "魔影链士"
        else if(job == 6411) return "魔影链士"
        else if(job == 6412) return "魔影链士"
        else if(job == 15200) return "圣晶使者"
        else if(job == 15210) return "圣晶使者"
        else if(job == 15211) return "圣晶使者"
        else if(job == 15212) return "圣晶使者"
        else if(job == 15500) return "影魂异人"
        else if(job == 15510) return "影魂异人"
        else if(job == 15511) return "影魂异人"
        else if(job == 15512) return "影魂异人"
        else if(job == 16400) return "虎影"
        else if(job == 16410) return "虎影"
        else if(job == 16411) return "虎影"
        else if(job == 16412) return "虎影"

        return "该职业不存在" + job;
    }
    //使用atk的技能
    export var AllAtkSkills:Array<any> = [
        "1001004", "1001005",
    ];
    //使用alert的技能
    export var AllAlertSkills:Array<any> = [
        "1121010", "1121011", "1320006",
    ];

    export var AllNpc:Array<string> = [];
    // export var AllNpc:Array<string> = [
    //     "0010200", "0010202", "0010204", "0002000", "0002101", "1040001",
    //     "2081007", "2500001", "2510002", "2510025", "2510027", "1022008",
    //     "2032001",
    //     "9030000", "9030100", "9250025", "9310022", "9310059", "9310070",
    //     "9310071", "9310072", "9310073", "9310074", "9310082"
    // ];

    export var PI:number = 3.1415926535898;

    ///物理参数(Physics.img)
    export var walkForce = 140000;      //walk阻力
    export var walkSpeed = 125;         //walk速度
    export var walkDrag = 80000;        //walk吃力
    export var slipForce = 60000;       //滑动阻力
    export var slipSpeed = 120;         //滑动速度
    export var floatDrag1 = 100000;     //浮吃力1
    export var floatDrag2 = 10000;      //浮吃力2
    export var floatCoefficient = 0.01; //浮系数
    export var swimForce = 120000;      //游阻力
    export var swimSpeed = 140;         //游速度
    export var flyForce = 120000;       //飞阻力
    export var flySpeed = 200;          //飞速度
    export var jumpSpeed = 555;         //跳(起跳速度)
    export var gravityAcc = 2700;//2000;       //重力加速度
    export var fallSpeed = 890;//670;         //下落速度(最大下落速度)
    export var maxFriction = 2;         //最大摩擦
    export var minFriction = 0.05;      //最小摩擦
    export var swimSpeedDec = 0.9;      //??
    export var flyJumpDec = 0.35;       //??

    //所有动作
    export var actionType = {
        pAll: -1,
        pStand1: 0,
        pStand2: 1,
        pAlert: 2,
        pWalk1: 3,
        pWalk2: 4,
        pJump: 5,
        pShoot1: 6,
        pShoot2: 7,
        pShootF: 8,
        pSit: 9,
        pstabO1: 10,
        pstabO2: 11,
        pstabOF: 12,
        pstabT1: 13,
        pstabT2: 14,
        pswingO1: 15,
        pswingO2: 16,
        pswingO3: 17,
        pswingP1: 18,
        pswingP2: 19,
        pswingT1: 20,
        pswingT2: 21,
        pswingT3: 22,
        pdead: 23,
        pfly: 24,
        pladder: 25,
        prope: 26,
        pproneStab: 27,
        pswingOF: 28,
        pswingPF: 29,
        pswingTF: 30,
        pstabTF: 31,
        heal : 32,
        pNum: 33
    };
    //所有部位
    export var partType:any = {
        tAll        : -1,
        tBody       : 0,
        tHead       : 1,
        tFace       : 2,
        tHair       : 3,
        tCap        : 4,
        tCoat       : 5,
        tPants      : 6,
        tShoes      : 7,
        tWeapon     : 8,
        tGlove      : 9,
        tCape       : 10,
        tShield     : 11,
        tAccessory1 : 12,   //
        tAccessory2 : 13,   //
        tAccessory3 : 14,   //
        tLongcoat   : 15,
        tTamingMob  : 16,
        tAfterimage : 17,
        tTamingMob0 : 18,
        tFWeapon    : 19,
        tAccessory4 : 20,   //
        tAccessory5 : 21,   //
        tAccessory6 : 22,   //
        tNum        : 23
    };
    export var tNum:number = 20;        //外形数量
    //部位目录
    export var partDirs : Array<any> = [
        "Body",         //                                      保留
        "Head",         //                                      保留
        "Face",         //废弃
        "Hair",         //废弃
        "Cap",          //                                      保留
        "Coat",         //废弃
        "Pants",        //废弃
        "Shoes",        //                                      保留
        "Weapon",       //                                      保留
        "Glove",
        "Cape",
        "Shield",
        "Accessory1",   //废弃
        "Accessory2",   //废弃
        "Accessory3",   //废弃
        "LongCoat",
        "TamingMob",
        "Afterimage",
        "TamingMob",
        "Weapon",
        "Accessory4",   //废弃
        "Accessory5",   //废弃
        "Accessory6",   //废弃
    ];
    //动作列表
    export var actionFames : any = {
        "stand1"        : 3,
        "stand2"        : 3,
        "alert"         : 3,
        "walk1"         : 4,
        "walk2"         : 4,
        "jump"          : 1,
        "shoot1"        : 3,
        "shoot2"        : 5,
        "shootF"        : 2,
        "sit"           : 1,
        "stabO1"        : 2,
        "stabO2"        : 2,
        "stabOF"        : 3,
        "stabT1"        : 3,
        "stabT2"        : 3,
        "swingO1"       : 3,
        "swingO2"       : 3,
        "swingO3"       : 3,
        "swingP1"       : 3,
        "swingP2"       : 3,
        "swingT1"       : 3,
        "swingT2"       : 3,
        "swingT3"       : 3,
        "dead"          : 1,
        "fly"           : 2,
        "ladder"        : 2,
        "rope"          : 2,
        "proneStab"     : 2,
        "swingOF"       : 4,
        "swingPF"       : 4,
        "swingTF"       : 4,
        "stabTF"        : 4,
        "prone"         : 1,
        "heal"          : 3
    };

    // <tr><td>info.afterImage</td><td>swordOL</td></tr>
    // <tr><td>info.sfx</td><td>swordS</td></tr>
    export function getAftByWeapon(itemId:string) : string {
        // console.log(itemId)
        if(itemId != Number(itemId).toString()) {
            if(itemId.indexOf(".img") >= 0) itemId = msMoudle.rmvImg(itemId);
        }
        let cat = Math.floor((Number(itemId) / 10000) % 100);
        if(cat == 23) return "swordOL"//"亡命之徒";////复仇者
        else if(cat == 24) return "swordOS"//"能量剑";
        else if(cat == 30) return "swordOL"//"单手剑";
        else if(cat == 31) return "swordOL"//"单手斧";
        else if(cat == 32) return "mace"//"单手钝器";
        else if(cat == 33) return "swordOS"//"短刀";
        else if(cat == 34) return "swordOL"//"刀";////
        else if(cat == 36) return "cane"//"手杖";
        else if(cat == 37) return "mace"//"短杖";
        else if(cat == 38) return "mace"//"长杖";
        else if(cat == 40) return "swordTS"//"双手剑";
        else if(cat == 41) return "axe"//"双手斧";
        else if(cat == 42) return "axe"//"双手钝器";
        else if(cat == 43) return "spear"//"枪";
        else if(cat == 44) return "poleArm"//"矛";
        else if(cat == 45) return "bow"//"弓";
        else if(cat == 46) return "crossBow"//"弩";
        else if(cat == 47) return "swordOL"//"拳套";
        else if(cat == 48) return "knuckle"//"拳甲";///
        else if(cat == 49) return "gun"//"短枪";///
        else if(cat == 56) return "大剑";///
        else if(cat == 57) return "swordZL"//"太刀";///
        // else if(cat == 70) return "特殊";///

        return "N";
    }

    //获得坐标
    export function Vec2FromArr(arr: string): Object {
        let vec2: Object;
        let x1 = "", y1 = "";
        if(arr != null && arr != "") {
            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i] == ",") {
                    //前面
                    for (let j: number = 0; j < i; j++) {
                        x1 = x1 + arr[j];
                    }
                    //后面
                    for (let j: number = i + 1; j < arr.length; j++) {
                        y1 = y1 + arr[j];
                    }
                    let x2 = Number(x1);
                    let y2 = Number(y1);
                    vec2 = { x: x2, y: y2 };
                    return vec2;
                }
            }
        }
        vec2 = { x: -999, y: -999 };
        return vec2;
    }
    //获得character目录
    export function getCharacterInfo(str:string, act:string, id:string): any {
        // console.log(str + "  " + act + "  " + id);
        let m:string = "";
        let root:string = "";
        //img src =
        if(str) {
            //_inlink
            // str = str.replace(/\\/g,"");
            //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
            if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
            str[6] == "r" && str[7] == "c" && str[8] == "=") {
                //查找 ／>的位置
                let index:number = 0;
                for(let i:number = 0; i < str.length; i++) {
                    if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                        index = i - 1;
                        break;
                    }
                }
                //10 index
                for(let i:number = 10; i < index; i++) {
                    m = m + str[i];
                }

                let msg:any = {
                    strMarker:"",
                    root:"",
                    act:""
                };
                msg.strMarker = m;
                let msp:any = m.split(".");
                msg.act = msp[0];
                for(let i:number = 0; i < msp.length; i++) {
                    if(msp[i] != "png") {
                        if(i == 0) msg.root = msg.root + msp[i];
                        else msg.root = msg.root + "." + msp[i];
                    }
                }
                // console.log("xxxx " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
                //这里是最终出口
                return msg;
            }
            //../../
            //<tr><td>stabTF.0.weapon</td><td>../../swingPF/0/weapon</td></tr>
            //<tr><td>swingT2.2.head</td><td>../../front/head</td></tr>
            //<tr><td>stabTF.3.body</td><td>../../stabT1/2/body</td></tr>
            //<tr><td>stand2.0.hairOverHead</td><td>../../default/hairOverHead</td></tr>
            //../../stand1/0/0
            else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] == "." && str[4] == "." && str[5] == "/") {
                // console.log(str + "  有../../");
                for(let i:number = 6; i < str.length; i++) {
                    if(str[i] == "/") m = m + ".";
                    else m = m + str[i];
                }
                let data:any = msMoudle.wz[id][m.split(".")[0]];
                return this.getCharacterInfo(data[m], m.split(".")[0], id);
            }
            //../
            //<tr><td>shoot1.2.body</td><td>../1/body</td></tr>
            else if(str[0] == "." && str[1] == "." && str[2] == "/") {
                // console.log(str + "  有../");
                m = act;
                m = m + ".";
                for(let i:number = 3; i < str.length; i++) {
                    if(str[i] == "/") m = m + ".";
                    else m = m + str[i];
                }
                let data:any = msMoudle.wz[id][act];
                if(data[m + "._inlink"]) {
                    let ____m = data[m + "._inlink"].split("/");
                    //walk1/0/weapon
                    // msg = new Object();
                    // msg.root = ____m[0] + "." + ____m[1] + "." + ____m[2];
                    // msg.act = ____m[0];
                    let ndata:any = msMoudle.wz[id][____m[0]];
                    if(ndata) {
                        m =  ____m[0] + "." + ____m[1] + "." + ____m[2];
                        act = ____m[0];
                        return this.getCharacterInfo(ndata[m], act, id);
                        // msg = msMoudle.getCharacterInfo(ndata[root], ____m[0], this.partIndex[parttype]);
                    }
                    else {
                        console.log("link错误__");
                        return ;
                    }
                }
                else {
                // <tr><td>stand1.0.weapon</td><td><img src="stand1.0.weapon.png" /></td></tr>
                // <tr><td>stand1.0.weapon.origin</td><td>50,5</td></tr>
                // <tr><td>stand1.0.weapon.map.hand</td><td>0,0</td></tr>
                // <tr><td>stand1.0.weapon.z</td><td>weapon</td></tr>
                // <tr><td>stand1.0.weapon._inlink</td><td>walk1/3/weapon</td></tr>
                // <tr><td>stand1.0.weapon2</td><td><img src="stand1.0.weapon2.png" /></td></tr>
                // <tr><td>stand1.0.weapon2.origin</td><td>14,5</td></tr>
                // <tr><td>stand1.0.weapon2.map.hand</td><td>0,0</td></tr>
                // <tr><td>stand1.0.weapon2.z</td><td>weapon</td></tr>
                // <tr><td>stand1.0.weapon2._inlink</td><td>walk1/3/weapon2</td></tr>
                // <tr><td>stand1.1.weapon</td><td>../0/weapon</td></tr>
                // <tr><td>stand1.1.weapon2</td><td>../0/weapon2</td></tr>
                // <tr><td>stand1.2.weapon</td><td>../0/weapon</td></tr>
                // <tr><td>stand1.2.weapon2</td><td>../0/weapon2</td></tr>

                    return this.getCharacterInfo(data[m], act, id);
                }
            }
            //1
            else if(Number(str) >= 0 && (Number(str) <= 100)) {
                let data:any = msMoudle.wz[id][act];
                m = act + "." + str;
                return this.getCharacterInfo(data[m], act, id);
            }
            else {
                console.log("character缺少条件判断");
            }
        }
        else {
            if(str && str.indexOf("/") >= 0) {
                let newstr = str.split("/");
                return getCharacterInfo(newstr[0] + "." + newstr[1] + "." + newstr[2], act, id)
            }
            else {
                console.log("数据无法读取");
                return null;
            }
        }
    }
    //获得170
    export function get170Weapon(str:string, act:any, frame:number, id:string, effect:string, _root:string) : any {
        //30.walk1.1.weapon
        let m:string = "";
        let root:string = "";
        // console.log(str)
        if(str) {
            // str = str.replace(/\\/g,"");
            let newstr = str.split("/");
            if(newstr.length == 3) {
                //      ../30/stand1
                if(Number(newstr[1]) >= 10 && Number(newstr[1]) <= 100 ) {
                    str = newstr[1] + "." + newstr[2] + "." + frame + "." + effect;
                    let data:any = msMoudle.wz[id][newstr[1] + "." + newstr[2]];
                    // console.log(data);
                    // console.log(str)
                    // let data:any = msMoudle.wz[id][str];
                    // console.log(str + "  " + 1111)
                    return msMoudle.get170Weapon(data[str], newstr[2], frame, id, effect, _root);
                }
                else {
                    //      ../0/weapon
                    // console.log(_root);
                    let newroot = _root.split(".");
                    str = newroot[0] + "." + newroot[1] + "." + newstr[1] + "." + newroot[3];
                    let data:any = msMoudle.wz[id][newroot[0] + "." + newroot[1]];
                    // console.log(str + "  " + 2222)
                    return msMoudle.get170Weapon(data[str], newstr[2], frame, id, effect, _root);
                }
            }
            else {
                if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
                    str[6] == "r" && str[7] == "c" && str[8] == "=") {
                    //查找 ／>的位置
                    let index:number = 0;
                    for(let i:number = 0; i < str.length; i++) {
                        if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                            index = i - 1;
                            break;
                        }
                    }
                    //10 index
                    for(let i:number = 10; i < index; i++) {
                        m = m + str[i];
                    }

                    let msg:any = {
                        strMarker:"",
                        root:"",
                        act:""
                    };
                    msg.strMarker = m;
                    let msp:any = m.split(".");
                    msg.act = msp[0] + "." + msp[1];
                    for(let i:number = 0; i < msp.length; i++) {
                        if(msp[i] != "png") {
                            if(i == 0) msg.root = msg.root + msp[i];
                            else msg.root = msg.root + "." + msp[i];
                        }
                    }
                    // console.log("xxxx " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
                    //这里是最终出口
                    return msg;
                }
            }
        }
        else return null;
    }
    //获得mob目录
    export function getMobInfo(str:string, act:string, id:string): any {
        // console.log(str + "  " + act + "  " + id);
        //  <tr><td>stand.10.source</td><td>Mob/5200001.img/stand/5</td></tr>
        let m:string = "";
        let root:string = "";
        // str = str.replace(/\\/g,"");
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m = m + str[i];
            let msg:any = {
                strMarker:"",
                root:"",
                act:""
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.act = msp[0];
            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            // console.log("xxxx . " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
            //这里是最终出口
            return msg;
        }
        //../../
        else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] == "." && str[4] == "." && str[5] == "/") {
            // console.log(str + "  有../../");
            for(let i:number = 6; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            let data:any = msMoudle.wz[id][m.split(".")[0]];
            return this.getMobInfo(data[m], m.split(".")[0], id);
        }
        //../
        //<tr><td>stand.3</td><td>../move/3</td></tr>
        else if(str[0] == "." && str[1] == "." && str[2] == "/") {
            // console.log(str + "  有../");
            for(let i:number = 3; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            act =m.split(".")[0];
            let data:any = msMoudle.wz[id][act];
            return this.getMobInfo(data[m], act, id);
        }
        else if(Number(str) >= 0 && Number(str) <= 100) {
            m = act + "." + str;
            let data:any = msMoudle.wz[id][act];
            return this.getMobInfo(data[m], act, id);
        }
        else {
            console.log("mob缺少条件判断  ");
        }
    }
    export function getMobInfo2(data:any, action: string, key: string, id:string, secKey?: string): any {
        // console.log("###", action, " : " + key + " : " + id + " : " + secKey);
        //  <tr><td>stand.10.source</td><td>Mob/5200001.img/stand/5</td></tr>
        let m:string = "";
        let root:string = "";
        let secdata = data[action];
        if(!secdata) {
            console.log("mob缺少条件判断1  ");
            return;
        }
        let lKey = secKey || key;
        //1.inlink
        let inlink = secdata[lKey + "._inlink"];
        if(inlink) {
            let strs = inlink.split("/");
            let k = 0;
            for(let j=lKey.length-1; j>-1; --j) {
                let c = lKey[j];
                if(c == '.') {
                    ++k;
                    if(k == strs.length) {
                        root = lKey.substr(0, j+1);
                        break;
                    }
                }
            }
            if(k != strs.length) {
                root = "";
                action = strs[0];
            }
            for(let i=0; i<strs.length; ++i) {
                root += strs[i];
                if(i < strs.length-1) root += ".";
            }
            return getMobInfo2(data, action, lKey, id, root);
        }
        //2.outlink
        let outlink = secdata[lKey + "._outlink"];
        if(outlink) {
            let strs = outlink.split("/");
            if(strs.length > 2) {
                root = "";
                for(let i=2; i<strs.length; ++i) {
                    root += strs[i];
                    if(i < strs.length-1) root += ".";
                }
                secdata[lKey + "._outlink"] = null;
                secdata[lKey] = "<img src=\"" + root + ".png\" />";
                return getMobInfo2(data, action, lKey, strs[1]);
            }
            else {
                console.log("mob缺少条件判断2 ", lKey)
            }
        }
        //3.source  Mob/8220012.img/stand/3。大部分是指向自己其他动作，也有和outlink一样格式的情况
        let source = secdata[lKey + ".source"];
        if(source) {
            let strs = source.split("/");
            if(strs.length > 2) {
                root = "";
                for(let i=2; i<strs.length; ++i) {
                    root += strs[i];
                    if(i < strs.length-1) root += ".";
                }
                secdata[lKey + ".source"] = null;
                secdata[lKey] = "<img src=\"" + root + ".png\" />";
                return getMobInfo2(data, action, lKey, strs[1]);
            }
            else {
                console.log("mob缺少条件判断2 ", lKey)
            }
        }
        //4.正常情况
        let str = secdata[lKey];
        if(!str) {
            console.log("mob缺少条件判断3  ", lKey, secdata);
            return;
        }
        // str = str.replace(/\\/g,"");
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m += str[i];
            let msg:any = {
                strMarker:"",
                root:"",
                act:""
            };
            msg.strMarker = id + "/" + m;
            let msp:any = key.split(".");
            msg.act = msp[0];
            msg.root = key;
            for(let i:number = 0; i < msp.length-1; i++) {
                // if(msp[i] != "png") {
                    // if(i == 0) msg.root = msg.root + msp[i];
                    // else msg.root = msg.root + "." + msp[i];
                // }
            }
            // console.log("xxxx . " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
            //这里是最终出口
            return msg;
        }
        //5.指向数字
        let numLink =Number(str);
        if(numLink >= 0 && numLink <= 100) {
            let strs = key.split(".");
            for(let i=0; i<strs.length-1; ++i) {
                root += strs[i] + ".";
            }
            root += str;
            return getMobInfo2(data, action, root, id, root);
        }
        //6.  ../相关，包括../  ../../  attack1/0
        //../../
        while(str.indexOf("../") == 0) {
            str = str.substr(3);
        }
        let strs = str.split("/");
        root = "";
        for(let i=0; i<strs.length; ++i) {
            root += strs[i];
            if(i < strs.length-1) root += ".";
        }
        action = strs[0];
        return getMobInfo2(data, action, root, id, root);
        // console.log("mob缺少条件判断  ");
    }
    //获得skill目录
    export function getSkillInfo(str:string, _path:string, data:any): any {
        let m:string = "";
        let root:string = "";

        if(!str) {
            console.log("skillerr " + _path);
            return ;
        }

        //
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m = m + str[i];

            let msg:any = {
                strMarker:"",
                root:"",
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.act = msp[0] + "." + msp[1];
            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            // console.log("xxxx . " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
            //这里是最终出口
            return msg;
        }
        else if(Number(str) >= 0 && Number(str) <= 100) {
            //skill.2201005.hit.0.7
            let m = _path.split(".");
            let _m = "";
            for(let i:number = 0; i < m.length - 1; i++) {
                _m += m[i];
                _m += ".";
            }
            _m += str;
            return this.getSkillInfo(data[_m], _m, data);
        }
        else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] != ".") {
            let m = _path.split(".");
            let _str = str.split("/");
            let _m = m[0] + "." + m[1] + "." + m[2] + "." + _str[1] + "." + _str[2];
            // console.log("&&&&&",str, _m);
            return this.getSkillInfo(data[_m], _m, data);
        }
        else {
            // console.log(str, _path);
            console.log("skill缺少条件判断");
        }
    }
    //获得Summon目录
    export function getSummonInfo(str:string, act:string, id:string): any {
        // console.log(str + "  " + act + "  " + id);
        let m:string = "";
        let root:string = "";
        // str = str.replace(/\\/g,"");
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m = m + str[i];
            let msg:any = {
                strMarker:"",
                root:"",
                act:""
            };
            msg.strMarker = m;
            // console.log("xxxx . " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
            //这里是最终出口
            return msg;
        }
        //../die/0  attack1  3121006
        else if(str[0] == "." && str[1] == "." && str[2] == "/") {
            let job = Math.floor(Number(id) / 10000);
            let data:any = msMoudle.wz[job + ".img"]["skill." + id];
            let newstr = str.split("/");
            let root:string = "skill." + id + ".summon." + newstr[1] + "." + newstr[2];
            return this.getSummonInfo(data[root], newstr[1], id);
        }
        else {
            console.log("Summon缺少条件判断  ");
        }
    }
    //获得坐骑目录
    export function getTamingMob0Info(str:string, act:string, id:string, mid:string) : any {
        // console.log(str + "  " + act + "  " + id + "  " + mid);
        let m:string = "";
        let root:string = "";
        // str = str.replace(/\\/g,"");
        //img src =
        //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) {
                m = m + str[i];
            }

            let msg:any = {
                strMarker:"",
                root:"",
                act:""
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.act = msp[1];

            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            // console.log("xxxx . " + msg.strMarker + "  " + msg.root + "  " + msg.act + "  " + msg.delay);
            //这里是最终出口
            return msg;
        }
        //../../
        //../../stand1/0/1
        else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] == "." && str[4] == "." && str[5] == "/") {
            // console.log(str + "  有../../");
            for(let i:number = 6; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            let data:any = msMoudle.wz[mid][id + "." + m.split(".")[0]];
            return this.getTamingMob0Info(data[id + "." + m], m.split(".")[0], id, mid);
        }
        //../1/0
        else if(str[0] == "." && str[1] == "." && str[2] == "/") {
            m = id + "." + act + ".";
            let newStr = str.split("/");
            m += newStr[1] + "." + newStr[2];
            let data:any = msMoudle.wz[mid][id + "." + act];
            return this.getTamingMob0Info(data[m], act, id, mid);
        }
        else {
            console.log("TamingMob0缺少条件判断");
        }
    }
    //获得obj目录
    export function getObjInfo(str:string, root2:string, data:any): any {
        let m:string = "";
        let root:string = "";
        // str = str.replace(/\\/g,"");
        //img src =
        //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m = m + str[i];

            let msg:any = {
                strMarker:"",
                root:"",
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.act = msp[0];
            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            //这里是最终出口
            return msg;
        }
        else if(str[0] == "." && str[1] == "." && str[2] == "/") {
            // console.log(str + "  有../");
            let _ = root2.split(".");
            m = _[0] + "." + _[1] + ".";
            for(let i:number = 3; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            return this.getObjInfo(data[m], root2, data);   //这个root2是有问题的
        }
        else if(Number(str) >= 0 && Number(str) <= 100) {
            let root = root2 + str;
            return msMoudle.getObjInfo(data[root], root2, data);
        }
        else {
            console.log("obj缺少条件判断    " + str);
        }
    }
    //获得nameTag目录
    export function getNameTagInfo(str:string) : any {
        let m:string = "";
        // str = str.replace(/\\/g,"");
        //img src =
        //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) m = m + str[i];
            return m;
        }
        else {
            console.log("nametag缺少条件判断");
        }
    }
    //获得window目录
    export function getWindowInfo(str:string, id:string): any {
        // console.log(str);
        let m:string = "";
        // str = str.replace(/\\/g,"");
        //img src =
        //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) {
                m = m + str[i];
            }

            let msg:any = {
                strMarker:"",
                root:"",
                id:""
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.id = msp[0];
            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            return msg;
        }
        else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] == "." && str[4] == "." && str[5] == "/") {
            for(let i:number = 6; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            let data:any = msMoudle.wz[id][m.split(".")[0]];
            return this.getWindowInfo(data[m], id);
        }
        // else if(Number(str) >= 0 && (Number(str) <= 100)) {
        //     let data:any = msMoudle.wz[id][act];
        //     m = act + "." + str;
        //     return this.getWindowInfo(data[m], act, id);
        // }
        else {
            console.log("window缺少条件判断", str, id);
        }
    }
    //获得morph目录
    export function getMorPhInfo(str:string, id:string, morph:string = ""): any {
        // console.log(str);
        let m:string = "";
        // str = str.replace(/\\/g,"");
        //img src =
        //<tr><td>swingOF.3.weapon</td><td><img src="swingOF.3.weapon.png" /></td></tr>
        if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
        str[6] == "r" && str[7] == "c" && str[8] == "=") {
            //查找 ／>的位置
            let index:number = 0;
            for(let i:number = 0; i < str.length; i++) {
                if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                    index = i - 1;
                    break;
                }
            }
            //10 index
            for(let i:number = 10; i < index; i++) {
                m = m + str[i];
            }

            let msg:any = {
                strMarker:"",
                root:"",
                id:""
            };
            msg.strMarker = m;
            let msp:any = m.split(".");
            msg.id = msp[0];
            for(let i:number = 0; i < msp.length; i++) {
                if(msp[i] != "png") {
                    if(i == 0) msg.root = msg.root + msp[i];
                    else msg.root = msg.root + "." + msp[i];
                }
            }
            return msg;
        }
        else if(str[0] == "." && str[1] == "." && str[2] == "/" && str[3] == "." && str[4] == "." && str[5] == "/") {
            for(let i:number = 6; i < str.length; i++) {
                if(str[i] == "/") m = m + ".";
                else m = m + str[i];
            }
            let data:any = msMoudle.wz[id][m.split(".")[0]];
            return this.getMorPhInfo(data[m], id);
        }
        else if(str[0] == "." && str[1] == "." && str[2] == "/") {
            // console.log(str + "  有../");
            let _ = str.split("/");
            m = _[1] + "." + _[2];
            // m = _[0] + "." + _[1] + ".";
            // for(let i:number = 3; i < str.length; i++) {
            //     if(str[i] == "/") m = m + ".";
            //     else m = m + str[i];
            // }
            let data:any = msMoudle.wz["M" + morph + ".img"][_[1]];
            // console.log(m, id, data[m], data)
            return this.getMorPhInfo(data[m], _[1]);   //这个root2是有问题的
        }
        else if(Number(str) >= 0 && (Number(str) <= 100)) {
            let data:any = msMoudle.wz["M" + morph + ".img"][id];
            m = id + "." + str;
            return this.getMorPhInfo(data[m], id, morph);
        }
        else {
            console.log("MorPh缺少条件判断", str, id);//0 stand
        }
    }
    //通用提示(0无意义-黑白，1成功-绿色，2失败-红色)
    export function toast(msg: string) {
        let txt:Laya.Label = new Laya.Label();
        txt.fontSize = 26;
        txt.color = "#ffffff";
        txt.text = msg;
        txt.strokeColor = "#000000";
        txt.stroke = 3;
        txt.zOrder = 9999999;
        txt.pos(Laya.stage.width / 2 - txt.width / 2, Laya.stage.height / 2);
        Laya.stage.addChild(txt);
        Laya.Tween.to(txt, { y: 0, alpha:0 }, 2500);
        Laya.timer.once(2500, this, () => {
            txt.removeSelf();
            txt = null;
        });
    }
    export function xianzhiTest(id:string) : boolean {
        if(msMoudle.guaList.length > 0) {
            for(let i:number = 0; i < msMoudle.guaList.length; i++) {
                if(msMoudle.guaList[i] == id) {
                    return true;
                }
            }
        }
        return false;
    }
    export function isGua() : boolean {
        // if(msMoudle.guaList.length > 0) {
        //     for(let i:number = 0; i < msMoudle.guaList.length; i++) {
        //         if(msMoudle.guaList[i] == ms._user) {
        //             return true;
        //         }
        //     }
        // }
        return false;
    }
    export function guaTest() : boolean {
        //防止挂逼进入
        //外挂名单
        // if(this.isGua() == true) {
        //      ms.herodata = null;
        //     return true;
        // }
        //货币检测
        // ms.jinbi() > 5000000 ||
        // if(ms.jinbi() > 60000000 || ms.rongyu() > 2000000 || ms.zuanshi() > 20000) {
        //     // msMoudle.toast2("发现开挂a,若再启动,将触发自毁程序删除你所有磁盘文件,设备将会报废");
        //     ms.herodata = null;
        //     // ms.saveServer();
        //     return true;
        // }
        //神卡、充值、等级关系
        // if(ms.test_cz == 0) {   //不充钱
        //     if(ms.daytotal < 5) {       //等级小于50级
        //         if(ms.test_sk >= 2) {
        //             ms.herodata = null;
        //             return true;    //拥有1张神卡
        //         }
        //     }
        //     else if(ms.daytotal < 10) {
        //         if(ms.test_sk >= 3) {
        //             ms.herodata = null;
        //             return true;    //拥有2张神卡
        //         }
        //     }
        // }
        // else if(ms.test_cz <= 10) {
        //     if(ms.herodata.Lv < 50) {       //等级小于50级
        //         if(ms.test_sk >= 2) {
        //             ms.herodata = null;
        //             return true;    //拥有2张神卡
        //         }
        //     }
        //     else if(ms.herodata.Lv < 100) {
        //         if(ms.test_sk >= 3) {
        //             ms.herodata = null;
        //             return true;    //拥有3张神卡
        //         }
        //     }
        // }
        //充值点书对应黑金(只要记录为作弊就封号)
        //等级检测
        if(ms.herodata.Lv > 200) {
            // ms.saveServer();
            // msMoudle.toast2("发现开挂b,若再启动,将触发自毁程序删除你所有磁盘文件,设备将会报废");
            ms.herodata = null;
            return true;
        }
        // //属性
        // if(ms.herodata.PADamage.baseVal > 999999 || ms.herodata.MADamage.baseVal > 999999 || ms.herodata.Accurate.baseVal > 200 || ms.herodata.Evasion.baseVal > 85 || ms.herodata.CriticalRate.baseVal > 85) {
        //     // ms.saveServer();
        //     // msMoudle.toast2("发现开挂c,若再启动,将触发自毁程序删除你所有磁盘文件,设备将会报废");
        //     ms.herodata = null;
        //     return true;
        // }
        // //等级和攻击的关系
        // if(ms.herodata.Lv < 100) {
        //         if(ms.herodata.PADamage.baseVal > ms.herodata.Lv * 500 || ms.herodata.MADamage.baseVal * 500) {
        //         // ms.saveServer();
        //         // msMoudle.toast2("发现开挂d,若再启动,将触发自毁程序删除你所有磁盘文件,设备将会报废");
        //         ms.herodata = null;
        //         return true;
        //     }
        // }
        return false;
    }
    export function toast2(msg: string, center:boolean = true) {
        ui.show(app.fuben.msgDlg, {params:[msg, 101, center], black:true});
    }
    export function toast3(msg: string) {
        if(msMoudle.mainT.m_msgList)
            msMoudle.mainT.m_msgList.msgShow(0, msg);
    }
//////////////////////逻辑相关
    export function buyShop(data:any, buynum:number = 1) : void {
        if(data.pricetype == 1) {
            if(ms.jinbi() < data.price * buynum) {
                msMoudle.toast("金币不足");
                return ;
            }
            msMoudle._(); msMoudle.updateJinBi(- Number(data.price) * buynum);
        }
        else if(data.pricetype == 2) {
            if(ms.rongyu() < data.price * buynum) {
                msMoudle.toast("枫叶不足");
                return ;
            }
            msMoudle._(); msMoudle.updateRongYu(- Number(data.price) * buynum);
        }
        else if(data.pricetype == 3) {
            if(ms.zuanshi() < data.price * buynum) {
                msMoudle.toast("黑金不足");
                return ;
            }
            msMoudle._(); msMoudle.updateZuanShi( - Number(data.price) * buynum, 201);


        }
        for(let __:number = 0; __ < buynum; __++) {
            if(data.type == 0) {
                let itemid = data.id;
                let newitemid:string;

                let _idx = 0;
                for(let key in msMoudle.shopjson) {
                    if(msMoudle.shopjson[key].id == itemid) {
                        if(!ms.shops[2 + _idx]) ms.shops[2 + _idx] = 0;
                        ms.shops[2 + _idx]++;           //购买记录
                        break;
                    }
                    _idx++;
                }

                if(itemid == "987654321") {
                    let rnk:number = msMoudle.getRandValue(1000, 0, 49000);
                    msMoudle._(); msMoudle.updateJinBi(rnk);
                }
                else if(itemid == "987654322") {
                    msMoudle._(); msMoudle.updateRongYu(1000);
                }
                else if(itemid == "987654328") {
                    msMoudle._(); msMoudle.updateJiFen(2500);
                }
                else if(itemid == "987654329") {
                    msMoudle._(); msMoudle.updateCaiLiao2(5000);
                }
                else if(itemid == "1234554") {
                    ms.dayguaji += 10 * 60 * 1000;
                }
                else if(itemid == "700000000") {
                    msMoudle._(); msMoudle.updateCaiLiao1(1)
                }
                else if(itemid == "800000000") {        //觉醒
                    msMoudle._(); msMoudle.updateJueXing1(1);
                }
                else if(itemid == "700000001") {
                    msMoudle._(); msMoudle.updateCaiLiao1(30)
                }
                else if(itemid == "600000001") {
                    msMoudle._(); msMoudle.updateMartPai(1);
                }
                else if(itemid == "800000001") {        //觉醒
                    msMoudle._(); msMoudle.updateJueXing1(30);
                }
                else if(itemid == "900000001") {
                    msMoudle._(); msMoudle.updateCaiLiao2(30);
                }
                else if(itemid == "900000002") {
                    ms.Exp2 += 1;
                }
                else if(itemid == "900000003") {
                    ms.Exp3 += 1;
                }
                else if(itemid == "900000004") {
                    ms.Exp10 += 1;
                }
                else if(itemid == "900000010") {
                    ms.Exp100 += 1;
                }
                else if(itemid == "900000005") {
                    ui.show(app.shop.changeNameDlg, {white:true});
                }
                else if(itemid == "900000006") {
                    for(let i:number = 0; i < 199; i++) {
                        ms.herodata.MaxHP.baseVal += msMoudle.getRandValue(12, 0, 5);
                        ms.herodata.MaxMP.baseVal += msMoudle.getRandValue(10, 0, 3);

                        ms.herodata.MaxMP.baseVal += ms.herodata.Inte.GetSum() / 10;
                        ms.herodata.MaxHP.baseVal = Math.min(ms.herodata.MaxHP.totalMax, Math.abs(ms.herodata.MaxHP.baseVal));
                        ms.herodata.MaxMP.baseVal = Math.min(ms.herodata.MaxMP.totalMax, Math.abs(ms.herodata.MaxMP.baseVal));

                        if(ms.herodata.ZS == 0) {
                            ms.herodata.Str.baseVal += 1;
                            ms.herodata.Dex.baseVal += 1;
                            ms.herodata.Luck.baseVal += 1;
                            ms.herodata.Inte.baseVal += 1;
                        }
                        for(let _:number = 0; _ < 5; _++) {
                            let rnk = msMoudle.getRandValue(0, 0, 4);
                            if(rnk == 0) ms.herodata.Str.baseVal += 1;
                            else if(rnk == 1) ms.herodata.Dex.baseVal += 1;
                            else if(rnk == 2) ms.herodata.Inte.baseVal += 1;
                            else if(rnk == 3) ms.herodata.Luck.baseVal += 1;
                        }
                    }
                    msMoudle._(); msMoudle.updateZhuanSheng(1);
                }
                else if(itemid == "900000007") {
                    msMoudle._(); msMoudle.updateZhiHuan(1);
                }
                else if(itemid == "900000017") {
                    //重置属性
                    msMoudle.reAbi();
                }
                else if(itemid == "900000067") {
                    msMoudle.buyEff(0);
                }
                else if(itemid == "900000068") {
                    msMoudle.buyEff(1);
                }
                else if(itemid == "900000069") {
                    let message = new Net.Message();
                    message.xieyi = 666 + ms._dpip;
                    let str = maplejson["sound"].split(",");
                    let _s = 0;
                    _s = msMoudle.getRandValue(0, 0, str.length);
                    if(_s >= str.length) _s = 1;
                    str = str[_s];

                    message.msdata = ms.herodata.Name + "w#z" + str;
                    msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                        if(data["msdata"] && data["xieyi"] == 666 + ms._dpip) {

                            msMoudle.playMusic("res/Sound/" + str + ".mp3");

                            msMoudle.mapP.payAvatarMegaphone(0, false, "玩家:" + ms.herodata.Name + " 向全服点播了一首" + str, true);

                        }
                    }});
                }
                else if(itemid == "900000070") {
                    ms.ch = true;
                }
                else if(itemid == "900000000") {
                    let ___ = msMoudle.getRandValue(0, 0, 5);
                    if(___ == 0) {
                        ms.zhuanpan += 1;
                    }
                    else if(___ == 1) {
                        ms.miwu += 1;
                    }
                    else if(___ == 2) {
                        // ms.tiaotiao += 1;
                        ms.zhuanpan += 1;
                    }
                    else if(___ == 3) {
                        ms.zhuanpan += 1;
                    }
                    else if(___ == 4) {
                        ms.zhuzhu += 1;
                    }

                }
                //随机装备
                else if(itemid == "9999") {
                    msMoudle._(); msMoudle.getWeapon(msMoudle.rnkEqp());
                }
                //随机卷轴
                else if(itemid == "9998") {
                    // msMoudle._(); msMoudle.getItem(msMoudle.AllJuanZhousBC[msMoudle.getRandValue(0, 0, msMoudle.AllJuanZhousBC.length)]);
                    // let bc:boolean = false;
                    // if(msMoudle.getRandValue(0, 0, 100) < 10) bc = true;
                    let itemId = msMoudle.rnkJuanZhou();
                    msMoudle._(); msMoudle.getItem(itemId);
                }
                else {
                    msMoudle._(); this.getItem(itemid);
                }
            }
            //时装
            else if(data.type == 2) {
                let ___ = ms.fashionbagsdata.length;
                ms.fashionbagsdata[___] = new Object();
                ms.fashionbagsdata[___].openid = msMoudle.getRandValue(1000, 0, 1000000);
                ms.fashionbagsdata[___].id = data.id;
            }
            //宠物
            else if(data.type == 3) {
                // ms.petbagsdata[ms.petbagsdata.length] = data.id;
                let ___ = ms.petbagsdata.length;
                ms.petbagsdata[___] = new Object();
                ms.petbagsdata[___].openid = msMoudle.getRandValue(1000, 0, 1000000);
                ms.petbagsdata[___].id = data.id;
            }
            //坐骑
            else if(data.type == 4) {
                // ms.tamingmobbagsdata[ms.tamingmobbagsdata.length] = data.id;
                let ___ = ms.tamingmobbagsdata.length;
                ms.tamingmobbagsdata[___] = new Object();
                ms.tamingmobbagsdata[___].openid = msMoudle.getRandValue(1000, 0, 1000000);
                ms.tamingmobbagsdata[___].id = data.id;
            }
            //戒指
            else if(data.type == 5) {
                let ___ = ms.ringbagsdata.length;
                ms.ringbagsdata[___] = new Object();
                ms.ringbagsdata[___].openid = msMoudle.getRandValue(1000, 0, 1000000);
                ms.ringbagsdata[___].id = data.id;
            }
            //椅子
            else if(data.type == 6) {
                let ___ = ms.chairbagsdata.length;
                ms.chairbagsdata[___] = new Object();
                ms.chairbagsdata[___].openid = msMoudle.getRandValue(1000, 0, 1000000);
                ms.chairbagsdata[___].id = data.id;
            }
            else {
                msMoudle._(); msMoudle.getWeapon(data.id);
            }
        }
        ms.saveServer();
        msMoudle.toast("购买成功");
    }


    export function buyEff(rnk:number) : void {

        if(rnk == 0) {
            ms.numberEff = 0;
        }
        else {
            let _rnk:Array<number> = [4, 5, 8, 13, 26, 34, 35, 40, 51, 87, 91, 93,
            116, 127, 131, 133, 137, 177, 247, 1125, 1140, 1317, 1377];
            let _ = msMoudle.getRandValue(0, 0, _rnk.length);
            if(_ >= _rnk.length) _ = 1;
            ms.numberEff = _rnk[_];
        }

        if(ms.numberEff > 0) {
            let mapres:Array<any> = [];
            let Miss = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0.Miss.png"
            if(!Laya.loader.getRes(Miss)) {
                mapres.push({ url: Miss });
            }
            for(let i:number = 0; i < 9; i++) {
                let NoCri1 = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoCri1." + i + ".png"
                if(!Laya.loader.getRes(NoCri1)) {
                    mapres.push({ url: NoCri1 });
                }
                let NoRed0 = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0." + i+ ".png"
                if(!Laya.loader.getRes(NoRed0)) {
                    mapres.push({ url: NoRed0 });
                }
            }

            //chinese
            msLoad.load(mapres).done(dlg => {
            });
        }

    }

    export function reAbi() : void {

        if(ms.herodata.ZS > 0 && ms.test_cz > 0) {
            let rnk1 = msMoudle.getRandValue(0, 0, 4);  //属性1
            let rnk2 = msMoudle.getRandValue(0, 0, 4);  //属性2
            let rnk = msMoudle.getRandValue(5, 0, 20);  //变化的点数
            msMoudle.toast("属性发生了某种变化");
            if(rnk1 == 0) ms.herodata.Str.baseVal -= rnk;
            else if(rnk1 == 1) ms.herodata.Dex.baseVal -= rnk;
            else if(rnk1 == 2) ms.herodata.Inte.baseVal -= rnk;
            else if(rnk1 == 3) ms.herodata.Luck.baseVal -= rnk;

            if(rnk2 == 0) ms.herodata.Str.baseVal += rnk;
            else if(rnk2 == 1) ms.herodata.Dex.baseVal += rnk;
            else if(rnk2 == 2) ms.herodata.Inte.baseVal += rnk;
            else if(rnk2 == 3) ms.herodata.Luck.baseVal += rnk;
        }

        //力量    敏捷  智力  运气


        // if(ms.herodata.Lv > 1 || ms.herodata.ZS > 0) {
        //     ms.herodata.Str.baseVal = 11;
        //     ms.herodata.Dex.baseVal = 11;
        //     ms.herodata.Luck.baseVal = 11;
        //     ms.herodata.Inte.baseVal = 11;

        //     ms.herodata.MaxHP.baseVal = msMoudle.getRandValue(200, 0, 50);
        //     ms.herodata.MaxMP.baseVal = 100;
        //     //属性重置
        //     let num = ms.herodata.Lv + ms.herodata.ZS * 199;//3000*10
        //     for(let i:number = 0; i < num; i++) {
        //         ms.herodata.MaxHP.baseVal += msMoudle.getRandValue(12, 0, 5);
        //         ms.herodata.MaxMP.baseVal += msMoudle.getRandValue(10, 0, 3);

        //         ms.herodata.MaxMP.baseVal += ms.herodata.Inte.GetSum() / 10;
        //         ms.herodata.MaxHP.baseVal = Math.min(ms.herodata.MaxHP.totalMax, Math.abs(ms.herodata.MaxHP.baseVal));
        //         ms.herodata.MaxMP.baseVal = Math.min(ms.herodata.MaxMP.totalMax, Math.abs(ms.herodata.MaxMP.baseVal));
        //         if(i < 199) {
        //             ms.herodata.Str.baseVal += 1;
        //             ms.herodata.Dex.baseVal += 1;
        //             ms.herodata.Luck.baseVal += 1;
        //             ms.herodata.Inte.baseVal += 1;
        //         }
        //         for(let _:number = 0; _ < 5; _++) {
        //             let rnk = msMoudle.getRandValue(0, 0, 4);
        //             if(rnk == 0) ms.herodata.Str.baseVal += 1;
        //             else if(rnk == 1) ms.herodata.Dex.baseVal += 1;
        //             else if(rnk == 2) ms.herodata.Inte.baseVal += 1;
        //             else if(rnk == 3) ms.herodata.Luck.baseVal += 1;
        //         }
        //     }
        //     //
        // }
    }

    //合成装备
    export function rnkEqp(lv:number = 160, isHC:boolean = false) : string {
        let allEqp:Array<string> = [];
        for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
            //不产出
            if(msMoudle.AllWeapon[i] != "01382235" && msMoudle.AllWeapon[i] != "01402180" && msMoudle.AllWeapon[i] !=  "01592021") {
                allEqp[allEqp.length] = msMoudle.AllWeapon[i];
            }
        }
        for(let i:number = 0; i < msMoudle.AllLongCoat.length; i++)
            allEqp[allEqp.length] = msMoudle.AllLongCoat[i];
        for(let i:number = 0; i < msMoudle.AllCape.length; i++)
            allEqp[allEqp.length] = msMoudle.AllCape[i];
        for(let i:number = 0; i < msMoudle.AllShield.length; i++)
            allEqp[allEqp.length] = msMoudle.AllShield[i];

        for(let i:number = 0; i < msMoudle.AllGlove.length; i++)
            allEqp[allEqp.length] = msMoudle.AllGlove[i];
        for(let i:number = 0; i < msMoudle.AllShoes.length; i++)
            allEqp[allEqp.length] = msMoudle.AllShoes[i];

        //不产出
        // if(ms.test_cz >= 500 && isHC == false) {
        //     for(let i:number = 0; i < msMoudle.AllCap.length; i++) allEqp[allEqp.length] = msMoudle.AllCap[i];
        // }

        for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory1[i];
        for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory2[i];
        for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory3[i];
        for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory4[i];
        for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory5[i];
        for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++)
            allEqp[allEqp.length] = msMoudle.AllAccessory6[i];
        //合成限制等级
        if(isHC) {
            let newEqp:Array<string> = [];
            for(let i:number = 0; i < allEqp.length; i++) {
                let eqp:any = msMoudle.getEqpMsg(allEqp[i]);
                // if(eqp.reqLevel <= lv && !eqp.cash) {
                //     newEqp[newEqp.length] = allEqp[i];
                // }
                newEqp[newEqp.length] = allEqp[i];
            }
            if(newEqp.length > 0) return newEqp[msMoudle.getRandValue(0, 0, newEqp.length)];
            else return "";
        }
        else {
            let newEqp:Array<string> = [];
            for(let i:number = 0; i < allEqp.length; i++) {
                let eqp:any = msMoudle.getEqpMsg(allEqp[i]);
                if(!eqp.cash) {
                    newEqp[newEqp.length] = allEqp[i];
                }
            }
            if(newEqp.length > 0) return newEqp[msMoudle.getRandValue(0, 0, newEqp.length)];
            else return "";
        }
    }

    /////这里只能通过扭蛋获得
    // export function rnkSpEqp(isboss:boolean = false) : string {
    //     let allEqp:Array<string> = [];
    //     //武器
    //     // for(let i:number = 0; i < msMoudle.AllWeapon2.length; i++)
    //     //     allEqp[allEqp.length] = msMoudle.AllWeapon2[i];
    //     for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
    //         // if(msMoudle.getWeaponType(msMoudle.AllWeapon[i]) == "长杖") {
    //             allEqp[allEqp.length] = msMoudle.AllWeapon[i];
    //         // }
    //         // else if(msMoudle.getWeaponType(msMoudle.AllWeapon[i]) == "短刀") {
    //         //     allEqp[allEqp.length] = msMoudle.AllWeapon[i];
    //         // }
    //         // else if(msMoudle.getWeaponType(msMoudle.AllWeapon[i]) == "单手剑") {
    //         //     allEqp[allEqp.length] = msMoudle.AllWeapon[i];
    //         // }
    //         // else if(msMoudle.getWeaponType(msMoudle.AllWeapon[i]) == "弓") {
    //         //     allEqp[allEqp.length] = msMoudle.AllWeapon[i];
    //         // }
    //     }
    //     //上衣
    //     for(let i:number = 0; i < msMoudle.AllCoat.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllCoat[i];
    //     //裤子
    //     for(let i:number = 0; i < msMoudle.AllPants.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllPants[i];
    //     //鞋子
    //     for(let i:number = 0; i < msMoudle.AllShoes.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllShoes[i];
    //     //手套
    //     for(let i:number = 0; i < msMoudle.AllGlove.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllGlove[i];
    //     // if(isboss) {
    //     //帽子
    //     for(let i:number = 0; i < msMoudle.AllCap.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllCap[i];
    //     // }
    //     //披风
    //     for(let i:number = 0; i < msMoudle.AllCape.length; i++)
    //         allEqp[allEqp.length] = msMoudle.AllCape[i];

    //     // //时装
    //     // let newEqp:Array<string> = [];
    //     // for(let i:number = 0; i < allEqp.length; i++) {
    //     //     let eqp:any = msMoudle.getEqpMsg(allEqp[i]);
    //     //     if(eqp.cash == 1) {
    //     //         newEqp[newEqp.length] = allEqp[i];
    //     //     }
    //     // }
    //     // if(newEqp.length > 0) return newEqp[msMoudle.getRandValue(0, 0, newEqp.length)];
    //     // else return "";
    //     ///身上的不清除
    //     return allEqp[msMoudle.getRandValue(0, 0, allEqp.length)];
    // }

    export function rnkJuanZhou(bc:boolean = false) : string {
        let allJuanZhou:Array<string> = [];
        if(bc) {
            for(let i:number = 0; i < msMoudle.AllJuanZhousBC.length; i++)
                allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhousBC[i];
        }
        else {
            // if(msMoudle.getRandValue(0, 0, 100) <= 30) {
                for(let i:number = 0; i < msMoudle.AllJuanZhous1.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous1[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous2.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous2[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous3.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous3[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous4.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous4[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous5.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous5[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous6.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous6[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous7.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous7[i];

                for(let i:number = 0; i < msMoudle.AllJuanZhous8.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous8[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous9.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous9[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous10.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous10[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous11.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous11[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous12.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous12[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous13.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous13[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous14.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous14[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous15.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous15[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous16.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous16[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous17.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous17[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous18.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous18[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous19.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous19[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous20.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous20[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous21.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous21[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous22.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous22[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous23.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous23[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous24.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous24[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous25.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous25[i];
                for(let i:number = 0; i < msMoudle.AllJuanZhous26.length; i++)
                    allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous26[i];
            // }
            // else {
            //     for(let i:number = 0; i < msMoudle.AllJuanZhous100.length; i++)
            //         allJuanZhou[allJuanZhou.length] = msMoudle.AllJuanZhous100[i];
            // }
        }
        return allJuanZhou[msMoudle.getRandValue(0, 0, allJuanZhou.length)];
    }

    export function getReward(data:any) : void {
        let rnk:number = msMoudle.getRandValue(1, 0, 1000000);
        let tIndex:number = ms.bagsdata.length;
        ms.bagsdata[tIndex] = new Object();
        ms.bagsdata[tIndex].id = data.id;
        ms.bagsdata[tIndex].type = data.type;
        ms.bagsdata[tIndex].num = 1;
        ms.bagsdata[tIndex].openid = rnk;

        if(msMoudle.getEqpType(data.id) != -1) {        //装备类型
            let eqpabi:any = msMoudle.wz["0" + data.id + ".img"]["info"];
            ms.bagsdata[tIndex].tuc = eqpabi["info.tuc"] ? Number(eqpabi["info.tuc"]) : 0;//升级次数
            ms.bagsdata[tIndex].price = eqpabi["info.price"] ? Number(eqpabi["info.price"]) : 0;//价格
            ms.bagsdata[tIndex].suc = 0;//强化成功次数

            ms.bagsdata[tIndex].incPAD = eqpabi["info.incPAD"] ? Number(eqpabi["info.incPAD"]) : 0;//增加攻击力
            ms.bagsdata[tIndex].incMAD = eqpabi["info.incMAD"] ? Number(eqpabi["info.incMAD"]) : 0;//增加魔法力
            ms.bagsdata[tIndex].incPDD = eqpabi["info.incPDD"] ? Number(eqpabi["info.incPDD"]) : 0;//增加物理防御力
            ms.bagsdata[tIndex].incMDD = eqpabi["info.incMDD"] ? Number(eqpabi["info.incMDD"]) : 0;//增加魔法防御力
            ms.bagsdata[tIndex].incSTR = eqpabi["info.incSTR"] ? Number(eqpabi["info.incSTR"]) : 0;//增加力量
            ms.bagsdata[tIndex].incDEX = eqpabi["info.incDEX"] ? Number(eqpabi["info.incDEX"]) : 0;//增加敏捷
            ms.bagsdata[tIndex].incINT = eqpabi["info.incINT"] ? Number(eqpabi["info.incINT"]) : 0;//增加智力
            ms.bagsdata[tIndex].incLUK = eqpabi["info.incLUK"] ? Number(eqpabi["info.incLUK"]) : 0;//增加运气
            ms.bagsdata[tIndex].incMHP = eqpabi["info.incMHP"] ? Number(eqpabi["info.incMHP"]) : 0;//增加HP总值
            ms.bagsdata[tIndex].incMMP = eqpabi["info.incMMP"] ? Number(eqpabi["info.incMMP"]) : 0;//增加MP总值
            ms.bagsdata[tIndex].incACC = eqpabi["info.incACC"] ? Number(eqpabi["info.incACC"]) : 0;//增加命中率
            ms.bagsdata[tIndex].incEVA = eqpabi["info.incEVA"] ? Number(eqpabi["info.incEVA"]) : 0;//增加回避率
            ms.bagsdata[tIndex].incSPEED = eqpabi["info.incSPEED"] ? Number(eqpabi["info.incSPEED"]) : 0;//增加移动速度
            ms.bagsdata[tIndex].incJUMP = eqpabi["info.incJUMP"] ? Number(eqpabi["info.incJUMP"]) : 0;//增加跳跃力
            // console.log(ms.bagsdata[tIndex]);
        }
    }

    export function huobiReward(id:any, num:number) : void {
        if(id == "9000000") {
            msMoudle._(); msMoudle.updateJinBi(num);//, msMoudle.zsly_rnk2
        }
        else if(id == "1234561") {
            msMoudle._(); msMoudle.updateRongYu(num);//, msMoudle.zsly_rnk2
        }
        else if(id == "1234562") {
            msMoudle._(); msMoudle.updateZuanShi(num, 102);
        }
    }


    export function judgeMuBiao(guide_index:number) : void {
        // console.log("判断目标   " + guide_index + "  " + ms.guide_index)
        // if(ms.guide_ok == false) {
        //     if(guide_index == ms.guide_index) {
        //         ms.guide_ok = true;
        //         ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.ShowGuide(guide_index);
        //     }
        // }
    }
    ////////

    // export function _getItem(data:any, itemtype:number, itemid:string) : void {
    //     let have:boolean = false;
    //     for(let i:number = 0; i < ms.bagsdata.length; i++) {
    //         if(ms.bagsdata[i].openid == itemid) {
    //             have = true;
    //             ms.bagsdata[i].num += 1;
    //             break;
    //         }
    //     }
    //     if(have == false) {
    //         let tIndex:number = ms.bagsdata.length;
    //         ms.bagsdata[tIndex] = new Object();
    //         ms.bagsdata[tIndex].id = itemid;
    //         ms.bagsdata[tIndex].type = itemtype;
    //         ms.bagsdata[tIndex].num = 1;
    //         ms.bagsdata[tIndex].openid = itemid;
    //     }
    // }


    export function getWeapon2(itemid:string) : void {

        let index_path:string = msMoudle.getEqpIndex(itemid);
        ////需要加载
        if(!Laya.loader.getRes(index_path)) {
            let res:Array<any> = [];
            res.push({ url: index_path });
            msLoad.load(res).done(dlg => {
                if(!msMoudle.wz[itemid + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.getWeapon2__(itemid, index_path);
            });
        }
        else {
            if(!msMoudle.wz[itemid + ".img"]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
            }
            this.getWeapon2__(itemid, index_path);
        }
    }

    export function getWeapon2__(itemid:string, index_path:string) : void {
        let rnk:number = msMoudle.getRandValue(1, 0, 1000000);
        let id = itemid;
        let new_equip:app.model.Equip = new app.model.Equip();
        new_equip.ResetAll();
        let data:any = msMoudle.wz[id + ".img"]["info"];
        if(data) {
            new_equip.reqLevel = data["info.reqLevel"] ? Number(data["info.reqLevel"]) : 0;
            new_equip.sfx = data["info.sfx"];
            new_equip.PADamage.baseVal = data["info.incPAD"] ? Number(data["info.incPAD"]) : 0;
            new_equip.MADamage.baseVal = data["info.incMAD"] ? Number(data["info.incMAD"]) : 0;
            new_equip.PDDamage.baseVal = data["info.incPDD"] ? Number(data["info.incPDD"]) : 0;
            new_equip.MDDamage.baseVal = data["info.incMDD"] ? Number(data["info.incMDD"]) : 0;
            new_equip.Str.baseVal = data["info.incSTR"] ? Number(data["info.incSTR"]) : 0;
            new_equip.Dex.baseVal = data["info.incDEX"] ? Number(data["info.incDEX"]) : 0;
            new_equip.Inte.baseVal = data["info.incINT"] ? Number(data["info.incINT"]) : 0;
            new_equip.Luck.baseVal = data["info.incLUK"] ? Number(data["info.incLUK"]) : 0;
            new_equip.MaxHP.baseVal = data["info.incMHP"] ? Number(data["info.incMHP"]) : 0;
            new_equip.MaxMP.baseVal = data["info.incMMP"] ? Number(data["info.incMMP"]) : 0;
            new_equip.id = id;
            new_equip.type = 1;
            new_equip.num = 1;
            new_equip.suo = false;

            if(msMoudle.isCap(Number(itemid))) new_equip.part = msMoudle.partType.tCap;
            else if(msMoudle.isCape(Number(itemid))) new_equip.part = msMoudle.partType.tCape;
            else if(msMoudle.isShoes(Number(itemid))) new_equip.part = msMoudle.partType.tShoes;
            else if(msMoudle.isCoat(Number(itemid))) new_equip.part = msMoudle.partType.tCoat;
            else if(msMoudle.isPants(Number(itemid))) new_equip.part = msMoudle.partType.tPants;
            else if(msMoudle.isLongCoat(Number(itemid))) new_equip.part = msMoudle.partType.tLongcoat;
            else if(msMoudle.isShield(Number(itemid))) new_equip.part = msMoudle.partType.tShield;
            else if(msMoudle.isGlove(Number(itemid))) new_equip.part = msMoudle.partType.tGlove;
            else if(msMoudle.isAccessory1(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory1;
            else if(msMoudle.isAccessory2(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory2;
            else if(msMoudle.isAccessory3(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory3;
            else if(msMoudle.isAccessory4(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory4;
            else if(msMoudle.isAccessory5(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory5;
            else if(msMoudle.isAccessory6(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory6;
            else new_equip.part = msMoudle.partType.tWeapon;

            new_equip.openid = msMoudle.getRandValue(0, 0, 10000000);
            new_equip.suc = 0;
            new_equip.tuc = data["info.tuc"] ? Number(data["info.tuc"]) : 0;
            new_equip.price = Number(data["info.price"]);

            if(ms.herodata.BagSlots2.length > msMoudle.FASHIONMAX) return ;
            ms.herodata.BagSlots2[ms.herodata.BagSlots2.length] = new_equip;
        }
        else {
            console.log("1道具不存在" + itemid, index_path)
        }
    }

    export function getSlotWeapon(itemid:string, part:number) : void {
        if(itemid == "N") return ;
        let index_path:string = msMoudle.getEqpIndex(itemid);
        ////需要加载
        if(!Laya.loader.getRes(index_path)) {
            let res:Array<any> = [];
            res.push({ url: index_path });
            msLoad.load(res).done(dlg => {
                if(!msMoudle.wz[itemid + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.getWeapon3__(itemid, index_path, part);
            });
        }
        else {
            if(!msMoudle.wz[itemid + ".img"]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
            }
            this.getWeapon3__(itemid, index_path, part);
        }
    }

    export function getWeapon3__(itemid:string, index_path:string, part:number) : void {
        let rnk:number = msMoudle.getRandValue(1, 0, 1000000);
        let id = itemid;
        let new_equip:app.model.Equip = new app.model.Equip();
        new_equip.ResetAll();
        let data:any = msMoudle.wz[id + ".img"]["info"];
        if(data) {
            new_equip.reqLevel = data["info.reqLevel"] ? Number(data["info.reqLevel"]) : 0;
            new_equip.sfx = data["info.sfx"];
            new_equip.PADamage.baseVal = data["info.incPAD"] ? Number(data["info.incPAD"]) : 0;
            new_equip.MADamage.baseVal = data["info.incMAD"] ? Number(data["info.incMAD"]) : 0;
            new_equip.PDDamage.baseVal = data["info.incPDD"] ? Number(data["info.incPDD"]) : 0;
            new_equip.MDDamage.baseVal = data["info.incMDD"] ? Number(data["info.incMDD"]) : 0;
            new_equip.Str.baseVal = data["info.incSTR"] ? Number(data["info.incSTR"]) : 0;
            new_equip.Dex.baseVal = data["info.incDEX"] ? Number(data["info.incDEX"]) : 0;
            new_equip.Inte.baseVal = data["info.incINT"] ? Number(data["info.incINT"]) : 0;
            new_equip.Luck.baseVal = data["info.incLUK"] ? Number(data["info.incLUK"]) : 0;
            new_equip.MaxHP.baseVal = data["info.incMHP"] ? Number(data["info.incMHP"]) : 0;
            new_equip.MaxMP.baseVal = data["info.incMMP"] ? Number(data["info.incMMP"]) : 0;
            new_equip.id = id;
            new_equip.type = 1;
            new_equip.num = 1;
            new_equip.suo = false;

            if(msMoudle.isCap(Number(itemid))) new_equip.part = msMoudle.partType.tCap;
            else if(msMoudle.isCape(Number(itemid))) new_equip.part = msMoudle.partType.tCape;
            else if(msMoudle.isShoes(Number(itemid))) new_equip.part = msMoudle.partType.tShoes;
            else if(msMoudle.isCoat(Number(itemid))) new_equip.part = msMoudle.partType.tCoat;
            else if(msMoudle.isPants(Number(itemid))) new_equip.part = msMoudle.partType.tPants;
            else if(msMoudle.isLongCoat(Number(itemid))) new_equip.part = msMoudle.partType.tLongcoat;
            else if(msMoudle.isShield(Number(itemid))) new_equip.part = msMoudle.partType.tShield;
            else if(msMoudle.isGlove(Number(itemid))) new_equip.part = msMoudle.partType.tGlove;
            else if(msMoudle.isAccessory1(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory1;
            else if(msMoudle.isAccessory2(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory2;
            else if(msMoudle.isAccessory3(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory3;
            else if(msMoudle.isAccessory4(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory4;
            else if(msMoudle.isAccessory5(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory5;
            else if(msMoudle.isAccessory6(Number(itemid))) new_equip.part = msMoudle.partType.tAccessory6;
            else new_equip.part = msMoudle.partType.tWeapon;

            new_equip.openid = msMoudle.getRandValue(0, 0, 10000000);
            new_equip.suc = 0;
            new_equip.tuc = data["info.tuc"] ? Number(data["info.tuc"]) : 0;
            new_equip.price = Number(data["info.price"]);


            let eSlots = msMoudle.getSlotByJob(ms.selHero);
            // eSlots[part] = new_equip;
            let eObj:any = new Object();
            eObj.openid = new_equip.openid;
            eObj.id = new_equip.id;


            // console.log("###", eSlots)
            eSlots[part] = eObj
        }
        else {
            console.log("3道具不存在" + itemid, index_path)
        }
    }

    export var task_tap:number = 0;
    export var chengjiu_tap:number = 0;
    export var day_tap:number = 0;
    export var lv_tap:number = 0;
    export var cz_tap:number = 0;
    export function getDayMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo3.img"]) {
            let data:any = msMoudle.wz["QuestInfo3.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            let _ok:boolean = false;
            for(let i:number = 0; i < ms.tasksdata.length; i++) {
                if(key == ms.tasksdata[i]) {
                    // console.log(key);
                    // console.log(ms.tasksdata)
                    _ok = true;
                    break;
                }
            }

            if(_ok) {
                taskjson[tIndex].isok = 1;
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                taskjson[tIndex].isok = 0;
                _task[_task.length] = taskjson[tIndex];
            }
        }
        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        // console.log(_alltask);
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = 0;
                if(jindu[0] >= 600 && jindu[0] <= 608) {
                    if(jindu[0] == 600) bag_num = ms.d600;
                    if(jindu[0] == 601) bag_num = ms.d601;
                    if(jindu[0] == 602) bag_num = ms.d602;
                    if(jindu[0] == 603) bag_num = ms.d603;
                    if(jindu[0] == 604) bag_num = ms.d604;
                    if(jindu[0] == 605) bag_num = ms.d605;
                    if(jindu[0] == 606) bag_num = ms.d606;
                    if(jindu[0] == 607) bag_num = ms.d607;
                    if(jindu[0] == 608) bag_num = ms.d608;
                }
                //统计背包的
                // for(let i:number = 0; i < ms.bagsdata.length; i++) {
                //     if(ms.bagsdata[i]) {
                //         if(ms.bagsdata[i].id == jindu[0]) bag_num = ms.bagsdata[i].num;
                //     }
                // }
                //统计消灭怪物的
                // if(bag_num == 0) {
                //     if(ms.killmobsdata) {
                //         for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                //             if(ms.killmobsdata[u]) {
                //                 if(ms.killmobsdata[u].id == jindu[0]) {
                //                     bag_num = ms.killmobsdata[u].num;
                //                     break;
                //                 }
                //             }
                //         }
                //     }
                // }
                // //统计关卡
                // if(bag_num == 0) {
                //     if(jindu[0] >= 501 && jindu[0] <= 510) {
                //         if(ms.bossguanka + 500 > jindu[0]) bag_num = 1;
                //     }
                // }

                if(bag_num >= jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    ///可以完成的
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            msMoudle.day_tap = 1;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("任务").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }
    export function getTaskMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        // console.log(msMoudle.wz["QuestInfo.img"])
        for(let key in msMoudle.wz["QuestInfo.img"]) {
            let data:any = msMoudle.wz["QuestInfo.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            let _ok:boolean = false;
            for(let i:number = 0; i < ms.tasksdata.length; i++) {
                if(key == ms.tasksdata[i]) {
                    _ok = true;
                    break;
                }
            }
            if(_ok) {
                taskjson[tIndex].isok = 1;
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                taskjson[tIndex].isok = 0;
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = 0;
                //统计背包的
                for(let i:number = 0; i < ms.bagsdata.length; i++) {
                    if(ms.bagsdata[i]) {
                        if(ms.bagsdata[i].id == jindu[0]) bag_num = ms.bagsdata[i].num;
                    }
                }
                //统计消灭怪物的
                if(bag_num == 0) {
                    if(ms.killmobsdata) {
                        for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                            if(ms.killmobsdata[u]) {
                                if(ms.killmobsdata[u].id == jindu[0]) {
                                    bag_num = ms.killmobsdata[u].num;
                                    break;
                                }
                            }
                        }
                    }
                }
                //统计关卡
                if(bag_num == 0) {
                    if(jindu[0] <= 200) {
                        if(bag_num == 0) {
                            if(ms.guanka > jindu[0]) bag_num = 1;
                        }
                    }
                }

                if(bag_num >= jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            msMoudle.task_tap = 1;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("任务").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }
    export function getChengJiuMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo2.img"]) {
            let data:any = msMoudle.wz["QuestInfo2.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            // console.log(ms.tasksdata)
            let _ok:boolean = false;
            for(let i:number = 0; i < ms.tasksdata.length; i++) {
                if(key == ms.tasksdata[i]) {
                    // console.log(key)
                    // console.log(data);
                    _ok = true;
                    break;
                }
            }

            if(_ok) {
                taskjson[tIndex].isok = 1;
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                taskjson[tIndex].isok = 0;
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = 0;
                //统计背包的
                // for(let i:number = 0; i < ms.bagsdata.length; i++) {
                //     if(ms.bagsdata[i]) {
                //         if(ms.bagsdata[i].id == jindu[0]) bag_num = ms.bagsdata[i].num;
                //     }
                // }
                //统计消灭怪物的
                if(bag_num == 0) {
                    if(ms.killmobsdata) {
                        for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                            if(ms.killmobsdata[u]) {
                                if(ms.killmobsdata[u].id == jindu[0]) {
                                    bag_num = ms.killmobsdata[u].num;
                                    break;
                                }
                            }
                        }
                    }
                }
                //统计关卡
                if(bag_num == 0) {
                    if(jindu[0] >= 501 && jindu[0] <= 510) {
                        if(ms.bossguanka + 500 > jindu[0]) bag_num = 1;
                    }
                }

                if(bag_num >= jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    ///可以完成的
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            msMoudle.chengjiu_tap = 1;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("任务").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }
    export function getLiBaoMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo4.img"]) {
            let data:any = msMoudle.wz["QuestInfo4.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            let _ok:boolean = false;
            for(let i:number = 0; i < ms.tasksdata.length; i++) {
                if(key == ms.tasksdata[i]) {
                    _ok = true;
                    break;
                }
            }
            if(_ok) {
                taskjson[tIndex].isok = 1;
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                taskjson[tIndex].isok = 0;
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = ms.herodata.Lv;
                if(bag_num >= jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    ///可以完成的
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            msMoudle.lv_tap = 1;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }

    export function getDayLiBaoMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo5.img"]) {
            let data:any = msMoudle.wz["QuestInfo5.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            taskjson[tIndex].isok = 0;
            ///任务.....

            if(taskjson[tIndex].isok == 1) {
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = ms.herodata.Lv;
                if(bag_num >= jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    ///可以完成的
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }

    export function getChongZhiLiBaoMsg() : any {
        let _alltask:Array<any> = [];
        let _taskbegan:Array<any> = [];
        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo6.img"]) {
            let data:any = msMoudle.wz["QuestInfo6.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            let _ok:boolean = false;
            taskjson[tIndex].isok = 0;
            ///任务.....

            if(taskjson[tIndex].isok == 1) {
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });
        // for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        _task = [];
        let wancheng:boolean = false;
        //汇总
        for(let i:number = 0; i < _alltask.length; i++) {
            if(_alltask[i].isok == 1) {
                // console.log(_alltask[i].index + "  " + _alltask[i].name + "  完成");
            }
            else {
                let jindu:any = _alltask[i].item.split("#");
                let bag_num:number = ms.czValue;         ///充值金额
                if(jindu[0] == 901) jindu[1] = 5;
                else if(jindu[0] == 902) jindu[1] = 10;
                else if(jindu[0] == 903) jindu[1] = 30;
                else if(jindu[0] == 904) jindu[1] = 50;
                else if(jindu[0] == 905) jindu[1] = 100;
                else if(jindu[0] == 906) jindu[1] = 200;
                else if(jindu[0] == 907) jindu[1] = 300;
                else if(jindu[0] == 908) jindu[1] = 500;
                if(bag_num == jindu[1]) {
                    wancheng = true;
                    // break;                  ///目前只做红点检查
                    ///可以完成的
                    _taskbegan[_taskbegan.length] = _alltask[i];
                }
                else {
                    //不可用完成的
                    _task[_task.length] = _alltask[i];;
                }
            }
        }

        //还有已经完成的
        if(wancheng) {
            msMoudle.cz_tap = 1;
            // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = true;
            if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
            }
        }

        _alltask = [];
        for(let i:number = 0; i < _taskbegan.length; i++) _alltask[_alltask.length] = _taskbegan[i];
        for(let i:number = 0; i < _task.length; i++) _alltask[_alltask.length] = _task[i];
        for(let i:number = 0; i < _taskend.length; i++) _alltask[_alltask.length] = _taskend[i];

        return _alltask;
    }

    export function taskShow() : void {

        if(msMoudle.mainP.m_msg) {
            if(msMoudle.mainP.m_msg.msgTask) {
                msMoudle.mainP.m_msg.msgTask.removeSelf();
                msMoudle.mainP.m_msg.msgTask = null;
            }
        }

        let _task:Array<any> = [];
        let _taskend:Array<any> = [];

        let taskjson:Array<any> = [];
        for(let key in msMoudle.wz["QuestInfo.img"]) {
            let data:any = msMoudle.wz["QuestInfo.img"][key];
            let tIndex = taskjson.length;
            taskjson[tIndex] = new Object();
            taskjson[tIndex].index = Number(key);
            taskjson[tIndex].name = data[key + ".name"];
            taskjson[tIndex].desc = data[key + ".0"];
            taskjson[tIndex].item = data[key + ".item"];
            taskjson[tIndex].reward = data[key + ".reward"];

            let _ok:boolean = false;
            for(let i:number = 0; i < ms.tasksdata.length; i++) {
                if(key == ms.tasksdata[i]) {
                    _ok = true;
                    break;
                }
            }
            if(_ok) {
                taskjson[tIndex].isok = 1;
                _taskend[_taskend.length] = taskjson[tIndex];
            }
            else {
                taskjson[tIndex].isok = 0;
                _task[_task.length] = taskjson[tIndex];
            }
        }

        //升序
        _task.sort((n1,n2) => {
            if(n1.index > n2.index) return 1;
            if(n1.index < n2.index) return -1;
            return 0;
        });
        //降序
        _taskend.sort((n1,n2) => {
            if(n1.index > n2.index) return -1;
            if(n1.index < n2.index) return 1;
            return 0;
        });

        let jindu:any = _task[0].item.split("#");
        let bag_num:number = 0;
        let item:any = msMoudle.getItemMsg(jindu[0]);
        /////收集任务
        //统计背包的
        for(let i:number = 0; i < ms.bagsdata.length; i++) {
            if(ms.bagsdata[i]) {
                if(ms.bagsdata[i].id == jindu[0]) {
                    bag_num = ms.bagsdata[i].num;
                }
            }
        }
        ///杀怪任务
        if(bag_num == 0) {
            //统计消灭怪物的
            if(ms.killmobsdata) {
                for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                    if(ms.killmobsdata[u]) {
                        if(ms.killmobsdata[u].id == jindu[0]) {
                            bag_num = ms.killmobsdata[u].num;
                            break;
                        }
                    }
                }
            }
        }
        //关卡任务
        // if(jindu[0] <= 200) {
        //     if(bag_num == 0) {
        //         //统计关卡
        //         console.log("xxxx  " + jindu[0])
        //         if(msMoudle.guanka >= jindu[0]) bag_num = 1;
        //     }
        // }

        ////任务提示暂不支持
        let isok:boolean = false;
        if(isok == false) {
            return ;
        }

        if(item) {
            if(bag_num >= jindu[1]) {
                msMoudle.mainP.m_msg.taskShow("获得" + item.name + "-" + jindu[1] + "/" + jindu[1], true);
                isok = true;
            }
            else {
                msMoudle.mainP.m_msg.taskShow("获得" + item.name+ "-"  + bag_num + "/" + jindu[1], false);
            }
        }
        else {
            //如果是怪物
            let name:string = msMoudle.wz["Mob.img"][jindu[0]][jindu[0] + ".name"];
            if(bag_num >= jindu[1]) {
                msMoudle.mainP.m_msg.taskShow("击败" + name+ "-"  + jindu[1] + "/" + jindu[1], true);
                isok = true;
            }
            else {
                msMoudle.mainP.m_msg.taskShow("击败" + name+ "-"  + bag_num + "/" + jindu[1], false);
            }
        }
        // if(isok) {
        //     if(msMoudle.lasttask == "enter_game") {
        //         //下一个引导
        //         this.nextTask();
        //     }
            // let be:cssBasicEff = new cssBasicEff();
            // be.loadBasicEff(msMoudle.gameP, "Fishing", 200, 200);
        // }
    }

    export function taskShow2() : void {
        if(msMoudle.mainP.m_msg) {
            if(msMoudle.mainP.m_msg.msgTask) {
                msMoudle.mainP.m_msg.msgTask.removeSelf();
                msMoudle.mainP.m_msg.msgTask = null;
            }
        }
        // if(msMoudle.team_guanka == 1) msMoudle.mainP.m_msg.taskShow2("击败" + msMoudle.team_guanka_num + "/8只火野猪", false);
        // else if(msMoudle.team_guanka == 2) msMoudle.mainP.m_msg.taskShow2("答对" +  + msMoudle.team_guanka_num + "/8道题", false);
        // else if(msMoudle.team_guanka == 3)
        // msMoudle.mainP.m_msg.taskShow2("收集" + msMoudle.team_guanka1_num +"/3个垃圾，" + team_guanka2_num + "/3矿石，" + team_guanka3_num + "/3药草", false);
        // else if(msMoudle.team_guanka == 4)
        // msMoudle.mainP.m_msg.taskShow2("救出微微公主", false);
    }

    export function nextTask() : void {
        let _:boolean = false;
        for(let key in msMoudle.guidejson) {
            if(_) {
                ms.lasttask = key;
                break;
            }
            if(key == ms.lasttask) _ = true;
        }
    }

    export function serverAbi(otherheroservedata:app.model.HeroStatus, show:boolean = true) : app.model.HeroStatus {
        let jsonindex:number = 0;
        for(let key in msMoudle.herojson) {
            if(msMoudle.herojson[key].id == otherheroservedata.id) {
                jsonindex = Number(key);
                break;
            }
        }
        // console.log(msMoudle.otherheroservedata[index])
        ////等级属性(服务器数据)
        let lv:number = otherheroservedata.Lv;      ///服务器当前等级
        let star:number = otherheroservedata.star;
        ///本地表初始数据(json数据)
        let ll:number = msMoudle.herojson[jsonindex].ll;
        let mj:number = msMoudle.herojson[jsonindex].mj;
        let hp:number = msMoudle.herojson[jsonindex].hp + lv * ll * 10;
        let atk:number = msMoudle.herojson[jsonindex].atk + lv * ll;
        let def:number = msMoudle.herojson[jsonindex].def + lv * mj;
        let baoji:number = msMoudle.herojson[jsonindex].baoji;
        let miss:number = msMoudle.herojson[jsonindex].miss;
        let target:number = msMoudle.herojson[jsonindex].target;
        let atkspeed:number = msMoudle.herojson[jsonindex].atkspeed;
        let walkspeed:number = msMoudle.herojson[jsonindex].walkspeed;
        ///技能属性
        let jn_hp:number = msMoudle.skillHp(otherheroservedata);
        let jn_atk:number = msMoudle.skillAtk(otherheroservedata);
        let jn_def:number = msMoudle.skillDef(otherheroservedata);
        let jn_baoji:number = msMoudle.skillBaoji(otherheroservedata);
        let jn_miss:number = msMoudle.skillMiss(otherheroservedata);
        let jn_target:number = msMoudle.skillTarget(otherheroservedata);
        let jn_atkspeed:number = 1;
        let jn_walkspeed:number = 1;

        // console.log(jsonindex, lv, ll, hp);
        // let a = [otherheroservedata.MaxHP.GetSum(), otherheroservedata.PADamage.GetSum(), otherheroservedata.PDDamage.GetSum(),
        //     otherheroservedata.Evasion.GetSum(), otherheroservedata.CriticalRate.GetSum(), otherheroservedata.Accurate.GetSum(),
        //     otherheroservedata.AttackSpeed.GetSum(), otherheroservedata.WalkSpeed.GetSum()];
        ///更新服务器
        otherheroservedata.MaxHP.baseVal = Math.floor(hp * (jn_hp + star / 50) );
        otherheroservedata.PADamage.baseVal = Math.floor(atk * (jn_atk + star / 50) );
        otherheroservedata.PDDamage.baseVal = Math.floor(def * (jn_def + star / 50) );
        otherheroservedata.MADamage.baseVal = Math.floor(atk * (jn_atk + star / 50) );
        otherheroservedata.MDDamage.baseVal = Math.floor(def * (jn_def + star / 50) );
        otherheroservedata.Evasion.baseVal = Math.floor((miss + 4 * (star - 1)) * jn_baoji );
        otherheroservedata.CriticalRate.baseVal = Math.floor((baoji + 2 * (star - 1)) * jn_miss );
        otherheroservedata.Accurate.baseVal = Math.floor((target + 4 * (star - 1)) * jn_target );

        otherheroservedata.AttackSpeed.baseVal = Number((atkspeed * (jn_atkspeed)).toFixed(2));
        otherheroservedata.WalkSpeed.baseVal = Number((walkspeed * (jn_walkspeed)).toFixed(2));

        //宠物、坐骑、时装、转生、修炼可以放到这里来

        //觉醒==》攻、血、防翻倍
        if(otherheroservedata.juexing > 0) {
            otherheroservedata.MaxHP.baseVal *= (otherheroservedata.juexing + 1);
            otherheroservedata.PADamage.baseVal *= (otherheroservedata.juexing + 1);
            otherheroservedata.PDDamage.baseVal *= (otherheroservedata.juexing + 1);

            otherheroservedata.MADamage.baseVal *= (otherheroservedata.juexing + 1);
            otherheroservedata.MDDamage.baseVal *= (otherheroservedata.juexing + 1);
        }
        // if(a[0] && show) {
        //     let b = [otherheroservedata.hp, otherheroservedata.atk, otherheroservedata.def,
        //     otherheroservedata.miss, otherheroservedata.baoji, otherheroservedata.target,
        //     otherheroservedata.atkspeed, otherheroservedata.walkspeed];
        //     let te:cssTextEff = new cssTextEff();
        //     te.ShowTextEff(a, b);
        // }
        return otherheroservedata;
    }

    export function skillHp(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100101" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_2 == "100101" && otherheroservedata.Lv >= 15) ||
            (otherheroservedata.Skill_3 == "100101" && otherheroservedata.Lv >= 20)) {
            return 1.05;
        }
        return 1;
    }
    export function skillAtk(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100102" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_2 == "100102" && otherheroservedata.Lv >= 15) ||
            (otherheroservedata.Skill_3 == "100102" && otherheroservedata.Lv >= 20)) {
            return 1.05;
        }
        return 1;
    }
    export function skillDef(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100103" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_2 == "100103" && otherheroservedata.Lv >= 15) ||
            (otherheroservedata.Skill_3 == "100103" && otherheroservedata.Lv >= 20)) {
            return 1.05;
        }
        return 1;
    }
    export function skillBaoji(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100104" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_2 == "100104" && otherheroservedata.Lv >= 15) ||
            (otherheroservedata.Skill_3 == "100104" && otherheroservedata.Lv >= 20)) {
            return 1.05;
        }
        return 1;
    }
    export function skillMiss(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100105" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_2 == "100105" && otherheroservedata.Lv >= 15) ||
            (otherheroservedata.Skill_3 == "100105" && otherheroservedata.Lv >= 20)) {
            return 1.05;
        }
        return 1;
    }
    export function skillTarget(otherheroservedata:app.model.HeroStatus) : number {
        if( (otherheroservedata.Skill_1 == "100106" && otherheroservedata.Lv >= 5) ||
            (otherheroservedata.Skill_2 == "100106" && otherheroservedata.Lv >= 10) ||
            (otherheroservedata.Skill_3 == "100106" && otherheroservedata.Lv >= 15)) {
            return 1.05;
        }
        return 1;
    }

    //道具信息
    export function getItemMsg(itemId:any) : any {
        //400/401/402/425(道具/矿石)
        let mulu:any = Math.floor(itemId / 10000);
        if( mulu == 400 || mulu == 401 || mulu == 402 || mulu == 403 ) {
            let rw:any = new Object();
            rw.id = itemId;
            rw.name = msMoudle.wz["Etc.img"]["Etc"]["Etc." + itemId + ".name"];
            rw.desc = msMoudle.wz["Etc.img"]["Etc"]["Etc." + itemId + ".desc"];

            let root:string = "0" + itemId + ".info.icon";
            let data:any = msMoudle.wz["0" + mulu + ".img"]["0" + itemId];
            let msg:any = msMoudle.getWindowInfo(data[root], "0" + mulu + ".img");
            rw.img = "res/Item/0" + mulu + ".img/" + msg.strMarker;

            rw.type = 0;
            return rw;
        }
        //204卷轴
        else if(mulu == 204) {
            let rw:any = new Object();
            rw.id = itemId;
            rw.name = msMoudle.wz["Consume.img"][itemId][itemId + ".name"];
            rw.desc = msMoudle.wz["Consume.img"][itemId][itemId + ".desc"];

            let root:string = "0" + itemId + ".info.icon";
            let data:any = msMoudle.wz["0" + mulu + ".img"]["0" + itemId];
            let msg:any = msMoudle.getWindowInfo(data[root], "0" + mulu + ".img");
            rw.img = "res/Item/0" + mulu + ".img/" + msg.strMarker;
            rw.type = 0;
            ///属性
            rw.price = Number(data["0" + itemId + ".info.price"]);       //价格
            rw.success = Number(data["0" + itemId + ".info.success"]);   //成功率
            rw.cursed = data["0" + itemId + ".info.cursed"] ? Number(data["0" + itemId + ".info.cursed"]) : 0;    //销毁
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
        //金币
        else if(mulu == 900) {
            let rw:any = new Object();
            rw.id = itemId;
            rw.name = "金币";
            rw.desc = "金币";

            let root:string = "0" + itemId + ".iconRaw.0";
            let data:any = msMoudle.wz["0" + mulu + ".img"]["0" + itemId];
            let msg:any = msMoudle.getWindowInfo(data[root], "0" + mulu + ".img");
            rw.img = "res/Item/0" + mulu + ".img/" + msg.strMarker;

            rw.type = 0;
            return rw;
        }
        else {
            return null;
        }
    }

    export var AllCash = [
        //首饰
        "01010000","01010001","01010002","01010003","01010004","01010005","01010006","01011000","01011001","01011002","01011003","01012000","01012001","01012002","01012003","01012004","01012005","01012006","01012007","01012008","01012009","01012010","01012021","01012022","01012023","01012024","01012025","01012026","01012027","01012029","01012030","01012031","01012032","01012033","01012034","01012035","01012036","01012037","01012038","01012039","01012040","01012044","01012047","01012048","01012049","01012050","01012051","01012052","01012053","01012054","01012055","01012057","01012062","01012063","01012074","01012075","01012080","01012082","01012083","01012085","01012096","01012097","01012099","01012104","01012105","01012114","01012131","01012134","01012137","01012147","01012160","01012165","01012179","01020000","01021000","01022000","01022001","01022002","01022003","01022004","01022005","01022006","01022007","01022008","01022009","01022010","01022011","01022012","01022013","01022014","01022015","01022016","01022017","01022018","01022019","01022020","01022023","01022024","01022025","01022026","01022027","01022028","01022029","01022030","01022031","01022032","01022033","01022034","01022035","01022036","01022037","01022038","01022039","01022040","01022041","01022042","01022043","01022044","01022045","01022046","01022048","01022049","01022050","01022051","01022052","01022053","01022054","01022055","01022056","01022057","01022059","01022061","01022062","01022063","01022064","01022065","01022068","01022069","01022070","01022071","01022072","01022074","01022075","01022078","01022079","01022083","01022084","01022095","01032024","01032029","01032034","01032036","01032038","01032051","01032052","01032053","01032054","01032063","01032073","01032074","01032088",
        //鞋子
        "01070000","01070001","01070002","01070003","01070004","01070005","01070006","01070007","01070008","01070009","01070011","01070016","01071000","01071001","01071002","01071003","01071004","01071005","01071006","01071007","01071008","01071009","01071010","01071011","01071012","01071013","01071014","01071015","01071016","01071017","01071018","01071019","01071020","01071021","01071026","01072010","01072013","01072014","01072057","01072058","01072088","01072092","01072093","01072094","01072095","01072096","01072097","01072098","01072099","01072100","01072111","01072153","01072175","01072176","01072180","01072181","01072186","01072187","01072188","01072189","01072190","01072191","01072199","01072200","01072201","01072202","01072217","01072218","01072219","01072230","01072231","01072232","01072233","01072234","01072235","01072236","01072237","01072240","01072241","01072242","01072243","01072244","01072245","01072246","01072247","01072250","01072251","01072252","01072253","01072256","01072257","01072258","01072259","01072260","01072265","01072266","01072267","01072274","01072276","01072278","01072279","01072280","01072281","01072282","01072283","01072284","01072322","01072323","01072324","01072325","01072326","01072327","01072328","01072329","01072330","01072331","01072332","01072333","01072334","01072335","01072336","01072337","01072341","01072347","01072349","01072350","01072351","01072352","01072353","01072354","01072367","01072370","01072371","01072373","01072374","01072377","01072379","01072381","01072382","01072384","01072385","01072386","01072387","01072392","01072394","01072395","01072404","01072406","01072407","01072408","01072417","01072426","01072433",
        //手套
        "01080000","01080001","01081000","01081001","01081002","01081003","01081004","01082040","01082041","01082057","01082058","01082077","01082078","01082079","01082101","01082102","01082113","01082124","01082155","01082156","01082157","01082161","01082162","01082169","01082170","01082171","01082172","01082173","01082224","01082225","01082227","01082229","01082231","01082233","01082247","01082249","01082250","01082251","01082255",
        //上衣
        "01060001","01060005","01060027","01060045","01060046","01060047","01060051","01060052","01060053","01060054","01060055","01060056","01060064","01060065","01060066","01060077","01060078","01060101","01060114","01060120","01060126","01060134","01060135","01060136","01061000","01061002","01061003","01061004","01061005","01061006","01061007","01061008","01061009","01061010","01061011","01061012","01061013","01061014","01061015","01061020","01061021","01061024","01061028","01061088","01061089","01061090","01061091","01061108","01061122","01061127","01061128","01061129","01061130","01061131","01061132","01061133","01061145","01061148","01061156","01061157","01061158","01062000","01062001","01062002","01062003","01062004","01062005","01062006","01062007","01062008","01062009","01062010","01062011","01062012","01062013","01062014","01062018","01062019","01062020","01062022","01062023","01062024","01062025","01062026","01062027","01062028","01062029","01062030","01062031","01062032","01062033","01062034","01062035","01062038","01062039","01062040","01062041","01062042","01062043","01062044","01062045","01062046","01062051","01062052","01062053","01062054","01062055","01062056","01062057","01062058","01062059","01062060","01062061","01062062","01062063","01062064","01062065","01062066","01062067","01062068","01062069","01062070","01062071","01062072","01062073","01062074","01062075","01062076","01062077","01062080","01062082","01062083","01062084","01062085","01062086","01062087","01062088","01062089","01062091","01062092","01062093","01062094","01062095","01062096","01062097","01062098","01062100","01062101","01062102","01062103","01062104","01062105","01062106","01062107","01062108","01062109","01062110","01062111","01062112","01062113","01062114","01062115","01062116","01062118","01062119",
        //裤子
        "01042096","01042097","01042098","01042099","01042100","01042101","01042102","01042103","01042104","01042105","01042106","01042107","01042108","01042109","01042110","01042116","01042117","01042118","01042119","01042120","01042121","01042122","01042125","01042126","01042127","01042128","01042129","01042130","01042131","01042132","01042133","01042134","01042135","01042136","01042137","01042138","01042140","01042141","01042142","01042143","01042144","01042145","01042146","01042147","01042149","01042150","01042151","01042152","01042153","01042154","01042155","01042156","01042157","01042158","01042159","01042160","01042161","01042162","01042163","01042164","01042165","01042166","01042168","01042169","01042170","01042172","01042173","01042174","01042176","01042177","01042178","01042181"
    ]

    export function findPngByImg(skillid:string, pngs:any, data:any) : void {
        if(data) {
            for(let key in data) {
                let str = data[key];
                if(str.indexOf("<img src=") >= 0) {
                    //分解成png
                    let m = msMoudle.getStrByPath(str);
                    if(m != "") {
                        if(msMoudle.findKeyFromArr("res/Skill/" + skillid + ".img/" + m, pngs) == false) {
                            //只有未加载的才会
                            if(!Laya.loader.getRes("res/Skill/" + skillid + ".img/" + m)) {
                                pngs.push("res/Skill/" + skillid + ".img/" + m);
                            }
                        }
                    }
                }
            }
        }
    }

    export function findMPngByImg(morph:string, pngs:any, data:any) : void {
        if(data) {
            for(let key in data) {
                let str = data[key];
                if(str.indexOf("<img src=") >= 0) {
                    //分解成png
                    let m = msMoudle.getStrByPath(str);
                    if(m != "") {
                        // console.log("res/Morph/" + morph + ".img/" + m)
                        pngs.push("res/Morph/" + morph + ".img/" + m);
                    }
                }
            }
        }
    }

    export function getStrByPath(str:string) : string {
        let m = "";
        if(str) {
            if(str[0] == "<" && str[1] == "i" && str[2] == "m" && str[3] == "g" && str[4] == " " && str[5] == "s" &&
                str[6] == "r" && str[7] == "c" && str[8] == "=") {
                //查找 ／>的位置
                let index:number = 0;
                for(let i:number = 0; i < str.length; i++) {
                    if(str[i] == " " && str[i + 1] == "/" && str[i + 2] == ">") {
                        index = i - 1;
                        break;
                    }
                }
                //10 index
                for(let i:number = 10; i < index; i++) {
                    m = m + str[i];
                }
            }
        }
        return m;
    }

    export function getEqpIndex(itemId:any):string {
        let index_path:string = "";
        if(msMoudle.isWeapon(Number(itemId))) index_path =  "res/Character/Weapon/" + itemId + ".img/index.html";
        else if(msMoudle.isCap(Number(itemId))) index_path =  "res/Character/Cap/" + itemId + ".img/index.html";
        else if(msMoudle.isCape(Number(itemId))) index_path =  "res/Character/Cape/" + itemId + ".img/index.html";
        else if(msMoudle.isShoes(Number(itemId))) index_path =  "res/Character/Shoes/" + itemId + ".img/index.html";
        else if(msMoudle.isGlove(Number(itemId))) index_path =  "res/Character/Glove/" + itemId + ".img/index.html";
        else if(msMoudle.isLongCoat(Number(itemId))) index_path =  "res/Character/LongCoat/" + itemId + ".img/index.html";
        else if(msMoudle.isCoat(Number(itemId))) index_path =  "res/Character/Coat/" + itemId + ".img/index.html";
        else if(msMoudle.isPants(Number(itemId))) index_path =  "res/Character/Pants/" + itemId + ".img/index.html";
        else if(msMoudle.isShield(Number(itemId))) index_path =  "res/Character/Shield/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory1(Number(itemId))) index_path =  "res/Character/Accessory1/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory2(Number(itemId))) index_path =  "res/Character/Accessory2/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory3(Number(itemId))) index_path =  "res/Character/Accessory3/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory4(Number(itemId))) index_path =  "res/Character/Accessory4/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory5(Number(itemId))) index_path =  "res/Character/Accessory5/" + itemId + ".img/index.html";
        else if(msMoudle.isAccessory6(Number(itemId))) index_path =  "res/Character/Accessory6/" + itemId + ".img/index.html";
        else index_path =  "res/Character/Weapon/" + itemId + ".img/index.html";
        return index_path;
    }

    //装备信息
    export function getEqpMsg(itemId:any, isload:boolean = true) : any {
        if(Math.floor(Number(itemId) / 1000000) == 1) {
            let eqpstr:any = msMoudle.wz["Eqp.img"]["Eqp"];
            let rw:any = new Object();
            rw.id = itemId;
            rw.type = 1;
            let index_path:string = "";
            if(msMoudle.isWeapon(Number(itemId))) {
                rw.name = eqpstr["Eqp.Weapon." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Weapon." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Weapon/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Weapon/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isCap(Number(itemId))) {
                rw.name = eqpstr["Eqp.Cap." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Cap." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Cap/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Cap/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isCape(Number(itemId))) {
                rw.name = eqpstr["Eqp.Cape." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Cape." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Cape/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Cape/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isShoes(Number(itemId))) {
                rw.name = eqpstr["Eqp.Shoes." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Shoes." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Shoes/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Shoes/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isGlove(Number(itemId))) {
                rw.name = eqpstr["Eqp.Glove." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Glove." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Glove/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Glove/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isLongCoat(Number(itemId))) {
                rw.name = eqpstr["Eqp.Longcoat." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Longcoat." + Number(itemId) + ".desc"];
                rw.img = "res/Character/LongCoat/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/LongCoat/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isCoat(Number(itemId))) {
                rw.name = eqpstr["Eqp.Coat." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Coat." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Coat/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Coat/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isPants(Number(itemId))) {
                rw.name = eqpstr["Eqp.Pants." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Pants." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Pants/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Pants/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isShield(Number(itemId))) {
                rw.name = eqpstr["Eqp.Shield." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Shield." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Shield/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Shield/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory1(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory1/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory1/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory2(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory2/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory2/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory3(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory3/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory3/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory4(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory4/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory4/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory5(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory5/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory5/" + itemId + ".img/index.html";
            }
            else if(msMoudle.isAccessory6(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory6/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Accessory6/" + itemId + ".img/index.html";
            }
            else {
                rw.name = eqpstr["Eqp.Weapon." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Weapon." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Weapon/" + itemId + ".img/info.icon.png";
                index_path =  "res/Character/Weapon/" + itemId + ".img/index.html";
            }
            rw.name = rw.name ? rw.name : "";
            rw.cash = 0;
            //属性
            if(msMoudle.wz[itemId + ".img"]) {
                let eqpabi:any = msMoudle.wz[itemId + ".img"]["info"];
                if(eqpabi) {
                    rw.reqJob = eqpabi["info.reqJob"];        //职业限制
                    rw.reqLevel = eqpabi["info.reqLevel"] ? eqpabi["info.reqLevel"] : 0;      //等级限制
                    rw.reqSTR = eqpabi["info.reqSTR"];        //力量限制
                    rw.reqDEX = eqpabi["info.reqDEX"];        //敏捷限制
                    rw.reqINT = eqpabi["info.reqINT"];        //智力限制
                    rw.reqLUK = eqpabi["info.reqLUK"];        //运气限制
                    rw.cash = eqpabi["info.cash"] ? Number(eqpabi["info.cash"]) : 0;            //是否现金道具

                    // console.log("xxxxx", rw.cash)

                    rw.attackSpeed = eqpabi["info.attackSpeed"];   //攻击速度
                    rw.incPAD = eqpabi["info.incPAD"] ? Number(eqpabi["info.incPAD"]) : 0;//增加攻击力
                    rw.incMAD = eqpabi["info.incMAD"] ? Number(eqpabi["info.incMAD"]) : 0;//增加魔法力
                    rw.incPDD = eqpabi["info.incPDD"] ? Number(eqpabi["info.incPDD"]) : 0;//增加物理防御力
                    rw.incMDD = eqpabi["info.incMDD"] ? Number(eqpabi["info.incMDD"]) : 0;//增加魔法防御力
                    rw.incSTR = eqpabi["info.incSTR"] ? Number(eqpabi["info.incSTR"]) : 0;//增加力量
                    rw.incDEX = eqpabi["info.incDEX"] ? Number(eqpabi["info.incDEX"]) : 0;//增加敏捷
                    rw.incINT = eqpabi["info.incINT"] ? Number(eqpabi["info.incINT"]) : 0;//增加智力
                    rw.incLUK = eqpabi["info.incLUK"] ? Number(eqpabi["info.incLUK"]) : 0;//增加运气
                    rw.incMHP = eqpabi["info.incMHP"] ? Number(eqpabi["info.incMHP"]) : 0;//增加HP总值
                    rw.incMMP = eqpabi["info.incMMP"] ? Number(eqpabi["info.incMMP"]) : 0;//增加MP总值
                    rw.incACC = eqpabi["info.incACC"] ? Number(eqpabi["info.incACC"]) : 0;//增加命中率
                    rw.incEVA = eqpabi["info.incEVA"] ? Number(eqpabi["info.incEVA"]) : 0;//增加回避率
                    rw.incSPEED = eqpabi["info.incSPEED"] ? Number(eqpabi["info.incSPEED"]) : 0;//增加移动速度
                    rw.incJUMP = eqpabi["info.incJUMP"] ? Number(eqpabi["info.incJUMP"]) : 0;//增加跳跃力
                    rw.tuc = eqpabi["info.tuc"] ? Number(eqpabi["info.tuc"]) : 0;           //升级次数

                    rw.price = eqpabi["info.price"] ? Number(eqpabi["info.price"]) : 0;         //商店出售价格
                }
            }
            if(rw.cash == 0) {
                if(msMoudle.findKeyFromArr(itemId, msMoudle.AllCash)) {
                    rw.cash = 1;
                }
            }
            return rw;
            // }
        }
        return null;
    }

    export function getEqpMsg2(itemId:any, isload:boolean = true) : any {
        if(Math.floor(Number(itemId) / 1000000) == 1) {
            let eqpstr:any = msMoudle.wz["Eqp.img"]["Eqp"];
            let rw:any = new Object();
            rw.id = itemId;
            rw.type = 1;
            if(msMoudle.isWeapon(Number(itemId))) {
                rw.name = eqpstr["Eqp.Weapon." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Weapon." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Weapon/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isCap(Number(itemId))) {
                rw.name = eqpstr["Eqp.Cap." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Cap." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Cap/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isCape(Number(itemId))) {
                rw.name = eqpstr["Eqp.Cape." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Cape." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Cape/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isShoes(Number(itemId))) {
                rw.name = eqpstr["Eqp.Shoes." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Shoes." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Shoes/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isGlove(Number(itemId))) {
                rw.name = eqpstr["Eqp.Glove." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Glove." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Glove/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isLongCoat(Number(itemId))) {
                rw.name = eqpstr["Eqp.Longcoat." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Longcoat." + Number(itemId) + ".desc"];
                rw.img = "res/Character/LongCoat/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isCoat(Number(itemId))) {
                rw.name = eqpstr["Eqp.Coat." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Coat." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Coat/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isPants(Number(itemId))) {
                rw.name = eqpstr["Eqp.Pants." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Pants." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Pants/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isShield(Number(itemId))) {
                rw.name = eqpstr["Eqp.Shield." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Shield." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Shield/" + itemId + ".img/info.icon.png";
            }
            //
            else if(msMoudle.isAccessory1(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory1/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isAccessory2(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory2/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isAccessory3(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory3/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isAccessory4(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory4/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isAccessory5(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory5/" + itemId + ".img/info.icon.png";
            }
            else if(msMoudle.isAccessory6(Number(itemId))) {
                rw.name = eqpstr["Eqp.Accessory." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Accessory." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Accessory6/" + itemId + ".img/info.icon.png";
            }
            else {
                rw.name = eqpstr["Eqp.Weapon." + Number(itemId) + ".name"];
                rw.desc = eqpstr["Eqp.Weapon." + Number(itemId) + ".desc"];
                rw.img = "res/Character/Weapon/" + itemId + ".img/info.icon.png";
            }
            rw.cash = 0;
            //属性
            if(msMoudle.wz[itemId + ".img"]) {
                let eqpabi:any = msMoudle.wz[itemId + ".img"]["info"];
                if(eqpabi) {
                    rw.reqJob = eqpabi["info.reqJob"];        //职业限制
                    rw.reqLevel = eqpabi["info.reqLevel"] ? eqpabi["info.reqLevel"] : 0;      //等级限制
                    rw.reqSTR = eqpabi["info.reqSTR"];        //力量限制
                    rw.reqDEX = eqpabi["info.reqDEX"];        //敏捷限制
                    rw.reqINT = eqpabi["info.reqINT"];        //智力限制
                    rw.reqLUK = eqpabi["info.reqLUK"];        //运气限制
                    rw.cash = eqpabi["info.cash"] ? Number(eqpabi["info.cash"]) : 0;            //是否现金道具

                    rw.attackSpeed = eqpabi["info.attackSpeed"];   //攻击速度
                    rw.incPAD = eqpabi["info.incPAD"] ? Number(eqpabi["info.incPAD"]) : 0;//增加攻击力
                    rw.incMAD = eqpabi["info.incMAD"] ? Number(eqpabi["info.incMAD"]) : 0;//增加魔法力
                    rw.incPDD = eqpabi["info.incPDD"] ? Number(eqpabi["info.incPDD"]) : 0;//增加物理防御力
                    rw.incMDD = eqpabi["info.incMDD"] ? Number(eqpabi["info.incMDD"]) : 0;//增加魔法防御力
                    rw.incSTR = eqpabi["info.incSTR"] ? Number(eqpabi["info.incSTR"]) : 0;//增加力量
                    rw.incDEX = eqpabi["info.incDEX"] ? Number(eqpabi["info.incDEX"]) : 0;//增加敏捷
                    rw.incINT = eqpabi["info.incINT"] ? Number(eqpabi["info.incINT"]) : 0;//增加智力
                    rw.incLUK = eqpabi["info.incLUK"] ? Number(eqpabi["info.incLUK"]) : 0;//增加运气
                    rw.incMHP = eqpabi["info.incMHP"] ? Number(eqpabi["info.incMHP"]) : 0;//增加HP总值
                    rw.incMMP = eqpabi["info.incMMP"] ? Number(eqpabi["info.incMMP"]) : 0;//增加MP总值
                    rw.incACC = eqpabi["info.incACC"] ? Number(eqpabi["info.incACC"]) : 0;//增加命中率
                    rw.incEVA = eqpabi["info.incEVA"] ? Number(eqpabi["info.incEVA"]) : 0;//增加回避率
                    rw.incSPEED = eqpabi["info.incSPEED"] ? Number(eqpabi["info.incSPEED"]) : 0;//增加移动速度
                    rw.incJUMP = eqpabi["info.incJUMP"] ? Number(eqpabi["info.incJUMP"]) : 0;//增加跳跃力
                    rw.tuc = eqpabi["info.tuc"] ? Number(eqpabi["info.tuc"]) : 0;           //升级次数

                    rw.price = eqpabi["info.price"] ? Number( eqpabi["info.price"]) : 0;         //商店出售价格
                }
            }
            if(rw.cash == 0) {
                if(msMoudle.findKeyFromArr(itemId, msMoudle.AllCash)) {
                    rw.cash = 1;
                }
            }
            return rw;
        }
        return null;
    }

    //技能信息
    export function getSkillMsg(itemId:any) : any {

        let rw:any = new Object();
        rw.id = itemId;
        rw.name = msMoudle.wz["Skill.img"][itemId][itemId + ".name"];
        rw.desc = msMoudle.wz["Skill.img"][itemId][itemId + ".desc"];

        let root:string = "skill." + itemId + ".icon";
        let data:any = msMoudle.wz[ Math.floor(itemId / 10000) + ".img" ]["skill." + itemId];
        let msg:any = msMoudle.getWindowInfo(data[root], "skill." + itemId);
        rw.img = "res/Skill/" + Math.floor(itemId / 10000) + ".img/" + msg.strMarker;

        rw.type = 0;

        return rw;
    }

    export function getLoadcalSkillMsg(itemId:any) : any {
        let rw:any = new Object();
        rw.id = itemId;
        // rw.name = msMoudle.wz["Skill.img"][itemId][itemId + ".name"];
        // rw.desc = msMoudle.wz["Skill.img"][itemId][itemId + ".desc"];
        rw.img = "skillIcon/1.png";
        rw.type = 0;
        return rw;
    }

    // export function randWood() : any {
    //     let itemId:number = Number(msMoudle.AllWeapon[msMoudle.getRandValue(0, 0, msMoudle.AllWeapon.length)]);
    //     let rw:any = msMoudle.getEqpMsg(itemId);

    //     return rw;
    // }

    export function __(rnk:number = 50) : void {


    }

    export function randSkill() : any {
        let itemId:number = Number(msMoudle.AllSkills[msMoudle.getRandValue(0, 0, msMoudle.AllSkills.length)]);
        let rw:any = msMoudle.getSkillMsg(itemId);
        return rw;
    }

    //获得装备部位
    export function getEqpType(itemId:any) : any {
        if(msMoudle.isWeapon(itemId))
            return msMoudle.partType.tWeapon;
        else if(msMoudle.isShield(itemId))
            return msMoudle.partType.tShield;
        else if(msMoudle.isCap(itemId))
            return msMoudle.partType.tCap;
        else if(msMoudle.isCape(itemId))
            return msMoudle.partType.tCape;
        else if(msMoudle.isShoes(itemId))
            return msMoudle.partType.tShoes;
        else if(msMoudle.isCoat(itemId))
            return msMoudle.partType.tCoat;
        else if(msMoudle.isPants(itemId))
            return msMoudle.partType.tPants;
        else if(msMoudle.isLongCoat(itemId))
            return msMoudle.partType.tLongcoat;
        else if(msMoudle.isGlove(itemId))
            return msMoudle.partType.tGlove;
        else if(msMoudle.isAccessory1(itemId))
            return msMoudle.partType.tAccessory1;
        else if(msMoudle.isAccessory2(itemId))
            return msMoudle.partType.tAccessory2;
        else if(msMoudle.isAccessory3(itemId))
            return msMoudle.partType.tAccessory3;
        else if(msMoudle.isAccessory4(itemId))
            return msMoudle.partType.tAccessory4;
        else if(msMoudle.isAccessory5(itemId))
            return msMoudle.partType.tAccessory5;
        else if(msMoudle.isAccessory6(itemId))
            return msMoudle.partType.tAccessory6;
        else {
            // console.log("未统计");
            return -1;
        }
        return -1;
    }
    //获得武器类型
    export function getWeaponType(itemId:string) : any {
        // console.log(itemId)
        if(itemId != Number(itemId).toString()) {
            if(itemId.indexOf(".img") >= 0) itemId = msMoudle.rmvImg(itemId);
        }
        let cat = Math.floor((Number(itemId) / 10000) % 100);
        if(cat == 21) return "双头杖";
        else if(cat == 22) return "灵魂手统";
        else if(cat == 23) return "亡命之徒";////复仇者
        else if(cat == 24) return "能量剑";
        else if(cat == 25) return "魔法棒";
        else if(cat == 26) return "限制器";
        else if(cat == 27) return "锁链";
        else if(cat == 28) return "魔力手套";
        else if(cat == 29) return "扇";
        else if(cat == 30) return "单手剑";
        else if(cat == 31) return "单手斧";
        else if(cat == 32) return "单手钝器";
        else if(cat == 33) return "短刀";
        else if(cat == 34) return "刀";////
        else if(cat == 35) return "宝盒";///
        else if(cat == 36) return "手杖";
        else if(cat == 37) return "短杖";
        else if(cat == 38) return "长杖";
        else if(cat == 40) return "双手剑";
        else if(cat == 41) return "双手斧";
        else if(cat == 42) return "双手钝器";
        else if(cat == 43) return "枪";
        else if(cat == 44) return "矛";
        else if(cat == 45) return "弓";
        else if(cat == 46) return "弩";
        else if(cat == 47) return "拳套";
        else if(cat == 48) return "拳甲";///
        else if(cat == 49) return "短枪";///
        else if(cat == 50) return "铲";
        else if(cat == 51) return "镐";
        else if(cat == 52) return "双弩";
        else if(cat == 53) return "大炮";
        else if(cat == 54) return "刀";
        else if(cat == 55) return "扇";
        else if(cat == 56) return "大剑";///
        else if(cat == 57) return "太刀";///
        else if(cat == 58) return "拳炮";
        else if(cat == 59) return "远古弓";
        else if(cat == 70) return "特殊";///时装
        else {
            console.log("getWeaponType错误   " + itemId  + "  " + cat);
            return ;
        }
    }
    //时装需要读取的字段
    export function getWeaponCat(itemId:any) : any {
        if(itemId.indexOf(".img") >= 0) itemId = msMoudle.rmvImg(itemId);
        let cat = Math.floor((Number(itemId) / 10000) % 100);
        return cat;
    }

    export function isWeaponPartIndex(partindex:number) : boolean {
        if(partindex == 7 || partindex == 38 || partindex == 39 || partindex == 40 || partindex == 41) return true;
        return false;
    }

    //获得武器系数
    export function getWeaponAbi(itemId:any) :any {
        let cat = Math.floor((itemId / 10000) % 100);
        if(cat == 21) return 1.2;     //return "双头杖";
        else if(cat == 22) return 1.2;     //return "灵魂手统";
        else if(cat == 23) return 1.2;     //
        else if(cat == 24) return 1.2;//能量剑
        else if(cat == 25) return 1.2;     //return "魔法棒";
        else if(cat == 26) return 1.2;     //return "限制器";
        else if(cat == 27) return 1.2;     //return "锁链";
        else if(cat == 28) return 1.2;     //return "魔力手套";
        else if(cat == 29) return 1.2;     //return "扇";
        else if(cat == 30) return 1.2;// "单手剑"
        else if(cat == 31) return 1.2;// "单手斧";
        else if(cat == 32) return 1.2;// "单手钝器";
        else if(cat == 33) return 1.2;// "短刀";
        else if(cat == 34) return 1.2;     //return "刀";////
        else if(cat == 35) return 1.2;     //return "宝盒";///
        else if(cat == 36) return 1.2;// "手杖";
        else if(cat == 37) return 1.2;// "短杖";
        else if(cat == 38) return 1.2;// "长杖";
        else if(cat == 40) return 1.2;// "双手剑";
        else if(cat == 41) return 1.2;// "双手斧";
        else if(cat == 42) return 1.2;// "双手钝器";
        else if(cat == 43) return 1.2;// "枪";
        else if(cat == 44) return 1.2;// "矛";
        else if(cat == 45) return 1.2;// "弓";
        else if(cat == 46) return 1.2;// "弩";
        else if(cat == 47) return 1.2;// "拳套";
        else if(cat == 48) return 1.2;// "拳甲";
        else if(cat == 49) return 1.2;// "枪"
        else if(cat == 50) return 1.2;     //return "铲";
        else if(cat == 51) return 1.2;     //return "镐";
        else if(cat == 52) return 1.2;     //return "双弩";
        else if(cat == 53) return 1.2;     //return "大炮";
        else if(cat == 54) return 1.2;     //return "刀";
        else if(cat == 55) return 1.2;     //return "扇";
        else if(cat == 56) return 1.2;     //return "大剑";///
        else if(cat == 57) return 1.2;     //return "太刀";///
        else if(cat == 58) return 1.2;     //return "拳炮";
        else if(cat == 59) return 1.2;     //return "远古弓";
        else if(cat == 70) return 1.2;//特殊
        else console.log("getWeaponAbi错误");
    }
    //350   300   250  200  150  100 50
    //获得武器攻击距离
    export function getWeaponRange(itemId:any) : any {
        itemId = msMoudle.rmvImg(itemId);
        let cat = Math.floor((itemId / 10000) % 100);
        if(cat == 23) return 0;               //灵魂
        else if(cat == 24) return 0;
        else if(cat == 29) return 0;
        else if(cat == 30) return 0;          // "单手剑"/////
        else if(cat == 31) return 0;          //"单手斧";/////
        else if(cat == 32) return 0;          //"单手钝器";/////
        else if(cat == 33) return 0;          // "短刀";//////
        else if(cat == 36) return 200;          //"手杖";/////
        else if(cat == 37) return 200;          //"短杖";/////
        else if(cat == 38) return 200;        // "长杖";/////
        else if(cat == 40) return 0;          //"双手剑";/////
        else if(cat == 41) return 0;          //"双手斧";/////
        else if(cat == 42) return 0;          //"双手钝器";////
        else if(cat == 43) return 0;          // "枪";//////
        else if(cat == 44) return 0;          //"矛";///////
        else if(cat == 45) return 300;        // "弓";//////
        else if(cat == 46) return 275;          //"弩";/////
        else if(cat == 47) return 225;        // "拳套";/////
        else if(cat == 48) return 0;          //"拳甲";
        else if(cat == 49) return 250;        //短枪//////
        else if(cat == 55) return 0;
        else if(cat == 56) return 0;          //"大剑";
        else if(cat == 57) return 0;          //"太刀";
        else if(cat == 70) return 0;           //特殊
        else {
            console.log("getWeaponRange错误");
            return 0;
        }
    }
    //获得武器攻击动作 .
    export function getWeaponAct(itemId:any) : any {
        itemId = msMoudle.rmvImg(itemId);
        let cat = Math.floor((itemId / 10000) % 100);
        if(cat == 23) return "stabO1";
        else if(cat == 24) return "stabO1";
        else if(cat == 30) return "stabO1";       //swingO1   swingO2 swingO3 stabO1  stabO2
        else if(cat == 31) return "swingO1";
        else if(cat == 32) return "swingO2"; //swingO1   swingO2 swingO3 stabO1  stabO2
        else if(cat == 33) return "stabO2";   //swingO1   swingO2 swingO3 stabO1  stabO2  stabT1
        else if(cat == 36) return "swingO3";
        else if(cat == 37) return "swingO3";   //swingO1   swingO2 swingO3 stabO1  stabO2  shoot1
        else if(cat == 38) return "swingO3";   //swingO1   swingO2 swingO3 stabO1  stabO2  shoot1
        else if(cat == 40) return "swingT1";  //swingT1   swingT2 swingT3 stabO1  stabO2
        else if(cat == 41) return "swingT1";
        else if(cat == 42) return "swingT1"; //swingT1   swingT2 swingT3 stabO1  stabO2
        else if(cat == 43) return "stabT1";        //swingT2   swingP1 swingP2 stabT1
        else if(cat == 44) return "swingP2";        //swingT2   swingP1 swingP2 stabT1  stabT2
        else if(cat == 45) return "shoot1";        //swingT1   swingT3 shoot1
        else if(cat == 46) return "shoot1";        //swingT1   stabT1  shoot2
        else if(cat == 47) return "swingO2";       //swingO1   swingO2 swingO3 stabO1  stabO2
        else if(cat == 48) return "stabO1";
        else if(cat == 49) return "alert";
        else if(cat == 56) return "stabO1";
        else if(cat == 57) return "stabO1";
        else if(cat == 70) return "swingO1";
        else console.log("getWeaponRange错误");
    }
    //获得武器速度
    export function getSpeedType(eqpSpeed:number) : any {
        if(eqpSpeed == 3) return "比较快";
        else if(eqpSpeed == 4) return "快";
        else if(eqpSpeed == 5) return "快";
        else if(eqpSpeed == 6) return "普通";
        else if(eqpSpeed == 7) return "慢";
        else if(eqpSpeed == 8) return "慢";
        else if(eqpSpeed == 9) return "比较慢";
    }
    //是否武器
    export function isWeapon(itemId:any) : boolean {
        if(itemId >= 1230000 && itemId < 1800000) return true;
        return false;
    }
    //是否盾牌
    export function isShield(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 109) return true;
        return false;
    }
    //脸饰
    export function isAccessory1(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 101) return true;
        return false;
    }
    //眼饰
    export function isAccessory2(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 102) return true;
        return false;
    }
    //耳环
    export function isAccessory3(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 103) return true;
        return false;
    }
    //坠子
    export function isAccessory4(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 112) return true;
        return false;
    }
    //腰带
    export function isAccessory5(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 113) return true;
        return false;
    }
    //勋章
    export function isAccessory6(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 114) return true;
        return false;
    }
    //是否手套
    export function isGlove(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 108) return true;
        return false;
    }
    //是否帽子
    export function isCap(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 100) return true;
        return false;
    }
    //是否披风
    export function isCape(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 110) return true;
        return false;
    }
    //是否鞋子
    export function isShoes(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 107) return true;
        return false;
    }
    //是否上衣
    export function isCoat(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 104) return true;
        return false;
    }
    //是否裤子
    export function isPants(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        if(cat == 106) return true;
        return false;
    }
    export function isLongCoat(itemId:any) : boolean {
        let cat = Math.floor(itemId / 10000);
        // console.log("xxxxx", cat)
        if(cat == 105) return true;
        return false;
    }
    //是否装备
    export function isEquip(itemId:any) : boolean {
        if(msMoudle.isWeapon(Number(itemId))) return true;
        else if(msMoudle.isShield(Number(itemId))) return true;
        else if(msMoudle.isCap(Number(itemId))) return true;
        else if(msMoudle.isCape(Number(itemId))) return true;
        else if(msMoudle.isShoes(Number(itemId))) return true;
        else if(msMoudle.isCoat(Number(itemId))) return true;
        else if(msMoudle.isPants(Number(itemId))) return true;
        else if(msMoudle.isLongCoat(Number(itemId))) return true;
        else if(msMoudle.isGlove(Number(itemId))) return true;

        else if(msMoudle.isAccessory1(Number(itemId))) return true;
        else if(msMoudle.isAccessory2(Number(itemId))) return true;
        else if(msMoudle.isAccessory3(Number(itemId))) return true;
        else if(msMoudle.isAccessory4(Number(itemId))) return true;
        else if(msMoudle.isAccessory5(Number(itemId))) return true;
        else if(msMoudle.isAccessory6(Number(itemId))) return true;
        return false;
    }
    //是否Item
    export function isItem(itemId:any) : boolean {
        if( Math.floor(itemId / 10000) == 400 || Math.floor(itemId / 10000) == 401 || Math.floor(itemId / 10000) == 402 || Math.floor(itemId / 10000) == 425 ) {
            return true;
        }
        return false;
    }
    //是否卷轴
    export function isJuanZhou(itemId:any) : any {
        //204卷轴
        if( Math.floor(itemId / 10000) == 204 ) {
            return true;
        }
        return false;
    }

    //更新血量
    export function updateHP() : void {
        if(msMoudle.gameP) {
            if(msMoudle.isScreen()) {
                msMoudle.gameP.hp.width = 169 * (msMoudle.hp / msMoudle.maxhp);
            }
            else {
                if(msMoudle.gameP.hpmp)
                    msMoudle.gameP.hpmp.visible = false;
                if(msMoudle.mainT)
                    msMoudle.mainT.updateHp();
            }
        }
    }
    //更新魔法
    // export function updateMP() : void {
    //     msMoudle.gameP.mp.width = 142 * (msMoudle.maxmp / 100)//ms.herodata.MaxMP.GetSum());
    // }

    // export function updateSkillMP(skillid:string) : number {
    //     let M = 0;
    //     if(msMoudle.findKeyFromArr(skillid, msMoudle.m_skill)) M = 5;
    //     else if(msMoudle.findKeyFromArr(skillid, msMoudle.m_skill2)) M = 5;
    //     else if(msMoudle.findKeyFromArr(skillid, msMoudle.m_skill3)) M = 5;
    //     else if(msMoudle.findKeyFromArr(skillid, msMoudle.m_skill4)) M = 2;
    //     else if(msMoudle.findKeyFromArr(skillid, msMoudle.m_skill5)) M = 2;
    //     if(M > 0) {
    //         msMoudle.maxmp -= M;
    //         if(msMoudle.maxmp <= 0) msMoudle.maxmp = 0;
    //         msMoudle.updateMP();
    //     }
    //     return M;
    // }

    export function updateMartPai(martpai:number) : void {
        ms.jc_cal[0]++;
        ms.SmartPai(Math.floor(martpai))
    }
    export function updateMartPoint(martpoint:number, ly:number = 0) : void {
        ms.jc_cal[0]++;
        ms.SmartPoint(Math.floor(martpoint))

        Gua.jiaoyi(martpoint, ly);
    }
    export function updateJinBi(jinbi:number, ly:number = 0) : void {
        ms.jc_cal[0]++;
        // ms.jinbi() += Math.floor(jinbi);
        ms.Sjinbi(Math.floor(jinbi));
        msMoudle.gameP.jinbi.text = Math.floor(ms.jinbi())//.toString();
        ms.ajb += jinbi;
        msMoudle.test_jinbi += jinbi;
        Gua.jinbi(jinbi, ly);
    }
    export function updateRongYu(rongyu:number, ly:number = 0) : void {
        ms.jc_cal[0]++;
        // ms.rongyu() += Math.floor(rongyu);
        ms.Srongyu(Math.floor(rongyu))
        msMoudle.gameP.rongyu.text = Math.floor(ms.rongyu())//.toString();
        ms.ary += rongyu;
        msMoudle.test_rongyu += rongyu;
        Gua.rongyu(rongyu, ly);
    }
    export function updateZuanShi(zuanshi:number, ly:number = 0) : void {
        ms.jc_cal[0]++;
        ms.Szuanshi(Math.floor(zuanshi));
        // ms.zuanshi() += Math.floor(zuanshi);
        msMoudle.gameP.zuanshi.text = Math.floor(ms.zuanshi())//.toString();
        ms.azs += zuanshi;
        msMoudle.test_zuanshi += zuanshi;
        Gua.zuanshi(zuanshi, ly);
    }
    export function updateJiFen(jifen:number) : void {
        ms.jc_cal[0]++;
        // ms.jifen() += jifen;
        ms.Sjifen(Math.floor(jifen));
        ms.ajf += jifen;
        msMoudle.test_jifen += jifen;
    }
    export function updateCaiLiao1(num:number) : void {
        ms.jc_cal[0]++;
        // ms.cailiao1() += num;
        ms.Scailiao1(Math.floor(num));
        msMoudle.test_cailiao1 += num;
        Gua.cailiao(num, 0);
    }
    export function updateCaiLiao2(num:number) : void {
        ms.jc_cal[0]++;
        // ms.cailiao2() += num;
        ms.Scailiao2(Math.floor(num));
        msMoudle.test_cailiao2 += num;
        Gua.cailiao(num, 0);
    }
    export function updateJueXing1(num:number) : void {
        ms.jc_cal[0]++;
        // ms.juexing1() += num;
        ms.Sjuexing1(Math.floor(num));
        msMoudle.test_juexing1 += num;
        Gua.cailiao(num, 0);
    }
    export function updateZhuanSheng(num:number) : void {
        ms.jc_cal[0]++;
        ms.herodata.ZS += num;
        msMoudle.test_zs += num;
    }
    export function updateZhiHuan(num:number) : void {
        ms.jc_cal[0]++;
        ms.zhihuan += num;
        msMoudle.test_zhihuan += num;
    }
    export function getItem(itemid:string) : void {
        ms.jc_cal[0]++;
        let have:boolean = false;
        for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
            if(ms.herodata.BagSlots[i].openid == Number(itemid)) {
                have = true;
                ms.herodata.BagSlots[i].num += 1;
                break;
            }
        }
        if(have == false) {
            if(ms.herodata.BagSlots.length > msMoudle.BAGMAX) return ;
            let tIndex:number = ms.herodata.BagSlots.length;
            ms.herodata.BagSlots[tIndex] = new app.model.Equip();
            ms.herodata.BagSlots[tIndex].id = itemid;
            ms.herodata.BagSlots[tIndex].type = 0;
            ms.herodata.BagSlots[tIndex].num = 1;
            ms.herodata.BagSlots[tIndex].openid = Number(itemid);
            ms.herodata.BagSlots[tIndex].suo = false;
        }

        if(itemid == "2040599") {
            msMoudle.test_shenmi += 1;
            ms.asm += 1;
        }

        // let new_item:app.model.Equip = new app.model.Equip();
        // new_item.ResetAll();
        // let data:any = msMoudle.wz[id + ".img"]["info"];
        // new_item.id = itemid;
        // new_item.type = 0;
        // new_item.openid = Number(itemid);
        // new_item.price = Number(data["info.price"]);
        // new_item.num = 1;

        // ms.herodata.BagSlots[ms.herodata.BagSlots.length] = new_item;
    }
    export function getWeapon(itemid:string) : void {
        ms.jc_cal[0]++;
        let index_path:string = msMoudle.getEqpIndex(itemid);
        ////需要加载
        if(!Laya.loader.getRes(index_path)) {
            let res:Array<any> = [];
            res.push({ url: index_path });
            msLoad.load(res).done(dlg => {
                if(!msMoudle.wz[itemid + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.getWeapon__(itemid);
            });
        }
        else {
            if(!msMoudle.wz[itemid + ".img"]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[itemid + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
            }
            this.getWeapon__(itemid);
        }
    }
    export function getWeapon__(itemid:string) : void {
        let rnk:number = msMoudle.getRandValue(1, 0, 1000000);
        let id = itemid;
        let new_equip:app.model.Equip = new app.model.Equip();
        new_equip.ResetAll();
        let data:any = msMoudle.wz[id + ".img"]["info"];
        if(data) {
            new_equip.reqLevel = data["info.reqLevel"] ? Number(data["info.reqLevel"]) : 0;
            new_equip.sfx = data["info.sfx"];
            new_equip.PADamage.baseVal = data["info.incPAD"] ? Number(data["info.incPAD"]) : 0;
            new_equip.MADamage.baseVal = data["info.incMAD"] ? Number(data["info.incMAD"]) : 0;
            new_equip.PDDamage.baseVal = data["info.incPDD"] ? Number(data["info.incPDD"]) : 0;
            new_equip.MDDamage.baseVal = data["info.incMDD"] ? Number(data["info.incMDD"]) : 0;
            new_equip.Str.baseVal = data["info.incSTR"] ? Number(data["info.incSTR"]) : 0;
            new_equip.Dex.baseVal = data["info.incDEX"] ? Number(data["info.incDEX"]) : 0;
            new_equip.Inte.baseVal = data["info.incINT"] ? Number(data["info.incINT"]) : 0;
            new_equip.Luck.baseVal = data["info.incLUK"] ? Number(data["info.incLUK"]) : 0;
            new_equip.MaxHP.baseVal = data["info.incMHP"] ? Number(data["info.incMHP"]) : 0;
            new_equip.MaxMP.baseVal = data["info.incMMP"] ? Number(data["info.incMMP"]) : 0;

            // rw.attackSpeed = eqpabi["info."];   //攻击速度
            // rw.incMHP = eqpabi["info."] ? Number(eqpabi["info.incMHP"]) : 0;//增加HP总值
            // rw.incMMP = eqpabi["info."] ? Number(eqpabi["info.incMMP"]) : 0;//增加MP总值
            // rw.incACC = eqpabi["info.incACC"] ? Number(eqpabi["info.incACC"]) : 0;//增加命中率
            // rw.incEVA = eqpabi["info.incEVA"] ? Number(eqpabi["info.incEVA"]) : 0;//增加回避率
            // rw.incSPEED = eqpabi["info.incSPEED"] ? Number(eqpabi["info.incSPEED"]) : 0;//增加移动速度
            // rw.incJUMP = eqpabi["info.incJUMP"] ? Number(eqpabi["info.incJUMP"]) : 0;//增加跳跃力

            new_equip.id = id;
            new_equip.type = 1;
            new_equip.num = 1;
            new_equip.suo = false;
            if(msMoudle.isWeapon(Number(itemid)))
                new_equip.part = 0;  //0武器 1套装 2披风 3鞋子
            else if(msMoudle.isLongCoat(Number(itemid))) {
                new_equip.part = 1;  //0武器 1套装 2披风 3鞋子
            }
            else if(msMoudle.isCape(Number(itemid))) {
                new_equip.part = 2;  //0武器 1套装 2披风 3鞋子
            }
            else if(msMoudle.isShield(Number(itemid))) {
                new_equip.part = 3;  //0武器 1套装 2披风 3鞋子
            }
            else if(msMoudle.isGlove(Number(itemid))) {
                new_equip.part = 4;
            }
            else if(msMoudle.isShoes(Number(itemid))) {
                new_equip.part = 5;
            }
            else if(msMoudle.isCap(Number(itemid))) {
                new_equip.part = 6;
            }
            else if(msMoudle.isAccessory1(Number(itemid))) {
                new_equip.part = 10;
            }
            else if(msMoudle.isAccessory2(Number(itemid))) {
                new_equip.part = 11;
            }
            else if(msMoudle.isAccessory3(Number(itemid))) {
                new_equip.part = 7;
            }
            else if(msMoudle.isAccessory4(Number(itemid))) {
                new_equip.part = 8;
            }
            else if(msMoudle.isAccessory5(Number(itemid))) {
                new_equip.part = 9;     //
            }
            else if(msMoudle.isAccessory6(Number(itemid))) {
                new_equip.part = 12;
            }

            new_equip.openid = msMoudle.getRandValue(0, 0, 10000000);
            new_equip.suc = 0;
            new_equip.tuc = data["info.tuc"] ? Number(data["info.tuc"]) : 0;
            new_equip.price = Number(data["info.price"]);

            if(ms.herodata.BagSlots.length > msMoudle.BAGMAX) return ;
            ms.herodata.BagSlots[ms.herodata.BagSlots.length] = new_equip;
        }
        else {
            console.log("2道具不存在" + itemid)
        }
    }
    export function buyOneHero(getIndex:number, P:any = null) : void {
        ms.jc_cal[0]++;
        let rnk:number = msMoudle.getRandValue(1, 0, 1000000);
        if(P != null) P.btnBack.visible = false;

        let tIndex:number = ms.herosdata.length;
        ms.herosdata[tIndex] = new Object();
        ms.herosdata[tIndex].id = msMoudle.herojson[getIndex].id;
        ms.herosdata[tIndex].openid = rnk;
        ms.herosdata[tIndex].have = 1;            //1表示未上阵、2表示上阵
        ms.herosdata[tIndex].lv = 1;
        ms.herosdata[tIndex].Name = msMoudle.herojson[getIndex].name;
        // ms.herosdata[tIndex].head = msMoudle.herojson[getIndex].head;
        ms.herosdata[tIndex].juexing = 0;
        ms.herosdata[tIndex].pinzhi = msMoudle.herojson[getIndex].pinzhi;
        ///初始化服务器属性
        let _:number = ms.otherheroservedata.length;
        ms.otherheroservedata[_] = new app.model.HeroStatus();
        ms.otherheroservedata[_].id = msMoudle.herojson[getIndex].id;
        ms.otherheroservedata[_].openid =  ms.herosdata[tIndex].openid;
        ms.otherheroservedata[_].Lv = 1;
        ms.otherheroservedata[_].Exp = 0;
        ms.otherheroservedata[_].Name = msMoudle.herojson[getIndex].name;
        // ms.otherheroservedata[_].head = msMoudle.herojson[getIndex].head;
        ms.otherheroservedata[_].juexing = 0; //觉醒状态
        ms.otherheroservedata[_].star = 1;//msMoudle.getRandValue(1, 0, 5);      //星级
        ms.otherheroservedata[_].pinzhi = msMoudle.herojson[getIndex].pinzhi;//品质
        //技能
        //1.群体治疗    （群体回血）      2301002 ----表现正常    (回血)
        //2.冰冻术       （冰冻效果）    2201004 ---表现正常     (冰冻)        xxxxx不太好
        //3.雷电术         （群体攻击）  2201005 ---表现正常     (群体输出)      -----
        //4.陨石          (群体攻击)  2121007     ---表现正常     (群体输出)
        //5.落霜冰破       (群体攻击)   2221007     ---表现正常 (群体输出)
        //6.2211002         (群体攻击)              (群体输出)
        //8.斗气          1111002             ----表现正常    (属性加成)
        //9.杀杀杀     4201005                 ---不正常      (单体输出)
        //10.圣光术    2321008 （群体攻击）      ---不报错      (群体输出)
        //////1311001 枪连击 1311007力量崩坏  1311008龙之力 1111002斗气  1311003 无双枪 1311006 龙咆哮

        ////斗气、枪连击、无双枪、龙咆哮、全体治疗
        //技能
        // ms.otherheroservedata[_].skill_1 = "2301002";//
        ms.otherheroservedata[_].Skill_1 = msMoudle.herojson[getIndex].skill_1;
        ms.otherheroservedata[_].Skill_2 = msMoudle.herojson[getIndex].skill_2;
        ms.otherheroservedata[_].Skill_3 = msMoudle.herojson[getIndex].skill_3;
        ms.otherheroservedata[_].Skill_4 = msMoudle.herojson[getIndex].skill_4;
        ////初始化属性
        msMoudle.serverAbi(ms.otherheroservedata[_]);

        if(P != null) {
            if(ms.otherheroservedata[_].pinzhi == 1) P.pinzhi.text = "N";
            else if(ms.otherheroservedata[_].pinzhi == 2) P.pinzhi.text = "R";
            else if(ms.otherheroservedata[_].pinzhi == 3) P.pinzhi.text = "SR";
            else if(ms.otherheroservedata[_].pinzhi == 4) P.pinzhi.text = "SSR";
            else if(ms.otherheroservedata[_].pinzhi == 5) P.pinzhi.text = "神卡";
        }

        ms.saveServer();
    }


    export function _() : void {ms.jc_cal[1]++;}

    export function updateLv(lv:number) : void {
        if(ms.herodata.Lv < 200) {
            ms.herodata.Lv += lv;
            msMoudle.test_lv += lv;
        }
    }

    export function waterReward() : number {
        if(msMoudle.getRandValue(0, 0, 100) < 40) return 0;
        return msMoudle.getRandValue(0, 0, 5);
    }

    export function specialReward(rewards:any, i:number = -1, flag:boolean = false) : void {
        let showReward:Array<any> = [];
        if(i != -1) {
            showReward[0] = new Object();
            //金币
            if(rewards[i].type == 0) {
                showReward[0].itemid = "9000000";
                showReward[0].num = 100;
                showReward[0].pinzhi = 4;
                showReward[0].name = "金币";
                showReward[0].type = 0;
                showReward[0].img = "homeland/02022995.info.icon.png";
                msMoudle._(); msMoudle.updateJinBi(showReward[0].num);
            }
            //枫叶
            else if(rewards[i].type == 1) {
                showReward[0].itemid = "1234561";
                showReward[0].num = 5 + msMoudle.getRandValue(0, 0, 10) * 5;
                showReward[0].pinzhi = 5;
                showReward[0].name = "枫叶";
                showReward[0].type = 0;
                showReward[0].img = "homeland/02028044.info.icon.png";
                msMoudle._(); msMoudle.updateRongYu(showReward[0].num);
            }
            //点券
            else if(rewards[i].type == 2) {
                showReward[0].itemid = "1234561";
                showReward[0].num = 5;
                showReward[0].pinzhi = 5;
                showReward[0].name = "枫叶";
                showReward[0].type = 0;
                showReward[0].img = "homeland/02028044.info.icon.png";
                msMoudle._(); msMoudle.updateRongYu(showReward[0].num);

                // showReward[0].itemid = "1234562";
                // showReward[0].num = 1 + msMoudle.getRandValue(0, 0, 2);
                // showReward[0].pinzhi = 5;
                // showReward[0].name = "黑金";
                // showReward[0].type = 0;
                // showReward[0].img = "homeland/02048719.info.icon.png";
                // msMoudle._(); msMoudle.updateZuanShi(showReward[0].num);
            }
            //卷轴
            else if(rewards[i].type == 3) {
                if(msMoudle.getRandValue(0, 0, 100) < 75) {
                    let itemId = msMoudle.rnkEqp();
                    msMoudle._(); msMoudle.getWeapon(itemId);
                    let eqp:any = msMoudle.getEqpMsg(itemId);
                    showReward[0].num = 1;
                    showReward[0].itemid = eqp.id;
                    showReward[0].name = eqp.name;
                    showReward[0].img = eqp.img;
                    showReward[0].pinzhi = 5;
                    showReward[0].type = 1;
                }
                else {
                    let itemId = msMoudle.rnkJuanZhou();
                    msMoudle._(); msMoudle.getItem(itemId);
                    let item:any = msMoudle.getItemMsg(Number(itemId));
                    showReward[0].num = 1;
                    showReward[0].itemid = item.id;
                    showReward[0].name = item.name;
                    showReward[0].img = item.img;
                    showReward[0].type = 0;
                    showReward[0].pinzhi = 5;
                }
            }
            //装备
            else if(rewards[i].type == 4) {
                let itemId = msMoudle.rnkEqp();
                msMoudle._(); msMoudle.getWeapon(itemId);
                let eqp:any = msMoudle.getEqpMsg(itemId);
                showReward[0].num = 1;
                showReward[0].itemid = eqp.id;
                showReward[0].name = eqp.name;
                showReward[0].img = eqp.img;
                showReward[0].pinzhi = 5;
                showReward[0].type = 1;
            }
        }
        else {
            for(let i:number = 0; i < rewards.length; i++) {
                showReward[i] = new Object();
                //金币
                if(rewards[i].type == 0) {
                    showReward[i].itemid = "9000000";
                    showReward[i].num = 100;
                    showReward[i].pinzhi = 4;
                    showReward[i].name = "金币";
                    showReward[i].type = 0;
                    showReward[i].img = "homeland/02022995.info.icon.png";
                    msMoudle._(); msMoudle.updateJinBi(showReward[i].num);
                }
                //枫叶
                else if(rewards[i].type == 1) {
                    showReward[i].itemid = "1234561";
                    showReward[i].num = 5 + msMoudle.getRandValue(0, 0, 10) * 5;
                    showReward[i].pinzhi = 5;
                    showReward[i].name = "枫叶";
                    showReward[i].type = 0;
                    showReward[i].img = "homeland/02028044.info.icon.png";
                    msMoudle._(); msMoudle.updateRongYu(showReward[i].num);
                }
                //点券
                else if(rewards[i].type == 2) {
                    showReward[i].itemid = "1234561";
                    showReward[i].num = 5;
                    showReward[i].pinzhi = 5;
                    showReward[i].name = "枫叶";
                    showReward[i].type = 0;
                    showReward[i].img = "homeland/02028044.info.icon.png";
                    msMoudle._(); msMoudle.updateRongYu(showReward[i].num);

                    // showReward[i].itemid = "1234562";
                    // showReward[i].num = 1 + msMoudle.getRandValue(0, 0, 2);
                    // showReward[i].pinzhi = 5;
                    // showReward[i].name = "黑金";
                    // showReward[i].type = 0;
                    // showReward[i].img = "homeland/02048719.info.icon.png";
                    // msMoudle._(); msMoudle.updateZuanShi(showReward[i].num);
                }
                //卷轴
                else if(rewards[i].type == 3) {
                    let itemId = msMoudle.rnkJuanZhou();
                    msMoudle._(); msMoudle.getItem(itemId);
                    let item:any = msMoudle.getItemMsg(Number(itemId));
                    showReward[i].num = 1;
                    showReward[i].itemid = item.id;
                    showReward[i].name = item.name;
                    showReward[i].img = item.img;
                    showReward[i].type = 0;
                    showReward[i].pinzhi = 5;
                }
                //装备
                else if(rewards[i].type == 4) {
                    let itemId = msMoudle.rnkEqp();
                    msMoudle._(); msMoudle.getWeapon(itemId);
                    let eqp:any = msMoudle.getEqpMsg(itemId);
                    showReward[i].num = 1;
                    showReward[i].itemid = eqp.id;
                    showReward[i].name = eqp.name;
                    showReward[i].img = eqp.img;
                    showReward[i].pinzhi = 5;
                    showReward[i].type = 1;
                }
            }
        }
        //
        if(flag == true) {
             msMoudle.mainT.m__X = 0;
            ui.show(app.battle.rewardDlg, {params:[showReward]});
        }
        else {
            // ui.show(app.battle.reward2Dlg, {params:[showReward]});
            for(let i:number = 0; i < showReward.length; i++)
                msMoudle.toast3("获得" + showReward[i].name);
        }
    }

    export function Effect(id:string) : void {
        let be:cssBasicEff = new cssBasicEff();
        be.loadEffectEff(Laya.stage, id, Laya.stage.width / 2, Laya.stage.height / 2);
    }
    //怪物等级的经验
    export function getLvJinBi(lv:number) : any {
        let sum2:number = 1;
        for(let i:number = 1; i <= lv; i++) {
            if(i > 1) sum2 =  sum2 +  10 * Math.floor(i / 2) + 2 + msMoudle.getRandValue(1, 0, lv);
        }
        let bs = 1;
        if(ms.m_job[1] != "") bs += 0.75;
        ////////收集
        //宠物
        if(ms.petbagsdata.length >= 5) bs += 0.05;
        if(ms.petbagsdata.length >= 10) bs += 0.05;
        //坐骑
        if(ms.tamingmobbagsdata.length >= 4) bs += 0.04;
        if(ms.tamingmobbagsdata.length >= 4) bs += 0.04;
        //椅子
        if(ms.chairbagsdata.length >= 4) bs += 0.04;
        if(ms.chairbagsdata.length >= 4) bs += 0.04;
        //戒指
        bs += ms.ringbagsdata.length * 0.01;
        if(ms.ringbagsdata.length == 6) bs += 0.24;

        if(ms.m_tg == 1) bs += 0.1;
        else if(ms.m_tg == 2) bs += 0.2;
        else if(ms.m_tg == 3) bs += 0.3;
        if(ms.petbagsdata.length == 11) bs += 0.05;
        sum2 *= bs;
        //
        return Math.floor(sum2);
    }

    //总经验
    export function getLvExp(lv:number) : any {
        // if(lv == 0) return 50;
        let sum:number = 5;
        for(let i:number = 1; i <= lv; i++) {
            // if(i > 1) sum = sum + 5 * (Math.floor(i / 2) + 1) * Math.floor(i / 2 + 1);
            if(i > 1) sum = sum + 10 * (Math.floor(i / 2) + 1) * Math.floor(i / 2 + 1);
        }
        if(ms.herodata.ZS > 1) {
            sum *= ms.herodata.ZS;
        }
        else {
            if(lv > 30) sum *= 2;
        }
        // else if(lv > 60) sum *= 3;
        return sum;
    }

    //血量公式
    export function getLvHP(lv:number) : any {
        let sum3:number = 2;
        for(let i:number = 1; i <= lv; i++) {
            if(i > 1) sum3 = sum3 + 5 * (Math.floor(i / 10) + 1) * Math.floor(i / 2 + 1);
        }
        return sum3;
    }

    //伤害公式
    export function getLvAtk(lv:number) : any {
        let sum4:number = 1;
        for(let i:number = 1; i <= lv; i++) {
            if(i > 1) sum4 = sum4 + Math.floor(i / 10) + 4;
        }
        return sum4;
    }

    // export function getHp() : number {
    //     let map = (Number(msMoudle.rmvImg(msMoudle.tiaotiao_map)) / 100000).toFixed(0);
    //     let hp = 100;
    //     if(map == "0" || map == "0000") {}               //彩虹村
    //     else if(map == "1040") {                        //射手村
    //         hp = 1000;
    //     }
    //     else if(map == "1030") {                        //废弃都市
    //         hp = 5000;
    //     }
    //     else if(map == "1020") {                        //勇士部落
    //         hp = 10000;
    //     }
    //     else if(map == "1010") {                        //魔法密林
    //         hp = 50000;
    //     }
    //     else if(map == "1050") {                        //林中城
    //         hp = 100000;
    //     }
    //     else if(map == "1100") {                        //黄金海滩
    //         hp = 200000;
    //     }
    //     else if(map == "2000") {                        //天空之城
    //         hp = 500000;
    //     }
    //     else if(map == "2200") {                        //玩具城
    //         hp = 1000000;
    //     }
    //     else if(map == "2110") {                        //冰封雪域
    //         hp = 2000000;
    //     }
    //     else if(map == "2220") {                        //童话村
    //         hp = 3000000;
    //     }
    //     else if(map == "2210") {                        //地球防御总部
    //         hp = 4000000;
    //     }
    //     else if(map == "2300") {                        //海底世界
    //         hp = 5000000;
    //     }
    //     else if(map == "2400") {                        //神木村
    //         hp = 6000000;
    //     }


    //     //蘑菇王
    //     if(msMoudle.tiaotiao_map == "100000005.img") {
    //         hp = 400000;
    //     }
    //     //僵尸蘑菇王
    //     else if(msMoudle.tiaotiao_map == "105070002.img") {
    //         hp = 800000;
    //     }
    //     //蝙蝠怪
    //     else if(msMoudle.tiaotiao_map == "105090900.img") {
    //         hp = 800000;
    //     }
    //     //展架泡泡鱼
    //     else if(msMoudle.tiaotiao_map == "221020701.img") {
    //         hp = 1600000;
    //     }
    //     //外星人
    //     else if(msMoudle.tiaotiao_map == "221030601.img") {
    //         hp = 3200000;
    //     }
    //     //鱼王
    //     else if(msMoudle.tiaotiao_map == "230040420.img") {
    //         hp = 6400000;
    //     }
    //     //喷火龙
    //     else if(msMoudle.tiaotiao_map == "240020401.img") {
    //         hp = 12800000;
    //     }
    //     //格瑞芬多
    //     else if(msMoudle.tiaotiao_map == "240020101.img") {
    //         hp = 12800000;
    //     }
    //     else if(msMoudle.tiaotiao_map == "280030100.img") {
    //         hp = 25600000;
    //     }
    //     else if(msMoudle.tiaotiao_map == "551030200.img") {
    //         hp = 40000000;
    //     }
    //     else if(msMoudle.tiaotiao_map == "240060200.img") {
    //         hp = 100000000;
    //     }
    //     //一些白名单
    //     if(ms._user == "llk007") hp *= 2;
    //     return hp;
    // }

    //获取怪物经验
    export function getMobExp(mob:any) : number  {

        let addExp = 1;
        if(mob && mob.m_id) {
            if(mob.m_exp > -1) {
                addExp = mob.m_exp;
            }
            else if(msMoudle.wz[mob.m_id]) {
                if(msMoudle.wz[mob.m_id]["info"]) {
                    let exp = msMoudle.wz[mob.m_id]["info"]["info.exp"];
                    addExp = exp ? Number(exp) : 1;
                }
            }
            // msMoudle.toast("exp " + addExp);
            if(ms.herodata.ZS == 0) {
                addExp *= 2.95;
            }
            // addExp *= 100;
            // addExp *= 10000;
        }
        addExp = Math.round(addExp + 1);    //防止查数据

        // console.log("xxxxxx", addExp)
        return addExp;
    }

    export function getRw(mob:any) : any {
        let a = {rnk:5, num:1};

        let addExp = getMobExp(mob);

        //活动经验
        let beishu = 1;
        beishu = msMoudle.maplejson["经验倍数"];
        addExp = beishu * addExp;

        //更新非挂机经验
        if(msMoudle.guaji == false) {
            msMoudle.getExp(addExp);
        }
        //更新挂机经验
        else {
             ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(Math.floor(addExp), false);
        }

        // msMoudle.gameP.updateAllExp(addExp);
        // msMoudle.gameP.exp.width = Laya.stage.width * (ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));//318
        ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
        return a;
    }

    export function getExp(addExp:number) : void {
        //增加经验
        ms.herodata.Exp += Math.floor(addExp);
        let needjinbi:number = msMoudle.getLvExp(ms.herodata.Lv);
        if(ms.herodata.Lv < 200) {
            if(ms.herodata.Exp >= needjinbi) {
                ////这里如果升级多次会有问题
                let add_lv:number = 0;
                while(true) {
                    let _need:number = msMoudle.getLvExp( ms.herodata.Lv);
                    if(ms.herodata.Exp >= _need) {
                        ms.herodata.Exp -= _need;
                        // ms.herodata.Lv++;
                        if(ms.herodata.Lv + 1 <= 200) add_lv++;

                        msMoudle.updateLv(1);
                        msMoudle.gameP.updataSuo();
                        // if(ms.herodata.Lv >= 5) {
                            // msMoudle.mainT.cz_sp.getChildByName("rockerFuBen1").visible = true;
                            // msMoudle.mainT.cz_sp.getChildByName("探索_name").visible = true;

                            // msMoudle.mainT.cz_sp.getChildByName("rockerGJ").visible = true;
                            // msMoudle.mainT.cz_sp.getChildByName("挂机_name").visible = true;
                        // }
                        if(add_lv > 0) {
                            ms.herodata.Exp = 0;
                            break;   //限制经验
                        }
                    }
                    else break;
                }
                msMoudle.char.m_lv = ms.herodata.Lv;
                if(add_lv > 0) {
                    ////升级
                    if(msMoudle.char) {
                        if(msMoudle.char.m_state_sp) {
                            let be:cssBasicEff = new cssBasicEff();
                            be.loadBasicEff(msMoudle.char.m_state_sp, "LevelUp", 0, 0);
                        }
                    }
                    ms.herodata.LeaveUp(add_lv);
                    //等级需要对应的改变
                    msMoudle.mainT.updateLv();
                    // msMoudle.gameP.lv.text = "Lv. " + ms.herodata.Lv;

                    // ms.saveServer();
                }
            }
        }

        if(ui.manager.getDialogByName("app.homeland.MajorCityDlg")) {
            if(ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg) {
                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
            }
        }
        ms.saveServer();
    }

    var bossDrops: any;
    export function getBossBaike(mobId: string) {
        if(!bossDrops) {
            bossDrops = msMoudle.maplejson["boss_drops"];
        }
        let drops = bossDrops[mobId];
        if(!drops) return [];
        let showReward:Array<any> = [];
        for(let i=0; i<drops.length; ++i) {
            let itemId = drops[i][0];
            //装备
            let part = msMoudle.getEqpType(itemId);
            if(part != -1) {
                if((itemId == "1002357" || part != msMoudle.partType.tCap) && part != msMoudle.partType.tCoat && part != msMoudle.partType.tPants) {
                    let save:boolean = true;
                    if(msMoudle.isWeapon(itemId)) {
                        let weatype = msMoudle.getWeaponType(itemId);
                        if(weatype == "亡命之徒" || weatype == "刀" || weatype == "拳甲"
                            || weatype == "短枪" || weatype == "大剑" || weatype == "太刀") {
                                save = false;
                            }
                    }
                    if(save) {
                        let rw:any = new Object();
                        rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/0" + itemId + ".img/info.icon.png";
                        rw.id = "0" + itemId;
                        showReward.push(rw);
                    }
                }
            }
            //卷轴
            else if(isFallJuanZhou(itemId)) {
                let rw:any = msMoudle.getItemMsg(itemId);
                if(rw) showReward.push(rw);
            }
            //垃圾物品
            else {
                let mulu:any = Math.floor(itemId / 10000);
                if(mulu == 400 || mulu == 401 || mulu == 402) {
                    let rw:any = msMoudle.getItemMsg(itemId);
                    if(rw) showReward.push(rw);
                }
            }
        }
        return showReward;
    }
    function getBossFall(mobId: string) {
        if(!bossDrops) {
            bossDrops = msMoudle.maplejson["boss_drops"];
        }
        let drops = bossDrops[mobId];
        if(!drops) return [];
        let showReward:Array<any> = [];
        let getItem = (itemId: any, type: number, part = 0)=>{ //type:1.装备 2.卷轴 3.垃圾
            let item: any = null;
            if(type == 1) {
                item = msMoudle.getEqpMsg(itemId);
            }
            else if(type == 2 || type == 3) {
                item = msMoudle.getItemMsg(Number(itemId));
            }
            if(item) {
                let rw:any = new Object();
                if(type == 1) {
                    rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/0" + itemId + ".img/info.icon.png";
                    rw.id = "0" + itemId;
                    rw.type = 1;
                    rw.lv = 1;
                }
                else {
                    rw.img = item.img;
                    rw.id = itemId;
                    rw.type = 0;
                    rw.lv = 0;
                }
                rw.cash = type == 3 ? 2 : 0;
                rw.name = item.name;
                rw.orgx = -26 / 2;
                rw.orgy = -28;
                showReward.push(rw);
            }
        }
        for(let i=0; i<drops.length; ++i) {
            let itemId = drops[i][0];
            let itemRate = drops[i][1] / 100;
            if(Math.random() < itemRate) {
                //装备
                let part = msMoudle.getEqpType(itemId);
                if(part != -1) {
                    if((itemId == "1002357" || part != msMoudle.partType.tCap) && part != msMoudle.partType.tCoat && part != msMoudle.partType.tPants) {
                        let save:boolean = true;
                        if(msMoudle.isWeapon(itemId)) {
                            let weatype = msMoudle.getWeaponType(itemId);
                            if(weatype == "亡命之徒" || weatype == "刀" || weatype == "拳甲"
                                || weatype == "短枪" || weatype == "大剑" || weatype == "太刀") {
                                    save = false;
                                }
                        }
                        if(save) {
                            getItem(itemId, 1, part);
                        }
                    }
                }
                //卷轴
                else if(isFallJuanZhou(itemId)) {
                    getItem(itemId, 2);
                }
                //垃圾物品
                else {
                    let mulu:any = Math.floor(itemId / 10000);
                    if(mulu == 400 || mulu == 401 || mulu == 402) {
                        // let rnk = 25;
                        // if(mulu == 400) rnk = 25;
                        // else if(mulu == 401) rnk = 2;
                        // else if(mulu == 402) rnk = 1;
                        getItem(3, itemId);
                    }
                }
            }
        }
        return showReward;
    }

    export function getFall(mob:any) : any {
        let showReward:Array<any> = [];
        // 100100.map.23: "105090300"
        // 100100.reward.0: "4000019"

        // || msMoudle.tiaotiao_map == "230040420.img"
        let _:number = 0;

        // if(msMoudle.tiaotiao_map == "240060200.img" || msMoudle.tiaotiao_map == "551030200.img") {
        // // if(msMoudle.tiaotiao_map == "280030100.img" || msMoudle.tiaotiao_map == "240060200.img" ||          msMoudle.tiaotiao_map == "551030200.img"
        // //  || msMoudle.tiaotiao_map == "701010323.img" || msMoudle.tiaotiao_map == "220080001.img") {
        //     let fallN = 3;
        //     // console.log("掉落1111")
        //     // if(msMoudle.tiaotiao_map == "701010323.img") fallN = 1;
        //     // fallN *= 2;

        //     if(msMoudle.getRandValue(0, 0, 100) < 50) {
        //         msMoudle._(); msMoudle.updateJiFen(1);
        //         if(msMoudle.mainT)
        //             if(msMoudle.mainT.m_msgList)
        //                 msMoudle.mainT.m_msgList.msgShow(0, "获得1积分", true);
        //     }
        //     for(let i:number = 0; i < fallN; i++) {
        //         if(msMoudle.getRandValue(0, 0, 100) < 75) {
        //             let rnk = msMoudle.getRandValue(0, 0, 100);
        //             if(rnk < 25) {
        //                 let itemId = msMoudle.rnkEqp();
        //                 let item:any = msMoudle.getEqpMsg(itemId);
        //                 if(item) {
        //                     let part = msMoudle.getEqpType(Number(itemId));
        //                     let rw:any = new Object();
        //                     rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/" + itemId + ".img/info.icon.png";
        //                     // rw.itemId = "0" + itemId;
        //                     rw.id = itemId;

        //                     rw.type = 1;
        //                     rw.lv = 1;
        //                     rw.cash = 0;
        //                     rw.name = item.name;
        //                     rw.orgx = -26 / 2;
        //                     rw.orgy = -28;

        //                     // showReward[_] = new Object();
        //                     showReward[_] = rw;
        //                     _++;
        //                 }
        //             }
        //             else {
        //                 let itemId = msMoudle.rnkJuanZhou();
        //                 let item = msMoudle.getItemMsg(Number(itemId));
        //                 if(item) {
        //                     let rw:any = new Object();
        //                     rw.img = item.img;
        //                     rw.id = itemId;
        //                     rw.type = 0;
        //                     rw.lv = 0;
        //                     rw.cash = 0;
        //                     rw.name = item.name;
        //                     // rw.desc = name;
        //                     rw.orgx = -26 / 2;
        //                     rw.orgy = -28;

        //                     // showReward[_] = new Object();
        //                     showReward[_] = rw;
        //                     _++;
        //                 }
        //             }
        //             // else {
        //             //     let itemId = msMoudle.rnkSpEqp();
        //             //     let item:any = msMoudle.getEqpMsg(itemId);
        //             //     if(item) {
        //             //         let part = msMoudle.getEqpType(Number(itemId));
        //             //         let rw:any = new Object();
        //             //         rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/" + itemId + ".img/info.icon.png";
        //             //         // rw.itemId = "0" + itemId;
        //             //         rw.id = itemId;
        //             //         rw.type = 1;
        //             //         rw.lv = 1;
        //             //         rw.cash = 1;
        //             //         rw.name = item.name;
        //             //         rw.orgx = -26 / 2;
        //             //         rw.orgy = -28;
        //             //         // showReward[_] = new Object();
        //             //         showReward[_] = rw;
        //             //         _++;
        //             //     }
        //             // }
        //         }
        //     }
        // }
        // else {
            // console.log("掉落2222")


            if(mob && mob.m_id) {
                // console.log(mob.m_id)

                let curMob = msMoudle.rmvImg(mob.m_id);
                let id = curMob;

                ///////二形态的需要特殊处理
                //闹钟
                if(id == "8500001") {
                    id = "8500002";
                    curMob = "8500002";
                }
                ///扎昆
                else if(id == "8800000") {
                    id = "8800002";         //二状态
                    curMob = "8800002";
                }
                ///黑龙
                // else if(id == "8810003") {
                //     id = "8810018";
                //     curMob = "8810018";
                // }

                //扎昆手臂
                // if(id != "8800003" && id != "8800004" && id != "8800005" && id != "8800006" && id != "8800007" && id != "8800008" && id != "8800009" && id != "8800010") {
                    if(id.length == 6) id = "0" + id;
                    showReward = getBossFall(id);
                    // console.log("###, ", showReward)
                    if(showReward && showReward.length > 0) {
                        return showReward;
                    }
                    let data = msMoudle.wz["MonsterBook.img"][id];
                    if(data) {
                        // console.log(data);
                        let allfall = msMoudle.allJuanZhou();
                        let index:number = 0;
                        while(true) {
                            let root:string = curMob + ".reward." + index;
                            let itemId = data[root];
                            if(itemId) {
                                // let rnk_ = msMoudle.getRandValue(0, 0, 100);
                                //N的意思表示必然是装备或者卷轴
                                let miss = msMoudle.getRandValue(0, 0, 100);
                                let N = Number(msMoudle.maplejson["小怪爆率"]);

                                // console.log("oooo", id);
                                if(msMoudle.wz[id + ".img"]) {
                                    if(msMoudle.wz[id + ".img"]["info"]) {
                                        // console.log(msMoudle.wz[id + ".img"]["info"])
                                        // console.log(msMoudle.wz[id + ".img"]["info"]["info.boss"])
                                        if(msMoudle.wz[id + ".img"]["info"]["info.boss"] == "1") {
                                            N = Number(msMoudle.maplejson["BOSS爆率"]);
                                            // msMoudle.toast("xxxx")
                                        }
                                    }
                                }
                                // else {
                                //     console.log("xxxx", id);
                                // }
                                // //鱼王
                                // if(id == "8520000" || id == "8510000") {
                                //     rnk_ = 1;
                                //     N = 33;
                                // }
                                // //闹钟
                                // if(id == "8500002") {
                                //     rnk_ = 1;
                                //     N = 33;
                                // }
                                // ///扎昆
                                // if(id == "8800002"){
                                //     rnk_ = 1;
                                //     N = 50;
                                // }
                                // rnk_ = 1;
                                // miss = 1;
                                if(miss < N) {

                                    if(msMoudle.getRandValue(0, 0, 100) < 50) {
                                        //装备
                                        let part = msMoudle.getEqpType(itemId);
                                        if(part != -1 && part != msMoudle.partType.tCap && part != msMoudle.partType.tCoat && part != msMoudle.partType.tPants) {
                                            let save:boolean = true;
                                            if(msMoudle.isWeapon(itemId)) {
                                                let weatype = msMoudle.getWeaponType(itemId);
                                                if(weatype == "亡命之徒" || weatype == "刀" || weatype == "拳甲"
                                                    || weatype == "短枪" || weatype == "大剑" || weatype == "太刀") {
                                                        save = false;
                                                    }
                                            }
                                            if(save) {
                                                let item:any = msMoudle.getEqpMsg(itemId);
                                                if(item) {
                                                    let rw:any = new Object();
                                                    rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/0" + itemId + ".img/info.icon.png";
                                                    // rw.itemId = "0" + itemId;
                                                    rw.id = "0" + itemId;
                                                    rw.type = 1;
                                                    rw.lv = 1;
                                                    rw.cash = 0;
                                                    rw.name = item.name;
                                                    rw.orgx = -26 / 2;
                                                    rw.orgy = -28;

                                                    // showReward[_] = new Object();
                                                    showReward[_] = rw;
                                                    _++;
                                                }
                                            }
                                        }
                                        //卷轴
                                        else {
                                            ///并且itemid属于现有的卷轴内的东西
                                            if(msMoudle.findKeyFromArr(itemId, allfall)) {
                                                let item = msMoudle.getItemMsg(Number(itemId));
                                                if(item) {
                                                    let rw:any = new Object();
                                                    rw.img = item.img;
                                                    rw.id = itemId;
                                                    rw.type = 0;
                                                    rw.lv = 0;
                                                    rw.cash = 0;
                                                    rw.name = item.name;
                                                    // rw.desc = name;
                                                    rw.orgx = -26 / 2;
                                                    rw.orgy = -28;

                                                    // showReward[_] = new Object();
                                                    showReward[_] = rw;
                                                    _++;
                                                }
                                            }
                                        }
                                    }

                                }
                                //垃圾物品
                                else {
                                    let mulu:any = Math.floor(itemId / 10000);
                                    if(mulu == 400 || mulu == 401 || mulu == 402) {
                                        let rnk = 25;
                                        if(mulu == 400) rnk = 25;
                                        else if(mulu == 401) rnk = 2;
                                        else if(mulu == 402) rnk = 1;
                                        if(msMoudle.getRandValue(0, 0, 100) < rnk) {
                                            let item = msMoudle.getItemMsg(Number(itemId));
                                            if(item) {
                                                let rw:any = new Object();
                                                rw.img = item.img;
                                                rw.id = itemId;
                                                rw.type = 0;
                                                rw.lv = 0;
                                                rw.cash = 2;
                                                rw.name = item.name;
                                                // rw.desc = name;
                                                rw.orgx = -26 / 2;
                                                rw.orgy = -28;
                                                // showReward[_] = new Object();
                                                showReward[_] = rw;
                                                _++;
                                            }
                                        }
                                    }
                                }
                                index++;
                            }
                            else break;
                        }
                    }

                // }

            }
        // }


        let N = 44;
        // if(msMoudle.guaji) N /= 2;
        if(msMoudle.getRandValue(0, 0, 100) < N) {
            //金币
            if(true) {
                let lv = 1;
                if(mob && mob.m_id) {
                    if(msMoudle.wz[mob.m_id]) {
                        if(msMoudle.wz[mob.m_id]["info"]) {
                            lv = msMoudle.wz[mob.m_id]["info"]["info.level"];
                            lv = lv ? Number(lv) : 1;
                        }
                    }
                }
                let rw:any = new Object();
                rw.img = "homeland/02022995.info.icon.png";
                rw.id = "9000000";
                rw.type = 0;
                rw.lv = lv;  ///金币的多少这里控制的
                rw.cash = 0;
                rw.name = "金币";
                rw.orgx = -26 / 2;
                rw.orgy = -28;

                // showReward[_] = new Object();
                showReward[_] = rw;
                _++;
            }
        }
        N = 1;
        // if(msMoudle.guaji) N /= 2;
        if(msMoudle.getRandValue(0, 0, 100) < N) {
            //枫叶
            if(true) {
                let rw:any = new Object();
                rw.img = "homeland/02028044.info.icon.png";
                rw.id = "1234561";
                rw.type = 0;
                rw.lv = 1;
                rw.cash = 0;
                rw.name = "枫叶";
                rw.desc = "枫叶";
                rw.orgx = -26 / 2;
                rw.orgy = -28;

                // showReward[_] = new Object();
                showReward[_] = rw;
                _++;
            }
        }

        return showReward;
    }


    function isFallJuanZhou(itemId: string, bicheng = false) {
        let allJuanZhou:Array<string> = [];
        for(let i=1; i<27; ++i) {
            let arr = msMoudle["AllJuanZhous" + i];
            if(arr && arr.indexOf(itemId) > -1) {
                return true;
            }
        }

        if(bicheng) {
            let arr = msMoudle.AllJuanZhousBC;
            if(arr && arr.indexOf(itemId) > -1) {
                return true;
            }
            arr = msMoudle.AllJuanZhous200;
            if(arr && arr.indexOf(itemId) > -1) {
                return true;
            }
        }
        return false;
    }
    export function getRandomFall(mob:any) : any {
        let showReward:Array<any> = [];
        // 100100.map.23: "105090300"
        // 100100.reward.0: "4000019"

        // || msMoudle.tiaotiao_map == "230040420.img"
        let _:number = 0;

        if(mob && mob.m_id) {
            // console.log(mob.m_id)

            let curMob = msMoudle.rmvImg(mob.m_id);
            let id = curMob;

            ///////二形态的需要特殊处理
            //闹钟
            if(id == "8500001") {
                id = "8500002";
                curMob = "8500002";
            }
            ///扎昆
            else if(id == "8800000") {
                id = "8800002";         //二状态
                curMob = "8800002";
            }
            ///黑龙
            else if(id == "8810003") {
                id = "8810018";
                curMob = "8810018";
            }

            //扎昆手臂
            // if(id != "8800003" && id != "8800004" && id != "8800005" && id != "8800006" && id != "8800007" && id != "8800008" && id != "8800009" && id != "8800010") {
                if(id.length == 6) id = "0" + id;
                let data = msMoudle.wz["MonsterBook.img"][id];
                if(data) {
                    // console.log(data);
                    let index:number = 0;
                    let N = Number(msMoudle.maplejson["小怪爆率"]); //1
                    if(msMoudle.wz[id + ".img"]) {
                        if(msMoudle.wz[id + ".img"]["info"]) {
                            // console.log(msMoudle.wz[id + ".img"]["info"])
                            // console.log(msMoudle.wz[id + ".img"]["info"]["info.boss"])
                            if(msMoudle.wz[id + ".img"]["info"]["info.boss"] == "1") {
                                N = Number(msMoudle.maplejson["BOSS爆率"]); //10
                                // msMoudle.toast("xxxx")
                            }
                        }
                    }
                    N /= 100;
                    // //鱼王
                    // if(id == "8520000" || id == "8510000") {
                    //     rnk_ = 1;
                    //     N = 33;
                    // }
                    // //闹钟
                    // if(id == "8500002") {
                    //     rnk_ = 1;
                    //     N = 33;
                    // }
                    // ///扎昆
                    if(id == "8800002"){
                        N = 0.5;
                    }
                    let getItem = (itemId: any, type: number, part = 0)=>{ //type:1.装备 2.卷轴 3.垃圾
                        let item: any = null;
                        if(type == 1) {
                            item = msMoudle.getEqpMsg(itemId);
                        }
                        else if(type == 2 || type == 3) {
                            item = msMoudle.getItemMsg(Number(itemId));
                        }
                        if(item) {
                            let rw:any = new Object();
                            if(type == 1) {
                                rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/0" + itemId + ".img/info.icon.png";
                                rw.id = "0" + itemId;
                                rw.type = 1;
                                rw.lv = 1;
                            }
                            else {
                                rw.img = item.img;
                                rw.id = itemId;
                                rw.type = 0;
                                rw.lv = 0;
                            }
                            rw.cash = type == 3 ? 2 : 0;
                            rw.name = item.name;
                            // rw.desc = name;
                            rw.orgx = -26 / 2;
                            rw.orgy = -28;
                            // showReward[_] = new Object();
                            showReward[_] = rw;
                            _++;
                        }
                    }
                    while(true) {
                        let root:string = curMob + ".reward." + index;
                        let itemId = data[root];
                        let baolv = N;
                        if(itemId) {
                            // let rnk_ = msMoudle.getRandValue(0, 0, 100);
                            //N的意思表示必然是装备或者卷轴
                            let miss = Math.random();

                            //装备
                            let part = msMoudle.getEqpType(itemId);
                            if(part != -1) {
                                if(itemId == "1002357") baolv = 1;
                                if((itemId == "1002357" || part != msMoudle.partType.tCap) && part != msMoudle.partType.tCoat && part != msMoudle.partType.tPants) {
                                    let save:boolean = true;
                                    if(msMoudle.isWeapon(itemId)) {
                                        let weatype = msMoudle.getWeaponType(itemId);
                                        if(weatype == "亡命之徒" || weatype == "刀" || weatype == "拳甲"
                                            || weatype == "短枪" || weatype == "大剑" || weatype == "太刀") {
                                                save = false;
                                            }
                                    }
                                    if(save && miss < baolv) {
                                        getItem(itemId, 1, part);
                                    }
                                }
                            }
                            //卷轴
                            else if(isFallJuanZhou(itemId)) {
                                baolv = 1.5 * N;
                                if(miss < baolv) {
                                    getItem(itemId, 2);
                                }
                            }
                            //垃圾物品
                            else {
                                let mulu:any = Math.floor(itemId / 10000);
                                if(mulu == 400 || mulu == 401 || mulu == 402) {
                                    let rnk = 25;
                                    if(mulu == 400) rnk = 25;
                                    else if(mulu == 401) rnk = 2;
                                    else if(mulu == 402) rnk = 1;
                                    baolv = rnk * N;
                                    if(miss < baolv) {
                                        getItem(3, itemId);
                                    }
                                }
                            }
                            index++;
                        }
                        else break;
                    }
                }

            // }

        }
        // }


        let N = 44;
        // if(msMoudle.guaji) N /= 2;
        if(msMoudle.getRandValue(0, 0, 100) < N) {
            //金币
            if(true) {
                let lv = 1;
                if(mob && mob.m_id) {
                    if(msMoudle.wz[mob.m_id]) {
                        if(msMoudle.wz[mob.m_id]["info"]) {
                            lv = msMoudle.wz[mob.m_id]["info"]["info.level"];
                            lv = lv ? Number(lv) : 1;
                        }
                    }
                }
                let rw:any = new Object();
                rw.img = "homeland/02022995.info.icon.png";
                rw.id = "9000000";
                rw.type = 0;
                rw.lv = lv;  ///金币的多少这里控制的
                rw.cash = 0;
                rw.name = "金币";
                rw.orgx = -26 / 2;
                rw.orgy = -28;

                // showReward[_] = new Object();
                showReward[_] = rw;
                _++;
            }
        }
        N = 1;
        // if(msMoudle.guaji) N /= 2;
        if(msMoudle.getRandValue(0, 0, 100) < N) {
            //枫叶
            if(true) {
                let rw:any = new Object();
                rw.img = "homeland/02028044.info.icon.png";
                rw.id = "1234561";
                rw.type = 0;
                rw.lv = 1;
                rw.cash = 0;
                rw.name = "枫叶";
                rw.desc = "枫叶";
                rw.orgx = -26 / 2;
                rw.orgy = -28;

                // showReward[_] = new Object();
                showReward[_] = rw;
                _++;
            }
        }

        return showReward;
    }
    //

    // export function LeavelUp(lv:number) : any {
    //     ms.herodata.incLV = lv;
    //     //纯等级的属性
    //     ms.herodata.incSTR = 10 + (ms.herodata.incLV - 1) * 2;//ll
    //     ms.herodata.incDEX = 10 + (ms.herodata.incLV - 1) * 2;//mj
    //     ms.herodata.incINT = 10 + (ms.herodata.incLV - 1) * 2;//zl
    //     ms.herodata.incLUK = 10 + (ms.herodata.incLV - 1) * 2;//yq
    //     ms.herodata.incMHP = 0;
    //     ms.herodata.incMMP = 0;
    //     ms.herodata.incPAD = 0;
    //     ms.herodata.incMAD = 0;
    //     ms.herodata.incPDD = 0;
    //     ms.herodata.incMDD = 0;
    //     ms.herodata.incACC = 0;
    //     ms.herodata.incEVA = 0;
    //     ms.herodata.incSPEED = 0;
    //     ms.herodata.incJUMP = 0;
    //     //装备属性加成
    //     for(let i:number = 1; i <= 6; i++) {
    //         if(ms.equitsdata[i]) {
    //             ms.herodata.incSTR += Number(ms.equitsdata[i].incSTR);
    //             ms.herodata.incDEX += Number(ms.equitsdata[i].incDEX);
    //             ms.herodata.incINT += Number(ms.equitsdata[i].incINT);
    //             ms.herodata.incLUK += Number(ms.equitsdata[i].incLUK);
    //             ms.herodata.incMHP += Number(ms.equitsdata[i].incMHP);
    //             ms.herodata.incMMP += Number(ms.equitsdata[i].incMMP);
    //             ms.herodata.incPAD += Number(ms.equitsdata[i].incPAD);
    //             ms.herodata.incMAD += Number(ms.equitsdata[i].incMAD);
    //             ms.herodata.incPDD += Number(ms.equitsdata[i].incPDD);
    //             ms.herodata.incMDD += Number(ms.equitsdata[i].incMDD);
    //             ms.herodata.incACC += Number(ms.equitsdata[i].incACC);
    //             ms.herodata.incEVA += Number(ms.equitsdata[i].incEVA);
    //             ms.herodata.incSPEED += Number(ms.equitsdata[i].incSPEED);
    //             ms.herodata.incJUMP += Number(ms.equitsdata[i].incJUMP);
    //         }
    //     }
    //     //武器系数
    //     ms.herodata.incWeapon = msMoudle.getWeaponAbi(msMoudle.rmvImg( msMoudle.char.partIndex[msMoudle.partType.tWeapon]));

    //     //熟练度
    //     if(ms.herodata.job == 0) ms.herodata.incMastery = 0.2;
    //     else if(ms.herodata.job == 2) ms.herodata.incMastery = 0.2;
    //     else if(ms.herodata.job == 4) ms.herodata.incMastery = 0.2;
    //     else if(ms.herodata.job == 8) ms.herodata.incMastery = 0.2;
    //     else if(ms.herodata.job == 16) ms.herodata.incMastery = 0.2;

    //     // https://zhidao.baidu.com/question/565868299513678564.html
    //     // http://wangyou.pcgames.com.cn/308/3081507_all.html
    //     // 攻击力上限=武器系数×(主属性×4+副属性×1)×攻击力或魔法力÷100
    //     // 攻击力下限=攻击力上限×熟练度
    //     // 物理近战系职业基础熟练度20%;
    //     // 物理远程系职业基础熟练度15%;
    //     // 魔法系职业基础熟练度25%;
    //     // 物理防御力=力量×1.2+(敏捷+运气)×0.5+智力×0.4
    //     // 魔法防御力=智力×1.2+(敏捷+运气)×0.5+力量×0.4 。
    //     //汇总
    //     ms.herodata.incEXP = (2 * ms.herodata.incLV - 1) * (ms.herodata.incLV) + 1;
    //     ms.herodata.incMHP += (ms.herodata.incSTR * 50);//HP总值(力量*50)
    //     ms.herodata.incMMP += (ms.herodata.incINT * 25);//MP总值(智力*25)
    //     ms.herodata.incPAD += (50 + ms.herodata.incSTR);//攻击力(初始+主属性)~1.25
    //     ms.herodata.incMAD += (50 + ms.herodata.incINT);//魔法力
    //     if(ms.herodata.job == 0) {
    //         ms.herodata.incPDD += (ms.herodata.incDEX / 3);//物理防御力
    //         ms.herodata.incMDD += (ms.herodata.incDEX / 3);//魔法防御力
    //     }
    //     ms.herodata.incACC += (75 + ms.herodata.incINT * 1.2 + ms.herodata.incLUK);//命中率(智力*1.2+运气)
    //     ms.herodata.incEVA += (0 + ms.herodata.incLUK * 1.2 + ms.herodata.incINT);//回避率(运气*1.2+智力)
    //     ms.herodata.incSPEED += (100);//移动速度
    //     ms.herodata.incJUMP += (100);//跳跃力

    //     // if(msMoudle.mainT) msMoudle.mainT.m_windows.upLv();
    //     // msMoudle.hp = msMoudle.herodata.incMHP;
    //     // msMoudle.mp = msMoudle.herodata.incMMP;
    // }

    /*
3.Mastery 熟练度
4.damage 攻击伤害（%）
5.damR 伤害增加（%）
6.damL 伤害减少(%)
8.criticaldamageMin 最小暴击伤害增加
9.criticaldamageMax 最大暴击伤害增加
10.cr 增加最小暴击几率
19.hpCon 消耗HP
20.mpCon 消耗MP
27.time 持续时间（多指辅助技能持续时
间）
28.SelfDestruction爆炸攻击力（多指机械师召唤出来的机器人爆炸之后对周围怪物造成的攻击力
29.cooltime 技能冷却时间
32.hp 回复HP（值和频率由技能属性而定）
33.mp 回复MP（值和频率由技能属性而定）
34.prop 几率，效果由技能属性判定
35.speed 移动速度（增加或减少）
36.jump 跳跃力（增加或减少）
37.asrR 提高角色的属性抗性
38.terR 减少角色进入异常状态的几率
39.pad(epad，padR) 攻击力增加
40.pdd(epdd，pddR) 防御力增加
41.mad(emad，madR) 魔法攻击力增加
42.mdd(emdd，mddR) 魔法防御力增加
43.acc（accR）命中率增加
44.eva（evaR） 回避率增加
45.exp（expR） 经验值增加
46.ignoreMobpdpR 攻击时无视怪物防御力的几率
47.itemCon 消耗物品
49.itemConNo 消耗物品数量
50.dot 怪物进入异常状态所造成的伤害（该异常状态指进入后会受到伤害的异常状态，中毒，灼伤等）
51.dottime 怪物进入异常状态的时间
52.dotInterval 怪物进入异常状态受到伤害的间隔
53.bulletCount 子弹消耗攻击次数
54.bulletConsume 消耗指定目标的数目
55.weapon 使用技能武器限制
56.Subweapon 使用技能副手武器使用限制
57.elemAttr 技能属性
    */

    //透明度渐变
    export function _alphasp(sp:any, time:number) : any {
        // let tl:Laya.TimeLine = new Laya.TimeLine();
        // tl.addLabel("alpha" + "_1",0).to(sp,{alpha: 1},0,null,0);
        // tl.addLabel("alpha" + "_2",0).to(sp,{alpha: 0},time,null,0);
        // tl.play(0, false);
        sp.alpha = 1;
        Laya.Tween.to(sp, {alpha: 0}, time);
    }
    export function _alphaspRmv(sp:any, time:number) : any {
        // let tl:Laya.TimeLine = new Laya.TimeLine();
        // tl.addLabel("alpha" + "_0",0).to(sp,{alpha: 1},0,null,0);
        // tl.addLabel("alpha" + "_1",0).to(sp,{},time,null,0);
        // tl.addLabel("alpha" + "_2",0).to(sp,{alpha: 0},500,null,0);
        // tl.play(0, false);
        // tl.once(Laya.Event.COMPLETE, this, ()=> {
        //     if(sp) {
        //         sp.removeSelf();
        //         sp = null;
        //     }
        // });
        sp.alpha = 1;
        Laya.Tween.to(sp, {},  time, null, Laya.Handler.create(this, ()=>{
            Laya.Tween.to(sp, {alpha: 0}, 500, null, Laya.Handler.create(this, ()=> {
                if(sp) {
                    sp.removeSelf();
                    sp = null;
                }
            }, [], true));
        }, [], true));
    }
    export function _alphasp2(sp:any, time:number) : any {
        // let tl:Laya.TimeLine = new Laya.TimeLine();
        // tl.addLabel("alpha" + "_1",0).to(sp,{alpha: 0.5},0,null,0);
        // tl.addLabel("alpha" + "_2",0).to(sp,{alpha: 1},time,null,0);
        // tl.play(0, false);
        sp.alpha = 0.5;
        Laya.Tween.to(sp, {alpha: 1}, time);
    }
    export function _alphasp3(sp:any, time:number) : any {
        // let tl:Laya.TimeLine = new Laya.TimeLine();
        // tl.addLabel("alpha" + "_2",0).to(sp,{alpha: 1},time,null,0);
        // tl.play(0, false);
        Laya.Tween.to(sp, {alpha: 1}, time);
    }
    export function _alphasp4(sp:any, time:number, a0:number, a1:number) : void {
        // let tl:Laya.TimeLine = new Laya.TimeLine();
        // tl.addLabel("alpha" + "_1",0).to(sp,{alpha: a0},0,null,0);
        // tl.addLabel("alpha" + "_2",0).to(sp,{alpha: a1},time,null,0);
        // tl.play(0, false);
        sp.alpha = a0;
        Laya.Tween.to(sp, {alpha: a1}, time);
    }
    export function popShow(Params:any, _x:number, _y:number, flag:boolean = false) : void {
        msMoudle.m__touch = false;
        msMoudle.dlgShow();
        if(flag == false) {
            Params.x = _x;
            Params.y = _y;
            // let tl:Laya.TimeLine = new Laya.TimeLine();
            // tl.addLabel("dlg0",0).to(Params,{scaleX:1, scaleY:1, x:_x-800, y:_y},0,null,0);
            // tl.addLabel("dlg1",0).to(Params,{scaleX:1, scaleY:1, x:_x, y:_y},500,Laya.Ease["backOut"],0);
            // tl.play(0, false);
        }
    }
    export function popClose(Params:any, _x:number, _y:number, flag:boolean = false) : void {
        if(flag == false) {
            // let tl:Laya.TimeLine = new Laya.TimeLine();
            // tl.addLabel("dlg0",0).to(Params,{scaleX:1, scaleY:1, x:_x},0,null,0);
            // tl.addLabel("dlg1",0).to(Params,{scaleX:1, scaleY:1, x:_x-800},500,Laya.Ease["backIn"],0);
            // tl.play(0, false);
            // Laya.timer.once(500, Params, ()=> {
                msMoudle.m__touch = true;
                msMoudle.dlgClose();
                Params.close();
            // });
        }
        else {
            msMoudle.m__touch = true;
            msMoudle.dlgClose();
            Params.close();
        }
    }

    export function dlgShow() : void {

    }

    export function dlgClose() : void {

    }

    //手动地图
    // export function isSpMap(mapid:string) : boolean {
    //     if(mapid == "000050000.img" ||
    //         mapid == "103020300.img" || mapid == "102010000.img" || mapid == "101030400.img" ||
    //         mapid == "105040310.img" || mapid == "327010000.img" || mapid == "200010110.img" ||
    //         mapid == "952020100.img" || mapid == "230010000.img" || mapid == "910000000.img" ||
    //         mapid == "551030200.img" || mapid == "100020200.img" || mapid == "240050401.img" ||
    //         /////新增地图
    //         //地铁
    //         mapid == "103020310.img" || mapid == "103020320.img" ||
    //         //勇士部落
    //         mapid == "102010100.img" ||// || mapid == "102000000.img"
    //         //魔法密林
    //         //林中城
    //         //天空之城
    //         //玩具城
    //         //冰封雪域
    //         //海底世界
    //         mapid == "230010100.img"
    //         ) return true;
    //     return false;
    // }

    export function sailMap(mapid:string) : boolean {
        let map = Math.floor(msMoudle.rmvImg(mapid) / 100000);
        if(map == 2300 && Number(map) % 100 == 0) return true;
        return false;
    }

    export var can_into:boolean = true;
    export var help:any = null;
    export function loopCanInfo() : void {
        Laya.timer.once(1000, null, ()=> {
            this.can_into = true;
        });
    }

    //
    export function isAuMap(mapid:string) : boolean {
        //自动地图
        if(mapid == "270050100_gai.img" || mapid == "222010402_gai.img" ||
        mapid == "220080001_gai.img" || mapid == "701010323_gai.img" || mapid == "240060200_gai.img" || mapid == "280030000_gai.img" || mapid == "200080101_gai.img") return true;
        //挂机
        if(msMoudle.guaji) return true;
        return false;
    }

    export function isBossMap(mapid?:string) : boolean {
        if(!mapid && msMoudle.mainP) mapid = msMoudle.mainP.m_id;
        return mapid == "280030100.img" || mapid == "240060200.img" || mapid == "270050100.img";
    }

    //另外添加挂机地图
    export function isSyncMap(mapid?:string) : boolean {

        if(msMoudle.guaji) return false;
        if(msMoudle.maplejson["全地图开放组队"] == "1") return true;

        if(msMoudle.maplejson["充值QQ"] == 1044571564) {
            //如果是组队状态
            if(Sync.partyId > 0) return true;
        }

        //彩虹村
        if(mapid == "000010000.img") {
            //如果进入游戏的人数>配置人数则变成单机
            if(msMoudle.pNum > msMoudle.maplejson["服务器压力"]) return false;
            return true;
        }
        //自由市场
        if(mapid == "910000000.img") {
            //如果进入游戏的人数>配置人数则变成单机
            if(msMoudle.pNum > msMoudle.maplejson["服务器压力"]) return false;
            return true;
        }
        //嘉年华
        if(mapid == "980000000.img") {
            //如果进入游戏的人数>配置人数则变成单机
            return true;
        }
        //射手村训练场
        if(mapid == "104040000.img") {
            //如果进入游戏的人数>配置人数则变成单机
            if(msMoudle.pNum > msMoudle.maplejson["服务器压力"]) return false;
            return true;
        }
        //快速传送地图
        let mMap = msMoudle.maplejson["m_map"].split(",");
        for(let i:number = 3; i < mMap.length; i++) {
            if(mapid == mMap[i] + ".img") return true;
        }
        //boss地图
        let bMap = msMoudle.maplejson["b_map"].split(",");
        for(let i:number = 15; i < bMap.length; i++) {
            if(mapid == bMap[i] + ".img") return true;
        }
        return false;
    }

    //跳跳地图
    export function isTiaoMap(mapid:string) : boolean {
        if(mapid == "101000100.img" || //	忍苦树林（一层）
            mapid == "101000101.img" || //	忍苦树林（二层）
            mapid == "101000102.img" || //	忍苦树林（三层）
            mapid == "101000103.img" || //	忍苦树林（四层）
            mapid == "101000104.img" || //	忍苦树林（五层）
            mapid == "105040310.img" || //	沉睡森林（一层）
            mapid == "105040311.img" || //	沉睡森林（二层）
            mapid == "105040312.img" || //	沉睡森林（三层）
            mapid == "105040313.img" || //	沉睡森林（四层）
            mapid == "105040314.img" || //	沉睡森林（五层）
            mapid == "105040315.img" || //	沉睡森林（六层）
            mapid == "105040316.img" || //	沉睡森林（七层）
            mapid == "103000900.img" || //	三号线一号地区B1
            mapid == "103000901.img" || //	三号线一号地区B2
            mapid == "103000902.img" || //	三号线1号车库
            mapid == "103000903.img" || //	三号线二号地区B1
            mapid == "103000904.img" || //	三号线二号地区B2
            mapid == "103000905.img" || //	三号线2号车库
            mapid == "103000906.img" || //	三号线三号地区B1
            mapid == "103000907.img" || //	三号线三号地区B2
            mapid == "103000908.img" || //  三号线三号地区B3
            mapid == "103000909.img" || //  三号线3号车库
            mapid == "280020000.img" ||
            mapid == "280020001.img") //	三号线三号地区B3
            return true;
        return false;
    }

    //老地图
    export function idOldMap(mapid:string) : boolean {
        if(mapid.indexOf("_gai") < 0) return true;
        // if(msMoudle.findKeyFromArr(mapid, this.allMaps)) return true;
        return false;
    }

    export var allMaps:Array<string> = [];

    //技能渐变
    export function _alphaskillsp(sp:any, time:number, a0:number, a1:number, z0:number, z1:number) : any {
        if(sp) {
            // let tl:Laya.TimeLine = new Laya.TimeLine();
            // tl.addLabel("changeskill" + "_1",0).to(sp,{alpha: a0 / 255, scaleX: z0 / 100, scaleY: z0 / 100},0,null,0);
            // tl.addLabel("changeskill" + "_2",0).to(sp,{alpha: a1 / 255, scaleX: z1 / 100, scaleY: z1 / 100},time,null,0);
            // tl.play(0, false);
            sp.alpha = a0 / 255;
            sp.scale(z0 / 100, z0 / 100);
            Laya.Tween.to(sp, {alpha: a1 / 255, scaleX: z1 / 100, scaleY: z1 / 100}, time);
        }
    }
    //通用查找
    export function findKeyFromArr(key:any, arr:any) : any {
        for(let i:number = 0; i < arr.length; i++) if(arr[i] == key) return true;
        return false;
    }
    //获得区间的随机数
    export function getRandValue(initvalue:number, minvalue:number, maxvalue:number) : any {
        let randrange = maxvalue - minvalue;
        if(randrange == 0) return initvalue;
        let rnk = Math.random();
        if(rnk == 1) rnk = 0.00009;
        return initvalue + Math.floor(rnk * (maxvalue - minvalue) ) ;



        //0 - 0.5 . 0.75
        //0.5 1.5   1.5
        //1.5 2.5   2.25
        //2.5 3     3
    }
    //矩形相交
    export function intersect(l:any, t:any, r:any, b:any) : boolean {
        let zx = Math.abs(l.x + t.x -r.x - b.x);
        let x  = Math.abs(l.x - t.x) + Math.abs(r.x - b.x);
        let zy = Math.abs(l.y + t.y - r.y - b.y);
        let y  = Math.abs(l.y - t.y) + Math.abs(r.y - b.y);
        if(zx <= x && zy <= y) return true;
        else return false;
    }
    export var rnkG = [
        3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1,
        4, 1, 1,
        3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1,
        4, 1, 1,
        3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1,
        5, 1, 1];
    export function getIndex() : number {
        let getIndex:number = msMoudle.herojson.length - 1;
        //包括送的一只SR、系统第一天只会给4次抽卡机会
        let pinzhi5 = [1014, 1004, 1020];
        let pinzhi4 = [1001, 1002, 1011];
        let pinzhi3 = [1006, 1007, 1008, 1019, 1015];
        let pinzhi1 = [1003, 1005, 1016, 1009, 1010, 1012, 1018, 1013, 1017];//2和1的概率一致
        let rnk = msMoudle.rnkG[ms.chouka];
        // rnk = 5;
        if(rnk == 3) {
            let id = pinzhi3[msMoudle.getRandValue(0, 0, pinzhi3.length)];
            getIndex = this.getRandIndex(id);
        }
        else if(rnk == 4) {
            if(msMoudle.getRandValue(0, 0, 100) < 50) {
                let id = pinzhi4[msMoudle.getRandValue(0, 0, pinzhi4.length)];
                getIndex = this.getRandIndex(id);
            }
            else {
                if(msMoudle.getRandValue(0, 0, 100) < 25) {
                    getIndex = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
                }
                else {
                    let id = pinzhi3[msMoudle.getRandValue(0, 0, pinzhi3.length)];
                    getIndex = this.getRandIndex(id);
                }
            }
        }
        else if(rnk == 5) {
            if(msMoudle.getRandValue(0, 0, 100) < 25) {
                let id = pinzhi5[msMoudle.getRandValue(0, 0, pinzhi5.length)];
                getIndex = this.getRandIndex(id);
            }
            else {
                getIndex = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
            }
        }
        else {
            let id = pinzhi1[msMoudle.getRandValue(0, 0, pinzhi1.length)];
            getIndex = this.getRandIndex(id);
        }
        // else if(rnk == 2){
        //     let id = pinzhi1[msMoudle.getRandValue(0, 0, pinzhi1.length)];
        //     getIndex = this.getRandIndex(id);
        // }
        // else {
        //     getIndex = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
        // }
        return getIndex;
    }
     export function getRandIndex(id:number) : number {
        let getIndex = msMoudle.herojson.length - 1;
        for(let key in msMoudle.herojson) {
            if(msMoudle.herojson[key].id == id) {
                getIndex = Number(key);
                break;
            }
        }
        return getIndex;
    }
    //震屏(边界需要特殊处理)
    export function Shake(Params:any): void {
        if(msMoudle.gameP) {
            let timeline = new Laya.TimeLine();
            for(let i:number = 0; i < 2; i++) {
                timeline.addLabel("shark1_" + i, 0).to(msMoudle.gameP, {
                    x:-(Laya.stage.width - 800) / 2,
                    y:- (Laya.stage.height - 600) / 2 + 10}, 25, null, 0);
                timeline.addLabel("shark2_" + i, 0).to(msMoudle.gameP, {
                    x:-(Laya.stage.width - 800) / 2 + 10,
                    y:- (Laya.stage.height - 600) / 2}, 25, null, 0);
                timeline.addLabel("shark3_" + i, 0).to(msMoudle.gameP, {
                    x:-(Laya.stage.width - 800) / 2,
                    y:- (Laya.stage.height - 600) / 2 - 10}, 25, null, 0);
                timeline.addLabel("shark4_" + i, 0).to(msMoudle.gameP, {
                    x:-(Laya.stage.width - 800) / 2 - 10,
                    y:- (Laya.stage.height - 600) / 2}, 25, null, 0);
            }
            timeline.addLabel("shark5_", 0).to(msMoudle.gameP, {
                x: -(Laya.stage.width - 800) / 2,
                y: -(Laya.stage.height - 600) / 2}, 100, null, 0);
            timeline.play(0, false);
        }
    }

    export function isScreen(a:boolean = true) : boolean {
        // || laya.utils.Browser.onIPad || laya.utils.Browser.onSafari
        // return true;
        if(laya.utils.Browser.onIPhone || laya.utils.Browser.onAndroid || laya.utils.Browser.onIPad|| a) return true;
        return false;
    }

    //通用去除.img
    export function rmvImg(str:string) : any {
        let m:string = "";
        for(let i:number = 0; i < str.length - 4; i++) m = m + str[i];
        return Number(m);
    }

    /*
    古老的冒险家：龙骑+主教+火毒+冰雷+英雄+圣骑士+独行客+无影人+箭神+神射手+船长+冲锋队长+古迹猎人+暗影双刀
    骑士团之力：魂骑士+炎术士+风灵使者+夜行者+奇袭者+米哈尔
    反抗者集结：恶魔猎手+复仇者+唤灵斗师+尖兵+爆破手
    被诅咒的英雄：战神+龙神+双弩精灵+幻影+隐月+夜光法师
    翼人族：圣晶使者+影魂异人
    诺巴族：狂龙战士+魔影链士+暴莉萌天使
    高等魔法师：虎影+神之子+剑豪
    战士血统：神之子+狂龙战士+剑豪+战神+恶魔猎手+复仇者+爆破手+魂骑士+米哈尔+龙骑+英雄+圣骑士
    法师血统：圣晶使者+龙神+夜光法师+幻灵斗师+炎术士+主教+冰雷+火毒
    弓箭手血统：双弩精灵+风灵使者+神射手+箭神+古迹猎人
    飞侠血统：虎影+魔影链士+幻影+尖兵+夜行者+无影人+独行客+暗影双刀
    海盗血统：影魂异人+爆莉萌天使+隐月+尖兵+奇袭者+船长+冲锋队长
    */

    export function findIndexByName(name:string) : boolean {
        for(let i:number = 0; i < msMoudle.m_job.length; i++) {
            if(msMoudle.m_job[i] == name) {
                if(ms.m_job[i] != "") return true;
                break;
            }
        }
        return false;
    }

    export function getJbSucc() : any {
        let jbdata:any = msMoudle.m_jb_lqs;
        if(ms.selHero == 0) jbdata = msMoudle.m_jb_lqs;
        else if(ms.selHero == 1) jbdata = msMoudle.m_jb_zj;
        else if(ms.selHero == 2) jbdata = msMoudle.m_jb_dxk;
        else if(ms.selHero == 3) jbdata = msMoudle.m_jb_sss;
        else if(ms.selHero == 4) jbdata = msMoudle.m_jb_yx;
        else if(ms.selHero == 5) jbdata = msMoudle.m_jb_bl;
        else if(ms.selHero == 6) jbdata = msMoudle.m_jb_sqs;
        else if(ms.selHero == 7) jbdata = msMoudle.m_jb_hd;
        else if(ms.selHero == 8) jbdata = msMoudle.m_jb_js;
        else if(ms.selHero == 9) jbdata = msMoudle.m_jb_wyr;
        else if(ms.selHero == 10) jbdata = msMoudle.m_jb_cfdz;
        else if(ms.selHero == 11) jbdata = msMoudle.m_jb_cz;
        else if(ms.selHero == 12) jbdata = msMoudle.m_jb_klzs;
        else if(ms.selHero == 13) jbdata = msMoudle.m_jb_ygfs;
        else if(ms.selHero == 14) jbdata = msMoudle.m_jb_jb;
        else if(ms.selHero == 15) jbdata = msMoudle.m_jb_jh;
        else if(ms.selHero == 16) jbdata = msMoudle.m_jb_myls;
        else if(ms.selHero == 17) jbdata = msMoudle.m_jb_sjsz;
        else if(ms.selHero == 18) jbdata = msMoudle.m_jb_yhyr;
        else if(ms.selHero == 19) jbdata = msMoudle.m_jb_hy;
        else if(ms.selHero == 20) jbdata = msMoudle.m_jb_szz;
        else if(ms.selHero == 21) jbdata = msMoudle.m_jb_blmts;
        else if(ms.selHero == 22) jbdata = msMoudle.m_jb_zs;
        else if(ms.selHero == 23) jbdata = msMoudle.m_jb_ls;
        else if(ms.selHero == 24) jbdata = msMoudle.m_jb_snjl;
        else if(ms.selHero == 25) jbdata = msMoudle.m_jb_hy;
        else if(ms.selHero == 26) jbdata = msMoudle.m_jb_yy;
        else if(ms.selHero == 27) jbdata = msMoudle.m_jb_emls;
        else if(ms.selHero == 28) jbdata = msMoudle.m_jb_fcz;
        else if(ms.selHero == 29) jbdata = msMoudle.m_jb_hl;
        else if(ms.selHero == 30) jbdata = msMoudle.m_jb_bps;
        else if(ms.selHero == 31) jbdata = msMoudle.m_jb_gjlr;
        else if(ms.selHero == 32) jbdata = msMoudle.m_jb_aysd;
        else if(ms.selHero == 33) jbdata = msMoudle.m_jb_mhe;
        else if(ms.selHero == 34) jbdata = msMoudle.m_jb_hqs;
        else if(ms.selHero == 35) jbdata = msMoudle.m_jb_yss;
        else if(ms.selHero == 36) jbdata = msMoudle.m_jb_flsz;
        else if(ms.selHero == 37) jbdata = msMoudle.m_jb_yxz;
        else if(ms.selHero == 38) jbdata = msMoudle.m_jb_qxz;
        else if(ms.selHero == 39) jbdata = msMoudle.m_jb_ctj;
        else if(ms.selHero == 40) jbdata = msMoudle.m_jb_bzhw;

        return jbdata;
    }

    //龙骑士-------------0
    export var d_lqs:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_lqs2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_lqs3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_lqs:Array<string> = [
        "古老的意志", "不屈意志", "龙族血脉",
        "龙骑士#主教", "龙骑士#英雄#圣骑士", "龙骑士#狂龙战士#龙神",
        "全属性+10,攻击力+5,防御力+5\n技能【无双矛】进阶为【神矛天引】", "全属性+20,攻击力+10,防御力+10\n技能【枪连击】进阶为【黑暗穿刺】", "全属性+30,攻击力+15,防御力+15"
    ];
    //主教-------------1
    export var d_zj:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_zj2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_zj3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_zj:Array<string> = [
        "古老的意志", "魔导师集结", "黑魔法",
        "龙骑士#主教", "主教#火毒#冰雷", "主教#夜光法师",
        "全属性+10,魔法攻击力+5,魔法防御力+5", "全属性+20,魔法攻击力+10,魔法防御力+10\n技能【群体治疗】进阶为【天堂之门】", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ];
    //独行客-------------2
    export var d_dxk:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_dxk2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_dxk3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_dxk:Array<string> = [
        "金钱二人组", "终极忍法", "忍具奥义",
        "独行客#幻影", "独行客#无影人", "独行客#暗影双刀",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //神射手-------------3
    export var d_sss:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_sss2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_sss3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_sss:Array<string> = [
        "精准掌握", "远古的力量", "风之修行",
        "神射手#箭神", "神射手#古迹猎人", "神射手#风灵使者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //英雄-------------4
    export var d_yx:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_yx2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_yx3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_yx:Array<string> = [
        "不屈意志", "屠龙英雄", "剑圣",
        "龙骑士#英雄#圣骑士", "英雄#狂龙战士", "英雄#剑豪",
        "全属性+10,攻击力+5,防御力+5\n技能【强力一击】进阶为【狂怒连爆】", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //冰雷-------------5
    export var d_bl:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_bl2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_bl3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_bl:Array<string> = [
        "魔导师集结", "魔镜冰晶", "零度领域",
        "主教#火毒#冰雷", "冰雷#圣晶使者", "冰雷#唤灵斗师",
        "全属性+10,魔法攻击力+5,魔法防御力+5\n技能【冰冻术】进阶为【冰冻术】", "全属性+20,魔法攻击力+10,魔法防御力+10\n技能【雷电术】进阶为【闪电矛】", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //圣骑士-------------6
    export var d_sqs:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_sqs2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_sqs3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_sqs:Array<string> = [
        "不屈意志", "神圣之力", "骑士信仰",
        "龙骑士#英雄#圣骑士", "圣骑士#神之子", "圣骑士#魂骑士",
        "全属性+10,攻击力+5,防御力+5\n技能【强力一击】进阶为【突进】", "全属性+20,攻击力+10,防御力+10\n技能【群体攻击】进阶为【毁灭】", "全属性+30,攻击力+15,防御力+15"
    ]
    //火毒-------------7
    export var d_hd:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_hd2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_hd3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_hd:Array<string> = [
        "魔导师集结", "烈焰风暴", "魔法加强",
        "主教#火毒#冰雷", "火毒#炎术士", "火毒#夜光法师",
        "全属性+10,魔法攻击力+5,魔法防御力+5\n技能【火焰箭】进阶为【审判之焰】", "全属性+20,魔法攻击力+10,魔法防御力+10", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //箭神-------------8
    export var d_js:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_js2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_js3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_js:Array<string> = [
        "精准掌握", "森罗万象", "见闻色霸气",
        "神射手#箭神", "箭神#双弩精灵", "箭神#奇袭者",
        "全属性+10,攻击力+5,防御力+5\n技能【箭扫射】进阶为【穿透箭】", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //无影人-------------9
    export var d_wyr:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_wyr2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_wyr3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_wyr:Array<string> = [
        "终极忍法", "隐身术", "夜幕降临",
        "独行客#无影人", "无影人#夜行者", "无影人#隐月",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //冲锋队长-------------10
    export var d_cfdz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_cfdz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_cfdz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_cfdz:Array<string> = [
        "海贼梦想", "突破极限", "鼓舞",
        "冲锋队长#船长", "冲锋队长#影魂异人", "冲锋队长#爆破手",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //船长-------------11
    export var d_cz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_cz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_cz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_cz:Array<string> = [
        "海贼梦想", "七武海", "王者资质",
        "冲锋队长#船长", "船长#剑豪", "船长#神之子",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //狂龙战士-------------12
    export var d_klzs:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_klzs2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_klzs3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_klzs:Array<string> = [
        "龙族血脉", "屠龙英雄", "天神下凡",
        "龙骑士#狂龙战士#龙神", "英雄#狂龙战士", "狂龙战士#战神",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //夜光法师-------------13
    export var d_ygfs:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_ygfs2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_ygfs3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_ygfs:Array<string> = [
        "黑魔法", "魔法加强", "魔法融合",
        "主教#夜光法师", "火毒#夜光法师", "夜光法师#炎术士",
        "全属性+10,魔法攻击力+5,魔法防御力+5", "全属性+20,魔法攻击力+10,魔法防御力+10", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //尖兵-------------14
    export var d_jb:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_jb2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_jb3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_jb:Array<string> = [
        "武器冥王", "最强士兵", "格斗训练",
        "尖兵#圣晶使者", "尖兵#战神", "尖兵#唤灵斗师",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //剑豪-------------15
    export var d_jh:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_jh2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_jh3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_jh:Array<string> = [
        "剑圣", "七武海", "三刀流奥义",
        "英雄#剑豪", "船长#剑豪", "剑豪#战神",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //魔影链士-------------16
    export var d_myls:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_myls2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_myls3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_myls:Array<string> = [
        "封印解放", "复仇之魂", "黑暗力量",
        "魔影链士#虎影", "魔影链士#恶魔复仇者", "魔影链士#影魂异人",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //圣晶使者-------------17
    export var d_sjsz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_sjsz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_sjsz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_sjsz:Array<string> = [
        "魔镜冰晶", "武器冥王", "天使结晶",
        "冰雷#圣晶使者", "尖兵#圣晶使者", "圣晶使者#爆莉萌天使",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //影魂异人-------------18
    export var d_yhyr:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_yhyr2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_yhyr3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_yhyr:Array<string> = [
        "突破极限", "梦魇", "黑暗力量",
        "冲锋队长#影魂异人", "影魂异人#虎影", "魔影链士#影魂异人",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //虎影-------------19
    export var d_hy:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_hy2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_hy3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_hy:Array<string> = [
        "封印解放", "梦魇", "龙虎斗",
        "魔影链士#虎影", "影魂异人#虎影", "虎影#龙神",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //神之子-------------20
    export var d_szz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_szz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_szz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_szz:Array<string> = [
        "神圣之力", "王者资质", "天神光辉",
        "圣骑士#神之子", "船长#神之子", "神之子#爆莉萌天使",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //爆莉萌天使-------------21
    export var d_blmts:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_blmts2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_blmts3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_blmts:Array<string> = [
        "天神光辉", "天龙人", "天使结晶",
        "神之子#爆莉萌天使", "爆莉萌天使#龙神", "圣晶使者#爆莉萌天使",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //战神-------------22
    export var d_zs:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_zs2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_zs3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_zs:Array<string> = [
        "三刀流奥义", "天神下凡", "最强士兵",
        "剑豪#战神", "狂龙战士#战神", "尖兵#战神",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //龙神-------------23
    export var d_ls:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_ls2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_ls3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_ls:Array<string> = [
        "龙族血脉", "天龙人", "龙虎斗",
        "龙骑士#狂龙战士#龙神", "爆莉萌天使#龙神", "虎影#龙神",
        "全属性+10,魔法攻击力+5,魔法防御力+5", "全属性+20,魔法攻击力+10,魔法防御力+10", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //双弩精灵-------------24
    export var d_snjl:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_snjl2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_snjl3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_snjl:Array<string> = [
        "森罗万象", "狩猎技巧", "幻影猎手",
        "箭神#双弩精灵", "双弩精灵#古迹猎人", "双弩精灵#幻影#恶魔猎手",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //幻影-------------25
    export var d_hy:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_hy2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_hy3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_hy:Array<string> = [
        "金钱二人组", "恶魔变身", "幻影猎手",
        "独行客#幻影", "幻影#隐月#恶魔猎手",  "双弩精灵#幻影#恶魔猎手",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //隐月-------------26
    export var d_yy:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_yy2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_yy3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_yy:Array<string> = [
        "夜幕降临", "恶魔变身", "夜间能力",
        "无影人#隐月", "幻影#隐月#恶魔猎手", "隐月#夜行者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //恶魔猎手-------------27
    export var d_emls:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_emls2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_emls3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_emls:Array<string> = [
        "恶魔血液", "恶魔变身", "幻影猎手",
        "恶魔猎手#恶魔复仇者", "幻影#隐月#恶魔猎手", "双弩精灵#幻影#恶魔猎手",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //复仇者-------------28
    export var d_fcz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_fcz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_fcz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_fcz:Array<string> = [
        "恶魔血液", "二刀流奥义", "复仇之魂",
        "恶魔猎手#恶魔复仇者", "暗影双刀#恶魔复仇者", "魔影链士#恶魔复仇者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //唤灵斗师-------------29
    export var d_hl:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_hl2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_hl3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_hl:Array<string> = [
        "零度领域", "魂斗罗", "格斗训练",
        "冰雷#唤灵斗师", "唤灵斗师#魂骑士", "尖兵#唤灵斗师",
        "全属性+10,魔法攻击力+5,魔法防御力+5", "全属性+20,魔法攻击力+10,魔法防御力+10", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //爆破手-------------30
    export var d_bps:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_bps2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_bps3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_bps:Array<string> = [
        "鼓舞", "爆破骑士", "指挥官",
        "冲锋队长#爆破手", "魂骑士#爆破手", "爆破手#米哈尔",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //古迹猎人-------------31
    export var d_gjlr:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_gjlr2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_gjlr3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_gjlr:Array<string> = [
        "远古的力量", "神秘气息", "狩猎技巧",
        "神射手#古迹猎人", "风灵使者#古迹猎人", "双弩精灵#古迹猎人",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //暗影双刀-------------32
    export var d_aysd:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_aysd2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_aysd3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_aysd:Array<string> = [
        "忍具奥义", "二刀流奥义", "暗杀",
        "独行客#暗影双刀", "暗影双刀#恶魔复仇者", "暗影双刀#奇袭者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //米哈尔-------------33
    export var d_mhe:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_mhe2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_mhe3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_mhe:Array<string> = [
        "兄弟情谊", "骑士信仰", "指挥官",
        "米哈尔#魂骑士", "圣骑士#魂骑士", "爆破手#米哈尔",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //魂骑士-------------34
    export var d_hqs:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_hqs2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_hqs3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_hqs:Array<string> = [
        "兄弟情谊", "爆破骑士", "魂斗罗",
        "米哈尔#魂骑士", "魂骑士#爆破手", "唤灵斗师#魂骑士",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //炎术士-------------35
    export var d_yss:Object = {str:10, dex:10, inte:10, luk:10, pad:0, mad:5, pdd:0, mdd:5}
    export var d_yss2:Object = {str:20, dex:20, inte:20, luk:20, pad:0, mad:10, pdd:0, mdd:10}
    export var d_yss3:Object = {str:30, dex:30, inte:30, luk:30, pad:0, mad:15, pdd:0, mdd:15}
    export var m_jb_yss:Array<string> = [
        "烈焰风暴", "火焰增强", "魔法融合",
        "火毒#炎术士", "炎术士#风灵使者", "夜光法师#炎术士",
        "全属性+10,魔法攻击力+5,魔法防御力+5", "全属性+20,魔法攻击力+10,魔法防御力+10", "全属性+30,魔法攻击力+15,魔法防御力+15"
    ]
    //风灵使者-------------36
    export var d_flsz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_flsz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_flsz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_flsz:Array<string> = [
        "风之修行", "神秘气息", "火焰增强",
        "神射手#风灵使者", "风灵使者#古迹猎人", "炎术士#风灵使者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //夜行者-------------37
    export var d_yxz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_yxz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_yxz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_yxz:Array<string> = [
        "隐身术", "暗杀技巧", "夜间能力",
        "无影人#夜行者", "夜行者#奇袭者", "隐月#夜行者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]
    //奇袭者-------------38
    export var d_qxz:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_qxz2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_qxz3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_qxz:Array<string> = [
        "暗杀技巧", "暗杀", "见闻色霸气",
        "夜行者#奇袭者", "暗影双刀#奇袭者", "箭神#奇袭者",
        "全属性+10,攻击力+5,防御力+5", "全属性+20,攻击力+10,防御力+10", "全属性+30,攻击力+15,防御力+15"
    ]

    //草薙京
    export var d_ctj:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_ctj2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_ctj3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_ctj:Array<string> = [
        "火神",
        "草薙京#不知火舞",
        "全属性+10,攻击力+5,防御力+5"
    ];
    //不知火舞
    export var d_bzhw:Object = {str:10, dex:10, inte:10, luk:10, pad:5, mad:0, pdd:5, mdd:0}
    export var d_bzhw2:Object = {str:20, dex:20, inte:20, luk:20, pad:10, mad:0, pdd:10, mdd:0}
    export var d_bzhw3:Object = {str:30, dex:30, inte:30, luk:30, pad:15, mad:0, pdd:15, mdd:0}
    export var m_jb_bzhw:Array<string> = [
        "火神",
        "草薙京#不知火舞",
        "全属性+10,攻击力+5,防御力+5"
    ]

    //
}