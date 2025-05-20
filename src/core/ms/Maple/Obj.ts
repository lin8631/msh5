module ObjRole {

    export class Obj extends Laya.Sprite {

        public oS_map:Array<any> = [];
        private objData       = new Array();
        private objAni        = new Array();
        private initPos       = new Array();
        private objFrame      = new Array();
        public hitBound      = new Array();
        private m_parent:any;

        public m_time:number = 0;
        private m_startTime = 0;
        public m_x:number = 0;
        public m_y:number = 0;

        public clearUp() : void {
            Laya.timer.clear(this, this.DoSomeThing2);
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            this.oS_map = [];
            this.objData = [];
            this.initPos = [];
            this.objFrame = [];
            this.m_time = 0;
            this.m_startTime = 0;
            for(let i:number = 0; i < this.objAni.length; i++) {
                this.objAni[i].removeSelf();
                this.objAni[i].destroy(true);
                this.objAni[i] = null;
            }
            for(let i:number = 0; i < this.hitBound.length; i++) {
                if(this.hitBound[i]) {
                    this.hitBound[i].removeSelf();
                    this.hitBound[i].destroy(true);
                    this.hitBound[i] = null;
                }
            }
        }

        public loadObj(data:any, P:any,  VRTop:any, VRLeft:any, VRBottom:any, VRRight:any) : void {
            //<tr><td>2.obj.3.oS</td><td>acc1</td></tr>
            // this.m_x = viewx;
            // this.m_y = viewy;
            this.oS_map = data;
            this.m_parent = P;

            for(let i in this.oS_map) {
                if(i == "info" || i == "back" || i == "life" || i == "foothold" || i == "ladderRope" || i == "miniMap" || i == "portal") {}
                else {
                    let ioS = this.oS_map[i];
                    if(ioS) this.dealObj(Number(i), ioS);
                }
            }

            let res:Array<any> = [];
            for(let i:number = 0; i < this.objData.length; i++) {
                for(let j:number = 0; j < this.objData[i].length; j++) {
                    if(!Laya.loader.getRes(this.objData[i][j].tex))
                        res.push({ url: this.objData[i][j].tex });
                }
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {

                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);

                    this.onObj();
                });
            }
            else {
                this.onObj();
            }
        }
        m_loadRes:Array<any> = [];
        onObj() : void {
            // msMoudle.mapP.MapLater();
            for(let i:number = 0; i < this.objData.length; i++) {
                this.doAction(0, i, this.objData);
            }
            this.m_startTime = new Date().getTime();
            Laya.timer.frameLoop(1, this, this.DoSomeThing2);
        }

        private doAction(frameIndex:number, i:number, objData:any) : void {
            if(objData[i]) {
                if(objData[i].length > 0) {
                    if(frameIndex >= objData[i].length) frameIndex = 0;
                    let _objData:any = objData[i][frameIndex];
                    if(this.objAni[i]) {
                        this.objAni[i].skin = _objData.tex;

                        // if(Number(_objData.zM) >= 37) this.objAni[i].zOrder = 20000;//
                        // else
                        this.objAni[i].zOrder = Number(_objData.z) >= 0 ? Number(_objData.z) : 0;

                        this.objFrame[i] = frameIndex;
                        if(objData[i][0].moveType == 0) {
                            let tex:any = Laya.loader.getRes(_objData.tex);
                            if(_objData.f == 1) {
                                this.objAni[i].scaleX = -1;
                                this.objAni[i].pos(_objData.x - _objData.orgx, _objData.y + _objData.orgy);
                                this.drawBound(_objData, i);
                            }
                            else {
                                this.objAni[i].scaleX = 1;
                                this.objAni[i].pos(_objData.x + _objData.orgx,  _objData.y + _objData.orgy);
                                this.drawBound(_objData, i);
                            }
                        }

                        if(objData[i].length > 1) Laya.timer.once(_objData.delay, this, this.doAction, [frameIndex + 1, i, objData], false);
                    }
                }
            }
        }

        private dealObj(i:number, ioS:any) : void {
            let j:number = 0;
            while(true) {
                let oS = ioS[i + ".obj." + j + ".oS"];
                if(oS) {// && oS != "guide"
                    // console.log("obj--" + oS + "  " + i);
                    this.linkObj(i, ioS, j, oS);
                    j = j + 1;
                }
                else break;
            }
        }

        private linkObj(i:number, ioS:any, j:number, oS:any) : void {
            let l0 = ioS[i + ".obj." + j + ".l0"];
            let l1 = ioS[i + ".obj." + j + ".l1"];
            let l2 = ioS[i + ".obj." + j + ".l2"];
            let x:number = Number(ioS[i + ".obj." + j + ".x"]);
            let y:number = Number(ioS[i + ".obj." + j + ".y"]);
            let z = ioS[i + ".obj." + j + ".z"];
            let f = ioS[i + ".obj." + j + ".f"];
            let zM = ioS[i + ".obj." + j + ".zM"];
            let data:any = msMoudle.wz[oS + ".img"][l0];
            let k:number = 0;
            ///隐藏传送地点
            if(l0 == "tutorial" && l1 == "key") return ;
            // if(l0 == "maple" && l1 == "startPoint") return ;
            if(l0 == "miniD" && l1 == "portalEff") return ;
            if(l0 == "quest" && l1 == "gate") return ;

            let tIndex:number = this.objData.length;
            this.objData[tIndex] = new Array();
            this.objAni[tIndex] = new Laya.Image();
            // this.objAni[tIndex].zOrder = i * 500 + Number(zM);
            // if(Number(z) > 6) this.objAni[tIndex].zOrder = 90000;
            this.initPos[tIndex] = new Array();
            this.m_parent.addChild(this.objAni[tIndex]);
            this.hitBound[tIndex] = new Laya.Sprite();
            this.hitBound[tIndex].zOrder = 99999;
            // this.m_parent.addChild(this.hitBound[tIndex]);

            if(data) {
                while(true) {
                    let root:string = l0 + "." + l1 + "." + l2 + "." + k;
                    if(data[root]) {
                        let root2:string = l0 + "." + l1 + "." + l2 + ".";
                        let msg:any = msMoudle.getObjInfo(data[root], root2, data);
                        let oringinInfo:any = msMoudle.Vec2FromArr(data[msg.root + ".origin"]);
                        if(data[root + "._inlink"]) {
                            let strs = data[root + "._inlink"].split('/');
                            if(strs && strs.length == 4) {
                                root = strs[0] + "." + strs[1] + "." + strs[2] + "." + strs[3];
                                root2= strs[0] + "." + strs[1] + "." + strs[2] + ".";
                                msg = msMoudle.getObjInfo(data[root], root2, data);
                            }
                        }
                        // let msg:any = msMoudle.getObjInfo(data[root], root2, data);
                        // let oringinInfo:any = msMoudle.Vec2FromArr(data[msg.root + ".origin"]);
                        let delay = Number(data[msg.root + ".delay"]);
                        let moveType:any = data[msg.root + ".moveType"] ? Number(data[msg.root + ".moveType"]) : 0;
                        let moveW:number = data[msg.root + ".moveW"] ? Number(data[msg.root + ".moveW"]) : -1;
                        let moveH:number = data[msg.root + ".moveH"] ? Number(data[msg.root + ".moveH"]) : -1;
                        let moveP:number = data[msg.root + ".moveP"] ? Number(data[msg.root + ".moveP"]) : 4000;
                        let lt:any = msMoudle.Vec2FromArr(data[msg.root + ".lt"]);
                        let rb:any = msMoudle.Vec2FromArr(data[msg.root + ".rb"]);

                        this.objData[tIndex][k] = new Object();
                        this.objData[tIndex][k].tex = "res/Map/Obj/" + oS + ".img/" + msg.strMarker;
                        this.objData[tIndex][k].x = x;
                        this.objData[tIndex][k].y = y;
                        this.objData[tIndex][k].orgx = -Number(oringinInfo.x);
                        this.objData[tIndex][k].orgy = -Number(oringinInfo.y);
                        this.objData[tIndex][k].z = i * 500 + Number(z);
                        if(msMoudle.mapP && msMoudle.mapP.m_id == "200090010.img") {
                            if(i == 3) {
                                this.objData[tIndex][k].z = 20000;
                            }
                        }
                        this.objData[tIndex][k].delay = delay?Number(delay):150;
                        this.objData[tIndex][k].f = f;
                        this.objData[tIndex][k].zM = zM ? Number(zM) : 0;
                        this.objData[tIndex][k].i = i;

                        this.objData[tIndex][k].moveType = Number(moveType);
                        this.objData[tIndex][k].moveW = Number(moveW);
                        this.objData[tIndex][k].moveH = Number(moveH);
                        this.objData[tIndex][k].moveP = Number(moveP);
                        this.objData[tIndex][k].l = Number(lt.x);
                        this.objData[tIndex][k].t = Number(lt.y);
                        this.objData[tIndex][k].r = Number(rb.x);
                        this.objData[tIndex][k].b = Number(rb.y);

                        if(f == 1) {
                            this.objData[tIndex][k].l = -Number(rb.x);
                            this.objData[tIndex][k].r = -Number(lt.x);
                        }

                        this.initPos[tIndex][k] = new Object();
                        this.initPos[tIndex][k].x = x;
                        this.initPos[tIndex][k].y = y;
                        k = k + 1;
                    }
                    else break;
                }
            }
        }

        public DoSomeThing2() : void {
            this.m_time =  (new Date().getTime() - this.m_startTime) / 1300;
            //遍历所有的obj
            for(let i:number = 0; i < this.objData.length; i++) {
                let _objData:any = this.objData[i][0];
                if(_objData) {
                    let j:number = this.objFrame[i];
                    j = j ? j : 0;
                    if(_objData.moveType != 0) {
                        let x:number = 0;
                        let y:number = 0;
                        if(_objData.moveType == 1) {
                            //偏移x
                            if (_objData.moveP != -1) {
                                if(_objData.moveW != -1) {
                                    x = _objData.moveW * Math.sin(this.m_time*2*msMoudle.PI*1000/_objData.moveP);
                                }
                            }
                            else {
                                if(_objData.moveW != -1) {
                                    x = _objData.moveW*Math.sin(this.m_time);
                                }
                            }
                        }
                        else if(_objData.moveType == 2) {
                            //偏移y
                            if (_objData.moveP != -1) {
                                if(_objData.moveH != -1) {
                                    y = _objData.moveH*Math.sin(this.m_time*2*msMoudle.PI*1000/_objData.moveP);
                                }
                            }
                            else {
                                if(_objData.moveH != -1) {
                                    y = _objData.moveH*Math.sin(this.m_time);
                                }
                            }
                        }
                        else if(_objData.moveType == 3) {
                            let ang = -this.m_time*2*msMoudle.PI*1000/_objData.moveP;
                            x = _objData.moveW * Math.sin(ang);
                            y = _objData.moveH * Math.cos(ang);
                        }

                        this.objAni[i].pos(this.initPos[i][j].x + x, this.initPos[i][j].y + y);

                        let a:any = this.objData[i][j];
                        let tex:any = Laya.loader.getRes(this.objData[i][j].tex);
                        this.drawBound2(a, i, x + tex.width / 2, y + tex.height / 2);

                        //大图占内存，散图耗Draw Call，动态图集耗CPU

                        if(msMoudle.char) {
                            if(this.objAni[i].x >= msMoudle.char.m_x - Laya.stage.width &&
                                this.objAni[i].x <= msMoudle.char.m_x + Laya.stage.width &&
                                this.objAni[i].y >= msMoudle.char.m_y - Laya.stage.height &&
                                this.objAni[i].y <= msMoudle.char.m_y + Laya.stage.height) {
                                this.objAni[i].visible = true;
                            }
                            else
                                this.objAni[i].visible = false;
                        }

                        // let objx:number = this.initPos[i][j].x + x;
                        // let objy:number = this.initPos[i][j].y + y;
                        // let herox:number = msMoudle.char.m_x;
                        // let heroy:number = msMoudle.char.m_y;
                        // if(objx >= herox - 1000 && objx <= herox + 1000 &&
                        // objy >= heroy - 800 && objy <= heroy + 800) this.objAni[i].visible = true;
                        // else this.objAni[i].visible = false;
                    }
                }
            }
        }

        private drawBound(a:any, i:number) : void {
            this.hitBound[i].graphics.clear();
            if(a.l != -999 || a.t != -999 || a.r != -999 || a.b != -999) {
                this.hitBound[i].pos(a.x, a.y);
                this.hitBound[i].graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
            }
        }

        private drawBound2(a:any, i:number, x:number, y:number) : void {
            this.hitBound[i].pos(a.x + x, a.y + y);
            this.hitBound[i].graphics.clear();
            this.hitBound[i].graphics.drawRect(a.l, a.t, a.r-a.l, a.b-a.t, null, "#ffffff");
        }


        //
    }
}