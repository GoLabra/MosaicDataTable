'use client';

import { Box, Button, IconButton, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, EmptyDataPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, Order, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowExpansionPlugin, RowSelectionPlugin, SkeletonLoadingPlugin, useGridPlugins, useResponsiveHeadCellVisible, useResponsivePin, useRowExpansionStore, Action, ColumnsFillRowSpacePlugin, AbsoluteHeightContainer } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback } from 'react';

export const RowExpansionTable = () => {

    // this is there the grid will keep track of the expansion state
    const rowExpansionStore = useRowExpansionStore();

    const headCells: ColumnDef[] = [{
        id: 'id',
        header: 'ID',
        cell: (row: any) => row.id,
    }, {
        id: 'name',
        header: 'Name',
        cell: (row: any) => row.name,
    }, {
        id: 'expand',
        header: '',
        cell: (row: any) => (<Button onClick={() => rowExpansionStore.toggle(row.id)} size="small" sx={{ m: 0 }} aria-label="Actions" aria-haspopup="menu" id={`user-menu-btn`}>
            Custom Toggle        </Button>)
    }, {
        id: 'expand_with_params',
        header: '',
        cell: (row: any) => (<Button onClick={() => rowExpansionStore.setParams({ rowId: row.id, params: { "param1": true }, openImmediately: true })} size="small" sx={{ m: 0 }} aria-label="Actions" aria-haspopup="menu" id={`user-menu-btn`}>
            With Params        </Button>)
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

    const gridPlugins = useGridPlugins(
        // process the 'render' function
        CustomBodyCellContentRenderPlugin,

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),

        // add actions column
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions
        }),

        usePluginWithParams(RowExpansionPlugin, {
            showExpanderButton: true,
            onGetRowId: (row: any) => row.id,
            expanstionStore: rowExpansionStore,
            getExpansionNode: useCallback((row: any, params: any) => (<AbsoluteHeightContainer sx={{ p: 5 }}>
                Hello {row.name}!
                {params?.param1 && <div>Param1 is true</div>}
            </AbsoluteHeightContainer>), [])
        }),
    );

    return (
        <Box>
            <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
                Row Expansion
            </Typography>

            <MosaicDataTable
                caption="Row Expansion table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />
        </Box>
    );
}