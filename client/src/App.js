import './App.css';

import Welcome from './components/Welcome';
import ChooseTopic from './components/ChooseTopic';
import Prompt from './components/Prompt';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome></Welcome>
        <ChooseTopic></ChooseTopic>
        <Prompt></Prompt>
      </header>
    </div>
  );
}

export default App;
