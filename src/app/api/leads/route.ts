import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.phoneNumber || !body.studyField || !body.degreeLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get credentials from environment variables
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY  || '').replace(/\\n/g, '\n'),
    };

    if (!credentials.client_email || !credentials.private_key) {
      return NextResponse.json(
        { error: 'Server configuration error - missing Google Sheets credentials' },
        { status: 500 }
      );
    }

    // Validate private key format
    if (!credentials.private_key.includes('-----BEGIN PRIVATE KEY-----')) {
      return NextResponse.json(
        { error: 'Server configuration error - invalid private key format' },
        { status: 500 }
      );
    }

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

    await sheetsService.appendRow(leadData);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Provide more specific error messages
    let errorMessage = 'Failed to save lead';
    if (error instanceof Error) {
      if (error.message.includes('DECODER routines::unsupported')) {
        errorMessage = 'Authentication error - please check Google Sheets credentials';
      } else if (error.message.includes('Invalid private key format')) {
        errorMessage = 'Configuration error - invalid private key format';
      } else if (error.message.includes('Private key is missing')) {
        errorMessage = 'Configuration error - missing private key';
      } else if (error.message.includes('Request had insufficient authentication scopes')) {
        errorMessage = 'Access denied - check Google Sheets permissions';
      } else if (error.message.includes('The caller does not have permission')) {
        errorMessage = 'Access denied - service account needs edit permissions on the sheet';
      } else if (error.message.includes('Unable to parse private key')) {
        errorMessage = 'Configuration error - invalid private key format';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 