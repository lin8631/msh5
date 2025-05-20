module app.worldmap {

    export class partyDlg extends ui.worldmap.partyDlgUI implements ui.worldmap.IpartyDlgUI {
        public static className = "app.worldmap.partyDlg";

        onInitialize(){

            this.x = (Laya.stage.width - 672) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 410) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.updateData();

            // ui.manager.getDialogByName("app.worldmap.partyDlg").dlg.updateData();

        }

        updateData() : void {
            if(Sync.partyId == 0) {
                this.btnQuit.label = "快速创建";
            }
            else {
                this.btnQuit.label = "退出队伍";
            }

            this.lstParty.vScrollBarSkin = "";
            // let tArr:Array<any> = [];
            // for(let i:number = 0; i < 3; i++) {
            //     tArr[i] = new Object();
            //     tArr[i].name = i + "";
            // }
            // this.lstParty.dataModel = tArr;
            for(let i=0; i<Sync.partyList.length; ++i) {
                let party = Sync.partyList[i];
                party.myParty =  party.id == Sync.partyId;
            }
            this.lstParty.dataModel = Sync.partyList;
        }

        onLstPartyCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            let party = Sync.partyList[index];
            if(!party || !party.members) return;
            if(childVarName == "btnJoin") {
                if(Sync.partyId > 0) {
                    msMoudle.toast("你已经加入了组队");
                    return;
                }
                if(Sync.serverTime() - Sync.lastJoinTime < 10000) {
                    msMoudle.toast("操作过于频繁，请稍后操作");
                    return;
                }
                Sync.joinParty(party.id, ()=>{
                    msMoudle.toast("加入队伍成功")
                    this.updateData();
                }, ()=>{
                    this.updateData();
                })
            }
            else if(childVarName.length == 4 && childVarName.indexOf("btn") > -1) {
                if(party.members[0] != ms.user) return;
                let idx = Number(childVarName[3]) - 1;
                if(idx == 0) return;
                if(party.members[idx])
                    Sync.kickoffParty(party.members[idx]);
            }
        }

        onLstPartyCellClick(e: Laya.Event, index: number): void {
            // msMoudle.toast("xxxx, " + index)
            let party = Sync.partyList[index];
            if(!party || !party.members) return;
            if(Sync.partyId > 0) {
                msMoudle.toast("你已经加入了组队");
                //test
                // if(party.members[1])
                // Sync.kickoffParty(party.members[1]);
                return;
            }
            Sync.joinParty(party.id, ()=>{
                msMoudle.toast("加入队伍成功")
                this.updateData();
            }, ()=>{
                this.updateData();
            })
        }
        //
        //

        onClose() : void {

        }

        onBtnBackClick(e: Laya.Event): void {

            this.close();

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onBtnQuitClick(e: Laya.Event): void {
            if(Sync.partyId == 0) {
                Sync.createParty(()=>{
                    msMoudle.toast("创建队伍成功")
                    this.updateData();
                })
            }
            else {
                Sync.quitParty(()=>{
                    msMoudle.toast("退出队伍成功")
                    this.updateData();
                })
            }
        }
    }

    //
}