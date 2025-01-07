
import { Typography } from '@mui/material';
import { FullImplementationTable } from '@/examples/full-implementation/full-implementation';
import { Suspense } from 'react';

export default function Home() {

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
                MosaicDataTable - Material UI - Next.js example in TypeScript
            </Typography>

            <Suspense fallback={<div>Loading...</div>}>
                <FullImplementationTable />
            </Suspense>
        </>
    );
}
