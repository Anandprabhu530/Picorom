import Navbar from "./components/NavBar";
import UploadImage from "./components/UploadImage";

const App = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-[80%]">
        <UploadImage />
      </div>
    </div>
  );
};

export default App;
