const pokeApi = {};

// Converte os dados da PokeAPI em um objeto Pokemon customizado
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    // Extraindo e definindo tipos
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types[0]; // Define o primeiro tipo como o principal

    // Foto do Pokémon
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Detalhes adicionais: altura, peso e habilidades
    pokemon.height = pokeDetail.height / 10; // Converte para metros
    pokemon.weight = pokeDetail.weight / 10; // Converte para quilogramas
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    return pokemon;
}

// Função para obter os detalhes de um Pokémon a partir de seu número
pokeApi.getPokemonDetailByNumber = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do Pokémon');
            }
            return response.json();
        })
        .then((pokeDetail) => {
            const pokemon = new Pokemon();
            pokemon.number = pokeDetail.id;
            pokemon.name = pokeDetail.name;

            // Define tipos e foto do Pokémon
            pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
            pokemon.type = pokemon.types[0];
            pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

            // Converte altura e peso para metros e quilogramas
            pokemon.height = pokeDetail.height / 10;
            pokemon.weight = pokeDetail.weight / 10;
            pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

            return pokemon;
        });
};

// Função para buscar uma lista de Pokémon com base em offset e limite
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os Pokémon');
            }
            return response.json();
        })
        .then((jsonBody) => {
            // Valida a resposta da API para garantir que ela contém uma lista de resultados
            if (!jsonBody.results || !Array.isArray(jsonBody.results)) {
                throw new Error('Resposta inválida da API');
            }
            return jsonBody.results;
        })
        // Para cada Pokémon, obtém os detalhes completos
        .then((pokemons) => pokemons.map((pokemon) => pokeApi.getPokemonDetailByNumber(pokemon.name)))
        // Espera todas as requisições de detalhes serem resolvidas
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            console.log('Pokémon carregados:', pokemonsDetails);
            return pokemonsDetails;
        })
        .catch((error) => {
            console.error('Erro ao carregar os Pokémon:', error);
        });
};
