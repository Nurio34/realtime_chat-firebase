import Left from "./Left";
import Center from "./Center";
import Right from "./Right";

function App() {
    return (
        <main
            className="w-[90vw] h-[90vh] 
              grid grid-cols-[1fr,2fr,1fr]
            "
        >
            <Left />
            <Center />
            <Right />
        </main>
    );
}

export default App;
