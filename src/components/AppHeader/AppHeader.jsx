import "./appHeader.css";

const AppHeader = () => {
  return (
    <header className='app-header'>
      <h1>Cinemas</h1>
      <nav>
        <ul>
          <li>
            <a href='#filmer'>Filmer</a>
          </li>
          <li>
            <a href='#kinoer'>Kinoer</a>
          </li>
          <li>
            <a href='#logginn'>Logg inn</a>
          </li>
          <li>
            <a href='#register'>Registrer</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
