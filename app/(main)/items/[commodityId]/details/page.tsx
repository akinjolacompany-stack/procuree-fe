import ItemDetailsPage from "../../details/page";

type EditItemDetailsPageProps = {
  params: Promise<{ commodityId: string }>;
};

export default async function EditItemDetailsPage(
  _props: EditItemDetailsPageProps,
) {
  return <ItemDetailsPage />;
}
