import { ReactNode } from "react";
import { GridApi, HeadCell, MosaicDataTableBodyRenderPlugin } from "../types/table-types";
import { Box, TableBody, TableCell, TableRow } from "@mui/material";


export const EmptyDataPlugin = ({
    content = 'No data'
}: {
    content?: ReactNode
}): MosaicDataTableBodyRenderPlugin => {

    return {

        type: 'body-render',
        renderBody: (headCells: Array<HeadCell<any>>, rows: any[], gridApi: GridApi, children?: ReactNode) => {

            if (rows?.length) {
                return null;
            }

            return <TableBody>
                <TableRow>
                    <TableCell>
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
