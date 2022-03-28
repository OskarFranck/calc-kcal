// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  props: Response
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: any = await getStaticProps()
  res.status(200).json(data)
}

export async function getStaticProps() {
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
