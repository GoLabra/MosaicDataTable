'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                // override the default palette
                MosaicDataTable: {
                    'background': 'var(--mui-palette-background-paper)',
                    'highlight': 'color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), var(--mui-palette-MosaicDataTable-background) 70%)',
                    'rowHover': 'color-mix(in srgb, rgb(var(--mui-palette-background-paperChannel)), var(--mui-palette-common-onBackground) 7%)',
                }
            }
        }, dark: {
            palette: {
                // override the default palette
                MosaicDataTable: {
                    'background': 'var(--mui-palette-background-paper)',
                    'highlight': 'color-mix(in srgb, rgb(var(--mui-palette-primary-mainChannel)), var(--mui-palette-MosaicDataTable-background) 70%)',
                    'rowHover': 'color-mix(in srgb, rgb(var(--mui-palette-background-paperChannel)), var(--mui-palette-common-onBackground) 7%)',
                }
            }
        }
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { severity: 'info' },
                            style: {
                                backgroundColor: '#60a5fa',
                            },
                        },
                    ],
                },
            },
        },
    },
});

export default theme;
