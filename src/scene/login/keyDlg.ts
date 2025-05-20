module app.login {

    export class keyDlg extends ui.login.keyDlgUI implements ui.login.IkeyDlgUI {
        public static className = "app.login.keyDlg";

        a2:Array<string> = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "0","1","2","3","4","5","6","7","8","9"]
        a1:Array<string> = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
        "0","1","2","3","4","5","6","7","8","9"]
        a:Array<any> = [];
        onInitialize(){
            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;
            this.updateData();
        }

        onClose() {

        }

        onLstkeyCellClick(e: Laya.Event, index: number): void {
            if(this._zh.length < 8) {
                this._zh[this._zh.length] = this.a[index].t;
                let str = "";
                for(let i:number = 0; i < this._zh.length; i++) {
                    str += this._zh[i];
                }
                this.zh.text = str;
            }
            else {
                msMoudle.toast("最多8个字符");
            }
        }

        onBtnSClick(e: Laya.Event): void {
            if(this.sel) this.sel = false;
            else this.sel = true;
            if(this.sel == false) {
                this.a = [];
                for(let i:number = 0; i < this.a1.length; i++) {
                    this.a[i] = new Object();
                    this.a[i].tip = 1;
                    this.a[i].t = this.a1[i];
                }
                this.lstkey.dataSource = this.a;
            }
            else {
                this.a = [];
                for(let i:number = 0; i < this.a2.length; i++) {
                    this.a[i] = new Object();
                    this.a[i].tip = 2;
                    this.a[i].t = this.a2[i];
                }
                this.lstkey.dataSource = this.a;
            }

        }
        onBtnOKClick(e: Laya.Event): void {
            if(this._zh.length < 3) {
                msMoudle.toast("最少输入4个字符");
                return ;
            }
            this.close();
            ui.manager.getDialogByName("app.login.loginDlg").dlg._zh.text = this.zh.text;
        }
        onBtnBClick(e: Laya.Event): void {
            if(this._zh.length > 0) {
                this._zh.length -= 1;
                let str = "";
                for(let i:number = 0; i < this._zh.length; i++) {
                    str += this._zh[i];
                }
                this.zh.text = str;
            }
            else {
                this._zh = [];
                this.zh.text = "";
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

        sel:boolean = false;
        _zh:Array<string> = [];
        updateData(){
            this._zh = [];
            let last = ui.manager.getDialogByName("app.login.loginDlg").dlg._zh.text;
            for(let i:number = 0; i < last.length; i++) {
                this._zh[i] = last[i];
            }
            this.zh.text = last;
            this.a = [];
            for(let i:number = 0; i < this.a1.length; i++) {
                this.a[i] = new Object();
                this.a[i].tip = 1;
                this.a[i].t = this.a1[i];
            }
            this.lstkey.dataSource = this.a;
        }

        //
    }
}