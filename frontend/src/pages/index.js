import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footComp";
import Category from "../components/Category";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bienvenue sur HelpFIX !</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Help-logo.png" />
      </Head>
      <main>
        <Navbar />
        <div className="video-background">
          <video autoPlay muted loop id="background-video">
            <source
              src="/video-home.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="overlay">
          <div className="text content">
            <h1>Votre solution à tous vos besoins de services,</h1>
            <h2>c'est HelpFIX!</h2>
            <a href="./loginPage"><button className="comBtn">Commencer</button></a>
          </div>
        </div>
        <Category />
        <section className="section promo-section">
            <div className="sebastien-text">
            <Image className="photo-sebastien" src="/images/presta-sebastien.jpg" alt="avatar" width={150} height={150} />
              <h2>Sébastien</h2>
              <p>
                " Arrivé depuis peu, HelpFIX me peermet de vivre à mon compte,<br /> 
                je peux travailler comme je veux et quand je veux.<br />
                Bricoler ainsi qu'aider les autres est une passion depuis petit,<br /> 
                et grâce à HelpFIX je peux vivre pleinement de ma passion."
              </p>
            </div>
        </section>
        </main>
      <Footer />
    </>
  );
}