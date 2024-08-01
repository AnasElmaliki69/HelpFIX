import React, { useState, useEffect } from 'react';
import styles from '../styles/Form.module.css';


const UserForm = () => {
  const [formData, setFormData] = useState({
    U_name: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    RoleType: 'admin', // Default role type
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    number: ''
  });

  const [result, setResult] = useState('');
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle address input changes
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check for existing email or username
    const existingUser = userList.find(user => user.email === formData.email || user.U_name === formData.U_name);
    if (existingUser) {
      setError('Email or username already exists');
      return;
    }

    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setResult(JSON.stringify(data, null, 2));
        setSuccess('User created successfully');
        fetchUsers(); // Fetch updated user list after submission
        setTimeout(() => {
          setSuccess('');
          window.location.reload(); // Refresh the page after a short delay
        }, 2000); // Adjust the delay as needed
      })
      .catch(error => {
        setResult(JSON.stringify(error, null, 2));
      });
  };

  // Fetch users
  const fetchUsers = () => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        setUserList(data);
      })
      .catch(error => {
        setResult(JSON.stringify(error, null, 2));
      });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>inscription</h2>



      <form onSubmit={handleSubmit}>
        <label htmlFor="U_name">Username:</label>
        <input type="text" id="U_name" name="U_name" value={formData.U_name} onChange={handleInputChange} required /><br />

        <label htmlFor="nom">Last Name:</label>
        <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} required /><br />

        <label htmlFor="prenom">First Name:</label>
        <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required /><br />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required /><br />

        <label htmlFor="RoleType">Role Type:</label>
        <select id="RoleType" name="RoleType" value={formData.RoleType} onChange={handleInputChange} required>
          <option value="client">Client</option>
          <option value="prestataire">Prestataire</option>
        </select><br />

        <label htmlFor="street">Street:</label>
        <input type="text" id="street" name="street" value={formData.address.street} onChange={handleAddressChange} required /><br />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={formData.address.city} onChange={handleAddressChange} required /><br />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" value={formData.address.state} onChange={handleAddressChange} required /><br />

        <label htmlFor="zip">Zip Code:</label>
        <input type="text" id="zip" name="zip" value={formData.address.zip} onChange={handleAddressChange} required /><br />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={formData.address.country} onChange={handleAddressChange} required /><br />

        <label htmlFor="number">Phone Number:</label>
        <input type="tel" id="number" name="number" value={formData.number} onChange={handleInputChange} required /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
