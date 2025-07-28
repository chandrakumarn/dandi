import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Verify the API key against Supabase
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, label, usage, limit")
      .eq("key", apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { valid: false, message: 'Invalid API key' },
        { status: 200 }
      );
    }

    // Check if usage limit is exceeded
    if (data.limit && data.usage >= data.limit) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'API key usage limit exceeded',
          usage: data.usage,
          limit: data.limit
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: data.id,
        label: data.label,
        usage: data.usage,
        limit: data.limit
      }
    });

  } catch (error) {
    console.error('API key verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('key');
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key parameter is required' },
        { status: 400 }
      );
    }

    // Verify the API key against Supabase
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, label, usage, limit")
      .eq("key", apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { valid: false, message: 'Invalid API key' },
        { status: 200 }
      );
    }

    // Check if usage limit is exceeded
    if (data.limit && data.usage >= data.limit) {
      return NextResponse.json(
        { 
          valid: false, 
          message: 'API key usage limit exceeded',
          usage: data.usage,
          limit: data.limit
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: data.id,
        label: data.label,
        usage: data.usage,
        limit: data.limit
      }
    });

  } catch (error) {
    console.error('API key verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 