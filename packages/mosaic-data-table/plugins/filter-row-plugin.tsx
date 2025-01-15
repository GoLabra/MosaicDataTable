import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyExtraRowEndPlugin, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { MosaicDataTableBodyRow } from "../MosaicDataTableBodyRow";
import { MosaicDataTableHeadRow } from "../MosaicDataTableHeadRow";
import { backdropClasses, Box, Button, debounce, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, styled, TextField, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import { DockedDiv } from "../style";

export const FilterRowPlugin = ({
    visible = true,
    filter,
    filterChanged,
    filterColumns,
    key
}: {
    visible?: boolean,
    filterChanged: (filter: Filter) => void,
    filter: Filter,

    filterColumns: Record<string, ColumnDefFilter | Exclude<ColumnDefFilter['type'], 'select'>>,
    key: string
}): MosaicDataTableHeadExtraRowEndPlugin & MosaicDataTableHeadCellContentRenderPlugin => {

    return {
        type: ['head-extra-row-end', 'head-cell-content-render'] as const,
        getHeadExtraRowEnd: (columns: Array<ColumnDef<any>>, gridApi: GridApi) => {

            if (!visible) {
                return null;
            }

            return (
                <MosaicDataTableHeadRow
                    key={`sys_extra_row_${key}`}
                    headCells={columns}
                    plugins={gridApi.getPlugins()}
                    gridApi={gridApi}
                    caller={key}
                    sx={{
                        '> th': {

                            '&:first-child>.MosaicDataTable-filter-row-docked': {
                                borderTopLeftRadius: '5px',
                                borderBottomLeftRadius: '5px',
                            },
                            '&:last-child>.MosaicDataTable-filter-row-docked': {
                                borderTopRightRadius: '5px',
                                borderBottomRightRadius: '5px',
                            },
                        }
                    }}
                />
            )
        },
        renderHeadCellContent: (column: ColumnDef<any>, gridApi: GridApi, caller: string, children?: ReactNode) => {

            if (caller == key) {

                const filterDef = filterColumns[column.id]
                if (!filterDef) {
                    return <DockedWrapper key={column.id} className="MosaicDataTable-filter-row-docked">{children}</DockedWrapper>;
                }

                const typeDef = typeof filterDef === 'string' ? filterDef : filterDef.type;
                const selectOptions = typeof filterDef != 'string' && filterDef.type == 'select' ? filterDef.selectOptions : undefined;
                const defaultFilterOption = typeof filterDef != 'string' ? filterDef.defaultFilterOption : undefined;
                const filterOptions = typeof filterDef != 'string' ? filterDef.filterOptions : undefined;
                const filterValue = filter[column.id];

                console.log('render content')
                return (
                    <DockedWrapper key={column.id} className="MosaicDataTable-filter-row-docked">

                        <Box
                            key={column.id}
                            sx={{
                                width: '100%',
                                minWidth: '100px',
                                margin: '3px',
                                padding: '3px',
                                borderRadius: '3px',
                                backgroundColor: 'var(--mui-palette-background-paper)'
                            }}>
                            <ColumnFilter
                                key={`columnFilter-${column.id}`}
                                type={typeDef}
                                selectOptions={selectOptions}
                                options={filterOptions}
                                defaultFilterOption={defaultFilterOption}
                                value={filterValue}
                                onChange={(columnFilter) => {
                                    filterChanged({
                                        ...filter,
                                        [column.id]: columnFilter
                                    })
                                }} />
                        </Box>

                    </DockedWrapper>)
            }
            return children;
        }
    }
}

export const DockedWrapper = styled(DockedDiv)(({ theme }) => ({
    backgroundColor: 'var(--mui-palette-MosaicDataTable-extraRow)',
}));

export interface InputProps {
    value: any;
    onChange: (value: any) => void;
    selectOptions?: ColumnDefFilter['filterOptions'];
}

const TextInput = (props: InputProps) => {
    return (<TextField id="outlined-basic" variant="standard" value={props.value} onChange={props.onChange}
        slotProps={{
            input: {
                disableUnderline: true,
                inputProps: {
                    sx: {
                        padding: '3px'
                    }
                }
            }
        }}
    />)
}

const NumberInput = (props: InputProps) => {
    return (<TextField type="number" id="outlined-basic" variant="standard" value={props.value} onChange={props.onChange}
        slotProps={{
            input: {
                disableUnderline: true,
                inputProps: {
                    sx: {
                        padding: '3px'
                    }
                }
            }
        }}
    />)
}

const SelectInput = (props: InputProps) => {
    return (<TextField id="outlined-basic" variant="standard" fullWidth value={props.value} onChange={props.onChange} select
        slotProps={{
            input: {
                disableUnderline: true,
                inputProps: {
                    sx: {
                        padding: '3px'
                    }
                }
            }
        }}
    >
        <MenuItem value={''} sx={{ height: '36px' }}></MenuItem>
        {props.selectOptions!.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
    </TextField>)
}

const BooleanInput = (props: InputProps) => {
    return (<TextField id="outlined-basic" variant="standard" fullWidth value={props.value} onChange={props.onChange} select
        slotProps={{
            input: {
                disableUnderline: true,
                inputProps: {
                    sx: {
                        padding: '3px'
                    }
                }
            }
        }}
    >
        <MenuItem value={''} sx={{ height: '36px' }}></MenuItem>
        <MenuItem value={'true'}>True</MenuItem>
        <MenuItem value={'false'}>False</MenuItem>
    </TextField>)
}


export interface ColumnDefFilterTypeOverrides { }

let filterInputMap: Partial<Record<ColumnDefFilter['type'], React.FC<any>>> = {
    'string': TextInput,
    'select': SelectInput,
    'number': NumberInput,
    'boolean': BooleanInput,
}

export interface IColumnDefFilter {
    type: 'string' | 'number' | 'date' | 'boolean' | keyof ColumnDefFilterTypeOverrides,
    filterOptions?: { value: string | number, label: string, iconText?: string }[],
    defaultFilterOption?: string | number
}

export type ColumnDefFilter = IColumnDefFilter | {
    type: 'select',
    filterOptions?: { value: string | number, label: string, iconText?: string }[],
    defaultFilterOption?: string | number,
    selectOptions: { value: string | number, label: string, iconText?: string }[]
};

interface ColumnFilterProps {
    type: ColumnDefFilter['type'],
    options?: ColumnDefFilter['filterOptions'],
    value?: FilterValue,
    onChange: (filter: FilterValue) => void

    selectOptions?: ColumnDefFilter['filterOptions'],
    defaultFilterOption?: string | number,
}
const ColumnFilter = (props: ColumnFilterProps) => {

    const { value, options } = props;

    // const filterOptionsIconText = useMemo(() => options?.find((option) => option.value == (value?.filterOption ?? props.defaultFilterOption))?.iconText ?? '', [options, value?.filterOption, props.defaultFilterOption]);
    
    return (<Stack direction="row" alignItems="center">

        {/* <Typography variant="body2" sx={{ fontSize: '0.8rem', margin: '3px' }}>
            {filterOptionsIconText}
        </Typography> */}

        <FreeInput
            key={`free-input-${props.type}`}
            type={props.type}
            value={value?.value}
            selectOptions={props.selectOptions}
            onChange={(newValue: any) => {
                debugger;
                props.onChange({
                    filterOption: value?.filterOption ?? props.defaultFilterOption ?? '',
                    value: newValue,
                });
            }}
        />
        {options && <ColumnDefFilterButtonOptions
            value={value?.filterOption ?? props.defaultFilterOption ?? ''}
            filterOptions={options}
            onChange={(newValue: any) => {
                props.onChange({
                    filterOption: newValue,
                    value: value?.value ?? ''
                });
            }} />}
    </Stack>)
}

interface FreeInputProps {
    type: ColumnDefFilter['type'],
    value?: string | number;
    selectOptions?: ColumnDefFilter['filterOptions'],
    onChange: (value: string | number) => void;
}
const FreeInput = (props: FreeInputProps) => {
    const InputComp = filterInputMap[props.type];

    const [internalFilter, setInternalFilter] = useState<string | number>(props.value ?? '');
    const memoizedDebounce = useMemo(() => debounce((value: string | number) => props.onChange(value), 300), [props.onChange]);

    if (!InputComp) {
        console.log(`No input component for type ${props.type}`);
        return null;
    }

    return (
        <InputComp
            key={`input-${props.type}`}
            selectOptions={props.selectOptions}
            value={internalFilter}
            onChange={(value: any) => {
                setInternalFilter(value.target.value);
                memoizedDebounce(value.target.value);
            }}
        />
    );
};

interface ColumnDefFilterButtonProps {
    value: any;
    onChange: (value: any) => void;
    filterOptions: ColumnDefFilter['filterOptions'];
}
const ColumnDefFilterButtonOptions = (props: ColumnDefFilterButtonProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const memoizedDebounce = useMemo(() => debounce((value: string | number) => props.onChange(value), 0), [props.onChange]);

    const optionSelected = useCallback((option: { value: string | number, label: string }) => {
        handleClose();
        memoizedDebounce(option.value);
    }, [props.onChange]);

    console.log('props.value', props.value);
    return (<>
        <IconButton aria-label="delete" size="small" onClick={handleClick}>
            <MoreVertIcon fontSize="inherit" />
        </IconButton>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {props.filterOptions!.map((option, index) => (
                <MenuItem key={index} value={option.value} onClick={() => optionSelected(option)}>
                    <ListItemIcon>
                        {props.value == option.value && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>{option.label}</ListItemText>
                </MenuItem>
            ))}
        </Menu>
    </>)
}

export const DefaultStringFilterOptions: {
    filterOptions: ColumnDefFilter['filterOptions'],
    defaultFilterOption: string | number
} = {
    filterOptions: [
        { value: 'contains', label: 'Contains', iconText: '∗' },
        { value: 'starts-with', label: 'Starts With', iconText: '∗[' },
        { value: 'ends-with', label: 'Ends With', iconText: ']∗' },
        { value: 'equals', label: 'Equals', iconText: '=' },
    ],
    defaultFilterOption: 'contains'
}

export const DefaultNumberDateFilterOptions: {
    filterOptions:ColumnDefFilter['filterOptions'],
    defaultFilterOption: string | number
 } = {
    filterOptions: [
        { value: 'less-than', label: 'Less Than', iconText: '<' },
        { value: 'less-or-equal-than', label: 'Less or Equal Than', iconText: '<=' },
        { value: 'bigger-than', label: 'Bigger Than', iconText: '>' },
        { value: 'bigger-or-equal-than', label: 'Bigger or Equal Than', iconText: '>=' },
        { value: 'equals', label: 'Equals', iconText: '=' },
    ],
    defaultFilterOption: 'equals'
}

export type FilterValue = {
    filterOption: string | number,
    value: any
}
export type Filter = Record<string, FilterValue>