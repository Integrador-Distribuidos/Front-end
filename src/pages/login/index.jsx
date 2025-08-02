import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/stock2sell-logo.png';
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: emailAddress,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8000/users/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro no login:', data);
        alert('Erro: ' + (data.detail || JSON.stringify(data)));
        return;
      }

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      alert('Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro na conexão: ' + error.message);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('✅ Google token response:', tokenResponse);
      const googleAccessToken = tokenResponse.access_token;

      if (!googleAccessToken) {
        alert('❌ access_token do Google não encontrado.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8001/users/auth/google/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: googleAccessToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Erro na resposta da API do backend:', data);
          alert('Erro no login com Google: ' + (data.detail || JSON.stringify(data)));
          return;
        }

        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        alert('Login com Google realizado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro na autenticação com Google:', error);
        alert('Erro na autenticação com Google: ' + error.message);
      }
    },
    onError: (errorResponse) => {
      console.error('❌ Erro no login com Google:', errorResponse);
      alert('Falha ao tentar login com Google.');
    },
  });

  return (
    <div className={styles.loginBox}>
      <Link to="/">
        <img src={logo} alt="Logo do app" className={styles.logo} />
      </Link>
      <p className={styles.ContentText}>
        Insira seus dados abaixo, para entrar na sua conta
      </p>
      <InputField
        label="E-mail"
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        width="350px"
        height="25px"
      />
      <PasswordInput
        label="Senha"
        password={password}
        setPassword={setPassword}
        outline={true}
      />
      <Button text="Entrar" onClick={handleLogin} />
      <div className={styles.accountActions}>
        <Link to="/signUp">
          <p className={styles.signupLink}>
            Não possui uma conta? Crie uma agora!
          </p>
        </Link>
        <div className={styles.orContainer}>
          <p>ou</p>
        </div>
        <button className={styles.googleButton} onClick={loginGoogle}>
          Continuar com Google
        </button>
      </div>
    </div>
  );
};

export default Login;
