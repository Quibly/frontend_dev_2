const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const people = document.querySelector('#people');
let message = document.querySelector('#message');
let pages = document.querySelector('#pages');
let page = 1;
let pageCount = 1;


getList(page);

function getList (page) {
    fetch(`https://swapi.dev/api/people/?page=${page}`)
        .then(res => res.json())
        .then(data => {
            pageCount = Math.ceil(data.count/10);
            const peopleList = [];
            const peopleA = Array.from(data.results);
            peopleA.forEach(element => {
                peopleList.push(`${element.name}<br>`);    
            });
            people.innerHTML = peopleList.join('');
            getPage(page, pageCount);
            console.log(data);
        });
}

function getPage(page, pageCount) {
    pages.innerHTML = (`Page ${page}/${pageCount}`);
}

prevBtn.addEventListener('click', function () {
    if (page > 1) {
        message.textContent = '';
        page--;
        getList(page);
    } else {
        message.textContent = 'There are no previous pages.';
    }
})

nextBtn.addEventListener('click', function () {
    if (page < pageCount) {
        message.textContent = '';
        page++;
        getList(page);
    } else {
        message.textContent = 'There are no more pages.';
    }
})