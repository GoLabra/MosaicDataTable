import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin, MosaicDataTableGridColumnsPlugin } from "../types/table-types";
import { DockedDiv, MosaicDataTableCellRoot } from "../style";
import { Skeleton, TableBody, TableBodyProps, TableCell, TableRow } from "@mui/material";

export const SkeletonLoadingPlugin = ({
    isLoading,
    rowsWhenEmpty = 5,
    maxRowsWhenNotEmpty
}: {
    isLoading: boolean,
    rowsWhenEmpty?: number,
    maxRowsWhenNotEmpty?: number
}): MosaicDataTableBodyRenderPlugin & MosaicDataTableGridColumnsPlugin => {

    return {
        scope: ['body-render', 'grid-columns'] as const,
        getColumns: ({headCells, memoStore}) => {

            if (!isLoading) {
                return headCells;
            }

            return memoStore.memoFunction('skeleton-columns', (headCells: Array<ColumnDef<any>>) => {
                return headCells.map((headCell: ColumnDef) => ({
                    ...headCell,
                    pin: undefined
                }));
            })(headCells);
        },
        renderBody: ({headCells, rows}) => {

            if (!isLoading) {
                return null;
            }
 
            return <TableBody>
                {isLoading && (<SkeleonRows columns={headCells.length} rows={ rows?.length === 0 ? rowsWhenEmpty : Math.min(rows.length, maxRowsWhenNotEmpty ?? rows.length)} />)}
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
