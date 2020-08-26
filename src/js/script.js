//Принимаем данные о карточках с бэкенда
const productList = [
    {   
        avaiable: true,
        desciption: 'Сказочное заморское яство',
        name: 'Нямушка',
        taste: 'с фуа-гра',
        portion: '10 порций',
        present: 'Мышь в подарок',
        options: '',
        weight: '0,5',
        unit : 'кг',
        footerDefault : `
        Чего сидишь? Порадуй котэ, <u>купи.</u>
        `,
        footerSelected : `
        Печень утки разварная с артишоками.
        `,
        footedDisabled : `
        Печалька, с фуа-гра закончился.
        `
    },
    {   
        avaiable: true,
        desciption: 'Сказочное заморское яство',
        name: 'Нямушка',
        taste: 'с рыбой',
        portion: '40 порций',
        present: '2 мыши в подарок',
        options: '',
        weight: '2',
        unit : 'кг',
        footerDefault : `
        Чего сидишь? Порадуй котэ, <u>купи.</u>
        `,
        footerSelected : `
        Головы щучьи с чесноком да свежайшая сёмгушка.
        `,
        footedDisabled : `
        Печалька, с рыбой закончился.
        `
    },
    {   
        avaiable: false,
        desciption: 'Сказочное заморское яство',
        name: 'Нямушка',
        taste: 'с курой',
        portion: '100 порций',
        present: '5 мышей в подарок',
        options: 'заказчик доволен',
        weight: '5',
        unit : 'кг',
        footerDefault : `
        Чего сидишь? Порадуй котэ, <u>купи.</u>
        `,
        footerSelected : `
        Филе из цыплят с трюфелями в бульоне.
        `,
        footedDisabled : `
        Печалька, с курой закончился.
        `
    },
]
//создаем список карточек
function createProduct(productList = []){
    const cardList = document.createElement('div');
    cardList.classList.add('main-cardlist');

    productList.forEach(card => {
    cardList.insertAdjacentHTML('beforeEnd', `
    <div class="main-card" data-aviable=${card.avaiable}>
        <div class="main-card__content">
            <div class="main-card__subtitle-top" data-default="${card.desciption}" data-leave="Котэ не одобряет?">${card.desciption}</div>
            <div class="main-card__title">${card.name}</div>
            <div class="main-card__title-small">${card.taste}</div>
            <div class="main-card__subtitle-bottom">${card.portion}<br>${card.present}<br>${card.options}</div>
            <div class="main-card__weight">
                <span class="main-card__weight-number">${card.weight}</span> 
                <span class="main-card__weight-unit">${card.unit}</span>
            </div>
        </div>
        <div class="main-card__footer default">
        <span class="main-card__footer-text" data-selected="${card.footerSelected}" data-disabled="${card.footedDisabled}" data-default="${card.footerDefault}">
        ${card.footerDefault}


    </div>
    `
    )});

    document.querySelector('.main-content').appendChild(cardList);
    return cardList;
}

//выбор карточки
function cardsChoise() {
    const cardList = createProduct(productList);
    const mainCards = document.querySelectorAll('.main-card');

    for ( let card of mainCards) {
        const cardContent = card.querySelector('.main-card__content');
        const cardWeight = card.querySelector('.main-card__weight');
        const cardFooterText = card.querySelector('.main-card__footer-text');
        const cardsubtitleTop = card.querySelector('.main-card__subtitle-top');
        //клик
        function cardClick() {
                if (card.getAttribute('data-aviable') == 'true' ) {
                    cardContent.classList.toggle('active');
                    cardWeight.classList.toggle('active-bounce');
                    if (cardContent.classList.contains('active')) {
                        cardFooterText.innerHTML = cardFooterText.getAttribute('data-selected');
                    }
                    else if (!cardContent.classList.contains('active')) {
                        cardFooterText.innerHTML = cardFooterText.getAttribute('data-default');
                        cardsubtitleTop.innerHTML = cardsubtitleTop.getAttribute('data-default');
                    }
                }
                else if (card.getAttribute('data-aviable') == 'false' ) {
                    cardContent.classList.toggle('disabled');
                    cardWeight.classList.toggle('disabled-bounce');
                    cardFooterText.innerHTML = cardFooterText.getAttribute('data-disabled');
                    cardFooterText.classList.toggle('disabled-text');
                    if (!cardContent.classList.contains('disabled')) {
                        cardFooterText.innerHTML = cardFooterText.getAttribute('data-default');
                    }
                }
            }
        //заменить subtitle через секунду после ухода мышки
        function changeTitle() {
            if (cardContent.classList.contains('active')) {
                cardsubtitleTop.classList.toggle('active-text');
                cardsubtitleTop.innerHTML = cardsubtitleTop.getAttribute('data-leave');
            }
        }
        //вернуть цвет subtitle после возвращения на карточку
        function returnTitle() {
            if (cardsubtitleTop.classList.contains('active-text')) {
                cardsubtitleTop.classList.toggle('active-text');
                cardsubtitleTop.innerHTML = cardsubtitleTop.getAttribute('data-default');
            }
        }
        //добавляем обработчики событий
        card.addEventListener('click', cardClick);
        card.addEventListener('mouseleave', function() { 
            setTimeout(changeTitle, 1000);
        });
        card.addEventListener('mousemove', returnTitle);
        }
    }
cardsChoise();
