# Mosaic Data Table

A lightweight, extensible React data table library built with Material-UI. The core table functionality can be enhanced through a powerful plugin system.

## Features

- 🔌 Plugin-based architecture
- 📦 Small core with extensible functionality
- 🎨 Material-UI based styling
- 🚀 TypeScript support

## Installation

```bash
npm install mosaic-data-table
# or
yarn add mosaic-data-table
```

## Basic Usage

```
import { MosaicDataTable, useGridPlugins } from 'mosaic-data-table';

function MyTable() {

  const headCells = [{
      id: 'id',
      label: 'ID',
      width: 100,
      render: (row: any) => {row.id},
  },{
      id: 'name',
      label: 'Name',
      width: 100,
      render: (row: any) => {row.name},
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
      items={items}
      headCells={headCells}
    />
  );
}
```

## Plugins

Plugins can be combined to add specific functionality to your table. The order of plugins matters as they are applied sequentially.

- CustomBodyCellContentRenderPlugin

    Enables custom cell content rendering

**Note:** In future versions, alternative rendering methods will be available, such as automatic value retrieval based on cell ID and smart content type detection. For now, this plugin is required and must be included first in the plugins list.
    

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
        isLoading: boolean
    })
    ```

- EmptyDataPlugin

    Handles empty state display