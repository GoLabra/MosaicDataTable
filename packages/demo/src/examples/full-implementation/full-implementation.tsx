'use client';

import { CountryIcon } from '@/lib/icons/country-icon';
import { stringAvatar } from '@/util/avatar-util';
import { Stack, Avatar, Chip, LinearProgress, Rating, MenuItem, ListItemIcon, FormControlLabel, Checkbox, Box, Typography, Button } from '@mui/material';
import { AbsoluteHeightContainer, Action, ColumnsFillRowSpacePlugin, ColumnSortPlugin, CustomBodyCellContentRenderPlugin, EmptyDataPlugin, ColumnDef, HighlightColumnPlugin, MosaicDataTable, Order, PaddingPluggin, PinnedColumnsPlugin, RowActionsPlugin, RowExpansionPlugin, RowSelectionPlugin, SkeletonLoadingPlugin, SummaryRowPlugin, useGridPlugins, usePluginWithParams, useResponsiveHeadCellVisible, useRowExpansionStore, FilterRowPlugin, DefaultStringFilterOptions, DefaultNumberDateFilterOptions, createRowSelectionStore, createResponsivePin, createFilterRowStore } from 'mosaic-data-table';
import { use, useCallback, useMemo, useState } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModeSwitch from '@/components/ModeSwitch';
import { useContentManagerSearchFromQuery } from './hooks/use-content-manager-search-from-query';
import { useContentManagerStore } from './hooks/use-content-manager-store';
import { useContentManagerIds } from './hooks/use-content-manger-ids';
import { useSelection } from './hooks/use-selection';
import { CenterPagination, CoolPagination } from './components/cool-pagination';
import dayjs from 'dayjs';

export const FullImplementationTable = () => {

    const contentManagerSearch = useContentManagerSearchFromQuery({ initialSortBy: 'id', initialOrder: 'asc', initialRowsPerPage: 6 });
    const contentManagerStore = useContentManagerStore({ searchState: contentManagerSearch.state, });
    const contentManagerIds = useContentManagerIds(contentManagerStore.state)
    const contentManagerSelection = useSelection<string>(contentManagerIds.storeIds);

    // responsive hooks for pinned columns and visible columns
    // const namePinProps = useResponsivePin({ pin: 'left', breakpoint: 'sm', direction: 'up' });
    // const countryPinProps = useResponsivePin({ pin: 'left', breakpoint: 'md', direction: 'up' });
    // const tokensPinProps = useResponsivePin({ pin: true, breakpoint: 'lg', direction: 'up' });
    // const registrationDateVisible = useResponsiveHeadCellVisible({ breakpoint: 'md', direction: 'up' });

    // head cells
    const headCells: ColumnDef[] = useMemo(() => [{
        id: 'id',
        header: 'ID',
        width: 80,
        hasSort: true,
        cell: (row: any) => <>{row.id}</>,
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
        cell: (row: any) => <>{row.email}</>,
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
        header: () => 'City',
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
        width: 100,
        hasSort: true,
        cell: (row: any) => <>{row.tokens}</>,
        pin: createResponsivePin(true, 'lg', 'up'),
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
        width: 210,
        hasSort: true,
        cell: (row: any) => <>{dayjs(row.registrationDate).format('MMM DD, YYYY, hh:mm:ss A')}</>,
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
    }], []);

    const isColumnHighlighted = useCallback((headCellId: string) => {
        return headCellId === 'role';
    }, []);

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

        // add filter row
        usePluginWithParams(FilterRowPlugin, {
            visible: true,
            // filter: contentManagerSearch.state.filter,
			store: useMemo(() => createFilterRowStore<any>(contentManagerSearch.state.filter), []),
            filterChanged: contentManagerSearch.handleFilterChange,
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
                'registrationDate': {
                    type: 'date',
                    ...DefaultNumberDateFilterOptions,
                    defaultOperator: 'less-or-equal-than',
                },
                'tokens': {
                    type: 'number',
                    ...DefaultNumberDateFilterOptions,
                },
            }), [])
        }),
        
        // add summary row. You can add as many summary rows as you want
        usePluginWithParams(SummaryRowPlugin, {
            visible: true,
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
            order: contentManagerSearch.state.order,
            orderBy: contentManagerSearch.state.sortBy,
            onSort: contentManagerSearch.handleSortChange
        }),

        // add row selection functionality (checlbox column)
        usePluginWithParams(RowSelectionPlugin, {
            onGetRowId: useCallback((row: any) => row.id, []),
            onSelectOne: contentManagerSelection.handleSelectOne,
            onDeselectOne: contentManagerSelection.handleDeselectOne,
        	//selectedIds: contentManagerSelection.selected
			rowSelectionStore: useMemo(() => createRowSelectionStore<any>(), [])
        }),

        usePluginWithParams(RowExpansionPlugin, {
            showExpanderButton: true,
            onGetRowId: useCallback((row: any) => row.id, []),
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
		usePluginWithParams(PinnedColumnsPlugin, {}),

        // add skeleton loading state visualization
        usePluginWithParams(SkeletonLoadingPlugin, {
            isLoading: contentManagerStore.state.dataLoading
        }),

       // add empty table state visualization
        usePluginWithParams(EmptyDataPlugin, {
            content: "Wow, such empty!"
        }),
    );

    return (
        <>
            <MosaicDataTable
                caption="Keep it simple table" // not visible. used for accessibility
                plugins={gridPlugins}
                headCells={headCells}
                items={contentManagerStore.state.data}
            />

            <CenterPagination>
                <CoolPagination
                    page={contentManagerSearch.state.page}
                    pagesCount={contentManagerStore.state.pagesCount}
                    totalItems={contentManagerStore.state.totalItems}
                    onChange={contentManagerSearch.handlePageChange}
                />
            </CenterPagination>


            {contentManagerSelection.selected.length > 0 && <Box sx={{ width: '100%',  marginTop: '10px' }}>
                Selected Ids: {contentManagerSelection.selected.join(', ')}
            </Box>}

        </>
    )
}