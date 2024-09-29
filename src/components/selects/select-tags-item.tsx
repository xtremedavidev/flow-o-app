"use client";

import { FC, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface TagItemProps {
  tags: string[];
  label: string;
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export const TagItem: FC<TagItemProps> = ({
  tags,
  label,
  selectedTag,
  onTagChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTagClick = (tag: string) => {
    onTagChange(tag);
  };

  useEffect(() => {
    if (selectedTag && tags.includes(selectedTag)) {
      if (isOpen) {
      } else {
        setIsOpen(true);
      }
    }
  }, [selectedTag]);

  console.log("selectedTag", selectedTag);

  return (
    <div className="w-full rounded-md bg-white/[0.08] px-2 py-1">
      <button
        className="w-full py-1 text-left text-[10px] font-bold capitalize text-[#BCBCBC]"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="tag-list"
      >
        {label}
        <span className="float-right">
          <FaAngleDown
            color="white"
            size={12}
            className={`${isOpen ? "rotate-180" : ""} transition-all duration-150 ease-linear`}
          />
        </span>
      </button>
      {isOpen && (
        <ul className="mt-1 h-fit w-full space-y-[10px] rounded-[4px] bg-white/[0.18] p-1">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[4px] bg-[#020F18] px-2 py-1`}
              onClick={() => handleTagClick(tag)}
            >
              <span className="text-[10px] font-normal capitalize text-[#BCBCBC]">
                {tag}
              </span>
              <input
                type="radio"
                name={label}
                checked={selectedTag !== "" && selectedTag === tag}
                readOnly
                className="form-radio flex h-4 w-4 shrink-0 border-gray-600 bg-gray-800 text-indigo-600"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
