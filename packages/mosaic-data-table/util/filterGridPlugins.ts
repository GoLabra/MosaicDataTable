import { MosaicDataTablePlugin } from "../types/table-types";

export function filterGridPlugins<T>(
    plugins: MosaicDataTablePlugin[] | undefined,
    filterType: string
): T[] {
    if (!plugins) {
        return [];
    }
    return plugins.filter((plugin) => {
        if (typeof plugin.type === 'string') {
            return plugin.type === filterType;
        }
        return plugin.type.includes(filterType);
    }) as T[];
}
