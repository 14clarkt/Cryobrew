import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { ActionPointCard, ActionPointLevel } from "../models/actionPointCard";
import { toast } from "react-toastify";

export default class ActionPointCardStore {
    apcRegistry = new Map<string, ActionPointCard>();
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get apcSortedList() {
        let apcs = Array.from(this.apcRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => { // sort the levels within the apcs
            apcs.forEach((apc) => apc.actionPointLevels.sort((a, b) => a.level - b.level))
        })

        return apcs
    }

    // get groupedActivities() {
    //     return Object.entries(
    //         this.activitiesByDate.reduce((activities, activity) => {
    //             const date = format(activity.date!, 'dd MMM yyyy');
    //             activities[date] = activities[date] ? [...activities[date], activity] : [activity];
    //             return activities;
    //         }, {} as {[key: string]: Activity[]})
    //     )
    // }

    loadApcs = async () => {
        this.setLoadingInitial(true)
        try {
            const apcs = await agent.ActionPointCards.list()
            apcs.forEach(apc => {
                this.setApc(apc)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    private setApc = (apc: ActionPointCard) => {
        this.apcRegistry.set(apc.id, apc)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    createApc = async (apc: ActionPointCard) => {
        this.loading = true
        apc.id = uuid()
        try {
            await agent.ActionPointCards.create(apc)
            runInAction(() => {
                this.setApc(apc)
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

    createApl = async (APCid: string, apl: ActionPointLevel) => {
        this.loading = true
        apl.id = uuid()
        try {
            await agent.ActionPointCards.createApl(APCid, apl)
            runInAction(() => {
                this.setApl(APCid, apl)
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

    private setApl = (APCid: string, apl: ActionPointLevel) => {
        let apc = this.apcRegistry.get(APCid)
        apc?.actionPointLevels.push(apl)
        apc?.actionPointLevels.sort((a, b) => a.level - b.level)
    }

    updateApc = async (apc: ActionPointCard) => {
        this.loading = true
        try {
            await agent.ActionPointCards.update(apc)
            runInAction(() => {
                this.apcRegistry.set(apc.id, apc)
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

    upgradeApc = async (apc: ActionPointCard) => {
        this.loading = true
        for (let i = 0; i < apc.actionPointLevels.length; i++) {
            if (apc.actionPointLevels[i].level == apc.upgradeLevel + 1) {
                await agent.ActionPointCards.update({...apc, upgradeLevel: apc.upgradeLevel+1})
                runInAction(() => {
                    this.apcRegistry.set(apc.id, {...apc, upgradeLevel: apc.upgradeLevel+1})
                    this.loading = false
                })
                return
            }
        }
        toast.error(`No APL of level ${apc.upgradeLevel+1} for APC: ${apc.name}.`)
        this.loading = false
    }

    downgradeApc = async (apc: ActionPointCard) => {
        this.loading = true
        for (let i = 0; i < apc.actionPointLevels.length; i++) {
            if (apc.actionPointLevels[i].level == apc.upgradeLevel - 1 || apc.upgradeLevel === 1) {
                await agent.ActionPointCards.update({...apc, upgradeLevel: apc.upgradeLevel-1})
                runInAction(() => {
                    this.apcRegistry.set(apc.id, {...apc, upgradeLevel: apc.upgradeLevel-1})
                    this.loading = false
                })
                return
            }
        }
        toast.error(`No APL of level ${apc.upgradeLevel-1} for APC: ${apc.name}.`)
        this.loading = false
    }

    equipApc = async (apc: ActionPointCard, username: string | undefined) => {
        if (!username) return
        
        this.loading = true
        await agent.ActionPointCards.update(username !== apc.equippedBy ? {...apc, equippedBy: username} : {...apc, equippedBy: null})
        runInAction(() => {
            this.apcRegistry.set(apc.id, username !== apc.equippedBy ? {...apc, equippedBy: username} : {...apc, equippedBy: null})
            this.loading = false
        })
    }

    updateApl = async (APCid: string, apl: ActionPointLevel) => {
        this.loading = true
        try {
            await agent.ActionPointCards.updateApl(apl)
            runInAction(() => {
                let apc = this.apcRegistry.get(APCid)
                apc!.actionPointLevels = apc!.actionPointLevels.filter((a) => a.id !== apl.id)
                this.setApl(APCid, apl)
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

    deleteApc = async (id: string) => {
        this.loading = true;
        try {
            await agent.ActionPointCards.delete(id)
            runInAction(() => {
                this.apcRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteApl = async (APCid: string, APLid: string) => {
        this.loading = true;
        try {
            await agent.ActionPointCards.deleteApl(APCid, APLid)
            runInAction(() => {
                let apc = this.apcRegistry.get(APCid)
                apc!.actionPointLevels = apc!.actionPointLevels.filter((apl) => apl.id !== APLid)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    copyApl = async (APCid: string, APLid: string) => {
        this.loading = true;
        try {
            let copyAplId = uuid()
            await agent.ActionPointCards.copyApl(APCid, APLid, copyAplId)
            runInAction(() => {
                let apc = this.apcRegistry.get(APCid)
                let apl = apc!.actionPointLevels.filter((apl) => apl.id === APLid)[0]
                this.setApl(APCid, {...apl, id: copyAplId})
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }
}