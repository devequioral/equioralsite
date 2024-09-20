import React from 'react';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import AddPost from '@/components/AddPost/AddPost';

export default function Layout({ navbarClass, session, children }) {
  return (
    <div>
      <MainNavbar session={session} className={navbarClass} />
      {children}
      {session?.user && <AddPost />}
    </div>
  );
}
