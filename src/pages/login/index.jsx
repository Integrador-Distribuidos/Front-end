import React, { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/stock2sell-logo.png'
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const Login = () => {
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');

    return (
        <div className={styles.loginBox}>
            <Link to="/">
                <img src={logo} alt="Logo do app" className={styles.logo} />
            </Link>
            <p className={styles.ContentText}>Insira seus dados abaixo, para entrar na sua conta</p>
            <InputField
                label="E-mail"
                type="email"
                value ={emailAddress}
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
            <Button 
                text="Entrar"
                onClick={() => {}}
            />
            <div className={styles.accountActions}>
                <Link to="/signUp">
                <p className={styles.signupLink}>
                    Não possui uma conta? Crie uma agora!
                </p>
                </Link>
                <div className={styles.orContainer}>
                    <p>ou</p>
                </div>
                <button className={styles.googleButton}>
                    Continuar com Google
                </button>
            </div>
        </div> 
    );
};

export default Login;