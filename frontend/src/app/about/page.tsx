export const metadata = { title: "About - Argajit Sarkar" };

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About</h1>
          <p>Story, motivation, and what drives the work.</p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          {/* TODO: replace with long-form story when ready. */}
          <p>
            I am a doctoral scholar at Tripura University working at the intersection of microbial
            pathogenesis and artificial intelligence. My work focuses on using deep learning and
            large language models to accelerate drug discovery against priority pathogens.
          </p>
          <p>
            Alongside research, I founded <a href="https://grantsetu.in">GrantSetu</a> - a platform
            that helps Indian researchers discover, apply for, and track funding opportunities. I
            also serve as a NEP Saarthi Ambassador with UGC.
          </p>
          <p>
            This site is a long-form home for my writing, free resources for M.Sc and PhD students,
            and a record of what I am working on.
          </p>
        </div>
      </section>
    </>
  );
}
