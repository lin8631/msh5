module app.worldmap {

    export class bossMapDlg extends ui.worldmap.bossMapDlgUI implements ui.worldmap.IbossMapDlgUI {
        public static className = "app.worldmap.bossMapDlg";

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

        }

        m_name:Array<any> = [];
        m_map:Array<any> = [];
        m_mapLimits:any = {};

        //100020200 000050000
        m_lv = [1, 1, 8, 10, 15, 15,
        20, 30, 40, 50, 55, 55, 55,
        60, 70, 80, 85, 85, 85,
        90, 100, 110, 115, 115, 115,
        120, 125, 125,125,125,
        130, 135,135, 135,135,
        140, 150,160];

        updateData() : void {

            this.m_name = msMoudle.maplejson["b_name"].split(",");
            this.m_map = msMoudle.maplejson["b_map"].split(",");
            this.m_mapLimits = msMoudle.maplejson["yz_limit"];

            this.lstMap.vScrollBarSkin = "";
            // this.lstMap.visible = false;
            let tArr:Array<any> = [];
            for(let i:number = 0; i < this.m_name.length; i++) {
                tArr[i] = new Object();
                tArr[i].name = this.m_name[i];
                tArr[i].lv = this.m_lv[i];
            }
            this.lstMap.dataModel = tArr;
        }

        teamBossClickTime = 0;
        onLstMapCellClick(e: Laya.Event, index: number): void {
            let curTime = Sync.serverTime();
            if(curTime - this.teamBossClickTime < 2000) {
                msMoudle.toast("操作过于频繁");
                return;
            }
            this.teamBossClickTime = curTime;
            // let mapId = this.m_map[index];
            // if(index != 17 && index != 19 && index != 25) {
            //     if(index <= 22) {
            //         msMoudle.help = null;
            //         msMoudle.tiaotiao_map = mapId + ".img";
            //         console.log("##change map id=", msMoudle.tiaotiao_map);
            //         msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
            //         this.close();
            //     }
            //     else {
            //         msMoudle.toast("暂未开放");
            //     }
            //     return;
            // }
            let mapId = this.m_map[index];
            let limit = this.m_mapLimits[mapId];
            if(!limit) {
                msMoudle.help = null;
                msMoudle.tiaotiao_map = mapId + ".img";
                console.log("##change map id=", msMoudle.tiaotiao_map);
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                this.close();
                return;
            }
            if(!Sync.partyId) {
                msMoudle.toast("请先组建一个队伍");
                return;
            }
            let isLead = false;
            let myParty: any = null;
            for(let i=0; i<Sync.partyList.length; ++i) {
                let party = Sync.partyList[i];
                if(party && party.members[0] == ms.user) {
                    isLead = true;
                    myParty = party;
                    break;
                }
            }
            if(!isLead) {
                msMoudle.toast("请让队长与我对话");
                return;
            }
            let str = "";
            let str2 = "";

            // console.log("##limit, ", limit)
            if(limit) {
                if(myParty.members.length < limit[0]) {
                    msMoudle.toast("至少需要" + limit[0] + "人队伍");
                    return;
                }
                if(ms.herodata.ZS < limit[1] && ms.herodata.Lv < limit[2]) {
                    msMoudle.toast("远征需要转生次数" + limit[1] + "或者等级" + limit[2]);
                    return;
                }
            }
            for(let j=1; j<myParty.members.length; ++j) {
                let memberId = myParty.members[j];
                let isInMap = false;
                let isLvlFit = true;
                for(let i=0; i<Sync.realPlayers.length; ++i) {
                    let player = Sync.realPlayers[i];
                    if(player && player.m_id) {
                        if(player.m_id == memberId) {
                            isInMap = true;
                            if(limit) {
                                if(player.m_zs < limit[1] && player.m_lv < limit[2]) {
                                    isLvlFit = false;
                                }
                            }
                            break;
                        }
                    }
                }
                if(!isInMap) {
                    if(str) str += ",";
                    str += myParty.mNames[j];
                }
                else if(!isLvlFit) {
                    if(str2) str2 += ",";
                    str2 += myParty.mNames[j];
                }
            }
            if(str) {
                msMoudle.toast("队友 " + str + " 不在地图");
                return;
            }
            else if(str2) {
                msMoudle.toast("远征需要转生次数" + limit[1] + "或者等级" + limit[2] + "，队友" + str2 + "不符合");
                return;
            }
            Sync.teamBoss(mapId + ".img", ()=>{
                msMoudle.help = null;
                msMoudle.tiaotiao_map = mapId + ".img";
                console.log("##change map id=", msMoudle.tiaotiao_map);
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                this.close();
            }, (code: number)=>{
                if(code == -1) {
                    msMoudle.toast("里面有人正在挑战");
                }
                else {
                    msMoudle.toast("开启失败");
                }
            })
            return;
            // if(ms.herodata.Lv >= this.m_lv[index] || ms.herodata.ZS > 0) {

                msMoudle.help = null;
                msMoudle.tiaotiao_map = mapId + ".img";
                console.log("##change map id=", msMoudle.tiaotiao_map);
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                this.close();

            // }
            // else {
            //     msMoudle.toast("你的等级不足" + this.m_lv[index] + "级");
            // }
        }

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

            //
        }
    }

    //
}