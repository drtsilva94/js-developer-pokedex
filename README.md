# Pokedex

![Bulbasaur](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png)

Este é um projeto de Pokedex criado para exibir uma lista de Pokémon com detalhes de cada um. A aplicação permite ao usuário navegar por uma lista de Pokémon, visualizar detalhes de cada um e carregar mais Pokémon dinamicamente.

## Tecnologias Utilizadas

- **HTML5**: Estrutura da interface do usuário.
- **CSS3**: Estilos e layout da Pokedex.
- **JavaScript (ES6)**: Funcionalidade de carregamento de dados e interação.
- **PokeAPI**: API pública que fornece dados sobre os Pokémon.

## Funcionalidades

- Exibe uma lista de Pokémon com nome e imagem.
- Ao clicar em um Pokémon, exibe um card com detalhes como tipos, altura, peso e habilidades.
- Possui paginação para carregar mais Pokémon.
- Interface responsiva e interativa.

## Estrutura do Projeto

```plaintext
├── index.html            # Estrutura HTML principal
├── assets/
│   ├── css/
│   │   ├── global.css    # Estilos globais
│   │   └── pokedex.css   # Estilos específicos da Pokedex
│   ├── js/
│   │   ├── main.js       # JavaScript principal para interações da Pokedex
│   │   ├── poke-api.js   # Funções para acessar e manipular dados da PokeAPI
│   │   └── pokemon-model.js # Modelo para estrutura dos dados de cada Pokémon
│   └── img/              # Imagens e ícones (se necessário)
└── README.md             # Documentação do projeto
