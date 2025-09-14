import React, { useContext } from 'react';
import { CiSearch } from 'react-icons/ci';
import { SlLocationPin } from 'react-icons/sl';
import { BiCart } from 'react-icons/bi';
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../utility/firebase'
import firebase from 'firebase/compat/app';

export default function Header({ count }) {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <div className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img src="../amazon_nav.png" alt="amazon logo" />
            </Link>

            <span></span>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="All">All</option>
            </select>
            <input type="text" name="" placeholder="search product" />
            <CiSearch size={25} />
          </div>
          <div className={classes.order__container}>
            <div>
              <Link to="" className={classes.language}>
                <img
                  src="https://w7.pngwing.com/pngs/756/466/png-transparent-united-state-of-america-flag-flag-of-the-united-states-decal-us-flag-flag-text-rectangle-thumbnail.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
            </div>

            <Link to={!user && '/auth'}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split('@')[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Sign In</p> <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{total}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </div>
  );
}
