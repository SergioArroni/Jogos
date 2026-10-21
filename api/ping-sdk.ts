// TEMPORARY diagnostic: imports the MCP SDK.
import { McpServer } from '@modelcontextprotocol/server';
export const GET = () => new Response('sdk ok ' + typeof McpServer);
