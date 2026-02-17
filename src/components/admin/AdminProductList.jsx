import { formatCOP } from '../../utils/formatCurrency';

const AdminProductList = ({ products, onEdit, onDelete, loading }) => {
    if (loading) return <div className="admin-loading">Cargando catálogo...</div>;

    return (
        <div className="admin-product-list">
            <header className="admin-view-header">
                <div className="header-text">
                    <h1>Gestión de Catálogo</h1>
                    <p>Administra tus productos, stock y visibilidad en la tienda.</p>
                </div>
            </header>

            <div className="admin-table-wrapper card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className="admin-thumb">
                                        <img src={product.image_url || '/assets/icons/notebook.svg'} alt="" />
                                    </div>
                                </td>
                                <td>
                                    <div className="admin-prod-name">
                                        <strong>{product.name}</strong>
                                        {product.featured && <span className="tag-featured">🏠 Destacado</span>}
                                    </div>
                                </td>
                                <td><span className="tag-category">{product.category}</span></td>
                                <td><strong>{formatCOP(product.price)}</strong></td>
                                <td>
                                    <span className={`stock-badge ${product.stock <= 5 ? 'critical' : ''}`}>
                                        {product.stock || 0} unid.
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-dot ${product.active ? 'active' : 'inactive'}`}></span>
                                    {product.active ? 'Activo' : 'Oculto'}
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button className="btn-edit" onClick={() => onEdit(product)}>Editar</button>
                                        <button className="btn-delete" onClick={() => onDelete(product.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductList;
