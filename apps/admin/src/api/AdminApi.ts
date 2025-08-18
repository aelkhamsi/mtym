import ApiMethods from "./ApiMethods"

export const getAdminData = async () => {
  const url = 'admin/informations';
  return ApiMethods.get(url);
}

export const updateAdmin = async (id: number, updateAdminDto: any) => {
  const url = `admin/${id}`;
  return ApiMethods.put(url, updateAdminDto);
}