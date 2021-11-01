/* eslint-disable no-unused-expressions */
import React from "react";

class PermissionWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        havePermissions: false,
      };
      this.checkPermissions = this.checkPermissions.bind(this);
    }
  
    checkPermissions() {
      const permissions = navigator.mediaDevices.getUserMedia({audio: true, video: false})
      permissions.then((stream) => {
        alert('accepted the permissions');
        this.setState(((prevState) => {
          // eslint-disable-next-line no-labels
          !prevState.havePermissions
        }));
      })
      .catch((err) => {
        this.setState(((prevState) => {
          false
        }));
        console.log(`${err.name} : ${err.message}`)
      });
    }

    componentDidMount(){
        this.checkPermissions()
    }
    
    render() {
      return (
        <div>
        {this.props.children}
        </div>
      );
    }
  }
export default PermissionWrapper;
