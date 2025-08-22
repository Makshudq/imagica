import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { userContext } from '../App';


function Login() {
  const navigate = useNavigate()
  const [userInputs, setUserInputs] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { isLogin, setIsLogin,setUserCoins, setUser, setIsUserLogged } = useContext(userContext)

  const setloggedUserData = (userData) => {
    const { UserExist: { coincount, name, email }, loginToken } = userData
    setUserInputs({
      name: "",
      email: "",
      password: ""
    })
    localStorage.setItem('token', loginToken)
    setUserCoins(coincount)
    setUser({ name, email })
    setIsUserLogged(true)
    navigate('/')

  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    if (isLogin) {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/loginUser`, userInputs)
      console.log(data, 'dataloginUser..................')
      if (data.success) {
        setloggedUserData(data)
      }
    } else {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/regiterUser`, userInputs)
      console.log(data, 'dataregiterUser..................')
      if (data.success) {
        setUserInputs({
          name: "",
          email: "",
          password: ""
        })
        setIsLogin(true)
      }
    }
  }

  return (
    < Container>
      <Form className='w-50 m-auto mt-4 border p-4 rounded' onSubmit={SubmitHandler}>
        {!isLogin ? <h2 className='text-center mb-4'>Registration User</h2> : <h2 className='text-center mb-4'>Login User</h2>}
        {!isLogin &&
          (<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" name='name' onChange={e => setUserInputs({ ...userInputs, name: e.target.value })} value={userInputs.name} />
            <Form.Text className="text-muted">
              We'll never share your name with anyone else.
            </Form.Text>
          </Form.Group>)
        }

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email' onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} value={userInputs.email} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} value={userInputs.password} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Form.Group className="mt-3" controlId="formBasicName">
          <Form.Text className="text-muted">
            {isLogin ? `New to this site, regiter` : `Login, if you have an account`}
          </Form.Text>
          <span onClick={() => setIsLogin(!isLogin)} className="ms-2 text-primary font-weight-bold" style={{ 'cursor': 'pointer' }}>here</span>.
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Login;