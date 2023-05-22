import { useNavigate } from "react-router-dom"
import { DetailsToolbar } from "../components/DetailsToolbar"
import { PagesLayout } from "../layout/PagesLayout"
import { ClientNewForm } from "../forms/ClientNewForm";


export const ClientNew = () => {
  const navigate = useNavigate();

  return(
    <PagesLayout
      titulo="Novo cliente"
      toolbar={<DetailsToolbar 
        goBack= {() => navigate('/clients')}
      />}
    >
      <ClientNewForm />
    </PagesLayout>
  )
}