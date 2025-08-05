import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import TextContent from '../../components/TextContent/index.jsx';
import Button from '../../components/Button/index.jsx';
import NewAddressModal from '../../components/NewAddressModal/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';

const CpfModal = ({ onClose, onSave }) => {
    const [cpf, setCpf] = useState('');

    const handleChange = (e) => {
        setCpf(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cpf.length === 11) {
            onSave(cpf);
        } else {
            alert('Por favor, insira um CPF válido com 11 dígitos.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Informe seu CPF</h2>
                <input
                    type="text"
                    value={cpf}
                    onChange={handleChange}
                    maxLength={11}
                    placeholder="Digite seu CPF"
                />
                <div className={styles.modalButtons}>
                    <Button onClick={onClose} text="Cancelar" width="130px" />
                    <Button onClick={handleSubmit} text="Salvar" width="130px" />
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [showListAddressModal, setShowListAddressModal] = useState(false);
    const [firstAddress, setFirstAddress] = useState(null);
    const [showCpfModal, setShowCpfModal] = useState(false);

    const openNewAddressModal = () => setShowNewAddressModal(true);
    const closeNewAddressModal = () => setShowNewAddressModal(false);

    const openListAddressModal = () => setShowListAddressModal(true);
    const closeListAddressModal = () => setShowListAddressModal(false);

    const navigate = useNavigate();

    const checkIfLoggedIn = () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
        navigate('/login');
        }
    };

    const truncateName = (name) => {
        if (name.length > 12) {
            return name.substring(0, 12) + '...';
        }
        return name;
    };

    const formatCPF = (cpf) => {
        if (!cpf) return '';
        const cpfNumeros = cpf.replace(/\D/g, '');
        return cpfNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8001/api/users/me/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                handleProfileChange(data);

                if (!data.cpf) {
                    setShowCpfModal(true);
                }
            } else {
                alert('Erro ao carregar os dados do usuário');
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8001/api/addresses/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAddresses(data);

                const defaultAddress = data.find(address => address.is_default);
                if (defaultAddress) {
                    setFirstAddress(defaultAddress);
                } else {
                    setFirstAddress(data.length > 0 ? data[0] : null);
                }
            } else {
                alert('Erro ao carregar os endereços');
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    const handleMakeAdmin = async () => {
        const token = localStorage.getItem('access_token');

        if (token) {
            try {
                const response = await fetch('http://localhost:8001/api/users/me/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    const userId = userData.id;

                    const updateResponse = await fetch(`http://localhost:8001/api/users/${userId}/make_admin/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (updateResponse.ok) {
                        const data = await updateResponse.json();
                        fetchUserData();
                    } else {
                        const error = await updateResponse.json();
                        alert(`Erro: ${error.detail}`);
                    }
                } else {
                    alert('Erro ao obter os dados do usuário.');
                }
            } catch (error) {
                alert('Erro na conexão: ' + error.message);
            }
        } else {
            alert('Token de autenticação não encontrado.');
        }
    };

    const handleProfileChange = (user) => {
        localStorage.removeItem('selectedAddress');
        setFirstAddress(null);
    };

    const handleNewAddressSave = async () => {
        const newAddress = {
            city: '', street: '', neighborhood: '', uf: '', zip_code: '', number: ''
        };

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8001/api/addresses/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newAddress),
            });

            if (response.ok) {
                fetchAddresses();
                closeNewAddressModal();
            } else {
                alert('Erro ao cadastrar o endereço');
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    const handleSaveCpf = async (cpf) => {
        const token = localStorage.getItem('access_token');

        if (!cpf || cpf.length !== 11) {
            alert("Por favor, insira um CPF válido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8001/api/users/${userData.id}/update_cpf/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ cpf }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setShowCpfModal(false);

                fetchUserData();
            } else {
                const error = await response.json();
                alert(`Erro: ${error.detail}`);
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
        fetchUserData();
        fetchAddresses();
    }, []);

    const handleSelectAddress = async (address) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://localhost:8001/api/addresses/${address.id}/set_default/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setFirstAddress(address);
                localStorage.setItem('selectedAddress', JSON.stringify(address));
                fetchAddresses();
            } else {
                const error = await response.json();
                alert('Erro ao definir o endereço como padrão: ' + error.detail);
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    if (!userData) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Header />
            <div className={styles.profileContainer}>
                <h3 className={styles.title}>Perfil</h3>
                <div className={styles.content}>
                    <TextContent label={"Nome"} text={userData.first_name || 'Indisponível'} />
                    <TextContent label={"Sobrenome"} text={userData.last_name || 'Indisponível'} />
                </div>
                <div className={styles.content2}>
                    <TextContent label={"Email"} text={userData.email || 'Indisponível'} />
                    <TextContent label={"CPF"} text={formatCPF(userData.cpf) || 'Indisponível'} />
                </div>
                <div className={styles.content}>
                    <TextContent label={"Cidade"} text={firstAddress ? firstAddress.city : 'Indisponível'} />
                    <TextContent label={"Rua"} text={firstAddress ? firstAddress.street : 'Indisponível'} />
                </div>
                <div className={styles.content2}>
                    <TextContent label={"Bairro"} text={firstAddress ? truncateName(firstAddress.neighborhood) : 'Indisponível'} customClass="small"/>
                    <TextContent label={"Número"} text={firstAddress ? firstAddress.number : 'Indisponível'} customClass="small"/>
                    <TextContent label={"UF"} text={firstAddress ? firstAddress.uf : 'Indisponível'} customClass="small"/>
                    <TextContent label={"CEP"} text={firstAddress ? firstAddress.zip_code : 'Indisponível'} customClass="small"/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button text="Novo Endereço" onClick={openNewAddressModal} width="180px" />
                    <Button text="Meus Endereços" onClick={openListAddressModal} width="180px" customClass="meusEnderecos" />
                    {userData.type === 'client' && (
                        <Button text="Tornar Admin" onClick={handleMakeAdmin} width="180px" />
                    )}
                </div>
                {showCpfModal && (
                    <CpfModal onClose={() => setShowCpfModal(false)} onSave={handleSaveCpf} />
                )}
                {showNewAddressModal && (
                    <NewAddressModal
                        onSave={() => {
                            fetchAddresses();
                            closeNewAddressModal();
                        }}
                        onClose={closeNewAddressModal}
                    />
                )}

                {showListAddressModal && (
                    <ListAddressModal
                        addresses={addresses}
                        onSelectAddress={handleSelectAddress}
                        onClose={closeListAddressModal}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default Profile;
