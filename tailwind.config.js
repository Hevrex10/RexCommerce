/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    'bg-black', 'bg-gray-500', 'bg-neutral-900', 'bg-gray-300', 'bg-white',
    'bg-stone-200', 'bg-orange-500', 'bg-lime-800', 'bg-green-500', 'bg-blue-500',
    'bg-amber-900', 'bg-indigo-900', 'bg-slate-700', 'bg-yellow-50', 'bg-zinc-400',
    'bg-slate-100', 'bg-stone-400', 'bg-amber-100', 'bg-emerald-600', 'bg-cyan-700',
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}
