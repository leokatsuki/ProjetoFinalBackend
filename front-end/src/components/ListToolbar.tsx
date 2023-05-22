import { Box, Button, Paper, TextField, useTheme } from "@mui/material"
interface ListToolbarProps {
  buttonName?: string;
  newButton?: () => void;
  searchName?: string;
  ShowButton?: boolean;
  ShowSearch?: boolean;
}

export const ListToolbar: React.FC<ListToolbarProps> = ({buttonName, searchName, newButton, ShowButton=true, ShowSearch=false}) => {
  const theme = useTheme();

  return(
    <Box width={1410} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" component={Paper} height={theme.spacing(5)}>
      {ShowSearch && (
        <TextField size="small" placeholder={searchName} />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {ShowButton && (
          <Button
          variant="contained"
          color="primary"
          onClick={newButton}
          >
            {buttonName}
          </Button>
        )}
      </Box>
    </Box>
  )
}