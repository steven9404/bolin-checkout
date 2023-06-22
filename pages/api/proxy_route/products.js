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
              first: 3
              keys: ["product_list.store_product_id", "product_list.short_description", "product_list.model_number"]
            ) {
              nodes {
                key
                value
              }
            }
          }
        }
      }`,
  });

  res.status(200).send(JSON.stringify(response));
};

export default withMiddleware("verifyProxy")(handler);
