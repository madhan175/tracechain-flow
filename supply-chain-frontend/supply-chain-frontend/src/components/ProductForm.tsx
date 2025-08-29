import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
// In ProductForm.tsx
// In ProductForm.tsx
import { network } from '../utils/contract';const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    productId: '',
    batchId: '',
    harvestDate: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call the contract function
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      productId: '',
      batchId: '',
      harvestDate: '',
      location: ''
    });
  };

  return (
    <div>
      <h2 className="mb-4">Create New Product</h2>
      
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                placeholder="Enter unique product ID"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Batch ID</Form.Label>
              <Form.Control
                type="text"
                name="batchId"
                value={formData.batchId}
                onChange={handleChange}
                placeholder="Enter batch ID"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Harvest Date</Form.Label>
              <Form.Control
                type="date"
                name="harvestDate"
                value={formData.harvestDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Create Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      <Alert variant="info" className="mt-3">
        <i className="fas fa-info-circle me-2"></i>
        This will create a new product record on the blockchain with an initial "farm" stage checkpoint.
      </Alert>
    </div>
  );
};

export default ProductForm;