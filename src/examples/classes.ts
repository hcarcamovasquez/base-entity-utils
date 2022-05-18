import {Base} from "../classes/base";
import {model} from "../decorator/model";

@model('id')
export class Demo extends Base<Demo> {

    public readonly name: string
    public readonly optional?: string
    public readonly arr?: string[]
    public readonly util?: DemoUtil
    public readonly utils?: DemoUtil[]
}

export class DemoUtil extends Base<DemoUtil> {
    public readonly name: string
    public readonly arr?: string[]
}
