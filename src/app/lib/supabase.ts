import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL = 'https://yrvvkxhrqjuwfjvkkxbl.supabase.co')
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY = 'sb_publishable_grpYAXDjeprZ9niKlh8l7A_Q9MvAabx')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
