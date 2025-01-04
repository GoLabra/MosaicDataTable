import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyCellContentRenderPlugin } from "../types/table-types";


export const CustomBodyCellContentRenderPlugin: MosaicDataTableBodyCellContentRenderPlugin = {
    type: 'body-cell-content-render',
    renderBodyCellContent: (headCell: HeadCell<any>, row: any, gridApi: GridApi, children?: ReactNode) => {
        const value = headCell.render?.(row);
        return value;
    }
}