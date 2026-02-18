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
            category_id: p.category_id,
            categoria: p.categories?.name || '', // Mapear nombre desde join
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
     * Get all products filtered by category ID
     */
    getProductsByCategory: async (categoryId) => {
        if (!categoryId) {
            console.warn("CatalogService: categoryId is undefined or null. Aborting fetch.");
            return [];
        }

        console.log("CatalogService: Fetching products for category_id:", categoryId);

        try {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name)')
                .eq('category_id', categoryId);

            if (error) throw error;
            console.log(`CatalogService: Found ${data?.length || 0} products for category_id: ${categoryId}`);
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
                .select('*, categories(name)')
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
    getRelatedProducts: async (categoryId, currentId, limit = 4) => {
        if (!categoryId) {
            console.warn("CatalogService: categoryId for related products is undefined. Aborting.");
            return [];
        }

        console.log("CatalogService: Fetching related products for category_id:", categoryId);

        try {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name)')
                .eq('category_id', categoryId)
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
