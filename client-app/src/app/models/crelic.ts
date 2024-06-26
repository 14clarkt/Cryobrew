export interface Crelic {
    id: string
    name: string
    charges: number
    isHidden: boolean
    maxCharges: number
    crelicAbilities: Array<CrelicAbility>
}

export interface CrelicAbility {
    id: string
    name: string
    description: string
    crelicSubAbilities: Array<CrelicSubAbility>
}

export interface CrelicSubAbility {
    id: string
    name: string
    level: number
    crelicSubAbilityLevels: Array<CrelicSubAbilityLevel>
}

export interface CrelicSubAbilityLevel {
    id: string
    description: string
    level: number
    cost: number
}