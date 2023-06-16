// If you have the recommended extension installed, create a new page and type `createwebhook` to generate webhook boilerplate

const productsCreateHandler = async (topic, shop, webhookRequestBody) => {
  try {
    const webhookBody = JSON.parse(webhookRequestBody);
    console.log('product create handler',webhookBody);
  } catch (e) {
    console.log(e);
  }
};

export default productsCreateHandler;
