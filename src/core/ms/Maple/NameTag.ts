module NametagRole {

    export class NameTag extends Laya.Sprite {

        private m_x:number = 0;
        private m_y:number = 0;
        private m_sp:Laya.Sprite;
        private sp_e:Laya.Image;
        private sp_w:Laya.Image;
        private sp_c:Laya.Image;
        public txt:Laya.Label;

        public clearUp() : void {
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
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
            if(this.txt) {
                this.txt.removeSelf();
                this.txt.destroy(true);
                this.txt = null;
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

        public loadNameTag(P:any, name:string, t:string, show:boolean = true) : void {
            let manw:number = 80

            this.m_sp = new Laya.Sprite();
            this.m_sp.pos(-65, 0);
            // if(t == "pet.3") this.m_sp.pos(65, 0);
            if(P.m_nametag_sp && show)
                P.m_nametag_sp.addChild(this.m_sp);

            let data:any = null;
            if(Number(t) >= 3 && Number(t) <= 25) data = msMoudle.wz["NameTag.img"][t];
            else if(t.indexOf("medal") >= 0) {
                this.m_sp.pos(-45, 0);
                data = msMoudle.wz["NameTag.img"]["medal"];
            }
            else if(t.indexOf("pet") >= 0) {
                manw = 45;
                this.m_sp.pos(-30, 0);//-55
                data = msMoudle.wz["NameTag.img"]["pet"];
            }

            this.sp_e = new Laya.Image();
            this.m_sp.addChild(this.sp_e);
            this.sp_w = new Laya.Image();
            this.m_sp.addChild(this.sp_w);
            this.sp_c = new Laya.Image();
            this.m_sp.addChild(this.sp_c);

            this.txt = new Laya.Label();
            this.txt.width = manw;
            this.txt.align = "center";
            this.txt.bold = true;
            this.txt.fontSize = 14;
            this.m_sp.addChild(this.txt)

            let e:any = null;
            e = data[t + ".e"];//右
            let w:any = null;
            w = data[t + ".w"];//左
            let c:any = null;
            c = data[t + ".c"];//填充

            //预加载该nametag
            let res:Array<any> = [];
            let res_e = "res/NameTag.img/" + msMoudle.getNameTagInfo(e);
            let res_w = "res/NameTag.img/" + msMoudle.getNameTagInfo(w);
            let res_c = "res/NameTag.img/" + msMoudle.getNameTagInfo(c);
            if(!Laya.loader.getRes(res_e)) res.push({ url: res_e});
            if(!Laya.loader.getRes(res_w)) res.push({ url: res_w});
            if(!Laya.loader.getRes(res_c)) res.push({ url: res_c});
            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);

                    msMoudle.resTip(res, true);

                    this.onNameTag(res_c, res_e, res_w, manw, data, t, name);
                });
            }
            else {
                this.onNameTag(res_c, res_e, res_w, manw, data, t, name);
            }
        }
        m_loadRes:Array<any> = [];
        onNameTag(res_c:string, res_e:string, res_w:string, manw:number, data:any, t:any, name:string) : void {
            let sum = 0;

            let texture_c = Laya.loader.getRes(res_c);
            if(texture_c && this.sp_e && this.sp_c && this.sp_w && this.txt) {
                this.sp_e.skin = res_e;
                this.sp_w.skin = res_w;
                let x_e:any = msMoudle.Vec2FromArr(data[t + ".e.origin"]);
                let x_w:any = msMoudle.Vec2FromArr(data[t + ".w.origin"]);
                let x_c:any = msMoudle.Vec2FromArr(data[t + ".c.origin"]);
                let clr = data[t + ".clr"]
                let cal = 0;
                cal = Number((80 / texture_c.width).toFixed(0)) * texture_c.width < manw ? Number((manw / texture_c.width).toFixed(0)) + 1 : Number((manw / texture_c.width).toFixed(0));
                sum = sum + cal * texture_c.width
                this.sp_c.skin = res_c;
                this.sp_c.pos(0 - x_c.x + x_w.x,  - x_c.y + texture_c.height / 2);
                this.sp_c.width = texture_c.width * cal;
                this.sp_w.pos(0, - x_w.y  + texture_c.height / 2);
                this.sp_e.pos(texture_c.width * (cal) + x_e.x + x_w.x, - x_e.y  + texture_c.height / 2);//因为放倒最后吗
                this.txt.text = name;
                let cl = 16777216 + Number(clr);
                this.txt.color = Laya.Utils.toHexColor(cl);
                this.txt.pos(x_w.x, texture_c.height / 2 - 2);
            }
        }
        //
    }

}
