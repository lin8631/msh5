module app.battle {

    export class BattleEndDlg extends ui.battle.BattleEndDlgUI implements ui.battle.IBattleEndDlgUI {
        public static className = "app.battle.BattleEndDlg";
        private m_data:Array<any> = [];

        onInitialize(){

            let design_width = (600 / Laya.Browser.height) * Laya.Browser.width;///这个没问题
            let design_height = (600 / Laya.Browser.height) * Laya.Browser.height;;
            // this.x = (design_width - 800) / 2;
            this.x = 0;
            this.updateData();
        }

        onClose() {

        }

        onBtnCClick(e: Laya.Event): void {

        }

        num:number = 3;
        updateData(){

            this.btnC.graphics.drawRect( -(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.btnC.alpha = 0.8;

            this.effect.scale(2, 2);
            this.effect.pivot(264 / 2, 72 / 2);
            this.effect.pos(this.effect.x + 264 / 2, this.effect.y + 72 / 2);
            this.lblCountDown.visible = false;
            Laya.Tween.to(this.effect, {scaleX:1, scaleY:1}, 250);
            Laya.timer.once(250, this, ()=> {
                this.lblCountDown.visible = true;
                Laya.timer.loop(900, this, this.CountDown);
            });
        }

        private CountDown() : void {
            this.num -= 1;
            this.lblCountDown.text = this.num.toString() + "秒";
            if(this.num == -1) {
                Laya.timer.clear(this, this.CountDown);
                //返回主城
                if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                    ///手动地图死了
                    msMoudle.tiaotiao_map = "910000000.img";
                    msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                }
                else {
                    msMoudle.gameP.gotoScene(ms.lastmap);
                }
                this.close();
            }
        }

    }
}