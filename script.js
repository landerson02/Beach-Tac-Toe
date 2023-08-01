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

const player = (isPerson, iconFile) => {

    return {isPerson, iconFile}
}

const main = () => {
    let players = [];

}


grid.init();