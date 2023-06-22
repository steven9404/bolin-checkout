import useFetch from "@/components/hooks/useFetch";
import { ResourceList, ResourceItem, Text, Thumbnail, LegacyCard, Page } from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const productListing = () => {
  const router = useRouter();
  const fetch = useFetch();

  const [rows, setRows] = useState([
    ["Loading", "I haven't implemented swr or react query yet."],
  ]);

  //MARK:- Replace this amazing fetch + state implementation with `swr` or `react-query`.
  async function fetchWebhooks() {
    const res = await fetch("/api/apps/products/getProducts");
    const data = await res.json();
    let rowData = [];
    Object.entries(data.body.data.shop.products.edges).map(
      ([key, value]) => {
        const title = value.node.title;
        const id = value.node.id;
        const imageSrc = value.node.images.edges[0].node.src;
        const imageAlt = value.node.images.edges[0].node.altText;
        rowData.push({title, id, imageSrc, imageAlt});
      }
    );
    setRows(rowData);
  }

  useEffect(() => {
    fetchWebhooks();
  }, []);

  return (
    <>
      <Page
        title="Products"
        backAction={{ content: "Home", onAction: () => router.push("/products") }}
      >
        <LegacyCard>
          <ResourceList
            resourceName={{singular: 'products', plural: 'products'}}
            items={rows}
            renderItem={(item) => {
                const {id, title, imageSrc, imageAlt} = item;
                const media = <Thumbnail source={imageSrc} alt={imageAlt} />;
                return (
                    <ResourceItem
                        id={id}
                        url='#'
                        media={media}
                        accessibilityLabel={`View details for ${title}`}
                    >
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {title}
                        </Text>
                        <div>{id}</div>
                    </ResourceItem>
                );
            }}
          />
        </LegacyCard>
      </Page>
    </>
  );
};

export default productListing;
