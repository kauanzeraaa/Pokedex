const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');
let srcPoke = 1;

const fetchPokemon = async (pokemon) =>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status == 200)
    {
        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){ 
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        srcPoke = data.id;
    }
    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'not found!';
        pokemonNumber.innerHTML = '';
    }
}
//renderPokemon('5');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

prev.addEventListener('click', () => {
    if(srcPoke > 1)
    {
        srcPoke -= 1;
        renderPokemon(srcPoke);
    }
});

next.addEventListener('click', () => {
    srcPoke += 1;
    renderPokemon(srcPoke);
});
renderPokemon(srcPoke);
