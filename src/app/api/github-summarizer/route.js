import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { summarizeGithubReadme } from '../../../lib/chain';

export async function POST(request) {
  try {
    const { githuburl } = await request.json();
    const apiKey = request.headers.get('x-api-key');
    if (!githuburl) {
      return NextResponse.json(
        { error: 'githuburl  is required' },
        { status: 400 }
      );
    }
    if (!apiKey) {
      return NextResponse.json(
        { error: 'x-api-key header is required' },
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

    const readmecontent = await getGithubReadme(githuburl);
    console.log(readmecontent);

    // Summarize the README content
    let summary = null;
    if (readmecontent) {
      try {
        summary = await summarizeGithubReadme(readmecontent);
      } catch (error) {
        console.error('Summarization error:', error);
      }
    }

    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: data.id,
        label: data.label,
        usage: data.usage,
        limit: data.limit
      },
      service: 'github-summarizer',
      status: 'ready',
      summary: summary?.summary || null,
      cool_facts: summary?.cool_facts || []
    });

  } catch (error) {
    console.error('GitHub summarizer API error:', error);
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
    const githuburl = searchParams.get('githuburl');
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key parameter is required' },
        { status: 400 }
      );
    }

    if (!githuburl) {
      return NextResponse.json(
        { error: 'githuburl parameter is required' },
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

    const readmecontent = await getGithubReadme(githuburl);
    console.log(readmecontent);

    // Summarize the README content
    let summary = null;
    if (readmecontent) {
      try {
        summary = await summarizeGithubReadme(readmecontent);
      } catch (error) {
        console.error('Summarization error:', error);
      }
    }

    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: data.id,
        label: data.label,
        usage: data.usage,
        limit: data.limit
      },
      service: 'github-summarizer',
      status: 'ready',
      summary: summary?.summary || null,
      cool_facts: summary?.cool_facts || []
    });

  } catch (error) {
    console.error('GitHub summarizer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 

/**
 * Fetches the README.md file from a given GitHub repository URL.
 * Supports both https://github.com/user/repo and https://github.com/user/repo/ URLs.
 * Returns the README content as a string, or null if not found.
 * 
 * @param {string} githubUrl - The URL of the GitHub repository.
 * @returns {Promise<string|null>} - The README.md content or null if not found.
 */
async function getGithubReadme(githubUrl) {
  try {
    // Extract owner and repo from the URL
    // Example: https://github.com/user/repo
    const match = githubUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/);
    if (!match) return null;
    const owner = match[1];
    const repo = match[2];

    // Try to fetch README from main branch, then master if not found
    const branches = ['main', 'master'];
    for (const branch of branches) {
      // Try both README.md and README.MD (case-insensitive)
      const readmePaths = ['README.md', 'README.MD', 'readme.md', 'Readme.md'];
      for (const readmeFile of readmePaths) {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${readmeFile}`;
        const res = await fetch(rawUrl);
        if (res.ok) {
          const text = await res.text();
          // Check if not a 404 HTML page
          if (!text.startsWith('<!DOCTYPE html>')) {
            return text;
          }
        }
      }
    }
    return null;
  } catch (err) {
    console.error('Error fetching GitHub README:', err);
    return null;
  }
}



