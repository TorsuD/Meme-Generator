import React from "react";
import "./MemeGenerator.css";


class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg:
        "https://i.pinimg.com/originals/23/35/98/233598c82aa5c97feb101d4a29cc9085.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  render() {
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <input
            name="topText"
            className="top"
            value={this.state.topText}
            onChange={this.handleChange}
            placeHolder="Top Text"
          />

          <input
            name="bottomText"
            className="bottom"
            value={this.state.bottomText}
            onChange={this.handleChange}
            placeHolder="Bottom Text"
          />
          <button className="button">Generate</button>
        </form>

        <div className="meme">
          <img className="image" src={this.state.randomImg} alt="meme" />
          <h2 className="topper">{this.state.topText}</h2>
          <h2 className="bottomer">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
