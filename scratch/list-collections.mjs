
const domain = "colinguest-2.myshopify.com";
const accessToken = "6307afedf86bc9e6d2aef06ae6844d38a0";

async function listCollections() {
  const query = `
    query {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Fetch failed:', e.message);
  }
}

listCollections();
