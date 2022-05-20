import 'reflect-metadata'
import {ClassTransformOptions, instanceToPlain, plainToClassFromExist} from "class-transformer";
import {validateOrReject} from "class-validator";
import {draft, omitConstructor} from "../types/entity-utils.types";
import {Metadata} from "../interfaces/metadata";

export class Base<Entity> implements Metadata {

    readonly createdAt: string;
    readonly updatedAt: string;

    constructor(init: string | omitConstructor<Entity>) {
        if (!init) {
            return;
        }
        this.transform(init)
    }

    private transform(data, options: ClassTransformOptions = {ignoreDecorators: true}): void {

        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch {
            }
        }

        if (typeof data === 'object') {
            plainToClassFromExist(this, JSON.parse(JSON.stringify(data)), options);
        }
    }

    static copyOf<T>(entity: T, updated: draft<T>): T {

        const updatedInmutable = plainToClassFromExist({}, updated, {ignoreDecorators: true})
        console.log('entity.hasOwnProperty(\'createdAt\')', entity.hasOwnProperty('createdAt'))
        if (entity.hasOwnProperty('createdAt')) {
            Object.assign(updatedInmutable, {updatedAt: new Date().toISOString()})
        }

        const e = Base.assign(entity, updatedInmutable) as T

        Object.freeze(entity)

        return e
    }


    private static assign<T>(obj: any, newData: object): T {
        let result;
        const proto = Object.getPrototypeOf(obj);
        if (proto === null) {
            result = Object.create(null)
        } else if (obj.constructor !== Object) {
            result = new obj.constructor()
        } else if (proto !== Object.prototype) {
            result = Object.create(proto);
        } else {
            result = obj.constructor();
        }

        for (const key of Reflect.ownKeys(newData)) {
            if (obj[key] !== newData[key]) {

                if (typeof newData[key] !== 'object' ||
                    Reflect.ownKeys(newData[key]).length === 0 ||
                    Array.isArray(Reflect.ownKeys(newData[key]))
                ) {
                    result[key] = newData[key];

                } else {
                    result[key] = Base.assign(obj[key], newData[key]);
                }
            }

        }
        for (let key of Reflect.ownKeys(obj)) {
            if (typeof result[key] === 'undefined') {
                result[key] = obj[key];
            }
        }
        return result;
    }


    public validate(): Promise<void> {
        return validateOrReject(this);
    }

    public stringify(options?: ClassTransformOptions): string {
        return JSON.stringify(this.toJSON(options));
    }

    public toJSON(options: ClassTransformOptions = {ignoreDecorators: true}): Record<string, any> {
        return instanceToPlain(this, options);
    }

}
