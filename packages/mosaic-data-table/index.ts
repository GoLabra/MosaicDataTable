import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material'

// Export types
export type * from './types/table-types'

// Export hooks
export * from './hooks/useGridPlugins'
export * from './hooks/usePluginWithParams'
export * from './hooks/useResponsiveHeadCellVisible'

// Export main components
export { MosaicDataTable } from './MosaicDataTable'
export { AbsoluteHeightContainer } from './absolute-auto-height-container'
export * from './style'

// export all builed-in plugins
export * from './plugins/colum-sort-plugin'
export * from './plugins/culmns-fill-row-space-plugin'
export * from './plugins/custom-cell-content-render-plugin'
export * from './plugins/empty-data-plugin'
export * from './plugins/hide-header-plugin'
export * from './plugins/highlight-column-plugin'
export * from './plugins/highlight-row-plugin'
export * from './plugins/padding-plugin'
export * from './plugins/pinned-columns-plugin'
export * from './plugins/row-actions-plugin'
export * from './plugins/row-detail-plugin'
export * from './plugins/row-selection-plugin'
export * from './plugins/skeleton-loading-plugin'
export * from './plugins/summary-row-plugin'
export * from './plugins/filter-row-plugin'
export * from './plugins/events-plugin'


// MUI THEME INTEGRATION
declare module '@mui/material/styles/components' {
    interface Components<Theme = unknown> {
        MosaicDataTable?: {
            defaultProps?: ComponentsProps['MuiTable'];
            styleOverrides?: ComponentsOverrides<Theme>['MuiTable'];
            variants?: ComponentsVariants<Theme>['MuiTable'];
        },
        MuiCardFooter?: {
            defaultProps?: ComponentsProps['MuiCardHeader'];
            styleOverrides?: ComponentsOverrides<Theme>['MuiCardHeader'];
            variants?: ComponentsVariants<Theme>['MuiCardHeader'];
        }
    }
}