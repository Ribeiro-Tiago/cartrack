import React from 'react';
import PropTypes from 'prop-types'

import "./UserItem.css";

export default class UserItem extends React.Component {
    renderSection(imgName, altText, texts) {
        return (
            <div className="item-group">
                <img src={require(`../../assets/images/${imgName}.png`)} alt={altText} />

                <div>
                    {texts.map((text, index) => <p key={index}>{text}</p>)}
                </div>
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
                    {this.renderSection("user", "User Info", [
                        this.props.user.username,
                        this.props.user.email,
                        this.props.user.website
                    ])}

                    <hr />

                    {this.renderSection("home", "Home info", [
                        `${this.props.user.address.street} ${this.props.user.address.suite}`,
                        `${this.props.user.address.zipcode}, ${this.props.user.address.city}`
                    ])}

                    <hr />

                    {this.renderSection("team", "Company info", [
                        this.props.user.company.name,
                        this.props.user.company.bs,
                        `"${this.props.user.company.catchPhrase}"`
                    ])}
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