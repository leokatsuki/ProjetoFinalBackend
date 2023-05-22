import { Box, Button, Divider, Paper, Typography, useTheme } from "@mui/material"

interface DetailsToolbarProps {
  goBack: () => void;

}

export const DetailsToolbar: React.FC<DetailsToolbarProps> = ({goBack}) => {
  const theme = useTheme();

  return(
    <Box width={1410} gap={1} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" component={Paper} height={theme.spacing(5)}>
      <Button 
        onClick={goBack}
        variant="outlined"  
      >
        <Typography variant="button" >
          Voltar
        </Typography>
      </Button>
    </Box>
  )
}