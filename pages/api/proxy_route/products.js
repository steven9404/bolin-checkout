// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });

  const response = await client.query({
    data: `{
        products(first: 39) {
          nodes {
            id
            title
            tags
            images(first: 10) {
              nodes {
                url
                altText
              }
            }
            metafields(
              first: 5
              keys: ["custom.store_product_id", "custom.short_description", "custom.model_number"]
            ) {
              edges {
                node {
                  key
                  value
                  namespace
                }
              }
            }
          }
        }
      }`,
  });

  res.status(200).send(JSON.stringify(response));
};

export default withMiddleware("verifyProxy")(handler);
