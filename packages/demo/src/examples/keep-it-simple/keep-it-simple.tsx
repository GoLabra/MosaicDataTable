'use client';

import { CountryIcon } from '@/lib/icons/country-icon';
import { stringAvatar } from '@/util/avatar-util';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Checkbox, Chip, FormControlLabel, LinearProgress, ListItemIcon, MenuItem, Rating, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { AbsoluteHeightContainer, Action, ColumnDef, ColumnsFillRowSpacePlugin, ColumnSortPlugin, createFilterRowStore, createResponsivePin, createRowDetailStore, createRowSelectionStore, CustomBodyCellContentRenderPlugin, DefaultNumberDateFilterOptions, DefaultStringFilterOptions, EmptyDataPlugin, Filter, FilterRowPlugin, HighlightColumnPlugin, MosaicDataTable, Order, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowDetailPlugin, RowSelectionPlugin, SkeletonLoadingPlugin, SummaryRowPlugin, useGridPlugins, usePluginWithParams } from 'mosaic-data-table';
import { useCallback, useMemo, useState } from 'react';
import { useSelection } from './hooks/use-selection';
import { data } from './data';
import { data as bigData } from './big-data';


export const KeepItSimpleTable = () => {
    const [filter, setFilter] = useState<Filter>({});
    const [order, setOrder] = useState<{ order: Order, sortBy: string }>({ order: 'asc', sortBy: 'name' });
    const contentManagerSelection = useSelection<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(false);
    const [showBigData, setShowBigData] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(true);
    const [showFooter, setShowFooter] = useState<boolean>(true);
    const [showRowSelection, setShowRowSelection] = useState<boolean>(true);
    const [showRowExpansion, setShowRowExpansion] = useState<boolean>(true);
    const [showRowActions, setShowRowActions] = useState<boolean>(true); 

	const [counter, setCounter] = useState<number>(0);

    const headCells: ColumnDef[] = useMemo(() =>[{
        id: 'id',
        header: 'ID',
        width: 80,
        cell: (row: any) => row.id,
    }, {
        id: 'name',
        header: 'Name',
        width: 200,
        hasSort: true,
        cell: (row: any) => (<Stack direction="row" alignItems="center" gap={1}><Avatar  {...stringAvatar(row.name)} />{row.name}</Stack>),
		pin: createResponsivePin('left', 'sm', 'up'),
        highlight: true,
    }, {
        id: 'email',
        header: 'E-mail',
        width: 200,
        hasSort: true,
        cell: (row: any) => row.email,
    }, {
        id: 'country',
        header: 'Country',
        width: 150,
        hasSort: true,
		pin: createResponsivePin('left', 'md', 'up'),
        cell: (row: any) => <Stack direction="row" alignItems="center" gap={1}><CountryIcon country={row.countryCode}
            sx={{
                fontSize: 24,
                color: 'primary.main'
            }}
        />
            {row.country}
        </Stack>,
    }, {
        id: 'city',
        header: 'City',
        width: 150,
        hasSort: true,
        cell: (row: any) => row.city,
    }, {
        id: 'age',
        header: 'Age',
        width: 80,
        hasSort: true,
        cell: (row: any) => row.age,
    }, {
        id: 'gender',
        header: 'Gender',
        width: 100,
        hasSort: true,
        cell: (row: any) => row.gender,
    }, {
        id: 'address',
        header: 'Address',
        width: 200,
        hasSort: true,
        cell: (row: any) => row.address,
    }, {
        id: 'phone',
        header: 'Phone',
        width: 150,
        cell: (row: any) => row.phone,
    }, {
        id: 'status',
        header: 'Status',
        width: 120,
        hasSort: true,
        cell: (row: any) => {
            if (row.status === 'Active') {
                return (<Chip label="Active" color="primary" size="small" />);
            } else {
                return (<Chip label="Inactive" color="secondary" size="small" />);
            }
        }
    }, {
        id: 'tokens',
        header: 'Tokens',
        width: 100,
        hasSort: true,
		pin: createResponsivePin(true, 'lg', 'up'),
        cell: (row: any) => row.tokens,
    }, {
        id: 'language',
        header: 'Language',
        width: 150,
        hasSort: true,
        cell: (row: any) => row.language,
    }, {
        id: 'progress',
        header: 'Progress',
        width: 100,
        cell: (row: any) => <LinearProgress color="success" value={row.progress} variant="determinate" />,
    }, {
        id: 'Verified',
        header: 'verified',
        width: 100,
        hasSort: true,
        cell: (row: any) => row.verified ? 'Yes' : 'No',
    }, {
        id: 'registrationDate',
        header: 'Registered On',
        width: 210,
        hasSort: true,
        cell: (row: any) => <>{dayjs(row.registrationDate).format('MMM DD, YYYY, hh:mm:ss A')}</>,
        //visible: useResponsiveHeadCellVisible({ breakpoint: 'md', direction: 'up' }),
    }, {
        id: 'role',
        header: 'Role',
        width: 120,
        hasSort: true,
        cell: (row: any) => row.role,
    }, {
        id: 'rating',
        header: 'Rating',
        width: 180,
        cell: (row: any) => <Rating name="half-rating" defaultValue={row.rating} precision={0.5} readOnly />,
    }], []);

    let items = empty ? [] : showBigData ? bigData : data;

    const isColumnHighlighted = useCallback((headCellId: string) => {
        return headCellId === 'role';
    }, []);

    // Row Actions
    const todoActions: Action<any>[] = useMemo(() => ([
        {
            id: 'edit',
            render: (field: any) => (<MenuItem id='edit-menu-item' key={`edit-${field}`} > <ListItemIcon><EditIcon /></ListItemIcon> Edit </MenuItem>)
        },
        {
            id: 'remove',
            render: (field: any) => (<MenuItem id='remove-menu-item' key={`remove-${field}`} > <ListItemIcon><DeleteIcon /></ListItemIcon> Remove </MenuItem>)
        },
    ]), []);


	const rowDetailStore = useMemo(() => createRowDetailStore<any>(), []);

    const gridPlugins = useGridPlugins(
        // process the headcell 'call' function
        CustomBodyCellContentRenderPlugin,


        usePluginWithParams(FilterRowPlugin, {
            visible: showFilter,
            //filter: filter,
			store: useMemo(() => createFilterRowStore<any>(), []),
            filterChanged: setFilter,
            key: 'filter_row',
            filterColumns: useMemo<any>(() => ({
                'name': 'string',
                'city': {
                    type: 'string',
                    ...DefaultStringFilterOptions,
                },
                'email': {
                    type: 'string',
                    operators: [{ value: 'contains', label: 'Contains', iconText: '@' }, { value: 'starts-with', label: 'Starts With', iconText: '@[' }],
                    defaultOperator: 'contains'
                },
                'country': {
                    type: 'select',
                    selectOptions: [
                        { value: 'Austria', label: 'Austria' },
                        { value: 'Brazil', label: 'Brazil' },
                        { value: 'Cyprus', label: 'Cyprus' },
                        { value: 'France', label: 'France' },
                        { value: 'Italy', label: 'Italy' },
                        { value: 'Japan', label: 'Japan' },
                        { value: 'Romania', label: 'Romania' },
                        { value: 'South Africa', label: 'South Africa' },
                        { value: 'USA', label: 'USA' },
                    ],
                },
                'registrationDate': 'date',
                'tokens': {
                    type: 'number',
                    ...DefaultNumberDateFilterOptions,
                },
            }), [])
        }),

        // add summary row. You can add as many summary rows as you want
        usePluginWithParams(SummaryRowPlugin, {
            visible: showFooter,
            key: 'symmary_row', // needed only if you want to use more than one summary row
            summaryColumns: useMemo(() => ({
                'name': (column: ColumnDef<any>) => <Typography fontWeight={700}>Total</Typography>,
                'tokens': (column: ColumnDef<any>) => <Typography fontWeight={700}>338</Typography>,
            }), [])
        }),

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),

        // add sorting functionality
        usePluginWithParams(ColumnSortPlugin, {
            order: order.order,
            orderBy: order.sortBy,
            onSort: useCallback((sortBy: string, sortOrder: Order) => { setOrder({ order: sortOrder, sortBy: sortBy }) }, [setOrder])
        }),

        // add row selection functionality (checlbox column)
        usePluginWithParams(RowSelectionPlugin, {
            visible: showRowSelection,
            onGetRowId: useCallback((row: any) => row.id, []),
            onSelectOne: contentManagerSelection.handleSelectOne,
            onDeselectOne: contentManagerSelection.handleDeselectOne,
            //selectedIds: contentManagerSelection.selected

			rowSelectionStore: useMemo(() => createRowSelectionStore<any>(), [])
        }),

        usePluginWithParams(RowDetailPlugin, {
            showExpanderButton: showRowExpansion,
            onGetRowId: useCallback((row: any) => row.id, []),
            rowDetailStore: rowDetailStore,
            getExpansionNode: useCallback((row: any, params: any) => (<AbsoluteHeightContainer enableAnimation sx={{ p: 5 }}>Hello {row.name}</AbsoluteHeightContainer>), [])
        }),

        // Fill the space between the last column and the actions. Needed when only a few columns are fixed-width to push the action column to the right.
        ColumnsFillRowSpacePlugin,

        // add actions column
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions,
            visible: showRowActions
        }),

        // add column highlighting functionality
        usePluginWithParams(HighlightColumnPlugin, {
            isColumnHighlighted: isColumnHighlighted
        }),

        // Required for pinned columns when the table is scrolled. Marking a column as pinned alone isn’t enough; this plugin ensures the column stays in place.
        usePluginWithParams(PinnedColumnsPlugin, { }),

        // add skeleton loading state visualization
        usePluginWithParams(SkeletonLoadingPlugin, {
            isLoading: loading,
			maxRowsWhenNotEmpty: 7
        }),

        // add empty table state visualization
        usePluginWithParams(EmptyDataPlugin, {
            content: "Wow, such empty!"
        }),
    );

    return (
        <>
            <Stack alignItems="center" direction="row" justifyContent="flex-end" flexWrap="wrap" sx={{marginBottom: 5}} >
                <FormControlLabel control={<Checkbox checked={showFilter} onChange={(event) => setShowFilter(event.target.checked)} />} label="Show Filters" />
                <FormControlLabel control={<Checkbox checked={showRowExpansion} onChange={(event) => setShowRowExpansion(event.target.checked)} />} label="Show Row Detail" />
                <FormControlLabel control={<Checkbox checked={showRowSelection} onChange={(event) => setShowRowSelection(event.target.checked)} />} label="Show Row Selection" />
                <FormControlLabel control={<Checkbox checked={showFooter} onChange={(event) => setShowFooter(event.target.checked)} />} label="Show Footer" />
                <FormControlLabel control={<Checkbox checked={empty} onChange={(event) => setEmpty(event.target.checked)} />} label="Simulate Empty Table" />
				<FormControlLabel control={<Checkbox checked={showBigData} onChange={(event) => setShowBigData(event.target.checked)} />} label="Many Rows" />
                <FormControlLabel control={<Checkbox checked={loading} onChange={(event) => setLoading(event.target.checked)} />} label="Simulate Loading" />
                <FormControlLabel control={<Checkbox checked={showRowActions} onChange={(event) => setShowRowActions(event.target.checked)} />} label="Row Actions" />  
            </Stack>

            <MosaicDataTable
                caption="Keep it simple table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />
        </>
    )
}