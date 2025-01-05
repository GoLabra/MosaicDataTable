import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

interface ResponsivePinProps {
    breakpoint: Breakpoint | number;
    direction?: 'up' | 'down'
}
export const useResponsiveHeadCellVisible = ({
    breakpoint,
    direction = 'up'
}: ResponsivePinProps): boolean => {
    const isActive = useMediaQuery((theme: Theme) => theme.breakpoints[direction](breakpoint));
    if(isActive){
        return true;
    }
    return false;
}