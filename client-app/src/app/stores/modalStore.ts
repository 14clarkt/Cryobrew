import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean
    body: JSX.Element | null
    header: string | null
    size: "mini" | "small" | "tiny" | "large" | "fullscreen" | undefined
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        header: null,
        size: "mini"
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (header: string, content: JSX.Element, size?: "mini" | "small" | "tiny" | "large" | "fullscreen" | undefined) => {
        size ? this.modal.size=size : this.modal.size = "mini"
        this.modal.open = true
        this.modal.header = header
        this.modal.body = content
    }

    closeModal = () => {
        this.modal.open = false
        this.modal.header = null
        this.modal.body = null
    }
}