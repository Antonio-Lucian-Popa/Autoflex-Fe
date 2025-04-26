import { BASE_PATH } from "@/lib/constant";

export const redirectToLogin = () => {
    window.location.href = `${BASE_PATH}/login`; // Sau folosești navigate() dacă vrei cu hook, dar aici facem simplu
  };
  