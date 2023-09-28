export interface AlchemyTrait {
    id: string
    name: string
    triggers: string
    types: string
    tier: string
    hidden: boolean
    potencyRanges: Array<AlchemyPotencyRange>
}

export interface AlchemyPotencyRange {
    id: string
    range: string
    duration: string
    effect: string
    order: number
}