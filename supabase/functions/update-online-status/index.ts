import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  sessionId: string;
  userAgent?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { sessionId, userAgent }: RequestBody = await req.json();

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update or insert online user session
    const { error: upsertError } = await supabaseClient
      .from('online_users')
      .upsert({
        session_id: sessionId,
        user_agent: userAgent,
        last_seen: new Date().toISOString(),
      }, {
        onConflict: 'session_id'
      });

    if (upsertError) {
      console.error('Error upserting online user:', upsertError);
      throw upsertError;
    }

    // Clean up old sessions (older than 2 minutes)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { error: cleanupError } = await supabaseClient
      .from('online_users')
      .delete()
      .lt('last_seen', twoMinutesAgo);

    if (cleanupError) {
      console.error('Error cleaning up old sessions:', cleanupError);
    }

    // Get current online users count
    const { data: onlineUsersData, error: countError } = await supabaseClient
      .from('online_users')
      .select('id', { count: 'exact' });

    if (countError) {
      console.error('Error counting online users:', countError);
      throw countError;
    }

    const onlineUsers = onlineUsersData?.length || 1;

    return new Response(
      JSON.stringify({ 
        success: true, 
        onlineUsers,
        sessionId 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in update-online-status function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});