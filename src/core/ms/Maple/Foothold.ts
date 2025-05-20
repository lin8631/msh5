module FootholdRole {

    export class Foothold extends Laya.Sprite {

        private m_sp:Laya.Sprite;
        private m_parent:any;
        private foothold_map:Array<any> = [];
        private ladderRope_map:Array<any> = [];
        private spx:Array<any> = [];

        public newline:Array<any> = [];
        public newline2:Array<any> = [];
        public line:Array<any> = [];
        public ladder:Array<any> = [];
        public maxz:number = 0;
        public fh_zmap: any = {};

        public clearUp() : void {
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.spx.length; i++) {
                if(this.spx[i]) {
                    this.spx[i].removeSelf();
                    this.spx[i].destroy(true);
                    this.spx[i] = null;
                }
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.foothold_map = [];
            this.ladderRope_map = [];
            this.newline = [];
            this.ladder = [];
            this.maxz = 0;
            // this.linePos = [];
            // this.ropePos = [];


            // walls = { leftw + 25, rightw - 25 };
		    // borders = { topb - 300, botb + 100 };
        }

        findLst(lst:any, flag:number) : void {
            if(flag == 1) this.find1(lst.prev, lst.next, lst.fl)
            else this.find2(lst.prev, lst.next, lst.fl)
        }

        //1     0
        find2(prev:number, next:number, fl:string) : void {


            let i:number = this.findNext(prev, fl);
            if(i != -1) {
                let _prev = this.newline[i].prev;
                let _next = this.newline[i].next;

                //一对
                // let __ = this.rmvLines.length;
                // this.rmvLines[__] = new Object();
                // this.rmvLines[__].fl = fl;
                // this.rmvLines[__].key = prev + "_" + next;

                // this.rmvLines[this.rmvLines.length] = _prev + "_" + _next;

                let __ = this.rmvLines.length;
                this.rmvLines[__] = new Object();
                this.rmvLines[__].fl = fl;
                this.rmvLines[__].key =  _prev + "_" + _next;

                //对方的prev
                let j:number = this.findNext(_prev, fl);
                if(j != -1) {
                    return this.find2(_prev, _next, fl);
                }
            }
        }

        //0     1
        find1(prev:number, next:number, fl:string) : void {            //已知我方prev和【next】


            let i:number = this.findPrev(next, fl);             //找到【prev】
            if(i != -1) {
                let _prev = this.newline[i].prev;
                let _next = this.newline[i].next;

                //一对
                // let __ = this.rmvLines.length;
                // this.rmvLines[__] = new Object();
                // this.rmvLines[__].fl = fl;
                // this.rmvLines[__].key = prev + "_" + next;

                let __ = this.rmvLines.length;
                this.rmvLines[__] = new Object();
                this.rmvLines[__].fl = fl;
                this.rmvLines[__].key =  _prev + "_" + _next;

                // this.rmvLines[this.rmvLines.length] = prev + "_" + next;
                // this.rmvLines[this.rmvLines.length] = _prev + "_" + _next;
                //对方的next
                let j:number = this.findPrev(_next, fl);
                if(j != -1) {

                    return this.find1(_prev, _next, fl);
                }
            }
        }
        /*
        63  foothold.4.2
Foothold.ts:76 68  foothold.4.2
Foothold.ts:76 65  foothold.4.2
Foothold.ts:76 70  foothold.4.2
Foothold.ts:76 57  foothold.4.2
Foothold.ts:76 63  foothold.4.2
Foothold.ts:76 68  foothold.4.2
        */

        // findAll(fl:string) : void {
        //     for(let i:number = 0; i < this.newline.length; i++) {
        //         if(this.newline[i].x1 == this.newline[i].x2) {
        //             if(fl == this.newline[i].fl) {
        //                 let _prev = this.newline[i].prev;
        //                 let _next = this.newline[i].next;

        //                 let __ = this.rmvLines.length;
        //                 this.rmvLines[__] = new Object();
        //                 this.rmvLines[__].fl = fl;
        //                 this.rmvLines[__].key =  _prev + "_" + _next;
        //             }
        //         }
        //     }
        // }

        findNext(next:number, fl:string) : number {
            for(let i:number = 0; i < this.newline.length; i++) {
                if(this.newline[i].x1 == this.newline[i].x2) {
                    if(this.newline[i].next == next && fl == this.newline[i].fl) {
                        return i;
                    }
                }
            }
            return -1;
        }

        findPrev(prev:number, fl:string) : number {
            for(let i:number = 0; i < this.newline.length; i++) {
                if(this.newline[i].x1 == this.newline[i].x2) {
                    if(this.newline[i].prev == prev && fl == this.newline[i].fl) {
                        return i;
                    }
                }
            }
            return -1;
        }



        minX:number = 999999;
        maxX:number = -999999;
        minY:number = 999999;
        maxY:number = -999999;
        public loadFoothold(m_map:any, P:any, VRTop:any, VRLeft:any, VRBottom:any, VRRight:any, h:any, centy:any) : any {

            let mapSize:any = {left:Number(VRLeft), right:Number(VRRight),
                up:Number(VRTop), down:Number(VRBottom)}

            this.m_parent = P;
            this.m_sp = new Laya.Image();
            this.m_sp.zOrder = 99999;
            this.m_parent.addChild(this.m_sp);

            this.linkfoothold(m_map);
            this.linkladderRope(m_map);

            if(this.minX != 999999) {
                if(this.minX >= Number(VRLeft)) {
                    VRLeft = this.minX;
                    mapSize.left = this.minX;
                }
            }
            if(this.maxX != -999999) {
                if(this.maxX <= Number(VRRight)) {
                    VRRight = this.maxX;
                    mapSize.right = this.maxX;
                }
            }
            // if(this.minY != 999999) {
            //     if(this.minY <= Number(VRTop)) {
            //         VRTop = this.minX;
            //         mapSize.up = this.minY;
            //     }
            // }
            // VRBottom -= 200;
            if(this.maxY != -999999) {
                if(this.maxY < Number(VRBottom) && Number(VRBottom) - this.maxY <= 600) {
                    if(Number(VRBottom) >= this.maxY + 200)
                        VRBottom = this.maxY + (Number(VRBottom) - this.maxY) / 2
                }
                // else {
                //     mapSize.down = Number(VRBottom);
                // }
                // if(this.maxY >= Number(VRBottom)) {
                //     // VRBottom = this.maxY;
                //     // mapSize.down = this.maxY;
                // }
            }
            mapSize.down = Number(VRBottom);
            // msMoudle.toast(this.maxY + "_" + Number(VRBottom))

            // mapSize.up = Number(VRTop);
            // mapSize.down = Number(VRBottom);
            // // if(h == Number(centy) + Number(VRBottom)) {
            // if(Number(centy) - Number(VRBottom) > 600) {
            //     mapSize.down = Number(VRBottom) - ((Number(centy) - Number(VRBottom)) - 600);
            // }
            // }
            // for(let i:number = 0; i < 4; i++) {
            //     let spIndex:number = this.spx.length;
            //     this.spx[spIndex] = new Laya.Sprite();
            //     this.m_sp.addChild(this.spx[spIndex]);
            //     if(i == 0)
            //         this.spx[spIndex].graphics.drawLine( Number(VRLeft), Number(VRTop), Number(VRRight), Number(VRTop), "#ff0000", 3);
            //     else if(i == 1)
            //         this.spx[spIndex].graphics.drawLine( Number(VRLeft), Number(VRTop), Number(VRLeft), Number(VRBottom), "#ff0000", 3);
            //     else if(i == 2)
            //         this.spx[spIndex].graphics.drawLine( Number(VRLeft), Number(VRBottom), Number(VRRight), Number(VRBottom), "#ff0000", 3);
            //     else if(i == 3)
            //         this.spx[spIndex].graphics.drawLine( Number(VRRight), Number(VRTop), Number(VRRight), Number(VRBottom), "#ff0000", 3);
            // }

            // for(let i:number = 0; i < this.newline.length; i++) {
            //     // this.new_txt("#" + this.newline[i].next, (this.newline[i].x2 + this.newline[i].x1 ) / 2,  this.newline[i].y1 - 70, 0);
            //     // this.new_txt("!" + this.newline[i].prev, (this.newline[i].x2 + this.newline[i].x1 ) / 2,  this.newline[i].y1 - 50, 0);
            //     // this.new_txt("@" + this.newline[i].z,  (this.newline[i].x2 + this.newline[i].x1 ) / 2, this.newline[i].y1 - 30, 0);

            //     let spIndex:number = this.spx.length;
            //     this.spx[spIndex] = new Laya.Sprite();
            //     this.m_sp.addChild(this.spx[spIndex]);
            //     this.spx[spIndex].graphics.drawLine(Number(this.newline[i].x1), Number(this.newline[i].y1),
            //     Number(this.newline[i].x2),  Number(this.newline[i].y2), "#ff0000", 3);
            // }
            m_map["foothold"] = null;
            m_map["ladderRope"] = null;
            return mapSize;
        }

        private linkfoothold(data:any) : void {
            this.foothold_map = data["foothold"];
            if(this.foothold_map) {
                let root:Array<any> = []
                for(let key in this.foothold_map) {
                    let _:any = key.split(".");
                    let footholdkey:string = _[0] + "." + _[1] + "." + _[2] + "." + _[3];
                    if(msMoudle.findKeyFromArr(footholdkey, root) == false) {
                        root[root.length] = footholdkey;
                        this.dofoothold(footholdkey, _[1], _[2], _[3]);

                        this.fh_zmap[_[3]] = Number(_[1]);

                        // patch.ZIndex[0] = (int)patch.ObjectType;
                        // patch.ZIndex[1] = _layer;
                        // patch.ZIndex[2] = _z;
                        // patch.ZIndex[3] = _fh;
                    }
                }

                // for(let i:number = 0; i < this.unshowLst.length; i++) {
                //     if(this.unshowLst[i].prev == 0) {
                //         // this.findLst(this.unshowLst[i], 1);
                //     }
                //     else {
                //         // this.findLst(this.unshowLst[i], 2);
                //     }
                // }

                // msMoudle.toast(this.rmvLines.length + "")
                // for(let i:number = 0; i < this.rmvLines.length; i++) {
                //     if(this.rmvLines[i]) {
                //         let prev = this.rmvLines[i].key.split("_")[0];
                //         let next = this.rmvLines[i].key.split("_")[1];
                //         for(let j:number = 0; j < this.newline.length; j++) {
                //             if(Number(this.newline[j].prev) == Number(prev) && Number(this.newline[j].next == Number(next)) &&
                //             this.rmvLines[i].fl == this.newline[j].fl) {
                //                 this.newline.splice(j, 1);
                //                 break;
                //             }
                //         }
                //     }
                // }
            }


            let missline:Array<any> = [];
            let zeroline:Array<any> = [];
            for(let i:number = 0; i < this.newline.length; i++) {
                if(this.newline[i].x1 == this.newline[i].x2) {
                    let prev:number = Number(this.newline[i].prev);
                    let next = Number(this.newline[i].next);
                    ////僵尸蘑菇王洞穴恰好这2种情况
                    let mline:Array<any> = [];

                    if(prev == 0) {
                        mline[mline.length] = i;
                        zeroline[zeroline.length] = i;
                        let _ppp = next;
                        let _num:number = 0;
                        // let _fir = -1;
                        while(true) {
                            let uuuu:boolean = true;
                            for(let j:number = 0; j < this.newline.length; j++) {
                                if(this.newline[j].x1 == this.newline[j].x2) {
                                    let __3 = Number(this.newline[j]._3);
                                    let _next = Number(this.newline[j].next);
                                    if(_ppp == __3) {   //保证是同一线的
                                        mline[mline.length] = j;
                                        // if(_fir == -1) _fir = j;
                                        _ppp = _next;
                                        uuuu = false;
                                        _num += 1;
                                        break;
                                    }
                                }
                            }
                            if(uuuu) {//
                                // if(_num == 1 && _fir != -1 ) missline[missline.length] = _fir;
                                break;
                            }
                        }
                    }
                    if(next == 0) {
                        mline[mline.length] = i;
                        zeroline[zeroline.length] = i;
                        let _ppp = prev;
                        let _num:number = 0;
                        // let _fir = -1;
                        while(true) {
                            let uuuu:boolean = true;
                            for(let j:number = 0; j < this.newline.length; j++) {
                                if(this.newline[j].x1 == this.newline[j].x2) {
                                    let __3 = Number(this.newline[j]._3);
                                    let _prev = Number(this.newline[j].prev);
                                    if(_ppp == __3) {
                                        mline[mline.length] = j;
                                        // if(_fir == -1) _fir = j;
                                        _ppp = _prev;
                                        uuuu = false;
                                        _num++;
                                        break;
                                    }
                                }
                            }
                            if(uuuu) {
                                // if(_num == 1 && _fir != -1 ) missline[missline.length] = _fir;
                                break;
                            }
                        }
                    }

                    ///如果这是独立的线，不收尾相交才去掉试试
                    let rmv:boolean = true;
                    if(mline.length > 1) {
                        for(let _:number = 0; _ < mline.length; _++) {
                            for(let k:number = 0; k < this.newline.length; k++) {
                                //肯定不是竖线
                                if(this.newline[k].x1 != this.newline[k].x2 && k != mline[0]) {
                                    //首位相接
                                    if(this.newline[k].x1 == this.newline[mline[_]].x2 && this.newline[k].y1 == this.newline[mline[_]].y2 ||
                                        this.newline[k].x2 == this.newline[mline[_]].x1 && this.newline[k].y2 == this.newline[mline[_]].y1) {

                                        rmv = false;
                                        ///打印这里就知道如何优化了
                                        // console.log("cccccc", mline[_], _, mline.length);
                                        break;

                                    }

                                }
                            }
                        }
                    }

                    if(mline.length > 1) {
                        for(let k:number = 0; k < this.newline.length; k++) {
                            //肯定不是竖线
                            if(this.newline[k].x1 != this.newline[k].x2 && k != mline[0]) {
                                let minx = Math.min(this.newline[k].x1, this.newline[k].x2);
                                let maxx = Math.max(this.newline[k].x1, this.newline[k].x2);

                                let miny = Math.min(this.newline[mline[0]].y1, this.newline[mline[0]].y2);
                                    miny = Math.min(this.newline[mline[mline.length - 1]].y1, miny);
                                    miny = Math.min(this.newline[mline[mline.length - 1]].y2, miny);
                                let maxy = Math.max(this.newline[mline[0]].y1, this.newline[mline[0]].y2);
                                    maxy = Math.max(this.newline[mline[mline.length - 1]].y1, maxy);
                                    maxy = Math.max(this.newline[mline[mline.length - 1]].y2, maxy);

                                //穿过相交
                                if(this.newline[mline[0]].x1 > minx && this.newline[mline[0]].x1 < maxx) {
                                    if(this.newline[k].y1 > miny && this.newline[k].y1 < maxy) {
                                        rmv = true;
                                        break;
                                    }
                                }

                            }
                        }
                    }

                    //test
                    // rmv = true;
                    ///不收尾相交
                    if(rmv) {
                        for(let _:number = 0; _ < mline.length; _++) {
                            missline[missline.length] = mline[_];
                        }
                    }

                }
            }

            for(let i:number = 0; i < this.newline.length; i++) {
                let _:boolean = true;
                for(let j:number = 0; j < missline.length; j++) {
                    if(i == missline[j]) {
                        _ = false;
                        break;
                    }
                }
                if(_ == true) {
                    for(let j:number = 0; j < zeroline.length; j++) {
                        if(i == zeroline[j]) {
                            _ = false;
                            break;
                        }
                    }
                }
                //test
                // _ = true;
                if(_) {
                    let tIndex:number = this.line.length;
                    this.line[this.line.length] = this.newline[i];
                    if(this.newline[i].y1 == this.newline[i].y2) {
                        let y1 = this.newline[i].y1;
                        // let y2 = this.newline[i].y2;
                        if(Number(y1) > this.maxY) this.maxY = Number(y1);
                        // if(Number(y2) > this.maxY) this.maxY = Number(y2);
                        if(Number(y1) < this.minY) this.minY = Number(y1);
                        // if(Number(y2) < this.minY) this.minY = Number(y2);
                    }
                }
            }

            // let addLines:Array<any> = [];
            // ////假设同时与2条收尾相接的横线/斜线首尾相交
            // for(let i:number = 0; i < this.newline2.length; i++) {
            //     let num = 0;
            //     for(let j:number = 0; j < this.newline.length; j++) {

            //     }
            // }


            this.newline = this.line;
            // this.line = this.newline;

            // for(let i=0;i <this.newline.length; ++i) {
            //     this.new_txt("#" + this.newline[i]._3, (this.newline[i].x2 + this.newline[i].x1 ) / 2,  this.newline[i].y1 - 70, 0);
            // }
        }

        private linkladderRope(data:any) : void {
            this.ladderRope_map = data["ladderRope"];
            if(this.ladderRope_map) {
                let index:number = 1;
                while(true) {
                    let x = this.ladderRope_map["ladderRope." + index + ".x"];
                    if(x) {
                        this.doladderRope(x, index);
                        index = index + 1;
                    }
                    else break;
                }
            }
        }
        //#31 !0 @30 ---- !30 @31
        //#35 @34 ---- #0 !34 @35
        // linePos:Array<number> = [];
        // ropePos:Array<number> = [];
        rmvLines:Array<any> = [];
        unshowLst:Array<any> = [];
        // unlst:Array<any> = [];
        private dofoothold(footholdkey:string, z:any, z2:any, _3:any) : void {

            // if(msMoudle.findKeyFromArr(z + "." + z2, this.unlst)) return ;

            let x1 = this.foothold_map[footholdkey + ".x1"];
            let y1 = this.foothold_map[footholdkey + ".y1"];
            let x2 = this.foothold_map[footholdkey + ".x2"];
            let y2 = this.foothold_map[footholdkey + ".y2"];
            let forbidFallDown = this.foothold_map[footholdkey + ".forbidFallDown"];
            let prev = this.foothold_map[footholdkey + ".prev"];
            let next = this.foothold_map[footholdkey + ".next"];
            let fl = "foothold." + z + "." + z2;
            // <tr><td>foothold.3.16.48.prev</td><td>49</td></tr>
            // <tr><td>foothold.3.16.48.next</td><td>0</td></tr>
            // <tr><td>foothold.3.16.49.x1</td><td>-390</td></tr>
            // <tr><td>foothold.3.16.49.y1</td><td>-360</td></tr>
            // <tr><td>foothold.3.16.49.x2</td><td>-390</td></tr>
            // <tr><td>foothold.3.16.49.y2</td><td>-420</td></tr>
            // <tr><td>foothold.3.16.49.prev</td><td>54</td></tr>
            // <tr><td>foothold.3.16.49.next</td><td>48</td></tr>
            // <tr><td>foothold.3.16.50.x1</td><td>-390</td></tr>
            // <tr><td>foothold.3.16.50.y1</td><td>-240</td></tr>
            // <tr><td>foothold.3.16.50.x2</td><td>-390</td></tr>

            // if( (Number(prev) == 0 || Number(next) == 0)// || Number(z == 0)
            // && (Number(y1) != Number(y2)
            // && Number(x1) == Number(x2))){

            //     // let _ = this.unshowLst.length;
            //     // this.unshowLst[_] = new Object();
            //     // this.unshowLst[_].prev = Number(prev);
            //     // this.unshowLst[_].next = Number(next)
            //     // this.unshowLst[_].fl = fl;

            // }
            // else {
                // // if(Number(z) == 0 && Number(x1) == Number(x2)) {
                // if(Number(x1) == Number(x2)) {
                //     let tIndex:number = this.newline2.length;
                //     this.newline2[tIndex] = new Object();
                //     this.newline2[tIndex].x1 = Number(x1);
                //     this.newline2[tIndex].y1 =  Number(y1);
                //     this.newline2[tIndex].x2 =  Number(x2);
                //     this.newline2[tIndex].y2 =  Number(y2);
                //     this.newline2[tIndex].z =  Number(z);
                //     this.newline2[tIndex]._3 =  Number(_3);
                //     this.newline2[tIndex].prev =  Number(prev);
                //     this.newline2[tIndex].next =  Number(next);
                //     this.newline2[tIndex].fl = fl;
                //     // console.log("xx " + prev + "  " + next + "  " + footholdkey + "  " + _3);
                //     //记录最大的层级
                //     if(this.maxz < this.newline2[tIndex].z) this.maxz = this.newline2[tIndex].z;
                // }
                // else {
                if( (Number(z) > 0 && Number(x1) == Number(x2)) || Number(x1) != Number(x2) ) {
                    let tIndex:number = this.newline.length;
                    this.newline[tIndex] = new Object();
                    this.newline[tIndex].x1 = Number(x1);
                    this.newline[tIndex].y1 =  Number(y1);
                    this.newline[tIndex].x2 =  Number(x2);
                    this.newline[tIndex].y2 =  Number(y2);
                    //斜率提前处理
                    this.newline[tIndex].k = ( Number(y2) - Number(y1)) / (Number(x2) - Number(x1));
                    this.newline[tIndex].b = Number(y2) - this.newline[tIndex].k * Number(x2);

                    this.newline[tIndex].z =  Number(z);
                    this.newline[tIndex]._3 =  Number(_3);
                    this.newline[tIndex].prev =  Number(prev);
                    this.newline[tIndex].next =  Number(next);
                    this.newline[tIndex].fl = fl;
                    // console.log("xx " + prev + "  " + next + "  " + footholdkey + "  " + _3);
                    //记录最大的层级
                    if(this.maxz < this.newline[tIndex].z) this.maxz = this.newline[tIndex].z;
                    // }
                    if(Number(x1) > this.maxX) this.maxX = Number(x1);
                    if(Number(x2) > this.maxX) this.maxX = Number(x2);
                    if(Number(x1) < this.minX) this.minX = Number(x1);
                    if(Number(x2) < this.minX) this.minX = Number(x2);


                }
        }

        private doladderRope(x:any, index:number) : void {
            let y1 = this.ladderRope_map["ladderRope." + index + ".y1"];
            let y2 = this.ladderRope_map["ladderRope." + index + ".y2"];
            let tIndex:number = this.ladder.length;
            this.ladder[tIndex] = new Object();
            this.ladder[tIndex].x1 = Number(x);
            this.ladder[tIndex].x2 = Number(x);
            this.ladder[tIndex].y1 = Number(y1);
            this.ladder[tIndex].y2 = Number(y2);

            // let spIndex:number = this.spx.length;
            // this.spx[spIndex] = new Laya.Sprite();
            // this.m_sp.addChild(this.spx[spIndex]);
            // this.spx[spIndex].graphics.drawLine(Number(x), Number(y1), Number(x),  Number(y2), "#ff0000", 3);
        }

        public new_txt(str:string, x:number, y:number, index:number) : any {
            let txt:Laya.Label = new Laya.Label();
            txt.text = str;
            txt.fontSize = 14;
            txt.pos(x, y);
            txt.color = "#07ec47";
            txt.stroke = 3;
            txt.zOrder = 99999999;
            // txt.on("click", this, this.onClick, [index]);
            this.m_sp.addChild(txt);
        }

        //
    }

}