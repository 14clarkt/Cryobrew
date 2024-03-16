import { makeAutoObservable } from "mobx"
import { SokobanLevel } from "../models/sokoban"
import { DropdownItemProps } from "semantic-ui-react"

// const FLOOR = '-'
// const BOX = '$'
const TARGET = '.'
const BOX_TARGET = '*'
// const PLAYER = '@'
const PLAYER_TARGET = '+'

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
            const seedLevels = this.populateLevels()
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
                if (level.levelState[i][j] === BOX_TARGET) level.targets.push({ row: i, col: j })
                if (level.levelState[i][j] === PLAYER_TARGET) level.targets.push({ row: i, col: j })
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

    private populateLevels = (): SokobanLevel[] => {
        let levels = [
            ...this.formatLevelString(this.unformattedTutorialLevelsString),
            ...this.formatLevelString(this.unformattedLevelsString),
        ]

        for (let i = 0; i < levels.length; i++) {
            levels[i].key = (i + 1).toString();
        }

        return levels
    }

    private formatLevelString = (unformattedLevelsString: string) : SokobanLevel[] => {
        const formattedData = []
        const lines = unformattedLevelsString.split('\n');
        
        let currentLevel: string = ""
        let tooLong = false
        let comment = false
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()

            //level lines conclude with the 'Title'
            if (line.startsWith('Title')) {
                if (currentLevel.length > 0 && !tooLong) {
                    let level: SokobanLevel = {
                        title: line.substring(7),
                        key: '-1',
                        initialLevel: currentLevel,
                        levelState: [],
                        targets: []
                    }
                    formattedData.push(level)
                    currentLevel = ""
                }
                if (tooLong) {
                    currentLevel = ""
                    tooLong = false
                }
            }

            // Begins the section of text that is useless for mapping purposes
            if (line.startsWith('Title')) comment = true

            // If its a level line, add it to the currentLevel
            if (line.length > 0 && !comment) {
                if (line.length > 16) tooLong = true //only 16 columns right now
                if (currentLevel.length > 0) currentLevel += '/'
                currentLevel += line
            }

            // Ends the section of text that is useless for mapping purposes
            if (line.startsWith('Date')) comment = false
        }
        return formattedData
    }

    private unformattedTutorialLevelsString =
    `#####
    #@$.#
    #####
    Title: 1. Literally Can't Lose
    Previously published: DL3
    Date: 2024-03-15

    #####
    #.#.#
    #-$$#
    #-@-#
    #####
    Title: 2. Scary Boxes
    Previously published: DL3
    Date: 2024-03-15
    
    ###
    #.##
    #--##
    #---#
    #---#
    ##$-#
    #-@-#
    #####
    Title: 3. Corners Bad
    Previously published: DL3
    Date: 2024-03-15
    
    ####
    #--##
    #---#
    #---#
    #.$##
    #.$#
    #@-#
    ####
    Title: 4. Wallslide
    Previously published: DL3
    Date: 2024-03-15
    
    --####
    ###--#
    #---$##
    #---*+#
    ######
    Title: 5. Replace
    Previously published: DL3
    Date: 2024-03-15`
    
    private unformattedLevelsString = `###########
    #---------#
    #-$-$@$-$-#
    #--$-$-$--#
    #-$-$-$-$-#
    #--$-$-$--#
    #####$##$##
    -#.....#-#
    -#....*#-#
    -#...*---#
    -#....-###
    -########
    Title: 001 Abedlike
    Comment: Tribute to Howard Abed who made a lot of levels with this basic design. Looking through my old designs this seems to be my first original attempt at making a Sokoban puzzle.
    Previously published: Accumulated1
    Date: 2013-07-31
    
    -------######
    -####--#----#
    -#-@####-##-##
    ##-$#--#...--#
    #--$-$-#.#.#-#
    #-$-$--$...#-#
    ##-$--$-##-#-#
    -##-###----#-#
    --#---######-#
    --###--------#
    ----##########
    Title: 002 Forgotten One
    Previously published: Accumulated1
    Date: 2014-08-23
    
    ---###
    ---#.#
    ---#.#
    ####.##
    #--#.@##
    #--#.--##
    #--#.$$-#
        #-$-#$--#
        #---#-$.#
        ##-$--$-#
        -#----###
        -######
        Title: 003 My First Autogenerated Level
        Comment: Generated 50 levels. Kept one and edited a little. Not too bad.
        Previously published: Sokoban.dk(Lines), Accumulated1
        Date: 2014-10-04
        
        #########################
        #--.**.-*...$.***-..*.$-#
        #-.$-$-.$---*-$--*$-$-*-#
        #.$$-$*-*--.$.$-.-*-$-$.#
        #.$---*-*--.$.$-.-*-$-$.#
        #.$---*-*--.$.$-.-*-$-$.#
        #.$$$$*-*--.$.$-.-*-$-$.#
        #-*---$.$$--*-$--*$-$-+-#
        #-$...*-.***-.***-..*.$-#
        #########################
        Title: 004 Audi
        Comment: Looks depends on the skin.
        Previously published: SokobanOnline.com, Sokoban.dk, Accumulated1
        Date: 2014-11-08
        
        ##############################
        #--------#-----#--###--#-----#
        #--$--$-$---$--#$-##-$-$$-$--#
        #-$$######$-#-$---#----#--#$-#
        #--------#--#--#-$----##--#--#
        #--$-$-$-#$-#$-#$-#$$-##-$#$-#
        #######$-#--#-----#----#--#--#
        #--$---$-#$-$--#$-##-$-$$$$--#
        #--#-----#-----#--###--#-----#
        #-.########################$##
        #.........-----##-----#--##--#
        #........#-$$-$-#--$$-$$--#$-#
        #........#--##-$---#--#--$#--#
        #........#-$$---#-$#$-#$-$---#
        #........#-$----#$--$-#--$$--#
        #........#-$##-$----$-#--#-$-#
        #........#--$-$-#$-#--$--#---#
        #........#----@##--#--#--##--#
        ##############################
        Title: 005 Sokoban Aenigma
        Author: Brian Kent + Tyge Fogh
        Comment: Aenigma 42. Not a sharpened level, but a heavily influenced remake with several structural changes with influence on gameplay. Added 60 boxes.
        Previously published: Sokoban.dk, Accumulated1
        Date: 2014-11-09
        
        ####################
        #------------------#
        #-**$***$$***$$***-#
        #-*.-*..$-.*.-$..*-#
        #-*.-*..$-.*.-$..*-#
        #-**$***$$***$$***-#
        #----------------@-#
        ####################
        Title: 006 Not difficult. Just The Right Order
        Comment: A visual modification a year later
        Previously published: Accumulated1
        Date: 2014-11-09
        
        ---------####
        ##########--#
        #-----------#
        #-$$-$-$-$$-#
        #--#######--#
        #-$#...*.#$-#
        #--#...*.#--#
        #-$#..@$-##-#
        #--#...*.---#
        #-$#...*.#$##
        #--#######--#
        #-$$-$-$-$$-#
        #-----------#
        #############
        Title: 007 Back and Forth
        Comment: Avoiding something I had to do. 
        Previously published: SokobanOnline, Accumulated1
        Date: 2015-02-21
        
        ###########
        #----#----#
        #-.*-$-*.-#
        #-$**#**$-#
        #----+----#
        ###########
        Title: 008 Gil1
        Comment: Tried to make a level for Gil Dogans level design contest
        Previously published: Accumulated1
        Date: 2015-03-28
        
        --#####
        --#---##
        ###-#--#
        #--*-#-#
        #-*-*--#
        ##@*---#
        -#--####
        -####
        Title: 009 2x2 Cyclic
        Comment: Another level for Gil Dogans competition. I love the design and the puzzle actually took first place for a few days.
        Previously published: SokobanOnline, Accumulated1
        Date: 2015-03-28
        
        --#####
        --#---##
        ###-#--##
        #--*-#--#
        #-*-*-#-#
        #*-*-*--#
        #@*-*---#
        #--*--###
        #---###
        #####
        Title: 010 3x3 Cyclic
        Comment: Another level for Gil Dogans Sokoban contest. Here the beautifyll version. The actual level for the contest was heavily uglifyed by making til passagevay top right longer.
        Previously published: Accumulated1
        Date: 2015-03-29
        
        --#######
        --#-----#
        -##-###-##
        ##-*-@-*-##
        #-*-***-*-#
        #--*---*--#
        #---###---#
        ###-----###
        --#######
        Title: 011 Back To Start 2
        Comment: For Gil Dogans Sokoban competition. Nice, isn't it? But low scoring.
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-04-04
        
        -----#####
        -#####---#
        ##...$---###
        #-+**##$---#
        #-..*-#-$#-#
        ##$##------#
        -#--#-$#####
        -#--$--#
        -#-----#
        -#######
        Title: 012 Upper Left Corner, Please
        Comment: Start with pushing one block to the upper left corner...
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-04-20
        
        -#######
        -#--@--#
        -#--$--#
        ##-$.$-##
        #-$.$.$-#
        #$.$.$.$#
        #.$.$.$.#
        #-.$.$.-#
        ##-.$.-##
        -#--.--#
        -#-----#
        -#######
        Title: 013 80 Is An Okay Score
        Comment: First title was "100 Is An Okay Score" but that was too easy so changed the title.
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-04-24
        
        ---###
        -###@###
        -#--$--#
        ##-$.$-##
        #-$.$.$-#
        #$.$.$.$#
        #.$.$.$.#
        #-.$.$.-#
        ##-.$.-##
        -#--.--#
        -###-###
        ---###
        Title: 014 Tighter
        Comment: Realised how easy the previous puzzle was.
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-04-25
        
        -----#####
        -----#---##
        ----##-$@-#
        ---##-$*$-#
        --##...$--#
        ###-.*.-###
        #--$*..##
        #-$.$-##
        #--$-##
        #----#
        ######
        Title: 015 More Malicious
        Author: Malice+Tyge Fogh
        Comment: Thought Malicious #14 was a nice design but a little easy. This one is a little less easy, but not much.
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-04-28
        
        --#####
        --#---##
        ###-*--##
        #--$*$--#
        #@*...*-#
        #--$*$--#
        ###-.-###
        --#---#
        --#####
        Title: 016 Lazy Saturday
        Previously published: SokobanOnline.com, Sokoban.dk, Accumulated1
        Date: 2015-05-16
        
        ---#####
        ---#---##
        -###-#--##
        ##--*-#--##
        #--*-*-#--#
        #-*-*-*-#-#
        #*-*-*-*--#
        #-*-*-*---#
        #-@*-*--###
        #---*-###
        ##---##
        -#####
        Title: 017 Back To Start 3
        Comment: I promise I will not make any bigger levels with this design. At least you will have to look in the collections Sharpen for bigger levels.
        Previously published: SokobanOnline.com
        Date: 2015-05-16
        
        ------#########
        ------##@##---#
        ------#-*-----#
        ---####---##-#####
        ---#--#-###--#---#
        ---#------#------#
        ####--#---#--##-#####
        #--##-########--#---#
        #------#-----#------#
        #--#---#-----#--##-##
        ##-#####-----#####-##
        ##-##--#-----#---#--#
        #------#-----#------#
        #---#--########-##--#
        #####-##--#---#--####
        ---#------#------#
        ---#---#--##-##--#
        ---#####-###--####
        ------#-------#
        ------#---##--#
        ------#########
        Title: 018 No challenge. Just waste of time
        Comment: Nice design but wrong size for Gil Dogans Sokoban contest.
        Previously published: SokobanOnline.com, Accumulated1
        Date: 2015-05-23
        
        ----####
        ---##--#
        ---#@*-#
        ---#-*-#
        ---#-*-#
        ---#-*-#
        ---#-*-#
        ####-*-#
        #---#*-#
        #----*-#
        ###-#--#
        -#--##-##
        -#------#
        -#--#---#
        -########
        Title: 019 Eight In A Row
        Comment: Made for Gil Dogans Sokoban Contest. A mediocre score.
        Previously published: SokobanOnline.com, Sokoban.dk(Lines), Accumulated1
        Date: 2015-06-19
        
        ------####
        ------#--#
        ------#--######
        ------#-$-----#
        ----###$#---$-#
        ----#...-###-####
        ---##.*..-#-$$--#
        ---#..##..#-----#
        ---#.*...*$$-$$##
        ---#-**#.-#-$@-#
        #####...-#-$-###
        #---####-$$--#
        #-$$$--$----##
        #----$--#--##
        #---########
        #####
        Title: 020 Not So Difficult Rev
        Comment: First version published at SokobanOnline. Discovered a ridicously easy solution. Removed a floor, added a wall, added a floor and moved the sokoban. Still no match for a trained player.
        Previously published: SokobanOnline.com., Accumulated1
        Date: 2015-06-30
        
        ######
        #----####
        #-$-.-$-#
        #-#$.$#-#
        #-..*..-#
        #-#$.$#-#
        #-$-+-$-#
        #####---#
        ----#####
        Title: 021 Summer 1
        Previously published: SokobanOnline.com, Sokoban.dk (Crosses), Accumulated1
        Date: 2015-07-02
        
        ###########
        #...------#
        #######-#-#
        #.------#-#
        #.$$$$#-#-#
        #.----$-#-#
        #$#######-#
        #@--------#
        ###########
        Title: 022 Timesaver
        Comment: Same basic design as level 59 from TIAOAs first collection. Saves you a lot of time.
        Previously published: Sokoban.dk, Accumulated1
        Date: 2015-07-04
        
        ---------####
        -#########--#
        ##--$-----.-##
        #--$-$-#-***-#
        #@$-$-$#..*..#
        ##-$-$-#-...-#
        -#--$--##-.--#
        -##--#########
        --####
        Title: 023 Summer 2
        Comment: Variation from SokobanOnline.com. Made the right side a bit more interesting.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-07-03
        
        -----#####
        -----#---#
        --####-#-##
        --#----*--##
        ###-#-*.*--#
        #---#.$#-*-#
        #---*-*-*-*#
        ######-$-#-#
        -----#-@---#
        -----#######
        Title: 024 Pyramid
        Comment: Rotated the puzzle 90 deg. clockwise for my collection "Go Right"
        Previously published: SokobanOnline.com, Sokoban.dk(Go Right), Accumulated1.
        Date: 2015-07-11
        
        ----####
        ----#--#
        ----#--#
        --###--#
        ###--*-##
        #---*-*-###
        #--*-*-*--#
        ###-*-*---#
        --##-*-####
        ---#--##
        ---#-@#
        ---####
        Title: 025 Less Pain
        Comment: Needed an easy one after publishing a remodel from Gil Dogans contest.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-07-14
        
        ---#
        --###
        -##-##
        ##-.-##
        #--*--#
        #--*--#
        #-$*$##
        ##-*-##
        -#-*-#
        -#-*-#
        -#-*-#
        -#-.-#
        -#-@-#
        -#####
        Title: 026 No Pain
        Previously published: SokobanOnline.com, Sokoban.dk(Lines), Accumulated1.
        Date: 2015-07-14
        
        ##########
        #--------#
        #-*.*.*..#
        ##$####-##
        #--$@$-$-#
        #--------#
        ##########
        Title: 027 An In Betweener With No Title Originally
        Previously published: Sokoban.dk(Lines) Accumulated1.
        Date: 2015-08-02
        
        #############
        #------.....#
        #------*.*..#
        #--######-#$###
        #--#--$-$---$-#
        #--#-$#-#-#-#-#
        ####--$---$-$-#
        ---##@#######-#
        ---#----------#
        ---############
        Title: 028 No Pain 2 Rev
        Comment: Just added a wall to the puzzle originally published at SokobanOnline. Not sure it makes a more interesting puzzle.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-08-10
        
        ---#####
        ---#---##
        -###-#--##
        -#--*-#--##
        ##-#-*-#--#
        #---*-*-#-#
        #@-*-*-*--#
        ##--*---###
        -#####--#
        -----####
        Title: 029 Last One For Free
        Comment: Published 25 levels on SokobanOnline.com. Had to pay 0.99$ for an upgrade to pro memeber to publish more. But the site gave me a free ticket.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-08-10
        
        ---#####
        --##---#
        -##--#-###
        ##--#-*--##
        #--#-*-*--#
        #-#-*-*-*-###
        #--*-#-#-*--#
        ##--*-*-*---#
        -##--*-*---##
        --##--*--@##
        ---########
        Title: 030 Back To Start 44 Variation
        Comment: Could be a plain 4x4 cyclic puzzle. But you dont need to move all the blocks in many cyclic puzzles. The trick is to figure out which ones
        Previously published: Accumulated1.
        Date: 2015-08-11
        
        -------#####
        ########---##
        #--##--$$---#
        #--------#$-#
        #-$##-#--#-###
        ##-#--####---#
        -#-#-#.-.#*#-#
        -#-#-#.*.*.#-#
        -#--$$-#-.*-@#
        -#---####---##
        -#--##--#####
        -####
        Title: 031 Not 6x2
        Comment: Wanted to make a level with a 6*2 goal. Ended up like this.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-08-15
        
        --#########
        --#---.---#
        --#---.---#
        --#-##.####
        --#-#-.---###
        ###-#-.-#---#
        #-$$$$*$$$$-#
        #---#-.-#---#
        ###--#.-#####
        --##--+##
        ---#####
        Title: 032 Nine In A Row
        Previously published: SokobanOnline.com, Sokoban.dk(Lines), Accumulated1.
        Date: 2015-08-19
        
        ####-####
        #--###--#
        #--$----#
        #-$#.#--#
        ##--.#-##
        -#$#.#-#
        -#--.#-#
        -#$#.#-##
        -#---#--#
        -#$----@#
        -#--#####
        -####
        Title: 033 Five In A Row
        Previously published: SokobanOnline.com, Sokoban.dk(Lines), Accumulated1.
        Date: 2015-08-22
        
        --#####
        --#---#
        ###---###
        #--***--#
        #--*@*--#
        ###***--#
        --#---###
        --#---#
        --#####
        Title: 034 Nice And Not So Easy
        Comment: Checked nobody ever made this puzzle before.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-08-24
        
        --######
        --#----#
        ###--#-###
        #--****--#
        #--*@-*--#
        #--*--*--#
        ##########
        Title: 035 Page Two
        Comment: A beautiful simple design. A favorite of mine.
        Previously published: SokobanOnline.com, Accumulated1.
        Date: 2015-08-25
        
        ----------#
        ----------##
        ----------###
        ----------#-##
        ###########--##
        #-------------##
        #.**********$--##
        #--------@---###
        ###########--##
        ----------#-##
        ----------###
        ----------##
        ----------#
        Title: 036 Next
        Comment: You can find 100.000+ sokoban levels on the net and still nobody ever made this simple design. Amazing.
        Previously published: SokobanOnline.com, Sokoban.dk(Go Right), Accumulated1.
        Date: 2015-09-05
        
        ---####
        ####--####
        #-$-.*-$-#
        #-#-**-#-#
        #-#-..-#-#
        #---##$--#
        ###--@-###
        --######
        Title: 037 2x3
        Comment: Idea from David Hollands Maelstrom 18.
        Previously published: Accumulated1.
        Date: 2015-09-10
        
        -----#######
        -----#-----##
        -----#-.----#
        -######.#-#-#
        ##---##.#---#
        #---$-#.#---#
        #-$$$-#.#---#
        #--@$-#.----#
        #-$#$--.#---#
        #---$-#.#####
        #####---#
        ----#####
        Title: 038 Elegance
        Comment: An elegant unexpected solution just popped out.
        Previously published: Sokoban.dk(Lines) Accumulated1.
        Date: 2015-09-22
        
        -#######
        -#-----#
        ##$#-#$####
        #--.....*-#
        #-#$##$#$-#
        #------#--#
        ###-#@##-##
        --#------#
        --########
        Title: 039 An Easy Six
        Comment: Wont keep you sleepless.
        Previously published: Accumulated1.
        Date: 2015-09-27
        
        #########
        #---#---#
        #-#---#-#
        #-$$.$$@#
        ##..*..##
        #-$-.---#
        #-#-#$#-#
        #---#---#
        #########
        Title: 040 5x3
        Previously published: Accumulated1.
        Date: 2015-10-03
        
        ------#
        -----###
        ------#
        -----###
        ----##.##
        ---##.$.##
        --##-$.$-##
        -##-.-$-.-##
        ##-*-.#.-*-##
        #-$-*###*-$-#
        #--$--#--$--#
        #-----#--@--#
        #############
        Title: 041 Happy Christmas
        Comment: Idea from "Prayers" by Bodler. Added a cross on top and published at SokobanOnline 2015-12-24 with the title "Happy Christmas"
        Previously published: SokobanOnline.com, Sokoban.dk(Remodels1), Accumulated1.
        Date: 2015-10-03
        
        -----#####
        -----#---#
        ----##-#-##
        ----#-----#######
        ----#-----#-----#
        ----#-##.##-$-#-#
        ---##--#.####$--#
        -#####-#....$-$-#
        ##---#....##-$--#
        #----#$##.##$##-#
        #-$----$-*-#@---#
        #-#---$----######
        #-#####$####
        #-------#
        #########
        Title: 042 Whatever
        Comment: Decided to do something with a crossshaped goal.
        Previously published: Sokoban.dk (Crosses), DrFogh-Accumulated 1
        Date: 2014-10-05
        
        --#####
        --#-.-#
        --#$.$#
        --#-.-#
        --#-.-#
        ###$.$###
        #--$.$--#
        #---*---#
        ###-@-###
        --#####
        Title: 043 So Simple 1
        Comment: And still never made before.
        Previously published: SokobanOnline.com
        Date: 2015-10-10
        
        --#####
        --#-.-#
        --#$.$#
        --#-.-#
        --#$.$#
        --#-.-#
        --#-.-#
        ###$.$###
        #--$.$--#
        #---*---#
        ###-@-###
        --#####
        
        Title: 044 So Simple 2
        Comment: A little higher
        Date: 2015-10-10
        
        --#####
        --#-.-#
        --#$.$#
        --#-.-#
        --#$.$#
        --#-.-#
        --#$.$#
        --#-.-#
        --#$.$#
        --#-.-#
        --#-.-#
        ###$.$###
        #--$.$--#
        #---*---#
        ###-@-###
        --#####
        Title: 045 So Simple 4
        Comment: This design can be expanded infinitely. From this puzzle and further YASS couldn't solve it.
        Previously published: Sokoban.dk(Lines)
        Date: 2015-11-13
        
        --------#####
        #########---#
        #----.....#-#
        #---@$------#
        ##-#######-##
        -#-----#--$#
        -###-#$#---#
        ---#---$-$##
        ---####---#
        -----######
        Title: 046 Row514
        Comment: The title? Goal five in a row. Layout no 14 was final level.
        Previously published: Sokoban.dk(Lines)
        Date: 2015-09-25
        
        ----#####
        ----#---#
        ----#$.$#
        ----#-.-#
        #####$.$#####
        #-$-$-.-$-$-#
        #-....@....-#
        #-$-$-.-$-$-#
        #####$.$#####
        ----#-.-#
        ----#$.$#
        ----#-.-#
        ----#$.$#
        ----#-.-#
        ----#$.$#
        ----#---#
        ----#####
        Title: 047 Cross
        Previously published: SokobanOnline.com, Sokoban.dk (Crosses)
        Date: 2015-10-18
        
        46 Cross. Now With Centerblock
        
        ----#####
        ----#---#
        ----#$.$#
        ----#-.-#
        #####$.$#####
        #-$-$-+-$-$-#
        #-....*....-#
        #-$-$-.-$-$-#
        ####-$.$-####
        ---##-.-##
        ----#$.$#
        ----#-.-#
        ----#$.$#
        ----#-.-#
        ----#$.$#
        ----#---#
        ----#####
        Title: 048 Cross. Now With Centerblock
        Previously published: SokobanOnline.com, Sokoban.dk (Crosses)
        Date: 2015-10-18
        
        #########
        #--.-.--#
        #--$-$--#
        ##*****##
        #--$-$--#
        #--.@.--#
        #########
        Title: 049 Nakarev
        Comment: Thought it was inspiration from Nakaxsomething, but it was somewhere else.
        Previously published: SokobanOnline.com
        Date: 2015-11-12
        
        --------#####
        --------#---##
        --#####-#-$--#
        --#---####-#-###
        --#-#...-$--$--#
        ###-#.#.#$$$-#-#
        #---#...#-#----#
        #-#-#...#-#$$###
        #----...#@$---#
        ######-##$$---#
        -----#--#-##-##
        -----#-$#-$--#
        -----#--$---##
        -----##---###
        ------#####
        Title: 050 Dev42
        Previously published: Sokoban.dk
        Date: 2015-11-19
        
        -----#####
######---##
#---$.$---#
#-#$#.#$#-#
#--..+..#-#
#-#$#.#$#-#
#-#-$.$---#
#-#-#$###-#
#---------#
###########
Title: 051 And Now Something Different
Comment: Just published some letters. Then this.
Published: SokobanOnline.com
Date: 2015-11-21

-----####
######--#########
#---$-*..$------#
#-#-#$.*.$#-#-#-#
#---$@*..$------#
#################
Title: 052 Eazy 1
Date: 2015-11-22

####
#--###########
#----$-$-$-$-#
#--#.-.-.-.--#
##-########-##
#--.-.-.-.#--#
#-$-$-$-$----#
###########-@#
----------####
Title: 053 Medium 1
Published: SokobanOnline.com
Date: 2015-11-29

--######
--#----#
###$-#$###
#-$-..-$-#
#-#-..$#-#
#-#$..-#-#
#-#-*.$#-#
#--$.*---#
###-#@####
--#---#
--#####
Title: 054 Tough 1
Comment: A Maelstroem-inspired puzzle.
Published: SokobanOnline.com
Date: 2015-12-03

-#####
##---##
#--#.-#
#-$#*-#
#--#.-#
#-$#*-#
#--#.-#
#-$-*-#
#-##.-#
#-$-*-#
#--#.-#
##-$-##
-#-@-#
-#####
Title: 055 13018
Comment: How autogenerated level 13018 from Sokokong ended up.
Published: Sokoban.dk(Lines)
Date: 2015-12-04

--#######
--#-----#
--#-----#
###-##-##
#@*--#-#
##**-#-#
#------#
#-####-#
#------#
########
Title: 056 Cyclic 3 Study 1
Published: Sokoban.dk(Cyclic 3 Study)
Date: 2015-12-04

-----#####
######---#
#----*-#-#
#-#-#*---#
#---@*-#-#
######---#
-----#####
Title: 057 Cyclic 3 Study 2
Published: Sokoban.dk(Cyclic 3 Study)
Date: 2015-12-04

---#####
####---#
#@*--#-#
##*--#-#
#-*----#
#--###-#
##-----#
-#######
Title: 058 Cyclic 3 Study 3
Published: Sokoban.dk(Cyclic 3 Study)
Date: 2015-12-04

-#####
-#---#
-#-#-#
-#---###
##-#---#
#-@*-*-#
#-*-#-##
##----#
-######
Title: 059 Cyclic 3 Study 4
Published: Sokoban.dk(Cyclic 3 Study)
Date: 2015-12-04

#######
#--+--#
#-***-#
#-$.$-#
#-$.$-#
#--.--#
#######
Title: 060 5x5 Cross
Date: 2015-12-04

--------------------------------##
#------------------------------##
######----------###########--###
#-----########################
*--$$$--$---$-$-#......#--#--#
*-$----$-$-$--$-#.....***.---#
*-$$$#$-$#$-$#$--..#...-..#--##
#---------------##-###-####---#
##################-###-####-#-#
----------------##-###-####-#-##
-----------------#---#-#----#--##
-----------------#--@#-#-#------#
-----------------#--##-#---##-#-##
------------------#----#---------##
-------------------####-#-####----#
------------------------#--#---##-##
------------------------##---------#
-------------------------#-#--#----#
-------------------------#---##--#-#
-------------------------##--------#
--------------------------##########
Title: 061 Peacemaker Plus Rev
Comment: Rearranged the target area. A slightly different version published at SokobanOnline.com
Published: Sokoban.dk(Peacemaker)
Date: 2015-12-08

########
#------#
#-####-#
#-.$.--#
##$#$#-##
-#.$.---#
-#-##-#-#
-#@-----#
-########
Title: 062 Medium 2
Published: SokobanOnline.com
Date: 2015-12-19

###########
#----#----#
#-$#-#--.-#
#--$-#-.#-#
#-$-$#.-.-#
#-@$-*-.--#
#-$-$#.-.-#
#--$-#-.#-#
#-$#-#--.-#
#----#----#
###########
Title: 063 Medium 3
Comment: Mirrored horizontally to fit the formula in "Go Right)
Published: SokobanOnline.com, Sokoban.dk(Go Right)
Date: 2015-12-22

---------#####
---#######---#
####--$----#-#
#----#####-$-#
#-#--...*..###
#---##-#-#-$-#
###--#---#@#-#
--##-###$$---#
---#-----#####
---#######
Title: 064 Tough 2
Comment: You would never guess, but started as a revision of
Ecoyorineko Level 2 from Game-Sokoban.com
Published: SokobanOnline.com, Sokoban.dk(First published puzzle)
Date: 2015-12-28

----########
----#------##
#####-.###--#
#--.-$$$-.--#
#-#-*-.-*-###
#-#$-***-$###
#-.$.*+*.$.-#
#-#$-***-$#-#
#---*-.-*---#
#-#.#$$$#.#-#
#-----*-----#
#############
Title: 065 Sun
Comment: Took away two floors in upper left corner compared to version
published at SokobanOnline.com. Doesnt change the gameplay at all.
Published: SokobanOnline.com, Sokoban.dk (Crosses)
Date: 07-01-2016

#############
#---######--#
#--------$--#
##-#######--#
#--$-$-$-#$##
#--#....+---#
#--######---#
#############
Title: 066 Eazy 2
Comment: Started out as a remodel of Premyzl Zikas Tertius gradus ad
Olympo 4 but ended up more like a remodel of my own 52 Medium.
Published: SokobanOnline.com. Sokoban.dk(Lines)
Date: 2016-01-08

---------------------######
########################--#
#------#######---#######--#
#--$-$$#---###-#-#---###--#
#-#-$--#....-----#....---##
#-$$-$$##--###-####--##---#
#-#-$--##-####--###-###---#
#--$-$$-----#....-----#---#
#-##-#-##-#-#---###-#-##--#
#@-----##---#######---##--#
###########################
Title: 067 Medium 4
Comment: Big and ugly. Not my favorite. Tried to get everything
through and then back. Only partly a succes.
Published: SokobanOnline.com.
Date: 2015-01-17

----#####
---##---##
-###--#--#
##-@.*$--##
#--$-*-.--#
#-#**#**#-#
#--.-*-$--#
##-#$*.#-##
-#---#---#
-#########
Title: 068 Swastika
Comment: An ancient religious symbol. Did not use this title. To strong stuff.
Published: SokobanOnline.com, Sokoban.dk (Crosses)
Date: 2016-01-19

----#####
--###---######
###---#------#
#---#-#.###--#
#-#-#-..--#$-#
#---#.###-$-##
#-#-..--#$#-#
#-#.###-$-$-#
#-..--#$-$--#
#-#-#-$-$#-@#
#---#----####
#####--###
----####
Title: 069 Oblique
Comment: Well, the goal area is a little oblique.
Published: SokobanOnline.com.
Date: 2016-01-22

-#####
-#---#
##---##
#-$$$-#
#-.#.-#
#-.-.-#
#-#$#-#
#-.-.-#
#-.#.-#
##$$$##
-#-$-#
-#-@-#
-#####

Title: 070 Eazy
Comment: Small and anonymous.
Published: SokobanOnline.com
Date: 2016-01-23

###############
#.............#
#.$$$$$$$$$$$.#
#.$---------$.#
#.$-*******-$.#
#.$-*-----*-$.#
#.$-*-$$$-*-$.#
#.$-*-$@$-*-$.#
#.$-*-$$$-*-$.#
#.$-*-----*-$.#
#.$-*******-$.#
#.$---------$.#
#.$$$$$$$$$$$.#
#.............#
###############
Title: 071 Never Done Before
Comment: Tried something with two rings and ended up with Sokoban Perfect #199. 
Added a ring and ended up with this never done before not very interesting level.
Date: 2016-01-24

--#####
--#---###
--#-----###
-####-#---#
-#-$-$###-#
##-##..---#
#---#..#-##
#-#--..#-##
#-#$##$#--#
#--$-@--$-#
########--#
-------####
Title: 072 Twosix11
Comment: Made this. Played Nicolas Blazz1 level10 just after. Same
goal area. Blazz is bezzer I think.
Date: 2016-01-26

--------######
#########----####
#------##-##-$--#
#-#$#-$---#-$---###
#----$-#--@--#----#
#-#--#-#$######$#-#
#-$--$-#.*.*..#---#
####$-##.#.*.*-$$-#
---#--#-.*.*..#$-##
---##-#-...*..#--#
----#-###$###-#-##
----#$-----------#
----#--#######$#-#
----####-----#---#
-------------#####
Title: 073 Big22
Comment: Big but is it good?
Published: SokobanOnline.com
Date: 2016-01-29

###########
#-.-.-.---#
#-$*-.$---#
##-#####-##
#--#---#-#
#--$-$@--#
#--#######
####
Title: 074 Sunday Morning
Published: SokobanOnline.com
Date: 2016-01-31

-----#####
---###---#
---#---#-#
---#-#---#
####--##$########
#---#$--$-#-----##
#---$-#$#-#-#-#--#
#-#-#-#---#....--#
#-$---##-$@--#.--#
#-#-#$##-##....--#
#---$----##-#-#--#
######---##-----##
-----############
Title: 075 Pinhole70
Date: 2016-02-02

##############
#-----####---#
#-$$--###----#
##-$--###----#
##-$-####---##
##-$-####---##
##---#--##--##
##-$##....--##
##-$...-##--##
##-$#-#.##--##
##--#-@-##--##
##--##########
##############
Title: 076 Smallbone
Date: 2016-02-03

--#####
-##-@-##
##-$$$-##
#-$-.-$-#
#-.***.-#
#-*-.-$-#
#-*****-#
#-$-.-*-#
#-.***.-#
#---*---#
#########
Title: 077 Dollars
Author: Tyge Fogh
Comment: Part of my collection Money
Previously published: SokobanOnline.com, Sokoban.dk(Money)
Date: 2015-05-01

-------#####
########---#
#---##-----#
#-----****-###
##-##*#-#-*--#
-#--*------#-#
-#-*******---#
-#--*@--#--###
-#-*******####
-##-*-#------#
-#---*----*--#
-#-###****####
-#---------#
-######----#
------######
Title: 078 Euro
Comment: An unpolished version published at SokobanOnline.com. This
one has better design and same gameplay.
Published: SokobanOnline.com, Sokoban.dk(Money)
Date: 2016-02-07

###############
##..-##---..-##
#--..---#..#-##
#-#$**$$**$$--#
#--$-..*.--$#-#
#-#$##+*##-$--#
#--$...*..-$--#
#-#$$$**$$$$#-#
#--$......-$--#
###$##..###$#-#
#--$--..---$--#
#-#$##..$$$$#-#
#------##-----#
###############
Title: 079 Yen
Date: 2016-02-11
Published: Sokoban.dk(Money)

----#####
---##---#####
---#----#---#
---#--**----#
---##*--.#-##
####@*-#$#-#
#---***#---#
#-#--*--#####
#-##-*------#
#---*****##-#
###-#-----#-#
--#-##----#-#
--#--######-#
--##--------#
---##########
Title: 080 Pound Rev
Comment: Discovered the first version was solvable withour moving
3 blocks. Now you have to move all the blocks (I hope)
Published: SokobanOnline.com, Sokoban.dk(Money)
Date: 2016-02-12

------------#####
#############---#
#-$-$-$-$-$-$-#-#
#-#-#-#-#-#-#-#-#
#-#-------------#
#-#-######-#-#-##
#@.-.-.-.-.-.---#
#########-------#
--------#########
Title: 081 Ski
Comment: Went skiing and made a single sokoban puzzle.
Published: SokobanOnline.com
Date: 2016-02-19

-----------####
--##########--#
--#--------#--#
--#---*-#-*---#
--#--*-*-*-*-##
####-*-*-*-*--#
#---*-#*-*-#*-##
#-#-*---*#--*--#
#---*-#-*---*--#
##-*-###*-###*##
-#-*##--*-#--*-##
-#-*@#-#*----*--#
-#-*##---##--*--#
-##-##---###--###
-#--###-##-#--#
-#------#--####
-#####--#
-----####
Title: 082 McDonalds
Published: Sokoban.dk(Commercials)
Date: 2016-02-21

#######
#--#--####
#--#-$---##
#--...#$--#
##-#$-#-#-#
#--.*.#-$-#
#--#$---###
#--#-@###
#######
Title: 083 Month
Comment: Dont know why it is called month
Date: 2016-02-21

-------------######
-------------#----#
##############----#
#----------#...#-#####
#-$$$$$$$$$-...#-----#
#--------@-#...------#
#########--##-####-#-#
--------#####--------#
------------##########
Title: 084 13083
Comment: Started with a Sokokong level. Actually nothing like the original, just started out and let the blocks drift.
Date: 2016-03-01

##################################################
#------#----#----#----#----#----#---#--#-----#---#
#-$***-#**--*--*-#**--***---**--*--*---***--*#-*-#
#-*----*--*-*-*--*--*-*--*-*--*-**-*--#*--*-*-*--#
#--**--*--*-**---*--*-***--*--*-*-**#--*--*-**---#
#----*-*--*-*-*--*--*-*--*-****-*--*--#*--*-*-*--#
#-***--#**--*--*-#**--***--*--*-*--*-*-***--*#-+-#
#------#----#----#----#---------#--#---#-----#---#
##################################################
Title: 085 Sokoban.dk Logo
Published: SokobanOnline.com, LetsLogic.com, Sokoban.dk(Commercials)
Date: 2016-03-19

###########
#@----##--######
#---#-##...----#
#-----##.*.#-#-#
#-----#.*.#-$--#
#----##*..#-$--#
#--$-#...#-$-#-#
#-$-##...#--$#-#
#--$#.**#-$$$--#
#---$...#-#--$-#
#-#-##--#-$--#-#
#----#$##-$--$-#
#-----$-#-#$$#-#
#---#---#------#
##--#---########
-########
Title: 086 Spiros
Comment: Inspired by Spiros 0899 but ended up as a completely new level
Date: 2016-03-22

#######
####--#
#--*--#
#--*--#
#--*@-#
#--####
#######
Title: 087 How Easy Can It Be
Comment: But it looks nice.
Date: 2016-03-27

--######
-##----#
-#-----####
-#-##-#---#
-#-....---#
###....####
#--....#
#-#....####
#-####$---#
#---$--$--#
###-$-$-$-##
--#$-$-$-$-#
--#-$---$--#
--#$-$$$-###
--#---@-##
--#######
Title: 088 April 2016
Comment: Started out doing a Swastica with a 4x4 central goal. Ended up like this after 53 layouts.
Date: 2016-04-02

##################
#----------------#
#--$$$---####----#
#--$--#-#----#---#
#-$-$--#------#--#
#-$$-#--....--#--#
#-$--$-..#...-#-##
#-$$$$#..#...##--#
#---$-#-....##---#
#-$-$-$-#####----#
#-$$--#--###--#-##
#-$-$#..#*#*#-.--#
#--$-#...#####..-#
#-$--#$#-#####..-#
#-$-$-$--##-##-#-#
#-$-$-#...$...---#
#-$$$--###-###-#-#
#@----------#----#
##################
Title: 089 SokobanOnline Rev2
Comment: Changed the eye and the hat. Still needs the rigth skin to shine. Published at SokobanOnline.com in a slightly different version.
Published: SokobanOnline.com
Date: 2016-04-16

------------#####
--------#####---##
-------##-----#--##
---#####---#---#--#
--##--#-*****--#--##
###---**-#-#-**#---#
#---#*#-*---*--*-#-##
#-#-*-#-*---*-#-*---#
#-#-*---#*-*#-#-*---#
#--**--#-*-*--#-**#-#
#-#*-*#--#*#-#-*-*--#
#--*--*--#@#--*--*#-#
#-#*-#*---*---*#-*--#
#--*---*#*#*#*---*#-#
##-#*--*-*-*-*-#*---#
-#--*-#-*---*---*---#
-#-#-*--*-#-*#-*-#--#
-#--#-**#----**##--##
-##-#---*****#----##
--#--##----#---####
--##--#----#-###
---##--####--#
----##------##
-----########
Title: 090 VW2
Comment: But I gave you too much floors. Not much difference. No need to play both. A floor lover right has been stoned.
Published: Sokoban.dk(Commercials)
Date: 2016-04-29

###############################
#-----#.---#.-###.---#--------#
#-$$#-$..#-#..--$..--#-$$$$$$-#
#-$---#...-$...-#...-#-$------#
#-$$$-#....#....#....#-$$$$$$-#
#-$---#...-$...-#...-#-$------#
#-$$$-#..#-#..#-#..#-#-$$$$$$-#
#-----$.---#.---#.---$--------#
#-$$$-#$#########$####$$$$$$$-#
#@------#########-------------#
###############################
Title: 091 Big Right
Comment: Started out a bit lame. Recovered some, but big levels tend to suck.
Published: Sokoban.dk(Go Right)

#############
#--...#-----##
#-#...--$##--#
#--...-#-----#
#-##-#-#$#-#-#
#--$--$--$-#-#
######-#-#-$-#
---#--$--$-###
---#---$#--#
---###-@####
-----####
Title: 092 Nine
Comment: Finished something in the vault.
Date: 2016-05-01

################
#---##-----#---#
#---$-$-##.-.--#
##-#$-$###.-.###
-#--$@$-#-.-.--#
-###-##-#------#
--#-----###-####
--#--##-###--#
--#--#-------#
--####---##--#
-----#########
Title: 093 Single Quote
Date: 2016-05-12

---###
---#.#
---#.#
---#.#
####.##
#--#.@##
#--#.--##
#--#.$$-#
#-$##$--#
#-----$-#
##-$-#$-#
-#-----##
-#######
Title: 094 My First Autogenerated Level Rev
Comment: Edited a little further to make this one. Better I think.
Published: Sokoban.dk(Lines)
Date: 2016-05-12

-----###
----##--#
---##---##
--##-.-.-##
--#-.-.-.-#
--#.-#-#-.#
--#-.-.-.-#
--#--.-.--#
--###---###
----##-##
---##---##
--##-$-$-##
###-$---$-###
#--$-$#$-$--#
#-#-$---$-#-#
#-#--$-$--#-#
#-##--#---#-#
#--#######--#
##----@----##
-###########
Title: 095 Flacon Rev
Comment: Two floor less needed than the version published at SokobanOnline.com
Published: SokobanOnline.com
Date: 2016-05-26

----#######
----##---##
-----#-.-#
-----#---#
-----##$##
-----#---#
--####---##
-#---#***-###
##-#--*-*---##
#---***-***--#
#-##*--@--*#-#
#-#-***-***--#
#-#-#-*-*--#-#
#-#---***#-#-#
#-#---#----#-#
#---######---#
###--------###
--##########
Title: 096 Just Pop The Bottle
Comment: A fresh one just made it for the collection Crosses.
Published: Sokoban.dk (Crosses)
Date: 2016-05-29

--#####
---------###
-
------------##
-
#########----##
-#-----#-----##
-#-#-#-########
-#------------##
-###-#-######--#
-#-$-#-.-----#-#
-#@$-#-.####-#-#
-#-$-#-.-----#-#
-###--------#--#
---#---####---#
---#####--#####
Title: 097 The Little Train
Comment: A1Master came up with a little challenge at LetsLogic.com. This level will surely not even be a runner up but I like it anyway.
Published: LetsLogic.com. Sokoban.dk(The Little Train)
Date: 2016-06-11

-######
-#----###
-#------#
###*$*#-#
#--*-*--#
#--*+*-##
###-#-##
--#---#
--#####
Title: 098 Not much to be done
Comment: A small in betweener
Date: 2016-06-29

#########
#-------#
#-*$*$*-#
#@------#
#-*$*$*-####
#-------#--#
#-*$*$*----#
#-------#--#
####-####-##
--#..#----#
--#..#-##-##
--#..------#
--#--#-#---#
--#----#####
--######
Title: 099 False
Comment: The 9 goals at top should be filled before the lower 6. Started with an idea that the 9 goals at top never should move but too obvious and didn't work out as intended anyway
Date: 2016-06-29

   ######
   #    #
   #    ####
#### # ##  ##
#  $   # $  #
# @$#.....# #
### # #$#$  #
  #   #    ##
  ####  #  #
     #  ####
     #  #
     ####

Title: 100 Snooker
Comment: Started as a rebuild of a Sokoban Extreme level. Came out totally different so only credits to me for this level. Rediscovered the skin Snooker by John C. Davis. Thought it is a suitable name for the puzzle
Date: 2016-07-21

#############
#----####---#
#--#------#-#
#--#-#.##-#-#
#--.-#.##.#-#
#--#.-.#.---#
#--##...-#-##
#-....#....-#
#----...##--#
#-#-.#.-.#--#
#--.-#.#-.--#
#---##.#----#
#----#-#----#
#----#-#----#
######$######
#---$-------#
#--$-$$#$#--#
##--$----#$-#
##$#-$##$#-##
##--$--@-$-##
#-$-$$$##---#
#-#$-----#$-#
#-#--$#$----#
#-$$$-$--#$-#
#-$----$-#--#
#----#---####
#############
Title: (101) Rising Sun Sharpen
Comment: First version 2016-08-12 Had an extra look and stoned 11 floors
Date: 2017-07-19

###############
#-.-.-.-.-.-.-#
#-$-$-$#$-$-$-#
#####-@---#####
----#######
Title: (102) Passtime For The Weekend
Date: 2016-08-20

--#############################
--#---------------------------#
--#-#-#-#-#-#-#-#-#-#-#-#-#-#-#
--#-$$$$$$$$$-$$$$$$$$$$$$$$$-#
--#-$-$-$-$--#----$-$-$-$-$-$-#
--#-$-$-$---$$-#-$--$-$-$-$-$-#
--#-$----#-$--$###$-----------#
--#--$-$-$$$-$-#--$$$--$-$-$--#
--#-$-$-$--$---#----#-$-$-$-$-#
###########-#####-#########-###
#----######-----#-########--###
#-.#-#.-...#..--#-#-..---..#--#
#-..-..-.#-.--.##-#.##.-.##.--#
#-.-.#.#.-#.##.##-#.##.#.##.--#
#-.--#.-..--..------..---..---#
#-.--#.#.--.-#.##-#.##.#.##.-##
#-.--#.#.--.-#.##-#.##.-.--.-#
#-.---.#.---..----#-..---..###
##--------@-#######--#######
-#######--###-----####
-------####
Title: (103) MF888 Sharpen
Comment: Created as an advertisment for the 88th MF8 competition. 
Reduced the floors by one lover left.
Date: 2016-08-05

#######
#-----####
#-#$#-#--#
#-*+*.---#
#-#$###--#
#-------##
#########
Title: (104) Time for a Classic Puzzle
Comment: 10 new modern puzzles at Sokobanonline. No classics.
Date: 2016-08-29

---------#######
--------##-----##
--------#--###--#
--------#-#---#-#
--------#-#---#-#
--------#-#---#-#
-----####-#---#-#
----##----#-.-#-#
-####--####-.-#-##
##----#---#...#--##
#--####-#-....-#--#
#-#--##---.....#--#
#-#--###-##-####--###
#-#-------#-#####$--###
#--#-##-$-$@$-----$---#
##--$#######$####$-$#-#
-##--#-----#-##---#-#-#
--#-########--$$$-#-#-#
--#$-----$----#---#-#-#
--#-######-#--#-----#-#
--#--#---#--####--###-#
--#--#---##----####---#
--#--#----####------###
--####-------########
Title: (105) Kevin
Comment: Thought the goal area looked nice in Kevin B. Reillys level 
78. Ended up with something completely different. Not a remodel but a 
brand new puzzle.
Date: 2016-09-12

#########
#----#--#
#-#-----#
#--$$-$-#
##$#---##
#---#$######
#-#-----#--#
#--$$-#-$--#
##-$-#*##--#
####-+..#-##
#--#****.$##
#--*......-#
#--##---#--#
##-#######-#
#----------#
#--#-#-#-###
#--------#
##########
Title: (106) Toppoint
Date: 2016-09-16

--####
--#--#-############
--#--#-#---#------##
--#-$###$#-#--###--###
--#--$--$--#--#--#---##
###-$-$--#-#--#--###--#
#----$-$-#...-#--#--#-#
#---$$###-.....--#--#-#
#-----#-#---#..-----#-#
#######-#####-###-@-#-#
------------#----###--#
------------####-----##
---------------#######
Title: (107) Kreta
Comment: Just happened to be on Kreta
Date: 2016-10-08

##########
#--------#
#-$-$$#$-#
#-#----$-#
#--####$##
#---...--#
##$#.#.#-#
#-$-...#-#
#-#--#---#
#@----####
###---#
--#####
Title: (108) Not Easy
Comment: It is not easy.
Date: 2016-11-17

#############
-##-------##
-#--$$$-$--#
-#-$--$--$-#
-#-$--$$-$-#
--##$#-$-##
---#@$-$-#
----#---#
-----#-#
----#---#
---#-----#
--##-##-###
-#----.----#
-#-#-..#---#
-#--.....-##
-##.......##
#############
Title: (109) Hourglass
Date: 2016-11-17

-######-############
##----#-#----------#
#--.**###**-#*-.**.#
#-.$#-*@*--*-*-$--.##
#-#---*#*--*-*-$$$.-#
#-#.**--*-#*-*-$-.$-#
#-.$----*--*-*-$.-$-#
#-.****##**#-*#.$$--#
##-----##----------##
-###################
Title: (110) Happy New Year 2017
Date: 2016-11-21

-#--------------------#
-#-#----------------#-#
-#-#-#------------#-#-#
#--##--------------##--#
#-##----------------##-#
###------------------###
-#-------#----#-------#
-##-----##----##-----##
--##----#------#----##
---##---#------#--###
----###-#------#-##
-##---####-##-####--###
#--##---###--###---#---#
#-$--##-#--$-$-####--$-#
#--$---#---$-$-$--#-$--#
#---$$---$-$@$--#-$$--#
-###--#---#-#$------##
----#---##----###--#
-----#-#**#--#**#-#
-----##---$-#----##
------#--#-$-$#--#
------#-#--#---#-#
------#--$##$#---#
-------##--..#--#
--------#..-...##
--------#...#..#
--------#......#
---------#....#
----------####
Title: (111) Rudolph aka Merry Christmas 2016
Comment: Supposed to be Rudolph The Rednosed Reindeer
Date: 2016-12-03

##-----------##
-##---###---##
--###########
--##--###--##
--#-..-#-..-#
--#-..-#-..--#
-###$##-##$#-#
-#-----------#
-#--$$###$$-##
--#-$--#--$-#
---##--@--##
-----#####
Title: (112) Owl
Date: 2016-12-17

--------####
-########--##
-#--#-------#
##-----$$$$-#
#-$$$$$---$-#
#-------###-#
#---#####-$$##
####--....#--#
#----#....---#
#----#....####
#-#----##@##
#---#------#
#####-##-#-#
----#------#
----########
Title: (113) January 2017
Date: 2017-01-07

---###########
--##---------#
--#-$--$-$-$-##
--#-###-##-#--#
--#--.*...*#$-#
###$#.--##.#--#
#---$.#$##.#-##
#-#-#.$-$-.$$#
#-#$#.#@$#.#-#
#-#-#..*...#-##
#-#-####$###--#
#-----$-$-----#
###-#-#-####--#
--#-----#--####
--#######
Title: (114) Black Friday
Comment: They got a new president in USA
Date: 2017-01-20

--------#########
----#####---#---###
----#-----#-#-#---###
---##-###$$$$$$$#---##
--##----$-#---#-$-#--####
###--#-$---$$$--#$-#----#
#---##$#-#$$-$$-#-$####-#
#.#--*-.....#.....-*....#
#.--#*-.$-#.#.##$.#*#-#.#
#.##-*-*$-#.#.#-$$-*--#-#
#-...$-*-##.@-...$-*#-#-#
#-#.#$#**...#-##$*-*----#
#-#.-$-.$##.#.#-$.#*###.#
#-#.-$#.--#.#.....-*....#
#--#--$---$$-$$-#-$####-#
##-#-##$#--$$$--#$--#---#
-#-#----$-#---#-$---#-###
-#--#####$$$$$$$####--#
-##-------#-#-#------##
--#######-------######
--------#########
Title:115) From Mac to YASC
Date: 2017-01-25
###################################
#-...--.--.-.--.--..---.--.---.-.-#
#-*$$-.$.-*-*#.$.-*$.-.$.-*.##*-*-#
#-*..-*-*-*.$-*-*-*.$-*.*-*$.-*-*-#
#-$$*-*-*-*$.-*-*-*$.-*$*-*-$.*#$-#
#-..*-$.$-*-*-$.$-*.$-*-*-*--$*-.-#
##$$$#-$--$-$--$-#$$--$-$-$---$-$-#
-#-#-######-######-####-###########
-#@---------------------#
-########################
Title: (116) JCD
Comment: John C Davis made a level with the word "Sokoban" suggesting 
the funniest way to solve the level letter by letter from the beginning
even though you could solve the letters in practically any order. This
level started as an attempt to make a level impossible to solve unless 
you solve the letters one by on from the beginning. 
Obviously I didn't succeed this time.
Date: 2017-01-29

---#####
####---#
#--.$.-#
#@#$*$-#
#--.$.-#
##---###
-#####
Title: (117) Flowsnake
Author: DrFogh
Comment: Block starting position and end position same as a level by 
Mic (and probably other authors I think.
Published: SokobanOnline.com, Sokoban.dk
Date: 2017-02-09

---#########
---#-------#
--##-$@$-$-##
-##-$-$-$$$-#
-#--#####-#-#
##---..-#-#-#
#--#.##.----#
#---.##.#-###
#--#-..-#-#
##--------#
-#####--###
-----####
Title: (118) February 2017
Comment: Well. It is February. Is it not?
Date: 2017-02-23

###############
#------#------#
#--$-$---$-$$-#
#--$-$-#-$-$--#
##$#$#####$#$##
#-$-$--#--$-$-#
#------@------#
########-###$##
#-----##-###--#
#-#-#-----###-#
#-----###-##--#
#-#----#--##--#
#---##-#-##---#
#---...#...---#
#--#...-...#--#
#--#...#...#--#
###############
Title: (119) A Modification Gone Astray
Comment: Idea from Aenigma 48 but you would probably not notice if I 
didn't tell you.
Date: 2017-02-24

---#######################
####-----#---------------#
#--#-###-#-######-######-#
#----#---#-#--#----------#
#--**--#-$**$-#--*##$**$##
##*#-*-#-*--*-#-**-#.#-*-#
-#---*-#-*--*--#-*-#.-@*-#
##-#*##--*--*#---*-##.*--#
#--*----#*#-*--#-*-#.$#.##
#-*---##-*--*-##-*--*-#.#
#-****-#-$**$-###*#-$..-##
#-------------#-#----##--#
#---#########-####-#-----#
#####------#-------#---###
-----------#---##--#####
-----------#########
Title: (120) Happy Newyear 2018
Comment: A little early
Date: 2017-02-26

-#########
-#-------#
##$##-##-#
#-$------#
#-$$$$$#-#
#--#-@-#-#
##-#####-##
-#.......-#
-#-######-#
-#--------#
-##########
Title: (121) March 2017
Date: 2017-03-14

---#####
####---####
#-$-$.$-$-#
#--#-.-#--#
#-$#.#.#$-#
##..-@-..##
#-$#.#.#$-#
#--#-.-#--#
#-$-$.$-$-#
####---####
---#####
Title: (122) April 2017
Date: 2017-04-13

-----------####
-----------#--#
----------##@-#
----------#-$-#
----------#-*-#
----------#-*-#
----------#-*-#
---------##-*-#
---------#-*-##
--------##-*-#
--------#--*-#
--------#--*-#
--------#-*--#
-------##-*--#
-------#--*-##
------##-*-##
-----##--*-#
######--*--#
#-----**--##
#-.***---##
#-----####
#######
Title: (123) Parabel
Comment: Tried to combine four mirrored examples of this level into an 
oval. Ended up with Easter 2017.
Date: 2017-04-13

-----#####
----#--#--#
---#--*$*--#
--#--*-#-*--#
--#-*--#--*-#
-#--*-***-*--#
-#-*--###--*-#
-#-*-*****-*-#
#--*-#####-*--#
#-*--*****--*-#
#-*-#######-*-#
#-*-*******-*-#
#--*-#####-*-##
-#-*--***--*-#
-#-*---#---*-#
-#--**-#-**--#
-#----*+*---##
--####---####
-----#####
Title: (124) Easter 2017 Rev
Comment: Archanfel solved the level with about 100 moves less than my best.
He provided me with his solution and I discovered a vast amount of superfluous
floor at the left side of the level.
Date: 2017-04-14

---------#####
---------#---#
---------#-@-#
--------##-#-##
------###--#--###
----###----#----###
----#-----###--#--#
--###-#-#-###-#--###
--#-#-#--$-##-#$---##
--#---$$-#--##--#---#
-##--#-$-##-##---#-###
-#-#$#--###---$----#-#
##-$--$#####-###$#$--##
#--$-$---###-###---#--#
#-----##-----####--$--#
##-$-#####-#---###---##
#-$-######-###--###-$-#
##-###---#-###---###-##
#----------#-#------$-#
#-#-##.-..---#...-.-#-#
#--.-...-.-#.....**.--#
#######################
Title: (125) Christmas 2017
Comment: Use christmas skin for best presentation
Date: 2017-07-22

#######------####---####-####-------####-####
#-----########--###-#--#-#--#########--###--##
#-#**-#---#--#----###--###--#---#--------#---#
#-*--*#-#**--#*--*#--**---***---#**-#-*--*-*-#
#--*----*-#*--*-*-#-*--*--*--*#-*--*--**-*-*-#
#-#-*-##*@-*--**--#-*-#*#-***---*--*#-*-**-*-#
#-.-#*#-*--*##*-*-#-*--*--*--*#-****--*--*-$-#
##-**-#--**-#-*--*---**--#***---*--*--*#-*-*-#
-#----#----------####-------##--#----#-------#
-#################--#####################--###
----------------------------------------####
Title: (126) Sokoban Revisited
Comment: You have to solve the letters from the right to the left. 
Tell me if anything else is possible. bjertrup58@gmail.com
Date: 2017-04-25

---########
-###---#--#
-#--------#
##-#####--#
#--#---#-###
#-##-#-***-##
#-#---*---*-#
#-#-#-*-##*-#
#-#-##*---*-#
#-#---.***$@#
#---##----###
###########
Title: (127) Taxes
Comment: K8 is a dead box
Date: 2017-04-30

----#####
---##---##
--##--*--##
-##--*-*--##
##--*-*-*--##
#--*-*-*-*--#
#-*-*-#-*-*-#
#--*-*-*-*--#
##--*-*-*--##
-##--*$*--##
--##--+--##
---#######
Title: (128) Boring 5x5 Without Centerbox
Comment: Got bored. Made a 5x5 diamond level. Took 5 minutes. 
Sokolution solved it. YASS didn't. Discovered it isn't necessary to 
move the centerbox so I stoned it. Actually you can stone at least one 
more box if you want.
Date: 2017-06-18

------#####
-----##---##
----##--*--##
---##--*-*--##
--##--*-*-*--##
-##--*-*-*-*--##
##--*-*-*-*-*--##
#--*-*-*-*-*-*--#
#-*-*-*-*-*-*-*-#
#--*-*-*-*-*-*--#
##--*-*-*-*-*--##
-##--*-*-*-*--##
--##--*-*-*--##
---##--*$*--##
----##--+--##
-----#######
Title: (129) Boring 7x7
Comment: Still bored. Made a 7x7 diamond level. Took 5 minutes. No 
solver solved it. I studyed the 5x5 solution and 12 hours later I 
succeded solving the 7x7 level. I still dont know if the puzzle can be 
solved with a fixed centerbox. Probably yes. Anyone up to the
challenge?
Date: 2017-06-18

---####
####--#####
#--#--#---##
#--#*.*-#--#
#--*---*---#
##*#-#--*-##
#-*---##*-#
#--*#$-*-###
#---*-*----#
##***-***--#
-#-#-#---###
-#-@-#---#
-#########
Title: (130) Big Omega
Comment: I am sorry to admit it, but two boxes needn't be moved at all. 
So I made a new version and scrapped this one for the collection "It's 
All Greek"
Date: 2017-06-24

-------####--------###############
-#######--##########---------##--#
-#.---.#....--..#----.##..-#-..--#
-#..-..-.-##-.--.-#-..-.--.#.-#.-#
-#.#.#.#.####.##.---#.#.#-.-.-#.-#
-#.#-#.#...---..-##.#.#.##.#.-#.-#
-#.--#.#.#---.##.#--#.#.##.#.--.-#
-#.###.#.#---.-#.--#-.-.##.#.-#.##
-#.---.-.--##-..-----.--..-##..##
#####-####-###-##-#######-####-###
#-$---$-$---#-$$--#--$--$$---$$--#
#-$-#-$-$-#--$--$#---$-$--$-$#-$-#
#-$-#-$-$-#--$--$--#-$-$-#$-$--$-#
#-$-#-$-$$$-#-$$##-$-$-$--$-$--$-#
#-$-$-$-$---#$--$-#--$-$--$-$-#$-#
#-$$-$$-$--#-$--$--#$$-$--$-$--$-#
#-$---$-$$$$-#$$-#---$-#$$---$$###
#------------#---#-@-#-----#---#
################################
Title: (131) MF8 Centennial Final Version
Comment: After stoning of countless superflours floors by Stopheart. And some mailing and suggestions from Anian.
Date: 2017-06-25

-----#####
----##-+--#
--###-.#.-###
-#---.-#-.---#
-#-#.#.$.#.#-#
-#-$.$.$.$.$-#
-#-$.$.$.$.$-#
#--$.$.$.$.$--#
#-##.#.#.#.##-#
#--$.$.$.$.$--#
#--$.$.$.$.$--#
#-#$#$#$#$#$#-#
#--$.$.$.$.$--#
-#-$.$.$.$.$-#
-#-$.$.$.$.$-#
-#---#.$.#---#
--##---#---##
----#######
Title: (132) Easter 2018
Comment: Not easter yet but had the idea now.
Date: 2017-06-25

---#####
####-@-####
#----$----#
#-#$#$#$#-#
#-$.....$-#
#-#.###.#-#
#-$.#-#.$-#
#-#.###.#-#
#-$.....$-#
#-#$$#$$#-#
#--$-#-$--#
###--#--###
--#-----#
--#######
Title: (133) Flipped
Comment: Flipped the final level
Date: 2017-06-27

-------#-------#
-------#-------#
-------##-----##
--------#-----#
--------##---##
---------#-#-#
---------#*#*#
---------**#**
--#####--**#**--#####
-#-----#--*#*--#-----#
#---*$--#-#-#-#-$-*$--#
#-$*#.---##--#--$.#.$-#
#---.$-.....*#.*-$.---#
-#-$-#-#####.###-#$$-#
-#---#$........*-#---#
--##$#-####.#-##-#-##
---#------$.-#-$---#
----##-$$-#.##-#-##
---#--.*--#.#@-#..-#
--#---###-#.#$$$-$--#
--#-$$-$--#.-$--$$$-#
--#--$--##---##--$--#
---#---#--#.#--##--#
----###----#----###
-----------#
-----------#
-----------#
-----------#
Title: (134) Butterfly
Comment: In my workshop 2 or 3 years before I finished it
Date: 2017-06-29

###############
#-------------#
#-$$$$#-#$$$$-#
##-----------##
-######@#######
##-....-....--#
#-------------#
#---########--#
#####------####
Title: (135) Bjertrup1
Comment: Inspired by a level by Backhoes. The original also was not
very interesting.
Date: 2017-07-07

---#####
---#---##
---#----##
#####-#--#
#---#...-#
#---$..*-#
##$####$-#
-#-----$-#
-#-$#-#@-#
-#----####
-######
Title: (136) Bjertrup2
Comment: Small and tricky. But no match for any autosolver.
Published: Sokobanonline.com
Date: 2017-07-07

------####
------#--#
#####-#--#
#---###--#
#----$--#####
####-#-$.*.-#
---#@#-#...-#
---#$#$$...-#
---#-#--##--#
--##--$-#####
--#--#$$#
--#-----#
--#--####
--####
Title: (137) Blue
Comment: Started development of this level by changing a Sokoblue
level a little. Guess which one and I will give you a beer.
Date: 2017-07-16

--####
--#--#########
-##--#--#----#--####
##--$$--#-#$-####--#
#--$-#--#--$----#--#
#-$-$-#-$---$-$-#--#
#--$---$##$$#####-##
#-$$$#-$------$----#
#--$@#--#---$-##---#
#---#########--#$###
########----##-----#
---##--#-##--#-#---#
---#------.....#####
---#-----#...#.####
---#--#--#.....#--#
---#####-#.##..---##
------#--#.....#---#
------#--##--###---#
------#------#-##--#
------###----#--####
--------######
Title: (138) Count
Comment: You have to count how many boxes you need inside before
filling the storing area.
Date: 2017-07-22

----####
--###---##
-#-----$$-#
-#-$#--$--#
-#$-#-#---#
#--$-$######
#--$--#.-..#
#--$$$#.#..#
##$#-@$.#*.#
#--####.#.*#
#--$---.#..#
#--##--...*#
#######-#--#
-#--$-$---#
-##------##
--########
Title: (139) Easter 2019
Comment: A remodelled Sokoplay-Levelpack (11x15) by Mic.
Date: 2017-07-23

###########
#---####--#
#----$----#
##$###$#-##
#--#...#--#
#--#...$$-#
#--#...#--#
##$##$##-##
#----$@-$-#
#-----#---#
###########
Title: (140) NP Crowded Center
Comment: Inspired by Mic
Date: 2017-08-09

-------#######
-----####----###
---###-----#--####
--##----#-----#--##
--#--------#------#
-####-######-#-#--##
-#-----#---#-#-----#
-#-#---#--...-##-#-#
-#----####...-#----#
-##------#.#.-#---##
--###----#.########
----#--###.#.--##
----####--...--##
-########-...#######
##------#-.#.#-----##
#--####-####-#-###--#
#-##--------$----##-#
#-#--$#$-#-$$-##--#-#
#-#-$$----#-##--#-#-#
#-##-#-##$-$----$-#-#
#-#---$-$-##$#--$-#-#
#-####-$#-$-$--$###-#
#---#--$-----#--#---#
###-#---###@-####-###
--#-#####-####-##-#
--#---------------#
--#################
Title: (141) Flacon 3
Date: 2017-08-13

---#####
---#---#####
####-------#
#---#****--##
#---*---#*--#
##-#*--#-*--#
-#--*-##-*--#
-###*----*###
---#-****---#
---#--@-#---#
---##########
Title: (142) Round34
Author: DrFogh
Comment: My 34. attempt to get it necessary to move all the boxes to 
solve the level. As is often the case it is a pain in the xxx to get 
this done in  a circular level. Didn't succeed this time either. Hope 
you enjoy the level anyway.
Date: 2017-08-26

-#########
##---#---#
#--#@#---#
#-$$$$$$$#
##-#-#-#-#
-#---#---#
-##---#--#
-#--#----#
-#.......#
-####--###
----####
Title: (143) Fixed Rev
Author: 39Fix & DrFogh
Comment: Fixed a frame with some interesting posibilities wasted.
Original at
https://www.sokobanonline.com/play/community/39fix/127332_39fix-4.
My first attempt at
https://www.sokobanonline.com/play/community/bjertrup/sokoban/127363_98-fixed.
Revised the level once more. The leftmost box really had no point.
Date: 2017-09-11

##############
#-------#----#####
#@$-$-$-$-$-$##--#######
#-###-$$-$-$-$-------$-#
#--####------##...#$$$-#
##---#########**.**----#
#--$--##-#----**.***---#
#-$-$-#--##...-..-***-##
#-$-$-#---.....#....*$##
#-$-$-##-**....##--.$--#
#-$-$$##-***...-...#$$-#
#-$$---**-*#$-$.**..---#
#-$---#*.*-.***-**..*-##
#-$$$**..#..*.**#.***-#
#-$--**..#.##.**#-***$##
#-$-$***..-..-*#..-*-$-#
#-$--****-....-...*#---#
#-$-$---#**....-**..-$-#
#-$-$-$--**..#--***.-$-#
#-$-$-$--***-..-***.-$-#
#-$-$-$-#-*-.*..-..--$-#
#-$-$-$-$--$**...##$-$-#
#-$----$----**.**-$--$-#
#-$$$$$$$$$#**.**-$$$$-#
#--$-$-$-#---...--#----#
##-------####---########
-#########--#####
Title: (144) Grapes
Author: DrFogh
Comment: Anybody play hanjies? This design came from hanjie-star.com
Date: 2017-10-14

#####
#---###
#-.$.-#
##$*$-#
#-.*.-#
#--*--#
##-*--#
-#-$-##
-##@-#
--####
Title: (145) Blooming Flower
Author: DrFogh
Comment: Time for a small easy level
Date: 2017-10-22

----#####
-####---##
-#--#-#--##
##--#*-#--#
#---*-*-#-#
#--##-*-#-###
#-#---*@#---#
#-#---#*----#
#---#-.*-#-##
#####*$*-*-#
-##-*-#-*-##
-#-------##
-#---#####
-#####
Title: (146) Lambda First Version
Author: DrFogh
Comment: Ok levelvise but it doesn't look like a lambda. Made an other design.
Date: 2017-11-03

--#####
--#---#
###-#-#
#--*-*###
#--*@*--#
#--*-*--#
###-#-###
--#---#
--#####
Title: (147) November 2017
Author: DrFogh
Date: 2017-11-15

----#######
--###---#-###
-##---$$$-$-##
##--$-#-#----##
#--$-#---#----#
#-$-##---##$--#
#-#-#-##$-#---#
#-#-#----#-#-##
#---$-#-$-----#
##--###-###--##
-####-#-#-####
------#-#
------#-#
-----##-##
----##...##
---##.-.-.##
---#..-+-..#
---#########
Title: (148) The Apple Tree
Comment: Inspired by Sylvain Gravejat Level 3. Recognize it?
Date: 2017-11-22

----------#####
---########---#--#####-#####
####------#---####---###---#
#--***-#--#***-##-*----***-##
#-*---*#--*---*---*-#-*#--*-#
#-.-#-*-#-*-#-*-#-*-#-*@--*-#
#-#-#**-#-*---*-#-*-#-#***--#
#-***---#-*###*-#-*-#-$---*-#
#-*---.-#-*---*-#-*--#$#--*-#
#-*****-#--***--#-*--#-***--#
##---#-##--#-###---##--#---##
-##--#-##--#-###---#--######
--#-#--#####-###--#--##
--#-#-----------##--##
--#-#--#-######----##
--#--##--#----######
--##----##
---######
Title: (149) Happy Newyear 2019
Comment: A little early
Date: 2017-12-14

--#######
###--#--#
#----#--#
#--$$$--#
##$#-#$##
#-*...*-#
#-.--$.-#
####$-#-#
#-.-$-.-#
#-#.#.###
#---$---#
##-@#---#
-########
Title: (150) Questionmark
Date: 2017-12-14`
}