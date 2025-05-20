module app.skill {

    export class skillItem extends ui.skill.skillItemUI  {
        public static className = "app.skill.skillItem";

        public m_x:number = 0;
        public m_y:number = 0;

        constructor() {

            super();
        }

        public updateData(data:any, index:number){
            if(data) {
                this._img.skin = "res/Skill/" + Math.floor(Number(data.key) / 10000) + ".img/skill." + Number(data.key) + ".icon.png";
                this._name.text = msMoudle.wz["Skill.img"][data.key][data.key + ".name"];
            }

            this.hideAll();

            this.showArrod();
        }

        public setPos(x:number, y:number) : void {
            this.m_x = x;
            this.m_y = y;
        }

        //连通性
        foo(data:any, x:number, y:number) : void {
        }

        //延申
        runto(dir:string, light:boolean = false) : void {
        }

        //拐角
        ricle(type:string, light:boolean = false) : void {
        }

        showCnt() : void {
            this.img.visible = false;
            this.img2.visible = false;
        }

        showArrod() : void {
            this.img.visible = true;
            this.img2.visible = true;
        }

        hideArrod() : void {
            this.img.visible = true;
            this.img2.visible = true;
        }

        public showX(light:boolean = false) : void {
        }

        public showY(light:boolean = false) : void {
        }

        public hideAll() : void {

            this.img.visible = false;
            this.img2.visible = false;

        }


    }

}