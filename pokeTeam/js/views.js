import Pokemon from "./pokemon.js";

export default class PokeViews {
    
    constructor() {
        this.pokemon = new Pokemon();
        this.pokeDetail = this.buildDetail(this.pokemon);
        this.pokeTeam = this.buildTeam();
        this.pokeResults = '';
        this.pokeListen();
    }
    // Build the view for the Detail section
    async buildDetail (pokemonClass=this.pokemon, pokemonId='') {
        try {
            await pokemonClass.getByName(pokemonId);
            const pokemon = pokemonClass.detail;
            const name = pokemon.name;
            const experience = pokemon.base_experience;
            const weight = pokemon.weight;
            let sprite = pokemon.sprites.front_default;
            if (sprite == null) {
                sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';
            }
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
                <button type="button" id="addToTeamBtn">Add to Team</button>
            `;
            const single = document.querySelector('#single');
            single.innerHTML ='';
            single.appendChild(card);
            this.addToTeamListen();
        } catch (error) {
            console.log(error);
        }
    }
    // Build the view for the search result section of the page
    async buildResults (pokemonClass=this.pokemon, url = '') {
        try {
            const name = '';
            await pokemonClass.getByName(name, url);
            const page = pokemonClass.results;
            const prev = page.previous;
            const next = page.next;
            const pokemon = page.results;
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
                <p id="resultsMessage"></p>
            `;
            const resultsNames = document.querySelectorAll('.resultsName');
            this.resultsListen(resultsNames);
            this.searchBtnListen();
        } catch (error) {
            console.log(error);
        }
    }
    // Build the pokemon team view
    async buildTeam () {
        try {
            const card = document.createElement('div');
            const list = document.createElement('ul');
            const deleteAllBtn = document.createElement('button');
            deleteAllBtn.setAttribute('type', 'button');
            deleteAllBtn.setAttribute('id', 'delTeamAll');
            deleteAllBtn.innerHTML = 'Delete All';
            this.pokeTeam = this.pokemon.getTeam();
            for (let i=0; i < this.pokeTeam.length; i++) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<p>${this.pokeTeam[i].name}</p><div><img src="${this.pokeTeam[i].image}" alt="Pokemon ${this.pokeTeam[i].name}"></img></div><p>${this.pokeTeam[i].type} type</p><p class="garbage">???</p>`;
                listItem.setAttribute('class', 'resultsTeam');
                list.appendChild(listItem);
            }
            card.appendChild(list);
            const teamDiv = document.querySelector('#team');
            teamDiv.innerHTML = `<h2>Pok??mon Team</h2><p>Add Pok??mon to your Team</p>`;
            if (this.pokeTeam !== '' && this.pokeTeam !== null && this.pokeTeam.length !== 0) {
                teamDiv.innerHTML = `
                    <h2>Pok??mon Team</h2>
                    ${card.outerHTML}
                    ${deleteAllBtn.outerHTML}
                `;
            };
            this.delTeamMemberListen();
            this.delTeamListen();
        } catch (error) {
            console.log(error);
        }
    }
    // Event Listener for search button click
    async pokeListen () {
        try {
            const findBtn = document.querySelector('#findBtn');
            const name = document.querySelector('#name');
            findBtn.addEventListener('click', () => {
                if (name.value == '') {
                    this.buildResults();
                } else {
                    this.buildDetail(this.pokemon, name.value);    
                }
                name.value = '';
            });
            name.addEventListener('keypress', function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    document.querySelector('#findBtn').click();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    // Event Listener for search results click
    async resultsListen (resultsNames) {
        try {
            resultsNames.forEach(result => {
                result.addEventListener('click', (event) => {
                const name = event.target.textContent;
                this.buildDetail(this.pokemon, name);
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
    // Event Listener for Next/Prev buttons
    async searchBtnListen () {
        try {
            const nextBtn = document.querySelector('#nextBtn');
            const prevBtn = document.querySelector('#prevBtn');
            nextBtn.addEventListener('click', (event) => {
                const url = event.target.getAttribute('data-next');
                if (url !== 'null') {
                    this.buildResults(this.pokemon, url);
                }
            })
            prevBtn.addEventListener('click', (event) => {
                const url = event.target.getAttribute('data-prev');
                if (url !== 'null') {
                    this.buildResults(this.pokemon, url);
                }
            })    
        } catch (error) {
            console.log(error);
        }    
    }
    // event listener for adding pokemon to team
    async addToTeamListen () {
        try {
            const addToTeamBtn = document.querySelector('#addToTeamBtn');
            const name = document.querySelector('#detail h2').textContent;
            const image = document.querySelector('#detailImg img').getAttribute('src');
            const type = document.querySelector('#detailTypes ul li:nth-child(1)').textContent;
            addToTeamBtn.addEventListener('click', (event) => {
                this.pokemon.appendTeam(name, image, type);
                this.buildTeam();
            })    
        } catch (error) {
            console.log(error);
        }
    }
    // event listener for deleting individual pokemon from team
    delTeamMemberListen () {
        try {
            const delBtn = Array.from(document.querySelectorAll('.garbage'));
            delBtn.forEach(element => {
                element.addEventListener('click', (event) => {
                    const listItem = event.target.parentNode;
                    this.pokemon.clearTeamMember(listItem.children[0].textContent);
                    this.buildTeam();
                });
            });    
        } catch (error) {
            console.log(error);
        }
    }
    // event listener for deleting entire team
    delTeamListen () {
        try {
            const delBtn = document.querySelector('#delTeamAll');
            if(delBtn) {
                delBtn.addEventListener('click', (event) => {
                    this.pokemon.clearTeam();
                    event.target.parentNode.innerHTML = '';
                    this.buildTeam();
                });
            }    
        } catch (error) {
            console.log(error);
        }
    }
}