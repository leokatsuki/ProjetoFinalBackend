import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, Pagination, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ListToolbar } from "../components/ListToolbar"
import { PagesLayout } from "../layout/PagesLayout"
import deleteIcon from '../assets/deleteIcon.svg';
import editIcon from '../assets/penIcon.svg';
import styled from 'styled-components';


export const ListClient = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([])

  const getClients = async () => {
    try {
      const res = await axios.get("http://localhost:3334/clients");
      console.log(res.data)
      setClients(res.data)
    } catch (error) {
      toast.error(error)
    }
  }

  async function handleDelete(id){
    if(window.confirm("Tem certeza que deseja excluir cliente?")){
      var res = await axios.delete("http://localhost:3334/clients/" + id)
      if(res.status === 200){
        window.location.href = "/clients"
      }else{
        alert("Ocorreu um erro ao deletar cliente")
      }
    }
  }

  useEffect(() => {
    getClients()
  }, [setClients])
  

  return(
    <PagesLayout
      titulo="Clientes"
      toolbar={<ListToolbar 
        ShowSearch={true}
        searchName="Pesquisar cliente"
        buttonName="Cadastrar cliente"
        newButton= {() => navigate('/clients/new')}
      />}
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: '1440px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Açoes</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>ID Cliente</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>
                  <Row>
                    <ButtonIcon onClick={() => navigate('/clients/edit/' + client.id)}><ImageIconActions src={editIcon} alt="icon" /></ButtonIcon>
                    <ButtonIcon onClick={() => handleDelete(client.id)}><ImageIconActions src={deleteIcon} alt="icon" /></ButtonIcon>
                  </Row>
                </TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.id}</TableCell>
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

export const Row = styled.div`
  display: flex;
`

export const ButtonIcon = styled.a`
  margin-right: 20px;
  padding: 6px;
  cursor: pointer;
`

export const ImageIconActions = styled.img`
  display: block;
  margin: 0 auto;
`
