import { lighten, styled } from '@mui/material';
import { Box, TableCell, TableRow } from "@mui/material";
import { tableRowClasses } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { TableRowProps } from '@mui/material/TableRow';
import { TableCellProps } from '@mui/material/TableCell';

export const MosaicDataTableRoot = styled(Box, {
    name: 'MosaicDataTable',
    slot: 'root',
})<BoxProps>(({ theme }) => ({
    position: 'relative',
    width: '100%',
    caption: {
        display: 'none'
    }
}));

export const MosaicDataTableRowRoot = styled(TableRow, {
    name: 'MosaicDataTableRow',
    slot: 'root',
})<TableRowProps>(({ theme }) => ({
    [`&.${tableRowClasses.hover}`]: {
        '&:hover': {
            backgroundColor: lighten(theme.palette.background!.paper!, 0.04),
            'td': {
                backgroundColor: lighten(theme.palette.background!.paper!, 0.04),
            }
        }
    },
    borderBottomWidth: 0,
    backgroundColor: theme.palette.background.paper,
}));

export const MosaicDataTableCellRoot = styled(TableCell, {
    name: 'MosaicDataTableCell',
    slot: 'root',
})<TableCellProps>(({ theme }) => {
    return {
        padding: 0,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: theme.palette.divider!,
    }
});

export const DockedDiv = styled(Box)<BoxProps>(({ theme }) => ({
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));
