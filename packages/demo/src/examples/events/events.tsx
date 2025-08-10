'use client';

import { Box, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, useGridPlugins, Action, HighlightRowPlugin, EventsPlugin } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo } from 'react';

export const EventsTable = () => {

    const headCells: ColumnDef[] = useMemo(() =>[{
        id: 'id',
        header: 'ID',
        cell: (row: any) => row.id,
    }, {
        id: 'name',
        header: 'Name',
        cell: (row: any) => row.name,
    }], []);

    const items = useMemo(() =>[{
        id: 1,
        name: 'John Doe'
    }, {
        id: 2,
        name: 'Jane Doe'
    }, {
        id: 3,
        name: 'Max Mustermann'
    }], []);

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

        // add events
        usePluginWithParams(EventsPlugin, {
            tableOnClick: (event) => {
                console.log('Clicked on table');
            },
            headOnClick: (event) => {
                console.log('Clicked on table->head');
            },
            headRowOnClick: (event) => {
                console.log('Clicked on table->head->row');
            },
            headRowCellOnClick: (event) => {
                console.log(`Clicked on table->head->row->cell: columnId: ${event.currentTarget.columnDef.id}`);
            },
            bodyOnClick: (event) => {
                console.log('Clicked on table->body');
            },
            bodyRowOnClick: (event) => {
                console.log('Clicked on table->body->row. rowData:', event.currentTarget.row);
            },
            bodyRowCellOnClick: (event) => {
                console.log(`Clicked on table->body->row->cell. columnId: ${event.currentTarget.columnDef.id}  rowData:`, event.currentTarget.row);
            }
        }),

    );

    return (
        <Box>
            <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                Events handle
            </Typography>

            <Typography sx={{ mb: 2 }}>
                Open the DevTools Console in your browser to monitor and view the logged events
            </Typography>

            <MosaicDataTable
                caption="Row Highlight table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />
        </Box>
    );
}