
const domain = "colinguest-2.myshopify.com";
const accessToken = "6307afedf86bc9e6d2aef06ae6844d38a0";

async function testShopify(headerName) {
  console.log(`Testing header: ${headerName}`);
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
        [headerName]: accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(`Header ${headerName} response:`, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log(`Header ${headerName} failed:`, e.message);
  }
}

async function run() {
  await testShopify('X-Shopify-Storefront-Access-Token');
  await testShopify('X-Shopify-Access-Token');
  await testShopify('Authorization');
}

run();
