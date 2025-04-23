"use client";
import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { Input } from "./ui/input";
import FilterSidebar from "./FilterSidebar";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  username?: string;
}

const BookList = ({ title, books, containerClassName, username }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [filters, setFilters] = useState<{
    authors: string[];
    genres: string[];
  }>({
    authors: [],
    genres: [],
  });

  useEffect(() => {
    filterBooks();
  }, [searchQuery, filters, books]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters: {
    authors: string[];
    genres: string[];
  }) => {
    setFilters(newFilters);
  };

  const filterBooks = () => {
    let result = [...books];

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query),
      );
    }

    // Apply author filter
    if (filters.authors.length > 0) {
      result = result.filter((book) => filters.authors.includes(book.author));
    }

    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter((book) => filters.genres.includes(book.genre));
    }

    setFilteredBooks(result);
  };

  return (
    <section className={containerClassName}>
      <div className="mb-6 flex">
        <h2 className="w-full font-bebas-neue text-4xl text-light-100">
          {title}
        </h2>
        <Input
          placeholder="Search by title, genre or author..."
          className="max-w-md text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex gap-6">
        {books?.length > 1 && (
          <FilterSidebar
            books={books}
            onFilterChange={handleFilterChange}
            selectedFilters={filters}
          />
        )}

        <div className="flex-1">
          {filteredBooks.length === 0 ? (
            <p className="text-xl text-white">No Books to show</p>
          ) : (
            <ul className="book-list">
              {filteredBooks.map((book, ind) => (
                <BookCard key={ind} {...book} username={username} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookList;
