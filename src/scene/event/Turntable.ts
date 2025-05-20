/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.event {

    import cssMsg = MsgRole.Msg;
    /**
     * 转盘
     */
    export class TurntableDlg extends ui.event.TurntableDlgUI implements ui.event.ITurntableDlgUI {
        public static className = "app.event.TurntableDlg";
        private m_msg:cssMsg;

        maskLayer: Laya.Image;

        private objItems:Array<any> = [this.objItem1, this.objItem2, this.objItem3,
            this.objItem4, this.objItem5, this.objItem6, this.objItem7, this.objItem8,
            this.objItem9, this.objItem10];
        private lblItems:Array<any> = [this.lblItem1, this.lblItem2, this.lblItem3,
            this.lblItem4, this.lblItem5, this.lblItem6, this.lblItem7, this.lblItem8,
            this.lblItem9, this.lblItem10];

        protected onInitialize() {
            // this.x = (Laya.stage.width - 720) / 2;
            // this.y = (Laya.stage.height - 480) / 2;

            this.bg.graphics.drawRect(-(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");

            // this.width = Laya.stage.width;
            // this.height = Laya.stage.height;
            Laya.stage.addChild(this.btnBack);
            this.btnBack.x = Laya.stage.width - 100;
            // this.imgSelect.blendMode = "lighter";
            this.imgCircle.blendMode = "lighter";

            // this.btnC.graphics.drawRect(0, 0, 800, 600, "#000000");
            // this.btnC.alpha = 0.8;

            this._time.text = ms.zhuanpan + "次";
            this.updateData();

            // let sp:Laya.Sprite = new Laya.Sprite();
            // sp.graphics.drawRect(0, 0, 800, 600, "#000000");
            // sp.zOrder = 999999999;
            // this.addChild(sp);
            // Laya.Tween.to(sp, {alpha:0}, 500);
        }

        onBtnOnceClick(e: Laya.Event): void {
            if(ms.zhuanpan > 0) {
                ms.zhuanpan--;
                if(ui.manager.getDialogByName("app.battle.moveDlg")) {
                    if(ui.manager.getDialogByName("app.battle.moveDlg").dlg) {
                        ui.manager.getDialogByName("app.battle.moveDlg").dlg.updateData();
                    }
                }
                this._time.text = ms.zhuanpan + "次";
                this.startRotation(true, msMoudle.getRandValue(0, 0, 10));
            }
            else {
                msMoudle.toast("转盘次数不足！");
            }
        }

        onClose():void {
            // msMoudle.dlgClose();
            Laya.timer.clear(this, this.updateSelect);
            if(this.btnBack) {
                this.btnBack.removeSelf();
                this.btnBack = null;
            }
        }

        updateData() {
            this.m_msg = new cssMsg();

            for(let key in msMoudle.zhuanpanjson) {
                this.lblItems[key].text = msMoudle.zhuanpanjson[key].name;
                this.objItems[key]._img.skin = msMoudle.zhuanpanjson[key].img;
                this.objItems[key]._msg.text = "X" + msMoudle.zhuanpanjson[key].num;
                this.objItems[key].on("click", this, this.tClick, [key]);
            }
        }

        tClick(key:any) : void {
            this.m_msg.itemShow(msMoudle.zhuanpanjson[key].id);
        }

        startRotation(single:boolean, which?: number) {
            this.btnBack.visible = false;
            this.btnOnce.visible = false;

            this.imgSelect.visible = true;
            if(which == null) {
                which = Math.floor(Math.random() * 9);
            }
            // console.log("##which=" + which);
            // which = 7;
            let circleNum = 5;//Math.floor(Math.random() * 2) + 2;
            let rotateDegree = which * 36 - 15 + Math.floor(Math.random() * 30);
            while(rotateDegree < this.imgArrow.rotation) rotateDegree += 360;
            this.maskLayer = this.showMaskView(Laya.stage, 2000, "red", 0);
            // this.imgArrow.rotation = 0;
            let ease = (t: number, b: number, c: number, d: number): number =>{
                if (t < d * 0.2) return Laya.Ease.strongIn(t, b, (c - b) * 0.1 + b, d * 0.2);
                else if (t < d * 0.4) return (t - 0.2 * d) * (c - b) * 0.5 / (0.2 * d)+b+(c - b) * 0.1;
                else if (t < d * 0.5) return (t - 0.4 * d) * (c - b) * 0.2 / (0.1 * d)+b+(c - b) * 0.6;
                else if (t < d * 0.6) return (t - 0.5 * d) * (c - b) * 0.1 / (0.1 * d)+b+(c - b) * 0.8;
                else if (t < d * 0.7) return (t - 0.6 * d) * (c - b) * 0.05 / (0.1 * d)+b+(c - b) * 0.9;
                else if (t < d * 0.8) return (t - 0.7 * d) * (c - b) * 0.025 / (0.1 * d)+b+(c - b) * 0.95;
                else if (t < d * 0.9) return (t - 0.8 * d) * (c - b) * 0.015 / (0.1 * d)+b+(c - b) * 0.975;
                return (t - 0.9 * d) * (c - b) * 0.01 / (0.1 * d)+b+(c - b) * 0.99;
                // console.log("##t="+t+",b="+b+",c="+c+",d="+d+",x=" + this.imgArrow.rotation)
                // return Laya.Ease.strongOut(t - 0.5 * d, (c - b) * 0.9 + b, c, d * 0.5);
            }
            Laya.Tween.to(this.imgArrow, {rotation:circleNum*360 + rotateDegree}, 3500, ease, Laya.Handler.create(this, ()=>{
                this.maskLayer.removeSelf();
                Laya.timer.clear(this, this.updateSelect);

                Laya.timer.once(250, this, ()=> {
                    this.btnBack.visible = true;
                    this.btnOnce.visible = true;

                    let showReward:Array<any> = [];
                    showReward[0] = new Object();
                    showReward[0].itemid = msMoudle.zhuanpanjson[which].id;
                    showReward[0].name = msMoudle.zhuanpanjson[which].name;
                    showReward[0].img = msMoudle.zhuanpanjson[which].img;
                    showReward[0].num = msMoudle.zhuanpanjson[which].num;
                    showReward[0].pinzhi = 1;
                    showReward[0].type = 0;

                    //金币
                    if(showReward[0].itemid == "9000000") {
                        showReward[0].pinzhi = 4;
                        msMoudle._(); msMoudle.updateJinBi(showReward[0].num);
                    }
                    //枫叶
                    else if(showReward[0].itemid == "1234561") {
                        showReward[0].pinzhi = 5;
                        msMoudle._(); msMoudle.updateRongYu(showReward[0].num);
                    }
                    //点券
                    else if(showReward[0].itemid == "1234562") {
                        showReward[0].pinzhi = 5;
                        msMoudle._(); msMoudle.updateZuanShi(showReward[0].num, 102);
                    }
                    //卷轴
                    else if(showReward[0].itemid == "1234553") {
                        let itemId = msMoudle.rnkJuanZhou();
                        msMoudle._(); msMoudle.getItem(itemId);
                        let item:any = msMoudle.getItemMsg(Number(itemId));
                        showReward[0].num = 1;
                        showReward[0].itemid = item.id;
                        showReward[0].name = item.name;
                        showReward[0].img = item.img;
                        showReward[0].pinzhi = 5;
                    }
                    //装备
                    else if(showReward[0].itemid == "1234559") {
                        let itemId = msMoudle.rnkEqp();
                        msMoudle._(); msMoudle.getWeapon(itemId);
                        let eqp:any = msMoudle.getEqpMsg(itemId);
                        showReward[0].num = 1;
                        showReward[0].itemid = eqp.id;
                        showReward[0].name = eqp.name;
                        showReward[0].img = eqp.img;
                        showReward[0].pinzhi = 5;
                        showReward[0].type = 1;
                    }
                    ui.show(app.battle.rewardDlg, {params:[showReward]});
                });

            }));

            Laya.Tween.to(this.imgLight, {rotation: this.imgLight.rotation - 540}, 3500, ease);

            Laya.timer.once(500, this, ()=>{
                Laya.Tween.to(this.imgCircle, {alpha:1}, 300, null, Laya.Handler.create(this, ()=>{
                    // Laya.timer.once(2600, this, ()=>{
                    //     Laya.Tween.to(this.imgCircle, {alpha:0}, 100);
                    // });
                }));
            });

            Laya.timer.frameLoop(1, this, this.updateSelect);
        }

        updateSelect() {
            let rotation = (this.imgArrow.rotation + 18) % 360;
            let which = Math.floor(rotation / 36);
            this.imgSelect.rotation = 36 * which;
        }

        onBtnBackClick(e: Laya.Event) {
            this.close();
        }


        showMaskView(parent: any, zOrder: number, color: string, alpha: number) {
            let imgMask = new Laya.Image();
            imgMask.graphics.drawRect(0, 0, 720, 1280, color);
            imgMask.width = 720;
            imgMask.height = 1280;
            imgMask.alpha = alpha;
            imgMask.centerX = 0;
            // imgMask.centerY = 0;
            imgMask.mouseEnabled = true;
            imgMask.mouseThrough = false;
            imgMask.zOrder = zOrder;
            parent.addChild(imgMask);
            return imgMask;
        }
    }

}
