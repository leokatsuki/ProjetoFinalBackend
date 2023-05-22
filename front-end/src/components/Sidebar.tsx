import { Drawer, useTheme, Box, Divider, List, ListItemText, ListItemButton } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useAppThemeContext } from '../context/ThemeContext';
import homeIcon from '../assets/homeIcon.svg';
import homeIconLight from '../assets/homeIconLight.svg';
import personIcon from '../assets/personIcon.svg';
import personIconLight from '../assets/personIconLight.svg';
import toolIcon from '../assets/toolIcon.svg';
import toolIconLight from '../assets/toolIconLight.svg';
import sunIcon from '../assets/sunIcon.svg';
import sunIconLight from '../assets/sunIconLight.svg';
import styled from 'styled-components';


interface ListItemLinkProps {
  to: string;
  label: string;
  icon: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({to, label, icon}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  }
  
  return (
    <ListItemButton onClick={handleClick}>
      <ImageIcon src={icon} alt="icon" />
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

interface MenuLateralProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<MenuLateralProps> = ({children}) => {
  const theme = useTheme();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer variant="permanent">
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <img src="https://cialdf.com.br/wp-content/uploads/2020/03/logocial.png" alt="logo" />
          </Box>

          <Divider />

          <Box flex={1}> 
            <List component="nav">
              <ListItemLink
                to="/home"
                key="/home"
                label="Pagina Inicial"
                icon={theme.palette.mode === 'dark' ? homeIconLight : homeIcon}
              />
              <ListItemLink
                to="/clients"
                key="/clients"
                label="Clientes"
                icon={theme.palette.mode === 'dark' ? personIconLight : personIcon}
              />
              <ListItemLink
                to="/services"
                key="/services"
                label="Ordens de serviço"
                icon={theme.palette.mode === 'dark' ? toolIconLight : toolIcon}
              />
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ImageIcon src={theme.palette.mode === 'dark' ? sunIconLight : sunIcon} />
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};


export const ImageIcon = styled.img`
  margin-right: 10px;
`