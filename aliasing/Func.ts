module TSFunq {
    export type Func<T1, TResult> = (arg1: T1) => TResult;
    export type Action<T1, T2> = (arg1: T1, arg2: T2) => void;
}
