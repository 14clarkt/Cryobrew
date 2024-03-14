import { makeAutoObservable } from "mobx"
import { SokobanLevel } from "../models/sokoban"
import { DropdownItemProps } from "semantic-ui-react"

const FLOOR = '.'
const BOX = 'B'
const TARGET = 'T'
const PLAYER = 'P'

export default class SokobanStore {
    levelRegistry = new Map<string, SokobanLevel>()
    levelOptions: DropdownItemProps[] = []
    
    currentLevelKey = '-1'

    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    get currentLevel(): SokobanLevel | undefined {
        return this.levelRegistry.get(this.currentLevelKey)
    }

    loadLevels = async () => {
        this.setLoadingInitial(true)
        try {
            const seedLevels = this.seedLevels()
            for (let i = 0; i < seedLevels.length; i++) {
                const level = this.initializeLevel(seedLevels[i]);
                this.setLevel(level)
            }
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    setCurrentLevel = (value: string) => {
        this.currentLevelKey = value
    }

    private initializeLevel = (level: SokobanLevel): SokobanLevel => {
        //initialize the level state
        level.levelState = level.initialLevel.split('/')

        //set targets
        for (let i = 0; i < level.levelState.length; i++) {
            const row = level.levelState[i];
            for (let j = 0; j < row.length; j++) {
                if (level.levelState[i][j] === TARGET) level.targets.push({ row: i, col: j })
            }
        }

        //set the dropdown Option
        this.levelOptions.push({
            key: '' + level.key,
            value: '' + level.key,
            text: level.title ? level.title : "Level " + level.key
        })

        return level
    }

    private setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    private setLevel = (level: SokobanLevel) => {
        this.levelRegistry.set(level.key, level)
    }

    private seedLevels = (): SokobanLevel[] => {
        let levels = [
            {
                key: '-1',
                initialLevel: '#######/#.....#/#.BT..#/#P.BB.#/#.....#/#...BT#/#######',
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                initialLevel: '#######/#..T..#/#.BT..#/#P.BB.#/#.....#/#.T.BT#/#######',
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                initialLevel: '#######/#.BBB.#/#.BT..#/#P.BB.#/#.....#/#.T.BT#/#######',
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                initialLevel: '#######/#BBBBB#/#.BT..#/#P.BB.#/#.....#/#.T.BT#/#######',
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                title: 'One',
                initialLevel: this.reformatLevel(
                    '-#####/##---#/#----##/#--#--#/#-$#-.###/#--#*.--#/#-$-$.--#/#--#$.###/####-.#/--##$.#/--#-$*#/--#--@#/--#####'
                ),
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                title: 'Two',
                initialLevel: this.reformatLevel(
                    '-#####/-#---######/-#-#**----#/-#-.--*-#-#/-#-$--*-#-#/-####*-#--#/###-*--#-##/#--*@#-#-#/#--****--#/##---#-###/-#-----#/-#######'
                ),
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                title: 'Three',
                initialLevel: this.reformatLevel(
                    '--####/--#--#/-##--###/##-**--#/#-*--*-#/#@$-#.-#/#-#$.--#/#-$-#.-#/#-*--*-#/###**--#/--#--###/--#--#/--####'
                ),
                levelState: [],
                targets: []
            },
            {
                key: '-1',
                title: 'Five',
                initialLevel: this.reformatLevel(
                    '-####/##--###/#-----###/#-#***.-#/#--*--#-#/#--*----#/#--***####/####--*--#/-#-*--*--#/-#-$**---#/-#---@#--#/-#########'
                ),
                levelState: [],
                targets: []
            },
        ]

        for (let i = 0; i < levels.length; i++) {
            levels[i].key = (i + 1).toString();
        }

        return levels
    }

    private reformatLevel = (levelString: string): string => {
        return levelString
            .replace('.', TARGET)
            .replace('@', PLAYER)
            .replace('$', BOX)
            .replace('-', FLOOR)
    }
}