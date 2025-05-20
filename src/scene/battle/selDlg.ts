module app.battle {

    export class selDlg extends ui.battle.selDlgUI implements ui.battle.IselDlgUI {
        public static className = "app.battle.selDlg";

        constructor(){
            super();
        }

        onInitialize(){

            this.x = (Laya.stage.width - 680) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 420) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.mainT) {
                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.visible = false;
                }
            }

            msMoudle.MapInit();

            this.updateData();
        }

        onBtnCKClick(e: Laya.Event): void {
            ui.show(app.battle.selshwoDlg, {params:[0]});
        }
        onBtnJBClick(e: Laya.Event): void {
            ui.show(app.battle.selshwoDlg, {params:[1]});
        }

        public updateData(){
            this.m_index = ms.selHero;
            this.lstHero.vScrollBarSkin = "";
            this.lstHero.dataSource = ms.m_job;
        }

        m_index:number = 0;
        onLstHeroCellClick(e: Laya.Event, index: number): void {
            if(ms.selHero != index) {
                if(ms.m_job[index] != "") {
                    this.m_index = index;
                    ui.show(app.battle.chooseDlg, {black:true})
                    // this.lstHero.dataSource = ms.m_job;
                }
                else {
                    // if(index >= 39) {
                    //     msMoudle.toast("番外角色不能直接购买");
                    //     return ;
                    // }
                    // if(index <= 38) {
                    // if(index <= 39) {
                        // if(ms.m_job[index-1] != "") {
                            // msMoudle.toast("购买成功");
                            ui.show(app.battle.buyDlg, {params:[index], black:true})
                        // }
                        // else {
                        //     msMoudle.toast("请先购买前置职业")
                        // }
                    // }
                    // else {
                    //     msMoudle.toast("暂未开放");
                    // }
                }
            }
        }

        public selOK() : void {
            ms.selHero = this.m_index;

            if(msMoudle.isScreen() && msMoudle.mainT.cz_sp) {
                if(msMoudle.mainT.cz_sp.getChildByName("rockerSk1"))
                msMoudle.mainT.cz_sp.getChildByName("rockerSk1").skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill[ms.selHero] + ".icon.png";
                if(msMoudle.mainT.cz_sp.getChildByName("rockerSk2"))
                msMoudle.mainT.cz_sp.getChildByName("rockerSk2").skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill2[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill2[ms.selHero] + ".icon.png";
                if(msMoudle.mainT.cz_sp.getChildByName("rockerSk3"))
                msMoudle.mainT.cz_sp.getChildByName("rockerSk3").skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill3[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill3[ms.selHero] + ".icon.png";
                if(msMoudle.mainT.cz_sp.getChildByName("rockerState"))
                msMoudle.mainT.cz_sp.getChildByName("rockerState").skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill4[ms.selHero]) / 10000) + ".img/skill." + msMoudle.m_skill4[ms.selHero] + ".icon.png";
                if(msMoudle.mainT.cz_sp.getChildByName("rockerState2"))
                msMoudle.mainT.cz_sp.getChildByName("rockerState2").skin = "res/Skill/"  + Math.floor(Number(msMoudle.m_skill5[0]) / 10000) + ".img/skill." + msMoudle.m_skill5[0] + ".icon.png";
            }

            msMoudle.mapP.changeForceSp();
            //标记重新加载资源
            msMoudle.loadPng = true;
            //卸载之前的资源
            msMoudle.rmvPng = true;

            ///增加一个确定切换即可
            ms.saveServer();
            this.close();
            msMoudle.gameP.gotoScene(ms.lastmap);
        }

        addHero(index:number) : void {
            ms.m_job[index] = msMoudle.m_job[index];
            this.lstHero.dataSource = ms.m_job;
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

    }
}