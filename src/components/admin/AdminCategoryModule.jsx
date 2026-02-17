import { useState, useEffect } from 'react';
import { AdminService } from '../../lib/AdminService';

const AdminCategoryModule = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '' });
    const [isEditing, setIsEditing] = useState(false);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await AdminService.fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleOpenModal = (category = { name: '' }) => {
        setCurrentCategory(category);
        setIsEditing(!!category.id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCategory({ name: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await AdminService.updateCategory(currentCategory.id, { name: currentCategory.name });
            } else {
                await AdminService.createCategory({ name: currentCategory.name });
            }
            loadCategories();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error al guardar la categoría.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await AdminService.deleteCategory(id);
                loadCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Error al eliminar. Verifique que no haya productos asociados.");
            }
        }
    };

    return (
        <div className="admin-category-module">
            <header className="admin-view-header">
                <h1>Gestión de Categorías</h1>
                <p>Define las categorías para organizar tu catálogo de productos.</p>
                <button className="btn-primary-admin" onClick={() => handleOpenModal()}>
                    ➕ Nueva Categoría
                </button>
            </header>

            <div className="admin-table-wrapper card">
                {loading ? (
                    <div className="admin-loading">Cargando categorías...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="text-muted">{cat.id.substring(0, 8)}...</td>
                                    <td><strong>{cat.name}</strong></td>
                                    <td>{new Date(cat.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <button className="btn-edit" onClick={() => handleOpenModal(cat)}>Editar</button>
                                            <button className="btn-delete" onClick={() => handleDelete(cat.id)}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal card">
                        <h2>{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre de la Categoría</label>
                                <input
                                    type="text"
                                    value={currentCategory.name}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                    required
                                    placeholder="Ej: Papelería Premium"
                                />
                            </div>
                            <div className="form-footer">
                                <button type="button" className="btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary-admin">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoryModule;
