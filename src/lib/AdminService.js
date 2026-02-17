import { supabase } from './supabaseClient';

/**
 * AdminService handles CRUD operations and storage for the admin panel.
 */
export const AdminService = {
    /**
     * Fetch all products for the admin list
     */
    /**
     * Category CRUD
     */
    fetchCategories: async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return data;
    },

    createCategory: async (categoryData) => {
        const { data, error } = await supabase
            .from('categories')
            .insert([categoryData])
            .select();

        if (error) throw error;
        return data[0];
    },

    updateCategory: async (id, categoryData) => {
        const { data, error } = await supabase
            .from('categories')
            .update(categoryData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    deleteCategory: async (id) => {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    /**
     * Fetch products with category relationship
     */
    fetchProductsWithCategories: async () => {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                categories (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Product CRUD
     */
    createProduct: async (productData) => {
        const { data, error } = await supabase
            .from('products')
            .insert([productData])
            .select();

        if (error) throw error;
        return data[0];
    },

    updateProduct: async (id, productData) => {
        const { data, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    },

    deleteProduct: async (id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    /**
     * Upload an image to Supabase Storage
     * @param {File} file 
     * @returns {Promise<string>} Public URL of the uploaded image
     */
    uploadProductImage: async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};
