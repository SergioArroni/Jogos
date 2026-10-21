// TEMPORARY diagnostic: imports shared code from src/domain.
import { nicknameSuggestion } from '../src/domain/text';
export const GET = () => new Response('domain ok ' + nicknameSuggestion('Tío Juan'));
