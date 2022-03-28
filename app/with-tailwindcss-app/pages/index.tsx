import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calckcal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" placeholder="Search"/>
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">

        </button>
      </div>
        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login to your account
            </a>
          </p>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">

      </footer>
    </div>
  )
}

export default Home
