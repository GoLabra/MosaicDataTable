import { Box } from "@mui/material";
import { ColumnDef, GridApi, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "mosaic-data-table";
import React, { useCallback, useMemo, useState } from "react";
import { ReactNode } from "react";



export const useInlineEditPluginStore = () => {
    const [editableCell, setEditableCell] = useState<{ columnId: string, rowId: string, originalValue: any } | null>(null);

    const enterCellInEditMode = useCallback((columnId: string, rowId: string, params: any, openImmediately?: boolean) => {
        setEditableCell({
            columnId,
            rowId,
            originalValue: params
        });
    }, [setEditableCell]);

    const isCellInEditMode = useCallback((columnDef: ColumnDef<any>, rowId: string) => {
        if (!editableCell) {
            return false;
        }
        return editableCell?.columnId == columnDef.id && editableCell.rowId == rowId;
    }, [editableCell]);

    const clearEditableCell = useCallback((columnDef: ColumnDef<any>, rowId: string) => {
        setEditableCell((prevState) => {
            if (prevState?.columnId == columnDef.id && prevState.rowId == rowId) {
                return null;
            }
            return prevState;
        });
    }, [setEditableCell]);

    return useMemo(() => ({
        editableCell,
        enterCellInEditMode,
        isCellInEditMode,
        clearEditableCell
    }), [editableCell, isCellInEditMode, enterCellInEditMode, clearEditableCell]);
}



export const InlineEditPlugin = (props: {

    inlineEditStore: ReturnType<typeof useInlineEditPluginStore>,
    onGetRowId: (row: any) => string,
    onCellValueChanged: (rowId: string, columnId: string, value: any) => void,
}): MosaicDataTableBodyCellContentRenderPlugin & MosaicDataTableBodyRowCellPropsPlugin => {

    return {
        scope: ['body-cell-content-render', 'body-row-cell-props'],
        renderBodyCellContent: (columnDef: ColumnDef<any>, row: any, gridApi: GridApi, children?: ReactNode) => {

            const rowId = props.onGetRowId(row);
            if (props.inlineEditStore.isCellInEditMode(columnDef, rowId) == false) {
                return children;
            }

            return (<input
                key={`inline-edit-${columnDef.id}-${rowId}`}
                type="text"
                autoFocus={true}
                defaultValue={columnDef.cell!(row) as string}
                onBlur={(event) => {
                    props.onCellValueChanged(rowId, columnDef.id, event.target.value);
                    props.inlineEditStore.clearEditableCell(columnDef, rowId);
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    paddingLeft: '8px'
                }}
                 
                />);
        },
        getBodyRowCellProps: (columnDef: ColumnDef<any>, row: any, gridApi: GridApi) => {

            if (columnDef.id == 'sys_actions') {
                return null;
            }

            if (columnDef.id == 'id') {
                return null;
            }

            return {
                onClick: (event: React.MouseEvent<HTMLTableCellElement>) => {
                    props.inlineEditStore.enterCellInEditMode(columnDef.id, props.onGetRowId(row), columnDef.cell!(row) as string);
                }
            }
        }
    }

}
