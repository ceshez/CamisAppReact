import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';
import AuthForm from '../components/forms/AuthForm.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async ({ name, email, password }) => {
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user?.identities?.length === 0) {
        setSuccessMessage('Tu correo ya estaba registrado. Intenta iniciar sesión.');
      } else {
        setSuccessMessage(
          'Cuenta creada correctamente. Revisa tu bandeja de entrada para confirmar el correo.',
        );
      }
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message ?? 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthForm
        title="Crea tu cuenta"
        subtitle="Regístrate para comenzar a gestionar tu inventario de camisetas"
        submitLabel={loading ? 'Creando cuenta…' : 'Registrarme'}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        showNameField
        footer={{
          text: '¿Ya tienes una cuenta?',
          linkText: 'Inicia sesión',
          linkTo: '/login',
        }}
      />
      {successMessage && <p className="form__success">{successMessage}</p>}
    </>
  );
}
