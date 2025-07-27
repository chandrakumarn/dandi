import { verifyApiKey } from '../../../lib/apiKeys';

export async function POST(request) {
  const { apiKey } = await request.json();
  const valid = await verifyApiKey(apiKey);
  return new Response(JSON.stringify({ valid }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 