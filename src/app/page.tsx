import { SectionIndex } from "@/components/brand/section-header"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col px-gx">
      <div className="flex flex-1 flex-col justify-center py-24">
        <div className="flex items-start gap-4 md:gap-6">
          <SectionIndex index={0} className="mt-[0.35em] shrink-0" />
          <div>
            <p className="type-label text-mute">Career Explorer</p>
            <h1 className="mt-4 type-display-l text-fg">
              Beyond the{" "}
              <span className="bg-accent px-[0.08em] text-ink">Blackboard</span>
            </h1>
            <p className="mt-8 max-w-(--measure) type-lead text-fg-body">
              What could you become, and how do you get there? A career guide for
              students in Class 8 to 12.
            </p>
            <p className="mt-10 font-mono text-sm font-bold tracking-[0.12em] text-fg uppercase">
              Coming soon
              <span aria-hidden="true" className="ml-1 text-accent">
                ▮
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
