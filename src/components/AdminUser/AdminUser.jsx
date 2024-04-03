import React, { useState } from 'react';
import {
  Spinner,
  Offcanvas,
  Form,
  Row,
  Col,
  Button,
  Alert,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { cfg } from '../../cfg/cfg';

function AdminUser() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setShow(false);
    setValidated(false);
    setUsername('');
    setPassword('');
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;

    if (!form.checkValidity()) return;

    try {
      setLoading(true);
      if (error) setError(false);

      const response = await fetch(`${cfg.API.HOST}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Username or password incorrect');

      const user = await response.json();
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user" onClick={handleShow}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {error && (
            <Alert variant="danger">Username or password incorrect</Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Username is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Password is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button
              style={{ marginTop: '2rem' }}
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
            {loading && <Spinner animation="border" variant="primary" />}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminUser;
