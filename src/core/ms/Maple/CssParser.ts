module CssParser {
    export class Txt {
        //存储所有的hash
        private wzMap: any;

        spname = "";
        public loadHtml(txt: string, path:string, type:string, wzname:string): any {
            this.wzMap = new Object();
            this.spname = wzname;
            if(txt) {
                //<tr><td>key</td><td>value</td></tr>
                let key_start : number = 0;
                let key_end : number = 0;
                let value_start : number = 0;
                let value_end : number = 0;

                /*
                    目前最大的内存问题是
                    1.body动作数据太大，8M多
                    2.各个name和desc的数量极大
                */

                //1.txt出问题了
                //2.这一行txt.split("</td></tr>");找不到</td></tr>
                //3.确实没split方法
                // let num = 0;
                let content:any = txt.split("</td></tr>");



                for(let i:number = 0; i < content.length; i++) {



                    let conti:boolean = false;
                    if(wzname == "npc") {//已优化
                        if(content[i].indexOf(".name") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    else if(wzname == "mob") {//已优化
                        if(content[i].indexOf(".name") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    else if(wzname == "eqp") {//已优化
                        if(content[i].indexOf(".name") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    else if(wzname == "pet") {//已优化
                        if(content[i].indexOf(".name") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    else if(wzname == "mbook") {//已优化
                        if(content[i].indexOf(".reward") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    else if(wzname == "mapName") {//已优化
                        if(content[i].indexOf(".mapName") >= 0) {
                            conti = true;
                            // num++;
                        }
                    }
                    // else if(wzname == "etc") {//已优化
                    //     conti = true;
                    //     num++;
                    // }
                    // else if(wzname == "skill") {//已优化
                    //     conti = true;
                    //     num++;
                    // }
                    // else if(wzname == "consume") {//已优化
                    //     conti = true;
                    //     num++;
                    // }
                    else {// && content[i].indexOf(".iconRaw") < 0
                        if(content[i].indexOf("._hash") < 0) {
                            conti = true;
                            // num++;
                        }
                        //.iconRaw
                    }

                    //"<tr><td>0100100.Die</td><td>00:00.464   24kbps 22.05khz"
                    //,"<tr><td>0100100.Damage</td><td>00:00.312   24kbps 22.05khz",

                    if(conti) {
                        key_start = 0;
                        for(let _:number = 7; _ < content[i].length; _++) {
                            //这里的判断只取3个会怎样???????
                            //key的起始位置
                            if(content[i][_] == ">" && content[i][_ - 1] == "d" && content[i][_ - 2] == "t" &&
                                content[i][_ - 3] == "<" && content[i][_ - 4] == ">" && content[i][_ - 5] == "r" &&
                                content[i][_ - 6] == "t" && content[i][_ - 7] == "<")
                                key_start = _ + 1;
                            //key的结束位置和value的起始位置
                            if(content[i][_] == "<" && content[i][_ + 1] == "/" && content[i][_ + 2] == "t" &&
                                content[i][_ + 3] == "d" && content[i][_ + 4] == ">" && content[i][_ + 5] == "<" &&
                                content[i][_ + 6] == "t" && content[i][_ + 7] == "d" && content[i][_ + 8] == ">") {
                                if(key_start != 0) {
                                    key_end = _;
                                    value_start = _ + 8;
                                    value_end = content[i].length;  //可以优化

                                    let key = "";
                                    let value = "";
                                    //拼接key
                                    for(let j:number = key_start; j < key_end; j++) {
                                        key = key + content[i][j];
                                    }
                                    //拼接value
                                    for(let j:number = value_start + 1; j < value_end; j++) {
                                        value = value + content[i][j];
                                    }

                                    if(wzname == "smob" || wzname == "sskill") {
                                        if(value.indexOf("kbps") >= 0) value = "M";
                                    }

                                    // let valueMap:any = new Object();
                                    // valueMap[key] = value;
                                    let str:any = key.split(".");
                                    // if(txt.indexOf("life")>= 0)
                                    // console.log(key)

                                    ////处理
                                    let firstr:string = "";
                                    if(type == "ms" || str[0] == "info") firstr = str[0];
                                    else if(type == "ms2") firstr = str[0] + "." + str[1];

                                    if(wzname == "face") {
                                        if(this.shortMsg(key, wzname)) {
                                            this.doMap(firstr, key, value);
                                        }
                                    }
                                    else {
                                        // if(this.shortMsg(value, wzname)) {
                                            if(this.shortMsg(key, wzname)) {
                                                this.doMap(firstr, key, value);
                                            }
                                        // }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }


                // if(wzname == "npc") {//已优化
                //     console.log("npc", num);
                // }
                // else if(wzname == "mob") {//已优化
                //     console.log("mob", num);
                // }
                // else if(wzname == "eqp") {//已优化
                //     console.log("eqp", num);
                // }
                // else if(wzname == "pet") {//已优化
                //     console.log("pet", num);
                // }
                // else if(wzname == "mbook") {//已优化
                //     console.log("mbook", num);
                // }
                // else if(wzname == "mapName") {//已优化
                //     console.log("mapName", num);
                // }
                // // else if(wzname == "etc") {//已优化
                // //     console.log("etc", num);
                // // }
                // // else if(wzname == "skill") {//已优化
                // //     console.log("skill", num);
                // // }
                // // else if(wzname == "consume") {//已优化
                // //     console.log("consume", num);
                // // }
                // else {
                //     if(num > 1000) console.log("其他", num, path);
                // }
            }
            return this.wzMap;
        }

        shortMsg(value:string, wzname:string) : boolean {
            //筛选
            if(
            (value.indexOf(".iconRaw") >= 0 && this.spname != "0900.img") ||
            value.indexOf(".iconMouseOver") >= 0 ||
            value.indexOf(".iconDisabled") >= 0 ||
            value.indexOf(".CharLevel") >= 0 ||
            value.indexOf(".iconReward") >= 0 ||
            value.indexOf(".comment") >= 0 ||
            value.indexOf(".msg") >= 0 ||
            value.indexOf(".req.") >= 0
            ) {
                return false;
            }

            if(wzname == "npc") {
                // if(value.indexOf(".d0") >= 0 ||
                //     value.indexOf(".d1") >= 0 ||
                //     value.indexOf(".d2") >= 0 ||
                //     value.indexOf(".s0") >= 0 ||
                //     value.indexOf(".s1") >= 0 ||
                //     value.indexOf(".s2") >= 0 ||
                //     value.indexOf(".h0") >= 0 ||
                //     value.indexOf(".h1") >= 0 ||
                //     value.indexOf(".h2") >= 0 ||
                //     value.indexOf(".f0") >= 0 ||
                //     value.indexOf(".f1") >= 0 ||
                //     value.indexOf(".f2") >= 0 ||
                //     value.indexOf(".w0") >= 0 ||
                //     value.indexOf(".w1") >= 0 ||
                //     value.indexOf(".w2") >= 0 ||
                //     value.indexOf(".n0") >= 0 ||
                //     value.indexOf(".n1") >= 0 ||
                //     value.indexOf(".n2") >= 0 ||
                //     value.indexOf(".l0") >= 0 ||
                //     value.indexOf(".l1") >= 0 ||
                //     value.indexOf(".l2") >= 0
                //     ) {
                //     return false;
                // }
                // let isSelNpc:boolean = false;
                // for(let i:number = 0; i < msMoudle.AllNpc.length; i++) {
                //     if(value.indexOf(msMoudle.AllNpc[i]) >= 0) {
                //         isSelNpc = true;
                //         break;
                //     }
                // }
                // if(isSelNpc == false) return false;
            }
            // else if(wzname == "skill") {
            //     let ____have = false;
            //     for(let s_1:number = 1; s_1 <= 40; s_1++) {
            //         if(value.indexOf(".h" + s_1) >= 0) {
            //             return false;
            //         }
            //     }
            // }
            else if(wzname == "face") {
                if(value.indexOf("smile") >= 0 ||
                    value.indexOf("troubled") >= 0 ||
                    value.indexOf("cry") >= 0 ||
                    value.indexOf("angry") >= 0 ||
                    value.indexOf("bewildered") >= 0 ||
                    value.indexOf("stunned") >= 0 ||
                    value.indexOf("default") >= 0)
                {
                    // console.log(value)
                    return true;
                }
                return false;
            }
            if(wzname == "mob") {
                let isSelMob:boolean = false;
                for(let i:number = 0; i < msMoudle.mobList.length; i++) {
                    if(value.indexOf(msMoudle.mobList[i]) >= 0) {
                        isSelMob = true;
                        break;
                    }
                }
                if(isSelMob == false) return false;
            }
            return true;
        }

        doMap(firstr:string, key:any, value:any) : void {
            if(value.indexOf("_hash") >= 0 || key.indexOf("_hash") >= 0) return ;
            // if(key.indexOf(".desc") >= 0) return ;
            // if(value.indexOf("비스트테이머") >= 0) return ;
            if(key.indexOf("Eqp.") >= 0) {
                if(key.indexOf(".h1") >= 0) return ;
            }

            if(!this.wzMap[firstr]) this.wzMap[firstr] = new Object();
            this.wzMap[firstr][key] = value;

        }

        //获取zMapInfo坐标
        public getZMapInfo(txt: string): any {
            let _valueMap:any = {};
            //<tr><td>key</td><td>value</td></tr>
            let content:any = txt.split("</td><td></td></tr>");
            for(let i:number = 0; i < content.length; i++) {
                let key = content[i].replace('<tr><td>', '');
                // for(let _:number = 10; _ < content[i].length; _++) key = key + content[i][_];
                _valueMap[key] = content.length - i;
                // console.log("xxx    " + key + "  " + i, content[i]);
            }
            return _valueMap;
        }

    }
}
