export default function Hero() {
  return (
    <section className="bg-[#FFF9C4] min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-4 sm:mb-6 uppercase tracking-tight leading-tight">
          Welcome to <br className="hidden sm:block" />
          <span className="bg-[#FFAAA5] px-2 sm:px-4 py-1 sm:py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block transform -rotate-1 mt-2">
            Universal School
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6 sm:mb-8 font-bold max-w-4xl mx-auto px-2">
          Empowering students to become future leaders through knowledge,
          creativity, and character.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <a
            href="/admissions"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#A8E6CF] text-black font-black text-sm sm:text-base md:text-lg uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 transform hover:scale-105"
          >
            Apply Now
          </a>
          <a
            href="/about"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#B3E5FC] text-black font-black text-sm sm:text-base md:text-lg uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
