import { supabase } from '../lib/supabaseClient';

/**
 * CatalogService handles data retrieval for the product catalog.
 * Now integrated with Supabase for dynamic data sourcing.
 */
export const CatalogService = {
    /**
     * Map Supabase data to local component expected format
     */
    mapProduct: (p) => {
        if (!p) return null;
        return {
            id: p.id,
            categoria: p.category,
            nombre: p.name,
            name: p.name, // Support both for compatibility
            precio_raw: p.price || 0, // Keep raw number
            price: p.price || 0,       // Keep raw number
            imagen: p.image_url || '/assets/icons/notebook.svg',
            imagenes: p.image_url ? [p.image_url] : [],
            descripcion: p.description || '',
            caracteristicas: p.caracteristicas || [], // Fallback if column exists or empty
            disponibilidad: p.disponibilidad || 'Disponible',
            badge: p.featured ? 'Destacado' : null
        };
    },

    /**
     * Get all products filtered by category
     */
    getProductsByCategory: async (category) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category);

            if (error) throw error;
            return (data || []).map(CatalogService.mapProduct);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            return [];
        }
    },

    /**
     * Get a single product by ID
     */
    getProductById: async (id) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return CatalogService.mapProduct(data);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            return null;
        }
    },

    /**
     * Get related products from the same category
     */
    getRelatedProducts: async (category, currentId, limit = 4) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .neq('id', currentId)
                .limit(limit);

            if (error) throw error;
            return (data || []).map(CatalogService.mapProduct);
        } catch (error) {
            console.error("Error fetching related products:", error);
            return [];
        }
    },
    /**
     * Get all categories for navigation
     */
    getCategories: async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    }
};
