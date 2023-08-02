// Game Logic

const grid = (() => {

    let cells = [];
    const hasWon = () => {
        //FIXME
        return true;
    }

    const init = () => {
        const mainContainer = document.getElementById('main-container');
        const gridContainer = document.createElement('div');
        gridContainer.classList.add('grid-container');
        for(let i = 0; i < 9; i++) {
            cells.push(document.createElement('button'));
            cells[i].classList.add('cell');
            cells[i].id = 'cell' + i;
            gridContainer.appendChild(cells[i]);
            console.log(i)
            cells[i].addEventListener('click', () => {
                main.move(i);
                console.log(i);
            });
        }
        mainContainer.appendChild(gridContainer);
    }

    return {
        hasWon,
        cells,
        init,
    };
})();

const start = (() => {
    let mainContainer = document.getElementById('main-container');

    let startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        beginGame();
    });

    let iconElements = [];
    let difElements = [];
    let iconSelected = -1;
    let difSelected = -1;
    for(let i = 0; i < 4; i++) {
        iconElements.push(document.getElementById('icon-' + i));
        difElements.push(document.getElementById('dif-' + i));
        iconElements[i].addEventListener('click', () => {
            for(let i = 0; i < 4; i++) {
                iconElements[i].classList.remove('selected');
            }
            iconElements[i].classList.add('selected');
            iconSelected = i
        });
        difElements[i].addEventListener('click', () => {
            for(let i = 0; i < 4; i++) {
                difElements[i].classList.remove('selected');
            }
            difElements[i].classList.add('selected');
        });
    }

    const beginGame = () => {
        while(mainContainer.firstChild!=null) {
            mainContainer.removeChild(mainContainer.firstChild);
        }
        grid.init();
    }

    return {
        beginGame,
    }
})();

const player = (isPerson, iconFile) => {

    return {isPerson, iconFile}
}

const main = () => {
    let players = [];
    let curPlayer = true;

    let move = (i) => {

    }
}

