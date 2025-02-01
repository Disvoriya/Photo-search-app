"use client";

import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm";

export default function Profile() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Header />
        <ChangePasswordForm/>
      </div>
    </div>
  );
}
