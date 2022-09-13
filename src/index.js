import './styles/styles.scss';
import gameLoop from './modules/gameloop';
import { boardController, buildBoards } from './modules/dom';

buildBoards();
const currentGameloop = gameLoop();
boardController(currentGameloop);
