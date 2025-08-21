import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import { userContext } from '../App';


function Header() {

    const navigate = useNavigate()
    const handleLogin = () => navigate('/login')
    const { setIsUserLogged, isUserLogged, userCoins, user } = useContext(userContext)

    const handleLogout = () => {
        setIsUserLogged(false)
        navigate('/login')
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#">Imagica</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    <Form className="d-flex">
                        {isUserLogged ?
                            <div className='d-flex, align-center'>
                                <Form.Text className="text-muted font-weight-bold" style={{ "fontWeight": '600' }}>
                                    Coins: {userCoins}
                                </Form.Text>
                                <Form.Text className="text-muted mx-2 font-weight-bold" style={{ "fontWeight": '600' }}>
                                    {user.name}
                                </Form.Text>
                                <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
                            </div>
                            : <Button variant="outline-success" onClick={handleLogin}>Login</Button>
                        }
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;