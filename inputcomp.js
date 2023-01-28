import { useState } from "react";

const Input = ({
  width,
  height,
  name,
  tcolor,
  bcolor,
  type,
  state,
  value,
  update,
  required,
  disabled,
}) => {
  const [st, setSt] = useState(0);

  return (
    <div className={`relative group`}>
      <label
        htmlFor="email"
        className={`absolute ease-in ${tcolor} duration-150 px-1 left-2 ${
          st === 1 ? "-top-2 text-xs bg-white " : " top-2 text-sm "
        }  group-focus-within:-top-2 group-focus-within:text-xs group-focus-within:bg-white    text-${state}-400 `}
      >
        {name}
      </label>
      <input
        name="email"
        type={type}
        value={value}
        onChange={(e) => {
          setSt(e.target.value);
          update(e.target.value);
        }}
        className={`rounded h-${height} border-2 ${bcolor} w-${width} p-2 pl-3 focus:outline-none text-sm border-${state}-400`}
        autoComplete="off"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
