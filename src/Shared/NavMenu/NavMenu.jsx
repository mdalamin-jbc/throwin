import { NavLink } from "react-router-dom";
import search from "../../assets/icons/search.png";
import favorite from "../../assets/icons/favorite.png";
import gacha from "../../assets/icons/Gacha.png";
import notice from "../../assets/icons/notice.png";
import setting from "../../assets/icons/setting.png";

const NavMenu = () => {
  const links = (
    <>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#f7931e" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/search"
        >
          <div className="grid ">
            <img src={search} alt="" /> <p>探す</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#f7931e" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/favorite"
        >
          <div className="flex flex-col justify-center items-center">
            <img className="w-[30px]" src={favorite} alt="" /> <p>お気に入り</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#f7931e" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/gacha"
        >
          <div className="grid -mt-7">
            <img className="w-[]" src={gacha} alt="" /> <p>ガチャ</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#f7931e" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          <div>
            <img src={notice} alt="" /> <p>お知らせ</p>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#f7931e" : "",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          <img src={setting} alt="" /> <p>設定</p>
        </NavLink>
      </li>
    </>
  );

  return (
    <footer className="bg-gray-800 p-4 text-white fixed bottom-0 w-full">
      <div className="flex justify-center items-center">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
    </footer>
  );
};

export default NavMenu;
