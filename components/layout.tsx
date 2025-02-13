import { ReactNode } from 'react';
import ArticelCarousel from './articel-carousel';
import Footer from './footer';
import Navbar from './navBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <ArticelCarousel />
      <Footer />
    </>
  );
};

export default Layout;
