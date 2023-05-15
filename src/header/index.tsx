import { MainMenu } from "../menu/MainMenu";
import logo from "./network-team-icon.png";

export default function AppHeader() {
  return (
    <header>
      <div id="header-wrapper">
        <div>
          <img src={logo} alt="Selfie" height="100" />
        </div>
        <div>
          <h1>Radac Andreea</h1>
          <h2 id="job-title">QA Automation</h2>
        </div>
      </div>

      <MainMenu />
    </header>
  );
}
