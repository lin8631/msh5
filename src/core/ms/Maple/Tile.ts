module TileRole {

    export class Tile extends Laya.Sprite {

        public tS_map:Array<any> = [];
        private tileData       = new Array();
        private m_parent:any;

        public tileBound:Array<any> = [];
        public stileAni:Array<any> = [];
        public stileData:Array<any> = [];
        public m_dursp:Array<Laya.Sprite> = [];
        public m_durtime:Array<number> = [];
        private m_x:number = 0;
        private m_y:number = 0;

        public clearUp() {
            Laya.timer.clear(this, this.tileEff);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            this.tS_map = [];
            for(let i:number = 0; i < this.tileData.length; i++) {
                if(this.tileData[i].sp) {
                    this.tileData[i].sp.removeSelf();
                    this.tileData[i].sp.destroy(true);
                    this.tileData[i].sp = null;
                }
            }
            for(let i:number = 0; i < this.stileAni.length; i++) {
                if(this.stileAni[i]) {
                    for(let j:number = 0; j < this.stileAni[i].length; j++) {
                        if(this.stileAni[i][j]) {
                            this.stileAni[i][j].removeSelf();
                            this.stileAni[i][j].destroy(true);
                            this.stileAni[i][j] = null;
                        }
                    }
                }
            }
            for(let i:number = 0; i < this.m_dursp.length; i++) {
                if(this.m_dursp[i]) {
                    this.m_dursp[i].removeSelf();
                    this.m_dursp[i].destroy(true);
                    this.m_dursp[i] = null;
                }
            }
            for(let i:number = 0; i < this.tileBound.length; i++) {
                if(this.tileBound[i]) {
                    this.tileBound[i].removeSelf();
                    this.tileBound[i].destroy(true);
                    this.tileBound[i] = null;
                }
            }
            this.stileData = [];
            this.tileData = [];
        }

        public loadTile(tS_map:any, P:any, VRTop:any, VRLeft:any, VRBottom:any, VRRight:any, viewx:number, viewy:number) : void {
            this.m_x = viewx;
            this.m_y = viewy;

            this.tS_map = tS_map;
            this.m_parent = P;

            for(let i in this.tS_map) {
                if(i == "info" || i == "back" || i == "life" || i == "foothold" || i == "ladderRope" || i == "miniMap" || i == "portal") {}
                else {
                    // console.log(i);
                    let itS = this.tS_map[i];
                    let tS = itS[i + ".info.tS"];
                    if(tS) {
                        // console.log("tile--" + tS + "  " + i);
                        this.dealTile(Number(i), tS);
                    }
                }
            }

            let res:Array<any> = [];
            for(let _:number = 0; _ < this.tileData.length; _++) {
                if(!Laya.loader.getRes(this.tileData[_].tex))
                    res.push({ url: this.tileData[_].tex });
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    // Laya.timer.frameLoop(1, this, this.DoSomeThing);

                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);

                    this.DoSomeThing();
                });
            }
            else {
                // Laya.timer.frameLoop(1, this, this.DoSomeThing);
                this.DoSomeThing();
            }
        }
        m_loadRes:Array<any> = [];
        private DoSomeThing() : void {

            // msMoudle.mapP.MapInitObj();
            msMoudle.mapP.MapLater();
            // let herox:number = msMoudle.char.m_x;
            // let heroy:number = msMoudle.char.m_y;

            this.tileShow();


            Laya.timer.loop(2000, this, this.tileEff);


        }

        tileShow() : void {
            ///需要筛选范围
            for(let _:number = 0; _ < this.tileData.length; _++) {
                if(this.tileData[_] && this.tileData[_].tex) {
                    this.tileData[_].sp.graphics.clear();

                    let tex:any = Laya.loader.getRes(this.tileData[_].tex);
                    if(tex && tex.width > 1 && tex.height > 1) {
                        let newPos:Array<any> = [];
                        for(let j:number = 1; j < this.tileData[_].tPos.length; j+= 2) {
                            let tilex:number = this.tileData[_].tPos[j - 1];
                            let tiley:number = this.tileData[_].tPos[j];
                            if(this.goodPush(tilex, tiley, tex.width, tex.height, this.m_x, this.m_y)) {
                                newPos.push(tilex);
                                newPos.push(tiley);
                            }
                        }
                        if(newPos.length >= 2) {
                            this.tileData[_].sp.graphics.drawTextures(tex, newPos);
                        }
                    }

                }
            }
        }

        goodPush(x:number, y:number, cx:number, cy:number, viewx:number, viewy:number) : boolean {
            if(msMoudle.mapP && msMoudle.mapP.m_id == "000010000.img") return true;
            if(x + cx < viewx) return false;
            if(x > viewx + Laya.stage.width) return false;
            if(y + cy < viewy) return false;
            if(y > viewy + Laya.stage.height) return false;
            return true;
        }

        private dealTile(i:number, tS:any) : void {
            let j:number = 0;
            while(true) {
                let x = this.tS_map[i][i + ".tile." + j + ".x"];
                if(x || x == 0) {
                    let y = this.tS_map[i][i + ".tile." + j + ".y"];
                    let u = this.tS_map[i][i + ".tile." + j + ".u"];
                    let no = this.tS_map[i][i + ".tile." + j + ".no"];
                    let zM = this.tS_map[i][i + ".tile." + j + ".zM"];

                    let data:any = msMoudle.wz[tS + ".img"][u];
                    let oringinInfo:any = msMoudle.Vec2FromArr(data[u + "." + no + ".origin"]);
                    let z = data[u + "." + no + ".z"]

                    let tex:string = "res/Map/Tile/" + tS + ".img/" + u + "." + no + ".png";

                    let have:number = -1;
                    for(let _:number = 0; _ < this.tileData.length; _++) {
                        if(msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                            //同一个层级的
                            if(tex == this.tileData[_].tex && i == this.tileData[_].i) {
                                have = _;
                                break;
                            }
                        }
                        else {
                            if(tex == this.tileData[_].tex) {
                                have = _;
                                break;
                            }
                        }

                    }
                    if(have != -1) {    //存在
                        this.tileData[have].tPos.push(Number(x) - Number(oringinInfo.x));
                        this.tileData[have].tPos.push(Number(y) - Number(oringinInfo.y));
                    }
                    else {
                        let tIndex:number = this.tileData.length;
                        this.tileData[tIndex] = new Object();
                        this.tileData[tIndex].tex = tex;
                        this.tileData[tIndex].i = i;
                        this.tileData[tIndex].sp = new Laya.Sprite();
                        // this.tileData[tIndex].sp.zOrder = 500 * i + 100// - j + Number(z);
                        let numZ = z ? Number(z) : 0;
                        this.tileData[tIndex].sp.zOrder = 500 * i + 100 + (numZ == 0 ? Number(zM) : numZ);
                        this.m_parent.addChild(this.tileData[tIndex].sp);

                        this.tileData[tIndex].tPos = new Array();
                        this.tileData[tIndex].tPos.push(Number(x) - Number(oringinInfo.x));
                        this.tileData[tIndex].tPos.push(Number(y) - Number(oringinInfo.y));
                    }

                    j = j + 1;
                }
                else break;
            }
        }

        public new_txt(str:string, x:number, y:number, index:number) : any {
            let txt:Laya.Label = new Laya.Label();
            txt.text = str;
            txt.fontSize = 14;
            txt.pos(x, y);
            txt.color = "#11dd22";
            txt.stroke = 3;
            txt.zOrder = 99999999;
            // txt.on("click", this, this.onClick, [index]);
            this.m_parent.addChild(txt);
        }

        tileEff() : void {

            if(this.m_durtime) {
                for(let i:number = 0; i < this.m_durtime.length; i++) {
                    if(this.m_durtime[i] > 0) {
                        this.m_durtime[i] -= 2;
                        if(this.m_durtime[i] <= 0) {
                            for(let j:number = 0; j < this.stileAni[i].length; j++) {
                                // if(this.stileAni[i][j]) {
                                //     this.stileAni[i][j].removeSelf();
                                // }
                                if(this.stileAni[i][j]) {
                                    this.stileAni[i][j].removeSelf();
                                    this.stileAni[i][j].destroy(true);
                                    this.stileAni[i][j] = null;
                                }

                            }
                            this.tileBound[i].graphics.clear();
                            this.m_durtime[i] = 0;
                        }
                    }
                    else {
                        this.m_durtime[i] -= 2;
                    }
                }


                this.judgeBound();


            }

        }

        //
        addTileSkill(tiledata:any, tile_time:number, rangeW:number, rangeH:number, hero:any) : void {
            if(tiledata) {
                this.stileData = tiledata;
                let _:number = this.m_dursp.length;
                for(let i:number = 0; i < _; i++) {
                    if(this.m_durtime[i] < -4) { //确保上一轮技能的doTileAction必定执行完了
                        _ = i;
                        break;
                    }
                }
                if(this.m_dursp[_]) {
                    this.m_dursp[_].removeSelf();
                    this.m_dursp[_].destroy(true);
                    this.m_dursp[_] = null;
                }
                this.m_dursp[_] = new Laya.Sprite();
                this.m_dursp[_].zOrder = 10000;
                if(msMoudle.mapP && msMoudle.mapP.m_sp) msMoudle.mapP.m_sp.addChild(this.m_dursp[_]);
                if(hero) {
                    this.m_dursp[_].scaleX = hero.m_dir;
                    this.m_dursp[_].pos(hero.m_x, hero.m_y);
                }
                if(this.tileBound[_]) {
                    this.tileBound[_].removeSelf();
                    this.tileBound[_].destroy(true);
                    this.tileBound[_] = null;
                }
                this.tileBound[_] = new Laya.Sprite();
                this.tileBound[_].zOrder = 10000;
                this.tileBound[_].m_id = hero.m_id;
                // if(msMoudle.mapP && msMoudle.mapP.m_sp) msMoudle.mapP.m_sp.addChild(this.tileBound[_]);
                this.tileBound[_].graphics.clear();
                let data:any = msMoudle.wz[ Math.floor(Number(2111003) / 10000) + ".img"]["skill." + 2111003];
                let lt:any = msMoudle.Vec2FromArr(data["skill." + 2111003 + ".level.30.lt"]);
                let rb:any = msMoudle.Vec2FromArr(data["skill." + 2111003 + ".level.30.rb"]);
                let a:any = new Object();
                a.l = Number(lt.x);
                a.t = Number(lt.y);
                a.r = Number(rb.x);
                a.b = Number(rb.y);
                this.tileBound[_].graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
                if(hero) {
                    this.tileBound[_].scaleX = hero.m_dir;
                    this.tileBound[_].pos(hero.m_x, hero.m_y);
                }
                this.tileBound[_].zOrder = 99999999;
                // msMoudle.mainP.m_sp.addChild(this.tileBound[_]);

                this.m_durtime[_] = tile_time >= 10 ? 10 : tile_time;

                this.stileAni[_] = [];
                rangeW += 100;  //额外加的数值是简化区域计算
                rangeH += 50;
                let M = this.stileData.length;
                let N = 8;
                for(let j:number = 0; j < N + 1; j++) {
                    for(let i:number = 0; i < M + 1; i++) {  ///这里应该是攻击的人数
                        // let rnk = msMoudle.getRandValue(0, 0, this.stileData.length);
                        // let rnk = i;
                        let rnk = Math.floor(Math.random() * this.stileData.length);
                        // let rnkX = -rangeW / 2 + (rangeW / (this.stileData.length / 2) ) * i;
                        // let rnkY = -rangeH / 2 + (rangeH / 4) * j + (rangeH / 8);  //-3/8H - 1/8H
                        let rnkX = -rangeW / 2 + (rangeW / M ) * i -20 + Math.round(Math.random() * 40);
                        let rnkY = -rangeH / 2 + (rangeH / N) * j -20 + Math.round(Math.random() * 40);
                        if(rnkX * rnkX / (rangeW * rangeW / 4) + rnkY * rnkY / (rangeH * rangeH / 4) <= 1) {
                            let tIndex:number = this.stileAni[_].length;
                            this.stileAni[_][tIndex] = new Laya.Image();
                            this.m_dursp[_].addChild(this.stileAni[_][tIndex]);
                            this.doTileAction(_, tIndex, rnk, 0, rnkX, rnkY);
                        }
                    }
                }
                // console.log("##", rangeH, rangeW, this.stileData)
            }
        }

        judgeBound() : void {

            if(msMoudle.char) {
                if(msMoudle.char.m_armyList) {
                    for(let i:number = 0; i < msMoudle.char.m_armyList.length; i++) {
                        for(let j:number = 0; j < this.tileBound.length; j++) {
                            if(this.tileBound[j] && this.tileBound[j].m_id == msMoudle.char.m_id) {
                                let mob = msMoudle.char.m_armyList[i];
                                if(mob && mob.m_isdead == false && mob.hitBound) {
                                    if(mob.hitBound.getBounds().intersects(this.tileBound[j].getBounds())) {
                                        let hit:Array<any> = [];
                                        hit[0] = {num : msMoudle.char.m_minatk + msMoudle.char.b_atk, bj:false};
                                        mob.m_hp -= Math.floor(hit[0].num);
                                        mob.hpBar.visible = true;
                                        mob.hpBar.value = Number(mob.m_hp / mob.m_maxhp);
                                        msMoudle.char.showNum(mob, hit);
                                        break;
                                    }
                                }
                                else break;
                            }
                        }
                    }
                }
            }
        }

        //
        private doTileAction(_:number, i:number, index:number, frameIndex:number, rnkX:number, rnkY:number) : void {
            if(this.m_durtime[_] <= 0) return ;
            if(this.stileData) {
                if(this.stileData[index]) {
                    if(frameIndex >= this.stileData[index].length) {
                        frameIndex = 0;
                    }
                    if(this.stileData[index][frameIndex] && this.stileAni[_] && this.stileAni[_][i]) {
                        let tex:any = Laya.loader.getRes(this.stileData[index][frameIndex].tex);
                        this.stileAni[_][i].skin = this.stileData[index][frameIndex].tex;
                        this.stileAni[_][i].pos(this.stileData[index][frameIndex].orgx + rnkX,
                        this.stileData[index][frameIndex].orgy + rnkY);

                        if(this.stileData[index][frameIndex].a0 && this.stileData[index][frameIndex].a1) {
                            msMoudle._alphasp4(this.stileAni[_][i], this.stileData[index][frameIndex].delay,
                            this.stileData[index][frameIndex].a0 / 255, this.stileData[index][frameIndex].a1 / 255);
                        }

                        if(this.stileData[index].length > 0 && this.m_durtime[_] > 0) {
                            Laya.timer.once(this.stileData[index][frameIndex].delay, this, this.doTileAction, [_, i, index, frameIndex + 1, rnkX, rnkY], false);
                        }
                    }
                }
            }
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
            this.tileShow();
        }

    }

}