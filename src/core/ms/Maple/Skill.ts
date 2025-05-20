module SkillRole {
    export class Skill extends Laya.Sprite {
        public m_parent:any;
        public m_hero:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 0;
        public m_head_x:number = 0;
        public m_head_y:number = 0;
        private m_sp:Laya.Sprite;
        private m_dursp:Laya.Sprite;///可能换成tile更合适
        public m_nodir_sp:Laya.Sprite;
        private m_id:string = "1311001";

        private skillAni:Array<any> = [];
        private skilldata:Array<any> = [];
        private specialAni:Laya.Image;
        private specialdata:Array<any> = [];
        private screenAni:Laya.Image;
        private screendata:Array<any> = [];
        private keydownAni:Laya.Image;
        private keydowndata:Array<any> = [];

        public specialAni2:Array<any> = [];         //更复杂的special
        public specialMoveX:Array<any> = [];
        public specialMoveY:Array<any> = [];
        public specialMoveA:Array<any> = [];
        private specialdata2:Array<any> = [];
        private tileAni:Array<any> = [];
        private tiledata:Array<any> = [];
        private stateAni:Array<any> = [];
        private statedata:Array<any> = [];
        public hitAni:Array<any> = [];
        public hitdata:Array<any> = [];
        // //特殊的hit
        public hitAni2:Array<any> = [];
        public hitdata2:Array<any> = [];

        private m_atkspeed:number = 1;  //基础攻击速度

        public m_data:any;

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.doSpecialAction);
            Laya.timer.clear(this, this.doSpecialAction2);
            Laya.timer.clear(this, this.doStateAction);
            Laya.timer.clear(this, this.doScreenAction);
            Laya.timer.clear(this, this.doKeyDownAction);

            Laya.timer.clear(this, this.doHitAction);
            Laya.timer.clear(this, this.doHitAction2);
            Laya.timer.clear(this, this.startDur);
            Laya.timer.clear(this, this.loopDur);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            // if(this.m_nodir_sp) {
            //     this.m_nodir_sp.removeSelf();
            //     this.m_nodir_sp.destroy(true);
            //     this.m_nodir_sp = null;
            // }
            for(let i:number = 0; i < this.skilldata.length; i++) {
                if(this.skillAni[i]) {
                    this.skillAni[i].removeSelf();
                    this.skillAni[i].destroy(true);
                    this.skillAni[i] = null;
                }
            }
            for(let i:number = 0; i < this.specialdata.length; i++) {
                if(this.specialAni[i]) {
                    this.specialAni[i].removeSelf();
                    this.specialAni[i].destroy(true);
                    this.specialAni[i] = null;
                }
            }
            if(this.screenAni) {
                this.screenAni.removeSelf();
                this.screenAni.destroy(true);
                this.screenAni = null;
            }
            if(this.keydownAni) {
                this.keydownAni.removeSelf();
                this.keydownAni.destroy(true);
                this.keydownAni = null;
            }
            for(let i:number = 0; i < this.statedata.length; i++) {
                if(this.stateAni[i]) {
                    this.stateAni[i].removeSelf();
                    this.stateAni[i].destroy(true);
                    this.stateAni[i] = null;
                }
            }
            //可能可以打多个hitAni和其他不同
            for(let i:number = 0; i < this.hitAni.length; i++) {
                if(this.hitAni[i]) {
                    this.hitAni[i].removeSelf();
                    this.hitAni[i].destroy(true);
                    this.hitAni[i] = null;
                }
            }
            for(let i:number = 0; i < this.hitAni2.length; i++) {
                if(this.hitAni2[i]) {
                    this.hitAni2[i].removeSelf();
                    this.hitAni2[i].destroy(true);
                    this.hitAni2[i] = null;
                }
            }
            for(let i:number = 0; i < this.specialAni2.length; i++) {
                if(this.specialAni2[i]) {
                    this.specialAni2[i].removeSelf();
                    this.specialAni2[i].destroy(true);
                    this.specialAni2[i] = null;
                }
            }
            for(let i:number = 0; i < this.tileAni.length; i++) {
                if(this.tileAni[i]) {
                    this.tileAni[i].removeSelf();
                    this.tileAni[i].destroy(true);
                    this.tileAni[i] = null;
                }
            }

            if(this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel = null;
            }

            this.skilldata = [];
            this.specialdata = [];
            this.specialdata2 = [];
            this.tiledata = [];
            this.statedata = [];
            this.hitdata = [];
            this.hitAni = [];

            this.hitdata2 = [];
            this.hitAni2 = [];

            this.skillAni = [];
            this.stateAni = [];

            if(this.specialAni)
                this.specialAni.skin = "";
        }

        private isLoopSkill() {
            return (this.m_id == "3321040" || this.m_id == "65121003" || this.m_id == "3221001" || this.m_id == "13121001");
        }

        soundid:string = "";
        soundChannel: Laya.SoundChannel;
        public changeAll(H:any, P:any, id:string, x:number, y:number, data:any, dir:number) : void {
            this.m_hero = H;
            this.m_atkspeed = 1;
            if(this.m_hero) this.m_atkspeed = this.m_hero.m_atkspeed + this.m_hero.p_atkspeed + (ms.speed - 1) / 1;
            this.m_parent = P;
            this.m_data = data;
            this.m_id = id;

            if(this.m_parent && this.m_hero) {
                this.m_parent.pos(this.m_hero.m_x, this.m_hero.m_y);
                this.m_parent.scaleX = msMoudle.mapleSize * this.m_hero.m_dir;
                this.m_parent.scaleY = msMoudle.mapleSize;
                this.loadActs(data);
            }
            else {
                this.m_x = x;
                this.m_y = y;
                this.m_dir = dir;
                this.loadActs(data);
                this.setPos(x, y);
                if(this.m_hero) {
                    this.setPos(this.m_hero.m_x, this.m_hero.m_y);
                }
                this.setDir(dir);
            }


            // this.setPos(x, y);
            // this.setDir(dir);

            if(this.m_hero) {
                if(msMoudle.wz["SSkill.img"] && msMoudle.wz["SSkill.img"][id]) {
                    if(this.isLoopSkill() && (!this.m_hero.m_id || this.m_hero.m_id == ms.user)) {
                        let s_: any;
                        if(this.m_id == "3221001") s_ = msMoudle.wz["SSkill.img"][id][id + ".Use"];
                        else s_ = msMoudle.wz["SSkill.img"][id][id + ".Loop"];
                        if(s_ && s_.indexOf("../") >= 0) {
                            let ss_ = s_.split("/");
                            this.soundid = ss_[1] + "." + ss_[2];
                        }
                        else {
                            this.soundid = id + (this.m_id == "3221001" ? ".Use" : ".Loop");
                        }
                        // console.log("##start play")
                        if(this.soundid != "") {
                            this.soundChannel = msMoudle.playSound("res/Sound/Skill.img/" + this.soundid, -1);
                        }
                    }
                    else {
                        let s_ = msMoudle.wz["SSkill.img"][id][id + ".Use"];
                        if(s_ && s_.indexOf("../") >= 0) {
                            let ss_ = s_.split("/");
                            this.soundid = ss_[1];
                        }
                        else {
                            this.soundid = id;
                        }
                        if(this.soundid != "") msMoudle.playSound("res/Sound/Skill.img/" + this.soundid + ".Use")
                    }
                }
                // if(this.soundid != "") msMoudle.playSound("res/Sound/Skill.img/" + this.soundid + ".Use")
            }
        }

        private loadActs(data:any) : void {
            Laya.timer.clear(this, this.doStateAction);

            if(!data || !this.m_parent) return ;

            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 10000;
            this.m_parent.addChild(this.m_sp);

            if(msMoudle.mapP) {
                this.m_dursp = new Laya.Sprite();
                this.m_dursp.zOrder = 10000;
                if(this.m_hero) this.m_dursp.scaleX = this.m_hero.m_dir;
                if(this.m_hero) this.m_dursp.pos(this.m_hero.m_x, this.m_hero.m_y);
                if(msMoudle.mapP && msMoudle.mapP.m_sp) msMoudle.mapP.m_sp.addChild(this.m_dursp);
            }

            ////这个好像没有清理掉
            this.m_nodir_sp = new Laya.Sprite();
            this.m_nodir_sp.zOrder = 10000;
            if(this.m_hero) {
                this.m_hero.m_state_sp.addChild(this.m_nodir_sp);
            }
            // this.m_parent.addChild(this.m_nodir_sp);



            //effect
            let skillindex:number = 0;
            if(data["skill." + this.m_id + ".effect.0"]) {          //effect.x
                this.loadAddEfftct(skillindex, "effect", data);
                skillindex = skillindex + 1;
            }

            let effectindex:number = 0;
            while(true) {
                if(data["skill." + this.m_id + ".effect" + effectindex + ".0"]) {   //effectx.y
                    this.loadEffect(skillindex, "effect" + effectindex, data);
                    effectindex = effectindex + 1;
                    skillindex = skillindex + 1;
                }
                else break;
            }
            effectindex = 0;
            while(true) {
                if(data["skill." + this.m_id + ".effect." + effectindex + ".0"]) {  //effect.x.y
                    this.loadEffect(skillindex, "effect." + effectindex, data);
                    effectindex = effectindex + 1;
                    skillindex = skillindex + 1;
                }
                else break;
            }
            //special
            effectindex = 0;
            this.specialdata = new Array();
            this.specialAni = new Laya.Image;
            this.m_nodir_sp.addChild(this.specialAni);
            while(true) {
                let root:string = "skill." + this.m_id + ".special." + effectindex;
                if(data[root]) {
                    this.loadSpecial(effectindex, data, root);
                    effectindex = effectindex + 1;
                }
                else break;
            }
            //
            effectindex = 0;
            this.screendata = new Array();
            this.screenAni = new Laya.Image;
            Laya.stage.addChild(this.screenAni);
            while(true) {
                let root:string = "skill." + this.m_id + ".screen." + effectindex;
                if(data[root]) {
                    this.loadScreen(effectindex, data, root);
                    effectindex = effectindex + 1;
                }
                else break;
            }
            //
            effectindex = 0;
            this.keydowndata = new Array();
            this.keydownAni = new Laya.Image;
            this.m_sp.addChild(this.keydownAni);
            while(true) {
                let root:string = "skill." + this.m_id + ".keydown." + effectindex;
                if(data[root]) {
                    this.loadKeyDown(effectindex, data, root);
                    effectindex = effectindex + 1;
                }
                else break;
            }
            // console.log(this.screendata)
            //state(斗气集中)
            effectindex = 0;
            while(true) {
                let root:string = "skill." + this.m_id + ".state." + effectindex;
                if(data[root]) {
                    this.loadState(effectindex, data, root);
                    effectindex = effectindex + 1;
                }
                else break;
            }
            //hit
            effectindex = 0;
            this.hitAni = new Array();
            for(let i:number = 0; i < 20; i++) this.hitAni[i] = new Laya.Image();
            this.hitdata = new Array();
            for(let i:number = 0; i < 1; i++) this.hitdata[i] = new Array();
            while(true) {
                let root:string = "skill." + this.m_id + ".hit.0." + effectindex;
                if(data[root]) {
                    this.loadHit(effectindex, data, root);
                    effectindex = effectindex + 1;
                }
                else break;
            }

            // ///特殊的hit
            this.hitAni2 = new Array();
            this.hitdata2 = new Array();
            for(let hitIndex = 1; hitIndex <= 5; hitIndex++) {
                effectindex = 0;
                this.hitAni2[hitIndex -1] = new Laya.Image();
                this.hitdata2[hitIndex - 1] = new Array();
                while(true) {
                    let root:string = "skill." + this.m_id + ".hit." + hitIndex + "." + effectindex;
                    if(data[root]) {
                        this.loadHit2(effectindex, data, root, hitIndex-1);
                        effectindex = effectindex + 1;
                    }
                    else break;
                }
            }
            // console.log(this.hitdata2)

            let x = data["skill." + this.m_id + ".special.x"];//???
            let y = data["skill." + this.m_id + ".special.y"];
            let fall = data["skill." + this.m_id + ".special.fall"];//掉落
            let start = data["skill." + this.m_id + ".special.start"];//开始时间
            let interval = data["skill." + this.m_id + ".special.interval"];//帧间距
            let count = data["skill." + this.m_id + ".special.count"];//数量
            let duration = data["skill." + this.m_id + ".special.duration"];//地上的tile延续时间
            let time = data["skill." + this.m_id + ".level.30.time"];//毒物时间

            this.special_x = x ? Number(x) : 0;
            this.special_y = y ? Number(y) : 0;
            this.special_fall = fall ? Number(fall) : 0;
            this.special_start = start ? Number(start) : 0;
            this.special_interval = interval ? Number(interval) : 0;
            this.special_count = count ? Number(count) : 0;
            this.special_duration = duration ? Number(duration) : 0;
            if(this.m_id == "2111003" || this.m_id == "4221006")
                this.tile_time = time ? Number(time) : 0;

            //special2
            this.specialAni2 = new Array();
            this.specialdata2 = new Array();
            for(let i:number = 0; i < 3; i++) {
                if(data["skill." + this.m_id + ".special." + i + ".0"]) {
                    effectindex = 0;
                    this.specialdata2[i] = new Array();
                    while(true) {
                        let root:string = "skill." + this.m_id + ".special." + i + "." + effectindex;
                        if(data[root]) {
                            this.loadSpecial2(effectindex, data, root, i);
                            effectindex = effectindex + 1;
                        }
                        else break;
                    }
                }
                else break;
            }
            //title
            this.tileAni = new Array();

            this.tiledata = new Array();
            for(let i:number = 0; i < 20; i++) {
                if(data["skill." + this.m_id + ".tile." + i + ".0"]) {
                    this.tiledata[i] = new Array();
                    effectindex = 0;
                    while(true) {
                        let root:string = "skill." + this.m_id + ".tile." + i + "." + effectindex;
                        if(data[root]) {
                            this.loadTile(effectindex, data, root, i);
                            effectindex = effectindex + 1;
                        }
                        else break;
                    }
                }
                else break;
            }

            //mob   1311007     (buf效果)
            //affect            (队友身上的效果)

            ////这里的预加载好像没什么作用
            //资源加载
            let res:Array<any> = [];
            for(let i:number = 0; i < skillindex; i++) {
                for(let frameIndex:number = 0; frameIndex < this.skilldata[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.skilldata[i][frameIndex].tex))
                        res.push({ url: this.skilldata[i][frameIndex].tex });
                }
            }
            for(let i:number = 0; i < this.specialdata.length; i++) {
                if(!Laya.loader.getRes(this.specialdata[i].tex))
                    res.push({ url: this.specialdata[i].tex });
            }
            for(let i:number = 0; i < this.screendata.length; i++) {
                if(this.screendata[i]) {
                    if(!Laya.loader.getRes(this.screendata[i].tex))
                        res.push({ url: this.screendata[i].tex });
                }
            }
            for(let i:number = 0; i < this.keydowndata.length; i++) {
                if(this.keydowndata[i]) {
                    if(!Laya.loader.getRes(this.keydowndata[i].tex))
                        res.push({ url: this.keydowndata[i].tex });
                }
            }
            for(let i:number = 0; i < this.specialdata2.length; i++) {
                for(let frameIndex:number = 0; frameIndex < this.specialdata2[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.specialdata2[i][frameIndex].tex))
                        res.push({ url: this.specialdata2[i][frameIndex].tex });
                }
            }
            for(let i:number = 0; i < this.tiledata.length; i++) {
                for(let frameIndex:number = 0; frameIndex < this.tiledata[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.tiledata[i][frameIndex].tex))
                        res.push({ url: this.tiledata[i][frameIndex].tex });
                }
            }
            for(let i:number = 0; i < this.statedata.length; i++) {
                for(let frameIndex:number = 0; frameIndex < this.statedata[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.statedata[i][frameIndex].tex))
                        res.push({ url: this.statedata[i][frameIndex].tex });
                }
            }
            for(let i:number = 0; i < this.hitdata.length; i++) {
                for(let frameIndex:number = 0; frameIndex < this.hitdata[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.hitdata[i][frameIndex].tex))
                        res.push({ url: this.hitdata[i][frameIndex].tex });
                }
            }
            for(let i:number = 0; i < this.hitdata2.length; i++) {
                for(let frameIndex:number = 0; frameIndex < this.hitdata2[i].length; frameIndex++) {
                    if(!Laya.loader.getRes(this.hitdata2[i][frameIndex].tex))
                        res.push({ url: this.hitdata2[i][frameIndex].tex });
                }
            }
            let lt:any = msMoudle.Vec2FromArr(data["skill." + this.m_id + ".level.30.lt"]);
            let rb:any = msMoudle.Vec2FromArr(data["skill." + this.m_id + ".level.30.rb"]);
            this.lt = lt;
            this.rb = rb;
            this.rangeW = Math.abs(Number(lt.x) - Number(rb.x));
            this.rangeH = Math.abs(Number(lt.y) - Number(rb.y));
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);

                    for(let i:number = 0; i < skillindex; i++) this.doAction(0, i);
                    this.doScreenAction(0);
                    this.doKeyDownAction(0);
                    if(this.m_id == "41121002") {
                        if(msMoudle.mainT)
                            //if(this.m_hero.m_id == ms.user)
                            msMoudle.mainT.fastMove(660, true, this.m_hero);
                    }
                    if(this.special_duration) {
                        Laya.timer.once(this.special_start, this, this.startDur);
                    }
                    this.showTile();
                });
            }
            else {
                for(let i:number = 0; i < skillindex; i++) this.doAction(0, i);
                this.doScreenAction(0);
                this.doKeyDownAction(0);
                if(this.m_id == "41121002") {
                    if(msMoudle.mainT)
                        //if(this.m_hero.m_id == ms.user)
                        msMoudle.mainT.fastMove(660, true, this.m_hero);
                }
                if(this.special_duration) {
                    Laya.timer.once(this.special_start, this, this.startDur);
                }
                this.showTile();
            }

        }

        public clearSkill() : void {
            for(let i:number = 0; i < this.m_loadRes.length; i++) {
                if(Laya.loader.getRes(this.m_loadRes[i])) {
                    Laya.loader.clearRes(this.m_loadRes[i]);
                }
            }
        }

        showTile() : void {
            //火焰箭
            if(this.special_count) {
                // console.log(this.special_count)
                // console.log(this.tiledata)
                for(let i:number = 0; i < this.special_count; i++) {
                    let rnk = msMoudle.getRandValue(0, 0, this.specialdata2.length);
                    if(!this.tileAni[i]) {
                        this.tileAni[i] = new Laya.Image();
                        this.tileAni[i].zOrder = 999999;
                        this.m_dursp.addChild(this.tileAni[i]);
                    }

                    this.doTileAction(i, rnk, 0, 0, 0);
                }
            }
            else {
                //毒雾术的关键在这里，支持多技能，并且tile有自己的生命
                if(this.tile_time > 0) {
                    if(msMoudle.mapP) {
                        if(msMoudle.mapP.m_tile) {
                            msMoudle.mapP.m_tile.addTileSkill(this.tiledata, this.tile_time, this.rangeW, this.rangeH, this.m_hero);
                        }
                    }
                }
                //圣光等
                else {
                    if(!this.m_hero) return;
                    let effectDistance = 180;
                    if(msMoudle.mainP && msMoudle.mainP.m_foothld && msMoudle.mainP.m_foothld.line) {
                        let footLines = msMoudle.mainP.m_foothld.line;
                        let startX = this.lt.x + this.m_hero.m_x;
                        if(this.m_hero.m_dir == -1) {
                            startX = -this.rb.x + this.m_hero.m_x;
                        }
                        let yMax = this.rb.y + this.m_hero.m_y;
                        let yMin = this.lt.y + this.m_hero.m_y;
                        let cnt = Math.ceil((this.rb.x - this.lt.x) / 180);
                        for(let i=0; i<cnt; ++i) {
                            let lineY = this.findFootholdYByX(startX, yMin, yMax, footLines);
                            if(lineY != -999999) {
                                let rnk = msMoudle.getRandValue(0, 0, this.tiledata.length);
                                let rnkX = (startX - this.m_hero.m_x) * this.m_hero.m_dir;
                                let rnkY = lineY - this.m_hero.m_y;
                                if(!this.tileAni[i]) {
                                    this.tileAni[i] = new Laya.Image();
                                    this.tileAni[i].zOrder = 999999;
                                    this.m_dursp.addChild(this.tileAni[i]);
                                }
                                // console.log("##", i, rnkX, rnkY)
                                this.doTileAction(i, rnk, 0, rnkX, rnkY);
                            }
                            startX += effectDistance;
                        }
                    }
                    else {
                        for(let i:number = 0; i < this.tiledata.length; i++) {  ///这里应该是攻击的人数
                            let rnk = msMoudle.getRandValue(0, 0, this.tiledata.length);
                            let rnkX = -this.rangeW / 2 + (this.rangeW / this.tiledata.length) * i;
                            let rnkY = 0;//msMoudle.getRandValue(0, 0, this.special_y / 2);
                            if(!this.tileAni[i]) {
                                this.tileAni[i] = new Laya.Image();
                                this.tileAni[i].zOrder = 999999;
                                this.m_dursp.addChild(this.tileAni[i]);
                            }
                            this.doTileAction(i, rnk, 0, rnkX, rnkY);
                        }
                    }
                }
            }
        }

        private findFootholdYByX(x: number, yMin: number, yMax: number, footLines: any[]) {
            let idxs: number[] = [];
            for(let i=0; i<footLines.length; ++i) {
                let line = footLines[i];
                if(line.x1 < x && line.x2 > x) {
                    let y = line.k * x + line.b;
                    if(y > yMin && y < yMax) {
                        idxs.push(y);
                    }
                }
            }
            if(idxs.length == 0) return -999999;
            return idxs[Math.floor(Math.random() * idxs.length)];
        }

        rangeW:number = 0;
        rangeH:number = 0;
        lt: any;
        rb: any;
        startDur() : void {
            this.addSpecial2();
            Laya.timer.once(this.special_interval, this, this.loopDur, [0, 0]);
        }

        addSpecial2() : void {
            ///这个数量应该要和宽、高、fall换算成数量
            let count = msMoudle.getRandValue(1, 0, this.special_count);
            for(let _:number = 0; _ < count; _++) {
                let i:number = this.specialAni2.length;
                if(!this.specialAni2[i]) {
                    this.specialAni2[i] = new Laya.Image();
                    this.specialAni2[i].zOrder = 999999;
                    this.m_dursp.addChild(this.specialAni2[i]);
                    this.specialMoveX[i] = 0;
                    this.specialMoveY[i] = 0;
                    this.specialMoveA[i] = 0.9;
                }
                let rnk = msMoudle.getRandValue(0, 0, this.specialdata2.length);
                if(this.specialdata2.length == 1) {
                    rnk = 0;
                    let rnkX = msMoudle.getRandValue(-this.rangeW / 2, 0, this.rangeW);
                    let rnkY = msMoudle.getRandValue(0, 0, Math.abs(this.special_y) / 2);
                    if(this.special_y < 0) rnkY = -rnkY + Math.abs(this.special_y) / 2;
                    this.doSpecialAction2(i, rnk, 0, rnkX, rnkY);
                }
                else {
                    let rnkX = msMoudle.getRandValue(0, 0, this.rangeW);
                    let rnkY = this.special_y / 2;
                    this.doSpecialAction2(i, rnk, 0, rnkX, rnkY);
                }
            }
        }

        loopDur(time:number, next:number) : void {
            if(time < this.special_duration) {
                // if(next < 4) {
                    this.addSpecial2();
                // }
                if(this.special_fall < 300) this.special_fall = 300;
                let failtime = this.special_fall / 50;
                for(let i:number = 0; i < this.specialAni2.length; i++) {
                    this.specialMoveX[i] -= this.special_x / failtime;
                    this.specialMoveY[i] += this.special_y / failtime;
                    this.specialMoveA[i] -= 0.1;
                    //透明度这里是没问题的
                    if(50 * next >= this.special_fall) this.specialMoveA[i] = 0;
                }
                Laya.timer.once(this.special_interval, this, this.loopDur, [time + this.special_interval, next + 1]);
            }
            else {
                Laya.timer.clear(this, this.doSpecialAction2);
                this.clearUp();
                Laya.timer.clear(this, this.loopDur);
            }
        }

        // this.special_x = Number(x);
            // this.special_y = Number(y);
            // this.special_fall = Number(fall);
            // this.special_start = Number(start);
            // this.special_interval = Number(interval);
            // this.special_count = Number(count);
            // this.special_duration = Number(duration);

            // <tr><td>skill.3111003.special.0.0.origin</td><td>42,48</td></tr>
            // <tr><td>skill.3111003.special.x</td><td>105</td></tr>
            // <tr><td>skill.3111003.special.y</td><td>130</td></tr>
            // <tr><td>skill.3111003.special.fall</td><td>400</td></tr>
            // <tr><td>skill.3111003.special.start</td><td>150</td></tr>
            // <tr><td>skill.3111003.special.interval</td><td>90</td></tr>
            // <tr><td>skill.3111003.special.count</td><td>5</td></tr>
            // <tr><td>skill.3111003.special.duration</td><td>500</td></tr>

            // <tr><td>skill.3111004.special.0.0.origin</td><td>21,48</td></tr>
            // <tr><td>skill.3111004.special.x</td><td>85</td></tr>
            // <tr><td>skill.3111004.special.y</td><td>230</td></tr>
            // <tr><td>skill.3111004.special.fall</td><td>150</td></tr>
            // <tr><td>skill.3111004.special.start</td><td>0</td></tr>
            // <tr><td>skill.3111004.special.interval</td><td>90</td></tr>
            // <tr><td>skill.3111004.special.count</td><td>8</td></tr>
            // <tr><td>skill.3111004.special.duration</td><td>500</t

        public m_loadRes:Array<any> = [];
        private loadEffect(effindex:number, effname:string, data:any) : void {
            this.skilldata[effindex] = new Array();
            this.skillAni[effindex] = new Laya.Image;
            this.m_sp.addChild(this.skillAni[effindex]);

            let frameindex:number = 0;
            while(true) {
                let root:string = "skill." + this.m_id + "." + effname + "." + frameindex;
                if(data[root]) {
                    this.linkEffect(effindex, frameindex, data, root, this.m_id);
                    frameindex = frameindex + 1;
                }
                else break;
            }
        }

        private loadAddEfftct(effindex:number, effname:string, data:any) : void {
            this.skilldata[effindex] = new Array();
            this.skillAni[effindex] = new Laya.Image;
            this.m_sp.addChild(this.skillAni[effindex]);

            let frameindex:number = 0;
            while(true) {
                let root:string = "skill." + this.m_id + "." + effname + "." + frameindex;
                if(data[root]) {
                    this.linkEffect(effindex, frameindex, data, root, this.m_id);
                    frameindex = frameindex + 1;
                }
                else break;
            }

            //追加攻击
            let addAttack = data["skill." + this.m_id + ".addAttack.skill"];
            if(addAttack) {
                let sdata = msMoudle.wz[Math.floor(Number(addAttack) / 10000) + ".img"];
                if(sdata) {
                    let sframe:number = 0;
                    data = sdata["skill." + addAttack];
                    if(data) {
                        while(true) {
                            let root:string = "skill." + addAttack + "." + effname + "." + sframe;
                            if(data[root]) {
                                this.linkEffect(effindex, frameindex, data, root, addAttack);
                                frameindex = frameindex + 1;
                                sframe = sframe + 1;
                            }
                            else break;
                        }
                    }
                }
            }
            // 164121003.additional_process.0</td><td>22</td></tr>
            // <tr><td>skill.164121003.addAttack.skill</td><td>164121004</td></tr>
            // <tr><td>skill.164121003.addAttack.type</td><td>1</td></tr>
            // <tr><td>skill.164121003.addAttack.isAuto</td><td>1</td></tr>
            // <tr><td>skill.164121003.
        }

        private loadSpecial(frameindex:number, data:any, root:string) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    let z0 = data[root + ".z0"];
                    let z1 = data[root + ".z1"];
                    this.specialdata[frameindex] = new Object();
                    this.specialdata[frameindex].delay = delay ? Number(delay) : 90;
                    this.specialdata[frameindex].a0 = a0 ? Number(a0) : 0;
                    this.specialdata[frameindex].a1 = a1 ? Number(a1) : 255;
                    this.specialdata[frameindex].z0 = z0 ? Number(z0) : 100;
                    this.specialdata[frameindex].z1 = z1 ? Number(z1) : 100;
                    this.specialdata[frameindex].tex = strMarker;
                    this.specialdata[frameindex].orgx = -Number(oringinInfo.x);
                    this.specialdata[frameindex].orgy = -Number(oringinInfo.y);
                }
            }
        }

        private loadScreen(frameindex:number, data:any, root:string) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                if(data) {
                    let str = data[root];
                    if(str) {
                        if(Number(str) >= 0 && Number(str) <= 100) {
                            let m = root.split(".");
                            let _m = "";
                            for(let i:number = 0; i < m.length - 1; i++) {
                                _m += m[i];
                                _m += ".";
                            }
                            _m += str;
                            root = _m;
                        }
                    }
                }
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    let z0 = data[root + ".z0"];
                    let z1 = data[root + ".z1"];
                    this.screendata[frameindex] = new Object();
                    this.screendata[frameindex].delay = delay ? Number(delay) : 90;
                    this.screendata[frameindex].a0 = a0 ? Number(a0) : 0;
                    this.screendata[frameindex].a1 = a1 ? Number(a1) : 255;
                    this.screendata[frameindex].z0 = z0 ? Number(z0) : 100;
                    this.screendata[frameindex].z1 = z1 ? Number(z1) : 100;
                    this.screendata[frameindex].tex = strMarker;
                    this.screendata[frameindex].orgx = -Number(oringinInfo.x);
                    this.screendata[frameindex].orgy = -Number(oringinInfo.y);
                }
            }
        }

        private loadKeyDown(frameindex:number, data:any, root:string) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                if(data) {
                    let str = data[root];
                    if(str) {
                        if(Number(str) >= 0 && Number(str) <= 100) {
                            let m = root.split(".");
                            let _m = "";
                            for(let i:number = 0; i < m.length - 1; i++) {
                                _m += m[i];
                                _m += ".";
                            }
                            _m += str;
                            root = _m;
                        }
                    }
                }
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    let z0 = data[root + ".z0"];
                    let z1 = data[root + ".z1"];
                    this.keydowndata[frameindex] = new Object();
                    this.keydowndata[frameindex].delay = delay ? Number(delay) : 90;
                    this.keydowndata[frameindex].a0 = a0 ? Number(a0) : 0;
                    this.keydowndata[frameindex].a1 = a1 ? Number(a1) : 255;
                    this.keydowndata[frameindex].z0 = z0 ? Number(z0) : 100;
                    this.keydowndata[frameindex].z1 = z1 ? Number(z1) : 100;
                    this.keydowndata[frameindex].tex = strMarker;
                    this.keydowndata[frameindex].orgx = -Number(oringinInfo.x);
                    this.keydowndata[frameindex].orgy = -Number(oringinInfo.y);
                }
            }
        }

        private loadState(index:number, data:any, root:string) : void {
            this.statedata[index] = new Array();
            this.stateAni[index] = new Laya.Image();
            this.m_nodir_sp.addChild(this.stateAni[index]);

            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    let z0 = data[root + ".z0"];
                    let z1 = data[root + ".z1"];

                    this.statedata[index][0] = new Object();
                    this.statedata[index][0].delay = delay ? Number(delay) : 90;
                    this.statedata[index][0].a0 = a0 ? Number(a0) : 0;
                    this.statedata[index][0].a1 = a1 ? Number(a1) : 255;
                    this.statedata[index][0].z0 = z0 ? Number(z0) : 100;
                    this.statedata[index][0].z1 = z1 ? Number(z1) : 100;
                    this.statedata[index][0].tex = strMarker;
                    this.statedata[index][0].orgx = -Number(oringinInfo.x);
                    this.statedata[index][0].orgy = -Number(oringinInfo.y);
                    this.statedata[index][0].ang = 0 + 72 * (index - 1);
                }
            }
        }

        private loadHit(index:number, data:any, root:string) : void {

            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    for(let i:number = 0; i < 1; i++) {
                        this.hitdata[i][index] = new Object();
                        this.hitdata[i][index].delay = delay ? Number(delay) : 90;
                        this.hitdata[i][index].tex = strMarker;
                        this.hitdata[i][index].orgx = -Number(oringinInfo.x);
                        this.hitdata[i][index].orgy = -Number(oringinInfo.y);
                        this.hitdata[i][index].pos = 0;
                        //skill.2301002.hit.0.pos
                        if(data["skill." + this.m_id + ".hit.0.pos"]) {
                            // console.log(data["skill." + this.m_id + ".hit.0.pos"])
                            this.hitdata[i][index].pos = data["skill." + this.m_id + ".hit.0.pos"];
                        }
                    }
                }
            }
        }

        private loadHit2(index:number, data:any, root:string, hitIndex:number) : void {

            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;

                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    // for(let i:number = 0; i < 1; i++) {
                        this.hitdata2[hitIndex][index] = new Object();
                        this.hitdata2[hitIndex][index].delay = delay ? Number(delay) : 90;
                        this.hitdata2[hitIndex][index].tex = strMarker;
                        this.hitdata2[hitIndex][index].orgx = -Number(oringinInfo.x);
                        this.hitdata2[hitIndex][index].orgy = -Number(oringinInfo.y);
                        this.hitdata2[hitIndex][index].pos = 0;
                        //skill.2301002.hit.0.pos
                        // if(data["skill." + this.m_id + ".hit.0.pos"]) {
                        //     // console.log(data["skill." + this.m_id + ".hit.0.pos"])
                        //     this.hitdata[i][index].pos = data["skill." + this.m_id + ".hit.0.pos"];
                        // }
                    // }
                }
            }
        }

        special_x:number = -9999;
        special_y:number = -9999;
        special_fall:number;
        special_start:number;
        special_interval:number;
        special_count:number = 0;
        special_duration:number = 0;
        tile_time:number = 0;
        private loadSpecial2(frameindex:number, data:any, root:string, i:number) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];

                    // let a0 = data[root + ".a0"];
                    // let a1 = data[root + ".a1"];
                    // let z0 = data[root + ".z0"];
                    // let z1 = data[root + ".z1"];
                    // for(let i:number = 0; i < 1; i++) {
                        this.specialdata2[i][frameindex] = new Object();
                        this.specialdata2[i][frameindex].delay = delay ? Number(delay) : 90;
                        // this.specialdata2[i][frameindex].a0 = a0 ? Number(a0) : 0;
                        // this.specialdata2[i][frameindex].a1 = a1 ? Number(a1) : 255;
                        // this.specialdata2[i][frameindex].z0 = z0 ? Number(z0) : 100;
                        // this.specialdata2[i][frameindex].z1 = z1 ? Number(z1) : 100;
                        this.specialdata2[i][frameindex].tex = strMarker;
                        this.specialdata2[i][frameindex].orgx = -Number(oringinInfo.x);
                        this.specialdata2[i][frameindex].orgy = -Number(oringinInfo.y);
                        // console.log(strMarker)
                    // }
                }
            }
        }

        private loadTile(frameindex:number, data:any, root:string, i:number) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker = "res/Skill/" + Math.floor( Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];

                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    // let z0 = data[root + ".z0"];
                    // let z1 = data[root + ".z1"];
                    // for(let i:number = 0; i < 1; i++) {
                    this.tiledata[i][frameindex] = new Object();
                    this.tiledata[i][frameindex].delay = delay ? Number(delay) : 90;
                    if(a0) this.tiledata[i][frameindex].a0 = a0 ? Number(a0) : 255;
                    if(a1) this.tiledata[i][frameindex].a1 = a1 ? Number(a1) : 255;
                    // this.tiledata[i][frameindex].z0 = z0 ? Number(z0) : 100;
                    // this.tiledata[i][frameindex].z1 = z1 ? Number(z1) : 100;
                    this.tiledata[i][frameindex].tex = strMarker;
                    this.tiledata[i][frameindex].orgx = -Number(oringinInfo.x);
                    this.tiledata[i][frameindex].orgy = -Number(oringinInfo.y);
                        // console.log(strMarker)
                    // }
                }
            }
        }

        private linkEffect(effindex:number, frameindex:number, data:any, root:string, m_id:string) : void {
            let msg:any = msMoudle.getSkillInfo(data[root], root, data);
            if(msg) {
                let strMarker:string;
                if(m_id == "0001004") strMarker = "res/Skill/000.img/" + msg.strMarker;
                else {
                    strMarker = "res/Skill/" + Math.floor( Number(m_id) / 10000) + ".img/" + msg.strMarker;
                }
                let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                if(oringinInfo) {
                    let delay = data[root + ".delay"];
                    let a0 = data[root + ".a0"];
                    let a1 = data[root + ".a1"];
                    let z0 = data[root + ".z0"];
                    let z1 = data[root + ".z1"];
                    this.skilldata[effindex][frameindex] = new Object();
                    this.skilldata[effindex][frameindex].delay = delay ? Number(delay) : 90;
                    this.skilldata[effindex][frameindex].a0 = a0 ? Number(a0) : 255;//255
                    this.skilldata[effindex][frameindex].a1 = a1 ? Number(a1) : 255;
                    this.skilldata[effindex][frameindex].z0 = z0 ? Number(z0) : 100;
                    this.skilldata[effindex][frameindex].z1 = z1 ? Number(z1) : 100;
                    this.skilldata[effindex][frameindex].tex = strMarker;
                    this.skilldata[effindex][frameindex].orgx = -Number(oringinInfo.x);
                    this.skilldata[effindex][frameindex].orgy = -Number(oringinInfo.y);
                }
            }
        }

        private doAction(frameIndex:number, i:number) : void {
            if(this.skillAni && this.skilldata[i] && this.skillAni[i]) {
                if(frameIndex >= this.skilldata[i].length) {
                    frameIndex = 0;
                    this.skillAni[i].skin = "";

                    // else {
                        if(i == this.skilldata.length - 1) {
                            //state
                            Laya.timer.loop(1, this, this.doStateAction);
                            // if(this.m_id != "1311008") {
                                //special
                                this.doSpecialAction(0);
                            // }
                            /////这里出去会出问题
                            let _time:number = 1000;
                            if(msMoudle.isTileSkill(this.m_id)) {
                                _time = 4000;
                            }
                            else if(this.m_id == "2301002") {
                                _time = 500;
                            }

                            if(this.m_hero) {
                                // if(this.m_hero.teamIndex == 100) {
                                //     if(msMoudle.getWeaponType(this.m_hero.partIndex[msMoudle.partType.tWeapon]) == "弓" || msMoudle.getWeaponType(this.m_hero.partIndex[msMoudle.partType.tWeapon]) == "弩") {
                                //         // if(msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                                //             Laya.timer.once(_time / (this.m_atkspeed / 1), this, ()=> {
                                //                 if(this.m_hero) {
                                //                     if(this.m_hero._autofight) Laya.timer.frameLoop(1, this.m_hero, this.m_hero.autoFight);
                                //                 }
                                //             });
                                //         // }
                                //     }
                                //     else {
                                //         Laya.timer.once(_time / (this.m_atkspeed / 1), this, ()=> {
                                //             if(this.m_hero) {
                                //                 if(this.m_hero._autofight) Laya.timer.frameLoop(1, this.m_hero, this.m_hero.autoFight);
                                //             }
                                //         });
                                //     }
                                // }
                                // else {
                                    Laya.timer.once(_time / (this.m_atkspeed / 1), this, ()=> {
                                        if(this.m_hero) {
                                            if(this.m_hero._autofight) Laya.timer.frameLoop(1, this.m_hero, this.m_hero.autoFight);
                                        }
                                    });
                                // }
                            }

                        }
                        return ;
                    // }
                }
                if(this.skilldata[i][frameIndex]) {

                    let tex:any = Laya.loader.getRes(this.skilldata[i][frameIndex].tex);
                    this.skillAni[i].skin = this.skilldata[i][frameIndex].tex;
                    if(this.skillAni[i] && tex) {

                        // msMoudle.toast("xxx" + this.m_id + msMoudle.key_down + "  " + frameIndex)

                        this.skillAni[i].pos(this.skilldata[i][frameIndex].orgx + tex.width / 2,
                        this.skilldata[i][frameIndex].orgy + tex.height / 2);

                        this.skillAni[i].pivot(tex.width / 2, tex.height / 2);
                        // if(this.skilldata[i][frameIndex].z0 != this.skilldata[i][frameIndex].z1)
                        msMoudle._alphaskillsp(this.skillAni[i], this.skilldata[i][frameIndex].delay,
                        this.skilldata[i][frameIndex].a0, this.skilldata[i][frameIndex].a1, this.skilldata[i][frameIndex].z0, this.skilldata[i][frameIndex].z1);
                    }
                    if(this.skilldata[i].length > 0) {
                        Laya.timer.once(this.skilldata[i][frameIndex].delay / (this.m_atkspeed / 1), this, this.doAction, [frameIndex + 1, i], false);
                    }
                }
                // }
            }
        }

        private doSpecialAction(frameIndex:number) : void {

            if(frameIndex >= this.specialdata.length) {
                frameIndex = 0;
                this.specialAni.skin = "";
                // return ;
                if(this.m_id == "1311008") {
                    Laya.timer.clear(this, this.doSpecialAction);
                    Laya.timer.once(1000, this, this.doSpecialAction, [0]);
                }
                return ;
            }
            // else {
            if(this.specialdata[frameIndex] && this.specialdata[frameIndex].tex) {
                let tex:any = Laya.loader.getRes(this.specialdata[frameIndex].tex);
                if(tex) {
                    if(this.specialAni) {
                        this.specialAni.skin = this.specialdata[frameIndex].tex;
                        this.specialAni.pos(this.specialdata[frameIndex].orgx + tex.width / 2,
                            this.specialdata[frameIndex].orgy + tex.height / 2);
                        this.specialAni.pivot(tex.width / 2, tex.height / 2);
                        if(this.specialdata[frameIndex].z0 != this.specialdata[frameIndex].z1)
                        msMoudle._alphaskillsp(this.specialAni, this.specialdata[frameIndex].delay,
                            this.specialdata[frameIndex].a0, this.specialdata[frameIndex].a1, this.specialdata[frameIndex].z0, this.specialdata[frameIndex].z1);
                    }
                    if(this.specialdata.length > 0) {
                        Laya.timer.once(this.specialdata[frameIndex].delay / (this.m_atkspeed / 1), this, this.doSpecialAction, [frameIndex + 1], false);
                    }
                }
            }
        }

        private doScreenAction(frameIndex:number) : void {
            if(this.screendata) {
                if(frameIndex >= this.screendata.length) {
                    frameIndex = 0;
                    if(this.screenAni) this.screenAni.skin = "";
                    return ;
                }
                if(this.screendata[frameIndex] && this.screendata[frameIndex].tex){
                    let tex:any = Laya.loader.getRes(this.screendata[frameIndex].tex);
                    if(tex && this.screenAni) {
                        this.screenAni.skin = this.screendata[frameIndex].tex;
                        this.screenAni.pos(Laya.stage.width / 2 + this.screendata[frameIndex].orgx + tex.width / 2,
                            Laya.stage.height / 2 + this.screendata[frameIndex].orgy + tex.height / 2);
                        this.screenAni.pivot(tex.width / 2, tex.height / 2);
                        // if(this.screendata[frameIndex].z0 != this.screendata[frameIndex].z1)
                        // msMoudle._alphaskillsp(this.screenAni, this.screendata[frameIndex].delay,
                            // this.screendata[frameIndex].a0, this.screendata[frameIndex].a1, this.screendata[frameIndex].z0, this.screendata[frameIndex].z1);
                        if(this.screendata.length > 0) {
                            Laya.timer.once(this.screendata[frameIndex].delay / (this.m_atkspeed / 1), this, this.doScreenAction, [frameIndex + 1], false);
                        }
                    }
                }
            }
        }

        private doKeyDownAction(frameIndex:number) : void {
            if(this.keydowndata) {
                if(frameIndex >= this.keydowndata.length) {
                    frameIndex = 0;
                    //持续按的技能
                    if( this.isLoopSkill() && msMoudle.key_down) {
                        // if(this.m_hero) {
                        //     // if(this.soundid != "") msMoudle.playSound("res/Sound/Skill.img/" + this.soundid + ".Use")
                    }
                    else {
                        //中断持续技能
                        if( this.isLoopSkill()) {
                            if(this.soundChannel) {
                                // console.log("##stop play")
                                this.soundChannel.stop();
                                this.soundChannel = null;
                                // Laya.SoundManager.stopSound("res/Sound/Skill.img/" + this.soundid + ".wav");
                            }
                        }
                        if(this.keydownAni) this.keydownAni.skin = "";
                        return ;
                    }
                }

                if(this.keydowndata[frameIndex] && this.keydowndata[frameIndex].tex){
                    let tex:any = Laya.loader.getRes(this.keydowndata[frameIndex].tex);
                    if(tex && this.keydownAni) {
                        this.keydownAni.skin = this.keydowndata[frameIndex].tex;
                        this.keydownAni.pos(this.keydowndata[frameIndex].orgx, this.keydowndata[frameIndex].orgy);
                        if(this.keydowndata.length > 0) {
                            Laya.timer.once(this.keydowndata[frameIndex].delay / (this.m_atkspeed / 1), this, this.doKeyDownAction, [frameIndex + 1], false);
                        }
                    }
                }
            }
        }

        private doStateAction(i:number) : void {
            for(let i:number = 0; i < this.statedata.length; i++) {
                let tex:any = Laya.loader.getRes(this.statedata[i][0].tex);
                let x0:number = 0;
                let y0:number = 0;
                let r:number = 50;
                let ang:number = this.statedata[i][0].ang;
                let x1:number = x0 + r * Math.cos(ang * msMoudle.PI / 180);
                let y1:number = y0 + r * Math.sin(ang * msMoudle.PI / 180);
                this.stateAni[i].skin = this.statedata[i][0].tex;
                if(i == 0) {
                    this.stateAni[i].pos(this.statedata[i][0].orgx + tex.width / 2, this.statedata[i][0].orgy);
                    this.stateAni[i].scale(1.6, 1.6);
                    this.stateAni[i].rotation = this.statedata[i][0].ang;
                }
                else {
                    this.stateAni[i].pos(this.statedata[i][0].orgx + x1 + tex.width / 2, this.statedata[i][0].orgy + y1 - tex.height / 2);
                }
                this.stateAni[i].pivot(tex.width / 2, tex.height / 2);
                this.statedata[i][0].ang -= 3;
                if(this.statedata[i][0].ang == -360) this.statedata[i][0].ang = 0;
            }
        }

        mob_dir:number = 1;
        public doHitAction(index:number, frameIndex:number, mob:any, addX:number = 0, addY:number = 0) : void {
            this.mob_dir = mob.m_dir;

            if(this.hitdata && this.hitAni && this.hitAni[index]) {
                if(this.hitdata[0] && this.hitdata[0][frameIndex]) {
                    if(frameIndex >= this.hitdata[0].length) {
                        frameIndex = 0;
                        if(this.hitAni[index]) this.hitAni[index].visible = false;
                        return ;
                    }
                    if(this.hitAni[index]) {
                        // let tex:any = Laya.loader.getRes(this.hitdata[0][frameIndex].tex);
                        this.hitAni[index].skin = this.hitdata[0][frameIndex].tex;
                        // this.hitAni[index].zOrder = 10000;
                        this.hitAni[index].visible = true;
                        if(this.m_id == "2121007" || this.m_id == "2221007" || this.m_id == "2321008" || this.m_id == "5121001") {
                            this.hitAni[index].pivot(-this.hitdata[0][frameIndex].orgx, -this.hitdata[0][frameIndex].orgy);
                            this.hitAni[index].pos(this.m_head_x + addX, this.m_head_y + addY);
                            this.hitAni[index].scaleX = this.m_hero.m_dir / mob.m_dir;
                            // this.hitAni[index].pos(this.hitdata[0][frameIndex].orgx + this.m_head_x + addX, this.hitdata[0][frameIndex].orgy  + this.m_head_y + addY);
                        }
                        else {
                            // this.hitAni[index].pos(this.hitdata[0][frameIndex].orgx + this.m_head_x + addX,
                                // this.hitdata[0][frameIndex].orgy  + this.m_head_y - 30 + addY);
                            this.hitAni[index].pivot(-this.hitdata[0][frameIndex].orgx, -this.hitdata[0][frameIndex].orgy);
                            this.hitAni[index].pos(this.m_head_x + addX, this.m_head_y + addY);
                            this.hitAni[index].scaleX = this.m_hero.m_dir / mob.m_dir;
                            // console.log("hit ani, ", index, this.m_head_y, addY, this.hitdata[0][frameIndex].orgx, this.hitdata[0][frameIndex].orgy)
                            // this.hitAni[index].pos(mob.m_offX + this.m_head_x + addX, this.hitdata[0][frameIndex].orgy  + this.m_head_y - 30 + addY);
                        }
                    }
                    if(this.hitdata[0].length > 0) {
                        Laya.timer.once(this.hitdata[0][frameIndex].delay / (this.m_atkspeed / 1), this, this.doHitAction, [index, frameIndex + 1, mob, addX, addY], false);
                    }
                }
            }
            // if(this.special_x != -9999 && this.special_y != -9999) {
            //     this.doSpecialAction2(index, 0);
            // }
        }

        public doHitAction2(index:number, frameIndex:number, mob:any, addX:number = 0, addY:number = 0) : void {
            this.mob_dir = mob.m_dir;
            if(this.hitdata2) {
                let hitdelay = 0;
                if(this.hitdata2[index]) {
                    if(frameIndex == 0) {
                        mob.m_effect_sp.addChild(this.hitAni2[index]);
                        // skill.4211004.hit.1.hitAfter
                        if(this.m_data) {
                            if(this.m_data["skill." + this.m_id + ".hit." + (index + 1) + ".hitAfter"]) {
                                hitdelay = Number(this.m_data["skill." + this.m_id + ".hit." + (index + 1) + ".hitAfter"]);
                            }
                        }
                    }
                    if(frameIndex >= this.hitdata2[index].length) {
                        frameIndex = 0;
                        if(this.hitAni2[index]) this.hitAni2[index].visible = false;
                        return ;
                    }
                    let tex:any = Laya.loader.getRes(this.hitdata2[index][frameIndex].tex);
                    this.hitAni2[index].skin = this.hitdata2[index][frameIndex].tex;
                    this.hitAni2[index].pos(this.hitdata2[index][frameIndex].orgx + this.m_head_x + addX,
                            this.hitdata2[index][frameIndex].orgy  + this.m_head_y + addY);
                    if(this.hitdata2[index].length > 0) {
                        Laya.timer.once(this.hitdata2[index][frameIndex].delay / (this.m_atkspeed / 1), this, this.doHitAction2, [index, frameIndex + 1, mob, addX, addY], false);
                    }
                }
                // if(frameIndex == 0) {
                //     if(this.m_id != "4211004") {
                //         this.doHitAction(index, frameIndex, mob, addX, addY);
                //     }
                //     // else {
                //     //     Laya.timer.once(hitdelay, this, this.doHitAction, [index, frameIndex, mob, addX, addY]);
                //     // }
                // }
            }
            // if(this.special_x != -9999 && this.special_y != -9999) {
            //     this.doSpecialAction2(index, 0);
            // }
        }

        private doSpecialAction2(i:number,  index:number, frameIndex:number, rnkX:number, rnkY:number) : void {
            if(this.specialdata2) {
                if(this.specialdata2[index]) {
                    if(frameIndex >= this.specialdata2[index].length) {
                        frameIndex = 0;
                        // this.specialAni2[i].skin = "";
                        // return ;
                    }
                    if(this.specialdata2[index][frameIndex]) {
                        let tex:any = Laya.loader.getRes(this.specialdata2[index][frameIndex].tex);
                        this.specialAni2[i].skin = this.specialdata2[index][frameIndex].tex;
                        this.specialAni2[i].alpha = this.specialMoveA[i];
                        // this.specialAni2[index].pos(this.specialdata2[index][frameIndex].orgx, this.specialdata2[index][frameIndex].orgy);
                        this.specialAni2[i].pos(this.specialdata2[index][frameIndex].orgx - rnkX + this.specialMoveX[i],
                        this.specialdata2[index][frameIndex].orgy - rnkY - this.special_y / 2 + this.specialMoveY[i]);//

                        if(this.specialdata2[index].length > 1) {
                            Laya.timer.once(this.specialdata2[index][frameIndex].delay / (this.m_atkspeed / 1), this, this.doSpecialAction2, [i, index, frameIndex + 1, rnkX, rnkY], false);
                        }
                        else {
                            Laya.timer.once(90, this, this.doSpecialAction2, [i, index, frameIndex, rnkX, rnkY], false);
                        }
                    }
                }
            }
        }

        private doTileAction(i:number, index:number, frameIndex:number, rnkX:number, rnkY:number) : void {
            if(this.tiledata) {
                if(this.tiledata[index]) {
                    if(frameIndex >= this.tiledata[index].length) {
                        frameIndex = 0;
                        if(!this.special_count) {
                            this.tileAni[i].skin = "";
                            return ;
                        }
                    }
                    if(this.tiledata[index][frameIndex]) {
                        let tex:any = Laya.loader.getRes(this.tiledata[index][frameIndex].tex);
                        this.tileAni[i].skin = this.tiledata[index][frameIndex].tex;
                        // console.log(i + " " + index + "  " + frameIndex)
                        if(this.special_count) {
                            this.tileAni[i].alpha = 0.7;
                            this.tileAni[i].pos(this.tiledata[index][frameIndex].orgx - (this.rangeW / this.special_count) * i,this.tiledata[index][frameIndex].orgy);//
                        }
                        else {
                            this.tileAni[i].pos(this.tiledata[index][frameIndex].orgx + rnkX,
                            this.tiledata[index][frameIndex].orgy + rnkY);//
                        }

                        if(this.tiledata[index].length > 0) {
                            Laya.timer.once(this.tiledata[index][frameIndex].delay / (this.m_atkspeed / 1), this, this.doTileAction, [i, index, frameIndex + 1, rnkX, rnkY], false);
                        }
                    }
                }
            }
        }

        // this.special_x = Number(x);
            // this.special_y = Number(y);
            // this.special_fall = Number(fall);
            // this.special_start = Number(start);
            // this.special_interval = Number(interval);
            // this.special_count = Number(count);
            // this.special_duration = Number(duration);

            // <tr><td>skill.3111003.special.0.0.origin</td><td>42,48</td></tr>
            // <tr><td>skill.3111003.special.x</td><td>105</td></tr>
            // <tr><td>skill.3111003.special.y</td><td>130</td></tr>
            // <tr><td>skill.3111003.special.fall</td><td>400</td></tr>
            // <tr><td>skill.3111003.special.start</td><td>150</td></tr>
            // <tr><td>skill.3111003.special.interval</td><td>90</td></tr>
            // <tr><td>skill.3111003.special.count</td><td>5</td></tr>
            // <tr><td>skill.3111003.special.duration</td><td>500</td></tr>

            // <tr><td>skill.3111004.special.0.0.origin</td><td>21,48</td></tr>
            // <tr><td>skill.3111004.special.x</td><td>85</td></tr>
            // <tr><td>skill.3111004.special.y</td><td>230</td></tr>
            // <tr><td>skill.3111004.special.fall</td><td>150</td></tr>
            // <tr><td>skill.3111004.special.start</td><td>0</td></tr>
            // <tr><td>skill.3111004.special.interval</td><td>90</td></tr>
            // <tr><td>skill.3111004.special.count</td><td>8</td></tr>
            // <tr><td>skill.3111004.special.duration</td><td>500</td></tr>

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            if(this.m_sp)
                this.m_sp.pos(x, y);
            if(this.m_nodir_sp)
                this.m_nodir_sp.pos(x, y);
        }

        public setDir(dir:number) : void {
            this.m_dir = dir;
            if(this.m_sp)
                this.m_sp.scaleX = dir;
        }
    }
}