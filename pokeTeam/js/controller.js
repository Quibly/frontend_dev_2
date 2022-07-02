import { footerData } from "./functions.js";
import PokeViews from "./views.js";

export default class PokeTeamBuilder {
    
    constructor() {
        this.footer = footerData();
        this.views = new PokeViews();
    }
    
}

