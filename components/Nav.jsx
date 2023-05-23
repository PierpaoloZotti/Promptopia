"use client";

import Link from "next/link";
import Image from "next/image"; //Automatic image optimizing from nextjs
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
   const { data: session } = useSession();
   const [providers, setProviders] = useState(null);
   const [toggleDropdown, setToggleDropdown] = useState(false);

   useEffect(() => {
      const setUpProviders = async () => {
         const response = await getProviders();
         setProviders(response);
      };
      setUpProviders();
   }, []);

   return (
      <nav className="flex-between w-full mb-16 pt-3">
         <Link href="/" className="flex gap-2 flex-center">
            <Image
               src="/assets/images/logo.svg"
               alt="Promptopia logo"
               width={30}
               height={30}
               className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
         </Link>
         {/* Desktop Navigation */}
         <div className="sm:flex hidden">
            {session?.user ? (
               <div className="flex gap-3 md:gap-5">
                  <Link href="/create-prompt" className="black_btn">
                     Criar Prompt
                  </Link>
                  <button className="outline_btn" type="button" onClick={signOut}>
                     Log Out
                  </button>
                  <Link href="/profile">
                     <Image
                        src={session?.user.image}
                        alt="profile"
                        className="rounded-full"
                        width={37}
                        height={37}
                     />
                  </Link>
               </div>
            ) : (
               <div className="flex gap-4">
                  {providers &&
                     Object.values(providers).map((provider) => (
                        <button
                           type="button"
                           key={provider.name}
                           onClick={() => signIn(provider.id)}
                           className="black_btn text-xs"
                        >
                           Sign In with {provider.name}
                        </button>
                     ))}
               </div>
            )}
         </div>
         {/* Mobile Navigation */}
         <div className="sm:hidden flex relative">
            {session?.user ? (
               <div className="flex">
                  <Image
                     src={session?.user.image}
                     alt="profile"
                     className="rounded-full"
                     width={37}
                     height={37}
                     onClick={() => setToggleDropdown((prev) => !prev)}
                  />
                  {toggleDropdown && (
                     <div className="dropdown drop-shadow">
                        <Link
                           href="/create-prompt"
                           className="dropdown_link"
                           onClick={() => setToggleDropdown(false)}
                        >
                           Criar Prompt
                        </Link>
                        <Link
                           href="/profile"
                           className="dropdown_link"
                           onClick={() => setToggleDropdown(false)}
                        >
                           Meu Perfil
                        </Link>
                        <button
                           className="mt-5 w-full black_btn"
                           type="button"
                           onClick={() => {
                              setToggleDropdown(false);
                              signOut();
                           }}
                        >
                           Log Out
                        </button>
                     </div>
                  )}
               </div>
            ) : (
               <div className="flex gap-4">
                  {providers &&
                     Object.values(providers).map((provider) => (
                        <button
                           type="button"
                           key={provider.name}
                           onClick={() => signIn(provider.id)}
                           className="black_btn text-xs"
                        >
                           Sign In with
                           <br />
                           {provider.name}
                        </button>
                     ))}
               </div>
            )}
         </div>
      </nav>
   );
};

export default Nav;
