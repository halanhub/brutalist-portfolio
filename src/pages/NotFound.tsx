const NotFound = () => (
  <main className="gutter flex min-h-[100svh] flex-col justify-between py-8">
    <p className="label text-mute">Hampus Lang — 404</p>
    <div>
      <h1 className="display text-[30vw] leading-[0.8] lg:text-[22vw]">
        No <span className="serif-i text-arc">signal.</span>
      </h1>
      <p className="mt-6 max-w-[40ch] text-paper/70">This page doesn't exist. The line may have moved.</p>
    </div>
    <a href="/" className="label wipe w-fit pb-0.5">
      ← Back to the homepage
    </a>
  </main>
);

export default NotFound;
