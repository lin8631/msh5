module app.skill {

    export class lineItem extends ui.skill.lineItemUI  {
        public static className = "app.skill.lineItem";

        public m_x:number = 0;
        public m_y:number = 0;

        constructor() {

            super();
        }

        public updateData(data:any){
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
            if(dir == 'w') {
                this._u.visible = true;
                this._u.gray = true;
                if(light) this._u.gray = false;
            }
            else if(dir == 's') {
                this._d.visible = true;
                this._d.gray = true;
                if(light) this._d.gray = false;
            }
            else if(dir == 'a') {
                this._l.visible = true;
                this._l.gray = true;
                if(light) this._l.gray = false;
            }
            else if(dir == 'd') {
                this._r.visible = true;
                this._r.gray = true;
                if(light) this._r.gray = false;
            }
        }

        //拐角
        ricle(type:string, light:boolean = false) : void {
            if(type == 'aw') {
                this._lu.visible = true;
                this._lu.gray = true;
                if(light) this._lu.gray = false;
            }
            else if(type == 'as') {
                this._ld.visible = true;
                this._ld.gray = true;
                if(light) this._ld.gray = false;
            }
            else if(type == 'dw') {
                this._ru.visible = true;
                this._ru.gray = true;
                if(light) this._ru.gray = false;
            }
            else if(type == 'ds') {
                this._rd.visible = true;
                this._rd.gray = true;
                if(light) this._rd.gray = false;
            }
        }

        showCnt() : void {

            this._ld.visible = true;
            // this._ld.visible = true;
            this._rd.visible = true;
            // this._rd.visible = true;
            this._lu.visible = true;
            // this._lu.visible = true;
            this._ru.visible = true;
            // this._ru.visible = true;
        }

        showArrod() : void {

            this._d.visible = true;
            // this._d.visible = true;
            this._u.visible = true;
            // this._u.visible = true;
            this._l.visible = true;
            // this._l.visible = true;
            this._r.visible = true;
            // this._r.visible = true;
        }

        hideArrod() : void {

            this._d.visible = false;
            // this._d.visible = false;
            this._u.visible = false;
            // this._u.visible = false;
            this._l.visible = false;
            // this._l.visible = false;
            this._r.visible = false;
            // this._r.visible = false;
        }

        public showX(light:boolean = false) : void {
            this.ctx.visible = true;
            this.ctx.gray = true;
            if(light) this.ctx.gray = false;
        }

        public showY(light:boolean = false) : void {
            this.cty.visible = true;
            this.cty.gray = true;
            if(light) this.cty.gray = false;
        }

        public hideAll() : void {

            this._d.visible = false;
            // this._d.visible = false;
            this._u.visible = false;
            // this._u.visible = false;
            this._l.visible = false;
            // this._l.visible = false;
            this._r.visible = false;
            // this._r.visible = false;

            this._ld.visible = false;
            // this._ld.visible = false;
            this._rd.visible = false;
            // this._rd.visible = false;
            this._lu.visible = false;
            // this._lu.visible = false;
            this._ru.visible = false;
            // this._ru.visible = false;

            this.ctx.visible = false;
            // this.ctx.visible = false;
            this.cty.visible = false;
            // this.cty.visible = false;
        }

    }

}