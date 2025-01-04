'use client';

import { useColorScheme, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ModeSwitch() {
    const { mode, setMode } = useColorScheme();
    
    // Add default fallback value
    const currentMode = mode || 'light';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1,
                p: 1,
            }}
        >
            <FormControl>
                <InputLabel id="mode-select-label">Theme</InputLabel>
                <Select
                    labelId="mode-select-label"
                    id="mode-select"
                    value={currentMode}
                    onChange={(event) => setMode(event.target.value as "light" | "dark" | "system")}
                    label="Theme"
                >
                    <MenuItem value="system">System</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
