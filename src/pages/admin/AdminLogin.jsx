import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import './AdminDashboard.css'; // Reutilizar estilos core

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            navigate('/admin');
        } catch (err) {
            setError('Credenciales inválidas o error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-layer" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="admin-modal card" style={{ maxWidth: '400px' }}>
                <header className="admin-view-header" style={{ textAlign: 'center' }}>
                    <h1>Acceso Admin</h1>
                    <p>Ingresa tus credenciales para gestionar Purpurina.</p>
                </header>

                <form className="admin-form" onSubmit={handleLogin} style={{ padding: '0' }}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@purpurina.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary-admin" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Validando...' : 'Iniciar Sesión'}
                    </button>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <a href="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>← Volver al sitio público</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
