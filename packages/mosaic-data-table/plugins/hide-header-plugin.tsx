import { MosaicDataTableHeadRowStylePlugin } from "../types/table-types";

export const HideHeaderPlugin:MosaicDataTableHeadRowStylePlugin = {
    scope: 'head-row-style',
    getHeadRowStyle: (gridApi) => {
        return { 'visibility': 'collapse' }
    } 
}