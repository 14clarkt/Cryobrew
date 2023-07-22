import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean
    body: JSX.Element | null
    size: "mini" | "small" | "tiny" | "large" | "fullscreen" | undefined
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        size: "mini"
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element, size?: "mini" | "small" | "tiny" | "large" | "fullscreen" | undefined) => {
        size ? this.modal.size=size : this.modal.size = "mini"
        this.modal.open = true
        this.modal.body = content
    }

    closeModal = () => {
        this.modal.open = false
        this.modal.body = null
    }
}