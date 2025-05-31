import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('API route called with body:', body);
    
    // Use 127.0.0.1 instead of localhost for better compatibility
    const backendUrl = 'http://127.0.0.1:5000/api/auth/login';
    console.log('Attempting to connect to:', backendUrl);
    
    // Forward the request to the backend server
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    console.log('Backend response status:', backendResponse.status);
    
    const data = await backendResponse.json();
    console.log('Backend response data:', data);
    
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: backendResponse.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}