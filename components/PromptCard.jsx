"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
   const [copied, setCopied] = useState("");
   const { data: session } = useSession();
   const pathName = usePathname();
   const router = useRouter();
   const handleProfileClick = () => {
      console.log(post);

      if (post.creator._id === session?.user.id) return router.push("/profile");

      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
   };

   const handleCopy = () => {
      setCopied(post.prompt);
      navigator.clipboard.writeText(post.prompt);
      setTimeout(() => setCopied(""), 3000);
   };
   return (
      <div className="prompt_card">
         <div className="flex justify-between gap-5 items-start">
            <div
               className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
               onClick={handleProfileClick}
            >
               <Image
                  src={post.creator.image}
                  alt="User_image"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
               />
               <div className="flex flex-col">
                  <h3 className="font-satoshi font-semibold text-gray-900">
                     {post.creator.username}
                  </h3>
                  <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
               </div>
            </div>
            <div className="copy_btn" onClick={handleCopy}>
               <Image
                  src={copied === post.prompt ? "assets/icons/tick.svg" : "assets/icons/copy.svg"}
                  alt="copyIcons"
                  width={12}
                  height={12}
               />
            </div>
         </div>
         <p className="my-3 font-satoshi text-sm text-gray-700">{post.prompt}</p>
         <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
         >
            #{post.tag}
         </p>

         {session?.user.id === post.creator._id && pathName === "/profile" && (
            <div className="flex flex-center mt-5 gap-4">
               <p
                  className="font-inter text-sm font-bold group text-green-600 transition duration-300 cursor-pointer"
                  onClick={handleEdit}
               >
                  Editar
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-green-600"></span>
               </p>
               <p
                  className="font-inter text-sm font-bold group text-red-600 transition duration-300 cursor-pointer"
                  onClick={handleDelete}
               >
                  Excluir
                  <span class="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-red-600"></span>
               </p>
            </div>
         )}
      </div>
   );
};

export default PromptCard;
