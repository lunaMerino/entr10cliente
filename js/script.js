const baseURL = 'https://gateway.marvel.com/v1/public/';

let publickey = "ecb4dce8f038c1e5a8d0350a4f09b47d";
let privatekey = "97f899194a7aa20bbbdcdff5bb73c33ed48abdc3";

let ts = Date.now();
let hash = CryptoJS.MD5(ts + privatekey + publickey).toString();


async function fetchCharacters() {
    const endpoint = `${baseURL}characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.thumbnail.path}/portrait_xlarge.jpg" alt="${character.name}">
            <p>${character.description || 'No description available.'}</p>
        `;
        container.appendChild(card);
    });
}


async function fetchStories() {
    const endpoint = `${baseURL}stories?ts=${ts}&apikey=${publickey}&hash=${hash}`;
    
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const data = await response.json();
        displayStories(data.data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayStories(stories) {
    const container = document.getElementById('storiesContainer');
    container.innerHTML = '';
    stories.forEach(story => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${story.title}</h3>
            <p>${story.description || 'No description available.'}</p>
        `;
        container.appendChild(card);
    });
}

fetchCharacters();
fetchStories();