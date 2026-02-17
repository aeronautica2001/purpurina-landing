import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

/**
 * ProtectedRoute envuelve rutas administrativas para asegurar que solo usuarios
 * autenticados puedan acceder.
 */
const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener sesión actual
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="admin-loading">Verificando seguridad...</div>;
    }

    if (!session) {
        // Redirigir al login si no hay sesión
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
