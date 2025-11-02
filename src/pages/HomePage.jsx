import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login', { replace: true });
        return;
      }

      if (mounted) {
        setUser(session.user);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login', { replace: true });
      } else {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1>Hola, {user?.user_metadata?.full_name || user?.email}</h1>
        <button type="button" className="button button--secondary" onClick={handleSignOut}>
          Cerrar sesión
        </button>
      </header>
      <section className="home__content">
        <p>
          Aquí podrás administrar tu colección de camisetas, registrar nuevos ingresos y mantener
          todo sincronizado gracias a Supabase.
        </p>
        <p>
          Usa esta pantalla como punto de partida para tu dashboard personalizado. Puedes consultar
          tablas, cargar imágenes y más utilizando los SDKs de Supabase.
        </p>
      </section>
    </div>
  );
}
