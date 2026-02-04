"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/data";
import { Button } from "./ui/button";

type ProductFiltersProps = {
  filters: {
    categories: string[];
    sports: string[];
    brands: string[];
    priceRange: [number, number];
  };
  onFilterChange: (name: keyof ProductFiltersProps['filters'], value: any) => void;
  onReset: () => void;
};

const sports = [...new Set(products.map(p => p.sport))];
const brands = [...new Set(products.map(p => p.brand))];
const categories = [...new Set(products.map(p => p.category))];

export function ProductFilters({ filters, onFilterChange, onReset }: ProductFiltersProps) {

  const handleCheckedChange = (
    type: 'sports' | 'brands' | 'categories',
    value: string
  ) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(type, newValues);
  };
  
  return (
    <div className="sticky top-20">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>
      </div>
      <Accordion type="multiple" defaultValue={["category", "sport", "brand", "price"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={filters.categories[0] || 'all'}
              onValueChange={(value) => onFilterChange('categories', value === 'all' ? [] : [value])}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="cat-all" />
                <Label htmlFor="cat-all">All</Label>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={`cat-${category}`} />
                  <Label htmlFor={`cat-${category}`}>{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sport">
          <AccordionTrigger>Sport</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sports.map((sport) => (
                <div key={sport} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sport-${sport}`} 
                    checked={filters.sports.includes(sport)}
                    onCheckedChange={() => handleCheckedChange('sports', sport)}
                  />
                  <Label htmlFor={`sport-${sport}`}>{sport}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleCheckedChange('brands', brand)}
                  />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
             <Slider
              min={0}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange('priceRange', value)}
            />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
