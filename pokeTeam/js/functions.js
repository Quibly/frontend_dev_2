export function footerData() {
    document.getElementById('updated').innerHTML = `Last Updated: ${document.lastModified}`;
    const year = document.querySelector('#year');
    const y = new Date().getFullYear();
    year.textContent = `\xA9 ${y} | Adam Dutson | Utah`;
}

export async function geturl(url) {
    let output;
    await fetch(url)
                .then(res => res.json())
                .then(result => {
                    output = result;
                });
    return output;
}