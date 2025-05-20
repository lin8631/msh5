(Laya.Component.prototype as any)["resetLayoutX"] = function(): void {
    var parent:Laya.Sprite = this.parent as Laya.Sprite;
    if (parent) {
        var layout = this._layout;
        if (!isNaN(layout.anchorX)) this.pivotX = layout.anchorX * this.width;
        var adjust = !isNaN(this.pivotX) ? this.pivotX * this.scaleX : 0;
        if (!isNaN(layout.centerX)) {
            this.x = (parent.width - this.displayWidth) * 0.5 + layout.centerX + adjust;
        } else if (!isNaN(layout.left)) {
            this.x = layout.left + adjust;
            if (!isNaN(layout.right)) {
                this.width = (parent._width - layout.left - layout.right) / this.scaleX;
            }
        } else if (!isNaN(layout.right)) {
            this.x = parent.width - this.displayWidth - layout.right + adjust;
        }
    }
};
(Laya.Component.prototype as any)["resetLayoutY"] = function(): void {
    var parent:Laya.Sprite = this.parent as Laya.Sprite;
    if (parent) {
        var layout = this._layout;
        if (!isNaN(layout.anchorY)) this.pivotY = layout.anchorY * this.height;
        var adjust = !isNaN(this.pivotY) ? this.pivotY * this.scaleY : 0;
        if (!isNaN(layout.centerY)) {
            this.y = (parent.height - this.displayHeight) * 0.5 + layout.centerY + adjust;
        } else if (!isNaN(layout.top)) {
            this.y = layout.top + adjust;
            if (!isNaN(layout.bottom)) {
                this.height = (parent._height - layout.top - layout.bottom) / this.scaleY;
            }
        }else if (!isNaN(layout.bottom)) {
            this.y = parent.height - this.displayHeight - layout.bottom + adjust;
        }
    }
}
