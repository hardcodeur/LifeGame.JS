import { GameController } from './controllers/GameController';
import "./css/styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const gameController = new GameController("#game_ui", {
    playgroundSize: 100,
    initialCells: 600,
    maxIterations: 100
  });
});