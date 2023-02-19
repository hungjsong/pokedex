import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../API/user';

function SignUp() {
  const { t } = useTranslation();
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
      passwordConfirmation: { value: passwordConfirmation },
    } = event.currentTarget;

    if (password === passwordConfirmation) {
      setRegistrationError(false);
      const userToken = register(username, password);

      userToken.then(function (result) {
        const accountNameInUse = result.code === 'ER_DUP_ENTRY';
        if (accountNameInUse) {
          setErrorMessage(
            'Username is already taken. Please choose another one'
          );
          setRegistrationError(true);
        } else {
          setRegistrationError(false);
          setRegistrationSuccess(true);
          localStorage.setItem('userID', result.data);
          const registrationRedirect = setTimeout(() => {
            navigate('/Login');
          }, 3000);
        }
      });

      // userToken.then(function (result) {});
    } else {
      setErrorMessage('Passwords do not match');
      setRegistrationError(true);
    }
  }

  return (
    <div>
      {registrationSuccess && (
        <div>
          <h1>Registration Successful!</h1>
          <p>
            You will be redirected in a little bit to the registration page.
            Click <Link to="/Login">here</Link> if you didn't get redirected
          </p>
        </div>
      )}
      {!registrationSuccess && (
        <div>
          <h1>{t('signUp')}</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              Password
              <input type="password" name="password" />
            </label>
            <br />
            <label>
              Confirm Password
              <input type="password" name="passwordConfirmation" />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
          {registrationError && <h3>{errorMessage}</h3>}
          <Link to="/Login">Return</Link>
        </div>
      )}
    </div>
  );
}

export default SignUp;
