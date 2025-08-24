
export const sendEmail = (body: any) => {
  const url = process.env.NEXT_PUBLIC_SMTP_ENDPOINT + 'send';
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }

  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })
}