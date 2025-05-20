module app.common {

    export class guajiDlg extends ui.common.guajiDlgUI implements ui.common.IguajiDlgUI {
        public static className = "app.common.guajiDlg";

        onInitialize(){
            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 300) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.mainT) {
                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.visible = false;
                }
            }

            // msMoudle.gameP._head.visible = true;
            msMoudle.gameP.sphead.visible = true;
            Laya.stage.addChild(msMoudle.gameP.sphead);

            this.updateData();

            ms.dayguaji -= 5000;
            if(ms.dayguaji < 0) {
                ms.dayguaji = 0;
            }
            Laya.timer.loop(5000, this, this.delTime);
            Laya.timer.once(10000, this, this.canClose);
        }

        onClose() {}

        cccc:boolean = false;
        canClose() : void {
            this.cccc = true;
        }

        delTime() : void {
            ms.dayguaji -= 5000;
            this.updateData();
            if(ms.dayguaji <= 0) {
                ms.dayguaji = 0;
                this.onBtnBackClick(null);
                return ;
            }
            // if(ms.huoli <= 0) {
            //     this.onBtnBackClick(null);
            //     return ;
            // }
            // msMoudle.toast("村粗");
            ms.saveServer();
        }

        updateData() : void {
            this._time.text = "挂机剩余时间" + Math.floor(ms.dayguaji / (1000 * 60) ) + "分钟左右";
        }

        onBtnBackClick(e: Laya.Event): void {
            if(this.cccc) {
                Laya.timer.clear(this, this.delTime);
                this.close();
                if(msMoudle.mapP) {
                    msMoudle.mapP.closeMyTeam();
                }
                if(msMoudle.char)
                    msMoudle.char.stopAutoFight();
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
                // msMoudle.gameP._head.visible = false;
                msMoudle.guaji = false;
                //返回主城
                msMoudle.MapInit();
                msMoudle.gameP.gotoScene(ms.lastmap);

                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.addChild(msMoudle.gameP.sphead);
                }
            }
            else {
                msMoudle.toast("10秒后可关闭挂机");
            }
        }

        //
    }
}