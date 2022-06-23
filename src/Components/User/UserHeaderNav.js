import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Stats } from '../../Assets/estatisticas.svg';
import { ReactComponent as Adicionar } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null);
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav className={styles.nav}>
      <NavLink
        to='/conta'
        end
        className={(navData) => (navData.isActive ? styles.active : '')}
      >
        <MinhasFotos />
        {mobile && 'Minhas Fotos'}
      </NavLink>
      <NavLink
        to='/conta/estatisticas'
        className={(navData) => (navData.isActive ? styles.active : '')}
      >
        <Stats />
        {mobile && 'Estatisticas'}
      </NavLink>
      <NavLink
        to='/conta/postar'
        className={(navData) => (navData.isActive ? styles.active : '')}
      >
        <Adicionar />
        {mobile && 'Adicionar Foto'}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && 'Sair'}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
