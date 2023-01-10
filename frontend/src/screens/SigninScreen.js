import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useLocation , Link} from 'react-router-dom';

const SigninScreen = () => {

  //to get the redirect value from url :
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  //check redirectInUrl, if it does exist set it in the redirectInUrl , else the default redirect is home screen 
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <Container style={{ maxWidth: '600px'}}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' required/>
        </Form.Group>
        <div className='mb-3'>
          <Button className='primary' type='submit'>Sign In</Button>
        </div>
        <div className='mb-3'>
          New customer?{' '}
          <Link to={`/signin?redirect=${redirect}`}>
            Create your account
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SigninScreen