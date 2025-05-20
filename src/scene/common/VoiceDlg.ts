module app.common {

    export class VoiceDlg extends ui.common.VoiceDlgUI implements ui.common.IVoiceDlgUI {
        public static className = "app.common.VoiceDlg";

        onInitialize(){
            // msMoudle.popShow(this, (800 - 400) / 2, (600 - 300) / 2);
            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 300) / 2 - (Laya.stage.height - 600) / 2;

            // if(msMoudle.mainT) {
            //     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //         msMoudle.mainT.cz_sp.visible = false;
            //     }
            // }

            this.updateData();
        }

        onClose() {}

        updateData() : void {
            // Laya.SoundManager.setMusicVolume(Number(Laya.LocalStorage.getItem("yinyue")));

            if(Laya.SoundManager.musicVolume == 0) {
                this.music_txt.text = "声音(关)";
            }
            else {
                this.music_txt.text = "声音(开)";
            }
            if(msMoudle.m_zhuque) {
                this.zhuque.text = "朱雀(开)";
            }
            else {
                this.zhuque.text = "朱雀(关)";
            }

            // this.rocke_txt.text = "摇杆(" + ms.rocker_type + ")";
        }

        onBtnGLClick(e: Laya.Event): void {

        }

        onBtnMusciClick(e: Laya.Event): void {
            // Laya.SoundManager.stopAll();
            if(Laya.SoundManager.musicVolume == 0) {
                Laya.SoundManager.setMusicVolume(1);
                Laya.SoundManager.setSoundVolume(1);
            }
            else {
                Laya.SoundManager.setMusicVolume(0);
                Laya.SoundManager.setSoundVolume(0);
            }

            this.updateData();
        }
        onBtnShareClick(e: Laya.Event): void {

            msMoudle.m_zhuque = !msMoudle.m_zhuque;
            this.updateData();
            // if(msMoudle.isScreen()) {
            // else {
            //     var p:any = {
            //         /*获取URL，可加上来自分享到QQ标识，方便统计*/
            //         url: 'http://120.77.245.27/llx/index.html',
            //         desc: '',
            //         /*分享标题(可选)*/
            //         title: '【分享】终于来了！手机版的冒险岛，你的回忆这里都有！还不上车？',
            //         /*分享摘要(可选)*/
            //         summary: '还不赶紧点击进来观看',
            //         /*分享图片(可选)*/
            //         pics: 'http://120.77.245.27/share.jpg',
            //         /*视频地址(可选)*/
            //         flash: '',
            //         /*分享来源(可选) 如：QQ分享*/
            //         site: '',
            //         style: '201'
            //     };
            //     var s:any = [];
            //     for(var i in p) {
            //         s.push(i + '=' + encodeURIComponent(p[i] || ''));
            //     }
            //     var url = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
            //     window.open(url,'_blank');
            // }
        }
        // onBtnGroupClick(e: Laya.Event): void {
        //     if(msMoudle.isScreen()) {
        //     else {
        //         window.open("https://jq.qq.com/?_wv=1027&k=504dGFy",'_blank');
        //     }


        //     // this.close();
        // }

        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 200, 150);
            this.close();
            // if(msMoudle.mainT) {
            //     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //         msMoudle.mainT.cz_sp.visible = true;
            //     }
            // }
        }

        // onBtnRockerClick(e: Laya.Event): void {
        //     // if(ms.rocker_type == 1) ms.rocker_type = 2;
        //     // else if(ms.rocker_type == 2) ms.rocker_type = 1;
        //     // this.rocke_txt.text = "摇杆(" + ms.rocker_type + ")";
        //     // ms.saveServer();
        //     // if(msMoudle.mainT) {
        //     //     msMoudle.mainT.showRocker();
        //     // }
        //     // msMoudle.toast("尽请期待");
        //     // this.close();
        //     ui.show(app.common.glDlg);
        // }

        onBtnSellClick(e: Laya.Event): void {

            ui.show(app.battle.selectDlg, {black:true});

        }

        //
    }
}