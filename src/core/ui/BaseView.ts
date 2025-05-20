namespace ui {
    export class BaseView extends Laya.View {
        loadingCb: any = null;
        customEvents: any[] = [];

        constructor() {
            super();
            // 由于类成员的默认初始化总是在constructor之后，所以initialize函数调用时机可能会有问题
            // 这里重新引入onInitialize来避免上述问题
            Laya.timer.callLater(this, this.onInitialize);
        }

        protected onInitialize() {
        }

        protected registerEvents(eventsInfo: {[compName: string]: string[]}) {
            for (let compName in eventsInfo) {
                let comp = (this as any)[compName];
                let upCompName = compName.charAt(0).toUpperCase() + compName.slice(1);
                let events = eventsInfo[compName];
                events.forEach(event => {
                    let method = (<any>this)["on" + upCompName + event.charAt(0).toUpperCase() + event.slice(1)];
                    if (!method)
                        return;
                    if (event === "click") {
                        let sizeX:number = comp.scaleX;
                        let sizeY:number = comp.scaleY;
                        comp.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                            comp.scale(sizeX * 1.1, sizeX * 1.1);
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            // this.scale(3, 3);
                            // method.call(this, e);

                        });
                        comp.on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {
                            // comp.scale(1, 1);
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            // method.call(this, e);
                            // comp.scale(1.1, 1.1);
                        });
                        comp.on(Laya.Event.MOUSE_UP, this, (e: Laya.Event) => {
                            comp.scale(sizeX, sizeY);
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            // method.call(this, e);

                        });
                        comp.on(Laya.Event.MOUSE_OUT, this, (e: Laya.Event) => {
                            comp.scale(sizeX, sizeY);
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            // method.call(this, e);

                        });
                        comp.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                            comp.scale(sizeX, sizeY);
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            method.call(this, e);
                        });
                    }
                    if (event === "click2") {
                        comp.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                            e.stopPropagation(); // 自动屏蔽事件传递
                            //console.log(`${compName} clicked`);
                            method.call(this, e);
                        });
                    }
                    else if (event === "select") {
                        comp.selectHandler = new Laya.Handler(this, (index: number) => {
                            //console.log(`${compName} cell ${index} selected`);
                            method.call(this, index);
                        });
                    } else if (event === "cellClick") {
                        comp.mouseHandler = new Laya.Handler(this, (e: Laya.Event, index: number) => {
                            //console.log(`${compName} cell ${index} clicked`);
                            method.call(this, e, index);
                        });
                    } else if (event === "cellChildClick") {
                        comp.on(CellView.EVENT_CHILD_VIEW_CLICK, this, (e: Laya.Event, index: number, childVarName: string) => {
                            e.stopPropagation();
                            // console.log(`cell ${index} ${childVarName} clicked`);
                            method.call(this, e, index, childVarName);
                        });
                    } else if (event === "change" && comp instanceof Laya.TextInput) {
                        comp.on(Laya.Event.FOCUS, this, () => {
                            let oldValue = (comp as Laya.TextInput).text;
                            comp.once(Laya.Event.BLUR, this, () => {
                                let newValue = (comp as Laya.TextInput).text;
                                if (newValue !== oldValue) {
                                    method.call(this, oldValue, newValue);
                                }
                            });
                        });
                    }
                });
            }
        }

        onClose() {
        }

    }
}
