import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const handler = async (req, res) => {
  //false for offline session, true for online session
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

  res.status(200).send(response);
};

export default withMiddleware("verifyRequest")(handler);
