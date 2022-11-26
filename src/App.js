import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme} from "@mui/material";
import _ from 'lodash';
import Home from "./pages/Home/Home";
import Post from './pages/Post/Post';
import ShopProfile from './pages/ShopProfile/ShopProfile';
import UserProfile from './pages/UserProfile/UserProfile';
import Annonces from "./pages/Annonces/Annonces";
import UserAccount from './pages/UserAccount/UserAccount';
import Item from './pages/Item/Item';
import Category from './pages/Category/Category';
import Search from './pages/Search/Search';
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import SubProduct from "./pages/SubProduct/SubProduct"
import { context } from './pages/Context';
import Plan from './pages/Plan/Plan';
import Dash from './pages/Dash/Dash';
import Notfound from './pages/Notfound/Notfound';
import Login from './pages/Login/Login';
import Success from './pages/Success/Success';
import Cancel from './pages/Cansel/Cancel';
import EditPost from './pages/EditPost/EditPost';
import ProtectedRoutes from './ProtectedRoutes';
import Contact from './pages/Contact/Contact';

export default function App() {
  const location = useLocation().pathname;
  const theme = useTheme();
  const ctx = useContext(context);

  useEffect(() => {
    if(location !== '/')  {
      document.title = _.capitalize(_.kebabCase(location.slice(1)))
    }
  });

  return (
    <>
      {location === '/admin' ? null : <Navbar theme={theme}/>}
      <Routes>
        <Route element={<ProtectedRoutes />} >
          <Route path = "/account" element={<UserAccount />}/> : <Route path = "/account" element={<Login />}/> 
          <Route path = "/post" element={<Post />}/> : <Route path = "/post" element={<Login />}/>
          <Route path = "/dashboard" element={<UserProfile />}/> : <Route path = "/dashboard" element={<Login />}/>
          <Route path = "/success" element={<Success />}/>
          <Route path = "/cancel" element={<Cancel />}/>
        </Route>

        {(ctx.connected && ctx.isAdmin) && <Route path = "/admin" element={<Dash />}/>}
        <Route path = "/" element={<Home />}/>
        <Route path = "/*" element={<Notfound />}/>
        <Route path = "/login" element={<Login />}/>
        <Route path = "/offres" element={<Plan />}/>
        <Route path = "/edit/:productId" element={<EditPost />}/>
        <Route path = "/connexion" element={<Login />}/>
        <Route path = "/annonces" element={<Annonces />}/>
        <Route path = "/annonces/search" element={<Search />}/>
        <Route path = "/profile/:id" element={<ShopProfile />}/>
        <Route path = "/annonces/:category" element={<Category />}/>
        <Route path = "/annonces/:category/:subCategory" element={<SubProduct />}/>
        <Route path = "/annonces/:category/product/:productID" element={<Item />}/>
        <Route path = "/contact" element={<Contact />} />
      </Routes>
      <Footer theme={theme}/>
    </>
  )
}