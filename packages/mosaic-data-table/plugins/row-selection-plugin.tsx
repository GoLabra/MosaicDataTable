import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { Box, Checkbox } from "@mui/material";
 
const sys_selection_column = {
    id: 'sys_selection',
    label: '',
    width: 40,
    pin: 'left'
};

export const RowSelectionPlugin = (props: {
    visible?: boolean,
    onGetRowId: (row: any) => string,
    onSelectOne: (id: any) => void,
    onDeselectOne: (id: any) => void,
    selectedIds: Array<any>
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        displayName: 'RowSelectionPlugin',
        scope: ['grid-columns', 'body-cell-content-render'] as const,
        getColumns: (headCells: Array<ColumnDef<any>>) => {

            const visible = props.visible ?? true;
            if (!visible) {
                return headCells;
            }

            return [
                sys_selection_column,
                ...headCells
            ];
        },
        renderBodyCellContent: (headCell: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

            if (row && row['sys_extra_row']) {
                return children;
            }

            if (headCell.id == 'sys_selection') {

                const rowId = props.onGetRowId?.(row) ?? null;
                const isSelected = !!props.selectedIds.find((id) => id == rowId, [rowId]);

                const result = gridApi.memoStore.memoFunction(`sys_selection${rowId}`, getCheckbox); 
                return result(rowId, isSelected, props.onSelectOne, props.onDeselectOne);
            }

            return children;
        }
    }
}



const getCheckbox = (rowId: string, isSelected: boolean, onSelectOne: (id: any) => void, onDeselectOne: (id: any) => void,) => {
    return (<Box key={rowId} sx={{ textAlign: 'center' }}><Checkbox
        checked={isSelected}
        onChange={(event: any) => {
            if (event.target.checked) {
                onSelectOne?.(rowId);
            } else {
                onDeselectOne?.(rowId);
            }
        }}
        sx={{
            margin: 0,
            padding: '0 5px'
        }}
        inputProps={{
            'aria-label': "Select row"
        }}
    />
    </Box>)
}