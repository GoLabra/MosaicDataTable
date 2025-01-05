import { SvgIcon } from "@mui/material";
import { SxProps } from "@mui/material/styles";
import RomaniaIcon from "./RO";
import FranceIcon from "./FR";
import ItalyIcon from "./IT";
import EspanaIcon from "./ES";
import USAIcon from "./US";
import AustriaIcon from "./AT";

interface CountryIconProps {
    country: string;
    sx?: SxProps;
}

export const CountryIcon = ({ country, sx }: CountryIconProps) => {
    if(!country){
        return null;
    }
    
    const countryComponents: Record<string, React.ReactNode> = {
        ro: <RomaniaIcon sx={sx} />,
        fr: <FranceIcon sx={sx} />,
        it: <ItalyIcon sx={sx} />,
        es: <EspanaIcon sx={sx} />,
        us: <USAIcon sx={sx} />,
        at: <AustriaIcon sx={sx} />,
    };

    const countryKey = country.toLowerCase();
    return countryComponents[countryKey] || null;
};