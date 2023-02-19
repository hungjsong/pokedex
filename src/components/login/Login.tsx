import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../API/user';

function Login() {
  useEffect(() => {
    const alreadyLoggedIn = localStorage.getItem('userID') !== null;
    if (alreadyLoggedIn) {
      navigate('/');
    }
  }, []);

  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userToken = login(
      event.currentTarget.username.value,
      event.currentTarget.password.value
    );

    userToken.then(function (result) {
      const successfulLogin = result.data.length === 1;
      if (successfulLogin) {
        localStorage.setItem('userID', result.data[0].id);
        navigate('/PokedexEntry');
      } else {
        setLoginError(true);
      }
    });
  }

  return (
    <div>
      <h1>{t('login')}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {loginError && <h3>Entered username or password is incorrect</h3>}
      <Link to="/SignUp">{t('signUp')}</Link>
    </div>
  );
}

export default Login;
