import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type HeaderProps = {};

const NavBarItem = styled.li`
  display: inline-block;
  padding: 0.5rem 1rem;
`;

const NavBarList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const NavBar = styled.nav`
  background-color: #f5aa42;
  padding: 1rem 1rem;
`;

function Header(props: HeaderProps) {
  const { t } = useTranslation();
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();

  return (
    <header>
      <NavBar>
        <NavBarList>
          <NavBarItem>
            <Link to="/">{t('home')}</Link>
          </NavBarItem>
          <NavBarItem>
            <Link to="/PokedexEntry">{t('viewPokedex')}</Link>
          </NavBarItem>
          <NavBarItem>
            <Link to="/TeamBuilder">{t('teamBuilder')}</Link>
          </NavBarItem>
          <NavBarItem>
            <Link to="/CatchingSimulator">{t('catchingSimulator')}</Link>
          </NavBarItem>
          {userID === null && (
            <NavBarItem>
              <Link to="/Login">{t('loginSignUp')}</Link>
            </NavBarItem>
          )}
          {userID !== null && (
            <NavBarItem>
              <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Link>
            </NavBarItem>
          )}
        </NavBarList>
      </NavBar>
    </header>
  );
}

export default Header;
