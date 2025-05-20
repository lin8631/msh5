/// <reference path="./../../../core/ms/Maple/Number.ts" />
/// <reference path="./../../../core/ms/Maple/MonsterBook.ts" />

module SummonRole {

    import cssNumber = NumberRole.Number;
    import cssMonsterBook = MonsterBookRole.MonsterBook;

    export class Summon extends Laya.Sprite {

        public m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 1;
        private m_id:string = "2321003";
        public m_action:string = "stand";//
        private m_sp:Laya.Sprite;
        private m_hit_sp:Laya.Sprite;
        public m_armyList:Array<any> = [];
        public _pvp:boolean = false;
        public m_nametag_sp:Laya.Sprite;
        public atkTime:boolean = true;
        public hpBar:Laya.ProgressBar;
        private m_data:any = null;

        private summonAni:Laya.Image;
        private summonData:Array<any> = [];
        private hitAni:Laya.Image;
        private hitData:Array<any> = [];
        public m_down_t:number = 0;
        public m_up_t:number = 0;

        public clearUp() : void {
            this.sendLst = [];
            Laya.timer.clear(this, this.ztAI);
            Laya.timer.clear(this, this.startNewAuto);
            Laya.timer.clear(this, this.delayShowHit);
            Laya.timer.clear(this, this.delayTime);
            Laya.timer.clear(this, this.delayNumber);

            Laya.timer.clear(this, this.frameLoop);
            Laya.timer.clear(this, this.doHit);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            if(this.hpBar) {
                this.hpBar.removeSelf();
                this.hpBar.destroy(true);
                this.hpBar = null;
            }
            if(this.hitAni) {
                this.hitAni.removeSelf();
                this.hitAni.destroy(true);
                this.hitAni = null;
            }
            if(this.summonAni) {
                this.summonAni.removeSelf();
                this.summonAni.destroy(true);
                this.summonAni = null;
            }
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            if(this.m_hit_sp) {
                this.m_hit_sp.removeSelf();
                this.m_hit_sp.destroy(true);
                this.m_hit_sp = null;
            }
            this.summonData = [];
            this.hitData = [];
            this.m_data = null;
        }

        public changeAll(P:any, id:string, x:number, y:number) : void {

            this.m_parent = P;
            this.m_id = id;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 10001;
            this.m_parent.addChild(this.m_sp);

            this.m_hit_sp = new Laya.Sprite();
            this.m_hit_sp.zOrder = 10001;

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_nametag_sp);

            this.summonAni = new Laya.Image();
            this.m_sp.addChild(this.summonAni);

            this.hitAni = new Laya.Image();
            this.hitAni.zOrder = 10001;
            this.m_hit_sp.addChild(this.hitAni);

            // this.hpBar = new Laya.ProgressBar("res/UI/progressBar.png");
            // this.hpBar.width = 40;
            // this.hpBar.height = 8;
            // this.hpBar.value = 1;
            // this.m_nametag_sp.addChild(this.hpBar);

            this.loadActs(this.m_action, 0);//stand

            Laya.timer.frameLoop(1, this, this.autoFight);

            this.setPos(x, y);
        }

        private changeByName(act:string, loop:number) : void {
            Laya.timer.clear(this, this.doAction);
            this.m_action = act;
            this.loadActs(act, loop);
        }

        private loadActs(act:string, loop:number) : void {
            this.m_action = act;
            this.summonData = new Array();
            let job = Math.floor(Number(this.m_id) / 10000);
            let data:any = msMoudle.wz[job + ".img"]["skill." + this.m_id];
            this.m_data = data;
            let frameindex:number = 0;
            while(true) {
                let root:string = "skill." + this.m_id + ".summon." + this.m_action + "." + frameindex;
                if(data[root]) {
                    this.linkSummon(data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }

            frameindex = 0;
            while(true) {
                let root:string = "skill." + this.m_id + ".hit.0." + frameindex;
                if(data[root]) {
                    this.linkHit(data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }

            let res:Array<any> = [];
            for(let i:number = 0; i < this.summonData.length; i++) {
                if(!Laya.loader.getRes(this.summonData[i].tex))
                    res.push({ url: this.summonData[i].tex });
            }
            for(let i:number = 0; i < this.hitData.length; i++) {
                if(!Laya.loader.getRes(this.hitData[i].tex))
                    res.push({ url: this.hitData[i].tex });
            }

            if(res.length > 0) {
                msLoad.load(res).done(dlg => {

                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);

                    this.doAction(0, loop);
                });
            }
            else {
                this.doAction(0, loop);
            }
        }
        m_loadRes:Array<any> = [];
        private linkSummon(data:any, root:string, frameindex:number) : void {

            if(data[root + "._inlink"]) {
                let ____m = data[root + "._inlink"].split("/");
                //walk1/0/weapon
                // msg = new Object();
                // msg.root = ____m[0] + "." + ____m[1] + "." + ____m[2];
                // msg.act = ____m[0];
                //skill/3311009/summon/fly/5
                if(____m.length > 0) {
                    let m = "";
                    for(let i:number = 0; i < ____m.length - 1; i++) {
                        m += ____m[i];
                        m += ".";
                    }
                    m += ____m[____m.length - 1];
                    root = m;
                }
            }

            let msg:any = msMoudle.getSummonInfo(data[root], this.m_action, this.m_id);

            let job = Math.floor(Number(this.m_id) / 10000);
            let strMarker:string = "res/Skill/" + job + ".img/" + msg.strMarker;
            let delay:number = Number(data[msg.root + ".delay"]);

            this._(data, root, frameindex, strMarker, delay?delay:150);
        }

        private linkHit(data:any, root:string, frameindex:number) : void {
            let msg:any = msMoudle.getSummonInfo(data[root], "hit", this.m_id);
            let job = Math.floor(Number(this.m_id) / 10000);
            let strMarker:string = "res/Skill/" + job + ".img/" + msg.strMarker;
            let delay:number = Number(data[msg.root + ".delay"]);

            this._hit(data, root, frameindex, strMarker, delay?delay:150);
        }

        private doAction(frameIndex:number, loop:number) : void {
            if(this.summonData.length > 0) {
                if(frameIndex >= this.summonData.length) {
                    frameIndex = 0;
                    if(loop != 0) {
                        this.summonAni.skin = "";
                        if(this.m_id == "2321003") {    //圣龙
                            if(this.m_action != "stand" && this.m_action != "fly") {
                                this.changeByName("stand", 0);
                            }
                        }
                        else {
                            return ;
                        }
                    }
                    else {
                        // this.changeByName("stand", 0);
                    }
                }
                if(this.summonData[frameIndex]) {
                    this.summonAni.skin = this.summonData[frameIndex].tex;
                    this.summonAni.pos(this.summonData[frameIndex].orgx,
                        this.summonData[frameIndex].orgy);
                    if(this.summonData.length > 1) Laya.timer.once(this.summonData[frameIndex].delay * (ms.speed / 1), this, this.doAction, [frameIndex + 1, loop]);
                }
            }
        }

        private doHit(frameIndex:number, loop:number) : void {
            if(this.hitData.length > 0) {
                if(frameIndex >= this.hitData.length) {
                    frameIndex = 0;
                    this.hitAni.skin = "";
                    if(this.m_id != "2321003") {    //圣龙
                        this.changeByName("stand", 0);
                    }
                    return ;
                }
                if(this.hitData[frameIndex]) {
                    this.hitAni.skin = this.hitData[frameIndex].tex;
                    this.hitAni.pos(this.hitData[frameIndex].orgx,
                        this.hitData[frameIndex].orgy);
                    if(this.hitData.length > 1) Laya.timer.once(this.hitData[frameIndex].delay * (ms.speed / 1), this, this.doHit, [frameIndex + 1, 1]);
                }
            }
        }

        private _(data:any, root:string, frameindex:number, strMarker:string, delay:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z:any = data[root + ".z"];
            this.summonData[frameindex] = new Object();
            this.summonData[frameindex].tex = strMarker;
            this.summonData[frameindex].delay = Number(delay);
            this.summonData[frameindex].z = z ? Number(z) : 0;
            this.summonData[frameindex].orgx = -Number(oringinInfo.x);
            this.summonData[frameindex].orgy = -Number(oringinInfo.y);
        }

        private _hit(data:any, root:string, frameindex:number, strMarker:string, delay:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let z:any = data[root + ".z"];
            this.hitData[frameindex] = new Object();
            this.hitData[frameindex].tex = strMarker;
            this.hitData[frameindex].delay = Number(delay);
            this.hitData[frameindex].z = z ? Number(z) : 0;
            this.hitData[frameindex].orgx = -Number(oringinInfo.x);
            this.hitData[frameindex].orgy = -Number(oringinInfo.y);
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(x, y);
            this.m_nametag_sp.pos(x, y);
            // this.m_sp.pos(x, msMoudle.char.m_y);
            // this.m_nametag_sp.pos(x, msMoudle.char.m_y);

            // this.hpBar.pos( - this.hpBar.width / 2, 0);
            // console.log("setPos", this.tb_index, x, y);
            if(this.tb_index != -1) {
                //瞬移到主角旁边
                if(msMoudle.mapP && msMoudle.char) {
                    //自定义地图
                    if(this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("fly") >= 0) {
                        if(msMoudle.char.m_x < this.m_x - (350) || msMoudle.char.m_x > this.m_x + (350) ||
                            msMoudle.char.m_y < this.m_y - 300 || msMoudle.char.m_y > this.m_y + 300) {
                            this.setPos(msMoudle.char.m_x, msMoudle.char.m_y);
                        }
                    }
                }
            }
        }

        private setDir(dir:number) : void {
            this.m_dir = dir;
            this.m_sp.scaleX = dir;
        }

        //同步自动(其他的不会走这里)
        public tb_index:number = -1;
        public NewautoFight(index:number = -1) : void {
            this.tb_index = index;
            if(this.tb_index > -1) {
                Laya.timer.frameLoop(1, this, this.startNewAuto);
            }
        }
        startNewAuto() : void {
            this.autoFight(true);
            this.sendData();
        }

        //////
        //监听者执行
        startZT() : void {
            Laya.timer.frameLoop(1, this, this.ztAI);
        }
        ztAI() : void {
            if(this.m_action) {
                if(this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("fly") >= 0) {
                    if(this.m_dir == -1) {
                        msMoudle.mainT.SummonrightMove(this, 1 * (ms.speed / 1));
                    }
                    else {
                        msMoudle.mainT.SummonleftMove(this, 1 * (ms.speed / 1));
                    }
                }
                // else {
                //     //攻击
                //     this.changeByName(this.m_action, 1);
                // }
            }
        }

        ____x:Array<any> = [];
        ____y:Array<any> = [];
        private autoFight(tb:boolean = false) : void {
            // this.autoMove();

            if(msMoudle.mapP.m_life) {
                if(this._pvp == true) {
                    if(msMoudle.mapP.m_life.m_charsAni) this.m_armyList = msMoudle.mapP.m_life.m_charsAni;
                }
                else {
                    if(msMoudle.mapP.m_life.m_mobsAni) this.m_armyList = msMoudle.mapP.m_life.m_mobsAni;
                }
            }

            if(this.m_armyList) {
                let _canatk:boolean = false;
                if(this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("fly") >= 0) {
                    this.____x = [];
                    //敌方
                    for(let i:number = 0; i < this.m_armyList.length; i++) {
                        let mob = this.m_armyList[i];
                        if(mob) {
                            if(mob.m_isdead == false) {
                                if(this.m_y >= mob.m_y - 45 && this.m_y <= mob.m_y + 45) {
                                    if( Math.abs(this.m_x - mob.m_x) <= 200 ) {      //攻击范围
                                        _canatk = true;
                                        //并且锁定目标
                                        this.____x[this.____x.length] = mob;
                                        // break;      ////如果不能就近可以关了这里试试
                                    }
                                }
                            }
                        }
                    }
                    // this.____y = [];
                    /////我方
                    // if(msMoudle.char) {
                    //     if(msMoudle.char.m_hp > 0) {
                    //         this.____y[this.____y.length] = msMoudle.char;
                    //     }
                    // }
                    // for(let i:number = 0; i < msMoudle.mapP.heroList.length; i++) {
                    //     if(msMoudle.mapP.heroList[i]) {
                    //         if(msMoudle.mapP.heroList[i].m_hp > 0) {
                    //             this.____y[this.____y.length] = msMoudle.mapP.heroList[i];
                    //         }
                    //     }
                    // }
                    ///将对方加入____x列表中
                    if(_canatk) {
                        if(this.____x.length > 0) {
                            // msMoudle.toast("xxxxx" + this.____x.length)
                            this.____x = this.MinDis(this.____x);
                        }
                    }
                    ///将对方加入____y列表中
                    // if(_canatk) {
                    //     this.____y = this.MinDis(this.____y);
                    // }
                }
                //如果处于战斗状态
                if(_canatk && this.atkTime && this.____x.length > 0) {
                    this.atkTime = false;
                    // this.____x[0].m_sp.
                    this.m_parent.addChild(this.m_hit_sp);
                    this.m_hit_sp.pos(this.____x[0].m_x, this.____x[0].m_y);
                    this.changeByName("attack1", 1);        //设置攻击状态

                    let ssdata:any = msMoudle.wz[Math.floor(Number(this.m_id) / 10000) + ".img"]["skill." + this.m_id];
                    let afterSkill = Number(ssdata["skill." + this.m_id + ".summon.attack1.info.attackAfter"]);
                    if(!afterSkill) afterSkill = 2000;
                    else afterSkill *= 2;
                    //skill.2321003.summon.attack1.info.attackAfter</td><td>990</td></tr>
                    //skill.3121006.summon.attack1.info.attackAfter</td><td>360</td></tr>
                    //skill.3121006.summon.attack1.info.mobCount</td><td>4</td></tr>

                    // msMoudle.toast("xxx" + afterSkill)

                    ///播放hit_eff？？？
                    // if(this.m_id != "2321003") {
                    //     this.doHit(0, 1);
                    // }
                    // else {
                    //     Laya.timer.once(2000 * (ms.speed / 1), this, ()=> {
                    //         this.doHit(0, 1);
                    //     });
                    // }
                    Laya.timer.once(afterSkill * (ms.speed / 1), this, this.delayShowHit);

                    if(this.____x[0].m_x > this.m_x) this.setDir(-1);
                    else this.setDir(1);
                    this.m_hit_sp.scaleX = this.m_dir;
                    Laya.timer.once(2500 * (ms.speed / 1), this, this.delayTime);

                    ///伤害数字
                    let delayshow = afterSkill;
                    // let delayshow = 550;
                    // if(this.m_id == "2321003") delayshow = 2000;
                    Laya.timer.once(delayshow * (ms.speed / 1), this, this.delayNumber);

                }
                else {
                    //因为攻击完立即就是站立状态
                    if(this.atkTime) {
                        this.updataDistance();
                        if(this._autodir == 1) {   //右
                            if(this.m_action.indexOf("stand") >= 0) {
                                ///如果没有飞行动作
                                let root:string = "skill." + this.m_id + ".summon.fly.0";
                                if(this.m_data && this.m_data[root]) {
                                    this.changeByName("fly", 0);
                                }
                                else {
                                    this.setDir(-1);
                                    msMoudle.mainT.MobrightMove(this, 2 * (ms.speed / 1));
                                }
                            }
                            else if(this.m_action.indexOf("fly") >= 0) {
                                this.setDir(-1);
                                msMoudle.mainT.MobrightMove(this, 2 * (ms.speed / 1));
                                // this.setPos(this.m_x + 2 * (ms.walk_speed / 1), this.m_y);
                            }
                        }
                        else if(this._autodir == 2) {
                            if(this.m_action.indexOf("stand") >= 0) {
                                ///如果没有飞行动作
                                let root:string = "skill." + this.m_id + ".summon.fly.0";
                                if(this.m_data && this.m_data[root]) {
                                    this.changeByName("fly", 0);
                                }
                                else {
                                    this.setDir(1);
                                    msMoudle.mainT.MobleftMove(this, 2 * (ms.speed / 1));
                                }
                            }
                            else if(this.m_action.indexOf("fly") >= 0) {
                                this.setDir(1);
                                msMoudle.mainT.MobleftMove(this, 2 * (ms.speed / 1));
                                // this.setPos(this.m_x - 2 * (ms.walk_speed / 1), this.m_y);
                            }
                        }
                        else this.autoMove();
                    }
                }

                //状态记录
                if(tb && this.tb_index > -1 && this.tb_index != 100) {
                    let curData:any = {id:this.m_id, index:this.tb_index, act:this.m_action, dir:this.m_dir, x:this.m_x, y:this.m_y};
                    if(this.lastData) {
                        if(this.lastData.act == curData.act && this.lastData.dir == curData.dir) {
                            // if(Math.abs(this.lastData.x - curData.x) > 1 || Math.abs(this.lastData.y - curData.y) > 1) {
                            //     this.sendLst.push(curData);
                            //     this.lastData = curData;
                            // }
                            //动作、方向、位置没变化就不处理

                            //如果是技能的话就记录
                            // if(curData.act.indexOf("stand") < 0 && curData.act.indexOf("fly") < 0) {
                            //     this.sendLst.push(curData);
                            //     this.lastData = curData;
                            // }

                        }
                        else {
                            this.sendLst.push(curData);
                            this.lastData = curData;
                        }
                    }
                    else {
                        this.sendLst.push(curData); //第一个数据直接填充
                        this.lastData = curData;
                    }
                }
            }
            //
        }

        delayShowHit() : void {
            this.doHit(0, 1);
        }

        delayTime() : void {
            this.atkTime = true;
        }

        delayNumber() : void {
            if(this.____x && this.____x[0]) {
                //计算伤害
                let attackCount = 1;
                let hit:Array<any> = [];
                for(let i:number = 0; i < attackCount; i++) {
                    //
                    let summon_hit:number = Math.round(msMoudle.char.m_maxatk / 2);
                    if(!ms.herodata.XL[7]) ms.herodata.XL[7] = 0;
                    if(ms.herodata.XL[7] > 0) {
                        summon_hit = Math.round((1 + ms.herodata.XL[7] / 100) * summon_hit);
                    }
                    if(this.m_id == "2321003") summon_hit *= 2;
                    hit[i] = {num :summon_hit, bj:false};
                    this.____x[0].m_hp -= hit[i].num;
                }
                if(this.____x[0].hpBar) {
                    this.____x[0].hpBar.value = Number(this.____x[0].m_hp / this.____x[0].m_maxhp);
                    if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                        this.____x[0].m_nametag_sp.visible = true;
                        this.____x[0].hpBar.visible = true;
                    }
                    this.____x[0].m_nametag_sp.addChild(this.____x[0].hpBar);
                }
                if(this.____x[0].m_hp < 0) {
                    this.____x[0].m_hp = 0;
                    if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                        this.showDie(this.____x[0], hit);
                    }
                }
                //伤害显示
                let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
                if(this.____x[0].mobData) {
                    if(this.____x[0].mobData[0]) {
                        nb.ShowNumber(this.m_parent, hit, this.____x[0].m_x + Number(this.____x[0].mobData[0].head.x), this.____x[0].m_y + Number(this.____x[0].mobData[0].head.y), 2, 1);
                        Sync.attackMob(this.____x[0], hit);
                    }
                    else {
                        nb.ShowNumber(this.m_parent, hit, this.____x[0].m_x, this.____x[0].m_y  - 100, 2, 1);
                        Sync.attackMob(this.____x[0], hit);
                    }
                }
            }
        }


        showDie(mob:any, hit:any) : void {
            if(mob.m_hp <= 0) {
                mob.hitMe = [];

                // ms.taskShow();
                //     //物品掉落
                //     let reward:any = mb.getMobRewardAndRand( Number(mob.msgData.id).toFixed(0) );
                //     for(let i:number = 0; i < reward.length; i++) {
                //         let tIndex:number = msMoudle.mainT.m_itemList.length;
                //         msMoudle.mainT.m_itemList[tIndex] = new cssItem();
                //         msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward[i], reward.length, i, mob.m_x, mob.m_y);
                //避免多次掉落
                if(mob.m_isdead == false) {
                    ////统计优化
                    if(mob.msgData) {
                        let jobmob:Array<any> = ["6130101", "6300005", "8130100", "4130103", "5220004", "8500001", "8520000", "8510000", "8180000", "8180001",
                        "3501003"];
                        // for(let fi:number = 0; fi < jobmob.length; fi++) {
                        if(msMoudle.findKeyFromArr(mob.msgData.id, jobmob)) {
                            ////杀死的怪物
                            let kill_mob:boolean = false;
                            if(ms.killmobsdata) {
                                for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                                    if(ms.killmobsdata[u].id == mob.msgData.id) {
                                        ms.killmobsdata[u].num++;
                                        ms.killAll++;
                                        kill_mob = true;
                                        break;
                                    }
                                }
                                if(kill_mob == false) {
                                    let newskill = ms.killmobsdata.length;
                                    ms.killmobsdata[newskill] = new Object();
                                    ms.killmobsdata[newskill].id = mob.msgData.id;
                                    ms.killmobsdata[newskill].num = 1;
                                }
                            }
                        }
                    }

                    if(msMoudle.mapP && (msMoudle.isAuMap(msMoudle.mapP.m_id) == false || msMoudle.guaji) && msMoudle.mapP.m_id != "000020000_gai.img" /*&& msMoudle.mapP.m_id != "240060200.img"*/) {// && ms.huoli > 0 // && msMoudle.mapP.m_id != "280030100.img"
                        let mb:cssMonsterBook = new cssMonsterBook();
                        // let reward:any = mb.getMobRewardAndRand( Number(100100).toFixed(0) );
                        if(msMoudle.mainT) {
                            // if(msMoudle.mainT.m_itemList.length < 30) {
                            // msMoudle.getRw(mob);
                            let reward:any = mb.getRandReward(mob);

                            let addExp = msMoudle.getMobExp(mob);
                            // console.log("drop, ", mob.m_id, " ", addExp)
                            // console.log("drop, ", reward, " ", addExp)
                            if(msMoudle.isSyncMap(msMoudle.mapP.m_id)) {
                                Sync.attackMob(mob, hit, reward, addExp, (exp: number, uniqueIds: number[])=>{
                                    // console.log("$$callback")
                                    // if(!reward || !uniqueIds) {
                                    //     // console.log("##drop error 000")
                                    //     return;
                                    // }
                                    // if(reward.length != uniqueIds.length) {
                                    //     console.log("##drop error, ", reward, uniqueIds);
                                    //     return;
                                    // }
                                    // for(let i=0; i<reward.length; ++i) {
                                    //     reward[i].uniqueId = uniqueIds[i];
                                    // }
                                    // this.showDrop(mob, reward);
                                    // //
                                    // //add exp;
                                    // msMoudle.getExp(exp);
                                    // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
                                });
                            }
                            else {
                                // console.log("kkkkk", reward);
                                Sync.showDrop(mob, reward);

                                //更新非挂机经验
                                if(msMoudle.guaji == false) {
                                    msMoudle.getExp(addExp);
                                }
                                //更新挂机经验
                                else {
                                    ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(Math.floor(addExp), false);
                                }

                                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));
                            }
                        }
                    }
                }
                //死亡
                mob.m_isdead = true;
                // mob.m_dead_time = 0;/////

                // if(msMoudle.mapP && msMoudle.mapP.m_id == "280030000_gai.img" || msMoudle.mapP.m_id == "240060200_gai.img") {}
                // else {
                //     mob.m_sp.visible = false;
                // }
                    mob.m_nametag_sp.visible = false;

                // console.log("死亡" + mob.m_hp);
                for(let buf_i:number = 0; buf_i < 3; buf_i++) mob.clearBuf(buf_i);

                if( (msMoudle.isBoss || msMoudle.isWorldBoss || msMoudle.team_guanka == 3) && mob.m_isboss ) {
                    msMoudle.gameP.boss_hp.value = 0;
                    msMoudle.gameP.boss_text.text = "0/" + mob.m_maxhp;
                    msMoudle.gameP.boss_hp.visible = false;
                }
                if(msMoudle.team_guanka > 0) {
                    msMoudle.team_guanka_num++;
                    // msMoudle.taskShow2();
                }
                if(msMoudle.isPvp == false) {
                    mob.m_dead_time = 0;
                    //扎昆不消失
                    if(mob.msgData.id == "8800000" ||
                        mob.msgData.id == "8800003" || mob.msgData.id == "8800004" || mob.msgData.id == "8800005" || mob.msgData.id == "8800006" || mob.msgData.id == "8800007" || mob.msgData.id == "8800008" || mob.msgData.id == "8800009" || mob.msgData.id == "8800010" ||
                        mob.msgData.id == "8810002" || mob.msgData.id == "8810003" || mob.msgData.id == "8810004" || mob.msgData.id == "8810005" || mob.msgData.id == "8810006" || mob.msgData.id == "8810007" || mob.msgData.id == "8810008" || mob.msgData.id == "8810009" ) {
                            //扎昆
                            if(msMoudle.mapP.m_id == "280030100.img") {
                                if(mob.msgData.id != "8800000") {
                                    mob.changeByName("die1", 1);////
                                }
                            }
                            //黑龙
                            else if(msMoudle.mapP.m_id == "240060200.img") {
                                if(mob.msgData.id != "8810003") {
                                    mob.changeByName("die1", 1);////
                                }
                            }
                        }
                    else {
                        mob.changeByName("die1", 1);
                    }

                    ////
                }
            }
        }

        private MinDis(____x:any) : any {
            let mobLeaveArray:Array<any> = [];
            let newhitArray:Array<any> = [];
            let hitArray:Array<any> = [];
            for(let i:number = 0; i < ____x.length; i++) {
                hitArray[i] = Math.abs(____x[i].m_x - this.m_x);
            }
            //排序
            newhitArray = hitArray;
            newhitArray.sort((n1,n2) => {
                if(n1 > n2) return 1;
                if(n1 < n2) return -1;
                return 0;
            });
            for(let i:number = 0; i < newhitArray.length; i++) {
                // console.log(newhitArray[i])
                for(let j:number = 0; j < hitArray.length; j++) {
                    if(hitArray[j] == newhitArray[i]) {
                        //如果-3和3
                        mobLeaveArray[mobLeaveArray.length] = ____x[j];
                        // console.log("xxx    " + ____x[j].m_x)
                        break;
                    }
                }
            }
            return mobLeaveArray;
        }

        //更新最短距离
        _autodir:number = 0;
        public updataDistance() : void {
            let autoleaveX1:number = 9999999;
            let autoleaveX2:number = 9999999;
            if(this.m_armyList) {
                this._autodir = 0;       //右方向
                for(let j:number = 0; j < this.m_armyList.length; j++) {
                    let mob = this.m_armyList[j];
                    if(mob) {
                        if(mob.m_isdead == false) {
                            if(this.m_y >= mob.m_y - 45 && this.m_y <= mob.m_y + 45) {
                                if(this.m_x > mob.m_x) {
                                    if(autoleaveX1 > (this.m_x - mob.m_x) ) autoleaveX2 = (this.m_x - mob.m_x);
                                }
                                else if(this.m_x < mob.m_x){
                                    if(autoleaveX2 > (mob.m_x - this.m_x)) autoleaveX1 = (mob.m_x - this.m_x);
                                }
                            }
                        }
                    }
                }
                if(autoleaveX1 > autoleaveX2) this._autodir = 2;
                else if(autoleaveX1 < autoleaveX2) this._autodir = 1;
            }
        }

        timeN:boolean = true;
        private autoMove() : void {
            if(this.timeN) {             //状态变化时间
                this.timeN = false;
                Laya.timer.once(msMoudle.getRandValue(500, 0, 500) * (ms.speed / 1), this, ()=> {
                    this.timeN = true;
                });
                this.m_dir = msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                let stateN = msMoudle.getRandValue(0, 0, 100) < 50 ? "fly" : "stand";
                this.setDir(this.m_dir);
                let root:string = "skill." + this.m_id + ".summon.fly.0";
                if(this.m_data && this.m_data[root]) {}
                else stateN = "stand";
                if(this.m_action.indexOf(stateN) < 0) {
                    this.changeByName(stateN, 0);
                }
            }
            else {
                if(this.m_action.indexOf("fly") >= 0) {
                    if(this.m_dir == -1) {
                        msMoudle.mainT.MobrightMove(this, 1 * (ms.speed / 1));
                        // this.setPos(this.m_x + 1 * (ms.walk_speed / 1), this.m_y);
                    }
                    else {
                        msMoudle.mainT.MobleftMove(this, 1 * (ms.speed / 1));
                        // this.setPos(this.m_x - 1 * (ms.walk_speed / 1), this.m_y);
                    }
                }
                else {
                    //有些召唤兽没有飞行动作
                    let root:string = "skill." + this.m_id + ".summon.fly.0";
                    if(this.m_data && this.m_data[root]) {}
                    else {
                        if(this.m_dir == -1) {
                            msMoudle.mainT.MobrightMove(this, 1 * (ms.speed / 1));
                            // this.setPos(this.m_x + 1 * (ms.walk_speed / 1), this.m_y);
                        }
                        else {
                            msMoudle.mainT.MobleftMove(this, 1 * (ms.speed / 1));
                            // this.setPos(this.m_x - 1 * (ms.walk_speed / 1), this.m_y);
                        }
                    }
                }
            }
        }

        sendLst:Array<any> = [];
        lastData:any = null;
        sendData() : void {
            if(this.sendLst.length > 0) {
                Sync.reportMyOperate("pos", [], this.sendLst[0]);
                this.sendLst.splice(0, 1);  //删除
            }
        }

        //
    }
}