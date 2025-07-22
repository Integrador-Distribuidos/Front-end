
const mockProducts = [
  {
    id_product: 1,
    name: 'Smartphone Samsung Galaxy S23',
    description: 'Tela 6.1", 5G, 128GB, Câmera Tripla',
    price: 3799.00,
    sku: 'SMG-S23',
    category: 'Eletrônicos',
    quantity: 12,
    stocks: [{ id_stock: 1, quantity: 6 }, { id_stock: 2, quantity: 6 }],
    creation_date: '2025-06-01'
  },
  {
    id_product: 2,
    name: 'Notebook Dell Inspiron 15',
    description: 'Intel i5, 8GB RAM, 256GB SSD, Tela 15.6"',
    price: 2899.00,
    sku: 'DLL-IN15',
    category: 'Eletrônicos',
    quantity: 8,
    stocks: [{ id_stock: 1, quantity: 4 }, { id_stock: 3, quantity: 4 }],
    creation_date: '2025-06-02'
  },
  {
    id_product: 3,
    name: 'Camiseta Básica Branca',
    description: '100% algodão, unissex, confortável',
    price: 39.90,
    sku: 'CAM-BR001',
    category: 'Roupas',
    quantity: 40,
    stocks: [{ id_stock: 2, quantity: 20 }, { id_stock: 3, quantity: 20 }],
    creation_date: '2025-06-03'
  },
  {
    id_product: 4,
    name: 'Tênis Nike Revolution 6',
    description: 'Tênis esportivo, ideal para corrida',
    price: 249.99,
    sku: 'NK-REV6',
    category: 'Roupas',
    quantity: 15,
    stocks: [{ id_stock: 2, quantity: 10 }, { id_stock: 1, quantity: 5 }],
    creation_date: '2025-06-04'
  },
  {
    id_product: 5,
    name: 'Livro: O Poder do Hábito',
    description: 'Charles Duhigg - Como hábitos moldam nossas vidas',
    price: 59.90,
    sku: 'LIV-HAB001',
    category: 'Livros',
    quantity: 30,
    stocks: [{ id_stock: 1, quantity: 15 }, { id_stock: 2, quantity: 15 }],
    creation_date: '2025-06-05'
  },
  {
    id_product: 6,
    name: 'Air Fryer Mondial 3,5L',
    description: 'Fritadeira elétrica sem óleo, 1500W',
    price: 379.00,
    sku: 'AF-MND35',
    category: 'Eletrodomésticos',
    quantity: 10,
    stocks: [{ id_stock: 2, quantity: 10 }],
    creation_date: '2025-06-06'
  },
  {
    id_product: 7,
    name: 'Smartwatch Amazfit Bip U',
    description: 'Relógio inteligente com monitoramento cardíaco',
    price: 289.00,
    sku: 'SW-AMZBP',
    category: 'Eletrônicos',
    quantity: 18,
    stocks: [{ id_stock: 1, quantity: 10 }, { id_stock: 3, quantity: 8 }],
    creation_date: '2025-06-07'
  },
  {
    id_product: 8,
    name: 'Jeans Skinny Feminina',
    description: 'Modelagem justa, lavagem escura',
    price: 99.90,
    sku: 'JNS-FEM01',
    category: 'Roupas',
    quantity: 25,
    stocks: [{ id_stock: 3, quantity: 25 }],
    creation_date: '2025-06-08'
  },
  {
    id_product: 9,
    name: 'Headset Gamer Redragon Zeus',
    description: 'Som 7.1, microfone destacável, RGB',
    price: 329.00,
    sku: 'HS-RDZEUS',
    category: 'Eletrônicos',
    quantity: 12,
    stocks: [{ id_stock: 1, quantity: 12 }],
    creation_date: '2025-06-09'
  },
  {
    id_product: 10,
    name: 'Cafeteira Elétrica Cadence',
    description: '15 xícaras, com filtro permanente',
    price: 119.90,
    sku: 'CAF-CD001',
    category: 'Eletrodomésticos',
    quantity: 14,
    stocks: [{ id_stock: 2, quantity: 7 }, { id_stock: 3, quantity: 7 }],
    creation_date: '2025-06-10'
  },
  // ... Produtos 11 a 50 (exemplos abaixo)
];

for (let i = 11; i <= 60; i++) {
  mockProducts.push({
    id_product: i,
    name: `Produto Genérico ${i}`,
    description: `Descrição do Produto Genérico número ${i}`,
    price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
    sku: `GEN-${String(i).padStart(3, '0')}`,
    category: ['Eletrônicos', 'Roupas', 'Livros', 'Eletrodomésticos', 'Beleza'][i % 5],
    quantity: Math.floor(Math.random() * 50 + 1),
    stocks: [
      { id_stock: 1, quantity: Math.floor(Math.random() * 25) },
      { id_stock: 2, quantity: Math.floor(Math.random() * 25) }
    ],
    creation_date: `2025-06-${(i % 30 + 1).toString().padStart(2, '0')}`
  });
}

export default mockProducts;
