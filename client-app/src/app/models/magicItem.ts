export interface MagicItem {
    id: string
    name: string
    description: string
    charges: number
    maxCharges: number
    isHidden: boolean
    equippedBy: string | null
}