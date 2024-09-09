export interface MagicItem {
    id: string
    name: string
    description: string
    charges: number
    maxCharges: number
    count: number
    isHidden: boolean
    equippedBy: string | null
}