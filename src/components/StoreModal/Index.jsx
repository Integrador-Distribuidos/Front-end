import React, { useState, useEffect } from 'react';
import styles from './StoreModal.module.css';
import defaultImage from '../../assets/default/product_image_default.jpg'
import { uploadImageStore } from '../../services/apiStore';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const StoreModal = ({ isOpen, onClose, onSubmit, storeData, isEdit, error }) => {
  const [preview, setPreview] = useState(''); 
  const [imageFile, setImageFile] = useState(null); 
  const imageSrc = storeData?.image ? `${baseURL}/images/${storeData.image}` : defaultImage;
  useEffect(() => {
    if (storeData?.image) {
      setPreview(imageSrc);
    } else {
      setPreview('');
    }
    setImageFile(null); 
  }, [storeData]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  const storeData = {
    name: form.name.value,
    cnpj: form.cnpj.value.replace(/\D/g, ''),
    creation_date: new Date().toISOString().split("T")[0],
    email: form.email.value,
    phone_number: form.phone.value.replace(/\D/g, ''),
  };

  try {
    console.log("handleSubmit: enviando dados da loja como JSON", storeData);
    
    const createdStore = await onSubmit(storeData); // deve retornar { id_store }

    console.log("id da loja criada: ", createdStore.id_store);

    if (imageFile && createdStore?.id_store) {
      const formDataImage = new FormData();
      formDataImage.append('file', imageFile);

      await uploadStoreImage(createdStore.id_store, formDataImage);
    }
  } catch (error) {
    console.error("Erro ao salvar loja ou imagem:", error);
  }
};

const uploadStoreImage = async (id, formDataImage) => {
  try {
    const response = await uploadImageStore(id, formDataImage);
    if (response.status === 200) {
      console.log('Imagem enviada com sucesso');
    } else {
      console.log('Erro ao enviar a imagem');
    }
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
  }
};



  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOnlyDigits = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
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
            defaultValue={storeData?.cnpj || ''}
            onInput={handleOnlyDigits}
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
              defaultValue={storeData?.phone_number || ''}
              onInput={handleOnlyDigits}
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
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
              >
                Remover Imagem
              </button>
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
