import { LifeGame } from '../models/LifeGame';
import { GameInterface } from '../components/GameInterface';

interface GameOptions {
    playgroundSize?: number;
    initialCells?: number;
    maxIterations?: number;
}

type intervalId = ReturnType<typeof setInterval> | null

export class GameController {

    private intervalId: intervalId  = null;
    private gameUI : HTMLElement;
    private iterationCount = 0;
    private isRunning = false;
    private lifeGame: LifeGame;
    private gameInterface: GameInterface;
    private intervalTime: number;

    private playgroundSize: number;;
    private initialCells: number;
    private maxIterations: number;

    constructor(gameBox: string, options: GameOptions = {}) {
        this.playgroundSize = options.playgroundSize || 100;
        this.initialCells = options.initialCells || 800;
        this.maxIterations = options.maxIterations || 100;
        
        this.lifeGame = new LifeGame(this.playgroundSize);
        this.gameUI = document.querySelector(gameBox) as HTMLElement;
        this.gameInterface = new GameInterface(this.lifeGame, this.gameUI);
        this.intervalTime = 250;

        this.initialize();
    }

    private initialize(): void {
        console.log("Game start");
        this.gameInterface.initGameUi();
        this.gameState();
        this.setupEventListeners();
        return;
    }

    private setupEventListeners(): void {
        this.gameUI.addEventListener("click", (event) => {
          const target = event.target as HTMLElement;
          switch (target.id) {
            case "play":
              this.startLoop();
              break;
            case "stop":
              this.stopLoop();
              break;
            case "reset":
              this.resetLoop();
              break;
            default:
              return;
              
          }
        });
        return;
      }

    private gameState(): void{
      const gameStatus = this.gameUI.querySelector("#game_status") as HTMLElement;
      const iteration = this.gameUI.querySelector("#iteration") as HTMLElement;

      if (this.isRunning) {
        gameStatus.innerHTML="Play"
      }else{
        gameStatus.innerHTML="Stop"
      }

      iteration.innerHTML = this.iterationCount.toString();
      return;
    }

    private startLoop(): void {
        if (this.isRunning) return;
        this.intervalId = setInterval(() => {
          if (this.iterationCount === 0) {
            this.lifeGame.spontaneousGeneration(this.initialCells);
          }
          this.updateGame();
          this.iterationCount++;
          this.gameState();
    
          if (this.iterationCount >= this.maxIterations) {
            this.stopLoop();
          } 
        }, this.intervalTime);
        this.isRunning = true;
        return;
    }
    
    private stopLoop(): void {
        if (!this.isRunning) return;
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.isRunning = false;
        this.gameState()
        console.log("Simulation en pause");
        return;
    }
    
    private resetLoop(): void {
        this.stopLoop();
        this.iterationCount = 0;
        this.gameInterface.resetGame();
        this.gameState();
        console.log("Simulation réinitialisée");
        return;
    }
    
    private updateGame(): void {
        this.lifeGame.nextGeneration();
        this.gameInterface.colorCells();
        return;
    }


}