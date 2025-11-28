import waves from "../assets/waves.jpg";
import { Link } from "react-router-dom";
function Hero(){
    return(
        <section className="relative min-h-screen flex items-center justify-center text-center text-white"
        style={{
        backgroundImage: `url(${waves})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
             <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-purple-900/20"></div>
             <div className="relative z-10 px-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-wide">Shamar Weekes</h1>
                <p className="mt-4 text-xl md:text-2xl opacity-90">
                     Full-Stack Developer • Cybersecurity • AI
                </p>
                <p className="mt-6 text-lg md:text-xl opacity-80">
                      Building modern, production-ready applications with clean architecture and real-world impact.
                 </p>
                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                    <Link to="/projects" className="px-8 py-3 bg-purple-600 rounded-lg text-lg font-semibold transition   hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
                        View Projects
                    
                    </Link>
                    <Link to="/contact" className="px-8 py-3 bg-white/10  border border-white/20 rounded-lg text-lg font-semibold transition   hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
                    Contact Me
                    
                    </Link>

                </div>
             </div>
        </section>
    );
}
export default Hero;