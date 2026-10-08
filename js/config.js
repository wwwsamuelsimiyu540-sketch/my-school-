const SUPABASE_URL = "https://cybnnkkqevfvozqkpbud.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5Ym5ua2txZXZmdm96cWtwYnVkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ0NDM4MCwiZXhwIjoyMTA3MDIwMzgwfQ.nLPbDI7qkdnt927y4KoJTqCTjrYgOcq1RodHOj2xRlQ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
);
