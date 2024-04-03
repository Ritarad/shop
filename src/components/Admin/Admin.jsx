import React, { useState } from 'react';
import { cfg } from '../../cfg/cfg';

import {
  Form,
  Container,
  Col,
  Row,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';

function Admin() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [status, setStatus] = useState({
    status: null,
    message: '',
  });

  const handleSudmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;
    if (!form.checkValidity) return;

    try {
      setLoading(true);
      const response = await fetch(`${cfg.API.HOST}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      const product = await response.json();

      if (!response.ok) throw new Error(product.error);

      setStatus({ value: 'success', message: 'Product created successfully' });

      console.log(product);
    } catch (error) {
      setStatus({
        value: 'danger',
        message: error.message || 'Failed. Please try again',
      });
    } finally {
      setLoading(false);
    }

    console.log('data submited');
  };
  return (
    <div className="nav-container">
      <h1> Add product</h1>
      <Container>
        {status.value && <Alert variant={status.value}>{status.message}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSudmit}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Descroption</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Img</Form.Label>
              <Form.Control
                type="text"
                placeholder="Img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={loading}>
            Create product
          </Button>
          {loading && <Spinner animation="border" variant="warning" />}
        </Form>
      </Container>
    </div>
  );
}

export default Admin;
