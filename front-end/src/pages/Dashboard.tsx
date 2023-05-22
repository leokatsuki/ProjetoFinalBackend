import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { ListToolbar } from "../components/ListToolbar"
import { PagesLayout } from "../layout/PagesLayout"
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    const getTotalClients = async () => {
      try {
        const response = await axios.get('http://localhost:3334/clients')
        const clientsData = response.data;
        setTotalClients(clientsData.length)
      } catch (error) {
        console.error(error)
      }
    }

    const getTotalServices = async () => {
      try {
        const response = await axios.get('http://localhost:3334/services')
        const servicesData = response.data;
        setTotalServices(servicesData.length)
      } catch (error) {
        console.error(error)
      }
    }

    getTotalClients();
    getTotalServices();
  }, [])

  return(
    <PagesLayout
      titulo="Página Inicial"
      toolbar={<ListToolbar 
        ShowButton={false}
      />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align="center">
                    Total de clientes
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant="h1">
                      {totalClients}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align="center">
                    Total de servicos
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant="h1">
                      {totalServices}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PagesLayout>
  )
}