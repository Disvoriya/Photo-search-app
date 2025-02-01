"use client";

import Header from "../components/Header";
import RegisterForm from "../components/Forms/Register";

function Home() {
  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <div className=" bg-gray-100 flex flex-col items-center p-4 pb-0">
        <div className="w-full max-w-4xl">
          <Header />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl min-h-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
