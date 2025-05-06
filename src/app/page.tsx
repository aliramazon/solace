import { AdvocatesContainer } from "./pages/advocates/advocates-container";
import { AdvocatesProvider } from "./pages/advocates/store/advocates-context";

const Home = () => {
  return (
    <AdvocatesProvider>
      <AdvocatesContainer />
    </AdvocatesProvider>
  );
};

export default Home;
