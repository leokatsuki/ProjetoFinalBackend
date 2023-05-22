import { Paper, Box, Button, Grid, Typography } from '@mui/material';
import { Input, Select, Textarea } from './FormStyles';
import { useState } from 'react';
import axios from 'axios';

export const ServiceNewForm = () => {
  const [idCliente, setIdCliente] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idCliente = e.target.elements.idCliente.value;
      const maquina = e.target.elements.maquina.value;
      const observacao = e.target.elements.observacao.value;
      const status = e.target.elements.status.value;

      const response = await axios.post("http://localhost:3334/services/new", {
        idCliente,
        maquina,
        observacao,
        status
      }, [])

      console.log(response.data)
      alert("Ordem de servico registrada com sucesso")
      window.location.href = "/services"
    } catch (error) {
      console.error(error)
    }
  };

  return (    
    <Box width={1440} margin={1} display="flex" flexDirection="row" component={Paper} variant="outlined">
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" padding={2} spacing={20} columns={16}>
          <Grid item>
            <Grid item>
              <Typography variant="h6" marginBottom={2}>Cliente</Typography>
            </Grid>

            <Grid item>
              <div>
                <Input placeholder="ID do cliente" name='idCliente' value={idCliente} onChange={(e) => setIdCliente(e.target.value)}  required/>
              </div>
            </Grid>

            <Grid item mt={2}>
              <Typography variant="h6" marginBottom={2}>Maquina</Typography>
            </Grid>

            <Grid item>
              <div>
                <Input placeholder="Modelo da máquina" name='maquina'/>
              </div>
            </Grid>

            <Grid item mt={2}>
              <Typography variant="h6" marginBottom={2}>Observações</Typography>
            </Grid>

            <Grid item mb={2}>
              <div>
                <Textarea placeholder='Defeitos da maquina' name='observacao'/>
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
            <Grid item marginBottom={2}>
              <Typography variant="h6">Status</Typography>
            </Grid>

            <Grid item>
              <Select placeholder='Escolha uma opção' name='status'>
                <option value=""></option>
                <option value="Finalizado">Finalizado</option>
                <option value="Aguardando Orcamento">Aguardando Orcamento</option>
                <option value="Manutencao">Manutencao</option>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};