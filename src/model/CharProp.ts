/// <reference path="./Base.ts" />

namespace app.model {

    export class CharProp extends Base {

        @field()
        totalMax: number = 9999;   //上限
        @field()
        baseVal: number = 0;    //基础值
        @field()
        gearAdd: number = 0;    //装备附加值
        @field()
        buffAdd: number = 0;    //技能buff增加值
        @field()
        aBuffRate: number = 0;  //主动buff百分比
        @field()
        pBuffRate: number = 0;  //被动buff百分比

        constructor(totalMax:number = 0) {
            super();
            this.totalMax = totalMax ? totalMax : 0;
        }

        get_baseVal() : number {
            return this.baseVal;
        }

        get_gearAdd() : number {
            return this.gearAdd;
        }

        get_buffAdd() : number {
            return this.buffAdd;
        }

        get_aBuffRate() : number {
            return this.aBuffRate;
        }

        get_pBuffRate() : number {
            return this.pBuffRate;
        }

        GetSum(): number {
            let origSum = (this.baseVal + this.gearAdd + this.buffAdd) * (100 + this.aBuffRate + this.pBuffRate) / 100;
            return this.totalMax > 0 ? Math.min(this.totalMax, origSum) : origSum;
        }

        GetGearReqSum(): number {
            let origSum = (this.baseVal + this.gearAdd + this.buffAdd) * (100 + this.aBuffRate + this.pBuffRate) / 100;
            return this.totalMax > 0 ? Math.min(this.totalMax, origSum) : origSum;
        }

        ResetAdd(): void {
            this.gearAdd = 0;
            this.buffAdd = 0;
            this.aBuffRate = 0;
            this.pBuffRate = 0;
        }

        ResetAll(): void {
            this.baseVal = 0
            this.ResetAdd();
        }

        ToString(): string {
            let sum = this.GetSum();
            return (this.baseVal == sum) ? this.baseVal.toFixed(0) : sum.toFixed(0) + " (" + this.baseVal.toFixed(0) + "+" + (sum - this.baseVal).toFixed(0) + ")";
        }

        ToStringDetail(): string {
            let sum = this.GetSum();
            let baseSum = (this.baseVal + this.gearAdd) +
                (this.baseVal + this.gearAdd + this.buffAdd) * (this.aBuffRate) / 100;
            if (this.buffAdd == 0 && this.pBuffRate == 0 && baseSum <= sum)
            {
                return this.ToString();
            }
            return (sum == baseSum) ? this.ToString() :
                sum.toFixed(0) + " (" + baseSum.toFixed(0) + (sum - baseSum >= 0) ? "+" : "-" + (sum - baseSum).toFixed(0) + ")";
        }

        fillConfig() {

        }

        //
    }
}



