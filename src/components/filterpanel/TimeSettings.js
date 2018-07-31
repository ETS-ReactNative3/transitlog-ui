import React, {Component} from "react";
import TimeSlider from "./TimeSlider";
import moment from "moment";

class TimeSettings extends Component {
  onTimeButtonClick = (modifier) => (e) => {
    const {queryTime, onChangeQueryTime} = this.props;

    const nextDate = moment(queryTime, "HH:mm:ss")
      .add(modifier, "seconds")
      .format("HH:mm:ss");

    onChangeQueryTime(nextDate);
  };

  render() {
    const {
      onClickPlay,
      isPlaying,
      timeIncrement,
      onChangeQueryTime,
      queryTime,
      setTimeIncrement,
    } = this.props;

    return (
      <div>
        <p>
          <label>Choose time</label>
        </p>
        <p>
          <TimeSlider value={queryTime} onChange={onChangeQueryTime} />
        </p>
        <p className="control-group">
          <button onClick={this.onTimeButtonClick(-timeIncrement)}>
            &lsaquo; {timeIncrement} sek.
          </button>
          <input
            value={queryTime}
            onChange={(e) => onChangeQueryTime(e.target.value)}
          />
          <button onClick={this.onTimeButtonClick(timeIncrement)}>
            &rsaquo; {timeIncrement} sek.
          </button>
          <input
            type="number"
            max={1000}
            maxLength={4}
            value={timeIncrement}
            onChange={setTimeIncrement}
          />
        </p>
        <p>
          <button onClick={onClickPlay}>
            {isPlaying ? "Pysäytä simulaatio" : "Simuloi"}
          </button>
        </p>
      </div>
    );
  }
}

export default TimeSettings;
