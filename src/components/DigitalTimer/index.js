import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.IntervalId)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-container">
        <p className="set-timer-description">Set Timer Limit</p>
        <div className="increment-decrement-buttons-container">
          <button
            type="button"
            className="inc-dec-btn"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <p className="count">{timerLimitInMinutes}</p>
          <button
            type="button"
            className="inc-dec-btn"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerComplete = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.IntervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="buttons-container">
        <button
          type="button"
          className="start-pause-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="start-pause-icon"
          />

          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="start-pause-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="start-pause-icon"
          />
          Reset
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingInSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingInSeconds / 60)
    const seconds = Math.floor(totalRemainingInSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="clock-container">
          <div className="clock-background-container">
            <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
            <p>{labelText}</p>
          </div>
          <div className="btn-set-timer-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
