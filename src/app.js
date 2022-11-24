import { Component } from "react";
import "./styles.css";

export const withCounter = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.increBy = this.props.increBy;
      this.state = {
        count: 0
      };
    }

    handleCount = (type) => {
      const incrementOrdecrement =
        type === "inc" ? this.increBy : -this.increBy;
      return () => {
        this.setState((prev) => ({
          ...prev,
          count: prev.count + incrementOrdecrement
        }));
      };
    };

    render() {
      return (
        <WrappedComponent
          {...{
            ...this.props,
            handleIncrement: this.handleCount("inc"),
            handleDecrement: this.handleCount("dec"),
            count: this.state.count
          }}
        />
      );
    }
  };
};

const TYPES = {
  WRITE: "WRITE",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO"
};

const { WRITE, AUDIO, VIDEO } = TYPES;

const convertInMMSS = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

export const formattedValue = (value, type) => {
  switch (type) {
    case AUDIO:
    case VIDEO:
      return type.toLowerCase() + " " + convertInMMSS(value);
    case WRITE:
      return `text length is : ${value}`;
    default:
      return value;
  }
};

export default function CounterLogic({
  count,
  handleIncrement,
  handleDecrement,
  type
}) {
  return (
    <>
      <button onClick={handleDecrement}>Dec-</button>
      <input
        value={formattedValue(count, type)}
        style={{ textAlign: "center" }}
        readOnly
      />
      <button onClick={handleIncrement}>Inc+</button>
    </>
  );
}

export const Counter = withCounter(CounterLogic);
