export type metadata = 'createdAt' | 'updatedAt'
export type omitConstructorAttributes = 'id' | 'uuid'|'transform' | 'validate' | 'stringify' | 'toJSON' | metadata
export type omitCopyOf = 'transform' | 'validate' | 'stringify' | 'toJSON' | metadata

export type  draft<T> = Omit<Partial<T>, omitCopyOf>
export type  omitConstructor<Entity> =  Omit<Partial<Entity>, omitConstructorAttributes>
