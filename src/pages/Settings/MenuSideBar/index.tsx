import React from "react";

const MenuSideBar = () => {
  const options = [
    {
      group: "Settings",
      list: [
        { title: "Profile", url: "" },
        { title: "Account", url: "" },
        { title: "Movie & Shows", url: "" },
        { title: "Lists", url: "" },
        { title: "Notifications", url: "" },
        { title: "Import Lists", url: "" },
      ],
    },
    {
      group: "Apps",
      list: [
        { title: "Apps", url: "" },
        { title: "Developer", url: "" },
      ],
    },
  ];
  return (
    <div className="col-span-1">
      {options.map((opt) => (
        <ul>
          <span>{opt.group}</span>
          {opt.list.map((item) => (
            <li>{item.title}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default MenuSideBar;
