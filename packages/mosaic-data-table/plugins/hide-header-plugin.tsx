import { MosaicDataTableHeadRowStylePlugin } from "../types/table-types";

export const HideHeaderPlugin:MosaicDataTableHeadRowStylePlugin = {
    type: 'head-row-style',
    getHeadRowStyle: (gridApi) => {
        return { 'visibility': 'collapse' }
    }
    
}