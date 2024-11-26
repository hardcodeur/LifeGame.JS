# LifeGame.js

```txt
 ##       ######   ######   ######    #####     ##     ##   ##  ######                ##    ####   
 ##         ##     ##       ##       ##        ####    ### ###  ##                    ##   ##      
 ##         ##     #####    #####    ##       ##  ##   #######  #####                 ##    ####   
 ##         ##     ##       ##       ## ###   ##  ##   ## # ##  ##                    ##       ##  
 ##         ##     ##       ##       ##  ##   ######   ##   ##  ##         ##     ##  ##       ##  
 ######   ######   ##       ######    #####   ##  ##   ##   ##  ######     ##      ####     ####   
```

![Game picture](./img/lifeGame.js_front.png)

## Rules

- The game takes place on a two-dimensional grid, where each cell can be either alive (represented by a color or a symbol) or dead (represented by a different color or symbol).
- Each cell has eight neighbors (horizontal, vertical, and diagonal).

The game evolves according to the following rules:

- A living cell with two or three living neighbors remains alive in the next step.
- A living cell with fewer than two living neighbors dies in the next step (due to underpopulation).
- A living cell with more than three living neighbors dies in the next step (due to overpopulation).
- A dead cell with exactly three living neighbors becomes alive in the next step (due to reproduction).

## Require

Node.js

## Quickstart

- Download the repository.
- Install dependencies: `npm install`.
- Open the `index.html` file in a browser.
- Play.

## Author

![Logo perso](./img/my_logo.svg)