const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wvozktxxihqbzzrisdcu.supabase.co'; // Replace with your Project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2b3prdHh4aWhxYnp6cmlzZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTQwMDMsImV4cCI6MjA2NTk5MDAwM30.Y65-dsEtIRxBs-1Jb2vZ-BadnLry6SUWjU5C3QJfnNA'; // Replace with your anon key

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
