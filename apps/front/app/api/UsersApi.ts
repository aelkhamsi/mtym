import ApiMethods from "./ApiMethods"

export const getUser = async () => {
  const url = '/users/me';
  return ApiMethods.get(url);
}

export async function getUserSSR(cookieStore: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/me`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });

    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export const updateUser = async (id: number, partialUser: any) => {
  const url = `/users/${id}`;
  const body = {...partialUser};
  return ApiMethods.put(url, body);
}