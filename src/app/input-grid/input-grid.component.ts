import { Component, OnInit, HostListener } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-input-grid',
    templateUrl: './input-grid.component.html',
    styleUrls: ['./input-grid.component.scss']
})
export class InputGridComponent implements OnInit {

    numRange = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    dataBoard: any[];
    stringBoard: any[];

    selectedI: number;
    selectedJ: number;

    selectedNum: number

    veryeasyGameArr = [
        [2, 0, 3, 0, 0, 8, 6, 0, 7],
        [1, 4, 0, 7, 2, 6, 0, 0, 9],
        [5, 0, 7, 1, 3, 9, 4, 2, 8],
        [0, 2, 5, 0, 8, 1, 9, 0, 4],
        [4, 1, 0, 9, 0, 3, 2, 0, 5],
        [0, 7, 9, 2, 0, 5, 0, 3, 6],
        [6, 0, 2, 0, 1, 0, 0, 9, 3],
        [7, 0, 0, 5, 0, 2, 0, 0, 1],
        [0, 8, 1, 3, 6, 7, 0, 4, 0]
    ];

    easyGameArr = [
        [0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 9, 0, 6, 3, 0, 0],
        [0, 6, 0, 4, 0, 2, 0, 9, 0],
        [1, 0, 0, 0, 9, 0, 4, 0, 0],
        [0, 0, 8, 1, 0, 3, 5, 0, 0],
        [0, 0, 5, 0, 7, 0, 0, 0, 3],
        [0, 5, 0, 3, 0, 1, 0, 6, 0],
        [0, 0, 4, 6, 0, 7, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 0]
    ];

    hardGameArr = [
        [0, 0, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 2, 4, 0, 6, 3, 0, 0],
        [0, 1, 7, 0, 0, 0, 9, 6, 0],
        [5, 8, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 9, 0, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 4, 2],
        [0, 9, 4, 0, 0, 0, 6, 5, 0],
        [0, 0, 5, 2, 0, 8, 1, 0, 0],
        [0, 0, 0, 5, 0, 0, 0, 0, 0]
    ];

    evilGameArr = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0]
    ];

    fromTheBook = [
        [4, 0, 5, 0, 0, 0, 9, 0, 0],
        [0, 8, 0, 1, 0, 7, 6, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3],
        [5, 0, 0, 0, 9, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 5, 0],
        [0, 0, 2, 5, 0, 0, 0, 8, 0],
        [3, 0, 7, 0, 0, 5, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 6, 8, 0, 0, 9, 0]
    ];

    constructor() { }

    ngOnInit(): void {
        this.stringBoard = this.createBlankBoard('');
        this.dataBoard = cloneDeep(this.fromTheBook);
        this.dataGridToStringGrid();
        this.selectedI = -1;
        this.selectedJ = -1;
    }

    @HostListener('body:keydown', ['$event'])
    onKeydown(event): void {
        if (this.selectedI > -1 && this.selectedJ > -1) {
            if (event.code.includes("Digit") && +event.key > 0 && +event.key <= 9) {
                this.dataBoard[this.selectedI][this.selectedJ] = +event.key;
                this.dataGridToStringGrid();
            }
            else if (event.key == "Backspace") {
                this.dataBoard[this.selectedI][this.selectedJ] = 0;
                this.dataGridToStringGrid();
            }
            else if (event.code.includes("Arrow")) {
                switch (event.code) {
                    case "ArrowUp":
                        if (this.selectedI - 1 >= 0 && this.selectedI - 1 < 9)
                            this.selectedI--;
                        break;
                    case "ArrowDown":
                        if (this.selectedI + 1 >= 0 && this.selectedI + 1 < 9)
                            this.selectedI++;
                        break;
                    case "ArrowLeft":
                        if (this.selectedJ - 1 >= 0 && this.selectedJ - 1 < 9)
                            this.selectedJ--;
                        break;
                    case "ArrowRight":
                        if (this.selectedJ + 1 >= 0 && this.selectedJ + 1 < 9)
                            this.selectedJ++;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    createBlankBoard(filler: any): any[] {
        let row = [];
        let board = [];
        for (let i of this.numRange) {
            row.push(filler);
        }
        for (let i of this.numRange) {
            board.push(cloneDeep(row));
        }

        return board;
    }

    onClick(i: number, j: number): void {
        this.selectedI = i;
        this.selectedJ = j;
    }

    onSelect(num: number){
        if(this.selectedI >= 0 && this.selectedI < 9 && this.selectedJ >= 0 && this.selectedJ < 9){
            if(num > 0 && num <= 9){
                this.dataBoard[this.selectedI][this.selectedJ] = num;
            }
        }
        this.dataGridToStringGrid();
    }

    onRemove(){
        if(this.selectedI >= 0 && this.selectedI < 9 && this.selectedJ >= 0 && this.selectedJ < 9){
            this.dataBoard[this.selectedI][this.selectedJ] = 0;
        }
        this.dataGridToStringGrid();
    }

    dataGridToStringGrid(): void {
        for (let i of this.numRange) {
            for (let j of this.numRange) {
                this.stringBoard[i][j] = this.dataCellToString(i, j);
            }
        }
    }

    dataCellToString(i: number, j: number): string {
        if (this.dataBoard[i][j] > 0 && this.dataBoard[i][j] <= 9)
            return (this.dataBoard[i][j]).toString();
        else
            return ''
    }

    onClear(): void {
        for (let i of this.numRange) {
            for (let j of this.numRange) {
                this.dataBoard[i][j] = 0;
            }
        }
        this.dataGridToStringGrid();
    }

    onSolve(): void {
        this.dataBoard = this.solve(this.dataBoard);

        if (!this.dataBoard) {
            alert("FAILED");
        }
        else {
            this.dataGridToStringGrid();
            alert("SUCCESS");
        }
    }

    onCheck(): void {
        
        let msg = "";
        this.is_possible(this.dataBoard) ? msg +="POSSIBLE " : msg += "IMPOSSIBLE ";
        this.is_legal(this.dataBoard) ? msg += "LEGAL" : msg += "ILLEGAL";
        alert(msg);
    }

    onGenerate(): void {
        for (let i of this.numRange) {
            for (let j of this.numRange) {
                this.dataBoard[i][j] = 0;
            }
        }
        this.dataBoard = this.seed_random(this.dataBoard, 20);
        this.dataGridToStringGrid();
    }

    square_coordinates = [
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [7, 7, 7, 8, 8, 8, 9, 9, 9],
        [7, 7, 7, 8, 8, 8, 9, 9, 9],
        [7, 7, 7, 8, 8, 8, 9, 9, 9]
    ]

    get_row(board, row) {
        return board[row];
    }

    get_column(board, column) {
        let col = [];
        for (let row = 0; row < 9; row++) {
            col.push(board[row][column]);
        }
        return col;
    }

    get_square(board, square) {
        let cells = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (square == this.square_coordinates[r][c]) {
                    cells.push(board[r][c]);
                }
            }
        }
        return cells;
    }

    complete_cell(board, r, c) {
        let used = [...this.get_row(board, r), ...this.get_column(board, c), ...this.get_square(board, this.square_coordinates[r][c])]
        let possibilities = []
        for (let p = 1; p <= 9; p++) {
            if (!used.includes(p)) {
                possibilities.push(p)
            }
        }
        if (possibilities.length == 1) {
            board[r][c] = possibilities[0]
            return true
        } else {
            board[r][c] = possibilities
            return false
        }
    }

    is_possible(orig_board) {
        let board = JSON.parse(JSON.stringify(orig_board));

        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                this.complete_cell(board, r, c);
                if(board[r][c].length === 0){
                    return false;
                }
            }
        }
        return true;
    }

    seed_random(orig_board, numSeededPositions){
        let board = JSON.parse(JSON.stringify(orig_board));
        let count = 0;

        while(count < numSeededPositions){
            let randRow = Math.floor(Math.random() * 9);
            let randCol = Math.floor(Math.random() * 9);
            if(board[randRow][randCol] === 0){
                board[randRow][randCol] = Math.floor(Math.random() * 9) + 1;
                if(this.is_legal(board) && this.is_possible(board)){
                    count++;
                }
                else{
                    board[randRow][randCol] = 0;
                }
            }
        }
        return board;
    }

    is_legal(orig_board) {
        let legal = true
        // Check all rows
        for (let r = 0; r < 9 && legal == true; r++) {
            let row  = this.get_row(orig_board, r);
            let trimmedRow = row.filter(cell => cell !== 0);
            if (new Set(trimmedRow).size !== trimmedRow.length) {
                legal = false;
            }
        }
        // Check all columns
        for (let c = 0; c < 9 && legal == true; c++) {
            let col  = this.get_column(orig_board, c);
            let trimmedCol = col.filter(cell => cell !== 0);
            if (new Set(trimmedCol).size !== trimmedCol.length) {
                legal = false;
            }
        }
        // Check all square sections
        for (let q = 1; q < 9 && legal == true; q++) {
            let square  = this.get_square(orig_board, q);
            let trimmedRow = square.filter(cell => cell !== 0);
            if (new Set(trimmedRow).size !== trimmedRow.length) {
                legal = false;
            }
        }
        return legal
    }

    appears_once_only(board, possibilities, segment, r, c) {
        let updated = false
        for (let i = 0; i < possibilities.length; i++) {
            let possibility = possibilities[i]
            let counter = 0
            segment.forEach(cell => {
                if (Array.isArray(cell)) {
                    if (cell.includes(possibility)) {
                        counter++
                    }
                } else {
                    if (cell == possibility) {
                        counter++
                    }
                }
            })
            if (counter == 1) {
                board[r][c] = possibility
                updated = true
                break
            }
        }
        return updated
    }

    compare(expected, actual) {
        let array1 = expected.slice()
        let array2 = actual.slice()
        return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
    }

    is_solved(board) {
        let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let valid = true
        // Check all rows
        for (let r = 0; r < 9 && valid == true; r++) {
            if (!this.compare(expected, this.get_row(board, r))) {
                valid = false
            }
        }
        // Check all columns
        for (let c = 0; c < 9 && valid == true; c++) {
            if (!this.compare(expected, this.get_column(board, c))) {
                valid = false
            }
        }
        // Check all square sections
        for (let q = 1; q < 9 && valid == true; q++) {
            if (!this.compare(expected, this.get_square(board, q))) {
                valid = false
            }
        }
        return valid
    }

    backtrack_based(orig_board) {

        let board = JSON.parse(JSON.stringify(orig_board));

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] == 0) {
                    this.complete_cell(board, r, c)
                    if (this.is_solved(board)) return board;
                    let cell = board[r][c]
                    if (Array.isArray(cell)) {
                        for (let i = 0; i < cell.length; i++) {
                            let board_2 = JSON.parse(JSON.stringify(board));
                            board_2[r][c] = cell[i]
                            let completed_board = this.backtrack_based(board_2)
                            if (completed_board) {
                                return completed_board;
                            }
                        }
                        return false
                    }
                }
            }
        }
        return false;
    }

    one_value_cell_constraint(board) {

        let updated = false

        // Convert every gap into an array of possibilities
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] == 0) {
                    updated = this.complete_cell(board, r, c) || updated
                }
            }
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (Array.isArray(board[r][c])) {
                    let possibilities = board[r][c]
                    updated = this.appears_once_only(board, possibilities, this.get_row(board, r), r, c) ||
                        this.appears_once_only(board, possibilities, this.get_column(board, c), r, c) ||
                        this.appears_once_only(board, possibilities, this.get_square(board, this.square_coordinates[r][c]), r, c) || updated
                }
            }
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (Array.isArray(board[r][c])) {
                    board[r][c] = 0
                }
            }
        }

        return updated
    }

    solve(board) {

        let updated = true, solved = false;

        while (updated && !solved) {
            updated = this.one_value_cell_constraint(board);
            solved = this.is_solved(board);
        }

        if (!solved) {
            board = this.backtrack_based(board)
            solved = this.is_solved(board);
        }

        return board
    }
}
