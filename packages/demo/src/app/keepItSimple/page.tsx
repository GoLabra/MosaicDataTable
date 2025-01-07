import {Typography } from '@mui/material';
import { KeepItSimpleTable } from '@/examples/keep-it-simple/keep-it-simple';

export default function KeepItSimplePage() {

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
                MosaicDataTable - Keep it simple - example in TypeScript
            </Typography>

            <KeepItSimpleTable />

        </>
    );
}
