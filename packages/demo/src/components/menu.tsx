'use client';

import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from '@mui/material/Link';
import NextLink from 'next/link';

export const Menu = () => {

    return (
        <List>
            <ListItem>
                <Link href="/" component={NextLink}>
                    <ListItemText primary="Full" />
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/basic" component={NextLink}>
                    <ListItemText primary="Basic" />
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/keepItSimple" component={NextLink}>
                    <ListItemText primary="Keep it simple" />
                </Link>
            </ListItem>
            <ListItem>
                <Link href="/more" component={NextLink}>
                    <ListItemText primary="More Examples" />
                </Link>
            </ListItem>
        </List>
    );
}