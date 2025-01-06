'use client';


import Copyright from '@/components/Copyright';
import { Action, ColumnsFillRowSpacePlugin, ColumnSortPlugin, CustomBodyCellContentRenderPlugin, EmptyDataPlugin, HeadCell, HighlightColumnPlugin, MosaicDataTable, Order, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowExpansionPlugin, RowSelectionPlugin, SkeletonLoadingPlugin, useGridPlugins, usePluginWithParams, useResponsiveHeadCellVisible, useResponsivePin, useRowExpansionStore } from 'mosaic-data-table';
import { useSelection } from '@/hooks/use-selection';
import { stringAvatar } from '@/util/avatar-util';
import { CountryIcon } from '@/lib/icons/country-icon';
import { Avatar, Box, Checkbox, Chip, Container, FormControlLabel, IconButton, LinearProgress, ListItemIcon, MenuItem, Rating, Stack, Typography } from '@mui/material';
import { use, useCallback, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModeSwitch from '@/components/ModeSwitch';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Langar } from 'next/font/google';

export default function Home() {

    const [order, setOrder] = useState<{ order: Order, sortBy: string }>({ order: 'asc', sortBy: 'name' });
    const contentManagerSelection = useSelection<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [empty, setEmpty] = useState<boolean>(false);

    const headCells: HeadCell[] = [{
        id: 'id',
        label: 'ID',
        width: 100,
        render: (row: any) => <>{row.id}</>,
    }, {
        id: 'name',
        label: 'Name',
        width: 200,
        hasSort: true,
        render: (row: any) => (<Stack direction="row" alignItems="center" gap={1}><Avatar  {...stringAvatar(row.name)} />{row.name}</Stack>),
        pin: useResponsivePin({ pin: 'left', breakpoint: 'sm', direction: 'up' }),
        highlight: true,
    }, {
        id: 'mail',
        label: 'E-mail',
        width: 200,
        hasSort: true,
        render: (row: any) => <>{row.email}</>,
    }, {
        id: 'country',
        label: 'Country',
        width: 150,
        hasSort: true,
        pin: useResponsivePin({ pin: 'left', breakpoint: 'md', direction: 'up' }),
        render: (row: any) => <Stack direction="row" alignItems="center" gap={1}><CountryIcon country={row.countryCode}
            sx={{
                fontSize: 24, // Change size as needed
                color: 'primary.main' // Change color as needed
            }}
        />
            {row.country}
        </Stack>,
    }, {
        id: 'city',
        label: 'City',
        width: 150,
        hasSort: true,
        render: (row: any) => <>{row.city}</>,
    }, {
        id: 'age',
        label: 'Age',
        width: 100,
        hasSort: true,
        render: (row: any) => <>{row.age}</>,
    }, {
        id: 'gender',
        label: 'Gender',
        width: 100,
        hasSort: true,
        render: (row: any) => <>{row.gender}</>,
    }, {
        id: 'address',
        label: 'Address',
        width: 200,
        hasSort: true,
        render: (row: any) => <>{row.address}</>,
    }, {
        id: 'phone',
        label: 'Phone',
        width: 150,
        render: (row: any) => <>{row.phone}</>,
    }, { 
        id: 'status',
        label: 'Status',
        width: 120,
        hasSort: true,
        pin: useResponsivePin({ pin: true, breakpoint: 'lg', direction: 'up' }),
        render: (row: any) => {
            if (row.status === 'Active') {
                return (<Chip label="Active" color="primary" size="small" />);
            } else {
                return (<Chip label="Inactive" color="secondary" size="small" />);
            }
        },
    }, {
        id: 'language',
        label: 'Language',
        width: 150,
        hasSort: true,
        render: (row: any) => <>{row.language}</>,
    }, {
        id: 'progress',
        label: 'Progress',
        width: 100,
        render: (row: any) => <LinearProgress color="success" value={row.progress} variant="determinate" />,
    }, {
        id: 'Verified',
        label: 'verified',
        width: 100,
        hasSort: true,
        render: (row: any) => <>{row.verified ? 'Yes' : 'No'}</>,
    }, {
        id: 'registrationDate',
        label: 'Registered On',
        width: 180,
        hasSort: true,
        render: (row: any) => <>{new Date(row.registrationDate).toISOString()}</>,
        visible: useResponsiveHeadCellVisible({ breakpoint: 'md', direction: 'up' }),
    }, {
        id: 'role',
        label: 'Role',
        width: 120,
        hasSort: true,
        render: (row: any) => <>{row.role}</>,
    }, {
        id: 'rating',
        label: 'Rating',
        width: 180,
        render: (row: any) => <Rating name="half-rating" defaultValue={row.rating} precision={0.5} readOnly />,
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
        CustomBodyCellContentRenderPlugin,
        usePluginWithParams(PaddingPluggin, {}),
        usePluginWithParams(ColumnSortPlugin, {
            order: order.order,
            orderBy: order.sortBy,
            onSort: (sortBy: string, sortOrder: Order) => { setOrder({ order: sortOrder, sortBy: sortBy }) }
        }),
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
            getExpansionNode: useCallback((row: any, params: any) => (<Box p={5}>Hello {row.name}</Box>), [])
        }),
        ColumnsFillRowSpacePlugin,
        usePluginWithParams(RowActionsPlugin, {
            actions: todoActions
        }),
        usePluginWithParams(HighlightColumnPlugin, {
            isColumnHighlighted: isColumnHighlighted
        }),
        PinnedColumnsPlugin,
        usePluginWithParams(SkeletonLoadingPlugin, {
            isLoading: loading
        }),
        usePluginWithParams(EmptyDataPlugin, {
            content: "Wow, such empty!"
        }),
    );

    return (
        <Container maxWidth="lg">

            <Stack alignItems="center" direction="row" justifyContent="flex-end" >
                <FormControlLabel control={<Checkbox checked={empty} onChange={(event) => setEmpty(event.target.checked)} />} label="Simulate Empty Table" />
                <FormControlLabel control={<Checkbox checked={loading} onChange={(event) => setLoading(event.target.checked)} />} label="Simulate Loading" />
                <ModeSwitch />
            </Stack>
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
                    MosaicDataTable - Material UI - Next.js example in TypeScript
                </Typography>

                <MosaicDataTable
                    plugins={gridPlugins}
                    headCells={headCells}
                    items={items}
                />


            </Box>

            <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={1}>
                <Copyright />
                <IconButton
                    color="primary"
                    component="a"
                    href="https://github.com/GoLabra/MosaicDataTable"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ width: 'auto' }}
                >
                    <GitHubIcon />
                </IconButton>
            </Stack>
        </Container>
    );
}
