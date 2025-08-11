import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StoreCard.module.css';
import defaultImage from '../../assets/default/image_store_default.png';
import IconDeleteStore from '../../assets/icons/delete-icon-card-product.png';
import IconEditStore from '../../assets/icons/edit-icon-card-product.png';
import IconSeeStock from '../../assets/icons/visibility_icon.png';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const StoreCard = ({ store, onEdit, onDelete, onSeeStock }) => {
  const {
    name,
    cnpj,
    creation_date,
    email,
    phone_number,
    id_store,
    image,
    balance,
  } = store;

  const navigate = useNavigate();

  const handleVisualize = () => {
    navigate('/control_panel/stock', {
      state: { id_store }
    });
  };

  const formattedDate = new Date(creation_date).toLocaleDateString('pt-BR');
  const imageSrc = image
    ? `${baseURL}/images/${image}?t=${Date.now()}`
    : defaultImage;


  const formatCNPJ = (value) => {
    const cnpj = value.replace(/\D/g, '');
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };

  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length === 11) {
      return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
      return value; 
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={imageSrc}
        alt={`Loja ${name}`}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.field_balance}><strong>Saldo:</strong> R$ {balance}</p>
        <p className={styles.field}><strong>CNPJ:</strong> {formatCNPJ(cnpj)}</p>
        <p className={styles.field}><strong>Email:</strong> {email}</p>
        <p className={styles.field}><strong>Telefone:</strong> {formatPhone(phone_number)}</p>
        <p className={styles.field}><strong>Data de Criação:</strong> {formattedDate}</p>

        <div className={styles.actions}>
          <img
            src={IconEditStore}
            alt="Editar loja"
            title="Editar"
            onClick={() => onEdit(store)}
            className={styles.icon}
          />

          <img
            src={IconSeeStock}
            alt="Ver Estoque"
            title="Ver Estoque"
            onClick={handleVisualize}
            className={styles.icon}
          />

          <img
            src={IconDeleteStore}
            alt="Deletar loja"
            title="Excluir"
            onClick={() => onDelete(id_store)}
            className={styles.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
