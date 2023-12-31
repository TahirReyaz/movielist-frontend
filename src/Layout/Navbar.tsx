import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import route, { routeItem } from "./routes";
import { RootState } from "../store/AuthSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log({ isLoggedIn });
  return (
    <nav className="bg-bgSecondary py-5 px-28 font-body flex">
      <div>Movie List</div>

      <div className="flex gap-4 ml-7">
        {route.map((item: routeItem, index: number) => (
          <NavLink
            to={item.path}
            className="self-center"
            key={index}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "normal" : "200",
              };
            }}
          >
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
