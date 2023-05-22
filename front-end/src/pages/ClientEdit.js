import { useNavigate } from "react-router-dom"
import { DetailsToolbar } from "../components/DetailsToolbar"
import { PagesLayout } from "../layout/PagesLayout"
import { ClientEditForm } from "../forms/ClientEditForm";


export const ClientEdit = () => {
  const navigate = useNavigate();

  return(
    <PagesLayout
      titulo="Atualizar cliente"
      toolbar={<DetailsToolbar 
        goBack= {() => navigate('/clients')}
      />}
    >
      <ClientEditForm />
    </PagesLayout>
  )
}