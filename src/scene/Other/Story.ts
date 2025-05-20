/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Mob.ts" />
/// <reference path="./../../core/ms/Maple/Npc.ts" />
/// <reference path="./../../scene/Other/Guide.ts" />

module StoryMoudle{

    import cssCharacter = CharacterRole.Character;
    import cssMob = MobRole.Mob;
    import cssNpc = NpcRole.Npc;
    import cssGuide = GuideMoudle.Guide;

    export class Story extends Laya.Sprite {
        private m_parent:any;
        private m_sp:Laya.Image;
        private initX:number = 0;
        private initY:number = 0;
        private m_storyid:string;
        private m_step:number = 0;
        private back_bg:Laya.Image;
        // private mFactory:Laya.Templet;

        public m_updata(P:any, storyid:string) : any {
            this.m_step = 0;
            if(msMoudle.storyjson[storyid]) {
                this.m_storyid = storyid;
                this.m_parent = P;

                //记录开始状态
                this.initX = P.m_sp.x;
                this.initY = P.m_sp.y;

                console.log("地图位置   " + this.initX + "  " + this.initY);
                this.initStory();
            }
        }

        h:cssCharacter;
        m1:cssMob;
        orgX:string = "0";
        private initStory() : void {
            this._T();
            if(this.m_storyid.indexOf("test1") >= 0) {
                this.orgX = this.m_parent.m_sp.x + "";
                //npc
                this.h = new cssCharacter();
                this.h.m_name = "NPC";
                let E:any = {};
                E.fweapon = msMoudle.herojson[5].fweapon;
                E.cap = msMoudle.herojson[5].cap;
                E.longcoat = msMoudle.herojson[5].longcoat;
                E.weapon = msMoudle.herojson[5].weapon;
                E.cape = msMoudle.herojson[5].cape;
                // E.tamingmob =    "01902032.img";//01902000  01902028    01902032
                // E.tamingmob0 =   "01912025.img";//01912000  01912021    01912025
                this.h.changeAll(this.m_parent.m_sp, E, 330, msMoudle.char.m_y);
                this.showSucc();
                // this.mFactory = new Laya.Templet();
                // this.mFactory.loadAni("res/ui_1040.sk");
                // msMoudle.char.setDir(-1);
                // this.mFactory.on(Laya.Event.COMPLETE, this, ()=> {
                //     if(this.mFactory) {
                //         let mArmature = this.mFactory.buildArmature(0);
                //         mArmature.zOrder = 99999999;
                //         this.h.m_sp.addChild(mArmature);
                        // mArmature.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                        // mArmature.play(0,false);
                        // mArmature.once(laya.events.Event.STOPPED, this, ()=> {
                        //     mArmature.removeSelf();
                        //     mArmature.destroy();
                        //     mArmature = null;

                            this.updateSpeak(this.m_step);
                            // Laya.timer.once(2000, this, ()=> {
                            //     this.h.m_chatballon.doSomeThing("npc", "我在哪里？？");
                            // });
                        // });
                    // }
                // });
                //
            }
            else if(this.m_storyid.indexOf("test") >= 0) {
                //主角消失
                // this.m_parent.char.m_sp.visible = false;
                // this.m_parent.char.m_nametag_sp.visible = false;
                //npc消失
                // this.m_parent.m_life.m_sp.visible = false;
                //npc
                // if(true) {
                //     this.h = new cssCharacter();
                //     let E:any = {
                //         coat:msMoudle.getSexCoat(1),
                //         pants:msMoudle.getSexPants(1),
                //         hair:msMoudle.getSexHair(1)
                //     };
                //     this.h.changeAll(this.m_parent.m_sp, E, 0, 215);
                // }
                //怪物出现
                if(true) {
                    let lifeMsg:any = new Object();
                    lifeMsg.id = 8150000;
                    lifeMsg.x = 900;//1200
                    lifeMsg.y =  msMoudle.char.m_y;
                    this.m1 = new cssMob();
                    this.m1.changeAll(this.m_parent.m_sp, "8240099.img", lifeMsg);
                }
                Laya.timer.once(250, this, () => {
                    this.updateStory(this.m_step);
                });
            }
        }

        skill:SkillRole.Skill;
        showSucc() : void {
            let data:any = msMoudle.wz["122.img"]["skill.1221003"];
            if(this.skill) {
                this.skill.clearUp();
                this.skill.removeSelf();
                this.skill = null;
            }
            this.skill = new SkillRole.Skill();
            this.skill.changeAll(null, this.h.m_state_sp, "1221003", 0, 0, data, 1);
        }

        private updateStory(step:number) : void {
            let _:any = msMoudle.storyjson[this.m_storyid][step];
            if(_) {
                if(_["guide"]) {
                    if(_["guide"] == "duihua1") {
                        msMoudle.char.setDir(-1);
                    }
                    else if(_["guide"] == "duihua2") {
                        // this.m1.changeByName("attack2", 0);
                        // this.h.clearUp();
                        // this.h = null;
                    }
                    //怪物消失
                    else if(_["guide"] == "duihua4") {
                        msReward._r1();
                        this.m1.clearUp();
                        this.m1 = null;
                    }
                    let g:cssGuide = new cssGuide();
                    g.m_center = false;
                    g.m_alpha = true;
                    g.m_touch = false;
                    g.m_updata(_["guide"], this);
                }
                else {
                    this.moveCamera(Number(_["movex"]), Number(_["movey"]), true);
                }
            }
            else {
                console.log("剧情结束");
                this.back_bg.removeSelf();
                this.back_bg = null;
                this.m_parent.StoryEnd();
            }
        }

        private updateSpeak(step:number) : void {
            let _:any = msMoudle.storyjson[this.m_storyid][step];
            if(_) {
                if(_["guide"]) {
                    if(_["guide"].indexOf("firstHero") >= 0) {
                        this.h.m_chatballon.loadChatBalloon(this.h, _["msg"], false);
                        if(msMoudle.storyjson[this.m_storyid].length == step + 1) {
                            this.updateSpeak(step + 1);
                        }
                        else {
                            Laya.timer.once(3000, this, ()=> {
                                this.updateSpeak(step + 1);
                            });
                        }
                    }
                }
            }
            else {
                console.log("对话结束");
                // let mArmature = this.mFactory.buildArmature(0);
                // mArmature.zOrder = 99999999;
                // this.h.m_sp.addChild(mArmature);
                // // mArmature.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                // mArmature.play(0,false);
                // mArmature.once(laya.events.Event.STOPPED, this, ()=> {
                //     mArmature.removeSelf();
                //     mArmature.destroy();
                //     mArmature = null;
                    ////删除
                    if(this.h) {
                        this.h.clearUp();
                        this.h = null;
                    }
                    if(this.back_bg) {
                        this.back_bg.removeSelf();
                        this.back_bg = null;
                    }

                    if(ms.zhaomu == false) {
                        ms.zhaomu = true;                 //第一次到第二关且招募没有开启
                        // Laya.timer.once(1500, this, ()=> {
                            msMoudle._(); msMoudle.updateRongYu(100);
                            let g:cssGuide = new cssGuide();
                            g.m_updata("firstZM", null);
                        // });
                    }

                    // let g:cssGuide = new cssGuide();
                    // g.m_updata("firstGuanKa", null);
                    // g.m_updata("firstZM", null);
                    //
                // });

            }
        }

        //镜头移动到目标位置
        moveCamera(mx: number, my:number, mobvisible:boolean): void {
            let timeLine:Laya.TimeLine = new Laya.TimeLine();
            if(mx != 9999 && my == 9999)
                timeLine.addLabel(this.m_storyid ,0).to(this.m_parent.m_sp,{x:mx }, 500, null, 0);
            if(mx == 9999 && my != 9999)
                timeLine.addLabel(this.m_storyid ,0).to(this.m_parent.m_sp,{y:my}, 500, null, 0);
            if(mx != 9999 && my != 9999)
                timeLine.addLabel(this.m_storyid ,0).to(this.m_parent.m_sp,{x:mx}, 500, null, 0);
            timeLine.play(0, false);
            timeLine.once(Laya.Event.COMPLETE, this, () => {
                this.m_step++;
                this.updateStory(this.m_step);
            })
        }

        private _T() : void {
            this.back_bg = new Laya.Image();
			this.back_bg.alpha = 0.5;
            this.back_bg.zOrder = 9999999999;
			this.back_bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.back_bg.width = Laya.stage.width;
            this.back_bg.height = Laya.stage.height;
            this.back_bg.on("click", this, ()=>{});
			Laya.stage.addChild(this.back_bg);
        }

        public clearUp() {
            if(this.h) {
                this.h.clearUp();
                this.h = null;
            }
            if(this.back_bg) {
                this.back_bg.removeSelf();
                this.back_bg = null;
            }
        }

        //

    }
}