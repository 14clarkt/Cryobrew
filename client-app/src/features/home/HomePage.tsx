import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/userForm/LoginForm";
import RegisterForm from "../users/userForm/RegisterForm";

export default observer(function HomePage() {
    const { modalStore, userStore } = useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/tcp.png' alt='logo' style={{ marginBottom: 12 }} />
                    The Cryobrew
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to the Cryobrew' />
                        <Button as={Link} to='/apc' size='huge' inverted>
                            Go to the Cryobrew!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal('Login to the Cryobrew', <LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal('Sign up to the Cryobrew', <RegisterForm />)} size='huge' inverted>
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})