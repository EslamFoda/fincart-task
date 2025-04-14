"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
} from "@/lib/store/features/products/productsSlice";
import type { AppDispatch } from "@/lib/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  onCategoryChange,
}: CategoryFilterProps) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleValueChange = (value: string) => {
    onCategoryChange(value === "all" ? null : value);
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
