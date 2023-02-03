import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  document.title = "E-Ticket";
  return (
    <div className="app">
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
