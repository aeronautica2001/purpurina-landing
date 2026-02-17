import '../../pages/admin/AdminDashboard.css';

const AdminSidebar = ({ activeView, setActiveView }) => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h2>Purpurina</h2>
                <span className="admin-badge">Admin</span>
            </div>

            <nav className="admin-nav">
                <button
                    className={`admin-nav-item ${activeView === 'list' || activeView === 'edit' || activeView === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveView('list')}
                >
                    <span className="nav-icon">📦</span> Productos
                </button>
                <button
                    className={`admin-nav-item ${activeView === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveView('categories')}
                >
                    <span className="nav-icon">🏷️</span> Categorías
                </button>
            </nav>

            <div className="admin-sidebar-footer">
                <a href="/" className="back-to-site">← Volver al sitio</a>
            </div>
        </aside>
    );
};

export default AdminSidebar;
