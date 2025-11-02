import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  footer,
  loading = false,
  error = '',
  showNameField = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="card">
      <header className="card__header">
        <h2 className="card__title">{title}</h2>
        <p className="card__subtitle">{subtitle}</p>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        {showNameField && (
          <label className="form__group">
            <span className="form__label">Nombre completo</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej. Mario Vargas"
              required
            />
          </label>
        )}
        <label className="form__group">
          <span className="form__label">Correo electrónico</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu-correo@ejemplo.com"
            required
          />
        </label>
        <label className="form__group">
          <span className="form__label">Contraseña</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </label>
        {error && <p className="form__error">{error}</p>}
        <button type="submit" className="button" disabled={loading}>
          {submitLabel}
        </button>
      </form>
      {footer && (
        <footer className="card__footer">
          <span>{footer.text}</span>{' '}
          <Link to={footer.linkTo} className="link">
            {footer.linkText}
          </Link>
        </footer>
      )}
    </div>
  );
}
