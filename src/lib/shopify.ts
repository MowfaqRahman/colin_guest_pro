import { Product, Collection } from "./data";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

export async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  if (!domain || !accessToken) {
    console.error('Shopify Error: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined in .env.local');
    return { data: null };
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
    });

    const result = await response.json();

    if (result.errors) {
      const isUnauthorized = result.errors.some((e: any) => e.extensions?.code === 'UNAUTHORIZED');
      if (isUnauthorized) {
        console.error('Shopify Authorization Failed: Please verify your SHOPIFY_STOREFRONT_ACCESS_TOKEN and ensure the Storefront API is enabled in your Shopify Admin.');
      } else {
        console.error('Shopify API Errors:', JSON.stringify(result.errors, null, 2));
      }
    }
    return result;
  } catch (error: any) {
    console.error('Network Error fetching from Shopify:', error.message);
    return { data: null };
  }
}

export async function getCollectionProducts(handle: string) {
  // First, try fetching by handle
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              teaser: metafield(namespace: "custom", key: "short_description") {
                value
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  let response = await shopifyFetch({
    query,
    variables: { handle },
  });

  // If not found, try to find a collection with a matching title
  if (!response.data?.collection) {
    console.log(`Collection with handle "${handle}" not found, searching by title...`);
    const listQuery = `
      query {
        collections(first: 50) {
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
    const listResponse = await shopifyFetch({ query: listQuery });
    const collections = listResponse.data?.collections?.edges || [];
    const match = collections.find((edge: any) =>
      edge.node.title.toLowerCase() === handle.replace(/-/g, ' ').toLowerCase() ||
      edge.node.handle === handle.toLowerCase().replace(/\s+/g, '-')
    );

    if (match) {
      console.log(`Found matching collection: ${match.node.title} (${match.node.handle})`);
      response = await shopifyFetch({
        query,
        variables: { handle: match.node.handle },
      });
    }
  }

  return response.data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
}

export async function getProductById(id: string) {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        description
        descriptionHtml
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        details: metafield(namespace: "custom", key: "details") {
          value
        }
        sizeGuide: metafield(namespace: "custom", key: "size_guide") {
          value
        }
        washcare: metafield(namespace: "custom", key: "washcare") {
          value
        }
        shipping: metafield(namespace: "custom", key: "shipping") {
          value
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { id },
  });

  return response.data?.product;
}

export async function getAllProducts(): Promise<any[]> {
  const query = `
    query getProducts {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  return response.data?.products?.edges.map((edge: any) => edge.node) || [];
}

export async function getCollection(handle: string) {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  `;

  let response = await shopifyFetch({
    query,
    variables: { handle },
  });

  // If not found by handle, try to find by Title match
  if (!response.data?.collection) {
    const listQuery = `
      query {
        collections(first: 50) {
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
    const listResponse = await shopifyFetch({ query: listQuery });
    const collections = listResponse.data?.collections?.edges || [];
    const match = collections.find((edge: any) =>
      edge.node.title.toLowerCase() === handle.replace(/-/g, ' ').toLowerCase() ||
      edge.node.handle === handle.toLowerCase().replace(/\s+/g, '-')
    );

    if (match) {
      response = await shopifyFetch({
        query,
        variables: { handle: match.node.handle },
      });
    }
  }

  return response.data?.collection;
}


export async function getProductRecommendations(productId: string) {
  const query = `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        title
        handle
        description
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { productId },
  });

  return response.data?.productRecommendations || [];
}

export async function getProductsByIds(ids: string[]) {
  const query = `
    query getProducts($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          title
          handle
          description
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { ids },
  });

  return (response.data?.nodes || []).filter((node: any) => node !== null);
}

export async function customerLogin(email: string, password: string) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  return response.data?.customerAccessTokenCreate;
}

export async function getCustomer(accessToken: string) {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: {
      customerAccessToken: accessToken,
    },
  });

  return response.data?.customer;
}

export async function customerCreate(input: any) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { input },
  });

  return response.data?.customerCreate;
}

export async function customerRecover(email: string) {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { email },
  });

  return response.data?.customerRecover;
}

export async function getAllCollections(): Promise<Collection[]> {
  const query = `
    query getCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  return response.data?.collections?.edges.map((edge: any) => edge.node) || [];
}

export async function searchProducts(searchTerm: string): Promise<any[]> {
  const query = `
    query searchProducts($searchTerm: String!) {
      products(first: 10, query: $searchTerm) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { searchTerm },
  });

  return response.data?.products?.edges.map((edge: any) => ({
    ...edge.node,
    images: edge.node.images?.edges.map((e: any) => e.node) || []
  })) || [];
}
