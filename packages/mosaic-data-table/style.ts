import { darken, lighten, styled } from '@mui/material';
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
    },
    backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',
}));

export const MosaicDataTableRowRoot = styled(TableRow, {
    name: 'MosaicDataTableRow',
    slot: 'root',
})<TableRowProps>(({ theme }) => ([
    {
        borderBottomWidth: 0,
        backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',

        [`&.${tableRowClasses.root}`]: {
            'td': {
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',
                },
            },

         [`&.${tableRowClasses.hover}`]: {
            '&:hover': {
                backgroundColor: 'var(--mui-palette-MosaicDataTable-rowHover)',
                'td': {
                    backgroundColor: 'var(--mui-palette-MosaicDataTable-rowHover)',
                }
            }
        },
    },
]));

export const MosaicDataTableCellRoot = styled(TableCell, {
    name: 'MosaicDataTableCell',
    slot: 'root',
})<TableCellProps>(({ theme }) => {
    return {
        padding: 0,
        height: '100%',
        backgroundColor: 'var(--mui-palette-MosaicDataTable-background)',
        borderBottomWidth: 1,
        borderBottomStyle: 'dashed',
        borderBottomColor: theme.palette.divider!,
    }
});

export const DockedDiv = styled(Box)<BoxProps>(({ theme }) => ({
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));


declare module '@mui/material/styles' {
    interface Palette {
        MosaicDataTable: {
            background: string;
            highlight: string;
            rowHover: string;
        };
    }
    interface PaletteOptions {
        MosaicDataTable?: {
            background?: string;
            highlight?: string;
            rowHover?: string;
        };
    }
  }