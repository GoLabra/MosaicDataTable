'use client';

import { Box, Button, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, RowDetailPlugin, useGridPlugins, useRowExpansionStore, Action, AbsoluteHeightContainer, createRowDetailStore } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useMemo } from 'react';

export const RowExpansionTable = () => {

	const rowDetailStore = useMemo(() => createRowDetailStore<any>(), []);


	const headCells: ColumnDef[] = useMemo(() =>[{
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
        cell: (row: any) => (<Button onClick={() => rowDetailStore.toggle(row.id)} size="small" sx={{ m: 0 }} aria-label="Actions" aria-haspopup="menu" id={`user-menu-btn`}>
            Custom Toggle        </Button>)
    }, {
        id: 'expand_with_params',
        header: '',
        cell: (row: any) => (<Button onClick={() => rowDetailStore.setParams(row.id, { "param1": true },true )} size="small" sx={{ m: 0 }} aria-label="Actions" aria-haspopup="menu" id={`user-menu-btn`}>
            With Params        </Button>)
    }], [rowDetailStore.toggle, rowDetailStore.setParams]);


    const items = useMemo(() => [{
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
        }
    ], []);

    const gridPlugins = useGridPlugins(
        // process the 'render' function
        CustomBodyCellContentRenderPlugin,

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),

        // add actions column
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions
        }),

        usePluginWithParams(RowDetailPlugin, {
            showExpanderButton: true,
            onGetRowId: (row: any) => row.id,
            rowDetailStore: rowDetailStore,
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