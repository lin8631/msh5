module BackRole {

    export class Back extends Laya.Sprite {

        public bS_map:Array<any> = [];
        private backData:Array<any> = [];
        private frontData:Array<any> = [];
        private m_parent:any;
        public m_x:number = 0;
        public m_y:number = 0;
        public m_time:number = 0;
        private m_startTime = 0;

        public clearUp() : void {
            Laya.timer.clear(this, this.DoSomeThing);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            for(let key in this.backData) {
                if(this.backData[key].sp) {
                    this.backData[key].sp.removeSelf();
                    this.backData[key].sp = null;
                }
            }
            for(let key in this.frontData) {
                if(this.frontData[key].sp) {
                    this.frontData[key].sp.removeSelf();
                    this.frontData[key].sp = null;
                }
            }
            this.backData = [];
            this.frontData = [];
            this.bS_map = [];
            this.m_x = 0;
            this.m_y = 0;
            this.m_time = 0;
            this.m_startTime = 0;
        }

        m_loadRes:Array<any> = [];
        public loadBack(data:any, P:any, VRTop:any, VRLeft:any, VRBottom:any, VRRight:any, ViewX:any, ViewY:any) : void {
            //<tr><td>back.1.ry</td><td>-3</td></tr>
            this.bS_map = data;
            this.m_parent = P;

            this.m_x = ViewX;
            this.m_y = ViewY;

            this.dealBack();
            // console.log("##", this.backData)
            let res:Array<any> = [];
            for(let key in this.backData) {
                if(!Laya.loader.getRes(this.backData[key].tex))
                    res.push({ url: this.backData[key].tex });
            }
            for(let key in this.frontData) {
                if(!Laya.loader.getRes(this.frontData[key].tex))
                    res.push({ url: this.frontData[key].tex });
            }
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);
                    msMoudle.resTip(res);
                    /// 其他的也应该可以这么做
                    data["back"] = null;
                    this.startBack();
                });
            }
            else {
                /// 其他的也应该可以这么做
                data["back"] = null;
                this.startBack();
            }
        }

        startBack() : void {
            msMoudle.mapP.MapInitTile(this.m_x, this.m_y);

            for(let key in this.backData) {
                let tex:any = Laya.loader.getRes(this.backData[key].tex);
                if(this.backData[key].cx == 0) this.backData[key].cx = tex.width;
                if(this.backData[key].cy == 0) this.backData[key].cy = tex.height;
            }
            for(let key in this.frontData) {
                let tex:any = Laya.loader.getRes(this.frontData[key].tex);
                if(this.frontData[key].cx == 0) this.frontData[key].cx = tex.width;
                if(this.frontData[key].cy == 0) this.frontData[key].cy = tex.height;
            }

            Laya.timer.frameLoop(1, this, this.DoSomeThing);
        }

        private dealBack() : void {
            let j:number = 0;
            while(true) {
                // if(j > 5) break;
                let bS = this.bS_map["back"]["back." + j + ".bS"];
                if(bS) {
                    // console.log("back--" + bS + "  " + j);
                    this.linkBack(bS, j);
                    j = j + 1;
                }
                else break;
            }
        }

        /////扎昆地图为什么==0就不行呢????
        private linkBack(bS:any, j:number) : void {
            let type:number = Number(this.bS_map["back"]["back." + j + ".type"]);
            // if(type == 4 && msMoudle.sailMap(msMoudle.mapP.m_id)) return ;
            if(type >= 0) {
            // if(type > 0 || (type == 0 && msMoudle.idOldMap(msMoudle.mapP.m_id)) ) {
                let ani:number = this.bS_map["back"]["back." + j + ".ani"];
                let f:number = this.bS_map["back"]["back." + j + ".f"];
                let rx:number = this.bS_map["back"]["back." + j + ".rx"];
                let ry:number = this.bS_map["back"]["back." + j + ".ry"];
                if(ani > 0) return ;
                // if(f > 0) return ;
                // if(rx < 0) return ;
                // if(ry < 0) return ;
                let no = this.bS_map["back"]["back." + j + ".no"];
                let x:number = this.bS_map["back"]["back." + j + ".x"];
                let y:number = this.bS_map["back"]["back." + j + ".y"];

                let cx:number = this.bS_map["back"]["back." + j + ".cx"];
                let cy:number = this.bS_map["back"]["back." + j + ".cy"];
                let a:number = this.bS_map["back"]["back." + j + ".a"];
                let front:number = this.bS_map["back"]["back." + j + ".front"];
                if(!front) front = 0;
                // console.log(data["back"]);
                let backdata:any = msMoudle.backwz[bS + ".img"]["back"];
                if(!backdata) {
                    console.log("has no back, ", bS);
                    return;
                }
                let oringinInfo:any = msMoudle.Vec2FromArr(backdata["back." + no + ".origin"]);
                let tex:string = "res/Map/Back/" + bS + ".img/back." + no + ".png";

                if(front == 0) {
                    let tIndex:number = this.backData.length;
                    this.backData[tIndex] = new Object();
                    this.backData[tIndex].sp = new Laya.Sprite();
                    // this.backData[tIndex].sp.zorder = j * 50;//Number(no);
                    this.m_parent.addChild(this.backData[tIndex].sp);

                    this.backData[tIndex].tex = tex;
                    this.backData[tIndex].tPos = new Array();
                    this.backData[tIndex].bS = bS;
                    this.backData[tIndex].no = no;
                    this.backData[tIndex].movetype = 1; //不需要使用
                    this.backData[tIndex].type = Number(type);
                    this.backData[tIndex].tdelta = 0;   //关键
                    this.backData[tIndex].rx = Number(rx);
                    this.backData[tIndex].ry = Number(ry);
                    this.backData[tIndex].cx = Number(cx);
                    this.backData[tIndex].cy = Number(cy);
                    if(f == 1) this.backData[tIndex].sp.scaleX = -1;
                    this.backData[tIndex].x = Number(x);
                    this.backData[tIndex].y = Number(y);
                    this.backData[tIndex].f = Number(f);
                    this.backData[tIndex].front = front ? Number(front) : 0;
                    this.backData[tIndex].ang = 0;  //不需要使用
                    this.backData[tIndex].oringinInfox = Number(oringinInfo.x);
                    this.backData[tIndex].oringinInfoy = Number(oringinInfo.y);
                }
                else if(front == 1) {
                    let tIndex:number = this.frontData.length;
                    this.frontData[tIndex] = new Object();
                    this.frontData[tIndex].sp = new Laya.Sprite();
                    this.frontData[tIndex].sp.zOrder = 100000;
                    this.m_parent.addChild(this.frontData[tIndex].sp);//

                    this.frontData[tIndex].tex = tex;
                    this.frontData[tIndex].tPos = new Array();
                    this.frontData[tIndex].bS = bS;
                    this.frontData[tIndex].no = no;
                    this.frontData[tIndex].movetype = 1; //不需要使用
                    this.frontData[tIndex].type = Number(type);
                    this.frontData[tIndex].tdelta = 0;   //关键
                    this.frontData[tIndex].rx = Number(rx);
                    this.frontData[tIndex].ry = Number(ry);
                    this.frontData[tIndex].cx = Number(cx);
                    this.frontData[tIndex].cy = Number(cy);
                    if(f == 1) this.frontData[tIndex].sp.scaleX = -1;
                    this.frontData[tIndex].x = Number(x);
                    this.frontData[tIndex].y = Number(y);
                    this.frontData[tIndex].f = Number(f);
                    this.frontData[tIndex].front = front ? Number(front) : 0;
                    this.frontData[tIndex].ang = 0;  //不需要使用
                    this.frontData[tIndex].oringinInfox = Number(oringinInfo.x);
                    this.frontData[tIndex].oringinInfoy = Number(oringinInfo.y);
                }
            }
        }

        public draw1(bS:any, no:any, x:number, y:number, flipped:number, rotation:number,
        cx:number, cy:number, rx:number, ry:number, ogx:number, ogy:number, type:number, isfront:boolean, key:any, viewx:number, viewy:number) : void {
            // let key = "res/Map/Back/" + bS + ".img/back." + no + ".png";
            // if(no > 1) return ;
            if(isfront == false) {
                if(this.backData[key]) {
                    if(cx > 1) {
                        ///左边补齐
                        // if(flipped == 1) {
                        if(x - ogx - cx > viewx) {
                            if(this.goodPush(x - ogx - cx - cx, y - ogy, cx, cy, viewx, viewy)) {
                                this.backData[key].tPos.push(x - ogx - cx - cx);
                                this.backData[key].tPos.push(y - ogy );
                            }

                        }
                        else {
                            if(x - ogx > viewx) {
                                if(this.goodPush(x - ogx - cx, y - ogy, cx, cy, viewx, viewy)) {
                                    this.backData[key].tPos.push(x - ogx - cx);
                                    this.backData[key].tPos.push(y - ogy );
                                }
                            }
                        }
                    }
                    if(flipped == 1) {

                        if(cx == 800) {
                            // if(this.goodPush(-x - ogx - cx, y - ogy, cx, cy, viewx, viewy)) {
                                this.backData[key].tPos.push(-x - ogx - cx);// + cx  + cx
                                this.backData[key].tPos.push(y - ogy );
                            // }
                        }
                        else {
                            // if(this.goodPush(-x + ogx - cx, y - ogy, cx, cy, viewx, viewy)) {
                                this.backData[key].tPos.push(-x + ogx - cx);// + cx  + cx
                                this.backData[key].tPos.push(y - ogy );
                            // }
                            // if(this.goodPush(-x + ogx - cx - 2 * cx, y - ogy, cx, cy, viewx, viewy)) {
                                this.backData[key].tPos.push(-x + ogx - cx - 2 * cx);// + cx  + cx
                                this.backData[key].tPos.push(y - ogy );
                            // }
                        }
                    }
                    else {
                        if(this.goodPush(x - ogx, y - ogy, cx, cy, viewx, viewy)) {
                            this.backData[key].tPos.push(x - ogx );
                            this.backData[key].tPos.push(y - ogy );
                        }
                    }
                    if(cx > 1) {
                        //右边背景补齐
                        if(Number(no) == 0 || Number(no) == 1) {
                            let addN:number = Math.floor(Laya.stage.width / cx);
                            if(addN < 10) {
                                for(let i:number = 0; i < addN; i++) {
                                    if(flipped == 0) {
                                        if(x - ogx + cx * (i + 1) < viewx + Laya.stage.width) {
                                            if(this.goodPush(x - ogx + cx * (i + 1), y - ogy, cx, cy, viewx, viewy)) {
                                                this.backData[key].tPos.push(x - ogx + cx * (i + 1));
                                                this.backData[key].tPos.push(y - ogy );
                                            }
                                            else break;
                                        }
                                        else break;
                                    }
                                    else break;
                                }
                            }
                        }
                    }
                }
            }
            else {
                if(this.frontData[key]) {
                    if(flipped == 1) {
                        if(this.goodPush(-x + ogx - cx, y - ogy, cx, cy, viewx, viewy)) {
                            this.frontData[key].tPos.push(-x + ogx - cx );
                            this.frontData[key].tPos.push(y - ogy );
                        }
                    }
                    else {
                        if(this.goodPush(x - ogx, y - ogy, cx, cy, viewx, viewy)) {
                            this.frontData[key].tPos.push(x - ogx );
                            this.frontData[key].tPos.push(y - ogy );
                        }
                    }
                }
            }
        }

        goodPush(x:number, y:number, cx:number, cy:number, viewx:number, viewy:number) : boolean {
            if(x + cx < viewx) return false;
            if(x > viewx + Laya.stage.width) return false;
            if(y + cy < viewy) return false;
            if(y > viewy + Laya.stage.height) return false;
            return true;
        }

        public DoSomeThing() : void {
            this.m_time =  (new Date().getTime() - this.m_startTime) / 1000;
            //back
            this.BackLopp();
            //front
            this.FrontLoop();
        }

        BackLopp() : void {
            for(let key in this.backData) {
                this.backData[key].tPos = [];
                if(this.backData[key].type >= 0) {   //>=
                    // console.log(this.backData[key].type, "222")
                    ///卡在了这里
                    this.___(this.backData[key].bS, this.backData[key].no, 1, this.backData[key].type, this.m_time, this.backData[key].rx,
                    this.backData[key].ry, this.backData[key].cx, this.backData[key].cy, this.backData[key].x, this.backData[key].y, this.backData[key].f,
                    this.m_x, this.m_y, 0, this.backData[key].oringinInfox, this.backData[key].oringinInfoy, 1, false, key);

                    // console.log(this.backData[key].tPos.length)
                    if(this.backData[key].tPos.length >= 2) {
                        this.backData[key].sp.graphics.clear();
                        this.backData[key].sp.graphics.drawTextures(Laya.loader.getRes(this.backData[key].tex), this.backData[key].tPos);
                        // console.log(this.backData[key].sp.x, this.backData[key].sp.y, msMoudle.char.m_x, msMoudle.char.m_y)
                    }
                }
            }
        }

        FrontLoop() : void {
            for(let key in this.frontData) {
                this.frontData[key].tPos = [];
                if(this.frontData[key].type >= 0) {
                    // console.log(this.frontData[key].type, "111")
                    this.___(this.frontData[key].bS, this.frontData[key].no, 1, this.frontData[key].type, this.m_time, this.frontData[key].rx,
                    this.frontData[key].ry, this.frontData[key].cx, this.frontData[key].cy, this.frontData[key].x, this.frontData[key].y, this.frontData[key].f,
                    this.m_x, this.m_y, 0, this.frontData[key].oringinInfox, this.frontData[key].oringinInfoy, 1, true, key);
                    // console.log(this.backData[key].tPos.length)
                    if(this.frontData[key].tPos.length >= 2) {
                        this.frontData[key].sp.graphics.clear();
                        this.frontData[key].sp.graphics.drawTextures(Laya.loader.getRes(this.frontData[key].tex), this.frontData[key].tPos);
                        // console.log(this.backData[key].sp.x, this.backData[key].sp.y, msMoudle.char.m_x, msMoudle.char.m_y)
                    }
                }
            }
        }

        public ___(bS:any, no:any, movetype:number, type:number, tdelta:number,
        rx:number, ry:number, cx:number, cy:number, x:number, y:number, f:number,
        viewx:number, viewy:number, ang:number, ogx:number, ogy:number, drawtype:number, isfront:boolean, key:any) : void {

            if(cx <= 1 || cy <= 1) return ;
            // if(rx < 0 || ry < 0) return ;
            ///这个y肯定有用

            let ox:number = (100 + rx) * (viewx + 800 / 2) / 100;      //图片比例 * 地图比例 . viewx + Laya.stage.width
            let oy:number = (100 + ry) * (viewy + 300) / 100;
            let orx:number = ogx - ogx % cx;
            let ory:number = ogy - ogy % cy;
            let ax:number = 0;
            let ay:number = 0;

            if(type == 0) {
                this.draw1(bS, no, Number(x)+Number(ox)+Number(ax), Number(y)+Number(oy)+Number(ay), Number(f), Number(ang), Number(cx), Number(cy), Number(rx), Number(ry), Number(ogx), Number(ogy), type, isfront, key, viewx, viewy);
            }
            else if(type == 1) {
                ////管家问题在这里
                this.__h(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 2) {
                this.__v(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 3) {
                this.__b(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 4) {
                /////这个肯定又问题
                ax = Number(ax) + Number(tdelta)*Number(rx)*5;
                this.__h(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 5) {
                ay =  Number(ay) + Number(tdelta)*Number(ry)*5;
                this.__v(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 6) {
                ax = Number(ax) + Number(tdelta)*Number(rx)*5;
                this.__b(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
            else if(type == 7) {
                ay = Number(ay) + Number(tdelta)*Number(ry)*5;
                this.__b(bS, no, Number(x), Number(y), Number(ax), Number(ay),
                Number(viewx), Number(viewy), Number(cx), Number(cy), Number(ox), Number(oy), Number(orx), Number(ory),
                Number(f), Number(ang), Number(rx), Number(ry), Number(ogx), Number(ogy), 1, type, drawtype, isfront, key);
            }
        }

        public __h(bS:any, no:any, x:number, y:number, ax:number, ay:number, viewx:number, viewy:number, cx:number, cy:number,
        ox:number, oy:number, orx:number, ory:number,
        f:number, ang:number, rx:number, ry:number, ogx:number, ogy:number, loadtype:number, type:number, drawtype:any, isfront:boolean, key:any) : void {
            for(let i:number = (x+ax-viewx+ox+orx)%cx-cx+viewx-ox; i+ox < viewx+Laya.stage.width+cx+orx; i += cx) {
                this.draw1(bS, no, i+ox, y+oy+ay, f, ang, cx, cy, rx, ry, ogx, ogy, type, isfront, key, viewx, viewy);
            }
        }

        public __v(bS:any, no:any, x:number, y:number, ax:number, ay:number, viewx:number, viewy:number, cx:number, cy:number,
        ox:number, oy:number, orx:number, ory:number,
        f:number, ang:number, rx:number, ry:number, ogx:number, ogy:number, loadtype:number, type:number, drawtype:any, isfront:boolean, key:any) : void {
            for(let j:number = (y+ay-viewy+oy+ory)%cy-cy+viewy-oy; j+oy < viewy+600+cy+ory; j += cy) {
                this.draw1(bS, no, x+ox+ax, j+oy, f, ang, cx, cy, rx, ry, ogx, ogy, type, isfront, key, viewx, viewy);
            }
        }

        public __b(bS:any, no:any, x:number, y:number, ax:number, ay:number, viewx:number, viewy:number, cx:number, cy:number,
        ox:number, oy:number, orx:number, ory:number,
        f:number, ang:number, rx:number, ry:number, ogx:number, ogy:number, loadtype:number, type:number, drawtype:any, isfront:boolean, key:any) : void {
            let beganX:number = (x+ax-viewx+ox+orx)%cx-cx+viewx-ox;     //目的是让在镜头内的物件显示
            let beganY:number = (y+ay-viewy+oy+ory)%cy-cy+viewy-oy;
            let endX:number = Number(viewx) + Laya.stage.width + Number(cx) + Number(orx) ;//
            let endY:number = Number(viewy) + 600 + Number(cy) + Number(ory);
            for(let i:number = beganX; i+ox < endX; i += cx) {
                for(let j:number = beganY; j+oy < endY; j += cy) {
                    this.draw1(bS, no, i+ox, j+oy, f, ang, cx, cy, rx, ry, ogx, ogy, type, isfront, key, viewx, viewy);
                }
            }
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
        }
        //
    }

}