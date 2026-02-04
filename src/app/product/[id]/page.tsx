import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ProductDetailClient } from '@/components/product-detail-client';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        
        <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="secondary">{product.sport}</Badge>
                <Badge variant="secondary">{product.brand}</Badge>
            </div>
            <ProductDetailClient product={product} />
        </div>
      </div>
    </div>
  );
}
