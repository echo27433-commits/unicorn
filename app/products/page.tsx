import DeferredNewsletterCover from "../components/DeferredNewsletterCover";
import ProductsHeader from "../components/ProductsHeader";
import ProductsPageClient from "./pageClient";

export const metadata = {
  title: "Products",
  description:
    "Echo by unicorn is an enterprise AI customer engagement platform — loyalty, omnichannel messaging, and conversational AI in one system for digital transformation at scale.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <ProductsHeader />
      <ProductsPageClient />
      <DeferredNewsletterCover />
    </div>
  );
}
