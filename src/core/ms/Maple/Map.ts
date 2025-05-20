/// <reference path="./../../../core/ms/Maple/Character.ts" />
/// <reference path="./../../../core/ms/Maple/Pet.ts" />
/// <reference path="./../../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../../core/ms/Maple/Obj.ts" />
/// <reference path="./../../../core/ms/Maple/Tile.ts" />
/// <reference path="./../../../core/ms/Maple/Foothold.ts" />
/// <reference path="./../../../core/ms/Maple/Life.ts" />
/// <reference path="./../../../core/ms/Maple/Reactor.ts" />
/// <reference path="./../../../core/ms/Maple/Helper.ts" />
/// <reference path="./../../../core/ms/Maple/BasicEff.ts" />
/// <reference path="./../../../core/ms/Maple/AvatarMegaphone.ts" />
/// <reference path="./../../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../../core/ms/Maple/CssParser.ts" />
/// <reference path="./../../../core/ms/Maple/Back.ts" />
/// <reference path="./../../../core/ms/Maple/KeyBoard.ts" />
/// <reference path="./../../../scene/Other/Guide.ts" />
/// <reference path="./../../../scene/Other/Story.ts" />
/// <reference path="./../../../core/ms/Maple/Summon.ts" />
/// <reference path="./../../../core/ms/Maple/Water.ts" />
/// <reference path="./../../../core/ms/Maple/MiniMap.ts" />


module MapRole {
    import cssCharacter = CharacterRole.Character;
    import cssPet = PetRole.Pet;
    import cssSummon = SummonRole.Summon;
    import cssGuide = GuideMoudle.Guide;
    import cssStory = StoryMoudle.Story;
    import cssSkill = SkillRole.Skill;
    import cssObj = ObjRole.Obj;
    import cssTile = TileRole.Tile;
    import cssFoothld = FootholdRole.Foothold;
    import cssLife = LifeRole.Life;
    import cssReactor = ReactorRole.Reactor;
    import cssHelper = HelperRole.Helper;
    import cssBasicEff = BasicEffRole.BasicEff;
    import cssAvatarMegaphone = AvatarMegaphoneRole.AvatarMegaphone;
    import cssMsg = MsgRole.Msg;
    import cssParser = CssParser.Txt;
    import cssBack = BackRole.Back;
    import cssKeyBoard = KeyBoardRole.KeyBoard;
    import cssWater = WaterRole.Water;
    import cssMob = MobRole.Mob;
    import cssMini = MiniMapRole.MiniMap;

    export class Map extends Laya.Sprite {
        public m_parent:any;
        private mFactory = new Laya.Templet
        public m_id:string = "";

        private m_sp:Laya.Sprite;
        private m_mob:cssMob;
        public char:cssCharacter;
        public otherchar:Array<cssCharacter> = [];
        public team_hero:Array<cssCharacter> = [];
        public heroList:Array<any> = [];
        public pet:Array<any> = [];//群宠物
        public summonList:Array<any> = [];
        public skill:cssSkill;
        private m_map:any;
        private m_back:cssBack;
        private m_obj:cssObj;
        private m_tile:cssTile;
        private m_foothld:cssFoothld;
        public m_life:cssLife;
        private m_reactor:cssReactor;
        private m_helper:cssHelper;
        private m_av:cssAvatarMegaphone;
        private m_basiceff:cssBasicEff;
        public m_water:cssWater;
        public m_mini:cssMini;
        // public m_data:DataRole.Data;
        public m_pre_skill_png:Array<string> = [];

        public m_msg:cssMsg;
        public kb:cssKeyBoard;

        public ViewX:number = 0;
        public ViewY:number = 0;

        public VRTop:number = null;
        public VRLeft:number = null;
        public VRBottom:number = null;
        public VRRight:number = null;
        public Sizewidth:number = null;
        public Sizeheight:number = null;
        public centerX:number = null;
        public centerY:number = null;

        playjobs:Array<number> = [];
        public Entry(P:any, id:string) : void {
            this.m_parent = P;
            this.m_id = id;

            msMoudle.gameP.alpha = 0;

            console.log("##map entry")
            this.playjobs = [];
            Sync.enterMap(this, (jobs: number[])=>{
                if(jobs) this.playjobs = jobs;
                console.log("##map enter success")
                this.init();
            });
        }
        private init() : void {

            this.fastload = true;
            Laya.timer.once(1000, this, ()=> {
                this.fastload = false;
            });

            this.updateSkillList();

            if(msMoudle.releaseRes.length > 0) {
                // console.log("释放资源" + msMoudle.releaseRes.length);
                for(let i:number = 0; i < msMoudle.releaseRes.length; i++) {
                    if(Laya.loader.getRes(msMoudle.releaseRes[i])) {
                        Laya.loader.clearRes(msMoudle.releaseRes[i], true);
                    }
                }
            }

            msMoudle.mapP = this;
            msMoudle.gameP.alpha = 0;

            if(msMoudle.isScreen()) {
                msMoudle.gameP._map.text = this.m_id;
            }
            else {
                msMoudle.gameP._map.text = "";
            }

            if(msMoudle.idOldMap(this.m_id)) {
                msMoudle.isPvp = false;
            }

            this.m_sp = new Laya.Sprite();
            // this.m_sp.scale(0.5, 0.5);
            this.m_parent.addChild(this.m_sp);

            if(msMoudle.gameP) {
                msMoudle.gameP.btnTeam.visible = !msMoudle.isBossMap(this.m_id);
            }

            let cs:cssParser = new cssParser();
            this.test_tile = [];
            this.test_obj = [];
            this.test_back = [];

            this.loading = new Laya.Image();
            this.loading.skin = "homeland/img_zuoyizhezhao.png";
            this.loading.width = 200;
            this.loading.height = 40;
            this.loading.zOrder = 99999999;
            this.loading.anchorX = 0.5;
            this.loading.anchorY = 0.5;
            this.loading.pos(Laya.stage.width / 2, Laya.stage.height / 2)
            Laya.stage.addChild(this.loading);

            this.loadtxt = new Laya.Label();
            this.loadtxt.color = "#FFFFFF";
            this.loadtxt.stroke = 2;
            this.loadtxt.width = 300;
            this.loadtxt.fontSize = 24;
            this.loadtxt.strokeColor = "#1977c1";
            this.loadtxt.text = "正在加载地图中";
            this.loadtxt.name = "mapload";
            this.loadtxt.align = 'center';
            this.loading.addChild(this.loadtxt);
            this.loadtxt.pos(this.loading.width / 2 - this.loadtxt.width / 2, this.loading.height / 2 - this.loadtxt.height / 2);
            this.loading.pos(Laya.stage.width / 2, Laya.stage.height / 2 + 100)

            let mapres:Array<any> = []
            mapres.push({ url: "res/Map/Map/" + this.m_id + "/index.html" });
            mapres.push({ url: "res/String/Map.img/index.html" });

            mapres.push({ url: "res/Mob/93000030.img/index.html" });
            for(let i = 0; i < 7; i++) {
                if(!Laya.loader.getRes("res/Mob/93000030.img/move." + i + ".png")) {
                    mapres.push({ url: "res/Mob/93000030.img/move." + i + ".png" });
                }
            }

            // ms.numberEff = msMoudle.getRandValue(1, 0, 1000);
            if(ms.numberEff > 0) {
                let Miss = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0.Miss.png"
                if(!Laya.loader.getRes(Miss)) {
                    mapres.push({ url: Miss });
                }
                for(let i:number = 0; i < 9; i++) {
                    let NoCri1 = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoCri1." + i + ".png"
                    if(!Laya.loader.getRes(NoCri1)) {
                        mapres.push({ url: NoCri1 });
                    }
                    let NoRed0 = "res/BasicEff.img/damageSkin."+ ms.numberEff + ".NoRed0." + i+ ".png"
                    if(!Laya.loader.getRes(NoRed0)) {
                        mapres.push({ url: NoRed0 });
                    }
                }
            }

            //chinese
            msLoad.load(mapres).done(dlg => {

                ///显示mob
                let rnkmob = ["3230305"];//"6130101",
                let rnk = msMoudle.getRandValue(0, 0, rnkmob.length)
                this.m_mob = new cssMob();
                this.m_mob.m_canf = false;
                let lifeMsg:any = new Object();
                lifeMsg.id = Number(rnkmob[rnk]);
                lifeMsg.x = Laya.stage.width / 2;
                lifeMsg.y = Laya.stage.height / 2 + 50;
                lifeMsg.action = "move";
                this.m_mob.changeAll(Laya.stage, rnkmob[rnk] + ".img", lifeMsg);

                if(!msMoudle.wz["Map.img"])
                    msMoudle.wz["Map.img"] = msMoudle.loadWZ(cs,"res/String/Map.img/index.html", "ms", "mapName");     //这个可以改成实时的
                if(!msMoudle.wz[this.m_id]) {

                    msMoudle.wz[this.m_id] = msMoudle.loadWZ(cs,"res/Map/Map/" + this.m_id + "/index.html", "ms");
                    ///back
                    this.checkBack(msMoudle.wz[this.m_id]);
                    ///tile
                    this.checkTile(msMoudle.wz[this.m_id]);
                    ///obj
                    this.checkObj(msMoudle.wz[this.m_id]);
                    ///life
                    // this.checkLife(msMoudle.wz[this.m_id]);     /////
                }

                // this.doLife(this.test_life, 1);              /////
                this.goMap(this.m_id);
            });
        }

        updateSkillList() : void {
            //龙骑士
            if(ms.selHero == 0) {
                //m_skill3  m_skill m_skill2
                if(ms.m_job[1] != "") msMoudle.m_skill3[ms.selHero] = "1301012";
                if(ms.m_job[4] != "" && ms.m_job[6] != "") msMoudle.m_skill[ms.selHero] = "1321012";
            }
            //英雄
            else if(ms.selHero == 4) {
                if(ms.m_job[0] != "" && ms.m_job[6] != "") msMoudle.m_skill3[ms.selHero] = "1121052";
            }
            //圣骑士
            else if(ms.selHero == 6) {
                if(ms.m_job[0] != "" && ms.m_job[4] != "") msMoudle.m_skill3[ms.selHero] = "1211012";//
                if(ms.m_job[20] != "") msMoudle.m_skill[ms.selHero] = "1221052";
            }
            //主教
            else if(ms.selHero == 1) {
                if(ms.m_job[5] != "" && ms.m_job[7] != "") msMoudle.m_skill[ms.selHero] = "2321052";
            }
            //冰雷
            else if(ms.selHero == 5) {
                if(ms.m_job[1] != "" && ms.m_job[7] != "") msMoudle.m_skill3[ms.selHero] = "2201008";//
                if(ms.m_job[17] != "") msMoudle.m_skill[ms.selHero] = "2221052";
            }
            //火毒
            else if(ms.selHero == 7) {
                if(ms.m_job[1] != "" && ms.m_job[5] != "") msMoudle.m_skill3[ms.selHero] = "2121052";//
            }
            //箭神    3221001
            else if(ms.selHero == 8) {
                if(ms.m_job[3] != "" && ms.m_job[8] != "") msMoudle.m_skill3[ms.selHero] = "3221001";//
            }
        }

        test_tile:Array<string> = [];
        test_obj:Array<string> = [];
        test_back:Array<string> = [];
        checkBack(bS_map:any) : void {
            if(bS_map["back"]) {
                let j:number = 0;
                while(true) {
                    let bS = bS_map["back"]["back." + j + ".bS"];
                    if(bS) {
                        // console.log("back--" + bS + "  " + j);
                        if(msMoudle.findKeyFromArr(bS, this.test_back) == false) {
                            this.test_back.push(bS);
                        }
                        // this.linkBack(bS, j);
                        j = j + 1;
                    }
                    else break;
                }
            }
        }
        checkTile(tS_map:any) : void {
            for(let i in tS_map) {
                if(i == "info" || i == "back" || i == "life" || i == "foothold" || i == "ladderRope" || i == "miniMap" || i == "portal") {}
                else {
                    // console.log(i);
                    let itS = tS_map[i];
                    if(itS) {
                        let tS = itS[i + ".info.tS"];
                        if(tS) {
                            // console.log("tile--" + tS + "  " + i);
                            // this.dealTile(Number(i), tS);
                            if(msMoudle.findKeyFromArr(tS, this.test_tile) == false) {
                                this.test_tile.push(tS);
                            }
                        }
                    }
                }
            }
        }
        checkObj(oS_map:any) : void {
            for(let i in oS_map) {
                if(i == "info" || i == "back" || i == "life" || i == "foothold" || i == "ladderRope" || i == "miniMap" || i == "portal") {}
                else {
                    let ioS = oS_map[i];
                    if(ioS) this.dealObj(Number(i), ioS);
                }
            }
        }
        dealObj(i:number, ioS:any) : void {
            let j:number = 0;
            while(true) {
                let oS = ioS[i + ".obj." + j + ".oS"];
                if(oS) {// && oS != "guide"
                    // console.log("obj--" + oS + "  " + i);
                    // this.linkObj(i, ioS, j, oS);
                    if(msMoudle.findKeyFromArr(oS, this.test_obj) == false) {
                        this.test_obj.push(oS);
                    }
                    j = j + 1;
                }
                else break;
            }
        }

        goMap(id:string) : void {
            // if(this.m_id == "910000000.img") {
            //     // this.startZhaoMu();
            //     if(ms.renku == true) this.stratBoss();
            //     this.startRenKu();
            // }

            Laya.timer.clear(msMoudle.gameP, msMoudle.gameP.updateTime);

            if(msMoudle.isAuMap(this.m_id) || this.m_id == "141060000_gai.img" || this.m_id == "000020000_gai.img") {
                msMoudle.gameP._biaoti.visible = false;
                msMoudle.gameP.btnBack.visible = true;

                if(msMoudle.isAuMap(this.m_id)) {
                    if(ms.herodata.Lv == 1) msMoudle.gameP.btnBack.visible = false;
                    msMoudle.gameP.title.text = "逃跑";
                    // msMoudle.gameP._chengshi.visible = true;
                    msMoudle.gameP._biaoti.visible = true;
                }
                else if(this.m_id == "000020000_gai.img") {
                    msMoudle.gameP.btnBack.visible = false;
                }
                else {
                    msMoudle.gameP.title.text = "离开";
                    // msMoudle.gameP._chengshi.visible = false;
                }
            }
            else {
                ///只要回城了就恢复默认
                msMoudle.gameP._biaoti.visible = false;
                msMoudle.gameP.btnBack.visible = false;
                // msMoudle.gameP._chengshi.visible = true;
                msMoudle.gameP.boss_hp.visible = false;
                msMoudle.gameP.map_time.visible = false;
                msMoudle.gameP.btnBack2.visible = false;
            }

            if(this.m_id == "302020100_gai.img") {
                if(ms.miwu > 0) ms.miwu--;
            }
            else if(this.m_id == "141060000_gai.img") {
                if(ms.zhuzhu > 0) ms.zhuzhu--;
            }
            else if(this.m_id == msMoudle.tiaotiao_map) {
                if(ms.tiaotiao > 0) ms.tiaotiao--;
            }
            else if(msMoudle.isWorldBoss) {
                if(ms.ban > 0) ms.ban--;
            }

            if(msMoudle.wz[id]) this.initMap(id);
            else {
                console.log("map不存在");
            }

        }

        portalInfo:any;
        private initMap(id:string) : void {
            this.m_map = msMoudle.wz[this.m_id];

            let mapInfo:any = this.m_map["info"];
            if(!mapInfo) {console.log("地图信息错误");return;}
            msMoudle.playMusic("res/Sound/" + mapInfo["info.bgm"] + ".mp3");
            this.portalInfo = this.m_map["portal"];
            let miniMapInfo:any = this.m_map["miniMap"];
            //地图边界
            this.VRTop = mapInfo["info.VRTop"];
            this.VRLeft = mapInfo["info.VRLeft"];
            this.VRBottom = mapInfo["info.VRBottom"];
            this.VRRight = mapInfo["info.VRRight"];
            if(this.m_id == "272020200.img") {
                this.VRBottom = -110;
            }
            //小地图
            if(miniMapInfo) {
                // if(this.VRTop && this.VRLeft && this.VRBottom && this.VRRight) {
                //     this.Sizewidth = Math.abs(Number(this.VRLeft)) + Math.abs(Number(this.VRRight));
                //     this.Sizeheight = Math.abs(Number(this.VRTop)) + Math.abs(Number(this.VRBottom));
                // }
                // else {
                //     this.Sizewidth = miniMapInfo["miniMap.width"];
                //     this.Sizeheight = miniMapInfo["miniMap.height"];
                // }
                // this.centerX = miniMapInfo["miniMap.centerX"];
                // this.centerY = miniMapInfo["miniMap.centerY"];

                // if(this.VRTop && this.VRLeft && this.VRBottom && this.VRRight) {
                //     this.Sizewidth = Math.abs(Number(this.VRLeft)) + Math.abs(Number(this.VRRight));
                //     this.Sizeheight = Math.abs(Number(this.VRTop)) + Math.abs(Number(this.VRBottom));
                // }
                // else {
                    this.Sizewidth = miniMapInfo["miniMap.width"];
                    this.Sizeheight = miniMapInfo["miniMap.height"];
                // }
                if(!this.Sizewidth)
                    this.Sizewidth = Math.abs(Number(this.VRLeft)) + Math.abs(Number(this.VRRight));
                if(!this.Sizeheight)
                    this.Sizeheight = Math.abs(Number(this.VRTop)) + Math.abs(Number(this.VRBottom));
                this.centerX = miniMapInfo["miniMap.centerX"];
                this.centerY = miniMapInfo["miniMap.centerY"];

                ////////
                // if(!this.Sizewidth) this.Sizewidth = 800;//800
                // if(!this.Sizeheight) this.Sizeheight = 600;//600
                // if(!this.centerX) this.centerX = 400;//400
                // if(!this.centerY) this.centerY = 300;//300

                // if(600 > Number(this.Sizeheight)) {}
                // else {
                //     if(Number(this.centerY) < Number(this.VRTop) + Number(this.Sizeheight) / 2) {
                //         this.centerY = Number(this.VRTop) + Number(this.Sizeheight) / 2;
                //     }
                //     else if(Number(this.centerY) > Number(this.VRBottom) - Number(this.Sizeheight) / 2) {
                //         this.centerY = Number(this.VRBottom) - Number(this.Sizeheight) / 2;
                //     }
                // }

                // if(this.VRLeft) {}
                // else this.VRLeft = -Number(this.centerX);
                // if(this.VRRight) {}
                // else this.VRRight = Number(this.Sizewidth) + Number(this.VRLeft);
                // if(this.VRTop) {}
                // else this.VRTop = -Number(this.centerY);
                // if(this.VRBottom) {}
                // else this.VRBottom = Number(this.Sizeheight) + Number(this.VRTop);


            }

            let leaseX:number = 0;
            let index:number = 0;
            // let MinX:number = 999999;
            this.allportal = [];
            while(true) {
                if(this.portalInfo["portal." + index + ".x"]) {
                    this.allportal[this.allportal.length] = index;
                    // if(MinX > moveX) {
                    //     MinX = moveX;
                    //     leaseX = index;
                    // }
                    index++;
                }
                else break;
            }
            //入口点
            this.ViewX = Number(this.portalInfo["portal." + leaseX + ".x"]);
            this.ViewY = Number(this.portalInfo["portal." + leaseX + ".y"]);

            // if(this.m_id == "701010323.img") {
            //     this.ViewX = 1900;
            //     this.ViewY = 823;
            // }

            this.loadMap();
        }

        allportal:Array<number> = [];
        private loadMap() : void {
            this.m_back = new cssBack();
            this.m_tile = new cssTile();
            this.m_obj = new cssObj();
            this.m_life = new cssLife();
            this.m_reactor = new cssReactor();
            this.m_foothld = new cssFoothld();
            this.m_helper = new cssHelper();
            this.m_water = new cssWater();
            // this.m_data = new DataRole.Data();

            this.char = new cssCharacter();
            // if(true) {
            //     for(let i:number = 0; i < 6; i++) {
            //         this.team_hero[i] = new cssCharacter();
            //     }
            // }
            this.kb = new cssKeyBoard();

            msMoudle.char = this.char;
            this.m_msg = new cssMsg();
            this.m_basiceff = new cssBasicEff();

            msMoudle.gameP.xiulianExp.visible = false;
            //大规模地图测试
            this.updataMap();

            // if(ms.speed == 1) ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.speedtxt.text = "X1";
            // else if(ms.speed == 1.5) ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.speedtxt.text = "X2";
            // else if(ms.speed == 2) ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.speedtxt.text = "X3";

            ///组队任务地图this.m_id == "000030001.img" ||
            if(this.m_id == "000020000_gai.img" || this.m_id == msMoudle.tiaotiao_map || this.m_id == "141060000_gai.img" || this.m_id == "302020100_gai.img") {

                // msMoudle.gameP.btnHero.visible = false;
                // msMoudle.gameP.btnShop.visible = false;
                // msMoudle.gameP.btnTask.visible = false;
                // msMoudle.gameP.btnBoss.visible = false;
                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.getChildByName("签到").visible = false;
                }

                // msMoudle.gameP.btnLB.visible = false;
                // msMoudle.gameP.btnNew.visible = false;
                // msMoudle.gameP.guide.visible = false;
                // msMoudle.gameP.btnChar.visible = false;
                // msMoudle.gameP.btnZY.visible = false;
                // msMoudle.gameP.btnChat.visible = false;
                // msMoudle.gameP.btnSpeed.visible = false;//true;
                // msMoudle.gameP.btnTJ.visible = false;
                // msMoudle.gameP.btnPay.visible = false;

                msMoudle.gameP.map_time.visible = true;
                msMoudle.gameP.btnBack2.visible = true;
                msMoudle.addExp = 1;    ///防止下次依然享受倍数
                let tTime = 5;
                if(this.m_id == "141060000_gai.img" || this.m_id == "302020100_gai.img") {
                    tTime = 1;
                    if(this.m_id == "141060000_gai.img") {
                        this.m_water.loadWater(this.m_sp);
                    }
                    else {
                        msMoudle.gameP.xiulianExp.visible = true;
                        let _add = -1;
                        if(ms.Exp100 > 0) {
                            _add = 3;
                            ms.Exp100--;
                        }
                        else if(ms.Exp10 > 0) {
                            _add = 2;
                            ms.Exp10--;
                        }
                        else if(ms.Exp3 > 0) {
                            _add = 1;
                            ms.Exp3--;
                        }
                        else if(ms.Exp2 > 0) {
                            _add = 0;
                            ms.Exp2--;
                        }
                        let _Exp2 = "\n剩余双倍经验卡：" + ms.Exp2 + "张";
                        let _Exp3 = "\n剩余五倍经验卡：" + ms.Exp3 + "张";
                        let _Exp10 = "\n剩余十倍经验卡：" + ms.Exp10 + "张";
                        let _Exp100 = "\n剩余百倍经验卡：" + ms.Exp100 + "张\n探索关卡数越高经验越高";
                        msMoudle.gameP.xiulianExp.text = "当前经验：100%" + _Exp2 + _Exp3 + _Exp10 + _Exp100;
                        if(_add == 0) {
                            msMoudle.gameP.xiulianExp.text = "当前经验：200%" + _Exp2 + _Exp3 + _Exp10 + _Exp100;
                            msMoudle.addExp = 2;
                        }
                        else if(_add == 1) {
                            msMoudle.gameP.xiulianExp.text = "当前经验：500%" + _Exp2 + _Exp3 + _Exp10 + _Exp100;
                            msMoudle.addExp = 5;
                        }
                        else if(_add == 2) {
                            msMoudle.gameP.xiulianExp.text = "当前经验：1000%" + _Exp2 + _Exp3 + _Exp10 + _Exp100;
                            msMoudle.addExp = 10;
                        }
                        else if(_add == 3) {
                            msMoudle.gameP.xiulianExp.text = "当前经验：10000%" + _Exp2 + _Exp3 + _Exp10 + _Exp100;
                            msMoudle.addExp = 100;
                        }
                    }
                }

                if(this.m_id == msMoudle.tiaotiao_map) tTime = 8;
                let timeTick = new Date().getTime() / 1000 + 60 * tTime;

                if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) || msMoudle.mapP.m_id == "000020000_gai.img" || msMoudle.mapP.m_id == "302020100_gai.img" || msMoudle.mapP.m_id == "141060000_gai.img") {
                    msMoudle.gameP.startShowTime(timeTick);
                }
                // else if(msMoudle.isBossMap(this.m_id)) {
                //     tTime = 30;
                //     timeTick = new Date().getTime() / 1000 + 60 * tTime;
                //     msMoudle.gameP.startShowTime(timeTick);
                // }
                else {
                    msMoudle.gameP.btnBack2.visible = false;
                    msMoudle.gameP.map_time.visible = false;
                }



                //event.coconut.lose        //LOSE
                //event.coconut.victory     //victory
                //quest.carnival.lose       //失败xxxx
                //quest.party.clear         //通过
                //quest.party.wrong_kor     //错了
                //summerboating.timeout     //时间到
                // Laya.timer.once(3000, this, ()=> {
                //     msMoudle.toast2("在线时间过长，请下线休息一会！");
                // });
            }

        }

        loading:Laya.Image;
        private updataMap() : void {

            if(this.Sizewidth) {}
            else {
                this.Sizewidth = 800;//800
            }
            if(this.Sizeheight) {}
            else {
                this.Sizeheight = 600;//600
            }
            if(this.centerX) {}
            else this.centerX = 400;//400
            if(this.centerY) {}
            else this.centerY = 300;//300
            if(this.VRLeft) {}
            else this.VRLeft = -Number(this.centerX);
            if(this.VRRight) {}
            else this.VRRight = Number(this.Sizewidth) + Number(this.VRLeft);
            if(this.VRTop) {}
            else this.VRTop = -Number(this.centerY);
            if(this.VRBottom) {}
            else this.VRBottom = Number(this.Sizeheight) + Number(this.VRTop);

            ///修正vrleft vrright
            let mapSize:any = this.m_foothld.loadFoothold(this.m_map, this.m_sp, this.VRTop, this.VRLeft, this.VRBottom, this.VRRight, this.Sizeheight, this.centerY);
            if(mapSize) {
                this.VRLeft = mapSize.left;
                this.VRRight = mapSize.right;
                this.VRTop = mapSize.up;
                this.VRBottom = mapSize.down;
            }

            //特别注意350-450,不要在这里浪费时间了
            let backX:number = Number(this.ViewX) - 400;
            let backY:number =  Number(this.ViewY) - 300;
            if(Number(this.ViewX) >= Number(this.VRLeft) && Number(this.ViewX) <= Number(this.VRLeft) + 400)
                backX = Number(this.VRLeft);
            else if(Number(this.ViewX) >= Number(this.VRRight) - Laya.stage.width && Number(this.ViewX) <= Number(this.VRRight))
                backX = Number(this.VRRight) - Laya.stage.width;
            if(Number(this.ViewY) >= Number(this.VRTop) &&
                Number(this.ViewY) <= Number(this.VRTop) + 300)
                backY = Number(this.VRTop);
            else if(Number(this.ViewY) <= Number(this.VRBottom) &&
                Number(this.ViewY) >= Number(this.VRBottom) - 300)
                backY = Number(this.VRBottom) - 600;

            //海底可能也是这个问题
            // if(Number(this.VRRight) - Number(this.VRLeft) > 800) {
            //     if(this.ViewX > Number(this.VRRight)) backX = 0;

            // }

            msMoudle.gameP._head.visible = false;
            msMoudle.gameP._dibu.visible = true;
            let testY:number = 0;
            if(this.m_id == "865010011.img") {
                testY = 50;
            }
            else if(this.m_id == "272020200.img") {
                testY = -50;
            }
            if(this.m_id == "302020100_gai.img") {
                testY = -125;
                msMoudle.gameP._head.visible = true;
                msMoudle.gameP._dibu.visible = false;
                Laya.timer.loop(1000, this, this.getExp);
            }
            // else if(this.m_id == "910000000.img" && ms.herodata.Lv >= 60) {
            //     Laya.timer.loop(10000, this, this.getMainExp);
            // }
            // else if(this.m_id == "270050100.img") testY = -10;
            if(this.m_id == msMoudle.tiaotiao_map || this.m_id == "141060000_gai.img")
                msMoudle.gameP._dibu.visible = false;

            backY -= testY;

            // if(this.Sizewidth < Laya.stage.width) {
            //     let testX = Math.abs( (Laya.stage.width - this.Sizewidth) / 2);
            //     backX -= testX;
            // }

            this.m_sp.pos(-backX, -backY);
            //副本比较特殊
            if(this.m_id == "000020000_gai.img") testY = -155;
            else if(this.m_id == "222010402_gai.img") testY = -55;



            //这里延后
            let res:any = [];
            for(let i:number = 0; i < this.test_tile.length; i++) {
                res.push({ url: "res/Map/Tile/" + this.test_tile[i] + ".img/index.html" });
            }
            for(let i:number = 0; i < this.test_obj.length; i++) {
                res.push({ url: "res/Map/Obj/" + this.test_obj[i] + ".img/index.html" });
            }
            for(let i:number = 0; i < this.test_back.length; i++) {
                res.push({ url: "res/Map/Back/" + this.test_back[i] + ".img/index.html" });
            }
            if(res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(this, this.onAssetLoaded, [backX, backY]),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);
            }
            else {
                this.onAssetLoaded(backX, backY);
            }

        }

        onAssetLoaded(backX:number, backY:number) : void {
            let cs:cssParser = new cssParser();
            for(let i:number = 0; i < this.test_tile.length; i++) {
                if(!msMoudle.wz[this.test_tile[i] + ".img"]) {
                    msMoudle.wz[this.test_tile[i] + ".img"] = msMoudle.loadWZ(cs,"res/Map/Tile/" + this.test_tile[i] + ".img/index.html", "ms");
                }
            }
            for(let i:number = 0; i < this.test_obj.length; i++) {
                if(!msMoudle.wz[this.test_obj[i] + ".img"]) {
                    msMoudle.wz[this.test_obj[i] + ".img"] = msMoudle.loadWZ(cs,"res/Map/Obj/" + this.test_obj[i] + ".img/index.html", "ms");
                }
            }
            for(let i:number = 0; i < this.test_back.length; i++) {
                if(!msMoudle.backwz[this.test_back[i] + ".img"]) {
                    msMoudle.backwz[this.test_back[i] + ".img"] = msMoudle.loadWZ(cs,"res/Map/Back/" + this.test_back[i] + ".img/index.html", "ms");
                }
            }
            // this.MapInit(backX, backY);

            this.m_back.loadBack(this.m_map, this.m_sp, this.VRTop, this.VRLeft, this.VRBottom, this.VRRight, backX, backY);
        }

        private onLoading(progress: number): void {}

        MapInitTile(viewx:number, viewy:number) : void {
            this.m_tile.loadTile(this.m_map, this.m_sp, this.VRTop, this.VRLeft, this.VRBottom, this.VRRight, viewx, viewy);
        }

        ////这个可以晚些加载、但是怪物要提前
        // MapInitObj() : void {

        // }

        MapLater() : void {//viewx:number, viewy:number
            this.m_obj.loadObj(this.m_map, this.m_sp, this.VRTop, this.VRLeft, this.VRBottom, this.VRRight);

            // if(this.m_id == "910000000.img") {
            //     this.m_reactor.loadReactor(this.m_map, this.m_sp);
            // }
            if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                // if(this.m_id != "910000000.img") {
                    this.m_helper.loadHelper(this.m_map, this.m_sp, this.m_id);
                // }
            }


            ////只加载sk1,sk2,sk3,sk4的所有资源
            let sks = msMoudle.getSkillsByHero(ms.selHero);

            //其他玩家
            //公共地图不加载
            // console.log("@@@@", this.playjobs)
            if(msMoudle.mapP && msMoudle.mapP.m_id != "910000000.img" && msMoudle.mapP.m_id != "980000000.img") {
                for(let i:number = 0; i < this.playjobs.length; i++) {
                    let msks = msMoudle.getSkillsByHero(this.playjobs[i]);
                    // console.log("%%%%", msks)
                    for(let j:number = 0; j < msks.length; j++) {
                        if(msMoudle.findKeyFromArr(msks[j] + "", sks) == false) {
                            sks.push(msks[j]);
                            // console.log("####", msks[j]);
                        }
                    }
                }
            }

            ////上阵英雄的技能
            for(let key in msMoudle.herojson) {
                if(msMoudle.herojson[key].skill_1 != "N" && msMoudle.herojson[key].skill_1 != "") {
                    let skillid = Math.floor(Number(msMoudle.herojson[key].skill_1) / 10000) + "";
                    // console.log(skillid)
                    if(msMoudle.findKeyFromArr(skillid, sks) == false) {
                        sks.push(skillid);
                    }
                }
            }
            //普通攻击时魔法双击
            if(msMoudle.findKeyFromArr("200", sks) == false) {
                sks.push("200");
            }

            //召唤兽技能
            let zhskills:Array<string> = ["212", "222", "232", "322", "312", "331", "2217"]
             for(let i:number = 0; i < zhskills.length; i++) {
                if(msMoudle.findKeyFromArr(zhskills[i], sks) == false) {
                    sks.push(zhskills[i]);
                }
            }

            /////这里记得英雄切换的时候wz没有释放,而且还要注意自动战斗主动技能不要释放了
            ////自动战斗主动技能
            // if(msMoudle.idOldMap(msMoudle.mapP.m_id)) {
            //     let askills:Array<string> = ["121", "132", "130", "122", "300", "410", "232", "312", "322", "131"];
            //     for(let i:number = 0; i < askills.length; i++) {
            //         if(msMoudle.findKeyFromArr(askills[i], sks) == false) {
            //             sks.push(askills[i]);
            //         }
            //     }
            // }

            //这里延后
            let res:any = [];
            //技能
            if(sks && sks.length > 0) {
                for(let i:number = 0; i < sks.length; i++) {
                    if(!Laya.loader.getRes("res/Skill/" + sks[i] + ".img/index.html")) {
                        res.push({ url: "res/Skill/" + sks[i] + ".img/index.html" });
                        // console.log("res/Skill/" + sks[i] + ".img/index.html")
                    }
                }
            }
            //morph
            if(ms.selHero == 10 || ms.selHero == 12 || ms.selHero == 39 || ms.selHero == 40 || ms.selHero == 41 || ms.selHero == 42 || ms.selHero == 43 || ms.selHero == 44 || ms.selHero == 45 || ms.selHero == 46 || ms.selHero == 47 || ms.selHero == 48 || ms.selHero == 49) {
                let m_bs_id = "1001";
                if(ms.selHero == 10) m_bs_id = "1001"
                else if(ms.selHero == 12) m_bs_id = "1211";
                else if(ms.selHero == 39) m_bs_id = "6000";
                else if(ms.selHero == 40) m_bs_id = "6001";
                else if(ms.selHero == 41) m_bs_id = "6002";
                else if(ms.selHero == 42) m_bs_id = "6003";
                else if(ms.selHero == 43) m_bs_id = "6004";
                else if(ms.selHero == 44) m_bs_id = "6005";
                else if(ms.selHero == 45) m_bs_id = "6006";
                else if(ms.selHero == 46) m_bs_id = "6007";
                else if(ms.selHero == 47) m_bs_id = "6008";
                else if(ms.selHero == 48) m_bs_id = "6009";
                else if(ms.selHero == 49) m_bs_id = "6010";
                if(!Laya.loader.getRes("res/Morph/" + m_bs_id + ".img/index.html"))
                    res.push({ url: "res/Morph/" + m_bs_id + ".img/index.html"});
            }
            this.pngs = [];
             //身上的装备
             for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                if(ms.herodata.EquipSlots[i]) {
                    let index_path:string = msMoudle.getEqpIndex(ms.herodata.EquipSlots[i].id);
                    if(!Laya.loader.getRes(index_path)) {
                        res.push({ url: index_path });
                    }
                }
            }
            if(res.length > 0) {
                // console.log("###", res, sks);
                Laya.loader.load(res, Laya.Handler.create(this, this.onSkLoaded, [sks]),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);
            }
            else {
                //加点延迟
                if(this.fastload) {
                    Laya.timer.once(1000, this, ()=> {
                        this.onSkLoaded(sks);
                    });
                }
                else {
                    this.onSkLoaded(sks);
                }
            }

            // this.MapDelay();
        }

        fastload:boolean = false;
        loadtxt:Laya.Label;
        MapDelay() : void {
            if(this.m_mob) {
                this.m_mob.clearUp();
                this.m_mob = null;
                for(let i = 0; i < 7; i++) {
                    if(Laya.loader.getRes("res/Mob/93000030.img/move." + i + ".png")) {
                        Laya.loader.clearRes("res/Mob/93000030.img/move." + i + ".png", true);
                    }
                }
            }
            msMoudle.m_title = this.m_id;
            for(let key in msMoudle.wz["Map.img"] ) {
                let id = msMoudle.rmvImg(this.m_id);
                if(msMoudle.wz["Map.img"][key]) {
                    if(msMoudle.wz["Map.img"][key][key + "." + id + ".mapName"]) {
                        this.loadtxt.text = msMoudle.wz["Map.img"][key][key + "." + id + ".mapName"];
                        msMoudle.m_title = this.loadtxt.text;
                        break;
                    }
                    // else {
                    //     //这里做了优化
                    //     msMoudle.wz["Map.img"][key] = null;
                    // }
                }
            }
            this.loading.pos(Laya.stage.width / 2, Laya.stage.height / 2)


            let _guanka:number = 1;
            if(msMoudle.isBoss) _guanka = ms.cur_bossguanka;
            else if(msMoudle.isFuben) _guanka = ms.cur_fuben;
            else _guanka = ms.cur_guanka;
            this.m_life.loadLife(this.m_map, this.m_sp, this.m_id, this.VRLeft, this.VRRight, this.VRTop, this.VRBottom, _guanka, this.m_foothld);

            // if(msMoudle.isScreen()) {
            // else {
            //     if(msMoudle.isAuMap(this.m_id) == false) {
                    this.m_mini = new cssMini();
                    this.m_mini.loadMiniMap(this.m_id, ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.sphead);
                // }
            // }

            ///
            msMoudle.QuestTask(ms.QuestId);
            msMoudle.getNpcStateByCheck();

            if(true) {
                let E:any = {};
                this.char._mainhero = true;
                msMoudle.char.m_name = ms.testname;
                msMoudle.char.m_lv = ms.herodata.Lv;
                msMoudle.char.teamIndex = 100;
                E.body = "00002000.img";
                E.head = "00012000.img";
                if(ms.selbody[ms.selHero] != "N" && ms.selbody[ms.selHero]) {
                    E.body = ms.selbody[ms.selHero];
                    E.head = "000" + (Number(ms.selbody[ms.selHero].split(".")[0]) + 10000) + ".img";
                }
                E.face = "00020012.img";
                if(ms.selface[ms.selHero] != "N")
                    E.face = ms.selface[ms.selHero];
                E.hair = "00030020.img";
                if(ms.selhair[ms.selHero] != "N")
                    E.hair = ms.selhair[ms.selHero];

                E.coat = "01040002.img";
                E.pants = "01060002.img";
                E.weapon = msMoudle.getWeaponByJob(ms.selHero);
                E.shoes = "N";
                E.glove = "N";
                //扎昆头盔类似gm帽子改配置zmap
                E.cap = "N";//01002357.img 01002140 01002017
                E.cape = "N";

                let eSlots = msMoudle.getSlotByJob(ms.selHero);
                if(eSlots) {
                    E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
                    E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";
                    if(eSlots[msMoudle.partType.tWeapon]) {
                        E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
                    }
                    E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
                    E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
                    //扎昆头盔类似gm帽子改配置zmap
                    E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
                    E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
                }

                if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img" && msMoudle.mapP.m_id != "141060000_gai.img") {
                    // for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                    //     if(i <= 11) {
                    //         if(ms.petbagsdata[i]) {
                    //             this.pet[i] = new cssPet();
                    //             this.pet[i].changeAll(this.m_sp, ms.petbagsdata[i].id + ".img", Number(this.ViewX), Number(this.ViewY));
                    //         }
                    //     }
                    //     if(msMoudle.isTiaoMap(this.m_id)) break;    //1只
                    // }
                    if(ms.pet) {
                        if(ms.pet.id != "N") {
                            this.pet[0] = new cssPet();
                            this.pet[0].changeAll(this.m_sp, ms.pet.id, Number(this.ViewX), Number(this.ViewY));
                        }
                    }
                    if(ms.ring) {
                        if(ms.ring.id != "N") this.char.m_ring = ms.ring.id;
                    }
                }
                if(this.m_id != msMoudle.tiaotiao_map) {
                    ////魔法师
                    E.fweapon = ms.testfweapon;
                    // E.cap = ms.testcap;
                    E.weapon = ms.herodata.EquipSlots[0] ? (ms.herodata.EquipSlots[0].id + ".img") : ms.testweapon;
                }

                // if(msMoudle.isAuMap(this.m_id) == false && this.m_id != "000020000_gai.img" && msMoudle.sailMap(this.m_id) == false) {
                //     if(ms.tamingmob) {
                //         E.tamingmob =  ms.tamingmob.tamingmob1;
                //         E.tamingmob0 =  ms.tamingmob.tamingmob2;
                //         if(msMoudle.tamingmob1 == "") {
                //             msMoudle.tamingmob1 = ms.tamingmob.tamingmob1;
                //         }
                //         else {
                //             E.tamingmob =  msMoudle.tamingmob1;
                //         }
                //         if(msMoudle.tamingmob2 == "") {
                //             msMoudle.tamingmob2 = ms.tamingmob.tamingmob2;
                //         }
                //         else {
                //             E.tamingmob0 =  msMoudle.tamingmob2;
                //         }
                //     }
                // }
                if(this.m_id == "141060000_gai.img") {
                    E.tamingmob =    "01932261.img";//01932261  01902000  01902028
                    E.tamingmob0 =   "N";
                }
                // if(msMoudle.m_bianshen == true) {
                //     E.tamingmob =    "N";//01932261  01902000  01902028
                //     E.tamingmob0 =   "N";
                // }
                if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false) {
                    this.char.m_id = ms.user;
                    this.char.m_zs = ms.herodata.ZS;
                }
                this.char.changeAll(this.m_sp, E, Number(this.ViewX), Number(this.ViewY));
            }

            if( (msMoudle.tiaotiao_map == "910000000.img" || msMoudle.tiaotiao_map == "980000000.img" || msMoudle.tiaotiao_map == "000010000.img") && msMoudle.maplejson["充值QQ"] == 1044571564) {
                let othercharNum:number = 1;
                let __x = 0;
                if(msMoudle.tiaotiao_map == "910000000.img") __x = 0;
                else if(msMoudle.tiaotiao_map == "980000000.img") __x = 1;
                else if(msMoudle.tiaotiao_map == "000010000.img") __x = 1;
                for(let i:number = 0; i < othercharNum; i++) {
                    this.otherchar[i] = new cssCharacter();
                    let E:any = {};
                    let selbody = msMoudle.AllBody[0] + ".img";
                    E.body = selbody;
                    E.head = "000" + (Number(selbody.split(".")[0]) + 10000) + ".img";
                    E.face = msMoudle.AllFace[__x] + ".img";
                    E.hair = msMoudle.AllHair[__x] + ".img";
                    E.weapon = msMoudle.AllWeapon[__x] + ".img";
                    E.coat = msMoudle.AllCoat[__x] + ".img";
                    E.pants = msMoudle.AllPants[__x] + ".img";
                    E.shoes = msMoudle.AllShoes[__x] + ".img";
                    E.glove = msMoudle.AllGlove[__x] + ".img";
                    E.cap = msMoudle.AllCap[__x] + ".img";
                    E.cape = msMoudle.AllCape[__x] + ".img";
                    this.otherchar[i].m_special = true;
                    this.otherchar[i].m_name = msMoudle.getRandomName();
                    this.otherchar[i].m_lv = 1;

                    if(msMoudle.getRandValue(0, 0, 100) < 25) {
                        this.otherchar[i].m_ring = msMoudle.AllRing[msMoudle.getRandValue(0, 0, msMoudle.AllRing.length)];
                    }
                    // msMoudle.toast(Laya.stage.width.toString())
                    ///改成各个出生点

                    // let rnk:number = Number( msMoudle.getRandValue(Number(msMoudle.mapP.VRLeft) + 50, 0, Number(msMoudle.mapP.VRRight) - Number(msMoudle.mapP.VRLeft) - 100) );
                    // this.otherchar[i].changeAll(this.m_sp, E, rnk, Number(this.ViewY));
                    let rnk = msMoudle.getRandValue(0, 0, this.allportal.length);
                    //所有怪物出生点
                    //所有npc出生点
                    //所有入口

                    let rnkX:number = Number(this.portalInfo["portal." + 0 + ".x"]);
                    let rnkY:number = Number(this.portalInfo["portal." + 0 + ".y"]);

                    this.otherchar[i].changeAll(this.m_sp, E, rnkX, rnkY);
                    // this.otherchar[i].startAutoFight(false);
                }
            }
            else {
                if(msMoudle.idOldMap(this.m_id) && msMoudle.isTiaoMap(this.m_id) == false && msMoudle.isSyncMap(this.m_id) == false) {
                    //人数根据地图大小决定
                    let MaxBound:number = (this.VRRight - this.VRLeft);
                    let MinBound:number = (this.VRBottom - this.VRTop);
                    if((this.VRRight - this.VRLeft) < (this.VRBottom - this.VRTop)) {
                        MaxBound = (this.VRBottom - this.VRTop);
                        MinBound = (this.VRRight - this.VRLeft);
                    }
                    let othercharNum:number = Math.round(MaxBound / 900) * Math.round(MinBound / 700);
                    othercharNum = othercharNum < 10 ? othercharNum : 10;

                    let map:string = (Number(msMoudle.rmvImg(msMoudle.tiaotiao_map)) / 100000).toFixed(0);
                    if(map == "0" || map == "0000" || msMoudle.tiaotiao_map[0] == "0") {
                        othercharNum = 0;
                    }
                    if(msMoudle.tiaotiao_map == "280030100.img" || msMoudle.tiaotiao_map == "551030200.img" ||  msMoudle.tiaotiao_map == "240060200.img" || msMoudle.tiaotiao_map == "230040420.img"
                    || msMoudle.tiaotiao_map == "701010323.img" || msMoudle.tiaotiao_map == "220080001.img") {
                        othercharNum = 0;
                    }

                    //
                    for(let i:number = 0; i < othercharNum; i++) {
                        this.otherchar[i] = new cssCharacter();
                        let E:any = {};
                        let selbody = msMoudle.AllBody[msMoudle.getRandValue(0, 0, msMoudle.AllBody.length)] + ".img";
                        E.body = selbody;
                        E.head = "000" + (Number(selbody.split(".")[0]) + 10000) + ".img";
                        E.face = msMoudle.AllFace[msMoudle.getRandValue(0, 0, msMoudle.AllFace.length)] + ".img";
                        E.hair = msMoudle.AllHair[msMoudle.getRandValue(0, 0, msMoudle.AllHair.length)] + ".img";
                        E.weapon = msMoudle.AllWeapon[msMoudle.getRandValue(0, 0, msMoudle.AllWeapon.length)] + ".img";
                        E.coat = msMoudle.AllCoat[msMoudle.getRandValue(0, 0, msMoudle.AllCoat.length)] + ".img";
                        E.pants = msMoudle.AllPants[msMoudle.getRandValue(0, 0, msMoudle.AllPants.length)] + ".img";
                        if(msMoudle.getRandValue(0, 0, 100) < 75) {
                            E.shoes = msMoudle.AllShoes[msMoudle.getRandValue(0, 0, msMoudle.AllShoes.length)] + ".img";
                        }
                        if(msMoudle.getRandValue(0, 0, 100) < 75) {
                            E.glove = msMoudle.AllGlove[msMoudle.getRandValue(0, 0, msMoudle.AllGlove.length)] + ".img";
                        }
                        if(msMoudle.getRandValue(0, 0, 100) < 25) {
                            E.cap = msMoudle.AllCap[msMoudle.getRandValue(0, 0, msMoudle.AllCap.length)] + ".img";
                        }
                        if(msMoudle.getRandValue(0, 0, 100) < 75) {
                            E.cape = msMoudle.AllCape[msMoudle.getRandValue(0, 0, msMoudle.AllCape.length)] + ".img";
                        }
                        this.otherchar[i].m_special = true;
                        this.otherchar[i].m_name = msMoudle.getRandomName();
                        this.otherchar[i].m_lv = 1;

                        if(msMoudle.sailMap(this.m_id) == false) {
                            let itemId = msMoudle.AllTamingMob[msMoudle.getRandValue(0, 0, msMoudle.AllTamingMob.length)];
                            if(i == 1) {
                                // let itemId = tb1[msMoudle.getRandValue(0, 0, tb1.length)];
                                E.tamingmob = itemId + ".img";//01902000  01902028    01902032
                                if(itemId == "01902005") E.tamingmob0 =   "01912005.img";
                                else if(itemId == "01902000") E.tamingmob0 =   "01912000.img";
                                else if(itemId == "01902028") E.tamingmob0 =   "01912021.img";
                                else if(itemId == "01902032") E.tamingmob0 =   "01912025.img";
                                else if(itemId == "01932152") E.tamingmob0 =   "N";
                                else if(itemId == "01932211") E.tamingmob0 =   "N";
                                else if(itemId == "01932351") E.tamingmob0 =   "N";
                                else if(itemId == "01932407") E.tamingmob0 =   "N";
                            }
                            else if(i == 5 || i == 7) {
                                E.tamingmob = itemId + ".img";//01902000  01902028    01902032
                                if(itemId == "01902005") E.tamingmob0 =   "01912005.img";
                                else if(itemId == "01902000") E.tamingmob0 =   "01912000.img";
                                else if(itemId == "01902028") E.tamingmob0 =   "01912021.img";
                                else if(itemId == "01902032") E.tamingmob0 =   "01912025.img";
                                else if(itemId == "01932152") E.tamingmob0 =   "N";
                                else if(itemId == "01932211") E.tamingmob0 =   "N";
                                else if(itemId == "01932351") E.tamingmob0 =   "N";
                                // else if(itemId == "01932407") E.tamingmob0 =   "N";
                                else {
                                    E.tamingmob = "N";
                                    E.tamingmob0 =   "N";
                                }
                            }
                        }

                        if(msMoudle.getRandValue(0, 0, 100) < 25) {
                            this.otherchar[i].m_ring = msMoudle.AllRing[msMoudle.getRandValue(0, 0, msMoudle.AllRing.length)];
                        }
                        // msMoudle.toast(Laya.stage.width.toString())
                        ///改成各个出生点

                        // let rnk:number = Number( msMoudle.getRandValue(Number(msMoudle.mapP.VRLeft) + 50, 0, Number(msMoudle.mapP.VRRight) - Number(msMoudle.mapP.VRLeft) - 100) );
                        // this.otherchar[i].changeAll(this.m_sp, E, rnk, Number(this.ViewY));
                        let rnk = msMoudle.getRandValue(0, 0, this.allportal.length);
                        //所有怪物出生点
                        //所有npc出生点
                        //所有入口

                        let rnkX:number = Number(this.portalInfo["portal." + rnk + ".x"]);
                        let rnkY:number = Number(this.portalInfo["portal." + rnk + ".y"]);

                        if(msMoudle.tiaotiao_map == "910000000.img" || msMoudle.tiaotiao_map == "980000000.img" || msMoudle.tiaotiao_map == "000010000.img") {
                            rnkX = Number(this.portalInfo["portal.0.x"]);
                            rnkX = Number(this.portalInfo["portal.0.x"]);
                        }

                        this.otherchar[i].changeAll(this.m_sp, E, rnkX, rnkY);
                        this.otherchar[i].startAutoFight(false);
                    }
                }
            }

            this.kb.lodKeyBoard(this, this.VRTop, this.VRLeft, this.VRBottom, this.VRRight, this.m_id);//外围
            this.m_msg.msgUpdate();

            msMoudle._(); msMoudle.updateJinBi(0);
            msMoudle._(); msMoudle.updateRongYu(0);
            msMoudle._(); msMoudle.updateZuanShi(0);
            msMoudle.gameP.updateAllExp(0);

            if(laya.net.URL.basePath.indexOf("192.168.") < 0) {
                if(Laya.Browser.document) {
                    Laya.Browser.document.onkeydown = function(){
                        if(Laya.Browser.window.event && Laya.Browser.window.event.keyCode == 123) {
                            ms.herodata = null;
                            return ;
                        }
                    }
                }
                //如果在页面出现之前执行是可以跳过的
                if(msMoudle.pt != navigator.platform) {
                    ms.herodata = null;
                    return ;
                }
            }

            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updSkill();
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateBuff();

            if(msMoudle.isAuMap(this.m_id) || this.m_id == "000020000_gai.img") {
                msMoudle.gameP.bufstate.visible = true;

                msMoudle.gameP._atk.text = "攻击力：0%";
                msMoudle.gameP._def.text = "防御力：0%";
                msMoudle.gameP._matk.text = "魔法攻击力：0%";
                msMoudle.gameP._mdef.text = "魔法防御力：0%";
                msMoudle.gameP._target.text = "命中率：0%";
                msMoudle.gameP._miss.text = "回避率：0%";
                msMoudle.gameP._atkspeed.text = "攻击速度：0%";
                msMoudle.gameP._walkspeed.text = "移动速度：0%";
                msMoudle.gameP._baoji.text = "暴击率：0%";
                msMoudle.gameP._summon.text = "召唤兽：0%";
                msMoudle.gameP._tuiguang.text = "推广认证：无";
                msMoudle.gameP.chair_buf.img.skin = "";
                msMoudle.gameP.tamingmob_buf.img.skin = "";
                msMoudle.gameP.pet_buf.img.skin = "";

                let p_hp = 0;
                //坐骑
                let p_atkspeed = 0;
                let p_walkspeed = 0;
                //宠物
                let p_def = 0;
                let p_atk = 0;         //0.25
                //时装
                let p_miss = 0;        //25
                let p_target = 0;
                let p_baoji = 0;
                let p_summon = 0;

                //坐骑
                if(ms.tamingmob) {
                    if(ms.tamingmob.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id + ".img" == ms.tamingmob.tamingmob1) {
                                let ___ = msMoudle.payjson[key];
                                p_atkspeed += ___.atkspeed;
                                p_walkspeed += ___.walkspeed;
                                p_baoji += ___.baoji;
                                msMoudle.gameP.tamingmob_buf.img.skin = "res/Character/TamingMob/" + msMoudle.payjson[key].id + ".img/info.icon.png"
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
                                p_atk += ___.atk;
                                p_def += ___.def;
                                msMoudle.gameP.pet_buf.img.skin = "res/Pet/" + msMoudle.payjson[key].id + ".img/info.icon.png";
                                break;
                            }
                        }
                    }
                }
                //椅子
                if(ms.chair) {
                    if(ms.chair.openid != 0) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == ms.chair.id) {
                                let ___ = msMoudle.payjson[key];
                                p_hp += ___.hp;
                                msMoudle.gameP.chair_buf.img.skin = "res/Character/Chair/0301.img/" + msMoudle.payjson[key].id + ".info.icon.png";
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
                                p_baoji += ___.baoji;
                                p_miss += ___.miss;
                                p_target += ___.target;
                                msMoudle.gameP.ring_buf.img.skin = "res/Character/Ring/" + msMoudle.payjson[key].id + ".img/info.icon.png"
                                break;
                            }
                        }
                    }
                }
                //转生
                if(ms.herodata.ZS > 0) {
                    p_hp += 1 * ms.herodata.ZS;
                    p_def += 1 * ms.herodata.ZS;
                    p_atk += 1 * ms.herodata.ZS;
                }
                //修炼
                for(let i:number = 0; i < ms.herodata.XL.length; i++) {
                    if(ms.herodata.XL[i] > 0) {
                        if(i == 0) {
                            p_hp += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 1) {
                            p_atk += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 2) {
                            p_def += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 3) {
                            p_target += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 4) {
                            p_miss += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 5) {
                            p_baoji += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 6) {
                            p_atkspeed += 1 * ms.herodata.XL[i];
                            p_walkspeed += 1 * ms.herodata.XL[i];
                        }
                        else if(i == 7) {
                            if(!ms.herodata.XL[i]) ms.herodata.XL[i] = 0;
                            p_summon += 3 * ms.herodata.XL[i];
                        }
                    }
                }

                //收集宠物
                if(ms.petbagsdata.length > 0) {
                    for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                        if(i == 0) p_hp += 1;
                        else if(i == 1) p_atk += 1;
                        else if(i == 2) p_def += 1;
                        else if(i == 3) p_hp += 1;
                        else if(i == 4) p_atk += 1;
                        else if(i == 5) p_def += 1;
                        else if(i == 6) p_hp += 1;
                        else if(i == 7) p_atk += 1;
                        else if(i == 8) p_def += 1;
                        else if(i == 9) p_hp += 1;
                        else if(i == 10) p_atk += 1;
                        else if(i == 11) p_def += 1;
                    }
                }
                //收集坐骑
                if(ms.tamingmobbagsdata.length > 0) {
                    p_baoji += ms.tamingmobbagsdata.length
                }
                //职业
                for(let i:number = 0; i < ms.m_job.length; i++) {
                    if(ms.m_job[i] != "") {
                        if(i == 0) p_atk += 1;
                        else if(i == 1) {}
                        else if(i == 2) {
                            p_atkspeed += 1;
                            p_walkspeed += 1;
                        }
                        else if(i == 3) p_def += 1;
                        else if(i == 4) p_atk += 1;
                        else if(i == 5) p_hp += 1;
                        else if(i == 6) p_atk += 1;
                        else if(i == 7) p_hp += 1;
                        else if(i == 8) p_def += 1;
                        else if(i == 9) {
                            p_atkspeed += 1;
                            p_walkspeed += 1;
                        }
                        else if(i == 10) p_def += 1;
                        else if(i == 11) p_def += 1;
                        else if(i == 12) p_atk += 1;
                        else if(i == 13) p_hp += 1;
                        else if(i == 14) p_atk += 1;
                        else if(i == 15) p_atk += 1;
                        else if(i == 16) p_atk += 1;
                        else if(i == 17) p_def += 1;
                        else if(i == 18) p_atk += 1;
                        else if(i == 19) p_atk += 1;
                        else if(i == 20) p_atk += 1;
                        else if(i == 21) p_hp += 1;
                        else if(i == 22) p_atk += 1;
                        else if(i == 23) p_hp += 1;
                        else if(i == 24) p_def += 1;
                        else if(i == 25) p_def += 1;
                        else if(i == 26) p_def += 1;
                        else if(i == 27) p_atk += 1;
                        else if(i == 28) p_atk += 1;
                        else if(i == 29) p_hp += 1;
                        else if(i == 30) p_def += 1;
                        else if(i == 31) p_atk += 1;
                        else if(i == 32) p_atk += 1;
                        else if(i == 33) p_atk += 1;
                        else if(i == 34) p_atk += 1;
                        else if(i == 35) p_hp += 1;
                        else if(i == 36) p_def += 1;
                        else if(i == 37) {
                            p_atkspeed += 1;
                            p_walkspeed += 1;
                        }
                        else if(i == 38) p_def += 1;
                    }
                }

                //四神兽卷轴
                // if(msMoudle.specialPvp == false) {
                //     if(msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id)) {
                //         for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                //             if(ms.herodata.EquipSlots[i]) {
                //                 let succlst = ms.herodata.EquipSlots[i].succlst;
                //                 if(succlst) {
                //                     for(let key in succlst) {
                //                         if(key == "2040595") {  //青龙卷轴
                //                             p_target += 10;
                //                             p_miss += 10;
                //                         }
                //                         else if(key == "2040596") {  //白虎卷轴
                //                             p_atkspeed += 10;
                //                             p_walkspeed += 10;
                //                         }
                //                         else if(key == "2040597") {  //玄武卷轴
                //                             p_baoji += 10;
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }

                msMoudle.gameP._hp.text = "生命：" + p_hp + "%";
                msMoudle.gameP._atkspeed.text = "攻击速度：" + p_atkspeed + "%";
                msMoudle.gameP._walkspeed.text = "移动速度：" + p_walkspeed + "%";
                msMoudle.gameP._atk.text = "攻击力：" + p_atk + "%";
                msMoudle.gameP._def.text = "防御力：" + p_def + "%";
                msMoudle.gameP._matk.text = "魔法攻击力：" + p_atk + "%";
                msMoudle.gameP._mdef.text = "魔法防御力：" + p_def + "%";
                msMoudle.gameP._target.text = "回避率：" + p_miss + "%";
                msMoudle.gameP._miss.text = "命中率：" + p_target + "%";
                msMoudle.gameP._baoji.text = "暴击率：" + p_baoji + "%";
                msMoudle.gameP._summon.text = "召唤兽：" + p_summon + "%";
                if(ms.m_tg == 1) msMoudle.gameP._tuiguang.text = "推广认证：初级";
                else if(ms.m_tg == 2) msMoudle.gameP._tuiguang.text = "推广认证：中级";
                else if(ms.m_tg == 3) msMoudle.gameP._tuiguang.text = "推广认证：高级";
            }
            else msMoudle.gameP.bufstate.visible = false;

            this.MapEff();
            // this.m_data.loadAllJson(this);
        }

        private MapEff() : void {
            /////这里做文章......
            /////以及地图加载的时候各自加载，这样就不需要全部加载了
            /////这里改成loading所有用到的技能数据好了

            ////用完直接释放-----loadwz的时候其实就已经干掉了
            Laya.loader.clearRes("res/String/Map.img/index.html")
            // msMoudle.wz["Map.img"] = null;
            msMoudle.wz[this.m_id] = null;
            for(let i:number = 0; i < this.test_tile.length; i++) {
                // Laya.loader.clearRes("res/Map/Tile/" + this.m_parent.test_tile[i] + ".img/index.html")
                msMoudle.wz[this.test_tile[i] + ".img"] = null;
            }
            for(let i:number = 0; i < this.test_obj.length; i++) {
                // Laya.loader.clearRes("res/Map/Obj/" + this.m_parent.test_obj[i] + ".img/index.html")
                msMoudle.wz[this.test_obj[i] + ".img"] = null;
            }
            for(let i:number = 0; i < this.test_back.length; i++) {
                // Laya.loader.clearRes("res/Map/Back/" + this.m_parent.test_back[i] + ".img/index.html")
                msMoudle.backwz[this.test_back[i] + ".img"] = null;
            }

            Laya.loader.clearRes("res/Map/Map/" + this.m_id + "/index.html");
            for(let i:number = 0; i < this.test_tile.length; i++) {
                Laya.loader.clearRes("res/Map/Tile/" + this.test_tile[i] + ".img/index.html")
            }
            for(let i:number = 0; i < this.test_obj.length; i++) {
                Laya.loader.clearRes("res/Map/Obj/" + this.test_obj[i] + ".img/index.html")
            }
            for(let i:number = 0; i < this.test_back.length; i++) {
                Laya.loader.clearRes("res/Map/Back/" + this.test_back[i] + ".img/index.html")
            }


            ////
            this.startGame();

        }

        pngs:Array<string> = [];
        onSkLoaded(sks:any) : void {
            let cs:cssParser = new cssParser();
            for(let i:number = 0; i < sks.length; i++) {
                if(!msMoudle.wz[sks[i] + ".img"]) {
                    msMoudle.wz[sks[i] + ".img"] = msMoudle.loadWZ(cs,"res/Skill/" + sks[i] + ".img/index.html", "ms2");
                }
            }
            for(let i:number = 0; i < ms.herodata.EquipSlots.length; i++) {
                if(ms.herodata.EquipSlots[i]) {
                    let itemId = ms.herodata.EquipSlots[i].id;
                    //获取初始数据
                    let index_path:string = msMoudle.getEqpIndex(itemId);
                    if(!msMoudle.wz[itemId + ".img"]) {
                        msMoudle.wz[itemId + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                    }
                }
            }
            if(msMoudle.loadPng) {
                ///预加载技能
                for(let i:number = 0; i < sks.length; i++) {
                    // console.log("@@@@", sks[i]);
                    let sdata = msMoudle.wz[sks[i] + ".img"];
                    if(sdata) {
                        for(let key in sdata) {
                            //只加载对应的技能
                            if(key.indexOf(msMoudle.m_skill[ms.selHero]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                            else if(key.indexOf(msMoudle.m_skill2[ms.selHero]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                            else if(key.indexOf(msMoudle.m_skill3[ms.selHero]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                        }
                    }
                }

                // console.log(this.pngs);
                //预加载morph
                //"诸葛亮", "曹操", "貂蝉", "赵云", "关羽", "张飞", "马超", "黄忠", "司马懿"
                if(ms.selHero == 10 || ms.selHero == 12 || ms.selHero == 39 || ms.selHero == 40 || ms.selHero == 41 || ms.selHero == 42 || ms.selHero == 43 || ms.selHero == 44 || ms.selHero == 45 || ms.selHero == 46 || ms.selHero == 47 || ms.selHero == 48 || ms.selHero == 49) {
                    let m_bs_id = "1001";
                    if(ms.selHero == 10) m_bs_id = "1001"
                    else if(ms.selHero == 12) m_bs_id = "1211";
                    else if(ms.selHero == 39) m_bs_id = "6000";
                    else if(ms.selHero == 40) m_bs_id = "6001";
                    else if(ms.selHero == 41) m_bs_id = "6002";
                    else if(ms.selHero == 42) m_bs_id = "6003";
                    else if(ms.selHero == 43) m_bs_id = "6004";
                    else if(ms.selHero == 44) m_bs_id = "6005";
                    else if(ms.selHero == 45) m_bs_id = "6006";
                    else if(ms.selHero == 46) m_bs_id = "6007";
                    else if(ms.selHero == 47) m_bs_id = "6008";
                    else if(ms.selHero == 48) m_bs_id = "6009";
                    else if(ms.selHero == 49) m_bs_id = "6010";
                    if(!msMoudle.wz["M" + m_bs_id + ".img"]) {
                        msMoudle.wz["M" + m_bs_id + ".img"] = msMoudle.loadWZ(cs, "res/Morph/" + m_bs_id + ".img/index.html", "ms");
                    }
                    let sdata = msMoudle.wz["M" + m_bs_id + ".img"];
                    if(sdata) {
                        for(let key in sdata) {
                            //只加载对应的技能
                            if(key.indexOf("stand") >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findMPngByImg(m_bs_id, this.pngs, sdata[key]);
                            }
                            else if(key.indexOf("walk") >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findMPngByImg(m_bs_id, this.pngs, sdata[key]);
                            }
                            else if(key.indexOf("skill1") >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findMPngByImg(m_bs_id, this.pngs, sdata[key]);
                            }
                            else if(key.indexOf("skill2") >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findMPngByImg(m_bs_id, this.pngs, sdata[key]);
                            }
                            else if(key.indexOf("skill3") >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findMPngByImg(m_bs_id, this.pngs, sdata[key]);
                            }
                        }
                    }
                }

                msMoudle.loadPng = false;
            }

            for(let i:number = 0; i < sks.length; i++) {
                // console.log("@@@@", sks[i]);
                let sdata = msMoudle.wz[sks[i] + ".img"];
                if(sdata) {
                    for(let key in sdata) {

                        ////其他玩家
                        for(let j:number = 0; j < this.playjobs.length; j++) {
                            if(key.indexOf(msMoudle.m_skill[this.playjobs[j]]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                            else if(key.indexOf(msMoudle.m_skill2[this.playjobs[j]]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                            else if(key.indexOf(msMoudle.m_skill3[this.playjobs[j]]) >= 0) {
                                // console.log("###", key, sdata[key])
                                msMoudle.findPngByImg(sks[i], this.pngs, sdata[key]);
                            }
                        }

                        // ///这个可以不加载
                        // else if(key.indexOf(msMoudle.m_skill4[ms.selHero]) >= 0) {
                        //     // console.log("###", key, sdata[key])
                        //     msMoudle.findPngByImg(sks[i], pngs, sdata[key]);
                        // }
                        // msMoudle.findPngByImg(sks[i], pngs, sdata[key]);
                        //
                    }
                }
            }

            // console.log("%%%%", pngs);
            let res:any = [];
            this.m_pre_skill_png = [];
            for(let i:number = 0; i < this.pngs.length; i++) {
                if(!Laya.loader.getRes(this.pngs[i])) {
                    res.push({ url: this.pngs[i] });
                    this.m_pre_skill_png.push(this.pngs[i]);
                }
            }
            // msMoudle.toast("xxxx" + res.length + "   " + this.pngs.length)
            if(res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(this, this.loadedPreSkill, []),Laya.Handler.create(this, this.onSkLoading, null, false),Laya.Loader.IMAGE);
            }
            else {
                this.loadedPreSkill();
            }
            //
        }

        onSkLoading(pro:number) : void {
            let P:any = this.loading.getChildByName("mapload");
            if(P) {
                P.text = "已加载" + (pro * 100).toFixed(0) + "%";
            }
        }

        loadedPreSkill() : void {

            for(let i:number = 0; i < this.pngs.length; i++) {
                let __tex = Laya.loader.getRes(this.pngs[i]);
                if(__tex) {
                    if(__tex.width >= 512 || __tex.height >= 512) {
                        ///不放入大图和集里面
                        __tex.bitmap.enableMerageInAtlas = false;
                    }
                }
            }

            // this.startGame();
            this.MapDelay();
        }

        startGame() : void {
            msMoudle._alphaspRmv(this.loading, 750);

            if(msMoudle.help && msMoudle.mapP && msMoudle.isAuMap(msMoudle.mapP.m_id) == false && msMoudle.mapP.m_id != "000020000_gai.img") {
                /////这里不一样
                // console.log(msMoudle.help);
                if(msMoudle.help.pn && msMoudle.help.tn) {
                    let index:number = 0;
                    while(true) {
                        if(this.portalInfo["portal." + index + ".pn"]) {
                            if(this.portalInfo["portal." + index + ".pn"] == msMoudle.help.tn) {
                                let moveX:number = Number(this.portalInfo["portal." + index + ".x"]);
                                let moveY:number = Number(this.portalInfo["portal." + index + ".y"]);
                                // msMoudle.toast("前往地图" + msMoudle.help.tm);
                                let change:any = {x:moveX, y:moveY};
                                this.kb.quickMove(change)
                                break;
                            }
                            index++;
                        }
                        else break;
                    }
                    // msMoudle.toast("前往地图" + msMoudle.help.tm);
                }
                // else {
                //     let index:number = 0;
                //     let moveX:number = Number(this.portalInfo["portal." + index + ".x"]);
                //     let moveY:number = Number(this.portalInfo["portal." + index + ".y"]);
                //     // msMoudle.toast("前往地图" + msMoudle.help.tm);
                //     let change:any = {x:moveX, y:moveY};
                //     this.kb.quickMove(change)
                // }
            }

            //test, show other players
            //test
            console.log("##change map")
            if(Sync.map && this.m_id == Sync.map.m_id) {
                Sync.reportMap(()=>{

                }, ()=>{
                    if(this.kb) Laya.timer.once(100, Laya.stage, Sync.reportMap);
                });
            }
            //end test
            // setTimeout(() => {
            //     if(msMoudle.gameP) {
            //         let maps = ["104030000.img", "104040000.img"];
            //         Sync.testNum = 1 - Sync.testNum;
            //         msMoudle.help = null;
            //         msMoudle.tiaotiao_map = maps[Sync.testNum];
            //         msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
            //     }
            // }, 5000);
            // Laya.timer.loop(15000,Laya.stage,() => {
            //     if(msMoudle.gameP) {
            //         let maps = ["104040001.img", "104040000.img"];
            //         Sync.testNum = 1 - Sync.testNum;
            //         msMoudle.help = null;
            //         msMoudle.tiaotiao_map = maps[Sync.testNum];
            //         msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
            //     }
            // });


            if(true) {
            // Laya.timer.once(500, this, ()=> {
                msMoudle.guaTest();
                // msMoudle.gameP.ding1.visible = true;
                // msMoudle.gameP.ding2.visible = true;
                // msMoudle.gameP.ding3.visible = true;
                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.getChildByName("签到").visible = ms.dayreward;
                }

                // if(msMoudle.isAuMap(this.m_id)) {
                //     msMoudle.gameP.ding1.visible = false;
                //     msMoudle.gameP.ding2.visible = false;
                //     msMoudle.gameP.ding3.visible = false;
                // }

                ////////////////
                if(ms.error >= 100) {
                    if(ms.error == 456) msMoudle.toast2("该帐号涉嫌加速,请联系管理");
                    else msMoudle.toast2("该帐号涉嫌挂机,请联系管理");
                    return ;
                }
                else {
                    ms.error = 0;
                }
                //0元党7日后不允许登陆
                if(ms.acz == 0) {
                    //神秘大于3
                    if(ms.asm > 3) {
                        return ;
                    }
                }
                // if(ms.test_cz == 0) {
                //     //2周后
                //     if(ms.daytotal > 7) {
                //         return ;
                //     }
                // }
                ///禁止建立多个账号
                if(msMoudle.maplejson["充值QQ"] == 1044571564) {
                    if(laya.net.LocalStorage.support) {
                        let zh:any = laya.net.LocalStorage.getJSON("zh");
                        let more = true;
                        if(zh) {
                            let str = zh.zh.split("_");
                            for(let i:number = 0; i < str.length; i++) {
                                if(str[i] == ms.user) {
                                    more = false;
                                    break;
                                }
                            }
                            if(str.length == 1) {
                                if(more) {
                                    let newzh:any = new Object();
                                    newzh.zh = zh.zh + "_" + ms.user;
                                    laya.net.LocalStorage.setJSON("zh", newzh);
                                    more = false;
                                }
                            }
                        }
                        else {
                            more = false;
                            let newzh:any = new Object();
                            newzh.zh = ms.user;
                            laya.net.LocalStorage.setJSON("zh", newzh);
                        }
                        if(more) {
                            msMoudle.toast2("当前设备已存在多个账号");
                            return ;
                        }
                    }
                }
                // if(msMoudle.yz == "N" && ms.herodata.Lv >= 100) {
                //     if(ms.allTime >= 10 * 60 + 2) {
                //         msMoudle.toast2("体验时间不足,请联系Q1044571564永久激活")
                //         return ;
                //     }
                // }
                ////防止脚本挂机
                if(ms.ch == false) {
                    if(msMoudle.idOldMap(this.m_id)) {
                        if(ms.test_guanka > 0 || ms.test_lingzhu > 0 || ms.test_boss > 0) {
                            let _sum = ms.test_guanka + ms.test_lingzhu + ms.test_boss;
                            if(_sum % 22 == 0) msMoudle.check_auto = true;//
                            else msMoudle.check_auto = false;
                        }
                        if(msMoudle.check_auto == true) {
                            ui.show(app.zhaomu.guaDlg, {black:true});
                        }
                    }
                }

                // ui.show(app.zhaomu.guaDlg, {black:true});
                let err = Gua.test();
                if(err > 0) {
                    //数据异常
                    msMoudle.toast2("数据异常" + (err + 10000) );

                    msMoudle.wsocket.socket.close();
                }

                // let _kill_mob = 0;
                // for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                //     if(ms.killmobsdata[u]) _kill_mob += ms.killmobsdata[u].num;
                // }
                // if(_kill_mob > 0) {
                //     // if(_kill_mob % 1000 == 0) {
                //     //     msMoudle.check_auto == true;
                //     //     ui.show(app.zhaomu.guaDlg, {black:true});
                //     // }
                //     if(ms.herodata.Lv >= 80) {
                //         if(_kill_mob < ms.herodata.Lv) {
                //             ms.herodata = null;
                //             return ;
                //         }
                //     }
                // }

                if(ms.story == 1 && msMoudle.isAuMap(this.m_id) == false) {
                    let maskArea:Laya.Image = new Laya.Image();
                    maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                    msMoudle.gameP.addChild(maskArea);
                    msMoudle.gameP.alpha = 1;
                    msMoudle._alphasp(maskArea, 1000);
                    Laya.timer.once(750, this, ()=> {
                        this.kb.delayLoop();
                        this.StoryStart("test", "test1");
                    });
                }
                else {
                    this.kb.delayLoop();
                    let maskArea:Laya.Image = new Laya.Image();
                    maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                    msMoudle.gameP.addChild(maskArea);
                    msMoudle.gameP.alpha = 1;
                    msMoudle._alphasp(maskArea, 1000);

                    if(msMoudle.isAuMap(this.m_id) || this.m_id == "000020000_gai.img") {

                        this.char.startAutoFight();
                        //其他
                        this.showOther();
                    }
                    else if(this.m_id == "302020100_gai.img") {
                        this.showOther();
                    }
                }

                // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.task_wc.visible = false;
                // ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.lb_wc.visible = false;

                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    msMoudle.mainT.cz_sp.getChildByName("任务").visible = false;
                    msMoudle.mainT.cz_sp.getChildByName("礼包").visible = false;
                }

                if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                    if(msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                        msMoudle.mainT.showAll(true);
                    }
                }

                // if(ms.herodata.Lv < 5) {
                //     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                //         // msMoudle.mainT.cz_sp.getChildByName("rockerFuBen1").visible = false;
                //         // msMoudle.mainT.cz_sp.getChildByName("探索_name").visible = false;

                //         msMoudle.mainT.cz_sp.getChildByName("rockerGJ").visible = false;
                //         msMoudle.mainT.cz_sp.getChildByName("挂机_name").visible = false;
                //     }
                // }

                if(msMoudle.isTiaoMap(msMoudle.mapP.m_id)) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.showAll(false);
                    }
                }

                msMoudle.getTaskMsg();
                msMoudle.getChengJiuMsg();
                msMoudle.getLiBaoMsg();
                msMoudle.getDayMsg();
                msMoudle.getChongZhiLiBaoMsg();

                msMoudle.m__touch = true;

                // Laya.timer.loop(2500, this, this.Test);

                Laya.timer.once(60000, this, this.showAvatarMegaphone);//

                // if(ms.user == "s5566") Laya.timer.scale = 5;
                // if(ms.user == "s7788") Laya.timer.scale = 0.1;

                // Laya.timer.once(3000, this, this.showAvatarMegaphone);
                // ms.herodata.Lv = 160;
                // Laya.timer.once(1000, this, this.Do1);
                // msMoudle.mainT.onState2();
                // Laya.timer.loop(10, this, ()=> {
                //     msMoudle.mainT.m_msgList.msgShow(0, "获得" + msMoudle.getRandValue(0, 0, 100), true);
                // });

                this.onBuyTime();
            }
        }

        onBuyTime() : void {
            //查询是否买了装备
            let message = new Net.Message();
            message.xieyi = 207 + ms._dpip;
            message.msdata = ms._user;
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                if(data && data["code"] == 0) {
                    if(data["msdata"]._context.length > 0) {
                        let _data:any = data["msdata"]._context.split("!@#$%");
                        if(_data.length > 0) {
                            var newobj:any = [];
                            for(var i = 1; i < _data.length; i++) {
                                newobj[i - 1] = new Object();
                                newobj[i - 1] = JSON.parse(_data[i]);
                            }
                            let sell = false;
                            for(var i = 0; i < newobj.length; i++) {
                                if(newobj[i].who == ms._user) {
                                    sell = true;
                                    let price = newobj[i].price;
                                    let type = newobj[i].type;
                                    if(price > 0) {
                                        if(type == 1) {
                                            msMoudle.toast("你有一件装备已经有玩家买走了");
                                            msMoudle._(); msMoudle.updateMartPoint(price, 101);
                                        }
                                        else {
                                            msMoudle.toast("你有一个英雄已经有玩家买走了");
                                            msMoudle._(); msMoudle.updateRongYu(price);
                                        }
                                    }
                                }
                            }
                            if(sell) {
                                ///更新界面
                                if(ui.manager.getDialogByName("app.homeland.ziyouDlg")) {
                                    if(ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg) {
                                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.updateData();
                                    }
                                }
                                ms.saveServer(true);
                            }
                        }
                    }
                }
            }});
        }

        // Do1() : void {
        //     msMoudle.mainT.onSk1();
        //     Laya.timer.once(4000, this, this.Do2);
        // }

        //  Do2() : void {
        //     msMoudle.mainT.onSk2();
        //     Laya.timer.once(4000, this, this.Do3);
        //  }
        //  Do3() : void {
        //     Laya.timer.once(4000, this, this.Do4);
        //     msMoudle.mainT.onSk3();
        //  }
        //  Do4() : void {
        //     ms.selHero += 1;
        //     if(ms.selHero > 38) ms.selHero = 0;
        //     msMoudle.mapP.changeForceSp();
        //     //标记重新加载资源
        //     msMoudle.loadPng = true;
        //     //卸载之前的资源
        //     msMoudle.rmvPng = true;
        //     msMoudle.gameP.gotoScene(ms.lastmap);
        //  }

        //站街经验
        getMainExp() : void {
        //     if(ms.herodata.Lv < 200) {
        //         let addExp = ms.herodata.Lv * 10 * (1 + ms.m_tg / 10);
        //         //增加经验
        //         ms.herodata.Exp += Math.floor(addExp);
        //         let needjinbi:number = msMoudle.getLvExp(ms.herodata.Lv);
        //         if(ms.herodata.Exp >= needjinbi) {
        //             ////这里如果升级多次会有问题
        //             let add_lv:number = 0;
        //             while(true) {
        //                 let _need:number = msMoudle.getLvExp( ms.herodata.Lv);
        //                 if(ms.herodata.Exp >= _need) {
        //                     ms.herodata.Exp -= _need;
        //                     // ms.herodata.Lv++;
        //                     msMoudle.updateLv(1);
        //                     add_lv++;
        //                     msMoudle.gameP.updataSuo();
        //                 }
        //                 else break;
        //             }
        //             msMoudle.char.m_lv = ms.herodata.Lv;
        //             if(add_lv > 0) {
        //                 ////升级
        //                 if(msMoudle.char) {
        //                     if(msMoudle.char.m_state_sp) {
        //                         let be:cssBasicEff = new cssBasicEff();
        //                         be.loadBasicEff(msMoudle.char.m_state_sp, "LevelUp", 0, 0);
        //                     }
        //                 }
        //                 ms.herodata.LeaveUp(add_lv);
        //                 //等级需要对应的改变
                        // msMoudle.mainT.updateLv();
        //                 msMoudle.gameP.lv.text = "Lv. " + ms.herodata.Lv;
        //             }
        //         }

        //         // msMoudle.gameP.updateAllExp(addExp);
        //         msMoudle.gameP.exp.width = 318 * (ms.herodata.Exp / msMoudle.getLvExp(ms.herodata.Lv));

        //         ms.saveServer();
        //     }
        }

        public getExp() : void {
            //与英雄数量有关
            let gk = ms.guanka;
            gk *= msMoudle.addExp;
            let bs = 1;
            if(ms.m_job[1] != "") bs += 0.75;
            // gk *= 1500;
            // gk *= (1 + Math.floor(ms.guanka / 100));
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updateAllExp(100 * gk * bs, false);
        }

        changeForce(chair:boolean = false) : void {
            // this.char.partIndex[msMoudle.partType.tLongcoat] = ms.testlongcoat;
            // if(ms.fashion) {
            //     if(ms.fashion.id != "N") this.char.partIndex[msMoudle.partType.tLongcoat] = ms.fashion.id;
            // }
            if(ms.ring) {
                this.char.m_ring = ms.ring.id;
            }
            if(chair == false) {
                this.char.partIndex[msMoudle.partType.tTamingMob] =   ms.tamingmob.tamingmob1;
                this.char.partIndex[msMoudle.partType.tTamingMob0] =  ms.tamingmob.tamingmob2;

                if(ms.tamingmob.tamingmob1 != "N" || ms.tamingmob.tamingmob2 != "N") {
                    Sync.toggleTamingMob(true);
                }

            }
            this.char.changeByNameForce("stand", 0);
        }

        changeForceSp(E:any = null) : void {

            if(msMoudle.mapP.summonList) {
                for(let i:number = 0; i < msMoudle.mapP.summonList.length; i++) {
                    if(msMoudle.mapP.summonList[i]) {
                        msMoudle.mapP.summonList[i].clearUp();
                        msMoudle.mapP.summonList[i] = null;
                    }
                }
                msMoudle.mapP.summonList = [];
            }

            // if(E.weapon) this.char.partIndex[msMoudle.partType.tWeapon] = E.weapon;
            // if(E.coat) this.char.partIndex[msMoudle.partType.tCoat] = E.coat;
            // if(E.pants) this.char.partIndex[msMoudle.partType.tPants] = E.pants;
            // if(E.shoes) this.char.partIndex[msMoudle.partType.tShoes] = E.shoes;
            // if(E.cap) this.char.partIndex[msMoudle.partType.tCap] = E.cap;
            // if(E.cape) this.char.partIndex[msMoudle.partType.tCape] = E.cape;
            // if(E.glove) this.char.partIndex[msMoudle.partType.tGlove] = E.glove;
            // if(E.hair) this.char.partIndex[msMoudle.partType.tHair] = E.hair;
            // if(E.body) this.char.partIndex[msMoudle.partType.tBody] = E.body;
            // if(E.head) this.char.partIndex[msMoudle.partType.tHead] = E.head;
            // if(E.face) this.char.partIndex[msMoudle.partType.tFace] = E.face;

            // if(this.char) {
            //     if(this.char.m_state) {
            //         this.char.m_state.clearUp();
            //         this.char.m_state.removeSelf();
            //         this.char.m_state = null;
            //     }
            //     if(this.char.m_skill) {
            //         this.char.m_skill.clearUp();
            //         this.char.m_skill.clearSkill();
            //         this.char.m_skill.removeSelf();
            //         this.char.m_skill = null;
            //     }
            if(this.char) {
                this.char.m_fenshen = false;
            }
                // msMoudle.m_bianshen = false;
                // this.char.bodyCopy.skin = "";
                // this.char.changeByNameForce("stand", 0);
            // }
        }

        public loadGuanKa() : void {
            let _guanka:number = 1;
            if(msMoudle.isBoss) _guanka = ms.cur_bossguanka;
            _guanka = ms.cur_guanka;
            if(this.m_life)
            this.m_life.loadLife(this.m_map, this.m_sp, this.m_id, this.VRLeft, this.VRRight, this.VRTop, this.VRBottom, _guanka);
        }

        public loadWujin() : void {
            if(this.m_life)
            this.m_life.loadLife(this.m_map, this.m_sp, this.m_id, this.VRLeft, this.VRRight, this.VRTop, this.VRBottom, 1);
        }

        //第一关结束
        private startZhaoMu() : void {
            if(ms.guanka == 2) {
                if(ms.zhaomu == false) {
                    ms.zhaomu = true;                 //第一次到第二关且招募没有开启
                    Laya.timer.once(1500, this, ()=> {
                        msMoudle._(); msMoudle.updateRongYu(100);
                        let g:cssGuide = new cssGuide();
                        g.m_updata("firstZM", null);
                    });
                }
            }
            else if(ms.guanka > 2) {
                ms.zhaomu = true;
            }
        }

        //
        private stratBoss() : void {
            if(ms.herodata.Lv >= 15) {
                if(ms.boss == false) {
                    ms.boss = true;                 //第一次到第二关且招募没有开启
                    Laya.timer.once(1500, this, ()=> {
                        let g:cssGuide = new cssGuide();
                        g.m_updata("firstBoss", null);
                    });
                }
            }
        }

        // private startRenKu() : void {
        //     if(ms.herodata.Lv >= 10) {
        //         if(ms.renku == false) {
        //             ms.renku = true;                 //第一次到第二关且招募没有开启
        //             Laya.timer.once(1500, this, ()=> {
        //                 let g:cssGuide = new cssGuide();
        //                 g.m_updata("firstRenKu", null);
        //             });
        //         }
        //     }
        // }

        began_story:string = "test";
        end_story:string = "test1";
        private StoryStart(began_story:string, end_story:string) : void {
            this.began_story = began_story;
            this.end_story = end_story;
            // ms.story = 1;
            let s:cssStory = new cssStory();        //位置1
            s.m_updata(this, this.began_story);
        }

        public StoryEnd() : void {
            // ms.story = 1;
            if(ms.story == 1 && msMoudle.isAuMap(this.m_id) == false) {
                let s:cssStory = new cssStory();        //位置2
                s.m_updata(this, this.end_story);
                // ms.story = 0;
            }
            if(msMoudle.isAuMap(this.m_id)) {
                this.char.startAutoFight();
                ///其他英雄
                this.showOther();
            }
            Laya.timer.scale = 0;
            ms.story = 0;
        }


        private showOther() : void {

            if(this.m_id == "101000103.img" || this.m_id == "101000100.img" ||
                this.m_id == msMoudle.tiaotiao_map) return ;

            this.showMyTeam();
        }

        public showMyTeam(guaji:boolean = false) : void {

            this.m_life.m_charsAni = [];
            this.m_life.m_charsAni[this.m_life.m_charsAni.length] = msMoudle.char;

            for(let tIndex:number = 0; tIndex < ms.otherherodata.length; tIndex++) {
                if(ms.otherherodata[tIndex]) {
                    for(let key in msMoudle.herojson) {
                        if(msMoudle.herojson[key].id == ms.otherherodata[tIndex].id) {
                            let E:any = {};
                            E.weapon = msMoudle.herojson[key].weapon;
                            E.fweapon = msMoudle.herojson[key].fweapon;
                            E.cap = msMoudle.herojson[key].cap;
                            E.longcoat = msMoudle.herojson[key].longcoat;
                            msMoudle.mapP.heroList[tIndex] = new cssCharacter();
                            msMoudle.mapP.heroList[tIndex].m_name = msMoudle.herojson[key].name;
                            msMoudle.mapP.heroList[tIndex]._autofight = true;
                            msMoudle.mapP.heroList[tIndex]._mainhero = false;
                            msMoudle.mapP.heroList[tIndex].m_lv = ms.otherherodata[tIndex].Lv;

                            ///英雄比主角等级高30级则有问题
                            // if(ms.otherherodata[tIndex].Lv > ms.herodata.Lv + 50) {
                            //     ms.herodata = null;
                            //     return ;
                            // }

                            let _juexing:number = 0;
                            for(let __:number = 0; __ < ms.otherheroservedata.length; __++) {
                                if(ms.otherheroservedata[__].openid == ms.otherherodata[tIndex].openid) {
                                    msMoudle.mapP.heroList[tIndex].teamIndex = __;
                                    _juexing = ms.otherheroservedata[__].juexing;
                                    break;
                                }
                            }

                            if(_juexing > 0)
                                E.cape = msMoudle.herojson[key].cape;
                            let rnk:number = Number(msMoudle.char.m_x + msMoudle.getRandValue(-100, 0, 200));

                            if(msMoudle.isPvp && msMoudle.specialPvp)
                                rnk = Number(msMoudle.mapP.VRLeft) + msMoudle.getRandValue(80, 0, 200);
                            // let rnk = msMoudle.char.m_x + 100;
                            if(guaji == false) {
                                msMoudle.mapP.heroList[tIndex].changeAll(msMoudle.mapP.m_sp, E, rnk, Number(msMoudle.mapP.ViewY));
                            }
                            else {
                                msMoudle.mapP.heroList[tIndex].changeAll(msMoudle.mapP.m_sp, E, rnk, msMoudle.char.m_y);
                            }

                            this.m_life.m_charsAni[this.m_life.m_charsAni.length] = msMoudle.mapP.heroList[tIndex];
                            break;
                        }
                    }
                }
            }

            msMoudle.mainT.m_heroList = msMoudle.mapP.heroList;

            //组队
            // if(true) {
            //     for(let i:number = 0; i < this.team_hero.length; i++) {
            //         let E:any = {};
            //         let key = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
            //         E.weapon = msMoudle.herojson[key].weapon;
            //         E.fweapon = msMoudle.herojson[key].fweapon;
            //         E.cap = msMoudle.herojson[key].cap;
            //         E.longcoat = msMoudle.herojson[key].longcoat;
            //         this.team_hero[i] = new cssCharacter();
            //         this.team_hero[i].m_name = "测试玩家";
            //         this.team_hero[i]._autofight = true;
            //         this.team_hero[i]._mainhero = false;
            //         this.team_hero[i].m_lv = 1;

            //         this.team_hero[i].m_hp = ms.pvplv * 50 * 5;
            //         this.team_hero[i].m_maxhp = ms.pvplv * 50 * 5;
            //         this.team_hero[i].m_minatk = 10 + Math.round(ms.pvplv * 3.5); //
            //         this.team_hero[i].m_maxatk = 10 + Math.round(ms.pvplv * 3.5); //
            //         this.team_hero[i].m_def = ms.pvplv;
            //         this.team_hero[i].m_baoji = 5;
            //         this.team_hero[i].m_miss = 5;
            //         this.team_hero[i].m_target = 100;

            //         let _juexing:number = 0;
            //         if(_juexing > 0)
            //             E.cape = msMoudle.herojson[key].cape;
            //         let rnk:number = Number( msMoudle.getRandValue(Number(this.VRLeft)+80 + 50, 0,
            //         Number(this.VRRight) - Number(this.VRLeft) - 100) );
            //         // let rnk = msMoudle.char.m_x + 100;
            //         this.team_hero[i].changeAll(msMoudle.mapP.m_sp, E, rnk, Number(msMoudle.mapP.ViewY));
            //         this.m_life.m_charsAni[this.m_life.m_charsAni.length] = this.team_hero[i];
            //     }
            // }
        }

        public closeMyTeam() : void {
            if(msMoudle.mapP.heroList) {
                for(let i:number = 0; i < msMoudle.mapP.heroList.length; i++) {
                    if(msMoudle.mapP.heroList[i]) {
                        msMoudle.mapP.heroList[i].clearUp();
                        msMoudle.mapP.heroList[i] = null;
                    }
                }
                msMoudle.mapP.heroList = [];
            }
        }

        private showAvatarMegaphone(flag:boolean = false, payVal:number = 0, sp:string = "") : void {
            // if(msMoudle.wsocket.avator_show) {
                this.m_av = new cssAvatarMegaphone();
                //9999999999
                this.m_av.loadAvatarMegaphone(Laya.stage, flag, payVal, sp);
            // }
            Laya.timer.once(5000, this, this.showAvatarMegaphoneED);
        }

        private showAvatarMegaphoneED() : void {
            this.m_av.clearUp();
            // Laya.timer.once(60000 * 10, this, this.showAvatarMegaphone);
        }

        public payAvatarMegaphone(payVal:number, flag:boolean = false, sp:string = "") : void {
            Laya.timer.clear(this, this.showAvatarMegaphone);
            Laya.timer.clear(this, this.showAvatarMegaphoneED);
            if(this.m_av) {
                this.m_av.clearUp();
            }
            this.showAvatarMegaphone(true, payVal, sp);
        }

        //
    }

}