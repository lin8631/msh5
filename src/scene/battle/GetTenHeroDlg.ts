/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.battle {

    import cssCharacter = CharacterRole.Character;

    export class GetTenHeroDlg extends ui.battle.GetTenHeroDlgUI implements ui.battle.IGetTenHeroDlgUI {
        public static className = "app.battle.GetTenHeroDlg";
        private char:cssCharacter;
        private m_data:Array<any> = [];
        private m_s:Array<any> = [this.s1, this.s2, this.s3, this.s4, this.s5, this.s6, this.s7, this.s8, this.s9, this.s10];
        private m_img:Array<any> = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8, this.img9, this.img10];
        private m_pz:Array<any> = [this.pz1, this.pz2, this.pz3, this.pz4, this.pz5, this.pz6, this.pz7, this.pz8, this.pz9, this.pz10];
        private m_pinzhi:Array<any> = [];

        onInitialize(){

            // let design_width = (600 / Laya.Browser.height) * Laya.Browser.width;///这个没问题
            // let design_height = (600 / Laya.Browser.height) * Laya.Browser.height;
            // this.x = (design_width - 800) / 2;

            this.x = 0;

            this.ryj.visible = false;
            for(let i:number = 0; i < 10; i++) {
                this.m_s[i].visible = false;
            }
            this.updateData();
            this.btnC.visible = false;
        }

        onClose() {

        }

        onBtnCClick(e: Laya.Event): void {
            if(this.num == 10) {
                this.close();
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = true;
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.one.visible = true;
                ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.ten.visible = true;
            }
        }

        updateData(){

            ////计算抽卡的人物
            for(let i:number = 0; i < 10; i++) {
                this.m_data[i] = msMoudle.getIndex();
                // if(i == 0) this.m_data[i] = 3;
                // if(i == 1) this.m_data[i] = 10;
                // if(i == 2) this.m_data[i] = 19;
                // if(i == 3) this.m_data[i] = 0;
                // if(i == 4) this.m_data[i] = 1;
                ms.chouka++;
                if(ms.chouka >= msMoudle.rnkG.length) ms.chouka = 0;
            }

            for(let i:number = 0; i < 10; i++) {
                this.buyHero(this.m_data[i]);
            }
            ms.shops[1] += 10;      //抽卡次数

            ms.saveServer();
            this.Show();
        }

        private buyHero(getIndex:number) : void {
            let rnk:number = msMoudle.getRandValue(1, 0, 1000000);

            let tIndex:number = ms.herosdata.length;
            ms.herosdata[tIndex] = new Object();
            ms.herosdata[tIndex].id = msMoudle.herojson[getIndex].id;
            ms.herosdata[tIndex].openid = rnk;
            ms.herosdata[tIndex].have = 1;            //1表示未上阵、2表示上阵
            ms.herosdata[tIndex].lv = 1;
            ms.herosdata[tIndex].Name = msMoudle.herojson[getIndex].name;
            // ms.herosdata[tIndex].head = msMoudle.herojson[getIndex].head;
            ms.herosdata[tIndex].juexing = 0;
            ms.herosdata[tIndex].pinzhi = msMoudle.herojson[getIndex].pinzhi;
            ///初始化服务器属性
            let _:number = ms.otherheroservedata.length;
            ms.otherheroservedata[_] = new app.model.HeroStatus();
            ms.otherheroservedata[_].id = msMoudle.herojson[getIndex].id;
            ms.otherheroservedata[_].openid =  ms.herosdata[tIndex].openid;
            ms.otherheroservedata[_].Lv = 1;
            ms.otherheroservedata[_].Exp = 0;
            ms.otherheroservedata[_].Name = msMoudle.herojson[getIndex].name;
            ms.otherheroservedata[_].juexing = 0; //觉醒状态
            ms.otherheroservedata[_].star = 1;//msMoudle.getRandValue(1, 0, 5);      //星级
            ms.otherheroservedata[_].pinzhi = msMoudle.herojson[getIndex].pinzhi;//品质
            //技能
            ms.otherheroservedata[_].Skill_1 = msMoudle.herojson[getIndex].skill_1;
            ms.otherheroservedata[_].Skill_2 = msMoudle.herojson[getIndex].skill_2;
            ms.otherheroservedata[_].Skill_3 = msMoudle.herojson[getIndex].skill_3;
            ms.otherheroservedata[_].Skill_4 = msMoudle.herojson[getIndex].skill_4;
            ////初始化属性
            msMoudle.serverAbi(ms.otherheroservedata[_]);

            this.m_pinzhi[this.m_pinzhi.length] = msMoudle.herojson[getIndex].pinzhi;//品质
        }

        num:number = 0;
        private Show() : void {
            this.bk.visible = false;
            // this.effect.visible = false;
            this.num++;


            let _data:any = msMoudle.herojson[this.m_data[this.num - 1]];

            this.m_s[this.num - 1].visible = true;

            // this.m_img[this.num - 1].skin = _data.head;
            this.m_img[this.num - 1].skin = "res/Character/Cap/" + _data.head + ".img/info.icon.png";

            this.m_pz[this.num - 1].skin = "homeland/img_pingzhikuang" + this.m_pinzhi[this.num - 1] + ".png";
            //价格品质

            let chouka = new app.role();
			chouka.isChouKa = true;
			chouka.isLoop = false;
			// chouka.mScale = 2;
			chouka.changeAllByZDH(Laya.stage, "res/chouka/chouka", Laya.stage.width / 2 - 155 * chouka.mScale, Laya.stage.height / 2 - 276 * chouka.mScale - 50, 29);

            Laya.timer.once(1000, this, ()=> {

                this.char = new cssCharacter();
                let E:any = {};
                E.fweapon = _data.fweapon;
                E.cap = _data.cap;
                E.longcoat = _data.longcoat;
                E.weapon = _data.weapon;

                this.bk.visible = true;
                // this.effect.visible = true;
                this.char.m_name = _data.name;
                this.char.changeAll(this.bk, E, 251/2, 225);

                if(this.m_pinzhi[this.num - 1] == 1) this.pinzhi.text = "N";
                else if(this.m_pinzhi[this.num - 1] == 2) this.pinzhi.text = "R";
                else if(this.m_pinzhi[this.num - 1] == 3) this.pinzhi.text = "SR";
                else if(this.m_pinzhi[this.num - 1] == 4) this.pinzhi.text = "SSR";
                else if(this.m_pinzhi[this.num - 1] == 5) this.pinzhi.text = "神卡";

                if(this.num == 10) {
                    // this.ryj.visible = true;
                    this.btnC.visible = true;
                }
                else {
                    Laya.timer.once(750, this, ()=> {
                        this.DisShow();
                    });
                }
            });
        }

        private DisShow() : void {
            Laya.timer.once(250, this, ()=> {
                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                    this.Show();
                }
            });
        }

    }
}