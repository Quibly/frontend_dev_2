import { geturl } from "./functions.js";

export default class Pokemon {
    constructor() {
        this.team = '';
        this.detail = '';
        this.results = '';
        this.names = '';
        this.abilities = '';
        this.locations = '';
        this.count = this.getCount();
        this.initTeam();
        this.initDetail();
        this.initResults();
        this.initDatabase();
    }

    // Initialize Team List
    initTeam () {
        if (localStorage.getItem('pokeTeam') !== null && localStorage.getItem('pokeTeam') !== '') {
            this.team = localStorage.getItem('pokeTeam');
        } else {
            localStorage.setItem('pokeTeam', '');
        }
        console.log(this.team);
    };

    // Initialize Detail List
    async initDetail () {
        if (this.team == '') {
            this.detail = await geturl('https://pokeapi.co/api/v2/pokemon/1');
        } else if (this.team !== '') {
            this.detail = this.team[0];
        }
    }
    
    // Initialize Results List
    initResults () {
        if (this.results == '') {
            this.results = "You haven't searched anything yet.";
            const temp = document.querySelector('#results');
            temp.innerHTML = '';
            temp.innerHTML = `<h2>${this.results}</h2>`;
        }
    }
    // Initialize list of all Pokemon
    initDatabase () {
        this.getByName();
        console.log(this.names);
    }

    // Get Pokemon by Name
    async getByName (name='', url='') {
        const nameInput = document.querySelector('#name');
        let output;
        if (nameInput.validity.typeMismatch) {
            nameInput.setCustomValidity('Expecting an alpha text entry');
            nameInput.reportValidity();
        } else {
            nameInput.setCustomValidity('');
            if (name == '' && url == '') {
                await this.count;
                output = await geturl(`https://pokeapi.co/api/v2/pokemon/`);
                this.results = output;
                console.log(this.results);
            } else if (name == '' && url !== '') {
                output = await geturl(url);
                this.results = output;
            } else {
                output = await geturl(`https://pokeapi.co/api/v2/pokemon/${name}`);
                this.detail = output;
                console.log(this.detail);
            }
        }
    }
    // Get all of the Pokemon listed on the API
    async getAll () {
        let output;
        await this.count;
        output = await geturl(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.count}`);
    }
    // Get the total number of Pokemon
    async getCount () {
        const temp = await geturl('https://pokeapi.co/api/v2/pokemon/');
        this.count = await temp.count;
    }
    // Get Team from Local Storage
    getTeam () {
        if (localStorage.getItem('pokeTeam')) { this.team = localStorage.getItem('pokeTeam'); }
        return this.team;
    }
    // Set Team for Local Storage
    appendTeam (name) {
        if (!localStorage.getItem('pokeTeam')) {
            this.team = '';
            this.team.push(name);
            localStorage.setItem('pokeTeam', this.team);
        } else {
            this.team.push(name);
            localStorage.setItem('pokeTeam', this.team);
        }
    }
    // Delete current team build
    clearTeam () {
        this.team = '';
        localStorage.pokeTeam = '';
    }
}