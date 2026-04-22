
const domain = "colinguest-2.myshopify.com";
const accessToken = "6307afedf86bc9e6d2aef06ae6844d38a0";

async function testShopify(version) {
  console.log(`Testing version: ${version}`);
  const query = `
    query {
      shop {
        name
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(`Version ${version} response:`, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log(`Version ${version} failed:`, e.message);
  }
}

async function run() {
  await testShopify('2024-01');
  await testShopify('2024-04');
  await testShopify('2024-07');
  await testShopify('2024-10');
  await testShopify('2025-01');
  await testShopify('unstable');
}

run();
