/* KEIEI.RIP — app shell / router */
function App() {
  const [route, setRoute] = React.useState({ name: 'home', data: null });
  const open = React.useCallback((d) => { window.scrollTo(0, 0); setRoute({ name: 'case', data: d }); }, []);
  const home = React.useCallback(() => { window.scrollTo(0, 0); setRoute({ name: 'home', data: null }); }, []);
  React.useEffect(() => { window.__open = open; }, [open]);

  return (
    <React.Fragment>
      <SiteHeader onHome={home} />
      {route.name === 'home'
        ? <HomeArchive onOpen={open} />
        : <CaseDetail data={route.data} onBack={home} />}
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
