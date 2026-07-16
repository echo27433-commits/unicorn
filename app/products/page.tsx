import ProductsPageClient from "./pageClient";

export const metadata = {
  title: "Products · unicorn",
  description:
    "Echo by Unicorn is an AI powered customer engagement platform. Loyalty, omnichannel messaging, and conversational AI in one ecosystem.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
