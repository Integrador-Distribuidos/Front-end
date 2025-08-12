import React, { useState, useEffect } from 'react';
import styles from './StoreModal.module.css';
import defaultImage from '../../assets/default/product_image_default.jpg';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const StoreModal = ({ isOpen, onClose, onSubmit, storeData, isEdit, error }) => {
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [cnpj, setCnpj] = useState('');
  const [phone, setPhone] = useState('');

  const imageSrc = storeData?.image ? `${baseURL}/images/${storeData.image}` : defaultImage;

  const formatCNPJ = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14);
    } else {
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
    }
  };

  useEffect(() => {
    if (storeData?.image) {
      setPreview(imageSrc);
    } else {
      setPreview('');
    }
    setImageFile(null);
    setCnpj(storeData?.cnpj ? formatCNPJ(storeData.cnpj) : '');
    setPhone(storeData?.phone_number ? formatPhone(storeData.phone_number) : '');
  }, [storeData]);

  const handleCnpjChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("cnpj", cnpj.replace(/\D/g, ''));
    formData.append("email", form.email.value);
    formData.append("phone_number", phone.replace(/\D/g, ''));
    formData.append('creation_date', new Date().toISOString().split('T')[0]);

    const imageFile2 = form.image.files[0];
    if (imageFile2) {
      formData.append('image', imageFile2);
      setImageFile(imageFile2);
    }

    try {
      const updatedStore = await onSubmit(formData);
      console.log("Loja atualizada:", updatedStore);
    } catch (error) {
      console.error("Erro ao atualizar loja:", error);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview('');
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles['h2-modal-product-edit-or-create']}>
          {isEdit ? 'Editar Loja' : 'Cadastrar uma Loja'}
        </h2>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={storeData?.name || ''}
            required
          />

          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={cnpj}
            onChange={handleCnpjChange}
            required
          />

          <div className={styles.row}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              defaultValue={storeData?.email || ''}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <div className={styles.previewContainer}>
              <img
                src={preview}
                alt="Preview"
                className={styles.imagePreview}
                style={{ marginTop: '10px', maxHeight: '200px' }}
              />
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={handleRemoveImage}
                >
                  Remover Imagem
                </button>
              </div>
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Loja'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreModal;
