'use client';

import { CountryIcon } from '@/lib/icons/country-icon';
import { stringAvatar } from '@/util/avatar-util';
import { Stack, Avatar, Chip, LinearProgress, Rating, MenuItem, ListItemIcon, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { AbsoluteHeightContainer, Action, ColumnsFillRowSpacePlugin, ColumnSortPlugin, CustomBodyCellContentRenderPlugin, EmptyDataPlugin, ColumnDef, HighlightColumnPlugin, MosaicDataTable, Order, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowExpansionPlugin, RowSelectionPlugin, SkeletonLoadingPlugin, useGridPlugins, usePluginWithParams, useResponsiveHeadCellVisible, useResponsivePin, useRowExpansionStore, SummaryRowPlugin, FilterRowPlugin, DefaultStringFilterOptions, Filter, DefaultNumberDateFilterOptions } from 'mosaic-data-table';
import { useCallback, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModeSwitch from '@/components/ModeSwitch';
import { useSelection } from './hooks/use-selection';

export const KeepItSimpleTable = () => {
    const [filter, setFilter] = useState<Filter>({});
    const [order, setOrder] = useState<{ order: Order, sortBy: string }>({ order: 'asc', sortBy: 'name' });
    const contentManagerSelection = useSelection<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(false);

    const headCells: ColumnDef[] = [{
        id: 'id',
        header: 'ID',
        width: 80,
        cell: (row: any) => <>{row.id}</>,
    }, {
        id: 'name',
        header: 'Name',
        width: 200,
        hasSort: true,
        cell: (row: any) => (<Stack direction="row" alignItems="center" gap={1}><Avatar  {...stringAvatar(row.name)} />{row.name}</Stack>),
        pin: useResponsivePin({ pin: 'left', breakpoint: 'sm', direction: 'up' }),
        highlight: true,
    }, {
        id: 'email',
        header: 'E-mail',
        width: 200,
        hasSort: true,
        cell: (row: any) => <>{row.email}</>,
    }, {
        id: 'country',
        header: 'Country',
        width: 150,
        hasSort: true,
        pin: useResponsivePin({ pin: 'left', breakpoint: 'md', direction: 'up' }),
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
        cell: (row: any) => <>{row.city}</>,
    }, {
        id: 'age',
        header: 'Age',
        width: 80,
        hasSort: true,
        cell: (row: any) => <>{row.age}</>,
    }, {
        id: 'gender',
        header: 'Gender',
        width: 100,
        hasSort: true,
        cell: (row: any) => <>{row.gender}</>,
    }, {
        id: 'address',
        header: 'Address',
        width: 200,
        hasSort: true,
        cell: (row: any) => <>{row.address}</>,
    }, {
        id: 'phone',
        header: 'Phone',
        width: 150,
        cell: (row: any) => <>{row.phone}</>,
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
        },
    }, {
        id: 'tokens',
        header: 'Tokens',
        width: 80,
        hasSort: true,
        pin: useResponsivePin({ pin: true, breakpoint: 'lg', direction: 'up' }),
        cell: (row: any) => <>{row.tokens}</>,
    }, {
        id: 'language',
        header: 'Language',
        width: 150,
        hasSort: true,
        cell: (row: any) => <>{row.language}</>,
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
        cell: (row: any) => <>{row.verified ? 'Yes' : 'No'}</>,
    }, {
        id: 'registrationDate',
        header: 'Registered On',
        width: 180,
        hasSort: true,
        cell: (row: any) => <>{new Date(row.registrationDate).toISOString()}</>,
        visible: useResponsiveHeadCellVisible({ breakpoint: 'md', direction: 'up' }),
    }, {
        id: 'role',
        header: 'Role',
        width: 120,
        hasSort: true,
        cell: (row: any) => <>{row.role}</>,
    }, {
        id: 'rating',
        header: 'Rating',
        width: 180,
        cell: (row: any) => <Rating name="half-rating" defaultValue={row.rating} precision={0.5} readOnly />,
    },
    ];

    let items = empty ? [] : [{
        id: 1,
        name: 'Max Mustermann',
        email: 'max.mustermann@mail.com',
        rating: 3.5,
        age: 30,
        gender: 'male',
        phone: '+1 (123) 456-7890',
        address: 'Vienna, Austria',
        progress: 100,
        verified: false,
        registrationDate: new Date(2019, 1, 1),
        status: 'Active',
        role: 'Admin',
        country: 'Austria',
        countryCode: 'at',
        city: 'Vienna',
        language: 'German',
        tokens: 100,
    }, {
        id: 2,
        name: 'John Doe',
        email: 'juan.perez@mail.com',
        rating: 4.5,
        age: 25,
        gender: 'female',
        phone: '+1 (456) 456-7890',
        address: 'Washington DC, USA',
        progress: 100,
        verified: true,
        registrationDate: new Date(2022, 1, 1),
        status: 'Active',
        role: 'Admin',
        country: 'USA',
        countryCode: 'us',
        city: 'Washington DC',
        language: 'English',
        tokens: 72,
    }, {
        id: 3,
        name: 'Juan Pérez',
        email: 'juan.perez@mail.com',
        rating: 2,
        age: 22,
        gender: 'male',
        phone: '+1 (789) 456-7890',
        address: 'Madrid, Spain',
        progress: 50,
        verified: true,
        registrationDate: new Date(2021, 1, 1),
        status: 'Inactive',
        role: 'User',
        country: 'Spain',
        countryCode: 'es',
        city: 'Madrid',
        language: 'Spanish',
        tokens: 12
    }, {
        id: 4,
        name: 'Mario Rossi',
        email: 'mario.rossi@mail.com',
        rating: 0,
        age: 22,
        gender: 'male',
        phone: '+1 (101) 456-7890',
        address: '123 Main St, Anytown, USA',
        progress: 25,
        verified: true,
        registrationDate: new Date(2021, 1, 1),
        status: 'Inactive',
        role: 'User',
        country: 'Italy',
        countryCode: 'it',
        city: 'Rome',
        language: 'Italian',
        tokens: 10,
    }, {
        id: 5,
        name: 'Andrei Vinca',
        email: 'andrei.vinca@outlook.com',
        rating: 1.5,
        age: 37,
        gender: 'male',
        phone: '+1 (112) 456-7890',
        progress: 10,
        address: 'Cluj-Napoca, Romania',
        verified: true,
        registrationDate: new Date(2021, 1, 1),
        status: 'Inactive',
        role: 'User',
        country: 'Romania',
        countryCode: 'ro',
        city: 'Bucharest',
        language: 'Romanian',
        tokens: 99
    }, {
        id: 6,
        name: 'Jean Dupont',
        email: 'jean.dupont@mail.com',
        rating: 0,
        age: 22,
        gender: 'male',
        phone: '+1 (131) 456-7890',
        address: 'Paris, France',
        progress: 12,
        verified: true,
        registrationDate: new Date(2021, 1, 1),
        status: 'Inactive',
        role: 'User',
        country: 'France',
        countryCode: 'fr',
        city: 'Paris',
        language: 'French',
        tokens: 45
    }];

    const isColumnHighlighted = useCallback((headCellId: string) => {
        return headCellId === 'role';
    }, []);

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

        
        usePluginWithParams(FilterRowPlugin, {
            visible: true,
            filter: filter,
            filterChanged: setFilter,
            key: 'filter_row',
            filterColumns: {
                'name': 'string',
                'city': {
                    type: 'string',
                    ...DefaultStringFilterOptions,
                },
                'email': {
                    type: 'string',
                    filterOptions: [{ value: 'contains', label: 'Contains', iconText: '@' }, { value: 'starts-with', label: 'Starts With', iconText: '@[' }],
                    defaultFilterOption: 'contains'
                },
                'country': {
                    type: 'select',
                    selectOptions: [{ value: 'contains', label: 'Contains' }, { value: 'starts-with', label: 'Starts With' }],
                },
                'gender': 'boolean',
                'tokens': {
                    type: 'number',
                    ...DefaultNumberDateFilterOptions,
                },
            }
        }),


        // add summary row. You can add as many summary rows as you want
        usePluginWithParams(SummaryRowPlugin, {
            visible: true,
            key: 'symmary_row', // needed only if you want to use more than one summary row
            summaryColumns: {
                'name': (column: ColumnDef<any>) => <Typography fontWeight={700}>Total</Typography>,
                'tokens': (column: ColumnDef<any>) => <Typography fontWeight={700}>338</Typography>,
            }
        }),

        // add padding to the table cells
        usePluginWithParams(PaddingPluggin, {}),

        // add sorting functionality
        usePluginWithParams(ColumnSortPlugin, {
            order: order.order,
            orderBy: order.sortBy,
            onSort: (sortBy: string, sortOrder: Order) => { setOrder({ order: sortOrder, sortBy: sortBy }) }
        }),

        // add row selection functionality (checlbox column)
        usePluginWithParams(RowSelectionPlugin, {
            onGetRowId: (row: any) => row.id,
            onSelectOne: contentManagerSelection.handleSelectOne,
            onDeselectOne: contentManagerSelection.handleDeselectOne,
            selectedIds: contentManagerSelection.selected
        }),

        usePluginWithParams(RowExpansionPlugin, {
            showExpanderButton: true,
            onGetRowId: (row: any) => row.id,
            expanstionStore: useRowExpansionStore(),
            getExpansionNode: useCallback((row: any, params: any) => (<AbsoluteHeightContainer sx={{ p: 5 }}>Hello {row.name}</AbsoluteHeightContainer>), [])
        }),

        // Fill the space between the last column and the actions. Needed when only a few columns are fixed-width to push the action column to the right.
        ColumnsFillRowSpacePlugin,

        // add actions column
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions
        }),

        // add column highlighting functionality
        usePluginWithParams(HighlightColumnPlugin, {
            isColumnHighlighted: isColumnHighlighted
        }),

        // Required for pinned columns when the table is scrolled. Marking a column as pinned alone isn’t enough; this plugin ensures the column stays in place.
        PinnedColumnsPlugin,

        // add skeleton loading state visualization
        usePluginWithParams(SkeletonLoadingPlugin, {
            isLoading: loading
        }),

        // add empty table state visualization
        usePluginWithParams(EmptyDataPlugin, {
            content: "Wow, such empty!"
        }),
    );

    return (
        <>
            <Stack alignItems="center" direction="row" justifyContent="flex-end" >
                <FormControlLabel control={<Checkbox checked={empty} onChange={(event) => setEmpty(event.target.checked)} />} label="Simulate Empty Table" />
                <FormControlLabel control={<Checkbox checked={loading} onChange={(event) => setLoading(event.target.checked)} />} label="Simulate Loading" />
                <ModeSwitch />
            </Stack>

            {JSON.stringify(filter)}
            <MosaicDataTable
                caption="Keep it simple table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={items}
            />

        </>
    )
}