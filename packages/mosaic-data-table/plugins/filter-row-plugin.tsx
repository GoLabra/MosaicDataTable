import React, { ReactNode, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { GridApi, ColumnDef,  MosaicDataTableHeadExtraRowEndPlugin, MosaicDataTableHeadCellContentRenderPlugin, Listener } from "../types/table-types";
import { MosaicDataTableHeadRow } from "../MosaicDataTableHeadRow";
import { Box,  debounce, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, styled, TextField, TextFieldProps } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import { DockedDiv } from "../style";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { useLocalizationContext } from "@mui/x-date-pickers/internals";



export interface FilterRowStore {
	subscribeKey: (key: string, listener: Listener) => () => void;
	getSnapshot: () => Filter;
	getFilter: (key: string) => FilterValue | null | undefined;
	setFilter: (key: string, filter: FilterValue) => void;
	clear: (key?: string) => void;
}
export function createFilterRowStore<T>(initialFilter?: Filter): FilterRowStore {

	const store = new Map<string, FilterValue>(); 

	if(initialFilter){
		Object.entries(initialFilter).forEach(([key, value]) => {
			store.set(key, value);
		});
	}
	const listenersByKey = new Map<string, Set<Listener>>();

	const notifyKey = (key: string) => {
		const ls = listenersByKey.get(key);
		if (!ls) {
			return;
		}
		ls.forEach((l) => l());
	};

	const notifyAll = () => {
		for (const listeners of listenersByKey.values()) {
			listeners.forEach((l) => l());
		}
	};
	
	const api = {
		subscribeKey(key: string, listener: Listener) {
			let set = listenersByKey.get(key);
			if (!set) {
				set = new Set();
				listenersByKey.set(key, set);
			}
			set.add(listener);
			return () => {
			  const s = listenersByKey.get(key);
			  if (!s) {
				return;
			  }
			  s.delete(listener);
			  if (s.size === 0) {
				listenersByKey.delete(key);
			  }
			};
		  },
		  getSnapshot() {
			return Object.fromEntries(store.entries());
		  },
		  getFilter(key: string) {
			return store.get(key);
		  },
		  setFilter(key: string, filter: FilterValue) {
			store.set(key, filter);
			notifyKey(key);
		  },
		  clear(key?: string){
			if(key){
				store.delete(key);
				notifyKey(key);
				return;
			}

			store.clear();
			notifyAll();
		  }
	};

	return api;
}

function useRowFilter<T = any>(store: FilterRowStore, key: string): FilterValue<T> | null | undefined {
	return useSyncExternalStore(
	  (notify) => store.subscribeKey(key, notify),
	  () => {
		const val = store.getFilter(key);
		return val;
	  },	
	  () => null
	);
  }

export const FilterRowPlugin = (props: {
    visible?: boolean,
    filterChanged: (filter: Filter) => void,
    filterColumns: Record<string, ColumnDefFilter | Exclude<ColumnDefFilter['type'], 'select'>>,
    key: string,
	store: FilterRowStore
}): MosaicDataTableHeadExtraRowEndPlugin & MosaicDataTableHeadCellContentRenderPlugin => {

    return {
        scope: ['head-extra-row-end', 'head-cell-content-render'] as const,
        getHeadExtraRowEnd: ({columns, gridApi}) => {

            if (!props.visible) {
                return null;
            }

            return (
                <MosaicDataTableHeadRow
                    key={`sys_extra_row_${props.key}`}
                    headCells={columns}
                    gridApi={{current:gridApi}}
                    caller={props.key}
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
        renderHeadCellContent: ({headcell, gridApi, caller, children}) => {

            if (caller != props.key) {
				return children;
			}

			const filterDef = props.filterColumns[headcell.id]
			if (!filterDef) {
				return <DockedWrapper key={headcell.id} className="MosaicDataTable-filter-row-docked">{children}</DockedWrapper>;
			}

			const typeDef = typeof filterDef === 'string' ? filterDef : filterDef.type;
			const selectOptions = typeof filterDef != 'string' && filterDef.type == 'select' ? filterDef.selectOptions : undefined;
			const defaultOperator = typeof filterDef != 'string' ? filterDef.defaultOperator : undefined;
			const operators = typeof filterDef != 'string' ? filterDef.operators : undefined;

			return (
				<DockedWrapper key={headcell.id} className="MosaicDataTable-filter-row-docked">

					<Box
						key={headcell.id}
						sx={{
							width: '100%',
							margin: '3px',
							padding: '3px',
							borderRadius: '3px',
							backgroundColor: 'var(--mui-palette-background-paper)'
						}}>
						<ColumnFilter
							key={`columnFilter-${headcell.id}`}
							id={headcell.id}
							type={typeDef}
							selectOptions={selectOptions}
							options={operators}
							defaultOperator={defaultOperator}
							store={props.store}
							onChange={(columnFilter) => {

								if(!columnFilter){
									props.store.clear(headcell.id);
								}

								props.filterChanged(props.store.getSnapshot())
							}} />
					</Box>

				</DockedWrapper>)
        }
    }
}


interface ColumnFilterProps {
	id: string,
    type: ColumnDefFilter['type'],
    options?: ColumnDefFilter['operators'],
    onChange: (filter?: FilterValue | null) => void

    selectOptions?: Extract<ColumnDefFilter, { type: 'select' }>['selectOptions'],
    defaultOperator?: string,

	store: FilterRowStore
}
const ColumnFilter = (props: ColumnFilterProps) => {

	const filterValue = useRowFilter(props.store, props.id);

    const [lastOperator, setLastOperator] = useState<string>(filterValue?.operator ?? props.defaultOperator ?? props.options?.[0]?.value ?? '');
    
	useEffect(() => {
		if(!filterValue){
			return;
		}

		if(!filterValue.operator){
			return;
		}

		setLastOperator(filterValue.operator);
	}, [filterValue]);

    const onChange = useCallback((newValue: FilterValue) => {
        if(newValue?.value == null || newValue?.value == undefined || newValue.value === ''){
			props.store.clear(props.id);
            props.onChange(null);
        } else {
			props.store.setFilter(props.id, newValue);
            props.onChange(newValue);
        }

        setLastOperator(newValue.operator);
        
    }, [props.onChange]);

    return (<Stack direction="row" alignItems="center">

        {props.options && <ColumnDefFilterButtonOptions
            key={`column-def-filter-button-options-${props.type}`}
            value={lastOperator}
            defaultOperator={props.defaultOperator}
            operators={props.options}
            onChange={(newValue) => {
                onChange({
                    operator: newValue,
                    value: filterValue?.value,
                });
            }}
        />}

        <FreeInput
            key={`free-input-${props.type}`}
            type={props.type}
            value={filterValue?.value}
            selectOptions={props.selectOptions}
            onChange={(newValue) => {
                onChange({
                    operator: lastOperator,
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
    const debounceOnChange = useMemo(() => debounce((value: string | number) => props.onChange(value), 600), [props.onChange]);

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
            value={props.value}
            onChange={(value: any) => {
                debounceOnChange(value.target.value);
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
    
    return (<TextField id="outlined-basic" variant="standard" fullWidth
        
        slotProps={{
                input: {
					disableUnderline: true,
            }
        }}
        onChange={props.onChange}
        defaultValue={props.value}
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
        defaultValue={props.value}
        onChange={(event) =>{
            props.onChange({
                ...event,
                target: {
                    ...event.target,
                    value: event.target.value === '' ? null : Number(event.target.value)
                }
            });
        }}
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
        defaultValue={props.value}
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
        defaultValue={props.value}
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
    
    const format = (value: any) => localizationContext.utils.formatByString(value, 'HH:mm:ss.SSS');
    const parse = (value: string) => localizationContext.utils.parse(props.value, 'HH:mm:ss.SSS') as any;
    return (<PickerBase {...props} format={format} parse={parse} Picker={TimePicker} />);
}


const DateTimeInput = (props: InputProps) => {

    const localizationContext = useLocalizationContext();
    
    const format = (value: any) => localizationContext.utils.formatByString(value, 'YYYY-MM-DDTHH:mm:ss.SSS');
    const parse = (value: string) => localizationContext.utils.parse(props.value, 'YYYY-MM-DDTHH:mm:ss.SSS') as any;
    return (<PickerBase {...props} format={format} parse={parse} Picker={DateTimePicker} />);
}

interface ColumnDefFilterButtonProps {
    value: any;
    onChange: (value: any) => void;
    operators: ColumnDefFilter['operators'];
    defaultOperator?: string;
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

    const memoizedDebounce = useMemo(() => debounce((value: string) => props.onChange(value), 0), [props.onChange]);

    const optionSelected = useCallback((option: { value: string, label: string }) => {
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
    defaultOperator: string
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
    defaultOperator: string
 } = {
    operators: [
        { value: 'less-than', label: 'Less Than', iconText: '<' },
        { value: 'less-or-equal-than', label: 'Less or Equal Than', iconText: '<=' },
        { value: 'bigger-than', label: 'Bigger Than', iconText: '>' },
        { value: 'bigger-or-equal-than', label: 'Bigger or Equal Than', iconText: '>=' },
        { value: 'equals', label: 'Equals', iconText: '=' },
    ],
    defaultOperator: 'less-or-equal-than'
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
    operators?: { value: string, label: string, iconText?: string }[],
    defaultOperator?: string
}

export type ColumnDefFilter = IColumnDefFilter | {
    type: 'select',
    selectOptions?: { value: string | number, label: string }[]
    
    operators?: { value: string, label: string, iconText?: string }[],
    defaultOperator?: string,
};

export type FilterValue<T = any> = {
    operator: string,
    value: T
}
export type Filter<T = any> = Record<string, FilterValue<T>>