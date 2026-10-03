import { Component } from "react";

const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Small steps every day lead to big changes.",
  "Consistency beats intensity.",
  "Show up today. Future you will say thanks.",
  "Progress, not perfection.",
];

export default class MotivationQuote extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.nextQuote = this.nextQuote.bind(this);
  }

  componentDidMount() {
    this.setState({
      index: Math.floor(Math.random() * QUOTES.length),
    });
  }

  nextQuote() {
    this.setState((prev) => ({
      index: (prev.index + 1) % QUOTES.length,
    }));
  }

  render() {
    return (
      <div className="alert alert-info d-flex justify-content-between align-items-center flex-wrap gap-2">
        <em>💬 {QUOTES[this.state.index]}</em>

        <button
          className="btn btn-sm btn-info"
          onClick={this.nextQuote}
        >
          New quote
        </button>
      </div>
    );
  }
}