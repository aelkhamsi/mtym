import ApiMethods from "./ApiMethods";

export const getSignedURL = (
  filename: string, 
  type: string, 
  size: number, 
  checksum: string
) => {
  const url = '/media/signed-url';
  const body = {
    filename, 
    type, 
    size, 
    checksum,
  }
  return ApiMethods.post(url, {body});
}

export const uploadFile = async (url: string, file: File) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        "Content-Type": file.type
      }
    })
      .then(res => ({ url: res.url, statusCode: res.status }))
      .then(resolve)
      .catch(reject);
  }) 
  
}