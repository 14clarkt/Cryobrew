import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Header, Modal } from "semantic-ui-react";

export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size={modalStore.modal.size}>
            <Modal.Header style={{ backgroundColor: "black", borderColor: "teal", borderStyle: "solid", borderWidth: "4px", padding: "4px" }}>
                <Header as='h2' content={modalStore.modal.header} color='teal' textAlign='center' />
            </Modal.Header>
            <Modal.Content scrolling style={{ backgroundColor: "#111111", borderColor: "teal", borderStyle: "solid", borderTopStyle: "none", borderWidth: "4px" }}>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})