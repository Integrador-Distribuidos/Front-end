import React, { useState } from 'react'; 
import './ProductFilter.css';

function ProductFilter({ onFilter }) {
  const [showOptions, setShowOptions] = useState(true);
  const [category, setCategory] = useState('');
  const [option, setOption] = useState('');

  const getFilterLabel = () => {
    if (option === 'less_price') return 'Menor Preço';
    if (option === 'more_price') return 'Maior Preço';
    return 'Todos';
  };

  const handleApplyFilter = () => {
    onFilter({ category, option });
    setShowOptions(false);
  };

  const handleClearFilter = () => {
    setCategory('');
    setOption('');
    onFilter({ category: '', option: '' });
    setShowOptions(false);
  };

  return (
    <div className="filter-container">
      {showOptions && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label className="tittle_filter">Filtrar por:</label>
            <select
              className="campo_select"
              value={option}
              onChange={(e) => {
                const selected = e.target.value;
                setOption(selected);
                onFilter({ category, option: selected }); // chama direto ao selecionar
              }}
            >
              <option value="">Todos</option>
              <option value="less_price">Menor Preço</option>
              <option value="more_price">Maior Preço</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFilter;
