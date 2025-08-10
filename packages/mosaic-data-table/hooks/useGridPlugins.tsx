import { useMemo } from "react";
import { MosaicDataTablePlugin } from "../types/table-types";

export const useGridPlugins = (...plugins: MosaicDataTablePlugin[]) => {

    const gridPlugins = useMemo(() => {
        return plugins;
    }, [...plugins]);

    return gridPlugins;
}
