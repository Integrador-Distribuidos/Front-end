import React from 'react';
import './SearchNotFound.css';
import Button from '../Button';
import image1 from "../../assets/icons/lupa.png";
import { useNavigate } from 'react-router-dom';
//const imageUrl = dataFromApi.image_url;
function SearchNotFound({redirect_url}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirect_url);
    };

  return (
    <div className="search_not_found">
      <img className='lupa_img' src={image1} alt="Imagem da lupa" />
      <h2 className="text1_pnf">Nenhum Resultado Encontrado!</h2>
      <h3 className="text2_pnf">O que você está buscando, infelizmente, não foi localizado ou não está disponível.</h3>
      <Button 
        text={"Voltar a Página Inicial"}
        onClick={handleClick}
      />
    </div>
  );
} 

export default SearchNotFound;