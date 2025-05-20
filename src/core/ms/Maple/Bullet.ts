module BulletRole {
    export class Bullet extends Laya.Sprite {
        public m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 1;
        private m_sp:Laya.Sprite;
        private m_id:string;

        public atkBound:Laya.Sprite;
        public bulletED:boolean = false;
        private bulletAni:Laya.Image;
        private bulletData:Array<any> = [];
        private hero:any;
        private mob:any;
        private last_x:number = 0;      //记录手臂位置
        private last_y:number = 0;
        private dir:number = 1;
        m_atkspeed:number = 1;

        public clearUp() : void {
            Laya.timer.clear(this, this.dShow);
            Laya.timer.clear(this, this.startB);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.delayBullet);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            if(this.atkBound) {
                this.atkBound.removeSelf();
                this.atkBound.destroy(true);
                this.atkBound = null;
            }
            if(this.bulletAni) {
                this.bulletAni.removeSelf();
                this.bulletAni.destroy(true);
                this.bulletAni = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.bulletData = [];
        }

        ///需要兼容箭、飞镖、子弹
        bulletid = "02060005";
        m_index:number = 0;
        m_b:number = 0;
        hit_Arr:Array<any> = [];
        dtime:boolean = false;
        public loadBullet(P:any, Hero:any, dir:number, id:string = "N", index:number, dtime:boolean = false) : void {
            let doudong = [0, 5, 0, -5];
            this.m_index = index;
            this.m_b = doudong[this.m_index % 4];

            if(this.dtime) {
                let rnk = msMoudle.getRandValue(0, 0, 100);
                this.m_b = doudong[rnk % 4];
            }

            this.m_parent = P;
            this.hero = Hero;
            this.dtime = dtime;

            if(this.hero) this.m_atkspeed = this.hero.m_atkspeed + this.hero.p_atkspeed + (ms.speed - 1) / 1;
            // this.mob = Mob;
            // this.dir = dir;
            let bdir = dir;
            this.m_id = id;
            this.bulletED = false;

            this.m_sp = new Laya.Sprite();
            this.m_sp.scaleX = dir;
            this.m_sp.zOrder = 10000;
            this.m_parent.addChild(this.m_sp);

            this.bulletAni = new Laya.Image();
            this.m_sp.addChild(this.bulletAni);
            ////这个直接换成角色的
            this.atkBound = new Laya.Sprite();          //这个是检测碰撞范围的
            this.atkBound.zOrder = 999999;
            this.atkBound.scaleX = dir;
            // this.atkBound.alpha = 1;
            // this.m_parent.addChild(this.atkBound);

            this.setPos(this.hero.m_x, this.hero.m_y - 20);
            this.bulletAni.alpha = 0;
            this.bulletData = [];

            if(id == "N") {
                this.bulletid = "02060005";
                if(msMoudle.getWeaponType(this.hero.partIndex[msMoudle.partType.tWeapon]) == "拳套")
                    this.bulletid = "02070006";
                let data:any = msMoudle.wz["0" + Math.floor(Number(this.bulletid) / 10000) + ".img"][this.bulletid];
                // 02070006
                let frameindex:number = 0;
                while(true) {
                    let root:string = this.bulletid + ".bullet." + frameindex;
                    if(id != "N") {
                        root = "skill." + this.bulletid + ".ball." + frameindex;
                    }
                    if(data[root]) {
                        this.bulletData[frameindex] = new Object();
                        this.linkbullet(data, root, frameindex);
                        frameindex = frameindex + 1;
                    }
                    else break;
                }
            }
            else {
                //skill.3111003.ball.0
                // msMoudle.toast(id);
                let skillId = id;
                let data:any = msMoudle.wz[Math.floor(Number(skillId) / 10000) + ".img"]["skill." + skillId];
                let frameindex:number = 0;
                while(true) {
                    let root:string = "skill." + this.m_id + ".ball." + frameindex;
                    if(this.m_id == "13121001") root = "skill." + this.m_id + ".ball.0." + frameindex;
                    if(data[root]) {
                        this.linkbullet(data, root, frameindex);
                        frameindex = frameindex + 1;
                    }
                    else {
                        break;
                    }
                }
            }

            Laya.timer.clear(this, this.startB);
            let res:Array<any> = [];
            for(let i:number = 0; i < this.bulletData.length; i++) {
                if(!Laya.loader.getRes(this.bulletData[i].tex))
                    res.push({ url: this.bulletData[i].tex });
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    // this.m_sp.scaleX = this.dir;
                    Laya.timer.clear(this, this.delayBullet);
                    if(this.dtime == false)
                        Laya.timer.once(60 * this.m_index / (this.m_atkspeed / 1), this, this.delayBullet, [bdir]);
                    else {
                        if(msMoudle.key_down) this.delayBullet(bdir);
                    }
                });
            }
            else {
                // this.m_sp.scaleX = this.dir;
                Laya.timer.clear(this, this.delayBullet);
                if(this.dtime == false)
                    Laya.timer.once(60 * this.m_index / (this.m_atkspeed / 1), this, this.delayBullet, [bdir]);
                else {
                    if(msMoudle.key_down) this.delayBullet(bdir);
                }
            }
        }

        delayBullet(dir:number) : void {
            // let _x = this.hero.m_x;
            // let _y = this.hero.m_y;
            // this.setPos(_x, _y);
            this.bulletAni.alpha = 1;
            Laya.timer.clear(this, this.dShow);
            if(this.dtime == false)
                Laya.timer.once(500 / (this.m_atkspeed / 1), this, this.dShow, [dir]);
            else
                this.dShow(dir);
        }

        dShow(dir:number) : void {
            let m__y = this.m_y;
            this.golong = 0;
            // console.log(m__y);
            Laya.timer.frameLoop(1, this, this.startB, [dir, m__y]);
            this.doAction(0, dir);
        }

        golong:number = 0;
        istouch:boolean = false;
        m__y:number = 0;
        startB(dir:number, m_y:number) : void {
            let range = 405;
            if(this.hero.skillId != "N") {
                if(msMoudle.wz[ Math.floor(Number(this.hero.skillId) / 10000) + ".img"]) {
                    let data:any = msMoudle.wz[ Math.floor(Number(this.hero.skillId) / 10000) + ".img"]["skill." + this.hero.skillId];
                    if(data) {
                        let lt:any = msMoudle.Vec2FromArr(data["skill." + this.hero.skillId + ".level.30.lt"]);
                        let rb:any = msMoudle.Vec2FromArr(data["skill." + this.hero.skillId + ".level.30.rb"]);
                        let _range = Math.abs(Number(lt.x) - Number(rb.x));
                        if(_range) range = _range / 2;
                    }
                }
            }
            if(this.golong <= range) {
                if(this.bulletData) {
                    if(this.bulletData[this.curFrameIndex]) {
                        if(this.bulletData[this.curFrameIndex].orgy) {
                            if(this.hero.skillId == "3111006" || this.dtime) {
                                // this.setPos(this.m_sp.x + 12 * (this.m_atkspeed / 1) * -dir, m_y  + this.m_b);
                                this.setPos(this.m_sp.x + 12 * (this.m_atkspeed / 1) * -dir, m_y  + this.m_b);
                            }
                            else {
                                this.setPos(this.m_sp.x + 12 * (this.m_atkspeed / 1) * -dir, m_y);
                            }
                            this.golong += 12 * (this.m_atkspeed / 1);
                            if(this.golong >= 12 * (this.m_atkspeed / 1)) this.bulletAni.alpha = 1;
                            ///有些飞侠的技能不旋转
                            if(this.hero.skillId != "14111022" && this.hero.skillId != "14121002") {
                                if(this.hero.skillId == "4111005" ||
                                msMoudle.getWeaponType(this.hero.partIndex[msMoudle.partType.tWeapon]) == "拳套") {
                                    //旋转
                                    this.bulletAni.rotation += 20 * (this.m_atkspeed / 1);
                                }
                            }
                            if(this.istouch == false) {
                                this.JudgeBound(this.hero);
                            }

                            ///持续的技能
                            if( (this.hero.skillId == "3221001" || this.hero.skillId == "13121001") && msMoudle.key_down == false) {
                                /////碰撞的话重新计算____X
                                Laya.timer.clear(this, this.startB);
                                this.clearUp();
                                // if(this.hero && this.hero._autofight && this.hero.m_skill_1 != "N") {
                                //     let _time:number = 1000;
                                //     Laya.timer.once(_time / (this.hero.m_atkspeed / 1), this, ()=> {
                                //         if(this.hero) {
                                //             if(this.hero._autofight) Laya.timer.frameLoop(1, this.hero, this.hero.autoFight);
                                //         }
                                //     });
                                // }
                                return ;
                            }

                        }
                    }
                }
            }
            else {
                /////碰撞的话重新计算____X
                Laya.timer.clear(this, this.startB);
                this.clearUp();
                if(this.hero && this.hero._autofight && this.hero.m_skill_1 != "N") {
                    let _time:number = 1000;
                    Laya.timer.once(_time / (this.hero.m_atkspeed / 1), this, ()=> {
                        if(this.hero) {
                            if(this.hero._autofight) Laya.timer.frameLoop(1, this.hero, this.hero.autoFight);
                        }
                    });
                }
            }
        }

        alreadyHit:Array<any> = [];
        alreadyIndex:Array<any> = [];
        private JudgeBound(role:any) : void {
            let touch:boolean = false;
            let __:Array<any> = [];
            if(role.m_armyList) {
                for(let i:number = 0; i < role.m_armyList.length; i++) {
                    let mob = role.m_armyList[i];
                    if(mob && mob.m_isdead == false) {
                        if(mob.hitBound.getBounds().intersects(this.atkBound.getBounds())) {
                            touch = true;
                            if(msMoudle.findKeyFromArr(i,this.alreadyIndex) == false) {
                                __[__.length] = mob;
                                this.alreadyIndex[this.alreadyIndex.length] = i;
                            }
                        }
                    }
                }
            }
            if(touch) {
                if(this.hero.skillId != "3111003" && this.hero.skillId != "3111004" &&
                this.hero.skillId != "3211003" && this.hero.skillId != "3211004" && this.hero.skillId != "13111000") {
                    // if(this.hero.skillId == "N") this.hero.____x.length = 1;
                    let can_atk:boolean = false;
                    for(let i:number = 0; i < this.alreadyIndex.length; i++) {
                        if(msMoudle.findKeyFromArr(this.alreadyIndex[i],this.alreadyHit) == false) {
                            this.alreadyHit[this.alreadyHit.length] = this.alreadyIndex[i];
                            can_atk = true;
                        }
                    }
                    if(can_atk) {
                        this.hero.____x = __;
                        this.hero.judgeBulletBound();
                    }
                }
                //齿轮技能
                if(this.hero.skillId != "4111005" && this.hero.skillId != "14111022") {
                    this.istouch = true;
                    Laya.timer.once(100, this, ()=> {
                        Laya.timer.clear(this, this.startB);
                        this.clearUp();
                        if(role && role._autofight && this.hero.m_skill_1 != "N") {
                            let _time:number = 1000;
                            Laya.timer.once(_time / (role.m_atkspeed / 1), this, ()=> {
                                if(role) {
                                    if(role._autofight) Laya.timer.frameLoop(1, role, role.autoFight);
                                }
                            });
                        }
                    });
                }
            }
        }

        private drawAtkBound(wid:number, hei:number) : void {
            if(this.atkBound) {
                this.atkBound.graphics.clear();
                if(this.bulletData) {
                    if(this.bulletData[this.curFrameIndex]) {
                        if(this.bulletData[this.curFrameIndex].orgy) {
                            // this.atkBound.graphics.drawRect(wid/4*dir, -(this.bulletData[this.curFrameIndex].orgy - 20),
                            // wid/2*-dir, this.bulletData[this.curFrameIndex].orgy - 20, null, "#ffffff");
                             this.atkBound.graphics.drawRect(this.bulletData[this.curFrameIndex].orgx, this.bulletData[this.curFrameIndex].orgy, wid, hei, null, "#ffffff");
                        }
                    }
                }
            }
        }

        m_loadRes:Array<any> = [];
        private linkbullet(data:any, root:string, frameindex:number) : void {

            if(this.m_id == "N") {
                let msg:any = msMoudle.getWindowInfo(data[root], this.bulletid);
                let strMarker:string = "res/ItemUse/0" + Math.floor(Number(this.bulletid) / 10000) + ".img/" + msg.strMarker;
                let delay:number = data[root + ".delay"];
                this._(data, root, frameindex, strMarker, delay);
            }
            else {
                let msg:any = msMoudle.getSkillInfo(data[root], root, data);
                if(msg) {
                    let strMarker = "res/Skill/" + Math.floor(Number(this.m_id) / 10000) + ".img/" + msg.strMarker;
                    let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
                    if(oringinInfo) {
                        let delay = data[root + ".delay"];
                        let a0 = data[root + ".a0"];
                        let a1 = data[root + ".a1"];
                        let z0 = data[root + ".z0"];
                        let z1 = data[root + ".z1"];
                        this.bulletData[frameindex] = new Object();
                        this.bulletData[frameindex].delay = delay ? Number(delay) : 500;
                        this.bulletData[frameindex].a0 = a0 ? Number(a0) : 0;
                        this.bulletData[frameindex].a1 = a1 ? Number(a1) : 255;
                        this.bulletData[frameindex].z0 = z0 ? Number(z0) : 100;
                        this.bulletData[frameindex].z1 = z1 ? Number(z1) : 100;
                        this.bulletData[frameindex].tex = strMarker;
                        this.bulletData[frameindex].orgx = -Number(oringinInfo.x);
                        this.bulletData[frameindex].orgy = -Number(oringinInfo.y);
                    }
                }
            }
        }

        private _(data:any, root:string,
            frameindex:number, strMarker:string, delay:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {
                this.bulletData[frameindex].tex = strMarker;
                this.bulletData[frameindex].delay = delay ? Number(delay) : 500;
                this.bulletData[frameindex].orgx = -Number(oringinInfo.x);
                this.bulletData[frameindex].orgy = -Number(oringinInfo.y);
            }
        }

        //另外一种可能是定位的人和打的人不一致
        //可能资源还没有加载完成bulletED就是ture了
        //这里需要改造
        curFrameIndex:number = 0;
        private doAction(frameIndex:number, dir:number) : void {
            if(this.bulletData.length > 0) {
                if(frameIndex >= this.bulletData.length) frameIndex = 0;

                this.curFrameIndex = frameIndex;
                let _bodyData:any = this.bulletData[frameIndex];
                // if(this.bulletED == false && this.last_x != 0 && this.last_y != 0) {
                //     this.bulletED = true;
                //     let tex:any = Laya.Loader.getRes(_bodyData.tex);
                //     this.bulletAni.skin = _bodyData.tex;
                //     this.golong = 0;
                //     Laya.timer.frameLoop(1, this, this.startB, [dir, m_y]);
                //     return ;
                // }
                // else {
                    let _bodyData1:any;
                    if(this.hero.bodyData[1]) {
                        _bodyData1 = this.hero.bodyData[1][this.hero.cur_body_frame];
                    }
                    //身体偏移
                    if(_bodyData1) {
                        let tex:any = Laya.Loader.getRes(_bodyData.tex);
                        ///持续的技能
                        if( (this.hero.skillId == "3221001" || this.hero.skillId == "13121001") && msMoudle.key_down == false) {
                            this.bulletAni.skin = "";
                        }
                        else {
                            this.bulletAni.skin = _bodyData.tex;
                        }
                        // this.bulletAni.alpha = 0;

                        if(_bodyData1.oringinInfo) {
                            this.last_x = (_bodyData1.orgx - _bodyData1.oringinInfo.x);
                            this.last_y = (_bodyData1.orgy - _bodyData1.oringinInfo.y);
                        }

                        this.drawAtkBound(tex.width, tex.height);
                        this.bulletAni.pivot(tex.width / 2, tex.height / 2);
                        this.bulletAni.pos(this.bulletData[frameIndex].orgx + tex.width / 2, this.bulletData[frameIndex].orgy + tex.height / 2);

                    }
                // }
                if(this.bulletData.length > 1)
                    Laya.timer.once(_bodyData.delay / (this.m_atkspeed / 1), this, this.doAction, [frameIndex + 1, dir], false);
                else
                    Laya.timer.once(500, this, this.doAction, [1, dir], false);
            }
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.m_sp.pos(x, y);
            this.atkBound.pos(x, y);
        }

        ///
    }
}