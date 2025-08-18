import { getToken } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    }
  })
}