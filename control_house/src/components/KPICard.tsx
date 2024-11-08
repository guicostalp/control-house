import { Box, Typography } from '@mui/material';



type Props ={

    title: string;
    value?: number | string;


}

const KPICard = ({title, value}: Props) => {


  return (

    <>
        <Box display="flex" flexDirection="column" overflow="hidden" gap="8px" width="100%" height="100%" textAlign="center" >
            <Typography flex="1" variant="h4" fontSize="1rem" whiteSpace="nowrap" mb=".01rem">
                {title}
            </Typography>

            <Box flex="1" fontSize="clamp(0.2rem, 1.8rem, 1.8rem)">
                {value}
            </Box>
        </Box>

    </>

  )
};

export default KPICard;
