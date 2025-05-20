module WaterRole {
    export class Water extends Laya.Sprite {
        public m_parent:any;
        rws:Array<Laya.Image> = [];

        public clearUp() : void {
            Laya.timer.clear(this, this.shuaxin);
            for(let i:number = 0; i < 60; i++) {
                if(this.rws[i]) {
                    this.rws[i].removeSelf();
                    this.rws[i].destroy(true);
                    this.rws[i] = null;
                }
            }
        }

        public loadWater(P:any) : void {
            this.shuaxin(P);
        }

        rnk:number = 0;
        rewards:Array<any> = [];
        public shuaxin(P:any) : void {
            this.rewards = [];
            for(let i:number = 0; i < 60; i++) {
                if(this.rws[i]) {
                    this.rws[i].removeSelf();
                    this.rws[i] = null;
                }
            }
            this.rnk = msMoudle.getRandValue(20, 0, 40);
            for(let i:number = 0; i < this.rnk; i++) {
                //数据
                this.rewards[i] = new Object();
                this.rewards[i].type = msMoudle.waterReward();
                ///显示
                this.rws[i] = new Laya.Image();
                this.rws[i].zOrder = 9999;
                this.rws[i].anchorX = 0.5;
                this.rws[i].anchorY = 0.5;
                this.rws[i].scale(1.5, 1.5);//02048719
                if(this.rewards[i].type == 0) this.rws[i].skin = "homeland/02022995.info.icon.png";
                else if(this.rewards[i].type == 1) this.rws[i].skin = "homeland/02028044.info.icon.png";
                else if(this.rewards[i].type == 2) this.rws[i].skin = "homeland/02022995.info.icon.png";
                else this.rws[i].skin = "homeland/QuestIcon.5.0.png";
                // this.rws[i].on(Laya.Event.CLICK, this, this.onClick, [i]);
                P.addChild(this.rws[i]);
                let _x = msMoudle.getRandValue(Number(msMoudle.mapP.VRLeft) + 50,0,
                Number(msMoudle.mapP.VRRight)-Number(msMoudle.mapP.VRLeft)-100);
                let _y = msMoudle.getRandValue(Number(msMoudle.mapP.VRTop) + 50,0,
                Number(msMoudle.mapP.VRBottom)-Number(msMoudle.mapP.VRTop)-100);
                this.rws[i].pos(_x, _y);
            }
            let delay = 2500 + msMoudle.getRandValue(0, 0, 3000);
            Laya.timer.once(delay, this, this.shuaxin, [P]);
        }

        ///左上角显示已经找到的保障、然后时间到了之后统一处理
        public check() : void {
            for(let i:number = 0; i < this.rnk; i++) {
                if(this.rws[i]) {
                    if(this.rws[i].x >= msMoudle.char.m_x - 50 && this.rws[i].x <= msMoudle.char.m_x + 50 &&
                    this.rws[i].y >= msMoudle.char.m_y - 50 && this.rws[i].y <= msMoudle.char.m_y + 50) {

                        if(this.rws[i]) {
                            this.rws[i].removeSelf();
                            this.rws[i] = null;
                        }

                        msMoudle.specialReward(this.rewards, i);
                    }
                }
            }
        }

        //
    }
}