import { fruits } from './data';

export function onRequest(context) {
  const url = new URL(context.request.url);
  const search = url.searchParams.get('search');
  let fruitsToReturn = fruits;

  if (search) {
    fruitsToReturn = fruits.filter((fruit) =>
      fruit.name.toLowerCase().includes(search),
    );
  }

  return new Response(JSON.stringify(fruitsToReturn));
}
