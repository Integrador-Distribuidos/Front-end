
const mockStores = [
    
  {
    "name": "Livraria Central",
    "cnpj": "12.345.678/0001-90",
    "city": "Fortaleza",
    "uf": "CE",
    "zip_code": "60020-000",
    "address": "Rua 24 de Maio, 150",
    "creation_date": "2023-03-10",
    "email": "contato@livrariacentral.com.br",
    "phone_number": "(85) 3054-6789",
    "id_store": 1
  },
  {
    "name": "TecnoInfo",
    "cnpj": "23.456.789/0001-12",
    "city": "Natal",
    "uf": "RN",
    "zip_code": "59015-000",
    "address": "Av. Prudente de Morais, 230",
    "creation_date": "2022-11-05",
    "email": "vendas@tecnoinfo.com.br",
    "phone_number": "(84) 3210-1234",
    "id_store": 2
  },
  {
    "name": "Moda & Cia",
    "cnpj": "34.567.890/0001-34",
    "city": "Recife",
    "uf": "PE",
    "zip_code": "50030-010",
    "address": "Rua da Aurora, 1020",
    "creation_date": "2021-07-22",
    "email": "contato@modaecia.com.br",
    "phone_number": "(81) 98765-4321",
    "id_store": 3
  },
  {
    "name": "Papelaria Nova",
    "cnpj": "45.678.901/0001-56",
    "city": "João Pessoa",
    "uf": "PB",
    "zip_code": "58040-060",
    "address": "Rua das Flores, 55",
    "creation_date": "2024-01-15",
    "email": "suporte@papelarianova.com.br",
    "phone_number": "(83) 3344-5566",
    "id_store": 4
  },
  {
    "name": "Casa do Esporte",
    "cnpj": "56.789.012/0001-78",
    "city": "Maceió",
    "uf": "AL",
    "zip_code": "57020-000",
    "address": "Av. Fernandes Lima, 890",
    "creation_date": "2020-09-30",
    "email": "contato@casadoesporte.com.br",
    "phone_number": "(82) 3211-7788",
    "id_store": 5
  },
  {
    "name": "Eletrônica Sol",
    "cnpj": "67.890.123/0001-90",
    "city": "Aracaju",
    "uf": "SE",
    "zip_code": "49025-000",
    "address": "Rua Santa Luzia, 300",
    "creation_date": "2023-06-01",
    "email": "vendas@eletronicasol.com.br",
    "phone_number": "(79) 9876-5432",
    "id_store": 6
  },
  {
    "name": "Café & Cia",
    "cnpj": "78.901.234/0001-12",
    "city": "Salvador",
    "uf": "BA",
    "zip_code": "40020-000",
    "address": "Rua Chile, 120",
    "creation_date": "2022-12-20",
    "email": "contato@cafecia.com.br",
    "phone_number": "(71) 3345-6789",
    "id_store": 7
  },
  {
    "name": "Flor do Campo",
    "cnpj": "89.012.345/0001-34",
    "city": "Vitória",
    "uf": "ES",
    "zip_code": "29010-010",
    "address": "Av. Jerônimo Monteiro, 450",
    "creation_date": "2021-08-14",
    "email": "contato@flordocampo.com.br",
    "phone_number": "(27) 98877-6655",
    "id_store": 8
  },
  {
    "name": "Supermercado Bom Preço",
    "cnpj": "90.123.456/0001-56",
    "city": "Belo Horizonte",
    "uf": "MG",
    "zip_code": "30140-010",
    "address": "Rua da Bahia, 800",
    "creation_date": "2020-05-10",
    "email": "contato@bompreco.com.br",
    "phone_number": "(31) 3344-5566",
    "id_store": 9
  },
  {
    "name": "Tech House",
    "cnpj": "01.234.567/0001-78",
    "city": "São Paulo",
    "uf": "SP",
    "zip_code": "01010-000",
    "address": "Av. Paulista, 1500",
    "creation_date": "2024-03-28",
    "email": "contato@techhouse.com.br",
    "phone_number": "(11) 98765-4321",
    "id_store": 10
  },
  {
    "name": "Loja Verde",
    "cnpj": "12.345.678/0001-90",
    "city": "Curitiba",
    "uf": "PR",
    "zip_code": "80010-020",
    "address": "Rua XV de Novembro, 300",
    "creation_date": "2023-11-11",
    "email": "contato@lojaverde.com.br",
    "phone_number": "(41) 3456-7890",
    "id_store": 11
  },
  {
    "name": "Bazar Feliz",
    "cnpj": "23.456.789/0001-12",
    "city": "Porto Alegre",
    "uf": "RS",
    "zip_code": "90020-010",
    "address": "Av. Borges de Medeiros, 400",
    "creation_date": "2021-04-19",
    "email": "contato@bazarfeliz.com.br",
    "phone_number": "(51) 9876-5432",
    "id_store": 12
  },
  {
    "name": "Casa das Flores",
    "cnpj": "34.567.890/0001-34",
    "city": "Florianópolis",
    "uf": "SC",
    "zip_code": "88010-200",
    "address": "Rua Bocaiúva, 220",
    "creation_date": "2022-07-05",
    "email": "contato@casadasflores.com.br",
    "phone_number": "(48) 3345-6789",
    "id_store": 13
  },
  {
    "name": "Mundo Kids",
    "cnpj": "45.678.901/0001-56",
    "city": "Brasília",
    "uf": "DF",
    "zip_code": "70040-010",
    "address": "SQN 210, Bloco B, Loja 10",
    "creation_date": "2020-02-25",
    "email": "contato@mundokids.com.br",
    "phone_number": "(61) 3344-5566",
    "id_store": 14
  },
  {
    "name": "PetShop Amigo",
    "cnpj": "56.789.012/0001-78",
    "city": "Manaus",
    "uf": "AM",
    "zip_code": "69010-010",
    "address": "Rua Barroso, 100",
    "creation_date": "2023-08-12",
    "email": "contato@petshopamigo.com.br",
    "phone_number": "(92) 9876-5432",
    "id_store": 15
  }
];

export default mockStores;
