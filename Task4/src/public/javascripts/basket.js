const init = () => {
    const shop = document.getElementsByClassName('shop')[0];
    const add = document.getElementsByClassName('add')[0];
    const buttons = shop.getElementsByTagName('button');
    for (const button of buttons) {
        button.onclick = button.id[0] === 'r' ? remove : decrease;
    }
    add.onclick = clear;
};

function remove() { request('DELETE', this.id.slice(2)); }

function decrease() { request('PUT', this.id.slice(2)); }

function clear() { request('DELETE'); }

const request = (method, id = '') => {
    const req = new XMLHttpRequest();
    req.open(method, `/basket/${id}`, true);
    req.send();
    req.addEventListener('readystatechange', () => {
        if (req.readyState === 4) {
            req.status < 400
                ? render(req.response)
                : render('Request failed: ' + req.status + '\n' + req.statusText + '\n' + req.responseText);
        }
    });
};

const render = res => {
    const main = document.getElementsByClassName('main')[0];
    main.innerHTML = res;
    init();
};
