/// <reference path="./../../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../../core/ms/Maple/Summon.ts" />
/// <reference path="./../../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../../core/ms/Maple/Number.ts" />

module CoolRole {
    import cssMsg = MsgRole.Msg;
    import cssSummon = SummonRole.Summon;
    import cssSkill = SkillRole.Skill;
    import cssNumber = NumberRole.Number;

    export class Cool extends Laya.Sprite {
        private m_msg:cssMsg;
        /*
            可能的策略性：
            随机杀死
            减少技能冷却时间
        */

        private m_parent:Array<any> = [];
        private m_x:number = 0;
        private m_y:number = 0;
        public m_skill:Array<any> = [];

        private maxAngle:number = 360;
        private tickTime:number = 0;

        private downIcon:Array<Laya.Image> = [];
        private totalTime:Array<number> = [];
        private upIcon:Array<Laya.Image> = [];
        private sp:Array<Laya.Sprite> = [];
        private mask_sp:Array<Laya.Sprite> = [];
        private angle:Array<number> = [];
        private show_txt:Array<Laya.Label> = [];
        private start:Array<number> = [];
        private cdTime:Array<number> = [];
        private retime:Array<number> = [];
        private useTime:Array<number> = [];

        public clearUp() : void {
            Laya.timer.clear(this, this.startCd);
            Laya.timer.clearAll(this);
            if(this.m_skill.length > 0) {
                for(let i:number = 0; i < this.m_skill.length; i++) {
                    if(this.m_skill[i]) {
                        this.m_skill[i].clearUp();
                        this.m_skill[i] = null;
                    }
                }
            }
            if(this.show_txt.length > 0) {
                for(let i:number = 0; i < this.show_txt.length; i++) {
                    if(this.show_txt[i]) {
                        this.show_txt[i].removeSelf();
                        this.show_txt[i].destroy(true);
                        this.show_txt[i] = null;
                    }
                }
            }
            if(this.sp.length > 0) {
                for(let i:number = 0; i < this.sp.length; i++) {
                    if(this.sp[i]) {
                        this.sp[i].removeSelf();
                        this.sp[i].destroy(true);
                        this.sp[i] = null;
                    }
                }
            }
            if(this.mask_sp.length > 0) {
                for(let i:number = 0; i < this.mask_sp.length; i++) {
                    if(this.mask_sp[i]) {
                        this.mask_sp[i].removeSelf();
                        this.mask_sp[i].destroy(true);
                        this.mask_sp[i] = null;
                    }
                }
            }
            if(this.downIcon.length > 0) {
                for(let i:number = 0; i < this.downIcon.length; i++) {
                    if(this.downIcon[i]) {
                        this.downIcon[i].removeSelf();
                        this.downIcon[i].destroy(true);
                        this.downIcon[i] = null;
                    }
                }
            }
            if(this.upIcon.length > 0) {
                for(let i:number = 0; i < this.upIcon.length; i++) {
                    if(this.upIcon[i]) {
                        this.upIcon[i].removeSelf();
                        this.upIcon[i].destroy(true);
                        this.upIcon[i] = null;
                    }
                }
            }
        }

        showSkill:Array<any> = [];
        SkillArr:Array<any> = [];
        public loadCool(pNode:any, tTime:Array<any>, skillId:Array<any>, xy:number) : void {
            this.m_x = this.m_y = 0;
            this.cdTime = tTime;
            this.m_parent = pNode;
            this.m_msg = new cssMsg();

            this.showSkill = [];
            this.SkillArr = [];
            for(let i:number = 0; i < skillId.length; i++) {
                if(skillId[i]) {
                    for(let key in msMoudle.skilljson) {
                        if(msMoudle.skilljson[key].id == skillId[i]) {
                            this.showSkill[i] = msMoudle.skilljson[key].img;
                            this.SkillArr[i] = msMoudle.skilljson[key];
                            break;
                        }
                    }
                }
            }

            //释放技能时间
            this.tickTime = Math.floor(new Date().getTime() / 1000);

            for(let i:number = 0; i < 4; i++) {
                this.addCool(i, 13, 12);
            }

            // Laya.timer.frameLoop(1, this, this.startCd);
        }

        private addCool(i:number, x:number, y:number) : void {
            if(this.showSkill[i]) {
                this.start[i] = 0;
                this.angle[i] = 0;
                // this.cdTime[i] = cd;        ///15秒的冷却时间
                this.totalTime[i] = this.tickTime + this.cdTime[i] * 1000
                //剩余倒计时时间
                this.retime[i] = Math.ceil(this.totalTime[i] - this.tickTime)
                //已经使用时间
                this.useTime[i] = this.cdTime[i] - this.retime[i];

                this.downIcon[i] = new Laya.Image();
                this.downIcon[i].skin = this.showSkill[i];
                this.downIcon[i].width = 80;
                this.downIcon[i].height = 80;
                this.downIcon[i].pos(x, y);
                this.downIcon[i].on(Laya.Event.CLICK, this, this.startCool, [i]);
                this.downIcon[i].gray = true;
                this.m_parent[i].addChild(this.downIcon[i]);

                this.mask_sp[i] = new Laya.Sprite();
                this.mask_sp[i].graphics.drawCircle(0, 0,this.downIcon[i].width / 2,"#ff0000");
                this.mask_sp[i].pos(this.downIcon[i].width / 2, this.downIcon[i].height / 2);
               // this.downIcon[i].mask = this.mask_sp[i];

                this.resetCool(i, x, y);
            }
        }

        private startCool(i:number) : void {

            if(msMoudle.isAuMap(msMoudle.mapP.m_id) || msMoudle.mapP.m_id == "000020000_gai.img") {
                if(msMoudle.isPvp && msMoudle.specialPvp) {
                    msMoudle.toast("挑战名人薄中不可使用");
                }
                else {
                    if(this.can_touch[i] == true) {
                        this.can_touch[i] = false;
                        this.useCool(i);
                        if(this.SkillArr[i]) {
                            if(this.SkillArr[i].skill == "3121006" || this.SkillArr[i].skill == "3221005" ||
                            this.SkillArr[i].skill == "2321003") {
                                this.ZhaoHuan(this.SkillArr[i].skill, false, true);
                            }
                            else if(this.SkillArr[i].skill == "1311006") {
                                this.HitSkill(this.SkillArr[i].skill);//
                            }
                            else {
                                this.AddBuf(this.SkillArr[i].skill);
                            }
                        }
                    }
                }
            }
            else {
                if(msMoudle.mapP.m_id == "910000000.img")
                    this.m_msg.cailiaoSkillShow(this.SkillArr[i], this, "更换");
                else {
                    this.m_msg.cailiaoSkillShow(this.SkillArr[i], null);
                }
                // ui.show(app.char.skillDlg, {black:true});
            }
        }

        public ZhaoHuan(skillid:string, key:any = false, auto:boolean = true) : void {
            if(key) {
                msMoudle.toast("该技能暂时关闭");
                return ;
            }
            // if(skillid == "2121005" || skillid == "2221005" || skillid == "2321003" || skillid == "3221005" || skillid == "3121006" || skillid == "152101008") {
                let tIndex:number = msMoudle.mapP.summonList.length;
                msMoudle.mapP.summonList[tIndex] = new cssSummon();
                msMoudle.mapP.summonList[tIndex].changeAll(msMoudle.mapP.m_sp, skillid, msMoudle.char.m_x, msMoudle.char.m_y);
                msMoudle.mapP.summonList[tIndex].setDir(msMoudle.char.m_dir);
            // }

            //关闭自带ai，以及使用同步ai
            if(auto == false) {
                msMoudle.mapP.summonList[tIndex].NewautoFight(tIndex);
            }
            else {
                msMoudle.mapP.summonList[tIndex].tb_index = 100;

            }
        }

        private AddBuf(skillid:string) : void {
            /////我方
            let ____y:Array<any> = [];
            if(msMoudle.char) {
                // if(msMoudle.char.m_hp > 0) {
                    ____y[____y.length] = msMoudle.char;
                // }
            }
            for(let i:number = 0; i < msMoudle.mapP.heroList.length; i++) {
                if(msMoudle.mapP.heroList[i]) {
                    // if(msMoudle.mapP.heroList[i].m_hp > 0) {
                        ____y[____y.length] = msMoudle.mapP.heroList[i];
                    // }
                }
            }
            let data:any = msMoudle.wz[ Math.floor(Number(skillid) / 10000) + ".img"]["skill." + skillid];
            for(let i:number = 0; i < ____y.length; i++) {
                if(____y[i]) {
                    //4101004 加速
                    if(skillid == "4101004") {
                        ____y[i].p_atkspeed += 0.25;
                        ____y[i].p_walkspeed += 0.25;
                    }
                    //1301006 防御
                    else if(skillid == "1301006") {
                        ____y[i].p_def += 0.25;
                    }
                    //1320006 攻击
                    else if(skillid == "1320006") {
                        ____y[i].p_atk += 0.25;
                    }
                    //1221002 闪避
                    else if(skillid == "1221002") {
                        ____y[i].p_miss += 25;
                    }
                    //3001003 命中
                    else if(skillid == "3001003") {
                        ____y[i].p_target += 25;
                    }
                    //1221000 暴击
                    else if(skillid == "1221000") {
                        ____y[i].p_baoji += 25;
                    }
                    //1211009 加血
                    else if(skillid == "1211009") {
                        ____y[i].m_hp += ____y[i].m_maxhp * 0.25;
                        if(____y[i].m_hp > ____y[i].m_maxhp) ____y[i].m_hp = ____y[i].m_maxhp;
                        ____y[i].hpBar.value = ____y[i].m_hp / ____y[i].m_maxhp;

                        let hit:Array<any> = [];
                        hit[0] = {num :____y[i].m_maxhp * 0.25, bj:false};
                        let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
                        nb.ShowNumber(msMoudle.mapP.m_sp, hit, ____y[i].m_x, ____y[i].m_y - 100, 1, 2);
                    }
                    // if(this.m_skill[i]) {
                    //     this.m_skill[i].clearUp();
                    //     this.m_skill[i] = null;
                    // }
                    let skill_index:number = this.m_skill.length;
                    this.m_skill[skill_index] = new cssSkill();
                    this.m_skill[skill_index].changeAll(____y[i], ____y[i].m_skill_sp, skillid, 0, 0, data, 1);

                    // if(i == 0) {
                    //     console.log("生命" + ____y[i].p_hp)
                    //     console.log("攻击" + ____y[i].p_atk)
                    //     console.log("防御" + ____y[i].p_def)
                    //     console.log("命中" + ____y[i].p_target)
                    //     console.log("闪避" + ____y[i].p_miss)
                    //     console.log("暴击" + ____y[i].p_baoji)
                    //     console.log("攻速" + ____y[i].p_atkspeed)
                    //     console.log("移速" + ____y[i].p_walkspeed)
                    // }
                }
            }
        }

        private HitSkill(skillid:string) : void {
            //敌方
            let ____x:Array<any> = [];
            if(msMoudle.mapP.m_life) {
                if(msMoudle.mapP.m_life.m_mobsAni) {
                    for(let i:number = 0; i < msMoudle.mapP.m_life.m_mobsAni.length; i++) {
                        let mob = msMoudle.mapP.m_life.m_mobsAni[i];
                        if(mob) {
                            if(mob.m_isdead == false) ____x[____x.length] = mob;
                        }
                    }
                }
            }
            let data:any = msMoudle.wz[ Math.floor(Number(skillid) / 10000) + ".img"]["skill." + skillid];

            // if(this.m_skill[index]) {
            //     this.m_skill[index].clearUp();
            //     this.m_skill[index] = null;
            // }
            let skill_index:number = this.m_skill.length;
            this.m_skill[skill_index] = new cssSkill();
            this.m_skill[skill_index].changeAll(null, Laya.stage, skillid, Laya.stage.width / 2, Laya.stage.height / 2, data, 1);
            Laya.timer.once(1000, this, ()=> {
                for(let i:number = 0; i < ____x.length; i++) {
                    if(____x[i]) {
                        let hit:Array<any> = [];
                        hit[0] = {num :msMoudle.char.m_maxatk, bj:false};

                        let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
                        nb.ShowNumber(msMoudle.mapP.m_sp, hit, ____x[i].m_x, ____x[i].m_y - 100, 2, 1);
                        ____x[i].m_hp -= hit[0].num;
                        if(____x[i].m_hp < 0) {
                            ____x[i].m_hp = 0;
                        }
                        ____x[i].hpBar.value = Number(____x[i].m_hp / ____x[i].m_maxhp);
                        ____x[i].m_nametag_sp.addChild(____x[i].hpBar);
                        msMoudle.Shake(Laya.stage);
                    }
                }
            });
        }

        can_touch:Array<boolean> = [];
        private resetCool(i:number, x:number, y:number) : void {
            // if(this.show_txt[i]) {
                this.angle[i] = 359;
                this.can_touch[i] = true;

                this.upIcon[i] = new Laya.Image();
                this.upIcon[i].skin = this.showSkill[i];
                this.upIcon[i].width = 80;
                this.upIcon[i].height = 80;
                this.upIcon[i].on(Laya.Event.CLICK, this, this.startCool, [i]);
                this.upIcon[i].pos(x, y);

                this.sp[i] = new Laya.Sprite();
                this.m_parent[i].addChild(this.upIcon[i]);
                this.sp[i].graphics.clear();
                this.sp[i].graphics.drawPie(this.upIcon[i].width/2, this.upIcon[i].height/2, this.upIcon[i].width / 2, this.start[i], this.angle[i], "#ffffff");
                this.upIcon[i].mask = this.sp[i];

                this.show_txt[i] = new Laya.Label();
                this.show_txt[i].bold = true;
                this.show_txt[i].color = "#FFFFFF";
                this.show_txt[i].stroke = 3;
                this.show_txt[i].fontSize = 26;
                this.show_txt[i].strokeColor = "#000000";
                // this.m_parent[i].addChild(this.show_txt[i]);
                this.show_txt[i].visible = false;
            // }
        }

        private useCool(i:number) : void {
            if(this.cdTime[i]) {
                this.angle[i] = 0;
                this.sp[i].graphics.clear();
                this.sp[i].graphics.drawPie(this.upIcon[i].width/2, this.upIcon[i].height/2, this.upIcon[i].width / 2, this.start[i], this.angle[i], "#ffffff");

                this.show_txt[i].text = Math.floor(this.cdTime[i]) + "";
                this.show_txt[i].pos(this.m_x + this.upIcon[i].width / 2 - this.show_txt[i].width / 2 + 13,
                    this.m_y + this.upIcon[i].height / 2 - this.show_txt[i].height / 2 + 12);
                this.show_txt[i].visible = true;
            }
            //释放在这里处理?????
        }

        private startCd() : void {
            for(let i:number = 0; i < this.totalTime.length; i++) {
                if(this.can_touch[i] == false) {
                    let add_:number = Laya.timer.delta/this.retime[i] * (360);
                    this.angle[i] += add_;
                    if (this.angle[i] > this.maxAngle) {
                        this.show_txt[i].text = "";
                        this.can_touch[i] = true;
                        //怎么把效果消除
                        this.resetEff(this.SkillArr[i].skill);
                    }
                    else {
                        this.sp[i].graphics.clear();
                        this.sp[i].graphics.drawPie(this.upIcon[i].width/2, this.upIcon[i].height/2, this.upIcon[i].width / 2, this.start[i], this.angle[i], "#ffffff");
                        this.show_txt[i].text =  Math.floor(Math.ceil((1 - this.angle[i] / 360) * this.cdTime[i])) + "";
                        this.show_txt[i].pos(this.m_x + this.upIcon[i].width / 2 - this.show_txt[i].width / 2 + 13,
                            this.m_y + this.upIcon[i].height / 2 - this.show_txt[i].height / 2 + 12);
                    }
                }
            }
        }

        resetEff(skillid:string) : void {
            /////我方
            let ____y:Array<any> = [];
            if(msMoudle.char) {
                //如果以后加复活的技能需要把死的也消除掉
                // if(msMoudle.char.m_hp > 0) {
                    ____y[____y.length] = msMoudle.char;
                // }
            }
            for(let i:number = 0; i < msMoudle.mapP.heroList.length; i++) {
                if(msMoudle.mapP.heroList[i]) {
                    // if(msMoudle.mapP.heroList[i].m_hp > 0) {
                        ____y[____y.length] = msMoudle.mapP.heroList[i];
                    // }
                }
            }
            for(let i:number = 0; i < ____y.length; i++) {
                //4101004 加速
                if(skillid == "4101004") {
                    ____y[i].p_atkspeed = 0;
                    ____y[i].p_walkspeed = 0;
                }
                //1301006 防御
                else if(skillid == "1301006") {
                    ____y[i].p_def = 0;
                }
                //1320006 攻击
                else if(skillid == "1320006") {
                    ____y[i].p_atk = 0;
                }
                //1221002 闪避
                else if(skillid == "1221002") {
                    ____y[i].p_miss = 0;
                }
                //3001003 命中
                else if(skillid == "3001003") {
                    ____y[i].p_target = 0;
                }
                //1221000 暴击
                else if(skillid == "1221000") {
                    ____y[i].p_baoji = 0;
                }
                //1211009 加血
                else if(skillid == "1211009") {}
            }
        }

        //

    }

}