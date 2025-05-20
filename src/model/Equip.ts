/// <reference path="./Base.ts" />
/// <reference path="./CharProp.ts" />

namespace app.model {

    export class Equip extends Base {

        /////////基础信息
        @field()
        openid:number;      //装备唯一id
        @field()
        id:string;          //装备路径id
        @field()
        type:number;        //装备类型
        @field()
        part:number;        //槽位
        @field()
        suc:number;         //已成功强化次数
        @field()
        tuc:number;         //卷轴次数
        @field()
        reqLevel:number;    //需求等级
        @field()
        price:number;       //价格
        @field()
        sfx:string;         //weapon类型
        @field()
        num:number;         //数量
        @field()
        suo:boolean;        //锁

        ////以后属性的重点改革的地方
        @field()
        succlst:Object = new Object();      //成功砸卷记录
        @field()
        succM:Array<any> = [0, 0];          //总砸卷次数，总失败次数
        // @field()
        // faillst:Object = new Object();      //砸卷失败记录


        ////////////////以下内容全部不存储，而是通过数据算出
        //////////属性
        @field()
        Str: model.CharProp = new model.CharProp(99999);
        @field()
        Dex: model.CharProp = new model.CharProp(99999);
        @field()
        Inte: model.CharProp = new model.CharProp(99999);
        @field()
        Luck: model.CharProp = new model.CharProp(99999);
        @field()
        MaxHP: model.CharProp = new model.CharProp(99999);       //生命上限
        @field()
        MaxMP: model.CharProp = new model.CharProp(99999);       //魔法上限
        @field()
        PADamage: model.CharProp = new model.CharProp(9999);         //物理攻击力
        @field()
        MADamage: model.CharProp = new model.CharProp(9999);         //魔法攻击力
        @field()
        PDDamage: model.CharProp = new model.CharProp(9999);         //物理防御力
        @field()
        MDDamage: model.CharProp = new model.CharProp(9999);         //魔法防御力
        @field()
        Accurate: model.CharProp = new model.CharProp(9999);        //命中率
        @field()
        Evasion: model.CharProp = new model.CharProp(9999);         //闪避率
        @field()
        CriticalRate: model.CharProp = new model.CharProp(9999);        //暴击率
        @field()
        CriticalDamageMax: model.CharProp = new model.CharProp(9999);  //最大暴击伤害
        @field()
        CriticalDamageMin: model.CharProp = new model.CharProp(9999);  //最小暴击伤害
        @field()
        Mastery: model.CharProp = new model.CharProp(9999);     //熟练度
        @field()
        DamageRate: model.CharProp = new model.CharProp(9999);
        @field()
        BossDamageRate: model.CharProp = new model.CharProp(9999);
        @field()
        AttackSpeed: model.CharProp = new model.CharProp(9999);
        @field()
        WalkSpeed: model.CharProp = new model.CharProp(9999);

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

        fillConfig() {

        }

        //
    }
}



