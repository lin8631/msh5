namespace app.model {

    export enum FieldType {
        Number,
        String,
        Array,
        Object
    }

    export interface FieldInfo {
        name: string;
        type: FieldType; // 目前未使用
    }


    export class Base extends Laya.EventDispatcher {

        update<T extends Base>(data: any, notify = true) {
            if(data == null) return;
            let fieldMap = (this.constructor as any).FIELD_MAP;
            if (!fieldMap)
                return;
            for (let key in fieldMap) {
                let value = data[key];
                if (value == null)
                    continue;

                let field = (this as any)[fieldMap[key].name];
                if (field instanceof Base) {
                    (field as Base).update(value);
                } else {
                    (this as any)[key] = value;
                }
            }

            if (this.fillConfig) this.fillConfig();

            if (notify) {
                this.event(Laya.Event.CHANGED);
            }
        }

        fillConfig() {

        }

    }

    export class IndexedMap<T extends Base, K> extends Base {
        private indexName: string; // 用作唯一索引的字段的名字
        private map: any = {};
        private creator: {new(): T};

        constructor(c: {new(): T}, indexName: string) {
            super();
            this.creator = c;
            this.indexName = indexName;
        }

        add(obj: T) {
            this.map[(obj as any)[this.indexName]] = obj;
        }

        removeAll(){

            if (this.map){
                delete this.map;
                this.map = {};
            }
        }

        remove(key: K | T) {
            if (key instanceof Base) {
                delete this.map[(key as any)[this.indexName]];
            } else {
                delete this.map[key as any];
            }
        }

        get(key: K): T {
            return this.map[key as any];
        }

        find(obj:any): T {
            return _.find(this.map,obj) as T;
        }

        sort(type:string = this.indexName, func:string = 'desc'): T[] {
            if (type){
                return <T[]>_.orderBy(this.map, [type],[func]);
            }else{
                return <T[]>_.sortBy(this.map, [this.indexName]);
            }
        }

        filter(predicate: (o: T) => boolean): T[] {
            let result: T[] = [];
            for (let key in this.map) {
                let value = this.map[key];
                if (predicate(value)) {
                    result.push(value);
                }
            }
            return result;
        }

        /** 获取长度 */
        length():number{
            return _.size(this.map);
        }

        /** 遍历 */
        forEach(cb:(k:K, v:T)=>void, ctx?:any) {
            for (let key in this.map) {
                let v = this.map[key];
                cb.call(ctx, key, v);
            }

        }

        each(iteratee: (o: T) => boolean | void) {
            for (let key in this.map) {
                if (iteratee(this.map[key])) {
                    break;
                }
            }
        }

        update(data: any, notify = true) {
            if (!Array.isArray(data))
                return;
            data.forEach((msg: any) => {
                let msgObj = msg;
                if (typeof msg !== "object") {
                    msgObj = {};
                    msgObj[this.indexName] = msg;
                }
                let obj = this.get(msgObj[this.indexName])
                if (!obj) {
                    obj = new this.creator();
                    obj.update(msgObj, false);

                    this.add(obj);
                } else {
                    obj.update(msgObj, false);
                }
            });
            if (notify) {
                this.event(Laya.Event.CHANGED);
            }
        }
    }

    export function field(src?: string, type?: FieldType): (target: any, key: string) => void {
        return function(target: any, key: string) {
            src = src || key;
            type = type || FieldType.Number;
            let fieldMap = target.constructor.FIELD_MAP;
            if (!fieldMap)
                fieldMap = target.constructor.FIELD_MAP = {};
            fieldMap[src] = {name: key, type: type};
        }
    }

}
