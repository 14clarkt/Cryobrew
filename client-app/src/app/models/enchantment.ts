export interface Enchantment {
    id: string
    name: string
    points: number
    applicableEquipment: string
    restrictions: string
    range: string
    duration: string
    specificCosts: string
    totalPower: number
    
    effectCost: string
    effectAction: string
    effect: string

    found: boolean
    learned: boolean
}