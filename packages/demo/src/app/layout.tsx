import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Menu } from '@/components/menu';
import ModeSwitch from '@/components/ModeSwitch';
import { ClientProviders } from './providers';
import Copyright from '@/components/Copyright';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>

                    <InitColorSchemeScript defaultMode="system" modeStorageKey="theme-mode" attribute="class" />
                    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
                        <ThemeProvider theme={theme} defaultMode="system" modeStorageKey="theme-mode">
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline enableColorScheme />

                            <Container maxWidth="lg">

                                <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={1}>
                                    <ModeSwitch />
                                </Stack>


                                <Box
                                    sx={{
                                        my: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ClientProviders>
                                        {props.children}
                                    </ClientProviders>


                                </Box>

                                <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={1}>
                                    <Copyright />
                                    <IconButton
                                        color="primary"
                                        component="a"
                                        href="https://github.com/GoLabra/MosaicDataTable"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ width: 'auto' }}
                                    >
                                        <GitHubIcon />
                                    </IconButton>
                                </Stack>

                                <Menu />
                            </Container>



                        </ThemeProvider>
                    </AppRouterCacheProvider>
            
            </body>
        </html>
    );
}
