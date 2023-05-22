import styled from "@emotion/styled";
import { Box, Paper, Typography, useTheme } from "@mui/material"
import { ReactNode } from "react";

interface PagesLayoutProps {
  children: ReactNode;
  titulo: string;
  toolbar: ReactNode;
}

export const PagesLayout: React.FC<PagesLayoutProps> = ({children, titulo, toolbar }) => {
  const theme = useTheme();

  return(
      <Box height="100%" display="flex" flexDirection="column" gap={1} marginLeft={2}>
        <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(12)}>
          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            variant='h3'
          >
            {titulo}
          </Typography>
        </Box>

        <Box>
          {toolbar}
        </Box>

        <Box flex={1} overflow="auto">
          {children}
        </Box>

        <PagesLayoutFooter component={Paper} marginLeft={-2}>
          <Typography
            variant='h6'
          >
            Desenvolvido por Leonardo Katsuki, 2023
          </Typography>
        </PagesLayoutFooter>
      </Box>
  )
}


export const PagesLayoutFooter = styled(Box)`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-bottom: 0;
  font-weight: bold;
`
