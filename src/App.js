import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login/Login';
import { UserStorage } from './UserContext';
import './App.css';
import User from './Components/User/User';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

// as rotas foram configuradas dentro do arquivo App.js
function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header /> {/* Componente rederizado em todas as partes do site */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login/*' element={<Login />} />{' '}
          {/* Página de login, o asterisco indica que há rotas login/alguma-coisa */}
          <Route
            path='conta/*'
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          {/* Página de Conta, o asterisco indica que há rotas conta/alguma-coisa */}
          {/* além disso, a rota é protegida, então depende do usuário estar logado para poder acessar essa página */}
        </Routes>
        <Footer />
        {/* Componente rederizado em todas as partes do site */}
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
