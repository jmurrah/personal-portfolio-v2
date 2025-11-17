import { SubstackClient } from 'substack-api';

// Public posts only—no apiKey needed.
export const client = new SubstackClient({
  hostname: 'jacobmurrah.substack.com',
  apiKey: 's%3AOCH3MoiBERMZmMWMZW8HzG2PoiEiTNsL.WVUVyjTggXg8%2BSGEGKe1TDNUFidbXp4WRx8YzkZhS2A',
});
