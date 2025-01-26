import { ReactNode } from "react";
import { GridApi, ColumnDef, MosaicDataTableBodyRenderPlugin } from "../types/table-types";
import { Box, TableBody, TableBodyProps, TableCell, TableRow } from "@mui/material";


export const EmptyDataPlugin = ({
    content = 'No data'
}: {
    content?: ReactNode
}): MosaicDataTableBodyRenderPlugin => {

    return {

        scope: 'body-render',
        renderBody: (headCells: Array<ColumnDef<any>>, rows: any[], gridApi: GridApi, bodyProps: TableBodyProps, children?: ReactNode) => {

            if (rows?.length) {
                return null;
            }

            return <TableBody>
                <TableRow>
                    <TableCell colSpan={headCells.length} sx={{ borderWidth: 0 }}>
                        <Box sx={{
                            height: '150px',
                            pointerEvents: 'none'
                        }}>
                            <Box sx={{
                                padding: '60px',
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                pointerEvents: 'none'
                            }}>
                                {content}
                            </Box>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
        }

    }
}   
