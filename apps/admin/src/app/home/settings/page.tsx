"use client"

import { adminState } from "@/store/adminState";
import { useRecoilValue } from "recoil";
import { AccountForm } from "./components/account-form";

export default function SettingsPage() {
  const adminData = useRecoilValue(adminState);

  return (
    <div className="space-y-4">
      <div className='from-black to-stone-500 bg-clip-text text-4xl font-medium'>
        Settings
      </div>

      <AccountForm />
    </div>
  );
}