// uso de contextos no React.
// utilizado para disponibilizar uma informação em toda a aplicação
// nesse caso, as informações referentes ao usuário

import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

// criação do contexto, essa informação que é importada nos arquivos para poder
// utilizar o contexto e com isso ter informação
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  // children é tudo que é filho de UserStorage

  const [data, setData] = React.useState(null); // dados do usuario
  const [login, setLogin] = React.useState(null); // verifica se o usuario ta logado
  const [loading, setLoading] = React.useState(false); // verifica se esta carregando
  const [error, setError] = React.useState(null); // tratamento de erros
  const navigate = useNavigate();

  // coleta as informações do usuário
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  // realiza o login do usuário
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: Usuário Inválido`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  // realiza o logout voltando os estados ao seus valores originais
  // além disso, é utilizado o React.useCallback
  // React.useCallback é responsável por controlar a renderização de um componente
  // de forma que ele seja renderizado apenas uma vez
  const userLogout = React.useCallback(
    function () {
      setData(null);
      setLogin(false);
      setError(null);
      setLoading(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Token inválido');
          }
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    // funções e valores que são exportadas no UserContext
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
