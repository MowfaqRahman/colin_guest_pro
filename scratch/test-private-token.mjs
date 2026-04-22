
const domain = "colinguest-2.myshopify.com";
const accessToken = "6307afedf86bc9e6d2aef06ae6844d38a0";

async function testPrivateToken() {
  const query = `
    query {
      shop {
        name
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Shopify-Storefront-Private-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log('Private Token response:', JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Private Token failed:', e.message);
  }
}

testPrivateToken();
