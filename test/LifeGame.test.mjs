import { describe, it } from 'mocha';
import assert from 'assert';

import { LifeGame } from '../src/models/LifeGame';


describe('LifeGame.ts', () => {

    const valueTest = 10

    describe('basic test class init', () => {

        const grid = new LifeGame(valueTest);

        describe('#sizeGrid()', () => {
            it('Should return the size of grid', () => {    
                assert.strictEqual(grid.size_grid, valueTest);
            });
        });

        describe('#initPlayground()', () => {
            it('Should return a matrix withe the good number of cell ', () => {
                const grid = new LifeGame(valueTest);
                const playground = grid.playground;
                // x*column
                const matrixLenght = playground[0].length
                assert.strictEqual(matrixLenght,valueTest)
            });

            it('Should all cell has init whith value', () => {
                const grid = new LifeGame(valueTest);
                for(let x = 0; x < grid.size_grid; x++){
                    for(let y = 0; y < grid.size_grid;y++){
                        assert.strictEqual(grid.playground[x][y],0)
                    }
                }
            });
        });
    });

    describe('Life systeme', () => {

        const grid = new LifeGame(valueTest);
        
        describe('#lifeRules()', () => {
            describe('Rules 1 : live my soon', () => {
                it('Should retun 1 if the cell have 3 neighboor', () => {
                    grid.playground[0][0]=1;
                    grid.playground[0][1]=0;
                    grid.playground[0][2]=1;
                    grid.playground[1][1]=1;
                    assert.strictEqual(grid.life_rules(0,1),1);
                });
            });
            describe('Rules 2 : sorry but you stay dead', () => {
                it('Should retun 1 if the cell have 2 or 3 neighboor or return 0 for the orthe case', () => {
                    //Stay alive
                    grid.playground[0][0]=1;
                    grid.playground[0][1]=1;
                    grid.playground[0][2]=1;
                    grid.playground[1][1]=0;
                    assert.strictEqual(grid.life_rules(0,1),1);
                    //Underpopulate
                    grid.playground[0][0]=1;
                    grid.playground[0][1]=1;
                    grid.playground[0][2]=0;
                    grid.playground[1][1]=0;
                    assert.strictEqual(grid.life_rules(0,1),0);
                    //Overpopulate
                    grid.playground[0][0]=1;
                    grid.playground[0][1]=1;
                    grid.playground[0][2]=1;
                    grid.playground[1][1]=1;
                    grid.playground[1][0]=1;
                    grid.playground[1][2]=1;
                    assert.strictEqual(grid.life_rules(0,1),0);
                });
            });
        });
        
    });

    describe('Cell generation', () => {
        
        describe('#spontaneous_generation()', () => {
            
            const grid = new LifeGame(valueTest);

            it('Should return playground with cell alive for init the game', () => {
                const birth_rate = 25
                grid.spontaneousGeneration(birth_rate);
                let cell_alive = 0
                for(let x = 0; x < grid.size_grid; x++){
                    for(let y = 0; y < grid.size_grid;y++){
                        if(grid.playground[x][y] === 1){
                            cell_alive += 1;
                        }
                    }
                }
                assert.strictEqual(cell_alive,birth_rate)
            });
        });

        describe('#nextGeneration()', () => {

            const grid = new LifeGame(valueTest);

            it('Should generate a new position in playground', () => {
                grid.playground[1][1] = 1;
                grid.nextGeneration();
                let cellValue = grid.playground[1][1];
                assert.strictEqual(cellValue,0);
            });
        });
    });

});