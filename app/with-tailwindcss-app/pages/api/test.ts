import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//     name: String
// }

export default async function getStaticProps(context: any) {
    const res = await fetch('http://localhost:3000')
    const data = await res.json()

    console.log(data)

    if (!data) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
            // statusCode: 301
          },
        }
      }
    return {
        props: { data }
    };
}
