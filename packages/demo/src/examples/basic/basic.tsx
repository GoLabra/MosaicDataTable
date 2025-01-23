'use client';

import { ListItemIcon, MenuItem } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, useGridPlugins, Action } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const BasicTable = () => {

    const headCells: ColumnDef[] = [{
        id: 'id',
        header: 'ID',
        cell: (row: any) => row.id,
    }, {
        id: 'name',
        header: 'Name',
        cell: (row: any) => row.name,
    }];


    const items = [{
        id: 1,
        name: 'John Doe'
    }, {
        id: 2,
        name: 'Jane Doe'
    }]

     // Row Actions
     const todoActions: Action<any>[] = [
        {
            id: 'edit',
            render: (field: any) => (<MenuItem id='edit-menu-item' key={`edit-${field}`} > <ListItemIcon><EditIcon /></ListItemIcon> Edit </MenuItem>)
        },
        {
            id: 'remove',
            render: (field: any) => (<MenuItem id='remove-menu-item' key={`remove-${field}`} > <ListItemIcon><DeleteIcon /></ListItemIcon> Remove </MenuItem>)
        },
    ];

    const gridPlugins = useGridPlugins(
        // process the 'render' function
        CustomBodyCellContentRenderPlugin, 

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),
        
        // add actions column
        usePluginWithParams(RowActionsPlugin, { 
            actions: todoActions
        }),

        // Required for pinned columns when the table is scrolled. Marking a column as pinned alone isn’t enough; this plugin ensures the column stays in place.
        //PinnedColumnsPlugin,
    );

    return (
        <MosaicDataTable
            caption="Keep it simple table" // not visible. used for accessibility
            plugins={gridPlugins}
            headCells={headCells}
            items={items}
        />
    );
}