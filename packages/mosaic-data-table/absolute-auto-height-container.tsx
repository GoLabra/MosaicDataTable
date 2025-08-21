import React, { useRef, useEffect, useState } from 'react';
import { Box, BoxProps, SxProps, Theme } from '@mui/material';

interface AbsoluteHeightContainerProps {
    children?: React.ReactNode,
    sx?: SxProps<Theme>;
	slots?: {
		filler?: BoxProps
	}
}
export const AbsoluteHeightContainer = (props: AbsoluteHeightContainerProps) => {
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
    }, [props.children]);

    return (
        <>
            <Box
                ref={childRef}
                width={1}
                sx={{
                    ...props.sx,
                    position: 'absolute',
                }}
            >
                {props.children}
            </Box>

            <Box
                ref={parentRef}
				{...props.slots?.filler}
                sx={{
                    height: parentHeight,
                    transition: 'height var(--mosaic-height-transition-duration, 80ms) ease-in-out',
					
                    '&.no-animation': {
                        transition: 'none',
                    },
					'@media (prefers-reduced-motion: reduce)': {
                        transition: 'none',
                    },
					...props.slots?.filler?.sx
                }}></Box>
        </>
    );
}
