import React from "react";

function Blog({ imageUrl, tag, title, slug }) {
  return (
    <article className="w-full md:w-80 h-80 bg-white shadow-xl rounded-xl hover:scale-90 transition-all duration-300 overflow-hidden">
      {/* Image wrapper with fixed height */}
      <div className="w-full h-40 overflow-hidden rounded-t-xl">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
      </div>

      {/* Content section */}
      <article className="px-8 py-6">
        <p className="px-4 py-1 bg-blue-200 w-max rounded-full text-blue-700">
          {tag}
        </p>
        <h1 id="title" className="font-bold text-xl mt-4">
          {title}
        </h1>
        <p id="description" className="text-lg mt-2 line-clamp-3">
          {slug}
        </p>
      </article>
    </article>
  );
}

export default Blog;
