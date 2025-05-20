/// <reference path="./BaseDialog.ts" />
/// <reference path="../../utils/Promise.ts" />
namespace ui {

    /**
     * 管理一组界面，对应DialogManager中的一个Layer
     * 当要添加一个View时，会根据ShowOptions选项来决定本容器内其他View的显示策略
    */
    class ViewContainer extends Laya.View {
        private static viewAutoHiddenKey = "__auto_hidden__"; // 用于自动隐藏全屏界面下面的界面，目前只处理覆盖的最顶层的一个界面
        private static onCloseMethodName = "onClose";
        private _layer: DisplayLayer;

        constructor(layer: DisplayLayer) {
            super();
            this._layer = layer;
        }

        get layer(): DisplayLayer {
            return this._layer;
        }

        add<T extends Laya.View>(view: T, opt?: ShowOptions) {
            var closeAllOther = opt ? opt.closeAllOther : false;
            var closeCurrent = opt ? opt.closeCurrent : false;
            if (closeAllOther || closeCurrent) {
                while (this.numChildren > 0) {
                    let topView = this.getChildAt(this.numChildren - 1) as Laya.View;
                    //console.log("closeCurrent, name is " + topView.name)
                    manager.close(topView,DialogResult.No,null,true);
                    //this.remove(topView, true);
                    if (closeCurrent)
                        break;
                }
            }
            if (this.numChildren > 0 && isViewFullScreen(view)) {
                let topView = this.getChildAt(this.numChildren - 1) as Laya.View;
                topView[ViewContainer.viewAutoHiddenKey] = true;
                topView.visible = false;
            }
            this.addChild(view);
        }

        // onlyRemove为true时，不恢复被覆盖的View的可见属性
        remove<T extends Laya.View>(view: T, onlyRemove = false) {
            if (view instanceof PopupMaskContainer) {
                view.removeChildren(); // 移除children，以便触发Laya.Event.Remove，便于View做清理工作
            } else if (view[ViewContainer.onCloseMethodName]) {
                view[ViewContainer.onCloseMethodName].call(view);
            }
            this.removeChild(view);
            if (onlyRemove)
                return;

            if (this.numChildren > 0) {
                let topView = this.getChildAt(this.numChildren - 1) as any;
                if (topView[ViewContainer.viewAutoHiddenKey]) {
                    topView.visible = true;
                    topView[ViewContainer.viewAutoHiddenKey] = false;
                }
                //处理页面返回时mainCity聊天框显示的问题
                if(DisplayLayer.MAIN == this._layer) {
                    if(topView.name == "app.homeland.MainCityDlg") {
                        topView = this.getChildAt(this.numChildren - 2) as any;
                    }
                    if(topView && topView.myDrawBg) {
                        // console.log("###topView=" + topView.name)
                        topView.myDrawBg();
                    }
                }
            }
        }
    }

    interface PopupMaskOptions {
        bgColor?: string;
        bgAlpha?: number;
        modalize?: boolean; // 是否模态化
    }

    var defaultPopupMaskOption: PopupMaskOptions = {}

    /**
     * 模式弹出框如果需要使用半透明背景，则使用本容器
     * 每个PopupMaskContainer实例只容纳一个对话框
     */
    class PopupMaskContainer extends Laya.View {
        private bgColor: string;
        private bgAlpha: number;

        constructor(opt?: PopupMaskOptions) {
            super();
            opt = opt || defaultPopupMaskOption;
            this.bgColor = opt.bgColor === undefined ? UIConfig.popupBgColor : opt.bgColor;
            this.bgAlpha = opt.bgAlpha === undefined ? UIConfig.popupBgAlpha : opt.bgAlpha; // 防止opt.bgAlpha设置为0
            // this.mouseEnabled = opt.modalize === undefined ? true : opt.modalize; // 隔离鼠标事件
            this.left = this.right = this.top = this.bottom = 0;
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.onCompResize();
        }

        protected onCompResize() {
            super.onCompResize();
            if (this.bgAlpha == 0)
                return;
            let black:Laya.Sprite = new Laya.Sprite();
            black.width = Laya.stage.width;
            black.height = Laya.stage.height;
            black.pos(-(this.width - 800) / 2, -(this.height - 600) / 2);
            this.addChild(black);
            black.alpha = 0;
            this.graphics.clear();
            this.graphics.drawRect(-(this.width - 800) / 2, -(this.height - 600) / 2,
            Laya.stage.width, Laya.stage.height, this.bgColor);
            this.alpha = this.bgAlpha;
            black.on(Laya.Event.CLICK, this, () => {});
        }
    }

    // 控制对话框出现的显示参数
    export interface ShowOptions {
        closeAllOther?: boolean, // 关闭本层的其他所有View
        closeCurrent?: boolean,  // 关闭当前的最顶层的View
        closeOnClick?: boolean,  // 是否点击空白区域即关闭，只用于popup
        animation?: number,      // view载入时效果
        params?: any[],          // 构造函数的参数
        black?: boolean,           //是否显示黑幕
        white?: boolean             //是否白
    }

    export enum MessageButton {
        Yes = 1,
        No = 2,
        YesNo = 3
    }

    export enum DialogResult {
        No,
        Yes
    }

    export enum DisplayLayer {
        MAIN,     // 主界面层
        POPUP,    // 弹出的模式对话框层
        TOAST,    // 文字消息层
        LOADING,  // 加载动画层
        SYSTEM    // 系统消息层
    }

    /**
     * 管理游戏中的所有界面，并按层来确定最主要的几个显示层级关系
     * 所有窗口界面的打开和关闭都必须通过DialogManger的show和close来进行，以便集中管理
     */
    class DialogManager {
        private static viewPopupMaskKey = '__popup_mask__';

        private _mainLayer: ViewContainer; // 主界面层
        // private _popupLayer: ViewContainer; // 弹出的模式对话框层
        // private _toastLayer: ViewContainer; // 文字消息层
        // private _loadingLayer: ViewContainer; // 加载动画层
        // private _systemLayer: ViewContainer; // 系统消息层
        private _layers: ViewContainer[];
        private _chain:Array<string> = [];
        private _lastView:Laya.View;

        init() {
            this._mainLayer = new ViewContainer(DisplayLayer.MAIN);
            // this._popupLayer = new ViewContainer(DisplayLayer.POPUP);
            // this._toastLayer = new ViewContainer(DisplayLayer.TOAST);
            // this._loadingLayer = new ViewContainer(DisplayLayer.LOADING);
            // this._systemLayer = new ViewContainer(DisplayLayer.SYSTEM);
            // this._layers = [this._mainLayer, this._popupLayer, this._toastLayer, this._loadingLayer, this._systemLayer];
            this._layers = [this._mainLayer];
            this._layers.forEach(layer => layer.mouseThrough = true);

            // this._mainLayer.zOrder = 20000;
            // this._popupLayer.zOrder = 20000;
            Laya.stage.addChild(this._mainLayer);
            // Laya.stage.addChild(this._popupLayer);
            // this.gamesp.addChild(this._toastLayer);
            // this.gamesp.addChild(this._loadingLayer);
            // this.gamesp.addChild(this._systemLayer);

            // Laya.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
        }

        private onStageResize() {
            // this._layers.forEach(layer => {
            //     layer.left = 0;
            //     layer.right = 0;
            //     // layer.top = layer.bottom = 0;
            //     //部分机型使用SCALE_FIXED_WIDTH的情况下需要
            //     layer.top = 0;
            //     layer.bottom = 0;//Laya.stage.height - 600;
            // });
        }

        show(view: Laya.View, layer: DisplayLayer, opt?: ShowOptions) {

            if ((layer == DisplayLayer.MAIN) || (layer == DisplayLayer.POPUP)){
                this._lastView = view;
            }
            let container = this._layers[layer];
            container.x = (Laya.stage.width - 800) / 2;
            container.y = (Laya.stage.height - 600) / 2;
            if (!container)
                return;
            let maskContainer: PopupMaskContainer;
            // if (layer == DisplayLayer.POPUP) {
            if(opt && opt.black) {
                maskContainer = new PopupMaskContainer({bgAlpha:0.7, bgColor:"#000000"});
                // this.mouseEnabled = opt.modalize === undefined ? true : opt.modalize; // 隔离鼠标事件
                // maskContainer.on(Laya.Event.CLICK, this, () => {
                //     msMoudle.toast("xxxx")
                // })
            //     if (opt && opt.closeOnClick) {
            //         if (!view.hasListener(Laya.Event.MOUSE_DOWN)) // 防止view区域的点击也自动关闭对话框
                        // view.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {e.stopPropagation()});
            //         maskContainer.on(Laya.Event.MOUSE_DOWN, this, () => {this.close(view)});
            //     }
            // } else if (layer == DisplayLayer.LOADING) {
            //     maskContainer = new PopupMaskContainer({bgAlpha: 0.3});
            }
            if(opt && opt.white) {
                maskContainer = new PopupMaskContainer({bgAlpha:0.01, bgColor:"#000000"});
            }
            if (maskContainer) {
                // maskContainer.width = Laya.stage.width;
                // maskContainer.height = Laya.stage.height;
                // maskContainer.mouseEnabled = true;
                // maskContainer.mouseThrough = false;
                // maskContainer.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                //     msMoudle.toast("yyyy")
                //     // e.stopPropagation();
                // });

                container.add(maskContainer, opt); // 这里先传递opt, 并且只传递一次
                container.add(view);
                view[DialogManager.viewPopupMaskKey] = maskContainer;
                // if (layer == DisplayLayer.POPUP) {
                //     Laya.Tween.from(view,
                //         {
                //             y: 100,
                //             alpha:0.5

                //         }, 50,Laya.Ease.elasticOut);
                // }
                // else {
                //     Laya.Tween.from(view,
                //         {
                //             alpha:0.3

                //         }, 100,Laya.Ease.elasticOut);
                // }
            } else {
                container.add(view, opt);
            }
        }

        close(view: Laya.View, result: DialogResult = DialogResult.No, data?: any, onlyRemove?:boolean) {
            let mask = view[DialogManager.viewPopupMaskKey];
            if (mask) {
                (mask as PopupMaskContainer).removeSelf();
            }
            if (view.parent) {
                if ((view.parent == this._mainLayer)){
                    this.popDlgByName(view.name);
                }

                (view.parent as ViewContainer).remove(view,onlyRemove);
            } else {
                view.removeSelf();
            }

            view.event(Laya.Event.CLOSE, data === undefined ? result : [result, data]);
        }

        closeAllPopUp() {
            // let numChildren = this._popupLayer.numChildren;
            // // console.log("closeallpop, numChildren=" + numChildren);
            // for(let i=0; i<numChildren; ++i) {
            //     let child = this._popupLayer.getChildAt(i);
            //     if(child != null) {
            //         // console.log("get child" + child.name)
            //         if(child[DialogManager.viewPopupMaskKey]) {
            //             // console.log("remove child" + child.name);
            //             (child[DialogManager.viewPopupMaskKey] as PopupMaskContainer).removeSelf();
            //             this._popupLayer.remove(child as Laya.View, true);
            //         }
            //     }
            // }
            // this._chain.length = 0;
        }

        getDisplayLayer(view: Laya.View): DisplayLayer {
            let parent = view.parent;
            if (parent instanceof PopupMaskContainer)
                parent = parent.parent;
            if (parent instanceof ViewContainer)
                return (<ViewContainer>parent).layer;
            return undefined;
        }

        getDialogByName(dlgName: string): any {
            let dlg: BaseView = null;
            for(let i=0; i<this._mainLayer.numChildren; ++i) {
                let tmp = this._mainLayer.getChildAt(i);
                if(tmp.name == dlgName) {
                    return {dlg:tmp, isPopup:false};
                }
            }
            // for(let i=0; i<this._popupLayer.numChildren; ++i) {
            //     let tmp = this._popupLayer.getChildAt(i);
            //     if(tmp.name == dlgName) {
            //         return {dlg:tmp, isPopup:true};
            //     }
            // }
            return null;
        }

        getDialogByIndex(index: number): any {
            return this._layers[index];
        }

        get lastView():Laya.View{
            return this._lastView;
        }

        get topView():Laya.View{
            if(this._mainLayer.numChildren > 1) return this._mainLayer.getChildAt(this._mainLayer.numChildren - 2) as Laya.View;
            return null;
        }

        pushDlg(className:string){
            this._chain.push(className);
        }

        popDlg(){
            this._chain.pop();
        }

        popDlgByName(name ?: string){
            for(let i=0;i<this._chain.length;++i) {
                if(name == this._chain[i]) {
                    for(let j=i;j<this._chain.length-1;++j) {
                        this._chain[j] = this._chain[j+1];
                    }
                    this._chain.pop();
                    break;
                }
            }
        }

        lastDlg():string{
            // return _.last(this._chain);
            if(this._chain.length > 0)
                return this._chain[this._chain.length - 1];
            return "";
        }

        get popDlgNum():number{
            let container = this._layers[DisplayLayer.POPUP];
            return container.numChildren;
        }

    }

    function isViewFullScreen(view: Laya.View): boolean {
        return view.left === 0 && view.right === 0 && view.top === 0 && view.bottom === 0
            && (isNaN(view.alpha) || view.alpha == 1);
    }

    function internalShowDialog<T extends BaseDialog>(c: {new(...params: any[]): T, className: string}, layer: DisplayLayer, opt?: ShowOptions): P.Promise<T> {
        let d = P.defer<T>();
        let params = opt && opt.params;
        let atlas = c.prototype.constructor.uiResMap;
        createDialog();
        return d.promise();

        function createDialog() {
            if ((c.className!="ui.MessageBox")&&(c.className == manager.lastDlg())){
                console.log("reject,might be double click " + c.className);
                d.reject({message:"already added"});
            }else{
                let dlg = new c(...params);
                dlg.name = c.className;
                manager.show(dlg, layer, opt);
                if ((layer == DisplayLayer.MAIN) || (layer == DisplayLayer.POPUP)){
                    manager.pushDlg(c.className);
                }
                d.resolve(dlg);
            }
        }
    }

    var messageBoxImpl: {new(...parmas: any[]): BaseDialog, className: string};
    export function setMessageBoxImpl<T extends BaseDialog>(impl: {new(...params: any[]): T, className: string}) {
        messageBoxImpl = impl;
    }

    export function show<T extends BaseDialog>(c: {new(...params: any[]): T, className: string}, opt?: ShowOptions): P.Promise<T> {
        return internalShowDialog(c, DisplayLayer.MAIN, opt);
    }

    export function popup<T extends BaseDialog>(c: {new(...params: any[]): T, className: string}, opt?: ShowOptions): P.Promise<T> {
        return internalShowDialog(c, DisplayLayer.POPUP, opt);
    }

    export function msgBox(msg: string, type: MessageButton = MessageButton.Yes, cb?: (r: DialogResult) => void) {
        if (!messageBoxImpl) throw "setMessageBoxImpl is not called";
        internalShowDialog(messageBoxImpl, DisplayLayer.POPUP, {params: [msg, type],animation:1}).done(dlg => {
            cb && dlg.on(Laya.Event.CLOSE, this, cb);
        });
    }

    export function showSysDialog<T extends BaseDialog>(c: {new(...params: any[]): T, className: string}, opt?: ShowOptions): P.Promise<T> {
        return internalShowDialog(c, DisplayLayer.SYSTEM, opt);
    }

    interface LoadingCloser {
        (): void;
    }

    export var manager = new DialogManager();
}
