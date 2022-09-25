import './styles/styles.scss';
import gameLoop from './modules/gameloop';
import { boardController, buildBoards, startGameModal } from './modules/dom';

buildBoards();
startGameModal();
const currentGameloop = gameLoop();
boardController(currentGameloop);
