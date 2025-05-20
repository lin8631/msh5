/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    let LEFT = 1
    let RIGHT = 2

    let RED = 1
    let YELLOW = 2
    let BLUE = 3
    let GREEN = 4

    let MYTURN = 1	//我的回合状态
    let NEXT = 2		//下一位状态
    let WAIT = 3		//等待状态

    let PLAY = 1		//进行中
    let WIN = 2		//胜利
    let LOSE = 3		//失败

    import MHero = app.fuben.onecardItem;

    export class mapleOneCard extends ui.fuben.mapleOneCardUI  implements ui.fuben.ImapleOneCardUI {
        public static className = "app.fuben.mapleOneCard";

        hero:MHero;
        mob1:MHero;
        mob2:MHero;
        mob3:MHero;

        sp_dir:Laya.Image;//游戏方向标志图
        gamedir:number;//游戏方向
        cards:Laya.Image;//牌堆
        mob1card:Laya.Image;
        mob2card:Laya.Image;
        mob3card:Laya.Image;
        draw:boolean = false;//摸牌事件加锁
        mob1cardnumber:Laya.Label;
        mob2cardnumber:Laya.Label;
        mob3cardnumber:Laya.Label;
        color_change:boolean = false;
        onecard:boolean = true;

        onBtnMsgClick(e: Laya.Event): void {
            Laya.timer.clear(this, this.update);
            Laya.timer.clear(this, this.loadingSchedule);
            Laya.timer.clear(this, this.loadingSchedule1);
            ui.show(app.fuben.onecardRule, {black:true});
        }

        public reStart() : void {
            Laya.timer.frameLoop(1, this, this.update);
            Laya.timer.loop(100, this, this.loadingSchedule);
            Laya.timer.loop(10, this, this.loadingSchedule1);
        }

        JudgeDir() {
            //当游戏方向为左时
            if(this.gamedir == LEFT) {
                //如果该回合为我的回合
                if(this.hero.state == MYTURN) {
                    //4 3 2 1
                    this.mob3.ChangeBoardByState(MYTURN, false);
                    this.mob2.ChangeBoardByState(NEXT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家1的回合
                else if(this.mob1.state == MYTURN) {
                    // 1 4 3 2
                    msMoudle.playSound("res/Sound/oneCard.myturn");
                    this.hero.ChangeBoardByState(MYTURN, true);
                    this.mob3.ChangeBoardByState(NEXT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家2的回合
                else if(this.mob2.state == MYTURN) {
                    // 2 1 4 3
                    this.mob1.ChangeBoardByState(MYTURN, false);
                    this.hero.ChangeBoardByState(NEXT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家3的回合
                else if(this.mob3.state == MYTURN) {
                    //3 2 1 4
                    this.mob2.ChangeBoardByState(MYTURN, false);
                    this.mob1.ChangeBoardByState(NEXT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                }
            }
            //当游戏方向为右时
            else if(this.gamedir == RIGHT) {
                //如果该回合为我的回合
                if(this.hero.state == MYTURN) {
                    // 2 3 4 1
                    this.mob1.ChangeBoardByState(MYTURN, false);
                    this.mob2.ChangeBoardByState(NEXT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家1的回合
                else if(this.mob1.state == MYTURN) {
                    // 3 4 1 2
                    this.mob2.ChangeBoardByState(MYTURN, false);
                    this.mob3.ChangeBoardByState(NEXT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家2的回合
                else if(this.mob2.state == MYTURN) {
                    //4 1 2 3
                    this.mob3.ChangeBoardByState(MYTURN, false);
                    this.hero.ChangeBoardByState(NEXT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家3的回合
                else if(this.mob3.state == MYTURN) {
                    // 1 2 3 4
                    msMoudle.playSound("res/Sound/oneCard.myturn");
                    this.hero.ChangeBoardByState(MYTURN, true);
                    this.mob1.ChangeBoardByState(NEXT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                }
            }
        }
        JudgeDir1() {
        //当游戏方向为左时
            if(this.gamedir == LEFT) {
                //如果该回合为我的回合
                if(this.hero.state == MYTURN) {
                    //4 3 2 1
                    this.mob3.ChangeBoardByState(MYTURN, false);
                    this.mob2.ChangeBoardByState(NEXT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家1的回合
                else if(this.mob1.state == MYTURN) {
                    // 1 4 3 2
                    this.hero.ChangeBoardByState(MYTURN, true);
                    this.mob3.ChangeBoardByState(NEXT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家2的回合
                else if(this.mob2.state == MYTURN) {
                    // 2 1 4 3
                    this.mob1.ChangeBoardByState(MYTURN, false);
                    this.hero.ChangeBoardByState(NEXT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家3的回合
                else if(this.mob3.state == MYTURN) {
                    //3 2 1 4
                    this.mob2.ChangeBoardByState(MYTURN, false);
                    this.mob1.ChangeBoardByState(NEXT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                }
            }
            //当游戏方向为右时
            else if(this.gamedir == RIGHT) {
                //如果该回合为我的回合
                if(this.hero.state == MYTURN) {
                    // 2 3 4 1
                    this.mob1.ChangeBoardByState(MYTURN, false);
                    this.mob2.ChangeBoardByState(NEXT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家1的回合
                else if(this.mob1.state == MYTURN) {
                    // 3 4 1 2
                    this.mob2.ChangeBoardByState(MYTURN, false);
                    this.mob3.ChangeBoardByState(NEXT, false);
                    this.hero.ChangeBoardByState(WAIT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家2的回合
                else if(this.mob2.state == MYTURN) {
                    //4 1 2 3
                    this.mob3.ChangeBoardByState(MYTURN, false);
                    this.hero.ChangeBoardByState(NEXT, false);
                    this.mob1.ChangeBoardByState(WAIT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                }
                //如果该回合为玩家3的回合
                else if(this.mob3.state == MYTURN) {
                    // 1 2 3 4
                    this.hero.ChangeBoardByState(MYTURN, true);
                    this.mob1.ChangeBoardByState(NEXT, false);
                    this.mob2.ChangeBoardByState(WAIT, false);
                    this.mob3.ChangeBoardByState(WAIT, false);
                }
            }
        }


        FirstPress(i:number) : void {
            let findval:number;
            //如果玩家1第一次出牌
            if(i == 1) {
                findval = this.mob1.card[this.mob1.card.length - 1];
                this.lastshowcard = findval;

                this.ShowCard(1, findval);
                //居中显示
                this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                //shuffle[shufflecount] = findval;
                //shufflecount++;
                if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                    if(this.lastshowcard == 313) {
                        for(let j:number = 301; j<= 313; j++) {
                            this.mob1.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 413) {
                        for(let j:number = 401; j<= 413; j++) {
                            this.mob1.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 113) {
                        for(let j = 101; j<= 113; j++) {
                            this.mob1.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 213) {
                        for(let j = 201; j<= 213; j++) {
                            this.mob1.subTheCard(j);
                        }
                    }
                }
                else {
                    this.mob1.subTheCard(this.lastshowcard);
                }
                this.UpdateMobNumber(1, this.mob1.cardamount);
                //mob1cardcount = this.mob1.cardamount;

            }
            //如果玩家2第一次出牌
            else if(i == 2) {
                findval = this.mob2.card[this.mob2.card.length - 1];
                this.lastshowcard = findval;

                this.ShowCard(2, findval);
                //居中显示
                this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                //shuffle[shufflecount] = findval;
                //shufflecount++;
                if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                    if(this.lastshowcard == 313) {
                        for(let j = 301; j<= 313; j++) {
                            this.mob2.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 413) {
                        for(let j = 401; j<= 413; j++) {
                            this.mob2.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 113) {
                        for(let j = 101; j<= 113; j++) {
                            this.mob2.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 213) {
                        for(let j = 201; j<= 213; j++) {
                            this.mob2.subTheCard(j);
                        }
                    }
                }
                else {
                    this.mob2.subTheCard(this.lastshowcard);
                }
                this.UpdateMobNumber(2, this.mob2.cardamount);
                //mob2cardcount = this.mob2.cardamount;
            }
            //如果玩家3第一次出牌
            else if(i == 3) {
                findval = this.mob3.card[this.mob3.card.length - 1];
                this.lastshowcard = findval;

                this.ShowCard(3, findval);
                //居中显示
                this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                //shuffle[shufflecount] = findval;
                //shufflecount++;
                if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                    if(this.lastshowcard == 313) {
                        for(let j = 301; j<= 313; j++) {
                            this.mob3.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 413) {
                        for(let j = 401; j<= 413; j++) {
                            this.mob3.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 113) {
                        for(let j = 101; j<= 113; j++) {
                            this.mob3.subTheCard(j);
                        }
                    }
                    else if(this.lastshowcard == 213) {
                        for(let j = 201; j<= 213; j++) {
                            this.mob3.subTheCard(j);
                        }
                    }
                }
                else {
                    this.mob3.subTheCard(this.lastshowcard);
                }
                this.UpdateMobNumber(3, this.mob3.cardamount);
                //mob3cardcount = mob3.cardamount;
            }
        }
        SecondJuder(i:number) : boolean {
            if(this.hero.state == MYTURN && this.onecard == true) {
                this.onecard = false;
                return true;
            }
            //如果颜色相同
            if(i >= 101 && i <= 113 && this.lastshowcard >= 101 && this.lastshowcard <= 113) {
                return true;
            }
            if(i >= 201 && i <= 213 && this.lastshowcard >= 201 && this.lastshowcard <= 213) {
                return true;
            }
            if(i >= 301 && i <= 313 && this.lastshowcard >= 301 && this.lastshowcard <= 313) {
                return true;
            }
            if(i >= 401 && i <= 413 && this.lastshowcard >= 401 && this.lastshowcard <= 413) {
                return true;
            }
            //如果是变色牌
            if(i == 109 || i == 209 || i == 309 || i == 409) {
                return true;
            }
            //如果数字相同
            if(i % 100 == this.lastshowcard % 100) {
                return true;
            }
            return false;
        }

        SecondPress(i:number) : boolean {
            let findval:number;
            if(i == 1) {
                for(let it:number = 0; it < this.mob1.card.length; it++) {
                // for(it = this.mob1.card.begin(); it != this.mob1.card.end(); it++) {
                    if(this.SecondJuder(this.mob1.card[it])) {
                        findval = this.mob1.card[it];
                        this.lastshowcard = this.mob1.card[it];

                        this.ShowCard(1, findval);

                        //居中显示
                        this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";

                        this.JudgeDir();
                        //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                        //shuffle[shufflecount] = findval;
                        //shufflecount++;

                        if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                            if(this.lastshowcard == 313) {
                                for(let j = 301; j<= 313; j++) {
                                    this.mob1.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 413) {
                                for(let j = 401; j<= 413; j++) {
                                    this.mob1.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 113) {
                                for(let j = 101; j<= 113; j++) {
                                    this.mob1.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 213) {
                                for(let j = 201; j<= 213; j++) {
                                    this.mob1.subTheCard(j);
                                }
                            }
                        }
                        else {
                            this.mob1.subTheCard(this.lastshowcard);
                        }
                        this.UpdateMobNumber(1, this.mob1.cardamount);

                        if(this.mob1.cardamount == 1) {
                            msMoudle.playSound("res/Sound/oneCard.lastcard");
                            Laya.timer.clear(this, this.lastcardAni);
                            this.lastcardAni(0);
                        }
                        else if(this.mob1.cardamount == 0) {
                            this.ShowScore();
                        }
                        //mob1cardcount = this.mob1.cardamount;
                        return true;
                    }
                }
            }
            else if(i == 2) {
                for(let it:number = 0; it < this.mob2.card.length; it++) {
                // for(it = this.mob2.card.begin(); it != this.mob2.card.end(); it++) {
                    if(this.SecondJuder(this.mob2.card[it])) {
                        findval = this.mob2.card[it];
                        this.lastshowcard = this.mob2.card[it];

                        this.ShowCard(2, findval);

                        //居中显示
                        this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                        this.JudgeDir();
                        //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                        //shuffle[shufflecount] = findval;
                        //shufflecount++;

                        if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                            if(this.lastshowcard == 313) {
                                for(let j = 301; j<= 313; j++) {
                                    this.mob2.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 413) {
                                for(let j = 401; j<= 413; j++) {
                                    this.mob2.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 113) {
                                for(let j = 101; j<= 113; j++) {
                                    this.mob2.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 213) {
                                for(let j = 201; j<= 213; j++) {
                                    this.mob2.subTheCard(j);
                                }
                            }
                        }
                        else {
                            this.mob2.subTheCard(this.lastshowcard);
                        }
                        this.UpdateMobNumber(2, this.mob2.cardamount);
                        if(this.mob2.cardamount == 1) {
                            msMoudle.playSound("res/Sound/oneCard.lastcard");
                            Laya.timer.clear(this, this.lastcardAni);
                            this.lastcardAni(0);
                        }
                        else if(this.mob2.cardamount == 0) {
                            this.ShowScore();
                        }
                        //mob2cardcount = this.mob2.cardamount;
                        return true;
                    }
                }
            }
            else if(i == 3) {
                for(let it:number = 0; it < this.mob3.card.length; it++) {
                // for(it = mob3.card.begin(); it != mob3.card.end(); it++) {
                    if(this.SecondJuder(this.mob3.card[it])) {
                        findval = this.mob3.card[it];
                        this.lastshowcard = this.mob3.card[it];
                        this.ShowCard(3, findval);
                        //居中显示
                        this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                        this.JudgeDir();
                        //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                        //shuffle[shufflecount] = findval;
                        //shufflecount++;

                        if(this.lastshowcard == 113 || this.lastshowcard == 213 || this.lastshowcard == 313 || this.lastshowcard == 413) {
                            if(this.lastshowcard == 313) {
                                for(let j = 301; j<= 313; j++) {
                                    this.mob3.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 413) {
                                for(let j = 401; j<= 413; j++) {
                                    this.mob3.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 113) {
                                for(let j = 101; j<= 113; j++) {
                                    this.mob3.subTheCard(j);
                                }
                            }
                            else if(this.lastshowcard == 213) {
                                for(let j = 201; j<= 213; j++) {
                                    this.mob3.subTheCard(j);
                                }
                            }
                        }
                        else {
                            this.mob3.subTheCard(this.lastshowcard);
                        }
                        this.UpdateMobNumber(3, this.mob3.cardamount);
                        if(this.mob3.cardamount == 1) {
                            msMoudle.playSound("res/Sound/oneCard.lastcard");
                            Laya.timer.clear(this, this.lastcardAni);
                            this.lastcardAni(0);
                        }
                        else if(this.mob3.cardamount == 0) {
                            this.ShowScore();
                        }
                        //mob3cardcount = mob3.cardamount;
                        return true;
                    }
                }
            }

            return false;
        }

        AddCard(i:number, n:number) : void {
            if(i == 0) {
                /////这里有问题
                for(let it:number = 0; it < this.hero.card.length; it++) {
                    if(this.herocardsp[it]) {
                        this.herocardsp[it].skin = "";
                    }
                }
                if(this.cardcount > n) {
                    this.hero.addCard(n, this.GetArray(n));
                    if(this.hero.cardamount > 12) {
                        this.ShowScore();
                    }
                }
                else {
                    this.hero.addCard(this.cardcount, this.GetArray(this.cardcount));
                    this.ShowScore();
                }
                this.herocardcount = 0;
                for(let it:number = 0; it < this.hero.card.length; it++) {
                    if(!this.herocardsp[this.herocardcount]) {
                        this.herocardsp[this.herocardcount] = new Laya.Image();
                        this.herocardsp[this.herocardcount].pos(this.hero.herocard_x + this.herocardcount * 40, this.hero.herocard_y);
                        this.herocardsp[this.herocardcount].on(Laya.Event.CLICK, this, this.touchBegin, [this.herocardcount]);
                        this.addChild(this.herocardsp[this.herocardcount]);
                    }
                    this.herocardsp[this.herocardcount].skin = "res/MiniGame/" + this.hero.card[it] + ".png";
                    this.herocardcount++;
                }
            }
            else if(i == 1) {
                if(this.cardcount > n) {
                    this.mob1.addCard(n, this.GetArray(n));
                }
                else {
                    this.mob1.addCard(this.cardcount, this.GetArray(this.cardcount));
                    this.ShowScore();
                }
                this.UpdateMobNumber(1, this.mob1.cardamount);
            }
            else if(i == 2) {
                if(this.cardcount > n) {
                    this.mob2.addCard(n, this.GetArray(n));
                }
                else {
                    this.mob2.addCard(this.cardcount, this.GetArray(this.cardcount));
                    this.ShowScore();
                }
                this.UpdateMobNumber(2, this.mob2.cardamount);
            }
            else if(i == 3) {
                if(this.cardcount > n) {
                    this.mob3.addCard(n, this.GetArray(n));
                }
                else {
                    this.mob3.addCard(this.cardcount, this.GetArray(this.cardcount));
                    this.ShowScore();
                }
                this.UpdateMobNumber(3, this.mob3.cardamount);
            }
        }

        normalcardAni(frame:number) : void {
            if(frame >= 5) {
                frame = 0;
                this.normalcard.skin = "";
                return ;
            }
            this.normalcard.skin = "res/MiniGame/mapleOneCard.Custom.0.Hand.me.getani." + frame + ".png";
            Laya.timer.once(90, this, this.normalcardAni, [frame + 1], true);
        }

        magiccardAni(frame:number) : void {
            if(frame >= 7) {
                frame = 0;
                this.magiccard.skin = "";
                return ;
            }
            this.magiccard.skin = "res/MiniGame/mapleOneCard.Effect.magiccard." + frame + ".png";
            Laya.timer.once(90, this, this.magiccardAni, [frame + 1], true);
        }

        reverseAni(frame:number) : void {
            if(frame >= 18) {
                frame = 0;
                this.reverse.skin = "";
                return ;
            }
            this.reverse.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.reverseTurn." + frame + ".png";
            Laya.timer.once(90, this, this.reverseAni, [frame + 1], true);
        }
        yellowAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.yellow.skin = "";
                return ;
            }
            this.yellow.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.michael." + frame + ".png";
            Laya.timer.once(90, this, this.yellowAni, [frame + 1], true);
        }
        redAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.red.skin = "";
                return ;
            }
            this.red.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.oz." + frame + ".png";
            Laya.timer.once(90, this, this.redAni, [frame + 1], true);
        }
        blueAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.blue.skin = "";
                return ;
            }
            this.blue.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.hawkeye." + frame + ".png";
            Laya.timer.once(90, this, this.blueAni, [frame + 1], true);
        }
        greenAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.green.skin = "";
                return ;
            }
            this.green.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.irina." + frame + ".png";
            Laya.timer.once(90, this, this.greenAni, [frame + 1], true);
        }

        //change
        changeAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.change.skin = "";
                return ;
            }
            this.change.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.icart." + frame + ".png";
            Laya.timer.once(90, this, this.changeAni, [frame + 1], true);
        }

        //lastcard
        lastcardAni(frame:number) : void {
            if(frame >= 8) {
                frame = 0;
                this.lastcard.skin = "";
                return ;
            }
            this.lastcard.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.lastcard." + frame + ".png";
            Laya.timer.once(90, this, this.lastcardAni, [frame + 1], true);
        }

        clickAni(frame:number) : void {
            if(frame >= 7) {
                frame = 0;
            }
            this.clickcard.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.click." + frame + ".png";
            Laya.timer.once(90, this, this.clickAni, [frame + 1], true);
        }

        winAni(frame:number) : void {
            if(frame >= 20) {
                frame = 0;
                this.win.skin = "";
                return ;
            }
            this.win.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.victory." + frame + ".png";
            Laya.timer.once(90, this, this.winAni, [frame + 1], true);
            //
        }

        // loseAni(frame:number) : void {
        //     if(frame >= 20) {
        //         frame = 0;
        //         this.lose.skin = "";
        //         return ;
        //     }
        //     this.lose.skin = "res/MiniGame/mapleOneCard.Effect.screeneff.victory." + frame + ".png";
        //     Laya.timer.once(90, this, this.loseAni, [frame + 1], true);
        //     //
        // }

        ShowCard(i:number, findval:number) : void {
            if(i == 1) {
                //如果出的牌是数字
                if((findval >= 101 && findval <= 106) || (findval >= 201 && findval <= 206) || (findval >= 301 && findval <= 306) || (findval >= 401 && findval <= 406) ) {
                    msMoudle.playSound("res/Sound/oneCard.card_knight");
                    this.normalcardAni(0);
                }
                else {
                    msMoudle.playSound("res/Sound/oneCard.card_magic");
                    this.magiccardAni(0);
                    //如果出的牌时翻转
                    if(findval == 110 || findval == 210 || findval == 310 || findval == 410) {
                        msMoudle.playSound("res/Sound/oneCard.reverse2");
                        Laya.timer.clear(this, this.reverseAni);
                        this.reverseAni(0);
                        ////这个要注意
                        // this.removeChildByTag(2);
                        if(this.gamedir == LEFT) {
                            this.gamedir = RIGHT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.0.png"
                        }
                        else if(this.gamedir == RIGHT) {
                            this.gamedir = LEFT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.1.png";
                        }
                    }
                    //如果出的牌是黄
                    else if(findval == 413) {
                        Laya.timer.clear(this, this.yellowAni);
                        this.yellowAni(0);
                        //SubCardByColor(i, YELLOW);
                    }
                    //如果出的牌是蓝
                    else if(findval == 113) {
                        Laya.timer.clear(this, this.blueAni);
                        this.blueAni(0);
                        //SubCardByColor(i, BLUE);
                    }
                    //如果出的牌是红
                    else if(findval == 313) {
                        Laya.timer.clear(this, this.redAni);
                        this.redAni(0);
                        //SubCardByColor(i, RED);
                    }
                    //如果出的牌是绿
                    else if(findval == 213) {
                        Laya.timer.clear(this, this.greenAni);
                        this.greenAni(0);
                        //SubCardByColor(i, GREEN);
                    }
                    //攻击1
                    else if(findval == 107 || findval == 207 || findval == 307 || findval == 407){
                        if(this.gamedir == LEFT) {
                            this.AddCard(0, 2);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(2, 2);
                        }
                    }
                    //攻击2
                    else if(findval == 108 || findval == 208 || findval == 308 || findval == 408) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(0, 3);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(2, 3);
                        }
                    }
                    //跳过
                    else if(findval == 111 || findval == 211 || findval == 311 || findval == 411) {
                        this.JudgeDir1();
                    }
                    //攻击1跳过
                    else if(findval == 112 || findval == 212 || findval == 312 || findval == 412) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(0, 1);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(2, 1);
                        }
                        this.JudgeDir1();
                    }
                }
            }
            else if(i == 2) {
                //如果出的牌是数字
                if((findval >= 101 && findval <= 106) || (findval >= 201 && findval <= 206) || (findval >= 301 && findval <= 306) || (findval >= 401 && findval <= 406) ) {
                    msMoudle.playSound("res/Sound/oneCard.card_knight");
                    this.normalcardAni(0);
                }
                else {
                    msMoudle.playSound("res/Sound/oneCard.card_magic");
                    this.magiccardAni(0);
                    //如果出的牌时翻转
                    if(findval == 110 || findval == 210 || findval == 310 || findval == 410) {
                        msMoudle.playSound("res/Sound/oneCard.reverse2");
                        Laya.timer.clear(this, this.reverseAni);
                        this.reverseAni(0);

                        // this.removeChildByTag(2);
                        if(this.gamedir == LEFT) {
                            this.gamedir = RIGHT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.0.png";
                        }
                        else if(this.gamedir == RIGHT) {
                            this.gamedir = LEFT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.1.png";
                        }
                    }
                    //如果出的牌是黄
                    else if(findval == 413) {
                        Laya.timer.clear(this, this.yellowAni);
                        this.yellowAni(0);
                        //SubCardByColor(i, YELLOW);
                    }
                    //如果出的牌是蓝
                    else if(findval == 113) {
                        Laya.timer.clear(this, this.blueAni);
                        this.blueAni(0);
                        //SubCardByColor(i, BLUE);
                    }
                    //如果出的牌是红
                    else if(findval == 313) {
                        Laya.timer.clear(this, this.redAni);
                        this.redAni(0);
                        //SubCardByColor(i, RED);
                    }
                    //如果出的牌是绿
                    else if(findval == 213) {
                        Laya.timer.clear(this, this.greenAni);
                        this.greenAni(0);
                        //SubCardByColor(i, GREEN);
                    }

                    //攻击1
                    else if(findval == 107 || findval == 207 || findval == 307 || findval == 407){
                        if(this.gamedir == LEFT) {
                            this.AddCard(1, 2);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(3, 2);
                        }
                    }
                    //攻击2
                    else if(findval == 108 || findval == 208 || findval == 308 || findval == 408) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(1, 3);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(3, 3);
                        }
                    }
                    //跳过
                    else if(findval == 111 || findval == 211 || findval == 311 || findval == 411) {
                        this.JudgeDir1();
                    }
                    //攻击1跳过
                    else if(findval == 112 || findval == 212 || findval == 312 || findval == 412) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(1, 1);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(3, 1);
                        }
                        this.JudgeDir1();
                    }
                }
            }
            else if(i == 3) {
                //如果出的牌是数字
                if((findval >= 101 && findval <= 106) || (findval >= 201 && findval <= 206) || (findval >= 301 && findval <= 306) || (findval >= 401 && findval <= 406) ) {
                    msMoudle.playSound("res/Sound/oneCard.card_knight");
                    this.normalcardAni(0);
                }
                else {
                    msMoudle.playSound("res/Sound/oneCard.card_magic");
                    this.magiccardAni(0);
                    //如果出的牌时翻转
                    if(findval == 110 || findval == 210 || findval == 310 || findval == 410) {
                        msMoudle.playSound("res/Sound/oneCard.reverse2");
                        Laya.timer.clear(this, this.reverseAni);
                        this.reverseAni(0);

                        // this.removeChildByTag(2);
                        if(this.gamedir == LEFT) {
                            this.gamedir = RIGHT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.0.png";
                        }
                        else if(this.gamedir == RIGHT) {
                            this.gamedir = LEFT;
                            this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.1.png";
                        }
                    }
                    //如果出的牌是黄
                    else if(findval == 413) {
                        Laya.timer.clear(this, this.yellowAni);
                        this.yellowAni(0);
                        //SubCardByColor(i, YELLOW);
                    }
                    //如果出的牌是蓝
                    else if(findval == 113) {
                        Laya.timer.clear(this, this.blueAni);
                        this.blueAni(0);
                        //SubCardByColor(i, BLUE);
                    }
                    //如果出的牌是红
                    else if(findval == 313) {
                        Laya.timer.clear(this, this.redAni);
                        this.redAni(0);
                        //SubCardByColor(i, RED);
                    }
                    //如果出的牌是绿
                    else if(findval == 213) {
                        Laya.timer.clear(this, this.greenAni);
                        this.greenAni(0);
                        //SubCardByColor(i, GREEN);
                    }
                    //攻击1
                    else if(findval == 107 || findval == 207 || findval == 307 || findval == 407){
                        if(this.gamedir == LEFT) {
                            this.AddCard(2, 2);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(0, 2);
                        }
                    }
                    //攻击2
                    else if(findval == 108 || findval == 208 || findval == 308 || findval == 408) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(2, 3);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(0, 3);
                        }
                    }
                    //跳过
                    else if(findval == 111 || findval == 211 || findval == 311 || findval == 411) {
                        this.JudgeDir1();
                    }
                    //攻击1跳过
                    else if(findval == 112 || findval == 212 || findval == 312 || findval == 412) {
                        if(this.gamedir == LEFT) {
                            this.AddCard(2, 1);
                        }
                        else if(this.gamedir == RIGHT) {
                            this.AddCard(0, 1);
                        }
                        this.JudgeDir1();
                    }
                }
            }
        }

        UpdateNumber(n:number) : void {
            this._cardnumber.text = n + "";
        }

        UpdateMobNumber(i:number, n:number) : void {
            if(i == 1) {
                this.mob1cardnumber.text = n + "";
            }
            else if(i == 2) {
                this.mob2cardnumber.text = n + "";
            }
            else if(i == 3) {
                this.mob3cardnumber.text = n + "";
            }
        }


        CalScore() : void {
            this.paiming = 1;
            if(this.hero.cardamount > this.mob3.cardamount) {
                this.paiming++;
            }
            if(this.hero.cardamount > this.mob2.cardamount) {
                this.paiming++;
            }
            if(this.hero.cardamount > this.mob1.cardamount) {
                this.paiming++;
            }
        }
        ShowScore() : void {
            Laya.timer.clear(this, this.update);
            Laya.timer.clear(this, this.loadingSchedule);
            Laya.timer.clear(this, this.loadingSchedule1);
            this.CalScore();
            if(this.paiming == 1) {
                msMoudle._(); msMoudle.updateRongYu(1000);
                this.winAni(0);
                msMoudle.playSound("res/Sound/rankResult.1st_01");
            }
            else if(this.paiming == 2) msMoudle.playSound("res/Sound/rankResult.2nd_01");
            else if(this.paiming == 3) msMoudle.playSound("res/Sound/rankResult.3rd_01");
            else if(this.paiming == 4) msMoudle.playSound("res/Sound/rankResult.4th_01");

            Laya.timer.once(1000, this, ()=> {
                ui.show(app.fuben.gameRes, {black:true});
            });
            return ;
        }

        paiming:number = 0;

        shuffle:Array<number> = [	//洗牌的卡组
            101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
            201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
            301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313,
            401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413
        ];

        card:Array<number> = [];
        herocardsp:Array<Laya.Image> = [];
        herocardcount:number = 0;
        shufflecount:number = 52;//洗牌的数量
        cardcount:number = 0;	  //牌堆的数量

        //获取从牌组中拿出的牌的数组
        GetArray(n:number) : any {
            let get:Array<number> = [];
            //要特殊判断是否拿完
            for(let i:number = this.card.length - 1; i >= 0; i--) {
                get[get.length] = this.card[i];
            }
            for(let i:number = 0; i < n; i++) {
                if(this.card.length > 0) {
                    this.card.pop();
                    this.cardcount--;
                }
            }
            this.UpdateNumber(this.cardcount);
            return get;
        }

        prc:number = 100;
        // void gotime();//开始游戏定时器

        //逐帧更新
        update(){
            if(this.flag == true) {
                //玩家1的回合
                if(this.mob1.state == MYTURN && this.prc == 0) {
                    //当出的是第一张牌的时候
                    if(this.onecard == true) {
                        this.onecard = false;
                        this.FirstPress(1);
                        this.JudgeDir();
                    }
                    else {
                        if(this.SecondPress(1) == false) {
                            this.AddCard(1, 1);
                            this.JudgeDir();
                        }
                    }
                    this.prc = 100;
                }
                //玩家2的回合
                else if(this.mob2.state == MYTURN && this.prc == 0) {
                    //当出的是第一张牌的时候
                    if(this.onecard == true) {
                        this.onecard = false;
                        this.FirstPress(2);
                        this.JudgeDir();
                    }
                    else {
                        if(this.SecondPress(2) == false) {
                            this.AddCard(2, 1);
                            this.JudgeDir();
                        }
                    }
                    this.prc = 100;
                }
                //玩家3的回合
                else if(this.mob3.state == MYTURN && this.prc == 0) {
                    //当出的是第一张牌的时候
                    if(this.onecard == true) {
                        this.onecard = false;
                        this.FirstPress(3);
                        this.JudgeDir();
                    }
                    else {
                        if(this.SecondPress(3) == false) {
                            this.AddCard(3, 1);
                            this.JudgeDir();
                        }
                    }
                    this.prc = 100;
                }
            }
        }

        onBtnCardClick(e: Laya.Event): void {
            if(this.flag == true) {
                if(this.hero.state == MYTURN && this.prc > 0 && this.draw == false) {
                    msMoudle.playSound("res/Sound/oneCard.card_knight");
                    this.clickcard.skin = "";
                    Laya.timer.clear(this, this.clickAni);
                    this.probar.width = 0;
                    this.prc = 100;
                    this.AddCard(0, 1);
                    this.JudgeDir();
                }
            }
        }

        //设备多点触碰
        touchBegin(i:number) : void {
            if(this.flag == true) {
                if(this.hero.state == MYTURN && this.prc > 0 && this.draw == false) {
                    //找到点击的牌的序列
                    let findval = this.hero.card[i];
                    if(this.SecondJuder(findval) == true) {
                        this.clickcard.skin = "";
                        Laya.timer.clear(this, this.clickAni);
                        //如果出的牌是数字
                        if((findval >= 101 && findval <= 106) || (findval >= 201 && findval <= 206) || (findval >= 301 && findval <= 306) || (findval >= 401 && findval <= 406) ) {
                            msMoudle.playSound("res/Sound/oneCard.card_knight");
                            Laya.timer.clear(this, this.normalcardAni);
                            this.normalcardAni(0);
                        }
                        else {
                            msMoudle.playSound("res/Sound/oneCard.card_magic");
                            Laya.timer.clear(this, this.magiccardAni);
                            this.magiccardAni(0);

                            //如果出的牌时翻转
                            if(findval == 110 || findval == 210 || findval == 310 || findval == 410) {
                                msMoudle.playSound("res/Sound/oneCard.reverse2");

                                Laya.timer.clear(this, this.reverseAni);
                                this.reverseAni(0);
                                if(this.gamedir == LEFT) {
                                    this.gamedir = RIGHT;
                                    this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.0.png";
                                }
                                else if(this.gamedir == RIGHT) {
                                    this.gamedir = LEFT;
                                    this.sp_dir.skin = "res/MiniGame/mapleOneCard.Board.direction.1.png";
                                }
                            }
                            //如果出的牌时变色
                            else if(findval == 109 || findval == 209 || findval == 309 || findval == 409) {
                                this.color_change = true;

                                let rnk = msMoudle.getRandValue(0, 0, 4);
                                if(rnk == 0) this.btn_blue();
                                else if(rnk == 1) this.btn_green();
                                else if(rnk == 2) this.btn_red();
                                else if(rnk == 3) this.btn_yellow();

                                // Button* btn1 = (Button*)Helper::seekWidgetByName(myLayout, "blue");
                                // btn1.addTouchEventListener(this, toucheventselector(MINI::btn_blue));

                                // Button* btn2 = (Button*)Helper::seekWidgetByName(myLayout, "green");
                                // btn2.addTouchEventListener(this, toucheventselector(MINI::btn_green));

                                // Button* btn3 = (Button*)Helper::seekWidgetByName(myLayout, "red");
                                // btn3.addTouchEventListener(this, toucheventselector(MINI::btn_red));

                                // Button* btn4 = (Button*)Helper::seekWidgetByName(myLayout, "yellow");
                                // btn4.addTouchEventListener(this, toucheventselector(MINI::btn_yellow));
                            }
                            //如果出的牌是黄
                            else if(findval == 413) {
                                //SubCardByColor(0, YELLOW);
                                Laya.timer.clear(this, this.yellowAni);
                                this.yellowAni(0);
                            }
                            //如果出的牌是蓝
                            else if(findval == 113) {
                                Laya.timer.clear(this, this.blueAni);
                                this.blueAni(0);
                                //SubCardByColor(0, BLUE);
                            }
                            //如果出的牌是红
                            else if(findval == 313) {
                                Laya.timer.clear(this, this.redAni);
                                this.redAni(0);
                                //SubCardByColor(0, RED);
                            }
                            //如果出的牌是绿
                            else if(findval == 213) {
                                Laya.timer.clear(this, this.greenAni);
                                this.greenAni(0);
                                //SubCardByColor(0, GREEN);
                            }
                            //攻击1
                            else if(findval == 107 || findval == 207 || findval == 307 || findval == 407){
                                if(this.gamedir == LEFT) {
                                    this.AddCard(3, 2);
                                }
                                else if(this.gamedir == RIGHT) {
                                    this.AddCard(1, 2);
                                }
                            }
                            //攻击2
                            else if(findval == 108 || findval == 208 || findval == 308 || findval == 408) {
                                if(this.gamedir == LEFT) {
                                    this.AddCard(3, 3);
                                }
                                else if(this.gamedir == RIGHT) {
                                    this.AddCard(1, 3);
                                }
                            }
                            //跳过
                            else if(findval == 111 || findval == 211 || findval == 311 || findval == 411) {
                                this.JudgeDir1();
                            }
                            //攻击1跳过
                            else if(findval == 112 || findval == 212 || findval == 312 || findval == 412) {
                                if(this.gamedir == LEFT) {
                                    this.AddCard(3, 1);
                                }
                                else if(this.gamedir == RIGHT) {
                                    this.AddCard(1, 1);
                                }
                                this.JudgeDir1();
                            }
                        }
                        //出牌显示在中间
                        if(findval != 109 && findval != 209 && findval != 309 && findval != 409) {
                            this.lastshowcard = findval;
                            this.showcard.skin = "res/MiniGame/" + this.lastshowcard + ".png";
                            this.prc = 100;
                            this.probar.width = 0;
                            //玩家转换
                            this.JudgeDir();
                        }
                        //这里是不是忘记了,暂时也没有什么作用
                        //从手牌中中删除这张牌到待洗牌组,分别是显示的sp和hero中的card
                        //shuffle[shufflecount] = findval;
                        //shufflecount++;
                        //将其他手牌重组(直接删除重新读牌)
                        for(let i:number = 0; i < this.hero.card.length; i++) {
                            if(this.herocardsp[i]) {
                                this.herocardsp[i].skin = "";
                            }
                        }
                        if(findval == 113 || findval == 213 || findval == 313 || findval == 413) {
                            if(findval == 313) {
                                for(let j = 301; j<= 313; j++) {
                                    this.hero.subTheCard(j);
                                }
                            }
                            else if(findval == 413) {
                                for(let j = 401; j<= 413; j++) {
                                    this.hero.subTheCard(j);
                                }
                            }
                            else if(findval == 113) {
                                for(let j = 101; j<= 113; j++) {
                                    this.hero.subTheCard(j);
                                }
                            }
                            else if(findval == 213) {
                                for(let j = 201; j<= 213; j++) {
                                    this.hero.subTheCard(j);
                                }
                            }
                        }
                        else {
                            this.hero.subTheCard(findval);
                        }
                        //
                        this.herocardcount = 0;
                        for(let it:number = 0; it < this.hero.card.length; it++) {
                            if(this.herocardsp[this.herocardcount]) {
                                this.herocardsp[this.herocardcount].skin = "res/MiniGame/" + this.hero.card[it] + ".png";
                            }
                            this.herocardcount++;
                        }
                        // CCLog("hero.cardamount----------%d", hero.cardamount);
                        //判断是否最后一张牌，还是胜利或者失败
                        // if(findval != 109 && findval != 209 && findval != 309 && findval != 409) {
                            if(this.hero.cardamount == 1) {
                                msMoudle.playSound("res/Sound/oneCard.lastcard");
                                Laya.timer.clear(this, this.lastcardAni);
                                this.lastcardAni(0);
                            }
                            else if(this.hero.cardamount == 0) {
                                this.ShowScore();
                            }
                        // }
                        return ;
                    }
                }
            }
        }

        btn_blue() : void {
            msMoudle.playSound("res/Sound/oneCard.card_magic");
            this.lastshowcard = 109;
            //出牌显示在中间
            if(this.hero.cardamount == 1) {
                msMoudle.playSound("res/Sound/oneCard.lastcard");
                Laya.timer.clear(this, this.lastcardAni);
                this.lastcardAni(0);
            }
            else if(this.hero.cardamount == 0) {
                this.ShowScore();
            }
            this.showcard.skin = "res/MiniGame/" + this.lastshowcard +".png";
            this.prc = 100;
            this.probar.width = 0;
            this.color_change = false;
            //玩家转换
            this.JudgeDir();
        }
        btn_green() : void {
            msMoudle.playSound("res/Sound/oneCard.card_magic");
            this.lastshowcard = 209;
            //出牌显示在中间
            if(this.hero.cardamount == 1) {
                msMoudle.playSound("res/Sound/oneCard.lastcard");
                Laya.timer.clear(this, this.lastcardAni);
                this.lastcardAni(0);
            }
            else if(this.hero.cardamount == 0) {
                this.ShowScore();
            }
            this.showcard.skin = "res/MiniGame/" + this.lastshowcard +".png";
            this.prc = 100;
            this.probar.width = 0;
            this.color_change = false;
            //玩家转换
            this.JudgeDir();
        }
        btn_red() : void {
            msMoudle.playSound("res/Sound/oneCard.card_magic");
            this.lastshowcard = 309;
            //出牌显示在中间
            if(this.hero.cardamount == 1) {
                msMoudle.playSound("res/Sound/oneCard.lastcard");
                Laya.timer.clear(this, this.lastcardAni);
                this.lastcardAni(0);
            }
            else if(this.hero.cardamount == 0) {
                this.ShowScore();
            }
            this.showcard.skin = "res/MiniGame/" + this.lastshowcard +".png";
            this.prc = 100;
            this.probar.width = 0;
            this.color_change = false;
            //玩家转换
            this.JudgeDir();
        }
        btn_yellow() : void {
            msMoudle.playSound("res/Sound/oneCard.card_magic");
            this.lastshowcard = 409;
            //出牌显示在中间
            if(this.hero.cardamount == 1) {
                msMoudle.playSound("res/Sound/oneCard.lastcard");
                Laya.timer.clear(this, this.lastcardAni);
                this.lastcardAni(0);
            }
            else if(this.hero.cardamount == 0) {
                this.ShowScore();
            }
            this.showcard.skin = "res/MiniGame/" + this.lastshowcard +".png";
            this.prc = 100;
            this.probar.width = 0;
            this.color_change = false;
            //玩家转换
            this.JudgeDir();
        }

        lastcardani:Laya.Image;
        flag:boolean = false;

        //改变牌的颜色
        lastshowcard:number;

        constructor(){
            super();
        }


        onInitialize(){

        }

        updateData(){}

        public clearUp() : void {
            Laya.timer.clear(this, this.update);
            Laya.timer.clear(this, this.loadingSchedule);
            Laya.timer.clear(this, this.loadingSchedule1);
            if(this.hero) this.hero.onClose();
            if(this.mob1) this.mob1.onClose();
            if(this.mob2) this.mob2.onClose();
            if(this.mob3) this.mob3.onClose();
            for(let i:number = 0; i < this.res.length; i++) {
                Laya.loader.clearRes(this.res[i].url);
            }
            this.res = [];
        }

        res:Array<any> = [];
        public loadGame() : void {
            this.res = [];
            //下一个
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.status.next.loop." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.status.next.loop." + i + ".png"});
            }
            //我的回合
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.status.myturn.loop." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.status.myturn.loop." + i + ".png"});
            }
            //normal
            for(let i:number = 0; i < 5; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Custom.0.Hand.me.getani." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Custom.0.Hand.me.getani." + i + ".png"});
            }
            //magic
            for(let i:number = 0; i < 7; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.magiccard." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.magiccard." + i + ".png"});
            }
            //click
            for(let i:number = 0; i < 6; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.click." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.click." + i + ".png"});
            }
            //win
            for(let i:number = 0; i < 20; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.victory." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.victory." + i + ".png"});
            }
            //reverse
            for(let i:number = 0; i < 18; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.reverseTurn." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.reverseTurn." + i + ".png"});
            }
            //yellow
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.michael." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.michael." + i + ".png"});
            }
            //blue
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.hawkeye." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.hawkeye." + i + ".png"});
            }
            //red
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.oz." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.oz." + i + ".png"});
            }
            //green
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.irina." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.irina." + i + ".png"});
            }
            //change
            for(let i:number = 0; i < 8; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.icart." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.icart." + i + ".png"});
            }
            //lastcard
            for(let i:number = 0; i < 19; i++) {
                if(!Laya.loader.getRes("res/MiniGame/mapleOneCard.Effect.screeneff.lastcard." + i + ".png"))
                this.res.push({ url: "res/MiniGame/mapleOneCard.Effect.screeneff.lastcard." + i + ".png"});
            }

            //所有的牌
            // for(let i:number = 0; i < 13; i++)
            //     res.push({ url: "res/MiniGame/" + (101 + i) + ".png"});
            // for(let i:number = 0; i < 13; i++)
            //     res.push({ url: "res/MiniGame/" + (201 + i) + ".png"});
            // for(let i:number = 0; i < 13; i++)
            //     res.push({ url: "res/MiniGame/" + (301 + i) + ".png"});
            // for(let i:number = 0; i < 13; i++)
            //     res.push({ url: "res/MiniGame/" + (401 + i) + ".png"});
            if(this.res.length > 0) {
                msLoad.load(this.res).done(dlg => {
                    this.startGame();
                });
            }
            else {
                this.startGame();
            }
        }

        startGame() : void {
            //背景
            this.gamedir = RIGHT;


            //加载玩家1(Susake)
            this.hero.InitBoard("res/MiniGame/custom.element.icon.3.0.0.png", ms.herodata.Name, 1);
            this.hero.ChangeBoardByState(MYTURN, true);
            this.hero.zOrder = 2;
            // this.hero.updateData(null, 0);
            //加载玩家2(东方不败)
            this.mob1.InitBoard("res/MiniGame/custom.element.icon.3.0.1.png", msMoudle.getRandomName(), 2);
            this.mob1.ChangeBoardByState(NEXT, false);
            this.mob1.zOrder = 2;
            // this.mob1.updateData(null, 1);
            //加载玩家3(午夜凶铃)
            this.mob2.InitBoard("res/MiniGame/custom.element.icon.3.0.2.png", msMoudle.getRandomName(), 3);
            this.mob2.ChangeBoardByState(WAIT, false);
            this.mob2.zOrder = 2;
            // this.mob2.updateData(null, 2);
            //加载玩家4(哈哈哈)
            this.mob3.InitBoard("res/MiniGame/custom.element.icon.3.0.3.png", msMoudle.getRandomName(), 4);
            this.mob3.ChangeBoardByState(WAIT, false);
            this.mob3.zOrder = 2;
            // this.mob3.updateData(null, 3);

            // //放置玩家1卡牌,牌数
            this.mob1card = new Laya.Image();
            this.mob1card.skin = "res/MiniGame/mapleOneCard.Custom.1.Hand.other.default.png";
            this.mob1card.pos(this.mob1.mob1card_x, this.mob1.mob1card_y);
            this.addChild(this.mob1card);
            //放置玩家2卡牌,牌数
            this.mob2card = new Laya.Image();
            this.mob2card.skin = "res/MiniGame/mapleOneCard.Custom.1.Hand.other.default.png";
            this.mob2card.pos(this.mob2.mob2card_x, this.mob2.mob2card_y);
            this.addChild(this.mob2card);
            //放置玩家3卡牌,牌数
            this.mob3card = new Laya.Image();
            this.mob3card.skin = "res/MiniGame/mapleOneCard.Custom.1.Hand.other.default.png";
            this.mob3card.pos(this.mob3.mob3card_x, this.mob3.mob3card_y);
            this.addChild(this.mob3card);
            // //洗牌
            this.ClearCard(52);

            this.mob1cardnumber = new Laya.Label();
            this.mob1card.addChild(this.mob1cardnumber);
            this.new_txt(this.mob1cardnumber, this.mob1card, "6", 20, 33, 50);
            this.mob2cardnumber = new Laya.Label();
            this.mob2card.addChild(this.mob2cardnumber);
            this.new_txt(this.mob2cardnumber, this.mob2card, "6", 20, 33, 50);
            this.mob3cardnumber = new Laya.Label();
            this.mob3card.addChild(this.mob3cardnumber);
            this.new_txt(this.mob3cardnumber, this.mob3card, "6", 20, 33, 50);

            //开始游戏倒计时
            this.AddCard(0, 6);
            this.AddCard(1, 6);
            this.AddCard(2, 6);
            this.AddCard(3, 6);
            //出牌倒计时
            Laya.timer.loop(100, this, this.loadingSchedule);
            Laya.timer.loop(10, this, this.loadingSchedule1);
            this.flag = true;

            msMoudle.playSound("res/Sound/oneCard.start");

            //逐帧更新
            Laya.timer.frameLoop(1, this, this.update);
        }

        loadingSchedule() : void {
            if(this.prc > 0){
                if(this.color_change == false && this.hero.state == MYTURN ) {
                    this.draw = false;
                    Laya.timer.clear(this, this.clickAni);
                    this.clickAni(0);
                    this.prc--;
                    this.probar.width = this.prc;
                }
            }
            else {
                if(this.hero.state == MYTURN) {
                    msMoudle.playSound("res/Sound/oneCard.card_knight");
                    this.clickcard.skin = "";
                    Laya.timer.clear(this, this.clickAni);
                    this.prc = 100;
                    this.probar.width = this.prc;
                    this.draw = false;
                    this.AddCard(0, 1);
                    this.JudgeDir();
                }
            }
        }
        loadingSchedule1() : void {
            if(this.prc > 0) {
                if(this.hero.state != MYTURN && this.color_change == false) {
                    this.draw = false;
                    this.prc--;
                    this.probar.width = this.prc;
                }
            }
            else {
                if(this.hero.state != MYTURN) {
                    this.draw = true;
                }
            }
        }

        public new_txt(txt:any, P:any, str:string, size:number = 20, x:number, y:number) : any {
            txt.text = str;
            txt.fontSize = size;
            txt.color = "#4750b0";
            txt.strokeColor = "#FFFFFF";
            txt.stroke = 2;
            txt.pos(x - txt.width / 2, y - txt.height / 2);
        }

        //洗牌
        ClearCard(n:number) : void {
            let key = 0;
            while(true) {
                let val = msMoudle.getRandValue(0, 0, n);
                if(this.shuffle[val] != -1) {
                    this.card.push(this.shuffle[val]);
                    this.shuffle[val] = -1;
                    key++;
                }
                if(key == n) break;//不一定是53张
            }
            this.shufflecount = 0;
            this.cardcount = n;
        }

        onClose() {

        }
        //
    }
}