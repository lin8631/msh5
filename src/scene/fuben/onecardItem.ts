module app.fuben {

    let MYTURN = 1	//我的回合状态
    let NEXT = 2		//下一位状态
    let WAIT = 3		//等待状态

    let PLAY = 1		//进行中
    let WIN = 2		//胜利
    let LOSE = 3		//失败

    import cssCharacter = CharacterRole.Character;

    export class onecardItem extends ui.fuben.onecardItemUI  {
        public static className = "app.fuben.onecardItem";

        private char:cssCharacter;
        updateData(data: any, index: number) {

        }

        /**
         * 英雄比赛结果部分
         */
        result:number;							//比赛结果

        //修改当前比赛结果
        public ChangeResult(change_result:number) : void {
            this.result = change_result;
        }

        /**
         * 英雄框部分
         */
        state:number;						//状态

        //初始化框外观
        public InitBoard(face:string, name:string, index:number) {
            //初始化比赛结果为正在进行
            this.result = PLAY;
            //我的手牌初始位置
            this.herocard_x = 210; this.herocard_y = 405;
            this.mob1card_x = 185; this.mob1card_y = 50;
            this.mob2card_x = 560; this.mob2card_y = 20;
            this.mob3card_x = 560; this.mob3card_y = 270;

            this.boardname.text = name;

            this.boardani.zOrder = 3;

            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            if(index == 1) {
                if(true) {
                    this.char = new cssCharacter();
                    this.char.m_name = ms.m_job[ms.selHero];
                    let E:any = {};
                    E.body = "00002000.img";
                    E.head = "00012000.img";
                    if(ms.selbody[ms.selHero] != "N" && ms.selbody[ms.selHero]) {
                        E.body = ms.selbody[ms.selHero];
                        E.head = "000" + (Number(ms.selbody[ms.selHero].split(".")[0]) + 10000) + ".img";
                    }
                    E.face = "00020012.img";
                    if(ms.selface[ms.selHero] != "N")
                        E.face = ms.selface[ms.selHero];
                    E.hair = "00030020.img";
                    if(ms.selhair[ms.selHero] != "N")
                        E.hair = ms.selhair[ms.selHero];

                    E.coat = "01040002.img";
                    E.pants = "01060002.img";
                    E.weapon = msMoudle.getWeaponByJob(ms.selHero);
                    E.shoes = "N";
                    E.glove = "N";
                    //扎昆头盔类似gm帽子改配置zmap
                    E.cap = "N";//01002357.img 01002140 01002017
                    E.cape = "N";
                    E.longcoat = "N";

                    let eSlots = msMoudle.getSlotByJob(ms.selHero);
                    if(eSlots) {
                        E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                        E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";

                        if(eSlots[msMoudle.partType.tWeapon]) {
                            E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
                        }
                        E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                        E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                        //扎昆头盔类似gm帽子改配置zmap
                        E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                        E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                        E.longcoat = "N";
                    }


                    if(ms.ring) {
                        if(ms.ring.id != "N") this.char.m_ring = ms.ring.id;
                    }
                    this.char.m_nametag_show = false;
                    this.char.changeAll(this.body, E, 0, 0);
                    this.char.setDir(-1);
                }
            }
            else {
                if(true) {
                    ///随机形象
                    this.char = new cssCharacter();
                    let E:any = {};
                    let selbody = msMoudle.AllBody[msMoudle.getRandValue(0, 0, msMoudle.AllBody.length)] + ".img";
                    E.body = selbody;
                    E.head = "000" + (Number(selbody.split(".")[0]) + 10000) + ".img";
                    E.face = msMoudle.AllFace[msMoudle.getRandValue(0, 0, msMoudle.AllFace.length)] + ".img";
                    E.hair = msMoudle.AllHair[msMoudle.getRandValue(0, 0, msMoudle.AllHair.length)] + ".img";
                    E.weapon = msMoudle.AllWeapon[msMoudle.getRandValue(0, 0, msMoudle.AllWeapon.length)] + ".img";
                    E.coat = msMoudle.AllCoat[msMoudle.getRandValue(0, 0, msMoudle.AllCoat.length)] + ".img";
                    E.pants = msMoudle.AllPants[msMoudle.getRandValue(0, 0, msMoudle.AllPants.length)] + ".img";
                    if(msMoudle.getRandValue(0, 0, 100) < 75) {
                        E.shoes = msMoudle.AllShoes[msMoudle.getRandValue(0, 0, msMoudle.AllShoes.length)] + ".img";
                    }
                    if(msMoudle.getRandValue(0, 0, 100) < 75) {
                        E.glove = msMoudle.AllGlove[msMoudle.getRandValue(0, 0, msMoudle.AllGlove.length)] + ".img";
                    }
                    if(msMoudle.getRandValue(0, 0, 100) < 25) {
                        E.cap = msMoudle.AllCap[msMoudle.getRandValue(0, 0, msMoudle.AllCap.length)] + ".img";
                    }
                    if(msMoudle.getRandValue(0, 0, 100) < 75) {
                        E.cape = msMoudle.AllCape[msMoudle.getRandValue(0, 0, msMoudle.AllCape.length)] + ".img";
                    }
                    if(msMoudle.getRandValue(0, 0, 100) < 25) {
                        this.char.m_ring = msMoudle.AllRing[msMoudle.getRandValue(0, 0, msMoudle.AllRing.length)];
                    }
                    this.char.m_nametag_show = false;
                    this.char.changeAll(this.body, E, 0, 0);
                    if(index == 2) this.char.setDir(-1);
                    // this.boardface.mask = this.body;
                }
            }
        }

        //根据状态修改框外观
        public ChangeBoardByState(change_state:number, flag:boolean) : void {
            //当比赛结果为正在进行的时候
            if(this.result == PLAY) {
                //修改状态
                this.state = change_state;
                //当状态为我的回合
                if(change_state == MYTURN) {
                    //加载状态边框
                    this.boardedge.skin = "res/MiniGame/mapleOneCard.OtherCharacterSlot.backlight.myturn.0.png";
                    Laya.timer.clear(this, this.doAni);
                    this.boardani.skin = "";
                    if(flag == true) {
                        //加载状态动画
                        this.doAni("Myturn", 0);
                    }
                }
                //当状态为下一个
                else if(change_state == NEXT) {
                    //加载状态边框
                    this.boardedge.skin = "res/MiniGame/mapleOneCard.OtherCharacterSlot.backlight.next.0.png";
                    //加载状态动画
                    this.boardani.skin = "";
                    Laya.timer.clear(this, this.doAni);
                    this.doAni("Next", 0);
                }
                //当状态为等待
                else if(change_state == WAIT){
                    //等待状态不需要边框
                    this.boardedge.skin = "";
                    //加载状态动画
                    Laya.timer.clear(this, this.doAni);
                    this.boardani.skin = "res/MiniGame/mapleOneCard.Effect.status.waiting.loop.0.png";
                }
            }
        }

        doAni(ani:string, frame:number) : void {
            if(frame >= 8) frame = 0;
            if(ani == "Myturn")
                this.boardani.skin = "res/MiniGame/mapleOneCard.Effect.status.myturn.loop." + frame + ".png";
            else if(ani == "Next")
                this.boardani.skin = "res/MiniGame/mapleOneCard.Effect.status.next.loop." + frame + ".png";
            Laya.timer.once(90, this, this.doAni, [ani, frame + 1], true);
        }

        /**
         * 英雄手牌部分
         */
        cardamount:number = 0;					//手牌数量(全部特换成这个)
        card:Array<number> = [];				//每一张手牌的数字标记
        herocard_x:number;
        herocard_y:number;
        mob1card_x:number;
        mob1card_y:number;
        mob2card_x:number;
        mob2card_y:number;
        mob3card_x:number;
        mob3card_y:number;;

        //从牌组中拿走n张牌增加到手牌中
        public addCard(n:number, get:any) : void {
            this.cardamount += n;
            for(let i:number = 0; i < n; i++) {
                // card.push_back(get[i]);
                this.card.push(get[i]);
            }
        }
        //从手牌中减少n张手牌(随机减少)
        public subCard(n:number) : void {
            this.cardamount -= n;
            //如果手牌为0则胜利
            if(this.cardamount == 0) this.state = WIN;
            for(let i:number = 0; i < n; i++) {
                this.card.pop();
            }
        }

        //从手牌中减少特定的一张牌
        public subTheCard(id:number) : void {
            for(let i:number = 0; i < this.card.length; i++) {
                if(this.card[i] == id) {
                    this.card.splice(i, 1);
                    this.cardamount--;
                    break;
                }
            }
        }

        public onClose() {
            Laya.timer.clear(this, this.doAni);
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }

        /////

    }
}