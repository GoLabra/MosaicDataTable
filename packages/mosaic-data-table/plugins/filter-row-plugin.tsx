import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { GridApi, ColumnDef,  MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadCellContentRenderPlugin } from "../types/table-types";
import { MosaicDataTableHeadRow } from "../MosaicDataTableHeadRow";
import { Box,  debounce, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, styled, TextField, TextFieldProps } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import { DockedDiv } from "../style";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { useLocalizationContext } from "@mui/x-date-pickers/internals";

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
                const defaultOperator = typeof filterDef != 'string' ? filterDef.defaultOperator : undefined;
                const operators = typeof filterDef != 'string' ? filterDef.operators : undefined;
                const filterValue = filter?.[column.id];

                return (
                    <DockedWrapper key={column.id} className="MosaicDataTable-filter-row-docked">

                        <Box
                            key={column.id}
                            sx={{
                                width: '100%',
                                margin: '3px',
                                padding: '3px',
                                borderRadius: '3px',
                                backgroundColor: 'var(--mui-palette-background-paper)'
                            }}>
                            <ColumnFilter
                                key={`columnFilter-${column.id}`}
                                type={typeDef}
                                selectOptions={selectOptions}
                                options={operators}
                                defaultOperator={defaultOperator}
                                value={filterValue}
                                onChange={(columnFilter) => {

                                    if(!columnFilter){
                                        const newFilter = { ...filter };
                                        delete newFilter[column.id];
                                        filterChanged(newFilter);
                                        return;
                                    }

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


interface ColumnFilterProps {
    type: ColumnDefFilter['type'],
    options?: ColumnDefFilter['operators'],
    value?: FilterValue,
    onChange: (filter?: FilterValue | null) => void

    selectOptions?: ColumnDefFilter['operators'],
    defaultOperator?: string | number,
}
const ColumnFilter = (props: ColumnFilterProps) => {

    const { value, options } = props;

    const [internalValue, setInternalValue] = useState<FilterValue>({
        operation: value?.operation ?? props.defaultOperator ?? options?.[0]?.value ?? '',
        value: value?.value
    });
    
    const onChange = useCallback((newValue: FilterValue) => {
        if(!newValue?.value){
            props.onChange(null);
        } else {
            props.onChange(newValue);
        }

        setInternalValue(newValue);
        
    }, [props.onChange]);

    useEffect(() => {

        if(!value){
            setInternalValue({
                ...internalValue,
                value: null
            });
            return;
        }

        setInternalValue(value);
    }, [value]);

    return (<Stack direction="row" alignItems="center">

        {options && <ColumnDefFilterButtonOptions
            key={`column-def-filter-button-options-${props.type}`}
            value={internalValue.operation}
            defaultOperator={props.defaultOperator}
            operators={options}
            onChange={(newValue) => {
                onChange({
                    operation: newValue,
                    value: internalValue.value,
                });
            }}
        />}

        <FreeInput
            key={`free-input-${props.type}`}
            type={props.type}
            value={internalValue?.value}
            selectOptions={props.selectOptions}
            onChange={(newValue) => {
                onChange({
                    operation: internalValue.operation,
                    value: newValue,
                });
            }}
        />
        
    </Stack>)
}

interface FreeInputProps {
    type: ColumnDefFilter['type'],
    value?: string | number;
    selectOptions?: Extract<ColumnDefFilter, { type: 'select' }>['selectOptions'];
    onChange: (value: string | number) => void;
}
const FreeInput = (props: FreeInputProps) => {
    const InputComp = filterInputMap[props.type];

    const [internalValue, setInternalValue] = useState<string | number | undefined>(props.value);
    const memoizedDebounce = useMemo(() => debounce((value: string | number) => props.onChange(value), 300), [props.onChange]);

    useEffect(() => {
        setInternalValue(props.value);
    }, [props.value]);

    if (!InputComp) {
        console.log(`No input component for type ${props.type}`);
        return null;
    }

    return (
        <Box sx={{  
            width: '100%',
            padding: '0 5px'
         }} >

        <InputComp
            key={`input-${props.type}`}
            selectOptions={props.selectOptions}
            value={internalValue}
            onChange={(value: any) => {
                setInternalValue(value.target.value);
                memoizedDebounce(value.target.value);
            }}
        />
        </Box>
    );
};

export interface InputProps {
    value: any;
    onChange: (value: any) => void;
    selectOptions?: Extract<ColumnDefFilter, { type: 'select' }>['selectOptions'];
}
const TextInput = (props: InputProps & TextFieldProps) => {

    const {selectOptions, ...other} = props;
    
    return (<TextField id="outlined-basic" variant="standard" fullWidth
        
        slotProps={{
                input: {
                        disableUnderline: true,
            }
        }}
        {...other}
        value={props.value ?? ''}
    />)
}

const NumberInput = (props: InputProps) => {
    
    const {selectOptions, ...other} = props;

    return (<TextField type="number" id="outlined-basic" variant="standard" fullWidth
        slotProps={{
            input: {
                disableUnderline: true,
            }
        }}
        {...other}
        value={props.value ?? ''}
    />)
}

const SelectInput = (props: InputProps) => {

    const {selectOptions, ...other} = props;

    return (<TextField id="outlined-basic" variant="standard" fullWidth  select
        slotProps={{
            input: {
                disableUnderline: true,
            }
        }}
        {...other}
        value={props.value ?? ''}
    >
        <MenuItem value={''} sx={{ height: '36px' }}></MenuItem>
        {props.selectOptions!.map((option, index) => (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        ))}
    </TextField>)
}

const BooleanInput = (props: InputProps) => {

    const {selectOptions, ...other} = props;

    return (<TextField id="outlined-basic" variant="standard" fullWidth select
        slotProps={{
            input: {
                disableUnderline: true,
            }
        }}
        {...other}
        value={props.value ?? ''}
    >
        <MenuItem value={''} sx={{ height: '36px' }}></MenuItem>
        <MenuItem value={'true'}>True</MenuItem>
        <MenuItem value={'false'}>False</MenuItem>
    </TextField>)
}


const PickerBase = (props: InputProps & {
    Picker: React.FC<any>;
    format: (value: any) => string;
    parse: (value: string) => any;
}) => {

    const {Picker} = props;


    const localizationContext = useLocalizationContext();
    
    if (!localizationContext) {
        console.warn('No LocalizationProvider found. DatePicker requires LocalizationProvider to function.');
        return null;
    }
    
    const onChange = useCallback((value: any | null) => {
        
        if(!value){
            props.onChange({ target: { value: null } });
            return;
        }

        if(!value.isValid()){
            props.onChange({ target: { value: null } });    
            return;
        }   
             
        props.onChange({ target: { value: props.format(value)  } });
    }, [props.onChange]);

    const value = useMemo(( ) => {
        if(!props.value){
            return null;
        }
        return props.value ? props.parse(props.value) as any : null;
    }, [props.value]);

    return (<Picker value={value} onChange={onChange}
        slotProps={{
            textField: {
                InputProps:{
                    disableUnderline: true,
                  },

                variant: 'standard'
            },
            popper: {
                placement: "bottom-end",
                    popperOptions: {
                        modifiers: [
                              {
                                name: 'preventOverflow',
                                enabled: true,
                                options: {
                                  altAxis: true,
                                  altBoundary: false,
                                  tether: false,
                                  rootBoundary: 'viewport',
                                  padding: 0,
                                },
                              },
                        ]
                    }
            }
        }}
    />);

}

const DateInput = (props: InputProps) => {

    const localizationContext = useLocalizationContext();

    if (!localizationContext) {
        console.warn('No LocalizationProvider found. DatePicker requires LocalizationProvider to function.');
        return null;
    }

    const format = (value: any) => localizationContext.utils.formatByString(value, 'YYYY-MM-DD');
    const parse = (value: string) => localizationContext.utils.parse(props.value, 'YYYY-MM-DD') as any;
    return (<PickerBase {...props} format={format} parse={parse} Picker={DatePicker} />);
}

const TimeInput = (props: InputProps) => {

    const localizationContext = useLocalizationContext();
    
    const format = (value: any) => localizationContext.utils.formatByString(value, 'HH:mm:ss');
    const parse = (value: string) => localizationContext.utils.parse(props.value, 'HH:mm:ss') as any;
    return (<PickerBase {...props} format={format} parse={parse} Picker={TimePicker} />);
}


const DateTimeInput = (props: InputProps) => {

    const localizationContext = useLocalizationContext();
    
    const format = (value: any) => localizationContext.utils.formatByString(value, 'YYYY-MM-DD HH:mm:ss');
    const parse = (value: string) => localizationContext.utils.parse(props.value, 'YYYY-MM-DD HH:mm:ss') as any;
    return (<PickerBase {...props} format={format} parse={parse} Picker={DateTimePicker} />);
}

interface ColumnDefFilterButtonProps {
    value: any;
    onChange: (value: any) => void;
    operators: ColumnDefFilter['operators'];
    defaultOperator?: string | number;
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
            {props.operators!.map((option, index) => (
                <MenuItem key={index} value={option.value} onClick={() => optionSelected(option)}>
                    <ListItemIcon>
                        {option.value == props.value && <CheckIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>{option.label}</ListItemText>
                </MenuItem>
            ))}
        </Menu>
    </>)
}

export const DefaultStringFilterOptions: {
    operators: ColumnDefFilter['operators'],
    defaultOperator: string | number
} = {
    operators: [
        { value: 'contains', label: 'Contains', iconText: '∗' },
        { value: 'starts-with', label: 'Starts With', iconText: '∗[' },
        { value: 'ends-with', label: 'Ends With', iconText: ']∗' },
        { value: 'equals', label: 'Equals', iconText: '=' },
    ],
    defaultOperator: 'contains'
}

export const DefaultNumberDateFilterOptions: {
    operators:ColumnDefFilter['operators'],
    defaultOperator: string | number
 } = {
    operators: [
        { value: 'less-than', label: 'Less Than', iconText: '<' },
        { value: 'less-or-equal-than', label: 'Less or Equal Than', iconText: '<=' },
        { value: 'bigger-than', label: 'Bigger Than', iconText: '>' },
        { value: 'bigger-or-equal-than', label: 'Bigger or Equal Than', iconText: '>=' },
        { value: 'equals', label: 'Equals', iconText: '=' },
    ],
    defaultOperator: 'equals'
}

export const DockedWrapper = styled(DockedDiv)(({ theme }) => ({
    backgroundColor: 'var(--mui-palette-MosaicDataTable-extraRow)',
}));

export interface ColumnDefFilterTypeOverrides { }

let filterInputMap: Partial<Record<ColumnDefFilter['type'], React.FC<any>>> = {
    'string': TextInput,
    'select': SelectInput,
    'number': NumberInput,
    'boolean': BooleanInput,
    'date': DateInput,
    'time': TimeInput,
    'datetime': DateTimeInput
}

export interface IColumnDefFilter {
    type: 'string' | 'number' | 'date' | 'time' | 'datetime' | 'boolean' | keyof ColumnDefFilterTypeOverrides,
    operators?: { value: string | number, label: string, iconText?: string }[],
    defaultOperator?: string | number
}

export type ColumnDefFilter = IColumnDefFilter | {
    type: 'select',
    selectOptions?: { value: string | number, label: string }[]
    
    operators?: { value: string | number, label: string, iconText?: string }[],
    defaultOperator?: string | number,
};

export type FilterValue = {
    operation: string | number,
    value: any
}
export type Filter = Record<string, FilterValue>