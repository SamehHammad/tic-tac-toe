import { useRef, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const [nameX, setNameX] = useState("");
  const [nameO, setNameO] = useState("");
  const [started, setStarted] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleNames = () => {
    setClicked(true);
    if (nameX && nameO) {
      setStarted(true);
    } else {
      // Handle validation error, for example, by setting an error state
    }
  };

  return (
    <div className="app-container">
      {!started ? (
        <div className="inputs-container d-flex justify-content-center">
          <Form>
            <Form.Group controlId="playerX" className="m-3">
              <Form.Control
                type="text"
                value={nameX}
                onChange={(e) => setNameX(e.target.value)}
                placeholder="Enter X player name"
                className={!nameX && clicked ? "is-invalid " : ""}
              />
              {!nameX && clicked ? (
                <Form.Control.Feedback type="invalid">
                  Please enter X player name.
                </Form.Control.Feedback>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group controlId="playerO" className="m-3">
              <Form.Control
                type="text"
                value={nameO}
                onChange={(e) => setNameO(e.target.value)}
                placeholder="Enter O player name"
                className={!nameO && clicked ? "is-invalid " : ""}
              />
              {!nameO && clicked ? (
                <Form.Control.Feedback type="invalid">
                  Please enter O player name.
                </Form.Control.Feedback>
              ) : (
                ""
              )}
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleNames}
              className="save-btn "
            >
              Save
            </Button>
          </Form>
        </div>
      ) : (
        ""
      )}
      {started && (
        <div className="game-container">
          <Game nameX={nameX} nameO={nameO} />
        </div>
      )}
    </div>
  );
}

export default App;
