# Mosaic Data Table

A lightweight, extensible React data table library built with Material-UI. The core table functionality can be enhanced through a powerful plugin system.

## Features

- 🔌 Plugin-based architecture
- 📦 Small core with extensible functionality
- 🎨 Material-UI based styling
- 🚀 TypeScript support

## Demo 
[MosaicDataTable Demo](https://golabra.github.io/MosaicDataTable/)

## Installation

```bash
npm install mosaic-data-table
# or
yarn add mosaic-data-table
```

## Basic Usage

```
import { MosaicDataTable, useGridPlugins, CustomBodyCellContentRenderPlugin} from 'mosaic-data-table';

function MyTable() {

  const headCells = [{
      id: 'id',
      header: 'ID',
      cell: (row: any) => row.id,
  },{
      id: 'name',
      header: 'Name',
      cell: (row: any) => row.name,
  }];


  const items = [{
      id: 1,
      name: 'John Doe'
  },{
      id: 2,
      name: 'Jane Doe'
  }]

  const gridPlugins = useGridPlugins(
    CustomBodyCellContentRenderPlugin // process the 'render' function
  );

  return (
    <MosaicDataTable
      plugins={gridPlugins}
      headCells={headCells}
      items={items}
    />
  );
}
```

## Built-in Plugins

Plugins can be combined to add specific functionality to your table. The order of plugins matters as they are applied sequentially.

- CustomBodyCellContentRenderPlugin

    Enables custom cell content rendering

    **Note:** In future versions, alternative rendering methods will be available, such as automatic value retrieval based on cell ID and smart content type detection. For now, this plugin is required and must be included first in the plugins list.

- FilterRowPlugin

    Adds filter row

    ```
    usePluginWithParams(FilterRowPlugin, {
        visible?: boolean;
        filterChanged: (filter: Filter) => void;
        filter: Filter;
        filterColumns: Record<string, ColumnDefFilter>;
        key: string;
    })
    ```   

- SummaryRowPlugin

    Adds summary row. You can add as many summary rows as you want

    ```
    usePluginWithParams(SummaryRowPlugin, {
        visible?: boolean,
        summaryColumns: Record<string, string | ReactNode | ((row: any) => string | ReactNode)>,
        key: string
    })
    ```   

- PaddingPlugin

    Handles table cell padding

- ColumnSortPlugin

    Enables column sorting functionality

    ```
    usePluginWithParams(ColumnSortPlugin, {
        order: 'asc' | 'desc',
        orderBy: string,
        onSort: (sortBy: string, sortOrder: Order) => void
    })
    ```
- RowSelectionPlugin

    Adds row selection capabilities

    ```
    usePluginWithParams(RowSelectionPlugin, {
        visible?: boolean,
        onGetRowId: (row: any) => any,
        onSelectOne: (id: any) => void,
        onDeselectOne: (id: any) => void,
        selectedIds: any[]
    })
    ```

- RowExpansionPlugin

    Enables expandable rows

    ```
    usePluginWithParams(RowExpansionPlugin, {
        showExpanderButton: boolean,
        onGetRowId: (row: any) => any,
        expansionStore: RowExpansionStore,
        getExpansionNode: (row: any, params: any) => ReactNode
    })
    ```

- ColumnsFillRowSpacePlugin
    Handles column spacing and layout

- RowActionsPlugin

    Adds action buttons/menu to rows

    ```
    usePluginWithParams(RowActionsPlugin, {
        actions: Action[]
    })
    ```

- HighlightColumnPlugin

    Enables column highlighting

    ```
    usePluginWithParams(HighlightColumnPlugin, {
        isColumnHighlighted: (headCellId: string) => boolean
    })
    ```

- HighlightRowPlugin

    Enables row highlighting

    ```
    usePluginWithParams(HighlightRowPlugin, {
        isRowHighlighted: (row: any) => boolean
    })
    ```

- PinnedColumnsPlugin

    Enables column pinning functionality


- SkeletonLoadingPlugin

    Adds loading state visualization

    ```
    usePluginWithParams(SkeletonLoadingPlugin, {
        isLoading: boolean,
        rowsWhenEmpty?: number
    })
    ```

- EmptyDataPlugin

    Handles empty state display

    ```
    usePluginWithParams(EmptyDataPlugin, {
        content?: ReactNode
    })
    ```

## Make your own plugins

-  To create a plugin, implement one or more of these interfaces. Each plugin can combine multiple functionalities by implementing multiple interfaces. For example, a plugin can implement both MosaicDataTableBodyRowStylePlugin and MosaicDataTableBodyCellStylePlugin to provide comprehensive row and cell styling. 

* You can refer to the built-in plugins in the source code at: https://github.com/GoLabra/MosaicDataTable/tree/main/packages/mosaic-data-table/plugins
     
     ```
     Example combining multiple plugin types:
     export const RedCellPlugin: MosaicDataTableBodyCellStylePlugin  =  {
        type: 'body-cell-style',
        getBodyCellStyle: (row: any, gridApi: GridApi): SxProps<Theme> => {
            debugger;
            return { backgroundColor: '#ff000070 !important' };
        }
    }
     ```
    

Plugin Interfaces for MosaicDataTable
 
 * MosaicDataTableGridColumnsPlugin - Modifies or filters the columns displayed in the grid
    
    type: 'grid-columns'
 
 * MosaicDataTableBodyRenderPlugin - Custom rendering of the entire table body
    
    type: 'body-render'
 
 * MosaicDataTableHeadRowRenderPlugin - Custom rendering of header row
  
    type: 'head-row-render'
 
 * MosaicDataTableBodyRowRenderPlugin - Custom rendering of body rows
    
    type: 'body-row-render'
 
 * MosaicDataTableHeadCellRenderPlugin - Custom rendering of header cells
    
    type: 'head-cell-render'
 
 * MosaicDataTableBodyCellRenderPlugin - Custom rendering of body cells
    
    type: 'body-cell-render'
 
 * MosaicDataTableHeadCellContentRenderPlugin - Custom rendering of header cell content
    
    type: 'head-cell-content-render'
 
 * MosaicDataTableBodyCellContentRenderPlugin - Custom rendering of body cell content
    
    type: 'body-cell-content-render'
 
 * MosaicDataTableHeadRowStylePlugin - Custom styling for header rows
    
    type: 'head-row-style'
 
 * MosaicDataTableBodyRowStylePlugin - Custom styling for body rows
    
    type: 'body-row-style'
 
 * MosaicDataTableHeadCellStylePlugin - Custom styling for header cells
    
    type: 'head-cell-style'
 
 * MosaicDataTableBodyCellStylePlugin - Custom styling for body cells
    
    type: 'body-cell-style'
 
 * MosaicDataTableHeadExtraRowStartPlugin - Add content before header rows
    
    type: 'head-extra-row-start'
 
 * MosaicDataTableHeadExtraRowEndPlugin - Add content after header rows
    
    type: 'head-extra-row-end'
 
 * MosaicDataTableBodyExtraRowStartPlugin - Add content before body rows
    
    type: 'body-extra-row-start'
 
 * MosaicDataTableBodyExtraRowEndPlugin - Add content after body rows
    
    type: 'body-extra-row-end'