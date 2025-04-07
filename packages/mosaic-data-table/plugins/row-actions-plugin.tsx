import { ReactNode, useState } from "react";
import { Action, GridApi, ColumnDef, MosaicDataTableBodyCellContentRenderPlugin, MosaicDataTableGridColumnsPlugin, MosaicDataTablePlugin } from "../types/table-types";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, IconButton, Menu } from "@mui/material";

const sys_actions = {
    id: 'sys_actions',
    label: '',
    width: 46,
    pin: 'right',
};

export const RowActionsPlugin = (props: {
    actions: Action<any>[],
    visible?: boolean
}): MosaicDataTableGridColumnsPlugin & MosaicDataTableBodyCellContentRenderPlugin => {

    return {
        displayName: 'RowActionsPlugin',
        scope: ['grid-columns', 'body-cell-content-render'] as const,
        getColumns: ({ headCells, memoStore }) => {

            if((props.visible ?? true) == false){
                return headCells;
            }

            return memoStore.memoFunction('sys_actions-columns', (headCells: Array<ColumnDef<any>>) => [
                ...headCells,
                sys_actions
            ])(headCells);
        },
        renderBodyCellContentColumnScope: 'sys_actions',
        renderBodyCellContent: ({ headcell, row, rowId, gridApi, children }) => {

            if((props.visible ?? true) == false){
                return children;
            }

            if (row && row['sys_extra_row']) {
                return children;
            }

            if (headcell.id == 'sys_actions') {
                return (<Box sx={{ textAlign: 'center' }}>
                    <ActionButton actions={props.actions} row={row} />
                </Box>)
            }

            return children;
        }
    }
}

interface ActionButtonProps {
    actions: Action<any>[],
    row: any
}
const ActionButton = (props: ActionButtonProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentTarget, setCurrenttarget] = useState<any>()
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>, actionOn: any) => {
        setAnchorEl(event.currentTarget)
        setCurrenttarget(actionOn)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setCurrenttarget(undefined)
    }

    return (<>
        <IconButton
            onClick={(event) => handleClick(event, props.row)}
            size="medium"
            sx={{ m: '0 3px' }}
            aria-label="Actions"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="menu"
            aria-expanded={open ? 'true' : undefined}
            id={`user-menu-btn`}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            id={`user-menu`}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {props.actions.filter((a) => a.isVisible?.(props.row) ?? true)
                .map((a) => a.render(currentTarget || props.row))}
        </Menu>
    </>)
};