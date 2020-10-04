const init = () => {
    const shop = document.getElementsByClassName('shop')[0];
    const alert = document.getElementById('alert');
    const buttons = shop.getElementsByTagName('button');
    const minuses = document.getElementsByClassName('minus');
    const pluses = document.getElementsByClassName('plus');
    const numbers = document.getElementsByClassName('number');
    alert.onclick = () => {
        alert.style.display = 'none';
        clearTimeout(timer);
    };
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].onclick = () => request(JSON.stringify({
            id: buttons[i].id.slice(1),
            number: parseInt(numbers[i].innerHTML)
        }));
        minuses[i].onclick = () => numbers[i].innerHTML < 2 ? numbers[i].innerHTML : --numbers[i].innerHTML;
        pluses[i].onclick = () => numbers[i].innerHTML > 8 ? numbers[i].innerHTML : ++numbers[i].innerHTML;
    }
};

const request = body => {
    const req = new XMLHttpRequest();
    req.open('POST', '/products', true);
    req.send(body);
    req.addEventListener(
        'readystatechange',
        () => req.readyState === 4 ? render(req.status, req.response) : null
    );
};

const render = (st, res) => {
    clearTimeout(timer);
    const alert = document.getElementById('alert');
    const status = document.getElementById('status');
    const message = document.getElementById('message');
    if (st === 200) {
        alert.classList.remove('alert-danger');
        alert.classList.add('alert-success');
        status.textContent = 'Success!';
        message.textContent = res;
    } else {
        alert.classList.remove('alert-success');
        alert.classList.add('alert-danger');
        status.textContent = 'Danger!';
        message.textContent = 'Something went wrong, please try again.';
    }
    alert.style.display = 'flex';
    timer = setTimeout(() => alert.style.display = 'none', 3000);
};

let timer;
