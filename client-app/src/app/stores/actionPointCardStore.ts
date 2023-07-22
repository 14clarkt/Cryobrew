import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent"
import { v4 as uuid } from "uuid"
import { store } from "./store";
import { ActionPointCard, ActionPointLevel } from "../models/actionPointCard";

export default class ActionPointCardStore {
    apcRegistry = new Map<string, ActionPointCard>();
    // selectedActivity: Activity | undefined = undefined;
    // editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get apcSortedList() {
        let apcs = Array.from(this.apcRegistry.values()).sort((a, b) =>
            a.name.localeCompare(b.name))

        runInAction(() => {
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

    // loadActivity = async (id: string) => {
    //     let activity = this.getActivity(id)
    //     if(activity) {
    //         this.selectedActivity = activity
    //         return activity
    //     }
    //     else {
    //         this.setLoadingInitial(true)
    //         try {
    //             activity = await agent.Activities.details(id)
    //             runInAction(() => this.selectedActivity = activity)
    //             this.setLoadingInitial(false)
    //             return activity
    //         } catch (error) {
    //             console.log(error)
    //             this.setLoadingInitial(false)
    //         }
    //     }
    // }

    private setApc = (apc: ActionPointCard) => {
        this.apcRegistry.set(apc.id, apc)
    }

    // private getActivity = (id: string) => {
    //     return this.activityRegistry.get(id)
    // }

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

    // updateActivity = async (activity: Activity) => {
    //     this.loading = true
    //     try {
    //         await agent.Activities.update(activity)
    //         runInAction(() => {
    //             this.activityRegistry.set(activity.id, activity)
    //             this.selectedActivity = activity
    //             this.editMode = false
    //             this.loading = false
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         runInAction(() => {
    //             this.loading = false
    //         })            
    //     }
    // }

    // deleteActivity = async (id: string) => {
    //     this.loading = true;
    //     try {
    //         await agent.Activities.delete(id)
    //         runInAction(() => {
    //             this.activityRegistry.delete(id)
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