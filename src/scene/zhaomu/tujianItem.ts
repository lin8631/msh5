/// <reference path="./../../core/ms/Maple/Character.ts" />
module app.zhaomu {
    import cssCharacter = CharacterRole.Character;

    export class tujianItem extends ui.zhaomu.tujianItemUI  {
        public static className = "app.zhaomu.tujianItem";
        private hero: cssCharacter;

        updateData(data: any, index: number) {
            this._img.skin = "";
            this._name.text = "";
            this._pinzhi.text = "";
            if(this.hero) {
                this.hero.clearUp();
                this.hero = null;
            }
            if(data) {
                this._img.skin = "homeland/characterCard.CardBackgrnd." + data.pinzhi + ".png";
                this._name.text = data.name;
                if(data.pinzhi == 1) this._pinzhi.text = "N";
                else if(data.pinzhi == 2) this._pinzhi.text = "R";
                else if(data.pinzhi == 3) this._pinzhi.text = "SR";
                else if(data.pinzhi == 4) this._pinzhi.text = "SSR";
                else if(data.pinzhi == 5) this._pinzhi.text = "神卡";
                this.hero = new cssCharacter();
                let E:any = {};
                E.fweapon = data.fweapon;
                E.cap = data.cap;
                E.longcoat = data.longcoat;
                E.weapon = data.weapon;
                this.hero.m_name = data.name;
                this.hero.m_lv = 1;
                this.hero.m_nametag_show = false;
                this.hero.is_oneFrame = true;
                this.hero.changeAll(this._body, E, 0, 0);

            }
        }

        onClose() {
            if(this.hero) {
                this.hero.clearUp();
                this.hero = null;
            }
        }

        /////

    }
}