import { MosaicDataTablePlugin } from "../types/table-types";

export function filterGridPlugins<T>(
    plugins: MosaicDataTablePlugin[] | undefined,
    filterType: string
): T[] {
    if (!plugins) {
        return [];
    }
    return plugins.filter((plugin) => {
        if (typeof plugin.scope === 'string') {
            return plugin.scope === filterType;
        }
        return plugin.scope.includes(filterType);
    }) as T[];
}
