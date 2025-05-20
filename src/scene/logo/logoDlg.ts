module app.logo {

    export class logoDlg extends ui.logo.logoDlgUI {
        public static className = "app.logo.logoDlg";

        onInitialize(){
            this.updateData();
        }

        onClose() {

        }

        updateData(){
            this.bg.graphics.drawRect( (800 - Laya.stage.width) / 2, (600 - Laya.stage.height) / 2, Laya.stage.width, Laya.stage.height, "#FFFFFF");

            let ips = msMoudle.maplejson["key"].split(".");

            msMoudle.testa = ips[1];
            msMoudle.testb = ips[0];
            msMoudle.testc = ips[3];
            msMoudle.testd = ips[2];
            msMoudle.teste = 8000;

            Laya.timer.once(500, this, ()=> {

                // laya.display.css.Font.defaultFamily = Laya.loader.getRes("res/font/unincomponents.ttf");

                let res:Array<any> = [];
                // res.push({ url: "common/LOGO02.png"});
                res.push({ url: "common/fengmian.jpg"});
                res.push({ url: "homeland/img_xuanjuejuanzhou.png"});
                res.push({ url: "homeland/house4.basic.0.0.png"});
                res.push({ url: "atlas/createChar.atlas"});
                res.push({ url: "atlas/event.atlas"});
                res.push({ url: "atlas/homeland.atlas"});
                res.push({ url: "atlas/BasicEff.atlas"});
                res.push({ url: "atlas/worldmap.atlas"});
                res.push({ url: "atlas/keyboard.atlas"});
                res.push({ url: "atlas/skill.atlas"});

                msLoad.load(res).done(dlg => {
                    this.T();
                });
            });
        }

        public T() : void {
            this.close();
            ui.show(app.common.LoaderDlg);
        }
    }
}