/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from 'zod';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type : string) => z.object({
  userName: type === 'sign-in'? z.string().optional() : z.string().min(1,{message:"Enter Username"}),
  address1: type === 'sign-in'? z.string().optional() : z.string().min(1),
  city: type === 'sign-in'? z.string().optional() : z.string().min(1),
  state: type === 'sign-in'? z.string().optional() : z.string().min(1),
  postalCode: type === 'sign-in'? z.string().optional() : z.string().min(3).max(6),
  email: z.string().email(),
  password: z.string().min(8,{message:"Password must contain at least 8 characters"}),
})

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
