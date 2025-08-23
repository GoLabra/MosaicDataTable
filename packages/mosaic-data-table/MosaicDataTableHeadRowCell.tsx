import { Box, TableCellProps } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import React, { ReactNode, useMemo } from 'react'
import { MosaicDataTableCellRoot } from './style'
import { ColumnDef, GridApi, MosaicDataTableHeadCellContentRenderPlugin, MosaicDataTableHeadCellStylePlugin, MosaicDataTableHeadRowCellPropsPlugin } from './types/table-types'
import { filterGridPluginsByColumnScope } from './util/filterGridPlugins'

export const MosaicDataTableHeadCell = <T,>(props: {
	headCell: ColumnDef<T>;
	gridApi: React.MutableRefObject<GridApi>
	caller: string;
}) => {

	const pluginMap = props.gridApi.current.pluginMap

	const cellStyle = useMemo((): SxProps<Theme> => {
		return pluginMap.headCellStyle.reduce((acc: SxProps<Theme>, plugin: MosaicDataTableHeadCellStylePlugin) => {
			const cellStyle = plugin.getHeadCellStyle?.({ headcell: props.headCell, gridApi: props.gridApi.current, caller: props.caller });
			return {
				...acc,
				...cellStyle
			}
		}, {});
	}, [pluginMap.headCellStyle, props.headCell, props.caller]);

	const cellProps = useMemo(() => {
		return pluginMap.headRowCellProps.reduce((acc: TableCellProps, plugin: MosaicDataTableHeadRowCellPropsPlugin) => {
			const headRowCellProps = plugin.getHeadRowCellProps({ columnDef: props.headCell, gridApi: props.gridApi.current });
			return {
				...acc,
				...headRowCellProps
			}
		}, {});
	}, [pluginMap.headRowCellProps, props.headCell]);

	const contentRenderPlugins = useMemo((): MosaicDataTableHeadCellContentRenderPlugin[] => {
		return filterGridPluginsByColumnScope<MosaicDataTableHeadCellContentRenderPlugin>(pluginMap.headCellContentRender, 'renderHeadCellContentColumnScope', props.headCell.id);
	}, [pluginMap.headCellContentRender, props.headCell.id]);

	const cellContent = useMemo(() => {
		const initialContent = props.caller == 'mosaic-data-table' ? typeof props.headCell.header === 'function' ? props.headCell.header() : props.headCell.header : '';
		const initialBoxContent = (<Box className="MosaicDataTable-headcell-data">{initialContent}</Box>)

		return pluginMap.headCellContentRender.reduce((acc: ReactNode | null, plugin: MosaicDataTableHeadCellContentRenderPlugin) => {
			const cellContent = plugin.renderHeadCellContent?.({ headcell: props.headCell, gridApi: props.gridApi.current, caller: props.caller, children: acc });
			return cellContent;
		}, initialBoxContent);

	}, [contentRenderPlugins, props.headCell, props.caller]);

	// Optimized getCell function with better memoization
	const getCell = useMemo(() => {
		// Check plugins first - most common case
		for (const plugin of pluginMap.headCellRender) {
			const cell = plugin.renderHeadCell?.({ 
				headcell: props.headCell, 
				gridApi: props.gridApi.current, 
				caller: props.caller, 
				props: cellProps, 
				sx: cellStyle, 
				children: cellContent 
			});
			if (cell) {
				return cell;
			}
		}

		// Default cell rendering
		return (
			<MosaicDataTableCellRoot
				key={props.headCell.id as string}
				align="left"
				padding="normal"
				sx={{
					minWidth: props.headCell.width,
					width: props.headCell.width,
					...cellStyle
				}}
				{...cellProps}
			>
				{cellContent}
			</MosaicDataTableCellRoot>
		);

	}, [pluginMap.headCellRender, props.headCell, props.caller, cellContent, cellProps, cellStyle]);

	return getCell;
}
