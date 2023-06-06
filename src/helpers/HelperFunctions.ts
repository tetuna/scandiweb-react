type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] };

//Remove empty string value keys from Data object function() Start
export function removeEmptyKeysObj<T extends {}, V = Valuable<T>,>(obj: T): V {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([, v]) =>
                !(
                    (typeof v === 'string' && !v.length) ||
                    v === null ||
                    typeof v === 'undefined'
                ),
        ),
    ) as V;
}
//Remove empty string value keys from Data object function() End