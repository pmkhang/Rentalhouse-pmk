import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Contact from '../../components/Contact';
import Intro from '../../components/Intro';
import RollTop from '../../components/RollTop';
import Header from './Header';
import Navigation from './Navigation';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.search, location?.pathname]);
  

  return (
    <div className="w-full min-h-[4000px] relative overflow-auto">
      <Header />
      <Navigation />
      <div className="max-w-[1100px] flex flex-col mx-auto my-0 px-5 mt-3 gap-5">
        <Outlet />
        <Intro />
        <Contact />
      </div>
      <RollTop />
    </div>
  );
};

export default Home;
