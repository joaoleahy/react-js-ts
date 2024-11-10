import './index.css';

function App() {
  return (
    <div className="flex flex-col container mx-auto h-screen gap-y-1 text-center text-white">
      <header className="center-flex bg-crystal-blue w-full h-19/200">
        <h2 className="text-2xl font-normal">Header</h2>
      </header>
      <main className="flex flex-col flex-1 gap-y-1">
        <section className="flex flex-row gap-x-1 w-full h-[78%]">
          <section className="flex flex-col w-[39.5%] h-full gap-y-1">
            <section className="flex justify-center bg-pastel-lilac h-[42.5%] pt-6">
              <h2 className="text-2xl font-normal">Hero</h2>
            </section>
            <nav className="flex justify-center bg-light-moss-green flex-grow pt-6">
              <h2 className="text-2xl font-normal">Sidebar</h2>
            </nav>
          </section>
          <section className="flex flex-col flex-grow h-full gap-y-1">
            <section className="flex justify-center bg-golden-yellow h-7/10 pt-6">
              <h2 className="text-2xl font-normal">Main Content</h2>
            </section>
            <section className="flex justify-center bg-foggy-gray flex-grow pt-6">
              <h2 className="text-2xl font-normal">Extra Content</h2>
            </section>
          </section>
        </section>
        <section className="flex flex-row flex-grow w-full gap-x-1">
          <section className="flex justify-center bg-emerald-green w-7/10 pt-6">
            <h2 className="text-2xl font-normal">Related Images</h2>
          </section>
          <section className="center-flex bg-cotton-candy-pink flex-grow">
            <h2 className="text-2xl font-normal">Related <br /> Posts</h2>
          </section>
        </section>
      </main>
      <footer className="center-flex bg-solar-orange h-19/200">
        <h2 className="text-2xl font-normal">Footer</h2>
      </footer>
    </div>
  );
}

export default App;
