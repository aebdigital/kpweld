import { processSteps } from "@/lib/site-data";

type ProcessStepsProps = {
  variant?: "light" | "dark";
};

export function ProcessSteps({ variant = "light" }: ProcessStepsProps) {
  const dark = variant === "dark";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, index) => {
        const Icon = step.icon;

        return (
          <div
            key={step.title}
            className={`rounded-lg border p-5 shadow-sm ${
              dark ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white"
            }`}
          >
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-md text-sm font-black ${
                  dark ? "bg-amber-400 text-neutral-950" : "bg-neutral-950 text-white"
                }`}
              >
                {index + 1}
              </span>
              <Icon size={24} className="text-amber-600" aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-black ${dark ? "text-white" : "text-neutral-950"}`}>{step.title}</h3>
            <p className={`mt-3 text-sm leading-7 ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
