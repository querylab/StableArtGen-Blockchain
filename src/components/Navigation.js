import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const images = [
    'https://i.imgur.com/Z1P57Hh.png',
    'https://i.imgur.com/QvaoI8C.png',
  ];

  return (
    <nav>
      <div className='nav__brand'>
        <img src={images[currentImageIndex]} alt='Brand Logo' style={{ maxWidth: '100px', height: 'auto' }} />
      </div>

      <div className='brand__image' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <img src='https://i.imgur.com/CbeH8xT.png' alt='StableArtGen' style={{ maxWidth: '700px', height: 'auto' }} />
      </div>

      {account ? (
        <button
          type="button"
          className='nav__connect'
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          style={{
            borderRadius: '50px',
            color: '#fff',
            fontWeight: 'bold',
            background: isButtonHovered ? 'linear-gradient(to right, #ef9a9a, #fff)' : 'linear-gradient(to right, #fff, #ef9a9a)',
          }}
        >
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png' alt='metamask' style={{ maxWidth: '50px', height: 'auto' }} />
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectHandler}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          style={{
            borderRadius: '50px',
            color: '#fff',
            fontWeight: 'bold',
            background: isButtonHovered ? 'linear-gradient(to right, #ef9a9a, #fff)' : 'linear-gradient(to right, #fff, #ef9a9a)',
          }}
        >
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png' alt='metamask' style={{ maxWidth: '50px', height: 'auto' }} />
        </button>
      )}
    </nav>
  );
};

export default Navigation;

