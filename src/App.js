import React, { Component } from "react";
import "./App.css";
import poke from "./poke.json";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import PokeDeck from "./components/PokeDeck";
import NavPills from "./components/NavPills";

class App extends Component {
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    poke: poke,
    unselectedPoke: poke
  };

  componentDidMount() {}

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  selectPoke = type => {
    const findPoke = this.state.unselectedPoke.find(item => item.type === type);

    if (findPoke === undefined) {
      // failure to select a new pokemon
      this.setState({
        message: "You guessed incorrectly!",
        topScore:(this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        poke: poke,
        unselectedPoke: poke
      });
    } 
    else {
      // success to select a new pokemon
      const newPoke = this.state.unselectedPoke.filter(item => item.type !== type);

      this.setState({
        message: "You guessed correctly!",
        curScore: this.state.curScore + 1,
        poke: poke,
        unselectedPoke: newPoke
      });
    }

    this.shuffleArray(poke);
  };

  render() {
    return (
      <Wrapper>
        <NavPills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title />
        {
          this.state.poke.map(poke => (
          <PokeDeck
            type={poke.type}
            image={poke.image}
            selectPoke={this.selectPoke}
            curScore={this.state.curScore}
          />
        ))
        }
      </Wrapper>
    );
  }
}

export default App;
