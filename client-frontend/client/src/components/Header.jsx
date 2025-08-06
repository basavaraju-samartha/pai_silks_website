import './Header.css';
import logo from '../assets/logo.svg'
import heart from '../assets/Heart.svg'
import cart from '../assets/ShoppingBag.svg'
import search from '../assets/Loupe.svg'
import filtersort from '../assets/List.svg'

function Header() {
  return (
  <header className="header">
    <div className='filterandsortmenu'><img src={filtersort}></img></div>
    <div className='logo'><img src={logo}></img></div>
    <div className='searchcartwish'>
      <div className='search'><img src={search}></img></div>
      <div className='wishlist'><img src={heart}></img></div>
      <div className='cart'><img src={cart}></img></div>
    </div>
  </header>
);
}

export default Header