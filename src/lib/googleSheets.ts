import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface LeadData {
  timestamp: string;
  phoneNumber: string;
  studyField: string;
  degreeLevel: string;
  preferredCountries: string;
  budget: string;
  matchedPrograms: string;
  matchScore: string;
}

function cleanPrivateKey(key: string): string {
  // Handle different key formats
  let cleanKey = key.trim();
  
  // Convert literal \n to actual newlines
  cleanKey = cleanKey.replace(/\\n/g, '\n');
  
  // If the key is already properly formatted, return as is
  if (cleanKey.includes('-----BEGIN PRIVATE KEY-----') && cleanKey.includes('-----END PRIVATE KEY-----')) {
    return cleanKey;
  }
  
  // Remove any existing prefix/suffix and whitespace
  cleanKey = cleanKey
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '');

  // Split into 64-character chunks and add proper formatting
  const chunks = cleanKey.match(/.{1,64}/g) || [];
  const formattedKey = chunks.join('\n');
  
  return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
}

export class GoogleSheetsService {
  private auth: JWT;
  public sheets: any;
  private spreadsheetId: string;
  private sheetName: string;

  constructor(credentials: any) {
    if (!credentials.private_key) {
      throw new Error('Private key is missing');
    }
    
    if (!credentials.client_email) {
      throw new Error('Client email is missing');
    }

    const privateKey = cleanPrivateKey(credentials.private_key);

    // Validate the private key format
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || !privateKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('Invalid private key format');
    }

    this.auth = new JWT({
      email: credentials.client_email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.spreadsheetId = '17RYpnhh_1CR4JEhMULPZAv2WcXCf_DBPjgx7c8e_YF8';
    this.sheetName = 'Sheet1';
  }

  async appendRow(data: LeadData) {
    const row = [
      data.timestamp,
      data.phoneNumber,
      data.studyField,
      data.degreeLevel,
      data.preferredCountries,
      data.budget,
      data.matchedPrograms,
      data.matchScore
    ];

    const result = await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A:H`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [row]
      }
    });

    return true;
  }
} 