process.stdin.resume();
process.stdin.setEncoding('utf8');

let items = [];
let adding = false;
let calculating = false;

menu();

process.stdin.on('data', function (input) {
    const text = input.trim();
    if (adding) {
        add(text);
        adding = false;
        menu();
    }
    else if (calculating) {
        console.log('Total: ' + calc(text));
        calculating = false;
        menu();
    } else {
        switch (+text) {
            case 1:
                adding = true;
                console.log(`Print item's name and price (e.g. 'Bread 0.85'):`);
                break;
            case 2:
                list();
                menu();
                break;
            case 3:
                calculating = true;
                console.log(`Print item's id and/or press enter.`);
                break;
            case 4:
                done();
                break;
            default:
                menu();
                break;
        }
    }
});

function menu() {
    const menu = '\r\nMenu:\r\n' +
        '1. Add new item\r\n' +
        '2. List items\r\n' +
        '3. Calculate total price\r\n' +
        '4. Exit\r\n';
    console.log(menu);
}

function add(text) {
    const data = text.split(' ');
    const item = {
        id: items.length,
        name: data[0],
        price: +data[1]
    };
    items.push(item);
}

function list() {
    console.log('\r\nItems:\r\n');
    items.forEach(i => console.log(i.id + ' | ' + i.name + ' | ' + i.price));
}

function calc(text) {
    return text
        ? text.split(' ').reduce((sum, id) => sum + items[id] ? items[id].price : 0, 0)
        : items.reduce((sum, item) => sum + item.price, 0);
}

function done() {
    console.clear();
    console.log('See you.');
    process.exit();
}
