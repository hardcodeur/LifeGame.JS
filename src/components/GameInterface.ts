import { LifeGame } from '../models/LifeGame';

type gridCell = HTMLElement[][];

export class GameInterface {

    private cells: gridCell = [];
    private gameBoxe: HTMLElement
    private lifeGame: LifeGame; 

    constructor(lifeGame: LifeGame,canevas: HTMLElement) {
        this.lifeGame=lifeGame;
        this.gameBoxe=canevas;
    }

    get canevas() : HTMLElement {
      return this.gameBoxe;
    }

    initGameUi(): void{
        
      const cardBoxe = document.createElement("div");
      cardBoxe.classList.add("flex", "flex-col","items-center","my-2");

      const card = document.createElement("div");
      card.classList.add("p-6", "bg-transparent","border","border-gray-white","rounded-lg")

      const header = this.gameState();
      card.append(header);

      const playground = this.gamePlayground();
      card.append(playground);

      const control = this.gameControls();
      card.append(control);

      cardBoxe.append(card);
      this.gameBoxe.append(cardBoxe);
      return;
    }



    private gameState(): HTMLElement{

      const elt = document.createElement("div");
      elt.classList.add("flex", "justify-between","mb-3")
            
      const gameStatus=`
        <span class="flex items-center text-sm font-medium text-gray-white  me-3">
          <span class="flex w-2.5 h-2.5 bg-gray-white rounded-full me-1.5 flex-shrink-0"></span>
          Game status : <span id="game_status" class="text-green-neon ml-1"></span>
        </span>`;
      
      const iteration=`
        <span class="flex items-center text-sm font-medium text-gray-white">
          <span class="flex w-2.5 h-2.5 bg-gray-white rounded-full me-1.5 flex-shrink-0"></span>
          Iteration : <span id="iteration" class="text-green-neon ml-1 mr-1"></span>/ 100
        </span>`;

      elt.insertAdjacentHTML('beforeend',gameStatus)
      elt.insertAdjacentHTML('beforeend',iteration)
      return elt;
    }

    private gamePlayground(): HTMLElement{
      const playground = document.createElement("div");
      playground.id="playground";
      playground.classList.add("grid-container");

      const playgroundSize = this.lifeGame.sizeGrid;
      for (let x = 0; x < playgroundSize; x++) {
        this.cells[x] = [];
        for (let y = 0; y < playgroundSize; y++) {
          let cell = document.createElement("div");
          cell.dataset.x = `${x}`;
          cell.dataset.y = `${y}`;
          cell.classList.add("bg-gray-anthracite")
          this.cells[x][y] = cell;
          playground.append(cell);
        }
      }
      
      return playground;
    }

    private gameControls(): HTMLElement{
      const controls = document.createElement("div");
      controls.id="ui_control";
      controls.classList.add("mt-3");

      const btnPlay = `
      <button class="inline-flex items-center bg-gray-black text-green-neon hover:bg-gray-black  hover:text-green-neon py-2 pr-4 rounded" id="play">
        Play
      </button>`;

      const btnStop=`
      <button class="inline-flex items-center  bg-gray-black text-gray-white hover:bg-gray-black hover:text-green-neon py-2 px-4 rounded" id="stop">
        Stop
      </button>`;

      const btnReset=`
      <button class="inline-flex items-center bg-gray-black text-gray-white hover:bg-gray-black hover:text-green-neon py-2 px-4 rounded" id="reset">
        Reset
      </button>`;

      controls.insertAdjacentHTML('beforeend',btnPlay);
      controls.insertAdjacentHTML('beforeend',btnStop);
      controls.insertAdjacentHTML('beforeend',btnReset);

      return controls
    }

    resetGame(): void{
      this.gameBoxe.innerHTML="";
      this.lifeGame.resetPlayground();
      this.initGameUi();
      this.colorCells();
      return;
    }
      
    colorCells(): void{
      const playgroundSize = this.lifeGame.sizeGrid;
      const playground = this.lifeGame.playground;
        for (let x = 0; x < playgroundSize; x++) {
          for (let y = 0; y < playgroundSize; y++) {
            const cell = this.cells[x][y];
            cell.classList.toggle('bg-green-neon', playground[x][y] === 1);
            cell.classList.toggle('bg-gray-anthracite', playground[x][y] === 0);
          }
        }
        return;
    }
}