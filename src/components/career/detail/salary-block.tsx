import { Badge } from "@/components/ui/badge"
import { careerDetailCopy as copy } from "@/content/career-detail"
import { formatINR } from "@/lib/format"
import type { SalaryRange } from "@/types/career"

/** Typical starting range (marked approximate) + the official pay level table where one exists. */
export function SalaryBlock({ salary }: { salary: SalaryRange }) {
  const official = salary.officialPay ?? []
  return (
    <div className="max-w-(--measure)">
      <div className="flex flex-wrap items-center gap-3">
        <p className="type-label text-mute">{copy.salary.startLabel}</p>
        {salary.approximate ? <Badge variant="warn">{copy.salary.approximate}</Badge> : null}
      </div>
      <p className="mt-4 text-[clamp(30px,3.6vw,52px)] leading-[1.05] font-bold tracking-[-0.04em] text-fg tabular-nums">
        {formatINR(salary.min)}
        <span className="text-mute"> – </span>
        {formatINR(salary.max)}
      </p>
      <p className="mt-2 type-label text-mute">{copy.salary.perMonth}</p>
      {salary.note ? <p className="mt-6 type-body text-fg-body">{salary.note}</p> : null}

      {official.length > 0 ? (
        <div className="mt-12 border-t border-line pt-10">
          <h3 className="type-label text-fg">{copy.salary.officialLabel}</h3>
          <p className="mt-2 type-small text-mute">{copy.salary.officialIntro}</p>
          <div className="mt-5 overflow-x-auto border border-line">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-surface-2">
                  <th scope="col" className="px-3.5 py-2.5 text-left type-label whitespace-nowrap text-fg">
                    {copy.salary.post}
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 text-right type-label whitespace-nowrap text-fg">
                    {copy.salary.level}
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 text-right type-label whitespace-nowrap text-fg">
                    {copy.salary.basicPay}
                  </th>
                </tr>
              </thead>
              <tbody>
                {official.map((o) => (
                  <tr key={o.post} className="border-t border-line">
                    <th scope="row" className="px-3.5 py-2.5 text-left font-normal whitespace-nowrap text-fg-body">
                      {o.post}
                    </th>
                    <td className="px-3.5 py-2.5 text-right whitespace-nowrap text-fg-body tabular-nums">
                      {o.level}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-medium whitespace-nowrap text-fg tabular-nums">
                      {formatINR(o.basicPay)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  )
}
