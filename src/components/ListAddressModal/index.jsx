import React, { useState, useRef, useEffect } from 'react';
import styles from './ListAddressModal.module.css';

const ListAddressModal = ({ addresses, onSelectAddress, onClose }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const modalRef = useRef(null);
    const actionsRef = useRef(null); 

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
        if (actionsRef.current) {
            actionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSelect = () => {
        onSelectAddress(selectedAddress);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={styles.modal}>
            <div ref={modalRef} className={styles.modalContent}>
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
                <div ref={actionsRef} className={styles.modalActions}>
                    <button onClick={onClose} className={styles['cancelButton-laddm']}>Cancelar</button>
                    <button onClick={handleSelect} disabled={!selectedAddress}>Selecionar</button>
                </div>
            </div>
        </div>
    );
};

export default ListAddressModal;