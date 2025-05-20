/// <reference path="./../../core/ms/Maple/Character.ts" />
/// <reference path="./../../core/ms/Maple/Npc.ts" />

module app.zhaomu {

    export class lunhuiDlg extends ui.zhaomu.lunhuiDlgUI implements ui.zhaomu.IlunhuiDlgUI  {

        public static className = "app.zhaomu.lunhuiDlg";

        onInitialize(){
            this.bg.graphics.drawRect(-(Laya.stage.width - 800) / 2, 0, Laya.stage.width, Laya.stage.height, "#000000");
            Laya.stage.addChild(this.btnBack);
            this.btnBack.x = Laya.stage.width - 100;

            this.updateData();
        }

        onClose() {
            if(this.btnBack) {
                this.btnBack.removeSelf();
                this.btnBack = null;
            }
        }

        updateData() : void {
            this.hp.text = "最大生命：+" + 200 * (ms.herodata.LH + 1);
            this.pad.text = "攻击力：+" + 100 * (ms.herodata.LH + 1);
            this.pdd.text = "防御力：+" + 10 * (ms.herodata.LH + 1);
            this.mad.text = "魔法攻击力：+" + 100 * (ms.herodata.LH + 1);
            this.mdd.text = "魔法防御力：+" + 10 * (ms.herodata.LH + 1);
            this._time.text = "英雄轮回次数：" + ms.herodata.LH;
            this.zuanshi.text = ms.rongyu() + "/" + 100 * (ms.herodata.LH + 1);
            if(ms.rongyu() >= 100 * (ms.herodata.LH + 1)) this.zuanshi.color = "#35f904"
            else this.zuanshi.color = "#FFFFFF";

            let needjifen = 0;
            if(ms.herodata.LH >= 5) needjifen = 50 * (ms.herodata.LH - 5 + 1);
            this.jifen.text = ms.jifen() + "/" + needjifen;
            if(ms.jifen() >= needjifen) this.jifen.color = "#35f904"
            else this.jifen.color = "#FFFFFF";
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        onBtnLvClick(e: Laya.Event): void {
            let needjifen = 0;
            if(ms.herodata.LH >= 5) needjifen = 50 * (ms.herodata.LH - 5 + 1);
            if(ms.rongyu() >= 100 * (ms.herodata.LH + 1) && ms.jifen() >= needjifen) {
                msMoudle._(); msMoudle.updateRongYu(-100 * (ms.herodata.LH + 1))
                msMoudle._(); msMoudle.updateJiFen(-needjifen);
                ms.herodata.LH++;
                this.updateData();

                ms.saveServer();
            }
            else {
                msMoudle.toast("材料不足");
            }

        }
        //
    }
}