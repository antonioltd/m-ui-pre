import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Themes";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello
    </ThemeProvider>
  );
}

export default App;
