import { Navigate, Route, Routes } from "react-router-dom"
import { ClientNew } from "../pages/ClientNew"
import { ClientEdit } from "../pages/ClientEdit"
import { Dashboard } from "../pages/Dashboard"
import { ServiceNew } from "../pages/ServiceNew"
import { ListService } from "../pages/ListService"
import { ListClient } from "../pages/ListClient"
import { ServiceEdit } from "../pages/ServiceEdit"

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/services" element={<ListService />} />
      <Route path="/services/new" element={<ServiceNew />} />
      <Route path="/services/edit/:id" element={<ServiceEdit/>} />
      
      <Route path="/clients" element={<ListClient />} />
      <Route path="/clients/new" element={<ClientNew />} />
      <Route path="/clients/edit/:id" element={<ClientEdit />} />

      <Route path="*" element={<Navigate to="/home"/>} />
    </Routes>
  )
}