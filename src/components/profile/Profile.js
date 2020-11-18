import React from 'react';
import './Profile.scss';
import Control, {required} from '../control/Control';

class Profile extends React.Component {
    profileMenuOpenedSubscription = null;
    profileMenuOpened = null;

    formValues = {
        name: {
            name: 'name',
            placeholder: 'Name',
            value: '',
            validators: [required],
            ref: React.createRef()
        },
        profession: {
            name: 'profession',
            placeholder: 'Profession',
            value: '',
            validators: [required],
            ref: React.createRef()
        },
        email: {
            name: 'email',
            placeholder: 'Email',
            value: '',
            validators: [required],
            ref: React.createRef()
        },
        password: {
            name: 'password',
            placeholder: 'Password',
            value: '',
            validators: [required],
            ref: React.createRef()
        },
        notifications: {
            monday: {
                name: 'monday',
                placeholder: 'Monday',
                value: true,
                validators: [],
                ref: React.createRef()
            },
            tuesday: {
                name: 'tuesday',
                placeholder: 'Tuesday',
                value: false,
                validators: [],
                ref: React.createRef()
            },
            wednesday: {
                name: 'wednesday',
                placeholder: 'Wednesday',
                value: true,
                validators: [],
                ref: React.createRef()
            },
            thursday: {
                name: 'thursday',
                placeholder: 'Thursday',
                value: false,
                validators: [],
                ref: React.createRef()
            },
            friday: {
                name: 'friday',
                placeholder: 'Friday',
                value: true,
                disabled: true,
                validators: [],
                ref: React.createRef()
            }
        }
    };

    constructor(props) {
        super(props);

        this.headerRef = React.createRef();

        this.profileMenuOpenedSubscription = props.profileMenuOpened$.subscribe((value) => {
            this.profileMenuOpened = value;
            this.forceUpdate();
        });
    }

    componentDidMount() {
        this.formValues.name.value = this.props.user.name;
        this.formValues.profession.value = this.props.user.profession || 'Photographer';
        this.formValues.email.value = this.props.user.email;
        this.formValues.password.value = this.props.user.password;

        if (this.props.user.notifications !== undefined && Object.keys(this.props.user.notifications).length) {
            for (const key of Object.keys(this.props.user.notifications)) {
                if (!this.hasOwnProperty(key)) {
                    continue;
                }

                this.formValues.notifications[key].value = this.props.user.notifications[key];
            }
        }

        this.forceUpdate();
    }

    render() {
        return (
            <div className={"Profile d-none d-lg-block" + (this.profileMenuOpened ? ' opened' : '')} ref={this.headerRef}>
                <div className="settings-wrapper">
                    <div className="profile-picture">
                        <div><i className="fa fa-cloud-upload" aria-hidden="true"/></div>
                        <div style={{backgroundImage: 'url("avatar.jpg")'}}/>
                        <div><i className="fa fa-cloud-download" aria-hidden="true"/></div>
                    </div>

                    <div className="profile-settings">
                        <div className="setting-wrapper">
                            <Control formControl={this.formValues.name} type="text" icon='<i class="fa fa-user" aria-hidden="true"></i>'/>
                        </div>
                        <div className="setting-wrapper">
                            <Control formControl={this.formValues.profession} type="text" icon='<i class="fa fa-align-left" aria-hidden="true"></i>'/>
                        </div>
                        <div className="setting-wrapper">
                            <Control formControl={this.formValues.email} type="email" icon='<i class="fa fa-envelope" aria-hidden="true"></i>'/>
                        </div>
                        <div className="setting-wrapper">
                            <Control formControl={this.formValues.password} type="password" icon='<i class="fa fa-lock" aria-hidden="true"></i>'/>
                        </div>
                    </div>

                    <div className="notification-settings">
                        <div className="section-title">Email Notifications</div>
                        <ul>
                            <li>
                                <div>Monday</div>
                                <Control formControl={this.formValues.notifications.monday} type="checkbox"/>
                            </li>
                            <li>
                                <div>Tuesday</div>
                                <Control formControl={this.formValues.notifications.tuesday} type="checkbox"/>
                            </li>
                            <li>
                                <div>Wednesday</div>
                                <Control formControl={this.formValues.notifications.wednesday} type="checkbox"/>
                            </li>
                            <li>
                                <div>Thursday</div>
                                <Control formControl={this.formValues.notifications.thursday} type="checkbox"/>
                            </li>
                            <li className="disabled">
                                <div>Friday</div>
                                <Control formControl={this.formValues.notifications.friday} type="checkbox"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer">
                    <i className="fa fa-angle-right" aria-hidden="true" onClick={this.props.toggleProfile}/>
                    <span className="footer-tooltip">SAVING...</span>
                    <i className="fa fa-power-off" aria-hidden="true" onClick={() => {this.props.updateUser(null)}}/>
                </div>
            </div>
        );
    }
}

export default Profile;
