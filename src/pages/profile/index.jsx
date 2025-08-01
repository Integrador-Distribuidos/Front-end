import React, { useState } from 'react';
import styles from './Profile.module.css';
import Header from '../../components/Header/Index.jsx';
import Footer from '../../components/Footer/index.jsx';
import TextContent from '../../components/TextContent/index.jsx';
import Button from '../../components/Button/index.jsx';
import NewAddressModal from '../../components/NewAddressModal/index.jsx';
import ListAddressModal from '../../components/ListAddressModal/index.jsx';


const Profile = () => {
const [showNewAddressModal, setShowNewAddressModal] = useState(false);
const [showListAddressModal, setShowListAddressModal] = useState(false);

const openNewAddressModal = () => setShowNewAddressModal(true);
const closeNewAddressModal = () => setShowNewAddressModal(false);

const openListAddressModal = () => setShowListAddressModal(true);
const closeListAddressModal = () => setShowListAddressModal(false);


    return (
        <>
            <Header />
            <div className={styles.profileContainer}>
                <h3 className={styles.title}>Perfil</h3>
                <div className={styles.content}>
                    <TextContent 
                        label={"Nome"}
                        text={"Joaquim"}
                    />
                    <TextContent
                        label={"Sobrenome"}
                        text={"Silva"}
                    />
                </div>
                <div className={styles.content2}>
                    <TextContent
                        label={"Email"}
                        text={"H2BkS@example.com"}
                    />
                    <TextContent
                        label={"CPF"}
                        text={"000.000.000-00"}
                    />  
                </div>
                <div className={styles.content}>
                    <TextContent
                        label={"Cidade"}
                        text={"Almino Afonso"}
                    />
                    <TextContent
                        label={"Rua"}
                        text={"Avenida Francisco Belarmino"}
                    />
                </div>
                <div className={styles.content2}>
                    <TextContent
                        label={"Bairro"}
                        text={"Centro"}
                        customClass="small"
                    />
                    <TextContent
                        label={"Número"}
                        text={"223"}
                        customClass="small"
                    />
                    <TextContent
                        label={"UF"}
                        text={"RN"}
                        customClass="small"
                    />
                    <TextContent
                        label={"CEP"}
                        text={"59760-000"}
                        customClass="small"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button 
                        text="Novo Endereço"
                        onClick={openNewAddressModal}
                        width="200px"
                    />
                    <Button 
                        text="Meus Endereços"
                        onClick={openListAddressModal}
                        width="180px"
                        customClass="meusEnderecos"
                    />
                </div>
                {showNewAddressModal && (
                <NewAddressModal
                    city=""
                    street=""
                    neighborhood=""
                    uf=""
                    zip_code=""
                    number=""
                    onClose={closeNewAddressModal}
                    onSave={() => {
                    closeNewAddressModal();
                    }}
                />
                )}

                {showListAddressModal && (
                <ListAddressModal
                    addresses={[
                    {
                        first_name: "Joaquim",
                        last_name: "Silva",
                        street: "Rua Teste",
                        number: "123",
                        neighborhood: "Centro",
                        city: "Almino Afonso",
                        uf: "RN",
                        zip_code: "59760-000"
                    }
                    ]}
                    onSelectAddress={(address) => {
                    console.log("Endereço selecionado:", address);
                    }}
                    onClose={closeListAddressModal}
                />
                )}
            </div>
            <Footer />
        </>
    );
};

export default Profile;
