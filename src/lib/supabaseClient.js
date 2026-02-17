import { createClient } from '@supabase/supabase-js';

// Usar variables de entorno para seguridad en producción
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://phhrdmplrfuhyxxrbrat.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_poDmUjrVdVgQbGBIeaGVDw_Of5D3yDK';

export const supabase = createClient(supabaseUrl, supabaseKey);
