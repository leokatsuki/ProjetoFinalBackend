import { Paper, Box, Button, Grid, Typography } from '@mui/material';
import { Input, Select, Textarea } from './FormStyles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ServiceEditForm = () => {
  const [idCliente, setIdCliente] = useState('')
  const [maquina, setMaquina] = useState('')
  const [observacao, setObservacao] = useState('')
  const [status, setStatus] = useState('')

  const { id } = useParams()

  useEffect(() => {
    async function getService(){
      var res = await axios.get('http://localhost:3334/services/' + id)
      const service = res.data;
      setIdCliente(service.idCliente)
      setMaquina(service.maquina)
      setObservacao(service.observacao)
      setStatus(service.status)
    }
    getService();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedService = {
        name: idCliente,
        maquina,
        observacao,
        status
      };
      
      const response = await axios.put(`http://localhost:3334/services/${id}`, updatedService);

      console.log(response.data);
      alert("Servico atualizado com sucesso!");
    } catch (error) {
      console.error(error);
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
                <Input placeholder="Modelo da máquina" name='maquina' value={maquina} onChange={(e) => setMaquina(e.target.value)} required/>
              </div>
            </Grid>

            <Grid item mt={2}>
              <Typography variant="h6" marginBottom={2}>Observações</Typography>
            </Grid>

            <Grid item mb={2}>
              <div>
                <Textarea placeholder='Defeitos da maquina' name='observacao' value={observacao} onChange={(e) => setObservacao(e.target.value)} required/>
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
              <Select placeholder='Escolha uma opção' name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
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