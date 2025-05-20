module MonsterBookRole {

    export class MonsterBook extends Laya.Sprite {
        public m_parent:any;
        private m_sp:Laya.Sprite;

        private rewardList:Array<any> = [];
        private randList:Array<any> = [];

        public getMobReward(id:any) : void {
            this.rewardList = [];

            //只掉金币
            if(true) {
                let itemId = 9000000;
                let rw:any = msMoudle.getItemMsg(itemId);
                if(rw) {
                    let tIndex:number = this.rewardList.length;
                    this.rewardList[tIndex] = new Object();
                    this.rewardList[tIndex] = rw;
                }
            }
            if(true) {
                let data:any = msMoudle.wz["MonsterBook.img"][id];
                let i:number = 0;
                while(true) {
                    let root:string = id + ".reward." + i;
                    let itemId = data[root];
                    if(itemId) {
                        let rw:any = msMoudle.getItemMsg(itemId);
                        if(rw) {
                            let tIndex:number = this.rewardList.length;
                            this.rewardList[tIndex] = new Object();
                            this.rewardList[tIndex] = rw;
                        }
                        // else {
                        //     if(msMoudle.getRandValue(0, 0, 100) < 50) {
                        //         let rw:any = msMoudle.randSkill();
                        //         let tIndex:number = this.rewardList.length;
                        //         this.rewardList[tIndex] = new Object();
                        //         this.rewardList[tIndex] = rw;
                        //     }
                        //     // else {
                        //     //     let rw:any = msMoudle.randWood();
                        //     //     let tIndex:number = this.rewardList.length;
                        //     //     this.rewardList[tIndex] = new Object();
                        //     //     this.rewardList[tIndex] = rw;
                        //     // }
                        // }
                        i = i + 1;
                    }
                    else break;
                }
            }
        }
        public getMobRewardAndRand(id:any) : any {
            this.getMobReward(id);
            this.randList = [];
            //求随机组合
            for(let i:number = 0; i < this.rewardList.length; i++) {
                let _:boolean = true;
                // let _:boolean = msMoudle.getRandValue(0, 0, 100) < 25 ? true : false;
                if(_) {
                    let tIndex:number = this.randList.length;
                    this.randList[tIndex] = new Object();
                    this.randList[tIndex] = this.rewardList[i];
                    this.randList[tIndex].openId = this.randList[tIndex].id;
                }
            }
            // console.log(this.randList);
            return this.randList;
        }

        //不要所有的怪物数量都记录
        public getRandReward(mob:any, isBoss:boolean = false, onlyExp:boolean = false) : any {
            // msMoudle.getRw(mob);
            this.randList = [];
            if(onlyExp == true) return this.randList;

            // if(msMoudle.mainT.m_itemList.length > 20) return this.randList;

            ////有些boss地图不能这么处理
            let rnkreward:Array<any> = [];
            if(msMoudle.mapP && msMoudle.mainP.m_id == "280030100.img") {
                rnkreward = msMoudle.getRandomFall(mob);
            }
            else {
                rnkreward = msMoudle.getFall(mob);
            }
            for(let i:number = 0;i < rnkreward.length; i++) {       //奖励数量
                if(rnkreward[i]) {
                    let tIndex:number = this.randList.length;
                    this.randList[tIndex] = new Object();
                    this.randList[tIndex] = rnkreward[i];
                    this.randList[tIndex].openId = this.randList[tIndex].id;
                }
            }

            // console.log(this.randList);
            return this.randList;
        }
        ///

    }

}