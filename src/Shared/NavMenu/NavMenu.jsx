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
          to="/search"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[29px]" : "w-[24px]"
                }`}
                src={search}
                alt=""
              />
              <p>探す</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorite"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[33px]" : "w-[28px]"
                }`}
                src={favorite}
                alt=""
              />
              <p>お気に入り</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gacha"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[23px]" : "w-[18px]"
                }`}
                src={gacha}
                alt=""
              />
              <p>ガチャ</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/notice"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[28px]" : "w-[23px]"
                }`}
                src={notice}
                alt=""
              />
              <p>お知らせ</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/setting"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[28px]" : "w-[23px]"
                }`}
                src={setting}
                alt=""
              />
              <p>設定</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <footer
      className=" text-[#44495B] fixed bottom-0  w-full lg:w-full"
      style={{
        boxShadow:
          "0 -30px 30px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, -0.1)",
      }}
    >
      <div className="flex justify-center items-center py-5 ">
        <ul className="flex gap-6">
          {links}
        </ul>
      </div>
    </footer>
  );
};

export default NavMenu;
