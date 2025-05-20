module MiniMapRole {

    export class MiniMap extends Laya.Sprite {
        private m_parent:any;
        private m_sp:Laya.Sprite;

        private m_x:number = 0;
        private m_y:number = 0;

        private sp_e:Laya.Image;//right
        private sp_w:Laya.Image;//left
        private sp_n:Laya.Image;//up
        private sp_s:Laya.Image;//down
        private sp_c:Laya.Image;//tianchong
        private sp_img:Laya.Image;
        private sp_panel:Laya.Panel;
        private m_id:string = "";
        //自己的标点

        //其他人的标点

        public clearUp() : void {
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);

            if(this.self_sp) {
                this.self_sp.removeSelf();
                this.self_sp.destroy(true);
                this.self_sp = null;
            }

            if(this.party_sp) {
                this.party_sp.removeSelf();
                this.party_sp.destroy(true);
                this.party_sp = null;
            }

            if(this.another_sp) {
                this.another_sp.removeSelf();
                this.another_sp.destroy(true);
                this.another_sp = null;
            }

            if(this.sp_img) {
                this.sp_img.removeSelf();
                this.sp_img.destroy(true);
                this.sp_img = null;
            }
            if(this.sp_panel) {
                this.sp_panel.removeSelf();
                this.sp_panel.destroy(true);
                this.sp_panel = null;
            }
            if(this.sp_e) {
                this.sp_e.removeSelf();
                this.sp_e.destroy(true);
                this.sp_e = null;
            }
            if(this.sp_w) {
                this.sp_w.removeSelf();
                this.sp_w.destroy(true);
                this.sp_w = null;
            }
            if(this.sp_s) {
                this.sp_s.removeSelf();
                this.sp_s.destroy(true);
                this.sp_s = null;
            }
            if(this.sp_n) {
                this.sp_n.removeSelf();
                this.sp_n.destroy(true);
                this.sp_n = null;
            }
            if(this.sp_c) {
                this.sp_c.removeSelf();
                this.sp_c.destroy(true);
                this.sp_c = null;
            }
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
        }

        m_loadRes:Array<any> = [];
        m_end:boolean = false;
        public loadMiniMap(mId:string, P:any) : void {
            this.m_parent = P;
            this.m_id = mId;

            this.m_sp = new Laya.Sprite();
            this.m_sp.x = -5;
            this.m_sp.y = -30;
            this.m_sp.zOrder = 19999999999;
            this.m_parent.addChild(this.m_sp);

            this.sp_e = new Laya.Image();
            this.m_sp.addChild(this.sp_e);
            this.sp_w = new Laya.Image();
            this.m_sp.addChild(this.sp_w);
            this.sp_s = new Laya.Image();
            this.m_sp.addChild(this.sp_s);
            this.sp_n = new Laya.Image();
            this.m_sp.addChild(this.sp_n);

            let res:Array<any> = [];
            res.push('res/Map/Map/' + this.m_id + '/miniMap.canvas.png');
            res.push('res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.party.png');
            res.push('res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.another.png');

            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);

                    msMoudle.resTip(res, true);

                    this.onShow();
                });
            }
            else {
                this.onShow();
            }


            //
        }

        onShow() : void {
            this.tex = Laya.loader.getRes('res/Map/Map/' + this.m_id + '/miniMap.canvas.png')
            let w = 10;//tex.width;
            let h = 10;
            if(this.tex) {
                if(this.tex.width > 128) {
                    w = this.tex.width - 118;
                    if(w > 60) w = 60;
                }
                if(this.tex.height > 54) {
                    h = this.tex.height - 44;
                    if(h > 50) h = 50;
                }
            }
            // msMoudle.toast(w + "  " + h)

             ///这里对比之后要和地图的一致
            this.show_w = 128 + w - 18;
            this.show_h = h + 9;

            let nw = new Laya.Image();
            nw.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.nw.png';
            this.m_sp.addChild(nw);
            //MiniMap.MinMapMirror.nw.png

            this.sp_n.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.n.png';
            this.sp_n.x = 64;
            this.sp_n.width = w;
            //MiniMap.MinMapMirror.s.png

            let ne = new Laya.Image();
            ne.x = 64 + this.sp_n.width;
            ne.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.ne.png';
            this.m_sp.addChild(ne);
            //MiniMap.MinMapMirror.ne.png

            //MiniMap.MinMapMirror.e.png
            this.sp_e.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.e.png';
            this.sp_e.x = ne.x + 64 - 9;
            this.sp_e.y = ne.y + 27;
            this.sp_e.height = h;
            //MiniMap.MinMapMirror.n.png

            this.sp_s.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.s.png';
            this.sp_s.x = 64;
            this.sp_s.width = w;
            this.sp_s.y = 27 + this.sp_e.height + 27 - 9;
            //MiniMap.MinMapMirror.w.png
            this.sp_w.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.w.png';
            this.sp_w.height = h;
            this.sp_w.y = nw.y + 27;

            let sw = new Laya.Image();
            sw.y = this.sp_w.y + this.sp_w.height;
            sw.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.sw.png';
            this.m_sp.addChild(sw);
            //MiniMap.MinMapMirror.sw.png

            let se = new Laya.Image();
            se.x = 64 + this.sp_n.width;
            se.y = this.sp_e.y + this.sp_e.height;
            se.skin = 'res/Map/MiniMap/MiniMap.MinMapMirror.se.png';
            this.m_sp.addChild(se);
            //MiniMap.MinMapMirror.se.png

            this.sp_c = new Laya.Image();
            this.sp_c.graphics.drawRect(9, 20, 128 + w - 18, 54 + h - 29, "#000000");
            this.sp_c.alpha = 0.6;
            this.m_sp.addChild(this.sp_c);

            this.sp_panel = new Laya.Panel();
            this.sp_panel.width = this.show_w;
            this.sp_panel.height = this.show_h;
            this.sp_panel.x = 9;
            this.sp_panel.y = 27;
            this.m_sp.addChild(this.sp_panel);


            this.sp_img = new Laya.Image();
            // this.sp_img.x = 9;
            // this.sp_img.y = 27;
            this.sp_img.skin = 'res/Map/Map/' + this.m_id + '/miniMap.canvas.png';
            this.sp_panel.addChild(this.sp_img);

            if(!this.tex) {
                return ;
            }

            this.initMini();
        }

        tex:any;
        initMini() : void {
            //显示传送点
            //MiniMapSimpleMode.DefaultHelper.portal.png
            this.map_w = Number(msMoudle.mapP.Sizewidth);
            this.map_h = Number(msMoudle.mapP.Sizeheight);
            let cx = Number(msMoudle.mapP.centerX);
            let cy = Number(msMoudle.mapP.centerY);
            let lx = cx != 400 ? -cx : Number(msMoudle.mapP.VRLeft);
            let ly = cy != 300 ? -cy : Number(msMoudle.mapP.VRTop);
            let fx = Math.floor((msMoudle.char.m_x - lx) * (this.tex.width / this.map_w));
            let fy = Math.floor((msMoudle.char.m_y - ly) * (this.tex.height / this.map_h));

            if(msMoudle.mapP) {
                if(msMoudle.mapP.m_helper && msMoudle.mapP.m_helper.helper) {
                    let helper = msMoudle.mapP.m_helper.helper
                    for(let i:number = 0; i < helper.length; i++) {

                        if(helper[i].pt != 3 && helper[i].pt != 1 && helper[i].tm != "999999999" && helper[i].tn != "") {
                            let portal = new Laya.Image();
                            portal.anchorX = 0.5;
                            portal.anchorY = 1;
                            portal.pos( (helper[i].x - lx) * (this.tex.width / this.map_w),
                                (helper[i].y - ly) * (this.tex.height / this.map_h) );
                            portal.skin = 'res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.portal.png';
                            this.sp_img.addChild(portal);
                        }

                    }
                }
                //显示npc
                if (msMoudle.mapP.m_life && msMoudle.mapP.m_life.m_npcsAni) {
                    let npcer:any = msMoudle.mapP.m_life.m_npcsAni;
                    for (let i = 0; i < npcer.length; i++) {
                        let npc = new Laya.Image();
                        npc.anchorX = 0.5;
                        npc.anchorY = 1;
                        npc.pos( (npcer[i].m_x - lx) * (this.tex.width / this.map_w),
                            (npcer[i].m_y - ly) * (this.tex.height / this.map_h) );
                        npc.skin = 'res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.npc.png';
                        this.sp_img.addChild(npc);
                    }
                }
            }

            this.m_end = true;
        }

        self_sp:Laya.Image;
        party_sp:Laya.Sprite;
        another_sp:Laya.Sprite;
        map_w:number;
        map_h:number;
        show_w:number;
        show_h:number;

        lastx:number = 0;
        lasty:number = 0;
        party_tex:any = null;
        another_tex:any = null;
        public updateMini() : void {

            //显示自己
            if(msMoudle.char) {

                let cx = Number(msMoudle.mapP.centerX);
                let cy = Number(msMoudle.mapP.centerY);
                let lx = cx != 400 ? -cx : Number(msMoudle.mapP.VRLeft);
                let ly = cy != 300 ? -cy : Number(msMoudle.mapP.VRTop);
                let fx = Math.floor((msMoudle.char.m_x - lx) * (this.tex.width / this.map_w));
                let fy = Math.floor((msMoudle.char.m_y - ly) * (this.tex.height / this.map_h));
                // let fx = Math.floor((msMoudle.char.m_x - Number(msMoudle.mapP.VRLeft)) * (this.tex.width / this.map_w));
                // let fy = Math.floor((msMoudle.char.m_y - Number(msMoudle.mapP.VRTop)) * (this.tex.height / this.map_h));

                // if(this.lastx != fx || this.lasty != fy) {
                    // this.lastx = fx;
                    // this.lasty = fy;

                    let flg = false;
                    if(!this.self_sp) {
                        // console.log("##", this.tex.width, this.tex.height, this.map_w, this.map_h, cx, cy)
                        flg = true;
                        this.self_sp = new Laya.Image();
                        this.self_sp.anchorX = 0.5;
                        this.self_sp.anchorY = 1;
                        this.sp_img.addChild(this.self_sp);
                        this.self_sp.skin = 'res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.user.png';

                        //显示队友
                        //MiniMapSimpleMode.DefaultHelper.partyd.png
                        this.party_sp = new Laya.Sprite();
                        // this.party_sp.anchorX = 0.5;
                        // this.party_sp.anchorY = 1;
                        this.sp_img.addChild(this.party_sp);
                        this.party_tex = Laya.loader.getRes('res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.party.png');

                        //显示其他玩家
                        //MiniMapSimpleMode.DefaultHelper.another.png
                        this.another_sp = new Laya.Sprite();
                        // this.another_sp.anchorX = 0.5;
                        // this.another_sp.anchorY = 1;
                        this.sp_img.addChild(this.another_sp);
                        this.another_tex = Laya.loader.getRes('res/Map/MiniMap/MiniMapSimpleMode.DefaultHelper.another.png');

                        // console.log("##, ", this.self_sp.x, fx, this.self_sp.y, fy)
                        while(true) {
                            if(this.self_sp.x == fx) break;
                            this.self_sp.x += 1;
                            this.adpMini();
                        }
                        while(true) {
                            if(this.self_sp.y == fy) break;
                            this.self_sp.y += 1;
                            this.adpMini();
                        }
                    }

                    if(flg == false) {
                        this.self_sp.pos(fx, fy);
                        this.adpMini();
                    }
                // }
            }



        }

        adpMini() : void {
            if(this.self_sp.x > this.show_w / 2 && this.self_sp.x < (this.tex.width - this.show_w / 2) ) {
                this.sp_img.x = -(this.self_sp.x - this.show_w / 2);
            }
            if(this.self_sp.y > this.show_h / 2 && this.self_sp.y < (this.tex.height - this.show_h / 2) ) {
                this.sp_img.y = -(this.self_sp.y - this.show_h / 2);
            }

            let cx = Number(msMoudle.mapP.centerX);
            let cy = Number(msMoudle.mapP.centerY);
            let lx = cx != 400 ? -cx : Number(msMoudle.mapP.VRLeft);
            let ly = cy != 300 ? -cy : Number(msMoudle.mapP.VRTop);
            // let fx = Math.floor((msMoudle.char.m_x - lx) * (this.tex.width / this.map_w));
            // let fy = Math.floor((msMoudle.char.m_y - ly) * (this.tex.height / this.map_h));

            //显示队友
            //this.party_sp
            let pArr:Array<any> = [];
            let aArr:Array<any> = [];
            this.party_sp.graphics.clear();
            this.another_sp.graphics.clear();
            if(this.party_tex && this.another_tex) {

                if(msMoudle.isSyncMap(this.m_id) == false) {
                    if(msMoudle.mapP && msMoudle.mapP.otherchar) {
                        for(let i:number = 0; i < msMoudle.mapP.otherchar.length; i++) {
                            // let fx = Math.floor((msMoudle.mapP.otherchar[i].m_x - Number(msMoudle.mapP.VRLeft)) * (this.tex.width / this.map_w));
                            // let fy = Math.floor((msMoudle.mapP.otherchar[i].m_y - Number(msMoudle.mapP.VRTop)) * (this.tex.height / this.map_h));

                            // npc.pos( (npcer[i].m_x - lx) * (this.tex.width / this.map_w),
                            // (npcer[i].m_y - ly) * (this.tex.height / this.map_h) );

                            aArr.push((msMoudle.mapP.otherchar[i].m_x - lx) * (this.tex.width / this.map_w),
                            (msMoudle.mapP.otherchar[i].m_y - ly) * (this.tex.height / this.map_h) -10);
                        }

                        if(aArr.length > 0) {
                            this.another_sp.graphics.drawTextures(this.another_tex, aArr);
                        }
                    }
                }
                else {
                    for(let i:number = 0; i < Sync.realPlayers.length; i++) {
                        // let fx = Math.floor((Sync.realPlayers[i].m_x - Number(msMoudle.mapP.VRLeft)) * (this.tex.width / this.map_w));
                        // let fy = Math.floor((Sync.realPlayers[i].m_y - Number(msMoudle.mapP.VRTop)) * (this.tex.height / this.map_h));
                        if(Sync.partyId > 0) {
                            if(Sync.partyId == Sync.realPlayers[i].m_partyId) {
                                // pArr.push(fx + this.party_tex.width / 2, fy - this.party_tex.height);
                                aArr.push((Sync.realPlayers[i].m_x - lx) * (this.tex.width / this.map_w),
                            (Sync.realPlayers[i].m_y - ly) * (this.tex.height / this.map_h) -10);
                            }
                            else {
                                // aArr.push(fx + this.party_tex.width / 2, fy - this.party_tex.height);
                                aArr.push((Sync.realPlayers[i].m_x - lx) * (this.tex.width / this.map_w),
                            (Sync.realPlayers[i].m_y - ly) * (this.tex.height / this.map_h) -10);
                            }
                        }
                        else {
                            // aArr.push(fx + this.another_sp.width / 2, fy - this.another_tex.height);
                            aArr.push((Sync.realPlayers[i].m_x - lx) * (this.tex.width / this.map_w),
                            (Sync.realPlayers[i].m_y - ly) * (this.tex.height / this.map_h) -10);
                        }
                    }

                    // console.log(aArr, pArr, Sync.realPlayers)

                    if(pArr.length > 0) {
                        this.party_sp.graphics.drawTextures(this.party_tex, pArr);
                    }

                    if(aArr.length > 0) {
                        this.another_sp.graphics.drawTextures(this.another_tex, aArr);
                    }
                }
            }

        }

        //
    }

}