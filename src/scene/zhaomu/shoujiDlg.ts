module app.zhaomu {
    import cssMsg = MsgRole.Msg;
    export class shoujiDlg extends ui.zhaomu.shoujiDlgUI implements ui.zhaomu.IshoujiDlgUI  {

        public static className = "app.zhaomu.shoujiDlg";
        private m_msg:cssMsg;

        onInitialize(){
            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 400) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        onClose() {

        }

        updateData(){
            this.lstAbi.vScrollBarSkin = "";
            this.onBtnPetClick2(null);
        }

        onBtnPetClick2(e: Laya.Event): void {
            this.btnPet.gray = false;
            this.btnJob.gray = true;
            this.btnChair.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.pet.visible = true;
            this.job.visible = false;
            this.chair.visible = false;
            this.tamingmob.visible = false;
            this.ring.visible = false;

            this.lstAbi.vScrollBar.value = 0;
        }
        onBtnJobClick2(e: Laya.Event): void {
            this.btnPet.gray = true;
            this.btnJob.gray = false;
            this.btnChair.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.pet.visible = false;
            this.job.visible = true;
            this.chair.visible = false;
            this.tamingmob.visible = false;
            this.ring.visible = false;

            this.lstAbi.vScrollBar.value = 0;
        }
        onBtnChairClick2(e: Laya.Event): void {
            this.btnPet.gray = true;
            this.btnJob.gray = true;
            this.btnChair.gray = false;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.pet.visible = false;
            this.job.visible = false;
            this.chair.visible = true;
            this.tamingmob.visible = false;
            this.ring.visible = false;

            this.lstAbi.vScrollBar.value = 0;
        }
        onBtnTamingMobClick2(e: Laya.Event): void {
            this.btnPet.gray = true;
            this.btnJob.gray = true;
            this.btnChair.gray = true;
            this.btnTamingMob.gray = false;
            this.btnRing.gray = true;

            this.pet.visible = false;
            this.job.visible = false;
            this.chair.visible = false;
            this.tamingmob.visible = true;
            this.ring.visible = false;

            this.lstAbi.vScrollBar.value = 0;
        }
        onBtnRingClick2(e: Laya.Event): void {
            this.btnPet.gray = true;
            this.btnJob.gray = true;
            this.btnChair.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = false;

            this.pet.visible = false;
            this.job.visible = false;
            this.chair.visible = false;
            this.tamingmob.visible = false;
            this.ring.visible = true;

            this.lstAbi.vScrollBar.value = 0;
        }

        onBtnBackClick(e: Laya.Event): void {

            this.close();

            ///
        }

    }
}