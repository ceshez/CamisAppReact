import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';
import AuthForm from '../components/forms/AuthForm.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async ({ email, password }) => {
    setError('');
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        throw signInError;
      }
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message ?? 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Bienvenido de nuevo"
      subtitle="Accede a tu colección de camisetas favoritas"
      submitLabel={loading ? 'Accediendo…' : 'Iniciar sesión'}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      footer={{
        text: '¿Aún no tienes una cuenta?',
        linkText: 'Crea una aquí',
        linkTo: '/registro',
      }}
    />
  );
}
