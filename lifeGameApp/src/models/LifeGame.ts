type playground = Array<number>[];

export class LifeGame {

  

  private gridSize: number;
  public playground: playground;


  constructor(sizeGrid: number){
    this.gridSize = sizeGrid;
    this.playground = this.initPlayground()
  }

  get sizeGrid(): number{
    return this.gridSize        
  }

  initPlayground(): playground {
    const playground: playground = [];
    for (let x = 0; x < this.sizeGrid; x++) {
        const row: number[] = [];
        for (let y = 0; y < this.sizeGrid; y++) {
          row.push(0);
        }
        playground.push(row);
      }
      return playground;
    }
  
  resetPlayground(): void{
    this.playground = this.initPlayground();    
  }

  survey(x: number, y: number): number{

    const edgeEffect = (pos: number): number => {
      if (pos < 0) {
        return this.gridSize + pos;
      }
      if (pos >= this.gridSize) {
        return pos % this.gridSize;
      }
      return pos;
    };

    let pop = 0
    const around = [-1,0,1];

    around.forEach(ar_x => {
      around.forEach(ar_y => {

        if(ar_x === 0 && ar_y === 0){
          return;
        }

        const pos_x = edgeEffect(x+ar_x);
        const pos_y = edgeEffect(y+ar_y);
        const currentPos = this.playground[pos_x][pos_y];
        
        if(currentPos === 1){
          pop += 1;
        }
      });
    });

    return pop
  }

  lifeRules(x: number, y: number): number{
    /**
     * Rule 1 
     * Une cellule morte possédant exactement trois cellules voisines vivantes devient vivante (elle naît) ;
     * Rule 2 
     * Une cellule vivante possédant deux ou trois cellules voisines vivantes le reste, sinon elle meurt.
     **/

    const cellStatus = this.playground[x][y];
    const popAround = this.survey(x,y);

    if(cellStatus === 1){
      if (popAround >= 2 && popAround <= 3) {
        return 1
      }
    }
    if (cellStatus === 0) {
      if (popAround === 3) {
        return 1
      }
    }

    return 0
  }

  randomPosition(): number {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(this.gridSize);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
  
  spontaneousGeneration(birth_rate : number): void{
    let cell_alive = 0
    while (cell_alive < birth_rate ) {
      const rand_x = this.randomPosition();
      const rand_y = this.randomPosition();
      if(!this.playground[rand_x][rand_y]){
        this.playground[rand_x][rand_y] = 1
        cell_alive += 1;
      }
    }
    return;
  }

  nextGeneration(): void{
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        const new_cell_value = this.lifeRules(x,y)
        this.playground[x][y] = new_cell_value;
      }
    }
    return;
  }


  printPlayground(): void{
    for(let x = 0;x < this.sizeGrid;x++){
      let row = ""
      for (let y = 0; y < this.sizeGrid; y++) {
        if(this.playground[x][y]){
          row += "● "
        }else{
          row += "○ "
        }
      }
      console.log(row);
    }
    return;
  }

}
