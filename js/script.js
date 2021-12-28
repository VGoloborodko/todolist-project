let arr = [];
let activeCard = null;

//Находим элементы в DOM-дереве
const sortDec = document.querySelector('.sort-dec');
const sortInc = document.querySelector('.sort-inc');
const button = document.querySelector('.button');
const addBlock = document.querySelector('.add');
const block = document.querySelector('.block-inp');
const firstInput = document.querySelector('.input');

//Очистка строки ввода для первого элемента
addBlock.addEventListener('click', event => {
    event.currentTarget.firstElementChild.value = null;
})

//Замена иконки при клике и сортировка элементов
sortDec.addEventListener('click', () => {
    arr.sort((a, b) => a.inputElement.value > b.inputElement.value ? 1 : -1);
    arr.forEach(element => {
        block.append(element.blockElement)
    });

    sortDec.style.display = 'none';
    sortInc.style.display = 'block';
})

sortInc.addEventListener('click', () => {
    arr.sort((a, b) => a.inputElement.value < b.inputElement.value ? 1 : -1);
    arr.forEach(element => {
        block.append(element.blockElement)
    });

    sortInc.style.display = 'none';
    sortDec.style.display = 'block';
})

//Добавление элементов и удаление
button.addEventListener('click', () => {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const close = document.createElement('div');

    div.classList.add('add');
    input.classList.add('input');
    close.classList.add('close');

    block.append(div);
    div.append(input);
    div.append(close);

    //Значения для новых элементов
    input.value = firstInput.value;
    firstInput.value = null;

    //Удаление конкретного элемента и удаление из массива
    close.addEventListener('click', event => {
        const delArr = arr.findIndex(element => {
            return element.blockElement === event.target.parentElement;
        })
        arr.splice(delArr, 1);
        event.target.parentElement.remove();
    });

    //Помещаем создынные элементы в объект
    const obj = {
        blockElement: div,
        inputElement: input
    }

    //Добавление объекта в массив для сортировки
    arr.push(obj);

    //DRAG AND DROP
    div.draggable = true;

    div.addEventListener("dragstart", eventHandler);
    div.addEventListener("dragenter", eventHandler);
    div.addEventListener("dragend", eventHandler);
});

function eventHandler(event) {
    switch(event.type) {
        case "dragstart":
            activeCard = event.currentTarget;
            activeCard.classList.add("selected");
            break;
        case "dragenter":
            changeCards(activeCard, event.currentTarget);
            break;
        case "dragend":
            activeCard.classList.remove("selected");
            break;
    }
}

function changeCards(activeCard, toSwap) {
    const cardsCont = activeCard.parentElement;

    const cardsArr = [...cardsCont.children];

    const activeCardIndex = cardsArr.indexOf(activeCard);
    const swapCardIndex = cardsArr.indexOf(toSwap);

    if (activeCardIndex < swapCardIndex) {
        cardsCont.insertBefore(toSwap, activeCard);
    } else if (activeCardIndex > swapCardIndex) {
        cardsCont.insertBefore(activeCard, toSwap);
    }
}