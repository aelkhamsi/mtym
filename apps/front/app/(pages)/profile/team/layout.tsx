import Script from 'next/script'

export default function TeamLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Script 
        src="https://cdn.jsdelivr.net/npm/jdenticon@3.3.0/dist/jdenticon.min.js" async
        integrity="sha384-LfouGM03m83ArVtne1JPk926e3SGD0Tz8XHtW2OKGsgeBU/UfR0Fa8eX+UlwSSAZ" 
        crossOrigin="anonymous"
        strategy='afterInteractive'
      ></Script> */}

      {children}
    </>
  )
}