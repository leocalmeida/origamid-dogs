import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [pageTitle, setPageTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    switch (pathname) {
      case '/conta/estatisticas':
        setPageTitle('Estatísticas');
        break;
      case '/conta/postar':
        setPageTitle('Poste sua foto');
        break;
      default:
        setPageTitle('Minha Conta');
        break;
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className='title'>{pageTitle}</h1>
      <UserHeaderNav></UserHeaderNav>
    </header>
  );
};

export default UserHeader;
