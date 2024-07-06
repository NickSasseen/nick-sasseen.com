import Image from "next/image";
import Link from "next/link";

const TMDBLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-2">{children}</div>

      <footer className="flex items-center justify-center border-t p-2 sm:py-4 space-x-4">
        <Link href="https://www.themoviedb.org/">
          <Image src="/tmdb-logo.svg" alt="TMDB logo" width="100" height="50" />
        </Link>

        <p className="text-xs sm:text-sm italic font-light">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </footer>
    </div>
  );
};

export default TMDBLayout;
