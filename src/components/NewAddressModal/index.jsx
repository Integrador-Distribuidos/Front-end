import React, { useState } from 'react';
import styles from './NewAddressModal.module.css';

const NewAddressModal = ({ onClose, onSave, onMessage }) => {
  const [form, setForm] = useState({
    city: '',
    street: '',
    neighborhood: '',
    uf: '',
    zipCode: '',
    number: '',
  });

  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (field === 'zipCode') {
      // Mantém só números e formata CEP 00000-000
      value = value.replace(/\D/g, '').slice(0, 8);
      if (value.length > 5) value = value.replace(/(\d{5})(\d+)/, '$1-$2');
    }

    if (field === 'uf') {
      // Remove tudo que não for letra, transforma em maiúscula e limita a 2 caracteres
      value = value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const { city, street, neighborhood, uf, zipCode, number } = form;

    if (!city || !street || !neighborhood || !uf || !zipCode || !number) {
      setError('Todos os campos são obrigatórios.');
      return false;
    }
    if (uf.length !== 2) {
      setError('UF deve conter 2 letras.');
      return false;
    }
    if (!/^[A-Z]{2}$/.test(uf)) {
      setError('UF deve conter apenas letras.');
      return false;
    }
    if (!/^\d{5}-\d{3}$/.test(zipCode)) {
      setError('CEP deve estar no formato 00000-000.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      city: form.city,
      street: form.street,
      neighborhood: form.neighborhood,
      uf: form.uf,
      zip_code: form.zipCode,
      number: form.number,
    };

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8001/api/addresses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onMessage?.('Endereço cadastrado com sucesso!', 'success');
        onSave?.();
        onClose?.();
      } else {
        onMessage?.('Erro ao cadastrar o endereço.', 'error');
      }
    } catch (err) {
      onMessage?.('Erro na requisição: ' + err.message, 'error');
    }
  };

  const isFormValid =
    form.city &&
    form.street &&
    form.neighborhood &&
    form.uf.length === 2 &&
    /^[A-Z]{2}$/.test(form.uf) &&
    /^\d{5}-\d{3}$/.test(form.zipCode) &&
    form.number;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Novo Endereço</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          Cidade
          <input
            type="text"
            value={form.city}
            onChange={handleChange('city')}
            className={styles.input}
            placeholder="Cidade"
          />
        </label>

        <label className={styles.label}>
          Rua
          <input
            type="text"
            value={form.street}
            onChange={handleChange('street')}
            className={styles.input}
            placeholder="Rua"
          />
        </label>

        <label className={styles.label}>
          Bairro
          <input
            type="text"
            value={form.neighborhood}
            onChange={handleChange('neighborhood')}
            className={styles.input}
            placeholder="Bairro"
          />
        </label>

        <div className={styles.row}>
          <label className={styles.label}>
            UF
            <input
              type="text"
              value={form.uf}
              onChange={handleChange('uf')}
              className={`${styles.input} ${styles.uf}`}
              placeholder="UF"
              maxLength={2}
            />
          </label>

          <label className={styles.label}>
            CEP
            <input
              type="text"
              value={form.zipCode}
              onChange={handleChange('zipCode')}
              className={`${styles.input} ${styles.cep}`}
              placeholder="00000-000"
            />
          </label>

          <label className={styles.label}>
            Número
            <input
              type="text"
              value={form.number}
              onChange={handleChange('number')}
              className={`${styles.input} ${styles.number}`}
              placeholder="Número"
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={styles.saveButton}
        >
          Salvar
        </button>

        <button onClick={onClose} className={styles['cancelButton-nadm']}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default NewAddressModal;
