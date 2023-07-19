export interface ActionPointCard {
    id: string
    name: string
    actionPointLevels: Array<ActionPointLevel>
}

export interface ActionPointLevel {
    id: string
    level: number
    range: string
    cost: string
    duration: string
    prerequisite: string
    upgradeCost: string
    castingTime: string
    description: string
}