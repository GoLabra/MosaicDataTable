import { Stack, Typography } from '@mui/material';
import { BasicTable } from '@/examples/basic/basic';
import { RowHighlightTable } from '@/examples/row-highlight/row-highlight';
import { CustomPluginTable } from '@/examples/custom-plugin/custom-plugin';
import { RowExpansionTable } from '@/examples/row-expansion/row-expansion';

export default function BasicPage() {

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
                MosaicDataTable - More Examples - Next.js example in TypeScript
            </Typography>

            <Stack gap={10} width="100%">

                <RowHighlightTable />
                <CustomPluginTable />
                <RowExpansionTable />
            </Stack>
        </>
    );
}
