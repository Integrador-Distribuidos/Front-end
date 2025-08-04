import React, { useState, useEffect } from 'react';
import styles from './ProductModal.module.css';
import { uploadImageProduct } from '../../services/apiProducts';
import defaultImage from '../../assets/default/product_image_default.jpg'

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ProductModal = ({ isOpen, onClose, onSubmit, productData, isEdit, stocks}) => {
  const [preview, setPreview] = useState(''); 
  const [imageFile, setImageFile] = useState(null); 
  const imageSrc = productData?.image ? `${baseURL}/images/${productData.image}` : defaultImage;
  useEffect(() => {
    if (productData?.image) {
      setPreview(imageSrc);
    } else {
      setPreview('');
    }
    setImageFile(null); 
  }, [productData]);

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

const handleSubmit = async (e) => {
  e.preventDefault();  

  const form = e.target;
  const formData = {
    id_stock: Number(form.stock.value),
    name: form.name.value,
    price: parseFloat(form.price.value),
    sku: form.sku.value,
    category: form.category.value,
    description: form.description.value,
    quantity: parseInt(form.quantity.value),
    image: null, // a imagem será enviada separadamente
    creation_date: new Date().toISOString().split('T')[0],
  };

  try {
    console.log("handleSubmit: enviando formData como JSON", formData);
    
    const createdProduct = await onSubmit(formData); // deve retornar { id_product }

    console.log("id: ", createdProduct.id_product, "fim");

    if (imageFile && createdProduct?.id_product) {
      const formDataImage = new FormData();
      formDataImage.append('file', imageFile);

      await uploadProductImage(formDataImage, createdProduct.id_product);
    }
  } catch (error) {
    console.error("Erro ao salvar produto ou imagem:", error);
  }
};

const uploadProductImage = async (formDataImage, id) => {
  try {
    const response = await uploadImageProduct(id, formDataImage);
    if (response.status === 200) {
      console.log('Imagem enviada com sucesso');
    } else {
      console.log('Erro ao enviar a imagem');
    }
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
  }
};

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles['h2-modal-product-edit-or-create']}>
          {isEdit ? 'Editar Produto' : 'Cadastrar Produto'}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isEdit && (
            <input
              type="hidden"
              name="id_product"
              value={productData?.id_product}
            />
          )}

          <select
            name="stock"
            className={styles.storeselect}
            defaultValue={productData?.id_stock || ''}
            required
          >
            <option value="" disabled>
              Selecione um Estoque
            </option>
            {stocks?.map((stock) => (
              <option key={stock.id_stock} value={stock.id_stock}>
                {stock.name} - {stock.city}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={productData?.name || ''}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Preço"
            step="0.01"
            min="0"
            defaultValue={productData?.price || ''}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantidade"
            min="0"
            defaultValue={productData?.quantity || ''}
            required
          />

          <div className={styles.row}>
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              defaultValue={productData?.sku || ''}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Categoria"
              defaultValue={productData?.category || ''}
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Descrição"
            defaultValue={productData?.description || ''}
          />

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
            {isEdit ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
