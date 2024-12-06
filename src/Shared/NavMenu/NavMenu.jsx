import { NavLink } from "react-router-dom";
import search from "../../assets/icons/search.png";
import favorite from "../../assets/icons/favorite.png";
import gacha from "../../assets/icons/Gacha.png";
import notice from "../../assets/icons/notice.png";
import history from "../../assets/icons/history.png";
import user from "../../assets/icons/user.png";

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
                  isActive ? "w-[29px]" : "w-[29px]"
                }`}
                src={search}
                alt=""
              />
              <p className=" ">探す</p>
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
                  isActive ? "w-[29px]" : "w-[29px]"
                }`}
                src={favorite}
                alt=""
              />
              <p>お気に入り</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="relative" style={{ top: "-14px" }}>
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
            <div
              className={`flex flex-col items-center gap-0 relative ${
                isActive ? "scale-100" : "scale-100"
              } transition-transform`}
            >
              <div className="bg-[#49BBDF] w-[30px] h-[29px] rounded-full absolute -right-1 -top-4">
                <h2 className="text-center mr-[1px] text-white mt-[1px]">1</h2>
              </div>
              <img src={gacha} alt="" className="" />
              <p className="text-lg ">ガチャ</p>
            </div>
          )}
        </NavLink>
      </li>

      <li className="">
        <NavLink
          to="/history"
          style={({ isActive, isTransitioning }) => ({
            fontWeight: isActive ? "" : "",
            color: isActive ? "#49BBDF" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
            background: "transparent",
            marginTop: isActive ? "-15px" : "",
          })}
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-2 ml-3">
              <img
                className={`transition-all ${
                  isActive ? "w-[30px]" : "w-[30px]"
                }`}
                src={history}
                alt=""
              />
              <p className="text-[13px]">履歴</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myPage"
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
                  isActive ? "w-[29px]" : "w-[29px]"
                }`}
                src={user}
                alt=""
              />
              <p>マイページ</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <footer
      className="z-40 bg-white text-[#44495B] fixed bottom-0 w-full lg:w-full h-[80px]"
      style={{
        boxShadow:
          "0 -30px 30px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, -0.1)",
      }}
    >
      <div className="flex justify-center items-center py-5 h-full">
        <ul className="flex gap-6 items-center h-full">{links}</ul>
      </div>
    </footer>
  );
};

export default NavMenu;
