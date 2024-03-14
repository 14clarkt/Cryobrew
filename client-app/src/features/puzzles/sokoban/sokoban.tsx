import { useState } from 'react';
import { Grid } from 'semantic-ui-react';

const WALL = '#'
const FLOOR = '.'
const BOX = 'B'
const TARGET = 'T'
const PLAYER = 'P'

const initialLevel = [
    '#######',
    '#.....#',
    '#.BT..#',
    '#P.BB.#',
    '#.....#',
    '#...BT#',
    '#######'
]

interface Pos {
    row: number,
    col: number
}

export default function Sokoban () {
    const [level, setLevel] = useState(initialLevel);
    const [playerPos, setPlayerPos] = useState(findPlayerPos(initialLevel));
    const [targets] = useState<Pos[]>(findTargets(initialLevel))

    function findPlayerPos(level: string[]) {
        for (let i = 0; i < level.length; i++) {
            const row = level[i];
            const col = row.indexOf(PLAYER);
            if (col !== -1) return { row: i, col };
        }
        return { row: -1, col: -1 }; // Player not found
    }

    // Sets the Target locations for reference when they are covered by other objects.
    function findTargets(level: string[]) {
        const targets : Pos[] = []
        for (let i = 0; i < level.length; i++) {
            const row = level[i];
            for (let j = 0; j < row.length; j++) {
                if(level[i][j] === TARGET) targets.push({row: i, col: j})
            }
        }
        return targets
    }

    function isTarget(pos: Pos) : boolean {
        for(let i = 0; i < targets.length; i++) {
            if(targets[i].row === pos.row && targets[i].col === pos.col) return true
        }
        return false
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        event.preventDefault();
        const { key } = event;
        let newPlayerPos = { ...playerPos };

        switch (key) {
            case 'ArrowUp':
                newPlayerPos.row--
                break;
            case 'ArrowDown':
                newPlayerPos.row++
                break;
            case 'ArrowLeft':
                newPlayerPos.col--
                break;
            case 'ArrowRight':
                newPlayerPos.col++
                break;
            case 'r' || 'R':
                reset()
                return
            default:
                return;
        }

        makeMove(newPlayerPos, key)
    }

    function reset() {
        setLevel(initialLevel)
        setPlayerPos(findPlayerPos(initialLevel))
    }

    function makeMove(newPlayerPos: Pos, direction: string) {
        if (!isValidMove(newPlayerPos, direction)) return

        let newLevel = moveBoxes(newPlayerPos, direction);

        newLevel = updateLevel(playerPos, FLOOR, newLevel);
        newLevel = updateLevel(newPlayerPos, PLAYER, newLevel);

        setPlayerPos(newPlayerPos);
        setLevel(newLevel);

        checkVictory(newLevel)
    }

    function moveBoxes(newPlayerPos: Pos, direction: string) : string[] {
        const nextBoxPos = { ...newPlayerPos }
        while (getPositionChar(nextBoxPos, level) === BOX) {
            switch (direction) {
                case 'ArrowUp':
                    nextBoxPos.row--
                    break
                case 'ArrowDown':
                    nextBoxPos.row++
                    break
                case 'ArrowLeft':
                    nextBoxPos.col--
                    break
                case 'ArrowRight':
                    nextBoxPos.col++
                    break
            }
        }

        let newLevel = updateLevel(nextBoxPos, BOX, level)
        newLevel = updateLevel(newPlayerPos, FLOOR, newLevel)
        return newLevel
    }

    function getPositionChar(pos: Pos, level: string[]) : string {
        return level[pos.row][pos.col];
    }

    function isValidMove(pos: Pos, direction: string) {
        const { row, col } = pos;
        const nextCell = level[row][col];

        // Check if next cell is a wall
        if (nextCell === WALL) return false;

        // Check if next cell contains a box
        if (nextCell === BOX) {
            // Calculate position of the box after player's move
            const nextBoxPos = { row, col };
            switch (direction) {
                case 'ArrowUp':
                    nextBoxPos.row--;
                    break;
                case 'ArrowDown':
                    nextBoxPos.row++;
                    break;
                case 'ArrowLeft':
                    nextBoxPos.col--;
                    break;
                case 'ArrowRight':
                    nextBoxPos.col++;
                    break;
                default:
                    return;
            }
            
            // Check if box can be pushed
            if (isValidMove(nextBoxPos, direction)) return true;
            return false;
        }
        return true; // Valid move
    }
    
    function checkVictory(level: string[]) {
        let victory = true
        for(let i = 0; i < targets.length; i++) {
            if (getPositionChar(targets[i], level) !== BOX) victory = false
        }
        
        if (victory) alert('Victory')
    }

    function updateLevel(pos: Pos, newChar: string, level: string[]) {
        const newLevel = [...level];
        //make sure that a target space is not being emptied
        if(newChar === FLOOR) {
            for(let i = 0; i < targets.length; i++) {
                if(targets[i].row === pos.row && targets[i].col === pos.col) {
                    newLevel[pos.row] = replaceChar(newLevel[pos.row], pos.col, TARGET);
                    return newLevel
                }
            }
        }
        //if not, update as normal
        newLevel[pos.row] = replaceChar(newLevel[pos.row], pos.col, newChar);
        return newLevel
    }

    function replaceChar(str: string, index: number, char: string) {
        return str.substring(0, index) + char + str.substring(index + 1);
    }

    return (
        <div tabIndex={0} style={{ position: "fixed" }} onKeyDown={handleKeyDown}>
            <Grid className="sokoban" divided>
                {level.map((row, rowIndex) => (
                    <Grid.Row key={rowIndex} >
                        {row.split('').map((cell, colIndex) => (
                            <Grid.Column width='1' key={colIndex + "c"} style={{
                                    paddingTop: '10px', paddingBottom: '10px',
                                    background: isTarget({row: rowIndex, col: colIndex}) ? 'green' : 'grey',
                                    fontSize: '3.75em', textAlign: 'center'}}>
                                {cell === PLAYER && '😀'}
                                {cell === BOX && '📦'}
                                {cell === TARGET && '🎯'}
                                {cell === WALL && '🧱'}
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                ))}
            </Grid>
        </div>
    );
};