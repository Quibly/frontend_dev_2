document.getElementById('updated').innerHTML = `Last Updated: ${document.lastModified}`;

const year = document.querySelector('#year');
const y = new Date().getFullYear();
year.textContent = `\xA9 ${y} | Adam Dutson | Utah`;