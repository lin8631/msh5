/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    import cssCharacter = CharacterRole.Character;

    export class starPlanetRPS extends ui.fuben.starPlanetRPSUI implements ui.fuben.IstarPlanetRPSUI {
        public static className = "app.fuben.starPlanetRPS";
        private char:cssCharacter;
        private char2:cssCharacter;

        constructor(){
            super();
        }


        onInitialize(){

            this.updateData();
        }

        updateData(){


        }

        public clearUp() : void {
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            if(this.char2) {
                this.char2.clearUp();
                this.char2 = null;
            }
        }

        public loadGame() : void {
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
                this.char.changeAll(this.my, E, 0, 0);
                this.char.setDir(-1);
            }

            if(true) {
                ///随机形象
                this.char2 = new cssCharacter();
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
                    this.char2.m_ring = msMoudle.AllRing[msMoudle.getRandValue(0, 0, msMoudle.AllRing.length)];
                }
                this.char2.m_nametag_show = false;
                this.char2.changeAll(this.mob, E, 0, 0);
            }

            this.ls_txt.text = this.liansheng + "";
            this.score.text = "当前得分：" + this.jiajin;
            this.startGame();
        }

        startGame() : void {
            this.pro = 0;
            this.can_ = false;
            this.show1.skin = "";
            this.show2.skin = "";
            this.tpro.width = 0;
            this.res.skin = "";
            this.a1 = "石头";
            this.a2 = "石头";
            let hps:Array<any> = [this.hp1, this.hp2, this.hp3, this.hp4, this.hp5];
            for(let i:number = 0; i < hps.length; i++) hps[i].visible = false;
            for(let i:number = 0; i < this.hp; i++) hps[i].visible = true;
        }

        pro:number = 0;
        a1:string = "石头";
        a2:string = "石头";
        hp:number = 5;

        jiajin:number = 10000;
        liansheng:number = 0;
        Pro(pro:number) : void {
            if(this.pro < 1) {
                this.pro += 0.08;
                this.tpro.width += 20;
                Laya.timer.once(100, this, this.Pro);
            }
            else {
                this.tpro.width = 255;

                let rnk = msMoudle.getRandValue(0, 0, 3);
                if(rnk == 0) {
                    this.show2.skin = "res/MiniGame/starPlanetRPS_old.Npc.rock.png";
                    this.a2 = "石头";
                }
                else if(rnk == 1) {
                    this.show2.skin = "res/MiniGame/starPlanetRPS_old.Npc.scissor.png";
                    this.a2 = "剪刀";
                }
                else if(rnk == 2) {
                    this.show2.skin = "res/MiniGame/starPlanetRPS_old.Npc.paper.png";
                    this.a2 = "布";
                }

                //押金10000、弃权则不退还押金
                //每次输扣2000
                //每次胜利获得1000
                //连胜翻3倍
                //2-5连胜分别奖励为：3000,9000,27000,91000

                //2秒后重新开始游戏
                Laya.timer.once(1000, this, ()=> {
                    if(this.a1 == "石头") {
                        if(this.a2 == "石头") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.draw.png";
                            this.res_txt.text = "平局";
                            this.hp--;
                        }
                        else if(this.a2 == "剪刀") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.win.png";
                            this.liansheng++;
                            let winnum = 1000;
                            if(this.liansheng > 1) winnum = 3000 * (this.liansheng - 1);
                            msMoudle._(); msMoudle.updateJinBi(winnum);
                            this.res_txt.text = "胜利！+" + winnum + "金币";
                            this.jiajin += winnum;
                            this.hp--;
                        }
                        else if(this.a2 == "布") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.lose.png";
                            this.hp--;
                            this.jiajin -= 2000;
                            this.liansheng = 0;
                            if(ms.jinbi() >= 2000) {
                                msMoudle._(); msMoudle.updateJinBi(-2000);
                            }
                            this.res_txt.text = "失败！-2000金币";
                        }
                    }
                    else if(this.a1 == "剪刀") {
                        if(this.a2 == "石头") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.lose.png";
                            this.hp--;
                            this.jiajin -= 2000;
                            this.liansheng = 0;
                            if(ms.jinbi() >= 2000) {
                                msMoudle._(); msMoudle.updateJinBi(-2000);
                            }
                        }
                        else if(this.a2 == "剪刀") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.draw.png";
                            this.res_txt.text = "平局";
                            this.hp--;
                        }
                        else if(this.a2 == "布") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.win.png";
                            this.liansheng++;
                            let winnum = 1000;
                            if(this.liansheng > 1) winnum = 3000 * (this.liansheng - 1);
                            this.jiajin += winnum;
                            msMoudle._(); msMoudle.updateJinBi(winnum);
                            this.res_txt.text = "胜利！+" + winnum + "金币";
                            this.hp--;
                        }
                    }
                    else if(this.a1 == "布") {
                        if(this.a2 == "石头") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.win.png";
                            this.liansheng++;
                            let winnum = 1000;
                            if(this.liansheng > 1) winnum = 3000 * (this.liansheng - 1);
                            this.jiajin += winnum;
                            msMoudle._(); msMoudle.updateJinBi(winnum);
                            this.res_txt.text = "胜利！+" + winnum + "金币";
                            this.hp--;
                        }
                        else if(this.a2 == "剪刀") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.lose.png";
                            this.hp--;
                            this.jiajin -= 2000;
                            this.liansheng = 0;
                            if(ms.jinbi() >= 2000) {
                                msMoudle._(); msMoudle.updateJinBi(-2000);
                            }
                        }
                        else if(this.a2 == "布") {
                            this.res.skin = "res/MiniGame/starPlanetRPS_old.draw.png";
                            this.res_txt.text = "平局";
                            this.hp--;
                        }
                    }

                    this.ls_txt.text = this.liansheng + "";
                    this.score.text = "当前得分：" + this.jiajin;

                    if(this.hp <= 0) {
                        let hps:Array<any> = [this.hp1, this.hp2, this.hp3, this.hp4, this.hp5];
                        for(let i:number = 0; i < hps.length; i++) hps[i].visible = false;
                        for(let i:number = 0; i < this.hp; i++) hps[i].visible = true;
                    }
                    Laya.timer.once(1000, this, ()=> {
                        if(this.hp <= 0) {
                            // msMoudle.toast("生命值已用尽！");
                            // ui.manager.getDialogByName("app.fuben.huodongDlg").dlg.close();
                            ui.show(app.fuben.gameRes, {black:true});
                        }
                        else {
                            this.startGame();
                        }
                    });
                });

                Laya.timer.clear(this, this.Pro);
            }
        }

        can_:boolean = false;
        onBtnSTClick(e: Laya.Event): void {
            if(this.can_ == false) {
                this.show1.skin = "res/MiniGame/starPlanetRPS_old.Me.Frock.png";
                this.a1 = "石头";
                this.can_ = true;
                Laya.timer.once(100, this, this.Pro);
            }
            else {
                msMoudle.toast("你已经选择了");
            }
        }
        onBtnJDClick(e: Laya.Event): void {
            if(this.can_ == false) {
                this.show1.skin = "res/MiniGame/starPlanetRPS_old.Me.Fscissor.png";
                this.a1 = "剪刀";
                this.can_ = true;
                Laya.timer.loop(100, this, this.Pro);
            }
            else {
                msMoudle.toast("你已经选择了");
            }
        }
        onBtnBClick(e: Laya.Event): void {
            if(this.can_ == false) {
                this.show1.skin = "res/MiniGame/starPlanetRPS_old.Me.Fpaper.png";
                this.a1 = "布";
                this.can_ = true;
                Laya.timer.loop(100, this, this.Pro);
            }
            else {
                msMoudle.toast("你已经选择了");
            }
        }

        onClose() {
            Laya.timer.clear(this, this.Pro);
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
        }
        //
    }
}