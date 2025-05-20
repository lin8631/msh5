/**
 * Mole
 */
class Mole {
    private normalState: Laya.Image
    private hitState: Laya.Image
    private scoreY: number
    private downY: number
    private upY: number

    private isActive: Boolean
    private isShow: Boolean
    private isHit: Boolean
    private type:number

    private hitCallBackHd: Laya.Handler // 受击回调函数
    constructor(normalState: Laya.Image, hitState: Laya.Image, downY: number, hitCallBackHd: Laya.Handler) {
        this.normalState = normalState
        this.hitState = hitState
        this.hitState.visible = false
        this.downY = downY
        this.upY = this.normalState.y
        this.hitCallBackHd = hitCallBackHd
        // 添加鼠标点击事件
        this.normalState.on(Laya.Event.MOUSE_DOWN, this, this.hit)
        this.reset()
    }

    private reset ():void {
        this.normalState.visible = false
        this.hitState.visible = false
        this.isActive = false
        this.isShow = false
        this.isHit = false
    }
    // 显示
    public show ():void {
        if (this.isActive) {
            return
        }
        this.isActive = true
        this.isShow = true
        this.normalState.y = this.downY
        this.normalState.visible = true

        this.type = Math.random() < 0.25 ? 1 : 2
        this.normalState.skin = 'StarGame/mouse_normal_' + this.type + '.png'
        this.hitState.skin = 'StarGame/mouse_hit_' + this.type + '.png'
        // 创建缓动动画
        Laya.Tween.to(this.normalState,{y: this.upY}, 500, Laya.Ease.backInOut, Laya.Handler.create(this, this.showComplete))
    }
    // 停留
    private showComplete ():void {
        if (this.isShow && !this.isHit) {
            Laya.timer.once(2000, this, this.hide)
        }
    }
    // 隐藏
    private hide ():void {
        if (this.isShow && !this.isHit) {
            this.isShow = false
            Laya.Tween.to(this.normalState, {y: this.downY}, 300, Laya.Ease.backOut, Laya.Handler.create(this, this.reset))
        }
    }
    // 受击
    private hit ():void {
        if (this.show && !this.isHit) {
            this.isHit = true
            this.isShow = false
            // 清除定时器
            Laya.timer.clear(this, this.hide)
            this.normalState.visible = false
            this.hitState.visible = true
            this.hitCallBackHd.runWith(this.type)
            // 停留500毫秒之后再显示
            Laya.timer.once(500, this, this.reset)
        }
    }


}