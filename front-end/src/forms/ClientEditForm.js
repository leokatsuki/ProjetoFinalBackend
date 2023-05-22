import { Paper, Box, Button, Grid, Typography } from '@mui/material';
import { Input } from './FormStyles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ClientEditForm = () => {
  const [nome, setNome] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');
  const [email, setEmail] = useState('');

  const { id } = useParams()

  useEffect(() => {
    async function getUsuario(){
      var res = await axios.get('http://localhost:3334/clients/' + id)
      const cliente = res.data;
      setNome(cliente.name)
      setRg(cliente.rg)
      setTelefone(cliente.telefone)
      setCep(cliente.cep)
      setAddress(cliente.address)
      setComplement(cliente.complement)
      setEmail(cliente.email)
    }
    getUsuario();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCliente = {
        name: nome,
        rg,
        telefone,
        cep,
        address,
        complement,
        email
      };
      
      const response = await axios.put(`http://localhost:3334/clients/${id}`, updatedCliente);

      console.log(response.data);
      alert("Cliente atualizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

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
                <Input placeholder="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="RG" type="number" name="rg" value={rg} onChange={(e) => setRg(e.target.value)} required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="Telefone" type="number" name='telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)} required/>
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
                <Input placeholder="CEP" type="number" name='cep' value={cep} onChange={(e) => setCep(e.target.value)} required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="Endereço" name='address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
              </div>
            </Grid>

            <Grid item mb={3}>
              <div>
                <Input placeholder="N. / Complemento" type="number" name='complement' value={complement} onChange={(e) => setComplement(e.target.value)} />
              </div>
            </Grid>

            <Grid item>
              <div>
                <Input placeholder="Email"  name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
            </Grid>
          </Grid>
        </Grid>            
      </form>
    </Box>
  )
}