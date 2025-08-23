import { Box } from "@mui/material";
import { ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableBodyRowCellPropsPlugin } from "mosaic-data-table";
import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";


export const InlineEditPlugin = (props: {
    onGetRowId: (row: any) => string,
    onCellValueChanged: (rowId: string, columnId: string, value: any) => void,
}): MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        scope: ['body-cell-content-render'],
        renderBodyCellContent: ({headcell, row, children}) => {

            const rowId = props.onGetRowId(row);

            return (<EditableCell columnDef={headcell} row={row} rowId={rowId} onCellValueChanged={props.onCellValueChanged} >{children}</EditableCell>);
        },
    }

}

interface EdiutableCellProps {
	columnDef: ColumnDef<any>;
	row: any;
	rowId: string;
	onCellValueChanged: (rowId: string, columnId: string, value: any) => void,
}
const EditableCell = (props: PropsWithChildren<EdiutableCellProps>) => {

	const [isEditing, setIsEditing] = useState(false);

	// exclude non-data cells
	if(!props.columnDef.cell ) {
		return props.children;
	}

	if(isEditing == false) {
		return (<Box onClick={() => setIsEditing(true)}>
			{props.children}
		</Box>)
	}

	return (<>
		<input
                type="text"
                autoFocus={true}
                defaultValue={props.columnDef.cell?.(props.row) as string}
                onBlur={(event) => {
                    props.onCellValueChanged(props.rowId, props.columnDef.id, event.target.value);
                    setIsEditing(false);
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    paddingLeft: '8px'
                }}
                 
                />
	</>)
}