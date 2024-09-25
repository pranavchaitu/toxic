import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY as string;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';


interface AnalyzeResponse {
  data: {
    attributeScores: {
      [key: string]: {
        summaryScore: {
          value: number;
        };
      };
    };
  };
}

async function CheckFor(str: string): Promise<number | undefined> {
  try {
    const client: any = await google.discoverAPI(DISCOVERY_URL);
    
    const analyzeRequest = {
      comment: {
        text: str,
      },
      requestedAttributes: {
        TOXICITY: {},
      },
    };

    return new Promise<number | undefined>((resolve, reject) => {
      client.comments.analyze(
        {
          key: API_KEY,
          resource: analyzeRequest,
        },
        (err: any, response: AnalyzeResponse) => {
          if (err) {
            console.error('Error:', err);
            reject(err);
          } else {
            const toxicityScore = response.data.attributeScores?.TOXICITY?.summaryScore?.value;
            resolve(toxicityScore);
          }
        }
      );
    });
  } catch (err) {
    console.error('Error:', err);
    return undefined;
  }
}

// Test the function
// CheckFor("like you").then(data => console.log('Toxicity Score:', data));

