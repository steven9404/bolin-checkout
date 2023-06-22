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
            metafield(key: "store_product_id") {
              key
              value
            }
            metafield(key: "model_number") {
              key
              value
            }
            metafield(key: "short_description") {
              key
              value
            }
          }
        }
    }`,
  });

  res.status(200).send(JSON.stringify(response));
};

export default withMiddleware("verifyProxy")(handler);
