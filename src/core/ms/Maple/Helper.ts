module HelperRole {

    export class Helper extends Laya.Sprite {
        public m_parent:any;
        private m_sp:Laya.Sprite;
        private helper_map:Array<any> = [];
        private mapid:string;

        public helper:Array<any> = [];
        private portalAni:Array<any> = [];

        public clearUp() : void {
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.portalAni.length; i++) {
                if(this.portalAni[i]) {
                    this.portalAni[i].removeSelf();
                    this.portalAni[i].destroy(true);
                    this.portalAni[i] = null;
                }
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
            this.helper_map = [];
            this.helper = [];
        }

        public loadHelper(m_map:any, P:any, mapid:string) : void {
            this.m_parent = P;
            this.mapid = mapid;

            this.m_sp = new Laya.Image();
            this.m_sp.zOrder = 99999;
            this.m_parent.addChild(this.m_sp);

            this.linkhelper(m_map);
        }

        private linkhelper(data:any) : void {
            this.helper_map = data["portal"];
            // console.log(this.helper_map);
            let i:number = 0;
            while(true) {
                let pn:any = this.helper_map["portal." + i + ".pn"];      //入口标记
                if(pn) {
                    this.doHelper(i, pn);
                    i = i + 1;
                }
                else break;
            }

        }

        private doHelper(i:number, pn:any) : void {

            let pt:any = this.helper_map["portal." + i + ".pt"];      //类型
            if(pt != null) {
                let x:any = this.helper_map["portal." + i + ".x"];
                let y:any = this.helper_map["portal." + i + ".y"];
                let tm:any = this.helper_map["portal." + i + ".tm"];      //去到的地图ID
                let tn:any = this.helper_map["portal." + i + ".tn"];      //地图id里面对应的入口名
                let script:any = this.helper_map["portal." + i + ".script"];


            //999999999一般是空中的出生点
            // tm != "999999999" &&
            // if(tm != "999999999" && tn != "") {
                // if(tm == msMoudle.rmvImg(this.mapid)) {
                    //地图内的跳转
                // }
                // else {
                    let tIndex:number = this.helper.length;
                    this.helper[tIndex] = new Object();
                    this.helper[tIndex].pn = pn;
                    this.helper[tIndex].pt = pt;
                    this.helper[tIndex].x = Number(x);
                    this.helper[tIndex].y = Number(y);
                    this.helper[tIndex].tm = tm;
                    this.helper[tIndex].tn = tn;
                    this.helper[tIndex].script = script ? script : null;

                    this.portalAni[tIndex] = new Laya.Image();
                    this.portalAni[tIndex].skin = "res/Map/MapHelper.img/portal.game.pv.0.png";

                    // let label = new Laya.Label();
                    // this.portalAni[tIndex].addChild(label);
                    // label.text = "pt=" + pt + ", i=" + i + ", script=" + (script ? script : "");

                    if((pt != 3 && pt != 1 && tm != "999999999" && tn != "") /*|| script*/)
                    this.m_sp.addChild(this.portalAni[tIndex]);
                    this.portalAni[tIndex].pos(this.helper[tIndex].x - 43, this.helper[tIndex].y - 173);

                    // this.new_txt("#pn " + pn + " pt " + pt + "\ntm " + tm + " tn " + tn, this.helper[tIndex].x,  this.helper[tIndex].y - 100, 0);
                // }
            // }
            }
        }

        new_txt(str:string, x:number, y:number, index:number) : any {
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

        public getHelper(role:any) : any {

            for(let i:number = 0; i < this.helper.length; i++) {
                let help:any = this.helper[i];
                if(help.script && help.script == "market00") {
                    if(role.m_x >= help.x - 50 && role.m_x <= help.x + 50 &&
                    role.m_y >= help.y - 50 && role.m_y <= help.y + 50) {
                        return help;
                    }
                }
                if(help.tm == "999999999" && help.tn == "") {}  ///这里是最新加的
                else {
                    if(role.m_x >= help.x - 50 && role.m_x <= help.x + 50 &&
                    role.m_y >= help.y - 50 && role.m_y <= help.y + 50) {
                        return help;
                        //pn        //本地图入口名
                        //pt        //类型
                        //tm        //去的地图id
                        //tn        //去的地图对应的入口名
                    }
                }
            }
            return null;
        }

    }

}