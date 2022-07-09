export function footerData() {
    document.getElementById('updated').innerHTML = `Last Updated: ${document.lastModified}`;
    const year = document.querySelector('#year');
    const y = new Date().getFullYear();
    year.textContent = `\xA9 ${y} | Adam Dutson | Utah`;
}

export async function geturl(url) {
    let output;
    const name = document.querySelector('#inputError');
    const results = document.querySelector('#resultsMessage');
    if (results) {
        results.textContent = "Loading...";
    } else {
        name.textContent = "Loading...";
    }
    
    await fetch(url)
                .then(res => res.json())
                .then(result => {
                    name.textContent = "";
                    if (results) {
                        results.textContent = "";
                    }
                    output = result;
                })
                .catch((error) => {
                    if (error) {
                        name.textContent = "No Matches Were Found for Your Search";
                    }
                });
    return output;
}