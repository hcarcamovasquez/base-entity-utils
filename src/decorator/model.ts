import {v4, v5} from "uuid";
import {BaseIdIdentification, BaseUuidIdentification} from "../interfaces/metadata";

export enum IdNameEnum {
    uuid = 'uuid',
    id = 'id'
}

export const model = (idNameEnum?: keyof typeof IdNameEnum, seed?: string) => {

    switch (idNameEnum) {
        case IdNameEnum.id:
            return id(seed)
        case IdNameEnum.uuid:
            return uuid(seed)
        default:
            return;
    }

}

const id = (seed?: string) => {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {

        return class extends constructor implements BaseIdIdentification {
            readonly id = seed ? v5(seed, v4()) : v4();
            readonly createdAt = new Date().toISOString();
            readonly updatedAt = new Date().toISOString();
        }
    }
}

const uuid = (seed?: string) => {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {

        return class extends constructor implements BaseUuidIdentification {
            readonly uuid = seed ? v5(seed, v4()) : v4();
            readonly createdAt = new Date().toISOString();
            readonly updatedAt = new Date().toISOString();
        }
    }
}
