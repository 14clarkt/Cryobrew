export interface SokobanLevel {
    key: string
    title?: string
    initialLevel: string
    levelState: string[]
    targets: Pos[]
}

export interface Pos {
    row: number
    col: number
}