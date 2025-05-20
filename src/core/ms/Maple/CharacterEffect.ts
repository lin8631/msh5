/// <reference path="./../../../core/ms/Maple/CssParser.ts" />

module maple {
    import cssParser = CssParser.Txt;
    import Handler      = Laya.Handler;

    export class CharacterEffect extends Laya.Sprite {
        private m_data : any;
        private _aniNum:number  = 0;

        private _spAnis:Array<any> = [];
        private ringData:Array<any> = [];
        private ringAni:Array<any> = [];

        public _ringId : string = "";
        private _id : string = "";
        private _filePath : string = "";
        private _parentView : Laya.View;
        private _genPoints : Array<any> = [];
        private _showCnt : number = 0;
        private _dx : number = 1;
        private _dy : number = 1;
        private _delay : number = 1;
        private _interval : number = 1;
        private _emission : number = 0;
        // private m_hero:any;

        public _isValid : boolean = false;
        private _lastTime = 0;
        private _loadResArr:Array<any>  = [];

        public setCharacterEffect(hero : any, ringId:string = "N") : void {
            this.ringData = [];
            this._spAnis = [];
            this.ringAni = [];
            // this.m_hero = hero;

            if(ringId != "N") {
                this._ringId = ringId;
                let ringMap = msMoudle.wz[this._ringId + ".img"]["info"];
                let effectPath : string = ringMap["info.effect.path"];
                if(effectPath != null) {
                    // console.log("##showRingEffect 2");
                    this._dx = ringMap["info.effect.dx"] ? Number(ringMap["info.effect.dx"]) : 0;
                    this._dy = ringMap["info.effect.dy"] ? Number(ringMap["info.effect.dy"]) : 0;

                    if(ringMap["info.effect.genPoint.0"] != null) {
                        let i = 0;
                        while(true) {
                            let genStr = ringMap["info.effect.genPoint." + i];
                            if(genStr) {

                                // this.ringData[i] = new Array();
                                this._spAnis[i] = new Laya.Sprite();
                                // this.addChild(this._spAnis[i]);
                                this.ringAni[i] = new Laya.Image();
                                this._spAnis[i].addChild(this.ringAni[i]);

                                this._genPoints.push(msMoudle.Vec2FromArr(genStr));
                                i++;
                            }
                            else break;
                        }
                    }
                    else {
                        //create points
                        this._emission = Number(ringMap["info.effect.emission"]);
                        let theta : number = Number(ringMap["info.effect.theta"]);
                        this._showCnt = 360 / theta + 1;
                        // console.log("##showRingEffect 3, this._showCnt is " + this._showCnt);
                        for (let i = 0; i < this._showCnt; ++i) {
                            let radius : number = Math.PI / 2 + (2 * i * Math.PI) / this._showCnt;
                            let genPoint : any = {};
                            genPoint.x = this._dx * Math.cos(radius);
                            genPoint.y = this._dy * Math.sin(radius);


                            this._spAnis[i] = new Laya.Sprite();
                            // this.addChild(this._spAnis[i]);
                            this.ringAni[i] = new Laya.Image();
                            this._spAnis[i].addChild(this.ringAni[i]);

                            this._genPoints.push(genPoint);
                        }
                    }

                    let effectId = "";
                    let pos = effectPath.lastIndexOf("/");
                    // console.log(effectPath)
                    if(pos > -1) {
                        effectId = effectPath.substr(pos + 1);
                        this._id = effectId;
                        this._showCnt = this._genPoints.length;
                        this._delay = Number(ringMap["info.effect.delay"]);
                        this._interval = Number(ringMap["info.effect.interval"]);
                        let _z = Number(ringMap["info.effect.z"]);

                        this._parentView = _z ? hero.m_sp : hero.m_nametag_sp;
                        // console.log("###eff id is " + effectId + ", genPoints size is " + this._genPoints.length)
                        // console.table(this._genPoints)
                        this.showEffect();
                    }
                    // else {
                    //     console.log("其他效果");
                    // }
                }
            }
        }

        private showEffect() : void {

            this.loadEffect();

            if(this._loadResArr.length > 0) {
                msLoad.load(this._loadResArr).done(dlg => {
                    this.onRing();
                });
            }
            else {
                this.onRing();
            }
        }

        private loadEffect() : void {
            this._filePath   = "res/CharacterEff.img/";
            let data = msMoudle.wz["CharacterEff.img"][this._id];
            this.m_data = data;
            ///////
            let i = 0;
            this._loadResArr = [];
            this._aniNum = 0;
            while(true) {
                let root:string = this._id + "." + i + ".0";
                if(data[root]) {
                    this.ringData[i] = new Array();
                    let frameindex:number = 0;
                    while(true) {
                        let root:string = this._id + "." + i + "." + frameindex;
                        if(data[root]) {
                            this.linkEffect(data, i, root, frameindex);
                            frameindex = frameindex + 1;
                        }
                        else {
                            // this.fameNums[i] = frameindex;
                            break;
                        }
                    }
                    i++;
                }
                else {
                    this._aniNum = i;
                    break;
                }
            }
        }

        private linkEffect(data:any, i:number, root:string, frameindex:number) : void {
            let tex = this._filePath + root + ".png";
            let strMarker = this._id + "." + i + "." + frameindex;
            let oringinInfo : any = msMoudle.Vec2FromArr(this.m_data[strMarker + ".origin"]);
            let delay = this.m_data[strMarker + ".delay"];
            let a0 = this.m_data[strMarker + ".a0"];
            let a1 = this.m_data[strMarker + ".a1"];
            let z = this.m_data[strMarker + ".z"];

            this.ringData[i][frameindex] = new Object();
            this.ringData[i][frameindex].orgx = Number(oringinInfo.x);
            this.ringData[i][frameindex].orgy = Number(oringinInfo.y);
            this.ringData[i][frameindex].tex = tex;
            this.ringData[i][frameindex].delay = Number(delay);
            this.ringData[i][frameindex].a0 = a0 ? Number(a0) : 1;
            this.ringData[i][frameindex].a1 = a1 ? Number(a1) : 1;
            this.ringData[i][frameindex].z = z ? Number(z) : 0;

            if(!Laya.loader.getRes(tex)) {
                this._loadResArr.push({ url: tex });
            }
        }

        private onRing() : void {

            for(let i:number = 0; i < this._genPoints.length; i++) {
                this._spAnis[i].pos(this._genPoints[i].x, this._genPoints[i].y);
                // if(this._id == "1112905") console.log(this._genPoints[i].x + "   " + this._genPoints[i].y)
                this.doAction(i, 0)
                if(this._parentView) this._parentView.addChild(this._spAnis[i]);
                this._spAnis[i].alpha = 0;
            }

            this._lastTime = new Date().getTime();
            this._isValid = true;
            // Laya.timer.frameLoop(1, this, this.update);
            Laya.timer.loop(100, this, this.update);
        }

        public update() {
            let dt = new Date().getTime() - this._lastTime;
            let firstLoop = true;
            if(dt > this._interval * this._showCnt) {
                firstLoop = false;
                dt %= this._interval * this._showCnt;
            }
            let firstIndex = Math.floor(dt / this._interval);
            if(firstIndex < 0) firstIndex = 0;
            else if(firstIndex > this._showCnt - 1) firstIndex = this._showCnt - 1;
            let tick = dt % this._interval;
            for(let i=0; i<this._spAnis.length; ++i) {
                if(this._spAnis[i]) {
                    this._spAnis[i].alpha = 0;
                }
                else return ;
            }
            for(let i=0; i<Math.ceil(this._delay / this._interval); ++i) {
                let index = firstIndex - i;
                if(firstLoop && index < 0) {}
                else {
                    if(index < 0) index += this._showCnt;
                    if(this._spAnis[index] != null) {
                        let alpha = (this._delay - (tick + i * this._interval)) / this._delay;
                        this._spAnis[index].alpha = alpha < 0 ? 0 : alpha;
                        if (this._emission == 1 && alpha > 0) {//
                            let rate = (tick + i * this._interval) / (this._interval * this._showCnt);
                            if(rate >= 0) {
                                this._spAnis[index].x = (1 + rate) * this._genPoints[index].x;
                                this._spAnis[index].y = (1 + rate) * this._genPoints[index].y;
                            }
                        }
                    }
                }
            }
        }

        m_hero_x = 0;
        m_hero_y = 0;
        private doAction(i : number, frameindex:number) : void {
            if(this.ringData) {
                let t = i %this._aniNum;
                // if(this._id == "1112905") console.log(t)
                if(this.ringData[t]) {
                    if(frameindex >= this.ringData[t].length) {
                        frameindex = 0;
                    }
                    if(this.ringData[t][frameindex]) {
                        this.ringAni[i].skin = this.ringData[t][frameindex].tex;
                        this.ringAni[i].pos(-this.ringData[t][frameindex].orgx+this.m_hero_x,
                        -this.ringData[t][frameindex].orgy - 50 + this.m_hero_y);
                    }
                    if(this.ringData[t].length > 1) {
                        // console.log(i +  "   " + this.ringData[t][frameindex].delay);
                        Laya.timer.once(this.ringData[t][frameindex].delay, this, this.doAction, [i, frameindex + 1]);
                    }
                }
            }
        }

        public clearUp() {
            this.m_data = [];
            this._isValid = false;
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.update);
            for(let i = 0; i < this.ringAni.length; ++i) {
                if(this.ringAni[i]) {
                    this.ringAni[i].removeSelf();
                    this.ringAni[i].destroy(true);
                    this.ringAni[i] = null;
                }
            }
            for(let i = 0; i < this._spAnis.length; ++i) {
                if(this._spAnis[i]) {
                    this._spAnis[i].removeSelf();
                    this._spAnis[i].destroy(true);
                    this._spAnis[i] = null;
                }
            }
            this.ringData = [];
            for(let i=0; i<this._loadResArr.length; ++i) {
                Laya.loader.clearRes(this._loadResArr[i].url);
            }
            this._loadResArr = [];
            this._genPoints = [];
            // this.removeSelf();
        }

    }
}