import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyRenderPlugin } from "../types/table-types";
import { DockedDiv, MosaicDataTableCellRoot } from "../style";
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export const SkeletonLoadingPlugin = (props: {
    isLoading: boolean
}): MosaicDataTableBodyRenderPlugin => {

    return {
        type: 'body-render',
        renderBody: (headCells: Array<HeadCell<any>>, rows: any[], gridApi: GridApi, children?: ReactNode) => {

            if (!props.isLoading) {
                return null;
            }

            return <TableBody>
                {props.isLoading && (<SkeleonRows columns={headCells.length} rows={rows?.length ?? 5} />)}
            </TableBody>
        }
    }
}




interface SkeleonRowsProps {
    columns: number;
    rows: number;
    cellHeight?: number | null;
}
export const SkeleonRows = (props: SkeleonRowsProps) => {

    const { columns, rows, cellHeight } = props;

    return (
        Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>

                {Array.from({ length: columns }).map((_, cellIndex) => (
                    <MosaicDataTableCellRoot key={`cell-${rowIndex}-${cellIndex}`} sx={{
                        ...(!!cellHeight && { height: cellHeight })
                    }}>
                        <DockedDiv className="MuiTableCellDockedDiv-root" sx={{ padding: '5px 10px' }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', flexGrow: 1 }} />
                        </DockedDiv>
                    </MosaicDataTableCellRoot>
                ))
                }
            </TableRow>
        ))
    )
}
