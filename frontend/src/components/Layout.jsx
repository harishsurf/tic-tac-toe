import React from "react";
import { Grid } from "./Grid";
import { Restart } from "./RestartComponent";

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [],
    };
  }

  componentDidMount() {
    this.props.socket.on("board-state", (board) => {
      this.setState({ boardState: board });
    });
  }

  //   componentDidUpdate() {
  //     this.props.socket.on("board-state", (board) => {
  //       console.log("board", board);
  //       this.setState({ boardState: board });
  //     });
  //   }

  render() {
    return (
      <React.Fragment>
        <Grid
          board={this.state.boardState}
          socket={this.props.socket}
          playerMark={this.props.playerMark}
          isPlayerOne={this.props.isPlayerOne}
          playerName={this.props.playerName}
        />
        <Restart socket={this.props.socket} />
      </React.Fragment>
    );
  }
}
