import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setsymbolsAllowed] = useState(true);

  const passwordRef = useRef(null);

  const ganeratePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (numbersAllowed) str += "0123456789";
    if (symbolsAllowed) str += "!@#$%^&*()-_=+";

    for (let i = 1; i <= length; i++) {
      let char_index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char_index);
    }
    setpassword(pass);
  });

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    ganeratePassword();
  }, [symbolsAllowed, numbersAllowed, length]);

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Ganerator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={7}
              max={20}
              value={length}
              onChange={(e) => setlength(e.target.value)}
            ></input>
            <label className="text-orange-500 text-xs italic" htmlFor="length">
              Length :{length}
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            ></input>
            <label
              className="text-orange-500 text-xs italic"
              htmlFor="Numbers Allowed?"
            >
              Numbers Allowed?
            </label>
            <input
              type="checkbox"
              defaultChecked={symbolsAllowed}
              onChange={() => {
                setsymbolsAllowed((prev) => !prev);
              }}
            ></input>
            <label
              className="text-orange-500 text-xs italic"
              htmlFor="Symbols Allowed?"
            >
              Symbols Allowed?
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
