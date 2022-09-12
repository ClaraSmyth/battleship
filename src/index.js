import './styles/styles.scss';
import gameLoop from './modules/gameloop';

const boardOne = document.querySelector('.board-one');
const boardTwo = document.querySelector('.board-two');

for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    boardOne.append(div);
    boardTwo.append(div2);
}

gameLoop();
