import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl slide-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6 uppercase tracking-wider">
            New Collection
          </span>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
            Timeless pieces for{' '}
            <span className="text-primary">modern living</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Carefully curated essentials crafted from the finest materials. 
            Designed to last, made to be loved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 group"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/feedback"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground/20 rounded-full font-medium hover:bg-foreground/5 transition-all duration-300"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-primary/5 to-transparent rounded-l-full hidden lg:block" />
    </section>
  );
};

export default Hero;
