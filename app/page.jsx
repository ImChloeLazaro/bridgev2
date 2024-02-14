"use client";
import SignInCard from "./sign-in/components/SignInCard";

function App() {
  return (
    <>
      <SignInCard />
      <div className="absolute bottom-0 left-0 ml-2 mb-1 text-white-default text-xxs">
        <p className="">{"Developed by Aretex IT-SW"}</p>
        <p className="">{"© 2023 Aretex Bridge v.0.5.14.alpha"}</p>
        <p className="">{"All rights reserved."}</p>
      </div>
    </>
  );
}

export default App;
