import { makeAutoObservable, runInAction } from "mobx"
// import { EquipmentQuality } from "../models/equipmentQuality";
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { Crelic, CrelicAbility, CrelicSubAbility, CrelicSubAbilityLevel } from "../models/crelic";
import agent from "../api/agent";

export default class CrelicStore {
    crelicRegistry = new Map<string, Crelic>()
    loadingInitial = false
    loading = false
    //     crelicFilter = ""

    constructor() {
        makeAutoObservable(this)
    }

    get crelicList() {
        let sortedcrelics = Array.from(this.crelicRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => { // sort the ranges within the crelics
            sortedcrelics.forEach((crelic) => {
                crelic.crelicAbilities.sort((a, b) => a.name.localeCompare(b.name))
                crelic.crelicAbilities.forEach((crelicAbility) => {
                    crelicAbility.crelicSubAbilities.sort((a, b) => a.name.localeCompare(b.name))
                })
            })  //TODO: the color tags affect the sorting. Allow the color list to be used
        })      //TODO: this doesnt sort when you edit
        
        return sortedcrelics//.filter((crelic) => crelic.name.toLowerCase().includes(this.crelicFilter.toLowerCase()))
    }

    loadCrelics = async () => {
        this.setLoadingInitial(true)
        try {
            const apcs = await agent.Crelics.list()
            apcs.forEach(crelic => {
                this.setCrelic(crelic)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    createCrelic = async (crelic: Crelic) => {
        this.loading = true
        crelic.id = uuid()
        try {
            await agent.Crelics.create(crelic)
            runInAction(() => {
                this.setCrelic(crelic)
                this.loading = false
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    createCrelicAbility = async (crelicId: string, crelicAbility: CrelicAbility) => {
        this.loading = true
        crelicAbility.id = uuid()
        try {
            await agent.Crelics.createAbility(crelicId, crelicAbility)
            runInAction(() => {
                this.setCrelicAbility(crelicId, crelicAbility)
                this.loading = false
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    createCrelicSubAbility = async (crelicAbilityId: string, crelicSubAbility: CrelicSubAbility) => {
        this.loading = true
        crelicSubAbility.id = uuid()
        try {
            await agent.Crelics.createSubAbility(crelicAbilityId, crelicSubAbility)
            runInAction(() => {
                this.setCrelicSubAbility(crelicAbilityId, crelicSubAbility)
                this.loading = false
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    createCrelicSubAbilityLevel = async (crelicSubAbilityId: string, crelicSubAbilityLevel: CrelicSubAbilityLevel) => {
        this.loading = true
        crelicSubAbilityLevel.id = uuid()
        try {
            await agent.Crelics.createSubAbilityLevel(crelicSubAbilityId, crelicSubAbilityLevel)
            runInAction(() => {
                this.setCrelicSubAbilityLevel(crelicSubAbilityId, crelicSubAbilityLevel)
                this.loading = false
                store.modalStore.closeModal();
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    //     deleteEQ = async (id: string) => {
    //         this.loading = true;
    //         try {
    //             await agent.EquipmentQualities.delete(id)
    //             runInAction(() => {
    //                 this.eqRegistry.delete(id)
    //                 this.loading = false
    //             })
    //         } catch (error) {
    //             console.log(error)
    //             runInAction(() => {
    //                 this.loading = false
    //             })
    //         }
    //     }

        updateCrelic = async (crelic: Crelic) => {
            this.loading = true
            try {
                await agent.Crelics.update(crelic)
                runInAction(() => {
                    this.crelicRegistry.set(crelic.id, crelic)
                    this.loading = false
                    store.modalStore.closeModal();
                })
            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false
                })            
            }
        }

        updateCrelicAbility = async (crelicId: string, crelicAbility: CrelicAbility) => {
            this.loading = true
            try {
                await agent.Crelics.updateAbility(crelicAbility)
                runInAction(() => {
                    this.setCrelicAbility(crelicId, crelicAbility)
                    this.loading = false
                    store.modalStore.closeModal();
                })
            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false
                })            
            }
        }

        updateCrelicSubAbility = async (crelicAbilityId: string, crelicSubAbility: CrelicSubAbility) => {
            this.loading = true
            try {
                await agent.Crelics.updateSubAbility(crelicSubAbility)
                runInAction(() => {
                    this.setCrelicSubAbility(crelicAbilityId, crelicSubAbility)
                    this.loading = false
                    store.modalStore.closeModal();
                })
            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false
                })            
            }
        }
        
        updateCrelicSubAbilityLevel = async (crelicSubAbilityId: string, crelicSubAbilityLevel: CrelicSubAbilityLevel) => {
            this.loading = true
            try {
                await agent.Crelics.updateSubAbilityLevel(crelicSubAbilityLevel)
                runInAction(() => {
                    this.setCrelicSubAbilityLevel(crelicSubAbilityId, crelicSubAbilityLevel)
                    this.loading = false
                    store.modalStore.closeModal();
                })
            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false
                })            
            }
        }

    //     findLearnForgetEQ = async (eq: EquipmentQuality) => {
    //         this.loading = true

    //         if(eq.found) {
    //             if(eq.learned) {
    //                 eq.found = false
    //                 eq.learned = false
    //             } else eq.learned = true
    //         } else eq.found = true

    //         try {
    //             await agent.EquipmentQualities.update(eq)
    //             runInAction(() => {
    //                 this.eqRegistry.set(eq.id, eq)
    //                 this.loading = false
    //                 store.modalStore.closeModal();
    //             })
    //         } catch (error) {
    //             console.log(error)
    //             runInAction(() => {
    //                 this.loading = false
    //             })            
    //         }
    //     }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    private setCrelic = (crelic: Crelic) => {
        this.crelicRegistry.set(crelic.id, crelic)
    }

    private setCrelicAbility = (crelicId: string, crelicAbility: CrelicAbility) => {
        let crelic = this.crelicRegistry.get(crelicId)
        crelic!.crelicAbilities = crelic!.crelicAbilities.filter((a) => a.id !== crelicAbility.id)
        crelic!.crelicAbilities.push(crelicAbility)
    }

    private setCrelicSubAbility = (crelicAbilityId: string, crelicSubAbility: CrelicSubAbility) => {
        let crelics = Array.from(this.crelicRegistry.values())
        for (let i = 0; i < crelics.length; i++) {
            const crelic = crelics[i];
            for (let j = 0; j < crelic.crelicAbilities.length; j++) {
                const crelicAbility = crelic.crelicAbilities[j];
                if (crelicAbility.id === crelicAbilityId) {
                    crelicAbility.crelicSubAbilities = crelicAbility.crelicSubAbilities.filter((a) => a.id !== crelicSubAbility.id)
                    crelicAbility.crelicSubAbilities.push(crelicSubAbility)
                }
            }
        }
    }

    private setCrelicSubAbilityLevel = (crelicSubAbilityId: string, crelicSubAbilityLevel: CrelicSubAbilityLevel) => {
        let crelics = Array.from(this.crelicRegistry.values())
        for (let i = 0; i < crelics.length; i++) {
            const crelic = crelics[i];
            for (let j = 0; j < crelic.crelicAbilities.length; j++) {
                const crelicAbility = crelic.crelicAbilities[j];
                for (let k = 0; k < crelicAbility.crelicSubAbilities.length; k++) {
                    const crelicSubAbility = crelicAbility.crelicSubAbilities[k];
                    if (crelicSubAbility.id === crelicSubAbilityId) {
                        crelicSubAbility.crelicSubAbilityLevels =
                            crelicSubAbility.crelicSubAbilityLevels.filter((a) => a.id !== crelicSubAbilityLevel.id)
                        crelicSubAbility.crelicSubAbilityLevels.push(crelicSubAbilityLevel)
                    }
                }
            }
        }
    }

    //     setEQFilter = (query: string) => {
    //         this.eqFilter = query
    //     }
}