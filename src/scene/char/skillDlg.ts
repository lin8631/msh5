/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.char {
    import cssMsg = MsgRole.Msg;

    export class skillDlg extends ui.char.skillDlgUI implements ui.char.IskillDlgUI {
        public static className = "app.char.skillDlg";

        private m_index:number = 0;
        private m_msg:cssMsg;
        private skillArr:Array<any> = [];
        private sArr:Array<any> = [];

        onInitialize(){
            this.updateData();

            // msMoudle.popShow(this, (800 - 600) / 2, (600 - 400) / 2, true);
            // this.x = (800 - 600) / 2;

            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 400) / 2 - (Laya.stage.height - 600) / 2;

            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = false;
            //         }
            //     }
            // }

        }

        updateData() : void {
            this.lstSkill.vScrollBarSkin = "";

            for(let key in msMoudle.skilljson) {
                if( Math.floor(msMoudle.skilljson[key].id / 1000) == 800 ) {
                    this.skillArr[this.skillArr.length] = msMoudle.skilljson[key];
                }
            }

            this.m_msg = new cssMsg();

            this.putOnSkill();
        }

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 300, 200, true);
            this.close();
            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = true;
            //         }
            //     }
            // }
        }

        putOnSkill() : void {
            this.sArr = new Array(15);
            for(let i:number = 0; i < this.skillArr.length; i++) {
                this.sArr[i] = new Object();
                this.sArr[i].wear = false;
                for(let _:number = 0; _ < ms.wear_skill.length; _++) {
                    if(this.skillArr[i].id == ms.wear_skill[_]) {
                        this.sArr[i].wear = true;
                        break;
                    }
                }
                this.sArr[i].have = ms.have_skill[i];
                this.sArr[i].json = this.skillArr[i];
            }

            this.lstSkill.dataModel = this.sArr;
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updSkill();
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updataSuo();

            ms.saveServer();
        }

        putOffSkill(id:number) : void {
            for(let i:number = 0; i < ms.wear_skill.length; i++) {
                if(ms.wear_skill[i] == id) {
                    ms.wear_skill[i] = null;
                    break;
                }
            }
            this.putOnSkill();
        }

        onLstSkillCellClick(e: Laya.Event, index: number): void {
            if(this.skillArr[index]) {
                let is_eqp:boolean = false;
                for(let i:number = 0; i < ms.wear_skill.length; i++) {
                    if(ms.wear_skill[i]) {
                        if(ms.wear_skill[i] == this.skillArr[index].id) {
                            is_eqp = true;
                            break;
                        }
                    }
                }
                if(is_eqp)
                    this.m_msg.cailiaoSkillShow(this.skillArr[index], this, "卸下");
                else {
                    if(this.sArr[index].have)
                        this.m_msg.cailiaoSkillShow(this.skillArr[index], this, "装备");
                    else this.m_msg.cailiaoSkillShow(this.skillArr[index], null, "装备");
                }
            }
        }

        onClose() {
        }

        //
    }
}