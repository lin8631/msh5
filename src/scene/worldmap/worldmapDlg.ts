module app.worldmap {

    export class worldmapDlg extends ui.worldmap.worldmapDlgUI implements ui.worldmap.IworldmapDlgUI {
        public static className = "app.worldmap.worldmapDlg";

        onInitialize(){

            this.x = (Laya.stage.width - 900) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 500) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.updateData();

        }

        /*"自由市场", "彩虹村", "明珠港", "射手村", "蘑菇王", "蘑菇小道",
        "废弃都市", "勇士部落", "魔法密林","林中城", "僵尸蘑菇王", "蝙蝠怪", "武陵",
        "黄金海滩", "天空之城", "玩具城", "战甲泡泡鱼", "蜈蚣王", "百草堂",
        "冰封雪域", "童话村", "地球防御总部", "外星人章鱼", "阿里安特", "玛加提亚",
        "海底世界", "皮亚奴斯", "闹钟王", "神殿", "未知矿区",
        "神木村", "喷火龙", "格瑞芬多", "死龙巢穴", "阿尔泰营地",
        "扎昆洞穴","阴森世界", "黑龙洞穴"*/
        m_name:Array<any> = [];
        /*
        "910000000", "000010000", "104000000", "100000000", "100000005", "106020000",
        "103000000","102000000","101000000","105040300", "105070002", "105090900", "250000000",
        "110000000","200000000","220000000", "221020701", "701010323", "251000000",
        "211000000","222000000","221000000","221030601", "260000000", "261000000",
        "230000000","230040420","220080001", "270000100","280010000",
        "240000000","240020401","240020101", "240040510","300000000",
        "280030100","551030200","240060200"
        */
        m_map:Array<any> = [];

        //100020200 000050000
        m_lv = [0, 0, 8, 10, 15, 15,
        20, 30, 40, 50, 55, 55, 55,
        60, 70, 80, 85, 85, 85,
        90, 100, 110, 115, 115, 115,
        120, 125, 125,125,125,
        130, 135,135, 135,135,
        140, 150,160];

        updateData() : void {

            this.m_name = msMoudle.maplejson["m_name"].split(",");
            this.m_map = msMoudle.maplejson["m_map"].split(",");

            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            // this.zuobiao.pos(125, 27);

            // if(msMoudle.daili == false) this.group.text = "Q群 : " + msMoudle.maplejson["玩家交流群"] + "";
            // else this.group.text = "";

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

        onLstMapCellClick(e: Laya.Event, index: number): void {
            // if(ms.herodata.Lv >= this.m_lv[index] || ms.herodata.ZS > 0) {
                msMoudle.help = null;
                msMoudle.tiaotiao_map = this.m_map[index] + ".img";
                msMoudle.gameP.gotoScene(msMoudle.tiaotiao_map);
                this.close();
            // }
            // else {
            //     msMoudle.toast("你的等级不足" + this.m_lv[index] + "级");
            // }
        }

        onBtnTSClick(e: Laya.Event): void {
            msMoudle.team_guanka = 0;
            ui.show(app.boss.bossDlg, {black:true});
            this.close();
        }

        onBtnFBClick(e: Laya.Event): void {
            msMoudle.team_guanka = 0;
            ui.show(app.fuben.fubenDlg, {black:true});
            this.close();
        }
        //
        //

        onClose() : void {
            Laya.loader.clearRes("worldmap/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap000.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap010.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap020.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap030.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap040.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap050.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap060.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap070.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap080.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap090.img/BaseImg.0.png");
            Laya.loader.clearRes("res/Map/WorldMap/WorldMap100.img/BaseImg.0.png");
        }

        maps:Array<any> = [this.map1, this.map2, this.map3, this.map4, this.map5, this.map6, this.map7, this.map8, this.map9, this.map10, this.map11];
        onMap1Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[0].alpha = 1;
            // this.zuobiao.pos(125, 27);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap000.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap2Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[1].alpha = 1;
            // this.zuobiao.pos(60, 85);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap010.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap3Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[2].alpha = 1;
            // this.zuobiao.pos(32, 192);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap100.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap4Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[3].alpha = 1;
            // this.zuobiao.pos(195, 164);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap040.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap5Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[4].alpha = 1;
            // this.zuobiao.pos(250, 244);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap030.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap6Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[5].alpha = 1;
            // this.zuobiao.pos(165, 300);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap050.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap7Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[6].alpha = 1;
            // this.zuobiao.pos(50, 340);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap080.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap8Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[7].alpha = 1;
            // this.zuobiao.pos(365, 322);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap070.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap9Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[8].alpha = 1;
            // this.zuobiao.pos(519, 234);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap060.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap10Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[9].alpha = 1;
            // this.zuobiao.pos(413, 136);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap020.img/BaseImg.0.png"//
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }
        onMap11Click(e: Laya.Event): void {
            for(let i:number = 0; i < this.maps.length; i++) this.maps[i].alpha = 0;
            this.maps[10].alpha = 1;
            // this.zuobiao.pos(210, 25);
            this.mapshow.skin = "res/Map/WorldMap/WorldMap090.img/BaseImg.0.png"
            this.worldmap.visible = false;
            // this.lstMap.dataModel = this.m_name;
            // this.lstMap.visible = true;
        }

        onBtnBackClick(e: Laya.Event): void {

            if(this.worldmap.visible == false) {
                this.worldmap.visible = true;
                this.mapshow.skin = "";
                // this.lstMap.visible = false;
            }
            else {
                this.close();

                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                }
            }
        }
    }

    //
}