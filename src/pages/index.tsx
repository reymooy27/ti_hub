
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Main from "../components/Main";
import RightSideBar from "../components/RightSideBar";

const Home: NextPage = () => {

  const {data: session} = useSession()

  if(!session?.user?.name){
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <h1 className='text-xl'>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Social</title>
      </Head> 
        <div className="h-full w-full">
          <Header/>
          <main className='w-full h-full pt-[70px] pb-5 flex gap-6 sm:px-6 px-[10px] relative'>
            <LeftSideBar/> 
            <Main/>
            <RightSideBar/>
          </main>
        </div>
    </>
  );
};


export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};