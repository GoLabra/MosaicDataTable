import { MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyCellRenderPlugin, MosaicDataTableBodyCellStylePlugin, MosaicDataTableBodyExtraRowEndPlugin, MosaicDataTableBodyExtraRowStartPlugin, MosaicDataTableBodyPropsPlugin, MosaicDataTableBodyRenderPlugin, MosaicDataTableBodyRowCellPropsPlugin, MosaicDataTableBodyRowPropsPlugin, MosaicDataTableBodyRowRenderPlugin, MosaicDataTableBodyRowStylePlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadExtraRowStartPlugin, MosaicDataTableHeadPropsPlugin, MosaicDataTableHeadRowCellPropsPlugin, MosaicDataTableHeadRowPropsPlugin, MosaicDataTableHeadRowRenderPlugin, MosaicDataTableHeadRowStylePlugin, MosaicDataTablePlugin, MosaicDataTablePropsPlugin, PluginMap } from "../types/table-types";

export function filterGridPlugins<T>(
    plugins: MosaicDataTablePlugin[] | undefined,
    filterType: string,
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



export function filterGridPluginsByColumnScope<T>(
    plugins: MosaicDataTablePlugin[] | undefined,
    columnScopePropName: string,
    columnId: string | Array<string>
): T[] {
    if (!plugins) {
        return [];
    }
    return plugins.filter((plugin: any) => {
        if(!plugin[columnScopePropName]){
            return true;
        }

        if (typeof plugin[columnScopePropName] === 'string') {
            return plugin[columnScopePropName] === columnId;
        }
        return plugin[columnScopePropName].includes(columnId);
    }) as T[];
}


export const getPluginMap = (plugins: MosaicDataTablePlugin[] | undefined): PluginMap => {
    const map: PluginMap = {
        gridColumns: filterGridPlugins<MosaicDataTableGridColumnsPlugin>(plugins, 'grid-columns'),
        bodyRender: filterGridPlugins<MosaicDataTableBodyRenderPlugin>(plugins, 'body-render'),
        headRowRender: filterGridPlugins<MosaicDataTableHeadRowRenderPlugin>(plugins, 'head-row-render'),
        bodyRowRender: filterGridPlugins<MosaicDataTableBodyRowRenderPlugin>(plugins, 'body-row-render'),
        headCellRender: filterGridPlugins<MosaicDataTableHeadCellRenderPlugin>(plugins, 'head-cell-render'),
        bodyCellRender: filterGridPlugins<MosaicDataTableBodyCellRenderPlugin>(plugins, 'body-cell-render'),
        headCellContentRender: filterGridPlugins<MosaicDataTableHeadCellContentRenderPlugin>(plugins, 'head-cell-content-render'),
        bodyCellContentRender: filterGridPlugins<MosaicDataTableBodyCellContentRenderPlugin>(plugins, 'body-cell-content-render'),
        headRowStyle: filterGridPlugins<MosaicDataTableHeadRowStylePlugin>(plugins, 'head-row-style'),
        bodyRowStyle: filterGridPlugins<MosaicDataTableBodyRowStylePlugin>(plugins, 'body-row-style'),
        headCellStyle: filterGridPlugins<MosaicDataTableHeadCellStylePlugin>(plugins, 'head-cell-style'),
        bodyCellStyle: filterGridPlugins<MosaicDataTableBodyCellStylePlugin>(plugins, 'body-cell-style'),
        headExtraRowStart: filterGridPlugins<MosaicDataTableHeadExtraRowStartPlugin>(plugins, 'head-extra-row-start'),
        headExtraRowEnd: filterGridPlugins<MosaicDataTableHeadExtraRowEndPlugin>(plugins, 'head-extra-row-end'),
        bodyExtraRowStart: filterGridPlugins<MosaicDataTableBodyExtraRowStartPlugin>(plugins, 'body-extra-row-start'),
        bodyExtraRowEnd: filterGridPlugins<MosaicDataTableBodyExtraRowEndPlugin>(plugins, 'body-extra-row-end'),
        tableProps: filterGridPlugins<MosaicDataTablePropsPlugin>(plugins, 'table-props'),
        bodyProps: filterGridPlugins<MosaicDataTableBodyPropsPlugin>(plugins, 'body-props'),
        bodyRowProps: filterGridPlugins<MosaicDataTableBodyRowPropsPlugin>(plugins, 'body-row-props'),
        bodyRowCellProps: filterGridPlugins<MosaicDataTableBodyRowCellPropsPlugin>(plugins, 'body-row-cell-props'),
        headProps: filterGridPlugins<MosaicDataTableHeadPropsPlugin>(plugins, 'head-props'),
        headRowProps: filterGridPlugins<MosaicDataTableHeadRowPropsPlugin>(plugins, 'head-row-props'),
        headRowCellProps: filterGridPlugins<MosaicDataTableHeadRowCellPropsPlugin>(plugins,'head-row-cell-props')  
    }
    
    return map;
}