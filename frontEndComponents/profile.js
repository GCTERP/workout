import Link from "next/link";
import { useState } from "react";
const Profile = ({ color, hoverProps }) => {
  const [currentRole, setCurrentRole] = useState(1);
  var id=0;
  const list = {
    data: [
      { id: 1, name: "Facutly Advisor" },
      { id: 2, name: "Program Coordinator" },
      { id: 3, name: "Time Table Coordinator" },
      { id: 4, name: "Head of the Department" },
    ],
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <div>
        <div className={`w-52 relative  ${color}`}>
          <span className="material-symbols-rounded absolute -top-4 right-4">
            change_history
          </span>

          <div className="space-y-2.5 rounded-lg shadow-lg pt-2 pb-3 bg-white">
            <Link
              className="cursor-pointer flex mx-2 items-center"
              href="/profile"
            >
              <span className="material-symbols-outlined">offline_bolt</span>

              <div className="pl-2 text-sm font-semibold">My Profile</div>
            </Link>
            <style global jsx>
              {`
                .material-symbols-rounded {
                  font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 200,
                    "opsz" 48;
                  color: #ffffff;
                }
                .material-symbols-outlined {
                  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0,
                    "opsz" 48;
                  color: gray;
                }
              `}
            </style>
            <hr className="border-gray-400 "></hr>
            <div className="ml-2 space-y-3">
              <h1 className="font-semibold text-gray-400 text-xs cursor-default">
                ROLES
              </h1>
            </div>

            {list.data.map((item) => (
              <div
                key={item.id}
                className={`ml-4 space-x-10 cursor-pointer text-sm text-gray-800 font-thin ${hoverProps}`}
                href="/program-coordinator/home"
              >
                <li
                  className={`  ${
                    currentRole === item.id
                      ? ` marker:text-blue-600 marker:text-xl `
                      : " marker:text-white marker:text-xl"
                  } list-outside `}
                  onClick={() => {
                    setCurrentRole(item.id);
                  }}
                >
                  <span className={`relative -left-2`}>{item.name}</span>
                </li>
              </div>
            ))}
            <hr className="border-gray-400"></hr>
            <Link
              className="flex mx-2 items-center cursor-pointer"
              href="/login"
            >
              <span className="material-symbols-outlined ">logout</span>
              <p className="pl-2 text-sm font-bold ">Sign Out</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
