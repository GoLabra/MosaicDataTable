'use client';

import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, useGridPlugins, Action, HighlightRowPlugin } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState } from 'react';

export const RowHighlightTable = () => {

    const [id, setId] = useState(1);

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
    }, {
        id: 3,
        name: 'Max Mustermann'
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

    // The order of the plugins is (sometimes) important.
    const gridPlugins = useGridPlugins(
        // process the 'render' function
        CustomBodyCellContentRenderPlugin,

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),

        // add actions column
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions
        }),

        usePluginWithParams(HighlightRowPlugin, {
            isRowHighlighted: useCallback((row: any) => row.id == id, [id])
        }),
    );

    return (
        <Box>
            <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                Row Highlight
            </Typography>

            <Button onClick={ () => {

if(id == 1){
    setId(2);
} else {
    setId(1);
}

            } }>Toggle Row Highlight ({id})</Button>

            <MosaicDataTable
                caption="Row Highlight table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />
        </Box>
    );
}