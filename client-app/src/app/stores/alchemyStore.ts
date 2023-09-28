import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { toast } from "react-toastify";
import { AlchemyPotencyRange, AlchemyTrait } from "../models/alchemy";

export default class AlchemyStore {
    traitRegistry = new Map<string, AlchemyTrait>();
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get traitList() {
        let traits = Array.from(this.traitRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => { // sort the ranges within the traits
            traits.forEach((trait) => trait.potencyRanges.sort((a, b) => a.order - b.order))
        })

        return traits
    }

    loadTraits = async () => {
        this.setLoadingInitial(true)
        try {
            const traits = await agent.Alchemy.listTrait()
            runInAction(() => {
                traits.forEach(trait => {
                    this.setTrait(trait)
                })
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    private setTrait = (trait: AlchemyTrait) => {
        this.traitRegistry.set(trait.id, trait)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    createTrait = async (trait: AlchemyTrait) => {
        this.loading = true
        trait.id = uuid()
        try {
            await agent.Alchemy.createTrait(trait)
            runInAction(() => {
                this.setTrait(trait)
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

    createAPR = async (ATid: string, apr: AlchemyPotencyRange) => {
        this.loading = true
        apr.id = uuid()
        try {
            await agent.Alchemy.createAPR(ATid, apr)
            runInAction(() => {
                this.setAPR(ATid, apr)
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

    private setAPR = (ATid: string, apr: AlchemyPotencyRange) => {
        let at = this.traitRegistry.get(ATid)
        at?.potencyRanges.push(apr)
        at?.potencyRanges.sort((a, b) => a.order - b.order)
    }

    // updateApc = async (apc: ActionPointCard) => {
    //     this.loading = true
    //     try {
    //         await agent.ActionPointCards.update(apc)
    //         runInAction(() => {
    //             this.apcRegistry.set(apc.id, apc)
    //             this.loading = false
    //             store.modalStore.closeModal();
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })            
    //     }
    // }

    // upgradeApc = async (apc: ActionPointCard) => {
    //     this.loading = true
    //     for (let i = 0; i < apc.actionPointLevels.length; i++) {
    //         if (apc.actionPointLevels[i].level == apc.upgradeLevel + 1) {
    //             await agent.ActionPointCards.update({...apc, upgradeLevel: apc.upgradeLevel+1})
    //             runInAction(() => {
    //                 this.apcRegistry.set(apc.id, {...apc, upgradeLevel: apc.upgradeLevel+1})
    //                 this.loading = false
    //             })
    //             return
    //         }
    //     }
    //     toast.error(`No APL of level ${apc.upgradeLevel+1} for APC: ${apc.name}.`)
    //     this.loading = false
    // }

    // downgradeApc = async (apc: ActionPointCard) => {
    //     this.loading = true
    //     for (let i = 0; i < apc.actionPointLevels.length; i++) {
    //         if (apc.actionPointLevels[i].level == apc.upgradeLevel - 1 || apc.upgradeLevel === 1) {
    //             await agent.ActionPointCards.update({...apc, upgradeLevel: apc.upgradeLevel-1})
    //             runInAction(() => {
    //                 this.apcRegistry.set(apc.id, {...apc, upgradeLevel: apc.upgradeLevel-1})
    //                 this.loading = false
    //             })
    //             return
    //         }
    //     }
    //     toast.error(`No APL of level ${apc.upgradeLevel-1} for APC: ${apc.name}.`)
    //     this.loading = false
    // }

    // equipApc = async (apc: ActionPointCard, username: string | undefined) => {
    //     if (!username) return

    //     this.loading = true
    //     await agent.ActionPointCards.update(username !== apc.equippedBy ? {...apc, equippedBy: username} : {...apc, equippedBy: null})
    //     runInAction(() => {
    //         this.apcRegistry.set(apc.id, username !== apc.equippedBy ? {...apc, equippedBy: username} : {...apc, equippedBy: null})
    //         this.loading = false
    //     })
    // }

    // updateApl = async (APCid: string, apl: ActionPointLevel) => {
    //     this.loading = true
    //     try {
    //         await agent.ActionPointCards.updateApl(apl)
    //         runInAction(() => {
    //             let apc = this.apcRegistry.get(APCid)
    //             apc!.actionPointLevels = apc!.actionPointLevels.filter((a) => a.id !== apl.id)
    //             this.setApl(APCid, apl)
    //             this.loading = false
    //             store.modalStore.closeModal();
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })            
    //     }
    // }

    // deleteApc = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.ActionPointCards.delete(id)
    //         runInAction(() => {
    //             this.apcRegistry.delete(id)
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })
    //     }
    // }

    // deleteApl = async (APCid: string, APLid: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.ActionPointCards.deleteApl(APCid, APLid)
    //         runInAction(() => {
    //             let apc = this.apcRegistry.get(APCid)
    //             apc!.actionPointLevels = apc!.actionPointLevels.filter((apl) => apl.id !== APLid)
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })
    //     }
    // }

    // copyApl = async (APCid: string, APLid: string) => {
    //     this.loading = true;
    //     try {
    //         let copyAplId = uuid()
    //         await agent.ActionPointCards.copyApl(APCid, APLid, copyAplId)
    //         runInAction(() => {
    //             let apc = this.apcRegistry.get(APCid)
    //             let apl = apc!.actionPointLevels.filter((apl) => apl.id === APLid)[0]
    //             this.setApl(APCid, {...apl, id: copyAplId})
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })
    //     }
    // }
}