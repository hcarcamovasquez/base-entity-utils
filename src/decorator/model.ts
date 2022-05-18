import {v4, v5} from "uuid";

export enum IdNameEnum {
    uuid = 'uuid',
    id = 'id'
}

export const model = (idNameEnum: IdNameEnum | keyof typeof IdNameEnum, seed?: string) => {

    switch (idNameEnum){
        case IdNameEnum.id: return id(seed)
        case IdNameEnum.uuid: return uuid(seed)
    }

}

const id = (seed?: string) => {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {

        return class extends constructor {
            readonly [IdNameEnum.id] = seed ? v5(seed,v4()) : v4();
        }
    }
}

const uuid = (seed?: string) => {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {

        return class extends constructor {
            readonly [IdNameEnum.uuid] = seed ? v5(seed,v4()) : v4();
        }
    }
}
