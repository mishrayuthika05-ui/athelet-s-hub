"use client";

import { useEffect, useState } from "react";
import { products, users } from "@/lib/data";
import type { Product } from "@/lib/types";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-product-recommendations";
import { ProductCard } from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "./ui/skeleton";

export function RecommendedProducts() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const browsingHistoryItem = sessionStorage.getItem("browsingHistory");
        const browsingHistory = browsingHistoryItem ? JSON.parse(browsingHistoryItem) : [];
        
        // Use logged-in user's data, or fallback to mock data
        const currentUser = user || users[0];

        const input = {
          userId: currentUser.id,
          browsingHistory,
          purchaseHistory: currentUser.purchaseHistory,
        };
        
        const result = await getPersonalizedRecommendations(input);
        
        if (result && result.recommendedProductIds) {
          const recommendedProducts = products.filter(p => result.recommendedProductIds.includes(p.id));
          setRecommendations(recommendedProducts);
        }
      } catch (error) {
        console.error("Failed to get recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Recommended For You</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-3xl font-bold tracking-tight">Recommended For You</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
