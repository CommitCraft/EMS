interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  tone?: StatCardTone;
}

type StatCardTone =
  | 'blue'
  | 'orange'
  | 'emerald'
  | 'purple'
  | 'rose'
  | 'amber'
  | 'cyan'
  | 'indigo'
  | 'teal'
  | 'lime'
  | 'pink'
  | 'red'
  | 'slate'
  | 'violet'
  | 'sky'
  | 'green';

const toneClasses: Record<
  StatCardTone,
  {
    top: string;
    icon: string;
  }
> = {
  blue: { top: 'bg-blue-400', icon: 'text-blue-700' },
  orange: { top: 'bg-orange-400', icon: 'text-orange-700' },
  emerald: { top: 'bg-emerald-400', icon: 'text-emerald-700' },
  purple: { top: 'bg-purple-400', icon: 'text-purple-700' },
  rose: { top: 'bg-rose-400', icon: 'text-rose-700' },
  amber: { top: 'bg-amber-400', icon: 'text-amber-700' },
  cyan: { top: 'bg-cyan-400', icon: 'text-cyan-700' },
  indigo: { top: 'bg-indigo-400', icon: 'text-indigo-700' },
  teal: { top: 'bg-teal-400', icon: 'text-teal-700' },
  lime: { top: 'bg-lime-400', icon: 'text-lime-700' },
  pink: { top: 'bg-pink-400', icon: 'text-pink-700' },
  red: { top: 'bg-red-400', icon: 'text-red-700' },
  slate: { top: 'bg-slate-400', icon: 'text-slate-700' },
  violet: { top: 'bg-violet-400', icon: 'text-violet-700' },
  sky: { top: 'bg-sky-400', icon: 'text-sky-700' },
  green: { top: 'bg-green-400', icon: 'text-green-700' },
};

export const StatCard = ({
  title,
  value,
  subtext,
  tone = 'blue',
}: StatCardProps) => {
  const toneClass = toneClasses[tone] ?? toneClasses.blue;

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