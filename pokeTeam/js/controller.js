import { footerData } from "./functions.js";
import PokeViews from "./views.js";

export default class PokeTeamBuilder {
    
    constructor() {
        this.footer = footerData();
        this.views = new PokeViews();
    }
    
}

document.getElementById('findBtn')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            document.querySelector('searchForm').submit();
        }
    });

