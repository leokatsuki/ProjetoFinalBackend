import { useNavigate } from "react-router-dom"
import { DetailsToolbar } from "../components/DetailsToolbar"
import { ServiceNewForm } from "../forms/ServiceNewForm";
import { PagesLayout } from "../layout/PagesLayout"

export const ServiceNew = () => {
  const navigate = useNavigate();

  return(
    <PagesLayout
      titulo="Cadastrar Ordem de Serviço"
      toolbar={<DetailsToolbar 
        goBack= {() => navigate('/services')}
      />}
    >
      <ServiceNewForm />
    </PagesLayout>
  )
}