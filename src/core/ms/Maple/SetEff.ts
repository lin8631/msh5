/// <reference path="./../../../core/ms/Maple/CssParser.ts" />

module maple {
    import cssParser = CssParser.Txt;
    import Handler      = Laya.Handler;

    export class SetEffect extends Laya.Sprite {

        // public seteff_map:any;
        private m_sp:Laya.Sprite;
        public effAni:Laya.Image;
        public effData:Array<any> = [];
        public effAni2:Laya.Image;
        public effData2:Array<any> = [];

        public clearUp() : void {
            Laya.timer.clear(this, this.doAction);
            Laya.timer.clear(this, this.doAction2);
            if(this.effAni) {
                this.effAni.removeSelf();
                this.effAni.destroy();
                this.effAni = null;
            }
            if(this.effAni2) {
                this.effAni2.removeSelf();
                this.effAni2.destroy();
                this.effAni2 = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy();
                this.m_sp = null;
            }
            this.effData  = [];
            this.effData2  = [];
            // this.seteff_map = null;
        }

        public setEffect(hero:any, m_nametag_sp:any) : void {
            if(hero && m_nametag_sp) {
                let id = hero.partIndex[msMoudle.partType.tCap];

                this.m_sp = new Laya.Sprite();
                m_nametag_sp.addChild(this.m_sp);

                this.effAni = new Laya.Image();
                this.m_sp.addChild(this.effAni);

                if(id != "N") {
                    id = msMoudle.rmvImg(id);
                    let data = msMoudle.wz["SetEff.img"];
                    // console.log(data, id)

                    if(id == 1002140 || id == 1005140) {
                        let key = 37;
                        if(id == 1002140) key = 21;

                        // console.log(id, key, m_nametag_sp.visible, data);

                        if(data[key][key + ".info.1.0"] == Number(id).toString()) {
                            // this.seteff_map = data[key];

                            this.effData = [];
                            this.dealEff(key, data[key]);
                        }
                    }
                    // else if(id == 1102349) {
                    //     let key = 129;
                    //     // if(data[key][key + ".info.1.0"] == Number(id).toString()) {
                    //         this.seteff_map = data[key];

                    //         this.m_sp = new Laya.Sprite();
                    //         hero.m_state_sp.addChild(this.m_sp);

                    //         this.effAni = new Laya.Image();
                    //         this.m_sp.addChild(this.effAni);

                    //         this.effData = [];
                    //         this.dealEff(key);
                    //     // }
                    // }
                    else {
                        for(let key in data) {
                            if(data[key][key + ".info.1.0"] == Number(id).toString()) {
                                // this.seteff_map = data[key];

                                this.m_sp = new Laya.Sprite();
                                m_nametag_sp.addChild(this.m_sp);

                                this.effAni = new Laya.Image();
                                this.m_sp.addChild(this.effAni);

                                this.effData = [];
                                this.dealEff(key, data[key]);
                                break;
                            }
                        }
                    }
                }

                //资源不需要重复加载
                if(this.effData.length > 0) {
                    let res:Array<any> = [];
                    for(let i:number = 0; i < this.effData.length; i++) {
                        if(!Laya.loader.getRes(this.effData[i].tex)) {
                            res.push({ url: this.effData[i].tex });
                        }
                    }
                    // msMoudle.toast("xxx" + res.length)
                    if(res.length > 0) {
                        msLoad.load(res).done(dlg => {
                            this.doAction(0);
                        });
                    }
                    else {
                        this.doAction(0);
                    }
                }

                if(hero.teamIndex == 100) {
                    if(ms.selHero != 12) {
                        if(msMoudle.mapP && msMoudle.idOldMap(msMoudle.mapP.m_id)) {
                            if(ms.tamingmobbagsdata.length >= 8) {
                                this.effAni2 = new Laya.Image();
                                this.m_sp.addChild(this.effAni2);
                                this.setOtherEffect(hero, m_nametag_sp);
                            }
                        }
                    }
                }
            }
        }

        public setOtherEffect(hero:any, m_nametag_sp:any) : void {
        //     if(hero && m_nametag_sp) {
                let data = msMoudle.wz["SetEff.img"];

                let key = 146;
                // this.seteff_map = data[key];

                this.effData2 = [];
                this.dealEff2(key, data[key]);

        //         //资源不需要重复加载
                if(this.effData2.length > 0) {
                    let res:Array<any> = [];
                    for(let i:number = 0; i < this.effData2.length; i++) {
                        if(!Laya.loader.getRes(this.effData2[i].tex)) {
                            res.push({ url: this.effData2[i].tex });
                        }
                    }
                    // msMoudle.toast("xxx" + res.length)
                    if(res.length > 0) {
                        msLoad.load(res).done(dlg => {
                            this.doAction2(0);
                        });
                    }
                    else {
                        this.doAction2(0);
                    }
                }

        //     }
        }

        private dealEff(key:any, seteff_map:any) : void {
            let j:number = 0;
            while(true) {
                let root = key + ".effect." + j;
                if(seteff_map[root]) {
                    this.linkEff(j, root, key, seteff_map);
                    j = j + 1;
                }
                else break;
            }
            // console.log(this.effData)
        }

        private dealEff2(key:any, seteff_map:any) : void {
            let j:number = 0;
            while(true) {
                let root = key + ".effect." + j;
                if(seteff_map[root]) {
                    this.linkEff2(j, root, key, seteff_map);
                    j = j + 1;
                }
                else break;
            }
            // console.log(this.effData)
        }

        linkEff(j : number, root:string, key:any, seteff_map:any) : void {
            // <tr><td>37.effect.0</td><td><img src="37.effect.0.png" /></td></tr>
            // <tr><td>37.effect.0.origin</td><td>46,122</td></tr>
            // <tr><td>37.effect.0.delay</td><td>100</td></tr>
            let strMarker:string = "res/SetEff.img/" + key + ".effect." + j + ".png";
            let oringinInfo:any = msMoudle.Vec2FromArr(seteff_map[root + ".origin"]);
            let delay = seteff_map[root + ".delay"];
            this.effData[j] = new Object();
            this.effData[j].tex = strMarker;
            this.effData[j].orgx = -Number(oringinInfo.x);
            this.effData[j].orgy = -Number(oringinInfo.y);
            this.effData[j].delay = delay ? Number(delay) : 90;
            this.effData[j].pos = 0;
            if(seteff_map[key + ".effect.pos"])
                this.effData[j].pos = Number(seteff_map[key + ".effect.pos"]);
        }

        linkEff2(j : number, root:string, key:any, seteff_map:any) : void {
            // <tr><td>37.effect.0</td><td><img src="37.effect.0.png" /></td></tr>
            // <tr><td>37.effect.0.origin</td><td>46,122</td></tr>
            // <tr><td>37.effect.0.delay</td><td>100</td></tr>
            let strMarker:string = "res/SetEff.img/" + key + ".effect." + j + ".png";
            let oringinInfo:any = msMoudle.Vec2FromArr(seteff_map[root + ".origin"]);
            let delay = seteff_map[root + ".delay"];
            this.effData2[j] = new Object();
            this.effData2[j].tex = strMarker;
            this.effData2[j].orgx = -Number(oringinInfo.x);
            this.effData2[j].orgy = -Number(oringinInfo.y);
            this.effData2[j].delay = delay ? Number(delay) : 90;
            this.effData2[j].pos = 0;
            if(seteff_map[key + ".effect.pos"])
                this.effData2[j].pos = Number(seteff_map[key + ".effect.pos"]);
        }

        m_hero_x = 0;
        m_hero_y = 0;
        doAction(frameIndex:number) : void {
            if(this.effData.length > 0) {
                if(frameIndex >= this.effData.length) frameIndex = 0;

                let tex = this.effData[frameIndex].tex;
                this.effAni.skin = tex;
                // console.log("xxx", this.effData[frameIndex].pos)
                this.effAni.pos(this.effData[frameIndex].orgx + this.m_hero_x,
                this.effData[frameIndex].orgy + this.m_hero_y - this.effData[frameIndex].pos * 30);

                if(this.effData.length > 1) Laya.timer.once(this.effData[frameIndex].delay, this, this.doAction, [frameIndex + 1]);
            }
        }

        doAction2(frameIndex:number) : void {
            if(this.effData2.length > 0) {
                if(frameIndex >= this.effData2.length) frameIndex = 0;

                let tex = this.effData2[frameIndex].tex;
                this.effAni2.skin = tex;
                this.effAni2.pos(this.effData2[frameIndex].orgx + this.m_hero_x,
                this.effData2[frameIndex].orgy + this.m_hero_y - this.effData2[frameIndex].pos * 30);

                if(this.effData2.length > 1) Laya.timer.once(this.effData2[frameIndex].delay, this, this.doAction2, [frameIndex + 1]);
            }
        }

        //
    }
}