import View = laya.ui.View;
import BaseView = ui.BaseView;
import BaseDialog = ui.BaseDialog;
import CellView = ui.CellView;
import ListView = ui.ListView;


module ui.battle {
    
    export interface IaddTeamDlgUI {
        onLstYingXiongCellClick(e: Laya.Event, index: number): void;
        onBtn_closeClick(e: Laya.Event): void;
        onBtnFightClick(e: Laya.Event): void;
        
    }
    export class addTeamDlgUI extends BaseDialog {
        
        public lstYingXiong: ListView;
        public cc: Laya.Label;
        public _pro: Laya.ProgressBar;
        public _proText: Laya.Label;
        public btn_close: Laya.Image;
        public btnFight: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":480,"height":320},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"event/Delivery.Send_Info.backgrnd.png","height":320},"child":[{"type":"Image","props":{"y":47,"x":9,"width":462,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":266}}]},{"type":"ListView","props":{"y":53,"x":70,"width":340,"var":"lstYingXiong","height":180},"child":[{"type":"addTeamItem","props":{"runtime":"app.battle.addTeamItem","name":"render"}}]},{"type":"Image","props":{"y":12,"x":143,"skin":"common/xzyszdyx.png"}},{"type":"Label","props":{"visible":false,"var":"cc"}},{"type":"ProgressBar","props":{"y":242,"x":75,"width":330,"var":"_pro","value":1,"skin":"homeland/p.png","sizeGrid":"10,10,10,10","height":20},"child":[{"type":"Label","props":{"y":3,"x":147,"var":"_proText","text":"0/5","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#ffffff","centerY":0,"centerX":0}},{"type":"Label","props":{"width":60,"text":"已上阵","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#ffffff","centerY":-1,"centerX":-194,"align":"right"}}]},{"type":"Image","props":{"y":24,"x":453,"var":"btn_close","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":269,"x":195,"width":90,"var":"btnFight","skin":"homeland/character_title_7.png","height":35},"child":[{"type":"Label","props":{"y":7,"x":25,"text":"确定","fontSize":20,"color":"#FFFFFF"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.addTeamItem"] = app.battle.addTeamItem;
            super.createChildren();
            this.createView(ui.battle.addTeamDlgUI.uiView);
            this.registerEvents({"lstYingXiong":["cellClick"],"btn_close":["click"],"btnFight":["click"]});
        }
    }
}

module ui.battle {
    
    export class addTeamItemUI extends CellView {
        
        public bg: Laya.Image;
        public pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public cc: Laya.Image;
        public _star: Laya.Image;
        public _starNum: Laya.Label;
        public isjuexing: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":84,"height":95},"child":[{"type":"Image","props":{"var":"bg"},"child":[{"type":"Image","props":{"y":-1,"x":1,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":88,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":4,"width":75,"var":"pinzhi","skin":"homeland/img_pingzhikuang5.png","height":70},"child":[{"type":"Image","props":{"y":6,"x":8,"width":60,"var":"_img","height":60},"child":[{"type":"Image","props":{"y":60,"x":-16,"width":90,"skin":"homeland/img_mingchengdi.png","height":18},"child":[{"type":"Label","props":{"y":2,"x":15,"var":"_name","text":"太阳神光介","fontSize":14,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Label","props":{"y":46,"x":15,"width":50,"var":"_lv","text":"Lv 1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#FFFFFF","centerX":10,"bold":true,"align":"right"}}]}]}]},{"type":"Image","props":{"y":11,"x":15,"width":30,"var":"cc","skin":"homeland/img_xuanzhongduihao.png","height":30}},{"type":"Image","props":{"y":3,"x":51,"width":26,"var":"_star","skin":"homeland/img_star_1.png","height":26},"child":[{"type":"Label","props":{"y":6,"x":-12,"width":50,"var":"_starNum","text":"1","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Label","props":{"y":48,"x":-50,"width":26,"var":"isjuexing","text":"觉","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.addTeamItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IBattleEndDlgUI {
        onBtnCClick(e: Laya.Event): void;
        
    }
    export class BattleEndDlgUI extends BaseDialog {
        
        public btnC: Laya.Image;
        public effect: Laya.Image;
        public lblCountDown: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"mouseThrough":false,"height":600,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"btnC","height":600}},{"type":"Image","props":{"y":200,"x":268,"width":264,"var":"effect","skin":"homeland/txt_zhandoushibai.png","height":72}},{"type":"Label","props":{"y":300,"x":376,"var":"lblCountDown","text":"3秒","strokeColor":"#051204","stroke":3,"fontSize":30,"color":"#07ec47","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.BattleEndDlgUI.uiView);
            this.registerEvents({"btnC":["click"]});
        }
    }
}

module ui.battle {
    
    export interface IBattleRewardDlgUI {
        onBtnCClick(e: Laya.Event): void;
        onLstRewardCellClick(e: Laya.Event, index: number): void;
        
    }
    export class BattleRewardDlgUI extends BaseDialog {
        
        public btnC: Laya.Image;
        public effect: Laya.Image;
        public lstReward: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"mouseThrough":false,"height":600,"centerY":0,"centerX":0,"cacheAsBitmap":true},"child":[{"type":"Image","props":{"width":800,"var":"btnC","height":600}},{"type":"Image","props":{"y":285,"x":274,"width":251,"height":334},"child":[{"type":"Image","props":{"y":111,"x":61,"skin":"homeland/img_baoxiang10.png"}}]},{"type":"Image","props":{"y":67,"x":268,"width":264,"var":"effect","skin":"homeland/txt_zhandoushengli.png","height":72}},{"type":"ListView","props":{"y":195,"x":120,"width":570,"var":"lstReward","height":192},"child":[{"type":"rewardItem","props":{"runtime":"app.battle.rewardItem","name":"render"}}]},{"type":"Label","props":{"y":530,"x":250,"width":300,"text":"点击屏幕继续","strokeColor":"#051204","stroke":3,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":465,"x":543,"width":100,"visible":false,"text":"继续挑战","strokeColor":"#093799","stroke":2,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.rewardItem"] = app.battle.rewardItem;
            super.createChildren();
            this.createView(ui.battle.BattleRewardDlgUI.uiView);
            this.registerEvents({"btnC":["click"],"lstReward":["cellClick"]});
        }
    }
}

module ui.battle {
    
    export interface IbuyDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class buyDlgUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public content: Laya.Label;
        public tj1: Laya.Label;
        public tj2: Laya.Label;
        public tj3: Laya.Label;
        public tj4: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":206,"x":132,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":206,"x":252,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":65,"x":10,"wordWrap":true,"width":360,"var":"content","text":"花费500黑金开启该职业？","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}},{"type":"Label","props":{"y":8,"x":160,"text":"提示","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}},{"type":"Label","props":{"x":76,"wordWrap":true,"width":300,"var":"tj1","text":"100级可免费开启一个职业(0/1)","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#4750b0","centerY":-15,"bold":true,"align":"left"}},{"type":"Label","props":{"x":76,"wordWrap":true,"width":300,"var":"tj2","text":"160级可免费开启一个职业(0/1)","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#4750b0","centerY":6,"bold":true,"align":"left"}},{"type":"Label","props":{"x":76,"wordWrap":true,"width":300,"var":"tj3","text":"200级可免费开启一个职业(0/1)","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#4750b0","centerY":28,"bold":true,"align":"left"}},{"type":"Label","props":{"x":76,"wordWrap":true,"width":300,"var":"tj4","text":"5000积分可免费兑换一个职业(0)","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#4750b0","centerY":50,"bold":true,"align":"left"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.buyDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.battle {
    
    export class bwItemUI extends BaseView {
        
        public static uiView: any = {"type":"BaseView","props":{"width":205,"height":40}};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.bwItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IchooseDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class chooseDlgUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public content: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":206,"x":132,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":206,"x":252,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":107,"x":10,"wordWrap":true,"width":360,"var":"content","text":"是否切换当前职业?","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}},{"type":"Label","props":{"y":8,"x":160,"text":"提示","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.chooseDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.battle {
    
    export class csItemUI extends BaseView {
        
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":210,"height":40},"child":[{"type":"Label","props":{"y":14,"x":65,"width":130,"var":"_name","underline":true,"text":"返回村庄","strokeColor":"#FFFFFF","stroke":2,"fontSize":26,"color":"#b4901b","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":14,"x":240,"width":130,"var":"_lv","text":"100级","stroke":2,"fontSize":18,"color":"#2571c3","bold":true,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.csItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IGetHeroDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class GetHeroDlgUI extends BaseDialog {
        
        public btnC: BaseDialog;
        public bk: Laya.Image;
        public pinzhi: Laya.Label;
        public effect: Laya.Image;
        public btnBack: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"var":"btnC","mouseThrough":false,"height":600,"centerY":0,"centerX":0,"cacheAsBitmap":true},"child":[{"type":"Image","props":{"y":80,"x":274,"var":"bk","skin":"homeland/img_guang.png"},"child":[{"type":"Label","props":{"y":76,"x":75,"width":100,"var":"pinzhi","text":"SSR","strokeColor":"#e22522","stroke":3,"fontSize":40,"color":"#f9aa01","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":90,"x":268,"width":264,"var":"effect","skin":"homeland/btn_piaodai.png","height":72},"child":[{"type":"Label","props":{"y":23,"x":62,"width":140,"text":"召唤成功","strokeColor":"#051204","stroke":3,"fontSize":28,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":365,"x":400,"width":100,"var":"btnBack","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"确定","fontSize":20,"color":"#FFFFFF","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.GetHeroDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.battle {
    
    export interface IGetTenHeroDlgUI {
        onBtnCClick(e: Laya.Event): void;
        
    }
    export class GetTenHeroDlgUI extends BaseDialog {
        
        public bk: Laya.Image;
        public shan: Laya.Image;
        public pinzhi: Laya.Label;
        public ryj: Laya.Label;
        public effect: Laya.Image;
        public s1: Laya.Image;
        public pz1: Laya.Image;
        public img1: Laya.Image;
        public s2: Laya.Image;
        public pz2: Laya.Image;
        public img2: Laya.Image;
        public s3: Laya.Image;
        public pz3: Laya.Image;
        public img3: Laya.Image;
        public s4: Laya.Image;
        public pz4: Laya.Image;
        public img4: Laya.Image;
        public s5: Laya.Image;
        public pz5: Laya.Image;
        public img5: Laya.Image;
        public s6: Laya.Image;
        public pz6: Laya.Image;
        public img6: Laya.Image;
        public s7: Laya.Image;
        public pz7: Laya.Image;
        public img7: Laya.Image;
        public s8: Laya.Image;
        public pz8: Laya.Image;
        public img8: Laya.Image;
        public s9: Laya.Image;
        public pz9: Laya.Image;
        public img9: Laya.Image;
        public s10: Laya.Image;
        public pz10: Laya.Image;
        public img10: Laya.Image;
        public btnC: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"mouseThrough":false,"height":600,"centerY":0,"centerX":0,"cacheAsBitmap":true},"child":[{"type":"Image","props":{"y":80,"x":274,"width":251,"var":"bk","height":334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"shan","skin":"homeland/img_guang.png"}},{"type":"Label","props":{"y":76,"x":75,"width":100,"var":"pinzhi","text":"SSR","strokeColor":"#e22522","stroke":3,"fontSize":40,"color":"#f9aa01","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":555,"x":250,"width":300,"visible":false,"var":"ryj","text":"点击屏幕继续","strokeColor":"#051204","stroke":3,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":90,"x":268,"width":264,"var":"effect","skin":"homeland/btn_piaodai.png","height":72},"child":[{"type":"Label","props":{"y":23,"x":62,"width":140,"text":"召唤成功","strokeColor":"#051204","stroke":3,"fontSize":28,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":355,"x":185,"width":66,"var":"s1","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"width":66,"var":"pz1","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img1","height":62}}]},{"type":"Image","props":{"y":355,"x":280,"width":66,"var":"s2","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz2","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img2","height":62}}]},{"type":"Image","props":{"y":355,"x":375,"width":66,"var":"s3","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz3","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img3","height":62}}]},{"type":"Image","props":{"y":355,"x":470,"width":66,"var":"s4","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz4","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img4","height":62}}]},{"type":"Image","props":{"y":355,"x":565,"width":66,"var":"s5","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz5","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img5","height":62}}]},{"type":"Image","props":{"y":455,"x":185,"width":66,"var":"s6","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz6","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img6","height":62}}]},{"type":"Image","props":{"y":455,"x":280,"width":66,"var":"s7","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz7","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img7","height":62}}]},{"type":"Image","props":{"y":455,"x":375,"width":66,"var":"s8","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz8","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img8","height":62}}]},{"type":"Image","props":{"y":455,"x":470,"width":66,"var":"s9","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz9","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img9","height":62}}]},{"type":"Image","props":{"y":455,"x":565,"width":66,"var":"s10","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66},"child":[{"type":"Image","props":{"y":0,"x":0,"width":66,"var":"pz10","skin":"homeland/img_pingzhikuang1.png","height":66}},{"type":"Image","props":{"y":2,"x":2,"width":62,"var":"img10","height":62}}]},{"type":"Button","props":{"y":565,"x":400,"width":100,"var":"btnC","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"确定","fontSize":20,"color":"#FFFFFF","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.GetTenHeroDlgUI.uiView);
            this.registerEvents({"btnC":["click"]});
        }
    }
}

module ui.battle {
    
    export interface Ihecheng2DlgUI {
        onBtn_closeClick(e: Laya.Event): void;
        onBtn_querenClick(e: Laya.Event): void;
        onBtn_quickClick(e: Laya.Event): void;
        onLstBagCellClick(e: Laya.Event, index: number): void;
        
    }
    export class hecheng2DlgUI extends BaseDialog {
        
        public btn_close: Laya.Image;
        public btn_queren: Laya.Image;
        public btn_quick: Laya.Image;
        public lstBag: ListView;
        public eff: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":480,"height":320},"child":[{"type":"Image","props":{"y":-2,"x":0,"width":480,"skin":"event/Delivery.Send_Info.backgrnd.png","height":323},"child":[{"type":"Image","props":{"y":30,"x":11,"width":460,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":280}}]},{"type":"Image","props":{"y":17,"x":460,"width":50,"var":"btn_close","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":5,"x":200,"text":"装备合成","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#227095","bold":true}},{"type":"Label","props":{"y":329,"x":0,"wordWrap":true,"width":480,"text":"选择任意2件装备，可合成一件随机等级之和范围内的装备\\n比如50级装备+100级装备可以随机出0～150级以内的装备","leading":10,"height":60,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":263,"x":135,"width":90,"var":"btn_queren","skin":"homeland/character_title_7.png","height":35},"child":[{"type":"Label","props":{"y":7,"x":25,"text":"合成","fontSize":20,"color":"#FFFFFF"}}]},{"type":"Image","props":{"y":263,"x":255,"width":90,"var":"btn_quick","skin":"homeland/character_title_7.png","height":35},"child":[{"type":"Label","props":{"y":7,"x":5,"text":"一键合成","fontSize":20,"color":"#FFFFFF"}}]},{"type":"ListView","props":{"y":40,"x":31,"width":418,"var":"lstBag","spaceY":2,"spaceX":2,"height":217},"child":[{"type":"bagItem3","props":{"runtime":"app.char.bagItem4","name":"render"}}]},{"type":"Image","props":{"y":160,"x":240,"var":"eff"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.bagItem4"] = app.char.bagItem4;
            super.createChildren();
            this.createView(ui.battle.hecheng2DlgUI.uiView);
            this.registerEvents({"btn_close":["click"],"btn_queren":["click"],"btn_quick":["click"],"lstBag":["cellClick"]});
        }
    }
}

module ui.battle {
    
    export interface IhechengDlgUI {
        onLstYuChengCellClick(e: Laya.Event, index: number): void;
        onBtn_closeClick(e: Laya.Event): void;
        onBtn_querenClick(e: Laya.Event): void;
        
    }
    export class hechengDlgUI extends BaseDialog {
        
        public lstYuCheng: ListView;
        public btn_close: Laya.Image;
        public btn_queren: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":480,"height":320},"child":[{"type":"Image","props":{"y":-2,"x":0,"width":480,"skin":"event/Delivery.Send_Info.backgrnd.png","height":323},"child":[{"type":"Image","props":{"y":30,"x":11,"width":460,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":280}}]},{"type":"ListView","props":{"y":55,"x":75,"width":330,"var":"lstYuCheng","height":185},"child":[{"type":"yuchengItem","props":{"runtime":"app.battle.yuchengItem","name":"render"}}]},{"type":"Image","props":{"y":17,"x":460,"width":50,"var":"btn_close","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":5,"x":200,"text":"英雄合成","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#227095","bold":true}},{"type":"Label","props":{"y":324,"x":-10,"wordWrap":true,"width":500,"text":"N卡灰色、R卡蓝色、SR卡绿色、SSR卡紫色、神卡橙色 ","leading":5,"fontSize":18,"color":"#FFFFFF","centerY":176,"bold":true,"align":"center"}},{"type":"Label","props":{"x":-250,"wordWrap":true,"width":480,"text":"合成配方\\n5个N卡合成1个R卡,100%成功\\n5个R卡合成1个SR卡,85%成功\\n5个SR卡合成1个SSR卡,55%成功\\n3个SSR卡合成1个神卡,20%成功","leading":5,"height":69,"fontSize":18,"color":"#FFFFFF","centerY":-260,"bold":true,"align":"left"}},{"type":"Image","props":{"y":255,"x":195,"width":90,"var":"btn_queren","skin":"homeland/character_title_7.png","height":35},"child":[{"type":"Label","props":{"y":7,"x":25,"text":"合成","fontSize":20,"color":"#FFFFFF"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.yuchengItem"] = app.battle.yuchengItem;
            super.createChildren();
            this.createView(ui.battle.hechengDlgUI.uiView);
            this.registerEvents({"lstYuCheng":["cellClick"],"btn_close":["click"],"btn_queren":["click"]});
        }
    }
}

module ui.battle {
    
    export interface ImoveDlgUI {
        onLstMoveCellClick(e: Laya.Event, index: number): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class moveDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public lstMove: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":480,"height":320},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"var":"bg","skin":"event/Delivery.Send_Info.backgrnd.png","height":320},"child":[{"type":"Image","props":{"y":45,"x":9,"width":461,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":270}},{"type":"Label","props":{"y":11,"x":115,"text":"你想移动到什么地方？","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"ListView","props":{"y":47,"x":20,"width":440,"var":"lstMove","height":255},"child":[{"type":"moveItem","props":{"runtime":"app.battle.moveItem","name":"render"}}]},{"type":"Image","props":{"y":24,"x":456,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.moveItem"] = app.battle.moveItem;
            super.createChildren();
            this.createView(ui.battle.moveDlgUI.uiView);
            this.registerEvents({"lstMove":["cellClick"],"btnBack":["click"]});
        }
    }
}

module ui.battle {
    
    export class moveItemUI extends CellView {
        
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public _time: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":110,"height":110},"child":[{"type":"Image","props":{"y":48,"x":55,"var":"_img","skin":"homeland/SlideMenu.0.BtMain.0.disabled.0.png","scaleY":2,"scaleX":2,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":87,"x":4,"width":100,"var":"_name","text":"伟大航路","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#2a2727","bold":true,"align":"center"}},{"type":"Label","props":{"y":62,"x":27,"width":60,"var":"_lv","text":"0级","strokeColor":"#FFFFFF","stroke":3,"fontSize":18,"color":"#8d1e1d","bold":true,"align":"right"}},{"type":"Label","props":{"y":15,"x":24,"width":60,"var":"_time","text":"0次","stroke":3,"fontSize":18,"color":"#07ec47","bold":true,"align":"left"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.moveItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IquestDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class questDlgUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public content: Laya.Label;
        public rwtxt: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":206,"x":132,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":206,"x":252,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"x":16,"wordWrap":true,"width":360,"var":"content","text":"使用25黑金扭蛋一次？","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","centerY":-48,"bold":true,"align":"center"}},{"type":"Label","props":{"y":94,"x":90,"wordWrap":true,"width":200,"text":"有几率获得以下道具：","strokeColor":"#FFFFFF","stroke":2,"leading":4,"fontSize":18,"color":"#842c16","centerY":-15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":8,"x":115,"text":"快乐百宝箱","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}},{"type":"Label","props":{"x":63,"wordWrap":true,"width":254,"text":"维泽特帽、阿丽莎之光辉、解放的凯瑟丽安、远古弓、神秘卷轴、百倍经验卡","strokeColor":"#FFFFFF","stroke":2,"leading":5,"height":69,"fontSize":18,"color":"#4750b0","centerY":34,"bold":true,"align":"center"}},{"type":"Label","props":{"y":260,"x":40,"width":300,"var":"rwtxt","fontSize":20,"color":"#07ec47","align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.questDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.battle {
    
    export interface IrewardDlgUI {
        onBtnCClick(e: Laya.Event): void;
        onLstRewardCellClick(e: Laya.Event, index: number): void;
        
    }
    export class rewardDlgUI extends BaseDialog {
        
        public btnC: Laya.Image;
        public lstReward: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"btnC","height":600}},{"type":"Image","props":{"y":285,"x":274,"width":251,"height":334},"child":[{"type":"Image","props":{"y":111,"x":61,"skin":"homeland/img_baoxiang10.png"}}]},{"type":"Image","props":{"y":67,"x":268,"width":264,"skin":"homeland/txt_gongxihuode.png","height":72}},{"type":"ListView","props":{"y":195,"x":120,"width":570,"var":"lstReward","height":192},"child":[{"type":"rewardItem","props":{"runtime":"app.battle.rewardItem","name":"render"}}]},{"type":"Label","props":{"y":530,"x":250,"width":300,"text":"点击屏幕继续","strokeColor":"#051204","stroke":3,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.rewardItem"] = app.battle.rewardItem;
            super.createChildren();
            this.createView(ui.battle.rewardDlgUI.uiView);
            this.registerEvents({"btnC":["click"],"lstReward":["cellClick"]});
        }
    }
}

module ui.battle {
    
    export class rewardItemUI extends CellView {
        
        public _pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _num: Laya.Label;
        public _name: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":95,"height":100},"child":[{"type":"Image","props":{"y":3,"x":4,"width":80,"var":"_pinzhi","skin":"homeland/img_zhuangbeikuang.png","height":80}},{"type":"Image","props":{"y":43,"x":44,"var":"_img","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":61,"x":15,"width":60,"var":"_num","text":"1","fontSize":14,"color":"#c5c1c1","centerY":25,"centerX":1,"bold":true,"align":"right"}},{"type":"Label","props":{"y":85,"x":-57,"width":200,"var":"_name","text":"绿色冒险披风","strokeColor":"#000000","stroke":3,"fontSize":16,"color":"#c5c1c1","centerX":-1,"bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.rewardItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IselDlgUI {
        onLstHeroCellClick(e: Laya.Event, index: number): void;
        onBtnCKClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class selDlgUI extends BaseDialog {
        
        public lstHero: ListView;
        public btnCK: Laya.Label;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":680,"height":420},"child":[{"type":"Image","props":{"y":0,"x":0,"width":680,"skin":"event/Delivery.Send_Info.backgrnd.png","height":420},"child":[{"type":"Image","props":{"y":45,"x":10,"width":660,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":367}}]},{"type":"ListView","props":{"y":64,"x":21,"width":637,"var":"lstHero","height":340},"child":[{"type":"selItem","props":{"runtime":"app.battle.selItem","name":"render"}}]},{"type":"Label","props":{"y":-3,"x":22,"var":"btnCK","underline":true,"text":"\\n查看伤害影响因素规则","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#bd33d7","bold":true,"align":"center"}},{"type":"Image","props":{"y":24,"x":652,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":14,"x":290,"text":"职业切换","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Label","props":{"y":429,"x":-60,"width":800,"text":"上下翻动可查看更多","fontSize":20,"color":"#dbd8d8","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.selItem"] = app.battle.selItem;
            super.createChildren();
            this.createView(ui.battle.selDlgUI.uiView);
            this.registerEvents({"lstHero":["cellClick"],"btnCK":["click"],"btnBack":["click"]});
        }
    }
}

module ui.battle {
    
    export interface IselectDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class selectDlgUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public content: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":206,"x":132,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":206,"x":252,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":95,"x":10,"wordWrap":true,"width":360,"var":"content","text":"是否确定一键分解？所有未加锁的装备、卷轴将被分解！","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}},{"type":"Label","props":{"y":8,"x":160,"text":"提示","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.selectDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.battle {
    
    export class selItemUI extends BaseView {
        
        public bg: Laya.Image;
        public di: Laya.Image;
        public _name: Laya.Label;
        public _body: Laya.Image;
        public _show: Laya.Image;
        public tip: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":130,"height":170},"child":[{"type":"Image","props":{"y":1,"x":2,"width":115,"var":"bg","skin":"homeland/Arbeit.slotBackgrnd.png","height":158,"alpha":0.2}},{"type":"Image","props":{"y":16,"x":7,"width":100,"height":125},"child":[{"type":"Image","props":{"y":104,"x":-10,"width":120,"var":"di","skin":"homeland/img_shuxingtishengdi.png","height":20},"child":[{"type":"Label","props":{"y":1,"x":10,"width":100,"var":"_name","text":"太阳神光介","fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":95,"x":55,"var":"_body"},"child":[{"type":"Image","props":{"y":-75,"x":34,"var":"_show","skin":"common/CharSelect.buyCharacter_.7.png","scaleX":-1}}]}]},{"type":"Image","props":{"y":2,"x":51,"var":"tip","skin":"homeland/img_jiantou.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.selItemUI.uiView);
            
        }
    }
}

module ui.battle {
    
    export interface IselshwoDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class selshwoDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public title: Laya.Label;
        public lstTxt: Laya.Panel;
        public txt1: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":680,"height":420},"child":[{"type":"Image","props":{"y":0,"x":3,"width":680,"skin":"homeland/Notice.backgrnd.0.png","sizeGrid":"50,50,50,50","height":420}},{"type":"Image","props":{"y":27,"x":655,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}},{"type":"Image","props":{"y":10,"x":10,"visible":false},"child":[{"type":"Label","props":{"y":77,"x":-313,"width":200,"underline":true,"text":"迷雾森林修炼 (0)","height":35,"fontSize":20,"events":"click","color":"#cf8502","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":237,"x":-313,"width":200,"underline":true,"text":"斑.雷昂 [90级]","height":35,"fontSize":20,"events":"click","color":"#8d1e1d","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":277,"x":-313,"width":200,"underline":true,"text":"斑.雷昂 [100级]","height":35,"fontSize":20,"events":"click","color":"#8d1e1d","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":248,"x":-161,"width":200,"underline":true,"fontSize":20,"events":"click","color":"#493a99","bold":true,"anchorY":0.5}},{"type":"Label","props":{"y":77,"x":-91,"width":200,"underline":true,"text":"挑战林中城（0）","height":35,"fontSize":20,"events":"click","color":"#493a99","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":280,"x":-190,"width":200,"underline":true,"fontSize":20,"events":"click","color":"#493a99","bold":true,"anchorY":0.5}},{"type":"Label","props":{"y":117,"x":-313,"width":200,"underline":true,"text":"斑.雷昂 [60级]","height":35,"fontSize":20,"events":"click","color":"#8d1e1d","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":157,"x":-313,"width":200,"underline":true,"text":"斑.雷昂 [70级]","height":35,"fontSize":20,"events":"click","color":"#8d1e1d","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":197,"x":-313,"width":200,"underline":true,"text":"斑.雷昂 [80级]","height":35,"fontSize":20,"events":"click","color":"#8d1e1d","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":117,"x":-91,"width":200,"underline":true,"text":"幸运大转盘（0）","height":35,"fontSize":20,"events":"click","color":"#04b212","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":233,"x":-93,"width":200,"underline":true,"height":35,"fontSize":20,"events":"click","color":"#04b212","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":157,"x":-91,"width":200,"underline":true,"text":"伟大航路寻宝（0）","height":35,"fontSize":20,"events":"click","color":"#04b212","bold":true,"anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Label","props":{"y":12,"x":140,"width":400,"var":"title","text":"伤害影响因素规则","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true,"align":"center"}},{"type":"Panel","props":{"y":70,"x":66,"width":548,"var":"lstTxt","height":336},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":548,"var":"txt1","text":"龙骑士：武器：枪、矛；属性：力量，敏捷\\n主教、火毒、冰雷、夜光法师、龙神、怪盗幻影、唤灵斗师、炎术士：武器：杖；属性：智力，运气\\n独行客、暗影双刀：武器：短刀；属性：运气，敏捷\\n神射手、风灵使者：武器：弓；属性：敏捷，力量\\n英雄，狂龙战士：武器：双手（剑、钝器、锤）；属性：力量，敏捷\\n圣骑士、恶魔猎手、复仇者、米哈尔、魂骑士：武器：单手（剑、钝器、锤）；属性：力量，敏捷\\n箭神：武器：弩；属性：敏捷，力量\\n无影人、夜行者：武器：拳套；属性：运气，敏捷\\n冲锋队长、影魂异人、隐月、奇袭者：武器：拳甲；属性：力量，敏捷\\n船长：武器：短枪；属性：敏捷，力量\\n尖兵：武器：能量剑；属性：力量，敏捷\\n剑豪：武器：太刀；属性：力量，敏捷\\n魔影链士：武器：锁链；属性：力量，敏捷\\n圣晶使者：武器：魔力手套；属性：力量，敏捷\\n虎影：武器：扇子；属性：力量，敏捷\\n神之子：武器：大剑；属性：力量，敏捷\\n 爆莉萌天使：武器：灵魂手统；属性：力量，敏捷\\n战神：武器：矛；属性：力量，敏捷\\n双弩精灵：武器：双弩；属性：敏捷，力量\\n爆破手：武器：拳炮；属性：力量，敏捷\\n古迹猎人：武器：远古弓；属性：敏捷，力量","strokeColor":"#FFFFFF","stroke":2,"padding":"5","leading":3,"fontSize":20,"color":"#6d6aa8","bold":true,"align":"left"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.selshwoDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.battle {
    
    export interface IyuchengDlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        onLstYuChengCellClick(e: Laya.Event, index: number): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class yuchengDlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public lstYuCheng: ListView;
        public _pro: Laya.ProgressBar;
        public _proText: Laya.Label;
        public _left: Laya.Label;
        public _right: Laya.Label;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":480,"height":405},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"homeland/Notice.backgrnd.0.png","height":405}},{"type":"Image","props":{"y":12,"x":143,"skin":"common/xzywsdyx.png"}},{"type":"Button","props":{"y":373,"x":240,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.7,"scaleX":1.7,"anchorY":0.5,"anchorX":0.5}},{"type":"ListView","props":{"y":53,"x":75,"width":330,"var":"lstYuCheng","height":265},"child":[{"type":"yuchengItem","props":{"runtime":"app.battle.yuchengItem","name":"render"}}]},{"type":"ProgressBar","props":{"y":327,"x":75,"width":330,"var":"_pro","value":1,"skin":"homeland/p.png","sizeGrid":"10,10,10,10","height":20},"child":[{"type":"Label","props":{"y":3,"x":147,"var":"_proText","text":"0/100","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#ffffff","centerY":0,"centerX":0}},{"type":"Label","props":{"width":60,"var":"_left","text":"Lv.1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#ffffff","centerY":-1,"centerX":-194,"align":"right"}},{"type":"Label","props":{"width":60,"var":"_right","text":"Lv.3","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#ffffff","centerY":-2,"centerX":196,"align":"left"}}]},{"type":"Image","props":{"y":29,"x":450,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.yuchengItem"] = app.battle.yuchengItem;
            super.createChildren();
            this.createView(ui.battle.yuchengDlgUI.uiView);
            this.registerEvents({"btn_queren":["click"],"lstYuCheng":["cellClick"],"btn_close":["click"]});
        }
    }
}

module ui.battle {
    
    export class yuchengItemUI extends CellView {
        
        public pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public _select: Laya.Image;
        public _star: Laya.Image;
        public _starNum: Laya.Label;
        public isjuexing: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":84,"height":95},"child":[{"type":"Image","props":{"y":-1,"x":1,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":88,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":4,"width":75,"var":"pinzhi","skin":"homeland/img_pingzhikuang5.png","height":70},"child":[{"type":"Image","props":{"y":6,"x":8,"width":60,"var":"_img","height":60},"child":[{"type":"Image","props":{"y":60,"x":-16,"width":90,"skin":"homeland/img_mingchengdi.png","height":18},"child":[{"type":"Label","props":{"y":2,"x":15,"var":"_name","text":"太阳神光介","fontSize":14,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Label","props":{"y":45,"width":50,"var":"_lv","text":"Lv 1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#FFFFFF","centerX":10,"bold":true,"align":"right"}}]}]},{"type":"Image","props":{"y":9,"x":13,"width":30,"var":"_select","skin":"homeland/img_xuanzhongduihao.png","height":30}},{"type":"Image","props":{"y":3,"x":51,"width":26,"var":"_star","skin":"homeland/img_star_1.png","height":26},"child":[{"type":"Label","props":{"y":6,"x":-12,"width":50,"var":"_starNum","text":"1","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Label","props":{"y":48,"x":-50,"width":26,"var":"isjuexing","text":"觉","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.battle.yuchengItemUI.uiView);
            
        }
    }
}

module ui.boss {
    
    export interface IbossDlgUI {
        onBtnPZ1Click2(e: Laya.Event): void;
        onBtnPZ2Click2(e: Laya.Event): void;
        onLstBossCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class bossDlgUI extends BaseDialog {
        
        public btnPZ1: Laya.Image;
        public _name1: Laya.Label;
        public _tiaojian1: Laya.Label;
        public btnPZ2: Laya.Image;
        public _name2: Laya.Label;
        public _tiaojian2: Laya.Label;
        public _body: Laya.Image;
        public lstBoss: ListView;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-3,"x":0,"skin":"homeland/img_xuanjuejuanzhou.png"}},{"type":"Image","props":{"y":100,"x":150,"width":200,"var":"btnPZ1","skin":"homeland/pvp_modi.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":48,"var":"_name1","text":"探险之地","strokeColor":"#000000","stroke":2,"fontSize":16,"color":"#35f904","bold":true,"align":"center"}},{"type":"Label","props":{"y":13,"x":205,"var":"_tiaojian1","text":"1级开启","strokeColor":"#FFFFFF","stroke":3,"fontSize":14,"color":"#8d1e1d","bold":true}}]},{"type":"Image","props":{"y":155,"x":150,"width":200,"var":"btnPZ2","skin":"homeland/pvp_modi.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":48,"var":"_name2","text":"领主之地","strokeColor":"#000000","stroke":2,"fontSize":16,"color":"#a8a4a4","bold":true,"align":"center"}},{"type":"Label","props":{"y":13,"x":205,"var":"_tiaojian2","text":"15级开启","strokeColor":"#FFFFFF","stroke":3,"fontSize":14,"color":"#8d1e1d","bold":true}}]},{"type":"Image","props":{"y":225,"x":495,"var":"_body"}},{"type":"Image","props":{"y":30,"x":335,"skin":"common/ts.png"}},{"type":"ListView","props":{"y":260,"x":56,"width":605,"var":"lstBoss","height":155},"child":[{"type":"bossItem","props":{"runtime":"app.boss.bossItem","name":"render"}}]},{"type":"Image","props":{"y":46,"x":683,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":185,"x":57,"wordWrap":true,"width":260,"text":"只有强大的人才能生存，弱小就是罪恶...这是数百年前，你们人类赶走我们的时候给我们教训的东西吧？","leading":10,"fontSize":16,"color":"#565050","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.boss.bossItem"] = app.boss.bossItem;
            super.createChildren();
            this.createView(ui.boss.bossDlgUI.uiView);
            this.registerEvents({"btnPZ1":["click2"],"btnPZ2":["click2"],"lstBoss":["cellChildClick"],"btn_close":["click"]});
        }
    }
}

module ui.boss {
    
    export interface IbossItemUI {
        onDiClick(e: Laya.Event): void;
        onFightClick(e: Laya.Event): void;
        
    }
    export class bossItemUI extends CellView {
        
        public di: Laya.Image;
        public fight: Laya.Image;
        public blink: Laya.Image;
        public _img: Laya.Image;
        public lock: Laya.Image;
        public _guanka: Laya.Label;
        public _select: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":110,"height":155},"child":[{"type":"Image","props":{"y":3,"x":3,"width":105,"var":"di","skin":"homeland/Arbeit.slotBackgrnd.png","sizeGrid":"5,5,5,5","height":150},"child":[{"type":"Image","props":{"y":103,"x":2,"width":100,"var":"fight","height":45},"child":[{"type":"Button","props":{"y":22,"x":50,"width":80,"stateNum":"2","skin":"homeland/btn_big.png","height":33,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":6,"x":20,"text":"挑战","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true}}]}]}]},{"type":"Image","props":{"y":11,"x":21,"width":68,"var":"blink","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":68,"alpha":0.6}},{"type":"Image","props":{"y":12,"x":22,"width":66,"var":"_img","height":66}},{"type":"Image","props":{"y":30,"x":40,"width":30,"var":"lock","height":30}},{"type":"Label","props":{"y":83,"x":5,"width":100,"var":"_guanka","text":"第1关","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":110,"visible":false,"var":"_select","skin":"homeland/Arbeit.slotSelect.png","sizeGrid":"5,5,5,5","height":155}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.boss.bossItemUI.uiView);
            this.registerEvents({"di":["click"],"fight":["click"]});
        }
    }
}

module ui.boss {
    
    export class showItemUI extends CellView {
        
        public static uiView: any = {"type":"CellView","props":{"width":50,"height":50},"child":[{"type":"Image","props":{"y":0,"x":0,"width":50,"height":50},"child":[{"type":"Image","props":{"y":0,"x":1,"width":50,"skin":"homeland/img_pingzhikuang1.png","height":50}},{"type":"Image","props":{"y":10,"x":11,"width":30,"height":30}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.boss.showItemUI.uiView);
            
        }
    }
}

module ui.char {
    
    export class abiViewUI extends BaseView {
        
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public _hp: Laya.Label;
        public _pad: Laya.Label;
        public _mad: Laya.Label;
        public _pdd: Laya.Label;
        public _mdd: Laya.Label;
        public _target: Laya.Label;
        public _miss: Laya.Label;
        public _str: Laya.Label;
        public _dex: Laya.Label;
        public _int: Laya.Label;
        public _luck: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":255,"height":364},"child":[{"type":"Image","props":{"y":0,"x":0,"width":270,"skin":"event/Delivery.Send_Info.backgrnd.png","height":383},"child":[{"type":"Image","props":{"y":21,"x":11,"width":250,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":340}}]},{"type":"Image","props":{"y":24,"x":11,"width":247,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":335,"alpha":0.3}},{"type":"Label","props":{"y":31,"x":88,"width":165,"var":"_name","text":"新手","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"名字","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":56,"x":88,"width":165,"var":"_lv","text":"1","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"等级","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":81,"x":88,"width":165,"var":"_hp","text":"250","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"生命","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":106,"x":88,"width":165,"var":"_pad","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"攻击力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":156,"x":88,"width":165,"var":"_mad","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"魔法攻击力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":131,"x":88,"width":165,"var":"_pdd","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"防御力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":181,"x":88,"width":165,"var":"_mdd","text":"0","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"魔法防御力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":206,"x":88,"width":165,"var":"_target","text":"0","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"命中率","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":231,"x":88,"width":165,"var":"_miss","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"回避率","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":256,"x":68,"width":185,"var":"_str","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-50,"width":60,"text":"力量","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":281,"x":68,"width":185,"var":"_dex","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-50,"width":60,"text":"敏捷","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":306,"x":68,"width":185,"var":"_int","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-50,"width":60,"text":"智力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":331,"x":68,"width":185,"var":"_luck","text":"100","height":20,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-50,"width":60,"text":"运气","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.abiViewUI.uiView);
            
        }
    }
}

module ui.char {
    
    export class bagItemUI extends BaseView {
        
        public pinzhi: Laya.Image;
        public partname: Laya.Label;
        public img: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":82,"height":82},"child":[{"type":"Image","props":{"y":1,"x":1,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":80,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":1,"width":80,"var":"pinzhi","height":80},"child":[{"type":"Label","props":{"y":30,"x":20,"var":"partname","text":"装备","fontSize":20,"color":"#FFFFFF"}},{"type":"Image","props":{"y":40,"x":40,"var":"img","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.bagItemUI.uiView);
            
        }
    }
}

module ui.char {
    
    export class bagItem2UI extends BaseView {
        
        public pinzhi: Laya.Image;
        public partname: Laya.Label;
        public img: Laya.Image;
        public _name: Laya.Label;
        public cash: Laya.Image;
        public cc: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":68,"height":68},"child":[{"type":"Image","props":{"y":1,"x":1,"width":66,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":1,"width":66,"var":"pinzhi","height":66},"child":[{"type":"Label","props":{"y":24,"x":15,"var":"partname","text":"装备","fontSize":18,"color":"#FFFFFF"}},{"type":"Image","props":{"y":33,"x":33,"var":"img","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":49,"x":19,"visible":false,"var":"_name","text":"装备","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#086455"}}]},{"type":"Image","props":{"y":42,"x":42,"visible":false,"var":"cash","skin":"homeland/Shop.meso.png","scaleY":2,"scaleX":2}},{"type":"Image","props":{"y":0,"x":0,"width":30,"visible":false,"var":"cc","skin":"homeland/img_xuanzhongduihao.png","height":30}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.bagItem2UI.uiView);
            
        }
    }
}

module ui.char {
    
    export class bagItem3UI extends BaseView {
        
        public _pinzhi: Laya.Image;
        public partname: Laya.Label;
        public _img: Laya.Image;
        public _num: Laya.Label;
        public _suo: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":68,"height":68},"child":[{"type":"Image","props":{"y":1,"x":1,"width":66,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":1,"width":66,"var":"_pinzhi","height":66},"child":[{"type":"Label","props":{"y":24,"x":15,"visible":false,"var":"partname","text":"装备","fontSize":18,"color":"#FFFFFF"}},{"type":"Image","props":{"y":33,"x":33,"var":"_img","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":49,"x":19,"visible":false,"text":"装备","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#086455"}},{"type":"Label","props":{"y":46,"x":-3,"width":69,"var":"_num","text":"1","stroke":1,"height":20,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":0,"x":41,"width":25,"var":"_suo","skin":"homeland/img_jinengsuo.png","height":25}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.bagItem3UI.uiView);
            
        }
    }
}

module ui.char {
    
    export class bagItem4UI extends BaseView {
        
        public _pinzhi: Laya.Image;
        public partname: Laya.Label;
        public _img: Laya.Image;
        public _num: Laya.Label;
        public _suo: Laya.Image;
        public cc: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":68,"height":68},"child":[{"type":"Image","props":{"y":1,"x":1,"width":66,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":1,"width":66,"var":"_pinzhi","height":66},"child":[{"type":"Label","props":{"y":24,"x":15,"visible":false,"var":"partname","text":"装备","fontSize":18,"color":"#FFFFFF"}},{"type":"Image","props":{"y":33,"x":33,"var":"_img","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":49,"x":19,"visible":false,"text":"装备","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#086455"}},{"type":"Label","props":{"y":46,"x":-3,"width":69,"var":"_num","text":"1","stroke":1,"height":20,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":0,"x":41,"width":25,"var":"_suo","skin":"homeland/img_jinengsuo.png","height":25}}]},{"type":"Image","props":{"width":30,"visible":false,"var":"cc","skin":"homeland/img_xuanzhongduihao.png","height":30}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.bagItem4UI.uiView);
            
        }
    }
}

module ui.char {
    
    export interface IcharDlgUI {
        onBtn_closeClick(e: Laya.Event): void;
        onLstBagCellClick(e: Laya.Event, index: number): void;
        onEqp1Click2(e: Laya.Event): void;
        onEqp2Click2(e: Laya.Event): void;
        onEqp3Click2(e: Laya.Event): void;
        onEqp4Click2(e: Laya.Event): void;
        onEqp5Click2(e: Laya.Event): void;
        onEqp6Click2(e: Laya.Event): void;
        onEqp7Click2(e: Laya.Event): void;
        onEqp8Click2(e: Laya.Event): void;
        onEqp9Click2(e: Laya.Event): void;
        onEqp10Click2(e: Laya.Event): void;
        onEqp11Click2(e: Laya.Event): void;
        onEqp12Click2(e: Laya.Event): void;
        onEqp13Click2(e: Laya.Event): void;
        onBtnFenJieClick(e: Laya.Event): void;
        onBtnJBClick(e: Laya.Event): void;
        onJobmsgClick(e: Laya.Event): void;
        onLstRingCellClick(e: Laya.Event, index: number): void;
        onEqp_ringClick2(e: Laya.Event): void;
        onLstTamingMobCellClick(e: Laya.Event, index: number): void;
        onEqp_tamingmobClick2(e: Laya.Event): void;
        onLstPetCellClick(e: Laya.Event, index: number): void;
        onEqp_petClick2(e: Laya.Event): void;
        onLstChairCellClick(e: Laya.Event, index: number): void;
        onEqp_chairClick2(e: Laya.Event): void;
        onBtnAbiClick2(e: Laya.Event): void;
        onBtnStarClick2(e: Laya.Event): void;
        onBtnTamingMobClick2(e: Laya.Event): void;
        onBtnPetClick2(e: Laya.Event): void;
        onBtnRingClick2(e: Laya.Event): void;
        onBtnChairClick2(e: Laya.Event): void;
        
    }
    export class charDlgUI extends BaseDialog {
        
        public _abl: app.char.abiView;
        public btn_close: Laya.Image;
        public charshow: Laya.Image;
        public _eff: Laya.Image;
        public jc1: Laya.Label;
        public jc2: Laya.Label;
        public jc3: Laya.Label;
        public jc4: Laya.Label;
        public lstBag: ListView;
        public eqp1: app.char.bagItem2;
        public eqp2: app.char.bagItem2;
        public eqp3: app.char.bagItem2;
        public eqp4: app.char.bagItem2;
        public eqp5: app.char.bagItem2;
        public eqp6: app.char.bagItem2;
        public eqp7: app.char.bagItem2;
        public eqp8: app.char.bagItem2;
        public eqp9: app.char.bagItem2;
        public eqp10: app.char.bagItem2;
        public eqp11: app.char.bagItem2;
        public eqp12: app.char.bagItem2;
        public eqp13: app.char.bagItem2;
        public btnFenJie: Laya.Image;
        public btnJB: Laya.Image;
        public jb_txt: Laya.Label;
        public curjob: Laya.Label;
        public jobmsg: Laya.Label;
        public lstRing: ListView;
        public eqp_ring: ui.char.bagItemUI;
        public lstTamingMob: ListView;
        public eqp_tamingmob: ui.char.bagItemUI;
        public lstPet: ListView;
        public eqp_pet: ui.char.bagItemUI;
        public lstChair: ListView;
        public eqp_chair: ui.char.bagItemUI;
        public _show: Laya.Image;
        public fashshow: app.char.heroView;
        public btnAbi: Laya.Image;
        public btnStar: Laya.Image;
        public btnTamingMob: Laya.Image;
        public btnPet: Laya.Image;
        public btnRing: Laya.Image;
        public btnChair: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":960,"height":480,"centerY":0,"centerX":0},"child":[{"type":"abiView","props":{"y":39,"x":36,"var":"_abl","runtime":"app.char.abiView"}},{"type":"Image","props":{"y":19,"x":296,"skin":"event/CharacterUI.Item.FullBackgrnd.png","scaleY":1.75,"scaleX":1.9},"child":[{"type":"Image","props":{"y":23,"x":6,"skin":"event/CharacterUI.Item.FullBackgrnd2.png"}}]},{"type":"Image","props":{"y":40,"x":879,"var":"btn_close","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":78,"x":318,"var":"charshow"},"child":[{"type":"Image","props":{"y":73,"x":-361,"var":"_eff"},"child":[{"type":"Label","props":{"y":163,"x":357,"width":115,"text":"全体光环加成","strokeColor":"#FFFFFF","stroke":2,"fontSize":16,"color":"#a30daa","bold":true,"align":"left"}},{"type":"Label","props":{"y":183,"x":357,"width":115,"var":"jc1","text":"攻击力：1%","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#a30daa","bold":true,"align":"left"}},{"type":"Label","props":{"y":200,"x":357,"width":115,"var":"jc2","text":"防御力：1%","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#a30daa","bold":true,"align":"left"}},{"type":"Label","props":{"y":218,"x":357,"width":115,"var":"jc3","text":"魔法攻击力：1%","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#a30daa","bold":true,"align":"left"}},{"type":"Label","props":{"y":235,"x":357,"width":115,"var":"jc4","text":"魔法防御力：1%","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#a30daa","bold":true,"align":"left"}}]},{"type":"ListView","props":{"y":-7,"x":290,"width":276,"var":"lstBag","spaceY":2,"spaceX":2,"height":349},"child":[{"type":"bagItem3","props":{"runtime":"app.char.bagItem3","name":"render"}},{"type":"bagItem2","props":{"y":-4,"x":-295,"var":"eqp1","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":-4,"x":-77,"var":"eqp2","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":68,"x":-295,"var":"eqp3","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":68,"x":-77,"var":"eqp4","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":139,"x":-295,"var":"eqp5","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":139,"x":-77,"var":"eqp6","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":211,"x":-295,"var":"eqp7","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":211,"x":-77,"var":"eqp8","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":211,"x":-222,"var":"eqp9","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":211,"x":-150,"var":"eqp10","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":283,"x":-295,"var":"eqp11","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":283,"x":-222,"var":"eqp12","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":283,"x":-150,"var":"eqp13","runtime":"app.char.bagItem2"}},{"type":"Label","props":{"y":338,"x":-72,"wordWrap":true,"text":"一键分解","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#a30daa","bold":true,"align":"center"},"child":[{"type":"Image","props":{"y":-51,"x":11,"var":"btnFenJie","skin":"homeland/04000334.info.icon.png","scaleY":1.5,"scaleX":1.5}}]},{"type":"Image","props":{"y":-6,"x":-145,"var":"btnJB","skin":"homeland/04032873.info.icon.png","scaleY":2,"scaleX":2}},{"type":"Label","props":{"y":13,"x":-133,"wordWrap":true,"var":"jb_txt","text":"羁绊","strokeColor":"#a3791e","stroke":2,"leading":5,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":25,"x":-226,"wordWrap":true,"var":"curjob","text":"爆利萌天使","strokeColor":"#FFFFFF","stroke":1,"leading":2,"fontSize":16,"color":"#0c51aa","bold":true,"align":"center"}},{"type":"Label","props":{"y":-1,"x":-224,"wordWrap":true,"var":"jobmsg","text":"职业名称：\\n","strokeColor":"#FFFFFF","stroke":1,"leading":2,"fontSize":16,"color":"#a30daa","bold":true,"align":"center"}}]},{"type":"ListView","props":{"y":-7,"x":247,"width":320,"var":"lstRing","height":350},"child":[{"type":"pettem","props":{"runtime":"app.char.petItem","name":"render"}},{"type":"bagItem","props":{"y":-6,"x":-250,"var":"eqp_ring","runtime":"ui.char.bagItemUI"}}]},{"type":"ListView","props":{"y":-7,"x":247,"width":320,"var":"lstTamingMob","height":350},"child":[{"type":"pettem","props":{"runtime":"app.char.petItem","name":"render"}},{"type":"bagItem","props":{"y":-6,"x":-250,"var":"eqp_tamingmob","runtime":"ui.char.bagItemUI"}}]},{"type":"ListView","props":{"y":-7,"x":247,"width":320,"var":"lstPet","height":350},"child":[{"type":"pettem","props":{"runtime":"app.char.petItem","name":"render"}},{"type":"bagItem","props":{"y":-6,"x":-250,"var":"eqp_pet","runtime":"ui.char.bagItemUI"}}]},{"type":"ListView","props":{"y":-7,"x":247,"width":320,"var":"lstChair","height":350},"child":[{"type":"pettem","props":{"runtime":"app.char.petItem","name":"render"}},{"type":"bagItem","props":{"y":-6,"x":-250,"var":"eqp_chair","runtime":"ui.char.bagItemUI"}}]},{"type":"Image","props":{"y":165,"x":137,"var":"_show"}}]},{"type":"heroView","props":{"y":57,"width":575,"var":"fashshow","runtime":"app.char.heroView","height":400,"centerX":120}},{"type":"Image","props":{"y":62,"x":897,"var":"btnAbi","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"装\\n备","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":127,"x":897,"var":"btnStar","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"时\\n装","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":192,"x":897,"var":"btnTamingMob","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"坐\\n骑","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":257,"x":897,"var":"btnPet","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"宠\\n物","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":322,"x":897,"var":"btnRing","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"戒\\n指","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":387,"x":897,"var":"btnChair","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"椅\\n子","fontSize":20,"color":"#08a3ca","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.abiView"] = app.char.abiView;
            View.viewClassMap["app.char.bagItem3"] = app.char.bagItem3;
            View.viewClassMap["app.char.bagItem2"] = app.char.bagItem2;
            View.viewClassMap["app.char.petItem"] = app.char.petItem;
            View.viewClassMap["ui.char.bagItemUI"] = ui.char.bagItemUI;
            View.viewClassMap["app.char.heroView"] = app.char.heroView;
            super.createChildren();
            this.createView(ui.char.charDlgUI.uiView);
            this.registerEvents({"btn_close":["click"],"lstBag":["cellClick"],"eqp1":["click2"],"eqp2":["click2"],"eqp3":["click2"],"eqp4":["click2"],"eqp5":["click2"],"eqp6":["click2"],"eqp7":["click2"],"eqp8":["click2"],"eqp9":["click2"],"eqp10":["click2"],"eqp11":["click2"],"eqp12":["click2"],"eqp13":["click2"],"btnFenJie":["click"],"btnJB":["click"],"jobmsg":["click"],"lstRing":["cellClick"],"eqp_ring":["click2"],"lstTamingMob":["cellClick"],"eqp_tamingmob":["click2"],"lstPet":["cellClick"],"eqp_pet":["click2"],"lstChair":["cellClick"],"eqp_chair":["click2"],"btnAbi":["click2"],"btnStar":["click2"],"btnTamingMob":["click2"],"btnPet":["click2"],"btnRing":["click2"],"btnChair":["click2"]});
        }
        onClose(): void {
            this._abl.onClose();
            this.eqp1.onClose();
            this.eqp2.onClose();
            this.eqp3.onClose();
            this.eqp4.onClose();
            this.eqp5.onClose();
            this.eqp6.onClose();
            this.eqp7.onClose();
            this.eqp8.onClose();
            this.eqp9.onClose();
            this.eqp10.onClose();
            this.eqp11.onClose();
            this.eqp12.onClose();
            this.eqp13.onClose();
            this.eqp_ring.onClose();
            this.eqp_tamingmob.onClose();
            this.eqp_pet.onClose();
            this.eqp_chair.onClose();
            this.fashshow.onClose();
        }
    }
}

module ui.char {
    
    export class charItemUI extends CellView {
        
        public _img: Laya.Image;
        public _equip: Laya.Image;
        public name_sp: Laya.Image;
        public _name: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":100,"height":110},"child":[{"type":"Image","props":{"y":1,"x":2,"width":100,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":108,"alpha":0.2}},{"type":"Image","props":{"y":55,"x":50,"var":"_img","scaleY":2,"scaleX":2,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":20,"x":20,"width":30,"var":"_equip","skin":"homeland/img_xuanzhongduihao.png","height":30}},{"type":"Image","props":{"y":89,"x":0,"width":100,"var":"name_sp","skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"y":2,"x":10,"var":"_name","text":"太阳神光介","fontSize":16,"color":"#FFFFFF","centerX":0,"bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.charItemUI.uiView);
            
        }
    }
}

module ui.char {
    
    export interface IheroViewUI {
        onBtnBodyClick(e: Laya.Event): void;
        onBtnFaceClick(e: Laya.Event): void;
        onBtnWeaponClick(e: Laya.Event): void;
        onBtnCoatClick(e: Laya.Event): void;
        onBtnPantsClick(e: Laya.Event): void;
        onBtnShoesClick(e: Laya.Event): void;
        onBtnGloveClick(e: Laya.Event): void;
        onBtnCapClick(e: Laya.Event): void;
        onBtnCapeClick(e: Laya.Event): void;
        onBtnHairClick(e: Laya.Event): void;
        onLstBagCellClick(e: Laya.Event, index: number): void;
        onBtnRankClick(e: Laya.Event): void;
        
    }
    export class heroViewUI extends BaseView {
        
        public part_weapon: ui.char.bagItem2UI;
        public part_coat: ui.char.bagItem2UI;
        public part_pants: ui.char.bagItem2UI;
        public part_shoes: ui.char.bagItem2UI;
        public part_cap: ui.char.bagItem2UI;
        public part_cape: ui.char.bagItem2UI;
        public part_glove: ui.char.bagItem2UI;
        public part_hair: ui.char.bagItem2UI;
        public part_body: ui.char.bagItem2UI;
        public part_face: ui.char.bagItem2UI;
        public body: Laya.Image;
        public btnBody: Laya.Label;
        public btnFace: Laya.Label;
        public btnWeapon: Laya.Label;
        public btnCoat: Laya.Label;
        public btnPants: Laya.Label;
        public btnShoes: Laya.Label;
        public btnGlove: Laya.Label;
        public btnCap: Laya.Label;
        public btnCape: Laya.Label;
        public btnHair: Laya.Label;
        public lstBag: ListView;
        public btnRank: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":575,"height":400},"child":[{"type":"bagItem2","props":{"y":7,"x":-1,"var":"part_weapon","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":79,"x":-1,"var":"part_coat","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":150,"x":-1,"var":"part_pants","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":222,"x":-1,"var":"part_shoes","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":7,"x":217,"var":"part_cap","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":79,"x":217,"var":"part_cape","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":150,"x":217,"var":"part_glove","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":222,"x":217,"var":"part_hair","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":222,"x":72,"var":"part_body","runtime":"ui.char.bagItem2UI"}},{"type":"bagItem2","props":{"y":222,"x":145,"var":"part_face","runtime":"ui.char.bagItem2UI"}},{"type":"Image","props":{"y":188,"x":141,"var":"body"}},{"type":"Label","props":{"y":352,"x":346,"width":80,"var":"btnBody","text":"肤色","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":352,"x":450,"width":80,"var":"btnFace","text":"脸型","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":312,"x":42,"width":80,"var":"btnWeapon","text":"武器","height":30,"fontSize":20,"color":"#be531e","bold":true,"align":"center"}},{"type":"Label","props":{"y":312,"x":144,"width":80,"var":"btnCoat","text":"上衣","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":312,"x":246,"width":80,"var":"btnPants","text":"裤子","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":312,"x":348,"width":80,"var":"btnShoes","text":"鞋子","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":312,"x":450,"width":80,"var":"btnGlove","text":"手套","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":352,"x":42,"width":80,"var":"btnCap","text":"帽子","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":352,"x":151,"width":80,"var":"btnCape","text":"披风","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":352,"x":248,"width":80,"var":"btnHair","text":"发型","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"ListView","props":{"y":9,"x":294,"width":280,"var":"lstBag","spaceY":2,"spaceX":2,"height":280},"child":[{"type":"bagItem2","props":{"runtime":"app.char.bagItem2","name":"render"}}]},{"type":"Label","props":{"y":10,"x":67,"width":150,"var":"btnRank","underline":true,"text":"更换时装\\n","fontSize":20,"color":"#5a5857","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["ui.char.bagItem2UI"] = ui.char.bagItem2UI;
            View.viewClassMap["app.char.bagItem2"] = app.char.bagItem2;
            super.createChildren();
            this.createView(ui.char.heroViewUI.uiView);
            this.registerEvents({"btnBody":["click"],"btnFace":["click"],"btnWeapon":["click"],"btnCoat":["click"],"btnPants":["click"],"btnShoes":["click"],"btnGlove":["click"],"btnCap":["click"],"btnCape":["click"],"btnHair":["click"],"lstBag":["cellClick"],"btnRank":["click"]});
        }
        onClose(): void {
            this.part_weapon.onClose();
            this.part_coat.onClose();
            this.part_pants.onClose();
            this.part_shoes.onClose();
            this.part_cap.onClose();
            this.part_cape.onClose();
            this.part_glove.onClose();
            this.part_hair.onClose();
            this.part_body.onClose();
            this.part_face.onClose();
        }
    }
}

module ui.char {
    
    export class pettemUI extends CellView {
        
        public _pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _equip: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":80,"height":80},"child":[{"type":"Image","props":{"y":1,"x":1,"width":78,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":78,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":1,"width":78,"var":"_pinzhi","skin":"homeland/img_pingzhikuang5.png","sizeGrid":"5,5,5,5","height":78}},{"type":"Image","props":{"y":40,"x":40,"var":"_img","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":10,"x":10,"width":30,"var":"_equip","skin":"homeland/img_xuanzhongduihao.png","height":30}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.char.pettemUI.uiView);
            
        }
    }
}

module ui.char {
    
    export interface IplayerDlgUI {
        onEqp1Click2(e: Laya.Event): void;
        onEqp2Click2(e: Laya.Event): void;
        onEqp3Click2(e: Laya.Event): void;
        onEqp4Click2(e: Laya.Event): void;
        onEqp5Click2(e: Laya.Event): void;
        onEqp6Click2(e: Laya.Event): void;
        onEqp7Click2(e: Laya.Event): void;
        onEqp8Click2(e: Laya.Event): void;
        onEqp9Click2(e: Laya.Event): void;
        onEqp10Click2(e: Laya.Event): void;
        onEqp11Click2(e: Laya.Event): void;
        onEqp12Click2(e: Laya.Event): void;
        onEqp13Click2(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class playerDlgUI extends BaseDialog {
        
        public _abl: app.char.abiView;
        public eqp1: app.char.bagItem2;
        public eqp2: app.char.bagItem2;
        public eqp3: app.char.bagItem2;
        public eqp4: app.char.bagItem2;
        public eqp5: app.char.bagItem2;
        public eqp6: app.char.bagItem2;
        public eqp7: app.char.bagItem2;
        public eqp8: app.char.bagItem2;
        public eqp9: app.char.bagItem2;
        public eqp10: app.char.bagItem2;
        public eqp11: app.char.bagItem2;
        public eqp12: app.char.bagItem2;
        public eqp13: app.char.bagItem2;
        public btnBack: Laya.Image;
        public _show: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":960,"height":480},"child":[{"type":"abiView","props":{"y":39,"x":178,"var":"_abl","runtime":"app.char.abiView"}},{"type":"Image","props":{"y":19,"x":438,"width":179,"skin":"event/Delivery.Send_Info.backgrnd.png","scaleY":1.75,"scaleX":1.9,"height":252},"child":[{"type":"Image","props":{"y":23,"x":8,"width":162,"skin":"event/CharacterUI.Item.FullBackgrnd2.png","height":221}}]},{"type":"Image","props":{"y":16,"x":138},"child":[{"type":"bagItem2","props":{"y":58,"x":327,"var":"eqp1","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":58,"x":545,"var":"eqp2","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":130,"x":327,"var":"eqp3","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":130,"x":545,"var":"eqp4","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":201,"x":327,"var":"eqp5","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":201,"x":545,"var":"eqp6","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":273,"x":327,"var":"eqp7","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":273,"x":545,"var":"eqp8","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":273,"x":400,"var":"eqp9","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":273,"x":472,"var":"eqp10","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":345,"x":327,"var":"eqp11","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":345,"x":400,"var":"eqp12","runtime":"app.char.bagItem2"}},{"type":"bagItem2","props":{"y":345,"x":472,"var":"eqp13","runtime":"app.char.bagItem2"}}]},{"type":"Label","props":{"y":29,"x":559,"text":"玩家信息","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Image","props":{"y":40,"x":759,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":256,"x":609,"var":"_show"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.abiView"] = app.char.abiView;
            View.viewClassMap["app.char.bagItem2"] = app.char.bagItem2;
            super.createChildren();
            this.createView(ui.char.playerDlgUI.uiView);
            this.registerEvents({"eqp1":["click2"],"eqp2":["click2"],"eqp3":["click2"],"eqp4":["click2"],"eqp5":["click2"],"eqp6":["click2"],"eqp7":["click2"],"eqp8":["click2"],"eqp9":["click2"],"eqp10":["click2"],"eqp11":["click2"],"eqp12":["click2"],"eqp13":["click2"],"btnBack":["click"]});
        }
        onClose(): void {
            this._abl.onClose();
            this.eqp1.onClose();
            this.eqp2.onClose();
            this.eqp3.onClose();
            this.eqp4.onClose();
            this.eqp5.onClose();
            this.eqp6.onClose();
            this.eqp7.onClose();
            this.eqp8.onClose();
            this.eqp9.onClose();
            this.eqp10.onClose();
            this.eqp11.onClose();
            this.eqp12.onClose();
            this.eqp13.onClose();
        }
    }
}

module ui.char {
    
    export interface IskillDlgUI {
        onBtn_closeClick(e: Laya.Event): void;
        onLstSkillCellClick(e: Laya.Event, index: number): void;
        
    }
    export class skillDlgUI extends BaseDialog {
        
        public btn_close: Laya.Image;
        public lstSkill: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":400,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"event/Delivery.Send_Info.backgrnd.png","height":400},"child":[{"type":"Image","props":{"y":33,"x":11,"width":580,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":350}}]},{"type":"Image","props":{"y":21,"x":576,"width":50,"var":"btn_close","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":5,"x":250,"skin":"common/jnxz.png"}},{"type":"ListView","props":{"y":43,"x":50,"width":500,"var":"lstSkill","height":330},"child":[{"type":"charItem","props":{"runtime":"app.char.charItem","name":"render"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.charItem"] = app.char.charItem;
            super.createChildren();
            this.createView(ui.char.skillDlgUI.uiView);
            this.registerEvents({"btn_close":["click"],"lstSkill":["cellClick"]});
        }
    }
}

module ui.common {
    
    export class ChatItemUI extends CellView {
        
        public imgChatBg: Laya.Image;
        public imgType: Laya.Image;
        public lblName: Laya.Label;
        public lblName2: Laya.Label;
        public lblName3: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":355,"height":50},"child":[{"type":"Image","props":{"x":133,"width":194,"var":"imgChatBg","skin":"common/img_liaotianqipao.png","sizeGrid":"27,9,9,20","height":36}},{"type":"Image","props":{"y":5,"x":0,"width":40,"var":"imgType","height":20}},{"type":"Label","props":{"y":3,"x":44,"var":"lblName","text":"系统","fontSize":18,"color":"#c13331","bold":true}},{"type":"Label","props":{"y":8,"x":337,"visible":false,"var":"lblName2","text":"系统","fontSize":18,"color":"#c13331","bold":true}},{"type":"Label","props":{"y":6,"x":90,"visible":false,"var":"lblName3","text":"系统","fontSize":18,"color":"#c13331","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.common.ChatItemUI.uiView);
            
        }
    }
}

module ui.common {
    
    export interface IChatViewUI {
        onIptChatChange(oldValue: string, newValue: string): void;
        onBtnSendClick(e: Laya.Event): void;
        onBtnEmojiClick(e: Laya.Event): void;
        onImgEmojiMaskClick(e: Laya.Event): void;
        onLstEmojisCellClick(e: Laya.Event, index: number): void;
        
    }
    export class ChatViewUI extends BaseView {
        
        public boxChat: Laya.Box;
        public iptChat: Laya.TextInput;
        public btnSend: Laya.Image;
        public btnEmoji: Laya.Button;
        public imgEmojiMask: Laya.Image;
        public imgEmoji: Laya.Image;
        public lstEmojis: ListView;
        public static uiView: any = {"type":"BaseView","props":{"width":355,"mouseThrough":true,"height":90},"child":[{"type":"Image","props":{"x":-10,"width":360,"skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","mouseThrough":true,"height":90,"alpha":0.3}},{"type":"Box","props":{"x":0,"var":"boxChat","mouseThrough":true}},{"type":"TextInput","props":{"y":165,"x":-20,"width":183,"var":"iptChat","skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","promptColor":"#FFFFFF","prompt":"输入聊天内容","padding":"0,25,3,25","height":30,"fontSize":20,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":166,"x":145,"width":50,"var":"btnSend","skin":"homeland/character_title_7.png","height":28},"child":[{"type":"Label","props":{"y":5,"x":7,"text":"发送","fontSize":18,"color":"#FFFFFF"}}]},{"type":"Button","props":{"y":131,"x":325,"visible":false,"var":"btnEmoji","stateNum":2,"scaleY":0.75,"scaleX":0.75,"anchorY":0.5,"anchorX":0.5,"alpha":0.85}},{"type":"Image","props":{"y":65,"x":15,"width":690,"visible":false,"var":"imgEmojiMask","height":250}},{"type":"Image","props":{"y":50,"x":0,"width":720,"visible":false,"var":"imgEmoji","skin":"homeland/Notice.backgrnd.0.png","sizeGrid":"5,5,5,5","mouseThrough":false,"mouseEnabled":true,"height":270},"child":[{"type":"ListView","props":{"y":0,"x":15,"width":690,"var":"lstEmojis","spaceY":6,"spaceX":10,"height":250},"child":[{"type":"EmojiItem","props":{"y":0,"x":0,"runtime":"app.common.EmojiItem","name":"render"}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.common.EmojiItem"] = app.common.EmojiItem;
            super.createChildren();
            this.createView(ui.common.ChatViewUI.uiView);
            this.registerEvents({"iptChat":["change"],"btnSend":["click"],"btnEmoji":["click"],"imgEmojiMask":["click"],"lstEmojis":["cellClick"]});
        }
    }
}

module ui.common {
    
    export class EmojiItemUI extends CellView {
        
        public imgIcon: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":77,"height":77},"child":[{"type":"Image","props":{"y":0,"x":0,"width":77,"var":"imgIcon","height":77}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.common.EmojiItemUI.uiView);
            
        }
    }
}

module ui.common {
    
    export interface IguajiDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class guajiDlgUI extends BaseDialog {
        
        public _time: Laya.Label;
        public btnBack: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":300,"centerY":0,"centerX":0},"child":[{"type":"Label","props":{"y":111,"x":50,"width":500,"var":"_time","text":"挂机剩余时间60分钟左右","strokeColor":"#093799","stroke":2,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":209,"x":222,"var":"btnBack","text":"点击停止挂机\\n","strokeColor":"#093799","stroke":2,"fontSize":26,"color":"#FFFFFF","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.common.guajiDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.common {
    
    export class LoaderDlgUI extends BaseDialog {
        
        public imgBg: Laya.Image;
        public prgLoading: Laya.ProgressBar;
        public imgMogu: Laya.Image;
        public prgBar: Laya.ProgressBar;
        public shuoming: Laya.Label;
        public logo: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":-133,"width":800,"visible":false,"var":"imgBg","skin":"common/fengmian.jpg","height":600,"centerY":0,"centerX":0}},{"type":"ProgressBar","props":{"y":550,"x":59,"width":600,"visible":false,"var":"prgLoading","value":1,"skin":"common/progress_loading.png","sizeGrid":"13,13,13,13","scaleX":-1,"centerX":0},"child":[{"type":"Image","props":{"y":25,"x":600,"var":"imgMogu","anchorX":1}},{"type":"ProgressBar","props":{"y":-36,"x":0,"width":600,"var":"prgBar","value":1,"skin":"common/progress_loading.png","sizeGrid":"13,13,13,13","centerX":4}},{"type":"Image","props":{"y":-74,"x":459,"width":320,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","scaleX":-1,"height":34,"alpha":0.3}},{"type":"Image","props":{"y":-73,"x":464,"skin":"common/scjz.png","scaleX":-1}}]},{"type":"Label","props":{"y":560,"wordWrap":true,"width":800,"var":"shuoming","strokeColor":"#2f0d9a","stroke":3,"fontSize":20,"color":"#4be70f","bold":true},"child":[{"type":"Label","props":{"y":-380,"x":325,"text":"健康游戏忠告","fontSize":25,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":-340,"x":225,"text":"抵制不良游戏，拒绝盗版游戏。","fontSize":25,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":-305,"x":225,"text":"注意自我保护，谨防受骗上当。","fontSize":25,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":-270,"x":225,"text":"适度游戏益脑，沉迷游戏伤身。","fontSize":25,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":-235,"x":225,"text":"合理安排时间，享受健康生活。","fontSize":25,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":182,"x":251,"visible":false,"var":"logo","skin":"common/Title_new.MSTitle.png","scaleY":0.75,"scaleX":0.75}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.common.LoaderDlgUI.uiView);
            
        }
    }
}

module ui.common {
    
    export interface IVoiceDlgUI {
        onBtnMusciClick(e: Laya.Event): void;
        onBtnShareClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class VoiceDlgUI extends BaseDialog {
        
        public btnMusci: Laya.Image;
        public music_txt: Laya.Label;
        public btnShare: Laya.Image;
        public zhuque: Laya.Label;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":300,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":56,"x":373,"width":66,"var":"btnMusci","skin":"homeland/img_shezhi.png","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":-17,"width":100,"var":"music_txt","text":"声音(开)","strokeColor":"#093799","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":56,"x":239,"width":66,"var":"btnShare","skin":"homeland/img_shezhi.png","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":-17,"width":100,"var":"zhuque","text":"朱雀(开)","strokeColor":"#093799","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":264,"x":300,"width":150,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":27,"text":"下次再说","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":334,"x":100,"width":400,"text":"部分功能IOS设备可能不支持","strokeColor":"#051204","stroke":3,"fontSize":18,"color":"#b4a9a9","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.common.VoiceDlgUI.uiView);
            this.registerEvents({"btnMusci":["click"],"btnShare":["click"],"btnBack":["click"]});
        }
    }
}

module ui.createChar {
    
    export interface IbuyDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class buyDlgUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public content: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":206,"x":132,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":206,"x":252,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":107,"x":10,"wordWrap":true,"width":360,"var":"content","text":"确定使用该形象？","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}},{"type":"Label","props":{"y":8,"x":160,"text":"提示","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.createChar.buyDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.createChar {
    
    export interface ICreateCharDlgUI {
        onLstfashionCellClick(e: Laya.Event, index: number): void;
        onBtnBodyClick(e: Laya.Event): void;
        onBtnFaceClick(e: Laya.Event): void;
        onBtnWeaponClick(e: Laya.Event): void;
        onBtnCoatClick(e: Laya.Event): void;
        onBtnPantsClick(e: Laya.Event): void;
        onBtnShoesClick(e: Laya.Event): void;
        onBtnGloveClick(e: Laya.Event): void;
        onBtnCapClick(e: Laya.Event): void;
        onBtnCapeClick(e: Laya.Event): void;
        onBtnHairClick(e: Laya.Event): void;
        onBtnRandClick(e: Laya.Event): void;
        onBtnRandomNameClick(e: Laya.Event): void;
        onBtnStartClick(e: Laya.Event): void;
        onBtnLeftClick(e: Laya.Event): void;
        onBtnRightClick(e: Laya.Event): void;
        
    }
    export class CreateCharDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public leftsp: Laya.Image;
        public lstfashion: ListView;
        public btnBody: Laya.Label;
        public btnFace: Laya.Label;
        public btnWeapon: Laya.Label;
        public btnCoat: Laya.Label;
        public btnPants: Laya.Label;
        public btnShoes: Laya.Label;
        public btnGlove: Laya.Label;
        public btnCap: Laya.Label;
        public btnCape: Laya.Label;
        public btnHair: Laya.Label;
        public btnRand: Laya.Image;
        public centersp: Laya.Image;
        public btnRandomName: Laya.Button;
        public iptCharName: Laya.Label;
        public btnStart: Laya.Button;
        public btnLeft: Laya.Image;
        public btnRight: Laya.Image;
        public jobname: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":1080,"visible":true,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bg","skin":"createChar/RaceSelect_new.Back.1.0.png"}},{"type":"Image","props":{"y":0,"x":-225,"var":"leftsp","skin":"createChar/back.30.png"}},{"type":"ListView","props":{"y":15,"x":650,"width":422,"var":"lstfashion","spaceY":2,"spaceX":2,"height":280},"child":[{"type":"bagItem2","props":{"runtime":"app.char.bagItem2","name":"render"}},{"type":"Label","props":{"y":345,"x":257,"width":80,"var":"btnBody","text":"肤色","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":348,"width":80,"var":"btnFace","text":"脸型","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":-16,"width":80,"var":"btnWeapon","text":"武器","strokeColor":"#093799","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":75,"width":80,"var":"btnCoat","text":"上衣","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":166,"width":80,"var":"btnPants","text":"裤子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":257,"width":80,"var":"btnShoes","text":"鞋子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":348,"width":80,"var":"btnGlove","text":"手套","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":-16,"width":80,"var":"btnCap","text":"帽子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":75,"width":80,"var":"btnCape","text":"披风","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":166,"width":80,"var":"btnHair","text":"发型","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":421,"x":172,"var":"btnRand","skin":"common/CharSelect.buyCharacter_.7.png"},"child":[{"type":"Label","props":{"y":85,"x":-1,"text":"随机形象","strokeColor":"#093799","stroke":2,"fontSize":20,"events":"click","color":"#FFFFFF","bold":true}}]}]},{"type":"Image","props":{"y":410,"x":291,"var":"centersp","skin":"createChar/img_ipt_bg.png","pivotX":0.5},"child":[{"type":"Button","props":{"y":24,"x":382,"var":"btnRandomName","stateNum":1,"skin":"createChar/CustomizeChar.2000.dice.0.png","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":10,"x":120,"width":257,"var":"iptCharName","text":"输入昵称","strokeColor":"#051204","stroke":3,"fontSize":26,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":104,"x":249,"var":"btnStart","stateNum":"1","skin":"createChar/CharSelect.BtNew.normal.0.png","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":272,"x":90,"width":100,"var":"btnLeft","scaleX":-1,"height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":13,"x":15,"stateNum":"1","skin":"common/maple.board.1.0.png","events":"click"}}]},{"type":"Image","props":{"y":273,"x":311,"width":100,"var":"btnRight","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":13,"x":15,"stateNum":"1","skin":"common/maple.board.1.0.png","events":"click"}}]},{"type":"Label","props":{"y":180,"x":99,"width":200,"var":"jobname","text":"龙骑士","strokeColor":"#093799","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.bagItem2"] = app.char.bagItem2;
            super.createChildren();
            this.createView(ui.createChar.CreateCharDlgUI.uiView);
            this.registerEvents({"lstfashion":["cellClick"],"btnBody":["click"],"btnFace":["click"],"btnWeapon":["click"],"btnCoat":["click"],"btnPants":["click"],"btnShoes":["click"],"btnGlove":["click"],"btnCap":["click"],"btnCape":["click"],"btnHair":["click"],"btnRand":["click"],"btnRandomName":["click"],"btnStart":["click"],"btnLeft":["click"],"btnRight":["click"]});
        }
    }
}

module ui.createChar {
    
    export interface IfashionDlgUI {
        onLstfashionCellClick(e: Laya.Event, index: number): void;
        onBtnBodyClick(e: Laya.Event): void;
        onBtnFaceClick(e: Laya.Event): void;
        onBtnWeaponClick(e: Laya.Event): void;
        onBtnCoatClick(e: Laya.Event): void;
        onBtnPantsClick(e: Laya.Event): void;
        onBtnShoesClick(e: Laya.Event): void;
        onBtnGloveClick(e: Laya.Event): void;
        onBtnCapClick(e: Laya.Event): void;
        onBtnCapeClick(e: Laya.Event): void;
        onBtnHairClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnSaveClick(e: Laya.Event): void;
        onBtnRandClick(e: Laya.Event): void;
        
    }
    export class fashionDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public leftsp: Laya.Image;
        public lstfashion: ListView;
        public btnBody: Laya.Label;
        public btnFace: Laya.Label;
        public btnWeapon: Laya.Label;
        public btnCoat: Laya.Label;
        public btnPants: Laya.Label;
        public btnShoes: Laya.Label;
        public btnGlove: Laya.Label;
        public btnCap: Laya.Label;
        public btnCape: Laya.Label;
        public btnHair: Laya.Label;
        public btnBack: Laya.Label;
        public btnSave: Laya.Label;
        public btnRand: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":1080,"visible":true,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1080,"var":"bg","skin":"createChar/RaceSelect_new.Back.1.0.png"}},{"type":"Image","props":{"y":0,"x":-225,"var":"leftsp","skin":"createChar/back.30.png"}},{"type":"ListView","props":{"y":15,"x":650,"width":422,"var":"lstfashion","spaceY":2,"spaceX":2,"height":280},"child":[{"type":"bagItem2","props":{"runtime":"app.char.bagItem2","name":"render"}},{"type":"Label","props":{"y":345,"x":257,"width":80,"var":"btnBody","text":"肤色","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":348,"width":80,"var":"btnFace","text":"脸型","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":-16,"width":80,"var":"btnWeapon","text":"武器","strokeColor":"#093799","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":75,"width":80,"var":"btnCoat","text":"上衣","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":166,"width":80,"var":"btnPants","text":"裤子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":257,"width":80,"var":"btnShoes","text":"鞋子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":305,"x":348,"width":80,"var":"btnGlove","text":"手套","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":-16,"width":80,"var":"btnCap","text":"帽子","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":75,"width":80,"var":"btnCape","text":"披风","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":345,"x":166,"width":80,"var":"btnHair","text":"发型","strokeColor":"#2f2b2b","stroke":2,"height":30,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":500,"x":240,"width":160,"var":"btnBack","text":"离开\\n","strokeColor":"#093799","stroke":2,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":435,"x":240,"width":160,"var":"btnSave","text":"保存形象\\n","strokeColor":"#093799","stroke":2,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":421,"x":90,"var":"btnRand","skin":"common/CharSelect.buyCharacter_.7.png"},"child":[{"type":"Label","props":{"y":85,"x":-1,"text":"随机形象","strokeColor":"#093799","stroke":2,"fontSize":20,"events":"click","color":"#FFFFFF","bold":true}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.bagItem2"] = app.char.bagItem2;
            super.createChildren();
            this.createView(ui.createChar.fashionDlgUI.uiView);
            this.registerEvents({"lstfashion":["cellClick"],"btnBody":["click"],"btnFace":["click"],"btnWeapon":["click"],"btnCoat":["click"],"btnPants":["click"],"btnShoes":["click"],"btnGlove":["click"],"btnCap":["click"],"btnCape":["click"],"btnHair":["click"],"btnBack":["click"],"btnSave":["click"],"btnRand":["click"]});
        }
    }
}

module ui.event {
    
    export class CommonItemUI extends CellView {
        
        public _img: Laya.Image;
        public _msg: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":66,"height":66},"child":[{"type":"Image","props":{"y":1,"x":1,"width":64,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":64,"alpha":0.6}},{"type":"Image","props":{"y":9,"x":9,"width":48,"var":"_img","height":48}},{"type":"Label","props":{"y":-23,"x":3,"width":60,"var":"_msg","text":"X100","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#8d1e1d","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.CommonItemUI.uiView);
            
        }
    }
}

module ui.event {
    
    export interface IFirstRechargeDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onBtnPayClick(e: Laya.Event): void;
        onRw1Click2(e: Laya.Event): void;
        onRw2Click2(e: Laya.Event): void;
        onRw3Click2(e: Laya.Event): void;
        onRw4Click2(e: Laya.Event): void;
        
    }
    export class FirstRechargeDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public btnPay: Laya.Button;
        public lblValue0: Laya.Label;
        public hero: Laya.Image;
        public rw1: app.event.payItem;
        public rw2: app.event.payItem;
        public rw3: app.event.payItem;
        public rw4: app.event.payItem;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":24,"x":161,"skin":"event/img_shouchonglibao.png","scaleY":0.75,"scaleX":0.75}},{"type":"Image","props":{"y":35,"x":582,"width":200,"var":"btnBack","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"下次再说","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":543,"x":263,"width":150,"var":"btnPay","stateNum":"2","skin":"homeland/btn_big.png","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":19,"x":19,"var":"lblValue0","text":"前往充值","strokeColor":"black","stroke":2,"fontSize":28,"color":"#35f904","align":"center"}}]},{"type":"Image","props":{"y":475,"x":505,"var":"hero"}},{"type":"Label","props":{"y":376,"x":507,"width":60,"text":"SSR","strokeColor":"#c04543","stroke":3,"fontSize":24,"color":"#f3c669","bold":true,"align":"center"}},{"type":"payItem","props":{"y":509,"x":339,"var":"rw1","runtime":"app.event.payItem"}},{"type":"payItem","props":{"y":509,"x":406,"var":"rw2","runtime":"app.event.payItem"}},{"type":"payItem","props":{"y":509,"x":473,"var":"rw3","runtime":"app.event.payItem"}},{"type":"payItem","props":{"y":509,"x":540,"var":"rw4","runtime":"app.event.payItem"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.event.payItem"] = app.event.payItem;
            super.createChildren();
            this.createView(ui.event.FirstRechargeDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"btnPay":["click"],"rw1":["click2"],"rw2":["click2"],"rw3":["click2"],"rw4":["click2"]});
        }
        onClose(): void {
            this.rw1.onClose();
            this.rw2.onClose();
            this.rw3.onClose();
            this.rw4.onClose();
        }
    }
}

module ui.event {
    
    export interface IflDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onBtnOKClick(e: Laya.Event): void;
        
    }
    export class flDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public reward: Laya.TextInput;
        public btnOK: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"event/Delivery.Send_Info.backgrnd.png","height":400},"child":[{"type":"Image","props":{"y":33,"x":11,"width":580,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":350}}]},{"type":"Label","props":{"y":8,"x":256,"text":"福利礼包","strokeColor":"#051204","stroke":4,"fontSize":22,"color":"#FFFFFF","bold":true}},{"type":"Image","props":{"y":22,"x":574,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":286,"x":144,"text":"输入福利码可随机获得3件枫叶装备","fontSize":20,"color":"#757272","bold":true}},{"type":"Label","props":{"y":320,"x":100,"wordWrap":true,"width":400,"text":"温馨提示：凡成功充值过任意一档充值的玩家，输入福利码即可获取全部枫叶全套装备","leading":7,"fontSize":20,"color":"#757272","bold":true,"align":"center"}},{"type":"Label","props":{"y":63,"x":125,"width":350,"text":"福利仅能领取1次（礼包码为：888）","fontSize":20,"color":"#757272","bold":true,"align":"center"}},{"type":"Image","props":{"y":132,"x":171,"width":257,"skin":"common/img_xuanjuejuemingcheng.png","sizeGrid":"15,17,16,16","height":40,"events":"click2","alpha":0.3}},{"type":"TextInput","props":{"y":132,"x":171,"width":257,"var":"reward","promptColor":"#FFFFFF","prompt":"请输入福利码","multiline":false,"maxChars":25,"height":40,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":215,"x":240,"width":120,"var":"btnOK","skin":"homeland/character_title_7.png","height":40},"child":[{"type":"Label","props":{"y":10,"x":40,"text":"领取","fontSize":20,"color":"#FFFFFF"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.flDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"btnOK":["click"]});
        }
    }
}

module ui.event {
    
    export interface IpayDlgUI {
        onBtnOKClick2(e: Laya.Event): void;
        onBtnsjpayClick2(e: Laya.Event): void;
        onBtn1Click(e: Laya.Event): void;
        onBtn2Click(e: Laya.Event): void;
        onBtn3Click(e: Laya.Event): void;
        onBtn4Click(e: Laya.Event): void;
        onBtn5Click(e: Laya.Event): void;
        onBtn6Click(e: Laya.Event): void;
        onBtn7Click(e: Laya.Event): void;
        onBtn8Click(e: Laya.Event): void;
        onBtnkefuClick(e: Laya.Event): void;
        onBtnzfbClick2(e: Laya.Event): void;
        onBtnwxClick2(e: Laya.Event): void;
        onBtnqqClick2(e: Laya.Event): void;
        onBtnkmClick2(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnPay1Click(e: Laya.Event): void;
        onBtnPay2Click(e: Laya.Event): void;
        
    }
    export class payDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public img1: Laya.Image;
        public wx: Laya.Image;
        public zfb: Laya.Image;
        public qq: Laya.Image;
        public km: Laya.Image;
        public km2: Laya.Image;
        public ka1: Laya.TextInput;
        public ka2: Laya.TextInput;
        public btnOK: Laya.Image;
        public stip: Laya.Label;
        public btnsjpay: Laya.Label;
        public img2: Laya.Image;
        public btn1: Laya.Label;
        public btn2: Laya.Label;
        public btn3: Laya.Label;
        public btn4: Laya.Label;
        public btn5: Laya.Label;
        public btn6: Laya.Label;
        public btn7: Laya.Label;
        public btn8: Laya.Label;
        public btnkefu: Laya.Label;
        public btnzfb: Laya.Image;
        public btnwx: Laya.Image;
        public btnqq: Laya.Image;
        public btnkm: Laya.Label;
        public sel_zfb: Laya.Image;
        public sel_wx: Laya.Image;
        public sel_qq: Laya.Image;
        public btnBack: Laya.Image;
        public tip: Laya.Label;
        public tip2: Laya.Label;
        public btnPay1: Laya.Image;
        public btnPay2: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":500},"child":[{"type":"Image","props":{"y":58,"var":"bg"}},{"type":"Image","props":{"y":58,"x":0,"width":600,"visible":false,"var":"img1","height":400},"child":[{"type":"Image","props":{"y":16,"x":165,"width":1079,"visible":false,"var":"wx","scaleY":0.25,"scaleX":0.25,"height":1466}},{"type":"Image","props":{"y":15,"x":180,"width":600,"var":"zfb","scaleY":0.4,"scaleX":0.4,"height":900}},{"type":"Image","props":{"y":31,"x":175,"width":248,"var":"qq","height":337}},{"type":"Image","props":{"y":65,"x":18,"width":250,"var":"km","skin":"km.jpg","height":250}},{"type":"Image","props":{"y":50,"x":0,"width":600,"var":"km2","height":300},"child":[{"type":"Label","props":{"y":90,"x":270,"underline":true,"text":"卡号","fontSize":25,"color":"#757272","bold":true},"child":[{"type":"Image","props":{"y":-8,"x":55,"width":257,"skin":"common/img_xuanjuejuemingcheng.png","sizeGrid":"15,17,16,16","height":40,"events":"click2","alpha":0.3}},{"type":"TextInput","props":{"y":-8,"x":55,"width":257,"var":"ka1","promptColor":"#FFFFFF","prompt":"请输入卡号","multiline":false,"maxChars":25,"height":40,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":150,"x":270,"underline":true,"text":"卡密","fontSize":25,"color":"#757272","bold":true},"child":[{"type":"Image","props":{"y":-8,"x":55,"width":257,"skin":"common/img_xuanjuejuemingcheng.png","sizeGrid":"15,17,16,16","height":40,"events":"click2","alpha":0.3}},{"type":"TextInput","props":{"y":-8,"x":55,"width":257,"var":"ka2","promptColor":"#FFFFFF","prompt":"此处可不填","multiline":false,"maxChars":25,"height":40,"fontSize":26,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":205,"x":390,"width":120,"var":"btnOK","skin":"homeland/character_title_7.png","height":40},"child":[{"type":"Label","props":{"y":10,"x":40,"text":"充值","fontSize":20,"color":"#FFFFFF"}}]},{"type":"Label","props":{"y":272,"x":70,"underline":true,"text":"扫码后选择对应额度的卡密，成功支付后可获得卡号","fontSize":20,"events":"click2","color":"#757272","bold":true}}]},{"type":"Label","props":{"y":375,"x":3,"var":"stip","underline":true,"text":"订单将在3分钟内生效","fontSize":18,"color":"#757272","bold":true}},{"type":"Label","props":{"y":11,"x":3,"var":"btnsjpay","underline":true,"text":"手机端不方便扫？","fontSize":18,"color":"#757272","bold":true}}]},{"type":"Image","props":{"y":58,"width":600,"var":"img2","height":400},"child":[{"type":"Label","props":{"y":195,"x":82,"width":100,"var":"btn1","underline":true,"text":"5¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02028044.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"525枫叶","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":195,"x":222,"width":100,"var":"btn2","underline":true,"text":"10¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"105黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":195,"x":362,"width":100,"var":"btn3","underline":true,"text":"30¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"320黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":195,"x":502,"width":100,"var":"btn4","underline":true,"text":"50¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"550黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":300,"x":82,"width":100,"var":"btn5","underline":true,"text":"100¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"1150黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":300,"x":222,"width":100,"var":"btn6","underline":true,"text":"200¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"2400黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":300,"x":362,"width":100,"var":"btn7","underline":true,"text":"300¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"3600黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":300,"x":502,"width":100,"var":"btn8","underline":true,"text":"500¥","height":100,"fontSize":30,"color":"#5f5040","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Image","props":{"y":30,"x":88,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":8,"x":-120,"width":120,"text":"6000黑金","fontSize":20,"events":"click","color":"#5a5857","bold":true,"align":"right"}}]}]},{"type":"Label","props":{"y":12,"x":195,"text":"请选择充值金额","fontSize":30,"events":"click","bold":true}},{"type":"Label","props":{"y":333,"x":130,"text":"首次充值以上任意金额可领取限量礼包","fontSize":20,"color":"#757272","bold":true}},{"type":"Label","props":{"y":369,"x":300,"width":400,"var":"btnkefu","underline":true,"text":"充值不到账/福利请联系Q1044571564","fontSize":20,"color":"#757272","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"},"child":[{"type":"Label","props":{"y":36,"x":166,"visible":false,"underline":true,"text":"由于微信收款额度较低，建议直接联系Q1044571564进行充值","fontSize":20,"events":"click","color":"#757272","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":73,"x":41,"var":"btnzfb","skin":"common/s_payicon2.png"}},{"type":"Image","props":{"y":73,"x":219,"var":"btnwx","skin":"common/s_payicon1.png"}},{"type":"Image","props":{"y":64,"x":401,"width":149,"var":"btnqq","skin":"common/s_payicon3.png","height":49}},{"type":"Label","props":{"y":-56,"x":-100,"width":800,"var":"btnkm","underline":true,"text":"若微信/支付宝/QQ无法充值，点击这里通过【点卡】方式进行充值\\n","fontSize":22,"color":"#868342","bold":true,"align":"center"}},{"type":"Image","props":{"y":63,"x":26,"width":180,"var":"sel_zfb","height":60},"child":[{"type":"Line","props":{"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":60,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"x":180,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}}]},{"type":"Image","props":{"y":63,"x":210,"width":180,"var":"sel_wx","height":60},"child":[{"type":"Line","props":{"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":60,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"x":180,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}}]},{"type":"Image","props":{"y":63,"x":393,"width":180,"var":"sel_qq","height":60},"child":[{"type":"Line","props":{"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":60,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"x":180,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}}]}]},{"type":"Image","props":{"y":79,"x":556,"width":100,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":30,"x":50,"underline":true,"text":"返回","fontSize":30,"bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":467,"x":-100,"width":800,"var":"tip","text":"由于微信/支付宝/QQ可能会限额，若无法付款请联系Q1044571564","fontSize":20,"color":"#dbd8d8","bold":true,"align":"center"},"child":[{"type":"Label","props":{"y":37,"x":0,"width":800,"var":"tip2","text":"温馨提示：黑金可以在商店购买枫叶袋","fontSize":20,"color":"#59d741","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":60,"x":600,"width":110,"var":"btnPay1","skin":"homeland/character_title_7.png","height":44},"child":[{"type":"Label","props":{"y":22,"x":55,"text":"扫码充值","stroke":1,"fontSize":22,"color":"#FFFFFF","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":129,"x":600,"width":110,"var":"btnPay2","skin":"homeland/character_title_7.png","height":44},"child":[{"type":"Label","props":{"y":22,"x":55,"text":"卡密充值","stroke":1,"fontSize":22,"color":"#FFFFFF","bold":true,"anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [{url: "atlas\assets.atlas", type: Laya.Loader.ATLAS}];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.payDlgUI.uiView);
            this.registerEvents({"btnOK":["click2"],"btnsjpay":["click2"],"btn1":["click"],"btn2":["click"],"btn3":["click"],"btn4":["click"],"btn5":["click"],"btn6":["click"],"btn7":["click"],"btn8":["click"],"btnkefu":["click"],"btnzfb":["click2"],"btnwx":["click2"],"btnqq":["click2"],"btnkm":["click2"],"btnBack":["click"],"btnPay1":["click"],"btnPay2":["click"]});
        }
    }
}

module ui.event {
    
    export class payItemUI extends BaseView {
        
        public _pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _num: Laya.Label;
        public _name: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":66,"height":66},"child":[{"type":"Image","props":{"y":1,"x":1,"width":64,"var":"_pinzhi","skin":"homeland/img_zhuangbeikuang.png","height":64},"child":[{"type":"Image","props":{"y":32,"x":32,"var":"_img","scaleY":1.25,"scaleX":1.25,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"width":60,"var":"_num","text":"1","fontSize":14,"color":"#c5c1c1","centerY":22,"centerX":0,"bold":true,"align":"right"}},{"type":"Label","props":{"y":1,"x":-18,"width":100,"var":"_name","text":"枫叶","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#c5c1c1","centerX":2,"bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.payItemUI.uiView);
            
        }
    }
}

module ui.event {
    
    export interface IsysDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class sysDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public lstAbi: Laya.Panel;
        public showTxt: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":480,"height":320},"child":[{"type":"Image","props":{"y":0,"x":0,"width":480,"skin":"event/Delivery.Send_Info.backgrnd.png","height":320},"child":[{"type":"Image","props":{"y":41,"x":12,"width":456,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":272}},{"type":"Label","props":{"y":6,"x":190,"text":"更新内容","fontSize":25,"color":"#FFFFFF","bold":true}},{"type":"Image","props":{"y":23,"x":453,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Panel","props":{"y":60,"x":18,"width":443,"var":"lstAbi","mouseThrough":true,"height":247},"child":[{"type":"Label","props":{"y":0,"x":11,"width":420,"var":"showTxt","leading":5,"fontSize":20,"color":"#5a5857","bold":true}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.sysDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.event {
    
    export interface ItgDlgUI {
        onSel_zfbClick(e: Laya.Event): void;
        onSel_wxClick(e: Laya.Event): void;
        onSel_qqClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class tgDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public img2: Laya.Image;
        public sel_zfb: Laya.Image;
        public sel_wx: Laya.Image;
        public sel_qq: Laya.Image;
        public req: Laya.Label;
        public rshow: Laya.Label;
        public reward: Laya.Label;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":640,"height":430},"child":[{"type":"Image","props":{"var":"bg"}},{"type":"Image","props":{"y":0,"x":0,"width":642,"var":"img2","height":430},"child":[{"type":"Label","props":{"y":12,"x":246,"text":"认证推广员","fontSize":30,"events":"click","bold":true}},{"type":"Image","props":{"y":63,"x":46,"width":180,"var":"sel_zfb","skin":"homeland/img_juxingdi.png","sizeGrid":"5,5,5,5","height":60,"alpha":0.15}},{"type":"Label","props":{"y":83,"x":56,"width":160,"text":"初级推广福利","strokeColor":"#32af21","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"},"child":[{"type":"Line","props":{"y":-20,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":40,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":-10,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":170,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Image","props":{"y":-20,"x":-10,"width":180,"height":60}}]},{"type":"Image","props":{"y":63,"x":230,"width":180,"var":"sel_wx","skin":"homeland/img_juxingdi.png","sizeGrid":"5,5,5,5","height":60,"alpha":0.15}},{"type":"Label","props":{"y":83,"x":240,"width":160,"text":"中级推广福利","strokeColor":"#a61bb2","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"},"child":[{"type":"Line","props":{"y":-20,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":40,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":-10,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":170,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Image","props":{"y":-20,"x":-10,"width":180,"height":60}}]},{"type":"Image","props":{"y":63,"x":413,"width":180,"var":"sel_qq","skin":"homeland/img_juxingdi.png","sizeGrid":"5,5,5,5","height":60,"alpha":0.15}},{"type":"Label","props":{"y":83,"x":423,"width":160,"text":"高级推广福利","strokeColor":"#e00d30","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"},"child":[{"type":"Line","props":{"y":-20,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":40,"x":-10,"toX":180,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":-10,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Line","props":{"y":-20,"x":170,"toY":60,"lineWidth":2,"lineColor":"#0994d6"}},{"type":"Image","props":{"y":-20,"x":-10,"width":180,"height":60}}]},{"type":"Label","props":{"y":343,"x":110,"text":"完成以上任意任务可找管家开启推广员特权福利","fontSize":20,"color":"#757272","bold":true}},{"type":"Label","props":{"y":136,"x":46,"wordWrap":true,"width":548,"text":"认证条件","strokeColor":"#FFFFFF","stroke":2,"height":27,"fontSize":20,"color":"#9070e3","bold":true,"align":"left"}},{"type":"Label","props":{"y":166,"x":46,"wordWrap":true,"width":548,"var":"req","text":"累计邀请5名好友进公告群(459470691)，然后截图给管家即可激活特权","strokeColor":"#FFFFFF","stroke":2,"leading":3,"height":48,"fontSize":20,"color":"#1c569f","bold":true,"align":"left"}},{"type":"Label","props":{"y":217,"x":46,"wordWrap":true,"width":548,"text":"特权福利","strokeColor":"#FFFFFF","stroke":2,"height":27,"fontSize":20,"color":"#9070e3","bold":true,"align":"left"}},{"type":"Label","props":{"y":371,"x":121,"width":400,"var":"rshow","text":"特权开启联系QQ：2717069196\\n代理游戏联系QQ：2768820569","leading":5,"fontSize":20,"color":"#757272","bold":true,"align":"center"}},{"type":"Label","props":{"y":245,"x":46,"wordWrap":true,"width":548,"var":"reward","text":"1.打怪经验获得增加25%\\n2.每日登录礼包增加50%\\n3.永久全体伤害增加5%\\n4.送GM帽子+50元充值礼包","strokeColor":"#FFFFFF","stroke":2,"leading":3,"height":93,"fontSize":20,"color":"#d742b2","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":23,"x":604,"width":100,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":30,"x":50,"underline":true,"text":"返回","fontSize":30,"bold":true,"anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.event.tgDlgUI.uiView);
            this.registerEvents({"sel_zfb":["click"],"sel_wx":["click"],"sel_qq":["click"],"btnBack":["click"]});
        }
    }
}

module ui.event {
    
    export interface ITurntableDlgUI {
        onBtnOnceClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class TurntableDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public btnC: Laya.Image;
        public imgLight: Laya.Image;
        public imgSelect: Laya.Image;
        public lblItem1: Laya.Label;
        public objItem1: app.event.CommonItem;
        public lblItem2: Laya.Label;
        public objItem2: app.event.CommonItem;
        public lblItem3: Laya.Label;
        public objItem3: app.event.CommonItem;
        public lblItem4: Laya.Label;
        public objItem4: app.event.CommonItem;
        public lblItem5: Laya.Label;
        public objItem5: app.event.CommonItem;
        public lblItem6: Laya.Label;
        public objItem6: app.event.CommonItem;
        public lblItem7: Laya.Label;
        public objItem7: app.event.CommonItem;
        public lblItem8: Laya.Label;
        public objItem8: app.event.CommonItem;
        public lblItem9: Laya.Label;
        public objItem9: app.event.CommonItem;
        public lblItem10: Laya.Label;
        public objItem10: app.event.CommonItem;
        public imgArrow: Laya.Image;
        public imgCircle: Laya.Image;
        public btnOnce: Laya.Button;
        public _time: Laya.Label;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg"}},{"type":"Image","props":{"width":800,"var":"btnC","skin":"homeland/house4.basic.0.0.png","height":600}},{"type":"Image","props":{"y":90,"x":190,"width":335,"skin":"event/img_zhuangpang.png","scaleY":1.25,"scaleX":1.25,"height":335},"child":[{"type":"Image","props":{"y":167,"x":167,"width":342,"var":"imgLight","skin":"event/img_dengpao.png","height":326,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":163,"x":171,"width":295,"visible":false,"var":"imgSelect","skin":"event/glow.png","height":296,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":0,"x":155,"var":"lblItem1","text":"名称","strokeColor":"#000000","stroke":3,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem1","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":21,"x":254,"var":"lblItem2","text":"名称","strokeColor":"#000000","stroke":3,"rotation":36,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem2","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":96,"x":322,"var":"lblItem3","text":"名称","strokeColor":"#000000","stroke":3,"rotation":72,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem3","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":197,"x":332,"var":"lblItem4","text":"名称","strokeColor":"#000000","stroke":3,"rotation":108,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem4","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":284,"x":281,"var":"lblItem5","text":"名称","strokeColor":"#000000","stroke":3,"rotation":144,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem5","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":326,"x":188,"var":"lblItem6","text":"名称","strokeColor":"#000000","stroke":3,"rotation":180,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem6","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":305,"x":89,"var":"lblItem7","text":"名称","strokeColor":"#000000","stroke":3,"rotation":216,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem7","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":230,"x":22,"var":"lblItem8","text":"名称","strokeColor":"#000000","stroke":3,"rotation":252,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem8","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":130,"x":12,"var":"lblItem9","text":"名称","strokeColor":"#000000","stroke":3,"rotation":288,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem9","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Label","props":{"y":42,"x":63,"var":"lblItem10","text":"名称","strokeColor":"#000000","stroke":3,"rotation":324,"fontSize":18,"color":"#FFFFFF","align":"center"},"child":[{"type":"CommonItem","props":{"y":45,"x":-5,"var":"objItem10","scaleY":0.68,"scaleX":0.68,"runtime":"app.event.CommonItem"}}]},{"type":"Image","props":{"y":163,"x":171,"width":87,"skin":"event/img_yuang.png","height":87,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":163,"x":171,"width":30,"var":"imgArrow","skin":"event/img_jiantou.png","pivotY":93,"pivotX":15,"height":59}},{"type":"Image","props":{"y":163,"x":171,"var":"imgCircle","skin":"event/quan.png","anchorY":0.5,"anchorX":0.5,"alpha":0}}]}]},{"type":"Button","props":{"y":554,"x":400,"width":100,"var":"btnOnce","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"开始","fontSize":20,"color":"#FFFFFF","bold":true}}]},{"type":"Label","props":{"y":45,"x":348,"text":"幸运转盘","strokeColor":"#051204","stroke":3,"fontSize":26,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":50,"x":466,"var":"_time","text":"0/3","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#07ec47","bold":true}},{"type":"Image","props":{"y":60,"x":700,"width":200,"var":"btnBack","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"离开转盘","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.event.CommonItem"] = app.event.CommonItem;
            super.createChildren();
            this.createView(ui.event.TurntableDlgUI.uiView);
            this.registerEvents({"btnOnce":["click"],"btnBack":["click"]});
        }
        onClose(): void {
            this.objItem1.onClose();
            this.objItem2.onClose();
            this.objItem3.onClose();
            this.objItem4.onClose();
            this.objItem5.onClose();
            this.objItem6.onClose();
            this.objItem7.onClose();
            this.objItem8.onClose();
            this.objItem9.onClose();
            this.objItem10.onClose();
        }
    }
}

module ui.fuben {
    
    export interface IfubenDlgUI {
        onBtnOKClick(e: Laya.Event): void;
        onLstFuBenCellClick(e: Laya.Event, index: number): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class fubenDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public btnOK: Laya.Button;
        public lstFuBen: ListView;
        public _body: Laya.Image;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-3,"x":0,"skin":"homeland/img_xuanjuejuanzhou.png"}},{"type":"Image","props":{"y":93,"x":318,"width":570,"var":"bg","skin":"homeland/img_BJ.png","scaleY":0.6,"scaleX":0.6,"height":364}},{"type":"Button","props":{"y":375,"x":489,"width":100,"var":"btnOK","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"挑战","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true}}]},{"type":"ListView","props":{"y":90,"x":54,"width":255,"var":"lstFuBen","height":220},"child":[{"type":"fubenItem","props":{"runtime":"app.fuben.fubenItem","name":"render"}}]},{"type":"Image","props":{"y":30,"x":334,"skin":"common/fb.png"}},{"type":"Image","props":{"y":273,"x":489,"width":100,"var":"_body","height":100}},{"type":"Image","props":{"y":46,"x":683,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":325,"x":54,"wordWrap":true,"width":260,"text":"你怎么了，懦弱的野兽。内心变得太温柔，连战斗的勇气都没了吗？","leading":10,"fontSize":16,"color":"#565050","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.fuben.fubenItem"] = app.fuben.fubenItem;
            super.createChildren();
            this.createView(ui.fuben.fubenDlgUI.uiView);
            this.registerEvents({"btnOK":["click"],"lstFuBen":["cellClick"],"btn_close":["click"]});
        }
    }
}

module ui.fuben {
    
    export class fubenItemUI extends CellView {
        
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _sel: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":400,"height":56},"child":[{"type":"Image","props":{"y":0,"x":0,"width":260,"var":"_img","skin":"homeland/img_mzdikuan.png","sizeGrid":"20,20,20,20","height":62}},{"type":"Label","props":{"y":22,"x":80,"width":100,"var":"_name","text":"一层","stroke":3,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":16,"x":205,"var":"_sel","skin":"homeland/Book.BtPrev.mouseOver.0.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.fubenItemUI.uiView);
            
        }
    }
}

module ui.fuben {
    
    export interface IgameResUI {
        onBtnYesClick(e: Laya.Event): void;
        
    }
    export class gameResUI extends BaseDialog {
        
        public btnYes: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"y":0,"x":0,"width":380,"skin":"homeland/Notice.backgrnd.0.png","height":240},"child":[{"type":"Button","props":{"y":206,"x":182,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.3,"scaleX":1.3,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":15,"x":160,"text":"提示","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}},{"type":"Label","props":{"y":107,"x":10,"wordWrap":true,"width":360,"text":"游戏已结束，点击离开！","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.gameResUI.uiView);
            this.registerEvents({"btnYes":["click"]});
        }
    }
}

module ui.fuben {
    
    export class hitItemUI extends BaseView {
        
        public static uiView: any = {"type":"BaseView","props":{"width":140,"height":130},"child":[{"type":"Image","props":{"y":-4,"x":6,"skin":"StarGame/mouse_normal_1.png","name":"normal"}},{"type":"Image","props":{"y":16,"x":5,"skin":"StarGame/mouse_hit_1.png","name":"hit"}},{"type":"Image","props":{"y":79,"x":0,"skin":"StarGame/mask-01.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.hitItemUI.uiView);
            
        }
    }
}

module ui.fuben {
    
    export class hitViewUI extends BaseView {
        
        public map_time: Laya.Image;
        public clip1: Laya.Clip;
        public clip2: Laya.Clip;
        public clip3: Laya.Clip;
        public clip4: Laya.Clip;
        public clip5: Laya.Clip;
        public clip6: Laya.Clip;
        public static uiView: any = {"type":"BaseView","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":50,"x":25,"skin":"StarGame/back.png"}},{"type":"hitItem","props":{"y":210,"x":144,"runtime":"app.fuben.hitItem","name":"item0"}},{"type":"hitItem","props":{"y":212,"x":334,"runtime":"app.fuben.hitItem","name":"item1"}},{"type":"hitItem","props":{"y":218,"x":531,"runtime":"app.fuben.hitItem","name":"item2"}},{"type":"hitItem","props":{"y":306,"x":119,"runtime":"app.fuben.hitItem","name":"item3"}},{"type":"hitItem","props":{"y":307,"x":337,"runtime":"app.fuben.hitItem","name":"item4"}},{"type":"hitItem","props":{"y":303,"x":534,"runtime":"app.fuben.hitItem","name":"item5"}},{"type":"hitItem","props":{"y":403,"x":113,"runtime":"app.fuben.hitItem","name":"item6"}},{"type":"hitItem","props":{"y":409,"x":338,"runtime":"app.fuben.hitItem","name":"item7"}},{"type":"hitItem","props":{"y":409,"x":557,"runtime":"app.fuben.hitItem","name":"item8"}},{"type":"Image","props":{"y":0,"x":276,"width":330,"var":"map_time","skin":"homeland/img_daojishidi.png","sizeGrid":"20,20,20,20","scaleY":0.75,"scaleX":0.75,"height":80},"child":[{"type":"Clip","props":{"x":-10,"visible":false,"var":"clip1","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":30,"visible":false,"var":"clip2","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":110,"var":"clip3","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":150,"var":"clip4","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":212,"var":"clip5","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":252,"var":"clip6","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Label","props":{"y":10,"x":10,"text":"剩余时间","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":66,"visible":false,"text":"小时","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":186,"text":"分","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":290,"text":"秒","fontSize":22,"color":"#cacdb3"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.fuben.hitItem"] = app.fuben.hitItem;
            super.createChildren();
            this.createView(ui.fuben.hitViewUI.uiView);
            
        }
    }
}

module ui.fuben {
    
    export interface IhuodongDlgUI {
        onLstHuoDongCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class huodongDlgUI extends BaseDialog {
        
        public di: Laya.Image;
        public lstHuoDong: ListView;
        public btnBack: Laya.Image;
        public rps: app.fuben.starPlanetRPS;
        public card: app.fuben.mapleOneCard;
        public hit: app.fuben.hitView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":108,"x":160,"width":480,"var":"di","skin":"event/Delivery.Send_Info.backgrnd.png","height":360},"child":[{"type":"Image","props":{"y":30,"x":10,"width":460,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":320}},{"type":"Label","props":{"y":8,"x":140,"text":"请选择你要参加的活动","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#227095","bold":true}},{"type":"ListView","props":{"y":39,"x":40,"width":400,"var":"lstHuoDong","height":299},"child":[{"type":"huodongItem","props":{"runtime":"app.fuben.huodongItem","name":"render"}}]},{"type":"Image","props":{"y":20,"x":459,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}}]},{"type":"starPlanetRPS","props":{"y":67,"x":100,"var":"rps","runtime":"app.fuben.starPlanetRPS"}},{"type":"mapleOneCard","props":{"y":31,"x":0,"visible":false,"var":"card","runtime":"app.fuben.mapleOneCard"}},{"type":"hitView","props":{"y":0,"x":0,"var":"hit","runtime":"app.fuben.hitView"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.fuben.huodongItem"] = app.fuben.huodongItem;
            View.viewClassMap["app.fuben.starPlanetRPS"] = app.fuben.starPlanetRPS;
            View.viewClassMap["app.fuben.mapleOneCard"] = app.fuben.mapleOneCard;
            View.viewClassMap["app.fuben.hitView"] = app.fuben.hitView;
            super.createChildren();
            this.createView(ui.fuben.huodongDlgUI.uiView);
            this.registerEvents({"lstHuoDong":["cellChildClick"],"btnBack":["click"]});
        }
        onClose(): void {
            this.rps.onClose();
            this.card.onClose();
            this.hit.onClose();
        }
    }
}

module ui.fuben {
    
    export interface IhuodongItemUI {
        onBtnGoClick(e: Laya.Event): void;
        
    }
    export class huodongItemUI extends CellView {
        
        public btnGo: Laya.Image;
        public _name: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":400,"height":100},"child":[{"type":"Image","props":{"y":30,"x":100,"width":200,"var":"btnGo","height":40},"child":[{"type":"Label","props":{"y":7,"x":-100,"wordWrap":true,"width":400,"var":"_name","underline":true,"text":"忍苦森林一层","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#a30daa","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.huodongItemUI.uiView);
            this.registerEvents({"btnGo":["click"]});
        }
    }
}

module ui.fuben {
    
    export interface IjumpDlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class jumpDlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public btn_close: Laya.Image;
        public msg: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":360,"height":240,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":360,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Button","props":{"y":200,"x":180,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.7,"scaleX":1.7,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":26,"x":332,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]},{"type":"Image","props":{"y":12,"x":154,"skin":"common/tishi.png"}},{"type":"Label","props":{"y":102,"x":89,"var":"msg","text":"前往秘镜挑战？","strokeColor":"#8b531f","stroke":3,"leading":10,"fontSize":26,"color":"#FFFFFF","centerX":0,"bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.jumpDlgUI.uiView);
            this.registerEvents({"btn_queren":["click"],"btn_close":["click"]});
        }
    }
}

module ui.fuben {
    
    export interface ImapleOneCardUI {
        onBtnCardClick(e: Laya.Event): void;
        onBtnMsgClick(e: Laya.Event): void;
        
    }
    export class mapleOneCardUI extends BaseView {
        
        public sp_dir: Laya.Image;
        public btnCard: Laya.Image;
        public _cardnumber: Laya.Label;
        public clickcard: Laya.Image;
        public hero: app.fuben.onecardItem;
        public mob1: app.fuben.onecardItem;
        public mob2: app.fuben.onecardItem;
        public mob3: app.fuben.onecardItem;
        public pro1: Laya.Image;
        public probar: Laya.Image;
        public pro2: Laya.Image;
        public showcard: Laya.Image;
        public reverse: Laya.Image;
        public yellow: Laya.Image;
        public blue: Laya.Image;
        public red: Laya.Image;
        public green: Laya.Image;
        public normalcard: Laya.Image;
        public magiccard: Laya.Image;
        public change: Laya.Image;
        public lastcard: Laya.Image;
        public win: Laya.Image;
        public lose: Laya.Image;
        public btnMsg: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":800,"height":537},"child":[{"type":"Image","props":{"y":268,"x":400,"skin":"StarGame/mapleOneCard.Board.backgrnd.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":52,"x":270,"var":"sp_dir"}},{"type":"Image","props":{"y":225,"x":163,"var":"btnCard","skin":"StarGame/mapleOneCard.Custom.0.Deck.deck.png"},"child":[{"type":"Label","props":{"y":48,"x":8,"wordWrap":true,"width":60,"var":"_cardnumber","text":"100","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#4750b0","bold":true,"align":"center"}},{"type":"Image","props":{"y":60,"x":38,"var":"clickcard","anchorY":0.5,"anchorX":0.5}}]},{"type":"onecardItem","props":{"y":390,"x":40,"var":"hero","runtime":"app.fuben.onecardItem"}},{"type":"onecardItem","props":{"y":90,"x":40,"var":"mob1","runtime":"app.fuben.onecardItem"}},{"type":"onecardItem","props":{"y":60,"x":600,"var":"mob2","runtime":"app.fuben.onecardItem"}},{"type":"onecardItem","props":{"y":310,"x":600,"var":"mob3","runtime":"app.fuben.onecardItem"}},{"type":"Image","props":{"y":319,"x":342,"var":"pro1","skin":"StarGame/mapleOneCard.OneCardPopup.ChangeColor.timegage.leftGage.png"}},{"type":"Image","props":{"y":319,"x":347,"width":110,"var":"probar","skin":"StarGame/mapleOneCard.OneCardPopup.ChangeColor.timegage.middleGage.png","height":11}},{"type":"Image","props":{"y":319,"x":457,"var":"pro2","skin":"StarGame/mapleOneCard.OneCardPopup.ChangeColor.timegage.rightGage.png"}},{"type":"Image","props":{"y":248,"x":402,"var":"showcard","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"reverse","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"yellow","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"blue","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"red","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"green","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"normalcard","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"magiccard","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"change","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"lastcard","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"win","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":248,"x":402,"var":"lose","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":325,"wordWrap":true,"width":150,"var":"btnMsg","text":"玩法规则查看\\n","fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.fuben.onecardItem"] = app.fuben.onecardItem;
            super.createChildren();
            this.createView(ui.fuben.mapleOneCardUI.uiView);
            this.registerEvents({"btnCard":["click"],"btnMsg":["click"]});
        }
        onClose(): void {
            this.hero.onClose();
            this.mob1.onClose();
            this.mob2.onClose();
            this.mob3.onClose();
        }
    }
}

module ui.fuben {
    
    export interface ImsgDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class msgDlgUI extends BaseDialog {
        
        public btnBack: Laya.Button;
        public _txt: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":360,"height":240,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":360,"skin":"event/Delivery.Send_Info.backgrnd.png","height":240},"child":[{"type":"Image","props":{"y":33,"x":11,"width":339,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":194}}]},{"type":"Button","props":{"y":200,"x":180,"width":50,"var":"btnBack","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.7,"scaleX":1.7,"height":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":5,"x":154,"skin":"common/tishi.png"}},{"type":"Label","props":{"x":30,"wordWrap":true,"width":300,"var":"_txt","text":"前往秘镜挑战？","strokeColor":"#FFFFFF","stroke":3,"leading":10,"fontSize":26,"color":"#8d1e1d","centerY":0,"centerX":0,"bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.msgDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.fuben {
    
    export class onecardItemUI extends BaseView {
        
        public boardedge: Laya.Image;
        public board: Laya.Image;
        public boardface: Laya.Image;
        public body: Laya.Image;
        public boardani: Laya.Image;
        public boardname: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":165,"height":124},"child":[{"type":"Image","props":{"y":62,"x":82,"var":"boardedge","skin":"StarGame/mapleOneCard.OtherCharacterSlot.backlight.next.0.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":17,"x":8,"var":"board","skin":"StarGame/mapleOneCard.OtherCharacterSlot.board.0.png"},"child":[{"type":"Image","props":{"y":10,"x":8,"width":47,"var":"boardface","height":47},"child":[{"type":"Image","props":{"y":72,"x":23,"var":"body"}}]}]},{"type":"Image","props":{"y":70,"x":108,"var":"boardani","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":83,"x":19,"width":80,"var":"boardname","text":"Susake","strokeColor":"#52678b","stroke":2,"fontSize":16,"color":"#FFFFFF"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.onecardItemUI.uiView);
            
        }
    }
}

module ui.fuben {
    
    export interface IonecardRuleUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class onecardRuleUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":300,"height":383},"child":[{"type":"Image","props":{"y":0,"x":0,"width":300,"skin":"event/Delivery.Send_Info.backgrnd.png","height":383},"child":[{"type":"Image","props":{"y":21,"x":11,"width":280,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":340}},{"type":"Label","props":{"y":52,"x":13,"wordWrap":true,"width":276,"text":"每人开局先摸6张牌.每次出牌都要出与上一张牌点数/颜色/功能相同的牌若没有 则摸一张牌并跳过该回合 .手中没牌即获胜 牌越多名次越后 相等则并列,手牌超过10张则自动认输","strokeColor":"#FFFFFF","stroke":2,"leading":4,"height":99,"fontSize":16,"color":"#842c16","bold":true,"align":"left"}},{"type":"Label","props":{"y":23,"x":16,"text":"游戏规则","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Label","props":{"y":151,"x":13,"wordWrap":true,"width":276,"text":"反转:将出牌顺序倒过来 你的上家变成你的下家 跳过:跳过你的下家 让你下家的下家出牌 攻击:让你的下家摸想应数量的牌\\n任意牌:改变牌的颜色,无论对方什么牌都可以使用\\n米哈尔（黄）:吸收自己所有的黄牌\\n奥兹（红）:吸收自己所有的红牌\\n伊莉娜（绿）:吸收自己所有的绿牌\\n胡克（蓝）:吸收自己所有的蓝牌","strokeColor":"#FFFFFF","stroke":2,"leading":5,"height":213,"fontSize":16,"color":"#4750b0","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":16,"x":286,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.onecardRuleUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.fuben {
    
    export interface IstarPlanetRPSUI {
        onBtnSTClick(e: Laya.Event): void;
        onBtnJDClick(e: Laya.Event): void;
        onBtnBClick(e: Laya.Event): void;
        
    }
    export class starPlanetRPSUI extends BaseView {
        
        public btnST: Laya.Image;
        public btnJD: Laya.Image;
        public btnB: Laya.Image;
        public show1: Laya.Image;
        public show2: Laya.Image;
        public hp1: Laya.Image;
        public hp2: Laya.Image;
        public hp3: Laya.Image;
        public hp4: Laya.Image;
        public hp5: Laya.Image;
        public my: Laya.Image;
        public mob: Laya.Image;
        public tpro: Laya.Image;
        public res: Laya.Image;
        public ls_txt: Laya.Label;
        public score: Laya.Label;
        public res_txt: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":600,"height":466},"child":[{"type":"Image","props":{"y":21,"x":0,"width":270,"skin":"event/Delivery.Send_Info.backgrnd.png","height":383},"child":[{"type":"Image","props":{"y":21,"x":11,"width":250,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":340}},{"type":"Label","props":{"y":59,"x":17,"wordWrap":true,"width":237,"text":"两个玩家出示自己心中想好的手势(“石头”、“剪子”或“布”)。 每一个手势代表一个“武器”,互相克制的原则是:剪子剪不动石头(石头胜利);布被剪子剪开(剪子胜利);石头被布包裹(布胜利)。如果双方出示了一样的手势,就是平局。","strokeColor":"#FFFFFF","stroke":2,"leading":4,"height":141,"fontSize":16,"color":"#842c16","bold":true,"align":"left"}},{"type":"Label","props":{"y":25,"x":16,"text":"游戏规则","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Label","props":{"y":205,"x":18,"wordWrap":true,"width":225,"text":"总共5次机会、押金10000、弃权则不退还押金\\n每次输扣2000\\n每次胜利获得1000\\n连胜翻3倍\\n2-5连胜分别奖励为：\\n3000,9000,27000,91000","strokeColor":"#FFFFFF","stroke":2,"leading":5,"height":146,"fontSize":16,"color":"#4750b0","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":0,"x":260,"skin":"StarGame/starPlanetRPS.backgrnd.png"},"child":[{"type":"Image","props":{"y":20,"x":8,"skin":"StarGame/starPlanetRPS.backgrnd2.png"}},{"type":"Image","props":{"y":389,"x":39,"var":"btnST","skin":"StarGame/starPlanetRPS_old.BtRock.keyFocus.0.png"}},{"type":"Image","props":{"y":389,"x":130,"var":"btnJD","skin":"StarGame/starPlanetRPS_old.BtScissor.keyFocus.0.png"}},{"type":"Image","props":{"y":390,"x":221,"var":"btnB","skin":"StarGame/starPlanetRPS_old.BtPaper.keyFocus.0.png"}},{"type":"Image","props":{"y":163,"x":91,"var":"show1","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":163,"x":228,"var":"show2","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":33,"x":60,"var":"hp1","skin":"StarGame/starPlanetRPS.heart.png"}},{"type":"Image","props":{"y":33,"x":81,"var":"hp2","skin":"StarGame/starPlanetRPS.heart.png"}},{"type":"Image","props":{"y":33,"x":102,"var":"hp3","skin":"StarGame/starPlanetRPS.heart.png"}},{"type":"Image","props":{"y":33,"x":123,"var":"hp4","skin":"StarGame/starPlanetRPS.heart.png"}},{"type":"Image","props":{"y":33,"x":144,"var":"hp5","skin":"StarGame/starPlanetRPS.heart.png"}},{"type":"Image","props":{"y":312,"x":75,"var":"my"}},{"type":"Image","props":{"y":313,"x":241,"var":"mob"}},{"type":"Image","props":{"y":329,"x":20,"skin":"StarGame/starPlanetRPS_old.gauge.1.png"},"child":[{"type":"Image","props":{"y":8,"x":18,"width":255,"var":"tpro","skin":"StarGame/starPlanetRPS_old.gauge.gauge.png","height":8}}]},{"type":"Image","props":{"y":176,"x":157,"var":"res","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":217,"wordWrap":true,"width":50,"var":"ls_txt","text":"0","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#a30daa","bold":true,"align":"right"}},{"type":"Label","props":{"y":59,"x":18,"wordWrap":true,"width":150,"var":"score","text":"金币：10000","fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":60,"x":150,"width":150,"var":"res_txt","text":"回合结果","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#a30daa","bold":true,"align":"right"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.starPlanetRPSUI.uiView);
            this.registerEvents({"btnST":["click"],"btnJD":["click"],"btnB":["click"]});
        }
    }
}

module ui.fuben {
    
    export interface ItiaoDlgUI {
        onLstTiaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class tiaoDlgUI extends BaseDialog {
        
        public lstTiao: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":640,"height":420},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"skin":"event/Delivery.Send_Info.backgrnd.png","height":420},"child":[{"type":"Image","props":{"y":45,"x":11,"width":620,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":360}}]},{"type":"ListView","props":{"y":60,"x":19,"width":601,"var":"lstTiao","height":340},"child":[{"type":"tiaoItem","props":{"runtime":"app.fuben.tiaoItem","name":"render"}}]},{"type":"Label","props":{"y":13,"x":260,"text":"跳跳任务","strokeColor":"#FFFFFF","stroke":3,"fontSize":30,"color":"#227095","bold":true}},{"type":"Image","props":{"y":23,"x":615,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.fuben.tiaoItem"] = app.fuben.tiaoItem;
            super.createChildren();
            this.createView(ui.fuben.tiaoDlgUI.uiView);
            this.registerEvents({"lstTiao":["cellChildClick"],"btnBack":["click"]});
        }
    }
}

module ui.fuben {
    
    export interface ItiaoItemUI {
        onBtnGoClick(e: Laya.Event): void;
        
    }
    export class tiaoItemUI extends CellView {
        
        public _name: Laya.Label;
        public _jifen: Laya.Label;
        public tg: Laya.Label;
        public btnGo: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":150,"height":170},"child":[{"type":"Image","props":{"y":0,"x":5,"width":140,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":165,"alpha":0.2}},{"type":"Image","props":{"y":4,"x":45,"skin":"homeland/04001318.info.icon.png","scaleY":2,"scaleX":2}},{"type":"Label","props":{"y":75,"x":0,"wordWrap":true,"width":150,"var":"_name","text":"忍苦森林一层","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":16,"color":"#a30daa","bold":true,"align":"center"}},{"type":"Label","props":{"y":95,"x":-52,"wordWrap":true,"width":254,"var":"_jifen","text":"50积分","strokeColor":"#FFFFFF","stroke":2,"leading":5,"fontSize":20,"color":"#4750b0","bold":true,"align":"center"}},{"type":"Label","props":{"y":128,"x":25,"wordWrap":true,"width":100,"var":"tg","text":"已通关","strokeColor":"#FFFFFF","stroke":2,"leading":4,"fontSize":18,"color":"#842c16","bold":true,"align":"center"}},{"type":"Image","props":{"y":116,"x":33,"width":84,"var":"btnGo","height":50},"child":[{"type":"Image","props":{"y":10,"x":2,"width":80,"skin":"homeland/character_title_7.png"},"child":[{"type":"Label","props":{"y":6,"x":22,"text":"挑战","fontSize":18,"bold":true}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.fuben.tiaoItemUI.uiView);
            this.registerEvents({"btnGo":["click"]});
        }
    }
}

module ui.homeland {
    
    export class bufItemUI extends BaseView {
        
        public img: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":40,"height":40},"child":[{"type":"Image","props":{"y":20,"x":20,"width":38,"var":"img","skin":"","height":38,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.homeland.bufItemUI.uiView);
            
        }
    }
}

module ui.homeland {
    
    export class HeadViewUI extends BaseView {
        
        public _pinzhi: Laya.Image;
        public head: Laya.Image;
        public _name: Laya.Label;
        public zhenwang: Laya.Label;
        public di: Laya.ProgressBar;
        public _jinbi: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":110,"height":140},"child":[{"type":"Image","props":{"y":0,"x":5,"width":100,"skin":"homeland/img_zhuangbeikuang.png","height":125},"child":[{"type":"Image","props":{"y":5,"x":5,"width":90,"var":"_pinzhi","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":80}},{"type":"Image","props":{"y":12,"x":17,"width":66,"var":"head","height":66}}]},{"type":"Image","props":{"y":85,"x":0,"width":110,"skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"var":"_name","text":"未上阵英雄","strokeColor":"#051204","stroke":2,"fontSize":14,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true,"align":"left"}},{"type":"Label","props":{"y":2,"x":78,"visible":false,"var":"zhenwang","text":"阵亡","strokeColor":"#051204","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true}}]},{"type":"ProgressBar","props":{"y":103,"x":5,"width":100,"var":"di","value":0.1,"skin":"homeland/p.png","sizeGrid":"5,6,5,6"},"child":[{"type":"Label","props":{"y":3,"x":2,"width":96,"var":"_jinbi","text":"0/5","strokeColor":"#051204","stroke":2,"fontSize":14,"color":"#FFFFFF","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.homeland.HeadViewUI.uiView);
            
        }
    }
}

module ui.homeland {
    
    export interface IMajorCityDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onChair_bufClick2(e: Laya.Event): void;
        onTamingmob_bufClick2(e: Laya.Event): void;
        onPet_bufClick2(e: Laya.Event): void;
        onRing_bufClick2(e: Laya.Event): void;
        onBtnBack2Click(e: Laya.Event): void;
        onTaskMsg2Click2(e: Laya.Event): void;
        onBtnAutoClick(e: Laya.Event): void;
        onBtnTeamClick(e: Laya.Event): void;
        
    }
    export class MajorCityDlgUI extends BaseDialog {
        
        public di: Laya.Image;
        public _biaoti: Laya.Image;
        public guanka: Laya.Label;
        public btnBack: Laya.Image;
        public title: Laya.Label;
        public _head: Laya.Image;
        public h7: ui.homeland.HeadViewUI;
        public h6: ui.homeland.HeadViewUI;
        public h5: ui.homeland.HeadViewUI;
        public h4: ui.homeland.HeadViewUI;
        public h3: ui.homeland.HeadViewUI;
        public h2: ui.homeland.HeadViewUI;
        public h1: ui.homeland.HeadViewUI;
        public _dibu: Laya.Image;
        public s1: Laya.Image;
        public skill_new1: Laya.Image;
        public skill_suo1: Laya.Label;
        public name1: Laya.Label;
        public s2: Laya.Image;
        public skill_new2: Laya.Image;
        public skill_suo2: Laya.Label;
        public name2: Laya.Label;
        public s3: Laya.Image;
        public skill_new3: Laya.Image;
        public skill_suo3: Laya.Label;
        public name3: Laya.Label;
        public s4: Laya.Image;
        public skill_new4: Laya.Image;
        public skill_suo4: Laya.Label;
        public name4: Laya.Label;
        public boss_hp: Laya.ProgressBar;
        public boss_text: Laya.Label;
        public bufstate: Laya.Image;
        public _hp: Laya.Label;
        public _atk: Laya.Label;
        public _def: Laya.Label;
        public _matk: Laya.Label;
        public _mdef: Laya.Label;
        public _target: Laya.Label;
        public _miss: Laya.Label;
        public _baoji: Laya.Label;
        public _atkspeed: Laya.Label;
        public _walkspeed: Laya.Label;
        public _summon: Laya.Label;
        public _tuiguang: Laya.Label;
        public chair_buf: app.char.bagItem;
        public tamingmob_buf: app.char.bagItem;
        public pet_buf: app.char.bagItem;
        public ring_buf: app.char.bagItem;
        public map_time: Laya.Image;
        public clip1: Laya.Clip;
        public clip2: Laya.Clip;
        public clip3: Laya.Clip;
        public clip4: Laya.Clip;
        public clip5: Laya.Clip;
        public clip6: Laya.Clip;
        public btnBack2: Laya.Image;
        public keyhead: Laya.Image;
        public sphead: Laya.Image;
        public huobi: Laya.Image;
        public rongyu: Laya.Label;
        public jinbi: Laya.Label;
        public zuanshi: Laya.Label;
        public hpmp: Laya.Image;
        public hp: Laya.Image;
        public mp: Laya.Image;
        public lv: Laya.Label;
        public _name: Laya.Label;
        public expdi: Laya.Image;
        public expbar: Laya.Image;
        public lstBuf: ListView;
        public testChat: app.common.ChatView;
        public taskMsg: Laya.Image;
        public content: Laya.Image;
        public task_name: Laya.Label;
        public taskMsg2: Laya.Label;
        public _map: Laya.Label;
        public _huoli: Laya.Label;
        public btnAuto: Laya.Image;
        public btnTeam: Laya.Image;
        public ggdi: Laya.Image;
        public gtxt1: Laya.Label;
        public gtxt2: Laya.Label;
        public xiulianExp: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":1080,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"width":800,"var":"di","mouseThrough":true,"height":600}},{"type":"Image","props":{"y":31,"x":250,"width":300,"var":"_biaoti","skin":"homeland/img_mingchengdi.png"},"child":[{"type":"Label","props":{"y":14,"x":0,"width":300,"var":"guanka","text":"关卡1：最初的地方","strokeColor":"#FFFFFF","stroke":2,"fontSize":20,"color":"#227095","bold":true,"align":"center"}},{"type":"Image","props":{"y":20,"x":239,"var":"btnBack","skin":"homeland/close.png"},"child":[{"type":"Label","props":{"y":13,"x":3,"var":"title","text":"逃跑","strokeColor":"#FFFFFF","stroke":3,"fontSize":24,"color":"#8d1e1d","bold":true}}]}]},{"type":"Image","props":{"y":422,"x":50,"width":700,"var":"_head","height":160},"child":[{"type":"HeadView","props":{"y":-213,"x":814,"visible":false,"var":"h7","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":587,"var":"h6","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":470,"var":"h5","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":353,"var":"h4","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":237,"var":"h3","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":120,"var":"h2","runtime":"ui.homeland.HeadViewUI"}},{"type":"HeadView","props":{"y":17,"x":3,"var":"h1","runtime":"ui.homeland.HeadViewUI"}}]},{"type":"Image","props":{"y":447,"x":0,"width":800,"var":"_dibu","mouseThrough":true,"height":160},"child":[{"type":"Image","props":{"y":10,"x":0,"width":810,"visible":false,"mouseThrough":true,"height":155}},{"type":"Image","props":{"y":25,"x":180,"width":110,"var":"s1","skin":"common/img_common_frame.png","height":110},"child":[{"type":"Image","props":{"y":15,"x":20,"visible":false,"var":"skill_new1","skin":"homeland/img_add.png"}},{"type":"Label","props":{"y":41,"x":3,"width":100,"var":"skill_suo1","text":"5级解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":105,"x":185,"width":100,"skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"y":2,"x":10,"var":"name1","text":"太阳神光介","fontSize":16,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Image","props":{"y":25,"x":305,"width":110,"var":"s2","skin":"common/img_common_frame.png","height":110},"child":[{"type":"Image","props":{"y":15,"x":20,"visible":false,"var":"skill_new2","skin":"homeland/img_add.png"}},{"type":"Label","props":{"y":41,"x":3,"width":100,"var":"skill_suo2","text":"10级解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":105,"x":310,"width":100,"skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"y":2,"x":10,"var":"name2","text":"太阳神光介","fontSize":16,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Image","props":{"y":25,"x":430,"width":110,"var":"s3","skin":"common/img_common_frame.png","height":110},"child":[{"type":"Image","props":{"y":15,"x":20,"visible":false,"var":"skill_new3","skin":"homeland/img_add.png"}},{"type":"Label","props":{"y":41,"x":3,"width":100,"var":"skill_suo3","text":"15级解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":105,"x":435,"width":100,"skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"y":2,"x":10,"var":"name3","text":"太阳神光介","fontSize":16,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Image","props":{"y":25,"x":555,"width":110,"var":"s4","skin":"common/img_common_frame.png","height":110},"child":[{"type":"Image","props":{"y":15,"x":20,"visible":false,"var":"skill_new4","skin":"homeland/img_add.png"}},{"type":"Label","props":{"y":41,"x":3,"width":100,"var":"skill_suo4","text":"20级解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":20,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":105,"x":560,"width":100,"skin":"homeland/img_mingchengdi.png","height":20},"child":[{"type":"Label","props":{"y":2,"x":10,"var":"name4","text":"太阳神光介","fontSize":16,"color":"#FFFFFF","centerX":0,"bold":true}}]}]},{"type":"ProgressBar","props":{"y":100,"x":75,"width":649,"var":"boss_hp","value":1,"skin":"homeland/progress_zhandouxuetiao.png","sizeGrid":"10,20,10,20","height":34},"child":[{"type":"Label","props":{"var":"boss_text","strokeColor":"#000000","stroke":2,"fontSize":20,"color":"#ffffff","centerY":0,"centerX":0}}]},{"type":"Image","props":{"y":-1,"x":-1,"width":300,"var":"bufstate","height":300},"child":[{"type":"Image","props":{"y":82,"x":2,"width":135,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":260,"alpha":0.4}},{"type":"Label","props":{"y":85,"x":2,"width":115,"text":"全体光环加成","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":105,"x":2,"width":115,"var":"_hp","text":"生命：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":124,"x":2,"width":115,"var":"_atk","text":"攻击力：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":144,"x":2,"width":115,"var":"_def","text":"防御力：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":163,"x":2,"width":115,"var":"_matk","text":"魔法攻击力：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":182,"x":2,"width":115,"var":"_mdef","text":"魔法防御力：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":202,"x":2,"width":115,"var":"_target","text":"命中率：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":221,"x":2,"width":115,"var":"_miss","text":"回避率：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":241,"x":2,"width":115,"var":"_baoji","text":"暴击率：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":260,"x":2,"width":115,"var":"_atkspeed","text":"攻击速度：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":279,"x":2,"width":115,"var":"_walkspeed","text":"移动速度：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":299,"x":2,"width":115,"var":"_summon","text":"召唤兽：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":318,"x":2,"width":115,"var":"_tuiguang","text":"认证加成：0%","strokeColor":"#0f7e88","stroke":1,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"bagItem","props":{"y":1,"x":243,"var":"chair_buf","runtime":"app.char.bagItem"}},{"type":"bagItem","props":{"y":1,"x":2,"var":"tamingmob_buf","runtime":"app.char.bagItem"}},{"type":"bagItem","props":{"y":1,"x":82,"var":"pet_buf","runtime":"app.char.bagItem"}},{"type":"bagItem","props":{"y":1,"x":163,"var":"ring_buf","runtime":"app.char.bagItem"}}]},{"type":"Image","props":{"y":35,"x":276,"width":330,"var":"map_time","skin":"homeland/img_daojishidi.png","sizeGrid":"20,20,20,20","scaleY":0.75,"scaleX":0.75,"height":80},"child":[{"type":"Clip","props":{"x":-10,"visible":false,"var":"clip1","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":30,"visible":false,"var":"clip2","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":110,"var":"clip3","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":150,"var":"clip4","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":212,"var":"clip5","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Clip","props":{"x":252,"var":"clip6","skin":"homeland/clip_daojishishuzi.png","clipX":10,"clipWidth":40,"centerY":0}},{"type":"Label","props":{"y":10,"x":10,"text":"剩余时间","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":66,"visible":false,"text":"小时","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":186,"text":"分","fontSize":22,"color":"#cacdb3"}},{"type":"Label","props":{"y":40,"x":290,"text":"秒","fontSize":22,"color":"#cacdb3"}}]},{"type":"Image","props":{"y":51,"x":489,"var":"btnBack2","skin":"homeland/close.png"},"child":[{"type":"Label","props":{"y":13,"x":3,"text":"离开","strokeColor":"#FFFFFF","stroke":3,"fontSize":24,"color":"#8d1e1d","bold":true}}]},{"type":"Image","props":{"y":28,"x":504,"width":800,"var":"keyhead","skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","height":160,"alpha":0.4}},{"type":"Image","props":{"y":60,"x":4,"visible":false,"var":"sphead","mouseThrough":true,"mouseEnabled":true,"hitTestPrior":false},"child":[{"type":"Image","props":{"y":-33,"x":190,"width":348,"var":"huobi","height":30},"child":[{"type":"Image","props":{"y":-2,"x":0,"width":345,"skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","height":85,"alpha":0.4}},{"type":"Image","props":{"y":0,"x":-2,"width":345,"skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","height":29,"alpha":0.5}},{"type":"Image","props":{"y":1,"x":100,"skin":"homeland/02028044.info.icon.png"},"child":[{"type":"Label","props":{"y":6,"x":24,"width":90,"var":"rongyu","text":"0","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":3,"x":-1,"skin":"homeland/02022995.info.icon.png"},"child":[{"type":"Label","props":{"y":3,"x":23,"width":90,"var":"jinbi","text":"0","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":-3,"x":209,"skin":"homeland/02048719.info.icon.png"},"child":[{"type":"Label","props":{"y":11,"x":23,"width":90,"var":"zuanshi","text":"0","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":514,"x":90,"var":"hpmp","skin":"homeland/mainBar.status.backgrnd.png"},"child":[{"type":"Image","props":{"y":-27,"x":-7,"skin":"homeland/mainBar.status.layer_cover.png"}},{"type":"Image","props":{"y":1,"x":19,"width":169,"skin":"homeland/mainBar.status.gauge.hp.layer_0.png","height":12},"child":[{"type":"Image","props":{"y":0,"x":0,"width":169,"var":"hp","skin":"homeland/mainBar.status.gauge.hp.layer_0.png","renderType":"mask","height":12}}]},{"type":"Image","props":{"y":18,"x":19,"width":169,"skin":"homeland/mainBar.status.gauge.mp.layer_0.png","height":12},"child":[{"type":"Image","props":{"y":0,"x":0,"width":169,"var":"mp","skin":"homeland/mainBar.status.gauge.mp.layer_0.png","renderType":"mask","height":12}}]},{"type":"Label","props":{"y":-24,"x":29,"width":100,"var":"lv","text":"Lv. 200","stroke":2,"fontSize":15,"color":"#FFFFFF","bold":true,"align":"left"},"child":[{"type":"Label","props":{"y":0,"x":60,"width":100,"var":"_name","text":"名字","stroke":2,"fontSize":15,"color":"#FFFFFF","bold":true,"align":"right"}}]},{"type":"Image","props":{"y":-22,"x":0,"skin":"homeland/mainBar.status.layer_Lv.png"}}]}]},{"type":"Image","props":{"y":530,"x":-3,"width":694,"var":"expdi","skin":"homeland/expdi.png","height":10},"child":[{"type":"Image","props":{"y":0,"x":0,"width":4,"var":"expbar","skin":"homeland/expbar.png","height":10}}]},{"type":"ListView","props":{"x":190,"width":400,"var":"lstBuf","scaleY":0.85,"scaleX":0.85,"height":43},"child":[{"type":"bufItem","props":{"runtime":"app.homeland.bufItem","name":"render"}}]},{"type":"ChatView","props":{"y":77,"x":-4,"var":"testChat","runtime":"app.common.ChatView","mouseThrough":true},"child":[{"type":"Image","props":{"y":76,"x":0,"width":345,"var":"taskMsg","mouseThrough":true,"height":80},"child":[{"type":"Image","props":{"y":0,"x":0,"width":345,"skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","height":80,"alpha":0.4}},{"type":"Image","props":{"y":33,"x":4,"width":333,"var":"content","height":41}},{"type":"Label","props":{"y":6,"x":85,"width":250,"var":"task_name","text":"死对方","strokeColor":"#1e6faf","stroke":2,"leading":3,"height":22,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":2,"x":4,"skin":"homeland/Quest.quest_info.summary_icon.summary.png"}},{"type":"Label","props":{"y":35,"x":255,"var":"taskMsg2","underline":true,"text":"\\n查看详情","fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]}]},{"type":"Label","props":{"y":510,"x":0,"width":170,"var":"_map","text":"10010000.img","stroke":2,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":31,"x":236,"width":100,"visible":false,"var":"_huoli","text":"体力：100%","stroke":2,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":114,"x":369,"var":"btnAuto","skin":"homeland/QuestAlarm.BtAuto.mouseOver.0.png","scaleY":2.5,"scaleX":2.5}},{"type":"Image","props":{"y":65,"x":465,"width":112,"var":"btnTeam","skin":"homeland/PartySearch.icon0.5.png","pivotY":25,"pivotX":101,"height":68}},{"type":"Image","props":{"y":-60,"x":-4,"width":1079,"var":"ggdi","skin":"homeland/img_shuxingtishengdi.png","sizeGrid":"5,5,5,5","height":30},"child":[{"type":"Label","props":{"y":3,"var":"gtxt1","text":"抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。沉迷游戏伤身，适度游戏益脑。合理安排时间，享受健康生活。","fontSize":20,"color":"#efcb0b"}},{"type":"Label","props":{"y":3,"x":0,"var":"gtxt2","text":"抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。沉迷游戏伤身，适度游戏益脑。合理安排时间，享受健康生活。","fontSize":20,"color":"#efcb0b"}}]}]},{"type":"Label","props":{"y":31,"x":4,"wordWrap":true,"width":300,"var":"xiulianExp","text":"经验加成：0%","strokeColor":"#0f7e88","stroke":3,"leading":10,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["ui.homeland.HeadViewUI"] = ui.homeland.HeadViewUI;
            View.viewClassMap["app.char.bagItem"] = app.char.bagItem;
            View.viewClassMap["app.homeland.bufItem"] = app.homeland.bufItem;
            View.viewClassMap["app.common.ChatView"] = app.common.ChatView;
            super.createChildren();
            this.createView(ui.homeland.MajorCityDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"chair_buf":["click2"],"tamingmob_buf":["click2"],"pet_buf":["click2"],"ring_buf":["click2"],"btnBack2":["click"],"taskMsg2":["click2"],"btnAuto":["click"],"btnTeam":["click"]});
        }
        onClose(): void {
            this.h7.onClose();
            this.h6.onClose();
            this.h5.onClose();
            this.h4.onClose();
            this.h3.onClose();
            this.h2.onClose();
            this.h1.onClose();
            this.chair_buf.onClose();
            this.tamingmob_buf.onClose();
            this.pet_buf.onClose();
            this.ring_buf.onClose();
            this.testChat.onClose();
        }
    }
}

module ui.libao {
    
    export interface ILiBaoDlgUI {
        onBtn_closeClick(e: Laya.Event): void;
        onLstLiBaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onLibaoClick(e: Laya.Event): void;
        onDayClick(e: Laya.Event): void;
        onChongzhiClick(e: Laya.Event): void;
        
    }
    export class LiBaoDlgUI extends BaseDialog {
        
        public btn_close: Laya.Image;
        public lstLiBao: ListView;
        public libao: Laya.Image;
        public day: Laya.Image;
        public chongzhi: Laya.Image;
        public tip0: Laya.Image;
        public tip2: Laya.Image;
        public tip1: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":740,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"homeland/img_xuanjuejuanzhou.png","height":480},"child":[{"type":"Image","props":{"y":29,"x":335,"skin":"common/lb.png"}}]},{"type":"Image","props":{"y":21,"x":658,"width":50,"var":"btn_close","height":50},"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"ListView","props":{"y":76,"x":50,"width":620,"var":"lstLiBao","height":340},"child":[{"type":"libaoItem","props":{"runtime":"app.libao.libaoItem","name":"render"}}]},{"type":"Image","props":{"y":107,"x":714,"var":"libao","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"等\\n级","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":237,"x":714,"visible":false,"var":"day","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"每\\n日","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":172,"x":714,"var":"chongzhi","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"充\\n值","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":94,"x":712,"width":26,"visible":false,"var":"tip0","skin":"homeland/img_tishi.png","height":26}},{"type":"Image","props":{"y":159,"x":712,"width":26,"visible":false,"var":"tip2","skin":"homeland/img_tishi.png","height":26}},{"type":"Image","props":{"y":224,"x":712,"width":26,"visible":false,"var":"tip1","skin":"homeland/img_tishi.png","height":26}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.libao.libaoItem"] = app.libao.libaoItem;
            super.createChildren();
            this.createView(ui.libao.LiBaoDlgUI.uiView);
            this.registerEvents({"btn_close":["click"],"lstLiBao":["cellChildClick"],"libao":["click"],"day":["click"],"chongzhi":["click"]});
        }
    }
}

module ui.libao {
    
    export interface IlibaoItemUI {
        onTaskprospClick(e: Laya.Event): void;
        onReward1Click(e: Laya.Event): void;
        onReward2Click(e: Laya.Event): void;
        onReward3Click(e: Laya.Event): void;
        onReward4Click(e: Laya.Event): void;
        
    }
    export class libaoItemUI extends CellView {
        
        public taskname: Laya.Label;
        public taskprosp: Laya.Button;
        public jindu: Laya.Label;
        public reward_item1: Laya.Image;
        public reward1: Laya.Image;
        public reward_num1: Laya.Label;
        public reward_item2: Laya.Image;
        public reward2: Laya.Image;
        public reward_num2: Laya.Label;
        public reward_item3: Laya.Image;
        public reward3: Laya.Image;
        public reward_num3: Laya.Label;
        public reward_item4: Laya.Image;
        public reward4: Laya.Image;
        public reward_num4: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":620,"height":95},"child":[{"type":"Image","props":{"y":0,"x":0,"width":620,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":90,"alpha":0.15}},{"type":"Image","props":{"y":3,"x":3,"width":140,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":40,"alpha":0.1}},{"type":"Label","props":{"y":8,"x":10,"var":"taskname","text":"新手礼包","fontSize":20,"color":"#553b14","bold":true}},{"type":"Button","props":{"y":34,"x":500,"width":110,"var":"taskprosp","stateNum":"2","skin":"homeland/btn_big.png","height":40}},{"type":"Label","props":{"y":45,"x":471,"width":100,"var":"jindu","text":"完成","fontSize":18,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":170,"width":66,"var":"reward_item1","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":170,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward1","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":175,"width":60,"var":"reward_num1","text":"1","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":250,"width":66,"var":"reward_item2","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":250,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward2","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":255,"width":60,"var":"reward_num2","text":"1","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":330,"width":66,"var":"reward_item3","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":330,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward3","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":335,"width":60,"var":"reward_num3","text":"1","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":410,"width":66,"var":"reward_item4","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":410,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward4","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":415,"width":60,"var":"reward_num4","text":"1","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Label","props":{"y":1,"x":170,"text":"可获得奖励：                                               当前进度：","fontSize":18,"color":"#FFFFFF","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.libao.libaoItemUI.uiView);
            this.registerEvents({"taskprosp":["click"],"reward1":["click"],"reward2":["click"],"reward3":["click"],"reward4":["click"]});
        }
    }
}

module ui.login {
    
    export interface IkeyDlgUI {
        onLstkeyCellClick(e: Laya.Event, index: number): void;
        onBtnSClick(e: Laya.Event): void;
        onBtnOKClick(e: Laya.Event): void;
        onBtnBClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class keyDlgUI extends BaseDialog {
        
        public lstkey: ListView;
        public btnS: Laya.Image;
        public btnOK: Laya.Image;
        public btnB: Laya.Image;
        public btnBack: Laya.Image;
        public zh: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":100,"x":31,"skin":"keyboard/Common.SoftKey.backgrnd.png","scaleY":1.25,"scaleX":1.25},"child":[{"type":"ListView","props":{"y":90,"x":36,"width":518,"var":"lstkey","height":178},"child":[{"type":"keyItem","props":{"runtime":"app.login.keyItem","name":"render"}}]},{"type":"Image","props":{"y":47,"x":23,"var":"btnS","skin":"keyboard/Common.SoftKey.BtShift.normal.0.png"}},{"type":"Image","props":{"y":277,"x":245,"var":"btnOK","skin":"keyboard/Common.SoftKey.BtOK.normal.0.png"}},{"type":"Image","props":{"y":47,"x":116,"var":"btnB","skin":"keyboard/Common.SoftKey.BtDel.normal.0.png"}},{"type":"Image","props":{"y":30,"x":559,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]}]},{"type":"Label","props":{"y":168,"x":299,"width":247,"var":"zh","strokeColor":"#FFFFFF","stroke":2,"height":34,"fontSize":26,"color":"#892ab7","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.login.keyItem"] = app.login.keyItem;
            super.createChildren();
            this.createView(ui.login.keyDlgUI.uiView);
            this.registerEvents({"lstkey":["cellClick"],"btnS":["click"],"btnOK":["click"],"btnB":["click"],"btnBack":["click"]});
        }
    }
}

module ui.login {
    
    export class keyItemUI extends CellView {
        
        public img: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":47,"height":45},"child":[{"type":"Image","props":{"y":2,"x":2,"var":"img","skin":"keyboard/Common.SoftKey.BtHighCase.0.normal.0.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.login.keyItemUI.uiView);
            
        }
    }
}

module ui.login {
    
    export interface IloginDlgUI {
        onBtnStartClick(e: Laya.Event): void;
        onBtnipClick(e: Laya.Event): void;
        
    }
    export class loginDlgUI extends BaseDialog {
        
        public img2: Laya.Image;
        public banhao: Laya.Label;
        public server_sp: Laya.Image;
        public fu: ui.login.ServerItemUI;
        public _zh: Laya.TextInput;
        public btnStart: Laya.Button;
        public btnip: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"width":800,"var":"img2","skin":"common/fengmian.jpg","mouseThrough":true,"height":600,"centerX":0}},{"type":"Image","props":{"y":182,"x":251,"skin":"common/Title_new.MSTitle.png","scaleY":0.75,"scaleX":0.75}},{"type":"Label","props":{"y":5,"x":5,"var":"banhao","text":"版本号：0.1.0.5","strokeColor":"#051204","stroke":3,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"center"},"child":[{"type":"Image","props":{"y":0,"x":-5,"width":300,"var":"server_sp","height":150},"child":[{"type":"ServerItem","props":{"y":30,"x":0,"var":"fu","runtime":"ui.login.ServerItemUI"}}]}]},{"type":"TextInput","props":{"y":418,"x":271,"width":257,"var":"_zh","skin":"common/img_xuanjuejuemingcheng.png","sizeGrid":"15,17,16,16","promptColor":"#07ec47","prompt":"输入账号","multiline":false,"mouseEnabled":false,"maxChars":8,"height":48,"fontSize":26,"editable":true,"color":"#07ec47","bold":true,"align":"center"},"child":[{"type":"Image","props":{"y":5,"x":-77,"skin":"common/txt_zhanghao.png"}}]},{"type":"Button","props":{"y":515,"x":400,"width":228,"var":"btnStart","stateNum":"2","skin":"common/btn_kaishiyouxi1.png","height":66,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":418,"x":271,"width":257,"var":"btnip","height":48}},{"type":"Image","props":{"y":550,"x":170,"width":460,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":34,"alpha":0.3}},{"type":"Image","props":{"y":551,"x":159,"skin":"common/mrzh.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["ui.login.ServerItemUI"] = ui.login.ServerItemUI;
            super.createChildren();
            this.createView(ui.login.loginDlgUI.uiView);
            this.registerEvents({"btnStart":["click"],"btnip":["click"]});
        }
        onClose(): void {
            this.fu.onClose();
        }
    }
}

module ui.login {
    
    export class ServerItemUI extends CellView {
        
        public imgStatus: Laya.Image;
        public lblId: Laya.Label;
        public imgNew: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":230,"height":40},"child":[{"type":"Image","props":{"y":0,"x":0,"width":230,"skin":"common/img_xuanjuejuemingcheng.png","sizeGrid":"15,17,16,16","height":40}},{"type":"Image","props":{"y":16,"x":11,"var":"imgStatus","skin":"homeland/img_xitongfanmang.png","scaleY":0.9,"scaleX":0.9}},{"type":"Label","props":{"y":11,"x":30,"width":25,"var":"lblId","text":"S101 服务器五字","height":16,"fontSize":18,"color":"#b2c9df"}},{"type":"Image","props":{"y":6,"x":195,"var":"imgNew","skin":"homeland/txt_xin.png","scaleY":0.8,"scaleX":0.8}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.login.ServerItemUI.uiView);
            
        }
    }
}

module ui.login {
    
    export interface IServerListDlgUI {
        onLstAllCellClick(e: Laya.Event, index: number): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class ServerListDlgUI extends BaseDialog {
        
        public lstAll: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":620,"height":380,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":620,"skin":"homeland/Notice.backgrnd.0.png","sizeGrid":"5,5,5,5","height":380}},{"type":"Image","props":{"y":9,"x":225,"skin":"common/txt_fuwuqiliebiao.png","centerX":1}},{"type":"Image","props":{"y":85,"x":48,"skin":"common/txt_quanbufuwuqi.png"}},{"type":"ListView","props":{"y":130,"x":45,"width":530,"var":"lstAll","height":222},"child":[{"type":"ServerItem","props":{"y":0,"x":0,"width":290,"runtime":"app.login.ServerItem","name":"render","height":60}}]},{"type":"Image","props":{"y":95,"x":447,"skin":"homeland/img_xitongliuchang.png"}},{"type":"Label","props":{"y":92,"x":467,"text":"流畅","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true}},{"type":"Image","props":{"y":95,"x":512,"skin":"homeland/img_xitongfanmang.png"}},{"type":"Label","props":{"y":92,"x":532,"text":"爆满","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true}},{"type":"Image","props":{"y":20,"x":599,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.login.ServerItem"] = app.login.ServerItem;
            super.createChildren();
            this.createView(ui.login.ServerListDlgUI.uiView);
            this.registerEvents({"lstAll":["cellClick"],"btnBack":["click"]});
        }
    }
}

module ui.logo {
    
    export class logoDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"width":800,"var":"bg","height":600}},{"type":"Image","props":{"y":250,"x":255,"skin":"common/logo1.png"}},{"type":"Image","props":{"y":310,"x":183,"skin":"common/logo2.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.logo.logoDlgUI.uiView);
            
        }
    }
}

module ui.pet {
    
    export interface IpetDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onLstPetCellClick(e: Laya.Event, index: number): void;
        onEqp_petClick2(e: Laya.Event): void;
        
    }
    export class petDlgUI extends BaseDialog {
        
        public btnBack: Laya.Button;
        public lstPet: ListView;
        public eqp_pet: app.char.bagItem;
        public jc1: Laya.Label;
        public jc2: Laya.Label;
        public jc3: Laya.Label;
        public jc4: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"homeland/Notice.backgrnd.0.png","height":400,"events":"click"},"child":[{"type":"Label","props":{"y":15,"x":274,"text":"宠物","strokeColor":"#051204","stroke":4,"fontSize":26,"color":"#FFFFFF","bold":true}}]},{"type":"Button","props":{"y":11,"x":556,"var":"btnBack","stateNum":"1","skin":"homeland/img_unload.png"}},{"type":"ListView","props":{"y":148,"x":262,"width":320,"var":"lstPet","height":239},"child":[{"type":"wfbagItem","props":{"runtime":"app.char.petItem","name":"render"}},{"type":"bagItem","props":{"y":-95,"x":2,"var":"eqp_pet","runtime":"app.char.bagItem"}}]},{"type":"Image","props":{"y":129,"x":-325},"child":[{"type":"Label","props":{"y":130,"x":350,"width":115,"text":"全体光环加成","strokeColor":"#997866","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":159,"x":350,"width":115,"var":"jc1","text":"攻击力：1%","strokeColor":"#997866","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":186,"x":350,"width":115,"var":"jc2","text":"防御力：1%","strokeColor":"#997866","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":212,"x":350,"width":115,"var":"jc3","text":"魔法攻击力：1%","strokeColor":"#997866","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":239,"x":350,"width":115,"var":"jc4","text":"魔法防御力：1%","strokeColor":"#997866","stroke":2,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"left"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.char.petItem"] = app.char.petItem;
            View.viewClassMap["app.char.bagItem"] = app.char.bagItem;
            super.createChildren();
            this.createView(ui.pet.petDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"lstPet":["cellClick"],"eqp_pet":["click2"]});
        }
        onClose(): void {
            this.eqp_pet.onClose();
        }
    }
}

module ui.pvp {
    
    export interface IpmsgDlgUI {
        onBtnYesClick(e: Laya.Event): void;
        onBtnNoClick(e: Laya.Event): void;
        
    }
    export class pmsgDlgUI extends BaseDialog {
        
        public _txt: Laya.Label;
        public btnYes: Laya.Button;
        public btnNo: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":360,"height":240,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":360,"skin":"homeland/Notice.backgrnd.0.png","height":240}},{"type":"Label","props":{"y":13,"x":154,"text":"提示","strokeColor":"#051204","stroke":3,"fontSize":26,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"x":30,"wordWrap":true,"width":300,"var":"_txt","text":"确定要挑战他(她)？","strokeColor":"#FFFFFF","stroke":3,"leading":10,"fontSize":26,"color":"#8d1e1d","centerY":0,"centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":201,"x":125,"var":"btnYes","stateNum":"1","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":201,"x":245,"var":"btnNo","stateNum":"1","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.pvp.pmsgDlgUI.uiView);
            this.registerEvents({"btnYes":["click"],"btnNo":["click"]});
        }
    }
}

module ui.pvp {
    
    export interface Ipvp2DlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onLstPvpCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        
    }
    export class pvp2DlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public btnBack: Laya.Image;
        public lstPvp: ListView;
        public vs: Laya.Image;
        public m_left: Laya.Image;
        public head1: Laya.Image;
        public lv1: Laya.Label;
        public name1: Laya.Label;
        public m_right: Laya.Image;
        public head2: Laya.Image;
        public lv2: Laya.Label;
        public name2: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":600,"height":450},"child":[{"type":"Image","props":{"y":0,"x":100,"width":400,"var":"bg","height":450},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":480,"alpha":0.75}},{"type":"Image","props":{"y":16,"x":369,"width":150,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"离开","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"ListView","props":{"y":60,"x":7,"width":485,"var":"lstPvp","height":355},"child":[{"type":"PvpRankItem","props":{"runtime":"app.pvp.PvpRankItem","name":"render"}}]},{"type":"Label","props":{"y":15,"x":140,"text":"玩家排名","strokeColor":"#0f60d9","stroke":3,"fontSize":30,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":435,"x":0,"width":400,"text":"以上为排名前十的玩家","strokeColor":"#051204","stroke":3,"fontSize":22,"color":"#b4a9a9","bold":true,"align":"center"}},{"type":"Label","props":{"y":485,"x":11,"visible":false,"text":"第1名:1000黑金;  第2-3名:5000枫叶;  第4-10名3000枫叶","strokeColor":"#051204","stroke":2,"fontSize":15,"color":"#b4a9a9","bold":true,"align":"center"}}]},{"type":"Image","props":{"visible":false,"var":"vs"},"child":[{"type":"Image","props":{"y":48,"x":-60,"width":438,"var":"m_left","skin":"homeland/img_zi.png","height":406},"child":[{"type":"Image","props":{"y":196,"x":98,"width":132,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":132,"alpha":0.8},"child":[{"type":"Label","props":{"y":-88,"x":34,"text":"进攻","strokeColor":"#8929ce","stroke":3,"fontSize":32,"color":"#e4b3fe"}}]},{"type":"Image","props":{"y":211,"x":221,"width":110,"var":"head1","skin":"homeland/head1.png","scaleX":-1,"height":110}},{"type":"Label","props":{"y":170,"width":150,"var":"lv1","text":"当前排名1","strokeColor":"#cbf32a","fontSize":22,"color":"#fbc903","centerX":-51,"bold":true,"align":"center"}},{"type":"Label","props":{"y":335,"width":150,"var":"name1","text":"我的六字名字","fontSize":22,"color":"#ffffff","centerX":-56,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":-12,"x":237,"width":423,"var":"m_right","skin":"homeland/img_lang.png","height":402},"child":[{"type":"Image","props":{"y":189,"x":179,"width":132,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":132,"alpha":0.8},"child":[{"type":"Label","props":{"y":-89,"x":34,"text":"防守","strokeColor":"#1075c3","stroke":3,"fontSize":32,"color":"#b3e0ff"}}]},{"type":"Image","props":{"y":199,"x":189,"width":110,"var":"head2","skin":"homeland/head2.png","height":110}},{"type":"Label","props":{"y":163,"x":172,"width":150,"var":"lv2","text":"当前排名2","strokeColor":"#cbf32a","height":22,"fontSize":22,"color":"#fbc903","bold":true,"align":"center"}},{"type":"Label","props":{"y":327,"width":150,"var":"name2","text":"对手六字名字","fontSize":22,"color":"#ffffff","centerX":35,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":195,"x":222,"skin":"homeland/txt_vs.png"}},{"type":"Label","props":{"y":449,"x":150,"width":300,"text":"准备开始战斗","strokeColor":"#051204","stroke":3,"fontSize":22,"color":"#b4a9a9","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.pvp.PvpRankItem"] = app.pvp.PvpRankItem;
            super.createChildren();
            this.createView(ui.pvp.pvp2DlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"lstPvp":["cellChildClick"]});
        }
    }
}

module ui.pvp {
    
    export interface IPvpRankItemUI {
        onImgBgClick(e: Laya.Event): void;
        onBattleClick(e: Laya.Event): void;
        
    }
    export class PvpRankItemUI extends CellView {
        
        public self: Laya.Image;
        public imgBg: Laya.Image;
        public lblName: Laya.Label;
        public lblLV: Laya.Label;
        public lblRank2: Laya.Label;
        public msg: Laya.Label;
        public rank: Laya.Image;
        public battle: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":380,"height":45},"child":[{"type":"Image","props":{"y":10,"x":324,"var":"self","skin":"homeland/Book.BtPrev.mouseOver.0.png","sizeGrid":"5,5,5,5"},"child":[{"type":"Image","props":{"y":-8,"x":-324,"width":305,"skin":"homeland/img_xuanzhongzhuangtai.png","sizeGrid":"22,22,22,22","height":40,"alpha":0.5}}]},{"type":"Image","props":{"y":0,"x":0,"width":305,"var":"imgBg","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":42,"alpha":0.5}},{"type":"Label","props":{"y":15,"x":115,"width":130,"var":"lblName","text":"暴走的萝莉","stroke":3,"height":24,"fontSize":20,"color":"#1850b4","bold":true,"align":"center"},"child":[{"type":"Label","props":{"y":3,"x":-65,"width":50,"var":"lblLV","text":"等级 100","stroke":3,"fontSize":18,"color":"#FFFFFF","align":"left"}},{"type":"Label","props":{"y":3,"x":130,"width":50,"var":"lblRank2","text":"NO.1","stroke":3,"fontSize":18,"color":"#FFFFFF","align":"right"}},{"type":"Label","props":{"y":-5,"x":274,"width":120,"visible":false,"var":"msg","text":"0 / 0 / 0","fontSize":18,"color":"#dbd8d8","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":2,"x":3,"var":"rank","skin":"homeland/img_wangguna1.png"}},{"type":"Image","props":{"y":7,"x":311,"width":66,"var":"battle","skin":"homeland/character_title_7.png"},"child":[{"type":"Label","props":{"y":5,"x":13,"text":"挑战","strokeColor":"#2063ab","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.pvp.PvpRankItemUI.uiView);
            this.registerEvents({"imgBg":["click"],"battle":["click"]});
        }
    }
}

module ui.qiandao {
    
    export interface IqiandaoDlgUI {
        onLstQianDaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class qiandaoDlgUI extends BaseDialog {
        
        public lstQianDao: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"homeland/img_xuanjuejuanzhou.png","sizeGrid":"68,33,18,33"}},{"type":"Image","props":{"y":60,"x":5,"width":710,"skin":"","sizeGrid":"13,13,14,12","height":410,"alpha":0.1}},{"type":"ListView","props":{"y":80,"x":65,"width":590,"var":"lstQianDao","height":340},"child":[{"type":"qiandaoItem","props":{"runtime":"app.qiandao.qiandaoItem","name":"render"}}]},{"type":"Label","props":{"y":30,"x":332,"text":"签到","strokeColor":"#051204","stroke":3,"fontSize":28,"color":"#FFFFFF","bold":true}},{"type":"Image","props":{"y":47,"x":684,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.qiandao.qiandaoItem"] = app.qiandao.qiandaoItem;
            super.createChildren();
            this.createView(ui.qiandao.qiandaoDlgUI.uiView);
            this.registerEvents({"lstQianDao":["cellChildClick"],"btnBack":["click"]});
        }
    }
}

module ui.qiandao {
    
    export interface IqiandaoItemUI {
        on_imgClick(e: Laya.Event): void;
        onBtnRewardClick(e: Laya.Event): void;
        
    }
    export class qiandaoItemUI extends CellView {
        
        public _img: Laya.Image;
        public _name: Laya.Label;
        public btnReward: Laya.Button;
        public _wancheng: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":85,"height":85},"child":[{"type":"Image","props":{"y":2,"x":2,"width":80,"skin":"homeland/img_zuoyizhezhao.png","height":80,"alpha":0.4}},{"type":"Image","props":{"y":42,"x":42,"var":"_img","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":0,"x":0,"width":60,"var":"_name","text":"10","strokeColor":"#FFFFFF","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true,"align":"left"}},{"type":"Button","props":{"y":61,"x":2,"width":80,"var":"btnReward","stateNum":"2","skin":"homeland/btn_big.png","height":24},"child":[{"type":"Label","props":{"y":4,"x":8,"text":"领取奖励","strokeColor":"#051204","stroke":3,"fontSize":16,"color":"#35f904","centerY":0,"centerX":0,"bold":true}}]},{"type":"Image","props":{"y":0,"x":0,"var":"_wancheng","skin":"homeland/AttendanceSystem.check.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.qiandao.qiandaoItemUI.uiView);
            this.registerEvents({"_img":["click"],"btnReward":["click"]});
        }
    }
}

module ui.quest {
    
    export interface IdetailDlgUI {
        onBtnContinueClick(e: Laya.Event): void;
        
    }
    export class detailDlgUI extends BaseDialog {
        
        public title: Laya.Label;
        public content: Laya.Panel;
        public btnContinue: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"width":380,"skin":"event/Delivery.Send_Info.backgrnd.png","height":240},"child":[{"type":"Image","props":{"y":31,"x":10,"width":360,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":200}}]},{"type":"Label","props":{"y":7,"x":90,"width":200,"var":"title","text":"label","fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Panel","props":{"y":39,"x":17,"width":345,"var":"content","height":186}},{"type":"Image","props":{"y":-7,"x":334,"var":"btnContinue","skin":"homeland/close.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.quest.detailDlgUI.uiView);
            this.registerEvents({"btnContinue":["click"]});
        }
    }
}

module ui.quest {
    
    export interface IquestDlgUI {
        onBtnContinueClick(e: Laya.Event): void;
        onBtnYesClick(e: Laya.Event): void;
        
    }
    export class questDlgUI extends BaseDialog {
        
        public title: Laya.Label;
        public btnNo: Laya.Image;
        public btnContinue: Laya.Image;
        public btnYes: Laya.Image;
        public content: Laya.Panel;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"width":380,"skin":"event/Delivery.Send_Info.backgrnd.png","height":240},"child":[{"type":"Image","props":{"y":31,"x":10,"width":360,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":200}}]},{"type":"Label","props":{"y":7,"x":90,"width":200,"var":"title","text":"label","fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":201,"x":130,"var":"btnNo","skin":"homeland/Notice.BtNo1.mouseOver.0.png","scaleY":1.25,"scaleX":1.25,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":201,"x":190,"var":"btnContinue","skin":"homeland/UtilDlgEx_Avatar_Zero.BtNext.normal.0.png","scaleY":1.25,"scaleX":1.25,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":201,"x":250,"var":"btnYes","skin":"homeland/Notice.BtYes1.mouseOver.0.png","scaleY":1.25,"scaleX":1.25,"anchorY":0.5,"anchorX":0.5}},{"type":"Panel","props":{"y":39,"x":17,"width":345,"var":"content","height":140}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.quest.questDlgUI.uiView);
            this.registerEvents({"btnContinue":["click"],"btnYes":["click"]});
        }
    }
}

module ui.quest {
    
    export interface IspeckDlgUI {
        onBtnContinueClick(e: Laya.Event): void;
        
    }
    export class speckDlgUI extends BaseDialog {
        
        public title: Laya.Label;
        public content: Laya.Panel;
        public btnContinue: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":380,"height":240},"child":[{"type":"Image","props":{"width":380,"skin":"event/Delivery.Send_Info.backgrnd.png","height":240},"child":[{"type":"Image","props":{"y":31,"x":10,"width":360,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":200}}]},{"type":"Label","props":{"y":7,"x":90,"width":200,"var":"title","text":"label","fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Panel","props":{"y":39,"x":17,"width":345,"var":"content","height":186}},{"type":"Image","props":{"y":-7,"x":334,"var":"btnContinue","skin":"homeland/close.png"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.quest.speckDlgUI.uiView);
            this.registerEvents({"btnContinue":["click"]});
        }
    }
}

module ui.select {
    
    export interface IselectDlgUI {
        onBtn_closeClick(e: Laya.Event): void;
        onLstJuanZhouCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        
    }
    export class selectDlgUI extends BaseDialog {
        
        public btn_close: Laya.Image;
        public lstJuanZhou: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":350},"child":[{"type":"Image","props":{"y":0,"x":320,"width":280,"skin":"homeland/Notice.backgrnd.0.png","height":350},"child":[{"type":"Image","props":{"y":17,"x":264,"var":"btn_close","skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":7,"x":114,"skin":"common/jz.png"}}]},{"type":"ListView","props":{"y":40,"x":334,"width":251,"var":"lstJuanZhou","height":290},"child":[{"type":"selectItem","props":{"runtime":"app.select.selectItem","name":"render"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.select.selectItem"] = app.select.selectItem;
            super.createChildren();
            this.createView(ui.select.selectDlgUI.uiView);
            this.registerEvents({"btn_close":["click"],"lstJuanZhou":["cellChildClick"]});
        }
    }
}

module ui.select {
    
    export interface IselectItemUI {
        onIconClick(e: Laya.Event): void;
        onUseClick(e: Laya.Event): void;
        
    }
    export class selectItemUI extends CellView {
        
        public img: Laya.Image;
        public icon: Laya.Image;
        public selectnum: Laya.Label;
        public selectname: Laya.Label;
        public use: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":251,"height":66},"child":[{"type":"Image","props":{"width":251,"var":"img","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":64,"alpha":0.2}},{"type":"Image","props":{"y":0,"x":0,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"icon","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":5,"x":7,"var":"selectnum","text":"label","stroke":3,"fontSize":16,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":20,"x":60,"var":"selectname","text":"名字","fontSize":14,"bold":true}},{"type":"Image","props":{"y":5,"x":185,"width":60,"var":"use","height":50},"child":[{"type":"Image","props":{"y":10,"x":0,"width":60,"skin":"homeland/character_title_7.png"},"child":[{"type":"Label","props":{"y":6,"x":12,"text":"使用","fontSize":18,"bold":true}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.select.selectItemUI.uiView);
            this.registerEvents({"icon":["click"],"use":["click"]});
        }
    }
}

module ui.shop {
    
    export interface IchangeNameDlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        
    }
    export class changeNameDlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public _name: Laya.TextInput;
        public static uiView: any = {"type":"BaseDialog","props":{"width":300,"height":210},"child":[{"type":"Image","props":{"y":0,"x":0,"width":300,"skin":"homeland/Notice.backgrnd.0.png","height":210,"events":"click"},"child":[{"type":"Label","props":{"y":13,"x":111,"text":"更名卡","strokeColor":"#051204","stroke":3,"fontSize":26,"color":"#FFFFFF","bold":true}}]},{"type":"Button","props":{"y":176,"x":150,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":87,"x":20,"width":260,"var":"_name","promptColor":"#e5b230","prompt":"请输入你的新名字","multiline":true,"maxChars":5,"height":35,"fontSize":24,"editable":true,"color":"#e5b230","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.shop.changeNameDlgUI.uiView);
            this.registerEvents({"btn_queren":["click"]});
        }
    }
}

module ui.shop {
    
    export interface Iqueren2DlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class queren2DlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public _show: Laya.Label;
        public btn_close: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":400,"height":280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"homeland/Notice.backgrnd.0.png","height":280,"events":"click"},"child":[{"type":"Image","props":{"y":12,"x":174,"skin":"common/tishi.png"}}]},{"type":"Button","props":{"y":237,"x":200,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.7,"scaleX":1.7,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":122,"x":25,"wordWrap":true,"width":350,"var":"_show","text":"确定购买？","strokeColor":"#FFFFFF","stroke":3,"leading":10,"fontSize":26,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Button","props":{"y":24,"x":377,"var":"btn_close","stateNum":"1","skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.shop.queren2DlgUI.uiView);
            this.registerEvents({"btn_queren":["click"],"btn_close":["click"]});
        }
    }
}

module ui.shop {
    
    export interface IquerenDlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        onBtnRmvClick(e: Laya.Event): void;
        onBtnAddClick(e: Laya.Event): void;
        
    }
    export class querenDlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public btn_close: Laya.Button;
        public _show: Laya.Label;
        public _num: Laya.Label;
        public btnRmv: Laya.Image;
        public btnAdd: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":400,"height":280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"homeland/Notice.backgrnd.0.png","height":280,"events":"click"},"child":[{"type":"Image","props":{"y":12,"x":174,"skin":"common/tishi.png"}}]},{"type":"Button","props":{"y":238,"x":200,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.7,"scaleX":1.7,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":24,"x":377,"var":"btn_close","stateNum":"1","skin":"homeland/img_unload.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":95,"x":25,"wordWrap":true,"width":350,"var":"_show","text":"消耗100木材兑换装备？","strokeColor":"#FFFFFF","stroke":3,"leading":10,"fontSize":26,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Image","props":{"y":157,"x":85,"width":230,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":38,"alpha":0.3}},{"type":"Label","props":{"y":162,"width":200,"var":"_num","text":"数量：1个","strokeColor":"#FFFFFF","stroke":3,"leading":10,"fontSize":26,"color":"#8d1e1d","centerX":0,"bold":true,"align":"center"},"child":[{"type":"Image","props":{"y":14,"x":8,"width":66,"var":"btnRmv","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":33,"x":33,"width":30,"stateNum":"1","skin":"homeland/Kite.Ranking.BtSmall.normal.0.png","sizeGrid":"2,2,2,2","height":30,"events":"click","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":14,"x":190,"width":66,"var":"btnAdd","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":33,"x":33,"width":30,"stateNum":"1","skin":"homeland/Kite.Ranking.BtBig.normal.0.png","sizeGrid":"2,2,2,2","height":30,"events":"click","anchorY":0.5,"anchorX":0.5}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.shop.querenDlgUI.uiView);
            this.registerEvents({"btn_queren":["click"],"btn_close":["click"],"btnRmv":["click"],"btnAdd":["click"]});
        }
    }
}

module ui.shop {
    
    export interface IshopDlgUI {
        onBtnShopClick2(e: Laya.Event): void;
        onBtnChairClick2(e: Laya.Event): void;
        onBtnPetClick2(e: Laya.Event): void;
        onBtnTamingMobClick2(e: Laya.Event): void;
        onBtnRingClick2(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        onShoplistCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        
    }
    export class shopDlgUI extends BaseDialog {
        
        public btnShop: Laya.Image;
        public btnChair: Laya.Image;
        public btnPet: Laya.Image;
        public btnTamingMob: Laya.Image;
        public btnRing: Laya.Image;
        public btn_close: Laya.Image;
        public shoplist: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"y":0,"x":0,"width":720,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"homeland/img_xuanjuejuanzhou.png","height":480},"child":[{"type":"Image","props":{"y":30,"x":335,"skin":"common/sd.png"}}]},{"type":"Image","props":{"y":75,"x":690,"var":"btnShop","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"杂\\n货","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":335,"x":690,"var":"btnChair","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"椅\\n子","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":140,"x":690,"var":"btnPet","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"宠\\n物","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":205,"x":690,"var":"btnTamingMob","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"坐\\n骑","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":270,"x":690,"var":"btnRing","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"戒\\n指","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":46,"x":683,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]},{"type":"ListView","props":{"y":78,"x":65,"width":620,"var":"shoplist","height":340},"child":[{"type":"shopItem","props":{"runtime":"app.shop.shopItem","name":"render"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.shop.shopItem"] = app.shop.shopItem;
            super.createChildren();
            this.createView(ui.shop.shopDlgUI.uiView);
            this.registerEvents({"btnShop":["click2"],"btnChair":["click2"],"btnPet":["click2"],"btnTamingMob":["click2"],"btnRing":["click2"],"btn_close":["click"],"shoplist":["cellChildClick"]});
        }
    }
}

module ui.shop {
    
    export interface IshopItemUI {
        onIconClick(e: Laya.Event): void;
        onBuyClick(e: Laya.Event): void;
        
    }
    export class shopItemUI extends CellView {
        
        public img2: Laya.Image;
        public icon: Laya.Image;
        public buy: Laya.Image;
        public shopname: Laya.Label;
        public shopprice: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":155,"height":170},"child":[{"type":"Image","props":{"width":125,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":165,"alpha":0.3}},{"type":"Image","props":{"y":97,"x":24,"var":"img2","skin":"homeland/02022995.info.icon.png"}},{"type":"Image","props":{"y":30,"x":30,"skin":"homeland/shop_item.png"},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"icon","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":125,"x":30,"var":"buy","skin":"homeland/ClearanceSales.BtBuy.normal.0.png"}},{"type":"Label","props":{"y":5,"x":62,"var":"shopname","text":"名字","fontSize":18,"color":"#FFFFFF","bold":true,"anchorX":0.5}},{"type":"Label","props":{"y":104,"x":55,"width":100,"var":"shopprice","text":"100","fontSize":18,"color":"#FFFFFF","bold":true,"align":"left"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.shop.shopItemUI.uiView);
            this.registerEvents({"icon":["click"],"buy":["click"]});
        }
    }
}

module ui.skill {
    
    export class lineItemUI extends BaseView {
        
        public _d: Laya.Image;
        public _dshow: Laya.Image;
        public _l: Laya.Image;
        public _lshow: Laya.Image;
        public _r: Laya.Image;
        public _rshow: Laya.Image;
        public _u: Laya.Image;
        public _ushow: Laya.Image;
        public _ru: Laya.Image;
        public _rushow: Laya.Image;
        public _lu: Laya.Image;
        public _lushow: Laya.Image;
        public _ld: Laya.Image;
        public _ldshow: Laya.Image;
        public _rd: Laya.Image;
        public _rdshow: Laya.Image;
        public cty: Laya.Image;
        public ctyshow: Laya.Image;
        public ctx: Laya.Image;
        public ctxshow: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":222,"height":212},"child":[{"type":"Image","props":{"y":172,"x":99,"var":"_d","skin":"skill/lab_talent_03.png","height":80},"child":[{"type":"Image","props":{"y":0,"x":3,"var":"_dshow","skin":"skill/lab_talent_04.png","height":80}}]},{"type":"Image","props":{"y":78,"x":-59,"width":120,"var":"_l","skin":"skill/lab_talent_07.png"},"child":[{"type":"Image","props":{"y":3,"x":0,"width":120,"var":"_lshow","skin":"skill/lab_talent_08.png"}}]},{"type":"Image","props":{"y":78,"x":161,"width":120,"var":"_r","skin":"skill/lab_talent_07.png"},"child":[{"type":"Image","props":{"y":3,"x":0,"width":120,"var":"_rshow","skin":"skill/lab_talent_08.png"}}]},{"type":"Image","props":{"y":-40,"x":99,"var":"_u","skin":"skill/lab_talent_03.png","height":80},"child":[{"type":"Image","props":{"y":0,"x":3,"var":"_ushow","skin":"skill/lab_talent_04.png","height":80}}]},{"type":"Image","props":{"y":3,"x":98,"var":"_ru","skin":"skill/lab_talent_05.png"},"child":[{"type":"Image","props":{"y":"3.50","x":"3.50","var":"_rushow","skin":"skill/lab_talent_06.png"}}]},{"type":"Image","props":{"y":5,"x":123,"var":"_lu","skin":"skill/lab_talent_05.png","scaleX":-1},"child":[{"type":"Image","props":{"y":"2.50","x":"3.50","var":"_lushow","skin":"skill/lab_talent_06.png"}}]},{"type":"Image","props":{"y":176,"x":123,"var":"_ld","skin":"skill/lab_talent_05.png","scaleY":-1,"scaleX":-1},"child":[{"type":"Image","props":{"y":"3.50","x":"3.50","var":"_ldshow","skin":"skill/lab_talent_06.png"}}]},{"type":"Image","props":{"y":176,"x":98,"var":"_rd","skin":"skill/lab_talent_05.png","scaleY":-1},"child":[{"type":"Image","props":{"y":"3.50","x":"3.50","var":"_rdshow","skin":"skill/lab_talent_06.png"}}]},{"type":"Image","props":{"y":38,"x":99,"var":"cty","skin":"skill/lab_talent_03.png","height":135},"child":[{"type":"Image","props":{"y":0,"x":3,"var":"ctyshow","skin":"skill/lab_talent_04.png","height":135}}]},{"type":"Image","props":{"y":78,"x":61,"width":100,"var":"ctx","skin":"skill/lab_talent_07.png"},"child":[{"type":"Image","props":{"y":3,"x":0,"width":100,"var":"ctxshow","skin":"skill/lab_talent_08.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.skill.lineItemUI.uiView);
            
        }
    }
}

module ui.skill {
    
    export interface IskillDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class skillDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public natureSkill: app.skill.skillView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":480},"child":[{"type":"Image","props":{"y":10,"x":10,"width":700,"skin":"event/Delivery.Send_Info.backgrnd.png","height":460},"child":[{"type":"Image","props":{"y":31,"x":12,"width":675,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":413}}]},{"type":"Image","props":{"y":5,"x":655,"var":"btnBack","skin":"homeland/close.png"}},{"type":"Label","props":{"y":19,"x":260,"width":200,"text":"职业技能","fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"skillView","props":{"y":49,"x":0,"var":"natureSkill","runtime":"app.skill.skillView"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.skill.skillView"] = app.skill.skillView;
            super.createChildren();
            this.createView(ui.skill.skillDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
        onClose(): void {
            this.natureSkill.onClose();
        }
    }
}

module ui.skill {
    
    export class skillItemUI extends BaseView {
        
        public img: Laya.Image;
        public img2: Laya.Image;
        public _name: Laya.Label;
        public _img: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":222,"height":212},"child":[{"type":"Image","props":{"y":40,"x":61,"width":100,"var":"img","skin":"homeland/LevelNo.blank.png","sizeGrid":"5,5,5,5","height":100,"alpha":0.5}},{"type":"Image","props":{"y":141,"x":22,"var":"img2","skin":"skill/lab_talent_01.png"},"child":[{"type":"Label","props":{"y":5,"x":13,"width":150,"var":"_name","valign":"bottom","text":"技能名称","leading":5,"fontSize":16,"font":"Microsoft YaHei","color":"#fcf5f5","bold":true,"align":"center"}},{"type":"Image","props":{"y":-51,"x":89,"var":"_img","scaleY":2,"scaleX":2,"anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.skill.skillItemUI.uiView);
            
        }
    }
}

module ui.skill {
    
    export class skillViewUI extends BaseView {
        
        public pan: Laya.Panel;
        public show: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":720,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720},"child":[{"type":"Panel","props":{"y":0,"x":26,"width":668,"var":"pan","height":400},"child":[{"type":"Image","props":{"y":0,"x":1,"width":666,"var":"show"}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.skill.skillViewUI.uiView);
            
        }
    }
}

module ui.task {
    
    export interface ItaskDlgUI {
        onLstTaskCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnRenWuClick(e: Laya.Event): void;
        onBtnChengJiuClick(e: Laya.Event): void;
        onBtnDayClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class taskDlgUI extends BaseDialog {
        
        public lstTask: ListView;
        public btnRenWu: Laya.Image;
        public btnChengJiu: Laya.Image;
        public btnDay: Laya.Image;
        public _tishi0: Laya.Image;
        public _tishi1: Laya.Image;
        public _tishi2: Laya.Image;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":740,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"homeland/img_xuanjuejuanzhou.png"},"child":[{"type":"Image","props":{"y":30,"x":334,"skin":"common/rw.png"}}]},{"type":"ListView","props":{"y":76,"x":50,"width":620,"var":"lstTask","height":345},"child":[{"type":"taskItem","props":{"runtime":"app.task.taskItem","name":"render"}}]},{"type":"Image","props":{"y":107,"x":714,"var":"btnRenWu","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"主\\n线","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":172,"x":714,"var":"btnChengJiu","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"成\\n就","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":237,"x":714,"var":"btnDay","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"每\\n日","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":159,"x":712,"width":26,"visible":false,"var":"_tishi0","skin":"homeland/img_tishi.png","height":26}},{"type":"Image","props":{"y":94,"x":712,"width":26,"visible":false,"var":"_tishi1","skin":"homeland/img_tishi.png","height":26}},{"type":"Image","props":{"y":224,"x":712,"width":26,"visible":false,"var":"_tishi2","skin":"homeland/img_tishi.png","height":26}},{"type":"Image","props":{"y":41,"x":687,"width":66,"var":"btn_close","height":66,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":18,"x":18,"skin":"homeland/img_unload.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.task.taskItem"] = app.task.taskItem;
            super.createChildren();
            this.createView(ui.task.taskDlgUI.uiView);
            this.registerEvents({"lstTask":["cellChildClick"],"btnRenWu":["click"],"btnChengJiu":["click"],"btnDay":["click"],"btn_close":["click"]});
        }
    }
}

module ui.task {
    
    export interface ItaskItemUI {
        onTaskprospClick(e: Laya.Event): void;
        onReward1Click(e: Laya.Event): void;
        onReward2Click(e: Laya.Event): void;
        onReward3Click(e: Laya.Event): void;
        
    }
    export class taskItemUI extends CellView {
        
        public img: Laya.Image;
        public tasknamesp: Laya.Image;
        public taskname: Laya.Label;
        public taskdesc: Laya.Label;
        public taskprosp: Laya.Button;
        public jindu: Laya.Label;
        public reward_item1: Laya.Image;
        public reward1: Laya.Image;
        public reward_num1: Laya.Label;
        public reward_item2: Laya.Image;
        public reward2: Laya.Image;
        public reward_num2: Laya.Label;
        public reward_item3: Laya.Image;
        public reward3: Laya.Image;
        public reward_num3: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":620,"height":95},"child":[{"type":"Image","props":{"width":620,"var":"img","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":90,"alpha":0.15}},{"type":"Image","props":{"y":3,"x":3,"width":180,"var":"tasknamesp","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":40,"alpha":0.1}},{"type":"Label","props":{"y":8,"x":10,"var":"taskname","text":"任务标题","fontSize":20,"color":"#553b14","bold":true}},{"type":"Label","props":{"y":50,"x":10,"var":"taskdesc","text":"任务描述","fontSize":20,"color":"#FFFFFF","bold":true}},{"type":"Label","props":{"y":1,"x":240,"text":"可获得奖励：                                任务进度：","fontSize":18,"color":"#FFFFFF","bold":true}},{"type":"Button","props":{"y":34,"x":500,"width":110,"var":"taskprosp","stateNum":"2","skin":"homeland/btn_big.png","height":40}},{"type":"Label","props":{"y":45,"x":471,"width":100,"var":"jindu","text":"完成","fontSize":18,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":240,"width":66,"var":"reward_item1","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":240,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward1","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":245,"width":60,"var":"reward_num1","text":"完成","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":320,"width":66,"var":"reward_item2","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":320,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward2","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":325,"width":60,"var":"reward_num2","text":"完成","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Image","props":{"y":22,"x":400,"width":66,"var":"reward_item3","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.35}},{"type":"Image","props":{"y":22,"x":400,"width":66,"height":66},"child":[{"type":"Image","props":{"y":33,"x":33,"var":"reward3","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":70,"x":405,"width":60,"var":"reward_num3","text":"完成","fontSize":16,"color":"#FFFFFF","bold":true,"align":"right"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.task.taskItemUI.uiView);
            this.registerEvents({"taskprosp":["click"],"reward1":["click"],"reward2":["click"],"reward3":["click"]});
        }
    }
}

module ui.test {
    
    export class mobItemUI extends CellView {
        
        public _img: Laya.Image;
        public _name: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":180,"height":35},"child":[{"type":"Image","props":{"y":-3,"x":108,"width":40,"var":"_img","height":40}},{"type":"Label","props":{"var":"_name","text":"label","fontSize":24,"color":"#ffffff","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.test.mobItemUI.uiView);
            
        }
    }
}

module ui.test {
    
    export interface ItestMobDlgUI {
        onLstTestCellClick(e: Laya.Event, index: number): void;
        onBtnStandClick(e: Laya.Event): void;
        onBtnMoveClick(e: Laya.Event): void;
        onBtnAtkClick(e: Laya.Event): void;
        
    }
    export class testMobDlgUI extends BaseDialog {
        
        public lstTest: ListView;
        public btnStand: Laya.Label;
        public btnMove: Laya.Label;
        public btnAtk: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"ListView","props":{"y":100,"x":10,"width":780,"var":"lstTest","height":300},"child":[{"type":"mobItem","props":{"runtime":"app.test.mobItem","name":"render"}}]},{"type":"Label","props":{"y":493,"x":23,"var":"btnStand","text":"站立","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#35f904","bold":true}},{"type":"Label","props":{"y":523,"x":27,"var":"btnMove","text":"行走","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#35f904","bold":true}},{"type":"Label","props":{"y":555,"x":29,"var":"btnAtk","text":"攻击","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#35f904","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.test.mobItem"] = app.test.mobItem;
            super.createChildren();
            this.createView(ui.test.testMobDlgUI.uiView);
            this.registerEvents({"lstTest":["cellClick"],"btnStand":["click"],"btnMove":["click"],"btnAtk":["click"]});
        }
    }
}

module ui.worldmap {
    
    export interface IbossMapDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onLstMapCellClick(e: Laya.Event, index: number): void;
        
    }
    export class bossMapDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public lstMap: ListView;
        public static uiView: any = {"type":"BaseDialog","props":{"width":672,"height":410},"child":[{"type":"Image","props":{"y":0,"x":0,"width":672,"skin":"event/Delivery.Send_Info.backgrnd.png","height":410},"child":[{"type":"Image","props":{"y":47,"x":13,"width":645,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":352}}]},{"type":"Label","props":{"y":15,"x":261,"text":"快捷地图传送","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Image","props":{"y":26,"x":643,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"ListView","props":{"y":56,"x":26,"width":620,"var":"lstMap","height":336},"child":[{"type":"bwItem","props":{"runtime":"app.battle.bwItem","name":"render"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.bwItem"] = app.battle.bwItem;
            super.createChildren();
            this.createView(ui.worldmap.bossMapDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"lstMap":["cellClick"]});
        }
    }
}

module ui.worldmap {
    
    export interface IpartyDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onLstPartyCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnQuitClick(e: Laya.Event): void;
        
    }
    export class partyDlgUI extends BaseDialog {
        
        public btnBack: Laya.Image;
        public lstParty: ListView;
        public btnQuit: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":672,"height":410},"child":[{"type":"Image","props":{"y":0,"x":0,"width":672,"skin":"event/Delivery.Send_Info.backgrnd.png","height":410},"child":[{"type":"Image","props":{"y":47,"x":13,"width":645,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":352}}]},{"type":"Label","props":{"y":15,"x":310,"text":"组队","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}},{"type":"Image","props":{"y":26,"x":643,"var":"btnBack","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"ListView","props":{"y":56,"x":26,"width":620,"var":"lstParty","height":271},"child":[{"type":"partyItem","props":{"runtime":"app.worldmap.partyItem","name":"render"}}]},{"type":"Button","props":{"y":340,"x":276,"width":120,"var":"btnQuit","labelSize":30,"label":"label","height":50}},{"type":"Label","props":{"y":432,"x":336,"underline":true,"text":"组队经验加成：2P+20%，3P+30%，4P+40%，5P+50%，6P+60%","fontSize":20,"events":"click","color":"#59d741","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":460,"x":336,"underline":true,"text":"队长点击队友名字可将其踢出队伍","fontSize":20,"events":"click","color":"#59d741","bold":true,"anchorY":0.5,"anchorX":0.5}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.worldmap.partyItem"] = app.worldmap.partyItem;
            super.createChildren();
            this.createView(ui.worldmap.partyDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"lstParty":["cellChildClick"],"btnQuit":["click"]});
        }
    }
}

module ui.worldmap {
    
    export interface IpartyItemUI {
        onBtn1Click(e: Laya.Event): void;
        onBtn2Click(e: Laya.Event): void;
        onBtn3Click(e: Laya.Event): void;
        onBtn4Click(e: Laya.Event): void;
        onBtn5Click(e: Laya.Event): void;
        onBtn6Click(e: Laya.Event): void;
        onBtnJoinClick(e: Laya.Event): void;
        
    }
    export class partyItemUI extends CellView {
        
        public lblName: Laya.Text;
        public btn1: Laya.Image;
        public name1: Laya.Text;
        public btn2: Laya.Image;
        public name2: Laya.Text;
        public btn3: Laya.Image;
        public name3: Laya.Text;
        public btn4: Laya.Image;
        public name4: Laya.Text;
        public btn5: Laya.Image;
        public name5: Laya.Text;
        public btn6: Laya.Image;
        public name6: Laya.Text;
        public btnJoin: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":620,"height":75},"child":[{"type":"Text","props":{"y":7,"x":27,"var":"lblName","text":"text","fontSize":35}},{"type":"Image","props":{"y":49,"x":50,"width":80,"var":"btn1","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name1","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":49,"x":134,"width":80,"var":"btn2","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name2","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":49,"x":218,"width":80,"var":"btn3","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name3","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":49,"x":303,"width":80,"var":"btn4","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name4","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":49,"x":387,"width":80,"var":"btn5","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name5","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":49,"x":471,"width":80,"var":"btn6","skin":"homeland/img_zuoyizhezhao.png","height":18},"child":[{"type":"Text","props":{"y":1,"x":0,"var":"name6","text":"按键的巅峰","fontSize":16,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":23,"x":560,"width":55,"var":"btnJoin","skin":"homeland/character_title_7.png","height":30},"child":[{"type":"Label","props":{"y":6,"x":9,"text":"加入","fontSize":18,"color":"#FFFFFF"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.worldmap.partyItemUI.uiView);
            this.registerEvents({"btn1":["click"],"btn2":["click"],"btn3":["click"],"btn4":["click"],"btn5":["click"],"btn6":["click"],"btnJoin":["click"]});
        }
    }
}

module ui.worldmap {
    
    export interface IworldmapDlgUI {
        onLstMapCellClick(e: Laya.Event, index: number): void;
        onMap1Click(e: Laya.Event): void;
        onMap2Click(e: Laya.Event): void;
        onMap3Click(e: Laya.Event): void;
        onMap4Click(e: Laya.Event): void;
        onMap5Click(e: Laya.Event): void;
        onMap6Click(e: Laya.Event): void;
        onMap7Click(e: Laya.Event): void;
        onMap8Click(e: Laya.Event): void;
        onMap9Click(e: Laya.Event): void;
        onMap10Click(e: Laya.Event): void;
        onMap11Click(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnTSClick(e: Laya.Event): void;
        onBtnFBClick(e: Laya.Event): void;
        
    }
    export class worldmapDlgUI extends BaseDialog {
        
        public lstMap: ListView;
        public worldmap: Laya.Image;
        public group: Laya.Label;
        public map1: Laya.Image;
        public caihongdao: Laya.Image;
        public map2: Laya.Image;
        public jinyindao: Laya.Image;
        public map3: Laya.Image;
        public lien: Laya.Image;
        public map4: Laya.Image;
        public shuixia: Laya.Image;
        public map5: Laya.Image;
        public shijiantingzhi: Laya.Image;
        public map6: Laya.Image;
        public senlin: Laya.Image;
        public map7: Laya.Image;
        public shijian: Laya.Image;
        public map8: Laya.Image;
        public shamo: Laya.Image;
        public map9: Laya.Image;
        public wulin: Laya.Image;
        public map10: Laya.Image;
        public bingfengxueyu: Laya.Image;
        public map11: Laya.Image;
        public shengdi: Laya.Image;
        public mapshow: Laya.Image;
        public btnBack: Laya.Image;
        public btnTS: Laya.Image;
        public btnFB: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":900,"height":510},"child":[{"type":"Image","props":{"y":157,"x":664,"width":193,"skin":"event/Delivery.Send_Info.backgrnd.png","height":346},"child":[{"type":"Image","props":{"y":13,"x":13,"width":167,"skin":"event/CharacterUI.Item.FullBackgrnd2.png","height":320}},{"type":"ListView","props":{"y":22,"x":19,"width":277,"var":"lstMap","height":302},"child":[{"type":"csItem","props":{"runtime":"app.battle.csItem","name":"render"}}]}]},{"type":"Image","props":{"y":0,"x":0,"width":680,"skin":"event/Delivery.Send_Info.backgrnd.png","height":510},"child":[{"type":"Image","props":{"y":18,"x":15,"width":640,"skin":"event/CharacterUI.Item.FullBackgrnd2.png","height":464}}]},{"type":"Image","props":{"y":20,"x":20,"width":640,"height":470},"child":[{"type":"Image","props":{"var":"worldmap","skin":"worldmap/BaseImg.0.png"},"child":[{"type":"Label","props":{"y":80,"x":439,"text":"遥远的理想乡","strokeColor":"#FFFFFF","stroke":3,"fontSize":24,"color":"#8f0ccd","bold":true}},{"type":"Label","props":{"y":107,"x":438,"var":"group","strokeColor":"#FFFFFF","stroke":3,"fontSize":18,"color":"#8f0ccd","bold":true}},{"type":"Image","props":{"y":18,"x":31,"width":137,"var":"map1","height":81},"child":[{"type":"Image","props":{"y":28,"x":77,"var":"caihongdao","skin":"worldmap/MapLink.0.link.linkImg.png"}}]},{"type":"Image","props":{"y":106,"x":9,"width":137,"var":"map2","height":81},"child":[{"type":"Image","props":{"y":-17,"x":8,"var":"jinyindao","skin":"worldmap/MapLink.1.link.linkImg.png"}}]},{"type":"Image","props":{"y":197,"x":5,"width":137,"var":"map3","height":81},"child":[{"type":"Image","props":{"y":-7,"x":12,"var":"lien","skin":"worldmap/MapLink.10.link.linkImg.png"}}]},{"type":"Image","props":{"y":189,"x":143,"width":137,"var":"map4","height":81},"child":[{"type":"Image","props":{"y":-29,"x":4,"var":"shuixia","skin":"worldmap/MapLink.4.link.linkImg.png"}}]},{"type":"Image","props":{"y":252,"x":210,"width":137,"var":"map5","height":81,"alpha":0},"child":[{"type":"Image","props":{"y":-42,"x":-18,"var":"shijiantingzhi","skin":"worldmap/MapLink.3.link.linkImg.png"}}]},{"type":"Image","props":{"y":331,"x":129,"width":137,"var":"map6","height":81},"child":[{"type":"Image","props":{"y":-135,"x":-90,"var":"senlin","skin":"worldmap/MapLink.5.link.linkImg.png"}}]},{"type":"Image","props":{"y":319,"x":5,"width":109,"var":"map7","height":143},"child":[{"type":"Image","props":{"y":-12,"x":1,"var":"shijian","skin":"worldmap/MapLink.8.link.linkImg.png"}}]},{"type":"Image","props":{"y":350,"x":318,"width":137,"var":"map8","height":81},"child":[{"type":"Image","props":{"y":-56,"x":-49,"var":"shamo","skin":"worldmap/MapLink.7.link.linkImg.png"}}]},{"type":"Image","props":{"y":258,"x":472,"width":137,"var":"map9","height":81},"child":[{"type":"Image","props":{"y":-75,"x":-16,"var":"wulin","skin":"worldmap/MapLink.6.link.linkImg.png"}}]},{"type":"Image","props":{"y":127,"x":335,"width":137,"var":"map10","height":81},"child":[{"type":"Image","props":{"y":-20,"x":-107,"var":"bingfengxueyu","skin":"worldmap/MapLink.2.link.linkImg.png"}}]},{"type":"Image","props":{"y":64,"x":168,"width":137,"var":"map11","height":81},"child":[{"type":"Image","props":{"y":-11,"x":-14,"var":"shengdi","skin":"worldmap/MapLink.9.link.linkImg.png"}}]}]},{"type":"Image","props":{"y":235,"x":320,"var":"mapshow","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":26,"x":648,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]},{"type":"Label","props":{"x":669,"wordWrap":true,"width":129,"text":"地图传送","strokeColor":"#FFFFFF","stroke":3,"leading":5,"height":34,"fontSize":26,"color":"#9e1229","centerY":-114,"bold":true,"align":"center"}},{"type":"Image","props":{"y":15,"x":700,"var":"btnTS","skin":"homeland/img_mogu.png"},"child":[{"type":"Label","props":{"y":68,"x":14,"text":"探索","strokeColor":"#FFFFFF","stroke":3,"fontSize":24,"color":"#5e66c0","bold":true}}]},{"type":"Image","props":{"y":15,"x":800,"var":"btnFB","skin":"homeland/img_zimogu.png"},"child":[{"type":"Label","props":{"y":68,"x":14,"text":"副本","strokeColor":"#FFFFFF","stroke":3,"fontSize":24,"color":"#5e66c0","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.battle.csItem"] = app.battle.csItem;
            super.createChildren();
            this.createView(ui.worldmap.worldmapDlgUI.uiView);
            this.registerEvents({"lstMap":["cellClick"],"map1":["click"],"map2":["click"],"map3":["click"],"map4":["click"],"map5":["click"],"map6":["click"],"map7":["click"],"map8":["click"],"map9":["click"],"map10":["click"],"map11":["click"],"btnBack":["click"],"btnTS":["click"],"btnFB":["click"]});
        }
    }
}

module ui.yingxiong {
    
    export interface IquerenDlgUI {
        onBtn_querenClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class querenDlgUI extends BaseDialog {
        
        public btn_queren: Laya.Button;
        public _show: Laya.Label;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":300,"height":180},"child":[{"type":"Image","props":{"y":0,"x":0,"width":300,"skin":"homeland/Notice.backgrnd.0.png","height":180,"events":"click"},"child":[{"type":"Image","props":{"y":12,"x":124,"skin":"common/tishi.png"}}]},{"type":"Button","props":{"y":148,"x":150,"var":"btn_queren","stateNum":"1","skin":"homeland/Notice.BtYes.mouseOver.0.png","scaleY":1.2,"scaleX":1.2,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":75,"var":"_show","text":"消耗100木材兑换装备？","leading":10,"fontSize":20,"color":"#FFFFFF","centerX":-1,"bold":true}},{"type":"Image","props":{"y":19,"x":281,"width":50,"var":"btn_close","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.yingxiong.querenDlgUI.uiView);
            this.registerEvents({"btn_queren":["click"],"btn_close":["click"]});
        }
    }
}

module ui.yingxiong {
    
    export class shengxingItemUI extends BaseView {
        
        public pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public xing: Laya.Image;
        public _starNum: Laya.Label;
        public isjuexing: Laya.Label;
        public static uiView: any = {"type":"BaseView","props":{"width":84,"height":90},"child":[{"type":"Image","props":{"y":1,"x":2,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":88,"alpha":0.4}},{"type":"Image","props":{"y":4,"x":4,"width":76,"visible":false,"var":"pinzhi","skin":"homeland/img_pingzhikuang5.png","height":70}},{"type":"Image","props":{"y":7,"x":12,"width":60,"var":"_img","height":60},"child":[{"type":"Image","props":{"y":60,"x":-16,"width":90,"skin":"homeland/img_mingchengdi.png","height":18},"child":[{"type":"Label","props":{"y":2,"x":15,"var":"_name","text":"太阳神光介","fontSize":14,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Label","props":{"y":46,"x":15,"width":50,"var":"_lv","text":"Lv 1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#FFFFFF","centerX":10,"bold":true,"align":"right"}}]},{"type":"Image","props":{"y":-25,"x":15,"width":26,"var":"xing","skin":"homeland/img_star_1.png","height":26},"child":[{"type":"Label","props":{"y":3,"x":30,"width":50,"var":"_starNum","text":"X1","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":51,"x":2,"width":26,"var":"isjuexing","text":"觉","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.yingxiong.shengxingItemUI.uiView);
            
        }
    }
}

module ui.yingxiong {
    
    export class wfbagItemUI extends CellView {
        
        public _pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _num: Laya.Label;
        public _txt: Laya.Label;
        public _suo: Laya.Image;
        public need: Laya.Label;
        public cash: Laya.Image;
        public cc: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":80,"height":80},"child":[{"type":"Image","props":{"y":1,"x":1,"width":78,"var":"_pinzhi","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":78,"alpha":0.4}},{"type":"Image","props":{"y":40,"x":40,"var":"_img","scaleY":1.75,"scaleX":1.75,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":56,"x":7,"width":69,"var":"_num","text":"1","height":20,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"}},{"type":"Label","props":{"y":66,"x":-10,"width":100,"visible":false,"var":"_txt","text":"1","stroke":2,"fontSize":14,"color":"#FFFFFF","align":"center"}},{"type":"Image","props":{"y":2,"x":56,"width":25,"var":"_suo","skin":"homeland/img_jinengsuo.png","height":25}},{"type":"Label","props":{"y":83,"x":-15,"width":110,"visible":false,"var":"need","text":"需:10000","strokeColor":"#1d5ed2","stroke":2,"height":20,"fontSize":16,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":49,"x":47,"visible":false,"var":"cash","skin":"homeland/Shop.meso.png","scaleY":2,"scaleX":2}},{"type":"Image","props":{"y":4,"x":4,"width":30,"visible":false,"var":"cc","skin":"homeland/img_xuanzhongduihao.png","height":30}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.yingxiong.wfbagItemUI.uiView);
            
        }
    }
}

module ui.yingxiong {
    
    export class yingxiongItemUI extends CellView {
        
        public pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _name: Laya.Label;
        public select: Laya.Image;
        public _lv: Laya.Label;
        public cc: Laya.Image;
        public _star: Laya.Image;
        public _starNum: Laya.Label;
        public isjuexing: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":84,"height":90},"child":[{"type":"Image","props":{"y":1,"x":2,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":88,"alpha":0.4}},{"type":"Image","props":{"y":4,"x":4,"width":76,"visible":false,"var":"pinzhi","skin":"homeland/img_pingzhikuang5.png","height":70}},{"type":"Image","props":{"y":7,"x":12,"width":60,"var":"_img","height":60},"child":[{"type":"Image","props":{"y":60,"x":-16,"width":90,"skin":"homeland/img_mingchengdi.png","height":18},"child":[{"type":"Label","props":{"y":2,"x":15,"var":"_name","text":"太阳神光介","fontSize":14,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Image","props":{"y":-9,"x":-11,"width":83,"var":"select","skin":"homeland/img_xuanzhongzhuangtai.png","height":90}},{"type":"Label","props":{"y":46,"x":15,"width":50,"var":"_lv","text":"Lv 1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#FFFFFF","centerX":10,"bold":true,"align":"right"}}]},{"type":"Image","props":{"y":7,"x":7,"width":30,"var":"cc","skin":"homeland/img_xuanzhongduihao.png","height":30}},{"type":"Image","props":{"y":7,"x":52,"width":26,"var":"_star","skin":"homeland/img_star_1.png","height":26},"child":[{"type":"Label","props":{"y":6,"x":-12,"width":50,"var":"_starNum","text":"1","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Label","props":{"y":44,"x":-50,"width":26,"var":"isjuexing","text":"觉","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.yingxiong.yingxiongItemUI.uiView);
            
        }
    }
}

module ui.yingxiong {
    
    export class yuchengItemUI extends CellView {
        
        public pinzhi: Laya.Image;
        public _img: Laya.Image;
        public _name: Laya.Label;
        public _lv: Laya.Label;
        public _select: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":84,"height":90},"child":[{"type":"Image","props":{"y":-1,"x":1,"width":80,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":88,"alpha":0.4}},{"type":"Image","props":{"y":1,"x":4,"width":75,"var":"pinzhi","skin":"homeland/img_pingzhikuang5.png","height":70},"child":[{"type":"Image","props":{"y":6,"x":8,"width":60,"var":"_img","height":60},"child":[{"type":"Image","props":{"y":60,"x":-16,"width":90,"skin":"homeland/img_mingchengdi.png","height":18},"child":[{"type":"Label","props":{"y":2,"x":15,"var":"_name","text":"太阳神光介","fontSize":14,"color":"#FFFFFF","centerX":0,"bold":true}}]},{"type":"Image","props":{"y":40,"x":19,"width":50,"visible":false,"skin":"homeland/img_yimanji.png","height":20}},{"type":"Label","props":{"y":46,"x":15,"width":50,"var":"_lv","text":"Lv 1","strokeColor":"#000000","stroke":3,"fontSize":14,"color":"#FFFFFF","centerX":10,"bold":true,"align":"right"}},{"type":"Image","props":{"y":-4,"x":39,"width":26,"skin":"","height":26},"child":[{"type":"Label","props":{"y":6,"x":-12,"width":50,"text":"1","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}},{"type":"Label","props":{"y":44,"x":-50,"width":26,"text":"觉","strokeColor":"#FFFFFF","stroke":2,"fontSize":14,"color":"#8d1e1d","bold":true,"align":"center"}}]}]}]},{"type":"Image","props":{"y":9,"x":13,"width":30,"var":"_select","skin":"homeland/img_xuanzhongduihao.png","height":30}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.yingxiong.yuchengItemUI.uiView);
            
        }
    }
}

module ui.yingxiong {
    
    export interface IYXDlgUI {
        onS1Click2(e: Laya.Event): void;
        onS2Click2(e: Laya.Event): void;
        onS3Click2(e: Laya.Event): void;
        onS4Click2(e: Laya.Event): void;
        onLstYingXiongCellClick(e: Laya.Event, index: number): void;
        onBtnHeroJXClick(e: Laya.Event): void;
        onBtnShengXingClick(e: Laya.Event): void;
        onBtnZHClick(e: Laya.Event): void;
        onBtnLeftClick(e: Laya.Event): void;
        onBtnRightClick(e: Laya.Event): void;
        onBtnCCClick(e: Laya.Event): void;
        onBtnHeroClick(e: Laya.Event): void;
        onBtnStarClick(e: Laya.Event): void;
        onBtnJueXingClick(e: Laya.Event): void;
        onBtnZhiHuanClick(e: Laya.Event): void;
        onBtn_closeClick(e: Laya.Event): void;
        
    }
    export class YXDlgUI extends BaseDialog {
        
        public xiangqing: Laya.Image;
        public _name2: Laya.Label;
        public _lv2: Laya.Label;
        public _exp: Laya.Label;
        public _hp: Laya.Label;
        public _atk: Laya.Label;
        public _def: Laya.Label;
        public _matk: Laya.Label;
        public _mdef: Laya.Label;
        public _target: Laya.Label;
        public _miss: Laya.Label;
        public s1: Laya.Image;
        public skillimg1: Laya.Image;
        public _suo1: Laya.Label;
        public s2: Laya.Image;
        public skillimg2: Laya.Image;
        public _suo2: Laya.Label;
        public s3: Laya.Image;
        public skillimg3: Laya.Image;
        public _suo3: Laya.Label;
        public s4: Laya.Image;
        public skillimg4: Laya.Image;
        public _suo4: Laya.Label;
        public lstYingXiong: ListView;
        public lstJueXing: Laya.Image;
        public _di1: Laya.Image;
        public _title: Laya.Label;
        public jx_cost: Laya.Label;
        public btnHeroJX: Laya.Button;
        public _di2: Laya.Image;
        public xingji: Laya.Image;
        public sx1: Laya.Image;
        public pre_star: ui.yingxiong.shengxingItemUI;
        public next_star: ui.yingxiong.shengxingItemUI;
        public btnShengXing: Laya.Button;
        public sx_cost: Laya.Label;
        public sx2: Laya.Image;
        public zhihuan: Laya.Image;
        public btnZH: Laya.Button;
        public zh_cost: Laya.Label;
        public changeRole: Laya.Image;
        public _name: Laya.Label;
        public btnLeft: Laya.Image;
        public btnRight: Laya.Image;
        public star1: Laya.Image;
        public star2: Laya.Image;
        public star3: Laya.Image;
        public star4: Laya.Image;
        public star5: Laya.Image;
        public _pinzhi: Laya.Label;
        public btnCC: Laya.Button;
        public cc: Laya.Label;
        public btnHero: Laya.Image;
        public btnStar: Laya.Image;
        public btnJueXing: Laya.Image;
        public btnZhiHuan: Laya.Image;
        public btn_close: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":740,"mouseThrough":false,"height":480,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":21,"x":27,"width":672,"skin":"event/Delivery.Send_Info.backgrnd.png","height":410},"child":[{"type":"Image","props":{"y":47,"x":13,"width":645,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":352}}]},{"type":"Image","props":{"y":237,"x":350,"width":330,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":180,"alpha":0.2}},{"type":"Image","props":{"y":80,"x":45,"var":"xiangqing"},"child":[{"type":"Image","props":{"y":-5,"width":115,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":255,"alpha":0.3}},{"type":"Image","props":{"y":-5,"x":121,"width":165,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":255,"alpha":0.3}},{"type":"Label","props":{"y":0,"x":80,"width":200,"var":"_name2","text":"玩家","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"名字","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":25,"x":80,"width":200,"var":"_lv2","text":"1","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"等级","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":50,"x":80,"width":200,"var":"_exp","text":"0/5","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"经验","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":75,"x":82,"width":200,"var":"_hp","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-72,"width":60,"text":"生命","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":100,"x":80,"width":200,"var":"_atk","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"攻击力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":125,"x":80,"width":200,"var":"_def","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"防御力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":150,"x":80,"width":200,"var":"_matk","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"魔法攻击力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":175,"x":80,"width":200,"var":"_mdef","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"魔法防御力","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":200,"x":80,"width":200,"var":"_target","text":"100","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"命中率","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":225,"x":80,"width":200,"var":"_miss","text":"0","fontSize":20,"color":"#FFFFFF","bold":true,"align":"right"},"child":[{"type":"Label","props":{"y":0,"x":-70,"width":60,"text":"回避率","fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":261,"x":0,"width":66,"var":"s1","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.6}},{"type":"Image","props":{"y":263,"x":2,"width":62,"var":"skillimg1","height":62},"child":[{"type":"Label","props":{"y":46,"x":-1,"width":64,"var":"_suo1","text":"未解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":261,"x":74,"width":66,"var":"s2","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.6}},{"type":"Image","props":{"y":263,"x":76,"width":62,"var":"skillimg2","height":62},"child":[{"type":"Label","props":{"y":46,"x":-1,"width":64,"var":"_suo2","text":"未解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":261,"x":148,"width":66,"var":"s3","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.6}},{"type":"Image","props":{"y":263,"x":150,"width":62,"var":"skillimg3","height":62},"child":[{"type":"Label","props":{"y":46,"x":-1,"width":64,"var":"_suo3","text":"未解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":261,"x":222,"width":66,"var":"s4","skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.6}},{"type":"Image","props":{"y":263,"x":224,"width":62,"var":"skillimg4","height":62},"child":[{"type":"Label","props":{"y":46,"x":-1,"width":64,"var":"_suo4","text":"未解锁","strokeColor":"#FFFFFF","stroke":3,"fontSize":16,"color":"#8d1e1d","bold":true,"align":"center"}}]}]},{"type":"ListView","props":{"y":235,"x":347,"width":336,"var":"lstYingXiong","height":180},"child":[{"type":"yingxiongItem","props":{"runtime":"app.yingxiong.yingxiongItem","name":"render"}}]},{"type":"Image","props":{"var":"lstJueXing"},"child":[{"type":"Image","props":{"y":234,"x":21,"var":"_di1"},"child":[{"type":"Label","props":{"y":-152,"x":73,"width":200,"var":"_title","text":"觉醒突破","strokeColor":"#2a4f9c","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":-4,"x":124,"skin":"homeland/04001129.info.icon.png"},"child":[{"type":"Label","props":{"y":7,"x":40,"width":100,"var":"jx_cost","text":"X100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":114,"x":-102,"width":300,"text":"潜能激发，能力大幅度提升","strokeColor":"#2a4f9c","stroke":2,"leading":4,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":56,"x":173,"width":100,"var":"btnHeroJX","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"觉醒","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]}]},{"type":"Image","props":{"y":234,"x":21,"var":"_di2"},"child":[{"type":"Label","props":{"y":1,"x":94,"text":"该英雄已经觉醒了","strokeColor":"#2a4f9c","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true}}]}]},{"type":"Image","props":{"var":"xingji"},"child":[{"type":"Image","props":{"var":"sx1"},"child":[{"type":"shengxingItem","props":{"y":124,"x":45,"var":"pre_star","runtime":"ui.yingxiong.shengxingItemUI"}},{"type":"shengxingItem","props":{"y":124,"x":250,"var":"next_star","runtime":"ui.yingxiong.shengxingItemUI"}},{"type":"Image","props":{"y":144,"x":152,"skin":"homeland/img_jiantou3.png","scaleY":0.75,"scaleX":0.75}},{"type":"Button","props":{"y":290,"x":195,"width":100,"var":"btnShengXing","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"升星","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]},{"type":"Label","props":{"y":81,"x":94,"width":200,"text":"星级转化","strokeColor":"#2a4f9c","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":230,"x":145,"skin":"homeland/04001017.info.icon.png"},"child":[{"type":"Label","props":{"y":7,"x":40,"width":100,"var":"sx_cost","text":"X100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":344,"x":43,"width":300,"text":"能力进一步提升","strokeColor":"#2a4f9c","stroke":2,"leading":4,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":10,"x":10,"visible":false,"var":"sx2"},"child":[{"type":"Label","props":{"y":225,"x":85,"width":200,"text":"该英雄已经满星了","strokeColor":"#2a4f9c","stroke":2,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]}]},{"type":"Image","props":{"var":"zhihuan"},"child":[{"type":"Button","props":{"y":290,"x":195,"width":100,"var":"btnZH","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"置换","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]},{"type":"Image","props":{"y":230,"x":145,"skin":"homeland/04000412.info.icon.png"},"child":[{"type":"Label","props":{"y":7,"x":40,"width":100,"var":"zh_cost","text":"X100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":344,"x":43,"width":300,"text":"置换成相同品质的英雄","strokeColor":"#2a4f9c","stroke":2,"leading":4,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":223,"x":198,"var":"changeRole","skin":"homeland/img_reng.png","scaleY":0.8,"scaleX":0.8,"anchorY":1,"anchorX":0.5}}]},{"type":"Image","props":{"y":97,"x":406,"width":100,"height":125},"child":[{"type":"Image","props":{"y":112,"x":-10,"width":120,"skin":"homeland/img_shuxingtishengdi.png","height":20},"child":[{"type":"Label","props":{"y":1,"x":10,"width":100,"var":"_name","text":"太阳神光介","fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":70,"x":-41,"width":70,"var":"btnLeft","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":15,"x":20,"width":45,"stateNum":"2","skin":"homeland/btn_arrow.png","height":45,"events":"click"}}]},{"type":"Image","props":{"y":71,"x":140,"width":70,"var":"btnRight","height":70,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":15,"x":54,"width":45,"stateNum":"2","skin":"homeland/btn_arrow.png","scaleX":-1,"height":45,"events":"click"}}]},{"type":"Image","props":{"y":-23,"x":-25,"width":30,"var":"star1","skin":"homeland/img_star_1.png","height":30}},{"type":"Image","props":{"y":-23,"x":5,"width":30,"var":"star2","skin":"homeland/img_star_1.png","height":30}},{"type":"Image","props":{"y":-23,"x":36,"width":30,"var":"star3","skin":"homeland/img_star_1.png","height":30}},{"type":"Image","props":{"y":-23,"x":66,"width":30,"var":"star4","skin":"homeland/img_star_1.png","height":30}},{"type":"Image","props":{"y":-23,"x":96,"width":30,"var":"star5","skin":"homeland/img_star_1.png","height":30}}]},{"type":"Label","props":{"y":112,"x":611,"width":60,"var":"_pinzhi","text":"SSR","strokeColor":"#c04543","stroke":3,"fontSize":24,"color":"#e269f3","bold":true,"align":"center"}},{"type":"Button","props":{"y":192,"x":632,"width":100,"var":"btnCC","stateNum":"1","skin":"common/img_zhiyehuzhang1.png","height":90,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":37,"var":"cc","text":"出场","stroke":2,"fontSize":20,"color":"#FFFFFF","centerX":1,"bold":true}}]},{"type":"Image","props":{"y":110,"x":714,"var":"btnHero","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"详\\n情","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":175,"x":714,"var":"btnStar","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"星\\n级","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":240,"x":714,"var":"btnJueXing","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"觉\\n醒","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":305,"x":714,"var":"btnZhiHuan","skin":"homeland/img_mzdikuan.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"置\\n换","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":79,"x":613,"width":60,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5"},"child":[{"type":"Label","props":{"y":5,"x":10,"text":"品质","fontSize":20,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":45,"x":671,"var":"btn_close","skin":"homeland/close.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":33,"x":345,"text":"英雄","strokeColor":"#FFFFFF","stroke":3,"fontSize":25,"color":"#227095","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.yingxiong.yingxiongItem"] = app.yingxiong.yingxiongItem;
            View.viewClassMap["ui.yingxiong.shengxingItemUI"] = ui.yingxiong.shengxingItemUI;
            super.createChildren();
            this.createView(ui.yingxiong.YXDlgUI.uiView);
            this.registerEvents({"s1":["click2"],"s2":["click2"],"s3":["click2"],"s4":["click2"],"lstYingXiong":["cellClick"],"btnHeroJX":["click"],"btnShengXing":["click"],"btnZH":["click"],"btnLeft":["click"],"btnRight":["click"],"btnCC":["click"],"btnHero":["click"],"btnStar":["click"],"btnJueXing":["click"],"btnZhiHuan":["click"],"btn_close":["click"]});
        }
        onClose(): void {
            this.pre_star.onClose();
            this.next_star.onClose();
        }
    }
}

module ui.zhaomu {
    
    export interface IallDlgUI {
        onLstShowCellClick(e: Laya.Event, index: number): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnAccessoryClick2(e: Laya.Event): void;
        onBtnMobClick2(e: Laya.Event): void;
        onBtnItemClick2(e: Laya.Event): void;
        onBtnWeaponClick2(e: Laya.Event): void;
        onBtnLongCoatClick2(e: Laya.Event): void;
        onBtnCapeClick2(e: Laya.Event): void;
        onBtnShieldClick2(e: Laya.Event): void;
        onBtnGloveClick2(e: Laya.Event): void;
        onBtnShoesClick2(e: Laya.Event): void;
        onBtnCapClick2(e: Laya.Event): void;
        
    }
    export class allDlgUI extends BaseDialog {
        
        public lstShow: ListView;
        public btnBack: Laya.Image;
        public btnAccessory: Laya.Label;
        public btnMob: Laya.Label;
        public btnItem: Laya.Label;
        public btnWeapon: Laya.Label;
        public btnLongCoat: Laya.Label;
        public btnCape: Laya.Label;
        public btnShield: Laya.Label;
        public btnGlove: Laya.Label;
        public btnShoes: Laya.Label;
        public btnCap: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":10,"x":0,"width":600,"skin":"event/Delivery.Send_Info.backgrnd.png","height":390},"child":[{"type":"Image","props":{"y":33,"x":11,"width":580,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":345}}]},{"type":"Label","props":{"y":15,"x":274,"text":"图鉴","strokeColor":"#051204","stroke":4,"fontSize":26,"color":"#FFFFFF","bold":true}},{"type":"ListView","props":{"y":50,"x":20,"width":563,"var":"lstShow","height":257},"child":[{"type":"wfbagItem","props":{"runtime":"app.yingxiong.wfbagItem","name":"render"}}]},{"type":"Image","props":{"y":31,"x":575,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":357,"x":366,"width":80,"var":"btnAccessory","text":"饰品","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":357,"x":470,"width":80,"var":"btnMob","text":"其他","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":317,"x":62,"width":80,"var":"btnItem","text":"卷轴","height":30,"fontSize":20,"color":"#be531e","bold":true,"align":"center"}},{"type":"Label","props":{"y":317,"x":164,"width":80,"var":"btnWeapon","text":"武器","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":317,"x":266,"width":80,"var":"btnLongCoat","text":"套装","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":317,"x":368,"width":80,"var":"btnCape","text":"披风","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":317,"x":470,"width":80,"var":"btnShield","text":"盾牌","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":357,"x":62,"width":80,"var":"btnGlove","text":"手套","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":357,"x":171,"width":80,"var":"btnShoes","text":"鞋子","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}},{"type":"Label","props":{"y":357,"x":268,"width":80,"var":"btnCap","text":"帽子","height":30,"fontSize":20,"color":"#5a5857","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.yingxiong.wfbagItem"] = app.yingxiong.wfbagItem;
            super.createChildren();
            this.createView(ui.zhaomu.allDlgUI.uiView);
            this.registerEvents({"lstShow":["cellClick"],"btnBack":["click"],"btnAccessory":["click2"],"btnMob":["click2"],"btnItem":["click2"],"btnWeapon":["click2"],"btnLongCoat":["click2"],"btnCape":["click2"],"btnShield":["click2"],"btnGlove":["click2"],"btnShoes":["click2"],"btnCap":["click2"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IbaikeDlgUI {
        onLstRewardCellClick(e: Laya.Event, index: number): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnLeftClick(e: Laya.Event): void;
        onBtnRightClick(e: Laya.Event): void;
        
    }
    export class baikeDlgUI extends BaseDialog {
        
        public lstReward: ListView;
        public btnBack: Laya.Image;
        public body: Laya.Image;
        public pageshow: Laya.Label;
        public btnLeft: Laya.Image;
        public btnRight: Laya.Image;
        public _name: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":123,"x":161,"skin":"common/Book.backgrnd.png"}},{"type":"ListView","props":{"y":168,"x":198,"width":181,"var":"lstReward","height":232},"child":[{"type":"rwItem","props":{"runtime":"app.zhaomu.rwItem","name":"render"}}]},{"type":"Image","props":{"y":144,"x":598,"width":50,"var":"btnBack","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":10,"x":10,"skin":"homeland/img_unload.png"}}]},{"type":"Image","props":{"y":364,"x":505,"var":"body","anchorY":1}},{"type":"Label","props":{"y":394,"x":485,"width":60,"var":"pageshow","text":"1/10","strokeColor":"#995511","stroke":2,"fontSize":20,"color":"#dbb51d","bold":true,"align":"center"}},{"type":"Image","props":{"y":404,"x":451,"var":"btnLeft","skin":"homeland/Book.BtPrev.mouseOver.0.png","scaleY":1.5,"scaleX":1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":404,"x":578,"var":"btnRight","skin":"homeland/Book.BtPrev.mouseOver.0.png","scaleY":1.5,"scaleX":-1.5,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":137,"x":406,"width":200,"var":"_name","text":"蘑菇王","fontSize":16,"bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.zhaomu.rwItem"] = app.zhaomu.rwItem;
            super.createChildren();
            this.createView(ui.zhaomu.baikeDlgUI.uiView);
            this.registerEvents({"lstReward":["cellClick"],"btnBack":["click"],"btnLeft":["click"],"btnRight":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IguaDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onDaan1Click(e: Laya.Event): void;
        onDaan2Click(e: Laya.Event): void;
        onDaan3Click(e: Laya.Event): void;
        
    }
    export class guaDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public btnBack: Laya.Image;
        public wenti: Laya.Label;
        public daan1: Laya.Label;
        public daan2: Laya.Label;
        public daan3: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"var":"bg"}},{"type":"Image","props":{"y":243,"x":360,"var":"btnBack","skin":"homeland/job4.png","alpha":0.8}},{"type":"Label","props":{"y":528,"x":210,"text":"请点击屏幕中出现的人物确定你不是机器人","fontSize":20,"color":"#cab4b4","bold":true}},{"type":"Label","props":{"y":40,"x":260,"width":300,"text":"测谎仪检测","stroke":3,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":273,"x":0,"width":800,"var":"wenti","text":"请勾选1+1=?","stroke":3,"fontSize":50,"color":"#FFFFFF","bold":true,"align":"center"},"child":[{"type":"Label","props":{"y":113,"x":158,"width":135,"var":"daan1","text":"100\\n","stroke":3,"fontSize":50,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":113,"x":343,"width":135,"var":"daan2","text":"200\\n","stroke":3,"fontSize":50,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":113,"x":528,"width":135,"var":"daan3","text":"300\\n","stroke":3,"fontSize":50,"color":"#FFFFFF","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.guaDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"daan1":["click"],"daan2":["click"],"daan3":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IjobDlgUI {
        onLstJpbCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnBackClick(e: Laya.Event): void;
        onBtnZSClick(e: Laya.Event): void;
        
    }
    export class jobDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public lstJpb: ListView;
        public btnBack: Laya.Image;
        public title: Laya.Label;
        public zhuansheng: Laya.Label;
        public body: Laya.Image;
        public btnZS: Laya.Button;
        public hp: Laya.Label;
        public atk: Laya.Label;
        public def: Laya.Label;
        public matk: Laya.Label;
        public mdef: Laya.Label;
        public num: Laya.Label;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg"}},{"type":"Image","props":{"y":0,"x":0,"skin":"homeland/house4.basic.0.0.png"}},{"type":"ListView","props":{"y":100,"x":0,"width":800,"var":"lstJpb","height":400,"centerX":0},"child":[{"type":"jobItem","props":{"runtime":"app.zhaomu.jobItem","name":"render"}},{"type":"Label","props":{"y":458,"x":270,"text":"完成所有转职后可以进行转生","fontSize":20,"color":"#757272","bold":true}}]},{"type":"Image","props":{"y":50,"x":730,"width":200,"var":"btnBack","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":76,"text":"离开","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":20,"x":250,"width":300,"var":"title","text":"转生次数：0","stroke":3,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":80,"x":280,"var":"zhuansheng","text":"转生全体效果加成","stroke":3,"leading":10,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"left"},"child":[{"type":"Image","props":{"y":330,"x":120,"var":"body"}},{"type":"Label","props":{"y":476,"x":-100,"text":"你的实力已经大大提升了，你现在可以进行转生了","fontSize":20,"color":"#757272","bold":true}},{"type":"Button","props":{"y":426,"x":120,"width":100,"var":"btnZS","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"转生","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]},{"type":"Label","props":{"y":55,"x":20,"width":200,"var":"hp","text":"最大生命：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":91,"x":20,"width":200,"var":"atk","text":"攻击力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":127,"x":20,"width":200,"var":"def","text":"防御力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":163,"x":20,"width":200,"var":"matk","text":"魔法攻击力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":199,"x":20,"width":200,"var":"mdef","text":"物理防御力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Image","props":{"y":358,"x":50,"skin":"homeland/02028044.info.icon.png"},"child":[{"type":"Label","props":{"y":7,"x":40,"width":100,"var":"num","text":"100/100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.zhaomu.jobItem"] = app.zhaomu.jobItem;
            super.createChildren();
            this.createView(ui.zhaomu.jobDlgUI.uiView);
            this.registerEvents({"lstJpb":["cellChildClick"],"btnBack":["click"],"btnZS":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IjobItemUI {
        onChangeJobClick(e: Laya.Event): void;
        
    }
    export class jobItemUI extends CellView {
        
        public head: Laya.Image;
        public changeJob: Laya.Button;
        public msg: Laya.Label;
        public num: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":200,"height":410},"child":[{"type":"Image","props":{"y":0,"x":11,"var":"head","skin":"common/112.png"}},{"type":"Button","props":{"y":368,"x":100,"width":100,"var":"changeJob","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"转职","fontSize":20,"color":"#FFFFFF","bold":true}}]},{"type":"Label","props":{"y":229,"x":0,"width":200,"text":"转职要求","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":271,"x":0,"width":200,"var":"msg","text":"击杀蘑菇王数量","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":311,"x":0,"width":200,"var":"num","text":"0/10","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.jobItemUI.uiView);
            this.registerEvents({"changeJob":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IlunhuiDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onBtnLvClick(e: Laya.Event): void;
        
    }
    export class lunhuiDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public _time: Laya.Label;
        public mdd: Laya.Label;
        public mad: Laya.Label;
        public pdd: Laya.Label;
        public pad: Laya.Label;
        public hp: Laya.Label;
        public zuanshi: Laya.Label;
        public jifen: Laya.Label;
        public btnBack: Laya.Image;
        public btnLv: Laya.Button;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg"}},{"type":"Image","props":{"y":0,"x":0,"skin":"homeland/house4.basic.0.0.png"}},{"type":"Label","props":{"y":20,"x":250,"width":300,"var":"_time","text":"英雄轮回次数：0","stroke":3,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":80,"x":250,"text":"全体召唤英雄属性加成","stroke":3,"leading":10,"fontSize":30,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":279,"x":300,"width":200,"var":"mdd","text":"物理防御力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":243,"x":300,"width":200,"var":"mad","text":"魔法攻击力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":207,"x":300,"width":200,"var":"pdd","text":"防御力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":171,"x":300,"width":200,"var":"pad","text":"攻击力：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Label","props":{"y":135,"x":300,"width":200,"var":"hp","text":"最大生命：+100","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#fedb63","bold":true,"align":"center"}},{"type":"Image","props":{"y":438,"x":330,"skin":"homeland/02028044.info.icon.png"},"child":[{"type":"Label","props":{"y":4,"x":43,"width":100,"var":"zuanshi","text":"100/100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":-35,"x":-2,"text":"积分","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}},{"type":"Label","props":{"y":-35,"x":43,"width":100,"var":"jifen","text":"100/100","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":50,"x":699,"width":200,"var":"btnBack","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":76,"text":"离开","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":506,"x":400,"width":100,"var":"btnLv","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":30,"text":"轮回","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","centerY":0,"centerX":0,"bold":true}}]},{"type":"Label","props":{"y":555,"x":210,"text":"温馨提示：积分可通过女神塔、死神塔获取","fontSize":20,"color":"#757272","bold":true}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.lunhuiDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"btnLv":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export class mobItemUI extends BaseView {
        
        public img: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":80,"height":70},"child":[{"type":"Image","props":{"y":2,"x":7,"width":66,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":66,"alpha":0.4}},{"type":"Image","props":{"y":13,"x":15,"width":50,"height":50},"child":[{"type":"Image","props":{"y":50,"x":25,"var":"img","anchorY":1,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.mobItemUI.uiView);
            
        }
    }
}

module ui.zhaomu {
    
    export class rwItemUI extends BaseView {
        
        public img: Laya.Image;
        public static uiView: any = {"type":"BaseView","props":{"width":60,"height":60},"child":[{"type":"Image","props":{"y":2,"x":2,"width":55,"skin":"homeland/img_zikuan.png","sizeGrid":"5,5,5,5","height":55,"alpha":0.4}},{"type":"Image","props":{"y":2,"x":2,"width":55,"height":55},"child":[{"type":"Image","props":{"y":27,"x":27,"var":"img","scaleY":1.25,"scaleX":1.25,"anchorY":0.5,"anchorX":0.5}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.rwItemUI.uiView);
            
        }
    }
}

module ui.zhaomu {
    
    export interface IshoujiDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        onBtnPetClick2(e: Laya.Event): void;
        onBtnJobClick2(e: Laya.Event): void;
        onBtnChairClick2(e: Laya.Event): void;
        onBtnTamingMobClick2(e: Laya.Event): void;
        onBtnRingClick2(e: Laya.Event): void;
        
    }
    export class shoujiDlgUI extends BaseDialog {
        
        public lstAbi: Laya.Panel;
        public pet: Laya.Label;
        public tamingmob: Laya.Label;
        public job: Laya.Label;
        public chair: Laya.Label;
        public ring: Laya.Label;
        public btnBack: Laya.Image;
        public btnPet: Laya.Image;
        public btnJob: Laya.Image;
        public btnChair: Laya.Image;
        public btnTamingMob: Laya.Image;
        public btnRing: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":625,"height":400},"child":[{"type":"Image","props":{"y":0,"x":12,"width":600,"skin":"event/Delivery.Send_Info.backgrnd.png","height":400},"child":[{"type":"Image","props":{"y":33,"x":11,"width":580,"skin":"event/Delivery.Send_Info.backgrnd2.png","height":350}},{"type":"Label","props":{"y":6,"x":274,"text":"收集","strokeColor":"#051204","stroke":4,"fontSize":26,"color":"#FFFFFF","bold":true}}]},{"type":"Panel","props":{"y":49,"x":26,"width":550,"var":"lstAbi","mouseThrough":true,"height":312},"child":[{"type":"Label","props":{"x":3,"width":543,"var":"pet","text":"收集任意1个宠物，全体生命永久+1%\\n收集任意2个宠物，全体攻击力永久+1%\\n收集任意3个宠物，全体防御永久+1%\\n收集任意4个宠物，全体生命永久+1%\\n收集任意5个宠物，全体攻击力永久+1%，打怪经验永久+5%\\n收集任意6个宠物，全体防御永久+1%\\n收集任意7个宠物，全体生命永久+1%\\n收集任意8个宠物，全体攻击力永久+1%\\n收集任意9个宠物，全体防御永久+1%\\n收集任意10个宠物，全体生命永久+1%，打怪经验永久+5%\\n收集任意11个宠物，全体攻击力永久+1%\\n收集任意12个宠物，全体防御永久+1%\\n集齐全部宠物，可激活【自动拾取】功能","leading":5,"fontSize":20,"color":"#5a5857","bold":true}},{"type":"Label","props":{"y":0,"x":3,"width":543,"var":"tamingmob","text":"收集任意1个坐骑，全体暴击率永久+1%\\n收集任意2个坐骑，全体暴击率永久+1%\\n收集任意3个坐骑，全体暴击率永久+1%\\n收集任意4个坐骑，全体暴击率永久+1%，打怪经验永久+4%\\n收集任意5个坐骑，全体暴击率永久+1%\\n收集任意6个坐骑，全体暴击率永久+1%\\n收集任意7个坐骑，全体暴击率永久+1%\\n收集任意8个坐骑，全体暴击率永久+1%，打怪经验永久+4%\\n集齐全部坐骑，可激活【野外物理免疫，魔法抗性50%】功能","leading":5,"fontSize":20,"color":"#5a5857","bold":true}},{"type":"Label","props":{"y":0,"x":3,"width":543,"var":"job","text":"开启职业龙骑士，全体攻击力增加1%\\n开启职业主教，打怪经验永久+75%\\n开启职业独行客，全体速度增加1%\\n开启职业神射手，全体防御增加1%\\n开启职业英雄，全体攻击力增加1%\\n开启职业冰雷，全体生命增加1%\\n开启职业圣骑士，全体攻击力增加1%\\n开启职业火毒，全体生命增加1%\\n开启职业箭神，全体防御增加1%\\n开启职业无影人，全体速度增加1%\\n开启职业冲锋队长，全体防御增加1%\\n开启职业船长，全体防御增加1%\\n开启职业狂龙战士，全体攻击力增加1%\\n开启职业夜光法师，全体生命增加1%\\n开启职业尖兵，全体攻击力增加1%\\n开启职业剑豪，全体攻击力增加1%\\n开启职业魔影链士，全体攻击力增加1%\\n开启职业圣晶使者，全体防御增加1%\\n开启职业影魂异人，全体攻击力增加1%\\n开启职业虎影，全体攻击力增加1%\\n开启职业神之子，全体攻击力增加1%\\n开启职业爆莉萌天使，全体生命增加1%\\n开启职业战神，全体攻击力增加1%\\n开启职业龙神，全体生命增加1%\\n开启职业双弩精灵，全体防御增加1%\\n开启职业幻影，全体防御增加1%\\n开启职业隐月，全体防御增加1%\\n开启职业恶魔猎手，全体攻击力增加1%\\n开启职业恶魔复仇者，全体攻击力增加1%\\n开启职业唤灵斗师，全体生命增加1%\\n开启职业爆破手，全体防御增加1%\\n开启职业古迹猎人，全体攻击力增加1%\\n开启职业暗影双刀，全体攻击力增加1%\\n开启职业米哈尔，全体攻击力增加1%\\n开启职业魂骑士，全体攻击力增加1%\\n开启职业炎术士，全体生命增加1%\\n开启职业风灵使者，全体防御增加1%\\n开启职业夜行者，全体速度增加1%\\n开启职业奇袭者，全体防御增加1%","leading":5,"fontSize":20,"color":"#5a5857","bold":true}},{"type":"Label","props":{"x":3,"width":543,"var":"chair","text":"收集任意1把椅子，挂机时间永久增加5分钟\\n收集任意2把椅子，挂机时间永久增加5分钟\\n收集任意3把椅子，挂机时间永久增加5分钟\\n收集任意4把椅子，挂机时间永久增加5分钟，打怪经验永久+4%\\n收集任意5把椅子，挂机时间永久增加5分钟\\n收集任意6把椅子，挂机时间永久增加5分钟\\n收集任意7把椅子，挂机时间永久增加5分钟\\n收集任意8把椅子，挂机时间永久增加5分钟，打怪经验永久+4%\\n集齐全部椅子，挂机时间额外永久增加10分钟","leading":5,"fontSize":20,"color":"#5a5857","bold":true}},{"type":"Label","props":{"x":3,"width":543,"var":"ring","text":"收集任意1枚戒指，打怪经验永久+1%\\n收集任意2枚戒指，打怪经验永久+1%\\n收集任意3枚戒指，打怪经验永久+1%\\n收集任意4枚戒指，打怪经验永久+1%\\n收集任意5枚戒指，打怪经验永久+1%\\n收集任意6枚戒指，打怪经验永久+1%\\n集齐全部戒指，打怪经验额外永久+24%","leading":5,"fontSize":20,"color":"#5a5857","bold":true}}]},{"type":"Image","props":{"y":22,"x":585,"width":50,"var":"btnBack","skin":"homeland/close.png","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":51,"x":584,"var":"btnPet","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"宠\\n物","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":115,"x":584,"var":"btnJob","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"职\\n业","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":181,"x":584,"var":"btnChair","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"椅\\n子","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":247,"x":584,"var":"btnTamingMob","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"坐\\n骑","fontSize":20,"color":"#08a3ca","bold":true}}]},{"type":"Image","props":{"y":313,"x":584,"var":"btnRing","skin":"homeland/img_mzdikuan.png"},"child":[{"type":"Label","props":{"y":12,"x":14,"text":"戒\\n指","fontSize":20,"color":"#08a3ca","bold":true}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.shoujiDlgUI.uiView);
            this.registerEvents({"btnBack":["click"],"btnPet":["click2"],"btnJob":["click2"],"btnChair":["click2"],"btnTamingMob":["click2"],"btnRing":["click2"]});
        }
    }
}

module ui.zhaomu {
    
    export interface ItujianDlgUI {
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class tujianDlgUI extends BaseDialog {
        
        public lst_tj: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":720,"height":480},"child":[{"type":"Image","props":{}},{"type":"Image","props":{"y":30,"x":323,"skin":"common/yxl.png"}},{"type":"ListView","props":{"y":84,"x":52,"width":625,"var":"lst_tj","height":336},"child":[{"type":"tujianItem","props":{"runtime":"app.zhaomu.tujianItem","name":"render"}}]},{"type":"Image","props":{"y":31,"x":692,"width":200,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"离开","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.zhaomu.tujianItem"] = app.zhaomu.tujianItem;
            super.createChildren();
            this.createView(ui.zhaomu.tujianDlgUI.uiView);
            this.registerEvents({"btnBack":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export class tujianItemUI extends CellView {
        
        public _img: Laya.Image;
        public _pinzhi: Laya.Label;
        public _name: Laya.Label;
        public _body: Laya.Image;
        public static uiView: any = {"type":"CellView","props":{"width":125,"height":168},"child":[{"type":"Image","props":{"var":"_img","skin":"homeland/characterCard.CardBackgrnd.1.png"},"child":[{"type":"Label","props":{"y":10,"x":-5,"width":60,"var":"_pinzhi","text":"SSR","strokeColor":"#c04543","stroke":3,"fontSize":24,"color":"#f3c669","bold":true,"align":"center"}},{"type":"Image","props":{"y":16,"x":7,"width":100,"height":125},"child":[{"type":"Image","props":{"y":104,"x":-10,"width":120,"skin":"homeland/img_shuxingtishengdi.png","height":20},"child":[{"type":"Label","props":{"y":1,"x":10,"width":100,"var":"_name","text":"太阳神光介","fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":95,"x":55,"var":"_body"}}]}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.tujianItemUI.uiView);
            
        }
    }
}

module ui.zhaomu {
    
    export interface IxiulianDlgUI {
        onLstXiuLianCellChildClick(e: Laya.Event, index: number, childVarName: string): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class xiulianDlgUI extends BaseDialog {
        
        public lstXiuLian: ListView;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":500,"centerY":0,"centerX":0},"child":[{"type":"ListView","props":{"y":75,"x":22,"width":755,"var":"lstXiuLian","height":300},"child":[{"type":"xiulianItem","props":{"runtime":"app.zhaomu.xiulianItem","name":"render"}}]},{"type":"Image","props":{"y":442,"x":400,"width":150,"var":"btnBack","height":60,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":27,"text":"下次再说","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":34,"x":0,"width":800,"text":"左右翻动可查看更多","fontSize":20,"color":"#dbd8d8","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            View.viewClassMap["app.zhaomu.xiulianItem"] = app.zhaomu.xiulianItem;
            super.createChildren();
            this.createView(ui.zhaomu.xiulianDlgUI.uiView);
            this.registerEvents({"lstXiuLian":["cellChildClick"],"btnBack":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IxiulianItemUI {
        on_imgClick(e: Laya.Event): void;
        onBuyClick(e: Laya.Event): void;
        
    }
    export class xiulianItemUI extends CellView {
        
        public _lv: Laya.Label;
        public _img: Laya.Image;
        public msg: Laya.Label;
        public full: Laya.Label;
        public _numbg: Laya.Image;
        public buy: Laya.Button;
        public _num: Laya.Label;
        public static uiView: any = {"type":"CellView","props":{"width":155,"height":300},"child":[{"type":"Label","props":{"y":72,"x":27,"width":100,"var":"_lv","text":"Lv.1","stroke":3,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":156,"x":77,"var":"_img","skin":"homeland/job1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":37,"x":63,"skin":"homeland/04001190.info.icon.png"}},{"type":"Label","props":{"y":11,"x":27,"width":100,"var":"msg","text":"修炼","stroke":3,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":228,"x":23,"var":"full","text":"达到最高等级","strokeColor":"#13214f","stroke":1,"fontSize":18,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"var":"_numbg"},"child":[{"type":"Button","props":{"y":262,"x":77,"width":80,"var":"buy","stateNum":"2","skin":"homeland/btn_big.png","height":33,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":6,"x":22,"text":"提升","strokeColor":"#051204","stroke":3,"fontSize":18,"color":"#FFFFFF","centerY":-1,"centerX":2,"bold":true}}]},{"type":"Label","props":{"y":218,"x":37,"width":80,"var":"_num","text":"900/900","strokeColor":"#051204","stroke":3,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.xiulianItemUI.uiView);
            this.registerEvents({"_img":["click"],"buy":["click"]});
        }
    }
}

module ui.zhaomu {
    
    export interface IzhaomuDlgUI {
        onOneClickClick(e: Laya.Event): void;
        onTenClickClick(e: Laya.Event): void;
        onBtnHCClick(e: Laya.Event): void;
        onBtnTJClick(e: Laya.Event): void;
        onBtnBackClick(e: Laya.Event): void;
        
    }
    export class zhaomuDlgUI extends BaseDialog {
        
        public bg: Laya.Image;
        public one: Laya.Image;
        public oneClick: Laya.Button;
        public ten: Laya.Image;
        public tenClick: Laya.Button;
        public btnHC: Laya.Image;
        public btnTJ: Laya.Image;
        public dizuo: Laya.Image;
        public btnBack: Laya.Image;
        public static uiView: any = {"type":"BaseDialog","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg"}},{"type":"Image","props":{"y":0,"x":0,"skin":"homeland/house4.basic.0.0.png"}},{"type":"Image","props":{"y":315,"x":152,"width":95,"var":"one","skin":"homeland/img_lbl_bg.png"},"child":[{"type":"Image","props":{"y":-240,"x":-55,"skin":"common/img_zhiyehuzhang3.png","scaleY":0.9,"scaleX":0.9},"child":[{"type":"Image","props":{"y":33,"x":43,"skin":"common/img_feixia1.png"}}]},{"type":"Image","props":{"y":-7,"x":-10,"width":35,"skin":"homeland/02028044.info.icon.png","height":35}},{"type":"Label","props":{"y":1,"x":23,"width":70,"text":"100","fontSize":25,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":-43,"x":11,"text":"英雄招募","fontSize":18,"color":"#FFFFFF","bold":true}},{"type":"Button","props":{"y":62,"x":45,"width":100,"var":"oneClick","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":24,"text":"抽1次","fontSize":20,"color":"#FFFFFF","bold":true}}]}]},{"type":"Image","props":{"y":315,"x":552,"width":95,"var":"ten","skin":"homeland/img_lbl_bg.png"},"child":[{"type":"Image","props":{"y":-240,"x":-55,"skin":"common/img_zhiyehuzhang4.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Image","props":{"y":33,"x":43,"skin":"common/img_fashi1.png"}}]},{"type":"Image","props":{"y":-7,"x":-10,"width":35,"skin":"homeland/02028044.info.icon.png","height":35}},{"type":"Label","props":{"y":1,"x":23,"width":70,"text":"1000","fontSize":25,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Label","props":{"y":-43,"x":11,"text":"英雄招募","fontSize":18,"color":"#FFFFFF","bold":true}},{"type":"Button","props":{"y":65,"x":47,"width":100,"var":"tenClick","stateNum":"2","skin":"homeland/btn_big.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":8,"text":"连抽10次","fontSize":20,"color":"#FFFFFF","bold":true}}]},{"type":"Image","props":{"y":-165,"x":178,"var":"btnHC","skin":"homeland/04032873.info.icon.png","scaleY":2,"scaleX":2}},{"type":"Label","props":{"y":-146,"x":190,"wordWrap":true,"text":"合成","strokeColor":"#a3791e","stroke":2,"leading":5,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}},{"type":"Image","props":{"y":-60,"x":178,"var":"btnTJ","skin":"homeland/04032873.info.icon.png","scaleY":2,"scaleX":2}},{"type":"Label","props":{"y":-41,"x":190,"wordWrap":true,"text":"图鉴","strokeColor":"#a3791e","stroke":2,"leading":5,"fontSize":20,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":443,"x":352,"var":"dizuo","skin":"homeland/skyStation.artificiality.30.0.png"}},{"type":"Image","props":{"y":60,"x":700,"width":200,"var":"btnBack","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":52,"text":"离开招募","strokeColor":"#051204","stroke":3,"fontSize":24,"color":"#FFFFFF","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":547,"x":100,"width":600,"text":"温馨提示：集齐三神卡，特殊药水会升级为超级药水","fontSize":20,"color":"#dbd8d8","bold":true,"align":"center"}}]};
        public static uiResMap: any[] = [];
        constructor() { super(); }
        createChildren(): void {
            
            super.createChildren();
            this.createView(ui.zhaomu.zhaomuDlgUI.uiView);
            this.registerEvents({"oneClick":["click"],"tenClick":["click"],"btnHC":["click"],"btnTJ":["click"],"btnBack":["click"]});
        }
    }
}


