import React, { useEffect, useState } from 'react';
import './home.scss'
import Header from '../../components/header/header';
import PostSection from '../../components/post-section/post-section';
import FriendsSection from '../../components/friends-section/friends-section';
import Title from '../../components/title/title';


const HomePage = () => {
  const [headerIsHidden, setHeaderIsHidden] = useState(true);

  const handleScroll = async () => {
    let position = document.getElementById("container").scrollTop;
    if (position <= 100) {
        setHeaderIsHidden(true)
    } else {
        setHeaderIsHidden(false)
    }
    };

  useEffect(() => {
    document.getElementById("container").addEventListener('scroll', handleScroll);
    document.getElementById("container").scrollTo(0,0);

    return () => {
      document.getElementById("container").removeEventListener('scroll', () => handleScroll);
      };
  }, []);


  return (
        <div className='tc'>
          <Header hidden={headerIsHidden} />
          <Title />
          <PostSection />
          <FriendsSection />
        </div>
  )
}


export default HomePage;