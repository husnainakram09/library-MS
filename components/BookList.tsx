"use client";
import React, { useState } from "react";
import BookCard from "./BookCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  username?: string;
}

const BookList = ({ title, books, containerClassName, username }: Props) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)

  const handleSearchChange = (e: any) => {
    const query = e.target.value
    setFilteredBooks(
      books.filter((book: Book) => {
        if (book.author.includes(query) || book.genre.includes(query) || book.title.includes(query)) {
          return book
        }
      })
    )
  }

  return (
    <section className={containerClassName}>
      <div className="flex">

        <h2 className="font-bebas-neue text-4xl text-light-100 w-full">{title}</h2>
        <Input width={400} placeholder="Search by title, genre or author..." className="text-white" onChange={handleSearchChange} />
      </div>

      <ul className="book-list">
        {books.length === 0 && (
          <p className="text-xl text-white">No Books to show</p>
        )}
        {filteredBooks.map((book, ind) => (
          <BookCard key={ind} {...book} username={username} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
