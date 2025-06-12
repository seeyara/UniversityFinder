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
  // Ensure the key has the correct format
  const prefix = '-----BEGIN PRIVATE KEY-----\n';
  const suffix = '\n-----END PRIVATE KEY-----\n';
  
  // Remove any existing prefix/suffix and whitespace
  let cleanKey = key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\\n/g, '')
    .replace(/\s/g, '');

  // Add prefix and suffix back with proper formatting
  return prefix + cleanKey.match(/.{1,64}/g)?.join('\n') + suffix;
}

export class GoogleSheetsService {
  private auth: JWT;
  private sheets: any;
  private spreadsheetId: string;
  private sheetName: string;

  constructor(credentials: any) {
    try {
      console.log('Initializing Google Sheets service...');
      
      const privateKey = cleanPrivateKey(credentials.private_key);
      console.log('Private key processed, length:', privateKey.length);

      this.auth = new JWT({
        email: credentials.client_email,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      this.spreadsheetId = '17RYpnhh_1CR4JEhMULPZAv2WcXCf_DBPjgx7c8e_YF8';
      this.sheetName = 'Sheet1';

      console.log('Google Sheets service initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Sheets service:', {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : error
      });
      throw error;
    }
  }

  async appendRow(data: LeadData) {
    try {
      console.log('Preparing row data for Google Sheets...');
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

      console.log('Attempting to append row to Google Sheets...');
      const result = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:H`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [row]
        }
      });

      console.log('Successfully appended row to Google Sheets:', {
        updatedRange: result.data.updates?.updatedRange,
        updatedRows: result.data.updates?.updatedRows
      });

      return true;
    } catch (error) {
      console.error('Detailed error in Google Sheets append:', {
        error: error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          name: error.name
        } : error,
        spreadsheetId: this.spreadsheetId,
        sheetName: this.sheetName
      });
      throw error;
    }
  }
} 