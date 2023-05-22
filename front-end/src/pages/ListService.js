import { Chip, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ListToolbar } from "../components/ListToolbar"
import { PagesLayout } from "../layout/PagesLayout"
import { ButtonIcon, ImageIconActions, Row } from "./ListClient";
import deleteIcon from '../assets/deleteIcon.svg';
import editIcon from '../assets/penIcon.svg';
import { useEffect, useState } from "react";
import axios from "axios";

export const ListService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([])

  async function fetchClientNameById(clientId) {
    try {
      const response = await axios.get(`http://localhost:3334/clients/${clientId}`);
      const clientName = response.data.name;
      return clientName;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get('http://localhost:3334/services');
        const servicesData = response.data;
  
        const updatedServices = await Promise.all(servicesData.map(async (service) => {
          const clientName = await fetchClientNameById(service.idCliente);
          return {
            ...service,
            clientName: clientName
          };
        }));
  
        setServices(updatedServices);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchServices();
  }, []);

  async function handleDelete(id){
    if(window.confirm("Tem certeza que deseja excluir cliente?")){
      var res = await axios.delete("http://localhost:3334/services/" + id)
      if(res.status === 200){
        window.location.href = "/services"
      }else{
        alert("Ocorreu um erro ao deletar cliente")
      }
    }
  }

  return(
    <PagesLayout
      titulo="Ordens de serviço"
      toolbar={<ListToolbar 
        ShowSearch={true}
        searchName="Pesquisar O.S"
        buttonName="Cadastrar O.S"
        newButton= {() => navigate('/services/new')}
      />}
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: '1440px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Acoes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ID Ordem de Servico</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Maquina</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <Row>
                    <ButtonIcon onClick={() => navigate('/services/edit/' + service.id)}><ImageIconActions src={editIcon} alt="icon" /></ButtonIcon>
                    <ButtonIcon onClick={() => handleDelete(service.id)}><ImageIconActions src={deleteIcon} alt="icon" /></ButtonIcon>
                  </Row>
                </TableCell>
                <TableCell><Chip size="small" label={service.status} /></TableCell>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.clientName}</TableCell>
                <TableCell>{service.maquina}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Pagination 
                  page={3}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </PagesLayout>
  )
}