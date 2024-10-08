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
}

export interface AlchemyIngredient {
    id: string
    name: string
    biomesCreatures: string
    types: string
    quantity: number
    perUse: number
    hidden: boolean
    potencies: Array<AlchemyIngredientPotency>
}

export interface AlchemyProduct {
    id: string
    name: string
    count: number
}

export interface AlchemyIngredientPotency {
    id: string
    traitName: string
    potency: number
}