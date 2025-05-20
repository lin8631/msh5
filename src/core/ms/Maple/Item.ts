module ItemRole {

    export class Item extends Laya.Sprite {
        public uniqueId = 0;
        public dropOwner = "";
        private m_parent:any;
        private m_sp:Laya.Sprite;

        public itemAni:Laya.Image;
        public itemData:Array<any> = [];       //更好的办法是多个继承
        public itemState:boolean = true;
        private m_award:any;
        public m__x:number = 0;
        public m__y:number = 0;
        public m_down_t:number = 0;
        public m_up_t:number = 0;
        public pickoffEnd:boolean = false;
        public pickEnd:boolean = false;
        public m_clear:boolean = false;

        public clearUp() : void {
            Laya.timer.clear(this, this.onRmv);
            Laya.timer.clear(this, this.DoSomeThing);
            Laya.timer.clear(this, this.AuDoSomeThing);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            if(this.itemAni) {
                this.itemAni.removeSelf();
                this.itemAni.destroy(true);
                this.itemAni = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.itemState = true;
            this.m_down_t = 0;
            this.m_up_t = 0;
            this.pickoffEnd = false;
            this.pickEnd = false;
            this.m_clear = false;
            this.isSendPickReq = false;
            this.itemData = [];

            Laya.Pool.recover("ItemRole.Item",this);
        }

        m_index:number = 0;
        // tReward: any;
        public PickOffItem(P:any, award:any, awardLen:number, index:number, x:number, y:number, uniqueId:number) : void {
            // console.log("#PickOffItem, ", uniqueId)
            // this.tReward = award;
            this.m_parent = P;
            this.m_award = award;
            this.uniqueId = uniqueId;
            this.dropOwner = award.owner || "";

            if(!award) {
                msMoudle.toast("物品错误" + award.id);
                return ;
            }

            this.m_index = index;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 99999;
            this.m_parent.addChild(this.m_sp);

            this.pickoffEnd = false;
            this.m__x = x;
            this.m__y = y;

            //动画数据数据
            this.itemData = new Array();
            //动画列表
            this.itemAni = new Laya.Image();
            this.itemAni.alpha = 1;
            this.itemAni.anchorX = 0.5;
            this.itemAni.anchorY = 0.5;
            this.m_sp.addChild(this.itemAni);

            //3种材料+枫叶
            if(award.id == "700000000" || award.id == "800000000" || award.id == "600000002" || award.id == "1234561") {
                this.itemData[0] = new Object();
                this.itemData[0].tex = award.img;
                this.itemData[0].orgx = award.orgx;
                this.itemData[0].orgy = award.orgy;
                this.itemData[0].delay = 150;
            }
            else {
                ///掉落技能书
                // if(msMoudle.findKeyFromArr(award.id, msMoudle.AllSkills)) {
                //     let itemid = Math.floor(award.id / 10000);
                //     let data:any = msMoudle.wz[itemid + ".img"]["skill." + award.id];
                //     this.loadSkill(data, "skill." + award.id + ".icon", itemid + "");
                // }
                // else {
                    if(msMoudle.getEqpType(award.id) != -1) {
                        let itemid = award.id;
                        this.loadEqp(itemid);
                    }
                    else {
                        if(award.id == "9000000") award.id = "9000002";
                        let itemid = "0" + Math.floor(Number(award.id) / 10000) + ".img";
                        let id = "0" + award.id;
                        let data:any = msMoudle.wz[itemid][id];

                        // console.log("xxx", itemid, award.id, id, data)
                        //拼接
                        let frameindex:number = 0;
                        while(true) {
                            if(itemid == "0900.img") {
                                let root:string = id + ".iconRaw." + frameindex;////修改，因为过滤了
                                if(data[root]) {
                                    this.loadItem(data, root, itemid, frameindex);
                                    frameindex = frameindex + 1;
                                }
                                else break;
                            }
                            else {
                                let root:string = id + ".info.icon";
                                if(data[root]) {
                                    this.loadItem(data, root, itemid, frameindex);
                                    frameindex = frameindex + 1;
                                }
                                break;
                            }
                        }
                    }
                // }

            }

            //资源不需要重复加载
            let res:Array<any> = [];
            for(let i:number = 0; i < this.itemData.length; i++) {
                if(!Laya.loader.getRes(this.itemData[i].tex)) {
                    res.push({ url: this.itemData[i].tex });
                }
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    this.onItem(awardLen, index);
                });
            }
            else {
                this.onItem(awardLen, index);
            }

            //清除定时器
            if(msMoudle.mapP && msMoudle.mapP.m_id && msMoudle.isSyncMap(msMoudle.mapP.m_id) == false) {
                Laya.timer.once(1 * 60 * 1000, this, this.AuDoSomeThing);
            }


            //

        }

        AuDoSomeThing() : void {
            if(msMoudle.mainT && msMoudle.mainT.m_itemList) {
                for(let j=msMoudle.mainT.m_itemList.length-1; j>-1; --j) {
                    let item = msMoudle.mainT.m_itemList[j];
                    // console.log("xxxx", this.uniqueId)
                    if(item && item.uniqueId == this.uniqueId) {
                        this.DoSomeThing();
                        // item.onRmv();
                        msMoudle.mainT.m_itemList.splice(j, 1);
                        break;
                    }
                }
            }
        }

        // dropTimeLine: Laya.TimeLine;
        onItem(awardLen:number, index:number) : void {
            this.doAction(0);

            this.itemState = false; ///动画停止
            let offX = 35;
            let offY = 110;
            if(msMoudle.isBossMap()) {
                offX = 50;
                offY = 200;
            }
            let xLen:number = (awardLen - 1) * offX / 2;
            let add:number = (awardLen - index - 1) * offX - xLen;
            if(this.itemAni) {
                // let TimeLine = new Laya.TimeLine();
                // // console.log("##, aniX=", this.itemAni.x, ",aniY=",this.itemAni.y, ",add=", add, ",mx=", this.m__x, ",my=", this.m__y, this.tReward)
                // TimeLine.addLabel("pickoffitem_1_", 0).to(this.itemAni, {rotation: 360*3, x:this.itemAni.x + add, y: this.itemAni.y-110},  500,null, 0);
                // this.m__x = this.m__x + add;
                // this.m__y = this.m__y - 110;

                // TimeLine.play(0, false);
                // TimeLine.once(Laya.Event.COMPLETE, this,this.onPickOffComplete);
                // this.dropTimeLine = TimeLine;
                // this.itemAni.pos(this.m__x, this.m__y);
                this.m__x = this.m__x + add;
                this.m__y = this.m__y - offY;
                Laya.Tween.to(this.itemAni, {rotation: 360*3, x:this.itemAni.x + add, y: this.itemAni.y-offY},  500, null, Laya.Handler.create(this, this.onPickOffComplete, [], true));
            }
        }

        oItem(awardLen:number, index:number) : void {
            this.doAction(0);
            this.itemState = false; ///动画停止
            let dis = 35;
            if(msMoudle.mapP.m_id == "280030100.img") dis = 100;
            let xLen:number = (awardLen - 1) * dis / 2;
            let add:number = (awardLen - index - 1) * dis - xLen;
            if(this.itemAni) {
                let TimeLine = new Laya.TimeLine();
                TimeLine.addLabel("pickoffitem_1_", 0).to(this.itemAni, {rotation: 360*3, x:this.itemAni.x + add, y: this.itemAni.y-110}, 500,null, 0);
                this.m__x = this.m__x + add;
                this.m__y = this.m__y - 110;
                TimeLine.play(0, false);
                TimeLine.once(Laya.Event.COMPLETE, this,this.onPickOffComplete);
            }
        }

        isSendPickReq = false;
        public PickItem(char:any, index = 0, petpick = false) : void {
            // console.log("1111111")
            if(char.m_id == ms.user) {
                // console.log("222222")
                if(petpick && (this.dropOwner && this.dropOwner != ms.user)) { //宠物不捡取其他人的掉落物
                    return;
                }
                // index = 999999;
                // console.log("3333333")
                this.isSendPickReq = true;
                // console.log("do pickitem, uniid is ", this.uniqueId)
                //msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id
                if(msMoudle.mapP && msMoudle.mapP.m_id && msMoudle.isSyncMap(msMoudle.mapP.m_id) == false) {
                    // console.log("444444")
                    this.isSendPickReq = false;
                    this.doPickItem(char, index);
                }
                else {
                    Sync.pickItem(index, this.uniqueId, ()=>{
                        this.isSendPickReq = false;
                        this.doPickItem(char, index);
                    }, (items?: any)=>{
                        this.isSendPickReq = false;
                        if(items) {
                            console.log("##pick error, ", msMoudle.mainT.m_itemList.length);
                            for(let i=0; i<msMoudle.mainT.m_itemList.length; ++i) {
                                let item = msMoudle.mainT.m_itemList[i];
                                if(item && item.uniqueId == this.uniqueId) {
                                    item.onRmv();
                                    msMoudle.mainT.m_itemList.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    })
                }
            }
            else {
                this.doPickItem(char, index);
            }
        }

        private doPickItem(char:any, index = 0) : void {
            // if(this.dropTimeLine) {
            //     this.dropTimeLine.destroy();
            //     this.dropTimeLine = null;
            // }
            msMoudle.playSound("res/Sound/Game.img/PickUpItem")
            Laya.timer.clear(this, this.DoSomeThing);
            this.pickEnd = true;
            this.itemState = false;
            // let TimeLine = new Laya.TimeLine();
            // TimeLine.addLabel("pickitem_0_" + this.m_award.openId, 0).to(this.itemAni, {x:this.m__x, y: this.m__y}, 0,null, 0);
            // TimeLine.addLabel("pickitem_1_" + this.m_award.openId, 0).to(this.itemAni, {x:char.m_x, y: char.m_y - 90}, 350,null, 0);
            // TimeLine.addLabel("pickitem_2_" + this.m_award.openId, 0).to(this.itemAni, {x:char.m_x, y: char.m_y - 70, alpha:0}, 300, null, 0);
            // TimeLine.play(0, false);
            // TimeLine.once(Laya.Event.COMPLETE, this,this.onPickComplete);
            // this.dropTimeLine = TimeLine;

            this.itemAni.pos(this.m__x, this.m__y);
            Laya.Tween.to(this.itemAni, {x:char.m_x, y: char.m_y - 90}, 350, null, Laya.Handler.create(this, ()=>{
                Laya.Tween.to(this.itemAni, {x:char.m_x, y: char.m_y - 70, alpha:0}, 300, null, Laya.Handler.create(this,this.onPickComplete, [], true));
            }, [], true))
            // msMoudle.mainT.m_itemList.splice(index, 1);
            // for(let i=0; i<msMoudle.mainT.m_itemList.length; ++i) {
            //     let item = msMoudle.mainT.m_itemList[i];
            //     if(item && item.uniqueId == this.uniqueId) {
            //         item.onRmv();
            //         msMoudle.mainT.m_itemList.splice(i, 1);
            //         break;
            //     }
            // }

            if(msMoudle.mainT && char.m_id == ms.user) {
                // console.log("44444", this.uniqueId)
                msMoudle.mainT.showPickMsg(this.uniqueId);
            }
        }

        private loadItem(data:any, root:string, itemid:string, frameindex:number) : void {
            let msg:any = msMoudle.getWindowInfo(data[root], itemid);
            let strMarker:string = "res/Item/" + itemid + "/" + msg.strMarker;
            // console.log(strMarker, itemid)
            root = msg.root;
            data = msMoudle.wz[itemid][msg.id];
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            // let delay = msMoudle.Vec2FromArr(data[root + ".delay"]);
            this.itemData[frameindex] = new Object();
            this.itemData[frameindex].tex = strMarker;
            this.itemData[frameindex].orgx = -Number(oringinInfo.x);
            this.itemData[frameindex].orgy = -Number(oringinInfo.y);
            this.itemData[frameindex].delay = 150;;
        }

        private loadEqp(itemid:string) : void {
            //data:any, root:string,
            // let msg:any = msMoudle.getWindowInfo(data[root], itemid + ".img");

            // let eqptype:number = msMoudle.getEqpType(Number(itemid));
            // let strMarker:string = "";
            // if(eqptype == msMoudle.partType.tWeapon) {
            //     strMarker = "res/Character/Weapon/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tCap) {
            //     strMarker = "res/Character/Cap/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tCoat) {
            //     strMarker = "res/Character/Coat/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tPants) {
            //     strMarker = "res/Character/Pants/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tShoes) {
            //     strMarker = "res/Character/Shoes/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tCape) {
            //     strMarker = "res/Character/Cape/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tLongcoat) {
            //     strMarker = "res/Character/LongCoat/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tGlove) {
            //     strMarker = "res/Character/Glove/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tCape) {
            //     strMarker = "res/Character/Cape/" + itemid + ".img/" + msg.strMarker;
            // }
            // else if(eqptype == msMoudle.partType.tShield) {
            //     strMarker = "res/Character/Shield/" + itemid + ".img/" + msg.strMarker;
            // }

            // if(msg.root != "") {
            //     root = msg.root;
            //     data = msMoudle.wz[itemid + ".img"]["info"];
            // }
            // let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let item:any = msMoudle.getEqpMsg(itemid);

            let frameindex:number = 0;
            this.itemData[frameindex] = new Object();
            this.itemData[frameindex].tex = item.img;
            this.itemData[frameindex].orgx = -18;//-Number(oringinInfo.x);
            this.itemData[frameindex].orgy = -32;//-Number(oringinInfo.y);
            this.itemData[frameindex].delay = 150;;
        }

        private loadSkill(data:any, root:string, itemid:string) : void {
            let msg:any = msMoudle.getWindowInfo(data[root], itemid);
            let strMarker:string = "res/Skill/" + itemid + ".img/" + msg.strMarker;
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            // let delay = msMoudle.Vec2FromArr(data[root + ".delay"]);
            this.itemData[0] = new Object();
            this.itemData[0].tex = strMarker;
            this.itemData[0].orgx = -Number(oringinInfo.x);
            this.itemData[0].orgy = -Number(oringinInfo.y);
            this.itemData[0].delay = 150;
        }

        private doAction(frameIndex:number) : void {
            if(this.itemData.length > 0) {
                if(frameIndex >= this.itemData.length) frameIndex = 0;
                //防止终止的冲突
                if(this.itemState) {
                    let tex = Laya.loader.getRes(this.itemData[frameIndex].tex);
                    if(tex && this.itemAni) {
                        this.itemAni.skin = this.itemData[frameIndex].tex;
                        this.itemAni.pos(this.itemData[frameIndex].orgx + this.m__x,
                        this.itemData[frameIndex].orgy + tex.height / 2 + this.m__y);
                    }
                }
                if(this.itemData.length > 1) Laya.timer.once(this.itemData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
            }
        }

        private onPickOffComplete() : void {
            // if(this.dropTimeLine) {
            //     this.dropTimeLine.destroy();
            //     this.dropTimeLine = null;
            // }
            this.itemState = true;       //动画开启
            this.pickoffEnd = true;
        }

        public setPos(x:number, y:number) : void {
            if(this.itemData[0]) {
                this.m__x = x;
                this.m__y = y;
                let tex = this.itemData[0].tex;
                if(Laya.loader.getRes(tex))
                    this.itemAni.pos(this.itemData[0].orgx + this.m__x, this.itemData[0].orgy + Laya.loader.getRes(tex).height / 2 + this.m__y);
            }
        }

        private onPickComplete() : void {
            // if(this.dropTimeLine) {
            //     this.dropTimeLine.destroy();
            //     this.dropTimeLine = null;
            // }
            for(let i=0; i<msMoudle.mainT.m_itemList.length; ++i) {
                let item = msMoudle.mainT.m_itemList[i];
                if(item && (!this.uniqueId || item.uniqueId == this.uniqueId)) {
                    item.onRmv();
                    msMoudle.mainT.m_itemList.splice(i, 1);
                    break;
                }
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp = null;
            }
        }

        private DoSomeThing() : void {
            // Laya.timer.clear(this, this.DoSomeThing);
            // this.m_clear = true;
            // if(this.dropTimeLine) {
            //     this.dropTimeLine.destroy();
            //     this.dropTimeLine = null;
            // }

            // let TimeLine = new Laya.TimeLine();
            // TimeLine.addLabel("rmv_1_" + this.m_award.openId, 0).to(this.itemAni, {alpha:0}, 500, null, 0);
            // TimeLine.play(0, false);
            // TimeLine.once(Laya.Event.COMPLETE, this,this.onRmv);

            Laya.Tween.to(this.itemAni, {alpha:0}, 500, null, Laya.Handler.create(this, this.onRmv));
        }

        //////这里有问题
        //如何通知外面呢????
        private onRmv() : void {
            if(msMoudle.mainT && msMoudle.mainT.m_msgList) {
                if(msMoudle.mainT.m_msgList[this.m_index]) {
                    msMoudle.mainT.m_msgList.splice(this.m_index, 1);
                }
            }
            this.clearUp();
            //
        }

        //
    }
}