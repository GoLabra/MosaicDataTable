import React, { useRef, useEffect, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface AbsoluteHeightContainerProps {
    children?: React.ReactNode,
    sx?: SxProps<Theme>;
}
export const AbsoluteHeightContainer = ({ children, sx }: AbsoluteHeightContainerProps) => {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const [parentHeight, setParentHeight] = useState(0);

    // Function to measure and set parent height based on child's rendered height
    const updateParentHeight = () => {
        if (childRef.current) {
            const { offsetHeight } = childRef.current;
            setParentHeight(offsetHeight);
        }
    };

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            updateParentHeight();
        });

        if (childRef.current) {
            observer.observe(childRef.current);
        }

        return () => {
            if (childRef.current) {
                observer.unobserve(childRef.current);
            }
        };
    }, []);

    useEffect(() => {
        updateParentHeight();
    }, [children]);

    return (
        <>
            <Box
                ref={childRef}
                width={1}
                sx={{
                    ...sx,
                    position: 'absolute',
                }}
            >
                {children}
            </Box>

            <Box
                ref={parentRef}
                sx={{
                    height: parentHeight,
                    transition: 'height var(--mosaic-height-transition-duration, 80ms) ease-in-out',
                    '@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                    },
                }}></Box>
        </>
    );
}
