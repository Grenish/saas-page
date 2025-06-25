export default function Navbar() {
  return (
    <header className="p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <nav className="relative text-white w-full max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-full backdrop-blur-xl backdrop-saturate-150 border border-white/[0.12] shadow-2xl">
          <div className="relative px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  fill="none"
                  height="39"
                  viewBox="0 0 44 48"
                  width="45"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg"
                >
                  <g fill="#fff">
                    <path d="m16 8 5.0912 10.9088 10.9088 5.0912-10.9088 5.0912-5.0912 10.9088-5.0912-10.9088-10.9088-5.0912 10.9088-5.0912z" />
                    <path
                      d="m20.0469 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z"
                      opacity=".6"
                    />
                  </g>
                </svg>
              </div>
              <h2 className="text-xl font-wagner font-medium tracking-wide drop-shadow-sm">
                EvoLabs AI
              </h2>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Contact
              </a>
            </div>

            <div className="hidden sm:block">
              <button className="relative overflow-hidden px-4 py-2 rounded-3xl bg-accent-1/10 border border-accent-1/20 text-white text-sm font-medium backdrop-blur-sm hover:bg-accent-1/40 transition-all duration-200 shadow-lg cursor-pointer">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50"></div>
              </button>
            </div>

            <button className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-xl -z-10 scale-105"></div>
      </nav>
    </header>
  );
}
