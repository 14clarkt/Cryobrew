import { observer } from "mobx-react-lite";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { ReactNode } from "react";

interface Props {
    content: ReactNode
}
export default observer(function NavBarSide(props: Props) {
    const { commonStore: { sidebarVisable } } = useStore();
    const { content } = props
    return (
        <Sidebar.Pushable as={Segment} style={{ backgroundColor: 'black', overflow: 'hidden' }}>
            <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                vertical
                visible={sidebarVisable}
                width='thin'
            >
                <Menu.Item as='a'>
                    <Icon name='home' />
                    To be Implemented
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher content={content} />
        </Sidebar.Pushable>
    )
})