import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AppThemeProvider } from './context';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AppThemeProvider> 
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    </AppThemeProvider>
  );
}