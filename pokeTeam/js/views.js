import Pokemon from "./pokemon.js";

export default class PokeViews {
    
    constructor() {
        this.pokemon = new Pokemon();
        this.pokeDetail = this.buildDetail(this.pokemon);
        this.pokeTeam = '';
        this.pokeResults = '';
        this.pokeListen();
    }

    async buildDetail (pokemonClass=this.pokemon, pokemonId='') {
        await pokemonClass.getByName(pokemonId);
        const pokemon = pokemonClass.detail;
        const name = pokemon.name;
        const experience = pokemon.base_experience;
        const weight = pokemon.weight;
        const sprite = pokemon.sprites.front_default;
        let types = document.createElement('ul');
        let stats = document.createElement('ul');
        for (let i=0; i < pokemon.types.length; i++) {
            const card = document.createElement('li');
            card.innerHTML = `${pokemon.types[i].type.name}`;
            types.append(card);
            
        }
        for (let i=0; i < pokemon.stats.length; i++) {
            const card = document.createElement('li');
            card.innerHTML = `${pokemon.stats[i].stat.name}: ${pokemon.stats[i].base_stat}`;
            stats.append(card);
        }
        const card = document.createElement('ul');
        card.innerHTML = `
            <li id="detail">
            <h2>${name}</h2>
            <div id="detailImg"><img src='${sprite}' alt='Front of ${name}'></div>
            <p>Experience: ${experience}</p>
            <p>Weight: ${weight}</p>
            <div id="detailTypes">Type(s): ${types.outerHTML}</div>
            <div id="detailStats">${stats.outerHTML}</div>
            </li>
        `;
        const single = document.querySelector('#single');
        single.innerHTML ='';
        single.appendChild(card);
    }

    async buildResults (pokemonClass=this.pokemon, url = '') {
        const name = '';
        await pokemonClass.getByName(name, url);
        const page = pokemonClass.results;
        const prev = page.previous;
        const next = page.next;
        const pokemon = page.results;
        console.log(pokemon);
        const resultList = document.createElement('ul');
        resultList.setAttribute('id', 'resultList');
        for (let i=0; i < pokemon.length; i++) {
            const card = document.createElement('li');
            card.textContent = `${pokemon[i].name}`;
            card.setAttribute('class', 'resultsName');
            resultList.appendChild(card);
        }
        const nextBtn = document.createElement('button');
        const prevBtn = document.createElement('button');
        nextBtn.setAttribute('type', 'button');
        nextBtn.setAttribute('id', 'nextBtn');
        nextBtn.setAttribute('data-next', next);
        nextBtn.textContent = 'Next';
        prevBtn.setAttribute('type', 'button');
        prevBtn.setAttribute('id', 'prevBtn');
        prevBtn.setAttribute('data-prev', prev);
        prevBtn.textContent = 'Prev';
        const results = document.querySelector('#results');
        results.innerHTML = '';
        results.innerHTML = `
            <h2>Search/Filter Results:</h2>
            ${resultList.outerHTML}
            ${prevBtn.outerHTML}
            ${nextBtn.outerHTML}
        `;
        const resultsNames = document.querySelectorAll('.resultsName');
        this.resultsListen(resultsNames);
        this.searchBtnListen();
            
        
    }

    async pokeListen () {
        // Event Listener for search button click
        const findBtn = document.querySelector('#findBtn');
        findBtn.addEventListener('click', () => {
            const name = document.querySelector('#name');
            if (name.value == '') {
                this.buildResults();
            } else {
                this.buildDetail(this.pokemon, name.value);    
            }
            name.value = '';
        })
    }

    async resultsListen (resultsNames) {
        // Event Listener for search results click
        resultsNames.forEach(result => {
            result.addEventListener('click', (event) => {
            console.log(event.target.textContent);
            // await this.pokemon.getByName(event.target.textContent);
            const name = event.target.textContent;
            this.buildDetail(this.pokemon, name);
            });
        });
    }

    async searchBtnListen () {
        // Event Listener for Next/Prev buttons
        const nextBtn = document.querySelector('#nextBtn');
        const prevBtn = document.querySelector('#prevBtn');
        nextBtn.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-next');
            if (url !== null) {
                this.buildResults(this.pokemon, url);
            }
        })
        prevBtn.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-prev');
            if (url !== null) {
                this.buildResults(this.pokemon, url);
            }
        })        
    }
    
}