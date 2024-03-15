import { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Pos } from '../../../app/models/sokoban';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const WALL = '#'
const FLOOR = '-'
const BOX = '$'
const TARGET = '.'
const BOX_TARGET = '*'
const PLAYER = '@'
const PLAYER_TARGET = '+'

export default observer(function SokobanGame() {
    const { sokobanStore } = useStore()
    const { currentLevel, currentLevelKey } = sokobanStore

    const [level, setLevel] = useState<string[]>([]);
    const [playerPos, setPlayerPos] = useState<Pos>({ row: -1, col: -1 });
    const [targets, setTargets] = useState<Pos[]>([])
    const [victory, setVictory] = useState<Boolean>(false)

    useEffect(() => {
        if (!currentLevel) return

        setLevel(currentLevel.levelState)
        setPlayerPos(findPlayerPos(currentLevel.levelState))
        setTargets(currentLevel.targets)
        setVictory(false)
    }, [currentLevelKey])

    function findPlayerPos(level: string[]) {
        for (let i = 0; i < level.length; i++) {
            const row = level[i];
            let col = row.indexOf(PLAYER);
            if (col !== -1) return { row: i, col };

            col = row.indexOf(PLAYER_TARGET);
            if (col !== -1) return { row: i, col };
        }
        return { row: -1, col: -1 }; // Player not found
    }

    function isTarget(pos: Pos): boolean {
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].row === pos.row && targets[i].col === pos.col) return true
        }
        return false
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        event.preventDefault();
        const { key } = event;
        if (victory && key !== 'r' && key !== 'R') return
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
        if (!currentLevel) return
        setLevel(currentLevel.levelState)
        setPlayerPos(findPlayerPos(currentLevel.levelState))
        setVictory(false)
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

    function moveBoxes(newPlayerPos: Pos, direction: string): string[] {
        const nextBoxPos = { ...newPlayerPos }
        while (getPositionChar(nextBoxPos, level) === BOX || getPositionChar(nextBoxPos, level) === BOX_TARGET) {
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

    function getPositionChar(pos: Pos, level: string[]): string {
        return level[pos.row][pos.col];
    }

    function isValidMove(pos: Pos, direction: string) {
        const { row, col } = pos;
        const nextCell = level[row][col];

        // Check if next cell is a wall
        if (nextCell === WALL) return false;

        // Check if next cell contains a box
        if (nextCell === BOX || nextCell === BOX_TARGET) {
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
        for (let i = 0; i < targets.length; i++) {
            if (getPositionChar(targets[i], level) !== BOX && getPositionChar(targets[i], level) !== BOX_TARGET) victory = false
        }

        if (victory) {
            setVictory(true)
            alert('Victory')
        }
    }

    function updateLevel(pos: Pos, newChar: string, level: string[]) {
        const newLevel = [...level];
        //make sure that a target space is not being emptied
        if (newChar === FLOOR) {
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].row === pos.row && targets[i].col === pos.col) {
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
        <Grid tabIndex={0} onKeyDown={handleKeyDown} className="sokoban" divided>
            {level.map((row, rowIndex) => (
                <Grid.Row key={rowIndex} >
                    {row.split('').map((cell, colIndex) => (
                        <Grid.Column width='1' key={colIndex + "c"} style={{
                            paddingTop: '10px', paddingBottom: '10px',
                            background: isTarget({ row: rowIndex, col: colIndex }) ? 'green' : 'grey',
                            fontSize: '3.75em', textAlign: 'center'
                        }}>
                            {cell === PLAYER && '😀'}
                            {cell === PLAYER_TARGET && '😀'}
                            {cell === BOX && '📦'}
                            {cell === BOX_TARGET && '📦'}
                            {cell === WALL && '🧱'}
                        </Grid.Column>
                    ))}
                </Grid.Row>
            ))}
        </Grid>
    )
})