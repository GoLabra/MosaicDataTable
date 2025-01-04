import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from '@mui/material'

// Export types
export type * from './types/table-types'

// Export hooks
export * from './hooks/useGridPlugins'
export * from './hooks/usePluginWithParams'

// Export main components
export { MosaicDataTable } from './MosaicDataTable'
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
export * from './plugins/row-expansion-plugin'
export * from './plugins/row-selection-plugin'
export * from './plugins/skeleton-loading-plugin'


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