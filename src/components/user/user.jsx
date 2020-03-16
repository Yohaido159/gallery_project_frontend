import React, { Component } from 'react'

class User extends Component {
    render() {
        return (
            <div>
                <h2>Hello {this.props.user.name}</h2>
            </div>
        )
    }
}

export default User