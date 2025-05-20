namespace ui {
    export class CellView extends BaseView {
        static EVENT_CHILD_VIEW_CLICK = '__cell_child_view_click__';
        _index: number;

        updateData<T>(data: T,index?:number) {
        }

        // 把所有子控件的事件路由给ListView
        registerEvents(eventsInfo: {[compName: string]: string[]}) {
            for (let compName in eventsInfo) {
                let comp = (this as any)[compName] as Laya.Node;
                let events = eventsInfo[compName];
                events.forEach(event => {
                    if (event === "click") {
                        comp.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                            let parent = comp.parent;
                            while(!(parent instanceof ListView) && parent != null)
                                parent = parent.parent;
                            if (parent == null)
                                return;
                            parent.event(CellView.EVENT_CHILD_VIEW_CLICK, [e, this._index, compName]);
                        });
                    }
                });
            }
        }
    }

    export class ListView extends Laya.List {
        set dataModel(value: any[]) {
            this.array = value;
        }

        get dataModel(): any[] {
            return this._array;
        }

        protected renderItem(cell: CellView, index: number): void {
            if (index >= 0 && index < this._array.length) {
                cell.visible = true;
                cell._index = index;
                cell.updateData(this._array[index],index);
            } else {
                cell.visible = false;
            }
        }

        protected addCell(cell: CellView): void {
            // 不调用super，避免注册过多事件
            // 此时cell已经添加到ListView中了
            cell.visible = false;
            cell.on(Laya.Event.CLICK, this, this.onCellMouse);
            this._cells.push(cell);
        }
    }
}
