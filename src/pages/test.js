import React, { useEffect, useState } from 'react';

export default function Test() {
  const [currentPage, setCurrentPage] = useState(0);
  const fetchPosts = async () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage + 1);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!document) return;
    const onScrollBottom = (evt) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchPosts();
      }
    };
    window.addEventListener('scroll', onScrollBottom);
    return () => {
      window.removeEventListener('scroll', onScrollBottom);
    };
  }, [currentPage]);
  return (
    <div style={{ height: '200vh' }}>
      {currentPage} <button onClick={fetchPosts}>Fetch</button>
    </div>
  );
}
