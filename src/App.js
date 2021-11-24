import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import PopUp from "./components/PopUp";
import Notifcation from "./components/Notifcation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { showNotification as show } from "./helpers/helpers";

// const words = ["application", "programming", "interface", "wizard"];
// let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const generateRandomWord = () => {
    axios
      .get(`https://random-word-api.herokuapp.com/word?number=1`)
      .then((res) => {
        const randomWord = res.data;
        setSelectedWord(randomWord[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(selectedWord);
    // setSelectedWord("programming");
  };

  useEffect(() => {
    //generateRandomWord();
    if (!playable) {
      generateRandomWord();
      setPlayable(true);
    }

    //handles letter keys
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            //show a notification
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            //show a notification
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    correctLetters,
    wrongLetters,
    playable,
    generateRandomWord,
    selectedWord,
  ]);

  function playAgain() {
    setPlayable(false);

    //reset letters

    setCorrectLetters([]);
    setWrongLetters([]);
  }
  return (
    <div>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopUp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notifcation showNotification={showNotification} />
    </div>
  );
}

export default App;
