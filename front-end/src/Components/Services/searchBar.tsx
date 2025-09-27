"use client";

import { Input } from "@/ui/input";
import { Search } from "lucide-react";

interface Props {
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function SearchBar({ searchText, setSearchText }: Props) {
  return (
    <div className="relative mb-6 w-full sm:w-[400px] md:w-[500px] group">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transition-colors group-focus-within:text-green-500" />
        <Input
          type="text"
          placeholder="Search services..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
            aria-label="Clear search"
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
