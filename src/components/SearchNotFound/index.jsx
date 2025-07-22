import React from 'react';
import './SearchNotFound.css';
import Button from '../Button';
import image1 from "../../assets/icons/lupa.png";
//const imageUrl = dataFromApi.image_url;
function SearchNotFound({ name, price}) {
  return (
    <div className="search_not_found">
      <img class='lupa_img' src={image1} alt="Imagem da lupa" />
      <h2 class="text1_pnf">Nenhum Resultado Encontrado!</h2>
      <h3 class="text2_pnf">O que você está buscando, infelizmente, não foi localizado ou não está disponível.</h3>
      <Button 
        text={"Voltar a Página Inicial"}
      />
    </div>
  );
} 

export default SearchNotFound;