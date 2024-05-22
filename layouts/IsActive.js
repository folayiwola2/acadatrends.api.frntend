import React, { Component } from 'react'

export class IsActive extends Component {
    constructor(props) {
        super(props);

        this.state = { logginStatus: true };
        this.events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress"
        ];

        this.warn = this.warn.bind(this);
        this.logout = this.logout.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);

        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
        }

        this.setTimeout();
    }

    clearTimeout() {
        if (this.warnTimeout) clearTimeout(this.warnTimeout);

        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    }

    setTimeout() {
        this.warnTimeout = setTimeout(this.warn, 16 * 1000);

        this.logoutTimeout = setTimeout(this.logout, 30 * 1000);
    }

    resetTimeout() {
        this.clearTimeout();
        this.setTimeout();
    }

    warn() {
        alert("You will be logged out automatically in 1 minute.");
    }

    logout() {
        // Send a logout request to the API

        this.setState({ logginStatus: false });
        console.log("Sending a logout request to the API...", this.state, this.props);
        return this.destroy(); // Cleanup
    }

    handleLogOut = async (e) => {
        let local = await JSON.parse(localStorage.getItem("admin"))
        e.preventDefault();
        if (!local) {
            localStorage.clear();
            window.location.pathname = '/admin/login'
        }
    }

    destroy() {
        this.clearTimeout();

        for (var i in this.events) {
            window.removeEventListener(this.events[i], this.resetTimeout);
        }
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default IsActive
