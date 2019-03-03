import React from 'react';
import PropTypes from 'prop-types'

import "./UserItem.css";

export default class UserItem extends React.Component {
    renderItem(label, value) {
        return (
            <div className="item-group">
                <p className="label">{label}</p>
                <p>{value}</p>
            </div>
        )
    }

    render() {
        return (
            <div className="card">
                <div className="header">
                    <p>{this.props.user.name}</p>
                </div>

                <div className="body">
                    <section>
                        {this.renderItem("Username", this.props.user.username)}
                        {this.renderItem("Email", this.props.user.email)}
                        {this.renderItem("Website", this.props.user.website)}
                    </section>
                    <hr />
                    <section>
                        {this.renderItem("Address", `${this.props.user.address.street} ${this.props.user.address.suite}`)}
                        {this.renderItem("", `${this.props.user.address.zipcode}, ${this.props.user.address.city}`)}
                    </section>
                    <hr />
                    <section>
                        {this.renderItem("Company", this.props.user.company.name)}
                        {this.renderItem("", this.props.user.company.bs)}
                        {this.renderItem("", `"${this.props.user.company.catchPhrase}"`)}
                    </section>
                </div>

                <div className="footer">
                    <span>Call member!</span>
                </div>
            </div>
        );
    }
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};