class Args {
    public static sliceArray(args: any[]): Array<any> {
        let i = args.length - 1;

        for (; i >= 0; i--) {
            if (args[i]) {
                break;
            }
        }

        return args.slice(0, ++i);
    }
}

export {Args}