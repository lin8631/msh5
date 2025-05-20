/// <reference path="./Base.ts" />

namespace app.model {

    export class HeroStatus extends Base {

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


        fillConfig() {

        }
    }
}