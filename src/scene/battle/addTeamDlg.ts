/// <reference path="./../../scene/Other/Guide.ts" />
module app.battle {

    import cssGuide = GuideMoudle.Guide;
    export class addTeamDlg extends ui.battle.addTeamDlgUI implements ui.battle.IaddTeamDlgUI {
        public static className = "app.battle.addTeamDlg";

        private m_data:Array<any> = [];
        private m_index:number = -1;
        private m_type:number = 0;
        private _index:number = 0;
        private m_params:any;
        private isfuben:boolean = false;
        private ismiwu:boolean = false;
        private isxiangzi:boolean = false;

        constructor(params:any, fuben:boolean = false, miwu:boolean = false, xiangzi:boolean = false){
            super();
            this.isfuben = fuben;
            this.ismiwu = miwu;
            this.isxiangzi = xiangzi;
            this.m_params = params;
            if(params) {
                this.m_type = params.m_type;
                this._index = params.m_index;
            }
        }

        onInitialize(){

            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 320) / 2 - (Laya.stage.height - 600) / 2;

            if(this.isxiangzi) {
                let a = true;
                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = false;
                        }
                    }
                }
            }

            this.updateData();
        }

        updateData(){

            this.lstYingXiong.vScrollBarSkin = "";
            this.visible = false;
            this.updataList(0);

            this.startTeam();
        }

        private startTeam() : void {
            // if(ms.herodata.Lv > 1) {
                if(ms.team == false) {
                    ms.team = true;                 //第一次到第二关且招募没有开启
                    // Laya.timer.once(500, this, ()=> {
                        let g:cssGuide = new cssGuide();
                        g.m_updata("firstTeam", null);
                    // });
                }
            // }
        }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        updataList(index:number) : void {
            this.m_index = index;

            let have_hero:boolean = false;
            let heroArray = new Array(8);
            this.m_data = [];
            for(let i:number = 0; i < ms.herosdata.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].json = ms.herosdata[i];
                this.m_data[i].sel = (i == index) ? true : false;
                this.m_data[i].cc = ms.herosdata[i].have == 2 ? true : false;
                this.m_data[i].pinzhi = ms.herosdata[i].pinzhi;
                this.m_data[i].Lv = ms.otherheroservedata[i].Lv;
                this.m_data[i].juexing = ms.otherheroservedata[i].juexing;
                this.m_data[i].star = ms.otherheroservedata[i].star;
                if(i == index) {
                    if(this.m_data[i].cc) {
                        this.cc.text = "取消";
                    }
                    else {
                        this.cc.text = "上阵";
                    }
                }
            }

            for(let i:number = 0; i < ((ms.herosdata.length > 8) ? ms.herosdata.length : 8); i++) {
                if(this.m_data[i]) {
                    heroArray[i] = this.m_data[i];
                    have_hero = true;
                }
            }

            this.lstYingXiong.dataModel =  heroArray;

            //上阵人数
            let ccNum:number = 0;
            for(let i:number = 0; i < ms.herosdata.length; i++) {
                if(ms.herosdata[i].have == 2) ccNum++;
            }
            this._pro.value = (ccNum / 5);
            this._proText.text = ccNum + "/5";

            if(have_hero == false) {
                this.onBtnFightClick(null);
                return ;
            }
            else {
                this.visible = true;
            }
        }

        onLstYingXiongCellClick(e: Laya.Event, index: number): void {
            if(index <= ms.herosdata.length - 1) {
                this.updataList(index);
                this.onBtnCCClick(null);
            }
        }

        onBtnCCClick(e: Laya.Event): void {
            if(this.cc.text == "上阵" || this.cc.text == "取消") {
                //已经上阵人数
                let ccNum:number = 0;
                for(let i:number = 0; i < ms.herosdata.length; i++) {
                    if(ms.herosdata[i].have == 2) ccNum++;
                }
                for(let key in msMoudle.herojson) {
                    // console.log(ms.herosdata[this.m_index].id , msMoudle.herojson[key].id, key)
                    if(ms.herosdata[this.m_index].id == msMoudle.herojson[key].id) {
                        if(ms.herosdata[this.m_index].have == 1) {
                            if(ms.herosdata.length >= 5 && ccNum >= 5) {
                                msMoudle.toast("最多上阵5个英雄");
                            }
                            else {
                                let _juexing:number = 0;
                                let _lv:number = 1;
                                ///添加到英雄队伍
                                for(let _:number = 0; _ < 6; _++) {
                                    //这里格式会变化
                                    if(!ms.otherherodata[_] || (ms.otherherodata[_] && ms.otherherodata[_].id == 0)) {
                                        let _repeat:boolean = false;
                                        for(let _add:number = 0; _add < 6; _add++) {
                                            if(ms.otherherodata[_add]) {
                                                if(ms.herosdata[this.m_index].id == ms.otherherodata[_add].id){
                                                    _repeat = true;
                                                    break;
                                                }
                                            }
                                        }

                                        if(_repeat == false) {
                                            ms.otherherodata[_] = new app.model.HeroStatus();
                                            // ms.otherherodata[_].state = 2;        //待续
                                            ms.otherherodata[_].id = ms.herosdata[this.m_index].id;
                                            ms.otherherodata[_].openid = ms.herosdata[this.m_index].openid;
                                            ms.otherherodata[_].Name = ms.herosdata[this.m_index].Name;
                                            // ms.otherherodata[_].head = ms.herosdata[this.m_index].head;
                                            ms.otherherodata[_].pinzhi = ms.herosdata[this.m_index].pinzhi;
                                            /////获取服务器属性
                                            for(let __:number = 0; __ < ms.otherheroservedata.length; __++) {
                                                if(ms.otherheroservedata[__].openid == ms.otherherodata[_].openid) {
                                                    ms.otherherodata[_].Lv = ms.otherheroservedata[__].Lv;
                                                    ms.otherherodata[_].Exp = ms.otherheroservedata[__].Exp;
                                                    ms.otherherodata[_].MaxHP.baseVal = ms.otherheroservedata[__].MaxHP.baseVal;
                                                    ms.otherherodata[_].PADamage.baseVal = ms.otherheroservedata[__].PADamage.baseVal;
                                                    ms.otherherodata[_].PDDamage.baseVal = ms.otherheroservedata[__].PDDamage.baseVal;
                                                    ms.otherherodata[_].CriticalRate.baseVal = ms.otherheroservedata[__].CriticalRate.baseVal;
                                                    ms.otherherodata[_].Evasion.baseVal = ms.otherheroservedata[__].Evasion.baseVal;
                                                    ms.otherherodata[_].Accurate.baseVal = ms.otherheroservedata[__].Accurate.baseVal;

                                                    ms.otherherodata[_].juexing = ms.otherheroservedata[__].juexing;

                                                    _juexing = ms.otherheroservedata[__].juexing;
                                                    _lv = ms.otherheroservedata[__].Lv;
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            msMoudle.toast("英雄不能重复上阵！");
                                            return ;
                                        }

                                        break;
                                    }
                                }
                                ms.herosdata[this.m_index].have = 2;                //设置为上阵

                                ms.herosdata[this.m_index].juexing = _juexing;
                                ms.herosdata[this.m_index].Lv = _lv;

                                ms.yingxiong = false;
                            }
                        }
                        else {
                            ///踢出英雄队伍
                            for(let _:number = 0; _ < 6; _++) {
                                if(ms.otherherodata[_]) {
                                    if(ms.otherherodata[_].openid == ms.herosdata[this.m_index].openid) {
                                        // ms.otherherodata[_] = null;
                                        ms.otherherodata.splice(_, 1);
                                        //其他人前移位置

                                        break;
                                    }
                                }
                            }
                            ms.herosdata[this.m_index].have = 1;
                        }
                        break;
                    }
                }

                this.updataList(this.m_index);
            }
        }

        onBtnFightClick(e: Laya.Event): void {

            if(this.isxiangzi) {
                this.close();
                if(msMoudle.mainT) {
                    msMoudle.mainT.GJ();
                }
                return ;
            }

            //场景切换
            if(msMoudle.isPvp) {
                msMoudle.gameP.gotoScene("222010402_gai.img");
                this.m_params.close();
                this.close();
                // msMoudle.gameP.ding1.visible = false;
                // msMoudle.gameP.ding2.visible = false;
                // msMoudle.gameP.ding3.visible = false;
            }
            else if(msMoudle.isWuJin) {
                if(msMoudle.wujin_tip == 0) {
                    msMoudle.gameP.gotoScene("200080101_gai.img");
                    ms.dboss4--;
                }
                else if(msMoudle.wujin_tip == 1) {
                    msMoudle.gameP.gotoScene("270050100_gai.img");
                    ms.dboss3--;
                }
                else if(msMoudle.wujin_tip == 2) {
                    // if(ms.huoli > 0) {
                        if(ms.jifen() < 100) {
                            msMoudle.toast("积分不足100");
                            this.close();
                            return ;
                        }
                        else {
                            msMoudle._(); msMoudle.updateJiFen(-100);
                            msMoudle.gameP.gotoScene("200080101_gai.img");
                        }
                    // }
                    // else {
                    //     msMoudle.toast("体力不足");
                    //     this.close();
                    //     return ;
                    // }
                    /////// ms.dboss3--;
                }
                else if(msMoudle.wujin_tip == 3) {
                    msMoudle.gameP.gotoScene("270050100_gai.img");
                    // ms.dboss3--;
                }
                // msMoudle.gameP.gotoScene("200080101.img");//200080101   270050100
                this.m_params.close();
                this.close();
                // msMoudle.gameP.ding1.visible = false;
                // msMoudle.gameP.ding2.visible = false;
                // msMoudle.gameP.ding3.visible = false;
            }
            else {
                if(this.isfuben)
                    msMoudle.gameP.gotoScene("000020000_gai.img");
                else if(this.ismiwu)
                    msMoudle.gameP.gotoScene("302020100_gai.img");
                else {
                    if(msMoudle.WorldBossLv == 80 && msMoudle.isWorldBoss)
                        msMoudle.gameP.gotoScene("701010323_gai.img");
                    else if(msMoudle.WorldBossLv == 100 && msMoudle.isWorldBoss)
                        msMoudle.gameP.gotoScene("220080001_gai.img");
                    else if(msMoudle.WorldBossLv == 120 && msMoudle.isWorldBoss)
                        msMoudle.gameP.gotoScene("280030000_gai.img");
                    else if(msMoudle.WorldBossLv == 140 && msMoudle.isWorldBoss)
                        msMoudle.gameP.gotoScene("240060200_gai.img");
                    else
                        msMoudle.gameP.gotoScene("222010402_gai.img");
                }
                this.m_params.close();
                this.close();
                // msMoudle.gameP.ding1.visible = false;
                // msMoudle.gameP.ding2.visible = false;
                // msMoudle.gameP.ding3.visible = false;
            }
        }

        onClose() {
            if(this.isxiangzi) {
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
}