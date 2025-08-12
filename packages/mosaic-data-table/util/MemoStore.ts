type MemoStoreType = {
    [key: string]: {
        lastArgs: any[],
        result: any
    };
}

const isEqual = (newArgs?: any[], lastArgs?: any[]) => {

    if(!newArgs && !lastArgs){
        return true;
    }

    if (!newArgs || !lastArgs) {
        return false;
    }

    if (newArgs.length !== lastArgs.length) {
        return false;
    }
    for (let i = 0; i < newArgs.length; i++) {
        if (newArgs[i] !== lastArgs[i]) {
            return false;
        }
    }
    return true;
}

export class MemoStore {

    private store: MemoStoreType = {};
    
    public memoFunction = <TFunc extends (...args: any[]) => any>(key: string, fn: TFunc) => {
        return (...args: Parameters<TFunc>) => {
            
            const isFirstCall = !this.store[key] ? true : false;

            const lastArgs = this.store[key]?.lastArgs;
            
            if (!isFirstCall && isEqual(args, lastArgs)) {
                return this.store[key]?.result;
            }

            const newResult = fn?.(...args);
            this.store = {
                ...this.store,
                [key]: {
                    lastArgs: args,
                    result: newResult
                }
            };
            return newResult;
        }
    };

	public getState = (key: string) => {
		return this.store[key]?.result;
	}

    public clear = (key?: string) => {
        
        if (!key) {
            this.store = {};
            return;
        }

        delete this.store[key];
    };
}