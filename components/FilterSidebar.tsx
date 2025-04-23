"use client";
import React from "react";

interface FilterSidebarProps {
  books: Book[];
  onFilterChange: (filters: { authors: string[]; genres: string[] }) => void;
  selectedFilters: {
    authors: string[];
    genres: string[];
  };
}

const FilterSidebar = ({ books, onFilterChange, selectedFilters }: FilterSidebarProps) => {
  // Extract unique authors and genres from books
  const uniqueAuthors = Array.from(new Set(books.map((book) => book.author)));
  const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)));

  const handleAuthorChange = (author: string, checked: boolean) => {
    const updatedAuthors = checked
      ? [...selectedFilters.authors, author]
      : selectedFilters.authors.filter((a) => a !== author);
    onFilterChange({
      ...selectedFilters,
      authors: updatedAuthors,
    });
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    const updatedGenres = checked
      ? [...selectedFilters.genres, genre]
      : selectedFilters.genres.filter((g) => g !== genre);
    onFilterChange({
      ...selectedFilters,
      genres: updatedGenres,
    });
  };

  return (
    <div className="filter-sidebar min-w-[200px] bg-dark-800 p-4 rounded-md text-white">
      <h3 className="text-xl font-bebas-neue mb-4">Filter By</h3>
      
      {/* Authors Filter */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Authors</h4>
        <div className="space-y-2">
          {uniqueAuthors.map((author) => (
            <div key={author} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id={`author-${author}`} 
                checked={selectedFilters.authors.includes(author)}
                onChange={(e) => handleAuthorChange(author, e.target.checked)}
                className="h-4 w-4 rounded-sm border-gray-500 text-indigo-500 focus:ring-indigo-400"
              />
              <label 
                htmlFor={`author-${author}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {author}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Genres Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Genres</h4>
        <div className="space-y-2">
          {uniqueGenres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id={`genre-${genre}`} 
                checked={selectedFilters.genres.includes(genre)}
                onChange={(e) => handleGenreChange(genre, e.target.checked)}
                className="h-4 w-4 rounded-sm border-gray-500 text-indigo-500 focus:ring-indigo-400"
              />
              <label 
                htmlFor={`genre-${genre}`}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;