import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Menu } from '@/components/menu';
import ModeSwitch from '@/components/ModeSwitch';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="class" />
                <AppRouterCacheProvider options={{ enableCssLayer: false }}>
                    <ThemeProvider theme={theme} >
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />


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
                                {props.children}


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
