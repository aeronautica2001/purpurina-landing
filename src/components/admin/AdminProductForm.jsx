import { useState, useEffect } from 'react';
import { AdminService } from '../../lib/AdminService';

const AdminProductForm = ({ productToEdit, onSuccess, onCancel }) => {
    const isEditing = !!productToEdit;
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(productToEdit?.image_url || null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category_id: '', // Corregido: Usar category_id para el esquema de Supabase
        description: '',
        featured: false,
        stock: 0,
        active: true
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await AdminService.fetchCategories();
                setCategories(data);
                if (!isEditing && data.length > 0) {
                    setFormData(prev => ({ ...prev, category_id: data[0].id }));
                }
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        loadCategories();

        if (productToEdit) {
            setFormData({
                name: productToEdit.name || '',
                price: productToEdit.price || '',
                category_id: productToEdit.category_id || '', // UUID
                description: productToEdit.description || '',
                featured: productToEdit.featured || false,
                stock: productToEdit.stock || 0,
                active: productToEdit.active !== undefined ? productToEdit.active : true
            });
            setImagePreview(productToEdit.image_url);
        }
    }, [productToEdit, isEditing]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDACIÓN PREVIA ---
        if (!formData.name.trim()) {
            alert("El nombre del producto es obligatorio.");
            return;
        }
        if (!formData.price || formData.price <= 0) {
            alert("El precio debe ser un valor válido mayor a 0.");
            return;
        }

        setLoading(true);

        try {
            let image_url = imagePreview;

            // Upload new image if selected
            if (imageFile) {
                image_url = await AdminService.uploadProductImage(imageFile);
            }

            // --- CONSTRUCCIÓN DEL PAYLOAD (SEGÚN REQUERIMIENTO) ---
            const payload = {
                name: formData.name,
                description: formData.description || "",
                price: Number(formData.price),
                category_id: formData.category_id || null, // UUID string or null
                image_url: image_url || "",
                stock: Number(formData.stock || 0),
                featured: Boolean(formData.featured),
                active: true // Forzado a true según requerimiento para nuevos/editados
            };

            // --- DEPURACIÓN TEMPORAL ---
            console.log("INSERT PAYLOAD:", payload);

            if (isEditing) {
                await AdminService.updateProduct(productToEdit.id, payload);
            } else {
                await AdminService.createProduct(payload);
            }

            onSuccess();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error al guardar el producto. Revisa la consola para detalles técnicos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-form-container">
            <header className="admin-view-header">
                <h1>{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h1>
                <p>{isEditing ? 'Actualiza los detalles del producto seleccionado.' : 'Completa los campos para añadir un producto al catálogo.'}</p>
            </header>

            <form className="admin-form card" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-main">
                        <div className="form-group">
                            <label>Nombre del Producto *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ej: Notebook Floral Premium"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Precio (COP) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="25000"
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoría</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Seleccionar categoría</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Stock Inicial</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>Estado del Producto</label>
                                <div className="toggle-group">
                                    <label className="switch-label">
                                        <input
                                            type="checkbox"
                                            name="active"
                                            checked={formData.active}
                                            onChange={handleChange}
                                        />
                                        <span className="slider"></span>
                                        {formData.active ? 'Activo (Visible en tienda)' : 'Inactivo'}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Escribe una breve descripción del producto..."
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="switch-label">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                <span className="slider"></span>
                                Producto Destacado
                            </label>
                        </div>
                    </div>

                    <div className="form-sidebar">
                        <div className="form-group">
                            <label>Imagen del Producto</label>
                            <div className="image-upload-box">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="preview-img" />
                                ) : (
                                    <div className="upload-placeholder">
                                        <span>📸</span>
                                        <p>No hay imagen</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="img-input"
                                    className="hidden-input"
                                />
                                <label htmlFor="img-input" className="btn-upload">
                                    {imagePreview ? 'Cambiar Imagen' : 'Subir Imagen'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
                    <button type="submit" className="btn-primary-admin" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
