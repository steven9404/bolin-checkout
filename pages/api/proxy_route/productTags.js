// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });

  const response = await client.query({
    data: `{
        shop {
          productTags(first: 250) {
            pageInfo {
              hasNextPage
            }
            edges {
              node
              cursor
            }
          }
        }
    }`,
  });

  res.status(200).send(JSON.stringify(response));
};

export default withMiddleware("verifyProxy")(handler);
