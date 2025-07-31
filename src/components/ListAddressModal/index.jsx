import React, { useState } from 'react';
import styles from './ListAddressModal.module.css';

const ListAddressModal = ({ addresses, onSelectAddress, onClose }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
    };

    const handleSelect = () => {
        onSelectAddress(selectedAddress);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Meus Endereços</h2>
                <div className={styles.addressList}>
                    {addresses.map((address, index) => (
                        <div
                            key={index}
                            className={`${styles.addressItem} ${selectedAddress === address ? styles.selected : ''}`}
                            onClick={() => handleAddressClick(address)}
                        >
                            <p>{address.first_name} {address.last_name}</p>
                            <p>{address.street}, {address.number}</p>
                            <p>{address.neighborhood}, {address.city}, {address.uf}, {address.zip_code}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.modalActions}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleSelect} disabled={!selectedAddress}>Selecionar</button>
                </div>
            </div>
        </div>
    );
};

export default ListAddressModal;
