import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { Box, Checkbox } from "@mui/material";

export const RowSelectionPlugin = (props: {
    onGetRowId: (row: any) => string,
    onSelectOne: (id: any) => void,
    onDeselectOne: (id: any) => void,
    selectedIds: Array<any>
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        type: ['grid-columns', 'body-cell-content-render'] as const,
        getColumns: (headCells: Array<HeadCell<any>>) => {
            return [
                {
                    id: 'sys_selection',
                    label: '',
                    width: 40,
                    pin: 'left'
                },
                ...headCells
            ];
        },
        renderBodyCellContent: (headCell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
            if (headCell.id == 'sys_selection') {

                const rowId = props.onGetRowId?.(row) ?? null;
                const isSelected = !!props.selectedIds.find((id) => id == rowId, [rowId]);

                return (
                    <Box sx={{ textAlign: 'center' }}><Checkbox
                        checked={isSelected}
                        onChange={(event: any) => {
                            if (event.target.checked) {
                                props.onSelectOne?.(rowId);
                            } else {
                                props.onDeselectOne?.(rowId);
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

            return children;
        }
    }
}   