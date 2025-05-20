/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.battle {

    import cssCharacter = CharacterRole.Character;

    export class GetHeroDlg extends ui.battle.GetHeroDlgUI implements ui.battle.IGetHeroDlgUI {
        public static className = "app.battle.GetHeroDlg";
        private char:cssCharacter;

        onInitialize(){

            // let design_width = (600 / Laya.Browser.height) * Laya.Browser.width;///这个没问题
            // let design_height = (600 / Laya.Browser.height) * Laya.Browser.height;;
            // this.x = (design_width - 800) / 2;

            // this.x -= (Laya.stage.width - 1080) / 2;

            this.x = 0;

            this.updateData();
        }

        onClose() {

        }

        onBtnCClick(e: Laya.Event): void {

        }

        updateData(){
            let getIndex:number = msMoudle.getIndex();
            // getIndex = 19;//13
            // getIndex = 13;
            if(ms.firstHero) {
                // getIndex = 19;
                getIndex = 5;
                ms.firstHero = false;
                ms.yingxiong = true;
            }
            ms.chouka++;
            ms.shops[1]++;      //抽卡次数
            if(ms.chouka >= msMoudle.rnkG.length) ms.chouka = 0;
            msMoudle._(); msMoudle.buyOneHero(getIndex, this);
            this.bk.visible = false;
            // this.effect.visible = false;
            Laya.timer.once(1000, this, ()=> {
                this.char = new cssCharacter();
                let E:any = {};
                E.fweapon = msMoudle.herojson[getIndex].fweapon;
                E.cap = msMoudle.herojson[getIndex].cap;
                E.longcoat = msMoudle.herojson[getIndex].longcoat;
                E.weapon = msMoudle.herojson[getIndex].weapon;

                this.bk.visible = true;
                this.btnBack.visible = true;
                // this.effect.visible = true;
                this.char.m_name = msMoudle.herojson[getIndex].name;
                this.char.changeAll(this, E, 405, 295);
            });

            let chouka = new app.role();
			chouka.isChouKa = true;
			chouka.isLoop = false;
			// chouka.mScale = 2;
			chouka.changeAllByZDH(Laya.stage, "res/chouka/chouka", Laya.stage.width / 2 - 155 * chouka.mScale, Laya.stage.height / 2 - 276 * chouka.mScale - 50, 29);
        }

        ////herosdata   是英雄商店的数据       (控制英雄商店里面的表现形式)
        ////otherherodata   是队伍中的数据
        ////otherheroservedata  服务器的数据

        onBtnBackClick(e: Laya.Event): void {
            // Laya.Tween.to(this, {x:400, y:300,scaleX:0.25, scaleY:0.25}, 250);
            // Laya.timer.once(250, this, ()=> {
                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                }

                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = true;
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.one.visible = true;
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.ten.visible = true;

                this.close();
            // });
        }

    }
}