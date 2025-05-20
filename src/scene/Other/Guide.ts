module GuideMoudle{

    export class Guide extends Laya.Sprite {

        private gameContainer:Laya.Image;
		private guideContainer:Laya.Image;
		private tipContainer:Laya.Image;
        private m_back:any;

        private gSteps:Array<any> = [];
		private guideStep:number = 0;
		private hitAreasp:Laya.HitArea;
		private interactionArea:Laya.Image;
        private txt:Laya.Label;
        public m_touch:boolean = true;
        public m_center:boolean = false;
        public m_alpha:boolean = false;
        private m_guideid:string;
        private ani = new app.role();

        private guideInit(guideid:string) : void {
            this.gSteps = [];
            for(let key in msMoudle.guidejson) {
                if(key == guideid) {
                    for(let _ in msMoudle.guidejson[key]) {
                        let tIndex:number = this.gSteps.length;
                        this.gSteps[tIndex] = new Object();
                        this.gSteps[tIndex].x = msMoudle.guidejson[key][_].x ? msMoudle.guidejson[key][_].x : 0;
                        this.gSteps[tIndex].y = msMoudle.guidejson[key][_].y ? msMoudle.guidejson[key][_].y : 0;
                        this.gSteps[tIndex].radius = msMoudle.guidejson[key][_].radius ? msMoudle.guidejson[key][_].radius : 0;
                        this.gSteps[tIndex].hitradius = msMoudle.guidejson[key][_].hitradius ? msMoudle.guidejson[key][_].hitradius : 0;
                        this.gSteps[tIndex].tip = "res/UI/guide.png";
                        this.gSteps[tIndex].tipx = 0;
                        this.gSteps[tIndex].tipy = Laya.stage.height - 180;
                        this.gSteps[tIndex].txt = msMoudle.guidejson[key][_].txt;
                        this.gSteps[tIndex].adp = msMoudle.guidejson[key][_].adp;
                    }
                    break;
                }
            }
            // else if(guideid == "first_buy") {
            //     this.gSteps = [
            //     { x: 120, y: 280, radius:50, hitradius:50, tip:"res/UI/guide.png", tipx:0, tipy:420 }
            //     ];
            // }
            // else if(guideid == "first_fight") {
            //     this.gSteps = [
            //     { x: 745, y: 85, radius:50, hitradius:50, tip:"res/UI/guide.png", tipx:0, tipy:420 },
            //     { x: 520, y: 110, radius:50, hitradius:50, tip:"res/UI/guide.png", tipx:0, tipy:420 }
            //     ];
            // }
        }

        //当前引导的具体哪一步
        public doing(guideStep:number, guideid:string) : void {
            let step:any = this.gSteps[this.guideStep];
            this.fillText(step, 0, step.txt.length);
            // if(guideid == "first_task") {
            //     // if (this.guideStep == 1) {        //如果是多条用这个
            //     //     let task = new cssTask();
            //     //     task.m_updata("任务");
            //     // }
            // }
            if(guideid == "firstZM") {
                if (this.guideStep == 1) {
                    msMoudle.dlgShow();
                    ui.show(app.zhaomu.zhaomuDlg);
                }
            }
            else if(guideid == "firstGuanKa") {
                if (this.guideStep == 1) ui.show(app.boss.bossDlg);
            }
            else if(guideid == "firstTeam") {
                if (this.guideStep == 1) ui.manager.getDialogByName("app.battle.addTeamDlg").dlg.onLstYingXiongCellClick(null, 0);
            }
            else if(guideid == "firstBoss") {
                if (this.guideStep == 1) ui.show(app.boss.bossDlg);
            }
        }

        private fillText(step:any, i:number, len:number) : void {
            if(i == len) {
                if(this.m_back) {
                    this.m_touch = true;
                    Laya.timer.once(250, this, () => {
                        if(this.m_touch) {
                            this.m_touch = false;
                            this.__(this.m_guideid);
                        }
                    });
                }
                else {
                    if(this.m_guideid == "firstZM") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstGuanKa") {
                        this.m_touch = true;
                    }
                    else if(this.m_guideid == "firstBoss") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstTeam") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstSkill") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstRW") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstPvp") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else if(this.m_guideid == "firstRenKu") {
                        this.m_touch = true;
                        // Laya.timer.scale = 0;
                    }
                    else {
                        this.m_touch = true;
                        Laya.timer.once(500, this, () => {
                            if(this.m_touch) {
                                this.m_touch = false;
                                this.__(this.m_guideid);
                            }
                        });
                    }
                }
            }
            else {
                this.m_touch = false;
                let _:string = "";
                for(let j:number = 0; j <= i; j++) _ += step.txt[j];
                this.txt.text = _;
                Laya.timer.once(50, this, this.fillText, [step, i + 1, len], false);
            }
        }

        ///当前引导完成时
        public doend(guideStep:number, guideid:string) : void {
            msMoudle.m__touch = true;
            if(this.m_back) {
                this.m_back.m_step++;
                this.m_back.updateStory(this.m_back.m_step);

                if(this.m_touch) {
                    this.m_touch = false;
                    this.__(guideid);
                }
            }
            if(guideid == "gamestart") {
                ui.show(app.homeland.MajorCityDlg);
            }
            else if(guideid == "firstZM") {
                Laya.timer.scale = 1;
                // ui.show(app.zhaomu.zhaomuDlg);
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.onOneClickClick(null);
            }
            else if(guideid == "firstGuanKa") {
                Laya.timer.scale = 1;
                // ui.show(app.boss.bossDlg);
                ui.manager.getDialogByName("app.boss.bossDlg").dlg.onBtnFightClick(null);

            }
            else if(guideid == "firstBoss") {
                Laya.timer.scale = 1;
                ui.manager.getDialogByName("app.boss.bossDlg").dlg.onBtnPZ2Click2(null);
            }
            else if(guideid == "firstTeam") {
                Laya.timer.scale = 1;
                ui.manager.getDialogByName("app.battle.addTeamDlg").dlg.onBtnFightClick(null);
                // ui.show(app.boss.bossDlg);
            }
            else if(guideid == "firstSkill") {
                Laya.timer.scale = 1;
                ui.show(app.char.charDlg);
            }
            else if(guideid == "firstRW") {
                Laya.timer.scale = 1;
                ui.show(app.task.taskDlg);
            }
            else if(guideid == "firstPvp") {
                Laya.timer.scale = 1;
                // ui.show(app.pvp.pvpDlg, {black:true});
                // ui.show(app.fuben.jumpDlg, {black:true});
            }
            else if(guideid == "firstRenKu") {
                Laya.timer.scale = 1;
                ui.show(app.fuben.fubenDlg);
            }
            else {
                Laya.timer.scale = 1;
                msMoudle.taskShow();
                // if(guideid == "caihongcun") {
                //     // let task = new cssTask();
                //     // task.m_updata("任务");
                // }
                // if(guideid == "enter_game") {
                //     msMoudle.taskShow();
                //     // this.m_updata(Laya.stage, this.m_back, "first_task");
                // }
                // else if(guideid == "first_task") {
                //     msMoudle.taskShow();
                //     // this.m_updata(Laya.stage, this.m_back, "first_fight");
                // }
                // else if(guideid == "first_fight") {
                //     ///
                // }
            }
        }

        private nextStep(guideid:string):void {
            if(this.m_guideid == "firstZM" || this.m_guideid == "firstGuanKa" || this.m_guideid == "firstBoss" || this.m_guideid == "firstRW" ||
                this.m_guideid == "firstPvp" || this.m_guideid == "firstRenKu"  || this.m_guideid == "firstSkill"  || this.m_guideid == "firstTeam") {
                if(this.m_touch) {
                    this.__(this.m_guideid);
                }
            }
		}

        private __(guideid:string) : void {
            if (this.guideStep == this.gSteps.length) {
                this.gameContainer.removeSelf();
                this.guideContainer.removeSelf();
                this.tipContainer.removeSelf();
                this.txt.removeSelf();

                this.gameContainer = null;
                this.guideContainer = null;
                this.tipContainer = null;
                this.txt = null;

                if(this.ani) {
                    this.ani.removeSelf();
                    this.ani.clearUp();
                    this.ani = null;
                }

                this.doend(this.guideStep, guideid);
            }
            else {
                this.doing(this.guideStep, guideid);

                let step:any = this.gSteps[this.guideStep];

                this.hitAreasp.unHit.clear();
                if(step.hitradius == 0) this.hitAreasp.unHit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                else {
                    if(step.adp == "center") {//中间
                        this.hitAreasp.unHit.drawCircle(step.x + (Laya.stage.width - 800) / 2, step.y, step.hitradius, "#000000");
                    }
                    else if(step.adp == "left") {//左边
                        this.hitAreasp.unHit.drawCircle( step.x, step.y, step.hitradius, "#000000");
                    }
                    else if(step.adp == "right") {//右边
                        this.hitAreasp.unHit.drawCircle(Laya.stage.width - step.x, step.y, step.hitradius, "#000000");
                    }
                }
                this.interactionArea.graphics.clear();
                if(step.adp == "center") {//中间
                    this.interactionArea.graphics.drawCircle(step.x + (Laya.stage.width - 800) / 2, step.y, step.radius, "#000000");
                }
                else if(step.adp == "left") {//左边
                    this.interactionArea.graphics.drawCircle(step.x, step.y, step.radius, "#000000");
                }
                else if(step.adp == "right") {//右边
                    this.interactionArea.graphics.drawCircle(Laya.stage.width - step.x, step.y, step.radius, "#000000");
                }
                this.tipContainer.graphics.clear();
                this.tipContainer.width = Laya.stage.width;
                this.tipContainer.height = 180;
                if(step.x == 0 && step.y == 0) {
                    this.tipContainer.skin = step.tip;
                    if(this.m_center) this.tipContainer.centerY = 0;
                    else this.tipContainer.pos(step.tipx, step.tipy);
                }
                else {
                    if(step.y > 300) {
                        if(step.x < Laya.stage.width / 2) this.txt.pos(step.x, step.y - 100);
                        else  this.txt.pos(Laya.stage.width / 2, step.y - 100);
                    }
                    else {
                        if(step.x < Laya.stage.width / 2) this.txt.pos(step.x, step.y + 100);
                        else this.txt.pos(Laya.stage.width / 2, step.y + 100);
                    }
                    //手势动画
                    if(this.ani) {
                        this.ani.removeSelf();
                        this.ani.clearUp();
                        this.ani = null;
                    }
                    this.ani = new app.role();
                    this.ani.isLoop = true;
                    // chouka.mScale = 2;
                    if(step.adp == "center") {//中间
                        this.ani.changeAllByZDH(Laya.stage, "res/guide/guide",
                        step.x + (Laya.stage.width - 800) / 2 - 102, step.y - 102, 12);
                    }
                    else if(step.adp == "left") {//左边
                        this.ani.changeAllByZDH(Laya.stage, "res/guide/guide",
                        step.x - 102, step.y - 102, 12);
                    }
                    else if(step.adp == "right") {//右边
                        this.ani.changeAllByZDH(Laya.stage, "res/guide/guide",
                        Laya.stage.width - step.x - 102, step.y - 102, 12);
                    }
                }
                this.guideStep++;
            }
        }

        m_updata(guideid:string, P:any): void {
            this.m_back = P;
            this.guideStep = 0;

            msMoudle.m__touch = false;
            this.m_guideid = guideid;

            if(this.m_guideid == "firstRW") {
                ms.task = true;
                // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.btnTask.visible = true;
            }

            this.guideInit(guideid);
            //绘制一个蓝色方块，不被抠图
			this.gameContainer = new Laya.Image();
            this.gameContainer.width = Laya.stage.width;
            this.gameContainer.height = Laya.stage.height;
            this.gameContainer.zOrder = 9999999999;
            this.gameContainer.on("click", this, this.nextStep, [guideid]);
			Laya.stage.addChild(this.gameContainer);

			// 引导所在容器
			this.guideContainer = new Laya.Image();
			this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 9999999999;
            this.guideContainer.width = Laya.stage.width;
            this.guideContainer.height = Laya.stage.height;
			Laya.stage.addChild(this.guideContainer);
			//绘制遮罩区，含透明度，可见游戏背景
			let maskArea:Laya.Image = new Laya.Image();
			if(this.m_alpha == false) maskArea.alpha = 0.5;
            else maskArea.alpha = 0;
			maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
			this.guideContainer.addChild(maskArea);
			//绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
			this.interactionArea = new Laya.Image();
			this.interactionArea.blendMode = "destination-out";
			this.guideContainer.addChild(this.interactionArea);

			this.hitAreasp = new Laya.HitArea();
			this.hitAreasp.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
			this.guideContainer.hitArea = this.hitAreasp;
			this.guideContainer.mouseEnabled = true;

			this.tipContainer = new Laya.Image();
            this.tipContainer.width = Laya.stage.width;
            this.tipContainer.height = Laya.stage.height;
            this.tipContainer.zOrder = 9999999999;
            // this.tipContainer.pos(0, (Laya.stage.height - 600) / 2);
			Laya.stage.addChild(this.tipContainer);
            //剧情内容
            this.txt = new Laya.Label();
            this.txt.color = "#ffffff";
            this.txt.bold = true;
            this.txt.fontSize = 30;
            this.txt.width = Laya.stage.width;
            this.txt.wordWrap = true;
            this.txt.leading = 5;
			this.tipContainer.addChild(this.txt);

            this.__(guideid);
        }

        public clearUp() {

        }

        //

    }
}