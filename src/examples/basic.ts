import {Base} from "../classes/base";
import {model} from "../decorator/model";

@model('uuid')
export class Demo extends Base<Demo> {

    public readonly uuid: string;
    public readonly name: string
    public readonly optional?: string
    public readonly arr?: string[]
    public readonly util?: DemoUtil
    public readonly simple?: DemoSimple
}

@model('id')
export class DemoUtil extends Base<DemoUtil> {

    public readonly uuid: string;
    public readonly name: string
    public readonly arr?: string[]
}

export class DemoSimple {
    public readonly name: string

    constructor(name: string) {
        this.name = name
    }
}

const name = new Demo({
    name: 'Lorem Ipsum',
    optional: 'es simplemente el texto de relleno de las imprentas y archivos de texto',
    arr: ['párrafos', 'palabras'],
    util: new DemoUtil({
        name: 'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles',
        arr: ['seguro ', 'texto', 'agregado '],
    }),
    simple: new DemoSimple('escondido en el medio del texto'),
})

console.log(name)
Object.freeze(name)


setTimeout(() => {
    const hola = Demo
        .copyOf<Demo>(name, {
            name: 'Aldus PageMaker, el cual incluye versiones de Lorem Ipsum',
            arr: ['viene'],
            util: new DemoUtil({
                name: '¿Dónde puedo conseguirlo?',
                arr: ['6556656', '343343', 'dwd', 'djdwjdw'],
            }),
            simple: new DemoSimple('El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras')
        })
    Object.freeze(name)
    console.log(hola)
}, 1000)


console.log(new Demo({
    name: 'Lorem Ipsum',
    optional: 'es simplemente el texto de relleno de las imprentas y archivos de texto',
    arr: ['párrafos', 'palabras']
}))


console.log(new DemoSimple('El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras'))
