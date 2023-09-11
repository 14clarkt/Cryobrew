import { makeAutoObservable } from "mobx"

export default class EquipmentQualityStore {
    constructor() {
        makeAutoObservable(this)
    }
}