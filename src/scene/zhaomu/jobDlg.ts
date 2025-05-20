/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Npc.ts" />

module app.zhaomu {

    import cssNpc = NpcRole.Npc;

    export class jobDlg extends ui.zhaomu.jobDlgUI implements ui.zhaomu.IjobDlgUI  {

        public static className = "app.zhaomu.jobDlg";
        private char:CharacterRole.Character;

        onInitialize(){
            this.bg.graphics.drawRect(-(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            Laya.stage.addChild(this.btnBack);
            this.btnBack.x = Laya.stage.width - 100;

            // ms.herodata.Job = 0;
            this.lstJpb.hScrollBarSkin = "";

            this.updateData();
            // this.onHero();
        }

        onClose() {
            if(this.btnBack) {
                this.btnBack.removeSelf();
                this.btnBack = null;
            }
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }

        onHero() : void {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            this.char = new CharacterRole.Character();
            let E:any = {};
            E.fweapon = ms.testfweapon;
            E.cap = ms.testcap;
            E.weapon = ms.herodata.EquipSlots[0] ? (ms.herodata.EquipSlots[0].id + ".img") : ms.testweapon;
            E.longcoat = ms.testlongcoat;
            if(ms.fashion) {
                if(ms.fashion.id != "N") E.longcoat = ms.fashion.id;
            }
            this.char.m_name = ms.testname;
            this.char.m_lv = ms.herodata.Lv;
            this.char.m_nametag_show = false;
            this.char.changeAll(this.body, E, 0, 0);
        }
        skill:SkillRole.Skill;
        showSucc() : void {
            let data:any = msMoudle.wz["122.img"]["skill.1221003"];
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            if(this.char) {
                if(this.char.m_state_sp) {
                    this.skill = new SkillRole.Skill();
                    this.skill.changeAll(null, this.char.m_state_sp, "1221003", 0, 0, data, 1);
                }
            }
        }
        ///pvp改成需要体力、体力需要在商店购买
        // jobs:Array<any> = [];
        tArr:Array<any> = [];

        // tJobs:Array<any> = [112, 122, 132, 212, 222, 232, 312, 322, 412, 422];
        // pJobs:Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        jobmsg:Array<any> = ["蘑菇王", "僵尸蘑菇王", "蝙蝠怪", "战甲泡泡鱼", "蜈蚣王", "闹钟王", "皮亚努斯(左)", "皮亚努斯(右)", "喷火龙", "格瑞芬多"];
        jobmob:Array<any> = ["6130101", "6300005", "8130100", "4130103", "5220004", "8500001", "8520000", "8510000", "8180000", "8180001"];
        updateData(){
            let zs:boolean = true;
            for(let i:number = 0; i < ms.herodata.pJobs.length; i++) {
                if(ms.herodata.pJobs[i] == 0) {
                    zs = false;
                    break;
                }
            }
            if(zs == false) {
                this.lstJpb.visible = true;
                this.zhuansheng.visible = false;
                for(let i:number = 0; i < ms.herodata.tJobs.length; i++) {
                    let canjob:boolean = true;

                    if(ms.herodata.pJobs[i] > 0) canjob = false;

                    this.tArr[i] = new Object();
                    this.tArr[i].job = ms.herodata.tJobs[i];
                    this.tArr[i].can = canjob;
                    this.tArr[i].jobmsg = this.jobmsg[i];
                    this.tArr[i].need = (ms.herodata.ZS + 1) * 1;
                    this.tArr[i].id = this.jobmob[i];
                }
                this.lstJpb.dataModel = this.tArr;
            }
            else {
                this.lstJpb.visible = false;
                this.zhuansheng.visible = true;
                this.btnZS.visible = true;
                this.onHero();

                this.hp.text = "生命：+" + (1 * (ms.herodata.ZS + 1)) + "%";
                this.atk.text = "攻击力：+" + (1 * (ms.herodata.ZS + 1)) + "%";
                this.def.text = "防御力：+" + (1 * (ms.herodata.ZS + 1)) + "%";
                this.matk.text = "魔法攻击力：+" + (1 * (ms.herodata.ZS + 1)) + "%";
                this.mdef.text = "魔法防御力：+" + (1 * (ms.herodata.ZS + 1)) + "%";
                this.num.text = ms.rongyu() + "/" + (10000 + 5000 *  ms.herodata.ZS);
                if(ms.rongyu() >= (10000 *  (ms.herodata.ZS + 1))) this.num.color = "#35f904"
                else this.num.color = "#FFFFFF";
            }

            this.title.text = "转生：" + ms.herodata.ZS;
        }

        onLstJpbCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "changeJob") {
                let num = 0;
                if(ms.killmobsdata) {
                    for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                        if(ms.killmobsdata[u].id == this.jobmob[index]) {
                            num = ms.killmobsdata[u].num;
                            break;
                        }
                    }
                }
                if(num >= this.tArr[index].need) {
                    // msMoudle._(); msMoudle.updateCaiLiao1(-this.tArr[index].star)
                    // msMoudle._(); msMoudle.updateJueXing1(-this.tArr[index].juexing)
                    let jobnum = 0;
                    for(let i:number = 0; i < ms.m_job.length; i++) {
                        if(ms.m_job[i] != "") {
                            jobnum++;
                        }
                    }
                    if(ms.herodata.ZS < jobnum) {
                        if(ms.killmobsdata) {
                            for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                                if(ms.killmobsdata[u].id == this.jobmob[index]) {
                                    ms.killmobsdata[u].num = 0;
                                    break;
                                }
                            }
                        }

                        //转职
                        ms.herodata.pJobs[index]++;
                        msMoudle.toast("转职成功");
                        ms.saveServer();
                        this.updateData();
                    }
                    else {
                        msMoudle.toast("职业数量小于" + (jobnum + 1) + "个");
                    }
                }
                else {
                    msMoudle.toast2("材料不足");
                }
            }
        }

        onBtnZSClick(e: Laya.Event): void {
            if(ms.herodata.Lv != 200) {
                msMoudle.toast("需要角色达到200级");
                return ;
            }
            if(ms.rongyu() >= 10000 + 5000 *  ms.herodata.ZS) {
                msMoudle.toast("转生成功");
                ms.herodata.Exp = 0;
                ms.herodata.Lv = 1;
                msMoudle.test_lv -= 199;
                for(let i:number = 0; i < ms.herodata.pJobs.length; i++) {
                    ms.herodata.pJobs[i] = 0;
                }
                msMoudle.mainT.updateLv();
                // msMoudle.gameP.lv.text = "Lv. " + ms.herodata.Lv;
                msMoudle._(); msMoudle.updateRongYu(-(10000 + 5000 *  ms.herodata.ZS));
                msMoudle._(); msMoudle.updateZhuanSheng(1);
                this.showSucc();
                this.btnZS.visible = false;
                ms.saveServer();
                Laya.timer.once(2000, this, ()=> {
                    this.updateData();
                });
            }
            else {
                msMoudle.toast2("枫叶不足");
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

    }
}