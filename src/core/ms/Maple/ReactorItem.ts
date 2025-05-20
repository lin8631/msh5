/// <reference path="./../../../core/ms/Maple/MonsterBook.ts" />
/// <reference path="./../../../core/ms/Maple/Item.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />
/// <reference path="./../../../core/ms/Maple/NameTag.ts" />

module ReactorItemRole {

    import cssMonsterBook = MonsterBookRole.MonsterBook;
    import cssItem = ItemRole.Item;
    import cssBasicEff = BasicEffRole.BasicEff;
    import cssNametag = NametagRole.NameTag;

    export class Reactor extends Laya.Sprite {

        private reactorAni:Laya.Image;
        private reactorData:Array<any> = [];
        private m_sp:Laya.Sprite;
        private hitTime:number = 0;             //显示
        private really_hitTime:number = 0;      //真实
        private m_parent:any;
        private m_reactorInfo:any;
        private m_id:string;
        private m_i:number;
        public m_x:number;
        public m_y:number;
        private res:Array<any> = [];
        public hitAni:Laya.Sprite;
        public hide:boolean = false;
        private newres:Array<any> = [];
        private m_nametag_sp:Laya.Sprite;

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.reactorData.length; i++) {
                if(this.reactorAni) {
                    // this.reactorAni.off(Laya.Event.CLICK, this, this.onClick);
                    this.reactorAni.removeSelf();
                    this.reactorAni.destroy(true);
                    this.reactorAni = null;
                }
            }
            this.reactorData = [];
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.newres = [];
        }

        public loadReactorItem(P:any, i:number, reactorInfo:any, id:string) : void {
            this.m_parent = P;
            this.m_reactorInfo = reactorInfo;
            this.m_id = id;
            this.m_i = i;

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_nametag_sp);

            this.hide = false;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_sp);

            this.hitAni = new Laya.Sprite();
            this.hitAni.zOrder = 1;
            // this.m_sp.addChild(this.hitAni);

            // let x:number = Number(reactorInfo["reactor." + i + ".x"]);
            let y:number = Number(reactorInfo["reactor." + i + ".y"]);
            let rnk:number = Number( msMoudle.getRandValue(Number(msMoudle.mapP.VRLeft) + 300, 0, Number(msMoudle.mapP.VRRight) - Number(msMoudle.mapP.VRLeft) - 600) );
            this.m_x = rnk;
            this.m_y = y;

            if(this.reactorAni == null) {
                this.reactorAni = new Laya.Image();
                this.reactorAni.on(Laya.Event.CLICK, this, this.onClick, [i, reactorInfo, id]);
                this.m_sp.addChild(this.reactorAni);
            }
            this.loadHitSatae(i, reactorInfo, id);

            // let nametag:cssNametag = new cssNametag();
            // nametag.loadNameTag(this, "箱子", "medal.2");

            this.setPos(this.m_x, this.m_y);
        }

        private loadHitSatae(i:number, reactorInfo:any, id:string) : void {
            // console.log(i + "  " + reactorInfo + "  " + id)
            Laya.timer.clear(this, this.doAction);
            this.reactorData = new Array();
            let data = msMoudle.wz[reactorInfo[id] + ".img"][this.hitTime];
            if(this.really_hitTime > 0 && this.hitTime != 0) data = msMoudle.wz[reactorInfo[id] + ".img"][this.hitTime - 1];
            let frameindex:number = 0;
            while(true) {
                let root = this.hitTime + "." + frameindex;
                if(this.really_hitTime > 0 && this.hitTime != 0) root = (this.hitTime - 1) + ".hit." + frameindex;
                // console.log(root)
                // console.log(data[root])
                if(data[root]) {
                    this.linkReactorItem(i, data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }

            if(this.newres.length != this.reactorData.length) {
                for(let frameIndex:number = 0; frameIndex < this.reactorData.length; frameIndex++) {
                    if(!Laya.loader.getRes(this.reactorData[frameIndex].tex)) {
                        this.newres.push({ url: this.reactorData[frameIndex].tex });
                    }
                }
            }

            if(this.newres.length > 0) {
                msLoad.load(this.newres).done(dlg => {
                    this.doAction(i, 0);
                });
            }
            else {
                this.doAction(i, 0);
            }
        }

        private linkReactorItem(i:number, data:any, root:string, frameindex:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z = data[root + ".z"];
            let delay = data[root + ".delay"];
            this.reactorData[frameindex] = new Object();
            let strMarker = "res/Map/Reactor/" + this.m_reactorInfo[this.m_id] + ".img/" + root + ".png";
            this.reactorData[frameindex].tex = strMarker;
            this.reactorData[frameindex].orgx = -Number(oringinInfo.x);
            this.reactorData[frameindex].orgy = -Number(oringinInfo.y);
            this.reactorData[frameindex].delay = delay ? Number(delay) : 150;
            this.reactorData[frameindex].z = Number(z);
        }

        private onClick(i:number, reactorInfo:any, id:string) : void {
            if(msMoudle.m__touch && this.hide == false) {
                this.m_i = i;
                this.m_reactorInfo = reactorInfo;
                this.m_id = id;

                msMoudle.m__i = i;
                msMoudle.m__reactorInfo = reactorInfo;
                msMoudle.m__id = id;
            }
        }

        public hitReactor() : void {
            this.really_hitTime++;//4  2
            if(this.really_hitTime == 1) {
                msMoudle.m__touch = true;
                this.hide = true;
                this.reactorAni.off(Laya.Event.CLICK, this, this.onClick);
                this.hitTime = this.really_hitTime;

                let data = msMoudle.wz[this.m_reactorInfo[this.m_id] + ".img"][this.hitTime];
                let root = this.hitTime + ".hit.0";
                if(data[root]) {
                    this.hitTime = this.really_hitTime + 1;//5

                    // msMoudle.Effect("quest.party.clear");
                    // Laya.timer.once(3000, this, ()=> {
                    //     msMoudle.team_guanka++;
                    //     msMoudle.gameP.gotoScene("000020000_gai.img");
                    // });
                }

                // Laya.timer.once(msMoudle.getRandValue(300, 0, 200), this, () => {
                    //物品掉落
                    ////兑换物品的道具货币
                    ////金币、枫叶等货币？？？
                    ////怪物？？？？
                    ////收集过关的道具
                    ///救出xx




                    // let mb:cssMonsterBook = new cssMonsterBook();
                    // // let reward:any = mb.getMobRewardAndRand( Number(100100).toFixed(0) );
                    // let reward:any = mb.getRandReward();
                    // for(let i:number = 0; i < reward.length; i++) {
                    //     let tIndex:number = msMoudle.mainT.m_itemList.length;
                    //     msMoudle.mainT.m_itemList[tIndex] = new cssItem();
                    //     // msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward[i], reward.length, i, this.m_x, this.m_y);
                    //     msMoudle.mainT.m_itemList[tIndex].PickOffItem2(msMoudle.mainP.m_sp, reward[i], reward.length, i, this.m_x, this.m_y);
                    // }


                    // msMoudle.judgeMuBiao(3);
                    //经验值
                    // msMoudle.wz[mob.m_id]["info"]["info.level"]
                // });

            }
            else {
                this.hitTime = 1;
            }
            this.loadHitSatae(this.m_i, this.m_reactorInfo, this.m_id);
        }

        can_touch:boolean = true;
        private doAction(i:number, frameIndex:number) : void {
            if(this.reactorData.length > 0 && this.reactorAni) {
                if(frameIndex >= this.reactorData.length) {
                    frameIndex = 0;
                    this.can_touch = true;
                    // console.log(this.really_hitTime + "  " + this.hitTime + "  " + msMoudle.m__touch)
                    //这里应该是回到第一次的
                    if(this.really_hitTime >= 1) {
                        this.reactorAni.skin = "";
                        this.clearUp();
                        msMoudle.m__touch = true;
                        return ;
                    }
                    else {
                        this.hitTime = 0;
                        this.loadHitSatae(i, this.m_reactorInfo, this.m_id);
                    }
                    msMoudle.m__touch = true;
                }
                if(this.reactorData[frameIndex]) {
                    this.reactorAni.skin = this.reactorData[frameIndex].tex;
                    this.reactorAni.pos(this.reactorData[frameIndex].orgx,
                        this.reactorData[frameIndex].orgy);
                    this.reactorAni.zOrder = this.reactorData[frameIndex].z;
                    this.hitAni.pos(this.reactorData[frameIndex].orgx,
                        this.reactorData[frameIndex].orgy);
                    this.hitAni.graphics.clear();
                    this.hitAni.graphics.drawRect(0, 0, Math.abs(this.reactorData[frameIndex].orgx * 2), Math.abs(this.reactorData[frameIndex].orgy * 2), "#FFFFFF");
                }
                if(this.reactorData.length > 1) {
                    Laya.timer.once(this.reactorData[frameIndex].delay, this, this.doAction, [i, frameIndex + 1], false);
                }
                else {
                    let data = msMoudle.wz[this.m_reactorInfo[this.m_id] + ".img"][this.hitTime];
                    let root = "0.hit.1";
                    if(!data[root])
                        Laya.timer.once(800, this, this.doAction, [i, frameIndex + 1], false);
                }
            }
        }

        private setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(x, y);
            this.m_nametag_sp.pos(x, y + 15);
        }

        private doEnd() : void {

        }

        //

    }

}