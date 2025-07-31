import React, { useState } from 'react';
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/stock2sell-logo.png'
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
const SignUp = () => {
const [emailAddress, setEmailAddress] = useState('');
const [password, setPassword] = useState('');
const [rePassword, setRePassword] = useState('');
const [name, setName] = useState('');
const [lastName, setLastName] = useState('');
const [cpf, setCpf] = useState('');
    return (
        <div className={styles.signUpBox}>
            <Link to="/">
                <img src={logo} alt="Logo do app" className={styles.logo} />
            </Link>
            <p className={styles.ContentText}>Insira seus dados abaixo, para criar uma conta</p>
            <div className={styles.nameBox}>
                <InputField 
                    label="Nome"
                    type="text"
                    value={name}
                    width="155px"
                    height="25px"
                    onChange={e => setName(e.target.value)}
                />
                <InputField 
                    label="Sobrenome"
                    type="text"
                    value={lastName}
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
            <PasswordInput
                label="Repetir Senha"
                password={rePassword}
                setPassword={setRePassword}
                outline={true}
            />
            <Button 
                text="Cadastrar"
                onClick={() => {}}
            />
            <div className={styles.accountActions}>
                <Link to="/login">
                <p className={styles.signupLink}>
                    Ja possui uma conta? Entre agora!
                </p>
                </Link>
            </div>
        </div>
    )
}

export default SignUp