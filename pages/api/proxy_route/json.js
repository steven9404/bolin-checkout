// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
  const { client } = await clientProvider.graphqlClient({
    req,
    res,
    isOnline: true,
  });

  const response = await client.query({
  data: `{
      shop {
          products(first: 50) {
              edges {
                  node {
                      id
                      title
                      images(first: 1) {
                          edges {
                              node {
                                  src
                                  altText
                              }
                          }
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
