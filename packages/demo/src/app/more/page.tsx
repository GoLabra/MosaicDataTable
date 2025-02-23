import { Stack, Typography } from '@mui/material';
import { RowHighlightTable } from '@/examples/row-highlight/row-highlight';
import { CustomPluginTable } from '@/examples/custom-plugin/custom-plugin';
import { RowExpansionTable } from '@/examples/row-expansion/row-expansion';
import { EventsTable } from '@/examples/events/events';
import { InlineEditTable } from '@/examples/inline-edit/inline-edit';


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
                <EventsTable />
                <InlineEditTable />
            </Stack>
        </>
    );
}
