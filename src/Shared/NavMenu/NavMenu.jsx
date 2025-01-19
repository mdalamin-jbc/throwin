import { NavLink } from "react-router-dom";
import search from "../../assets/icons/search.png";
import favorite from "../../assets/icons/favorite.png";
import gacha from "../../assets/icons/Gacha.png";
import history from "../../assets/icons/history.png";
import user from "../../assets/icons/user.png";

const NavMenu = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/search"
          style={({ isActive }) => ({
            color: isActive ? "#49BBDF" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <img
                className={`transition-all ${
                  isActive ? "w-[26px]" : "w-[26px]"
                }`}
                src={search}
                alt=""
              />
              <p className="text-xs">探す</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/favorite"
          style={({ isActive }) => ({
            color: isActive ? "#49BBDF" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <img
                className={`transition-all ${
                  isActive ? "w-[26px]" : "w-[26px]"
                }`}
                src={favorite}
                alt=""
              />
              <p className="text-xs">お気に入り</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="relative" style={{ top: "-12px" }}>
        <NavLink
          to="/gacha"
          style={({ isActive }) => ({
            color: isActive ? "#49BBDF" : "",
          })}
        >
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-0 relative ${
                isActive ? "scale-100" : "scale-100"
              } transition-transform`}
            >
              <div className="bg-[#49BBDF] w-[26px] h-[26px] rounded-full absolute -right-1 -top-4 flex items-center justify-center">
                <h2 className="text-xs text-white">1</h2>
              </div>
              <img src={gacha} alt="" className="w-[30px]" />
              <p className="text-xs">ガチャ</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/history"
          style={({ isActive }) => ({
            color: isActive ? "#49BBDF" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1 ml-2">
              <img
                className={`transition-all ${
                  isActive ? "w-[26px]" : "w-[26px]"
                }`}
                src={history}
                alt=""
              />
              <p className="text-xs">履歴</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myPage"
          style={({ isActive }) => ({
            color: isActive ? "#49BBDF" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <img
                className={`transition-all ${
                  isActive ? "w-[26px]" : "w-[26px]"
                }`}
                src={user}
                alt=""
              />
              <p className="text-xs">マイページ</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <footer
      className="z-40 bg-white text-[#44495B] fixed bottom-0 w-full h-[70px] lg:w-full"
      style={{
        boxShadow:
          "0 -10px 10px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, -0.1)",
      }}
    >
      <div className="flex justify-center items-center py-4 h-full">
        <ul className="flex gap-8 items-center">{links}</ul>
      </div>
    </footer>
  );
};

export default NavMenu;
