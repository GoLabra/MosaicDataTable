import {Typography } from '@mui/material';
import { BasicTable } from '@/examples/basic/basic';

export default function BasicPage() {

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
                MosaicDataTable - Basic - Next.js example in TypeScript
            </Typography>

            <BasicTable />

        </>
    );
}
