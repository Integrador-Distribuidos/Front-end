import React, { useState } from 'react';
import styles from './NewAddressModal.module.css';
import InputField from '../InputField';

const NewAddressModal = ({ onClose, onSave }) => {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [uf, setUf] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formatZipCode = (zip_code) => {
    return zip_code.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const validateFields = () => {
    if (!city || !street || !neighborhood || !uf || !zip_code || !number) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const newAddress = {
      city,
      street,
      neighborhood,
      uf,
      zip_code: formatZipCode(zip_code),
      number,
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
        onSave();
        onClose();
      } else {
        alert('Erro ao cadastrar o endereço');
      }
    } catch (error) {
      alert('Erro na conexão: ' + error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Novo Endereço</h2>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <InputField label="Cidade" type="text" value={city} onChange={(e) => setCity(e.target.value)} width="288px" height="22px" />
        <InputField label="Rua" type="text" value={street} onChange={(e) => setStreet(e.target.value)} width="288px" height="22px" />
        <InputField label="Bairro" type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} width="288px" height="22px" />

        <div className={styles.row}>
          <InputField label="UF" type="text" value={uf} onChange={(e) => setUf(e.target.value)} width="40px" height="22px" />
          <InputField label="CEP" type="text" value={zip_code} onChange={(e) => setZipCode(e.target.value)} width="90px" height="22px" />
          <InputField label="Número" type="text" value={number} onChange={(e) => setNumber(e.target.value)} width="90px" height="22px" />
        </div>

        <button className={styles.saveButton} onClick={handleSave}>Salvar</button>
        <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default NewAddressModal;
