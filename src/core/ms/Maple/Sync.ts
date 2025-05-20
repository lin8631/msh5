module Sync {
    import cssCharacter = CharacterRole.Character;

    var difTime = 0;
    export var map: MapRole.Map;
    var last_x = 0;
    var last_y = 0;
    var last_dir = 1;
    var last_action = "stand";
    var last_lvl = 0;
    var last_emj = -1;
    var last_up = false;
    var last_down = false;
    var last_left = false;
    var last_right = false;
    var send_status_time = 0;
    var attack_mob_infos: any[] = [];
    var pick_item_infos: any[] = [];
    export var roleJump = false;
    export var realPlayers : cssCharacter[] = [];
    export var mapInfo: any;
    export var dropInfo: any;
    export var needSendMobInfo = false;
    export var isTheOne = false;
    export var loadLifeOver = false;
    export var partyId = 0;  // 0 无队伍
    export var partyList: any[] = [];
    export var lastJoinTime = 0;

    export var testNum = 1;

    function isWildMap() {
        if(!map || !map.m_id) return false;
        if(msMoudle.isSyncMap(map.m_id) == false) return false;
        return !msMoudle.isAuMap(map.m_id) && map.m_id != "000020000_gai.img";
    }

    export function serverTime() {
        return new Date().getTime() + difTime;
    }

    export function leaveMap() {
        map = null;
        attack_mob_infos = [];
        pick_item_infos = [];
    }

    /**
     *
     * @param mob 可以是怪物对象，也可以是{x:0,y:1}这种结构体
     * @param reward
     */
    export function showDrop(mob: any, reward: any[]) {

        if(reward.length > 0) {
            for(let i:number = 0; i < reward.length; i++) {
                let tIndex:number = msMoudle.mainT.m_itemList.length;


                //非同步地图处理
                if(msMoudle.mapP && msMoudle.mapP.m_id && msMoudle.isSyncMap(msMoudle.mapP.m_id) == false) {
                    reward[i].uniqueId = msMoudle.getRandValue(0, 0, 100000000);
                }

                // console.log("##showDrop, ", reward)

                msMoudle.mainT.m_itemList[tIndex] = Laya.Pool.getItemByClass("ItemRole.Item", ItemRole.Item);//new cssItem();
                msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward[i], reward.length, i, mob.m_x || mob.x, mob.m_y || mob.y, reward[i].uniqueId);
            }
        }
    }
    export function showSingleItem(reward: any) {
        let tIndex:number = msMoudle.mainT.m_itemList.length;
        msMoudle.mainT.m_itemList[tIndex] = Laya.Pool.getItemByClass("ItemRole.Item", ItemRole.Item);//new cssItem();
        msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward, reward.len, reward.index, reward.x, reward.y, reward.uniqueId);
    }

    export function sendVersionCheck(myVersion: number, cb?: any) {
        let message = new Net.Message();
        message.xieyi = 10083 + ms._dpip;
        message.msdata = myVersion;
        msMoudle.wsocket.sendMsg({param: message, success:(data: any) => {
            // console.log("sendVersionCheck success", data);
            if(data["code"] == 0) {
                if(cb) cb();
            }
        }});
    }

    export function sendHeartBeat(cb?: any) {
        let message = new Net.Message();
        message.xieyi = 10084 + ms._dpip;
        message.msdata = {id: ms.user };
        msMoudle.wsocket.sendFastMsg({param: message});
    }

    export function sendReconnect(cb?: any, error?: any) {
        let message = new Net.Message();
        message.xieyi = 10082 + ms._dpip;
        message.msdata = {id: ms.user };
        msMoudle.wsocket.sendMsg({param: message, success:(data: any) => {
            // console.log("sendReconnect success", data);
            if(!data) return;
            let res = data["code"] || 0;
            if(cb) cb(res);
        }, fail: ()=>{
            if(error) error();
        }});
    }

    export var errT:number = 0;
    export function enterMap(_map: any, cb?: any) {
        map = _map;
        hasShowOthers = false;
        // if(!isWildMap()) {
        //     if(cb) cb([]);
        //     return;
        // }
        let message = new Net.Message();
        message.xieyi = 10085 + ms._dpip;
        message.msdata = {id: ms.user, mapId: map.m_id};
        msMoudle.wsocket.sendMsg({param:message, success: (data: any) => {
            // console.log("enterMap success", data);
            if(!data["msdata"]) return;
            Sync.errT = 0;
            mapInfo = data["msdata"]["map"];
            isTheOne = data["msdata"]["isTheOne"];
            //地图内其他人的职业，数组
            let otherJobs = data["msdata"]["jobs"] || [];
            loadLifeOver = false;
            let time = data["time"];
            if(time) {
                difTime = Number(time) - new Date().getTime();
                // console.log("#difTime is ", difTime);
            }
            // console.log("mapInfo, ", mapInfo)
            if(!isWildMap()) {
                isTheOne = false;
                otherJobs = [];
            }
            if(cb) cb(otherJobs);
        }, fail: (err?: any) => {
            Sync.errT++;
            if(Sync.errT > 5) {
                msMoudle.toast("获取地图信息失败，重试中。。。")
            }
            Laya.timer.once(100, Laya.stage, enterMap, [_map, cb]);
        }});
    }

    export function reportMap(success?: any, fail?: any) {
        if(!isWildMap()) {
            return;
        }
        Laya.timer.clear(Laya.stage, reportMyStatus);
        Laya.timer.clear(Laya.stage, reportMobs);
        Laya.timer.clear(Laya.stage, reportAttackMobs);
        Laya.timer.clear(Laya.stage, reportPickItems);
        realPlayers = [];
        last_x = map.ViewX;
        last_y = map.ViewY;
        last_dir = 1;
        last_action = "stand";
        last_lvl = ms.herodata.Lv;
        if(!map.char) return;

        let sendInfo = ()=>{
            let pets :any = [];
            //是否有群宠
            // if(ms.morepet) {
            //     for(let i:number = 0; i < ms.petbagsdata.length; i++) {
            //         if(ms.petbagsdata[i]) {
            //             pets.push(ms.petbagsdata[i].id);
            //         }
            //     }
            // }
            // else {
                if(ms.pet) {
                    if(ms.pet.id != "N") {
                        pets.push( msMoudle.rmvImg(ms.pet.id) );
                    }
                }
            // }
            let message = new Net.Message();
            message.xieyi = 10086 + ms._dpip;
            message.msdata = {id: ms.user, mapId: map.m_id, name: map.char.m_name, E: map.char.m_E, action: map.char.m_action || "stand",
            dir: map.char.m_dir, x: map.char.m_x, y: map.char.m_y, zs: ms.herodata.ZS, lvl: ms.herodata.Lv, job: map.char.selJob, params: [ms.tamingmobbagsdata.length, ms.petbagsdata.length, ms.ringbagsdata.length, ms.chairbagsdata.length, pets]};
            let mapId = map.m_id;
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                // console.log("reportMap success", data);
                if(!map || map.m_id != mapId || !map.char) return;
                if(data["msdata"]) {
                    partyList = data["msdata"]["partyList"] || [];
                    showOthers(data["msdata"]["others"] || []);
                    if(!msMoudle.isBossMap()) //重新进boss地图，不显示已有的
                        showDrops(data["msdata"]["drops"] || {});

                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                        Laya.timer.frameLoop(60, Laya.stage, reportMyStatus);
                        reportMobs();
                        Laya.timer.loop(1000 * 10, Laya.stage, reportMobs);
                        Laya.timer.frameLoop(30, Laya.stage, reportAttackMobs);
                        Laya.timer.frameLoop(10, Laya.stage, reportPickItems);

                        // setTimeout(() => {
                        //     Laya.timer.frameLoop(60, this, ()=>{
                        //         autoMove();
                        //     });
                        // }, 2000);
                    }
                }
            }, fail: (err: any) => {
                // console.log("reportMap error", err);
                // if(map) Laya.timer.once(100, Laya.stage, reportMap);
                if(fail) fail();
            }});
        }
        sendInfo();
    }

    // function autoMove() {
    //     msMoudle.mainT.onKeyUp({keyCode: Laya.Keyboard.SPACE});
    //     msMoudle.mainT.onKeyDown({keyCode: Math.random() < 0.5 ? Laya.Keyboard.A : Laya.Keyboard.D});
    //     let rnd = Math.random();
    //     if(rnd < 0.1) {
    //         msMoudle.mainT.onKeyUp({keyCode: Laya.Keyboard.J});
    //     }
    //     else if(rnd < 0.4) {
    //         msMoudle.mainT.onKeyUp({keyCode: Laya.Keyboard.L});
    //     }
    // }

    export function reportMyOperate(op: string, dirs: any[], morph: any) {
        if(!isWildMap()) {
            return;
        }
        if(Sync.realPlayers.length == 0) return;
        if(realPlayers.length == 0) {  //地图内没有其他玩家，不发送
            return;
        }
        if(op == "dir") {
            if(!msMoudle.mainT || !msMoudle.mainT.m_control || !msMoudle.mainT.m_hero) return;
            if(last_left == msMoudle.mainT.leftkey && last_right == msMoudle.mainT.rightkey && last_up == msMoudle.mainT.upkey && last_down == msMoudle.mainT.downkey) return;

            last_left = msMoudle.mainT.leftkey;
            last_right = msMoudle.mainT.rightkey;
            last_up = msMoudle.mainT.upkey;
            last_down = msMoudle.mainT.downkey;
        }
        // let hero = msMoudle.mainT.m_hero;
        // if(op == "dir" && !((hero.m_action && (hero.m_action.indexOf("stand") > -1 || hero.m_action.indexOf("walk") > -1)) || hero.m_up_t != 0 || hero.m_down_t != 0)) {
        //     return;
        // }

        let message = new Net.Message();
        message.xieyi = 10098 + ms._dpip;
        message.msdata = {id: ms.user, mapId: map.m_id, name: map.char.m_name, E: map.char.m_E, action: map.char.m_action || "jump",
        dir: map.char.m_dir, x: map.char.m_x, y: map.char.m_y, lvl: ms.herodata.Lv, emj:map.char.m_emjIdx, fs: map.char.m_fenshen };
        if(op == "skill") {
            if(!map.char.m_skillId) return;
            message.msdata.skillId = map.char.m_skillId;
            map.char.m_skillId = "";
            // console.log("#send skill")
        }
        message.msdata.key = op;
        message.msdata.dirs = dirs;
        message.msdata.morph = morph;
        // msMoudle.wsocket.requestApi2(message).done(data => {
        //     // console.log("reportMyStatus success", data);
        // });
        // setTimeout(() => {
            msMoudle.wsocket.sendFastMsg({param: message});
        // }, Math.random() * 1500);
        // msMoudle.wsocket.sendMsg({param: message});
    }

    export var sendCnt = 0;
    export var rcvCnt = 0;
    export var lstState:any;
    export function reportMyStatus(force:boolean = false) {
        if(!isWildMap()) {
            return;
        }
        if(Sync.realPlayers.length == 0) return;
        let curState = {id: ms.user, mapId: map.m_id, name: map.char.m_name, E: map.char.m_E, action: map.char.m_action || "jump",
        dir: map.char.m_dir, x: map.char.m_x, y: map.char.m_y, lvl: ms.herodata.Lv, emj:map.char.m_emjIdx, fs: map.char.m_fenshen };
        if(force || !Sync.lstState || Sync.lstState.id != curState.id || Sync.lstState.mapId != curState.mapId || Sync.lstState.name != curState.name || Sync.lstState.E != curState.E || Sync.lstState.action != curState.action || Sync.lstState.dir != curState.dir || Sync.lstState.x != curState.x  || Sync.lstState.y != curState.y || Sync.lstState.lvl != curState.lvl || Sync.lstState.emj != curState.emj || Sync.lstState.fs != curState.fs) {
            let message = new Net.Message();
            message.xieyi = 10087 + ms._dpip;
            message.msdata = curState;
            //记录防止重复
            Sync.lstState = curState;
            msMoudle.wsocket.sendFastMsg({param: message, success:() => {
            }});
        }
    }

    export function reportMyFashions() {
        if(!isWildMap()) {
            return;
        }
        if(Sync.realPlayers.length == 0) return;

        let message = new Net.Message();
        message.xieyi = 10087 + ms._dpip;
        message.msdata = {id: ms.user, mapId: map.m_id, name: map.char.m_name, E: map.char.m_E};
        msMoudle.wsocket.sendFastMsg({param: message});
    }
    export function toggleTamingMob(isOn = true) {
        if(!isWildMap()) {
            return;
        }
        // console.log("#toggleTamingMob, ", isOn, hasShowOthers)
        if(Sync.realPlayers.length == 0) return;
        // msMoudle.tamingmob1, msMoudle.tamingmob2
        // this.m_hero.partIndex[msMoudle.partType.tTamingMob] =    ms.tamingmob.tamingmob1;//01902000  01902028    01902032
        //                 this.m_hero.partIndex[msMoudle.partType.tTamingMob0] =
        let E = map.char.m_E;
        if(isOn) {
            E.tamingmob = msMoudle.tamingmob1;
            E.tamingmob0 = msMoudle.tamingmob2;
        }
        else {
            E.tamingmob = "N";
            E.tamingmob0 = "N";
        }
        let message = new Net.Message();
        message.xieyi = 10088 + ms._dpip;
        message.msdata = {id: ms.user, E: E};
        // msMoudle.wsocket.requestApi2(message).done(data => {
        //     // console.log("toggleTamingMob success", data);
        // });
        msMoudle.wsocket.sendFastMsg({param: message});
    }

    //定时上传怪物数据
    export function reportMobs() {
        if(!isTheOne|| !map.m_life || !map.m_life.m_mobsAni || map.m_life.m_mobsAni.length < 1) {
            return;
        }

        ///修改
        let sNum = 0;
        if(mapInfo) {
            for(let i:number = 0; i < mapInfo.length; i++) {
                if(mapInfo[i] != null) sNum++;
            }
        }
        if(mapInfo && sNum != map.m_life.m_mobsAni.length) return;

        let message = new Net.Message();
        message.xieyi = 10090 + ms._dpip;
        message.msdata = {id: ms.user, mapId: map.m_id};
        let mapInfo2: any[] = [];
        for(let i=0; i<map.m_life.m_mobsAni.length; ++i) {
            let mob = map.m_life.m_mobsAni[i];
            if(mob.m_hasInit) {
                let info = {index: mob.m_index, hp: mob.m_hp, maxHp: mob.m_maxhp, mobTime:mob.msgData.mobTime, x: mob.m_x, y: mob.m_y, dir: mob.m_dir, action: mob.m_action};
                mapInfo2[mob.m_index] = info;
            }
        }
        message.msdata.map = mapInfo2;

        // console.log("reportMobs ", message.msdata);

        // msMoudle.wsocket.requestApi2(message).done(data => {
        //     if(data["msdata"]) {
        //         // console.log("reportMobs success", data);
        //         isTheOne = data["msdata"]["isTheOne"];
        //         //怪物扣血应该在这里处理，后面加
        //     }
        // });
        msMoudle.wsocket.sendMsg({param: message, success: (data: any)=>{
            if(data["msdata"]) {
                // console.log("reportMobs success", data);
                isTheOne = data["msdata"]["isTheOne"];
            }
        }});
    }

    //人物攻击怪物，暂时不处理伤害
    export function attackMob(mob: MobRole.Mob, hit: any, reward?: any, exp?: number, cb?: any) {
        if(!isWildMap()) {
            return;
        }
        attack_mob_infos.push({index: mob.m_index, hp: mob.m_hp, maxHp: mob.m_maxhp, mobTime:mob.msgData.mobTime, x: mob.m_x, y: mob.m_y, dir: mob.m_dir, hit: hit, reward: reward, exp: exp});
    }

    export function reportAttackMobs() {
        // mob: MobRole.Mob, hit: any, reward?: any, exp?: number, cb?: any
        if(attack_mob_infos.length < 1) return;
        let message = new Net.Message();
        message.xieyi = 10091 + ms._dpip;
        message.msdata = attack_mob_infos;
        let mapId = map.m_id;
        let tmpArr: any[] = [];
        for(let i=0; i<attack_mob_infos.length; ++i) {
            tmpArr[i] = attack_mob_infos[i];
        }
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            if(!map || map.m_id != mapId || !map.char) return;
            // console.log("#acttackmob ok, ", data)
            // if(cb) cb(data["exp"], data["uniqueIds"]);
            let dropItems = data.dropItems;
            let exps = data["exp"];
            if(dropItems) {
                showDrops(dropItems);
            }
            if(exps) {
                for(let i=0; i<exps.length; ++i) {
                    let exp = exps[i];
                    msMoudle.getExp(exp);
                    let dlg = ui.manager.getDialogByName("app.homeland.MajorCityDlg");
                    if(dlg && dlg.dlg)
                        dlg.dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
                }
            }
        }, fail: ()=>{
            // Laya.timer.once(500, Laya.stage, ()=>{
                attack_mob_infos = tmpArr.concat(attack_mob_infos);
                // reportAttackMobs();
            // });
        }});
        attack_mob_infos = [];
    }
    // export function reportAttackMobs() {
    //     // mob: MobRole.Mob, hit: any, reward?: any, exp?: number, cb?: any
    //     if(attack_mob_infos.length < 1) return;
    //     let message = new Net.Message();
    //     message.xieyi = 10091 + ms._dpip;
    //     message.msdata = attack_mob_infos;
    //     let mapId = map.m_id;
    //     msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
    //         if(!map || map.m_id != mapId || !map.char) return;
    //         // console.log("#acttackmob ok, ", data)
    //         // if(cb) cb(data["exp"], data["uniqueIds"]);
    //         let dropItems = data.dropItems;
    //         let exps = data["exp"];
    //         if(dropItems) {
    //             showDrops(dropItems);
    //         }
    //         if(exps) {
    //             for(let i=0; i<exps.length; ++i) {
    //                 let exp = exps[i];
    //                 msMoudle.getExp(exp);
    //                 let dlg = ui.manager.getDialogByName("app.homeland.MajorCityDlg");
    //                 if(dlg && dlg.dlg)
    //                     dlg.dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
    //             }
    //         }
    //     }});
    //     attack_mob_infos = [];
    // }
    //拾取掉落物品
    export function pickItem(index: number, uniqueId: number, success?: any, fail ?: any) {
        if(!isWildMap()) {
            if(success) success();
            return;
        }
        pick_item_infos.push(uniqueId);
    }
    function reportPickItems() {
        if(pick_item_infos.length < 1) return;
        let message = new Net.Message();
        message.xieyi = 10092 + ms._dpip;
        message.msdata = pick_item_infos;
        let uniqueIds: number[] = [];
        for(let i=0; i<pick_item_infos.length; ++i) {
            uniqueIds[i] = pick_item_infos[i];
        }
        let mapId = map.m_id;
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("#reportPickItems ok, ", data)
            if(!map || map.m_id != mapId || !map.char) return;
            if(!data.msdata || !msMoudle.mainT || !msMoudle.mainT || !msMoudle.mainT.m_itemList) return;
            for(let k=0; k<data.msdata.length; ++k) {
                let uniqueId = uniqueIds[k];
                let res = data.msdata[k];
                for(let i=msMoudle.mainT.m_itemList.length-1; i>-1; --i) {
                    let item = msMoudle.mainT.m_itemList[i];
                    if(item && item.uniqueId == uniqueId) {
                        item.isSendPickReq = false;
                        if(res == -1) {
                            item.onRmv();
                            msMoudle.mainT.m_itemList.splice(i, 1);
                        }
                        else if(res == 0) {
                            // console.log("#success pick item, ", uniqueId)
                            item.doPickItem(map.char, i)
                        }
                        break;
                    }
                }
            }
        }, fail: (err: any) => {
            if(!msMoudle.mainT || !msMoudle.mainT.m_itemList) return;
            for(let i=msMoudle.mainT.m_itemList.length-1; i>-1; --i) {
                let item = msMoudle.mainT.m_itemList[i];
                if(item && uniqueIds.indexOf(item.uniqueId) > -1) {
                    item.isSendPickReq = false;
                }
            }
        }});
        pick_item_infos = [];
    }

    //人物被怪攻击
    export function beAttack(char: any, hit: any, cb?: any) {
        if(!isWildMap()) {
            return;
        }
        let info = {playerId: ms.user, hp: char.m_hp, x: char.m_x, y: char.m_y, dir: char.m_dir, hit: hit};
        let message = new Net.Message();
        message.xieyi = 10093 + ms._dpip;
        message.msdata = {id: ms.user, attack: info};
        // msMoudle.wsocket.requestApi2(message).done(data => {
        //     // console.log("beAttack success", data);
        //     //怪物扣血应该在这里处理，后面加
        // });
        msMoudle.wsocket.sendFastMsg({param: message});
    }

    //创建队伍
    export function getPartyList(cb ?: any) {
        let message = new Net.Message();
        message.xieyi = 10094 + ms._dpip;
        message.msdata = {id: ms.user};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("getPartyList, ", data);
            partyList = data["partyList"] || [];
            for(let i=0; i<partyList.length; ++i) {
                let party = partyList[i];
                if(party) {
                    for(let j=0; j<realPlayers.length; ++j) {
                        let player = realPlayers[j];
                        if(party.members.indexOf(player.m_id) > -1) {
                            player.m_partyId = party.id;
                        }
                    }
                }
            }
            if(cb) cb();
        }});
    }

    //创建队伍
    export function createParty(cb?: any) {
        if(!map || !map.char) return;
        let message = new Net.Message();
        message.xieyi = 10095 + ms._dpip;
        message.msdata = {id: ms.user, name: map.char.m_name};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("createParty, ", data);
            if(data["code"] == 0) {
                let party = data["party"];
                partyList.push(party);
                partyId = party.id;
                if(cb) cb();
            }
            else {
                // console.log("createParty fail")
            }
        }});
    }

    //退出队伍
    export function quitParty(cb?: any) {
        let message = new Net.Message();
        message.xieyi = 10096 + ms._dpip;
        message.msdata = {id: ms.user};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("quitParty, ", data);
            if(data["code"] == 0) {
                for(let i=0; i<partyList.length; ++i) {
                    let party = partyList[i];
                    if(party.id == partyId) {
                        if(party.members.length == 1) { //自己退出后队伍没人了
                            partyList.splice(i, 1);
                        }
                        else {
                            for(let j=0; j<party.members.length; ++j) {
                                if(party.members[j] == ms.user) {
                                    party.members.splice(j, 1);
                                    party.mNames.splice(j, 1);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                partyId = 0;
                for(let j=0; j<realPlayers.length; ++j) {
                    let player = realPlayers[j];
                    player.updateHpBar(false);
                }
                if(cb) cb();
            }
            else {
                // console.log("quitParty fail")
            }
        }});
    }

    //加入队伍
    export function joinParty(pId: number, success?: any, fail?: any) {
        // console.log("#send joinParty")
        let message = new Net.Message();
        message.xieyi = 10097 + ms._dpip;
        message.msdata = {id: ms.user, partyId: pId};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("joinParty, ", data);
            if(data["code"] == 0) {
                lastJoinTime = serverTime();
                for(let i=0; i<partyList.length; ++i) {
                    let party = partyList[i];
                    if(party.id == pId) {
                        party.members.push(ms.user);
                        party.mNames.push(ms.herodata.Name);
                        break;
                    }
                }
                partyId = pId;
                for(let j=0; j<realPlayers.length; ++j) {
                    let player = realPlayers[j];
                    if(player.m_partyId == pId) {
                        player.updateHpBar(true);
                    }
                }
                if(success) success();
            }
            else {
                // console.log("joinParty fail")
                if(data["code"] == -1) {
                    msMoudle.toast("队伍已满");
                }
                else {
                    msMoudle.toast("队伍已解散");
                }
                if(data["partyList"]) partyList = data["partyList"];
                if(fail) fail();
            }
        }});
    }

    //队伍踢人
    export function kickoffParty(playerId: number, success?: any, fail?: any) {
        let message = new Net.Message();
        message.xieyi = 10099 + ms._dpip;
        message.msdata = {id: ms.user, playerId: playerId};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            console.log("kickoffParty, ", data);
            if(data["code"] == 0) {
                msMoudle.toast("踢出成功");
                for(let i=0; i<partyList.length; ++i) {
                    let party = partyList[i];
                    if(party.id == partyId) {
                        let idx = party.members.indexOf(playerId);
                        if(idx > -1) {
                            party.members.splice(idx, 1);
                            if(party.mNames) party.mNames.splice(idx, 1);
                        }
                        break;
                    }
                }
                let dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
                if(dlg && dlg.dlg) {
                    dlg.dlg.updateData();
                }
            }
            else {
                // msMoudle.toast("踢人操作无效")
            }
        }});
    }

    //开启远征队
    export function teamBoss(mapId: string, success?: any, fail?: any) {
        let message = new Net.Message();
        message.xieyi = 10100 + ms._dpip;
        message.msdata = {id: ms.user, mapId: mapId};
        msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
            // console.log("teamBoss, ", data);
            if(data["code"] == 0) {
                msMoudle.toast("开启远征成功");
                if(success) success();
            }
            else {
                // msMoudle.toast("踢人操作无效")
                if(fail) fail(data["code"]);
            }
        }});
    }


    export function otherEnter(data: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherEnter, ", data)
        // if(Sync.realPlayers.length == 0) return;
        for(let i=realPlayers.length-1; i>-1; --i) {
            let player = realPlayers[i];
            if(player && player.m_id == data.id) {
                player.clearUp();
                realPlayers.splice(i, 1);
            }
        }
        showOtherPlayer(data);

        Sync.reportMyOperate("emj", [0], []);
    }
    export function otherLeave(id: any, isTheOne = false, isOffLine = true) {
        // console.log("##otherLeave, ", id, isTheOne);
        if(isTheOne) Sync.isTheOne = true;
        // if(Sync.realPlayers.length == 0) return;
        for(let i=0; i<realPlayers.length; ++i) {
            let player = realPlayers[i];
            if(player.m_id == id) {
                realPlayers.splice(i, 1);
                player.clearUp();
                player = null;
                break;
            }
        }

        if(isOffLine) {
            for(let i=0; i<partyList.length; ++i) {
                let party = partyList[i];
                if(party.id == partyId) {
                    let idx = party.members.indexOf(id);
                    if(idx > -1) {
                        party.members.splice(idx, 1);
                        party.mNames.splice(idx, 1);
                        msMoudle.toast("队友下线了");
                        let dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
                        if(dlg && dlg.dlg) {
                            dlg.dlg.updateData();
                        }
                    }
                    break;
                }
            }
            // console.log("队友下线了", partyList);
        }
    }
    function xx(x: number, min: number, max: number) {
        if(x <= min) return 0;
        if(x >= max) return 1;
        return (x - min) / (max - min);
    }
    // export function otherAction(data: any, seq: any) {
    //     // console.log("##otherAction, ", data)
    //     if(Sync.realPlayers.length == 0) return;
    //     let curTime = new Date().getTime();
    //     for(let i=0; i<realPlayers.length; ++i) {
    //         let player = realPlayers[i];
    //         if(player.m_id == data.id) {
    //             player.setDir(data.dir);
    //             player.setPos(data.x, data.y);

    //             if(data.skillId) {
    //                 if(data.skillId == "2101002") {
    //                     // console.log("##other shunyi")
    //                     msMoudle.mainT.showShunyiEffect(false, player);
    //                 }
    //                 else if(data.skillId == "4111006") {
    //                     // console.log("##other double jump")
    //                     msMoudle.mainT.showDoubleJumpEffect(false, player);
    //                 }
    //                 else {
    //                     player.showSkillById(data.skillId);
    //                 }
    //             }
    //             else if(data.action && player.m_action != data.action) {
    //                 player.changeByName(data.action, 0);
    //             }
    //             if(player.m_lv < data.lvl) {
    //                 if(player.m_state_sp) {
    //                     let be:BasicEffRole.BasicEff = new BasicEffRole.BasicEff();
    //                     be.loadBasicEff(player.m_state_sp, "LevelUp", 0, 0);
    //                 }
    //                 player.m_lv = data.lvl;
    //             }
    //             break;
    //         }
    //     }
    // }
    var actionSeq = 0;
    export function otherAction(datas: any[], seq: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherAction, ", datas[0])
        if(Sync.realPlayers.length == 0 || !datas || datas.length < 1 || actionSeq > seq) return;
        for(let m=0; m<datas.length; ++m) {
            let data = datas[m];
            for(let i=0; i<realPlayers.length; ++i) {
                let player = realPlayers[i];
                if(player.m_id == data.id) {
                    // player.setDir(data.dir);
                    // // if(!player.isDoubleJump)
                    // if(Math.abs(data.x - player.m_x) >= 1 || Math.abs(data.y - player.m_y) >= 1)
                    //     player.setPos(data.x, data.y);
                    if(data.emj > -1) {
                        if(msMoudle.mainT) msMoudle.mainT.showFaceByIndex(player, data.emj);
                    }
                    else {
                        player.setDir(data.dir);
                        if(Math.abs(data.x - player.m_x) >= 1 || Math.abs(data.y - player.m_y) >= 1)
                            player.setPos(data.x, data.y);
                    }

                    if(data.skillId) {
                        // console.log("##show skill ", data.skillId, ++rcvCnt)
                        if(data.skillId == "2101002") {
                            // console.log("##other shunyi")
                            msMoudle.mainT.showShunyiEffect(false, player);
                        }
                        else if(data.skillId == "4111006") {
                            // console.log("##other double jump")
                            msMoudle.mainT.showDoubleJumpEffect(false, player);
                        }
                        else {
                            player.showSkillById(data.skillId);
                        }
                    }
                    // else if(data.key == "jump") {
                    //     console.log("#other jump")
                    //     if(msMoudle.mainT) {
                    //         msMoudle.mainT.playerJump(player);
                    //     }
                    //     // player.changeByName(data.action || "jump", 0);
                    // }
                    else if(data.action && player.m_action != data.action) {
                        // if(data.action.indexOf("walk") > -1 && player.m_action && player.m_action.indexOf("stand") > -1) {
                        //     console.log("$begin move, ", player.key_left, " ", player.key_right, " ", data.dir)
                        // }
                        if(player.m_attack_list.indexOf(data.action) > -1) {
                            // console.log("##other atk")
                            if((player.m_up_t != 0 || player.m_down_t != 0) && player.canJumpAtk()) {
                                return;
                            }
                            player.m_armyList = map.m_life.m_mobsAni;
                            player.____x = map.m_life.m_mobsAni;
                            let rnk:number = msMoudle.getRandValue(0, 0, player.m_attack_list.length);
                            player.showAtk(player.m_attack_list[rnk], map.m_life.m_mobsAni);

                            player.changeByName(data.action, 0);
                        }
                        else {
                            player.changeByName(data.action, 0);
                            //二段跳之后可能会收不到方向变化的通知，特殊处理一下
                            if(data.action.indexOf("walk") > -1) {
                                player.key_left = data.dir == 1;
                                player.key_right = data.dir == -1;
                            }
                        }
                    }
                    if(player.m_lv < data.lvl) {
                        if(player.m_state_sp) {
                            let be:BasicEffRole.BasicEff = new BasicEffRole.BasicEff();
                            be.loadBasicEff(player.m_state_sp, "LevelUp", 0, 0);
                        }
                        player.m_lv = data.lvl;
                    }
                    break;
                }
            }
        }
    }
    export function otherOperate(data: any, seq: number) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherOperate, ", data)
        if(Sync.realPlayers.length == 0) return;
        for(let i=0; i<realPlayers.length; ++i) {
            let player = realPlayers[i];
            if(player.m_id == data.id) {
                if((player as any).opSeq && (player as any).opSeq >= seq) return;
                (player as any).opSeq = seq;
                let key = data.key;
                let dirs = data.dirs;
                if(!player.isDoubleJump) {
                    player.setDir(data.dir);
                }

                //这个强制拉回  （这个当作召唤兽处理？）
                if(key == "pos") {
                    // console.log(seq, data);
                    if(data.morph) {
                        ///这个是不需要AI的
                        //这里应该变成设置状态
                        player.showSummon(data.morph.id, data.morph.index, data.morph.act, data.morph.dir, data.morph.x, data.morph.y);
                    }
                    return ;
                }

                if(key != "dir" && key != "j" /*&& key != "jj"*/ && key != "sj" && key != "emj") {
                    if(key != "k" && key != "skill" && key != "pos") player.setPos(data.x, data.y);
                    else if(Math.abs(data.x - player.m_x) > 30 || Math.abs(data.y - player.m_y) > 30) player.setPos(data.x, data.y);
                }
                else {
                    //优化处理
                    if(key == "emj" || key == "k" || key == "skill") {
                         if(player.m_action) {
                            if(player.m_action.indexOf("stand") >= 0 || player.m_action.indexOf("walk") >= 0) {
                                if(Math.abs(data.x - player.m_x) > 30 || Math.abs(data.y - player.m_y) > 30) {
                                    player.setPos(data.x, data.y);
                                    msMoudle.mainT.showShunyiEffect(false, player);
                                }
                            }
                         }
                    }
                }
                if(data.emj > -1) {
                    if(msMoudle.mainT) msMoudle.mainT.showFaceByIndex(player, data.emj);
                }
                // if(data.action && player.m_action != data.action) {
                //     if(player.m_attack_list.indexOf(data.action) > -1) {
                //         player.m_armyList = map.m_life.m_mobsAni;
                //         player.____x = map.m_life.m_mobsAni;
                //         let rnk:number = msMoudle.getRandValue(0, 0, player.m_attack_list.length);
                //         player.showAtk(player.m_attack_list[rnk], map.m_life.m_mobsAni);
                //     }
                //     else {
                //         player.changeByName(data.action, 0);
                //     }
                // }
                if(key == "dir" && dirs && dirs.length == 4) {
                    // console.log("dir, ", dirs[2], dirs[3])
                    player.key_up = dirs[0];
                    player.key_down = dirs[1];
                    player.key_left = dirs[2];
                    player.key_right = dirs[3];
                    if(player.m_action && (player.m_action.indexOf("stand") >= 0 || player.m_action.indexOf("walk") >= 0 || (player.m_action == "jump" || player.m_action == "fly"))) {
                        if(player.key_left) player.setDir(1);
                        else if(player.key_right) player.setDir(-1);
                    }
                }
                else if(key == "j") {
                    // console.log("#other jump, ", data.action, player.m_action, player.m_up_t, player.m_down_t, player.m_y, player.key_left, player.key_right)
                    let jumpAction = "jump";
                    if(msMoudle.mainT && msMoudle.mainT.jump_action) {
                        jumpAction = msMoudle.mainT.jump_action;
                    }
                    player.changeByName(data.action || jumpAction, 0);
                    // console.log("#other j, ", data.action, player.key_left, player.key_right)
                    if(data.action == "ladder") {
                        player.key_left = dirs[2];
                        player.key_right = dirs[3];
                        if((player.key_left && !player.key_right) || (!player.key_left && player.key_right)) {
                            if(msMoudle.mainT) {
                                msMoudle.mainT.playerJump(player);
                            }
                            player.setDir(player.key_left ? 1 : -1);
                        }
                    }
                    else {
                        if(msMoudle.mainT) {
                            msMoudle.mainT.playerJump(player);
                        }
                    }
                }
                else if(key == "jj") {
                    // console.log("#other double jump, ", player.m_action)
                    if(msMoudle.mainT) {
                        msMoudle.mainT.playerdouJump(player, player.m_x, data.x);
                        msMoudle.mainT.showDoubleJumpEffect(false, player);
                    }
                }
                else if(key == "sj") {
                    // console.log("#other sea jump, ", player.m_action)
                    if(msMoudle.mainT) {
                        player.m_up_t = 0.18//0.36;
                        player.m_down_t = 0;
                    }
                }
                else if(key == "skill") {
                    if(data.skillId) {
                        // console.log("##show skill ", data.skillId, ++rcvCnt)
                        // if(data.skillId == "2101002") {
                        //     // console.log("##other shunyi")
                        //     if(dirs[0] == 0) {
                        //         msMoudle.mainT.HerodownMove(player, dirs[1]);
                        //     }
                        //     else {
                        //         msMoudle.mainT.fastMove(dirs[1], true, player);
                        //     }
                        //     msMoudle.mainT.showShunyiEffect(false, player);
                        // }
                        // else if(data.skillId == "4111006") {
                        //     // console.log("##other double jump")
                        //     msMoudle.mainT.showDoubleJumpEffect(false, player);
                        // }
                        // else {
                            player.showSkillById(data.skillId);
                        // }
                    }
                }
                else if(key == "ladder") {
                    player.changeByName("ladder", 0);
                }
                else if(key == "ladderOff") {
                    player.changeByName("stand", 0);
                }
                else if(key == "emj") {
                    if(dirs[0] > -1) {
                        if(msMoudle.mainT) msMoudle.mainT.showFaceByIndex(player, dirs[0]);
                    }
                    else {
                        player.setPos(data.x, data.y);
                    }
                }
                else if(key == "transport") {
                    player.setPos(dirs[0], dirs[1]);
                }
                else if(key == "k") {
                    player.m_armyList = map.m_life.m_mobsAni;
                    player.____x = map.m_life.m_mobsAni;
                    player.showAtk(player.m_attack_list[dirs[0]], map.m_life.m_mobsAni);
                }
                else if(key == "sy") {
                    msMoudle.mainT.showShunyiEffect(false, player);
                }
                break;
            }
        }
    }
    export function otherChangeFashion(data: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherChangeFashion, ", data)
        if(Sync.realPlayers.length == 0) return;
        for(let i=0; i<realPlayers.length; ++i) {
            let player = realPlayers[i];
            if(player.m_id == data.id) {
                player.partIndex[msMoudle.partType.tTamingMob] = data.E.tamingmob || "N";
                player.partIndex[msMoudle.partType.tTamingMob0] = data.E.tamingmob0 || "N";
                player.changeByNameForce("stand", 0);
                if(msMoudle.mainT) msMoudle.mainT.showTamingmobEff(player);
                break;
            }
        }
    }
    export var hasShowOthers = false;
    export function showOthers(others: any[]) {
        hasShowOthers = true;
        for(let i=0; i<others.length; ++i) {
            showOtherPlayer(others[i]);
        }
    }
    export function showDrops(drops: any[]) {
        if(!isWildMap()) {
            return;
        }
        // console.log("showDrops, ", drops)
        for(let i=0; i<drops.length; ++i) {
            let drop = drops[i];
            showSingleItem(drop);
        }
    }
    export function showOtherPlayer(data: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("#showOtherPlayer, ", data)
        let E = data.E;
        let char = new cssCharacter();
        char.m_id = data.id;
        char.m_special = true;
        char.m_name = data.name;
        // console.log("#showOtherPlayer, ", data)
        char.m_initAction = data.action;
        char.m_partyId = data.partyId || 0;
        char.m_zs = data.zs || 0;
        char.m_lv = data.lvl || 1;
        if(!char.m_fenshen && data.fs) char.m_fenshen = true;

        // ms.tamingmobbagsdata.length
        // ms.petbagsdata.length
        // ms.ringbagsdata.length
        // ms.chairbagsdata.length

        char.changeAll((map as any).m_sp, E, data.x, data.y, data.job, true, data.params);
        char.setDir(data.dir);
        //char.startAutoFight(false);
        //party
        for(let i=0; i<partyList.length; ++i) {
            let party = partyList[i];
            if(party && party.members.indexOf(char.m_id) > -1) {
                char.m_partyId = party.id;
            }
        }
        if(partyId && char.m_partyId == partyId)
            char.updateHpBar(true);
        //
        realPlayers.push(char);
    }
    var mobSeq = 0;
    export function updateMobs(data: any, mapId: string, seq: number) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##updateMobs, ", data, seq)
        if(seq < mobSeq || map.m_id != mapId) return;
        if(Sync.realPlayers.length == 0 || !map.m_life || !map.m_life.m_mobsAni) return;
        mapInfo = data["map"];
        isTheOne = false;
        //如果怪物已创建，更新状态
        for(let i=0; i<map.m_life.m_mobsAni.length; ++i) {
            let mob = map.m_life.m_mobsAni[i];
            let index = mob.m_index;
            let newInfo = mapInfo[index];
            if(newInfo) {
                if(Math.abs(mob.m_x - newInfo.x) > 10 || Math.abs(mob.m_y - newInfo.y) > 10)
                    mob.setPos(newInfo.x, newInfo.y);
                mob.setDir(newInfo.dir);
                mob.m_hp = newInfo.hp;
                mob.updateHpBar();
            }
        }
    }

    export function otherAttackMob(data: any, exps: any, atkId: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherAttackMob, ", data, exps)
        if(Sync.realPlayers.length == 0 || !map.m_life || !map.m_life.m_mobsAni) return;
        let userId = atkId;
        for(let j=0; j<realPlayers.length; ++j) {
            let player = realPlayers[j];
            if(player.m_id == userId) {
                for(let m=0; m<data.length; ++m) {
                    let info = data[m];
                    let index = info.index;
                    for(let i=0; i<map.m_life.m_mobsAni.length; ++i) {
                        let mob = map.m_life.m_mobsAni[i];
                        if(index == mob.m_index) {
                            mob.setPos(info.x, info.y);
                            mob.setDir(info.dir);
                            mob.m_hp = info.hp;
                            mob.updateHpBar();
                            if(mob.m_hp <= 0) {
                                mob.m_isdead = true;
                                let reward = info.reward;
                                if(reward) showDrop(mob, reward);
                            }
                            player.showNum(mob, info.hit);
                            // console.log("##########", info.hit, ", atkid=", atkId)
                            break;
                        }
                    }
                }
                if(exps) {
                    for(let m=0; m<exps.length; ++m) {
                        // console.log("##分到了经验值", exps[m])
                        if(exps[m]) {
                            msMoudle.getExp(exps[m]);
                            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
                        }
                        else {
                            msMoudle.toast("错误数据" + exps[m]);
                        }
                    }
                }
                break;
            }
        }
    }

    export function otherPickItem(data: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherPickItem, ", data)
        if(Sync.realPlayers.length == 0 || !data) return;

        let userId = data.id;
        let uniqueIds = data.uniqueIds;
        for(let j=0; j<realPlayers.length; ++j) {
            let player = realPlayers[j];
            if(player.m_id == userId) { //找到拾取物品的玩家
                for(let k=0; k<uniqueIds.length; ++k) {
                    let uniqueId = uniqueIds[k];
                    if(msMoudle.mainT.m_itemList) {
                        for(let i=msMoudle.mainT.m_itemList.length-1; i>-1; --i) {
                            let item = msMoudle.mainT.m_itemList[i];
                            if(item) {
                                if(item.uniqueId == uniqueId) {
                                    item.PickItem(player, i);
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
    }

    //服务端广播消失的物品uniqueId
    export function itemDisappear(uniqueIds: number[]) {
        if(!isWildMap()) {
            return;
        }
        for(let i=0; i<uniqueIds.length; ++i) {
            let uniqueId = uniqueIds[i];
            for(let j=msMoudle.mainT.m_itemList.length-1; j>-1; --j) {
                let item = msMoudle.mainT.m_itemList[j];
                if(item.uniqueId == uniqueId) {
                    item.DoSomeThing();
                    // item.onRmv();
                    msMoudle.mainT.m_itemList.splice(j, 1);
                    break;
                }
            }
        }
    }

    export function otherBeAttack(data: any) {
        if(!isWildMap()) {
            return;
        }
        // console.log("##otherBeAttack, ", data)
        if(Sync.realPlayers.length == 0 || !map.m_life || !map.m_life.m_mobsAni || !data || !data.attack) return;

        // let info = {playerId: char.m_id, hp: char.m_hp, x: char.m_x, y: char.m_y, dir: char.m_dir};

        let info = data.attack;
        let userId = info.playerId;
        for(let j=0; j<realPlayers.length; ++j) {
            let player = realPlayers[j];
            if(player.m_id == userId) {
                player.m_hp = info.hp;
                player.setPos(info.x, info.y);
                player.setDir(info.dir);
                if(map.m_life.m_mobsAni[0]) {
                    map.m_life.m_mobsAni[0].showNum(player, info.hit);
                }
                if(player.m_hp > 0) {
                    if(player.m_sp) player.m_sp.visible = true;
                    if(player.m_nametag_sp) player.m_nametag_sp.visible = true;
                    if(player.m_state_sp) player.m_state_sp.visible = true;
                    player.m_isdead = false;
                }
                if(partyId && player.m_partyId == partyId)
                    player.updateHpBar(true);
                break;
            }
        }
    }

    export function otherJoinParty(id: any, name: string) {
        for(let i=0; i<realPlayers.length; ++i) {
            let player = realPlayers[i];
            if(player.m_id == id) {
                player.m_partyId = partyId;
                player.updateHpBar(true);
                break;
            }
        }
        for(let i=0; i<partyList.length; ++i) {
            let party = partyList[i];
            if(party.id == partyId) {
                party.members.push(id);
                if(party.mNames) party.mNames.push(name);
                break;
            }
        }
        msMoudle.toast("有人加入队伍");
        let dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
        if(dlg && dlg.dlg) {
            dlg.dlg.updateData();
        }
    }

    export function otherQuitParty(id: any) {
        for(let i=0; i<realPlayers.length; ++i) {
            let player = realPlayers[i];
            if(player.m_id == id) {
                player.m_partyId = 0;
                player.updateHpBar(false);
                break;
            }
        }
        for(let i=0; i<partyList.length; ++i) {
            let party = partyList[i];
            if(party.id == partyId) {
                let idx = party.members.indexOf(id);
                if(idx > -1) {
                    party.members.splice(idx, 1);
                    if(party.mNames) party.mNames.splice(idx, 1);
                }
                break;
            }
        }
        msMoudle.toast("有人退出队伍");
        let dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
        if(dlg && dlg.dlg) {
            dlg.dlg.updateData();
        }
    }

    export function beKickoutParty() {
        msMoudle.toast("被移出了队伍");
        for(let i=0; i<partyList.length; ++i) {
            let party = partyList[i];
            if(party.id == partyId) {
                let idx = party.members.indexOf(ms.user);
                if(idx > -1) {
                    party.members.splice(idx, 1);
                    if(party.mNames) party.mNames.splice(idx, 1);
                }
                break;
            }
        }
        partyId = 0;
        let dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
        if(dlg && dlg.dlg) {
            dlg.dlg.updateData();
        }
    }

    export function enterTeamBoss(mapId: string) {
        console.log("enterTeamBoss, ", mapId);
        let dlg = ui.manager.getDialogByName("app.worldmap.bossMapDlg");
        if(dlg && dlg.dlg) {
            dlg.dlg.close();
        }
        dlg = ui.manager.getDialogByName("app.worldmap.partyDlg");
        if(dlg && dlg.dlg) {
            dlg.dlg.close();
        }

        msMoudle.help = null;
        msMoudle.tiaotiao_map = mapId;
        console.log("##change map id=", msMoudle.tiaotiao_map);
        msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
    }

    export function bossRelive(mobInfo: any) {
        // console.log("bossRelive, ", mobInfo);
        if(!mobInfo || !mobInfo.mob || !map || !map.m_life || map.m_id != mobInfo.mapId) return;
        // console.log("bossRelive, 2")
        for(let i=0; i<map.m_life.m_mobsAni.length; ++i) {
            let mob = map.m_life.m_mobsAni[i];
            if(mob && mob.m_index == mobInfo.mob.index) {
                // console.log("bossRelive, 3")
                mob.m_isdead = false;
                mob.m_dead_time = 0;
                mob.m_nametag_sp.visible = true;
                mob.m_down_t = 0;
                mob.m_up_t = 0;
                ///////////////////////////////刷怪
                //重置Ai状态
                mob.AiData.timeN = 0;
                mob.AiData.actionN = "stand";
                mob.AiData.dirN = 1;

                mob.m_hp = mobInfo.mob.hp;

                mob.hpBar.visible = false;
                // mob.m_nametag_sp.addChild(mob.hpBar)
                mob.hpBar.value = 1;
                mob.m_sp.visible = true;
                //设置mob初始状态/位置
                mob.changeByName("stand", 0);
                mob.setPos(mob.msgData.x, mob.msgData.y);
                break;
            }
        }
    }
}