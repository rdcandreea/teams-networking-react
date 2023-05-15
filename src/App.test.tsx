import "./App.css";
import { AppFooter } from "./footer/components";
import Header from "./header";
import { ContentWrapper } from "./main/components";

function App() {
  return (
    <>
      <Header />
      <ContentWrapper />
      <AppFooter />
    </>
  );
}

export default App;
