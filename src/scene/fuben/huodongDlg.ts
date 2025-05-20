/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    export class huodongDlg extends ui.fuben.huodongDlgUI implements ui.fuben.IhuodongDlgUI {
        public static className = "app.fuben.huodongDlg";

        constructor(){
            super();
        }

        m_names = ["石头剪刀布(凭运气赚金币)", "明星一张牌(凭智商赚枫叶)", "地鼠敲敲乐(凭反应赚枫叶)"];
        //, "明星强手棋(未开放)", "超能力尤茨(未开放)", "记忆大考验(未开放)", "OX问答(未开放)"];

        onInitialize(){

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;

            for(let i:number = 0; i < this.games.length; i++) this.games[i].visible = false;

            let res:Array<any> = [];
            res.push({ url: "atlas/StarGame.atlas"});
            msLoad.load(res).done(dlg => {
                this.updateData();
            });
        }

        updateData(){
            this.lstHuoDong.vScrollBarSkin = "";
            this.lstHuoDong.dataModel = this.m_names;
        }

        onLstHuoDongCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "btnGo") {
                msMoudle.yule = (index + 1);
                if(index == 0) {
                    if(ms.jinbi() >= 10000) {
                        msMoudle._(); msMoudle.updateJinBi(-10000);
                        this.T();
                    }
                    else {
                        msMoudle.toast("金币不足10000");
                    }
                }
                else if(index == 1) {
                    if(ms.rongyu() >= 250) {
                        msMoudle._(); msMoudle.updateRongYu(-250);
                        this.T();
                    }
                    else {
                        msMoudle.toast("枫叶不足250");
                    }
                }
                else if(index == 2) {
                    if(ms.rongyu() >= 100) {
                        msMoudle._(); msMoudle.updateRongYu(-50);
                        this.T();
                    }
                    else {
                        msMoudle.toast("枫叶不足100");
                    }
                }
                else if(index == 3) {
                    this.T();
                }
                else if(index == 4) {
                    this.T();
                }
            }
        }


        public games:Array<any> = [this.rps, this.card, this.hit];

        T() : void {
            this.di.visible = false;
            for(let i:number = 0; i < this.games.length; i++) this.games[i].visible = false;
            Laya.SoundManager.playMusic("res/Sound/tenthBoard.mp3");
            this.games[msMoudle.yule - 1].visible = true;
            this.games[msMoudle.yule - 1].loadGame();
            // ui.manager.getDialogByName("app.battle.moveDlg").dlg.close();
            ms.saveServer();
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
            ui.show(app.battle.moveDlg, {black:true});
            Laya.loader.clearRes("atlas/StarGame.atlas");
        }
        //
    }
}