import { useState, useEffect } from 'react';
import { AdminService } from '../../lib/AdminService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminProductList from '../../components/admin/AdminProductList';
import AdminProductForm from '../../components/admin/AdminProductForm';
import AdminCategoryModule from '../../components/admin/AdminCategoryModule';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [view, setView] = useState('list'); // 'list', 'create', 'edit', 'categories'
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await AdminService.fetchProductsWithCategories();
            setProducts(data);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (view === 'list') {
            loadProducts();
        }
    }, [view]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setView('edit');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await AdminService.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error al eliminar el producto.");
            }
        }
    };

    const handleActionSuccess = () => {
        setView('list');
        loadProducts();
    };

    return (
        <div className="admin-layer">
            <AdminSidebar activeView={view} setActiveView={setView} />

            <main className="admin-content">
                <div className="admin-top-bar">
                    <div className="admin-breadcrumbs">
                        <span>Admin</span> /
                        <span>{view === 'categories' ? 'Categorías' : 'Productos'}</span>
                        {(view === 'edit' || view === 'create') && <span> / {view === 'edit' ? 'Editar' : 'Nuevo'}</span>}
                    </div>
                    {view === 'list' && (
                        <button className="btn-primary-admin" onClick={() => setView('create')}>
                            ➕ Nuevo Producto
                        </button>
                    )}
                </div>

                {view === 'list' && (
                    <AdminProductList
                        products={products}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        loading={loading}
                    />
                )}

                {view === 'categories' && (
                    <AdminCategoryModule />
                )}

                {view === 'create' && (
                    <AdminProductForm
                        onSuccess={handleActionSuccess}
                        onCancel={() => setView('list')}
                    />
                )}

                {view === 'edit' && (
                    <AdminProductForm
                        productToEdit={selectedProduct}
                        onSuccess={handleActionSuccess}
                        onCancel={() => setView('list')}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
