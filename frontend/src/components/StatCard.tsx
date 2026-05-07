interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  tone?: StatCardTone;
}

type StatCardTone =
  | 'accent'
  | 'copper'
  | 'neutral'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'slate'
  | 'zinc'
  | 'stone'
  | 'gray'
  | 'redDark'
  | 'orangeDark'
  | 'amberDark'
  | 'yellowDark'
  | 'limeDark'
  | 'greenDark'
  | 'emeraldDark'
  | 'tealDark'
  | 'cyanDark'
  | 'skyDark'
  | 'blueDark'
  | 'indigoDark'
  | 'violetDark'
  | 'purpleDark'
  | 'fuchsiaDark'
  | 'pinkDark'
  | 'roseDark'
  | 'navy'
  | 'royal'
  | 'ocean'
  | 'aqua'
  | 'mint'
  | 'forest'
  | 'olive'
  | 'gold'
  | 'mustard'
  | 'caramel'
  | 'bronze'
  | 'coffee'
  | 'chocolate'
  | 'maroon'
  | 'wine'
  | 'magenta'
  | 'lavender'
  | 'orchid'
  | 'plum'
  | 'grape'
  | 'steel'
  | 'ice'
  | 'petrol'
  | 'army'
  | 'sand'
  | 'clay'
  | 'coral'
  | 'salmon'
  | 'peach'
  | 'cream'
  | 'midnight'
  | 'industrial'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

const toneClasses: Record<
  StatCardTone,
  {
    top: string;
    icon: string;
  }
> = {
  accent: { top: 'bg-blue-400', icon: 'text-blue-700' },
  copper: { top: 'bg-orange-400', icon: 'text-orange-700' },
  neutral: { top: 'bg-slate-400', icon: 'text-slate-700' },

  red: { top: 'bg-red-400', icon: 'text-red-700' },
  orange: { top: 'bg-orange-400', icon: 'text-orange-700' },
  amber: { top: 'bg-amber-400', icon: 'text-amber-700' },
  yellow: { top: 'bg-yellow-300', icon: 'text-yellow-700' },
  lime: { top: 'bg-lime-400', icon: 'text-lime-700' },
  green: { top: 'bg-green-400', icon: 'text-green-700' },
  emerald: { top: 'bg-emerald-400', icon: 'text-emerald-700' },
  teal: { top: 'bg-teal-400', icon: 'text-teal-700' },
  cyan: { top: 'bg-cyan-400', icon: 'text-cyan-700' },
  sky: { top: 'bg-sky-400', icon: 'text-sky-700' },
  blue: { top: 'bg-blue-500', icon: 'text-blue-800' },
  indigo: { top: 'bg-indigo-400', icon: 'text-indigo-700' },
  violet: { top: 'bg-violet-400', icon: 'text-violet-700' },
  purple: { top: 'bg-purple-400', icon: 'text-purple-700' },
  fuchsia: { top: 'bg-fuchsia-400', icon: 'text-fuchsia-700' },
  pink: { top: 'bg-pink-400', icon: 'text-pink-700' },
  rose: { top: 'bg-rose-400', icon: 'text-rose-700' },
  slate: { top: 'bg-slate-500', icon: 'text-slate-800' },
  zinc: { top: 'bg-zinc-500', icon: 'text-zinc-800' },
  stone: { top: 'bg-stone-500', icon: 'text-stone-800' },
  gray: { top: 'bg-gray-500', icon: 'text-gray-800' },

  redDark: { top: 'bg-red-700', icon: 'text-red-200' },
  orangeDark: { top: 'bg-orange-700', icon: 'text-orange-200' },
  amberDark: { top: 'bg-amber-700', icon: 'text-amber-200' },
  yellowDark: { top: 'bg-yellow-600', icon: 'text-yellow-100' },
  limeDark: { top: 'bg-lime-700', icon: 'text-lime-200' },
  greenDark: { top: 'bg-green-700', icon: 'text-green-200' },
  emeraldDark: { top: 'bg-emerald-700', icon: 'text-emerald-200' },
  tealDark: { top: 'bg-teal-700', icon: 'text-teal-200' },
  cyanDark: { top: 'bg-cyan-700', icon: 'text-cyan-200' },
  skyDark: { top: 'bg-sky-700', icon: 'text-sky-200' },
  blueDark: { top: 'bg-blue-700', icon: 'text-blue-200' },
  indigoDark: { top: 'bg-indigo-700', icon: 'text-indigo-200' },
  violetDark: { top: 'bg-violet-700', icon: 'text-violet-200' },
  purpleDark: { top: 'bg-purple-700', icon: 'text-purple-200' },
  fuchsiaDark: { top: 'bg-fuchsia-700', icon: 'text-fuchsia-200' },
  pinkDark: { top: 'bg-pink-700', icon: 'text-pink-200' },
  roseDark: { top: 'bg-rose-700', icon: 'text-rose-200' },

  navy: { top: 'bg-[#1e3a8a]', icon: 'text-[#bfdbfe]' },
  royal: { top: 'bg-[#4338ca]', icon: 'text-[#c7d2fe]' },
  ocean: { top: 'bg-[#0369a1]', icon: 'text-[#bae6fd]' },
  aqua: { top: 'bg-[#0891b2]', icon: 'text-[#cffafe]' },
  mint: { top: 'bg-[#34d399]', icon: 'text-[#047857]' },
  forest: { top: 'bg-[#166534]', icon: 'text-[#bbf7d0]' },
  olive: { top: 'bg-[#4d7c0f]', icon: 'text-[#d9f99d]' },
  gold: { top: 'bg-[#facc15]', icon: 'text-[#854d0e]' },
  mustard: { top: 'bg-[#ca8a04]', icon: 'text-[#fef3c7]' },
  caramel: { top: 'bg-[#b45309]', icon: 'text-[#fed7aa]' },
  bronze: { top: 'bg-[#92400e]', icon: 'text-[#fde68a]' },
  coffee: { top: 'bg-[#78350f]', icon: 'text-[#fde68a]' },
  chocolate: { top: 'bg-[#7c2d12]', icon: 'text-[#fed7aa]' },
  maroon: { top: 'bg-[#7f1d1d]', icon: 'text-[#fecaca]' },
  wine: { top: 'bg-[#881337]', icon: 'text-[#fbcfe8]' },
  magenta: { top: 'bg-[#be185d]', icon: 'text-[#fce7f3]' },
  lavender: { top: 'bg-[#a78bfa]', icon: 'text-[#5b21b6]' },
  orchid: { top: 'bg-[#c084fc]', icon: 'text-[#6b21a8]' },
  plum: { top: 'bg-[#9333ea]', icon: 'text-[#f3e8ff]' },
  grape: { top: 'bg-[#6d28d9]', icon: 'text-[#ddd6fe]' },
  steel: { top: 'bg-[#475569]', icon: 'text-[#cbd5e1]' },
  ice: { top: 'bg-[#67e8f9]', icon: 'text-[#155e75]' },
  petrol: { top: 'bg-[#0f766e]', icon: 'text-[#ccfbf1]' },
  army: { top: 'bg-[#3f6212]', icon: 'text-[#ecfccb]' },
  sand: { top: 'bg-[#d6d3d1]', icon: 'text-[#57534e]' },
  clay: { top: 'bg-[#a16207]', icon: 'text-[#fef9c3]' },
  coral: { top: 'bg-[#fb7185]', icon: 'text-[#9f1239]' },
  salmon: { top: 'bg-[#f87171]', icon: 'text-[#991b1b]' },
  peach: { top: 'bg-[#fdba74]', icon: 'text-[#9a3412]' },
  cream: { top: 'bg-[#fef3c7]', icon: 'text-[#92400e]' },
  midnight: { top: 'bg-[#0f172a]', icon: 'text-[#93c5fd]' },
  industrial: { top: 'bg-[#334155]', icon: 'text-[#f59e0b]' },

  success: { top: 'bg-[#22c55e]', icon: 'text-[#14532d]' },
  warning: { top: 'bg-[#f59e0b]', icon: 'text-[#78350f]' },
  danger: { top: 'bg-[#ef4444]', icon: 'text-[#7f1d1d]' },
  info: { top: 'bg-[#38bdf8]', icon: 'text-[#075985]' },
};

export const StatCard = ({
  title,
  value,
  subtext,
  tone = 'neutral',
}: StatCardProps) => {
  const toneClass = toneClasses[tone] ?? toneClasses.neutral;

  return (
    <div className="group h-[150px] w-full max-w-[230px] cursor-pointer overflow-hidden rounded-2xl text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Top Icon Section */}
      <div
        className={`relative h-[48px] overflow-hidden rounded-t-2xl ${toneClass.top} transition duration-300 group-hover:translate-y-2`}
      >
        <div className="absolute right-4 top-1 opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="58"
            width="58"
            viewBox="0 0 76 77"
            className={toneClass.icon}
          >
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="relative -mt-2 rounded-2xl bg-[#1c204b] p-4 transition duration-300 group-hover:bg-[#262b63]">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white">{title}</div>

          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bbc0ff]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#bbc0ff]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#bbc0ff]" />
          </div>
        </div>

        <div className="mt-4 text-3xl font-semibold leading-none text-white">
          {value}
        </div>

        {subtext ? (
          <p className="mt-3 text-xs leading-5 text-[#bbc0ff]">
            {subtext}
          </p>
        ) : null}
      </div>
    </div>
  );
};