document.getElementById('updated').innerHTML = `Last Updated: ${document.lastModified}`;

const year = document.querySelector('#year');
const y = new Date().getFullYear();
year.textContent = `\xA9 ${y} | Adam Dutson | Utah`;

const links = [
    {
        label: "Week 1",
        url: "week1.html"
    },
    {
        label: "Week 2",
        url: "week2.html"
    },
    {
        label: "Week 3",
        url: "week3.html"
    },
    {
        label: "Week 4",
        url: "week4.html"
    },
    {
        label: "Week 5",
        url: "week5.html"
    },
    {
        label: "Week 6 - ToDos App",
        url: "week6.html"
    },
    {
        label: "Week 7",
        url: "week7.html"
    },
    {
        label: "Week 8",
        url: "week8.html"
    },
    {
        label: "Week 9",
        url: "week9.html"
    },
    {
        label: "Week 10",
        url: "week10.html"
    },
    {
        label: "Week 11",
        url: "week11.html"
    },
    {
        label: "Week 12",
        url: "week12.html"
    },
    {
        label: "Week 13 - Block 2 Challenge - Pokedex App",
        url: "week13.html"
    }
]

links.forEach(element => {
    let label = element.label;
    let url = element.url;
    const indexList = document.querySelector('#indexList');
    labelHead = document.createElement('h3');
    labelHead.textContent = label;
    urlTag = document.createElement('a');
    urlTag.textContent = url;
    urlTag.setAttribute('href', `./html/${url}`);
    list1li = document.createElement('li');
    list2ul = document.createElement('ul');
    list2li = document.createElement('li');
    list1li.appendChild(labelHead);
    list2li.appendChild(urlTag);
    list2ul.appendChild(list2li);
    list1li.appendChild(list2ul);
    indexList.appendChild(list1li);
});
