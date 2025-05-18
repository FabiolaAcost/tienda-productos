import React, { useState } from 'react';
import SimpleValidator from 'simple-react-validator';
import { registerUser, loginUser } from '../firebase/authService';
import { saveFormData } from '../firebase/firestoreService';

const Formulario = () => {
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validator] = useState(new SimpleValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      email: 'Debe ingresar un correo electrónico válido.',
      min: 'La contraseña debe tener al menos 6 caracteres.'
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const action = e.nativeEvent.submitter.value; // Detecta qué botón presionaste

    if (validator.allValid()) {
      setIsSubmitting(true);
      try {
        if (action === 'register') {
          const userCredential = await registerUser(formData.correo, formData.contraseña);
          await saveFormData({ correo: formData.correo });
          alert(`Usuario ${userCredential.user.email} registrado con éxito.`);
        } else if (action === 'login') {
          const userCredential = await loginUser(formData.correo, formData.contraseña);
          alert(`Usuario ${userCredential.user.email} ha iniciado sesión.`);
        }
        setFormData({ correo: '', contraseña: '' });
      } catch (error) {
        setErrorMsg(error.message);
      }
      setIsSubmitting(false);
    } else {
      validator.showMessages();
      setFormData({ ...formData });
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3>Registro e Inicio de Sesión</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo:</label>
          <input
            type="email"
            name="correo"
            id="correo"
            className="form-control"
            value={formData.correo}
            onChange={handleChange}
          />
          <div className="text-danger small">
            {validator.message('correo', formData.correo, 'required|email')}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            id="contraseña"
            className="form-control"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <div className="text-danger small">
            {validator.message('contraseña', formData.contraseña, 'required|min:6')}
          </div>
        </div>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <button
          type="submit"
          name="action"
          value="register"
          className="btn btn-primary me-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : 'Registrar'}
        </button>

        <button
          type="submit"
          name="action"
          value="login"
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Procesando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
