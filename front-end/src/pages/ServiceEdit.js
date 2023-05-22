import { useNavigate } from "react-router-dom"
import { DetailsToolbar } from "../components/DetailsToolbar"
import { ServiceEditForm } from "../forms/ServiceEditForm";
import { PagesLayout } from "../layout/PagesLayout"

export const ServiceEdit = () => {
  const navigate = useNavigate();

  return(
    <PagesLayout
      titulo="Editar Ordem de Serviço"
      toolbar={<DetailsToolbar 
        goBack= {() => navigate('/services')}
      />}
    >
      <ServiceEditForm />
    </PagesLayout>
  )
}