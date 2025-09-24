"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  filters: any;
  setFilters: (filters: any) => void;
}

export default function Sidebar({ filters, setFilters }: Props) {
  const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  const clearAll = () => {
    setFilters({});
    setActiveSection(null);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    setActiveSection(null);
  };

  // Close mobile menu when clicking outside (optional enhancement)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.filter-sidebar') && !target.closest('.filter-toggle')) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden sticky top-4 z-40 mb-4 filter-toggle">
        <button
          onClick={toggleMobileMenu}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:from-green-700 hover:to-green-800 transition-all"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-6 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl shadow-xl w-72 flex-shrink-0">
        <SidebarContent 
          filters={filters} 
          setFilters={setFilters} 
          categories={categories} 
          clearAll={clearAll}
          activeSection={activeSection}
          toggleSection={toggleSection}
          isMobile={false}
        />
      </div>

      {/* Mobile Overlay and Sidebar */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
          
          {/* Mobile Sidebar */}
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 lg:hidden filter-sidebar overflow-y-auto">
            <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <SidebarContent 
                filters={filters} 
                setFilters={setFilters} 
                categories={categories} 
                clearAll={clearAll}
                activeSection={activeSection}
                toggleSection={toggleSection}
                isMobile={true}
              />
            </div>

            {/* Mobile Footer */}
            <div className="sticky bottom-0 bg-white border-t p-4">
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
              >
                Show Results ({categories.length})
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Separate component for sidebar content to avoid duplication
interface SidebarContentProps {
  filters: any;
  setFilters: (filters: any) => void;
  categories: {id:number,name:string}[];
  clearAll: () => void;
  activeSection: string | null;
  toggleSection: (section: string) => void;
  isMobile: boolean;
}

function SidebarContent({ 
  filters, 
  setFilters, 
  categories, 
  clearAll, 
  activeSection, 
  toggleSection, 
  isMobile 
}: SidebarContentProps) {
  
  const FilterSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    sectionKey: string; 
    children: React.ReactNode;
  }) => (
    <div className="mb-4">
      {isMobile ? (
        <>
          <button
            onClick={() => toggleSection(sectionKey)}
            className="w-full flex items-center justify-between p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <span className="font-semibold text-slate-800">{title}</span>
            {activeSection === sectionKey ? (
              <ChevronUp className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-600" />
            )}
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${
            activeSection === sectionKey ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-3">
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <Label className="text-slate-700 font-semibold mb-3 block text-base">{title}</Label>
          {children}
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Filters</h2>
        <button 
          onClick={clearAll}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Categories Section */}
      <FilterSection title="Categories" sectionKey="categories">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
              <Checkbox
                id={`cat-${c.id}`}
                checked={filters.categoryId === c.id}
                onCheckedChange={checked => setFilters({...filters, categoryId: checked ? c.id : undefined})}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor={`cat-${c.id}`} className="text-slate-700 cursor-pointer flex-1">
                {c.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price Section */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm min-w-[40px]">Min</span>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={e => setFilters({...filters, minPrice: Number(e.target.value)})}
              className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm min-w-[40px]">Max</span>
            <input
              type="number"
              placeholder="999"
              value={filters.maxPrice || ""}
              onChange={e => setFilters({...filters, maxPrice: Number(e.target.value)})}
              className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </FilterSection>

      {/* Rating Section */}
      <FilterSection title="Minimum Rating" sectionKey="rating">
        <div className="space-y-2">
          {[4,3,2,1].map(r => (
            <div key={r} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
              <Checkbox
                id={`rating-${r}`}
                checked={filters.minRating === r}
                onCheckedChange={checked => setFilters({...filters, minRating: checked ? r : undefined})}
                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <Label htmlFor={`rating-${r}`} className="text-slate-700 cursor-pointer flex-1">
                <span className="flex items-center gap-2">
                  {r}+ <span className="text-amber-500">⭐</span>
                </span>
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Apply/Clear Button (Desktop only) */}
      {!isMobile && (
        <button 
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg active:scale-95"
          onClick={clearAll}
        >
          Reset Filters
        </button>
      )}
    </>
  );
}