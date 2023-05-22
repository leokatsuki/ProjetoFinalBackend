import { Paper, Box, Button, Grid, Typography } from '@mui/material';
import { Input } from './FormStyles';
import axios from 'axios';

export const ClientNewForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.elements.nome.value;
      const rg = e.target.elements.rg.value;
      const telefone = e.target.elements.telefone.value;
      const cep = e.target.elements.cep.value;
      const address = e.target.elements.address.value;
      const complement = e.target.elements.complement.value;
      const email = e.target.elements.email.value;
      
      const response = await axios.post("http://localhost:3334/clients/new", {
        name,
        rg,
        telefone,
        cep,
        address,
        complement,
        email
      }, [])

      console.log(response.data);
      alert("Cliente cadastrado com sucesso!")
      window.location.href = "/clients"
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <Box width={1440} margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined"> 
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" padding={2} spacing={20} columns={16}>
          <Grid item>
            <Grid item mb={2}>
              <Typography variant="h6">Pessoal</Typography>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="Nome" name="nome" required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="RG" type="number" name="rg" required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="Telefone" type="number" name='telefone' required/>
              </div>
            </Grid>

            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" >
                Salvar
              </Typography>
            </Button>
          </Grid>

          <Grid item>
            <Grid item mb={2}>
              <Typography variant="h6">Endereço</Typography>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="CEP" type="number" name='cep' required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="Endereço" name='address' required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="N. / Complemento" type="number" name='complement' />
              </div>
            </Grid>

            <Grid item>
              <div>
                <Input placeholder="Email" type='email'  name='email' required/>
              </div>
            </Grid>
          </Grid>
        </Grid>        
      </form>
    </Box>
  )
}