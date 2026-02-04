"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { RecommendedProducts } from "@/components/recommended-products";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/lib/types";

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image-1');

const initialFilters = {
  categories: [],
  sports: [],
  brands: [],
  priceRange: [0, 500] as [number, number],
};

export default function Home() {
  const [filters, setFilters] = useState<{
    categories: string[];
    sports: string[];
    brands: string[];
    priceRange: [number, number];
  }>(initialFilters);

  const [sortOption, setSortOption] = useState("popularity-desc");

  const handleFilterChange = useCallback((name: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const { categories, sports, brands, priceRange } = filters;
      if (categories.length > 0 && !categories.includes(product.category)) return false;
      if (sports.length > 0 && !sports.includes(product.sport)) return false;
      if (brands.length > 0 && !brands.includes(product.brand)) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity-desc':
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [filters, sortOption]);

  return (
    <>
      <section className="relative h-[60vh] w-full">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl">Unleash Your Potential</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Find the perfect gear to elevate your game. Premium quality, unbeatable performance.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <RecommendedProducts />

        <section id="products" className="scroll-mt-20">
          <div className="mb-8 flex flex-col items-baseline justify-between gap-4 md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">Our Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
               <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity-desc">Popularity</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <aside className="hidden lg:block">
              <ProductFilters filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
            </aside>
            <main className="lg:col-span-3">
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredAndSortedProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 text-center">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="mt-2 text-muted-foreground">Try adjusting your filters.</p>
                </div>
              )}
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
