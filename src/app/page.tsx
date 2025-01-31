import Header from "./components/Header";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <Header />
        <Landing />
      </div>
    </div>
  );
}
