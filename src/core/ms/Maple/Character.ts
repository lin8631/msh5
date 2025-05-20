/// <reference path="./../../../core/ms/Maple/NameTag.ts" />
/// <reference path="./../../../core/ms/Maple/MonsterBook.ts" />
/// <reference path="./../../../core/ms/Maple/Item.ts" />
/// <reference path="./../../../core/ms/Maple/Number.ts" />
/// <reference path="./../../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../../core/ms/Maple/Bullet.ts" />
/// <reference path="./../../../scene/Other/Guide.ts" />
/// <reference path="./../../../core/ms/Maple/ChatBalloon.ts" />
/// <reference path="./../../../core/ms/Maple/BufEff.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />
/// <reference path="./../../../core/ms/Maple/Pet.ts" />
/// <reference path="./../../../core/ms/Maple/Summon.ts" />

module CharacterRole {

    import cssNametag = NametagRole.NameTag;
    import cssMonsterBook = MonsterBookRole.MonsterBook;
    import cssItem = ItemRole.Item;
    import cssNumber = NumberRole.Number;
    import cssSkill = SkillRole.Skill;
    import cssBullet = BulletRole.Bullet;
    import cssGuide = GuideMoudle.Guide;
    import cssChatBalloon = ChatBalloonRole.ChatBalloon;
    import cssBufEff = BufEffMoudle.BufEff;
    import cssBasicEff = BasicEffRole.BasicEff;
    import cssPet = PetRole.Pet;
    import cssSummon = SummonRole.Summon;

    let _bodyNavelInfo          = new Array();
    let _bodyNeckInfo           = new Array();
    let _bodyHandInfo           = new Array();
    let _headNeckInfo           = new Array();
    let _headBrowInfo           = new Array();
    let _armHandInfo            = new Array();
    let _armNavelInfo           = new Array();
    let _lHandMoveInfo          = new Array();
    for(let j:number = 0; j < 33; j++) {  //msMoudle.actionType
        _bodyNavelInfo[j]    = new Object();
        _bodyNeckInfo[j]     = new Object();
        _bodyHandInfo[j]     = new Object();
        _headNeckInfo[j]     = new Object();
        _headBrowInfo[j]     = new Object();
        _armHandInfo[j]      = new Object();
        _armNavelInfo[j]     = new Object();
        _lHandMoveInfo[j]    = new Object();
        _bodyNavelInfo[j]    = {x:0, y:0};
        _bodyNeckInfo[j]     = {x:0, y:0};
        _bodyHandInfo[j]     = {x:0, y:0};
        _headNeckInfo[j]     = {x:0, y:0};
        _headBrowInfo[j]     = {x:0, y:0};
        _armHandInfo[j]      = {x:0, y:0};
        _armNavelInfo[j]     = {x:0, y:0};
        _lHandMoveInfo[j]    = {x:0, y:0};
    }

    export class Character {
        //test
        public m_E: any;
        public m_id: any;
        public m_skillId = "";
        public m_skillType = 0;
        public m_emjIdx = -1;
        public m_initAction = "";
        public m_partyId = 0; //组队的队伍id

        public key_up = false;
        public key_down = false;
        public key_left = false;
        public key_right = false;
        public isDoubleJump = false;
        public doubledis = 0;
        public m_zs:number = 0;
        //end test

        public m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_dir:number = 1;
        public m_name:string = "玩家";
        public m_ring:string = "N";
        public m_pvpid:number = -1;
        public bodyAni        = new Array();
        public bodyData       = new Array();
        public bodyCopy:Laya.Image;
        public bodyChange:Laya.Image;
        public selJob:number = 0;
        public m_bianshen:boolean = false;
        public m_bs_id:string = "";
        public bodyChangeData = new Array();
        public hitBound:Laya.Sprite;
        public atkBound:Laya.Sprite;
        public bulletLst:Array<cssBullet> = [];
        private maxpart:number = 43;    //这里
        public m_sp:Laya.Sprite;
        public m_clicksp:Laya.Sprite;
        public m_nametag_sp:Laya.Sprite;
        public m_nametag_show:boolean = true;
        public m_special:boolean = false;
        public m_skill_sp:Laya.Sprite;      //技能层
        public m_state_sp:Laya.Sprite;      //state层
        public hpBar:Laya.ProgressBar;
        public m_chatballon:cssChatBalloon;
        public m_nametag:cssNametag;
        public charEff:maple.CharacterEffect;   //头顶特效
        public charEff2:cssBasicEff;  //身上特效
        public charEff3:cssBasicEff;  //脚底特效

        public setEff:maple.SetEffect;
        public chair:ChairRole.Chair;
        public is_oneFrame:boolean = false;

        public teamIndex:number = -1;
        ////战斗属性
        public m_isdead:boolean = false;
        public m_isbuff:Array<number> = [];    //buf状态
        public m_buff_time:Array<number> = [];      //buf剩余时间
        public m_isboss:boolean = false;

        public msgData:any;
        public m_fenshen:boolean = false;
        public m_lv:number = 1;
        public m_maxhp:number = 100;
        public m_hp:number = 100;
        public m_maxmp:number = 100;
        public m_mp:number = 100;
        public m_minatk:number = 1;
        public m_maxatk:number = 1;
        public m_def:number = 1;
        public m_baoji:number = 0;
        public m_miss:number = 0;
        public m_target:number = 100;
        public m_atkspeed:number = 1;
        public m_walkspeed:number = 1;
        public m_shuxing:string = "火";
        public m_cz:number = 1.0;
        public m_skill_1:string = "N";
        public m_skill_2:string = "N";
        public m_skill_3:string = "N";
        public m_skill_4:string = "N";

        //百分比加成
        public p_hp:number = 0;         //生命加成百分比
        public p_atk:number = 0;        //攻击加成百分比
        public p_def:number = 0;        //防御加成百分比
        public p_baoji:number = 0;      //暴击加成百分比
        public p_miss:number = 0;       //闪避加成百分比
        public p_target:number = 0;     //命中加成百分比
        public p_atkspeed:number = 0;   //攻击速度加成百分比
        public p_walkspeed:number = 0;  //移动速度加成百分比

        public b_hp:number = 0;         //生命加成百分比
        public b_atk:number = 0;        //攻击加成百分比
        public b_def:number = 0;        //防御加成百分比
        public b_baoji:number = 0;      //暴击加成百分比
        public b_miss:number = 0;       //闪避加成百分比
        public b_target:number = 0;     //命中加成百分比
        public b_atkspeed:number = 0;   //攻击速度加成百分比
        public b_walkspeed:number = 0;  //移动速度加成百分比

        private actionMap:any = new Array();
        public m_action:string;
        public m_action_list:Array<any> = [];      //动作列表
        public m_attack_list:Array<any> = [];      //攻击列表
        public m_armyList:Array<any> = [];
        private res:Array<any> = [];
        public m_down_t:number = 0;
        public m_up_t:number = 0;
        public m_complete:boolean = false;
        public is_skill:boolean = false;
        private skillId:string;
        private skill_data:any;
        public m_skill:cssSkill;
        public m_state:cssSkill;
        // public bulletED:boolean = false;

        public partIndex : Array<any> = [];
        public initbody:string = "00002000.img";
        public inithead:string = "00012000.img";
        public initcoat:string = msMoudle.getSexCoat(ms.herodata.Sex);
        public initpants:string = msMoudle.getSexPants(ms.herodata.Sex);
        public inithair:string = msMoudle.getSexHair(ms.herodata.Sex);
        public initface:string = "00020012.img";
        public initweapon:string = "01302000.img";// 01432011 01432000 01452044      01382012 . 01322003
        private expresstime:number = 0;
        private faceid:string = "default";//default . hot
        private cur_face_frame:number = 0;
        private cur_head_frame:number = 0;
        private cur_body_frame:number = 0;

        private headbrowX:Array<any> = [];
        private headbrowY:Array<any> = [];
        private tamingmobnavelX:number = 0;
        private tamingmobnavelY:number = 0;
        private tamingmobname:string;
        public _pvp:boolean = false;
        public _autofight:boolean = false;
        public _autodir:number = 0;
        public _mainhero:boolean = false;
        public m_chair:string = "N";

        public m_otherPetLst:Array<any> = [];
        public m_otherPet:Array<cssPet> = [];;

        public clearUp() : void {
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            Laya.timer.clear(this, this.judgeBound);
            Laya.timer.clear(this, this.delayC);
            Laya.timer.clear(this, this.showNum);
            Laya.timer.clear(this, this.expressTime);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.autoFight);
            Laya.timer.clear(this, this.faceAction);
            Laya.timer.clear(this, this.afterimageAction);
            Laya.timer.clear(this, this.tamingMobAction);
            // Laya.timer.clear(this, this.tamingMobAction2);
            Laya.timer.clear(this, this.tamingMob0Action);
            Laya.timer.clear(this, this.changeAction);
            Laya.timer.clear(this, this.BufLoop);
            Laya.timer.clear(this, this.startAutoFight2);
            Laya.timer.clear(this, this.doubleFrame);
            Laya.timer.clear(this, this.stopSpeck);
            Laya.timer.clear(this, this.clearMobProtect);
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < 3; i++) this.clearBuf(i);
            if(this.charEff) {
                this.charEff.removeSelf();
                this.charEff.clearUp();
                this.charEff = null;
            }
            if(this.charEff2) {
                this.charEff2.removeSelf();
                this.charEff2.clearUp();
                this.charEff2 = null;
            }
            if(this.charEff3) {
                this.charEff3.removeSelf();
                this.charEff3.clearUp();
                this.charEff3 = null;
            }

            if(this.setEff) {
                this.setEff.removeSelf();
                this.setEff.clearUp();
                this.setEff = null;
            }
            if(this.hpBar) {
                this.hpBar.removeSelf();
                this.hpBar.destroy(true);
                this.hpBar = null;
            }
            for(let i:number = 0; i < this.maxpart; i++) {
                if(this.bodyAni[i]) {
                    this.bodyAni[i].removeSelf();
                    this.bodyAni[i].destroy(true);
                    this.bodyAni[i] = null;
                }
            }
            if(this.bodyCopy) {
                this.bodyCopy.removeSelf();
                this.bodyCopy.destroy(true);
                this.bodyCopy = null;
            }
            if(this.bodyChange) {
                this.bodyChange.removeSelf();
                this.bodyChange.destroy(true);
                this.bodyChange = null;
            }

            if(this.m_chatballon) {
                this.m_chatballon.removeSelf();
                this.m_chatballon.clearUp();
                this.m_chatballon = null;
            }
            if(this.m_skill) {
                this.m_skill.clearUp();
                this.m_skill.destroy(true);
                this.m_skill = null;
            }
            if(this.m_state) {
                this.m_state.clearUp();
                this.m_state.destroy(true);
                this.m_state = null;
            }
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
            if(this.testbound) {
                this.testbound.removeSelf();
                this.testbound.destroy(true);
                this.testbound = null;
            }
            // if(this.aBound) {
            //     this.aBound.removeSelf();
            //     this.aBound.destroy(true);
            //     this.aBound = null;
            // }

            for(let i:number = 0; i < this.m_otherPet.length; i++) {
                if(this.m_otherPet[i]) {
                    this.m_otherPet[i].clearUp();
                    this.m_otherPet[i] = null;
                }
            }
            for(let i:number = 0; i < this.summonLst.length; i++) {
                if(this.summonLst[i]) {
                    this.summonLst[i].clearUp();
                    this.summonLst[i] = null;
                }
            }

            this.bodyAni = [];
            this.bodyData = [];
            this.m_down_t = 0;
            this.m_up_t = 0;
            this.actionMap = [];
            if(this.m_nametag) {
                this.m_nametag.clearUp();
                this.m_nametag = null;
            }
            if(this.m_nametag_sp) {
                this.m_nametag_sp.removeSelf();
                this.m_nametag_sp.destroy(true);
                this.m_nametag_sp = null;
            }
            if(this.m_skill_sp) {
                this.m_skill_sp.removeSelf();
                this.m_skill_sp.destroy(true);
                this.m_skill_sp = null;
            }
            if(this.m_state_sp) {
                this.m_state_sp.removeSelf();
                this.m_state_sp.destroy(true);
                this.m_state_sp = null;
            }
            if(this.m_clicksp) {
                this.m_clicksp.removeSelf();
                this.m_clicksp.destroy(true);
                this.m_clicksp = null;
            }
            if(this.chair) {
                this.chair.clearUp();
                this.chair = null;
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

        //默认形象
        public initRole() : void {
            this.partIndex[msMoudle.partType.tBody] =         this.initbody;
            this.partIndex[msMoudle.partType.tHead] =         this.inithead;
            this.partIndex[msMoudle.partType.tFace] =         this.initface;
            this.partIndex[msMoudle.partType.tHair] =         this.inithair;
            this.partIndex[msMoudle.partType.tCap] =          "N";//01002001.img
            this.partIndex[msMoudle.partType.tCoat] =         "N";//this.initcoat;//this.initcoat
            this.partIndex[msMoudle.partType.tPants] =        "N";//this.initpants;//this.initpants
            this.partIndex[msMoudle.partType.tShoes] =        "N";//01072171.img
            this.partIndex[msMoudle.partType.tWeapon] =       this.initweapon;
            this.partIndex[msMoudle.partType.tGlove] =        "N";
            this.partIndex[msMoudle.partType.tCape] =         "N";//01102000.img
            this.partIndex[msMoudle.partType.tShield] =       "N";
            this.partIndex[msMoudle.partType.tAccessory1] =   "N";
            this.partIndex[msMoudle.partType.tAccessory2] =   "N";
            this.partIndex[msMoudle.partType.tAccessory3] =   "N";
            this.partIndex[msMoudle.partType.tLongcoat] =     "N";
            this.partIndex[msMoudle.partType.tTamingMob] =    "N";//"01902000.img";
            this.partIndex[msMoudle.partType.tTamingMob0] =   "N";//"01912000.img";
            this.partIndex[msMoudle.partType.tAfterimage] =   "N";//自动识别
            this.partIndex[msMoudle.partType.tFWeapon] =      "N";
        }
        private loadE(E:any) : void {
            // if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
            //     if(this.selJob == 11 && (this.teamIndex == 100 || this.otherP)) {
            //         this.partIndex[msMoudle.partType.tTamingMob] = "01932000.img";
            //         this.partIndex[msMoudle.partType.tTamingMob0] = "N";
            //     }
            // }
            this.m_E = E;
            if(E.body) this.partIndex[msMoudle.partType.tBody] =         E.body;
            if(E.head) this.partIndex[msMoudle.partType.tHead] =         E.head;
            if(E.face) this.partIndex[msMoudle.partType.tFace] =         E.face;
            if(E.hair) this.partIndex[msMoudle.partType.tHair] =         E.hair;
            if(E.cap) this.partIndex[msMoudle.partType.tCap] =           E.cap;
            if(E.coat) this.partIndex[msMoudle.partType.tCoat] =         E.coat;
            if(E.pants) this.partIndex[msMoudle.partType.tPants] =       E.pants;
            if(E.shoes) this.partIndex[msMoudle.partType.tShoes] =       E.shoes;
            if(E.weapon) this.partIndex[msMoudle.partType.tWeapon] =     E.weapon;
            if(E.glove) this.partIndex[msMoudle.partType.tGlove] =       E.glove;
            if(E.cape) this.partIndex[msMoudle.partType.tCape] =         E.cape;
            if(E.shield) this.partIndex[msMoudle.partType.tShield] =     E.shield;
            if(E.accessory1) this.partIndex[msMoudle.partType.tAccessory1] =     E.accessory1;
            if(E.accessory2) this.partIndex[msMoudle.partType.tAccessory2] =     E.accessory2;
            if(E.accessory3) this.partIndex[msMoudle.partType.tAccessory3] =     E.accessory3;
            if(E.longcoat) this.partIndex[msMoudle.partType.tLongcoat] =     E.longcoat;
            if(E.tamingmob) this.partIndex[msMoudle.partType.tTamingMob] =     E.tamingmob;
            if(E.tamingmob0) this.partIndex[msMoudle.partType.tTamingMob0] =     E.tamingmob0;
            if(E.afterimage) this.partIndex[msMoudle.partType.tAfterimage] =    E.afterimage;
            if(E.fweapon) this.partIndex[msMoudle.partType.tFWeapon] =     E.fweapon;

            // console.log(this.partIndex, this.partIndex[msMoudle.partType.tWeapon])
        }
        public loadActs(faceid:string, part:number, actionMap:any, loop:number) : void {
            this.m_complete = false;
            if(this.partIndex[msMoudle.partType.tWeapon] && msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]) {
                let _aftimage:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
                this.partIndex[msMoudle.partType.tAfterimage] =   _aftimage + ".img";
                //

                let tm:any = this.partIndex[msMoudle.partType.tTamingMob].split(".");
                this.tamingmobname = Math.floor(Number(tm[0])) + "";

                this.res = [];
                this.faceid = faceid;

                //部位数据清理
                if(part == msMoudle.partType.tAll) {
                    for(let i:number = 0; i < this.maxpart; i++) {
                        this.bodyData[i] = null;
                        if(i != 8 && i != 16 && i != 17 && i != 18 && i != 35)
                        this.bodyData[i] = new Array();
                    }
                }
                else {
                    if(part == msMoudle.partType.tBody) {
                        this.bodyData[0] = new Array();
                        this.bodyData[1] = new Array();
                        this.bodyData[2] = new Array();
                        this.bodyData[3] = new Array();
                        this.bodyData[4] = new Array();
                        this.bodyData[9] = new Array();
                    }
                    else if(part == msMoudle.partType.tHead) {
                        this.bodyData[5] = new Array();
                    }
                    else if(part == msMoudle.partType.tFace) {
                        this.bodyData[6] = new Array();
                    }
                    else if(part == msMoudle.partType.tWeapon) {
                        this.bodyData[7] = new Array();
                        this.bodyData[38] = new Array();
                        this.bodyData[39] = new Array();
                        this.bodyData[40] = new Array();
                        this.bodyData[41] = new Array();
                    }
                    else if(part == msMoudle.partType.tCoat) {
                        this.bodyData[10] = new Array();
                        this.bodyData[11] = new Array();
                    }
                    else if(part == msMoudle.partType.tLongcoat) {
                        this.bodyData[22] = new Array();
                        this.bodyData[23] = new Array();
                        this.bodyData[34] = new Array();
                    }
                    else if(part == msMoudle.partType.tPants) {
                        this.bodyData[12] = new Array();
                    }
                    else if(part == msMoudle.partType.tGlove) {
                        this.bodyData[36] = new Array();
                        this.bodyData[37] = new Array();
                    }
                    else if(part == msMoudle.partType.tHair) {
                        this.bodyData[13] = new Array();
                        this.bodyData[14] = new Array();
                        this.bodyData[15] = new Array();
                    }
                    else if(part == msMoudle.partType.tTamingMob) {
                        this.bodyData[16] = new Array();
                        this.bodyData[35] = new Array();

                        this.bodyData[17] = new Array();
                        this.bodyData[18] = new Array();
                    }
                    else if(part == msMoudle.partType.tShoes) {
                        this.bodyData[19] = new Array();
                    }
                    else if(part == msMoudle.partType.tCape) {
                        this.bodyData[20] = new Array();
                    }
                    else if(part == msMoudle.partType.tCap) {
                        this.bodyData[21] = new Array();
                        this.bodyData[32] = new Array();
                        this.bodyData[33] = new Array();
                    }
                    else if(part == msMoudle.partType.tFWeapon) {
                        this.bodyData[24] = new Array();
                        this.bodyData[25] = new Array();
                        this.bodyData[26] = new Array();
                        this.bodyData[27] = new Array();
                    }
                }

                if(part != msMoudle.partType.tFace && part != msMoudle.partType.tAfterimage) {
                    for(let i:number = 0; i < msMoudle.tNum; i++) {
                        if( (part == msMoudle.partType.tAll || part == i) || (i == msMoudle.partType.tHair) ) {
                            if(this.partIndex[i] != "N") {
                                for(let frameindex:number = 0; frameindex < actionMap.length; frameindex++) {//帧数外层循环必须是
                                    if(actionMap[frameindex] && msMoudle.wz[this.partIndex[i]] && actionMap[frameindex].action) {
                                        if(i == msMoudle.partType.tBody) {
                                            //body数据分拆出来作为长期保护的内存
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];

                                            //不知道为什么数据丢失
                                            if(!data && actionMap[frameindex].action == "prone") {
                                                data = new Object();
                                                data["prone.0.body"] = "../../proneStab/0/body";
                                                data["prone.0.arm"] = "../../proneStab/0/arm";
                                                data["prone.0.face"] = "1";
                                            }

                                            if(data) {
                                                this.loadPart(i, "body", msMoudle.partDirs[i], 0, data, actionMap[frameindex]);
                                                this.loadPart(i, "arm", msMoudle.partDirs[i], 1, data, actionMap[frameindex]);
                                                this.loadPart(i, "hand", msMoudle.partDirs[i], 2, data, actionMap[frameindex]);
                                                this.loadPart(i, "lHand", msMoudle.partDirs[i], 3, data, actionMap[frameindex]);
                                                this.loadPart(i, "rHand", msMoudle.partDirs[i], 4, data, actionMap[frameindex]);
                                                this.loadPart(i, "armOverHair", msMoudle.partDirs[i], 9, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tHead) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) this.loadPart(i, "head", msMoudle.partDirs[i], 5, data, actionMap[frameindex]);
                                        }
                                        else if(i == msMoudle.partType.tWeapon) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                this.loadPart(i, "weapon", msMoudle.partDirs[i], 7, data, actionMap[frameindex]);
                                                this.loadPart(i, "weaponOverBody", msMoudle.partDirs[i], 38, data, actionMap[frameindex]);
                                                this.loadPart(i, "weaponOverArm", msMoudle.partDirs[i], 39, data, actionMap[frameindex]);
                                                this.loadPart(i, "weaponArmOverHair", msMoudle.partDirs[i], 40, data, actionMap[frameindex]);
                                                this.loadPart(i, "weaponOverGlove", msMoudle.partDirs[i], 41, data, actionMap[frameindex]);
                                                this.loadPart(i, "weapon2", msMoudle.partDirs[i], 42, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tFWeapon) {
                                            //这里加上weapon的类型
                                            let data:any = msMoudle.wz[this.partIndex[i]][ msMoudle.getWeaponCat(this.partIndex[msMoudle.partType.tWeapon]) + "." + actionMap[frameindex].action ];
                                            if(data) {
                                                //比如30可能转45
                                                //后面的都不能去依据这个处理
                                                this.loadPart(i, "weapon", msMoudle.partDirs[i], 24, data, actionMap[frameindex]);
                                                this.loadPart(i, "weapon1", msMoudle.partDirs[i], 25, data, actionMap[frameindex]);
                                                this.loadPart(i, "weapon2", msMoudle.partDirs[i], 26, data, actionMap[frameindex]);
                                                this.loadPart(i, "weapon3", msMoudle.partDirs[i], 27, data, actionMap[frameindex]);
                                                this.loadPart(i, "effect", msMoudle.partDirs[i], 28, data, actionMap[frameindex]);
                                                this.loadPart(i, "effect1", msMoudle.partDirs[i], 29, data, actionMap[frameindex]);
                                                this.loadPart(i, "effect2", msMoudle.partDirs[i], 30, data, actionMap[frameindex]);
                                                this.loadPart(i, "effect3", msMoudle.partDirs[i], 31, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tCoat) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                this.loadPart(i, "mail", msMoudle.partDirs[i], 10, data, actionMap[frameindex]);
                                                this.loadPart(i, "mailArm", msMoudle.partDirs[i], 11, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tLongcoat) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                this.loadPart(i, "mail", msMoudle.partDirs[i], 22, data, actionMap[frameindex]);
                                                this.loadPart(i, "mailArm", msMoudle.partDirs[i], 23, data, actionMap[frameindex]);
                                                this.loadPart(i, "mailback", msMoudle.partDirs[i], 34, data, actionMap[frameindex]);

                                            }
                                        }
                                        else if(i == msMoudle.partType.tPants) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) this.loadPart(i, "pants", msMoudle.partDirs[i], 12, data, actionMap[frameindex]);
                                        }
                                        else if(i == msMoudle.partType.tGlove) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                this.loadPart(i, "lGlove", msMoudle.partDirs[i], 36, data, actionMap[frameindex]);
                                                this.loadPart(i, "rGlove", msMoudle.partDirs[i], 37, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tHair) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                if(this.partIndex[msMoudle.partType.tCap] == "N") {
                                                    this.loadPart(i, "hairOverHead", msMoudle.partDirs[i], 13, data, actionMap[frameindex]);
                                                    this.loadPart(i, "backHair", msMoudle.partDirs[i], 14, data, actionMap[frameindex]);
                                                }
                                                else {
                                                    this.loadPart(i, "hair", msMoudle.partDirs[i], 13, data, actionMap[frameindex]);
                                                    this.loadPart(i, "backHairBelowCap", msMoudle.partDirs[i], 14, data, actionMap[frameindex]);
                                                }
                                                this.loadPart(i, "hairBelowBody", msMoudle.partDirs[i], 15, data, actionMap[frameindex]);
                                            }
                                        }
                                        else if(i == msMoudle.partType.tShoes) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) this.loadPart(i, "shoes", msMoudle.partDirs[i], 19, data, actionMap[frameindex]);
                                        }
                                        else if(i == msMoudle.partType.tCape) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) this.loadPart(i, "cape", msMoudle.partDirs[i], 20, data, actionMap[frameindex]);
                                        }
                                        else if(i == msMoudle.partType.tCap) {
                                            let data:any = msMoudle.wz[this.partIndex[i]][actionMap[frameindex].action];
                                            if(data) {
                                                this.loadPart(i, "default", msMoudle.partDirs[i], 21, data, actionMap[frameindex]);
                                                this.loadPart(i, "defaultAc", msMoudle.partDirs[i], 32, data, actionMap[frameindex]);
                                                this.loadPart(i, "hairBelowBody", msMoudle.partDirs[i], 33, data, actionMap[frameindex]);
                                            }
                                        }
                                    }
                                    else {
                                        console.log("actionmap异常")
                                    }

                                    ////单帧
                                    if(this.is_oneFrame) {
                                        this.actionMap.length = 1;
                                        break ;
                                    }

                                }
                            }
                        }
                    }
                }

                if(part == msMoudle.partType.tAll || msMoudle.partType.tFace == part) {
                    if(msMoudle.wz[this.partIndex[msMoudle.partType.tFace]]) {
                        let data:any = msMoudle.wz[this.partIndex[msMoudle.partType.tFace]][faceid];
                        if(data) this.loadFace(msMoudle.partType.tFace, faceid, msMoudle.partDirs[msMoudle.partType.tFace], 6, data);
                    }
                }
                //光效
                if(msMoudle.findKeyFromArr(this.m_action, this.m_action_list)) {
                    if(msMoudle.wz[this.partIndex[msMoudle.partType.tAfterimage]]) {
                        let data:any = msMoudle.wz[this.partIndex[msMoudle.partType.tAfterimage]]["0"];
                        if(data) {
                            this.bodyData[8] = new Array();
                            this.loadAfterimage(msMoudle.partType.tAfterimage, "0", msMoudle.partDirs[msMoudle.partType.tAfterimage], 8, data);
                        }
                    }
                }
                //坐骑
                if(part == msMoudle.partType.tAll || msMoudle.partType.tTamingMob == part) {
                    this.bodyData[16] = new Array();
                    this.bodyData[35] = new Array();
                    this.bodyData[17] = new Array();
                    this.bodyData[18] = new Array();
                    this.tamingmobnavelX = 0;
                    this.tamingmobnavelY = 0;
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0]!= "N") {
                        //处理坐骑
                        let data:any = msMoudle.wz[this.partIndex[msMoudle.partType.tTamingMob]][this.m_action];
                        if(data) {
                            this.loadTamingMob(msMoudle.partType.tTamingMob, "0", msMoudle.partDirs[msMoudle.partType.tTamingMob], 16, data);
                            ///这里
                            this.loadTamingMob(msMoudle.partType.tTamingMob, "1", msMoudle.partDirs[msMoudle.partType.tTamingMob], 35, data);
                        }
                        // 处理鞍子
                        if( msMoudle.wz[this.partIndex[msMoudle.partType.tTamingMob0]]) {
                            let data0:any = msMoudle.wz[this.partIndex[msMoudle.partType.tTamingMob0]][this.tamingmobname + "." + this.m_action];
                            if(data0) {
                                this.loadTamingMob0(msMoudle.partType.tTamingMob0, "0", msMoudle.partDirs[msMoudle.partType.tTamingMob], 17, data0);
                                this.loadTamingMob0(msMoudle.partType.tTamingMob0, "1", msMoudle.partDirs[msMoudle.partType.tTamingMob], 18, data0);
                            }
                        }
                    }
                }


                // console.log("一直在走这里？？？？？    " + part);
                this.setPos(this.m_x, this.m_y);
                let res:Array<any> = [];
                for(let i:number = 0; i < this.res.length; i++) {
                    if(!Laya.loader.getRes(this.res[i])) {
                        res.push({ url: this.res[i] });
                    }
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        this.m_complete = true;
                        for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                        msMoudle.resTip(res);
                        this.setAction(part, loop);//注意这个是动作
                        // this.setPos(this.m_x, this.m_y);

                        // for(let i:number = 0; i < this.m_otherPetLst.length; i++) {
                        //     if(this.m_otherPetLst[i]) {
                        //         this.m_otherPet[i].setPos(this.m_x + 30 * i, this.m_y);
                        //     }
                        // }

                    });
                }
                else {
                    this.m_complete = true;
                    this.setAction(part, loop);//注意这个是动作
                    // this.setPos(this.m_x, this.m_y);

                    // for(let i:number = 0; i < this.m_otherPetLst.length; i++) {
                    //     if(this.m_otherPetLst[i]) {
                    //         this.m_otherPet[i].setPos(this.m_x + 30 * i, this.m_y);
                    //     }
                    // }
                }
            }
        }
        m_loadRes:Array<any> = [];
        private setAction(part:number, loop:number) : void {
            // console.log(loop)
            if(part == msMoudle.partType.tAll || part != msMoudle.partType.tFace) {
                Laya.timer.clear(this, this.doAction);
                // Laya.timer.once(0, this, this.doAction, [0, loop]);
                this.doAction(0, loop);
            }
            if(part == msMoudle.partType.tAll || part == msMoudle.partType.tTamingMob) {
                Laya.timer.clear(this, this.tamingMobAction);
                // Laya.timer.once(0, this, this.tamingMobAction, [0, 16]);
                this.tamingMobAction(0);//16
                // this.tamingMobAction2(0, 35);
            }
            if(part == msMoudle.partType.tAll || part == msMoudle.partType.tamingMob0Action) {
                Laya.timer.clear(this, this.tamingMob0Action);
                // Laya.timer.once(0, this, this.tamingMob0Action, [0]);
                this.tamingMob0Action(0);
            }
            if(part == msMoudle.partType.tAll || part == msMoudle.partType.tFace) {
                Laya.timer.clear(this, this.faceAction);
                this.faceAction(0, 6);
                //     // 开这里会报错

                // if(this.faceid != "blink" && this.faceid != "default") {
                //     this.expresstime = 0;
                // }
                // else {
                    // if(this.changeFace) {
                    //     if(msMoudle.mapP) {
                    //             this.changeFace = false;
                    //             Laya.timer.clear(this, this.expressTime);
                    //             this.expresstime = 0;
                    //             Laya.timer.loop(500, this, this.expressTime);
                    //         }
                    //     }
                // }
            }
        }
        // changeFace:boolean = true;
        private expressTime() : void {
            if(this.faceid != "default") {
                this.changeExpress("default", false);
            }
            // this.expresstime = this.expresstime + 500;
            // if(this.faceid == "default") {
            //     if(this.expresstime >= 3000) {
            //         this.changeExpress("blink");
            //         // this.faceid = "blink";
            //     }
            // }
            // else if(this.faceid == "blink"){
            //     if(this.expresstime > 3250) {
            //         this.changeExpress("default");
            //         // this.faceid = "default";
            //         this.expresstime = 0;
            //     }
            // }
            // else {
            //     if(this.expresstime >= 3000) {
            //         // this.faceid = "default";
            //         this.changeExpress("default");
            //         this.expresstime = 0;
            //     }
            // }
        }
        private doAction(frameIndex:number, loop:number) : void {


            // console.log(this.m_action + "   " + loop);
            if(this.bodyData[0]) {

                //中断持续技能
                if( (this.skillId == "3321040" || this.skillId == "65121003" || this.skillId == "3221001" || this.skillId == "13121001") && msMoudle.key_down == false) {
                    this.skillId = "N";
                    this.is_skill = false;
                    this.changeByName("stand", 0);              ///这一句为什么会有问题?????
                    return ;
                }

                if(frameIndex >= this.bodyData[0].length) {
                    frameIndex = 0;
                    //持续按的技能
                    if( (this.skillId == "3321040" || this.skillId == "65121003" || this.skillId == "3221001" || this.skillId == "13121001") && msMoudle.key_down) {}
                    else {
                        if(loop != 0) {
                            if(this.m_action != "sit" && this.m_action != "jump") {
                                this.is_skill = false;
                                this.changeByName("stand", 0);              ///这一句为什么会有问题?????
                                return ;
                            }
                        }
                        else {
                            ////防止部分逻辑bug
                            if(this._autofight == true) {
                                if(this.m_action.indexOf("walk") < 0) {
                                    this.is_skill = false;
                                    this.changeByName("stand", 0);
                                    return ;//////修改了这里
                                }
                            }
                        }
                    }
                }

                this.cur_body_frame = frameIndex;
                if(this.hpBar) {
                    if(this.bodyData[5] && this.bodyData[5][0] && this.bodyData[5][frameIndex]) {
                        this.hpBar.pos(-this.m_dir * (Number(this.bodyData[5][0].orgx) - Number(this.bodyData[5][frameIndex].orgx)) - this.hpBar.width / 2,
                        Number(this.bodyData[5][frameIndex].orgy) -30);
                    }
                }
                this.drawCharacter(frameIndex);

                if(this.is_skill) {
                    ////这里主要比较正规的技能计算的
                    //无双枪就用afterimage的碰撞帧
                    //魔法双击??????
                    if( msMoudle.isAftSkill(this.skillId) == false &&         //无双枪     this.skillId != "1311003"
                        this.skillId != "2001005" &&           //魔法双击
                        this.skillId != "2201004" &&           //冰冻术
                        this.skillId != "2201005" &&           //雷电术
                        this.skillId != "2211002" &&
                        this.skillId != "1001004" &&            //强力一击
                        this.skillId != "4211004" &&            //分身术
                        this.skillId != "1001005" //&&            //群体攻击
                        // this.skillId != "2301002"               //群体治愈
                    ) {
                        let lt:any = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".level.30.lt"]);
                        let rb:any = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".level.30.rb"]);
                        if(lt.x == -999 || lt.y == -999 || rb.x == -999 || rb.y == -999) {
                            lt = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".common.lt"]);
                            rb = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".common.rb"]);
                        }
                        let a:any = new Object();
                        a.l = Number(lt.x);
                        a.t = Number(lt.y);
                        // if(this.skillId != "1311006") {
                        //     a.r = -0;//Number(rb.x);
                        // }
                        // else {
                        a.r = Number(rb.x);
                        a.b = Number(rb.y);

                        if(this.skillId == "3111003" || this.skillId == "3211003") {
                            a.l = 0;
                            a.t = Number(lt.y) - Number(rb.y);
                            a.r = Number(lt.x) - Number(rb.x);
                            a.b = 0;
                        }
                        else if(this.skillId == "3111004" || this.skillId == "3211004" || this.skillId == "13111000") {
                            a.t = Number(lt.y) - Number(rb.y);
                        }

                        if(this.skillId == "4201005" || this.skillId == "5121007" || this.skillId == "5101003") {///杀杀杀,技能里面没有lt,rb需要用动作的aft
                            let data:any = msMoudle.wz[this.partIndex[msMoudle.partType.tAfterimage]]["0"];
                            let aft:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
                            let wea_act:string = msMoudle.getWeaponAct(this.partIndex[msMoudle.partType.tWeapon]);
                            let lt: any = msMoudle.Vec2FromArr(data["0" + "." + wea_act + ".lt"]);
                            let rb: any = msMoudle.Vec2FromArr(data["0" + "." + wea_act + ".rb"]);
                            let weaRange = msMoudle.getWeaponRange(this.partIndex[msMoudle.partType.tWeapon]);
                            a.l = Number(lt.x);
                            a.t = Number(lt.y);
                            a.r = Number(rb.x);
                            a.b = Number(rb.y);
                        }

                        // msMoudle.toast(a.l + "")///////

                        this.drawSkillBound(a);
                        /// || this.skillId == "4211006"----没有动作

                        // console.log("%%%%", frameIndex, this.actionMap[frameIndex])
                         let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                        //如果有指定hitAfter，就不应该再去取delay > 0的帧。
                        //这里怕出问题，只对法师全屏处理一下
                        if(hitAfter && msMoudle.isTileSkill(this.skillId)) {
                            if(frameIndex == 0) {
                                // console.log("33333")
                                this.judgeBound();
                            }
                        }
                        else if( (this.actionMap[frameIndex] &&  this.actionMap[frameIndex].delay > 0) ||
                        (this.m_action == "alert" && this.skillId == "4211006")
                         || this.skillId == "3111003"
                         || this.skillId == "3211003"
                         || this.skillId == "3111004"
                         || this.skillId == "13111000"
                         || this.skillId == "3211004"
                         || this.skillId == "32121004"
                         || this.skillId == "164121044"
                         || this.skillId == "152110001"
                         || this.skillId == "22171095") {          ///技能的碰撞帧
                            if(this.skillId == "1311006" || this.skillId == "1111008") msMoudle.Shake(Laya.stage);
                            ///如果有
                            // let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                            if(hitAfter && msMoudle.isTileSkill(this.skillId) == false) {
                                // console.log("1111")
                                Laya.timer.once(Number(hitAfter) / (this.m_atkspeed + this.p_atkspeed), this, this.judgeBound, null, false);
                            }
                            else {
                                if(this.skillId == "2301002" || this.skillId == "2311004" || this.skillId == "4211006") {
                                // || this.skillId == "3111003"
                                // || this.skillId == "3111004") {
                                    // console.log("222")
                                    if(frameIndex == this.bodyData[7].length - 1) {
                                        this.judgeBound();  //只触发一次  而且不应该打空
                                    }
                                }
                                else {
                                    // console.log("333")
                                    this.judgeBound();
                                }
                            }
                        }
                    }
                    else {
                        /////这些主要是延迟计算的
                        /////或者是普通的afterimage计算的
                        if(
                            this.skillId == "2001005" ||        //魔法双击
                            this.skillId == "2201004" ||        //冰冻术
                            this.skillId == "2201005" ||        //雷电术
                            this.skillId == "2211002" ||        //冰咆哮
                            this.skillId == "1001004" ||        //强力一击
                            this.skillId == "4211004" ||        //分身术----这里肯定不对
                            this.skillId == "1001005"// ||
                            // this.skillId == "2301002"           //群体治愈
                        ) {
                            if(frameIndex == this.bodyData[7].length - 1) {
                                // console.log("#44444")
                                this.judgeBound();  //只触发一次  而且不应该打空
                            }
                        }
                        else {
                            if(msMoudle.isAftSkill(this.skillId) == false) {
                                // console.log("#5555")
                                this.judgeBound();
                            }
                        }
                    }
                }

                if(this.bodyData[0].length > 1) {
                    if(this.actionMap[frameIndex].delay != 0) {
                        let _delay:number = 100;
                        if(this.actionMap[frameIndex]) _delay = this.actionMap[frameIndex].delay;
                        Laya.timer.once(Math.abs(_delay / ((this.m_atkspeed + this.p_atkspeed) / 1) + ((ms.speed - 1) / 1) ), this, this.doAction, [frameIndex + 1, loop]);
                    }
                    else {
                        Laya.timer.once(this.bodyData[0][frameIndex].delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, this.doAction, [frameIndex + 1, loop]);
                    }
                }
                else {
                    //防止某些大技能只有一个动作
                    let _delay:number = 100;
                    if(this.actionMap[frameIndex]) _delay = this.actionMap[frameIndex].delay;
                    if(_delay >= 90) {
                        Laya.timer.once(Math.abs(_delay * 2 / ((this.m_atkspeed + this.p_atkspeed) / 1) + ((ms.speed - 1) / 1) ), this, this.doAction, [frameIndex + 1, loop]);
                    }
                }

            }
        }
        private faceAction(frameIndex:number, partindex:number) : void {
            if(this.bodyData[partindex]) {
                if(this.bodyData[partindex].length > 0) {
                    if(frameIndex >= this.bodyData[partindex].length) frameIndex = 0;
                    this.cur_face_frame = frameIndex;
                    let _faceData:any = this.bodyData[partindex][frameIndex];
                    if(this.bodyAni[partindex]) {
                        this.bodyAni[partindex].skin = "";
                        if(this.bodyData[0][this.cur_body_frame]) {
                            if(this.bodyData[0][this.cur_body_frame].face) {
                                if(this.m_bianshen == true) {
                                    if((this.teamIndex == 100 || this.otherP)) {
                                        this.bodyAni[partindex].skin = "";
                                    }
                                    else
                                        this.bodyAni[partindex].skin = _faceData.tex;
                                }
                                else
                                    this.bodyAni[partindex].skin = _faceData.tex;
                            }
                        }
                        this.bodyAni[partindex].zOrder = Number(_faceData.z);
                        this.bodyAni[partindex].pos(this.headbrowX[this.cur_head_frame] - Number(_faceData.browInfo.x) - Number(_faceData.oringinInfo.x) + this.tamingmobnavelX,
                            this.headbrowY[this.cur_head_frame] - Number(_faceData.browInfo.y) - Number(_faceData.oringinInfo.y) + this.tamingmobnavelY);
                    }
                    if(this.bodyData[partindex].length > 1) Laya.timer.once(_faceData.delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1) ), this, this.faceAction, [frameIndex + 1, partindex]);
                }
            }
        }
        private afterimageAction(frameIndex:number, partindex:number) : void {
            if(this.bodyData[partindex]) {
                if(this.bodyData[partindex].length > 0) {
                    if(frameIndex >= this.bodyData[partindex].length) frameIndex = 0;

                    let _bodyData:any = this.bodyData[partindex][frameIndex];
                    this.bodyAni[partindex].skin = _bodyData.tex;
                    this.bodyAni[partindex].zOrder = Number(_bodyData.z);
                    this.bodyAni[partindex].pos(_bodyData.orgx, _bodyData.orgy);
                    msMoudle._alphasp(this.bodyAni[partindex], _bodyData.delay / ((this.m_atkspeed + this.p_atkspeed) / 1) + ((ms.speed - 1) / 1));

                    // console.log(_bodyData)
                    this.drawAtkBound(_bodyData);


                    if(frameIndex == 0) {
                        //拳套有aft而弓，弩没有
                        if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "拳套") {
                            this.judgeBound();  ///为什么会碰撞多次???
                        }
                    }

                    if(this.bodyData[partindex].length > 1) {
                        if(frameIndex + 1 < this.bodyData[partindex].length)
                            Laya.timer.once(_bodyData.delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, this.afterimageAction, [frameIndex + 1, partindex]);
                    }
                }
            }
        }
        private tamingMobAction(frameIndex:number) : void {
            let tList:Array<any> = [16, 35];
            for(let _m:number = 0; _m < tList.length; _m++) {
                let partindex = tList[_m];
                if(this.bodyData && this.bodyData[partindex]) {
                    // console.log("@@@@@", partindex,this.bodyData[partindex].length)
                    if(this.bodyData[partindex].length > 0) {
                        if(frameIndex >= this.bodyData[partindex].length) frameIndex = 0;
                        let _bodyData:any = this.bodyData[partindex][frameIndex];
                        this.bodyAni[partindex].skin = _bodyData.tex;
                        this.bodyAni[partindex].zOrder = Number(_bodyData.z);
                        this.bodyAni[partindex].pos(_bodyData.orgx, _bodyData.orgy);

                        if(partindex == 16) {
                            if(this.bodyData[0][this.cur_body_frame]) {
                                ///坐骑的坐标偏移
                                this.tamingmobnavelX =  _bodyData.navelInfo.x - this.bodyData[0][this.cur_body_frame].navelInfo.x;
                                this.tamingmobnavelY = _bodyData.navelInfo.y - this.bodyData[0][this.cur_body_frame].navelInfo.y;
                                this.drawCharacter(this.cur_body_frame);
                                if(this.bodyData[partindex].length > 1)
                                Laya.timer.once(_bodyData.delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, this.tamingMobAction, [frameIndex + 1, partindex]);
                            }
                        }
                    }
                }
            }
        }

        private tamingMob0Action(frameIndex:number) : void {
            if(this.bodyData && this.bodyData[17]) {
                for(let partindex:number = 17; partindex < 19; partindex++) {
                    if(this.bodyData[partindex]) {
                        if(this.bodyData[partindex].length > 0) {
                            if(frameIndex >= this.bodyData[partindex].length) frameIndex = 0;
                            this.bodyAni[partindex].skin = this.bodyData[partindex][frameIndex].tex;
                            this.bodyAni[partindex].zOrder = Number(this.bodyData[partindex][frameIndex].z);
                            this.bodyAni[partindex].pos(this.bodyData[partindex][frameIndex].orgx, this.bodyData[partindex][frameIndex].orgy);
                        }
                    }
                }
                if(this.bodyData[17].length > 0) {
                    if(this.bodyData[16].length > 1)  Laya.timer.once(this.bodyData[16][frameIndex].delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, this.tamingMob0Action, [frameIndex + 1]);
                }
            }
        }

        private changeAction(frameIndex:number, act:string) : void {
            //变身
            // if(msMoudle.mapP && msMoudle.m_bianshen && msMoudle.idOldMap(msMoudle.mapP.m_id) && (this.teamIndex == 100 || this.otherP)) {
            //     if(this.bodyChange) this.bodyChange.skin = "res/Morph/" + this.m_bs_id + ".img/" + this.m_action + "." + frameIndex + ".png";
            // }
            if(this.m_bianshen == false) return ;

            if(this.bodyChangeData) {
                if(this.bodyChangeData.length > 0) {
                    if(frameIndex >= this.bodyChangeData.length) {
                        frameIndex = 0;
                        if(act != "stand" && act != "walk" && act != "jump" && act != "ladder") {
                            return ;
                        }
                    }
                    // if(this.bodyChangeData[frameIndex] && this.bodyChange) {
                    // console.log(this.bodyChangeData[frameIndex], frameIndex)
                    if(this.bodyChangeData[frameIndex] && this.bodyChange) {
                        this.bodyChange.skin = this.bodyChangeData[frameIndex].tex;
                        this.bodyChange.pos(this.bodyChangeData[frameIndex].orgx, this.bodyChangeData[frameIndex].orgy);
                    }
                }
                if(this.bodyChangeData.length > 1) {
                    if(this.bodyChangeData[frameIndex]) {
                        Laya.timer.once(this.bodyChangeData[frameIndex].delay / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, this.changeAction, [frameIndex + 1, act]);
                    }
                }
            }

        }

        private drawCharacter(frameIndex:number) : void {

            this.drawBound();

            //分身
            if(msMoudle.mapP && this.m_fenshen && msMoudle.idOldMap(msMoudle.mapP.m_id) && (this.teamIndex == 100 ||  this.otherP)) {
                if(this.bodyCopy) this.bodyCopy.skin = "res/Skill/411.img/skill.4111002.special." + this.m_action + "." + frameIndex + ".png";
            }

            for(let partindex:number = 0; partindex < this.maxpart; partindex++) {

                //
                if(partindex != 6 && partindex != 8 && partindex != 16 && partindex != 17 && partindex != 18 && partindex != 35) {
                    if(this.bodyData[partindex] && this.bodyAni[partindex]) {
                        this.bodyAni[partindex].skin = "";
                        if(this.bodyData[partindex].length > 0) {
                            let _bodyData:any = this.bodyData[partindex][frameIndex];
                            if(_bodyData) {
                                ///防止z轴NAN的问题
                                if(_bodyData.z) {

                                    if((this.teamIndex == 100 || this.otherP)) {
                                        if(this.m_bianshen == false) {
                                            if(partindex == 7)  {//Weapon
                                                if(this.partIndex[msMoudle.partType.tFWeapon] == "N")
                                                    this.bodyAni[partindex].skin = _bodyData.tex;
                                            }
                                            else
                                                this.bodyAni[partindex].skin = _bodyData.tex;

                                        }
                                        else {
                                            this.bodyAni[partindex].skin = "";
                                        }
                                    }
                                    else {
                                        if(partindex == 7)  {//Weapon
                                            if(this.partIndex[msMoudle.partType.tFWeapon] == "N")
                                                this.bodyAni[partindex].skin = _bodyData.tex;
                                        }
                                        else
                                            this.bodyAni[partindex].skin = _bodyData.tex;
                                    }

                                    this.bodyAni[partindex].zOrder = Number(_bodyData.z);
                                    this.bodyAni[partindex].pos(_bodyData.orgx + this.tamingmobnavelX + _bodyData.movex, _bodyData.orgy + this.tamingmobnavelY + _bodyData.movey);

                                    /////戒指也是因为这个没有偏移
                                    if(this.setEff && partindex == 21) {
                                        let changeX = this.bodyData[21][frameIndex].orgx * this.m_dir + this.tamingmobnavelX +
                                        this.bodyAni[21].width / 2 * this.m_dir;
                                        let changeY = this.bodyData[21][frameIndex].orgy + this.tamingmobnavelY +
                                        this.bodyAni[21].height * 1.5;
                                        // console.log(this.bodyData[21][frameIndex].orgx, this.bodyData[21][frameIndex].orgy)
                                        this.setEff.m_hero_x = changeX;
                                        this.setEff.m_hero_y = changeY;
                                    }
                                    if(this.charEff) {
                                        this.charEff.m_hero_x = this.tamingmobnavelX;
                                        this.charEff.m_hero_y = this.tamingmobnavelY;
                                    }
                                    // if(this.charEff2) {
                                    //     this.charEff2.m_hero_x = this.tamingmobnavelX;
                                    //     this.charEff2.m_hero_y = this.tamingmobnavelY;
                                    // }
                                    // if(this.charEff3) {
                                    //     this.charEff3.m_hero_x = this.tamingmobnavelX;
                                    //     this.charEff3.m_hero_y = this.tamingmobnavelY;
                                    // }


                                    ////远程不走afterimage
                                    if(msMoudle.mapP) {
                                        if(this.is_skill == false &&
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "拳套" &&
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "短枪" &&
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "弓" &&
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "远古弓" &&
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) != "弩") {
                                            if(msMoudle.isWeaponPartIndex(partindex)) {             //Weapon
                                                if(frameIndex == this.bodyData[partindex].length - 1) {
                                                    this.afterimageAction(0, 8);///这样调用2次会有问题
                                                }
                                            }
                                        }
                                        else {
                                            if(msMoudle.isWeaponPartIndex(partindex)) {             //Weapon
                                                if(frameIndex == this.bodyData[partindex].length - 1) {
                                                    this.afterimageAction(0, 8);
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }

            ///这里以后可以重新doFace试试
            if(this.bodyData[6] && this.bodyAni[6]) {
                this.cur_head_frame = frameIndex;

                /////有些帧的统计肯定有问题
                if(!this.bodyData[0][frameIndex]) {
                    this.bodyData[0][frameIndex] = new Object();
                    this.bodyData[0][frameIndex].movex = 0;
                    this.bodyData[0][frameIndex].movey = 0;
                }

                if(this.bodyData[6][this.cur_face_frame]) {

                    ///防止看不见眼睛问题
                    if(this.m_bianshen == false) {
                        if(this.bodyAni[6].skin == "" && this.m_action.indexOf("ladder") < 0) {
                            // console.log("xxx", this.bodyData[6][this.cur_face_frame].face)
                            this.bodyAni[6].skin = 'res/Character/Face/00020012.img/default.face.png';
                        }
                    }

                    this.bodyAni[6].pos(
                        this.headbrowX[frameIndex] - Number(this.bodyData[6][this.cur_face_frame].browInfo.x) - Number(this.bodyData[6][this.cur_face_frame].oringinInfo.x) + this.tamingmobnavelX + Number(this.bodyData[0][frameIndex].movex),
                        this.headbrowY[frameIndex] - Number(this.bodyData[6][this.cur_face_frame].browInfo.y) - Number(this.bodyData[6][this.cur_face_frame].oringinInfo.y) + this.tamingmobnavelY + Number(this.bodyData[0][frameIndex].movey));
                }
            }
        }
        private loadPart(parttype:number, partname:string, pathname:string, partindex:number, data:any, actionMap:any) : void {
            //root只能判断是否有该帧，不能作为资源的路径读取去拼接(千万注意)
            this.bodyData[partindex][actionMap.frameindex] = new Object();
            let root:string = actionMap.action + "." + Number(actionMap.frame) + "." + partname;

            // let newroot:string = "";
            if(partindex == 24 || partindex == 25 || partindex == 26 || partindex == 27 || partindex == 28 || partindex == 29 ||
                partindex == 30 || partindex == 31) {
                let _WeaponCat:string = msMoudle.getWeaponCat(this.partIndex[msMoudle.partType.tWeapon]);
                root = _WeaponCat + "." + root;
                // newroot = root;
                // console.log(root)
                if(!data[root]) {
                    //////时装的某些字段没有weapon   .......
                    //../30/stabOF
                    root = _WeaponCat + "." + actionMap.action;
                }
            }

            if(data[root]) {
                // if(partindex == 24 || partindex == 25 || partindex == 26 || partindex == 27) console.log(root)
                //     console.log("___    " + data[root])
                //     // if(newroot != "") root = newroot;
                // }
                // else
                // if(pathname == "Weapon" && (this.teamIndex == 100 || this.otherP)) {
                //     console.log(data[root])
                // }
                this.linkPart(parttype, partname, pathname, partindex, data, root, actionMap);      //这个的frame和实际data的frame不是一回事
            }
            // else {
            //     if(pathname == "Weapon" && (this.teamIndex == 100 || this.otherP)) {
            //         console.log("gggg", data, root)
            //     }
            // }
        }
        private loadFace(parttype:number, partname:string, pathname:string, partindex:number, data:any) : void {
            let frameindex:number = 0;
            while(true) {
                if(partname == "default") {
                    let root:string = "default.face";
                    this.bodyData[partindex][frameindex] = new Object();
                    this.linkFace(parttype, partname, pathname, partindex, data, root, frameindex);
                    frameindex = frameindex + 1;
                    break;
                }
                else {
                    let root:string = partname + "." + frameindex + ".face";
                    if(data[root]) {
                        this.bodyData[partindex][frameindex] = new Object();
                        this.linkFace(parttype, partname, pathname, partindex, data, root, frameindex);
                        frameindex = frameindex + 1;
                    }
                    else break;
                }
            }
        }
        //skill.1311004.afterimage.poleArm.swingP1.2.0
        //skill.1311003.afterimage.spear.swingP1.2.0.png
        private loadAfterimage(parttype:number, partname:string, pathname:string, partindex:number, data:any) : void {
            let frameindex:number = 0;
            while(true) {
                let root:string = partname + "." + this.m_action + "." + (this.bodyData[7].length - 1) + "." + frameindex;        //技能这样处理肯定有问题
                if(data[root]) {
                    this.bodyData[partindex][frameindex] = new Object();
                    this.linkAfterimage(parttype, partname, pathname, partindex, data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }
            // console.log(this.bodyData[partindex])
        }
        private loadTamingMob(parttype:number, partname:string, pathname:string, partindex:number, data:any) {
            let frameindex:number = 0;
            while(true) {
                let root:string = this.m_action + "." + frameindex + "." + partname;
                // console.log("@@@",root,data)
                if(data[root]) {
                    this.bodyData[partindex][frameindex] = new Object();
                    this.linkTamingMob(parttype, partname, pathname, partindex, data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }
        }
        private loadTamingMob0(parttype:number, partname:string, pathname:string, partindex:number, data:any) : void {
            let frameindex:number = 0;
            while(true) {
                let root:string = this.tamingmobname + "." + this.m_action + "." + frameindex + "." + partname;
                // console.log("###",root,data)
                if(data[root]) {
                    // console.log(data[root]);
                    this.bodyData[partindex][frameindex] = new Object();
                    this.linkTamingMob0(parttype, partname, pathname, partindex, data, root, frameindex);
                    frameindex = frameindex + 1;
                }
                else break;
            }
        }

        private loadChange(data:any, act:string) : void {
            //变身模型
            if(this.m_bianshen && (this.teamIndex == 100 || this.otherP)) {
                this.cres = [];
                let frameindex:number = 0;
                while(true) {
                    let root:string = act + "." + frameindex;
                    // console.log("###",root,data)
                    if(data[root]) {
                        // console.log(data[root]);
                        this.bodyChangeData[frameindex] = new Object();
                        // this.linkTamingMob0(parttype, partname, pathname, partindex, data, root, frameindex);
                        this.linkChange(data, root, frameindex, act);
                        frameindex = frameindex + 1;
                    }
                    else break;
                }

                Laya.timer.clear(this, this.changeAction);
                let res:Array<any> = [];
                for(let i:number = 0; i < this.cres.length; i++) {
                    if(!Laya.loader.getRes(this.cres[i])) {
                        res.push({ url: this.cres[i] });
                    }
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        this.m_complete = true;
                        for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                        msMoudle.resTip(res);
                        this.changeAction(0, act);
                    });
                }
                else {
                    this.changeAction(0, act);
                }
                //
            }
        }

        cres:Array<any> = [];
        private linkChange(data:any, root:string, frameindex:number, act:string) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);
            if(oringinInfo) {

                let str = data[root];
                //数据不可靠(需要更大的数据自由度msMoudle.wz)
                let msg:any = msMoudle.getMorPhInfo(str, act, this.m_bs_id);
                if(!msg) return ;
                if(msg.root != "") root = msg.root;
                let strMarker:string = "res/Morph/" + this.m_bs_id + ".img/" + msg.strMarker;
                this.bodyChangeData[frameindex].tex = strMarker;
                this.bodyChangeData[frameindex].orgx = 0;
                this.bodyChangeData[frameindex].orgy = 0;
                // this.bodyChangeData[frameindex].movex = this.actionData[frameindex].movex;
                // this.bodyChangeData[frameindex].movey = this.actionData[frameindex].movey;
                if(Number(str) >= 0 && Number(str) <= 100) {
                    let delay:number = this.bodyChangeData[Number(str)].delay;
                    let lt:any = this.bodyChangeData[Number(str)].lt;
                    let rb:any = this.bodyChangeData[Number(str)].rb;
                    let head:any = this.bodyChangeData[Number(str)].head;
                    this.bodyChangeData[frameindex].delay = delay ? Number(delay) : 100;
                    this.bodyChangeData[frameindex].orgx = this.bodyChangeData[Number(str)].orgx
                    this.bodyChangeData[frameindex].orgy = this.bodyChangeData[Number(str)].orgy
                }
                else if(str.indexOf("../") >= 0 && str[3] != ".") {
                    let _ = str.split("/");
                    let m = _[1] + "." + _[2];
                    let mdata:any = msMoudle.wz["M" + this.m_bs_id + ".img"][_[1]];

                    oringinInfo = msMoudle.Vec2FromArr(mdata[m + ".origin"]);
                    let delay:number = mdata[m + ".delay"];
                    let lt:any = msMoudle.Vec2FromArr(mdata[m + ".lt"]);
                    let rb:any = msMoudle.Vec2FromArr(mdata[m + ".rb"]);
                    let head:any = msMoudle.Vec2FromArr(mdata[m + ".head"]);
                    this.bodyChangeData[frameindex].delay = delay ? Number(delay) : 100;
                    if(oringinInfo.x != -999 || oringinInfo.y != -999) {
                        this.bodyChangeData[frameindex].orgx = -Number(oringinInfo.x);
                        this.bodyChangeData[frameindex].orgy = -Number(oringinInfo.y);
                    }

                }
                else {
                    let delay:number = data[root + ".delay"];
                    let lt:any = msMoudle.Vec2FromArr(data[root + ".lt"]);
                    let rb:any = msMoudle.Vec2FromArr(data[root + ".rb"]);
                    let head:any = msMoudle.Vec2FromArr(data[root + ".head"]);
                    this.bodyChangeData[frameindex].delay = delay ? Number(delay) : 100;
                    if(oringinInfo.x != -999 || oringinInfo.y != -999) {
                        this.bodyChangeData[frameindex].orgx = -Number(oringinInfo.x);
                        this.bodyChangeData[frameindex].orgy = -Number(oringinInfo.y);
                    }
                }
                /////通用部分优化
                //////这个可能不需要
                this.cres.push(strMarker);       ////这里////这里////这里////这里////这里////这里////这里
            }

            //
        }

        private linkPart(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string,
            actionMap:any) : void {
            ////////////
            let face:number = 0;
            let msg:any = null;
            if(partindex == 24 || partindex == 25 || partindex == 26 || partindex == 27 || partindex == 28 || partindex == 29 ||
                partindex == 30 || partindex == 31) {
                msg = msMoudle.get170Weapon(data[root], actionMap.action, actionMap.frame, this.partIndex[parttype], partname, root);//partname
                // console.log(msg)
                if(msg == null) {
                    // console.log(msg)
                    return ;
                }
                // console.log(partname)
            }
            else {
                if(data[root + "._inlink"]) {
                    let ____m = data[root + "._inlink"].split("/");
                    //walk1/0/weapon
                    // msg = new Object();
                    // msg.root = ____m[0] + "." + ____m[1] + "." + ____m[2];
                    // msg.act = ____m[0];
                    let ndata:any = msMoudle.wz[this.partIndex[parttype]][____m[0]];
                    if(ndata) {
                        root =  ____m[0] + "." + ____m[1] + "." + ____m[2];
                        msg = msMoudle.getCharacterInfo(ndata[root], ____m[0], this.partIndex[parttype]);
                    }
                    else {
                        console.log("link错误");
                        return ;
                    }
                }
                else
                    msg = msMoudle.getCharacterInfo(data[root], actionMap.action, this.partIndex[parttype]);
                if(!msg) return ;
            }

            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.partIndex[parttype]][msg.act];

                if(partname == "body") face = Number(data[msg.act + "." + actionMap.frame + ".face"]);
            }
            else {
                if(partname == "body") face = Number(data[actionMap.action + "." + actionMap.frame + ".face"]);
            }
            let strMarker:string = "res/Character/" + pathname + "/" + this.partIndex[parttype] + "/" + msg.strMarker;

            // if(this.m_action == "prone" && partname == "body")   console.log("xxx    " + strMarker);

            ////////////
            let delay:number = 0;
            let delaydata:any = msMoudle.wz[this.initbody][actionMap.action];
            if(delaydata) delay = delaydata[actionMap.action + "." + actionMap.frame + ".delay"];
            delay = delay ? delay : 100;

            this._(parttype, partname, pathname, partindex, data, root, actionMap.frameindex, strMarker, delay, face);
        }
        private linkFace(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string, frameindex:number) : void {
            //数据不可靠(需要更大的数据自由度msMoudle.wz)
            let delay:number = 0;
            if(root != "default.face") delay = data[this.faceid + "." + frameindex + ".delay"];
            let msg:any = msMoudle.getCharacterInfo(data[root], this.m_action, this.partIndex[parttype]);
            if(!msg) return ;
            let strMarker:string = "res/Character/" + pathname + "/" + this.partIndex[parttype] + "/" + msg.strMarker;
            this._(parttype, partname, pathname, partindex, data, root, frameindex, strMarker, delay, 0);
        }
        private linkAfterimage(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string, frameindex:number) : void {
            //数据不可靠(需要更大的数据自由度msMoudle.wz)
            let msg:any = msMoudle.getCharacterInfo(data[root], this.m_action, this.partIndex[parttype]);
            if(!msg) return ;
            if(msg.root != "") root = msg.root;
            let strMarker:string = "res/Character/" + pathname + "/" + this.partIndex[parttype] + "/" + msg.strMarker;
            let delay:number = data[partname + "." + this.m_action + "." + (this.bodyData[7].length - 1) + "." + frameindex + ".delay"];
            this._(parttype, partname, pathname, partindex, data, root, frameindex, strMarker, delay, 0);

        }
        private linkTamingMob(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string, frameindex:number) : void {
            let msg:any = null;
            if(data[root + "._inlink"]) {
                let ____m = data[root + "._inlink"].split("/");
                //walk1/0/weapon
                // msg = new Object();
                // msg.root = ____m[0] + "." + ____m[1] + "." + ____m[2];
                // msg.act = ____m[0];
                let ndata:any = msMoudle.wz[this.partIndex[parttype]][____m[0]];
                if(ndata) {
                    root =  ____m[0] + "." + ____m[1] + "." + ____m[2];
                    msg = msMoudle.getCharacterInfo(ndata[root], ____m[0], this.partIndex[parttype]);
                }
                else {
                    console.log("link错误");
                    return ;
                }
            }
            else
                msg = msMoudle.getCharacterInfo(data[root], this.m_action, this.partIndex[parttype]);

            if(!msg) return ;
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.partIndex[parttype]][msg.act];
            }
            let strMarker:string = "res/Character/" + pathname + "/" + this.partIndex[parttype] + "/" + msg.strMarker;

            let delaydata:any = msMoudle.wz[this.partIndex[msMoudle.partType.tTamingMob]][msg.act];
            let delayroot:any = root.split(".");
            let delay:number = Number(delaydata[delayroot[0] + "." + delayroot[1] + ".delay"]);
            this._(parttype, partname, pathname, partindex, data, root, frameindex, strMarker, delay, 0);
        }
        private linkTamingMob0(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string, frameindex:number) : void {

            let msg:any = msMoudle.getTamingMob0Info(data[root], this.m_action, this.tamingmobname, this.partIndex[msMoudle.partType.tTamingMob0]);
            if(msg.root != "") {
                root = msg.root;
                data = msMoudle.wz[this.partIndex[parttype]][this.tamingmobname + "." + msg.act];
            }
            let strMarker:string = "res/Character/" + pathname + "/" + this.partIndex[parttype] + "/" + msg.strMarker;
            let delay:number = 100;
            this._(parttype, partname, pathname, partindex, data, root, frameindex, strMarker, delay, 0);
        }

        private _(parttype:number, partname:string, pathname:string, partindex:number, data:any, root:string,
            frameindex:number, strMarker:string, delay:number, face:number) : void {
            let oringinInfo:any = msMoudle.Vec2FromArr(data[root + ".origin"]);

            if(oringinInfo) {
                let navelInfo: any = msMoudle.Vec2FromArr(data[root + ".map.navel"]);
                let neckInfo: any = msMoudle.Vec2FromArr(data[root + ".map.neck"]);
                let handInfo: any = msMoudle.Vec2FromArr(data[root + ".map.hand"]);
                let browInfo: any = msMoudle.Vec2FromArr(data[root + ".map.brow"]);
                let handMoveInfo: any = msMoudle.Vec2FromArr(data[root + ".map.handMove"]);

                ////这里用矛有问题

                if(pathname == "Afterimage") {
                    let strM:string = null;
                    //武器类型
                    let aft:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
                    if(aft == "poleArm") aft = "spear"; //无双矛的处理

                    // msMoudle.toast(aft + "_" + this.m_action)

                    if(this.is_skill == true) {
                        //skill.1311003.afterimage.spear.swingP1.2.0.png
                        //skill.1311004.afterimage.poleArm.swingP1.2.0.png
                        strM = this.skill_data["skill." + this.skillId + ".afterimage." + aft + "." + this.m_action + ".2.0"];
                    }
                    let lt: any = msMoudle.Vec2FromArr(data[partname + "." + this.m_action + ".lt"]);
                    let rb: any = msMoudle.Vec2FromArr(data[partname + "." + this.m_action + ".rb"]);
                    //无双枪处理
                    if(strM) {
                        let msg:any = msMoudle.getCharacterInfo(strM, this.m_action, this.partIndex[parttype]);
                        if(!msg) return ;
                        //替换资源
                        strMarker = "res/Skill/" + Math.floor(Number(this.skillId) / 10000) + ".img/" + msg.strMarker;

                        //替换oringinInfo
                        oringinInfo = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".afterimage." + aft + "." + this.m_action + ".2." + frameindex + ".origin"]);
                        //替换lt/rb
                        lt = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".afterimage." + aft + "." + this.m_action + ".lt"]);
                        rb = msMoudle.Vec2FromArr(this.skill_data["skill." + this.skillId + ".afterimage." + aft + "." + this.m_action + ".rb"]);


                    }
                    this.bodyData[partindex][frameindex].l = lt.x != -999  ? Number(lt.x) - msMoudle.getWeaponRange(this.partIndex[msMoudle.partType.tWeapon]) : -msMoudle.getWeaponRange(this.partIndex[msMoudle.partType.tWeapon]);
                    this.bodyData[partindex][frameindex].t = lt.y != -999  ? Number(lt.y) : -23;
                    this.bodyData[partindex][frameindex].r = -0;//Number(rb.x);
                    this.bodyData[partindex][frameindex].b = rb.y != -999  ? Number(rb.y) : -23;
                }

                let zInfo:any = data[root + ".z"];
                if(pathname != "TamingMob") {

                    ////可能是新版本增加了动作
                    if(!_bodyNavelInfo[frameindex]) {
                        // console.log("bodyframe_error")
                        return ;
                    }

                    if(partname == "body") {
                        _bodyNavelInfo[frameindex].x = navelInfo.x;
                        _bodyNavelInfo[frameindex].y = navelInfo.y;

                        _bodyNeckInfo[frameindex].x = neckInfo.x;
                        _bodyNeckInfo[frameindex].y = neckInfo.y;

                        _bodyHandInfo[frameindex].x = handInfo.x;
                        _bodyHandInfo[frameindex].y = handInfo.y;
                    }
                    else if(partname == "head") {
                        _headNeckInfo[frameindex].x = neckInfo.x;
                        _headNeckInfo[frameindex].y = neckInfo.y;

                        _headBrowInfo[frameindex].x = browInfo.x;
                        _headBrowInfo[frameindex].y = browInfo.y;

                        //提前记录head的偏移量
                        this.headbrowX[frameindex] = _bodyNeckInfo[frameindex].x + _headBrowInfo[frameindex].x - _headNeckInfo[frameindex].x;
                        this.headbrowY[frameindex] = _bodyNeckInfo[frameindex].y + _headBrowInfo[frameindex].y - _headNeckInfo[frameindex].y;
                    }
                    else if(partname == "arm") {
                        _armHandInfo[frameindex].x = handInfo.x;
                        _armHandInfo[frameindex].y = handInfo.y;

                        _armNavelInfo[frameindex].x = navelInfo.x;
                        _armNavelInfo[frameindex].y = navelInfo.y;
                    }
                    else if(partname == "lHand") {
                        _lHandMoveInfo[frameindex].x = handMoveInfo.x;
                        _lHandMoveInfo[frameindex].y = handMoveInfo.y;
                    }
                }

                let pos:any = {x:0, y:0};
                let offset:any = {x:0, y:0};

                if(pathname != "TamingMob") {
                    if(navelInfo.x != -999 || navelInfo.y != -999) {
                        offset.x = _bodyNavelInfo[frameindex].x - navelInfo.x;
                        offset.y = _bodyNavelInfo[frameindex].y - navelInfo.y;
                    }
                    else if(handMoveInfo.x != -999 || handMoveInfo.y != -999) {
                        offset.x = _lHandMoveInfo[frameindex].x - handMoveInfo.x;
                        offset.y = _lHandMoveInfo[frameindex].y - handMoveInfo.y;
                    }
                    else if(handInfo.x != -999 || handInfo.y != -999) {
                        offset.x = _bodyNavelInfo[frameindex].x -_armNavelInfo[frameindex].x + _armHandInfo[frameindex].x - handInfo.x;
                        offset.y = _bodyNavelInfo[frameindex].y -_armNavelInfo[frameindex].y + _armHandInfo[frameindex].y - handInfo.y;
                    }
                    else if(browInfo.x != -999 || browInfo.y != -999) {
                        offset.x = _bodyNeckInfo[frameindex].x + _headBrowInfo[frameindex].x - _headNeckInfo[frameindex].x - browInfo.x;
                        offset.y = _bodyNeckInfo[frameindex].y + _headBrowInfo[frameindex].y - _headNeckInfo[frameindex].y - browInfo.y;
                    }
                }

                pos.x = Number(offset.x) - Number(oringinInfo.x);
                pos.y = Number(offset.y) - Number(oringinInfo.y);

                this.bodyData[partindex][frameindex].tex = strMarker;
                this.bodyData[partindex][frameindex].delay = delay ? Number(delay) : 100;
                this.bodyData[partindex][frameindex].face = (face == 0) ? 0 : 1;           //只需要统计body的face
                this.bodyData[partindex][frameindex].orgx = Number(pos.x);
                this.bodyData[partindex][frameindex].orgy = Number(pos.y);
                this.bodyData[partindex][frameindex].movex = 0;
                this.bodyData[partindex][frameindex].movey = 0;
                if(this.actionMap[frameindex]) {
                    this.bodyData[partindex][frameindex].movex = Number(this.actionMap[frameindex].movex);
                    this.bodyData[partindex][frameindex].movey = Number(this.actionMap[frameindex].movey);
                }
                this.bodyData[partindex][frameindex].z = Number(msMoudle.zMap[zInfo]);
                this.bodyData[partindex][frameindex].browInfo = browInfo;
                this.bodyData[partindex][frameindex].navelInfo = navelInfo;
                this.bodyData[partindex][frameindex].oringinInfo = oringinInfo;
                /////通用部分优化
                // if(partindex != 0 && partindex != 1 && partindex != 2 && partindex != 3 && partindex != 4 && partindex !=5
                //     && partindex != 6 && partindex != 9) {
                    this.res.push(strMarker);
                // }

                // if(this.m_action == "prone") {// && pathname == "body"
                // // if(pathname == "Cape") {
                //     console.log(this.bodyData[partindex][frameindex], frameindex, pathname)
                // }


                if(pathname == "Afterimage") {
                    this.bodyData[partindex][frameindex].z = 200;
                }

            }
        }
        //加载基础动作(武器决定-重要提示)，E会自动去识别是否加载过
        otherP:boolean = false;
        m_params:Array<any> = [0, 0, 0, 0]
        public changeAll(P:any, E:any, x:number, y:number, selHero = ms.selHero, otherP:boolean = false, params = [0, 0, 0, 0, 0]) : void {
            this.m_E = E;
            this.m_parent = P;
            this.m_x = x;
            this.m_y = y;
            this.m_params = params;

            this.selJob = selHero;
            this.otherP = otherP;

            this.m_bianshen = false;
            if(this.bodyChange) this.bodyChange.skin = "";
            if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                if((this.teamIndex == 100 || this.otherP)) {
                    ///这里导致切换坐骑的问题
                    if(msMoudle.tamingmob1 != "" && msMoudle.tamingmob2 != "") {
                        this.partIndex[msMoudle.partType.tTamingMob] = msMoudle.tamingmob1;
                        this.partIndex[msMoudle.partType.tTamingMob0] = msMoudle.tamingmob2;
                    }
                    else {
                        this.partIndex[msMoudle.partType.tTamingMob] = "N";
                        this.partIndex[msMoudle.partType.tTamingMob0] = "N";

                        msMoudle.tamingmob1 = "N";
                        msMoudle.tamingmob2 = "N";
                    }

                    if(this.selJob == 10) {
                        this.m_bs_id = "1001"
                        this.m_bianshen = true;
                    }
                    // else
                    // if(this.selJob == 11) {
                    //     this.partIndex[msMoudle.partType.tTamingMob] = "01932000.img";
                    //     this.partIndex[msMoudle.partType.tTamingMob0] = "N";
                    // }
                    else if(this.selJob == 12) {
                        this.m_bs_id = "1211";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 39) {
                        this.m_bs_id = "6000";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 40) {
                        this.m_bs_id = "6001";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 41) {
                        this.m_bs_id = "6002";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 42) {
                        this.m_bs_id = "6003";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 43) {
                        this.m_bs_id = "6004";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 44) {
                        this.m_bs_id = "6005";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 45) {
                        this.m_bs_id = "6006";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 46) {
                        this.m_bs_id = "6007";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 47) {
                        this.m_bs_id = "6008";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 48) {
                        this.m_bs_id = "6009";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 49) {
                        this.m_bs_id = "6010";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                }
            }
            this.m_sp = new Laya.Sprite();
            this.m_sp.zOrder = 10000;
            this.m_parent.addChild(this.m_sp);

            this.m_chatballon = new cssChatBalloon();

            this.m_clicksp = new Laya.Sprite();
            this.m_clicksp.width = 100;
            this.m_clicksp.height = 100;
            this.m_parent.addChild(this.m_clicksp);

            this.m_nametag_sp = new Laya.Sprite();
            this.m_nametag_sp.zOrder = 9999;
            this.m_parent.addChild(this.m_nametag_sp);

            this.m_state_sp = new Laya.Sprite();
            this.m_state_sp.zOrder = 10003;
            this.m_parent.addChild(this.m_state_sp);

            this.m_skill_sp = new Laya.Sprite();
            this.m_skill_sp.zOrder = 10004;
            this.m_parent.addChild(this.m_skill_sp);

            this.bodyCopy = new Laya.Image();
            this.bodyCopy.anchorY = 1;
            this.m_sp.addChild(this.bodyCopy);

            this.bodyChange = new Laya.Image();
            this.bodyChange.zOrder = 9999;
            this.bodyChange.on(Laya.Event.CLICK, this, this.clickChar);
            // this.bodyChange.hitTestPrior = false;
            // this.bodyChange.anchorX = 0.5;
            // this.bodyChange.anchorY = 1;
            this.m_sp.addChild(this.bodyChange);

            this.hitBound = new Laya.Sprite();
            this.hitBound.zOrder = 99999;
            // this.m_parent.addChild(this.hitBound);

            this.atkBound = new Laya.Sprite();          //这个是检测碰撞范围的
            this.atkBound.zOrder = 999999;
            // this.m_parent.addChild(this.atkBound);   //灵活使用chrome的功能

            this.testbound = new Laya.Sprite();          //这个是检测碰撞范围的
            this.testbound.zOrder = 999999;
            // this.m_parent.addChild(this.testbound);

            // this.aBound = new Laya.Sprite();
            // this.aBound.zOrder = 999999;
            // this.m_parent.addChild(this.aBound);

            this.changeHero(E);

            //新的宠物跟随
            if(this.m_params[4] && this.m_params[4].length > 0 && this.m_parent) {
                for(let i:number = 0; i < this.m_params[4].length; i++) {
                    this.m_otherPetLst.push(this.m_params[4][i]);
                }
            }
            for(let i:number = 0; i < this.m_otherPetLst.length; i++) {
                if(this.m_otherPetLst[i]) {
                    this.m_otherPet[i] = new cssPet();
                    this.m_otherPet[i].changeAll(this.m_parent, this.m_otherPetLst[i] + ".img", x + 30 * i,  y);
                }
            }
        }

        summonLst:Array<any> = [];
        showSummon(id:string, tIndex:number, act:string, dir:number, x:number, y:number) : void {
            if(!this.summonLst[tIndex]) {
                this.summonLst[tIndex] = new cssSummon();
                this.summonLst[tIndex].changeAll(msMoudle.mapP.m_sp, id, this.m_x, this.m_y, false);//关闭自带的ai
                this.summonLst[tIndex].setDir(this.m_dir);
                ///状态AI
                this.summonLst[tIndex].startZT();
            }
            else {
                // if(this.summonLst[tIndex].m_action != act) {
                // if(act.indexOf("stand") >= 0 || act.indexOf("fly") >= 0) {
                    this.summonLst[tIndex].changeByName(act, 0);
                // }
                // else {
                    // this.summonLst[tIndex].changeByName(act, 0);
                // }
                if(this.summonLst[tIndex].m_dir != dir) {
                    this.summonLst[tIndex].setDir(dir);
                }
                this.summonLst[tIndex].setPos(x, y);
            }
        }

        public changeHero(E:any) : void {
            this.m_E = E;
            this.initRole();
            this.loadE(E);

            //res/Character/Afterimage/" + msMoudle.AllAfterimage[i] + ".img/inde
            ///所有未加载的index
            let res:any = [];
            for(let i:number = 0; i < msMoudle.tNum; i++) {
                if(this.partIndex[i] != "N") {
                    if(!msMoudle.wz[this.partIndex[i]]) {
                        if(!Laya.loader.getRes("res/Character/" + msMoudle.partDirs[i]  + "/" + this.partIndex[i] + "/index.html")) {
                            res.push({ url: "res/Character/" + msMoudle.partDirs[i]  + "/" + this.partIndex[i] + "/index.html" });
                        }
                    }
                }
            }

            // if(this.m_bianshen && (this.teamIndex == 100 || this.otherP)) {
            //     if(!Laya.loader.getRes("res/Morph/" + this.m_bs_id + ".img/index.html"))
            //         res.push({ url: "res/Morph/" + this.m_bs_id + ".img/index.html"});
            // }

            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    this.loadAllResed();
                });
            }
            else {
                this.loadAllResed();
            }
        }

        onLoading() : void {}

        loadAllResed() : void {
            let cs:CssParser.Txt = new CssParser.Txt();
            for(let i:number = 0; i < msMoudle.tNum; i++) {
                if(this.partIndex[i] != "N") {
                    if(!msMoudle.wz[this.partIndex[i]]) {
                        msMoudle.wz[this.partIndex[i]] = msMoudle.loadWZ(cs, "res/Character/" + msMoudle.partDirs[i]  + "/" + this.partIndex[i] + "/index.html", "ms");
                    }
                }
            }

            this.getNormalAct();
            //
            for(let i:number = 0; i < this.maxpart; i++) {
                this.bodyAni[i] = new Laya.Image();
                if(i == 0) {
                    this.bodyAni[i].on(Laya.Event.CLICK, this, this.clickChar);
                    // this.bodyAni[i].hitTestPrior = false;
                }
                if(this.m_sp) this.m_sp.addChild(this.bodyAni[i]);
            }

            if(this.m_nametag) {
                this.m_nametag.removeSelf();
                this.m_nametag.clearUp();
                this.m_nametag = null;
            }
            this.m_nametag = new cssNametag();
            if(this.m_nametag_show) {
                this.m_nametag.loadNameTag(this, this.m_name, this.m_special ? "9" : "10");
            }

            //戒指效果
            if(this.charEff) {
                this.charEff.removeSelf();
                this.charEff.clearUp();
                this.charEff = null;
            }
            this.charEff = new maple.CharacterEffect();
            this.charEff.setCharacterEffect(this, this.m_ring);


            if(this.charEff2) {
                this.charEff2.removeSelf();
                this.charEff2.clearUp();
                this.charEff2 = null;
            }
            if(this.m_id && this.m_id == ms.user) {
                if(ms.ringbagsdata.length >= 6)  {
                    this.charEff2 = new cssBasicEff();
                    this.charEff2.loadBasicEff(this.m_sp, "AranGetSkill", 0, 0);
                }
            }
            else {
                if(this.otherP && this.m_params[2] >= 6) {
                    this.charEff2 = new cssBasicEff();
                    this.charEff2.loadBasicEff(this.m_sp, "AranGetSkill", 0, 0);
                }
            }

            if(this.charEff3) {
                this.charEff3.removeSelf();
                this.charEff3.clearUp();
                this.charEff3 = null;
            }

            if(this.m_id && this.m_id == ms.user) {
                if(ms.chairbagsdata.length >= 8)  {
                    this.charEff3 = new cssBasicEff();
                    this.charEff3.loadBasicEff(this.m_sp, "ZeroAura0", 0, 0);
                }
            }
            else {
                if(this.otherP && this.m_params[3] >= 6) {
                    this.charEff3 = new cssBasicEff();
                    this.charEff3.loadBasicEff(this.m_sp, "ZeroAura0", 0, 0);
                }
            }

            if(this.setEff) {
                this.setEff.removeSelf();
                this.setEff.clearUp();
                this.setEff = null;
            }
            else {
                this.setEff = new maple.SetEffect();
                this.setEff.setEffect(this, this.m_nametag_sp);
            }
            ///这里预先操作(非常重要)
            // if(!msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]])
            //     console.log("装备错误", this.partIndex[msMoudle.partType.tWeapon])
            // if(!msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"])
            //     console.log("无stand", msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"],
            //     msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]],this.partIndex[msMoudle.partType.tWeapon])

            let _act:string = "stand" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.stand"];
            if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                _act = "stand1";
            }
            this.m_action = _act;

            // this.m_action = msMoudle.getWeaponAct(this.partIndex[msMoudle.partType.tWeapon]);
            if(this.m_chair != "N") {
                this.m_action = "sit";
            }

            if(this.m_initAction) {
                if(this.m_initAction.indexOf("stand") >= 0)
                    this.m_initAction = "stand" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.stand"];
                if(this.m_initAction.indexOf("walk") >= 0)
                    this.m_initAction = "walk" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.walk"];
                this.m_action = this.m_initAction;
                this.m_initAction = "";
            }

            this.actionData();
            this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 0);
            this.loadBianShen();

            //更新数值
            if(!this._pvp) this.udHeroData();
            else {
                if(this.m_pvpid != -1) {
                    this.m_skill_1 = msMoudle.herojson[this.m_pvpid].skill_1;
                }
            }

            if(msMoudle.isPvp && msMoudle.specialPvp) {
                this.m_minatk = Math.round(this.m_minatk / 2);
                this.m_maxatk = Math.round(this.m_maxatk / 2);
                this.m_hp = Math.round(this.m_hp * 25);
                this.m_maxhp = this.m_hp;
            }

            this.hpbar();
            // this.showStateById("1111002");

            if(this._autofight) {
                this.startAutoFight2();
            }
            // Laya.timer.loop(100, this, this.BufLoop);
            if(this.m_chair != "N") {
                this.chair = new ChairRole.Chair();
                this.chair.setChair(this, this.m_chair);
            }
        }

        loadBianShen(isatk:boolean = false) : void {
            // Laya.timer.clear(this, this.changeAction);



            if(this.m_bianshen) {
                let res:Array<any> = [];
                if(this.m_bianshen && (this.teamIndex == 100 || this.otherP)) {
                    if(!msMoudle.wz["M" + this.m_bs_id + ".img"]) {
                        if(!Laya.loader.getRes("res/Morph/" + this.m_bs_id + ".img/index.html"))
                            res.push({ url: "res/Morph/" + this.m_bs_id + ".img/index.html"});
                    }
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        // console.log("xxx", this.selJob, this.m_bianshen, this.m_bs_id, msMoudle.wz["M" + this.m_bs_id + ".img"])
                        this.setBianShen();
                    });
                }
                else {
                    this.setBianShen(isatk);
                }
                // this.setBianShen();
                if(this.bodyAni[6])
                    this.bodyAni[6].skin = "";
            }
        }

        setBianShen(isatk:boolean = false) : void {
            //变身
            if(this.m_bianshen && (this.teamIndex == 100 || this.otherP)) {
                if(!msMoudle.wz["M" + this.m_bs_id + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz["M" + this.m_bs_id + ".img"] = msMoudle.loadWZ(cs, "res/Morph/" + this.m_bs_id + ".img/index.html", "ms");
                }
                this.bodyChangeData = new Array();
                let change_act:string = this.m_action;
                if(this.m_action) {
                    if(this.m_action.indexOf("stand") >= 0) change_act = "stand";
                    else if(this.m_action.indexOf("walk") >= 0) change_act = "walk";
                    else if(this.m_action.indexOf("jump") >= 0) change_act = "jump";
                }
                if(isatk) {
                    change_act = "attack";
                }

                let data:any = msMoudle.wz["M" + this.m_bs_id + ".img"][change_act];
                // console.log(data, change_act, msMoudle.wz["M" + this.m_bs_id + ".img"])
                // msMoudle.toast(change_act)
                if(data) {
                    this.bodyChangeData = [];
                    this.loadChange(data, change_act);
                }
            }
        }

        updNameTag(name:string) : void {
            if(this.m_nametag_show) {
                // this.m_nametag.loadNameTag(this, this.m_name, this.m_special ? "9" : "10");
                this.m_nametag.txt.text = name;
            }
        }

        private hpbar() : void {
            if(this.hpBar) return ;
            if(this._pvp == false) this.hpBar = new Laya.ProgressBar("res/UI/progressBar.png");
            else this.hpBar = new Laya.ProgressBar("res/UI/p1.png");
            this.hpBar.width = 40;
            this.hpBar.height = 8;
            // this.hpBar.sizeGrid = "10,10,10,10";
            // if(this.m_nametag_show) this.m_nametag_sp.addChild(this.hpBar);
            this.hpBar.value = 1;
        }

        public updateHpBar(isShow = true) {
            if(!this.hpBar) this.hpbar();
            if(this.m_hp > 0 || this.m_hp < this.m_maxhp) {
                this.m_nametag_sp.addChild(this.hpBar);
            }
            this.hpBar.visible = isShow && this.m_hp > 0;
            if(isShow) {
                this.hpBar.value = this.m_hp / this.m_maxhp;
            }
        }

        autoflag:boolean = true;
        public startAutoFight(flag:boolean = true) : void {
            this.autoflag = flag;

            if(this._autofight == false) {
                this._autofight = true;
            }
            // this.startAutoFight2();
            Laya.timer.once(500, this, this.startAutoFight2);
        }

        public startAutoFight2() : void {
            Laya.timer.clear(this, this.autoFight);
            Laya.timer.frameLoop(1, this, this.autoFight);
        }

        public stopAutoFight() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.autoFight);
        }

        maphero:boolean = false;
        private DealPart(part:any, id:string) : any {
            let partmsg:any = {part:part, id:id};
            if(id == "N") {
                if(part == msMoudle.partType.tBody) id = this.initbody;
                else if(part == msMoudle.partType.tHead) id = this.inithead;
                else if(part == msMoudle.partType.tCoat) id = this.initcoat;
                else if(part == msMoudle.partType.tPants) id = this.initpants;
                else if(part == msMoudle.partType.tHair) id = this.inithair;
                else if(part == msMoudle.partType.tFace) id = this.initface
                else if(part == msMoudle.partType.tWeapon) {
                    id = this.initweapon
                    if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                        id = msMoudle.getWeaponByJob(this.selJob);
                    }
                }
                partmsg.id = id;
            }

            return partmsg;
        }
        public changePart(part:any, id:string) : void {

            if(id == "N") {
                this.partChange(part, id);
            }
            else {
                ///所有未加载的index
                let res:any = [];
                if(!msMoudle.wz[id]) {
                    res.push({ url: "res/Character/" + msMoudle.partDirs[part]  + "/" + id + "/index.html" });
                }
                if(res.length > 0) {
                    msLoad.load(res).done(dlg => {
                        this.partChange(part, id);
                    });
                }
                else {
                    this.partChange(part, id);
                }
            }

        }

        partChange(part:any, id:string) : void {

            if(id != "N") {
                if(!msMoudle.wz[id]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[id] = msMoudle.loadWZ(cs, "res/Character/" + msMoudle.partDirs[part]  + "/" + id + "/index.html", "ms");
                }
            }

            if(part == msMoudle.partType.tFace) this.bodyAni[6].skin = "";
            else for(let i:number = 0; i < this.maxpart; i++) {
                if(this.bodyAni[i]) this.bodyAni[i].skin = "";
            }
            let partmsg:any = this.DealPart(part, id);    //一些冲突逻辑处理
            //注意身体的skill缺失问题
            this.partIndex[partmsg.part] = partmsg.id;
            if(part == msMoudle.partType.tWeapon && msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]) {
                let _act:string =  "stand" +msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.stand"];
                if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                    _act = "stand1";
                }
                this.m_action = _act;
                this.actionData();
                this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 0); //切动作不需要切表情
                this.getNormalAct();
            }
            else
                this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 0);
                // this.loadActs(this.faceid, part, this.actionMap, 0);

            if(part == msMoudle.partType.tCap) {
                // msMoudle.toast("xxx")
                if(this.setEff) {
                    this.setEff.removeSelf();
                    this.setEff.clearUp();
                    this.setEff = null;
                }
                this.setEff = new maple.SetEffect();
                this.setEff.setEffect(this, this.m_nametag_sp);
            }
        }

        public changeExpress(id:string, over:boolean = true) : void {

            // let res:any = [];
            // if(!msMoudle.wz[id]) {
            //     res.push({ url: "res/Character/" + msMoudle.partDirs[msMoudle.partType.tFace]  + "/" + id + "/index.html" });
            // }

            // if(res.length > 0) {
            //     msLoad.load(res).done(dlg => {
                    this.faceChange(id, over);
            //     });
            // }
            // else {
            //     this.faceChange(id, over);
            // }


            //
        }

        faceChange(id:string, over:boolean = true) : void {

            if(id != "N") {
                if(!msMoudle.wz[id]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[id] = msMoudle.loadWZ(cs, "res/Character/" + msMoudle.partDirs[msMoudle.partType.tFace]  + "/" + id + "/index.html", "ms");
                }
            }
            // if(over) {
                this.loadActs(id, msMoudle.partType.tFace, this.actionMap, 0);
                // Laya.timer.clear(this, this.expressTime);
                Laya.timer.once(3000, this, this.expressTime, [], true);
            // }
        }

        public changeByName(id:string, loop:number) : void {
            // console.log("changeByName, ", id)
            // msMoudle.toast(id)
            if(msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]) {
                // console.log(id   + "  " + loop)
                if(id == "stand") {
                    id =  "stand" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.stand"];
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                        id = "stand1";
                    }
                }
                else if(id == "walk") {
                    id = "walk" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.walk"];
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                        id = "walk1";
                    }
                }
                if(this.m_action != id) {
                    // this.bodyAni[16].skin = "";
                    // this.bodyAni[17].skin = "";
                    // this.bodyAni[18].skin = "";
                    if(this.hitBound) this.hitBound.graphics.clear();
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N") {
                        if(id == "stand1" || id == "stand2" || id == "walk1" || id == "walk2" ||
                        id == "jump" || id == "prone" || id == "stand" || id == "walk" || id == "ladder") {}
                        else {
                            console.log("坐骑状态不支持该动作");
                            return ;
                        }
                    }
                    this.getNormalAct();
                    this.m_action = id;
                    this.actionData();
                    this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, loop); //切动作不需要切表情
                    this.loadBianShen();

                }
            }
        }
        public changeByNameForce(id:string, loop:number) : void {
            this.m_bianshen = false;
            if(this.bodyChange) this.bodyChange.skin = "";
            if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                if((this.teamIndex == 100 || this.otherP)) {
                    // console.log("##changeByNameForce, ", msMoudle.tamingmob1, msMoudle.tamingmob2)
                    if(this.otherP) {

                    }
                    else {
                        if(msMoudle.tamingmob1 != "" && msMoudle.tamingmob2 != "") {
                            this.partIndex[msMoudle.partType.tTamingMob] = msMoudle.tamingmob1;
                            this.partIndex[msMoudle.partType.tTamingMob0] = msMoudle.tamingmob2;
                        }
                        else {
                            this.partIndex[msMoudle.partType.tTamingMob] = "N";
                            this.partIndex[msMoudle.partType.tTamingMob0] = "N";

                            msMoudle.tamingmob1 = "N";
                            msMoudle.tamingmob2 = "N";
                        }
                    }

                    if(this.selJob == 10) {
                        this.m_bs_id = "1001";//1001 6000
                        this.m_bianshen = true;
                    }
                    // else
                    // if(this.selJob == 11) {
                    //     this.partIndex[msMoudle.partType.tTamingMob] = "01932000.img";
                    //     this.partIndex[msMoudle.partType.tTamingMob0] = "N";
                    // }
                    else if(this.selJob == 12) {
                        this.m_bs_id = "1211";
                        this.m_bianshen = true;
                    }
                    else if(this.selJob == 39) {
                        this.m_bs_id = "6000";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 40) {
                        this.m_bs_id = "6001";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 41) {
                        this.m_bs_id = "6002";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 42) {
                        this.m_bs_id = "6003";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 43) {
                        this.m_bs_id = "6004";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 44) {
                        this.m_bs_id = "6005";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 45) {
                        this.m_bs_id = "6006";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 46) {
                        this.m_bs_id = "6007";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 47) {
                        this.m_bs_id = "6008";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 48) {
                        this.m_bs_id = "6009";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }
                    else if(this.selJob == 49) {
                        this.m_bs_id = "6010";
                        this.m_bianshen = true;     ///可以选择皮肤
                    }

                }
            }
            Laya.timer.clear(this, this.changeAction);
            if(msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]) {
                if(this.setEff) {
                    this.setEff.removeSelf();
                    this.setEff.clearUp();
                    this.setEff = null;
                }
                this.setEff = new maple.SetEffect();
                this.setEff.setEffect(this, this.m_nametag_sp);
                // this.is_skill = false;
                if(id == "stand") {
                    id = "stand" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.stand"];
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                        id = "stand1";
                    }
                }
                else if(id == "walk") {
                    id = "walk" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.walk"];
                    if(this.partIndex[msMoudle.partType.tTamingMob] != "N" || this.partIndex[msMoudle.partType.tTamingMob0] != "N"){
                        id = "walk1";
                    }
                }
                this.bodyAni[16].skin = "";
                this.bodyAni[17].skin = "";
                this.bodyAni[18].skin = "";
                this.bodyAni[35].skin = "";
                if(this.hitBound) this.hitBound.graphics.clear();
                if(this.partIndex[msMoudle.partType.tTamingMob] != "N") {
                    if(id == "stand1" || id == "stand2" || id == "walk1" || id == "walk2" ||
                    id == "jump" || id == "prone" || id == "stand" || id == "walk") {}
                    else {
                        console.log("坐骑状态不支持该动作");
                        return ;
                    }
                }
                this.getNormalAct();
                this.m_action = id;
                this.actionData();
                this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, loop); //切动作不需要切表情
                this.loadBianShen();
                if(this.charEff) {
                    this.charEff.clearUp();
                    if(this.m_ring != "N") {
                        this.charEff.setCharacterEffect(this, this.m_ring);
                    }
                }
                if(this.charEff2) {
                    this.charEff2.clearUp();

                    if(this.m_id && this.m_id == ms.user) {
                        if(ms.ringbagsdata.length >= 6)  {
                            this.charEff2 = new cssBasicEff();
                            this.charEff2.loadBasicEff(this.m_sp, "AranGetSkill", 0, 0);
                        }
                    }
                    else {
                        if(this.otherP && this.m_params[2] >= 6) {
                            this.charEff2 = new cssBasicEff();
                            this.charEff2.loadBasicEff(this.m_sp, "AranGetSkill", 0, 0);
                        }
                    }
                }
                if(this.charEff3) {
                    this.charEff3.clearUp();

                    if(this.m_id && this.m_id == ms.user) {
                        if(ms.chairbagsdata.length >= 8)  {
                            this.charEff3 = new cssBasicEff();
                            this.charEff3.loadBasicEff(this.m_sp, "ZeroAura0", 0, 0);
                        }
                    }
                    else {
                        if(this.otherP && this.m_params[3] >= 6) {
                            this.charEff3 = new cssBasicEff();
                            this.charEff3.loadBasicEff(this.m_sp, "ZeroAura0", 0, 0);
                        }
                    }
                }



                //
            }
        }

        private actionData() : void {
            this.actionMap = new Array();
            let action:string = this.m_action;
            if(this.partIndex[msMoudle.partType.tTamingMob] != "N") {
                if(action != "ladder") action = "sit";
            }
            for(let frameindex:number = 0; frameindex < msMoudle.actionFames[action]; frameindex++) {
                this.actionMap[frameindex] = new Object();
                this.actionMap[frameindex].action = [action];
                this.actionMap[frameindex].frame = frameindex;
                this.actionMap[frameindex].delay = 0;
                this.actionMap[frameindex].movex = 0;
                this.actionMap[frameindex].movey = 0;
                this.actionMap[frameindex].frameindex = frameindex; //数据帧
            }
        }
        private skillactionData() : void {
            let data:any = msMoudle.wz[this.initbody][this.m_action];
            if(data) {
                let frameindex:number = 0;
                this.actionMap = new Array();
                let force = this.skill_data["skill." + this.skillId +".trembleEffect.force"];
                let time = this.skill_data["skill." + this.skillId +".trembleEffect.time"];
                while(true) {
                    let action:string = data[this.m_action + "." + frameindex + ".action"];
                    if(action) {
                        let frame:number = Number(data[this.m_action + "." + frameindex + ".frame"]);
                        let delay:number = Number(data[this.m_action + "." + frameindex + ".delay"]);
                        let move:any = msMoudle.Vec2FromArr(data[this.m_action + "." + frameindex + ".move"]);

                        this.actionMap[frameindex] = new Object();
                        this.actionMap[frameindex].action = action;
                        this.actionMap[frameindex].frame = frame;
                        this.actionMap[frameindex].delay = Number(delay);

                        // if(Number(delay) == -800) {
                        //     this.actionMap[frameindex].delay = 800 * 3;
                        // }

                        if(force && time) {
                            if(frameindex == Number(force)) {
                                if(this.actionMap[frameindex].delay > 0) this.actionMap[frameindex].delay = -this.actionMap[frameindex].delay;
                                this.actionMap[frameindex].delay -= Number(time);
                            }
                        }
                        //先临时处理
                        if(this.skillId == "36121053" && action != "alert") {
                            this.actionMap[frameindex].delay = Math.abs(this.actionMap[frameindex].delay);
                        }
                        this.actionMap[frameindex].movex = 0;
                        this.actionMap[frameindex].movey = 0;
                        this.actionMap[frameindex].frameindex = frameindex;
                        if(move) {
                            if(move.x != -999 || move.y != -999) {
                                this.actionMap[frameindex].movex = Number(move.x);
                                this.actionMap[frameindex].movey = Number(move.y);
                            }
                        }
                        frameindex = frameindex + 1;
                    }
                    else break;
                }

                /////技能追加问题
                // 164121003.additional_process.0</td><td>22</td></tr>
                // <tr><td>skill.164121003.addAttack.skill</td><td>164121004</td></tr>
                // <tr><td>skill.164121003.addAttack.type</td><td>1</td></tr>
                // <tr><td>skill.164121003.addAttack.isAuto</td><td>1</td></tr>
                // <tr><td>skill.164121003.
                ///追加动作
                let addAttack = this.skill_data["skill." + this.skillId +".addAttack.skill"];
                if(addAttack) {
                    let sframe:number = 0;
                    let sdata =  msMoudle.wz[ Math.floor(Number(addAttack) / 10000) + ".img"];
                    if(sdata) {
                        let skill_data:any = sdata["skill." + addAttack];
                        if(skill_data) {
                            let m_action = skill_data["skill." + addAttack +".level.1.action"];
                            if(m_action == null) m_action = skill_data["skill." + addAttack + ".action.0"];
                            data = msMoudle.wz[this.initbody][m_action];
                            // console.log("xxxxx", this.m_action, data, addAttack)
                            if(data && m_action) {

                                while(true) {
                                    let action:string = data[m_action + "." + sframe + ".action"];
                                    if(action) {
                                        let frame:number = Number(data[m_action + "." + sframe + ".frame"]);
                                        let delay:number = Number(data[m_action + "." + sframe + ".delay"]);
                                        let move:any = msMoudle.Vec2FromArr(data[m_action + "." + sframe + ".move"]);

                                        this.actionMap[frameindex] = new Object();
                                        this.actionMap[frameindex].action = action;
                                        this.actionMap[frameindex].frame = frame;
                                        this.actionMap[frameindex].delay = Number(delay);
                                        if(force && time) {
                                            if(frameindex == Number(force)) {
                                                if(this.actionMap[frameindex].delay > 0) this.actionMap[frameindex].delay = -this.actionMap[frameindex].delay;
                                                this.actionMap[frameindex].delay -= Number(time);
                                            }
                                        }
                                        //先临时处理
                                        if(this.skillId == "36121053" && action != "alert") {
                                            this.actionMap[frameindex].delay = Math.abs(this.actionMap[frameindex].delay);
                                        }
                                        this.actionMap[frameindex].movex = 0;
                                        this.actionMap[frameindex].movey = 0;
                                        this.actionMap[frameindex].frameindex = frameindex;
                                        if(move) {
                                            if(move.x != -999 || move.y != -999) {
                                                this.actionMap[frameindex].movex = Number(move.x);
                                                this.actionMap[frameindex].movey = Number(move.y);
                                            }
                                        }
                                        frameindex = frameindex + 1;
                                        sframe = sframe + 1;
                                    }
                                    else break;
                                }
                            }
                        }
                    }
                }
                //
            }
        }
        private getNormalAct() : void {
            //获取武器可使用的基础动作
            this.m_action_list = new Array();
            this.m_attack_list = new Array();
            // let attacktype = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.attack"]

            let _aftimage:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
            // console.log(_aftimage)
            if(msMoudle.wz[_aftimage + ".img"]) {
                let aftList:Array<any> = [];
                for(let key in msMoudle.wz[_aftimage + ".img"]["0"]) {
                    aftList.push(key);
                }

                // console.log("####", aftList)

                for(let key in msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]) {
                    if(key == "info") {}
                    else {
                        if(key.indexOf("stand") >= 0 || key.indexOf("walk") >= 0 || key == "alert" || key.indexOf("prone") >= 0 || key == "fly" || key == "jump" ||
                            key.indexOf("heal") >= 0 || key.indexOf("F") >= 0) {
                                if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "短枪") {
                                    if(key == "alert") {
                                        this.m_attack_list[this.m_attack_list.length] = key;
                                    }
                                }
                            }
                        else {
                            ///有些全能的武器会有问题
                            // if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "枪") {
                            //     if(key == "swingT2" || key == "swingP1" || key == "swingPF" || key == "swingP2" || key == "stabT1" || key == "stabTF") {
                            //         this.m_attack_list[this.m_attack_list.length] = key;
                            //     }
                            // }
                            // else {
                                //info.attack

                                for(let i:number = 0; i < aftList.length; i++) {
                                    if(aftList[i].indexOf(key) >= 0) {
                                        this.m_attack_list[this.m_attack_list.length] = key;
                                        break;
                                    }
                                }

                            // }
                            // console.log("@@@@",  key);
                        }
                        this.m_action_list[this.m_action_list.length] = key;
                    }
                }

                if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "双弩") {
                    //所有攻击动作
                    this.m_attack_list = ['shoot1'];
                    //所有动作
                    this.m_action_list[this.m_action_list.length] = "shoot1";//shootDb1
                }

            }
        }
        private drawBound() : void {
            // console.log(a);
            if(this.hitBound && this.m_action) {
                if(this.m_action.indexOf("prone") >= 0) {
                    this.hitBound.graphics.clear();
                    this.hitBound.graphics.drawRect(-35, -20, 60, 20,null, "#ffffff");
                }
                else {
                    let a:any = new Object();
                    a.l = -30;
                    a.t = 0;
                    a.r = 20;
                    a.b = -70;
                    this.hitBound.graphics.clear();
                    this.hitBound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffff00");
                }
            }
        }
        private drawAtkBound(a:any) : void {
            if(this.atkBound) {
                let h:number = a.b-a.t;
                h = h < 5 ? 5 : h;

                this.atkBound.graphics.clear();
                this.atkBound.graphics.drawRect(a.l, a.t, a.r-a.l, h, null, "#ffffff");

                this.testbound.graphics.clear();
                this.testbound.graphics.drawRect(a.l, a.t, a.r-a.l, h, null, "#ffffff");
            }
        }
        private drawSkillBound(a:any) : void {
            if(this.atkBound) {

                if(this.skillId == "41121002") {
                    a.l = a.r + (a.r - a.l);
                }

                this.atkBound.graphics.clear();
                this.atkBound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");

                this.testbound.graphics.clear();
                this.testbound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
            }
        }

        public udHeroData() : void {
            if(this.teamIndex != -1) {

                this.p_hp = 0;
                //坐骑
                this.p_atkspeed = 0;
                this.p_walkspeed = 0;
                //宠物
                this.p_def = 0;
                this.p_atk = 0;         //0.25
                //时装
                this.p_miss = 0;        //25
                this.p_target = 0;
                this.p_baoji = 0;

                //坐骑
                if(ms.tamingmob) {
                    if(ms.tamingmob.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id + ".img" == ms.tamingmob.tamingmob1) {
                                let ___ = msMoudle.payjson[key];
                                this.p_atkspeed = Number(___.atkspeed) / 100;
                                this.p_walkspeed = Number(___.walkspeed) / 100;
                                this.p_baoji = Number(___.baoji);
                                break;
                            }
                        }
                    }
                }
                //宠物
                if(ms.pet) {
                    if(ms.pet.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id + ".img" == ms.pet.id) {
                                let ___ = msMoudle.payjson[key];
                                this.p_def = Number(___.def) / 100;
                                this.p_atk = Number(___.atk) / 100;
                                break;
                            }
                        }
                    }
                }

                //戒指
                if(ms.ring) {
                    if(ms.ring.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.ring.id) {
                                let ___ = msMoudle.payjson[key];
                                this.p_baoji = Number(___.baoji);
                                this.p_miss = Number(___.miss);
                                this.p_target = Number(___.target);
                                break;
                            }
                        }
                    }
                }

                //椅子
                if(ms.chair) {
                    if(ms.chair.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id== ms.chair.id) {
                                let ___ = msMoudle.payjson[key];
                                this.p_hp += Number(___.hp) / 100;
                                break;
                            }
                        }
                    }
                }

                //转生
                if(ms.herodata.ZS > 0) {
                    this.p_hp += 0.01 * ms.herodata.ZS;
                    this.p_def += 0.01 * ms.herodata.ZS;
                    this.p_atk += 0.01 * ms.herodata.ZS;
                }
                //修炼
                for(let i:number = 0; i < ms.herodata.XL.length; i++) {
                    if(ms.herodata.XL[i] > 0) {
                        if(i == 0) {
                            this.p_hp += 0.01 * ms.herodata.XL[i];
                        }
                        else if(i == 1) {
                            this.p_atk += 0.01 * ms.herodata.XL[i];
                        }
                        else if(i == 2) {
                            this.p_def += 0.01 * ms.herodata.XL[i];
                        }
                        else if(i == 3) {
                            this.p_target += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 4) {
                            this.p_miss += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 5) {
                            this.p_baoji += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 6) {
                            this.p_atkspeed += 0.01 * ms.herodata.XL[i];
                            this.p_walkspeed += 0.01 * ms.herodata.XL[i];
                        }
                    }
                }

                //收集宠物
                if(ms.petbagsdata.length > 0) {
                    for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                        if(i == 0) this.p_hp += 0.01;
                        else if(i == 1) this.p_atk += 0.01;
                        else if(i == 2) this.p_def += 0.01;
                        else if(i == 3) this.p_hp += 0.01;
                        else if(i == 4) this.p_atk += 0.01;
                        else if(i == 5) this.p_def += 0.01;
                        else if(i == 6) this.p_hp += 0.01;
                        else if(i == 7) this.p_atk += 0.01;
                        else if(i == 8) this.p_def += 0.01;
                        else if(i == 9) this.p_hp += 0.01;
                        else if(i == 10) this.p_atk += 0.01;
                        else if(i == 11) this.p_def += 0.01;
                    }
                }
                //收集坐骑
                if(ms.tamingmobbagsdata.length > 0) {
                    this.p_baoji += ms.tamingmobbagsdata.length;
                }
                //职业
                for(let i:number = 0; i < ms.m_job.length; i++) {
                    if(ms.m_job[i] != "") {
                        if(i == 0) this.p_atk += 0.01;
                        else if(i == 1) {}
                        else if(i == 2) {
                            this.p_atkspeed += 0.01;
                            this.p_walkspeed += 0.01;
                        }
                        else if(i == 3) this.p_def += 0.01;
                        else if(i == 4) this.p_atk += 0.01;
                        else if(i == 5) this.p_hp += 0.01;
                        else if(i == 6) this.p_atk += 0.01;
                        else if(i == 7) this.p_hp += 0.01;
                        else if(i == 8) this.p_def += 0.01;
                        else if(i == 9) {
                            this.p_atkspeed += 0.01;
                            this.p_walkspeed += 0.01;
                        }
                        else if(i == 10) this.p_def += 0.01;
                        else if(i == 11) this.p_def += 0.01;
                        else if(i == 12) this.p_atk += 0.01;
                        else if(i == 13) this.p_hp += 0.01;
                        else if(i == 14) this.p_atk += 0.01;
                        else if(i == 15) this.p_atk += 0.01;
                        else if(i == 16) this.p_atk += 0.01;
                        else if(i == 17) this.p_def += 0.01;
                        else if(i == 18) this.p_atk += 0.01;
                        else if(i == 19) this.p_atk += 0.01;
                        else if(i == 20) this.p_atk += 0.01;
                        else if(i == 21) this.p_hp += 0.01;
                        else if(i == 22) this.p_atk += 0.01;
                        else if(i == 23) this.p_hp += 0.01;
                        else if(i == 24) this.p_def += 0.01;
                        else if(i == 25) this.p_def += 0.01;
                        else if(i == 26) this.p_def += 0.01;
                        else if(i == 27) this.p_atk += 0.01;
                        else if(i == 28) this.p_atk += 0.01;
                        else if(i == 29) this.p_hp += 0.01;
                        else if(i == 30) this.p_def += 0.01;
                        else if(i == 31) this.p_atk += 0.01;
                        else if(i == 32) this.p_atk += 0.01;
                        else if(i == 33) this.p_atk += 0.01;
                        else if(i == 34) this.p_atk += 0.01;
                        else if(i == 35) this.p_hp += 0.01;
                        else if(i == 36) this.p_def += 0.01;
                        else if(i == 37) {
                            this.p_atkspeed += 0.01;
                            this.p_walkspeed += 0.01;
                        }
                        else if(i == 38) this.p_def += 0.01;
                    }
                }
                /////

                //四神兽卷轴
                // if(msMoudle.specialPvp == false) {
                //     if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                //         for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                //             if(ms.herodata.EquipSlots[i]) {
                //                 let succlst = ms.herodata.EquipSlots[i].succlst;
                //                 if(succlst) {
                //                     for(let key in succlst) {
                //                         if(key == "2040595") {  //青龙卷轴
                //                             this.p_target += 10;
                //                             this.p_miss += 10;
                //                         }
                //                         else if(key == "2040596") {  //白虎卷轴
                //                             this.p_atkspeed += 0.1;
                //                             this.p_walkspeed += 0.1;
                //                         }
                //                         else if(key == "2040597") {  //玄武卷轴
                //                             this.p_baoji += 10;
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }

                // console.log("生命" + this.p_hp)
                // console.log("攻击" + this.p_atk)
                // console.log("防御" + this.p_def)
                // console.log("命中" + this.p_target)
                // console.log("闪避" + this.p_miss)
                // console.log("暴击" + this.p_baoji)
                // console.log("攻速" + this.p_atkspeed)
                // console.log("移速" + this.p_walkspeed)

                ///战斗数据
                if((this.teamIndex == 100 || this.otherP)) {
                    this.m_hp = ms.herodata.MaxHP.GetSum() + 10 * ms.herodata.Lv;
                    this.m_maxhp = this.m_hp
                    this.m_mp = ms.herodata.MaxMP.GetSum();
                    this.m_maxmp = this.m_mp;
                    let pad:any = ms.herodata.CalcAttackRange();
                    this.m_minatk = pad.minatk;
                    this.m_maxatk = pad.maxatk;

                    this.m_def = ms.herodata.PDDamage.GetSum();
                    this.m_baoji = ms.herodata.CriticalRate.GetSum();
                    this.m_miss = ms.herodata.Evasion.GetSum();
                    if(this.m_miss > 50) this.m_miss = 50;
                    this.m_target = ms.herodata.Accurate.GetSum();

                    // (this.m_atkspeed + this.p_atkspeed) = ms.herodata.atkspeed;
                    // (this.m_walkspeed+this.p_walkspeed) = ms.herodata.walkspeed;
                    // this.m_shuxing = shuxing;
                    //技能
                    // if(this.m_name == "普罗米修斯") {
                        // if(this.m_lv >= 3) this.m_skill_1 = ms.herodata.skill_1;
                    // }
                    // else {
                    //     if(this.m_lv >= 5) this.m_skill_1 = ms.herodata.skill_1;
                    // }

                    if(msMoudle.specialPvp == false && msMoudle.m_zhuque) {
                        if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                            for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                                if(ms.herodata.EquipSlots[i]) {
                                    let succlst = ms.herodata.EquipSlots[i].succlst;
                                    if(succlst) {
                                        for(let key in succlst) {
                                            if(key == "2040598") {  //朱雀卷轴
                                                this.m_skill_1 = "1311006";     //龙咆哮
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // if(this.m_lv >= 9) this.m_skill_2 = ms.herodata.skill_2;
                    // if(this.m_lv >= 15) this.m_skill_3 = ms.herodata.skill_3;
                    // if(this.m_lv >= 22) this.m_skill_4 = ms.herodata.skill_4;
                }
                else {
                    // this.m_cz = ms.otherheroservedata[this.teamIndex].cz;
                    this.m_hp = Math.round(ms.otherheroservedata[this.teamIndex].MaxHP.GetSum());
                    this.m_maxhp = this.m_hp;
                    // this.m_atk = Math.floor(ms.otherheroservedata[this.teamIndex].atk);
                    this.m_minatk = Math.round(ms.otherheroservedata[this.teamIndex].PADamage.GetSum());
                    this.m_maxatk = Math.round(ms.otherheroservedata[this.teamIndex].PADamage.GetSum());

                    this.m_def = Math.round(ms.otherheroservedata[this.teamIndex].PDDamage.GetSum());
                    this.m_baoji = ms.otherheroservedata[this.teamIndex].CriticalRate.GetSum();
                    this.m_miss = ms.otherheroservedata[this.teamIndex].Evasion.GetSum();
                    if(this.m_miss > 50) this.m_miss = 50;
                    this.m_target = ms.otherheroservedata[this.teamIndex].Accurate.GetSum();
                    // this.m_shuxing = ms.otherheroservedata[this.teamIndex].shuxing;
                    // if(this.m_lv >= 1) this.m_skill_1 = ms.otherheroservedata[this.teamIndex].skill_1;

                    // //轮回次数
                    this.m_hp += 200 * (ms.herodata.LH);
                    this.m_maxhp += 200 * (ms.herodata.LH);
                    this.m_minatk += 100 * (ms.herodata.LH);
                    this.m_maxatk += 100 * (ms.herodata.LH);
                    this.m_def += 10 * (ms.herodata.LH);

                    // otherheroservedata.MADamage.baseVal += 80 * (ms.herodata.LH + 1) + 99999;
                    // otherheroservedata.MDDamage.baseVal += 25 * (ms.herodata.LH + 1) + 99999;



                    for(let key in msMoudle.herojson) {
                        if(msMoudle.herojson[key].id == ms.otherheroservedata[this.teamIndex].id) {
                            this.m_skill_1 = msMoudle.herojson[key].skill_1;
                            break;
                        }
                    }
                    // if(this.m_lv >= 9) this.m_skill_2 = ms.otherheroservedata[this.teamIndex].Skill_2;
                    // if(this.m_lv >= 15) this.m_skill_3 = ms.otherheroservedata[this.teamIndex].Skill_3;
                    // if(this.m_lv >= 22) this.m_skill_4 = ms.otherheroservedata[this.teamIndex].Skill_4;
                }

                ///修正生命值
                this.m_hp = Math.round((1 + this.p_hp) * this.m_hp);
                this.m_maxhp = this.m_hp;

                if((this.teamIndex == 100 || this.otherP)) {
                    if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                        if(msMoudle.hp <= 0) {
                            msMoudle.hp = this.m_maxhp;
                            msMoudle.maxmp = 100;
                        }
                        else this.m_hp = msMoudle.hp;
                        msMoudle.maxhp = this.m_maxhp;
                        msMoudle.updateHP();
                        // msMoudle.updateMP();
                    }
                }
            }

        }

        public updHeroDataFast() : void {
            if((this.teamIndex == 100 || this.otherP)) {
                let pad:any = ms.herodata.CalcAttackRange();
                this.m_minatk = pad.minatk;
                this.m_maxatk = pad.maxatk;

                ///
            }
        }

        // aBound:Laya.Sprite;
        private judgeBound() : void {
            if(this.m_id != ms.user && this.m_id) return;
            if(this.skillId == "2111003") return ;

            ////注意
            if(msMoudle.findKeyFromArr(this.skillId, msMoudle.m_skill4)) return ;
            if(msMoudle.findKeyFromArr(this.skillId, msMoudle.m_skill5)) return ;

            if(this.m_armyList) {

                let attackCount:number = 1;
                let mobCount:number = 1;
                let damage:number = 100;

                //这里应该是攻击最近的那几个
                let mobLeaveArray:Array<any> = [];

                if(this.skillId == "2301005" || this.skillId == "2101004") {
                    this.atktype = 2;
                }
                else if(this.skillId == "4211004") {
                    this.atktype = 3;
                }
                ////////问题出在这里
                mobLeaveArray = this.____x;

                if(this.is_skill) {
                    ///有些技能不一定有30级
                    if(this.skillId == "2001005") attackCount = 2;
                    else if(this.skillId == "4201005" || this.skillId == "5121007" || this.skillId == "5101003") attackCount = 1;
                    else {
                        if(this.skill_data["skill." + this.skillId + ".level.30.attackCount"]) {
                            let atkcount = this.skill_data["skill." + this.skillId + ".level.30.attackCount"];
                            if(atkcount.indexOf("+d") >= 0) {
                                attackCount = Number(atkcount.split("+d")[0]);
                            }
                            else {
                                attackCount = Number(atkcount);
                            }
                        }
                        else if(this.skill_data["skill." + this.skillId + ".common.attackCount"]) {
                            let atkcount = this.skill_data["skill." + this.skillId + ".common.attackCount"];
                            if(atkcount.indexOf("+d") >= 0) {
                                attackCount = Number(atkcount.split("+d")[0]);
                            }
                            else {
                                attackCount = Number(atkcount);
                            }
                        }
                        // damage = Number(this.skill_data["skill." + this.skillId + ".level.30.damage"]);
                        if(this.skill_data["skill." + this.skillId + ".level.30.mobCount"]) {
                            let mcot = this.skill_data["skill." + this.skillId + ".level.30.mobCount"];
                            if(mcot.indexOf("+d") >= 0) {
                                mobCount = Number(mcot.split("+d")[0]);
                            }
                            else {
                                mobCount = Number(mcot);
                            }
                        }
                        else if(this.skill_data["skill." + this.skillId + ".common.mobCount"]) {
                            let mcot = this.skill_data["skill." + this.skillId + ".common.mobCount"];
                            if(mcot.indexOf("+d") >= 0) {
                                mobCount = Number(mcot.split("+d")[0]);
                            }
                            else {
                                mobCount = Number(mcot);
                            }
                        }
                    }

                }
                if(this.atktype == 3) {
                    attackCount = 1;
                }

                // if(this.skillId == "1321012") attackCount = 1;
                // mobCount = 100;
                // console.log("攻击ren  " + attackCount + "  " + mobCount + "  " + mobLeaveArray.length)
                // msMoudle.toast(mobCount.toString())
                //开始显示伤害
                let hitnum:number = 0;
                if(this.atkBound) {
                    let aBound = this.atkBound.getBounds();
                    for(let _:number = 0; _ < mobLeaveArray.length; _++) {  //如果有bug换回这个
                        if(hitnum < mobCount) {
                            let mob = mobLeaveArray[_];
                            if(mob && (!msMoudle.isBossMap() || !mob.m_protect)) {
                                if(mob.m_isdead == false) {
                                    if(mob.hitBound && aBound) {
                                        //1锁定2远程
                                        if(aBound.intersects(mob.hitBound.getBounds()) || this.atktype == 1 || this.atktype == 2 || this.atktype == 3 || this.m_test) {
                                            let _atk:number = msMoudle.getRandValue(this.m_minatk, 0, this.m_maxatk - this.m_minatk);

                                            ////充值和伤害的关系
                                            if(ms.test_cz == 0) {
                                                if(_atk > 9999) _atk = 9999;
                                            }
                                            else if(ms.test_cz < 100) {
                                                if(_atk > 99999) _atk = 99999;
                                            }
                                            else if(ms.test_cz < 200) {
                                                if(_atk > 199999) _atk = 199999;
                                            }
                                            else if(ms.test_cz < 300) {
                                                if(_atk > 299999) _atk = 299999;
                                            }
                                            else if(ms.test_cz < 400) {
                                                if(_atk > 399999) _atk = 399999;
                                            }
                                            else if(ms.test_cz < 500) {
                                                if(_atk > 499999) _atk = 499999;
                                            }
                                            //500以上无限制

                                            let minatk:number = _atk;
                                            let maxatk:number = _atk;

                                            minatk = minatk * (1 + this.p_atk) - mob.m_def * (1 + mob.p_def);
                                            if(minatk <= 0) minatk = 1;

                                            // minatk = 1;
                                            // maxatk = 1;

                                            hitnum += 1;

                                            //计算伤害
                                            let hit:Array<any> = [];
                                            for(let i:number = 0; i < attackCount; i++) {
                                                let _target:number = msMoudle.getRandValue(0, 0, 100);
                                                if(_target <= (this.m_target + this.p_target) - (mob.m_miss + mob.p_miss) ) {
                                                    let _bj:number = msMoudle.getRandValue(0, 0, 100);
                                                    ///角色暴击
                                                    if(_bj <= this.m_baoji + this.p_baoji ) {
                                                        hit[i] = {num : msMoudle.getRandValue(minatk, minatk, maxatk) * (damage / 100) / attackCount, bj:true};
                                                        hit[i].num *= 2;
                                                        if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                                                            //金钱爆炸
                                                            if(msMoudle.m_skill[this.selJob] == "4211006" && this.skillId == "4211006") {
                                                                hit[i].num *= 10;
                                                            }
                                                            //杀杀杀
                                                            else if(msMoudle.m_skill3[this.selJob] == "4201005" && this.skillId == "4201005") {
                                                                hit[i].num /= 2;
                                                            }
                                                        }

                                                        ////充值和伤害的关系
                                                        // if(ms.test_cz == 0) {
                                                        //     if(hit[i].num > 9999) hit[i].num = 9999;
                                                        // }
                                                        // else if(ms.test_cz < 100) {
                                                        //     if(hit[i].num > 99999) hit[i].num = 99999;
                                                        // }

                                                        mob.m_hp -= Math.floor(hit[i].num);
                                                    }
                                                    else {
                                                        hit[i] = {num : msMoudle.getRandValue(minatk, minatk, maxatk) * (damage / 100) / attackCount, bj:false};
                                                        if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                                                            //金钱爆炸
                                                            if(msMoudle.m_skill[this.selJob] == "4211006" && this.skillId == "4211006") {
                                                                hit[i].num *= 10;
                                                            }
                                                            //杀杀杀
                                                            else if(msMoudle.m_skill3[this.selJob] == "4201005" && this.skillId == "4201005") {
                                                                hit[i].num /= 2;
                                                            }
                                                        }
                                                        // ////充值和伤害的关系
                                                        // if(ms.test_cz == 0) {
                                                        //     if(hit[i].num > 9999) hit[i].num = 9900 + msMoudle.getRandValue(0, 0, 100);
                                                        // }
                                                        // else if(ms.test_cz < 100) {
                                                        //     if(hit[i].num > 99999) hit[i].num = 99900 + msMoudle.getRandValue(0, 0, 100);
                                                        // }
                                                        mob.m_hp -= Math.floor(hit[i].num);
                                                    }
                                                }
                                                else {
                                                    hit[i] = {num : 0, bj:false};
                                                }
                                            }

                                            mob.hpBar.visible = true;
                                            mob.hpBar.value = Number(mob.m_hp / mob.m_maxhp);
                                            // mob.m_nametag_sp.addChild(mob.hpBar);

                                            //效果
                                            if(this.m_skill_1 == "1001004") {
                                                if(mob.m_hp > 0) {
                                                    // console.log("击晕");
                                                    if(msMoudle.getRandValue(0, 0, 100) < 25)
                                                        mob.showBuf(0, 2000);
                                                }
                                            }

                                            if( (msMoudle.isBoss || msMoudle.isWorldBoss || msMoudle.team_guanka == 3) && mob.m_isboss ) {
                                                msMoudle.gameP.boss_hp.value = mob.hpBar.value;
                                                msMoudle.gameP.boss_text.text = mob.m_hp + "/" + mob.m_maxhp;
                                                msMoudle.gameP.boss_hp.visible = true;
                                            }
                                            else mob.m_nametag_sp.addChild(mob.hpBar);


                                            if(this.m_skill) {
                                                let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                                                mob.m_sp.addChild(this.m_skill.hitAni[_]);
                                                // if(this.m_skill.specialAni2[_]) mob.m_nametag_sp.addChild(this.m_skill.specialAni2[_]);
                                                let m_head_x = 0;
                                                let m_head_y = 0;
                                                if(msMoudle.isTileSkill(this.skillId)) {
                                                    if(mob.mobData) {
                                                        if(mob.mobData[0]) {
                                                            if(mob.mobData[0].head) {
                                                                m_head_x = Number(mob.mobData[0].head.x);
                                                                if(!hitAfter)
                                                                    m_head_y = Number(mob.mobData[0].head.y);
                                                            }
                                                        }
                                                    }
                                                }

                                                let sphit:boolean = false;
                                                if(this.m_skill) {
                                                    if(this.m_skill.m_data) {
                                                        if(this.m_skill.m_data["skill." + this.skillId + ".hit." + (_ + 1) + ".hitAfter"]) {
                                                            sphit = true;
                                                            // hitdelay = Number(this.m_data["skill." + this.m_id + ".hit." + (index + 1) + ".hitAfter"]);
                                                        }
                                                    }
                                                    if(sphit) {
                                                        this.m_skill.doHitAction2(_, 0, mob, m_head_x, m_head_y);
                                                    }
                                                    else {
                                                        // if(hitnum == 1)
                                                        this.m_skill.doHitAction(_, 0, mob, m_head_x, m_head_y);
                                                    }
                                                }

                                                // //圣光走这
                                                // if(msMoudle.isTileSkill(this.skillId)) {
                                                //     let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                                                //     // console.log("!", Date.now(), attackCount, hitAfter, this.m_atkspeed)
                                                //     //伤害显示
                                                //     msMoudle.mainT.m_forcecontrol = false;
                                                //     Laya.timer.once(Number(hitAfter) / (this.m_atkspeed + this.p_atkspeed), this, this.showNum, [mob, hit, true], false)
                                                // }
                                                // else {
                                                //     this.showNum(mob, hit);
                                                // }

                                            }

                                            if(msMoudle.isTileSkill(this.skillId)) {
                                                let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                                                // console.log(attackCount)
                                                //伤害显示
                                                msMoudle.mainT.m_forcecontrol = false;
                                                Laya.timer.once(Number(hitAfter) / (this.m_atkspeed + this.p_atkspeed), this, this.showNum, [mob, hit, true], false)
                                            }
                                            else {
                                            // console.log(hit)
                                                this.showNum(mob, hit);
                                            }
                                        }
                                    }

                                }
                            }
                        }
                        else break;
                    }
                }

                //回血
                if(this.skillId == "2301002") {
                    let _atk:number = msMoudle.getRandValue(this.m_minatk, 0, this.m_maxatk - this.m_minatk);
                    for(let i:number = 0; i < this.____y.length; i++) {
                        //前提是活得
                        if(this.____y[i].m_hp > 0) {
                            let hit:Array<any> = [];
                            hit[0] = {num : Math.floor(_atk * 0.5 * (1 + this.p_atk) ), bj:false};
                            if(this.____y[i].m_hp < this.____y[i].m_maxhp) {
                                this.____y[i].m_hp += Math.floor(_atk * 0.2 * (1 + this.p_atk) );
                                if(this.____y[i].m_hp > this.____y[i].m_maxhp) this.____y[i].m_hp = this.____y[i].m_maxhp;
                                this.____y[i].hpBar.value = Number(this.____y[i].m_hp / this.____y[i].m_maxhp);
                            }
                            let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
                            nb.ShowNumber(this.m_parent, hit, this.____y[i].m_x, this.____y[i].m_y - 100, 1, 2, this.m_id, this.is_skill);
                        }
                    }
                }

            }

            if(this._mainhero) {
                if(this.reactor_id >= 0) {
                    if(msMoudle.mapP.m_reactor.reactors[this.reactor_id]) {
                        msMoudle.mapP.m_reactor.reactors[this.reactor_id].hitReactor();
                        this.reactor_id = -1;///每次只能一次
                    }
                }
            }

            // }
        }

        public judgeBulletBound() : void {
            if(this.m_armyList) {

                let attackCount:number = 1;
                let mobCount:number = 1;
                let damage:number = 100;

                //这里应该是攻击最近的那几个
                let mobLeaveArray:Array<any> = [];

                if(this.skillId == "2301005" || this.skillId == "2101004") {
                    this.atktype = 2;
                }
                else if(this.skillId == "4211004") {
                    this.atktype = 3;
                }
                ////////问题出在这里
                mobLeaveArray = this.____x;

                if(this.is_skill) {
                    ///有些技能不一定有30级
                    if(this.skillId == "2001005") attackCount = 2;
                    else if(this.skillId == "4201005" || this.skillId == "5121007" || this.skillId == "5101003") attackCount = 1;
                    else {
                        if(this.skill_data["skill." + this.skillId + ".level.30.attackCount"]) {
                            let atkcount = this.skill_data["skill." + this.skillId + ".level.30.attackCount"];
                            if(atkcount.indexOf("+d") >= 0) {
                                attackCount = Number(atkcount.split("+d")[0]);
                            }
                            else {
                                attackCount = Number(atkcount);
                            }
                        }
                        else if(this.skill_data["skill." + this.skillId + ".common.attackCount"]) {
                            let atkcount = this.skill_data["skill." + this.skillId + ".common.attackCount"];
                            if(atkcount.indexOf("+d") >= 0) {
                                attackCount = Number(atkcount.split("+d")[0]);
                            }
                            else {
                                attackCount = Number(atkcount);
                            }
                        }
                        // damage = Number(this.skill_data["skill." + this.skillId + ".level.30.damage"]);
                        if(this.skill_data["skill." + this.skillId + ".level.30.mobCount"]) {
                            let mcot = this.skill_data["skill." + this.skillId + ".level.30.mobCount"];
                            if(mcot.indexOf("+d") >= 0) {
                                mobCount = Number(mcot.split("+d")[0]);
                            }
                            else {
                                mobCount = Number(mcot);
                            }
                            // msMoudle.toast("数量" + mobCount)
                        }
                        else if(this.skill_data["skill." + this.skillId + ".common.mobCount"]) {
                            let mcot = this.skill_data["skill." + this.skillId + ".common.mobCount"];
                            if(mcot.indexOf("+d") >= 0) {
                                mobCount = Number(mcot.split("+d")[0]);
                            }
                            else {
                                mobCount = Number(mcot);
                            }
                        }
                    }

                }
                if(this.atktype == 3) {
                    attackCount = 1;
                }
                // if(this.skillId == "1321012") attackCount = 1;
                // mobCount = 100;
                // console.log("攻击ren  " + attackCount + "  " + mobCount + "  " + mobLeaveArray.length)
                // msMoudle.toast(mobCount.toString())
                //开始显示伤害
                let hitnum:number = 0;
                for(let _:number = 0; _ < mobLeaveArray.length; _++) {  //如果有bug换回这个
                    if(hitnum < mobCount) {
                        let mob = mobLeaveArray[_];
                        if(mob) {
                            if(mob.m_isdead == false) {
                                if(mob.hitBound) {
                                    for(let _b:number = 0; _b < this.bulletLst.length; _b++) {
                                        if(this.bulletLst[_b] && this.bulletLst[_b].atkBound) {
                                            //1锁定2远程
                                            if(this.bulletLst[_b].atkBound.getBounds().intersects(mob.hitBound.getBounds())) {
                                                let _atk:number = msMoudle.getRandValue(this.m_minatk, 0, this.m_maxatk - this.m_minatk);

                                                ////充值和伤害的关系
                                                if(ms.test_cz == 0) {
                                                    if(_atk > 9999) _atk = 9999;
                                                }
                                                else if(ms.test_cz < 100) {
                                                    if(_atk > 99999) _atk = 99999;
                                                }
                                                else if(ms.test_cz < 200) {
                                                    if(_atk > 199999) _atk = 199999;
                                                }
                                                else if(ms.test_cz < 300) {
                                                    if(_atk > 299999) _atk = 299999;
                                                }
                                                else if(ms.test_cz < 400) {
                                                    if(_atk > 399999) _atk = 399999;
                                                }
                                                else if(ms.test_cz < 500) {
                                                    if(_atk > 499999) _atk = 499999;
                                                }
                                                //500以上无限制

                                                let minatk:number = _atk;
                                                let maxatk:number = _atk;

                                                minatk = minatk * (1 + this.p_atk) - mob.m_def * (1 + mob.p_def);
                                                if(minatk <= 0) minatk = 1;

                                                // minatk = 1;
                                                // maxatk = 1;

                                                hitnum += 1;

                                                //计算伤害
                                                let hit:Array<any> = [];
                                                for(let i:number = 0; i < attackCount; i++) {
                                                    let _target:number = msMoudle.getRandValue(0, 0, 100);
                                                    if(_target <= (this.m_target + this.p_target) - (mob.m_miss + mob.p_miss) ) {
                                                        let _bj:number = msMoudle.getRandValue(0, 0, 100);
                                                        ///角色暴击
                                                        if(_bj <= this.m_baoji + this.p_baoji ) {
                                                            hit[i] = {num : msMoudle.getRandValue(minatk, minatk, maxatk) * (damage / 100) / attackCount, bj:true};
                                                            hit[i].num *= 2;
                                                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                                                                //金钱爆炸
                                                                if(msMoudle.m_skill[this.selJob] == "4211006" && this.skillId == "4211006") {
                                                                    hit[i].num *= 10;
                                                                }
                                                                //杀杀杀
                                                                else if(msMoudle.m_skill3[this.selJob] == "4201005" && this.skillId == "4201005") {
                                                                    hit[i].num /= 2;
                                                                }
                                                            }

                                                            // if(ms.test_cz == 0) {
                                                            //     if(hit[i].num > 9999) hit[i].num = 9999;
                                                            // }
                                                            // else if(ms.test_cz < 100) {
                                                            //     if(hit[i].num > 99999) hit[i].num = 99999;
                                                            // }

                                                            mob.m_hp -= Math.floor(hit[i].num);
                                                        }
                                                        else {
                                                            hit[i] = {num : msMoudle.getRandValue(minatk, minatk, maxatk) * (damage / 100) / attackCount, bj:false};
                                                            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                                                                //金钱爆炸
                                                                if(msMoudle.m_skill[this.selJob] == "4211006" && this.skillId == "4211006") {
                                                                    hit[i].num *= 10;
                                                                }
                                                                //杀杀杀
                                                                else if(msMoudle.m_skill3[this.selJob] == "4201005" && this.skillId == "4201005") {
                                                                    hit[i].num /= 2;
                                                                }
                                                            }

                                                            // if(ms.test_cz == 0) {
                                                            //     if(hit[i].num > 9999) hit[i].num = 9900 + msMoudle.getRandValue(0, 0, 100);
                                                            // }
                                                            // else if(ms.test_cz < 100) {
                                                            //     if(hit[i].num > 99999) hit[i].num = 99900 + msMoudle.getRandValue(0, 0, 100);
                                                            // }
                                                            mob.m_hp -= Math.floor(hit[i].num);
                                                        }
                                                    }
                                                    else {
                                                        hit[i] = {num : 0, bj:false};
                                                    }
                                                }

                                                mob.hpBar.visible = true;
                                                mob.hpBar.value = Number(mob.m_hp / mob.m_maxhp);
                                                // mob.m_nametag_sp.addChild(mob.hpBar);

                                                //效果
                                                if(this.m_skill_1 == "1001004") {
                                                    if(mob.m_hp > 0) {
                                                        // console.log("击晕");
                                                        if(msMoudle.getRandValue(0, 0, 100) < 25)
                                                            mob.showBuf(0, 2000);
                                                    }
                                                }

                                                if( (msMoudle.isBoss || msMoudle.isWorldBoss || msMoudle.team_guanka == 3) && mob.m_isboss ) {
                                                    msMoudle.gameP.boss_hp.value = mob.hpBar.value;
                                                    msMoudle.gameP.boss_text.text = mob.m_hp + "/" + mob.m_maxhp;
                                                    msMoudle.gameP.boss_hp.visible = true;
                                                }
                                                else mob.m_nametag_sp.addChild(mob.hpBar);


                                                if(this.m_skill) {
                                                    let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                                                    mob.m_sp.addChild(this.m_skill.hitAni[_]);
                                                    // if(this.m_skill.specialAni2[_]) mob.m_nametag_sp.addChild(this.m_skill.specialAni2[_]);
                                                    let m_head_x = 0;
                                                    let m_head_y = 0;
                                                    if(msMoudle.isTileSkill(this.skillId)) {
                                                        if(mob.mobData) {
                                                            if(mob.mobData[0]) {
                                                                if(mob.mobData[0].head) {
                                                                    m_head_x = Number(mob.mobData[0].head.x);
                                                                    if(!hitAfter)
                                                                        m_head_y = Number(mob.mobData[0].head.y);
                                                                }
                                                            }
                                                        }
                                                    }

                                                    let sphit:boolean = false;
                                                    if(this.m_skill) {
                                                        if(this.m_skill.m_data) {
                                                            if(this.m_skill.m_data["skill." + this.skillId + ".hit." + (_ + 1) + ".hitAfter"]) {
                                                                sphit = true;
                                                                // hitdelay = Number(this.m_data["skill." + this.m_id + ".hit." + (index + 1) + ".hitAfter"]);
                                                            }
                                                        }
                                                        if(sphit) {
                                                            this.m_skill.doHitAction2(_, 0, mob, m_head_x, m_head_y);
                                                        }
                                                        else {
                                                            this.m_skill.doHitAction(_, 0, mob, m_head_x, m_head_y);
                                                        }
                                                    }

                                                }


                                                if(msMoudle.isTileSkill(this.skillId)) {
                                                    let hitAfter = this.skill_data["skill." + this.skillId + ".hit.0.hitAfter"];
                                                    // console.log(attackCount)
                                                    //伤害显示
                                                    msMoudle.mainT.m_forcecontrol = false;
                                                    Laya.timer.once(Number(hitAfter) / (this.m_atkspeed + this.p_atkspeed), this, this.showNum, [mob, hit, true], false)
                                                }
                                                else {
                                                // console.log(hit)
                                                    this.showNum(mob, hit);
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                    else break;
                }

                //回血
                if(this.skillId == "2301002") {
                    let _atk:number = msMoudle.getRandValue(this.m_minatk, 0, this.m_maxatk - this.m_minatk);
                    for(let i:number = 0; i < this.____y.length; i++) {
                        //前提是活得
                        if(this.____y[i].m_hp > 0) {
                            let hit:Array<any> = [];
                            hit[0] = {num : Math.floor(_atk * 0.5 * (1 + this.p_atk) ), bj:false};
                            if(this.____y[i].m_hp < this.____y[i].m_maxhp) {
                                this.____y[i].m_hp += Math.floor(_atk * 0.2 * (1 + this.p_atk) );
                                if(this.____y[i].m_hp > this.____y[i].m_maxhp) this.____y[i].m_hp = this.____y[i].m_maxhp;
                                this.____y[i].hpBar.value = Number(this.____y[i].m_hp / this.____y[i].m_maxhp);
                            }
                            let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
                            nb.ShowNumber(this.m_parent, hit, this.____y[i].m_x, this.____y[i].m_y - 100, 1, 2, this.m_id, this.is_skill);
                        }
                    }
                }

            }
        }

        delayC() :void {
            msMoudle.mainT.m_forcecontrol = true;
        }

        playMobSound(mob: any, ext: string) {
            if(!mob || !mob.msgData) return ;
            let wzInfo = msMoudle.wz["SMob.img"];
            if(!wzInfo) return;
            let id = mob.msgData.id;
            while(true) {
                if(!wzInfo[id] || !wzInfo[id][id + ext]) return;
                let s_ = wzInfo[id][id + ext];
                if(s_.indexOf("../") >= 0) {
                    let sArr = s_.split("/");
                    if(!sArr || sArr.length < 2) return;
                    id = sArr[1];
                }
                else {
                    break;
                }
            }
            msMoudle.playSound("res/Sound/Mob.img/" + id + ext);
        }

        showNum(mob:any, hit:any, delaycontrol:boolean = false) : void {
            // console.log("#showNum," ,hit)
            if(!mob) return ;
            //test
            let hasSend = false;
            //end test

            // if((this.teamIndex == 100 || this.otherP)) {
                // if(mob.msgData) {
                //     if(msMoudle.wz["SMob.img"] && msMoudle.wz["SMob.img"][mob.msgData.id]) {
                //         let s_ = msMoudle.wz["SMob.img"][mob.msgData.id][mob.msgData.id + ".Damage"];
                //         if(s_ && s_.indexOf("../") >= 0) {
                //             let ss_ = s_.split("/");
                //             msMoudle.playSound("res/Sound/Mob.img/" + ss_[1] + ".Damage")
                //         }
                //         else {
                //             msMoudle.playSound("res/Sound/Mob.img/" + mob.msgData.id + ".Damage")
                //         }
                //     }
                // }
            this.playMobSound(mob, ".Damage")

            if(delaycontrol) {
                // Laya.timer.once(100, this, this.delayC, [], true);
                msMoudle.mainT.m_forcecontrol = true;
            }
            let nb:cssNumber = Laya.Pool.getItemByClass("NumberRole.Number", NumberRole.Number);//new cssNumber();
            if(mob.mobData) {
                if(mob.mobData[0]) {
                    if(mob.mobData[0].head) {
                        // console.log(mob.mobData[0].head)
                        if(mob.mobData[0].head.x != -999 && mob.mobData[0].head.y != -999) {
                            nb.ShowNumber(this.m_parent, hit, mob.m_x + Number(mob.mobData[0].head.x), mob.m_y + Number(mob.mobData[0].head.y), 2, 1, this.m_id, this.is_skill);
                        }
                        else {
                            nb.ShowNumber(this.m_parent, hit, mob.m_x, mob.m_y-90, 2, 1, this.m_id, this.is_skill);
                        }
                    }
                    else {
                        nb.ShowNumber(this.m_parent, hit, mob.m_x, mob.m_y, 2, 1, this.m_id, this.is_skill);
                    }
                }
                else {
                    nb.ShowNumber(this.m_parent, hit, mob.m_x, mob.m_y, 2, 1, this.m_id, this.is_skill);
                }
            }
            else {
                if(this._pvp == false) {
                    nb.ShowNumber(this.m_parent, hit, mob.m_x, mob.m_y  - 100, 2, 1, this.m_id, this.is_skill);
                }
                else {
                    nb.ShowNumber(this.m_parent, hit, mob.m_x, mob.m_y  - 100, 1, 1, this.m_id, this.is_skill);
                }
            }
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
                    if(msMoudle.mapP && (msMoudle.isAuMap(msMoudle.mapP.m_id) == false || msMoudle.guaji) && msMoudle.mapP.m_id != "000020000_gai.img" /*&& msMoudle.mapP.m_id != "240060200.img"*/) {// && ms.huoli > 0 // && msMoudle.mapP.m_id != "280030100.img"
                        let mb:cssMonsterBook = new cssMonsterBook();
                        // let reward:any = mb.getMobRewardAndRand( Number(100100).toFixed(0) );
                        if(msMoudle.mainT) {
                            // if(msMoudle.mainT.m_itemList.length < 30) {
                            // msMoudle.getRw(mob);
                            let reward:any = mb.getRandReward(mob);

                            if(this.m_id == ms.user) { //自己操作的角色，发送攻击怪物协议
                                hasSend = true;
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
                            else if(!this.m_id) {
                                let addExp = msMoudle.getMobExp(mob);
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
                            // }
                            // else {
                            //     //能够获得经验，但不会掉落物品
                            //     mb.getRandReward(mob, false, true);
                            // }
                        }
                    }

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

                                    // console.log("###mob dead, id=", mob.msgData.id)
                                    if(msMoudle.isBossMap()) {
                                        let deadCnt = 0;
                                        let mainBody:any;
                                        for(let i=0; i<msMoudle.mapP.m_life.m_mobsAni.length; ++i) {
                                            let mob2 = msMoudle.mapP.m_life.m_mobsAni[i];
                                            if(mob2.m_id != "8800000.img") {
                                                if(mob2.m_hp <= 0) ++deadCnt;
                                            }
                                            else {
                                                mainBody = mob2;
                                            }
                                        }
                                        // console.log("###mob dead, id=", mob.msgData.id, deadCnt)
                                        if(deadCnt == 8 && mainBody) {
                                            Laya.timer.once(2500, this, this.clearMobProtect, [mainBody]);
                                        }
                                    }
                                }
                            }
                            //黑龙
                            else if(msMoudle.mapP.m_id == "240060200.img") {
                                if(mob.msgData.id != "8810018") {
                                    mob.changeByName("die1", 1);////

                                    // console.log("###mob dead, id=", mob.msgData.id)
                                    if(msMoudle.isBossMap()) {
                                        let deadCnt = 0;
                                        let mainBody:any;
                                        for(let i=0; i<msMoudle.mapP.m_life.m_mobsAni.length; ++i) {
                                            let mob2 = msMoudle.mapP.m_life.m_mobsAni[i];
                                            if(mob2.m_id != "8810018.img") {
                                                if(mob2.m_hp <= 0) ++deadCnt;
                                            }
                                            else {
                                                mainBody = mob2;
                                            }
                                        }
                                        // console.log("###mob dead, id=", mob.msgData.id, deadCnt)
                                        if(deadCnt == 8 && mainBody) {
                                            Laya.timer.once(2500, this, this.clearMobProtect, [mainBody]);
                                        }
                                    }
                                }
                            }
                        }
                    else {
                        mob.changeByName("die1", 1);
                    }

                    ////
                }
                else {
                    mob.m_sp.visible = false;
                    if(mob.m_state_sp) mob.m_state_sp.visible = false;
                    mob.stopAutoFight();
                    if(this._pvp == true) {     //死亡的角色pvp
                        ///如果全灭
                        let alldead:boolean = true;
                        for(let i :number = 0; i < this.m_armyList.length; i++) {
                            if(this.m_armyList[i].m_hp > 0) {
                                alldead = false;
                                break;
                            }
                        }
                        if(alldead) ui.show(app.battle.BattleEndDlg);
                    }
                }
            }
            else {
                ///怪物自己记录谁在打他
                let issame:boolean = false;
                if(mob.hitMe) {
                    for(let _same:number = 0; _same < mob.hitMe.length; _same++) {
                        if(mob.hitMe[_same]) {
                            if(mob.hitMe[_same].m_name == this.m_name) {
                                issame = true;
                                break;
                            }
                        }
                    }
                    if(issame == false)
                        mob.hitMe[mob.hitMe.length] = this;
                }
                // console.log(this.m_name)
            }
            if(!hasSend && this.m_id == ms.user) { //自己操作的角色，发送攻击怪物协议
                Sync.attackMob(mob, hit);
            }
        }
        ////
        atktype:number = 0;         //0普通攻击  1法术锁定 2
        ____x:Array<any> = [];      //满足范围的敌人
        ____y:Array<any> = [];      //满足范围的已方

        testbound:Laya.Sprite;      //临时碰撞框
        private autoFight() : void {
            if(this.m_complete) {
                if(this.m_hp > 0 || this._mainhero) {
                    if(msMoudle.mapP.m_life && this.autoflag) {
                        if(this._pvp == true) {
                            if(msMoudle.mapP.m_life.m_charsAni) this.m_armyList = msMoudle.mapP.m_life.m_charsAni;
                        }
                        else {
                            if(msMoudle.mapP.m_life.m_mobsAni) this.m_armyList = msMoudle.mapP.m_life.m_mobsAni;
                        }
                    }
                    if(this._autofight && this.isOrgState() == false) {
                        let _canatk:boolean = false;
                        let _yongji:number = 0;     //1右 -1左
                        if(this.autoflag == true) {
                            if(this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("walk") >= 0) {
                                this.____x = [];
                                ////这里是否也可以做出预处理在_方法里面，减少cpu运算
                                ///需要提前判断是否可攻击
                                let a:any = new Object();
                                if(this.atkBound) {

                                    let aft:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
                                    ///
                                    // console.log("#####  " + this.is_skill);
                                    if(this.m_skill_1 != "N" &&
                                        this.m_skill_1 != "4201005" &&      //杀杀杀
                                        this.m_skill_1 != "5121007" &&
                                        this.m_skill_1 != "5101003" &&
                                        msMoudle.isAftSkill(this.m_skill_1) == false &&
                                        //this.m_skill_1 != "1311003" &&         //无双枪

                                        this.m_skill_1 != "1001004" &&         //强力一击
                                        this.m_skill_1 != "1001005" &&
                                        this.m_skill_1 != "3221007" &&
                                        this.m_skill_1 != "2301005" &&
                                        this.m_skill_1 != "2101004" &&
                                        this.m_skill_1 != "3211006" &&
                                        this.m_skill_1 != "4111005" &&
                                        this.m_skill_1 != "14111022" &&
                                        this.m_skill_1 != "4321006" &&
                                        this.m_skill_1 != "61121100"
                                    ) {
                                        // console.log(this.m_skill_1)
                                        let sdata =  msMoudle.wz[Math.floor(Number(this.m_skill_1) / 10000) + ".img"];
                                        if(sdata) {
                                            let data:any = sdata["skill." + this.m_skill_1];
                                            let lt:any = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".level.30.lt"]);
                                            let rb:any = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".level.30.rb"]);
                                            if(lt.x == -999 || lt.y == -999 || rb.x == -999 || rb.y == -999) {
                                                lt = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".common.lt"]);
                                                rb = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".common.rb"]);
                                            }

                                            if(lt.x == -999 || lt.y == -999 || rb.x == -999 || rb.y == -999) {
                                                let x:number = Number(data["skill." + this.m_skill_1 + ".level.30.x"]);
                                                if(x) {
                                                    // console.log("xxxxx")
                                                    lt.x = -x;
                                                    lt.y = -50;
                                                    rb.x = x;
                                                    rb.y = -50;
                                                }
                                                // lt = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".level.30.lt"]);
                                                // rb = msMoudle.Vec2FromArr(data["skill." + this.m_skill_1 + ".level.30.rb"]);
                                            }

                                            a.l = Number(lt.x);
                                            a.t = Number(lt.y);
                                            a.r = Number(rb.x);
                                            a.b = Number(rb.y);

                                            //只取70%
                                            // a.l *= 0.8;
                                            // a.r *= 0.8;
                                            // this.testbound.graphics.clear();
                                            // this.testbound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
                                            this.testbound.graphics.clear();
                                            this.testbound.graphics.drawRect(a.l * 0.7, a.t, a.r-a.l
                                            *0.7, a.b-a.t, null, "#ffffff");
                                        }
                                    }
                                    else {
                                        let wea_act:string = msMoudle.getWeaponAct(this.partIndex[msMoudle.partType.tWeapon]);
                                        if(msMoudle.wz[this.partIndex[msMoudle.partType.tAfterimage]]) {
                                            let data:any = msMoudle.wz[this.partIndex[msMoudle.partType.tAfterimage]]["0"];
                                            let lt: any = msMoudle.Vec2FromArr(data["0" + "." + wea_act + ".lt"]);
                                            let rb: any = msMoudle.Vec2FromArr(data["0" + "." + wea_act + ".rb"]);
                                            let weaRange = msMoudle.getWeaponRange(this.partIndex[msMoudle.partType.tWeapon]);
                                            if(this.m_skill_1 == "3221007") weaRange = 325;
                                            else if(this.m_skill_1 == "3211006") weaRange = 280;
                                            else if(this.m_skill_1 == "2301005" || this.m_skill_1 == "2101004") weaRange = 300;
                                            a.l = lt.x != -999 ? Number(lt.x) - weaRange + 40: -weaRange + 40;
                                            a.t = lt.y != -999 ? Number(lt.y) : -23;
                                            a.r = -0;//Number(rb.x);
                                            a.b = rb.y != -999 ? Number(rb.y) : -23;

                                            let h:number = a.b-a.t;
                                            h = h < 5 ? 5 : h;
                                            this.testbound.graphics.clear();
                                            this.testbound.graphics.drawRect(a.l, a.t, a.r-a.l, h, null, "#ffffff");
                                        }
                                    }
                                }
                                //敌方
                                for(let i:number = 0; i < this.m_armyList.length; i++) {
                                    let mob = this.m_armyList[i];
                                    if(mob) {
                                        if(mob.m_isdead == false) {
                                            /////这里如何处理让人物不要走在一起？？？？？
                                            if(this.atkBound) {
                                                if(a) {
                                                    this.atkBound.graphics.clear();
                                                    this.atkBound.graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
                                                }
                                                if(mob.hitBound) {
                                                    ///这里稍微修改一下
                                                    //感觉会有问题，可能前面的统计不到
                                                    ///??????为什么testbound就是不行
                                                    //如果太近了
                                                    if(this.testbound.getBounds().intersects(mob.hitBound.getBounds()) || this.m_test ||  (this.m_y == mob.m_y && Math.abs(this.m_x - mob.m_x) < 5 ) ) {
                                                        _canatk = true;
                                                        this.____x[this.____x.length] = mob;
                                                    }
                                                    // if(this.atkBound.getBounds().intersects(mob.hitBound.getBounds()) || this.m_test) {

                                                    // }
                                                }
                                            }
                                            //
                                        }
                                    }
                                }
                                this.____y = [];
                                if(this._pvp == false) {
                                    /////我方
                                    if(msMoudle.char) {
                                        if(msMoudle.char.m_hp > 0) {
                                            this.____y[this.____y.length] = msMoudle.char;
                                        }
                                    }
                                    for(let i:number = 0; i < msMoudle.mapP.heroList.length; i++) {
                                        if(msMoudle.mapP.heroList[i]) {
                                            if(msMoudle.mapP.heroList[i].m_hp > 0) {
                                                this.____y[this.____y.length] = msMoudle.mapP.heroList[i];
                                            }
                                        }
                                    }
                                }
                                else {
                                    for(let i:number = 0; i < msMoudle.mapP.m_life.m_mobsAni.length; i++) {
                                        if(msMoudle.mapP.m_life.m_mobsAni[i]) {
                                            if(msMoudle.mapP.m_life.m_mobsAni[i].m_hp > 0) {
                                                this.____y[this.____y.length] = msMoudle.mapP.m_life.m_mobsAni[i];
                                            }
                                        }
                                    }
                                }
                                ///将对方加入____x列表中
                                if(_canatk) {
                                    // console.log(this.____x.length);
                                    ///排序
                                    this.____x = this.MinDis(this.____x);
                                    if(this.____x[0]) {
                                        // console.log("#####");
                                        let _a = this.____x[0].hitMe;
                                        let _b = this.____x[0].hitMe;
                                        ////可以打的怪物列表
                                        ////最近的这只怪，打他的人中有没有拥挤的
                                        if(_a) {
                                            let isme:boolean = false;           /////首先优化判断是否有我
                                            for(let i:number = 0; i < _a.length; i++) {
                                                if(_a.length > 1) {     //至少还有2只怪才行
                                                    if(_a[i].m_x == this.m_x) {
                                                        isme = true;
                                                        break;
                                                    }
                                                }
                                            }
                                            if(isme) {
                                                for(let i:number = 0; i < _a.length; i++) {
                                                    for(let j:number = 0; j < _b.length; j++) {
                                                        if(i != j) {
                                                            if(Math.abs(_a[i].m_x - _b[j].m_x) < 30) {
                                                                let dis1:number = Math.abs(this.____x[0].m_x - _a[i].m_x);
                                                                let dis2:number = Math.abs(this.____x[0].m_x - _b[j].m_x);
                                                                if(dis1 <= dis2) {
                                                                    if(this.m_x == _a[i].m_x) {
                                                                        ///a比较近
                                                                        if(_a[i].m_x >= _b[j].m_x) {            ///a往右走
                                                                            _yongji = 1;
                                                                        }
                                                                        else {                                  ////a往左走
                                                                            _yongji = -1;
                                                                        }
                                                                        this.____x[0].hitMe.splice(i, 1);
                                                                    }
                                                                }
                                                                else {
                                                                    if(this.m_x == _b[j].m_x) {
                                                                        ///b比较近
                                                                        if(_b[j].m_x >= _a[i].m_x) {            ///b往右走
                                                                            _yongji = 1;
                                                                        }
                                                                        else {                                  ////b往左走
                                                                            _yongji = -1;
                                                                        }
                                                                        this.____x[0].hitMe.splice(j, 1);
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                ///将对方加入____y列表中
                                if(_canatk) {
                                    this.____y = this.MinDis(this.____y);
                                }
                            }
                        }
                        //如果处于战斗状态
                        if(_canatk && _yongji == 0) {
                            if(this._mainhero && this.m_hp <= 0) {
                                //主角死亡把召唤兽移除
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
                            else {
                                // if(this.m_state == null && this._mainhero == false) { //&& this._mainhero == false
                                //     this.showStateById("1111002");
                                //     // this.m_skill_1 = "1311001";
                                //     return ;
                                // }
                                // this.m_skill_1 = "N";
                                if(this.m_skill_1 != "N") {
                                    this.atktype = 3;

                                    //
                                    this.showSkillById(this.m_skill_1);
                                    Laya.timer.clear(this, this.autoFight);
                                    // Laya.timer.once(1000, this, () => {
                                    //     if(this.m_sp == null) return ;
                                    //     if(this._autofight) Laya.timer.frameLoop(1, this, this.autoFight);
                                    // });
                                }
                                else {
                                    //法师
                                    // console.log("武器 " + msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]))
                                    if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "手杖" || msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "短杖" || msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "长杖") {
                                        this.atktype = 1;
                                        this.showSkillById("2001005");
                                        Laya.timer.clear(this, this.autoFight);
                                        // Laya.timer.once(1000, this, () => {
                                        //     if(this.m_sp == null) return ;
                                        //     if(this._autofight) Laya.timer.frameLoop(1, this, this.autoFight);
                                        // });
                                    }
                                    else {
                                        this.showAtk(msMoudle.getWeaponAct(this.partIndex[msMoudle.partType.tWeapon]), this.m_armyList);
                                        this.atktype = 0;

                                        if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "拳套" ||
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弓" ||
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "双弩" ||
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "远古弓" ||
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弩" ||
                                            msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "短枪") {
                                            this.atktype = 2;
                                            ///弓箭手打完之后
                                            Laya.timer.clear(this, this.autoFight);
                                            Laya.timer.once(1500 / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, () => {
                                                if(this.m_sp == null) return ;
                                                if(this._autofight) Laya.timer.frameLoop(1, this, this.autoFight);
                                            });
                                        }
                                        else {
                                            Laya.timer.clear(this, this.autoFight);
                                            Laya.timer.once(1000 / ((this.m_atkspeed + this.p_atkspeed) / 1 + ((ms.speed - 1) / 1)), this, () => {
                                                if(this.m_sp == null) return ;
                                                if(this._autofight) Laya.timer.frameLoop(1, this, this.autoFight);
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            // if(!this._mainhero) console.log("xxxx   " + this._mainhero, this.m_action)
                            //寻找最近可攻击的怪物
                            if(_yongji == 0) {
                                this.updataDistance();
                            }
                            else {
                                this._autodir = _yongji;
                            }
                            // this._autodir = 0;
                            if(this._autodir == 1) {   //右
                                if(this.m_action.indexOf("stand") >= 0) {
                                    this.changeByName("walk", 0);
                                }
                                if(this.m_action.indexOf("walk") >= 0) {
                                    this.setDir(-1);
                                    if(this._mainhero) msMoudle.mainT.rightMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)) );
                                    else msMoudle.mainT.HerorightMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)));
                                }
                            }
                            else if(this._autodir == 2) {
                                if(this.m_action.indexOf("stand") >= 0) {
                                    this.changeByName("walk", 0);
                                }
                                if(this.m_action.indexOf("walk") >= 0) {
                                    this.setDir(1);
                                    if(this._mainhero) msMoudle.mainT.leftMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)));
                                    else msMoudle.mainT.HeroleftMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)));
                                }
                            }
                            else this.autoMove();
                        }
                    }
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
                        break;
                    }
                }
            }
            return mobLeaveArray;
        }

        //更新最短距离
        public updataDistance() : void {
            let autoleaveX1:number = 9999999;
            let autoleaveX2:number = 9999999;
            this._autodir = 0;       //右方向
            for(let j:number = 0; j < this.m_armyList.length; j++) {
                let mob = this.m_armyList[j];
                if(mob) {
                    //
                    if(mob.m_isdead == false) {
                        if(msMoudle.idOldMap(msMoudle.mapP.m_id) == false || (msMoudle.idOldMap(msMoudle.mapP.m_id) && this.m_y >= mob.m_y - 45 && this.m_y <= mob.m_y + 45) ) {
                            if(this.m_x > mob.m_x) {
                                if(autoleaveX1 > (this.m_x - mob.m_x) ) autoleaveX2 = (this.m_x - mob.m_x);
                            }
                            else if(this.m_x < mob.m_x){
                                if(autoleaveX2 > (mob.m_x - this.m_x)) autoleaveX1 = (mob.m_x - this.m_x);
                            }
                            else {

                            }
                        }
                    }
                }
            }
            if(autoleaveX2 == autoleaveX1) {}
            else {
                if(autoleaveX1 > autoleaveX2) this._autodir = 2;
                else if(autoleaveX1 < autoleaveX2) this._autodir = 1;
            }
        }

        //如果当前不可f，随机一个方向
        timeN:number = 300;
        private autoMove() : void {
            if(this.timeN <= 0) {             //状态变化时间
                this.timeN = 300;
                this.timeN = msMoudle.getRandValue(0, 0, 100) * 10;
                this.m_dir = msMoudle.getRandValue(0, 0, 100) < 50 ? -1 : 1;
                let stateN = msMoudle.getRandValue(0, 0, 100) < 50 ? "walk" : "stand";
                this.changeByName(stateN, 0);
                this.setDir(this.m_dir);
            }
            else {
                this.timeN -= 10;
                if(this.m_action.indexOf("walk") >= 0) {
                    if(this.m_dir == -1) {
                        if(msMoudle.mainT.onWall(this, this.m_dir) == false) {
                            if(this._mainhero) msMoudle.mainT.rightMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1));
                            else msMoudle.mainT.HerorightMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)));
                        }
                    }
                    else {
                        if(msMoudle.mainT.onWall(this, this.m_dir) == false) {
                            if(this._mainhero) msMoudle.mainT.leftMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1));
                            else  msMoudle.mainT.HeroleftMove(this, 2 * ((this.m_walkspeed+this.p_walkspeed) / 1 + ((ms.speed - 1) / 1)));
                        }
                    }
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
                        this.stun.ShowStun(this.m_state_sp, Box, 4, "hero_stun", Number(this.bodyData[5][0].orgx), Number(this.bodyData[5][0].orgy) - 60);
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


        //攻击
        public showAtk(id:string, armyList:any) : void {
            // console.log("#show atk, ", id)
            this.skillId = "N";
            this.atktype = 0;
            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                // let _aftimage:string = msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.afterImage"];
                // if(_aftimage == "swordOL" || _aftimage == "swordTL")
                //     msMoudle.playSound("res/Sound/Weapon.img/swordL.Attack")
                // else if(_aftimage == "swordOS")
                //     msMoudle.playSound("res/Sound/Weapon.img/swordS.Attack")
                // else if(_aftimage == "crossBow")
                //     msMoudle.playSound("res/Sound/Weapon.img/cBow.Attack")
                // else if(_aftimage == "axe") {
                //     msMoudle.playSound("res/Sound/Weapon.img/swordZB.Attack")
                // }
                // else
                //     msMoudle.playSound("res/Sound/Weapon.img/" + _aftimage + ".Attack")

                msMoudle.playSound("res/Sound/Weapon.img/" + msMoudle.wz[this.partIndex[msMoudle.partType.tWeapon]]["info"]["info.sfx"] + ".Attack")
            }

            this.atkBound.graphics.clear();
            if(this.m_skill) {
                this.m_skill.clearUp();
                this.m_skill.removeSelf();
                this.m_skill = null;
            }
            this.is_skill = false;
            if(this.hitBound) this.hitBound.graphics.clear();
            if((this.teamIndex == 100 || this.otherP) && this.selJob != 11) {
                if(this.partIndex[msMoudle.partType.tTamingMob] != "N") {
                    if(id == "stand1" || id == "stand2" || id == "walk1" || id == "walk2" ||
                    id == "jump" || id == "prone" || id == "stand" || id == "walk") {}
                    else {
                        console.log("坐骑状态不支持该动作");
                        return ;
                    }
                }
            }
            this.m_armyList = armyList;

            this.getNormalAct();
            this.m_action = id;
            if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弓") {//
                this.m_action = "shoot1";
            }
            else if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "双弩") {//
                this.m_action = "shoot1";
            }
            else if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "远古弓") {
                this.m_action = "shoot1";//shootDb1
            }
            else if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弩") {
                this.m_action = "shoot2";
            }
            else if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "拳套") {
                this.m_action = "swingO3";
            }
            else if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "短枪") {
                this.m_action = "alert";
            }
            this.actionData();
            this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 1); //切动作不需要切表情
            this.loadBianShen(true);
            this.Addbullet();
        }


        /////技能追加问题
        // 164121003.additional_process.0</td><td>22</td></tr>
        // <tr><td>skill.164121003.addAttack.skill</td><td>164121004</td></tr>
        // <tr><td>skill.164121003.addAttack.type</td><td>1</td></tr>
        // <tr><td>skill.164121003.addAttack.isAuto</td><td>1</td></tr>
        // <tr><td>skill.164121003.

        //技能
        m_test:boolean = false;
        m_skill_end:boolean = true;
        public showSkillById(skillid:string, test:boolean = false) : void {

            if(this.m_action) {
                if(this.m_action.indexOf("walk")>=0 || this.m_action.indexOf("stand") >= 0) {}
                else if(this.m_skill_end == false) return;
                this.m_skill_end = false;
            }

            this.m_skillId = skillid;
            if(this.m_id && this.m_id == ms.user) {
                Sync.reportMyOperate("skill", [], []);
            }
            /////
            // if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {        ///不需要每次去找
            //     if((this.teamIndex == 100 || this.otherP)) {
            //         let M = msMoudle.updateSkillMP(skillid);
            //         if(M <= 0) {
            //             msMoudle.toast("魔法不足");
            //             return ;
            //         }
            //     }
            // }
            // console.log("###", skillid)

            let _skid = Math.floor(Number(skillid) / 10000);
            let sdata = msMoudle.wz[_skid + ".img"];

            if(!sdata) {
                let res:Array<any> = [];
                res.push({ url: "res/Skill/" + _skid + ".img/index.html" });
                msLoad.load(res).done(dlg => {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    sdata = msMoudle.wz[_skid + ".img"] = msMoudle.loadWZ(cs,"res/Skill/" + _skid + ".img/index.html", "ms2");
                    this.doSkill(sdata, skillid);
                });

            }
            else {
                this.doSkill(sdata, skillid);
            }

        }

        doSkill(sdata:any, skillid:any) : void {
            if(sdata) {
                if(skillid == "4111002") this.m_fenshen = true;

                // if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                //     if((this.teamIndex == 100 || this.otherP)) {
                //         if(skillid == "5121016" || skillid == "5121052") {
                //             this.bodyChange.skin = "";
                //         }
                //     }
                // }
                // this.atktype = 3;
                // this.m_test = test;
                // if(test) {
                //     this.____x[0] = this.m_armyList[0];
                // }

                // this.faceid = "default";
                if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                    this.atktype = 0;       //
                }

                // console.log(skillid)
                let data:any = sdata["skill." + skillid];
                if(data) {
                    //动作
                    // console.log(msMoudle.wz[ Math.floor(Number(skillid) / 10000) + ".img"])

                    this.is_skill = true;

                    this.skillId = skillid;
                    this.skill_data = data;
                    if(this.skillId == "2001005" || this.skillId == "2201004" || this.skillId == "2201005" ||
                    this.skillId == "4121007" || this.skillId == "14121002")
                        this.m_action = "swingO3";

                    else if(msMoudle.isBSkill(this.skillId)) {
                        this.m_action = "shoot1";

                    }
                    // else if(this.skillId == "3111003" || this.skillId == "3221007" || this.skillId == "3211006"
                    // || this.skillId == "3101005" || this.skillId == "3111006"
                    // // || this.skillId == "2301005"
                    // ) {
                    //     //skill.3211006.level.30.bulletCount    注意这个技能
                    //     this.m_action = "shoot1";
                    // }

                    else if(this.skillId == "4211004" || this.skillId == "4211006" || this.skillId == "5111004" || this.skillId == "152121042" || this.skillId == "164121044") {
                        this.m_action = "alert";
                    }
                    else {
                        this.m_action = this.skill_data["skill." + this.skillId +".level.1.action"];
                        if(this.m_action == null) this.m_action = this.skill_data["skill." + this.skillId + ".action.0"];
                    }

                    let isbasic:boolean = false;
                    // 指向本身就是basic
                    for(let key in msMoudle.actionFames) {
                        if(key == this.m_action) {
                            isbasic = true;
                            break;
                        }
                    }
                    //技能没有指向
                    if(msMoudle.findKeyFromArr(this.skillId, msMoudle.AllAtkSkills)) {
                        isbasic = true;
                        this.m_action = this.m_attack_list[msMoudle.getRandValue(0, 0, this.m_attack_list.length)];
                    }
                    //技能没有指向
                    if(msMoudle.findKeyFromArr(this.skillId, msMoudle.AllAlertSkills)) {
                        isbasic = true;
                        this.m_action = "alert";
                    }

                    // if(this.skillId == "5210000" && (this.teamIndex == 100 || this.otherP)) {
                    //     this.m_action = "coolingeffect";
                    // }
                    if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                        if((this.teamIndex == 100 || this.otherP)) {
                            if(skillid == "5121016" || skillid == "5121052") {
                                this.bodyChange.skin = "";
                                // this.m_action = "alert";
                            }
                        }
                    }

                    if(isbasic) this.actionData();
                    else this.skillactionData();

                    // console.log("####", skillid, this.m_action, this.m_attack_list);

                    if(this.atkBound) {
                        this.atkBound.graphics.clear();
                    }

                    // if(this.m_action) {
                        //effect
                        if(this.m_skill) {
                            this.m_skill.clearUp();
                            this.m_skill.removeSelf();
                            this.m_skill = null;
                        }
                        // msMoudle.toast(this.skillId)
                        this.m_skill = new cssSkill();
                        this.m_skill.changeAll(this, this.m_skill_sp, skillid, 0, 0, data, 1);      //会不会是资源加载导致
                        this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 1);
                        this.loadBianShen();
                        this.Addbullet();

                        this.m_skill_end = true;
                    // }
                    // else {
                    //     console.log("动作不存在", this.m_action);
                    // }
                }
            }
        }

        m_state_end:boolean = true;
        public showStateById(skillid:string) : void {

            if(this.m_action) {
                if(this.m_action.indexOf("walk")>=0 || this.m_action.indexOf("stand") >= 0) {}
                else if(this.m_state_end == false) return;
                this.m_state_end = false;
            }

            // this.faceid = "default";
            // if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {        ///不需要每次去找
            //     if((this.teamIndex == 100 || this.otherP)) {
            //         let M = msMoudle.updateSkillMP(skillid);
            //         if(M > 0) {
            //             msMoudle.toast("魔法不足");
            //             return ;
            //         }
            //     }
            // }


            if(msMoudle.wz["SSkill.img"] && msMoudle.wz["SSkill.img"][skillid]) {
                let s_ = msMoudle.wz["SSkill.img"][skillid][skillid + ".Use"];
                if(s_ && s_.indexOf("../") >= 0) {
                    let ss_ = s_.split("/");
                    msMoudle.playSound("res/Sound/Skill.img/" + ss_[1] + ".Use")
                }
                else {
                    msMoudle.playSound("res/Sound/Skill.img/" + skillid + ".Use")
                }
            }

            // console.log(skillid)
             let _skid = Math.floor(Number(skillid) / 10000);
            let sdata:any = msMoudle.wz[_skid + ".img"]["skill." + skillid];
            //动作
            // console.log(msMoudle.wz[ Math.floor(Number(skillid) / 10000) + ".img"])
            this.is_skill = true;
            this.skillId = skillid;

            if(!sdata) {
                let res:Array<any> = [];
                res.push({ url: "res/Skill/" + _skid + ".img/index.html" });
                msLoad.load(res).done(dlg => {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    sdata = msMoudle.wz[_skid + ".img"] = msMoudle.loadWZ(cs,"res/Skill/" + _skid + ".img/index.html", "ms2");
                    this.doState(sdata, skillid);
                });
            }
            else {
                this.doState(sdata, skillid);
            }

        }

        doState(sdata:any, skillid:any) : void {
            if(sdata) {
                this.skill_data = sdata;

                this.m_action = this.skill_data["skill." + this.skillId +".level.1.action"];
                if(this.m_action == null) this.m_action = this.skill_data["skill." + this.skillId + ".action.0"];

                let isbasic:boolean = false;
                // 指向本身就是basic
                for(let key in msMoudle.actionFames) {
                    if(key == this.m_action) {
                        isbasic = true;
                        break;
                    }
                }
                //技能没有指向
                if(msMoudle.findKeyFromArr(this.skillId, msMoudle.AllAtkSkills)) {
                    isbasic = true;
                    this.m_action = this.m_attack_list[msMoudle.getRandValue(0, 0, this.m_attack_list.length)];
                }
                //技能没有指向
                if(msMoudle.findKeyFromArr(this.skillId, msMoudle.AllAlertSkills)) {
                    isbasic = true;
                    this.m_action = "alert";
                }
                if(isbasic) this.actionData();
                else this.skillactionData();

                //effect
                if(this.m_state) {
                    this.m_state.clearUp();
                    this.m_state.removeSelf();
                    this.m_state = null;
                }

                this.m_state = new cssSkill();
                this.m_state.changeAll(this, this.m_state_sp, skillid, 0, 0, sdata, 1);      //会不会是资源加载导致
                this.loadActs(this.faceid, msMoudle.partType.tAll, this.actionMap, 1);
                this.loadBianShen();
                this.Addbullet();

                this.m_state_end = true;
            }
        }

        Addbullet() : void {
            if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弓" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "双弩" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "远古弓" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弩" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "拳套" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "短枪" || msMoudle.isBSkill(this.skillId)) {
                let N = 1;
                if(msMoudle.mapP && this.m_fenshen && msMoudle.idOldMap(msMoudle.mapP.m_id) && (this.teamIndex == 100 || this.otherP)) {
                    if(msMoudle.guaji == false)
                        N = this.m_fenshen ? 2 : 1;
                }
                let M = 1;

                //持续的技能

                if( (this.skillId == "3221001" || this.skillId == "13121001") && msMoudle.key_down) {
                    this.repeatBullet(0);
                }
                else {
                    if(this.skillId == "3111006") M = 5;
                    else if(this.skillId == "4121007" || this.skillId == "14121002") M = 3;
                    for(let i:number = 0; i < M * N; i++) {
                        this.bulletLst[i] = new cssBullet();
                        if(this.skillId == "4121007")
                            this.bulletLst[i].loadBullet(this.m_parent, this, this.m_dir, "N", i);
                        else
                            this.bulletLst[i].loadBullet(this.m_parent, this, this.m_dir, this.skillId, i);
                    }
                }

                //
            }
            //
        }

        repeatBullet(index:number) : void {
            ///内存池这里需要使用
            if(this.skillId != "N") {
                this.bulletLst[index] = new cssBullet();
                this.bulletLst[index].loadBullet(this.m_parent, this, this.m_dir, this.skillId, index, true);
                if( (this.skillId == "3221001" || this.skillId == "13121001") && msMoudle.key_down) {
                    // this.repeatBullet(index + 1);
                    let asp = this.m_atkspeed + this.p_atkspeed + (ms.speed - 1) / 1;
                    Laya.timer.once(90 * 1 / (asp / 1), this, this.repeatBullet, [index + 1], false)
                }
            }
        }

        //位置
        reactor_id:number = -1;
        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            // console.log("xxx", x, y)
            if(this.m_sp) this.m_sp.pos(this.m_x, this.m_y);
            // if(this.bodyChange) this.bodyChange.pos(this.m_x, this.m_y);
            if(this.m_clicksp) this.m_clicksp.pos(this.m_x - this.m_clicksp.width / 2,
                this.m_y - this.m_clicksp.height);
            if(this.m_nametag_sp) this.m_nametag_sp.pos(this.m_x, this.m_y);
            // if(this.m_skill_sp) this.m_skill_sp.pos(this.m_x, this.m_y);

            // if(this.m_skill && this.m_skill.m_nodir_sp) {
            //     this.m_skill.m_nodir_sp.pos(this.m_x, this.m_y);
            // }

            if(this.m_state_sp) this.m_state_sp.pos(this.m_x, this.m_y);
            if(this.hitBound) this.hitBound.pos(this.m_x, this.m_y);
            if(this.atkBound) this.atkBound.pos(this.m_x, this.m_y);
            if(this.testbound) this.testbound.pos(this.m_x, this.m_y);

            // if(this._mainhero && this.m_action) {
            //     if(msMoudle.m__touch && (this.m_action.indexOf("stand") >= 0 || this.m_action.indexOf("walk") >= 0) ) {
            //         //判断是否reactor
            //         if(msMoudle.m__i >= 0) {
            //             ///不能通过这个来判断
            //             if(msMoudle.mapP.m_reactor.reactors[msMoudle.m__i] && msMoudle.mapP.m_reactor.reactors[msMoudle.m__i].really_hitTime < 1) {
            //                 // console.log(msMoudle.m__i    + "   " +msMoudle.mapP.m_reactor.reactors[msMoudle.m__i].really_hitTime)
            //                 if(Math.abs(this.m_x - msMoudle.mapP.m_reactor.reactors[msMoudle.m__i].m_x) <= 100) {
            //                     msMoudle.m__touch = false;
            //                     msMoudle.mainT.m__X = -this.m_dir;
            //                     this.reactor_id = msMoudle.m__i;
            //                     Laya.timer.callLater(this, ()=> {
            //                         msMoudle.m__i = -1;
            //                         //弓
            //                         if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弓" ||
            //                         msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弩"
            //                         ) {
            //                             this.showAtk("swingT1", []);
            //                         }
            //                         else {
            //                             this.showAtk(msMoudle.getWeaponAct(this.partIndex[msMoudle.partType.tWeapon]), []);
            //                         }
            //                     });
            //                 }
            //             }
            //         }
            //     }
            // }

            if(msMoudle.mapP) {
                if(msMoudle.mapP.m_water) {
                    msMoudle.mapP.m_water.check();
                }
            }

            if(msMoudle.mainT) {
                for(let i:number = 0; i < this.m_otherPet.length; i++) {
                    if(this.m_otherPet[i]) {
                        // this.m_otherPet[i].setPos(this.m_x + 30 * i, this.m_y);
                        msMoudle.mainT.PetMove(this, this.m_otherPet[i], i);
                        if(this.m_otherPet[i].m_down_t == 0) msMoudle.mainT.PetJump(this.m_otherPet[i]);
                        if(this.m_otherPet[i].m_up_t == 0) msMoudle.mainT.FreeDownPet(this.m_otherPet[i]);
                    }
                }
            }

            if(msMoudle.char && this.teamIndex != 100 && this.teamIndex != -1) {
                if(this.m_x >= msMoudle.char.m_x - Laya.stage.width &&
                    this.m_x <= msMoudle.char.m_x + Laya.stage.width &&
                    this.m_y >= msMoudle.char.m_y - Laya.stage.height &&
                    this.m_y <= msMoudle.char.m_y + Laya.stage.height) {
                    if(this.m_sp) this.m_sp.visible = true;
                }
                else
                    if(this.m_sp) this.m_sp.visible = false;
            }
        }
        //方向
        public setDir(dir:number) : void {
            this.m_dir = dir;
            if(this.m_sp) {
                this.m_sp.scaleX = msMoudle.mapleSize * dir;
                this.m_sp.scaleY = msMoudle.mapleSize;
            }
            // if(this.bodyChange) {
            //     this.bodyChange.scaleX = msMoudle.mapleSize * dir;
            //     this.bodyChange.scaleY = msMoudle.mapleSize;
            // }

            if(this.hitBound) {
                this.hitBound.scaleX = dir;
                this.hitBound.scaleY = msMoudle.mapleSize;
            }
            if(this.atkBound) {
                this.atkBound.scaleX = dir;
                this.atkBound.scaleY = msMoudle.mapleSize;
            }
            if(this.testbound) {
                this.testbound.scaleX = dir;
                this.testbound.scaleY = msMoudle.mapleSize;
            }
        }

        //可以跳跃使用的动作
        public canJumpAtk() : boolean {

            if(msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弓" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "双弩" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "远古弓" ||
                msMoudle.getWeaponType(this.partIndex[msMoudle.partType.tWeapon]) == "弩") return false;

            //普通攻击可以
            for(let i:number = 0; i < this.m_attack_list.length; i++) {
                if(this.m_attack_list[i] == this.m_action) return true;
            }
            if(this.is_skill) {
                if(this.skillId == "1311001" || this.skillId == "1311003" || this.skillId == "4111005" || this.skillId == "4121007" || this.skillId == "14111022" || this.skillId == "14121002" || this.skillId == "14121002" || this.skillId == "14111022") return true;
            }


            return false;
        }

        startDJ() : void {
            Laya.timer.once(500, this, this.doubleFrame);
        }

        doubleFrame() : void {
            // console.log("##dj end")
            if(this.isDoubleJump) {
                this.isDoubleJump = false;
                this.doubledis = 0;
                this.key_left = this.key_right = false;
            }
        }

        clickChar() : void {
            // if(ms.user == "s520") {
                // if(this.m_id && ms.user != this.m_id) {
                if(this.m_id && this.otherP && this.m_id != "pq31047") {
                    ui.show(app.char.playerDlg, {params: [this.m_id], black:true});
                }
            // }
        }

        public speack(str:string = "想要老子的财宝？去找吧！我在它全放在了那里！") : void {
            Laya.timer.clear(this, this.stopSpeck);
            if(!this.m_chatballon) {
                this.m_chatballon = new cssChatBalloon();
            }
            if(this.m_chatballon) {
                this.m_chatballon.loadChatBalloon(this, str);
                Laya.timer.once(3000, this, this.stopSpeck);
            }
        }

        stopSpeck() : void {
            if(this.m_chatballon) {
                this.m_chatballon.removeSelf();
                this.m_chatballon.clearUp();
                this.m_chatballon = null;
            }
        }

        clearMobProtect(mob: any) {
            mob.m_protect = false;
            if(mob.m_id == "8810018.img") {
                for(let i=0; i<msMoudle.mapP.m_life.m_mobsAni.length; ++i) {
                    let mob2 = msMoudle.mapP.m_life.m_mobsAni[i];
                    if(mob2.m_id != "8810018.img") {
                        mob2.mobAni.skin = "";
                    }
                }
                // console.log("##mob.msgData.y=", mob.msgData.y)
                mob.setPos(mob.msgData.x, mob.msgData.y);
            }
        }

        //
    }
}