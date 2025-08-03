import React, { useState } from 'react';
import styles from './SignUp.module.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/stock2sell-logo.png'
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { useGoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [email, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setRePassword] = useState('');
  const [first_name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const resp = await fetch('http://localhost:8001/users/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: tokenResponse.access_token }),
      });

      const data = await resp.json();
      console.log('Token do Google:', tokenResponse.access_token);

      if (!resp.ok) {
        const message = data?.detail || data?.non_field_errors?.join(', ') || 'Erro inesperado.';
        alert('Erro no login com Google: ' + message);
        return;
      }

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      alert('Login com Google realizado com sucesso!');
      navigate('/');
    } catch (err) {
      alert('Erro na autenticação com Google: ' + err.message);
    }
  },
  onError: () => alert('Falha ao tentar login com Google.'),
});

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('As senhas não conferem!');
      return;
    }
    const cleanedCpf = cpf.replace(/\D/g, '');
    const payload = {
      first_name: first_name,
      last_name: last_name,
      cpf: cleanedCpf,
      email: email,
      password: password,
      password2: password2
    };
    try {
      const response = await fetch('http://localhost:8001/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = Object.entries(errorData)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
          .join('\n');
        alert('Erro no cadastro:\n' + errorMessage);
        return;
      }

      const loginResp = await fetch('http://localhost:8001/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (loginResp.ok) {
        const loginData = await loginResp.json();
        localStorage.setItem('access_token', loginData.access);
        localStorage.setItem('refresh_token', loginData.refresh);
        navigate('/');
      } else {
        const errData = await loginResp.json();
        console.error('Erro no login automático:', errData);
        alert('Cadastro realizado, mas falhou login automático.');
      }

    } catch (err) {
      alert('Erro na conexão: ' + err.message);
    }
  };

  return (
    <div className={styles.signUpBox}>
      <Link to="/">
        <img src={logo} alt="Logo do app" className={styles.logo} />
      </Link>
      <p className={styles.ContentText}>Insira seus dados abaixo, para criar uma conta</p>
      <form onSubmit={handleSignUp}>
        <div className={styles.nameBox}>
            <InputField 
            label="Nome"
            type="text"
            value={first_name}
            width="155px"
            height="25px"
            onChange={e => setName(e.target.value)}
            />
            <InputField 
            label="Sobrenome"
            type="text"
            value={last_name}
            width="155px"
            height="25px"
            onChange={e => setLastName(e.target.value)}
            />
        </div>
        <InputField
            label="CPF"
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            width="350px"
            height="25px"
        />
        <InputField 
            label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmailAddress(e.target.value)}
            width="350px"
            height="25px"
        />
        <PasswordInput
            label="Senha"
            password={password}
            setPassword={setPassword}
            outline={true}
        />
        <PasswordInput
            label="Repetir Senha"
            password={password2}
            setPassword={setRePassword}
            outline={true}
        />
        <Button 
            text="Cadastrar"
            type="submit"
        />
      </form>
      <div className={styles.accountActions}>
        <Link to="/login">
          <p className={styles.signupLink}>
            Já possui uma conta? Entre agora!
          </p>
        </Link>
      </div>
      <button className={styles.googleButton} onClick={loginWithGoogle}>Continuar com Google</button>
    </div>
  );
}

export default SignUp;
