/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../scene/Other/Guide.ts" />
/// <reference path="./../../core/ms/Maple/Skill.ts" />

module app.yingxiong {

    import cssCharacter = CharacterRole.Character;
    import cssMsg = MsgRole.Msg;
    import cssGuide = GuideMoudle.Guide;
    import cssSkill = SkillRole.Skill;

    export class YXDlg extends ui.yingxiong.YXDlgUI implements ui.yingxiong.IYXDlgUI {
        public static className = "app.yingxiong.YXDlg";
        public char:cssCharacter;
        private jxchar:cssCharacter;
        public m_index:number = 0;
        private m_data:Array<any> = [];
        private m_msg:cssMsg;
        private heroindex:number = 0;
        private showkey:any = 0;

        onInitialize(){
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

            this.updateData();

            this.cc.text = "育成";
        }

        onClose() {
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            if(this.jxchar) {
                this.jxchar.clearUp();
                this.jxchar = null;
            }
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }

        updateData(){
            this.lstYingXiong.vScrollBarSkin = "";

            this.m_msg = new cssMsg();

            this.m_index = 0;
            this.updateSelf(0);

            this.btnJueXing.gray = true;
            this.btnStar.gray = true;
            this.btnZhiHuan.gray = true;

            this.lstJueXing.visible = false;
            this.xingji.visible = false;
            this.zhihuan.visible = false;
        }

        cbtn_index:number = 1;
        onBtnHeroClick(e: Laya.Event): void {
            if(this.btnHero.gray == true) {
                this.btnHero.gray = false;
                this.btnJueXing.gray = true;
                this.btnStar.gray = true;
                this.btnZhiHuan.gray = true;

                this.lstJueXing.visible = false;
                this.xiangqing.visible = true;
                this.xingji.visible = false;
                this.zhihuan.visible = false;

                this.btnCC.visible = true;
                this.cc.text = "育成";

                this.updataList(this.m_index);
                this.cbtn_index = 1;
            }
        }

        onBtnStarClick(e: Laya.Event): void {
             if(this.btnStar.gray == true) {
                this.btnStar.gray = false;
                this.btnHero.gray = true;
                this.btnJueXing.gray = true;
                this.btnZhiHuan.gray = true;

                // this.btnCC.visible = false;
                this.xingji.visible = true;
                this.lstJueXing.visible = false;
                this.xiangqing.visible = false;
                this.zhihuan.visible = false;
                this.updataSXList(this.m_index);
             }
        }

        updataSXList(index:number) : void {
            if(this.m_data[index].star >= 5) {
                this.sx1.visible = false;
                this.sx2.visible = true;
            }
            else {
                this.sx1.visible = true;
                this.sx2.visible = false;
                this.sx_cost.text = ms.cailiao1() + " / " + (this.m_data[index].star * 25);
                if(ms.cailiao1() >= this.m_data[index].star * 25) this.sx_cost.color = "#35f904";
                else this.sx_cost.color = "#FFFFFF";//#b21d1c
                this.updSX(this.pre_star, this.m_data[index], 0);
                this.updSX(this.next_star, this.m_data[index], 1);
            }
        }

        updSX(sx_nodex:any, data:any, flag:number) : void {
            sx_nodex._img.visible = data ? true : false;
            sx_nodex.pinzhi.visible = data ? true : false;
            sx_nodex._lv.text = "";
            sx_nodex.isjuexing.visible = false;
            if(data) {
                sx_nodex._lv.text = "Lv " + data.lv;
                // this.select.visible = data.sel;
                sx_nodex.isjuexing.visible = data.isjuexing;
                sx_nodex._starNum.text = "X" + (data.star + flag);
                sx_nodex.pinzhi.skin = "homeland/img_pingzhikuang" + data["json"].pinzhi + ".png";
                // this.cc.visible = data.cc;
                sx_nodex._name.text = data["json"].Name;

                // sx_nodex._img.skin = data["json"].head;
                sx_nodex._img.skin = "res/Character/Cap/" + msMoudle.herojson[Number(data["json"].id)-1001].head + ".img/info.icon.png";
            }
        }

        onBtnJueXingClick(e: Laya.Event): void {
            if(this.btnJueXing.gray == true) {
                this.btnHero.gray = true;
                this.btnJueXing.gray = false;
                this.btnStar.gray = true;
                this.btnZhiHuan.gray = true;

                this.lstJueXing.visible = true;
                this.xiangqing.visible = false;
                this.xingji.visible = false;
                this.zhihuan.visible = false;

                // this.cc.text = "觉醒";
                // this.btnCC.visible = false;

                this.jx_cost.text = ms.juexing1() + " / " + ms.otherheroservedata[this.m_index].pinzhi * 25;
                if(ms.juexing1() >= ms.otherheroservedata[this.m_index].pinzhi * 25) this.jx_cost.color = "#35f904";
                else this.jx_cost.color = "#FFFFFF";//#b21d1c

                // this.juexing1.text = ms.juexing1() + "/50";
                // this.juexing2.text = ms.juexing2 + "/50";
                // this.juexing3.text = ms.juexing3 + "/50";
                // this.juexing4.text = ms.juexing4 + "/50";

                // if(ms.juexing1() >= 50) this.juexing1.color = "#35f904";
                // else this.juexing1.color = "#FFFFFF";//#b21d1c
                // if(ms.juexing2 >= 50) this.juexing2.color = "#35f904";
                // else this.juexing2.color = "#FFFFFF";
                // if(ms.juexing3 >= 50) this.juexing3.color = "#35f904";
                // else this.juexing3.color = "#FFFFFF";
                // if(ms.juexing4 >= 50) this.juexing4.color = "#35f904";
                // else this.juexing4.color = "#FFFFFF";

                // this._title.text = "觉醒形态(" + ms.otherheroservedata[this.m_index].juexing + "/5)";
                if(ms.otherheroservedata[this.m_index].juexing == 1) {
                    this._di1.visible = false;
                    this._di2.visible = true;
                    // this.btnHeroJX.visible = false;
                    if(this.skill) {
                        this.skill.clearUp();
                        this.skill.removeSelf();
                        this.skill = null;
                    }
                    if(this.jxchar) {
                        this.jxchar.clearUp();
                        this.jxchar = null;
                    }
                }
                else {
                    this._di1.visible = true;
                    this._di2.visible = false;
                    this.updataJXList(this.m_index);
                    // this.btnHeroJX.visible = true;
                }

                this.cbtn_index = 4;
            }
        }

        onBtnZHClick(e: Laya.Event): void {
            let pinzhi5 = [1014, 1004, 1020];
            let pinzhi4 = [1001, 1002, 1011];
            let pinzhi3 = [1006, 1007, 1008, 1019, 1015];
            let pinzhi1 = [1003, 1005, 1016, 1009, 1010, 1012, 1018, 1013, 1017];
            let pz = ms.otherheroservedata[this.m_index].pinzhi;
            if(pz >= 3) {
                //只是把id和品质变化
                if(ms.zhihuan >= 1) {
                    msMoudle._(); msMoudle.updateZhiHuan(-1);
                    if(pz == 3) {
                        ms.otherheroservedata[this.m_index].id = pinzhi3[msMoudle.getRandValue(0, 0, pinzhi3.length)];
                    }
                    else if(pz == 4) {
                        ms.otherheroservedata[this.m_index].id = pinzhi4[msMoudle.getRandValue(0, 0, pinzhi4.length)];
                    }
                    else if(pz == 5) {
                        ms.otherheroservedata[this.m_index].id = pinzhi5[msMoudle.getRandValue(0, 0, pinzhi5.length)];
                    }
                    let keyindex = 0;
                    for(let key in msMoudle.herojson) {
                        if(ms.otherheroservedata[this.m_index].id == msMoudle.herojson[key].id) {
                            keyindex = Number(key);
                            break;
                        }
                    }
                    msMoudle.serverAbi(ms.otherheroservedata[this.m_index]);
                    for(let _:number = 0; _ < ms.otherherodata.length; _++) {
                        if(ms.otherherodata[_]) {
                            if(ms.otherheroservedata[this.m_index].openid == ms.otherherodata[_].openid) {
                                ms.otherherodata[_].id = ms.otherheroservedata[this.m_index].id;
                                break;
                            }
                        }
                    }
                    for(let key:number = 0; key < ms.herosdata.length; key++) {
                        if(ms.otherheroservedata[this.m_index].openid == ms.herosdata[key].openid) {
                            ms.herosdata[key].id = msMoudle.herojson[keyindex].id;
                            ms.herosdata[key].Name = msMoudle.herojson[keyindex].name;
                            // ms.herosdata[key].head = msMoudle.herojson[keyindex].head;
                            ms.herosdata[key].pinzhi = msMoudle.herojson[keyindex].pinzhi;
                            ms.otherheroservedata[this.m_index].Name = msMoudle.herojson[keyindex].name;
                            // ms.otherheroservedata[this.m_index].head = msMoudle.herojson[keyindex].head;
                            break;
                        }
                    }
                    this.updateSelf(this.m_index);
                    //
                    this.zh_cost.text = ms.zhihuan + " / 1";
                    if(ms.zhihuan >= 1) this.zh_cost.color = "#35f904";
                    else this.zh_cost.color = "#FFFFFF";//#b21d1c

                    ms.saveServer();
                }
                else {
                    msMoudle.toast("置换材料不足");
                }
            }
            else {
                msMoudle.toast("该英雄品质太低无法置换");
            }
        }

        onBtnZhiHuanClick(e: Laya.Event): void {
            if(this.btnZhiHuan.gray == true) {
                this.btnHero.gray = true;
                this.btnJueXing.gray = true;
                this.btnStar.gray = true;
                this.btnZhiHuan.gray = false;

                this.lstJueXing.visible = false;
                this.xiangqing.visible = false;
                this.xingji.visible = false;
                this.zhihuan.visible = true;

                this.zh_cost.text = ms.zhihuan + " / 1";
                if(ms.zhihuan >= 1) this.zh_cost.color = "#35f904";
                else this.zh_cost.color = "#FFFFFF";//#b21d1c
            }
        }

        onBtnHeroJXClick(e: Laya.Event): void {
            if(ms.juexing1() >= ms.otherheroservedata[this.m_index].pinzhi * 25) {
                msMoudle._(); msMoudle.updateJueXing1(-ms.otherheroservedata[this.m_index].pinzhi * 25)
                this.jx_cost.text = ms.juexing1() + " / " + ms.otherheroservedata[this.m_index].pinzhi * 25;
                if(ms.otherheroservedata[this.m_index].juexing < 1) {
                    ms.otherheroservedata[this.m_index].juexing++;
                    // this._title.text = "觉醒形态(" + ms.otherheroservedata[this.m_index].juexing + "/5)";
                    this.updateSelf(this.m_index);

                    if(ms.otherheroservedata[this.m_index].juexing == 1) {
                        this._di1.visible = false;
                        this._di2.visible = true;
                        // this.btnHeroJX.visible = false;
                        if(this.skill) {
                            this.skill.clearUp();
                            this.skill.removeSelf();
                            this.skill = null;
                        }
                        if(this.jxchar) {
                            this.jxchar.clearUp();
                            this.jxchar = null;
                        }
                    }

                    for(let _:number = 0; _ < ms.otherherodata.length; _++) {
                        if(ms.otherherodata[_]) {
                            if(ms.otherheroservedata[this.m_index].openid == ms.otherherodata[_].openid) {
                                // console.log("这里");
                                // msMoudle.gameP.updataHero(_ + 2, null);
                                ms.otherherodata[_].juexing = ms.otherheroservedata[this.m_index].juexing;
                                // ms.otherherodata[_].state = 1;
                                // msMoudle.gameP.updataHero(_ + 2, true);
                                msMoudle.gameP.updataHead();
                                break;
                            }
                        }
                    }

                    this.showSucc();
                }
                else {
                    msMoudle.toast2("已经不能再觉醒了");
                }
            }
            else {
                msMoudle.toast2("材料不足");
            }
        }

        onBtnShengXingClick(e: Laya.Event): void {

            if(ms.cailiao1() >= ms.otherheroservedata[this.m_index].star * 25) {
                msMoudle._(); msMoudle.updateCaiLiao1(-ms.otherheroservedata[this.m_index].star * 25)
                if(ms.otherheroservedata[this.m_index].star < 5) {
                    ms.otherheroservedata[this.m_index].star++;
                    this.updateAbi(this.m_index);
                    this.updataList(this.m_index);
                    this.updataJXList(this.m_index);
                    this.updataSXList(this.m_index);

                    this.showSucc();
                }
            }
            else {
                msMoudle.toast2("材料不足！");
            }
        }

        skill:cssSkill;
        showSucc() : void {
            let data:any = msMoudle.wz["122.img"]["skill.1221003"];
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            if(this.char) {
                if(this.char.m_state_sp) {
                    this.skill = new cssSkill();
                    this.skill.changeAll(null, this.char.m_state_sp, "1221003", 0, 0, data, 1);
                }
            }
        }

        ///更新专属、更新属性
        private updateSelf(index:number) : void {
            this.m_index = index;

            if(ms.otherheroservedata[index]) {
                if(this.skill) {
                    this.skill.clearUp();
                    this.skill.removeSelf();
                    this.skill = null;
                }
                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                }

                for(let key in msMoudle.herojson) {
                    // console.log(ms.otherheroservedata[index].id, msMoudle.herojson[key].id)
                    if(ms.otherheroservedata[index].id == msMoudle.herojson[key].id) {

                        this.heroindex = Number(key);

                        ///角色形象
                        this.char = new cssCharacter();
                        let E:any = {};
                        E.weapon = msMoudle.herojson[key].weapon;
                        E.fweapon = msMoudle.herojson[key].fweapon;
                        E.cap = msMoudle.herojson[key].cap;
                        E.longcoat = msMoudle.herojson[key].longcoat;
                        if(ms.otherheroservedata[index].juexing > 0) {
                            E.cape = msMoudle.herojson[key].cape;
                        }

                        this.char.m_name = msMoudle.herojson[key].name;
                        this.char.m_nametag_show = false;
                        this.char.changeAll(this, E, 460, 200);
                        this.showkey = key;

                        if(msMoudle.herojson[key].pinzhi == 1) {
                            // this._pinzhi.color = "#1ecddd";
                            this._pinzhi.text = "N";
                        }
                        else if(msMoudle.herojson[key].pinzhi == 2) {
                            // this._pinzhi.color = "#1ecddd";
                            this._pinzhi.text = "R";
                        }
                        else if(msMoudle.herojson[key].pinzhi == 3) {
                            // this._pinzhi.color = "#e269f3";
                            this._pinzhi.text = "SR";
                        }
                        else if(msMoudle.herojson[key].pinzhi == 4) {
                            // this._pinzhi.color = "#f9aa01";
                            this._pinzhi.text = "SSR";
                        }
                        else if(msMoudle.herojson[key].pinzhi == 5) {
                            // this._pinzhi.color = "#f44c67";
                            this._pinzhi.text = "神卡";
                        }
                        this._pinzhi.color = "#f3c669";
                        // else if(msMoudle.herojson[key].pinzhi == 5) this._pinzhi.skin = "homeland/txt_SSS.png";

                        //http://www.4399api.com/welcome
                        //角色技能
                        this.skillimg1.skin = "";
                        this.skillimg2.skin = "";
                        this.skillimg3.skin = "";
                        this.skillimg4.skin = "";

                        // this.skillimg1.gray = true;
                        // this.skillimg2.gray = true;
                        // this.skillimg3.gray = true;
                        // this.skillimg4.gray = true;
                        // if(ms.otherheroservedata[index].lv >= 5) this.skillimg1.gray = false;
                        // if(ms.otherheroservedata[index].lv >= 10) this.skillimg2.gray = false;
                        // if(ms.otherheroservedata[index].lv >= 15) this.skillimg3.gray = false;
                        // if(ms.otherheroservedata[index].lv >= 20) this.skillimg4.gray = false;

                        this.ss1 = msMoudle.herojson[key].skill_1;
                        this.ss2 = msMoudle.herojson[key].skill_2;
                        this.ss3 = msMoudle.herojson[key].skill_3;
                        this.ss4 = msMoudle.herojson[key].skill_4;
                        if(msMoudle.herojson[key].skill_1 != "N") {
                            this.skillimg1.skin = msMoudle.getSkillMsg(msMoudle.herojson[key].skill_1).img;
                        }
                        else {
                            this.skillimg1.skin = "skillIcon/109.png";
                        }
                        if(msMoudle.herojson[key].skill_2 != "N") {
                            for(let find in msMoudle.skilljson) {
                                if(msMoudle.skilljson[find].id == msMoudle.herojson[key].skill_2) {
                                    this.skillimg2.skin = msMoudle.skilljson[find].img;
                                    break;
                                }
                            }
                            // this.skillimg2.skin = msMoudle.getSkillMsg(msMoudle.herojson[key].skill_2).img;
                        }
                        if(msMoudle.herojson[key].skill_3 != "N") {
                            for(let find in msMoudle.skilljson) {
                                if(msMoudle.skilljson[find].id == msMoudle.herojson[key].skill_3) {
                                    this.skillimg3.skin = msMoudle.skilljson[find].img;
                                    break;
                                }
                            }
                            // this.skillimg3.skin = msMoudle.getSkillMsg(msMoudle.herojson[key].skill_3).img;
                        }
                        if(msMoudle.herojson[key].skill_4 != "N") {
                            for(let find in msMoudle.skilljson) {
                                if(msMoudle.skilljson[find].id == msMoudle.herojson[key].skill_4) {
                                    this.skillimg4.skin = msMoudle.skilljson[find].img;
                                    break;
                                }
                            }
                            // this.skillimg4.skin = msMoudle.getSkillMsg(msMoudle.herojson[key].skill_4).img;
                        }

                        break;
                    }
                }
                //面板角色属性
                this._name.text = msMoudle.herojson[this.heroindex].name;

                this._lv2.text = ms.otherheroservedata[index].Lv.toString();
                this._name2.text = msMoudle.herojson[this.heroindex].name;

                this._exp.text = (ms.otherheroservedata[index].Exp + 1).toString();// + "/" + msMoudle.getLvExp(ms.otherheroservedata[index].Lv);

                ////切换角色
                this.updateAbi(index);

                // if(ms.otherheroservedata[this.m_index].juexing > 0)
                    this._suo1.visible = false;


                this._suo2.visible = (this.ss2 == "N") ? false : true;
                this._suo3.visible = (this.ss3 == "N") ? false : true;
                this._suo4.visible = (this.ss4 == "N") ? false : true;
                // this.skillimg2.gray = true;
                // this.skillimg3.gray = true;
                // this.skillimg4.gray = true;
                if(ms.otherheroservedata[index].Lv >= 10) {
                    this._suo2.visible = false;
                    // this.skillimg2.gray = false;
                }
                if(ms.otherheroservedata[index].Lv >= 15) {
                    this._suo3.visible = false;
                    // this.skillimg3.gray = false;
                }
                if(ms.otherheroservedata[index].Lv >= 20) {
                    this._suo4.visible = false;
                    // this.skillimg4.gray = false;
                }
                // else {
                //     if(msMoudle.herojson[this.heroindex].skill_1 != "N")
                //         this._suo.visible = true;
                //     else
                //         this._suo.visible = false;
                // }
            }

            this.updataList(index);
            this.updataJXList(index);
            this.updataSXList(index);
        }

        onBtnLeftClick(e: Laya.Event): void {
            if(this.m_index > 0) {
                this.updateSelf(this.m_index - 1);
            }
            else {
                this.updateSelf(ms.herosdata.length - 1);
            }
        }
        onBtnRightClick(e: Laya.Event): void {
            if(this.m_index < ms.herosdata.length - 1) {
                this.updateSelf(this.m_index + 1);
            }
            else {
                this.updateSelf(0);
            }
        }

        ////专属升级、初始界面、装备变化  (所有的变化)
        public updateAbi(index:number) : void {
            let _otherheroservedata:app.model.HeroStatus = msMoudle.serverAbi(ms.otherheroservedata[this.m_index]);
            ////更新面板
            this._hp.text = (_otherheroservedata.MaxHP.GetSum() + 1).toString();
            this._atk.text = (_otherheroservedata.PADamage.GetSum() + 1).toString();
            this._def.text = (_otherheroservedata.PDDamage.GetSum() + 1).toString();
            this._matk.text = (_otherheroservedata.MADamage.GetSum() + 1).toString();
            this._mdef.text = (_otherheroservedata.MDDamage.GetSum() + 1).toString();
            this._miss.text = _otherheroservedata.Evasion.GetSum().toString();
            this._target.text = _otherheroservedata.Accurate.GetSum().toString();
        }

        onJximg1Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000000);
        }
        onJximg2Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000003);
        }
        onJximg3Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000004);
        }
        onJximg4Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000005);
        }

        ////技能
        ss1:string;
        ss2:string;
        ss3:string;
        ss4:string;
        onS1Click2(e: Laya.Event): void {
            if(this.ss1 != "N") this.m_msg.itemShow(this.ss1);
            // else this.m_msg.itemShow(this.ss1, "，5级解锁。");
            else this.m_msg.itemShow(this.ss1);
        }
        onS2Click2(e: Laya.Event): void {
            if(this.ss2 != "N") {
                if(ms.otherheroservedata[this.m_index].Lv < 10)
                    this.m_msg.itemShow(this.ss2, "，10级解锁。");
                else
                    this.m_msg.itemShow(this.ss2);
            }
        }
        onS3Click2(e: Laya.Event): void {
            if(this.ss3 != "N") {
                if(ms.otherheroservedata[this.m_index].Lv < 15)
                    this.m_msg.itemShow(this.ss3, "，15级解锁。");
                else
                    this.m_msg.itemShow(this.ss3);
            }
        }
        onS4Click2(e: Laya.Event): void {
            if(this.ss4 != "N") {
                if(ms.otherheroservedata[this.m_index].Lv < 20)
                    this.m_msg.itemShow(this.ss4, "，20级解锁。");
                else
                    this.m_msg.itemShow(this.ss4);
            }
        }
        onBtnCCClick(e: Laya.Event): void {
            if(this.cc.text == "育成") {
                if(ms.otherheroservedata.length > 1)
                    ui.show(app.battle.yuchengDlg, {params:[this], black:true});
                else
                    msMoudle.toast2("没有更多英雄了");
            }
        }

        stars:Array<any> = [this.star1, this.star2, this.star3, this.star4, this.star5];
        updataList(index:number) : void {
            let heroArray = new Array(8);
            this.m_data = [];
            let shenka_num = 0;
            for(let i:number = 0; i < ms.herosdata.length; i++) {
                this.m_data[i] = new Object();
                this.m_data[i].json = ms.herosdata[i];
                this.m_data[i].sel = (i == index) ? true : false;
                this.m_data[i].cc = ms.herosdata[i].have == 2 ? true : false;
                this.m_data[i].pinzhi = ms.herosdata[i].pinzhi;
                this.m_data[i].lv = ms.otherheroservedata[i].Lv;
                this.m_data[i].isjuexing = ms.otherheroservedata[i].juexing;
                this.m_data[i].star = ms.otherheroservedata[i].star;
                if(this.m_data[i].pinzhi == 5) shenka_num++;
                if(i == index) {
                    for(let _:number = 0; _ < this.stars.length; _++) this.stars[_].gray = true;
                    for(let _:number = 0; _ < this.m_data[i].star; _++) this.stars[_].gray = false;
                //     if(this.m_data[i].cc) {
                //         if(this.cbtn_index == 1 || this.cbtn_index == 2) this.cc.text = "取消";
                //     }
                //     else {
                //         if(this.cbtn_index == 1 || this.cbtn_index == 2) this.cc.text = "上阵";
                //     }
                }
            }
            ms.test_sk = shenka_num;        //神卡数量

            for(let i:number = 0; i < ((ms.herosdata.length > 8) ? ms.herosdata.length : 8); i++) {
                if(this.m_data[i]) {
                    heroArray[i] = this.m_data[i];
                }
            }

            this.lstYingXiong.dataModel =  heroArray;
        }

        jx_heroArray:Array<any> = [];
        updataJXList(index:number) : void {
            // this.jx_heroArray = new Array(8);
            // for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
            //     this.jx_heroArray[i] = new Object();
            //     this.jx_heroArray[i].json = ms.otherheroservedata[i];
            //     this.jx_heroArray[i].sel = (i == index) ? true : false;
            // }
            // this.lstJueXing.dataModel = this.jx_heroArray;
            // this.m_index = index;

            this.jx_cost.text = ms.juexing1() + " / " + ms.otherheroservedata[this.m_index].pinzhi * 25;
                if(ms.juexing1() >= ms.otherheroservedata[this.m_index].pinzhi * 25) this.jx_cost.color = "#35f904";
                else this.jx_cost.color = "#FFFFFF";//#b21d1c

            ///角色形象
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            if(this.jxchar) {
                this.jxchar.clearUp();
                this.jxchar = null;
            }

            if(ms.otherheroservedata[index].juexing == 1) {
                this._di1.visible = false;
                this._di2.visible = true;
            }
            else {
                this._di1.visible = true;
                this._di2.visible = false;

                this.jxchar = new cssCharacter();
                let E:any = {};
                E.weapon = msMoudle.herojson[this.showkey].weapon;
                E.fweapon = msMoudle.herojson[this.showkey].fweapon;
                E.cap = msMoudle.herojson[this.showkey].cap;
                E.longcoat = msMoudle.herojson[this.showkey].longcoat;
                E.cape = msMoudle.herojson[this.showkey].cape;

                this.jxchar.m_name = msMoudle.herojson[this.showkey].name;
                this.jxchar.m_nametag_show = false;
                this.jxchar.changeAll(this.lstJueXing, E, 196, 219);
            }
        }

        onLstYingXiongCellClick(e: Laya.Event, index: number): void {
            if(index <= ms.herosdata.length - 1) {
                if(index != this.m_index) {
                    this.updateSelf(index);
                }
            }
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

        ////////////////////////////


    }
}