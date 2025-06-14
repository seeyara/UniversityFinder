import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    console.log('Starting lead submission process...');
    const body = await request.json();
    
    // Validate required fields
    if (!body.phoneNumber || !body.studyField || !body.degreeLevel) {
      console.error('Missing required fields:', { phoneNumber: !!body.phoneNumber, studyField: !!body.studyField, degreeLevel: !!body.degreeLevel });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY || '',
    };

    // Debug environment variables (don't log full private key)
    console.log('Environment variables check:', { 
      hasClientEmail: !!credentials.client_email,
      clientEmailLength: credentials.client_email?.length || 0,
      hasPrivateKey: !!credentials.private_key,
      privateKeyLength: credentials.private_key?.length || 0,
    });

    if (!credentials.client_email || !credentials.private_key) {
      console.error('Missing credentials:', { 
        hasClientEmail: !!credentials.client_email,
        hasPrivateKey: !!credentials.private_key 
      });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Initializing Google Sheets service...');
    const sheetsService = new GoogleSheetsService(credentials);

    // Format the data
    const leadData = {
      timestamp: new Date().toISOString(),
      phoneNumber: body.phoneNumber,
      studyField: body.studyField,
      degreeLevel: body.degreeLevel,
      preferredCountries: Array.isArray(body.regions) ? body.regions.join(', ') : body.regions,
      budget: body.budget,
      matchedPrograms: Array.isArray(body.matchedPrograms) 
        ? body.matchedPrograms.map((p: any) => p['Abroad University']).join(', ')
        : '',
      matchScore: body.matchScore || ''
    };

    console.log('Attempting to append row with data:', {
      timestamp: leadData.timestamp,
      phoneNumber: leadData.phoneNumber,
      // Log other fields but mask sensitive data
    });

    await sheetsService.appendRow(leadData);
    console.log('Successfully appended row to Google Sheets');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Detailed error in lead submission:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    });
    
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
} 