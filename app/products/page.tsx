import ProductsPageClient from "./pageClient";

export const metadata = {
  title: "Products · unicorn",
  description:
    "Echo — Unicorn’s AI-powered customer engagement platform. Loyalty, omnichannel messaging, and conversational AI in one ecosystem.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
