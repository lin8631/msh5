/// <reference path="./../../../core/ms/Maple/NameTag.ts" />
/// <reference path="./../../../core/ms/Maple/Number.ts" />
/// <reference path="./../../../core/ms/Maple/BufEff.ts" />

module MobRole {

    import cssNametag = NametagRole.NameTag;
    import cssNumber = NumberRole.Number;
    import cssBufEff = BufEffMoudle.BufEff;

    export class Mob {
        //test
        public m_index = 0;
        public m_hasInit = false;
        public m_speed = 100;
        public m_protect = false;
        public m_hasDetect = false;
        public m_offX = 0;
        public m_offY = 0;
        public m_noFlip = 0;
        public m_exp = -1;
        public m_initAtk = "";  //可以提前设定的指定攻击技能，目前仅市场boss生效
        public m_frameIndex = 0; //当前怪物动画第几帧
        public m_alwaysShow = false;
        public m_multiSkill = false;
        public m_atkInfo: any = {};
        private m_effect_dir = 1; //怪物释放技能时候的方向，用来确定effect播放的方向

        public m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 1;
        private m_sp:Laya.Sprite;
        public m_nametag_sp:Laya.Sprite;
        public m_nametag_show:boolean = true;
        private m_nametag:cssNametag;
        public m_effect_sp:Laya.Sprite;
        public hpBar:Laya.ProgressBar;
        public force_scale:number = 1;
        public m_isboss:boolean = false;
        public is_oneFrame:boolean = false;

        private m_action:string = "stand";//
        private m_id:string;
        private mobData:Array<any> = [];
        private mobAni:Laya.Image;
        public hitAni:Laya.Image;
        // public hitdata:Array<any> = [];
        public hitdata:any = {};
        public ballSp:Laya.Sprite;
        public ballAni:Laya.Image;
        // public balldata:Array<any> = [];
        public effectAni:Laya.Image;
        // public effectdata:Array<any> = [];
        public balldata:any = {};
        public effectdata:any = {};
        public areadata:any = {};
        public areaAnis:Laya.Image[] = [];

        public m_armyList:any;

        public hitBound:Laya.Sprite;
        public atkBound:Laya.Sprite;

        public hitMe:Array<any> = [];

        public m_down_t:number = 0;
        public m_up_t:number = 0;

        public m_isdead:boolean = false;   //是否死亡
        public m_dead_time:number = 0;      //死亡计时
        public m_isbuff:Array<number> = [];    //buf状态
        public m_buff_time:Array<number> = [];      //buf剩余时间

        public msgData:any;                 //怪物数据
        public AiData:any = {timeN:0, actionN:"stand", dirN:1};     //Ai初始状态
        public _autofight:boolean = false;
        public _automove:boolean = true;
        public attack_act:string = "attack1";

        public m_lv:number = 1;
        public m_hp = 100;
        public m_maxhp = 100;
        public m_atk = 10;
        public m_def = 0;
        public m_target = 100;
        public m_baoji = 0;
        public m_miss = 0;
        public TimeLine:Laya.TimeLine;

        //百分比加成
        public p_atk:number = 0;        //攻击加成百分比
        public p_def:number = 0;        //防御加成百分比
        public p_baoji:number = 0;      //暴击加成百分比
        public p_miss:number = 0;       //闪避加成百分比
        public p_target:number = 0;     //命中加成百分比
        public p_atkspeed:number = 0;   //攻击速度加成百分比
        public p_walkspeed:number = 0;  //移动速度加成百分比

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.doHitAction);
            Laya.timer.clear(this, this.doBallAction);
            Laya.timer.clear(this, this.doEffAction);
            Laya.timer.clear(this, this.autoFight);
            Laya.timer.clear(this, this.BufLoop);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            if(this.TimeLine) {
                this.TimeLine.pause();
                this.TimeLine = null;
            }

            // if(rmv) {
            //     Laya.loader.clearRes("res/Mob/" + this.m_id + "/index.html");
            //     msMoudle.wz[this.m_id] = null;
            // }

            this.m_x = 0;
            this.m_y = 0;
            this.m_dir = 1;
            this.m_action = "stand";
            this.mobData = [];
            this.hitdata = [];
            this.m_down_t = 0;
            this.m_up_t = 0;
            this.m_isdead = false;
            this.m_dead_time = 0;
            this.msgData = [];

            this.AiData.timeN = 0;
            this.AiData.actionN = "stand";
            this.AiData.dirN = 1;

            for(let i:number = 0; i < 3; i++) this.clearBuf(i);

            if(this.hpBar) {
                this.hpBar.removeSelf();
                this.hpBar.destroy(true);
                this.hpBar = null;
            }
            if(this.mobAni) {
                this.mobAni.removeSelf();
                this.mobAni.destroy(true);
                this.mobAni = null;
            }
            if(this.hitAni) {
                this.hitAni.removeSelf();
                this.hitAni.destroy(true);
                this.hitAni = null;
            }
            if(this.ballSp) {
                this.ballSp.removeSelf();
                this.ballSp.destroy(true);
                this.ballSp = null;
            }
            if(this.effectAni) {
                this.effectAni.removeSelf();
                this.effectAni.destroy(true);
                this.effectAni = null;
            }
            for(let i=0; i<this.areaAnis.length; ++i) {
                this.areaAnis[i].removeSelf();
                this.areaAnis[i].destroy(true);
                this.areaAnis[i] = null;
            }
            this.areaAnis = [];
            if(this.hitBound) {
                this.hitBound.removeSelf();
                this.hitBound.destroy(true);
                this.hitBound = null;
            }
            if(this.atkBound) {
                this.atkBound.removeSelf();
                this.atkBound.destroy(true);
                this.atkBound = null;
            }
            if(this.m_nametag) {
                this.m_nametag.clearUp();
                this.m_nametag = null;
            }
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_effect_sp) {
                this.m_effect_sp.removeSelf();
                this.m_effect_sp.destroy(true);
                this.m_effect_sp = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
        }

        public clearBuf(i:number) : void {

            if(i == 0) {
                if(this.stun) {
                    this.stun.clearUp();
                    this.stun = null;
                }
            }
        }

        onLoading() : void {}
        onLifeLoaded() : void {
            if(!msMoudle.wz[this.m_id]) {
                let cs:CssParser.Txt = new CssParser.Txt();
                msMoudle.wz[this.m_id] = msMoudle.loadWZ(cs, "res/Mob/" + this.m_id + "/index.html", "ms");
            }


            if(this.msgData.id == "8840000") {
                this.attack_act = "attack4";
            }
            if(this.msgData.id == "8850111") {
                this.attack_act = "attack2";
            }
            else if(this.msgData.id == "8800000" || this.msgData.id == "8800003" || this.msgData.id == "8800004" || this.msgData.id == "8800006" || this.msgData.id == "8800009" || this.msgData.id == "8800010" ||
            this.msgData.id == "8810002" || this.msgData.id == "8810003" || this.msgData.id == "8810004" || this.msgData.id == "8810005" || this.msgData.id == "8810006" || this.msgData.id == "8810007" || this.msgData.id == "8810008" || this.msgData.id == "8810009") {
                this.attack_act = "attack1";
            }
            else if(this.msgData.id == "8800005" || this.msgData.id == "8800007" || this.msgData.id == "8800008") {
                this.attack_act = "skill1";
            }
            // else if(this.msgData.id == "8150000") {
            //     this.attack_act = "attack2";
            // }
            if(this.m_initAtk) {
                this.attack_act = this.m_initAtk;
            }
            this.m_atkInfo[this.attack_act] = {};
            if(this.m_multiSkill) {
                for(let i=1; i<10; ++i) {
                    let data:any = msMoudle.wz[this.m_id]["attack" + i];
                    if(!data) break;
                    this.m_atkInfo["attack" + i] = {};
                }
            }
            if(this.msgData.action) {
                this.m_action = this.msgData.action;
            }
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 9999 + this.zIndex;
            this.m_parent.addChild(this.m_sp);
            this.m_sp.visible = !this.m_isdead;

            //
            // this.new_txt("#" + this.m_index + "(" + this.msgData.rx0 + "," + this.msgData.rx1 + ")", 0,  -70, 0);
            // this.new_txt("#" + this.m_index /*+ "(" + this.m_id + ")"*/, 0,  -70, 0);
            //

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 10000;
            if(this.m_nametag_show) this.m_parent.addChild(this.m_nametag_sp);

            this.m_effect_sp = new Laya.Sprite();
            this.m_effect_sp.zOrder = 9999 + this.zIndex;
            this.m_parent.addChild(this.m_effect_sp);

            let name:string = this.msgData.id;
            if( msMoudle.wz["Mob.img"]) {
                name = msMoudle.wz["Mob.img"][Number(this.msgData.id)]?msMoudle.wz["Mob.img"][Number(this.msgData.id)][Number(this.msgData.id) + ".name"]: ( "9" + Math.floor(Number(this.msgData.id) / 10000) + 10) + "";
            }
            // if(this.msgData.id == "0100100") {
            //     name = "小蜗牛";
            // }
            // let level:string =  msMoudle.wz[this.m_id]["info"]["info.level"];

            this.m_nametag = new cssNametag();
            if(msMoudle.wz["NameTag.img"])
                this.m_nametag.loadNameTag(this, name, "medal.1", false);//"Lv" + this.m_lv + " " +

            this.mobAni = new Laya.Image();
            this.m_sp.addChild(this.mobAni);

            this.hitAni = new Laya.Image();
            // this.m_sp.addChild(this.hitAni);

            this.ballSp = new Laya.Sprite();
            this.m_sp.addChild(this.ballSp);
            this.ballAni = new Laya.Image();
            this.ballSp.addChild(this.ballAni);

            this.effectAni = new Laya.Image();
            this.effectAni.visible = false;
            this.m_effect_sp.addChild(this.effectAni);

            this.hitBound = new Laya.Sprite();
            this.hitBound.zOrder = 999999;
            // this.m_parent.addChild(this.hitBound);

            this.atkBound = new Laya.Sprite();
            this.atkBound.zOrder = 999999;
            // this.m_parent.addChild(this.atkBound);
            this.setPos(this.m_x, this.m_y);
            //这里将黑龙灵魂放到屏幕外，等其他部位打完了会把坐标拉回来，不设置visible是因为太乱了
            if(this.m_id == "8810018.img") {
                this.setPos(3500, 6000);
            }
            this.setDir(this.m_dir);

            this.hpbar();
            this.loadActs(0);


            if(this.m_canf)
                Laya.timer.loop(100, this, this.BufLoop);
        }

        zIndex:number = 0;
        public changeAll(P:any, id:string, mobMsg:any, zindex:number = 0) : void {
            this.m_parent = P;
            this.msgData = mobMsg;
            this.m_x = this.msgData.x;
            this.m_y = this.msgData.y;
            this.zIndex = zindex;

            this.m_id = id;
            if(msMoudle.isBossMap()) {
                if(id == "8800000.img" || id == "8810018.img"/*|| id == "8810003.img"*/) this.m_protect = true;
            }

            this.m_hasInit = true;

            // msMoudle.toast(this.m_id + "")

            if(!msMoudle.wz[id]) {
                let res:any = [];
                if(!Laya.loader.getRes("res/Mob/" + this.m_id + "/index.html" )) {
                    res.push({ url: "res/Mob/" + this.m_id + "/index.html" });
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        this.onLifeLoaded();
                    });
                }
                else {
                    this.onLifeLoaded();
                }
            }
            else {
                this.onLifeLoaded();
            }
        }

        private hpbar() : void {
            if(this.hpBar) return ;
            this.hpBar = new Laya.ProgressBar("common/p1.png");
            this.hpBar.width = 40;
            this.hpBar.height = 8;
            // this.hpBar.sizeGrid = "10,10,10,10";
            // this.m_nametag_sp.addChild(this.hpBar);
            this.hpBar.value = 1;
        }

        public updateHpBar(isShow = true) {
            if(!this.hpBar) this.hpbar();
            if(this.m_hp > 0 || this.m_hp < this.m_maxhp) {
                this.m_nametag_sp.addChild(this.hpBar);
            }
            this.hpBar.visible = isShow && (this.m_hp > 0 && this.m_hp < this.m_maxhp);
            if(isShow) {
                this.hpBar.value = this.m_hp / this.m_maxhp;
            }

            if(this.m_hp <= 0) {
                if(!msMoudle.isBossMap(msMoudle.mainP.m_id)) {
                    // this.m_isdead = true;
                    this.m_nametag_sp.visible = false;
                    this.m_sp.visible = false;
                    if((this as any).m_state_sp) (this as any).m_state_sp.visible = false;
                }
            }
            else {
                // this.m_isdead = false;
                this.m_sp.visible = true;
            }
        }

        public changeByName(act:string, loop:number) : void {
            // if(this.m_id == "8510000.img") console.log("###", act)
            if(act == "die1" && loop == 1) {
                if(msMoudle.wz["SMob.img"] && msMoudle.wz["SMob.img"][this.msgData.id]) {
                    let s_ = msMoudle.wz["SMob.img"][this.msgData.id][this.msgData.id + ".Die"];
                    if(s_ && s_.indexOf("../") >= 0) {
                        let ss_ = s_.split("/");
                        msMoudle.playSound("res/Sound/Mob.img/" + ss_[1] + ".Die")
                    }
                    else {
                        msMoudle.playSound("res/Sound/Mob.img/" + this.msgData.id + ".Die")
                    }
                }
                // if(ms.huoli > 0) {
                //     if(msMoudle.guaji) msMoudle.updateHuoLi(-2);
                //     else msMoudle.updateHuoLi(-1);
                // }
            }
            this.m_action = act;
            this.mobData = [];
            Laya.timer.clear(this, this.doAction);
            this.loadActs(loop);
        }

        m_movetag:string = "";
        private loadActs(loop:number) : void {
            // if(loop != 0  && this.m_id == "8510000.img") console.log("###loadActs", this.m_action, this.attack_act )
            Laya.timer.clear(this, this.autoFight);
            // if(!msMoudle.wz[this.m_id]) console.log("错误mobid", this.m_id, this.m_action)
            let data:any = msMoudle.wz[this.m_id][this.m_action];
            if(this.m_action == "stand") {
                if(!data) {
                    this.m_action = "move";
                    data = msMoudle.wz[this.m_id][this.m_action];
                    if(!data) {
                        this.m_action = "fly";
                        data = msMoudle.wz[this.m_id][this.m_action];
                        if(data) {
                            this.m_movetag = "fly";
                        }
                    }
                    else {
                        this.m_movetag = "move";
                    }
                }
            }

            if(data) {
                let frameindex:number = 0;
                while(true) {
                    let root:string = this.m_action + "." + frameindex;
                    if(data[root]) {
                        this.linkMob(data, root, frameindex);
                        frameindex = frameindex + 1;
                    }
                    else break;
                }

                ///这里添加hit的资源
                // if(this.m_action == "attack1") {
                // if(this.m_action == "attack1" || (this.m_multiSkill && this.m_atkInfo[this.m_action])) {
                    //attack1.info.hit.0
                    // if(this.hitdata.length == 0) {
                    if(!this.hitdata[this.attack_act]) {
                        frameindex = 0;
                        while(true) {
                            let root:string = this.attack_act + ".info.hit." + frameindex;
                            if(data[root]) {
                                if(!this.hitdata[this.attack_act]) this.hitdata[this.attack_act] = [];
                                this.linkHit(data, root, frameindex);
                                frameindex = frameindex + 1;
                            }
                            else break;
                        }
                    }
                    // if(this.balldata.length == 0) {
                    if(!this.balldata[this.attack_act]) {
                        // attack1.info.ball.0
                        frameindex = 0;
                        while(true) {
                            let root:string = this.attack_act + ".info.ball." + frameindex;
                            if(data[root]) {
                                if(!this.balldata[this.attack_act]) this.balldata[this.attack_act] = [];
                                this.linkBall(data, root, frameindex);
                                frameindex = frameindex + 1;
                            }
                            else break;
                        }
                    }
                    // attack1.info.effect.0
                    // if(this.effectdata.length == 0) {
                    if(!this.effectdata[this.attack_act]) {
                        frameindex = 0;
                        while(true) {
                            let root:string = this.attack_act + ".info.effect." + frameindex;
                            if(data[root]) {
                                if(!this.effectdata[this.attack_act]) this.effectdata[this.attack_act] = [];
                                this.linkEff(data, root, frameindex);
                                frameindex = frameindex + 1;
                            }
                            else break;
                        }
                    }
                    if(!this.areadata[this.attack_act]) {
                        frameindex = 0;
                        while(true) {
                            let root:string = this.attack_act + ".info.areaWarning." + frameindex;
                            if(data[root]) {
                                if(!this.areadata[this.attack_act]) this.areadata[this.attack_act] = [];
                                this.linkArea(data, root, frameindex);
                                frameindex = frameindex + 1;
                            }
                            else break;
                        }
                    }
                // }

                //

                if(this.is_oneFrame) {
                    // let maxy = 99999;
                    // let maxi:number = 0;
                    // for(let i:number = 0; i < this.mobData.length; i++) {
                    //     if(this.mobData[i].orgy < maxy) {
                    //         maxy = this.mobData[i].orgy;
                    //         maxi = i;
                    //     }
                    // }
                    // this.mobData[0] = this.mobData[maxi];
                    this.mobData.length = 1;   //单帧播放
                }
                let res:Array<any> = [];
                for(let i:number = 0; i < this.mobData.length; i++) {
                    if(!Laya.loader.getRes(this.mobData[i].tex))
                        res.push({ url: this.mobData[i].tex });
                }
                // for(let i:number = 0; i < this.hitdata.length; i++) {
                //     if(!Laya.loader.getRes(this.hitdata[i].tex))
                //         res.push({ url: this.hitdata[i].tex });
                // }
                // for(let i:number = 0; i < this.balldata.length; i++) {
                //     if(!Laya.loader.getRes(this.balldata[i].tex))
                //         res.push({ url: this.balldata[i].tex });
                // }
                // for(let i:number = 0; i < this.effectdata.length; i++) {
                //     if(!Laya.loader.getRes(this.effectdata[i].tex))
                //         res.push({ url: this.effectdata[i].tex });
                // }
                for(let key in this.hitdata) {
                    let data = this.hitdata[key];
                    for(let i:number = 0; i < data.length; i++) {
                        if(!Laya.loader.getRes(data[i].tex))
                            res.push({ url: data[i].tex });
                    }
                }
                for(let key in this.balldata) {
                    let data = this.balldata[key];
                    for(let i:number = 0; i < data.length; i++) {
                        if(!Laya.loader.getRes(data[i].tex))
                            res.push({ url: data[i].tex });
                    }
                }
                for(let key in this.effectdata) {
                    let data = this.effectdata[key];
                    for(let i:number = 0; i < data.length; i++) {
                        if(!Laya.loader.getRes(data[i].tex))
                            res.push({ url: data[i].tex });
                    }
                }
                for(let key in this.areadata) {
                    let data = this.areadata[key];
                    for(let i:number = 0; i < data.length; i++) {
                        if(!Laya.loader.getRes(data[i].tex))
                            res.push({ url: data[i].tex });
                    }
                }

                // if(this.m_id == "8510000.img") {
                //     // this.setDir(-1);
                //     // this.m_canf = false;
                //     this._automove = false;
                // }
                // else if(this.m_id == "8520000.img") {
                //     // this.setDir(-1);
                //     // this.m_canf = false;
                //     this._automove = false;
                // }

                let can_walk = false;
                let can_fly = false;
                if(msMoudle.wz[this.m_id]) {
                    if(msMoudle.wz[this.m_id]["move"]) can_walk = true;
                    if(msMoudle.wz[this.m_id]["fly"]) can_fly = true;
                }
                if(!can_walk && !can_fly) {
                    this._automove = false;
                }

                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        Laya.timer.clear(this, this.doAction);
                        for(let __u:number = 0; __u < res.length; __u++) {
                        //     ///不放入大图和集里面
                        //     let ___tex = Laya.loader.getRes(res[__u].url);
                        //     if(___tex) {
                        //         ___tex.bitmap.enableMerageInAtlas = false;
                        //     }
                            this.m_loadRes.push(res[__u].url);
                        }
                        msMoudle.resTip(res, true);

                        this.doAction(0, loop);
                        if(this.m_canf) {
                            this.testTime = new Date().getTime();
                            Laya.timer.frameLoop(1, this, this.autoFight);
                        }
                    });
                }
                else {
                    Laya.timer.clear(this, this.doAction);

                    this.doAction(0, loop);
                    if(this.m_canf) {
                        this.testTime = new Date().getTime();
                        Laya.timer.frameLoop(1, this, this.autoFight);
                    }
                }
            }
        }
        m_loadRes:Array<any> = [];
        public m_canf:boolean = true;

        // private linkMob(data:any, root:string, frameindex:number) : void {
        //     let strMarker:string = null;
        //     // console.log(data[root]);
        //     let msg:any = msMoudle.getMobInfo(data[root], this.m_action, this.m_id);
        //     if(data[root + "_outlink"]) msg = msMoudle.getMobInfo(data[root + "_outlink"], this.attack_act, this.m_id);
        //     if(data[root + "_inlink"]) msg = msMoudle.getMobInfo(data[root + "_inlink"], this.attack_act, this.m_id);
        //     console.log("##linkmob, ", msg)
        //     if(msg.root != "") {
        //         root = msg.root;
        //         data = msMoudle.wz[this.m_id][msg.act];
        //     }
        //     strMarker = "res/Mob/" + this.m_id + "/" + msg.strMarker;
        //     let delay:number = data[msg.root + ".delay"];
        //     delay = delay ? delay : 100;
        //     this._(data, root, frameindex, strMarker, delay);
        // }
        private linkMob(data:any, root:string, frameindex:number) : void {
            let strMarker:string = null;
            // console.log("linkMob,", root,data[root]);
            let msg:any = msMoudle.getMobInfo2(msMoudle.wz[this.m_id], this.m_action, root, this.m_id);
            // console.log("##linkmob, ", msg)
            //root 读取信息用，strMarker读取图片
            // if(msg.id) {
            //     Laya.loader.load("res/Mob/" + msg.id + "/index.html", Laya.Handler.create(this, ()=>{
            //         this.linkMob(data, root, frameindex);
            //     }));
            //     return;
            // }
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            strMarker = "res/Mob/"  + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            delay = delay ? delay : 100;
            this._(data, root, frameindex, strMarker, delay);
        }

        private linkHit(data:any, root:string, frameindex:number) : void {
            let strMarker:string = null;
            // let msg:any = msMoudle.getMobInfo(data[root], this.attack_act, this.m_id);
            let msg:any = msMoudle.getMobInfo2(msMoudle.wz[this.m_id], this.m_action, root, this.m_id);
            // if(msg.id) {
            //     console.log("#link hit, ", msg.id)
            //     Laya.loader.load("res/Mob/" + msg.id + "/index.html", Laya.Handler.create(this, ()=>{
            //         console.log("#link hit2, ", msg.id)
            //         this.linkMob(data, root, frameindex);
            //     }));
            //     return;
            // }
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            strMarker = "res/Mob/" + "/" + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            delay = delay ? delay : 100;

            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                let delay = data[root + ".delay"];
                // this.hitdata[frameindex] = new Object();
                // this.hitdata[frameindex].delay = delay ? Number(delay) : 100;
                // this.hitdata[frameindex].tex = strMarker;
                // this.hitdata[frameindex].orgx = -Number(oringinInfo.x);
                // this.hitdata[frameindex].orgy = -Number(oringinInfo.y);
                let hitdata: any = {};
                hitdata.delay = delay ? Number(delay) : 100;
                hitdata.tex = strMarker;
                hitdata.orgx = -Number(oringinInfo.x);
                hitdata.orgy = -Number(oringinInfo.y);
                this.hitdata[this.attack_act][frameindex] = hitdata;
            }
        }

        private linkBall(data:any, root:string, frameindex:number) : void {
            let strMarker:string = null;
            // let msg:any = msMoudle.getMobInfo(data[root], this.attack_act, this.m_id);
            let msg:any = msMoudle.getMobInfo2(msMoudle.wz[this.m_id], this.m_action, root, this.m_id);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            strMarker = "res/Mob/" + "/" + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            delay = delay ? delay : 100;

            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                let delay = data[root + ".delay"];
                // this.balldata[frameindex] = new Object();
                // this.balldata[frameindex].delay = delay ? Number(delay) : 100;
                // this.balldata[frameindex].tex = strMarker;
                // this.balldata[frameindex].orgx = -Number(oringinInfo.x);
                // this.balldata[frameindex].orgy = -Number(oringinInfo.y);
                let hitdata: any = {};
                hitdata.delay = delay ? Number(delay) : 100;
                hitdata.tex = strMarker;
                hitdata.orgx = -Number(oringinInfo.x);
                hitdata.orgy = -Number(oringinInfo.y);
                this.balldata[this.attack_act][frameindex] = hitdata;
            }
        }

        private linkEff(data:any, root:string, frameindex:number) : void {
            // if(this.m_id == "8510000.img") console.log("#linkEff, ", frameindex, this.attack_act)
            let strMarker:string = null;
            // let msg:any = msMoudle.getMobInfo(data[root], this.attack_act, this.m_id);
            let msg:any = msMoudle.getMobInfo2(msMoudle.wz[this.m_id], this.m_action, root, this.m_id);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            strMarker = "res/Mob/" + "/" + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            delay = delay ? delay : 100;

            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                let delay = data[root + ".delay"];
                // this.effectdata[frameindex] = new Object();
                // this.effectdata[frameindex].delay = delay ? Number(delay) : 100;
                // this.effectdata[frameindex].tex = strMarker;
                // this.effectdata[frameindex].orgx = -Number(oringinInfo.x);
                // this.effectdata[frameindex].orgy = -Number(oringinInfo.y);
                let hitdata: any = {};
                hitdata.delay = delay ? Number(delay) : 100;
                hitdata.tex = strMarker;
                hitdata.orgx = -Number(oringinInfo.x);
                hitdata.orgy = -Number(oringinInfo.y);
                this.effectdata[this.attack_act][frameindex] = hitdata;
            }
            // // console.log(strMarker + "  " + delay);
        }

        private linkArea(data:any, root:string, frameindex:number) : void {
            let strMarker:string = null;

            // let msg:any = msMoudle.getMobAreaInfo(data[root], this.attack_act, this.attack_act + ".info.areaWarning", this.m_id);
            let msg:any = msMoudle.getMobInfo2(msMoudle.wz[this.m_id], this.m_action, root, this.m_id);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.m_id][msg.act];
            }
            strMarker = "res/Mob/" + "/" + msg.strMarker;
            let delay:number = data[msg.root + ".delay"];
            delay = delay ? delay : 100;

            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                let delay = data[root + ".delay"];
                let hitdata: any = {};
                hitdata.delay = delay ? Number(delay) : 100;
                hitdata.tex = strMarker;
                hitdata.orgx = -Number(oringinInfo.x);
                hitdata.orgy = -Number(oringinInfo.y);
                this.areadata[this.attack_act][frameindex] = hitdata;
            }
            // // console.log(strMarker + "  " + delay);
        }

        m_candie:boolean = false;
        private doAction(frameIndex:number, loop:number) : void {
            // if(this.m_action.indexOf("attack") > -1 && frameIndex == 0 && this.m_id == "8510000.img") console.log("#doAction, ", this.m_action)
            if(this.mobData.length > 0) {
                if(frameIndex >= this.mobData.length) {
                    frameIndex = 0;
                    this.m_frameIndex = frameIndex;

                    this.checkInView();

                    if(loop != 0) {
                        if(this.m_isdead) {
                            if(this.msgData.id == "8800000" ||
                                this.msgData.id == "8800003" || this.msgData.id == "8800004" || this.msgData.id == "8800005" || this.msgData.id == "8800006" || this.msgData.id == "8800007" || this.msgData.id == "8800008" || this.msgData.id == "8800009" || this.msgData.id == "8800010" ||
                                this.msgData.id == "8810002" || this.msgData.id == "8810003" || this.msgData.id == "8810004" || this.msgData.id == "8810005" || this.msgData.id == "8810006" || this.msgData.id == "8810007" || this.msgData.id == "8810008" || this.msgData.id == "8810009") {
                                    if(msMoudle.mapP.m_id != "280030100.img" && msMoudle.mapP.m_id != "240060200.img") {
                                        this.changeByName("stand", 0);
                                    }
                                    else {
                                        //扎昆最终死亡
                                        if(this.msgData.id == "8800000") {
                                            if(!msMoudle.isBossMap()) {
                                                if(this.m_candie) {
                                                    this.mobAni.skin = "";
                                                    let mb:MonsterBookRole.MonsterBook = new MonsterBookRole.MonsterBook();
                                                    // let reward:any = mb.getMobRewardAndRand( Number(100100).toFixed(0) );
                                                    msMoudle.getRw(this);
                                                    let reward:any = mb.getRandReward(this, true);
                                                    for(let i:number = 0; i < reward.length; i++) {
                                                        let tIndex:number = msMoudle.mainT.m_itemList.length;
                                                        msMoudle.mainT.m_itemList[tIndex] = Laya.Pool.getItemByClass("ItemRole.Item", ItemRole.Item);//new ItemRole.Item();
                                                        msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward[i], reward.length, i, this.m_x, this.m_y);
                                                    }
                                                    return ;
                                                }
                                                else {
                                                    this.changeByName("stand", 0);
                                                }
                                            }
                                            else {
                                                this.mobAni.skin = "";
                                            }

                                            // if(this.m_candie) this.mobAni.skin = "";
                                        }
                                        //黑龙最终死亡
                                        else if(this.msgData.id == "8810002" || this.msgData.id == "8810003" || this.msgData.id == "8810004" || this.msgData.id == "8810005" || this.msgData.id == "8810006" || this.msgData.id == "8810007" || this.msgData.id == "8810008" || this.msgData.id == "8810009") {
                                            if(!msMoudle.isBossMap()) {
                                                //所有都不会消失
                                                if(this.m_candie) {
                                                    // this.mobAni.skin = "";
                                                    let mb:MonsterBookRole.MonsterBook = new MonsterBookRole.MonsterBook();
                                                    // let reward:any = mb.getMobRewardAndRand( Number(100100).toFixed(0) );
                                                    msMoudle.getRw(this);
                                                    let reward:any = mb.getRandReward(this, true);
                                                    for(let i:number = 0; i < reward.length; i++) {
                                                        let tIndex:number = msMoudle.mainT.m_itemList.length;
                                                        msMoudle.mainT.m_itemList[tIndex] = Laya.Pool.getItemByClass("ItemRole.Item", ItemRole.Item);//new ItemRole.Item();
                                                        msMoudle.mainT.m_itemList[tIndex].PickOffItem(msMoudle.mainP.m_sp, reward[i], reward.length, i, this.m_x, this.m_y);
                                                    }
                                                    return ;
                                                }
                                            }
                                            else {

                                            }
                                        }
                                        //扎昆除了主体其他会消失
                                        else this.mobAni.skin = "";
                                    }
                                }
                            else {
                                this.mobAni.skin = "";
                            }
                        }
                        else {
                            this.changeByName("stand", 0);
                        }
                        return ;
                    }
                }
                this.m_frameIndex = frameIndex;
                if(this.mobAni) {
                    // if(this.m_action.indexOf("attack") > -1 && frameIndex == 0 /*&& this.m_id == "8510000.img"*/) console.log("#doAction3, ", this.m_action, this.mobData[frameIndex])
                    this.mobAni.skin = this.mobData[frameIndex].tex;
                    // if(this.is_oneFrame) {
                    //     let tex = Laya.loader.getRes(this.mobData[frameIndex].tex);
                    //     // this.mobAni.width = 50;
                    //     // this.mobAni.height = 50;
                    //     if(tex.width > 50 || tex.height > 50) {
                    //         if(tex.height > tex.width) {
                    //             this.m_sp.scale(50/tex.height, 50/tex.height);
                    //         }
                    //         else {
                    //             this.m_sp.scale(50/tex.width, 50/tex.width);
                    //         }
                    //     }
                    //     // this.m_sp.y += (tex.height + this.mobData[frameIndex].orgy) / 2
                    //     // if(this.m_action == "fly") this.m_sp.y += 10;
                    //     // this.m_y = 0;
                    //     // this.m_sp.y = -this.mobData[frameIndex].orgy;
                    //     // this.mobAni.pos(this.mobData[frameIndex].orgx, this.mobData[frameIndex].orgy);
                    // }
                    // else {
                    this.mobAni.pos(this.mobData[frameIndex].orgx, this.mobData[frameIndex].orgy);
                    // }
                    this.mobAni.zOrder = this.mobData[frameIndex].z;
                }
                if(this.hpBar)
                    // this.hpBar.pos(-this.hpBar.width / 2, this.mobData[frameIndex].orgy - 10);
                    this.hpBar.pos(this.m_offX-this.hpBar.width / 2, this.mobData[frameIndex].orgy - 10);

                if(this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("move") >= 0 || this.m_action.indexOf("fly") >= 0|| this.m_action.indexOf("jump") >= 0) {
                    this.drawBound(this.mobData[frameIndex]);
                }
                else if(this.m_action.indexOf(this.attack_act) >= 0) {
                    let data:any = msMoudle.wz[this.m_id][this.attack_act];
                    if(data) {
                        let a:any = new Object();
                        let lt:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.lt"]);
                        let rb:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.rb"]);
                        let sp:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.sp"]);
                        let r:number = Number(data[this.attack_act + ".info.range.r"]);
                        if(r && sp) {
                            a.l = Number(sp.x);
                            a.t = Number(sp.y);
                            a.r = Number(sp.x) - r;//-0
                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                                a.b = Number(sp.y);
                            else
                                a.b = 0;//Number(sp.y);
                        }
                        else {
                            a.l = Number(lt.x);
                            a.t = Number(lt.y);
                            a.r = Number(rb.x);//-0
                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                                a.b = Number(rb.y);
                            else
                                a.b = 0;//Number(rb.y);
                        }
                        this.drawHitBound(a);
                    }
                }

                if(this.mobData.length > 1) Laya.timer.once(this.mobData[frameIndex].delay * (1 / ms.speed), this, this.doAction, [frameIndex + 1, loop]);
            }
        }

        public doHitAction(frameIndex:number, bally:number) : void {
            // if(this.hitdata) {
            //     if(frameIndex >= this.hitdata.length) {
            //         frameIndex = 0;
            //         if(this.hitAni) this.hitAni.visible = false;
            //         return ;
            //     }
            //     if(this.hitdata[frameIndex]) {
            //         this.hitAni.skin = this.hitdata[frameIndex].tex;
            //         this.hitAni.visible = true;
            //         ///这里处理得不是很对
            //         // msMoudle._alphasp(this.hitAni, this.hitdata[frameIndex].delay);
            //         if(bally) {
            //             this.hitAni.pos(this.hitdata[frameIndex].orgx, this.hitdata[frameIndex].orgy + bally);
            //         }
            //         else {
            //             this.hitAni.pos(this.hitdata[frameIndex].orgx, this.hitdata[frameIndex].orgy);
            //         }
            //         if(this.hitdata.length > 0) {
            //             Laya.timer.once(this.hitdata[frameIndex].delay * (1 / ms.speed), this, this.doHitAction, [frameIndex + 1, bally], false);
            //         }
            //     }
            // }
            if(this.hitdata) {
                if(this.hitdata[this.attack_act]) {
                    if(frameIndex >= this.hitdata[this.attack_act].length) {
                        frameIndex = 0;
                        if(this.hitAni) this.hitAni.visible = false;
                        return ;
                    }
                    if(this.hitdata[this.attack_act][frameIndex]) {
                        if(this.hitAni) {
                            this.hitAni.skin = this.hitdata[this.attack_act][frameIndex].tex;
                            this.hitAni.visible = true;
                            ///这里处理得不是很对
                            // msMoudle._alphasp(this.hitAni, this.hitdata[frameIndex].delay);
                            let _y = bally || 0;
                            this.hitAni.pos(this.hitdata[this.attack_act][frameIndex].orgx, _y + this.hitdata[this.attack_act][frameIndex].orgy);
                            if(frameIndex == 0) this.hitAni.scaleX = this.m_dir;
                        }
                        if(this.hitdata[this.attack_act].length > 0) {
                            Laya.timer.once(this.hitdata[this.attack_act][frameIndex].delay * (1 / ms.speed), this, this.doHitAction, [frameIndex + 1, bally], false);
                        }
                    }
                }
            }
        }

        public doBallAction(frameIndex:number, bally:number) : void {
            // if(this.balldata) {
            //     if(frameIndex >= this.balldata.length) {
            //         frameIndex = 0;
            //     }
            //     if(this.balldata[frameIndex]) {
            //         if(this.ballAni) {
            //             this.ballAni.skin = this.balldata[frameIndex].tex;
            //             this.ballAni.visible = true;
            //             if(bally) {
            //                 this.ballAni.pos(this.balldata[frameIndex].orgx, this.balldata[frameIndex].orgy + bally);
            //             }
            //             else {
            //                 this.ballAni.pos(this.balldata[frameIndex].orgx, this.balldata[frameIndex].orgy);
            //             }
            //         }
            //         if(this.balldata.length > 0) {
            //             Laya.timer.once(this.balldata[frameIndex].delay * (1 / ms.speed), this, this.doBallAction, [frameIndex + 1, bally], false);
            //         }
            //     }
            // }
            if(this.balldata[this.attack_act]) {
                if(frameIndex >= this.balldata[this.attack_act].length) {
                    frameIndex = 0;
                }
                if(this.balldata[this.attack_act][frameIndex]) {
                    if(this.ballAni) {
                        this.ballAni.skin = this.balldata[this.attack_act][frameIndex].tex;
                        this.ballAni.visible = true;
                        if(bally) {
                            this.ballAni.pos(this.balldata[this.attack_act][frameIndex].orgx, this.balldata[this.attack_act][frameIndex].orgy + bally);
                        }
                        else {
                            this.ballAni.pos(this.balldata[this.attack_act][frameIndex].orgx, this.balldata[this.attack_act][frameIndex].orgy);
                        }
                    }
                    if(this.balldata[this.attack_act].length > 0) {
                        Laya.timer.once(this.balldata[this.attack_act][frameIndex].delay * (1 / ms.speed), this, this.doBallAction, [frameIndex + 1, bally], false);
                    }
                }
            }
        }

        public doEffAction(frameIndex:number) : void {
            if(this.effectdata[this.attack_act]) {
                if(frameIndex >= this.effectdata[this.attack_act].length) {
                    frameIndex = 0;
                    if(this.effectAni) this.effectAni.visible = false;
                    return ;
                }
                if(this.effectdata[this.attack_act][frameIndex]) {
                    if(this.effectAni) {
                        this.effectAni.skin = this.effectdata[this.attack_act][frameIndex].tex;
                        this.effectAni.visible = true;
                        this.effectAni.scaleX = this.m_effect_dir;
                        this.effectAni.pivot(-this.effectdata[this.attack_act][frameIndex].orgx, -this.effectdata[this.attack_act][frameIndex].orgy);
                    }
                    if(this.effectdata[this.attack_act].length > 0) {
                        Laya.timer.once(this.effectdata[this.attack_act][frameIndex].delay * (1 / ms.speed), this, this.doEffAction, [frameIndex + 1], false);
                    }
                }
            }
        }

        public doAreaAction(key: string, frameIndex:number, attackCount: number) : void {
            let areaInfo = this.areadata[key];
            if(areaInfo) {
                if(frameIndex >= areaInfo.length) {
                    frameIndex = 0;
                    for(let i=0; i<this.areaAnis.length; ++i) {
                        this.areaAnis[i].visible = false;
                    }
                    return ;
                }
                if(areaInfo[frameIndex]) {
                    for(let i=0; i<attackCount; ++i) {
                        this.areaAnis[i].skin = areaInfo[frameIndex].tex;
                        this.areaAnis[i].visible = true;
                        this.areaAnis[i].pos((this.areaAnis[i] as any).my_init_x + areaInfo[frameIndex].orgx, (this.areaAnis[i] as any).my_init_y + areaInfo[frameIndex].orgy);
                    }
                }
                if(areaInfo.length > 0) {
                    Laya.timer.once(areaInfo[frameIndex].delay * (1 / ms.speed), this, this.doAreaAction, [key, frameIndex + 1, attackCount], false);
                }
            }
        }

        private _(data:any, root:string, frameindex:number, strMarker:string, delay:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            let lt:any = msMoudle.Vec2FromArr(data[root + ".lt"]);
            let rb:any = msMoudle.Vec2FromArr(data[root + ".rb"]);
            let z:any = data[root + ".z"];
            let frameHead:any = msMoudle.Vec2FromArr(data[root + ".head"]);
            let head:any = {x:0,y:0};
            if(msMoudle.wz[this.m_id]["hit1"])
                head = msMoudle.Vec2FromArr(msMoudle.wz[this.m_id]["hit1"]["hit1.0.head"]);
            else
                head = frameHead;

            ////改这里可能是最方便的
            this.mobData[frameindex] = new Object();
            this.mobData[frameindex].tex = strMarker;
            this.mobData[frameindex].delay = delay ? Number(delay) : 100;
            this.mobData[frameindex].z = Number(z);
            this.mobData[frameindex].orgx = -Number(oringinInfo.x);
            this.mobData[frameindex].orgy = -Number(oringinInfo.y);
            this.mobData[frameindex].l = Number(lt.x);
            this.mobData[frameindex].t = Number(lt.y);
            this.mobData[frameindex].r = Number(rb.x);
            this.mobData[frameindex].frameHead = frameHead;
            //黑龙的头这里不够
            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                this.mobData[frameindex].b = Number(rb.y);
            else
                this.mobData[frameindex].b = 0;//Number(rb.y);
            this.mobData[frameindex].head = head;

            // if(this.msgData.id == "8840000") console.log(strMarker)
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            if(this.m_sp) this.m_sp.pos(x, y);
            if(this.m_nametag_sp) this.m_nametag_sp.pos(this.m_x, this.m_y);
            if(this.m_effect_sp) this.m_effect_sp.pos(this.m_x, this.m_y);
            if(this.hitBound) this.hitBound.pos(this.m_x, this.m_y);
            if(this.atkBound) this.atkBound.pos(this.m_x, this.m_y);

            ///否则会被隐藏
            if(this.m_canf) {
                this.checkInView();
            }
        }

        private checkInView() {
            if(this.m_alwaysShow) return;
            if(msMoudle.char) {
                if(this.m_x >= msMoudle.char.m_x - Laya.stage.width &&
                    this.m_x <= msMoudle.char.m_x + Laya.stage.width &&
                    this.m_y >= msMoudle.char.m_y - Laya.stage.height &&
                    this.m_y <= msMoudle.char.m_y + Laya.stage.height) {
                    if(msMoudle.mainP && msMoudle.isBossMap(msMoudle.mainP.m_id)) {
                        if(this.m_sp) this.m_sp.visible = true;
                    }
                    else {
                        if(this.m_sp) {
                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                                this.m_sp.visible = true;
                            }
                            else {
                                this.m_sp.visible = !this.m_isdead;
                            }
                        }
                    }
                }
                else
                    if(this.m_sp) this.m_sp.visible = false;
            }
        }


        public setDir(dir:number) : void {
            if(/*this.msgData.id == "8800000" || this.msgData.id == "8800003" || this.msgData.id == "8800004" || this.msgData.id == "8800005" || this.msgData.id == "8800006" || this.msgData.id == "8800007" || this.msgData.id == "8800008" || this.msgData.id == "8800009" || this.msgData.id == "8800010" ||
            this.msgData.id == "8810002" || this.msgData.id == "8810003" || this.msgData.id == "8810004" || this.msgData.id == "8810005" || this.msgData.id == "8810006" || this.msgData.id == "8810007" || this.msgData.id == "8810008" || this.msgData.id == "8810009" || this.msgData.id == "8810018"
            || this.msgData.id == "8510000" || this.msgData.id == "8520000"*/this.m_noFlip) { //鱼王
                //扎昆不需要转向
            }
            else {
                this.m_dir = dir;
                if(this.m_sp) {
                    if(this.force_scale == 1) {
                        this.m_sp.scaleX = msMoudle.mapleSize * dir;
                        this.m_sp.scaleY = msMoudle.mapleSize;
                    }
                    else {
                        this.m_sp.scaleX = this.force_scale * dir;
                        this.m_sp.scaleY = this.force_scale;
                    }
                }
                if(this.hitBound) {
                    if(this.force_scale == 1) {
                        this.hitBound.scaleX = msMoudle.mapleSize * dir;
                        this.hitBound.scaleY = msMoudle.mapleSize;
                    }
                    else {
                        this.hitBound.scaleX = this.force_scale * dir;
                        this.hitBound.scaleY = this.force_scale;
                    }
                }
                if(this.atkBound) {
                    if(this.force_scale == 1) {
                        this.atkBound.scaleX = msMoudle.mapleSize * dir;
                        this.atkBound.scaleY = msMoudle.mapleSize;
                    }
                    else {
                        this.atkBound.scaleX = this.force_scale * dir;
                        this.atkBound.scaleY = this.force_scale;
                    }
                }
            }
        }

        private drawBound(a:any) : void {
            if(this.hitBound) {
                this.hitBound.graphics.clear();
                this.hitBound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ff00ff");
            }
            if(!this.m_hasDetect) {
                this.m_hasDetect = true;
                if(this.hitBound) {
                    let bound = this.hitBound.getBounds();
                    this.m_offX = a.orgx + bound.width/2;
                    this.m_offY = a.orgy;
                }
            }
        }

        private drawHitBound(a:any) : void {
            if(this.atkBound) {
                this.atkBound.graphics.clear();
                this.atkBound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
            }
        }

        //test
        testTime = 0;
        actionArr = [1, 1, 0, -1, 0, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, 0, 0, 1, -1];
        private testAutoFight() {
            if(this.m_hp <= 0) return;
            // console.log("index is ", this.m_index)
            let index = (Math.floor(Sync.serverTime() / 1000) + this.m_index * 2) % 20;
            let action = this.actionArr[index];
            let time = new Date().getTime();
            let diff = time - this.testTime;
            this.testTime = time;
            if(diff < 0.0001) return;
            if(diff > 100) { //防止切后台时间过长
                diff = 16;
            }
            let move = diff * (this.m_speed / 1500) * ms.speed;
            if(msMoudle.wz[this.m_id]) {
                let move_tag = "move";      //有些怪物可能是飞的
                if(this.m_id == "8150000.img") move_tag = "fly";
                if(this.m_id == "9300028.img") move_tag = "stand";
                if(this.m_movetag != "") move_tag = this.m_movetag;
                if(this._automove == false) move_tag = "stand";

                if(msMoudle.mapP) {
                    if(msMoudle.mapP.m_life) {
                        this.m_armyList = [msMoudle.char];
                        for(let i=0; i<Sync.realPlayers.length; ++i) {
                            this.m_armyList.push(Sync.realPlayers[i]);
                        }
                    }
                }

                if( (this.m_isdead == false ||  (msMoudle.isWorldBoss && msMoudle.WorldBossLv == 140 || msMoudle.WorldBossLv == 180) )
                    && this._autofight && this.isOrgState() == false) {     //未死亡
                    if(this.m_down_t == 0 && this.m_up_t == 0) {
                        if(this.AiData.timeN <= 0) {             //状态变化时间
                            //上一个技能特效动画没播完
                            if((this.effectAni && this.effectAni.visible) || (this.areaAnis[0] && this.areaAnis[0].visible)) {}
                            else if(this.m_action == this.attack_act || (this.m_multiSkill && this.m_atkInfo[this.m_action])) {}
                            else {
                                this.AiData.timeN = 60 * (ms.speed / 1);
                                let data:any = msMoudle.wz[this.m_id][this.attack_act];
                                if(data) {
                                    let _canatk:boolean = false;

                                    /////这里不是选取的最近的
                                    let longDis:number = 99999999;
                                    let char:any = null;
                                    let leavechar:any = null;

                                    // let armyBounds: Laya.Rectangle[] = [];
                                    // for(let i :number = 0; i < this.m_armyList.length; i++) {
                                    //     if(this.m_armyList[i].m_hp > 0) {
                                    //         let mbound = this.m_armyList[i].hitBound.getBounds();
                                    //         if(mbound) {
                                    //             armyBounds.push(mbound);
                                    //         }
                                    //     }
                                    //     // else {
                                    //     //     armyBounds.push(null);
                                    //     // }
                                    // }
                                    let atkList: any[] = []; //可以攻击到人的所有技能
                                    for(let key in this.m_atkInfo) {
                                        let data:any = msMoudle.wz[this.m_id][key];
                                        if(data) {
                                            let a = this.m_atkInfo[key];
                                            if(a.l == null) {
                                                a = {};
                                                let lt:any = msMoudle.Vec2FromArr(data[key + ".info.range.lt"]);
                                                let rb:any = msMoudle.Vec2FromArr(data[key + ".info.range.rb"]);
                                                let sp:any = msMoudle.Vec2FromArr(data[key + ".info.range.sp"]);
                                                let r:number = Number(data[key + ".info.range.r"]);
                                                if(r && sp) {           //弹道型
                                                    a.l = Number(sp.x) - r;
                                                    a.t = Number(sp.y);
                                                    a.r = Number(sp.x);//-0
                                                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                                                        a.b = Number(sp.y);
                                                        if(this.m_id == "8850111.img") {
                                                            a.b = 0;
                                                        }
                                                    }
                                                    else
                                                        a.b = 0;//Number(sp.y);
                                                }
                                                else {
                                                    a.l = Number(lt.x);
                                                    a.t = Number(lt.y);
                                                    a.r = Number(rb.x);//-0
                                                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                                                        a.b = Number(rb.y);
                                                    else
                                                        a.b = 0;//Number(rb.y);
                                                }
                                                //区域性预警攻击
                                                let areaCount = data[key + ".info.range.areaCount"];
                                                if(areaCount) {
                                                    a.areaCount = Number(areaCount);
                                                    a.attackWidth = a.r - a.l;
                                                    a.start = Number(data[key + ".info.range.start"]);
                                                    if(a.start < -areaCount) a.start = -areaCount;
                                                    else if(a.start > areaCount) a.start = areaCount;
                                                    a.attackCount = Number(data[key + ".info.range.attackCount"] || areaCount);
                                                    a.l = a.start * a.attackWidth;
                                                    a.r = a.attackWidth * (areaCount - 1) + a.l;
                                                    // a.r = Number(data[key + ".info.range.start"]);
                                                    // let atkWid = a.attackWidth * (areaCount - 1);
                                                    // if(atkWid > 800) atkWid = 800;  //限制攻击范围
                                                    // a.l = a.r - atkWid;
                                                }
                                                this.m_atkInfo[key] = a;
                                            }
                                            this.drawHitBound(a);
                                            if(a) {
                                                // console.log("22222", a);
                                                if(a.areaCount && this.areaAnis[0] && this.areaAnis[0].visible) {
                                                    // console.log("22222", "22222")
                                                }
                                                else {
                                                    // console.log("22222", "33333")
                                                    // let bound = new Laya.Rectangle((this.m_dir == 1 ? a.l : -a.r) + this.m_x, a.t + this.m_y, a.r - a.l, a.b - a.t);
                                                    // let canAttack = false;
                                                    if(this.atkBound) {
                                                        let bound = this.atkBound.getBounds();
                                                        if(bound) {
                                                            for(let i=0; i<this.m_armyList.length; ++i) {
                                                                if(this.m_armyList[i] && this.m_armyList[i].hitBound) {
                                                                    if(bound.intersects(this.m_armyList[i].hitBound.getBounds())) {
                                                                        _canatk = true;
                                                                        let _____:number = Math.abs(this.m_x - this.m_armyList[i].m_x);
                                                                        if(_____ < longDis) {
                                                                            longDis = _____;
                                                                            char = this.m_armyList[i];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if(_canatk) {
                                                                atkList.push([key, bound, char]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if(atkList.length > 0) {
                                        _canatk = true;
                                        let rnk = Math.floor(Math.random() * atkList.length);
                                        this.attack_act = atkList[rnk][0];
                                        char = atkList[rnk][2];
                                    }
                                    else {
                                        // let a = this.m_atkInfo[this.attack_act];
                                        // let bound = new Laya.Rectangle((this.m_dir == 1 ? a.l : -a.r) + this.m_x, a.t + this.m_y, a.r - a.l, a.b - a.t);
                                        // console.log("out of range, ", this.m_dir, armyBounds[0], bound)
                                    }

                                    // if(msMoudle.isWorldBoss && msMoudle.WorldBossLv == 140) {
                                    //     _canatk = true;
                                    // }
                                    ////如果世界boss打赢了就停止
                                    if(msMoudle.isWorldBoss) {
                                        if(msMoudle.WorldBossLv == 120 || msMoudle.WorldBossLv == 140 || msMoudle.WorldBossLv == 160 ||
                                        msMoudle.WorldBossLv == 180) {
                                            // _canatk = true;
                                            if(msMoudle.boss_win) _canatk = false;
                                        }
                                    }

                                    ///如果此时范围内有人能够攻击就打
                                    // char = msMoudle.char;
                                    if(char && _canatk && (this.m_action == "move" || this.m_action == "stand" || this.m_action == "fly" )) {

                                        let data:any = msMoudle.wz[this.m_id][this.attack_act];
                                        let sp:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.sp"]);
                                        //计算伤害
                                        let hit:Array<any> = [];
                                        let attackCount:number = 1;
                                        let charDef = (char.m_def + char.b_def) * (1 + char.p_def);
                                        let minatk:number = (this.m_atk * (1 + this.p_atk) - charDef) > 0 ? (this.m_atk * (1 + this.p_atk) - charDef) : 1;

                                        ///破防50%
                                        if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                                            if(ms.tamingmobbagsdata.length < 8) {
                                                minatk = this.m_atk * (1 + this.p_atk) - charDef * 0.1;
                                            }
                                            else {
                                                minatk = this.m_atk * (1 + this.p_atk) * 0.75 - charDef * 0.1;
                                            }
                                            minatk =  Math.floor(minatk);
                                        }

                                        let maxatk:number = minatk;

                                        if(msMoudle.guaji) {
                                            minatk = 0;
                                            maxatk = 0;
                                        }

                                        // minatk = 1;

                                        // let minatk:number = msMoudle.herodata.incPAD;
                                        // let maxatk:number = msMoudle.herodata.incPAD * 1.25;

                                        for(let i:number = 0; i < attackCount; i++) {
                                            let _tz:number = msMoudle.getRandValue(0, 0, 100);
                                            ////角色闪避
                                            if(_tz >= (this.m_target +this.p_target) - (char.m_miss + char.p_miss) ) {
                                                hit[i] = {num : 0, bj:false};
                                            }
                                            else {
                                                // let _bj:number = msMoudle.getRandValue(0, 0, 100);
                                                // let _bj:number = 100;
                                                // if(_bj < 50) {
                                                //     hit[i] = {num : minatk, bj:true};
                                                //     hit[i].num *= 2;
                                                // }
                                                // else {
                                                    hit[i] = {num : minatk, bj:false};
                                                // }
                                            }
                                        }

                                        ///这里是重点effectAfter效果延迟,attackAfter延迟
                                        // <tr><td>attack1.info.effectAfter</td><td>0</td></tr>
                                        // <tr><td>attack1.info.attackAfter</td><td>1500</td></tr>
                                        // <tr><td>attack1.info.jumpAttack</td><td>1</td></tr>
                                        let attackAfter:number = Number(data[this.attack_act + ".info.attackAfter"]);
                                        let effectAfter:number = Number(data[this.attack_act + ".info.effectAfter"]);

                                        this.AiData.stateN = this.attack_act;
                                        this.changeByName(this.AiData.stateN, 1);
                                        this.setDir(char.m_x > this.m_x ? -1 : 1);

                                        // console.log("xxxxxx", hit)

                                        this.m_effect_dir = this.m_dir;
                                        Laya.timer.once(effectAfter * (1 / ms.speed), this, ()=> {
                                            this.doEffAction(0);

                                            //区域性预警攻击
                                            let a = this.m_atkInfo[this.attack_act];
                                            if(a && a.areaCount) {
                                                let areaIdxs: number[] = [];
                                                for(let i=0; i<Number(a.areaCount); ++i) {
                                                    areaIdxs.push(i);
                                                }
                                                for(let i=0; i<a.areaCount - a.attackCount; ++i) {
                                                    areaIdxs.splice(Math.floor(Math.random() * areaIdxs.length), 1);
                                                }
                                                // areaIdxs = [0, 1, 2, 3, 4, 5]
                                                for(let i=0; i<Number(a.attackCount); ++i) {
                                                    let ani = this.areaAnis[i];
                                                    if(!ani) {
                                                        ani = new Laya.Image;
                                                        ani.zOrder = 99999;
                                                        this.m_parent.addChild(ani);
                                                        this.areaAnis.push(ani);
                                                    }
                                                    (ani as any).my_init_x = (this.m_dir == 1 ? a.r : -a.l) - a.attackWidth * areaIdxs[i] + this.m_x;
                                                    (ani as any).my_init_y = this.m_y;
                                                }
                                                this.doAreaAction(this.attack_act, 0, a.attackCount);
                                                let b = {l:a.l, r:a.r, t:a.t, b:a.b};
                                                if(this.m_dir == -1) {
                                                    b.l = -a.r;
                                                    b.r = -a.l;
                                                }
                                                this.drawHitBound(b);
                                            }
                                        });
                                        Laya.timer.once(attackAfter * (1 / ms.speed), this, ()=> {
                                            //ball应该在attackAfter执行
                                            if(data[this.attack_act + ".info.ball.0"]) {
                                                if(char) {
                                                    Laya.timer.clear(this, this.doBallAction);
                                                    this.doBallAction(0, sp.y);
                                                    if(this.TimeLine) {
                                                        this.TimeLine.pause();
                                                        this.TimeLine = null;
                                                    }
                                                    if(this.ballAni) {
                                                        this.ballSp.pos(0, 0);
                                                        this.TimeLine = new Laya.TimeLine();
                                                        this.TimeLine.addLabel("ball_1" + msMoudle.getRandValue(0, 0, 10000000), 0).to(
                                                            this.ballSp, {x: (char.m_x - this.m_x) * this.m_dir }, ( Math.abs(char.m_x - this.m_x) / 500) * 1000  * (1 / ms.speed),null, 0);
                                                        this.TimeLine.play(0, false);
                                                        this.TimeLine.once(Laya.Event.COMPLETE, this, ()=> {
                                                            if(!char.m_id || char.m_id == ms.user)
                                                                this.showHit(char, hit, sp.y);
                                                            if(this.ballAni) {
                                                                this.ballAni.visible = false;
                                                                Laya.timer.clear(this, this.doBallAction);
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                            else {
                                                if(!char.m_id || char.m_id == ms.user)
                                                    this.showHit(char, hit, 0);
                                            }
                                        });
                                        // this.updataDistance();
                                    }
                                    else {
                                        if(this._automove) {
                                            ///如果生命不是满的就不随机(找最近的人打)
                                            if(this.m_hp != this.m_maxhp && leavechar) {
                                                this.AiData.dirN = (leavechar.m_x > this.m_x ? -1 : 1);
                                                this.AiData.stateN =  move_tag;
                                                if(this.m_action != this.AiData.stateN) this.changeByName(this.AiData.stateN, 0);
                                                if(this.m_dir != this.AiData.dirN) this.setDir(this.AiData.dirN);
                                            }
                                            else {
                                                if(action != 0) this.AiData.dirN = -action;//msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                                                this.AiData.stateN = action != 0 ? move_tag : "stand";
                                                this.changeByName(this.AiData.stateN, 0);
                                                this.setDir(this.AiData.dirN);
                                            }
                                        }
                                    }
                                }
                                ///新增了这里
                                else {
                                    if(this._automove) {
                                        if(action != 0) this.AiData.dirN = -action;;//msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                                        this.AiData.stateN = action != 0 ? move_tag : "stand";
                                        this.changeByName(this.AiData.stateN, 0);
                                        this.setDir(this.AiData.dirN);
                                    }
                                }
                            }
                        }
                        else {
                            this.AiData.timeN -= 1;
                            if(this.m_action == this.attack_act) {}
                            else {
                                if(this._automove) {
                                    if(this.m_action == move_tag) {
                                        if(this.AiData.dirN == -1) {
                                            if(msMoudle.mainT.onWall(this, this.AiData.dirN) == false) {
                                                if(this.m_x + move >= this.msgData.rx1) {
                                                    move = this.msgData.rx1 - this.m_x - 1;
                                                }
                                                if(this.m_x < this.msgData.rx1)
                                                    msMoudle.mainT.MobrightMoveNew(this, move);
                                            }
                                        }
                                        else {
                                            if(msMoudle.mainT.onWall(this, this.AiData.dirN) == false) {
                                                if(this.m_x - move <= this.msgData.rx0) {
                                                    move = this.m_x - this.msgData.rx0 + 1;
                                                }
                                                if(this.m_x > this.msgData.rx0)
                                                    msMoudle.mainT.MobleftMoveNew(this, move);
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                else {
                    Laya.timer.clear(this, this.autoFight);
                }
            }
        }
        //////战斗优化（没有攻击、直接找人就打、到时候最多就是添加技能进去）
        ////这里的攻击还是不怎么满意
        private autoFight() : void {
            if(msMoudle.isBossMap(msMoudle.mainP.mId)) {
                if(this.m_protect) return;
            }
            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img" /*&& !msMoudle.isBossMap(msMoudle.mapP.m_id)*/){
                this.testAutoFight();
                return;
            }
            // console.log("xxxx")
            if(msMoudle.wz[this.m_id]) {
                let move_tag = "move";      //有些怪物可能是飞的
                if(this.m_id == "8150000.img") move_tag = "fly";
                if(this.m_id == "9300028.img") move_tag = "stand";
                if(this.m_movetag != "") move_tag = this.m_movetag;
                if(this._automove == false) move_tag = "stand";

                if(msMoudle.mapP) {
                    if(msMoudle.mapP.m_life) {
                        // this.m_life.m_charsAni[this.m_life.m_charsAni.length] = msMoudle.char;
                        if(msMoudle.mapP.m_life.m_charsAni.length == 0)
                            msMoudle.mapP.m_life.m_charsAni[msMoudle.mapP.m_life.m_charsAni.length] = msMoudle.char;
                        this.m_armyList = msMoudle.mapP.m_life.m_charsAni;
                    }
                }

                if( (this.m_isdead == false ||  (msMoudle.isWorldBoss && msMoudle.WorldBossLv == 140 || msMoudle.WorldBossLv == 180) )
                    && this._autofight && this.isOrgState() == false) {     //未死亡
                    if(this.m_down_t == 0 && this.m_up_t == 0) {
                        if(this.AiData.timeN <= 0) {             //状态变化时间
                            if(this.m_action == this.attack_act) {}
                            else {

                                this.AiData.timeN = 60 * (ms.speed / 1);
                                let _canatk:boolean = false;
                                // if(msMoudle.guaji == false) {
                                // if(msMoudle.mapP && (msMoudle.isAuMap(msMoudle.mapP.m_id) && msMoudle.guaji == false) || msMoudle.mapP.m_id == "000020000_gai.img") {    //蜗牛不处理
                                    let data:any = msMoudle.wz[this.m_id][this.attack_act];
                                    if(data) {
                                        // console.log(data["attack1.info.range.lt"]);
                                        // console.log(data["attack1.info.range.rb"]);

                                        // <tr><td>attack1.info.range.sp</td><td>-14,-29</td></tr>
                                        // <tr><td>attack1.info.range.r</td><td>200</td></tr>
                                        // <tr><td>attack1.info.range.lt</td><td>-288,-172</td></tr>
                                        // <tr><td>attack1.info.range.rb</td><td>255,0</td></tr>

                                        let a:any = new Object();
                                        let lt:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.lt"]);
                                        let rb:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.rb"]);
                                        let sp:any = msMoudle.Vec2FromArr(data[this.attack_act + ".info.range.sp"]);
                                        let r:number = Number(data[this.attack_act + ".info.range.r"]);
                                        if(r && sp) {           //弹道型
                                            a.l = Number(sp.x);
                                            a.t = Number(sp.y);
                                            a.r = Number(sp.x) - r;//-0
                                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                                                a.b = Number(sp.y);
                                            else
                                                a.b = 0;//Number(sp.y);
                                        }
                                        else {
                                            a.l = Number(lt.x);
                                            a.t = Number(lt.y);
                                            a.r = Number(rb.x);//-0
                                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img")
                                                a.b = Number(rb.y);
                                            else
                                                a.b = 0;//Number(rb.y);
                                        }
                                        this.drawHitBound(a);

                                        /////这里不是选取的最近的
                                        let longDis:number = 99999999;
                                        let leavelongDis:number = 99999999;
                                        let char:any = null;
                                        let leavechar:any = null;

                                        // console.log("1111111")
                                        if(this.atkBound && this.m_armyList) {
                                            for(let i :number = 0; i < this.m_armyList.length; i++) {
                                                if(this.m_armyList[i].hitBound) {
                                                    if(this.atkBound.getBounds().intersects(this.m_armyList[i].hitBound.getBounds())) {
                                                        if(this.m_armyList[i].m_hp > 0) {
                                                            let _____:number = Math.abs(this.m_x - this.m_armyList[i].m_x);
                                                            if(_____ < longDis) {
                                                                longDis = _____;
                                                                char = this.m_armyList[i];
                                                                _canatk = true;
                                                            }
                                                        }
                                                    }
                                                }
                                                ///可以被我打的最近的目标
                                                if(this.m_armyList[i].m_hp > 0) {
                                                    let _____:number = Math.abs(this.m_x - this.m_armyList[i].m_x);
                                                    if(_____ < leavelongDis) {
                                                        leavelongDis = _____;
                                                        leavechar = this.m_armyList[i];
                                                    }
                                                }
                                            }
                                        }

                                        // if(msMoudle.isWorldBoss && msMoudle.WorldBossLv == 140) {
                                        //     _canatk = true;
                                        // }
                                        ////如果世界boss打赢了就停止
                                        if(msMoudle.isWorldBoss) {
                                            if(msMoudle.WorldBossLv == 120 || msMoudle.WorldBossLv == 140 || msMoudle.WorldBossLv == 160 ||
                                            msMoudle.WorldBossLv == 180) {
                                                // _canatk = true;
                                                if(msMoudle.boss_win) _canatk = false;
                                            }
                                        }

                                        ///如果此时范围内有人能够攻击就打
                                        if(char && _canatk && (this.m_action == "move" || this.m_action == "stand" || this.m_action == "fly") ) {
                                            //计算伤害
                                            let hit:Array<any> = [];
                                            let attackCount:number = 1;
                                            let charDef = (char.m_def + char.b_def) * (1 + char.p_def);
                                            let minatk:number = (this.m_atk * (1 + this.p_atk) - charDef) > 0 ? (this.m_atk * (1 + this.p_atk) - charDef) : 1;

                                            ///破防50%
                                            if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                                                if(ms.tamingmobbagsdata.length < 8) {
                                                    minatk = this.m_atk * (1 + this.p_atk) - charDef * 0.1;
                                                }
                                                else {
                                                    minatk = this.m_atk * (1 + this.p_atk) * 0.75 - charDef * 0.1;
                                                }
                                                minatk =  Math.floor(minatk);
                                            }

                                            let maxatk:number = minatk;

                                            if(msMoudle.guaji) {
                                                minatk = 0;
                                                maxatk = 0;
                                            }

                                            // minatk = 1;

                                            // let minatk:number = msMoudle.herodata.incPAD;
                                            // let maxatk:number = msMoudle.herodata.incPAD * 1.25;

                                            for(let i:number = 0; i < attackCount; i++) {
                                                let _tz:number = msMoudle.getRandValue(0, 0, 100);
                                                ////角色闪避
                                                if(_tz >= (this.m_target +this.p_target) - (char.m_miss + char.p_miss) ) {
                                                    hit[i] = {num : 0, bj:false};
                                                }
                                                else {
                                                    // let _bj:number = msMoudle.getRandValue(0, 0, 100);
                                                    // let _bj:number = 100;
                                                    // if(_bj < 50) {
                                                    //     hit[i] = {num : minatk, bj:true};
                                                    //     hit[i].num *= 2;
                                                    // }
                                                    // else {
                                                        hit[i] = {num : minatk, bj:false};
                                                    // }
                                                }
                                            }

                                            ///这里是重点effectAfter效果延迟,attackAfter延迟
                                            // <tr><td>attack1.info.effectAfter</td><td>0</td></tr>
                                            // <tr><td>attack1.info.attackAfter</td><td>1500</td></tr>
                                            // <tr><td>attack1.info.jumpAttack</td><td>1</td></tr>
                                            let attackAfter:number = Number(data[this.attack_act + ".info.attackAfter"]);
                                            let effectAfter:number = Number(data[this.attack_act + ".info.effectAfter"]);

                                            this.AiData.stateN = this.attack_act;
                                            this.changeByName(this.AiData.stateN, 1);
                                            this.setDir(char.m_x > this.m_x ? -1 : 1);

                                            this.m_effect_dir = this.m_dir;
                                            Laya.timer.once(effectAfter * (1 / ms.speed), this, ()=> {
                                                this.doEffAction(0);
                                                if(data[this.attack_act + ".info.ball.0"]) {
                                                    if(char) {
                                                        Laya.timer.clear(this, this.doBallAction);
                                                        this.doBallAction(0, sp.y);
                                                        if(this.TimeLine) {
                                                            this.TimeLine.pause();
                                                            this.TimeLine = null;
                                                        }
                                                        if(this.ballAni) {
                                                            this.ballSp.pos(0, 0);
                                                            this.TimeLine = new Laya.TimeLine()
                                                            this.TimeLine.addLabel("ball_1" + msMoudle.getRandValue(0, 0, 10000000), 0).to(
                                                                this.ballSp, {x: (char.m_x - this.m_x) * this.m_dir }, ( Math.abs(char.m_x - this.m_x) / 500) * 1000  * (1 / ms.speed),null, 0);
                                                            this.TimeLine.play(0, false);
                                                            this.TimeLine.once(Laya.Event.COMPLETE, this, ()=> {
                                                                this.showHit(char, hit, sp.y);
                                                                if(this.ballAni) {
                                                                    this.ballAni.visible = false;
                                                                    Laya.timer.clear(this, this.doBallAction);
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            });
                                            Laya.timer.once(attackAfter * (1 / ms.speed), this, ()=> {
                                                if(data[this.attack_act + ".info.ball.0"]) {}
                                                else {
                                                    this.showHit(char, hit, 0);
                                                }
                                            });
                                            // this.updataDistance();
                                        }
                                        else {
                                            if(this._automove) {
                                                ///如果生命不是满的就不随机(找最近的人打)
                                                if(this.m_hp != this.m_maxhp && leavechar) {
                                                    this.AiData.dirN = (leavechar.m_x > this.m_x ? -1 : 1);
                                                    this.AiData.stateN =  move_tag;
                                                    if(this.m_action != this.AiData.stateN) this.changeByName(this.AiData.stateN, 0);
                                                    if(this.m_dir != this.AiData.dirN) this.setDir(this.AiData.dirN);
                                                }
                                                else {
                                                    this.AiData.dirN = msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                                                    this.AiData.stateN = msMoudle.getRandValue(0, 0, 100) < 50 ? move_tag : "stand";
                                                    this.changeByName(this.AiData.stateN, 0);
                                                    this.setDir(this.AiData.dirN);
                                                }
                                            }
                                        }
                                    }
                                    ///新增了这里
                                    else {
                                        if(this._automove) {
                                            this.AiData.dirN = msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                                            this.AiData.stateN = msMoudle.getRandValue(0, 0, 100) < 50 ? move_tag : "stand";
                                            this.changeByName(this.AiData.stateN, 0);
                                            this.setDir(this.AiData.dirN);
                                        }
                                    }
                                // }
                                // else {
                                //     this.AiData.dirN = msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                                //     this.AiData.stateN = msMoudle.getRandValue(0, 0, 100) < 50 ? move_tag : "stand";
                                //     this.changeByName(this.AiData.stateN, 0);
                                //     this.setDir(this.AiData.dirN);
                                // }

                            }
                        }
                        else {
                            this.AiData.timeN -= 1;
                            if(this.m_action == this.attack_act) {}
                            else {
                                if(this._automove) {
                                    if(this.m_action == move_tag) {
                                        if(this.m_dir == -1) {
                                            if(msMoudle.mainT.onWall(this, this.m_dir) == false) {
                                                if(this.m_x < this.msgData.rx1)
                                                msMoudle.mainT.MobrightMove(this, 1 * ms.speed);
                                            }
                                        }
                                        else {
                                            if(msMoudle.mainT.onWall(this, this.m_dir) == false) {
                                                if(this.m_x > this.msgData.rx0)
                                                    msMoudle.mainT.MobleftMove(this, 1 * ms.speed);
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                else {
                    Laya.timer.clear(this, this.autoFight);
                }
            }
        }

        //0冰冻，1晕眩，2免疫伤害
        stun:cssBufEff;
        public showBuf(id:number, time:number) : void {
            //boss免疫
            if(this.m_isboss == false) {
                this.m_isbuff[id] = id;         //记录编号
                if(this.m_buff_time[id]) {
                    if(time > this.m_buff_time[id]) this.m_buff_time[id] = time;    //记录时间
                }
                else
                    this.m_buff_time[id] = time;
                if(id == 0) {
                    if(!this.stun) {
                        this.stun = new cssBufEff();
                        let Box = new Laya.Animation();
                        this.stun.ShowStun(this.m_effect_sp, Box, 4, "hero_stun", this.mobData[0].orgx, this.mobData[0].orgy - 60);
                    }
                }
                else if(id == 1) {
                    //定帧
                    //Laya.timer.clear(this, this.doAction);
                    // if(!this.stun) {
                    //     this.stun = new cssBufEff();
                    //     let Box = new Laya.Animation();
                    //     this.stun.ShowStun(this.m_effect_sp, Box, 4, "hero_stun", this.mobData[0].orgx, this.mobData[0].orgy - 60);
                    // }
                }
                else if(id == 2) {

                }
            }
        }

        private BufLoop() : void {
             for(let i:number = 0; i < this.m_isbuff.length; i++) {
                  if(this.m_buff_time[i] > 0) this.m_buff_time[i] -= 100;
                  else {
                      if(i == 0) {
                          this.clearBuf(i);
                      }
                  }
             }
        }

        private isOrgState() : boolean {
            for(let i:number = 0; i < this.m_isbuff.length; i++) {
                //如果是晕眩或者冰冻
                if(this.m_isbuff[i] == 0 || this.m_isbuff[i] == 1) {
                    if(this.m_buff_time[i] > 0) return true;
                }
            }
            return false;
        }

        private showHit(char:any, hit:any, bally:number) : void {
            if(char) {
                if(char.m_hp > 0) {
                    if(this.hitAni) {
                        if(char.m_state_sp) {
                            char.m_state_sp.addChild(this.hitAni);
                        }
                        this.doHitAction(0, bally);
                        if(char.m_hp > 0) {
                            char.m_hp -= hit[0].num;
                            if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                                if(!char.m_id || char.m_id == ms.user) {
                                    msMoudle.hp -= hit[0].num;
                                }
                            }
                        }
                        if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                            if(!char.m_id || char.m_id == ms.user) {
                                if(msMoudle.hp < 0) msMoudle.hp = 0;
                                msMoudle.updateHP();
                            }
                        }

                        this.showNum(char, hit);
                    }
                    //
                }
            }
        }

        showNum(char:any, hit:any) : void {
            if(char.m_id == ms.user) { //自己操作的角色，发送被怪物攻击协议
                Sync.beAttack(char, hit, ()=>{
                    console.log("##send be attack msg success")
                });
            }

            ///获取最近的
            let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
            nb.ShowNumber(this.m_parent, hit, char.m_x, char.m_y - 100, 1, 1, null, true);

            ///判断英雄们是否全灭
            if(char.m_hp <= 0) {
                char.m_hp = 0;
                if(char._mainhero == false) {
                    char.stopAutoFight();
                }
                //主角死亡把召唤兽移除
                else {
                    if(msMoudle.mapP.summonList.length > 0) {
                        for(let i:number = 0; i < msMoudle.mapP.summonList.length; i++) {
                            if(msMoudle.mapP.summonList[i]) {
                                msMoudle.mapP.summonList[i].clearUp();
                                msMoudle.mapP.summonList[i] = null;
                            }
                        }
                        msMoudle.mapP.summonList = [];
                    }
                }
                ///如果全灭
                let alldead:boolean = true;
                if(this.m_armyList) {
                    for(let i :number = 0; i < this.m_armyList.length; i++) {
                        if(this.m_armyList[i].m_hp > 0) {
                            alldead = false;
                            break;
                        }
                    }
                    if(alldead) {
                        if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                            ///手动地图死了
                        }
                        else {
                            ui.show(app.battle.BattleEndDlg);
                        }
                    }
                }
            }

            if(char.hpBar) {
                char.hpBar.value = Number(char.m_hp / char.m_maxhp);
                if(hit[0].num > 0) {
                    if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id) == false) {
                        if(char.m_nametag_sp) char.m_nametag_sp.addChild(char.hpBar);
                    }
                }
            }

            if(char.m_hp <= 0) {
                char.m_sp.visible = false;
                char.m_nametag_sp.visible = false;
                char.m_state_sp.visible = false;
                char.m_isdead = true;
                ///清除buff
                // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updataHead();
                if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                    if(char.m_id == ms.user) { //自己操作的角色
                        ///手动地图死了
                        let a = true;
                        if(msMoudle.isScreen()) {
                            if(msMoudle.mainT) {
                                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                                    msMoudle.mainT.cz_sp.visible = false;
                                }
                            }
                        }
                        //经验请0
                        let texp = Math.min(msMoudle.getLvExp(ms.herodata.Lv) * 0.1, ms.herodata.Exp);
                        ms.herodata.Exp -= texp;
                        // msMoudle.gameP.exp.width = 0;
                        ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updExp(0);
                        ui.show(app.battle.BattleEndDlg);
                    }
                    else {
                    }
                }
            }

        }

        //
        public new_txt(str:string, x:number, y:number, index:number) : any {
            let txt:Laya.Label = new Laya.Label();
            txt.text = str;
            txt.fontSize = 14;
            txt.pos(x, y);
            txt.color = "#11dd22";
            txt.stroke = 3;
            txt.zOrder = 99999999;
            // txt.on("click", this, this.onClick, [index]);
            this.m_sp.addChild(txt);
        }
    }
}