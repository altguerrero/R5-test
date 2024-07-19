import React from "react";

const BookContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-16" data-testid="container">
      {children}
    </section>
  );
};

export default BookContainer;
