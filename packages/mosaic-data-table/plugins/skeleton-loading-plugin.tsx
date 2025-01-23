import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { DockedDiv, MosaicDataTableCellRoot } from "../style";
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export const SkeletonLoadingPlugin = ({
    isLoading,
    rowsWhenEmpty = 5
}: {
    isLoading: boolean,
    rowsWhenEmpty?: number
}): MosaicDataTableBodyRenderPlugin & MosaicDataTableGridColumnsPlugin => {

    return {
        scope: ['body-render', 'grid-columns'] as const,
        getColumns: (headCells: Array<ColumnDef>) => {

            if (!isLoading) {
                return headCells;
            }

            return headCells.map((headCell: ColumnDef) => ({
                    ...headCell,
                    pin: undefined
                }));
        },
        renderBody: (headCells: Array<ColumnDef<any>>, rows: any[], gridApi: GridApi, children?: ReactNode) => {

            if (!isLoading) {
                return null;
            }

            return <TableBody>
                {isLoading && (<SkeleonRows columns={headCells.length} rows={rows?.length || rowsWhenEmpty} />)}
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
