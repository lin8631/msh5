/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Npc.ts" />

module app.zhaomu {

    import cssCharacter = CharacterRole.Character;
    import cssNpc = NpcRole.Npc;

    export class zhaomuDlg extends ui.zhaomu.zhaomuDlgUI implements ui.zhaomu.IzhaomuDlgUI {

        public static className = "app.zhaomu.zhaomuDlg";
        private npc:cssNpc;

        onInitialize(){
            this.bg.graphics.drawRect(-(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            Laya.stage.addChild(this.btnBack);
            this.btnBack.x = Laya.stage.width - 100;

            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }


            this.updateData();
        }

        onClose() {
            // msMoudle.dlgClose();
            if(this.btnBack) {
                this.btnBack.removeSelf();
                this.btnBack = null;
            }
        }

        updateData(){
            this.npc = new cssNpc();
            let lifeMsg:any = new Object();
            lifeMsg.id = "2032001";
            lifeMsg.x = 400;
            lifeMsg.y =  485;
            this.npc.changeAll(this, ("2032001.img"), lifeMsg);
            this.npc.m_sp.zOrder = 0;
            this.npc.m_nametag_sp.zOrder = 0;
            this.dizuo.zOrder = 1;
        }

        onOneClickClick(e: Laya.Event): void {
            if(msMoudle.online == false) {
                msMoudle.toast("当前网络不稳定");
                return ;
            }
            if(ms.herosdata.length >= 32) {
                msMoudle.toast2("英雄背包已经满了");
            }
            else {
                if(ms.rongyu() >= 100) {
                    msMoudle._(); msMoudle.updateRongYu(-100);
                    ui.show(app.battle.GetHeroDlg);
                    this.one.visible = false;
                    this.ten.visible = false;
                    this.btnBack.visible = false;
                }
                else {
                    msMoudle.toast2("枫叶不足");
                }
            }
        }
        onTenClickClick(e: Laya.Event): void {
            if(msMoudle.online == false) {
                msMoudle.toast("当前网络不稳定");
                return ;
            }
            if(ms.herosdata.length >= 32) {
                msMoudle.toast2("英雄背包已经满了");
            }
            else {
                if(ms.rongyu() >= 1000) {
                    msMoudle._(); msMoudle.updateRongYu(-1000);
                    ui.show(app.battle.GetTenHeroDlg);
                    this.one.visible = false;
                    this.ten.visible = false;
                    this.btnBack.visible = false;
                }
                else {
                    msMoudle.toast("枫叶不足");
                }
            }
        }

        ///////这里需要解决首充问题
        onBtnHCClick(e: Laya.Event): void {
            ui.show(app.battle.hechengDlg, {params:[], black:true});
            ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = false;
        }

        onBtnTJClick(e: Laya.Event): void {
            ui.show(app.zhaomu.tujianDlg, {black:true});
            // this.close();
            ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = false;
        }

        onBtnBackClick(e: Laya.Event): void {
            // Laya.Tween.to(this, {alpha:0, scaleX:0, scaleY:0}, 500);
            // Laya.timer.once(600, this, ()=> {
                this.close();
                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                }
            // });
        }

    }
}