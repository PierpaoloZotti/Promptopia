import Feed from "@components/Feed";

const Home = () => {
   return (
      <section className="w-full flex-center flex-col">
         <h1 className="head_text text-center">
            Descubra e compartilhe
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
         </h1>
         <p className="desc text-center">
            Promptopia é uma ferramenta open-source para descobrir, criar e compartilhar prompts
            creativos para o mundo moderno das IA
         </p>

         <Feed />
      </section>
   );
};

export default Home;
