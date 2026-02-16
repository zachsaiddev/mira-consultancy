export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="section-padding">
        <div className="prose-width">
          <p className="section-label mb-8">Mira Consultancy</p>
          <h1 className="mb-6">Technology that moves your business forward.</h1>
          <p className="text-lg text-text-secondary max-w-[38rem]">
            Custom applications, AI agents, and workflow automation — built with precision for businesses that need to move fast.
          </p>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="prose-width">
          <h2 className="mb-4">Design System Test</h2>
          <p>Primary text on dark background — this should be clearly readable.</p>
          <p className="text-text-tertiary text-sm mt-2">
            Tertiary text — subtle but still accessible.
          </p>
        </div>
      </section>
    </main>
  )
}
