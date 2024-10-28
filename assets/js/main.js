// Elementos principais da interface
const pokemonList = document.getElementById('pokemonList'); // Lista de Pokémon
const loadMoreButton = document.getElementById('loadMoreButton'); // Botão para carregar mais Pokémon
const pokemonDetailSection = document.getElementById('pokemonDetail'); // Seção de detalhes do Pokémon
const overlay = document.getElementById('overlay'); // Overlay para escurecimento


// Elementos específicos da seção de detalhes do Pokémon
const pokemonDetailImage = document.getElementById('pokemonDetailImage');
const pokemonDetailName = document.getElementById('pokemonDetailName');
const pokemonDetailNumber = document.getElementById('pokemonDetailNumber');
const pokemonDetailTypes = document.getElementById('pokemonDetailTypes');
const pokemonDetailHeight = document.getElementById('pokemonDetailHeight');
const pokemonDetailWeight = document.getElementById('pokemonDetailWeight');
const pokemonDetailAbilities = document.getElementById('pokemonDetailAbilities');

// Configurações de limite e registros
const maxRecords = 151; // Número máximo de registros de Pokémon
const limit = 10; // Limite de registros a serem carregados por vez
let offset = 0; // Ponto de início para carregar registros

// Função para exibir os detalhes do Pokémon
function showPokemonDetail(pokemon) {
    // Preencher as informações no card de detalhes
    pokemonDetailImage.src = pokemon.photo || 'default-image-path.png'; // Verifica se há imagem
    pokemonDetailName.textContent = pokemon.name;
    pokemonDetailNumber.textContent = `#${pokemon.number}`;
    pokemonDetailTypes.textContent = pokemon.types.join(', ');
    pokemonDetailHeight.textContent = `${pokemon.height} m`;
    pokemonDetailWeight.textContent = `${pokemon.weight} kg`;
    pokemonDetailAbilities.textContent = pokemon.abilities.join(', ');

    // Exibe o overlay e a seção de detalhes, oculta a lista principal
    overlay.classList.remove('hidden');
    pokemonList.classList.add('hidden');
    pokemonDetailSection.classList.remove('hidden');
}

// Função para transformar o Pokémon em um item de lista
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-img" data-number="${pokemon.number}">
            </div>
        </li>
    `;
}

// Evento para exibir detalhes ao clicar em um Pokémon na lista
pokemonList.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const pokemonNumber = clickedElement.getAttribute('data-number');

    if (pokemonNumber) {
        // Obtém detalhes do Pokémon e exibe no card
        pokeApi.getPokemonDetailByNumber(pokemonNumber).then(showPokemonDetail);
    }
});

// Função para carregar e exibir mais Pokémon na lista principal
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Converte a lista de Pokémon em HTML e adiciona à lista existente
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

// Evento para voltar à lista principal e ocultar o card de detalhes
document.getElementById('backToList').addEventListener('click', () => {
    // Oculta o card de detalhes e o overlay, exibe a lista principal
    pokemonDetailSection.classList.add('hidden');
    overlay.classList.add('hidden');
    pokemonList.classList.remove('hidden');
});

// Carrega os primeiros Pokémon quando a página é aberta
loadPokemonItens(offset, limit);

// Botão de "Load More" para carregar mais Pokémons
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        // Carrega apenas o restante dos Pokémon e remove o botão "Load More"
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        // Carrega mais Pokémon mantendo o limite padrão
        loadPokemonItens(offset, limit);
    }
});
