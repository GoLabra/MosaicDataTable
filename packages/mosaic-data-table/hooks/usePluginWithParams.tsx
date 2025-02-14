import { useMemo } from "react";
import { GetFunctionParams } from "../types/table-types";
import { useMemoDebugger } from "../util/use-debug";

export function usePluginWithParams<F extends (params: any) => any>(
    fn: F,
    params: GetFunctionParams<F>
) {

    const plugin = useMemo(() => fn(params), [...Object.values(params)]);
    return plugin;
}


