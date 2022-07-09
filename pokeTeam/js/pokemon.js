import { geturl } from "./functions.js";

export default class Pokemon {
    constructor() {
        this.team = [];
        this.detail = '';
        this.results = '';
        this.names = '';
        this.count = this.getCount();
        this.initTeam();
        this.initDetail();
        this.initResults();
        this.initDatabase();
    }

    // Initialize Team List
    initTeam () {
        console.log('initTeam');
        if (localStorage.getItem('pokeTeam') !== null && localStorage.getItem('pokeTeam') !== '') {
            this.team = JSON.parse(localStorage.getItem('pokeTeam'));
        } else {
            localStorage.setItem('pokeTeam', []);
        }
    };

    // Initialize Detail List
    async initDetail () {
        console.log(this.team);
        console.log(this.detail);
        if (this.team == '' || this.team.length == 0) {
            this.detail = await geturl('https://pokeapi.co/api/v2/pokemon/1');
        } else if (this.team !== '' || this.team.length !== 0) {
            this.detail = await geturl(`https://pokeapi.co/api/v2/pokemon/${this.team[0].name}`);
        }
        console.log(this.detail);
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
    }

    // Get Pokemon by Name
    async getByName (name='', url='') {
        const nameInput = document.querySelector('#name');
        console.log(nameInput.value);
        let output;
        if (nameInput.validity.patternMismatch) {
            nameInput.setCustomValidity('Expecting an alpha text entry');
            nameInput.reportValidity();
        } else {
            nameInput.setCustomValidity('');
            if (name == '' && url == '') {
                await this.count;
                output = await geturl(`https://pokeapi.co/api/v2/pokemon/`);
                this.results = output;
            } else if (name == '' && url !== '') {
                output = await geturl(url);
                this.results = output;
            } else {
                output = await geturl(`https://pokeapi.co/api/v2/pokemon/${name}`);
                console.log(output);
                if(output !== undefined) {
                    this.detail = output;
                }
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
        if (localStorage.getItem('pokeTeam')) { this.team = JSON.parse(localStorage.getItem('pokeTeam')); }
        return this.team;
    }
    // Set Team for Local Storage
    appendTeam (newName, newImage, newType) {
        const currentTeam = this.getTeam();
        console.log(currentTeam.length);
        let check = false;

        currentTeam.forEach(pokemon => {
            if (pokemon.name == newName) {
                check = true;
            }
        })
        if (!localStorage.getItem('pokeTeam')) {
            this.team = [];
            const newObject = {
                name: newName,
                image: newImage,
                type: newType
            } 
            this.team.push(newObject);
            localStorage.setItem('pokeTeam', JSON.stringify(this.team));
        } else if (check == true) {
            const message = document.querySelector('#addToTeamBtn');
            message.textContent = "Can't add duplicates";
            message.setAttribute('class', 'alerted');
            setTimeout(function() {
                message.textContent = 'Add to Team';
                message.setAttribute('class', '');
            }, 5000);
        } else if (currentTeam.length >= 6) {
            const message = document.querySelector('#addToTeamBtn');
            message.textContent = "Team Max is 6";
            message.setAttribute('class', 'alerted');
            setTimeout(function() {
                message.textContent = 'Add to Team';
                message.setAttribute('class', '');
            }, 5000);
        } else {
            const temp = this.getTeam();
            const newObject = {
                name: newName,
                image: newImage,
                type: newType
            } 
            this.team = temp;
            this.team.push(newObject);
            localStorage.setItem('pokeTeam', JSON.stringify(this.team));
        }
    }
    // Delete current team build
    clearTeam () {
        this.team = [];
        localStorage.setItem('pokeTeam', '');
    }
    // Delete team member
    clearTeamMember (name) {
        let currentTeam = this.getTeam();
        let count = 0;
        currentTeam.forEach(pokemon => {
            if (pokemon.name == name) {
                currentTeam.splice(count, 1);
            }
            count++;
        });
        this.team = currentTeam;
        localStorage.setItem('pokeTeam', JSON.stringify(currentTeam));
    }
}