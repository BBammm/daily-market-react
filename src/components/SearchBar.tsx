import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex h-[56px] items-center justify-between rounded-[10px] bg-gray-100 p-[16px] mb-10">
      <input 
      placeholder="상품을 검색하세요" 
      className="w-full border-0 bg-transparent p-0 text-[16px] leading-[1.4] text-gray-800 placeholder:text-gray-400 focus:outline-none" 
      type="text" 
      value={value}
      onChange={e => onChange(e.target.value)}
      name="searchKeyword"/>
    </div>
  );
}