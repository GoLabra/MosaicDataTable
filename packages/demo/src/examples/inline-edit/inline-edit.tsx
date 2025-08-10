'use client';

import { Box, Card, CardContent, CardHeader, Divider, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, useGridPlugins, Action } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { InlineEditPlugin, useInlineEditPluginStore } from './plugins/inline-edit-plugin';
import { useMemo, useState } from 'react';

export const InlineEditTable = () => {

    const headCells: ColumnDef[] = useMemo(() =>[{
        id: 'id',
        header: 'ID',
        cell: (row: any) => row.id,
        width: 100
    }, {
        id: 'name',
        header: 'Name',
        cell: (row: any) => row.name,
	}], []);

    const [items, setItems] = useState([{
        id: 1,
        name: 'John Doe'
    }, {
        id: 2,
        name: 'Jane Doe'
    }, {
        id: 3,
        name: 'Max Mustermann'
    }]);

    // Row Actions
    const todoActions: Action<any>[] = useMemo(() => [
        {
            id: 'edit',
            render: (field: any) => (<MenuItem id='edit-menu-item' key={`edit-${field}`} > <ListItemIcon><EditIcon /></ListItemIcon> Edit </MenuItem>)
        },
        {
            id: 'remove',
            render: (field: any) => (<MenuItem id='remove-menu-item' key={`remove-${field}`} > <ListItemIcon><DeleteIcon /></ListItemIcon> Remove </MenuItem>)
        },
	], []);

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

        usePluginWithParams(InlineEditPlugin, {
            onGetRowId: (row: any) => row.id,
            onCellValueChanged: (rowId: string, columnId: string, value: any) => {
                setItems((prevState: any[]) => {
                    return [ 
                        ...prevState.map((item: any) => item.id != rowId ? item : {...item, [columnId]:value } ), 
                    ]
                })
            },
            inlineEditStore: useInlineEditPluginStore()
        }),
        
    );

    return (
        <Box>
            <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                Inline Edit
            </Typography>

            <MosaicDataTable
                caption="Custom Plugin table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />
        </Box>
    );
}