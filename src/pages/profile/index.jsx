import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import TextContent from '../../components/TextContent/index.jsx';
import Button from '../../components/Button/index.jsx';
import NewAddressModal from '../../components/NewAddressModal/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showNewAddressModal, setShowNewAddressModal] = useState(false);
    const [showListAddressModal, setShowListAddressModal] = useState(false);
    const [firstAddress, setFirstAddress] = useState(null);

    const openNewAddressModal = () => setShowNewAddressModal(true);
    const closeNewAddressModal = () => setShowNewAddressModal(false);

    const openListAddressModal = () => setShowListAddressModal(true);
    const closeListAddressModal = () => setShowListAddressModal(false);

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

                // Procurar o endereço padrão
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
                alert('Endereço cadastrado com sucesso!');
                fetchAddresses();
                closeNewAddressModal();
            } else {
                alert('Erro ao cadastrar o endereço');
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchAddresses(); // Busca os endereços ao carregar a página
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
                    <Button text="Novo Endereço" onClick={openNewAddressModal} width="200px" />
                    <Button text="Meus Endereços" onClick={openListAddressModal} width="180px" customClass="meusEnderecos" />
                </div>
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
