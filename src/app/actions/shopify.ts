"use server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function adminAddAddress(email: string, address: any) {
  if (!domain || !adminToken) {
    return { success: false, error: "Shopify Admin API is not configured. Please add SHOPIFY_ADMIN_ACCESS_TOKEN to .env.local" };
  }

  try {
    // 1. Find customer ID by email
    const findQuery = `
      query {
        customers(first: 1, query: "email:${email}") {
          edges {
            node {
              id
            }
          }
        }
      }
    `;

    const findResponse = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query: findQuery }),
    });

    const findData = await findResponse.json();
    const customerId = findData.data?.customers?.edges[0]?.node?.id;

    if (!customerId) {
      return { success: false, error: "Shopify customer not found for this email." };
    }

    // 2. Add address to customer
    const addQuery = `
      mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
            addresses {
              id
              address1
              city
              country
              zip
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const addResponse = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        query: addQuery,
        variables: {
          input: {
            id: customerId,
            addresses: [address]
          }
        }
      }),
    });

    const addData = await addResponse.json();
    if (addData.data?.customerUpdate?.userErrors?.length > 0) {
      return { success: false, error: addData.data.customerUpdate.userErrors[0].message };
    }

    return { 
      success: true, 
      address: addData.data?.customerUpdate?.customer?.addresses?.slice(-1)[0] 
    };

  } catch (error) {
    console.error("Admin API error:", error);
    return { success: false, error: "Internal server error connecting to Shopify Admin." };
  }
}
