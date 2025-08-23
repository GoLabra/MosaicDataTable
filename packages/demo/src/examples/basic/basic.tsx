'use client';

import { Button, ListItemIcon, MenuItem } from '@mui/material';
import { CustomBodyCellContentRenderPlugin, ColumnDef, usePluginWithParams, MosaicDataTable, PaddingPluggin, RowActionsPlugin, useGridPlugins, Action } from 'mosaic-data-table';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from 'react';


const headCells: ColumnDef<{id: number, name: string}>[] = [{
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
}];

export const BasicTable = () => {

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
        // process the headcell 'call' function
        CustomBodyCellContentRenderPlugin, 
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