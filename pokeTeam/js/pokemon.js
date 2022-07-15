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
        try {
            if (localStorage.getItem('pokeTeam') !== null && localStorage.getItem('pokeTeam') !== '') {
                this.team = JSON.parse(localStorage.getItem('pokeTeam'));
            } else {
                localStorage.setItem('pokeTeam', []);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Initialize Detail List
    async initDetail () {
        try {
            if (this.team == '' || this.team.length == 0) {
                this.detail = await geturl('https://pokeapi.co/api/v2/pokemon/1');
            } else if (this.team !== '' || this.team.length !== 0) {
                this.detail = await geturl(`https://pokeapi.co/api/v2/pokemon/${this.team[0].name}`);
            }
        } catch (error) {
            console.log(error);
        }        
    }
    
    // Initialize Results List
    initResults () {
        try {
            if (this.results == '') {
                this.results = "You haven't searched anything yet.";
                const temp = document.querySelector('#results');
                temp.innerHTML = '';
                temp.innerHTML = `<h2>${this.results}</h2>`;
            }
        } catch (error) {
            console.log(error);   
        }
    }
    // Initialize list of all Pokemon
    initDatabase () {
        try {
            this.getByName();    
        } catch (error) {
            console.log(error);
        }
    }

    // Get Pokemon by Name
    async getByName (name='', url='') {
        try {
            const nameInput = document.querySelector('#name');
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
                    output = await geturl(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                    if(output !== undefined) {
                        this.detail = output;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    // Get all of the Pokemon listed on the API
    async getAll () {
        try {
            let output;
            await this.count;
            output = await geturl(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.count}`);    
        } catch (error) {
            console.log(error);
        }
    }
    // Get the total number of Pokemon
    async getCount () {
        try {
            const temp = await geturl('https://pokeapi.co/api/v2/pokemon/');
            this.count = await temp.count;    
        } catch (error) {
            console.log(error);
        }
    }
    // Get Team from Local Storage
    getTeam () {
        try {
            if (localStorage.getItem('pokeTeam')) { this.team = JSON.parse(localStorage.getItem('pokeTeam')); }
            return this.team;
        } catch (error) {
            console.log(error);
        }
        
    }
    // Set Team for Local Storage
    appendTeam (newName, newImage, newType) {
        try {
            const currentTeam = this.getTeam();
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
        } catch (error) {
            console.log(error);
        }
    }
    // Delete current team build
    clearTeam () {
        try {
            this.team = [];
            localStorage.setItem('pokeTeam', '');    
        } catch (error) {
            console.log(error);
        }
    }
    // Delete team member
    clearTeamMember (name) {
        try {
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
        } catch (error) {
            console.log(error);
        } 
    }
}