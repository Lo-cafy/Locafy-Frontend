"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from 'react';

interface FilterState {
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
}

interface Props {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

export default function PriceFilter({ filters, setFilters }: Props) {
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 1000);

  const handleMinPriceChange = (value: number) => {
    if (value <= maxPrice && value !== minPrice) {
      setMinPrice(value);
      setFilters(prev => ({ ...prev, minPrice: value, maxPrice }));
    }
  };

  const handleMaxPriceChange = (value: number) => {
    if (value >= minPrice && value !== maxPrice) {
      setMaxPrice(value);
      setFilters(prev => ({ ...prev, minPrice, maxPrice: value }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-medium px-1">
        <span className="text-green-600 font-semibold">${minPrice}</span>
        <span className="text-gray-500">to</span>
        <span className="text-green-600 font-semibold">${maxPrice}</span>
      </div>

      <div className="relative px-2">
        <div className="h-2 bg-gray-200 rounded-lg relative">
          <div
            className="absolute h-2 bg-green-600 rounded-lg"
            style={{
              left: `${(minPrice / 1000) * 100}%`,
              width: `${((maxPrice - minPrice) / 1000) * 100}%`
            }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={minPrice}
          onChange={(e) => handleMinPriceChange(Number(e.target.value))}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
          className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            min="0"
            max="1000"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            min="0"
            max="1000"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {[
          { label: "Under $50", min: 0, max: 50 },
          { label: "$50-$100", min: 50, max: 100 },
          { label: "$100-$200", min: 100, max: 200 },
          { label: "$200+", min: 200, max: 1000 }
        ].map((range) => (
          <button
            key={range.label}
            onClick={() => {
              if (minPrice !== range.min || maxPrice !== range.max) {
                setMinPrice(range.min);
                setMaxPrice(range.max);
                setFilters(prev => ({ ...prev, minPrice: range.min, maxPrice: range.max }));
              }
            }}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              minPrice === range.min && maxPrice === range.max
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-green-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}