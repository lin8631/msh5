module ms {
    //主角装扮
    export var m_tg:number = 0;     //推广员等级
    export var m_job:Array<string> = ["", "", "", "", "", "", "", "", "", "", "", "", "", "","", "",
    "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    // export var rocker_type:number = 1;
    export var lastmap:string = "000010000.img";

    export var test_guanka:number = 0;      //关卡次数
    export var test_lingzhu:number = 0;     //领主次数
    export var test_boss:number = 0;        //boss次数
    export var test_nvshen:number = 0;      //女神层数
    export var test_sishen:number = 0;      //死神次数
    export var test_shenyuan:number = 0;    //深渊次数
    export var test_cz:number = 0;          //充值金额
    export var test_sk:number = 0;          //神卡数量
    export var test_dj:number = 0;          //总点击次数
    export var max_atk:number = 0;          //最大伤害记录
    export var max_str:number = 0;          //最大力量记录
    export var max_dex:number = 0;          //最大敏捷记录
    export var max_luk:number = 0;          //最大运气记录
    export var max_int:number = 0;          //最大智力记录
    export var max_nvshen:number = 0;       //最高女神层数
    export var max_sishen:number = 0;       //最高死神层数
    //最大金币
    //最大枫叶
    //最大钻石
    //最大材料1
    //最大材料2
    //最大材料3
    export var test_url:string = "";        //ip地址
    export var test_g:boolean = false;      //我是挂
    export var test_ly:string = "QQ群";      //用户来源
    export var test_qq:string = "0";        //qq帐号
    export var allTime:number = 0;

    export var tBagsArr:Array<number> = [];
    export var QuestId:string = "1000"; //当前执行的任务
    export var QuestStep:number = 0;    //当前执行的任务阶段
    export var tQuests:Object = new Object();   //任务列表状态

    export var testweapon:string;
    export var testfweapon:string;
    export var testcap:string;
    export var testlongcoat:string;
    export var testname:string = "Susake";
    //坐骑
    export var tamingmob:any = new Object();
    //宠物
    export var pet:any = new Object();
    //时装
    export var fashion:any = new Object();
    //戒指
    export var ring:any = new Object();
    //椅子
    export var chair:any = new Object();
    //头发
    export var hairList:Array<any> = [];
    export var selhair:Array<string> = [];//string = "N";
    //皮肤
    export var bodyList:Array<any> = [];
    export var selbody:Array<string> = [];//string = "N";
    //表情
    export var faceList:Array<any> = [];
    export var selface:Array<string> = [];//string = "N";

    export var selHero:number = 0;
    export var tiaogk:number = 0;
    //角色属性
    export var user:string;
    export var password:string;
    export var password2:string = "";    //二级密码
    export var herodata:app.model.CharStatus;        //角色属性
    export var otherherodata:Array<app.model.HeroStatus> = [];   //其他英雄数据
    export var otherheroservedata:Array<app.model.HeroStatus> = [];   //其他英雄服务器保存的数据
    //服务器端数据
    export var story:number = 0;                //0代表不启动        --
    export var firstHero:boolean = true;        //第一个英雄         --
    export var task:boolean = true;            //第一次任务         --
    export var zhaomu:boolean = false;          //第一次召唤         --
    export var boss:boolean = false;            //第一次技能        --
    export var skill:boolean = false;            //第一次合成
    export var hecheng:boolean = false;            //第一次boss
    export var team:boolean = false;            //第一次上阵英雄
    export var yingxiong:boolean = false;       //第一次获得英雄      --
    // export var pvp:boolean = false;             //第一次pvp
    // export var renku:boolean = false;           //第一次忍苦
    export var fuli:boolean = false;           //第一次玩法
    export var qiandao:number = 1;              //签到次数
    export var is_qiandao:boolean = false;      //今日是否签到
    // export var pvp_note:number = 0;             //pvp挑战成功次数
    // export var pvp_reweard:Array<number> = [];  //pvp领取奖励次数数组[1,2,3]
    export var zhuanpan:number = 0;             //转盘次数
    export var miwu:number = 0;                 //迷雾森林
    export var tiaotiao:number = 0;             //跳跳任务
    export var xiangzi:number = 0;              //打箱子
    export var zhuzhu:number = 0;               //寻找猪猪任务
    export var ban:number = 0;                  //斑.雷昂
    export var riqi:string = "2016.7.6";        //日期
    export var stime:string = "N";        //日期
    export var desFashion6:boolean = true;       //
    export var czValue:number = 0;
    export var d600:number = 0;                 //
    export var d601:number = 0;                 //
    export var d602:number = 0;                 //
    export var d603:number = 0;                 //
    export var d604:number = 0;                 //
    export var d605:number = 0;                 //
    export var d606:number = 0;                 //
    export var d607:number = 0;                 //
    export var d608:number = 0;                 //
    export var dboss1:number = 3;              //蜈蚣
    export var dboss2:number = 2;              //闹钟
    export var dboss3:number = 3;              //扎昆
    export var dboss4:number = 3;              //黑龙
    export var dayreward:boolean = true;       //每日奖励
    export var daytotal:number = 0;            //累计天数
    export var dayguaji:number = 60 * 1000 * 60 * 4;   //每日可挂机时长
    // export var dayfuben:number = 60 * 1000 * 60 * 4;   //每日手动操作时长
    ///数据
    export var strWood:string = "0_0_0_0_0_0_0_";//金币，枫叶，黑金，积分，材1，材2，材3
    export var market:string = "0_0";   //摊位凭证、交易点券
    export var numberEff:number = 0;
    export var zsly:Array<any> = [0, 0, 0, 0];    //钻石来源
    export var zsxh:Array<any> = [0, 0, 0];    //钻石消耗
    export var jc_cal:Array<any> = [0, 0];

    export var jyly:Array<any> = [0, 0];    //0钻石转化 1交易获取
    export var jyxh:Array<any> = [0, 0];    //交易购买

    export var shops:Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];   //商店购买记录(包含扭蛋次数,抽卡次数)
    export var ryly:Array<any> = [0, 0];    //枫叶来源
    export var ryxh:Array<any> = [0];    //枫叶消耗
    export var jbly:Array<any> = [0, 0];    //金币来源
    export var jbxh:Array<any> = [0];    //金币消耗
    export var clly:Array<any> = [0];    //材料来源(cl1+cl2+cl3)
    export var clxh:Array<any> = [0];    //材料消耗(cl1+cl2+cl3)
    export var czly:Array<any> = [];     //充值记录
    export var ch:boolean = false;
    export var ip:string = "";

    export function martPai(): number {
        let _Arr = ms.market.split("_");
        return Math.floor(Number(_Arr[0]));
    }
    export function martPoint(): number {
        let _Arr = ms.market.split("_");
        return Math.floor(Number(_Arr[1]));
    }

    export function jinbi(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[0]));
    }
    export function rongyu(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[1]));
    }
    export function zuanshi(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[2]));
    }
    export function jifen(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[3]));
    }
    export function cailiao1(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[4]));
    }
    export function cailiao2(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[5]));
    }
    export function juexing1(): number {
        let _Arr = ms.strWood.split("_");
        return Math.floor(Number(_Arr[6]));
    }

    export function SmartPai(num:number): void {
        let _Arr = ms.market.split("_");
        let __ = Math.floor(Number(_Arr[0]));
        __ += num;
        if(__ < 0) __ = 0;
        _Arr[0] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 2; i++) {
            _s += _Arr[i];
            _s += "_";
        }
        ms.market = _s;
    }

    export function SmartPoint(num:number): void {
        let _Arr = ms.market.split("_");
        let __ = Math.floor(Number(_Arr[1]));
        __ += num;
        if(__ < 0) __ = 0;
        _Arr[1] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 2; i++) {
            _s += _Arr[i];
            _s += "_";
        }
        ms.market = _s;
    }

    export function Sjinbi(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[0]));
        __ += num;
        _Arr[0] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Srongyu(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[1]));
        __ += num;
        _Arr[1] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Szuanshi(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[2]));
        __ += num;
        _Arr[2] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Sjifen(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[3]));
        __ += num;
        _Arr[3] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Scailiao1(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[4]));
        __ += num;
        _Arr[4] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Scailiao2(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[5]));
        __ += num;
        _Arr[5] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }
    export function Sjuexing1(num:number): void {
        let _Arr = ms.strWood.split("_");
        let __ = Math.floor(Number(_Arr[6]));
        __ += num;
        _Arr[6] = __ + "";

        let _s = "";
        for(let i:number = 0; i < 7; i++) {
            _s += _Arr[i];
            _s += "_";
        }

        ms.strWood = _s;
    }

    // export function juexing2(): number {
    //     return Number(ms.strWood[0]);
    // }

    // export var jinbi:number = 0;                //金币
    // export var rongyu:number = 0;               //枫叶
    // export var zuanshi:number = 0;              //黑金
    // export var jifen:number = 0;                //积分
    // export var cailiao1:number = 0;             //火灵符
    // export var cailiao2:number = 0;             //冰灵符
    // export var juexing1:number = 0;             //觉醒石
    // export var juexing2:number = 0;             //圣光之羽

    export var zy100:number = 0;                //100级职业
    export var zy160:number = 0;                //160级职业
    export var zy200:number = 0;                //200级职业
    export var chouka:number = 0;               //抽卡次数
    // export var huoli:number = 3000;              //体力
    export var error:number = 0;              //最大点击错误次数
    export var Exp2:number = 0;                 //双倍经验
    export var Exp3:number = 0;                 //五倍经验
    export var Exp10:number = 0;                 //十倍经验
    export var Exp100:number = 0;               //百倍经验
    export var zhihuan:number = 0;              //置换英雄
    // export var ssjh:number = 0;     //圣兽精华
    // export var lhs:number = 0;      //灵魂石
    // export var qinglong:number = 0; //青龙碎片
    // export var baihu:number = 0;    //白虎碎片
    // export var xuanwu:number = 0;   //玄武碎片
    // export var zhuque:number = 0;   //朱雀碎片

    export var speed:number = 1;                //速度（整体速度）
    export var sp:number = 0;
    export var shuxing:Array<any> = [];
    export var wanfabag:Array<any> = [];
    export var wear_skill:Array<any> = [];
    export var have_skill:Array<any> = [];
    export var guide_index:number = 1;          //引导引索
    export var guide_ok:boolean = false;
    export var ajb:number = -1000;      //总金币数量
    export var ary:number = -1000;      //总枫叶数量
    export var azs:number = -1000;      //总钻石数量
    export var ajf:number = -1000;      //总积分数量
    export var asm:number = 0;          //总神秘卷轴数量   ----这里可以解决装备内存挂的问题
    // export var asucc:number = 0;        //总成功次数
    // export var afail:number = 0;        //总失败次数
    export var acz:number = 0;          //总充值金额(备份)

    export var bagsdata:Array<any> = [];            //背包中的信息
    export var petbagsdata:Array<any> = [];         //宠物背包
    export var fashionbagsdata:Array<any> = [];     //时装背包
    export var tamingmobbagsdata:Array<any> = [];   //坐骑背包
    export var ringbagsdata:Array<any> = [];        //戒指背包
    export var chairbagsdata:Array<any> = [];       //椅子背包
    export var equitsdata:Array<any> = [];          //装备栏中的信息
    export var skillsdata:Array<any> = [];          //学会的技能并不是装备的技能
    export var herosdata:Array<any> = [];
    export var use_skill:Array<any> = [];
    export var tasksdata:Array<any> = [];           //已完成的任务
    export var lasttask:string = "";                //最后一次任务
    export var killmobsdata:Array<any> = [];        //消灭的怪物
    export var killAll:number = 0;                  //杀怪总数量
    export var guanka:number = 1;                   //最高关卡
    export var cur_guanka:number = 1;               //当前关卡
    export var bossguanka:number = 1;               //最高boss关卡
    export var cur_bossguanka:number = 1;           //当前boss关卡
    export var fuben:number = 1;                    //最高副本
    export var cur_fuben:number = 1;                //当前副本股卡
    // export var pvplv = 1;               //pvp玩家等级
    // export var pvpnandu = 1;            //pvp难度
    // export var pvpguanka = 1;
    // export var pvpTeam:Array<any> = [];

    export var s1 = "服"
    export var s2 = "务"
    export var s3 = "器"
    export var s4 = "繁"
    export var s5 = "忙"
    export var s6 = "，"
    export var s7 = "人"
    export var s8 = "数"
    export var s9 = "超"
    export var s10 = "载"
    export var s11 = "，"
    export var s12 = "请"
    export var s13 = "稍"
    export var s14 = "后"
    export var s15 = "再"
    export var s16 = "试"
    //从服务器中读取
    export var _user:string = "Susake008";
    export var _dpip:number = 1000;
    //http://www.laoady.com/subject/21981.html
    export function getMSData(test:number = 0) : void {
        let a = true;
        if(a) {

            let message = new Net.Message();
            message.xieyi = (101 + ms._dpip);
            message.msdata = { "user": ms._user, "password":"123456" };
            msMoudle.wsocket.sendMsg({param: message, success:(data: any) => {
                if(data["code"] == 0) {
                    let herodata:any = JSON.parse(data["msdata"]._context);
                    // console.log(herodata);
                    this.getByServer(herodata);
                    if(herodata.testweapon) {
                        //
                        console.log("当前用户ip", data["msdata"].ip)
                        ms.ip = data["msdata"].ip;
                        //当前在线人数
                        msMoudle.pNum = data["msdata"].pNum;
                        // msMoudle.toast("人数" + msMoudle.pNum);

                        // if(msMoudle.maplejson["充值QQ"] != 1044571564) {
                        //     if(msMoudle.pNum > ms._) {
                        //         msMoudle.toast(ss);
                        //         return ;
                        //     }
                        // }

                        ui.show(app.homeland.MajorCityDlg);
                        // ui.show(app.test.mapEditor);
                    }
                    else {
                        ui.show(app.createChar.CreateCharDlg);
                    }
                }
            }, fail: (err?: any) => {
                msMoudle.toast("获取数据失败重新获取....")
                Laya.timer.once(100, this, ms.getMSData);
            }});
        }
        else {
            //本地存储数据
            if(laya.net.LocalStorage.support) {
                let herodata:any = laya.net.LocalStorage.getJSON("ms4");
                if(herodata) {
                    console.log("读取数据");
                    // console.log(herodata)
                    this.getByServer(herodata);
                    if(test == 0) ui.show(app.homeland.MajorCityDlg);
                }
                else {
                    // var ms:any = new Object();
                    ms.herodata = new app.model.CharStatus();
                    ms.herodata.ResetAll();
					ms.user = user;
					ms.password = password;
					//金币
					// ms.jinbi() = 0;
					//枫叶
					// ms.rongyu() = 0;
					//黑金
					// ms.zuanshi() = 0;
                    // ms.jifen() = 0;
                    ms.zy100 = 0;
                    ms.zy160 = 0;
                    ms.zy200 = 0;
                    ms.chouka = 0;
                    // ms.huoli = 3000;
                    ms.error = 0;
                    ms.Exp2 = 0;
                    ms.Exp3 = 0;
                    ms.Exp10 = 0;
                    ms.Exp100 = 0;
                    ms.zhihuan = 0;
					//材料
					// ms.cailiao1() = 0;
					// ms.cailiao2() = 0;
					//觉醒翅膀
					// ms.juexing1() = 0;
					// ms.juexing2 = 0;
                    //200副本材料
                    // ms.ssjh = 0;
                    // ms.lhs = 0;
                    // ms.qinglong = 0;
                    // ms.baihu = 0;
                    // ms.xuanwu = 0;
                    // ms.zhuque = 0;
                    //时装
                    ms.fashion = new Object();
                    ms.fashion.openid = 0;
                    ms.fashion.id = "N";
                    //宠物
                    ms.pet = new Object();
                    ms.pet.openid = 0;
                    ms.pet.id = "N";
                    //椅子
                    ms.chair = new Object();
                    ms.chair.openid = 0;
                    ms.chair.id = "N";

                    ms.hairList = [];
                    ms.bodyList = [];
                    ms.faceList = [];
                    for(let i:number = 0; i < 10; i++) {
                        ms.selhair[i] = "N";
                        ms.selbody[i] = "N";
                        ms.selface[i] = "N";
                    }
                    ms.selHero = 0;
                    ms.tiaogk = 0;
                    //坐骑
                    ms.tamingmob = new Object();
                    ms.tamingmob.openid = 0;
                    ms.tamingmob.tamingmob1 = "N";
                    ms.tamingmob.tamingmob2 = "N";
                    //戒指
                    ms.ring = new Object();
                    ms.ring.openid = 0;
                    ms.ring.id = "N";
					// //pvp奖励领取
					// ms.pvp_reweard = new Array(3);
					// for(var i = 0; i < 3; i++) {
					// 	ms.pvp_reweard[i] = 0;
					// }
                    //
					//技能
					// ms.wear_skill = new Array(4);
                    ms.wear_skill = [800107,800105,800109,800111];
					ms.have_skill = new Array(11);
					for(var i = 0; i < ms.have_skill.length; i++)
						ms.have_skill[i] = 1;
					// ms.have_skill[6] = 1;
					// ms.have_skill[8] = 1;
					// ms.wear_skill[0] = 800107;
					// ms.wear_skill[0] = 800109;

					ms.guide_index = 1;
					ms.guide_ok = false;
					//修炼
					ms.shuxing = new Array(8);
					for(var i = 0; i < 8; i++) {
						ms.shuxing[i] = 0;
					}
                    if(test == 0) ui.show(app.createChar.CreateCharDlg);
                }
            }
            else {
                console.log("该浏览器不支持");
                msMoudle.toast("该浏览器不支持");
            }
        }
    }

    ////这种数据结构感觉是有问题的
    export function getByServer(herodata:any) : void {
        ms.herodata = new app.model.CharStatus();
        ms.herodata.ResetAll();
        if(herodata.m_job != null) {
            for(let i:number = 0; i < ms.m_job.length; i++) {
                if(herodata.m_job[i]) ms.m_job[i] = herodata.m_job[i];
            }
        }
        // if(herodata.rocker_type != null) ms.rocker_type = herodata.rocker_type;
        if(herodata.lastmap != null) ms.lastmap = herodata.lastmap;
        if(herodata.m_tg != null) ms.m_tg = herodata.m_tg;

        if(herodata.ajb != null)ms.ajb = herodata.ajb;
        if(herodata.ary != null)ms.ary = herodata.ary;
        if(herodata.azs != null)ms.azs = herodata.azs;
        if(herodata.ajf != null)ms.ajf = herodata.ajf;
        if(herodata.asm != null)ms.asm = herodata.asm;
        // if(herodata.asucc != null)ms.asucc = herodata.asucc;
        // if(herodata.afail != null)ms.afail = herodata.afail;
        if(herodata.acz != null)ms.acz = herodata.acz;

        if(herodata.test_guanka != null)ms.test_guanka = herodata.test_guanka;
        // if(herodata.test_fuben != null)ms.test_fuben = herodata.test_fuben;
        if(herodata.test_lingzhu != null)ms.test_lingzhu = herodata.test_lingzhu;
        // if(herodata.test_pvp != null)ms.test_pvp = herodata.test_pvp;
        if(herodata.test_boss != null)ms.test_boss = herodata.test_boss;
        if(herodata.test_nvshen != null)ms.test_nvshen = herodata.test_nvshen;
        if(herodata.test_sishen != null)ms.test_sishen = herodata.test_sishen;
        if(herodata.test_cz != null)ms.test_cz = herodata.test_cz;
        if(herodata.test_sk != null)ms.test_sk = herodata.test_sk;
        if(herodata.test_dj != null)ms.test_dj = herodata.test_dj;
        if(herodata.max_atk != null)ms.max_atk = herodata.max_atk;
        if(herodata.max_str != null)ms.max_str = herodata.max_str;
        if(herodata.max_dex != null)ms.max_dex = herodata.max_dex;
        if(herodata.max_luk != null)ms.max_luk = herodata.max_luk;
        if(herodata.max_int != null)ms.max_int = herodata.max_int;
        if(herodata.max_nvshen != null)ms.max_nvshen = herodata.max_nvshen;
        if(herodata.max_sishen != null)ms.max_sishen = herodata.max_sishen;


        if(herodata.test_url != null)ms.test_url = herodata.test_url;
        if(herodata.test_g != null)ms.test_g = herodata.test_g;
        if(herodata.test_ly != null)ms.test_ly = herodata.test_ly;
        if(herodata.test_qq != null)ms.test_qq = herodata.test_qq;

        if(herodata.allTime != null)ms.allTime = herodata.allTime;
        if(herodata.tBagsArr != null) {
            // for(let i:number = 0; i < herodata.tBagsArr.length; i++) {
            //     ms.tBagsArr[i] = herodata.tBagsArr[i];
            // }
            ms.tBagsArr = herodata.tBagsArr;
        }
        if(herodata.QuestId != null)ms.QuestId = herodata.QuestId;
        if(herodata.QuestStep != null)ms.QuestStep = herodata.QuestStep;
        if(herodata.tQuests != null)ms.tQuests = herodata.tQuests;

        if(herodata.testweapon != null)ms.testweapon = herodata.testweapon;
        if(herodata.testfweapon != null)ms.testfweapon = herodata.testfweapon;
        if(herodata.testcap != null)ms.testcap = herodata.testcap;
        if(herodata.testlongcoat != null)ms.testlongcoat = herodata.testlongcoat;
        if(herodata.testname != null)ms.testname = herodata.testname;
        if(herodata.user != null)ms.user = herodata.user;
        if(herodata.password != null)ms.password = herodata.password;
        if(herodata.password2 != null)ms.password2 = herodata.password2;
        if(herodata.herodata != null) {
            // ms.herodata = herodata.herodata;
            ms.updData(ms.herodata, herodata.herodata);
            //主角装备
            ms.herodata.EquipSlots = [];
            for(let i:number = 0; i < herodata.herodata.EquipSlots.length; i++) {
                if(herodata.herodata.EquipSlots[i]) {
                    ms.herodata.EquipSlots[i] = new app.model.Equip();
                    ms.herodata.EquipSlots[i].ResetAll();
                    ms.eqpData(ms.herodata.EquipSlots[i], herodata.herodata.EquipSlots[i]);
                }
            }
            //主角背包
            ms.herodata.BagSlots = [];
            for(let i:number = 0; i < herodata.herodata.BagSlots.length; i++) {
                if(herodata.herodata.BagSlots[i]) {
                    ms.herodata.BagSlots[i] = new app.model.Equip();
                    ms.herodata.BagSlots[i].ResetAll();
                    ms.eqpData(ms.herodata.BagSlots[i], herodata.herodata.BagSlots[i]);
                }
            }
            //////新增背包
            ms.herodata.FlionSlots = new Array(50);
            for(let i:number = 0; i < ms.herodata.FlionSlots.length; i++) {
                ms.herodata.FlionSlots[i] = [];
                if(herodata.herodata.FlionSlots && herodata.herodata.FlionSlots[i]) {
                    ms.herodata.FlionSlots[i] = herodata.herodata.FlionSlots[i];
                }
            }
            // console.log(ms.herodata.FlionSlots)
            // let mslosts:Array<any> = [
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
            // ]
            // let eslots:Array<any> = [
            //     herodata.herodata.EquipSlots2,
            //     herodata.herodata.EquipSlots3,
            //     herodata.herodata.EquipSlots4,
            //     herodata.herodata.EquipSlots5,
            //     herodata.herodata.EquipSlots6,
            //     herodata.herodata.EquipSlots7,
            //     herodata.herodata.EquipSlots8,
            //     herodata.herodata.EquipSlots9,
            //     herodata.herodata.EquipSlots10,
            //     herodata.herodata.EquipSlots11,
            //     herodata.herodata.EquipSlots12,
            //     herodata.herodata.EquipSlots13,
            //     herodata.herodata.EquipSlots14,
            //     herodata.herodata.EquipSlots15,
            //     herodata.herodata.EquipSlots16,
            //     herodata.herodata.EquipSlots17,
            //     herodata.herodata.EquipSlots18,
            //     herodata.herodata.EquipSlots19,
            //     herodata.herodata.EquipSlots20,
            //     herodata.herodata.EquipSlots21,
            //     herodata.herodata.EquipSlots22,
            //     herodata.herodata.EquipSlots23,
            //     herodata.herodata.EquipSlots24,
            //     herodata.herodata.EquipSlots25,
            //     herodata.herodata.EquipSlots26,
            //     herodata.herodata.EquipSlots27,
            //     herodata.herodata.EquipSlots28,
            //     herodata.herodata.EquipSlots29,
            //     herodata.herodata.EquipSlots30,
            //     herodata.herodata.EquipSlots31,
            //     herodata.herodata.EquipSlots32,
            //     herodata.herodata.EquipSlots33,
            //     herodata.herodata.EquipSlots34,
            //     herodata.herodata.EquipSlots35,
            //     herodata.herodata.EquipSlots36,
            //     herodata.herodata.EquipSlots37,
            //     herodata.herodata.EquipSlots38,
            //     herodata.herodata.EquipSlots39,
            //     herodata.herodata.EquipSlots40,
            //     herodata.herodata.EquipSlots41,
            //     herodata.herodata.EquipSlots42
            // ];
            // for(let _:number = 0; _ < mslosts.length; _++) {
            //     if(eslots[_] && mslosts[_]) {
            //         // mslosts[_] = [];
            //         // console.log(mslosts[_])
            //         for(let i:number = 0; i < eslots[_].length; i++) {
            //             if(eslots[_][i]) {
            //                 mslosts[_][i] = new app.model.Equip();
            //                 mslosts[_][i].ResetAll();
            //                 ms.eqpData(mslosts[_][i], eslots[_][i], false);
            //             }
            //         }
            //     }
            // }

            //主角背包
            ms.herodata.BagSlots2 = [];
            if(herodata.herodata.BagSlots2) {
                for(let i:number = 0; i < herodata.herodata.BagSlots2.length; i++) {
                    if(herodata.herodata.BagSlots2[i]) {
                        ms.herodata.BagSlots2[i] = new app.model.Equip();
                        ms.herodata.BagSlots2[i].ResetAll();
                        ms.eqpData(ms.herodata.BagSlots2[i], herodata.herodata.BagSlots2[i], false);
                    }
                }
            }
        }
        if(herodata.otherherodata != null) {
            // ms.otherherodata = herodata.otherherodata;
            ms.otherherodata = [];
            for(let i:number = 0; i < herodata.otherherodata.length; i++) {
                ms.otherherodata[i] = new app.model.HeroStatus();
                ms.otherherodata[i].ResetAll();
                ms.updData(ms.otherherodata[i], herodata.otherherodata[i]);
            }
        }
        if(herodata.otherheroservedata != null) {
            // ms.otherheroservedata = herodata.otherheroservedata;
            ms.otherheroservedata = [];
            for(let i:number = 0; i < herodata.otherheroservedata.length; i++) {
                ms.otherheroservedata[i] = new app.model.HeroStatus();
                ms.otherheroservedata[i].ResetAll();
                ms.updData(ms.otherheroservedata[i], herodata.otherheroservedata[i]);
            }
        }
        if(herodata.story != null)ms.story = herodata.story;
        if(herodata.firstHero != null)ms.firstHero = herodata.firstHero;
        if(herodata.task != null)ms.task = herodata.task;
        if(herodata.zhaomu != null)ms.zhaomu = herodata.zhaomu;
        if(herodata.boss != null)ms.boss = herodata.boss;
        if(herodata.skill != null)ms.skill = herodata.skill;
        if(herodata.hecheng != null)ms.hecheng = herodata.hecheng;
        if(herodata.team != null)ms.team = herodata.team;
        if(herodata.yingxiong != null)ms.yingxiong = herodata.yingxiong;
        // if(herodata.pvp != null)ms.pvp = herodata.pvp;
        // if(herodata.renku != null)ms.renku = herodata.renku;
        if(herodata.fuli != null)ms.fuli = herodata.fuli;
        if(herodata.qiandao != null)ms.qiandao = herodata.qiandao;
        if(herodata.is_qiandao != null)ms.is_qiandao = herodata.is_qiandao;
        // if(herodata.pvp_note != null)ms.pvp_note = herodata.pvp_note;
        // if(herodata.pvp_reweard != null)ms.pvp_reweard = herodata.pvp_reweard;
        if(herodata.zhuanpan != null)ms.zhuanpan = herodata.zhuanpan;
        if(herodata.miwu != null)ms.miwu = herodata.miwu;
        if(herodata.tiaotiao != null)ms.tiaotiao = herodata.tiaotiao;
        if(herodata.xiangzi != null)ms.xiangzi = herodata.xiangzi;
        if(herodata.zhuzhu != null)ms.zhuzhu = herodata.zhuzhu;
        if(herodata.ban != null)ms.ban = herodata.ban;
        if(herodata.czValue != null)ms.czValue = herodata.czValue;
        if(herodata.desFashion6 != null)ms.desFashion6 = herodata.desFashion6;
        if(herodata.riqi != null)ms.riqi = herodata.riqi;
        if(herodata.stime != null)ms.stime = herodata.stime;
        if(herodata.d600 != null)ms.d600 = herodata.d600;
        if(herodata.d601 != null)ms.d601 = herodata.d601;
        if(herodata.d602 != null)ms.d602 = herodata.d602;
        if(herodata.d603 != null)ms.d603 = herodata.d603;
        if(herodata.d604 != null)ms.d604 = herodata.d604;
        if(herodata.d605 != null)ms.d605 = herodata.d605;
        if(herodata.d606 != null)ms.d606 = herodata.d606;
        if(herodata.d607 != null)ms.d607 = herodata.d607;
        if(herodata.d608 != null)ms.d608 = herodata.d608;
        if(herodata.dboss1 != null)ms.dboss1 = herodata.dboss1;
        if(herodata.dboss2 != null)ms.dboss2 = herodata.dboss2;
        if(herodata.dboss3 != null)ms.dboss3 = herodata.dboss3;
        if(herodata.dboss4 != null)ms.dboss4 = herodata.dboss4;
        if(herodata.dayreward != null)ms.dayreward = herodata.dayreward;
        if(herodata.daytotal != null)ms.daytotal = herodata.daytotal;
        if(herodata.dayguaji != null)ms.dayguaji = herodata.dayguaji;
        // if(herodata.dayfuben != null)ms.dayfuben = herodata.dayfuben;


        if(herodata.market != null) ms.market = herodata.market;
        if(herodata.strWood != null) ms.strWood = herodata.strWood;

        // if(herodata.jinbi != null)ms.jinbi() = herodata.jinbi;
        // if(herodata.rongyu != null)ms.rongyu() = herodata.rongyu;
        // if(herodata.zuanshi != null)ms.zuanshi() = herodata.zuanshi;
        // if(herodata.jifen != null)ms.jifen() = herodata.jifen;
        // if(herodata.cailiao1 != null)ms.cailiao1() = herodata.cailiao1;
        // if(herodata.cailiao2 != null)ms.cailiao2() = herodata.cailiao2;
        // if(herodata.juexing1 != null)ms.juexing1() = herodata.juexing1;
        // if(herodata.juexing2 != null)ms.juexing2 = herodata.juexing2;


        if(herodata.numberEff != null)ms.numberEff = herodata.numberEff;

        if(herodata.zsly != null) ms.zsly = herodata.zsly;
        if(herodata.zsxh != null) ms.zsxh = herodata.zsxh;
        if(herodata.shops != null) ms.shops = herodata.shops;

        if(herodata.jc_cal != null) ms.jc_cal = herodata.jc_cal;


        if(herodata.jyly != null) ms.jyly = herodata.jyly;
        if(herodata.jyxh != null) ms.jyxh = herodata.jyxh;

        if(herodata.ryly != null) ms.ryly = herodata.ryly;
        if(herodata.ryxh != null) ms.ryxh = herodata.ryxh;
        if(herodata.jbly != null) ms.jbly = herodata.jbly;
        if(herodata.jbxh != null) ms.jbxh = herodata.jbxh;
        if(herodata.clly != null) ms.clly = herodata.clly;
        if(herodata.clxh != null) ms.clxh = herodata.clxh;
        if(herodata.czly != null) ms.czly = herodata.czly;

        if(herodata.ch != null) ms.ch = herodata.ch;
        if(herodata.ip != null) ms.ip = herodata.ip;


        if(herodata.zy100 != null)ms.zy100 = herodata.zy100;
        if(herodata.zy160 != null)ms.zy160 = herodata.zy160;
        if(herodata.zy200 != null)ms.zy200 = herodata.zy200;
        if(herodata.chouka != null)ms.chouka = herodata.chouka;
        // if(herodata.huoli != null)ms.huoli = herodata.huoli;
        if(herodata.error != null)ms.error = herodata.error;
        if(herodata.Exp2 != null)ms.Exp2 = herodata.Exp2;
        if(herodata.Exp3 != null)ms.Exp3 = herodata.Exp3;
        if(herodata.Exp10 != null)ms.Exp10 = herodata.Exp10;
        if(herodata.Exp100 != null)ms.Exp100 = herodata.Exp100;
        if(herodata.zhihuan != null)ms.zhihuan = herodata.zhihuan;

        // if(herodata.ssjh != null)ms.ssjh = herodata.ssjh;
        // if(herodata.lhs != null)ms.lhs = herodata.lhs;
        // if(herodata.qinglong != null)ms.qinglong = herodata.qinglong;
        // if(herodata.baihu != null)ms.baihu = herodata.baihu;
        // if(herodata.xuanwu != null)ms.xuanwu = herodata.xuanwu;
        // if(herodata.zhuque != null)ms.zhuque = herodata.zhuque;

        if(herodata.speed != null)ms.speed = herodata.speed;
        if(herodata.sp != null)ms.sp = herodata.sp;
        if(herodata.shuxing != null)ms.shuxing = herodata.shuxing;
        if(herodata.wanfabag != null)ms.wanfabag = herodata.wanfabag;
        if(herodata.wear_skill != null)ms.wear_skill = herodata.wear_skill;
        if(herodata.have_skill != null)ms.have_skill = herodata.have_skill;
        if(herodata.guide_index != null)ms.guide_index = herodata.guide_index;
        if(herodata.guide_ok != null)ms.guide_ok = herodata.guide_ok;
        if(herodata.tamingmob != null) ms.tamingmob = herodata.tamingmob;
        else {
            ms.tamingmob = new Object();
            ms.tamingmob.openid = 0;
            ms.tamingmob.tamingmob1 = "N";
            ms.tamingmob.tamingmob2 = "N";
        }
        if(herodata.pet != null) ms.pet = herodata.pet;
        else {
            ms.pet = new Object();
            ms.pet.openid = 0;
            ms.pet.id = "N";
        }
        if(herodata.fashion != null) ms.fashion = herodata.fashion;
        else {
            ms.fashion = new Object();
            ms.fashion.openid = 0;
            ms.fashion.id = "N";
        }
        if(herodata.ring != null) ms.ring = herodata.ring;
        else {
            ms.ring = new Object();
            ms.ring.openid = 0;
            ms.ring.id = "N";
        }
        if(herodata.chair != null) ms.chair = herodata.chair;
        else {
            ms.chair = new Object();
            ms.chair.openid = 0;
            ms.chair.id = "N";
        }

        if(herodata.hairList != null)ms.hairList = herodata.hairList;
        if(herodata.selhair != null) {
            if(herodata.selhair == "N" || herodata.selhair.indexOf(".img") >= 0) {
                //老版本
                for(let i:number = 0; i < 10; i++) {
                    ms.selhair[i] = "N";
                }
                ms.selhair[0] = herodata.selhair;
            }
            else {
                ms.selhair = herodata.selhair;
            }
        }
        if(herodata.bodyList != null)ms.bodyList = herodata.bodyList;
        if(herodata.selbody != null) {
            if(herodata.selbody == "N" || herodata.selbody.indexOf(".img") >= 0) {
                //老版本
                for(let i:number = 0; i < 10; i++) {
                    ms.selbody[i] = "N";
                }
                ms.selbody[0] = herodata.selbody;
            }
            else {
                ms.selbody = herodata.selbody;
            }
        }
        if(herodata.faceList != null)ms.faceList = herodata.faceList;
        if(herodata.selface != null) {
            if(herodata.selface == "N" || herodata.selface.indexOf(".img") >= 0) {
                //老版本
                for(let i:number = 0; i < 10; i++) {
                    ms.selface[i] = "N";
                }
                ms.selface[0] = herodata.selface;
            }
            else {
                ms.selface = herodata.selface;
            }
        }
        if(herodata.selHero != null)ms.selHero = herodata.selHero;
        if(herodata.tiaogk != null)ms.tiaogk = herodata.tiaogk;
        if(herodata.bagsdata != null)ms.bagsdata = herodata.bagsdata;
        if(herodata.petbagsdata != null) ms.petbagsdata = herodata.petbagsdata;
        if(herodata.fashionbagsdata != null) ms.fashionbagsdata = herodata.fashionbagsdata;
        if(herodata.tamingmobbagsdata != null) ms.tamingmobbagsdata = herodata.tamingmobbagsdata;
        if(herodata.ringbagsdata != null) ms.ringbagsdata = herodata.ringbagsdata;
        if(herodata.chairbagsdata != null) ms.chairbagsdata = herodata.chairbagsdata;
        if(herodata.equitsdata != null)ms.equitsdata = herodata.equitsdata;
        if(herodata.skillsdata != null)ms.skillsdata = herodata.skillsdata;
        if(herodata.herosdata != null)ms.herosdata = herodata.herosdata;
        if(herodata.use_skill != null)ms.use_skill = herodata.use_skill;
        if(herodata.tasksdata != null)ms.tasksdata = herodata.tasksdata;
        if(herodata.lasttask != null)ms.lasttask = herodata.lasttask;
        if(herodata.killmobsdata != null) ms.killmobsdata = herodata.killmobsdata;
        if(herodata.killAll != null) ms.killAll = herodata.killAll;

        if(herodata.guanka != null)ms.guanka = herodata.guanka;
        if(herodata.cur_guanka != null)ms.cur_guanka = herodata.cur_guanka;
        if(herodata.bossguanka != null)ms.bossguanka = herodata.bossguanka;
        if(herodata.cur_bossguanka != null)ms.cur_bossguanka = herodata.cur_bossguanka;
        if(herodata.fuben != null)ms.fuben = herodata.fuben;
        if(herodata.cur_fuben != null)ms.cur_fuben = herodata.cur_fuben;
        // if(herodata.pvplv != null)ms.pvplv = herodata.pvplv;
        // if(herodata.pvpnandu != null)ms.pvpnandu = herodata.pvpnandu;
        // if(herodata.pvpguanka != null)ms.pvpguanka = herodata.pvpguanka;
        // if(herodata.pvpTeam != null) ms.pvpTeam = herodata.pvpTeam;

        // console.log("进入主界面");
        // ui.show(app.homeland.MajorCityDlg);
    }

    export var _ = 20;
    export function updData(msdata:any, saveDaya:any) : void {
        // console.log(saveDaya)
        // ms.herodata = herodata.herodata;
        if(!msdata) {
            console.log("msdata数据异常");
            console.log("####1")
            console.log(msdata);
            console.log("####2")
            // let herodata:any = laya.net.LocalStorage.getJSON("ms4");
            // console.log(herodata)
        }
        if(!saveDaya) {
            console.log("saveDaya数据异常");
            console.log("####3")
            console.log(saveDaya);
            console.log("####4")
            // let herodata:any = laya.net.LocalStorage.getJSON("ms4");
            // console.log(herodata)
        }
        if(msdata && saveDaya) {
            console.log("数据正常！");
            if(saveDaya.id != null) msdata.id = saveDaya.id;             //英雄表id
            if(saveDaya.openid != null) msdata.openid = saveDaya.openid;         //英雄唯一id
            // if(saveDaya.head != null) msdata.head = saveDaya.head;           //头像
            if(saveDaya.juexing != null) msdata.juexing = saveDaya.juexing;    //觉醒状态
            if(saveDaya.star != null) msdata.star = saveDaya.star;          //星级
            if(saveDaya.pinzhi != null) msdata.pinzhi = saveDaya.pinzhi;      //品质
            if(saveDaya.state != null) msdata.state = saveDaya.state;       //是否上阵
            if(saveDaya.Job != null) msdata.Job = saveDaya.Job;            //职业
            if(saveDaya.tJobs != null) msdata.tJobs = saveDaya.tJobs;       //可转职业
            if(saveDaya.pJobs != null) msdata.pJobs = saveDaya.pJobs;       //可转职业第几转
            if(saveDaya.XL != null) msdata.XL = saveDaya.XL;                //修炼
            // if(saveDaya.XunL != null) msdata.XunL = saveDaya.XunL;
            if(saveDaya.ZS != null) msdata.ZS = saveDaya.ZS;                //转生次数
            if(saveDaya.LH != null) msdata.LH = saveDaya.LH;
            if(saveDaya.Lv != null) msdata.Lv = saveDaya.Lv;               //等级
            if(saveDaya.Exp != null) msdata.Exp = saveDaya.Exp;            //等级
            if(saveDaya.Name != null) msdata.Name = saveDaya.Name;          //名称
            if(saveDaya.Sex != null) msdata.Sex = saveDaya.Sex;            //性别
            if(saveDaya.Skill_1 != null) msdata.Skill_1 = saveDaya.Skill_1;    //佩戴技能1
            if(saveDaya.Skill_2 != null) msdata.Skill_2 = saveDaya.Skill_2;    //佩戴技能2
            if(saveDaya.Skill_3 != null) msdata.Skill_3 = saveDaya.Skill_3;    //佩戴技能3
            if(saveDaya.Skill_4 != null) msdata.Skill_4 = saveDaya.Skill_4;    //佩戴技能4

            ms.changeData1(msdata, saveDaya, "Str");    //力量
            ms.changeData1(msdata, saveDaya, "Dex");    //敏捷
            ms.changeData1(msdata, saveDaya, "Inte");   //智力
            ms.changeData1(msdata, saveDaya, "Luck");   //运气
            ms.changeData1(msdata, saveDaya, "MaxHP");  //生命上限
            ms.changeData1(msdata, saveDaya, "MaxMP");  //魔法上限
            ms.changeData1(msdata, saveDaya, "PADamage");   //物理攻击力
            ms.changeData1(msdata, saveDaya, "MADamage");   //魔法攻击力
            ms.changeData1(msdata, saveDaya, "PDDamage");   //物理防御力
            ms.changeData1(msdata, saveDaya, "MDDamage");   //魔法防御力
            ms.changeData1(msdata, saveDaya, "Accurate");   //命中率
            ms.changeData1(msdata, saveDaya, "Evasion");    //闪避率
            ms.changeData1(msdata, saveDaya, "CriticalRate");   //暴击率
            ms.changeData1(msdata, saveDaya, "CriticalDamageMax");  //最大暴击伤害     (暂时不用)
            ms.changeData1(msdata, saveDaya, "CriticalDamageMin");  //最小暴击伤害     (暂时不用)
            ms.changeData1(msdata, saveDaya, "Mastery");    //熟练度     (暂时为100)
            ms.changeData1(msdata, saveDaya, "DamageRate"); //伤害加成     (暂时不用)
            ms.changeData1(msdata, saveDaya, "BossDamageRate"); //Boss伤害加成     (暂时不用)
            ms.changeData1(msdata, saveDaya, "AttackSpeed");    //攻击速度
            ms.changeData1(msdata, saveDaya, "WalkSpeed");  //移动速度
        }
    }

    export function eqpData(msdata:any, saveDaya:any, flag:boolean = true) : void {
        if(saveDaya.id != null) msdata.id = saveDaya.id;
        if(saveDaya.num != null) msdata.num = saveDaya.num;
        if(saveDaya.openid != null) msdata.openid = saveDaya.openid;
        if(saveDaya.part != null) msdata.part = saveDaya.part;
        if(saveDaya.price != null) msdata.price = saveDaya.price;
        if(saveDaya.reqLevel != null) msdata.reqLevel = saveDaya.reqLevel;
        if(saveDaya.suc != null) msdata.suc = saveDaya.suc;
        if(saveDaya.suo != null) msdata.suo = saveDaya.suo;
        if(saveDaya.tuc != null) msdata.tuc = saveDaya.tuc;
        if(saveDaya.type != null) msdata.type = saveDaya.type;
        if(saveDaya.succlst != null) msdata.succlst = saveDaya.succlst;
        if(saveDaya.succM != null) msdata.succM = saveDaya.succM;

        // if(saveDaya.faillst != null) msdata.faillst = saveDaya.faillst;
        if(flag) {
            ms.changeData1(msdata, saveDaya, "Str");    //力量
            ms.changeData1(msdata, saveDaya, "Dex");    //敏捷
            ms.changeData1(msdata, saveDaya, "Inte");   //智力
            ms.changeData1(msdata, saveDaya, "Luck");   //运气
            ms.changeData1(msdata, saveDaya, "MaxHP");  //生命上限
            ms.changeData1(msdata, saveDaya, "MaxMP");  //魔法上限
            ms.changeData1(msdata, saveDaya, "PADamage");   //物理攻击力
            ms.changeData1(msdata, saveDaya, "MADamage");   //魔法攻击力
            ms.changeData1(msdata, saveDaya, "PDDamage");   //物理防御力
            ms.changeData1(msdata, saveDaya, "MDDamage");   //魔法防御力
            ms.changeData1(msdata, saveDaya, "Accurate");   //命中率
            ms.changeData1(msdata, saveDaya, "Evasion");    //闪避率
            ms.changeData1(msdata, saveDaya, "CriticalRate");   //暴击率
            ms.changeData1(msdata, saveDaya, "CriticalDamageMax");  //最大暴击伤害     (暂时不用)
            ms.changeData1(msdata, saveDaya, "CriticalDamageMin");  //最小暴击伤害     (暂时不用)
            ms.changeData1(msdata, saveDaya, "Mastery");    //熟练度     (暂时为100)
            ms.changeData1(msdata, saveDaya, "DamageRate"); //伤害加成     (暂时不用)
            ms.changeData1(msdata, saveDaya, "BossDamageRate"); //Boss伤害加成     (暂时不用)
            ms.changeData1(msdata, saveDaya, "AttackSpeed");    //攻击速度
            ms.changeData1(msdata, saveDaya, "WalkSpeed");  //移动速度
        }
    }

    export function changeData1(msdata:any, saveDaya:any, key:string) : void {
        if(saveDaya[key]) {
            if(saveDaya[key].aBuffRate) msdata[key].aBuffRate = saveDaya[key].aBuffRate;
            if(saveDaya[key].baseVal) msdata[key].baseVal = saveDaya[key].baseVal;
            if(saveDaya[key].buffAdd) msdata[key].buffAdd = saveDaya[key].buffAdd;
            if(saveDaya[key].gearAdd) msdata[key].gearAdd = saveDaya[key].gearAdd;
            // if(saveDaya[key].totalMax) msdata[key].totalMax = saveDaya[key].totalMax;
            //pBuffRate: number = 0;  //被动buff百分比
        }
    }


    export var sendNum:number = 1;
    export function delaySave() : void {

    }
    export function saveServer(force:boolean = false) : void {
        // return ;
        //防止修改内存
        if( (msMoudle.test_jinbi - msMoudle.test_rnk) != ms.jinbi()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_rongyu - msMoudle.test_rnk) != ms.rongyu()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_zuanshi - msMoudle.test_rnk) != ms.zuanshi()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_jifen - msMoudle.test_rnk) != ms.jifen()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_cailiao1 - msMoudle.test_rnk) != ms.cailiao1()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_cailiao2 - msMoudle.test_rnk) != ms.cailiao2()) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_juexing1 - msMoudle.test_rnk) != ms.juexing1()) {
            ms.herodata = null;
            return ;
        }
        ////
        if( (msMoudle.test_lv - msMoudle.test_rnk) != ms.herodata.Lv) {
            ms.herodata = null;
            return ;
        }
        if( (msMoudle.test_zs - msMoudle.test_rnk) != ms.herodata.ZS) {
            ms.herodata = null;
            return ;
        }

        //神秘卷轴
            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                if(ms.herodata.BagSlots[i].id == "2040599") {
                    if(msMoudle.test_shenmi - msMoudle.test_rnk != ms.herodata.BagSlots[i].num) {
                        ms.herodata = null;
                        // console.log(msMoudle.test_shenmi,msMoudle.test_rnk,ms.herodata.BagSlots[i].num)
                        return ;
                    }
                }
            }

            let herodata:any = new Object();
            herodata.m_job = ms.m_job;
            // herodata.rocker_type = ms.rocker_type;
            herodata.lastmap = ms.lastmap;
            herodata.m_tg = ms.m_tg;
            herodata.ajb = ms.ajb;
            herodata.ary = ms.ary;
            herodata.azs = ms.azs;
            herodata.ajf = ms.ajf;
            herodata.asm = ms.asm;
            // herodata.asucc = ms.asucc;
            // herodata.afail = ms.afail;
            herodata.acz = ms.acz;

            herodata.test_guanka = ms.test_guanka;
            // herodata.test_fuben = ms.test_fuben;
            herodata.test_lingzhu = ms.test_lingzhu;
            // herodata.test_pvp = ms.test_pvp;
            herodata.test_boss = ms.test_boss;
            herodata.test_nvshen = ms.test_nvshen;
            herodata.test_sishen = ms.test_sishen;
            herodata.test_cz = ms.test_cz;
            herodata.test_sk = ms.test_sk;
            herodata.test_dj = ms.test_dj;
            herodata.max_atk = ms.max_atk;
            herodata.max_str = ms.max_str;
            herodata.max_dex = ms.max_dex;
            herodata.max_luk = ms.max_luk;
            herodata.max_int = ms.max_int;
            herodata.max_nvshen = ms.max_nvshen;
            herodata.max_sishen = ms.max_sishen;

            herodata.test_url = ms.test_url;
            herodata.test_g = ms.test_g;
            herodata.test_ly = ms.test_ly;
            herodata.test_qq = ms.test_qq;

            herodata.allTime = ms.allTime;
            // herodata.tBagsArr = ms.tBagsArr;
            herodata.tBagsArr = [];         //道具不存储
            herodata.QuestId = ms.QuestId;
            herodata.QuestStep = ms.QuestStep;
            herodata.tQuests = ms.tQuests;

            herodata.testweapon = ms.testweapon;
            herodata.testfweapon = ms.testfweapon;
            herodata.testcap = ms.testcap;
            herodata.testlongcoat = ms.testlongcoat;
            herodata.testname = ms.testname;
            herodata.user = ms.user;
            herodata.password = ms.password;
            herodata.password2 = ms.password2;
            //对象不支持
            // console.log(ms.otherherodata)
            herodata.herodata = this.jiamiSave(ms.herodata);
            herodata.otherherodata = [];
            if(ms.otherherodata) {
                for(let i:number = 0; i < ms.otherherodata.length; i++) {
                    herodata.otherherodata[i] = this.jiamiSave(ms.otherherodata[i], false);
                }
            }
            herodata.otherheroservedata = [];
            if(ms.otherheroservedata) {
                for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                    herodata.otherheroservedata[i] = this.jiamiSave(ms.otherheroservedata[i], false);
                }
            }
            // herodata.herodata = ms.herodata;
            // herodata.otherherodata = ms.otherherodata;
            // herodata.otherheroservedata = ms.otherheroservedata;

            herodata.story = ms.story;
            herodata.firstHero = ms.firstHero;
            herodata.task = ms.task;
            herodata.zhaomu = ms.zhaomu;
            herodata.boss = ms.boss;
            herodata.skill = ms.skill;
            herodata.hecheng = ms.hecheng;
            herodata.team = ms.team;
            herodata.yingxiong = ms.yingxiong;
            // herodata.pvp = ms.pvp;
            // herodata.renku = ms.renku;
            herodata.fuli = ms.fuli;
            herodata.qiandao = ms.qiandao;
            herodata.is_qiandao = ms.is_qiandao;
            // herodata.pvp_note = ms.pvp_note;
            // herodata.pvp_reweard = ms.pvp_reweard;
            herodata.zhuanpan = ms.zhuanpan;
            herodata.miwu = ms.miwu;
            herodata.tiaotiao = ms.tiaotiao;
            herodata.xiangzi = ms.xiangzi;
            herodata.zhuzhu = ms.zhuzhu;
            herodata.ban = ms.ban;
            herodata.czValue = ms.czValue;
            herodata.desFashion6 = ms.desFashion6;
            herodata.riqi = ms.riqi;
            herodata.stime = ms.stime;
            herodata.d600 = ms.d600;
            herodata.d601 = ms.d601;
            herodata.d602 = ms.d602;
            herodata.d603 = ms.d603;
            herodata.d604 = ms.d604;
            herodata.d605 = ms.d605;
            herodata.d606 = ms.d606;
            herodata.d607 = ms.d607;
            herodata.d608 = ms.d608;
            herodata.dboss1 = ms.dboss1;
            herodata.dboss2 = ms.dboss2;
            herodata.dboss3 = ms.dboss3;
            herodata.dboss4 = ms.dboss4;
            herodata.dayreward = ms.dayreward;
            herodata.daytotal = ms.daytotal;
            herodata.dayguaji = ms.dayguaji;
            // herodata.dayfuben = ms.dayfuben;

            herodata.market = ms.market;
            herodata.strWood = ms.strWood;
            // herodata.jinbi = Math.floor(ms.jinbi());
            // herodata.rongyu = Math.floor(ms.rongyu());
            // herodata.zuanshi = Math.floor(ms.zuanshi());
            // herodata.jifen = Math.floor(ms.jifen());
            // herodata.cailiao1 = Math.floor(ms.cailiao1());
            // herodata.cailiao2 = Math.floor(ms.cailiao2());
            // herodata.juexing1 = Math.floor(ms.juexing1());
            // herodata.juexing2 = Math.floor(ms.juexing2);

            herodata.numberEff = ms.numberEff;

            herodata.zsly = ms.zsly;
            herodata.zsxh = ms.zsxh;
            herodata.shops = ms.shops;

            herodata.jc_cal = ms.jc_cal;


            herodata.jyly = ms.jyly;
            herodata.jyxh = ms.jyxh;

            herodata.ryly = ms.ryly;
            herodata.ryxh = ms.ryxh;
            herodata.jbly = ms.jbly;
            herodata.jbxh = ms.jbxh;
            herodata.clly = ms.clly;
            herodata.clxh = ms.clxh;
            herodata.czly = ms.czly;

            herodata.ch = ms.ch;
            herodata.ip = ms.ip;

            herodata.zy100 = ms.zy100;
            herodata.zy160 = ms.zy160;
            herodata.zy200 = ms.zy200;
            herodata.chouka = ms.chouka;
            // herodata.huoli = ms.huoli;
            herodata.error = ms.error;
            herodata.Exp2 = ms.Exp2;
            herodata.Exp3 = ms.Exp3;
            herodata.Exp10 = ms.Exp10;
            herodata.Exp100 = ms.Exp100;
            herodata.zhihuan = ms.zhihuan;


            // herodata.ssjh = ms.ssjh;
            // herodata.lhs = ms.lhs;
            // herodata.qinglong = ms.qinglong;
            // herodata.baihu = ms.baihu;
            // herodata.xuanwu = ms.xuanwu;
            // herodata.zhuque = ms.zhuque;

            herodata.speed = ms.speed;
            herodata.sp = ms.sp;
            herodata.shuxing = ms.shuxing;
            herodata.wanfabag = ms.wanfabag;
            herodata.wear_skill = ms.wear_skill;
            herodata.have_skill = ms.have_skill;
            herodata.guide_index = ms.guide_index;
            herodata.guide_ok = ms.guide_ok;
            herodata.tamingmob = ms.tamingmob;
            herodata.pet = ms.pet;
            herodata.fashion = ms.fashion;
            herodata.ring = ms.ring;
            herodata.chair = ms.chair;

            herodata.hairList = ms.hairList;
            herodata.selhair = ms.selhair;
            herodata.bodyList = ms.bodyList;
            herodata.selbody = ms.selbody;
            herodata.faceList = ms.faceList;
            herodata.selface = ms.selface;
            herodata.selHero = ms.selHero;
            herodata.tiaogk = ms.tiaogk;
            herodata.bagsdata = ms.bagsdata;
            herodata.petbagsdata = ms.petbagsdata;
            herodata.fashionbagsdata = ms.fashionbagsdata;
            herodata.tamingmobbagsdata = ms.tamingmobbagsdata;
            herodata.ringbagsdata = ms.ringbagsdata;
            herodata.chairbagsdata = ms.chairbagsdata;
            herodata.equitsdata = ms.equitsdata;
            herodata.skillsdata = ms.skillsdata;
            herodata.herosdata = ms.herosdata;
            herodata.use_skill = ms.use_skill;
            herodata.tasksdata = ms.tasksdata;
            herodata.lasttask = ms.lasttask;
            herodata.killmobsdata = ms.killmobsdata;
            herodata.killAll = ms.killAll;

            herodata.guanka = ms.guanka;
            herodata.cur_guanka = ms.cur_guanka;
            herodata.bossguanka = ms.bossguanka;
            herodata.cur_bossguanka = ms.cur_bossguanka;
            herodata.fuben = ms.fuben;
            herodata.cur_fuben = ms.cur_fuben;
            // herodata.pvplv = ms.pvplv;
            // herodata.pvpnandu = ms.pvpnandu;
            // herodata.pvpguanka = ms.pvpguanka;
            // herodata.pvpTeam = ms.pvpTeam;

            let Max_Time = 36000;
            if(msMoudle.guaji == false) msMoudle.server_time++;
            // if(msMoudle.server_time >= Max_Time) {
            //     msMoudle.toast2("环境不正常/当前处于VPN环境，请下线！");
            //     return ;
            // }

            let message:any = new Net.Message();
            message.msdata = JSON.stringify(herodata);
            message.clienttime = msMoudle.server_time;     //客户端时间
            var date = new Date();
            var ___ttt = date.getTime();
            var ___ = 55;
            var ____ = Number(Math.round(___ttt/10000) % 1000);
            var _1 = (____ * ____ + ___ * ___ + ____ * ___ + 10 * ____ + 100 * ____);
            var _2 = _1.toString();
            var _3 = "";
            for(var j = _2.length - 1; j >= 0; j--) _3 += _2[j];
            var _4 = Math.round((Number(_3) + 98765) / 1000) + 333;
            // console.log("时间", ____, ___, _1, _4)
            //
            message.xieyi = (103 + ms._dpip);
            //关键是如何防止某一次的
            message.gtime = ___ttt + "_" + (_4);          //外挂校验          //防止脱机挂

            //挂逼
            if(ms.test_g) {
                ms.herodata = null;
                return ;
            }

            let jobNum = 0;
            for(let i:number = 0; i < ms.m_job.length; i++) if(ms.m_job[i] != "") jobNum++;

            //点击记录
            // let bl = Number((msMoudle.lastTxyAll_bt / msMoudle.lastTxyAll) * 100).toFixed(2) + "%";
            // + "_" + msMoudle.lastTxyAll + "_" + bl
            message.touch = msMoudle.m_title + "_" + ms.jinbi() + "/" + ms.rongyu() + "/" + ms.zuanshi() + "_" + ms.acz + "/" + ms.test_cz + "_" + ms.test_sk + "/" + jobNum + "_" + msMoudle.daili;      //防止按键精灵
            //封号状态
            message.gjcf = 1;
            // msMoudle.toast("xxxx" + ms.error);
            if(ms.error > 105) message.gjcf = 2;            //这样无法避免双开(客户端需要加一个挂机判定，多久无操作就卡死)

            msMoudle.wsocket.sendFastMsg({param: message, success:(data: any) => {
                // console.log("保存数据");
            }});
            //存储

            if(ms.ch == false) {
                //技能抑制长时间挂机，又能抑制加速
                if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id) && msMoudle.guaji == false) {
                    if(msMoudle.server_time > 0 && (msMoudle.server_time % 400 == 0)) {//400
                        msMoudle.check_auto == true;
                        ui.show(app.zhaomu.guaDlg, {black:true});
                    }
                }
            }
    }

    export function jiamiSave(msdata:any, isChar:boolean = true) : any {
        // console.log(msdata);
        let data:any = new Object();
        data.id = msdata.id;                //英雄表id
        data.openid = msdata.openid;        //英雄唯一id
        // data.head = msdata.head;            //头像
        data.juexing = msdata.juexing;      //觉醒状态 .
        data.star = msdata.star;            //星级
        data.pinzhi = msdata.pinzhi;        //品质
        data.state = msdata.state;          //是否上阵
        data.Job = msdata.Job;              ////职业
        if(isChar) {
            data.tJobs = msdata.tJobs;          //可转职业
            data.pJobs = msdata.pJobs;          //可转职业第几转
            data.XL = msdata.XL;                //修炼
            // data.XunL = msdata.XunL;
            data.ZS = msdata.ZS;                //转生次数
            data.LH = msdata.LH;
        }
        data.Lv = msdata.Lv;                //等级
        data.Exp = msdata.Exp;              //等级
        data.Name = msdata.Name;            //名称
        data.Sex = msdata.Sex;               //性别
        data.Skill_1 = msdata.Skill_1;      //佩戴技能1
        data.Skill_2 = msdata.Skill_2;      //佩戴技能2
        data.Skill_3 = msdata.Skill_3;      //佩戴技能3
        data.Skill_4 = msdata.Skill_4;      //佩戴技能4
        let Str = ms.savesx(msdata.Str);
        if(Str) data.Str = Str;   //力量
        let Dex = ms.savesx(msdata.Dex);
        if(Dex) data.Dex = Dex;   //敏捷
        let Inte = ms.savesx(msdata.Inte);
        if(Inte) data.Inte = Inte; //智力
        let Luck = ms.savesx(msdata.Luck);
        if(Luck) data.Luck = Luck; //运气
        let MaxHP = ms.savesx(msdata.MaxHP);
        if(MaxHP) data.MaxHP = MaxHP;   //生命上限
        let MaxMP = ms.savesx(msdata.MaxMP);
        if(MaxMP) data.MaxMP = MaxMP;   //魔法上限
        let PADamage = ms.savesx(msdata.PADamage);
        if(PADamage) data.PADamage = PADamage; //物理攻击力
        let MADamage = ms.savesx(msdata.MADamage);
        if(MADamage) data.MADamage = MADamage; //魔法攻击力
        let PDDamage = ms.savesx(msdata.PDDamage);
        if(PDDamage) data.PDDamage = PDDamage; //物理防御力
        let MDDamage = ms.savesx(msdata.MDDamage);
        if(MDDamage) data.MDDamage = MDDamage; //魔法防御力
        let Accurate = ms.savesx(msdata.Accurate);
        if(Accurate) data.Accurate = Accurate; //命中率
        let Evasion = ms.savesx(msdata.Evasion);
        if(Evasion) data.Evasion = Evasion;   //闪避率
        let CriticalRate = ms.savesx(msdata.CriticalRate);
        if(CriticalRate) data.CriticalRate = CriticalRate; //暴击率
        let CriticalDamageMax = ms.savesx(msdata.CriticalDamageMax);
        if(CriticalDamageMax) data.CriticalDamageMax = CriticalDamageMax;   //最大暴击伤害     (暂时不用)
        let CriticalDamageMin = ms.savesx(msdata.CriticalDamageMin);
        if(CriticalDamageMin) data.CriticalDamageMin = CriticalDamageMin;   //最小暴击伤害     (暂时不用)
        let Mastery = ms.savesx(msdata.Mastery);
        if(Mastery) data.Mastery = Mastery;                       //熟练度     (暂时为100)
        let DamageRate = ms.savesx(msdata.DamageRate);
        if(DamageRate) data.DamageRate = DamageRate;                 //伤害加成     (暂时不用)
        let BossDamageRate = ms.savesx(msdata.BossDamageRate);
        if(BossDamageRate) data.BossDamageRate = BossDamageRate;         //Boss伤害加成     (暂时不用)
        let AttackSpeed = ms.savesx(msdata.AttackSpeed);
        if(AttackSpeed) data.AttackSpeed = AttackSpeed;               //攻击速度
        let WalkSpeed = ms.savesx(msdata.WalkSpeed);
        if(WalkSpeed) data.WalkSpeed = WalkSpeed;                   //移动速度
        if(isChar) {
            data.EquipSlots = [];//装备
            if(msdata.EquipSlots) {
                for(let i:number = 0; i < msdata.EquipSlots.length; i++) {
                    if(msdata.EquipSlots[i]) {
                        data.EquipSlots[i] = ms.savezb(msdata.EquipSlots[i]);
                    }
                }
            }
            data.BagSlots = [];//背包
            if(msdata.BagSlots) {
                for(let i:number = 0; i < msdata.BagSlots.length; i++) {
                    if(msdata.BagSlots[i]) {
                        data.BagSlots[i] = ms.savezb(msdata.BagSlots[i]);
                    }
                }
                //背包容量最大100
                if(msdata.BagSlots.length > msMoudle.BAGMAX) msdata.BagSlots.length = msMoudle.BAGMAX;
            }
            /////新增背包
            // let mslots:Array<any> = [
            //     msdata.EquipSlots2,
            //     msdata.EquipSlots3,
            //     msdata.EquipSlots4,
            //     msdata.EquipSlots5,
            //     msdata.EquipSlots6,
            //     msdata.EquipSlots7,
            //     msdata.EquipSlots8,
            //     msdata.EquipSlots9,
            //     msdata.EquipSlots10,
            //     msdata.EquipSlots11,
            //     msdata.EquipSlots12,
            //     msdata.EquipSlots13,
            //     msdata.EquipSlots14,
            //     msdata.EquipSlots15,
            //     msdata.EquipSlots16,
            //     msdata.EquipSlots17,
            //     msdata.EquipSlots18,
            //     msdata.EquipSlots19,
            //     msdata.EquipSlots20,
            //     msdata.EquipSlots21,
            //     msdata.EquipSlots22,
            //     msdata.EquipSlots23,
            //     msdata.EquipSlots24,
            //     msdata.EquipSlots25,
            //     msdata.EquipSlots26,
            //     msdata.EquipSlots27,
            //     msdata.EquipSlots28,
            //     msdata.EquipSlots29,
            //     msdata.EquipSlots30,
            //     msdata.EquipSlots31,
            //     msdata.EquipSlots32,
            //     msdata.EquipSlots33,
            //     msdata.EquipSlots34,
            //     msdata.EquipSlots35,
            //     msdata.EquipSlots36,
            //     msdata.EquipSlots37,
            //     msdata.EquipSlots38,
            //     msdata.EquipSlots39,
            //     msdata.EquipSlots40,
            //     msdata.EquipSlots41,
            //     msdata.EquipSlots42
            // ];
            // data.EquipSlots2 = [];
            // data.EquipSlots3 = [];
            // data.EquipSlots4 = [];
            // data.EquipSlots5 = [];
            // data.EquipSlots6 = [];
            // data.EquipSlots7 = [];
            // data.EquipSlots8 = [];
            // data.EquipSlots9 = [];
            // data.EquipSlots10 = [];
            // data.EquipSlots11 = [];
            // data.EquipSlots12 = [];
            // data.EquipSlots13 = [];
            // data.EquipSlots14 = [];
            // data.EquipSlots15 = [];
            // data.EquipSlots16 = [];
            // data.EquipSlots17 = [];
            // data.EquipSlots18 = [];
            // data.EquipSlots19 = [];
            // data.EquipSlots20 = [];
            // data.EquipSlots21 = [];
            // data.EquipSlots22 = [];
            // data.EquipSlots23 = [];
            // data.EquipSlots24 = [];
            // data.EquipSlots25 = [];
            // data.EquipSlots26 = [];
            // data.EquipSlots27 = [];
            // data.EquipSlots28 = [];
            // data.EquipSlots29 = [];
            // data.EquipSlots30 = [];
            // data.EquipSlots31 = [];
            // data.EquipSlots32 = [];
            // data.EquipSlots33 = [];
            // data.EquipSlots34 = [];
            // data.EquipSlots35 = [];
            // data.EquipSlots36 = [];
            // data.EquipSlots37 = [];
            // data.EquipSlots38 = [];
            // data.EquipSlots39 = [];
            // data.EquipSlots40 = [];
            // data.EquipSlots41 = [];
            // data.EquipSlots42 = [];
            // let eslots:Array<any> = [
            //     data.EquipSlots2,
            //     data.EquipSlots3,
            //     data.EquipSlots4,
            //     data.EquipSlots5,
            //     data.EquipSlots6,
            //     data.EquipSlots7,
            //     data.EquipSlots8,
            //     data.EquipSlots9,
            //     data.EquipSlots10,
            //     data.EquipSlots11,
            //     data.EquipSlots12,
            //     data.EquipSlots13,
            //     data.EquipSlots14,
            //     data.EquipSlots15,
            //     data.EquipSlots16,
            //     data.EquipSlots17,
            //     data.EquipSlots18,
            //     data.EquipSlots19,
            //     data.EquipSlots20,
            //     data.EquipSlots21,
            //     data.EquipSlots22,
            //     data.EquipSlots23,
            //     data.EquipSlots24,
            //     data.EquipSlots25,
            //     data.EquipSlots26,
            //     data.EquipSlots27,
            //     data.EquipSlots28,
            //     data.EquipSlots29,
            //     data.EquipSlots30,
            //     data.EquipSlots31,
            //     data.EquipSlots32,
            //     data.EquipSlots33,
            //     data.EquipSlots34,
            //     data.EquipSlots35,
            //     data.EquipSlots36,
            //     data.EquipSlots37,
            //     data.EquipSlots38,
            //     data.EquipSlots39,
            //     data.EquipSlots40,
            //     data.EquipSlots41,
            //     data.EquipSlots42
            // ];

            // data.FlionSlots = [];
            // for(let _:number = 0; _ < mslots.length; _++) {
            //     data.FlionSlots[_] = new Array();
            //     if(mslots[_]) {
            //         for(let i:number = 0; i < mslots[_].length; i++) {
            //             if(mslots[_][i]) {
            //                 data.FlionSlots[_][i] = new Object();
            //                 data.FlionSlots[_][i].openid = mslots[_][i].openid;
            //                 data.FlionSlots[_][i].id = mslots[_][i].id;
            //                 // console.log(mslots[_])
            //                 // eslots[_][i] = ms.savezb(mslots[_][i], false);
            //             }
            //         }
            //     }
            //     console.log(data.FlionSlots);
            // }

            if(msdata.FlionSlots) data.FlionSlots = msdata.FlionSlots;
            // console.log(data.FlionSlots);

            data.BagSlots2 = [];//背包
            if(msdata.BagSlots2) {
                for(let i:number = 0; i < msdata.BagSlots2.length; i++) {
                    if(msdata.BagSlots2[i]) {
                        data.BagSlots2[i] = ms.savezb(msdata.BagSlots2[i], false);
                    }
                }
            }
        }
        return data;
    }

    export function jiemiSave() : void {

    }

    //属性
    export function savesx(a:any) : any {
        // console.log(a)
        let b:any = null;
        if(a) {
            if(a.aBuffRate > 0) {
                if(!b) b = new Object();
                b.aBuffRate = a.aBuffRate;
            }
            if(a.baseVal > 0) {
                if(!b) b = new Object();
                b.baseVal = a.baseVal;
            }
            if(a.buffAdd > 0) {
                if(!b) b = new Object();
                b.buffAdd = a.buffAdd;
            }
            if(a.gearAdd > 0) {
                if(!b) b = new Object();
                b.gearAdd = a.gearAdd;
            }
            if(a.pBuffRate > 0) {
                if(!b) b = new Object();
                b.pBuffRate = a.pBuffRate;
            }
        }
        // if(a.totalMax > 0) b.totalMax = a.totalMax;
        return b;
    }
    //装备
    export function savezb(a:any, flag:boolean = true) : any {
        // console.log(a)
        let b:any = new Object();
        b.openid = a.openid;            //装备唯一id
        b.id = a.id;                    //装备路径id
        b.type = a.type;                //装备类型
        b.part = a.part;                //槽位
        b.suc = a.suc;                  //已成功强化次数
        b.tuc = a.tuc;                  //卷轴次数
        b.reqLevel = a.reqLevel;        //需求等级
        b.price = a.price;              //价格
        b.sfx = a.sfx;                  //weapon类型
        b.num = a.num;                  //数量
        b.suo = a.suo;
        if(flag) {
            b.succlst = a.succlst;
            b.succM = a.succM;
        }
        // b.faillst = a.faillst;
        if(flag) {
            let Str = ms.savesx(a.Str);
            if(Str) b.Str = Str;   //力量
            let Dex = ms.savesx(a.Dex);
            if(Dex) b.Dex = Dex;   //敏捷
            let Inte = ms.savesx(a.Inte);
            if(Inte) b.Inte = Inte; //智力
            let Luck = ms.savesx(a.Luck);
            if(Luck) b.Luck = Luck; //运气
            let MaxHP = ms.savesx(a.MaxHP);
            if(MaxHP) b.MaxHP = MaxHP;   //生命上限
            let MaxMP = ms.savesx(a.MaxMP);
            if(MaxMP) b.MaxMP = MaxMP;   //魔法上限
            let PADamage = ms.savesx(a.PADamage);
            if(PADamage) b.PADamage = PADamage; //物理攻击力
            let MADamage = ms.savesx(a.MADamage);
            if(MADamage) b.MADamage = MADamage; //魔法攻击力
            let PDDamage = ms.savesx(a.PDDamage);
            if(PDDamage) b.PDDamage = PDDamage; //物理防御力
            let MDDamage = ms.savesx(a.MDDamage);
            if(MDDamage) b.MDDamage = MDDamage; //魔法防御力
            let Accurate = ms.savesx(a.Accurate);
            if(Accurate) b.Accurate = Accurate; //命中率
            let Evasion = ms.savesx(a.Evasion);
            if(Evasion) b.Evasion = Evasion;   //闪避率
            let CriticalRate = ms.savesx(a.CriticalRate);
            if(CriticalRate) b.CriticalRate = CriticalRate; //暴击率
            let CriticalDamageMax = ms.savesx(a.CriticalDamageMax);
            if(CriticalDamageMax) b.CriticalDamageMax = CriticalDamageMax;   //最大暴击伤害     (暂时不用)
            let CriticalDamageMin = ms.savesx(a.CriticalDamageMin);
            if(CriticalDamageMin) b.CriticalDamageMin = CriticalDamageMin;   //最小暴击伤害     (暂时不用)
            let Mastery = ms.savesx(a.Mastery);
            if(Mastery) b.Mastery = Mastery;                       //熟练度     (暂时为100)
            let DamageRate = ms.savesx(a.DamageRate);
            if(DamageRate) b.DamageRate = DamageRate;                 //伤害加成     (暂时不用)
            let BossDamageRate = ms.savesx(a.BossDamageRate);
            if(BossDamageRate) b.BossDamageRate = BossDamageRate;         //Boss伤害加成     (暂时不用)
            let AttackSpeed = ms.savesx(a.AttackSpeed);
            if(AttackSpeed) b.AttackSpeed = AttackSpeed;               //攻击速度
            let WalkSpeed = ms.savesx(a.WalkSpeed);
            if(WalkSpeed) b.WalkSpeed = WalkSpeed;                   //移动速度
        }
        return b;
    }

    ////顶级130级
    //因为怪物的伤害和攻击力的平方成正比
    //另外角色在不同等级 有不同的标准防御
    //如果自身防御少于这个数值，怪物打你会有附加伤害的
    /*
    计算公式:
①   初始伤害:   随机数 (0.8~0.85)*怪物攻击力^2/100
这个不解释…事实上大多数触碰伤害都接近这个数字….
②   基于角色物理防御的减伤计算
       定义 num   (一个常用系数 后面会频繁用到)
如果职业为战士,
        Num=str*2/7+dex/4+inte/9+luk/4
如果是其他职业,
        Num=str*2/5+dex*2/7+inte/9+luk/4
    Num=(int)Num     //把这个数取整…
⒈如果 自身防御 >= 标准防御 那么
修正值=(level/1300+Num/900+0.28)*(def-PDD)*0.7 + (Num/800+0.28)*def
⒉如果 def<PDD   但是 level<moblvl   那么
修正值=(level/550+Num/800+0.28)*(def-PDD)*1.3+(Num/800+0.28)*def
⒊其他情况 def<PDD 且 level>=moblvl 那么
修正值=(level/550+Num/800+0.28)* (def-PDD)*13/(level-moblv+13l) + (Num/800+0.28)*def
③   实际触碰伤害=(初始伤害-修正值)*(1-value)   最后取整   如果小于1的话以1计算
④   关于标准物理防御:PDD,这个数值是通过base.wz\standardPDD.img提取获得的 按照不同职业不同等级段都有不同的值 下面列表…
    */
}