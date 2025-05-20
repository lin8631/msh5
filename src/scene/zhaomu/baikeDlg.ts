module app.zhaomu {

    import cssMob = MobRole.Mob;
    import cssMsg = MsgRole.Msg;

    export class baikeDlg extends ui.zhaomu.baikeDlgUI implements ui.zhaomu.IbaikeDlgUI  {

        public static className = "app.zhaomu.baikeDlg";
        private m_mob:cssMob;
        private m_msg:cssMsg;

        onInitialize(){
            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.updateData();
        }

        m_mobs:Array<any> = [];
        MonsterBook:any;
        m_page:number = 1;
        updateData() : void {
            this.m_msg = new cssMsg();
            // console.log(msMoudle.wz["MonsterBook.img"])
            this.MonsterBook = msMoudle.wz["MonsterBook.img"];

            if(msMoudle.mapP && msMoudle.mapP.m_life.m_mobsAni) {
                for(let i:number = 0; i < msMoudle.mapP.m_life.m_mobsAni.length; i++) {
                    if(msMoudle.mapP.m_life.m_mobsAni[i]) {
                        let id = msMoudle.rmvImg(msMoudle.mapP.m_life.m_mobsAni[i].m_id);
                        if(msMoudle.findKeyFromArr(id, this.m_mobs) == false) {

                            //闹钟
                            if(id == "8500001") id = "8500002";         //二状态
                            ///扎昆
                            if(id == "8800000") id = "8800002";         //二状态
                            ///黑龙
                            if(id == "8810003") id = "8810018";

                            if(id != "8800003" && id != "8800004" && id != "8800005" && id != "8800006" && id != "8800007" && id != "8800008" && id != "8800009" && id != "8800010"
                            // //黑龙
                            && id != "8810002" && id != "8810003" && id != "8810004" && id != "8810005" && id != "8810006" && id != "8810007" && id != "8810008" && id != "8810009"
                            //品克缤
                            && id != "8820002" && id != "8820003" && id != "8820004" && id != "8820005" && id != "8820006"
                            )

                            //8810018

                            this.m_mobs[this.m_mobs.length] = id;

                        }
                    }
                }
            }

            // for(let key in this.MonsterBook) {
            //     this.m_mobs[this.m_mobs.length] = key;
            // }

            // this.lstMob.vScrollBarSkin = "";
            this.lstReward.vScrollBarSkin = "";

            if(this.m_mobs.length > 0) {
                // this.updatePage();
                this.pageshow.text = (this.mobIndex + 1) + "/" + this.m_mobs.length;
                this.curMob = this.m_mobs[this.mobIndex];
                this.lstReward.dataModel = [];
                this.updateReward();
                this.updateMob();
            }
        }

        // showMob:Array<any> = [];
        showReward:Array<any> = [];
        curMob:string = "";
        mobIndex:number = 0;

        // mobImgs:Array<any> = [];
        // updatePage() : void {
        //     // for(let i:number = 0; i < this.m_mobs.length; i++) {
        //     //     let id = this.m_mobs[i];
        //     //     if(id.length == 6) id = "0" + id;
        //     //     msMoudle.wz[id + ".img"] = null;
        //     // }

        //     // this.mobIndex = 0;
        //     // this.showMob = new Array(12);
        //     // let tIndex:number = 0;
        //     // for(let i:number = (this.m_page - 1) * 12; i < this.m_page * 12; i++) {
        //     //     if(this.m_mobs[i]) {
        //     //         this.showMob[tIndex] = this.m_mobs[i];
        //     //         tIndex++;
        //     //     }
        //     // }
        //     // this.lstMob.dataModel = this.showMob;

        //     this.pageshow.text = (this.mobIndex + 1) + "/" + this.m_mobs.length;

        //     this.curMob = this.m_mobs[this.mobIndex];
        // }

        updateMob() : void {
            if(this.m_mob) {
                this.m_mob.clearUp();
                this.m_mob = null;
            }

            let id = this.curMob + "";
            if(id.length == 6) id = "0" + id;
            this._name.text = ""//id;

            //干脆所有boss都不显示


            //鱼王
            if(id == "8520000" || id == "8510000") return ;
            //闹钟
            if(id == "8500002") return ;         //二状态
            ///扎昆
            if(id == "8800002") return ;         //三状态      8810018
            //黑龙
            if(id == "8810018") return ;

            // console.log(this.curMob)

            this.m_mob = new cssMob();
            let lifeMsg:any = new Object();
            lifeMsg.id = id;
            lifeMsg.x = 0;
            lifeMsg.y =  0;
            this.m_mob.m_nametag_show = false;
            this.m_mob.m_canf = false;
            this.m_mob.is_oneFrame = true;
            this.m_mob.changeAll(this.body, id + ".img", lifeMsg);
        }

        updateReward() : void {
            let allJson = msMoudle.allJuanZhou();
            this.showReward = msMoudle.getBossBaike(this.curMob);
            // console.log("##", this.curMob, this.showReward)
            if(this.showReward && this.showReward.length > 0) {
                this.lstReward.dataModel = this.showReward;
                return;
            }
            this.showReward = new Array(12);
            // 100100.map.23: "105090300"
            // 100100.reward.0: "4000019"
            let data = this.MonsterBook[this.curMob];
            if(!data) return;
            //描述
            // 3230306.episode

            let index:number = 0;
            let _:number = 0;
            while(true) {
                let root:string = this.curMob + ".reward." + index;
                let itemId = data[root];
                if(itemId) {

                    let part = msMoudle.getEqpType(itemId);
                    if(part != -1 && part != msMoudle.partType.tCap && part != msMoudle.partType.tCoat && part != msMoudle.partType.tPants || itemId == "1002419" || itemId == "1002357") {
                        let save:boolean = true;
                        if(msMoudle.isWeapon(itemId)) {
                            let weatype = msMoudle.getWeaponType(itemId);
                            if(weatype == "亡命之徒" || weatype == "刀" || weatype == "拳甲"
                             || weatype == "短枪" || weatype == "大剑" || weatype == "太刀") {
                                 save = false;
                             }
                        }
                        if(save) {
                            let rw:any = new Object();
                            rw.img = "res/Character/" + msMoudle.partDirs[part]  + "/0" + itemId + ".img/info.icon.png";
                            rw.id = "0" + itemId;
                            this.showReward[_] = rw;
                            _++;
                        }
                    }
                    else {
                        ///并且itemid属于现有的卷轴内的东西
                        if(msMoudle.findKeyFromArr(itemId, allJson)) {
                            let rw:any = msMoudle.getItemMsg(itemId);
                            if(rw) {
                                this.showReward[_] = rw;
                                _++;
                            }
                        }
                        else {
                            let mulu:any = Math.floor(itemId / 10000);
                            if( mulu == 400 || mulu == 401 || mulu == 402 || mulu == 403 ) {
                                let rw:any = msMoudle.getItemMsg(itemId);
                                if(rw) {
                                    this.showReward[_] = rw;
                                    _++;
                                }
                            }
                        }
                    }
                    index++;
                }
                else break;
            }
            this.lstReward.dataModel = this.showReward;
        }

        onBtnLeftClick(e: Laya.Event): void {
            // if(this.m_page > 1) this.m_page--;
            // this.mobIndex = index;
            if(this.mobIndex > 0) this.mobIndex--;
            else return ;

            this.pageshow.text = (this.mobIndex + 1) + "/" + this.m_mobs.length;
            this.curMob = this.m_mobs[this.mobIndex];
            this.lstReward.dataModel = [];
            if(this.MonsterBook[this.curMob]) {
                this.updateReward();
            }
            this.updateMob();
        }
        onBtnRightClick(e: Laya.Event): void {
            // if(this.m_page < Math.ceil(this.m_mobs.length / 12)) this.m_page++;
            if(this.mobIndex < this.m_mobs.length - 1) this.mobIndex++;
            else return ;
            this.pageshow.text = (this.mobIndex + 1) + "/" + this.m_mobs.length;
            this.curMob = this.m_mobs[this.mobIndex];
            this.lstReward.dataModel = [];
            if(this.MonsterBook[this.curMob]) {
                this.updateReward();
            }
            this.updateMob();
        }

        // onLstMobCellClick(e: Laya.Event, index: number): void {
        //     if(index != this.mobIndex) {
        //         this.mobIndex = index;
        //         this.curMob = this.m_mobs[this.mobIndex];
        //         this.updateReward();
        //         this.updateMob();
        //     }
        // }
        onLstRewardCellClick(e: Laya.Event, index: number): void {
            if(this.showReward[index]) {
                if(msMoudle.isEquip(this.showReward[index].id)) this.m_msg.equipLoadShow(this.showReward[index].id);
                else this.m_msg.itemShow(Number(this.showReward[index].id));
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onClose() {

        }


    }
}