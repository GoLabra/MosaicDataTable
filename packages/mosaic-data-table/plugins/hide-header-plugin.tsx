import { MosaicDataTableHeadRowStylePlugin } from "../types/table-types";

export const HideHeaderPlugin:MosaicDataTableHeadRowStylePlugin = {
    scope: 'head-row-style',
    getHeadRowStyle: () => {
        return { 'visibility': 'collapse' }
    } 
}