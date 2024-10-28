// Classe que representa um modelo de Pokémon
class Pokemon {
    constructor() {
        this.number = null;       // Número identificador do Pokémon
        this.name = '';           // Nome do Pokémon
        this.type = '';           // Tipo principal do Pokémon
        this.types = [];          // Lista de todos os tipos do Pokémon
        this.photo = '';          // URL da imagem do Pokémon
        this.height = null;       // Altura do Pokémon em metros
        this.weight = null;       // Peso do Pokémon em quilogramas
        this.abilities = [];      // Lista de habilidades do Pokémon
    }
}
