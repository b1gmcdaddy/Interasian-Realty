import {SITE_API} from "@/lib/constants";
import {ApiResponse} from "@/lib/types";
import {Email} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";

export const sendEmailAsync = async (email: Email) => {
  const response = await fetch(`${SITE_API}/Email/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then((res) => res.json());
  return response as ApiResponse<Email>;
};

const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmailAsync,
    onError: (err) => {
      console.error(err);
    },
  });
};

export default useSendEmail;
