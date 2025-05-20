module NumberRole {

    export class Number extends Laya.Sprite {

        // private timeLine : Array<any> = [];
        private show:Array<any> = [];
        private hitAni:Laya.Image;
        private m_parent:any;
        private totalCnt = 0;
        private cmpCnt = 0;

        showEff:boolean = false;
        public ShowNumber(P:any, data:any, x:number, y:number, type:any, numbertype:any, m_id:string = null, skill:boolean = false):void {
            if(m_id && m_id == ms.user) {
                this.showEff = true;
            }
            this.m_parent = P;
            this.show.length = 0;
            //伤害次数
            for(let i:number = 0; i < data.length; i++) {
                let offsetX = 0;
                let nowtime = Math.random();
                if(nowtime < 0.5) offsetX = -offsetX;
                // this.timeLine[i] = new Array();
                this.show[i] = new Array();
                //具体伤害
                if(data[i].num == 0 && numbertype == 1) {   //miss
                    this.show[i][0] = new Laya.Sprite();
                    // this.timeLine[i][0] = new Laya.TimeLine();
                    let texture = new Laya.Texture();
                    if(type == 2) {
                        if(ms.numberEff == 0 || this.showEff == false) {
                            texture = Laya.loader.getRes("BasicEff/NoRed0.Miss.png");
                        }
                        else {
                            texture = Laya.loader.getRes("res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0.Miss.png");
                        }

                    }
                    else if(type == 1) texture = Laya.loader.getRes("BasicEff/NoViolet0.Miss.png");
                    this.show[i][0].texture = texture;
                    this.show[i][0].pivot(texture.width / 2, texture.height / 2).pos(x + texture.width / 2, y + 40 * i);
                    this.m_parent.addChild(this.show[i][0]);
                    this.show[i][0].zOrder = 200000;        //boss防治挡住
                    texture = null;
                    //该序号向上逐渐消失
                    // this.timeLine[i][0].addLabel("hitnumber_1_" + i + "_0_" ,0).to(this.show[i][0],{scaleX: 1.2,scaleY: 1.2, y:y + 40 * (0 - i) - 50, alpha: 255 / 255}, 250, null, 0)
                    // this.timeLine[i][0].addLabel("hitnumber_2_" + i + "_0_" ,0).to(this.show[i][0],{scaleX: 0.6,scaleY: 0.6, x:x - offsetX, y:y + 40 * (0 - i) - 100, alpha: 0}, 250, null, 0)
                    ++this.totalCnt;
                    Laya.Tween.to(this.show[i][0],{scaleX: 1.2,scaleY: 1.2, y:y + 40 * (0 - i) - 50, alpha: 255 / 255}, 250, null, Laya.Handler.create(this, ()=>{
                        Laya.Tween.to(this.show[i][0],{scaleX: 0.6,scaleY: 0.6, x:x - offsetX, y:y + 40 * (0 - i) - 100, alpha: 0}, 250, null, Laya.Handler.create(this, this.onComplete, [parent, i, 0]))
                    }, []))
                }
                else {
                    //分析数字
                    let len = data[i].num.toFixed(0).length;
                    let shownum = data[i].num;
                    let showstr = shownum.toFixed(0);
                    let allX = 0;
                    for(let t:number = 0; t < len; t++) {
                        let size = 1;
                        this.show[i][t] = new Laya.Sprite();
                        // this.timeLine[i][t] = new Laya.TimeLine();
                        let texture = new Laya.Texture();
                        if(numbertype == 1) {
                            if(type == 2) {


                                //damageSkin.1377.NoCri1.1
                                //damageSkin.1377.NoRed0.2

                                //自己的伤害
                                if(ms.numberEff == 0 || this.showEff == false) {
                                    if(data[i].bj == true) texture = Laya.loader.getRes("BasicEff/NoCri1." + showstr[t] + ".png");
                                    else texture = Laya.loader.getRes("BasicEff/NoRed0." + showstr[t]+ ".png");
                                }
                                else {
                                    if(data[i].bj == true) texture = Laya.loader.getRes("res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoCri1." + showstr[t] + ".png");
                                    else texture = Laya.loader.getRes("res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0." + showstr[t]+ ".png");
                                }

                            }
                            else if(type == 1) texture = Laya.loader.getRes("BasicEff/NoViolet0." + showstr[t]+ ".png");
                        }
                        else if(numbertype == 2) texture = Laya.loader.getRes("BasicEff/NoBlue0." + showstr[t] + ".png");
                        if(texture) {
                            this.show[i][t].texture = texture;
                            //该图的位置
                            let posX = 0;
                            let posY = y + 40 * (0 - i);
                            if(t == 0) posX = x;
                            else posX = x + allX;
                            allX = allX + texture.width * 0.8;
                            //该图片的大小
                            if(t == 0) posY = posY - 5;
                            if(t % 2 == 1) posY = posY + 5;
                            this.m_parent.addChild(this.show[i][t]);
                            this.show[i][t].zOrder = 200000;
                            this.show[i][t].pivot(texture.width / 2, texture.height / 2).pos(posX +  + texture.width / 2, posY);
                            //该序号向上逐渐消失
                            // this.timeLine[i][t].addLabel("hitnumber_1_" + i + t + "_" ,0).to(this.show[i][t],{scaleX: size * 1.2,scaleY: size * 1.2, y:posY - 50, alpha: 255 / 255}, 250, null, 0)
                            // this.timeLine[i][t].addLabel("hitnumber_2_" + i + t + "_" ,0).to(this.show[i][t],{scaleX: size * 0.6,scaleY: size * 0.6, x:posX - offsetX, y:posY - 100, alpha: 0}, 250, null, 0);
                            ++this.totalCnt;
                            Laya.Tween.to(this.show[i][t],{scaleX: size * 1.2,scaleY: size* 1.2, y:posY - 50, alpha: 255 / 255}, 250, null, Laya.Handler.create(this, ()=>{
                                Laya.Tween.to(this.show[i][t],{scaleX: size * 0.6,scaleY: size * 0.6, x:posX - offsetX, y:posY - 100, alpha: 0}, 250, null, Laya.Handler.create(this, this.onComplete, [parent, i, t]))
                            }, []))
                        }
                    }
                }
            }
            //开始播放
            // for(let i:number = 0; i < data.length; i++) {
            //     for(let j:number = 0; j < data[i].num.toFixed(0).length; j++) {
            //         this.timeLine[i][j].once(Laya.Event.COMPLETE, this,this.onComplete, [parent, i, j]);
            //         this.timeLine[i][j].play(0, false);
            //     }
            // }
            if(skill == false) {
                this.hitAni = new Laya.Image();
                this.hitAni.zOrder = 200000;
                P.addChild(this.hitAni);
                this.hitAni.pos(x, y);
                this.showHit(0);
            }
        }

        //普通攻击的效果
            //msMoudle.wz["hit.img"]

        public showHit(frameIndex:number) : void {
            if(frameIndex > 1) {
                this.hitAni.skin = "";
                return ;
            }
            this.hitAni.skin = "res/Character/Afterimage/hit.img/mace1." + frameIndex + ".png";
            Laya.timer.once(100, this, this.showHit, [frameIndex + 1]);
        }

        //完成
        private onComplete(parent:any, i:number, j:number):void {
            if(this.show[i][j]) {
                this.show[i][j].removeSelf();
                this.show[i][j].destroy(true);
                this.show[i][j] = null;
            }
            Laya.timer.clear(this, this.showHit);
            if(this.hitAni) {
                this.hitAni.removeSelf();
                this.hitAni.destroy(true);
                this.hitAni = null;
            }
            if(this.totalCnt == ++this.cmpCnt) {
                this.totalCnt = this.cmpCnt = 0;
                this.show.length = 0;
                Laya.Pool.recover("NumberRole.Number", this);
            }
		}
        ////
    }

}