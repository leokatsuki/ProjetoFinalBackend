import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Sidebar } from "../../components/Sidebar"
import { AppRoutes } from "../../routes"
import "@testing-library/jest-dom"

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}))

describe('Sidebar test', () => {
  test('should render the sidebar', () => {
    render(
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    )

    expect(screen.getByText("Pagina Inicial")).toBeInTheDocument();
    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Ordens de serviço")).toBeInTheDocument();
    expect(screen.getByText("Alternar tema")).toBeInTheDocument();
  })

  test('should navigate to the clients page when the button is pressed', () => {
    render(
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    )

    const ClientButton = screen.getByText("Clientes");
    fireEvent.click(ClientButton);

    expect(mockNavigate).toHaveBeenCalledWith("/clients");
  })
})