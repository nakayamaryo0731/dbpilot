import "./App.css";
import { Header, Sidebar, MainPanel, StatusBar } from "./components/layout";

function App() {
  return (
    <div className="flex h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainPanel />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
