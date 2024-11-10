import './index.css';

function App() {
  return (
    <div className="flex flex-col container mx-auto h-screen gap-y-1 text-center">
      <header className="center-flex bg-crystal-blue w-full h-19/200">
        <h2>Header</h2>
      </header>
      <main className="flex flex-col flex-1 gap-y-1">
        <section className="flex flex-row gap-x-1 w-full h-[78%]">
          <section className="flex flex-col w-[39.5%] h-full gap-y-1">
            <section className="center-flex bg-pastel-lilac h-[42.5%]">
              <h2>Hero</h2>
            </section>
            <nav className="center-flex bg-light-moss-green flex-grow">
              <h2>Sidebar</h2>
            </nav>
          </section>
          <section className="flex flex-col flex-grow h-full gap-y-1">
            <section className="center-flex bg-golden-yellow h-7/10">
              <h2>Main Content</h2>
            </section>
            <section className="center-flex bg-foggy-gray flex-grow">
              <h2>Extra Content</h2>
            </section>
          </section>
        </section>
        <section className="flex flex-row flex-grow w-full gap-x-1">
          <section className="center-flex bg-emerald-green w-7/10">
            <h2>Related Images</h2>
          </section>
          <section className="center-flex bg-cotton-candy-pink flex-grow">
            <h2>Related Posts</h2>
          </section>
        </section>
      </main>
      <footer className="center-flex bg-solar-orange h-19/200">
        <h2>Footer</h2>
      </footer>
    </div>
  );
}

export default App;
