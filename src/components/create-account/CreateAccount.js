import React from 'react';
import './CreateAccount.scss';
import Header from "../header/Header";
import Control, {email, required} from "../control/Control";

export default class CreateAccount extends React.Component {
    createProfileOpenedSubscription = null;
    createProfileOpened = null;

    formValues = {
        name: {
            name: 'name',
            placeholder: 'Name',
            value: '',
            validators: [required],
            ref: React.createRef()
        },
        email: {
            name: 'email',
            placeholder: 'Email',
            value: '',
            validators: [required, email],
            ref: React.createRef()
        },
        password: {
            name: 'password',
            placeholder: 'Password',
            value: '',
            validators: [required],
            ref: React.createRef()
        }
    };

    constructor(props) {
        super(props);

        this.createProfileOpenedSubscription = props.createProfileOpened$.subscribe((value) => {
            this.createProfileOpened = value;
            this.forceUpdate();
        });
    }

    handleClick() {
        let hasErrors = false;

        for (const key of Object.keys(this.formValues)) {
            if (!this.formValues.hasOwnProperty(key)) {
                continue;
            }

            const formValue = this.formValues[key];

            formValue.ref.current.validate();

            if (formValue.errors !== undefined && Object.keys(formValue.errors).length) {
                hasErrors = true;
            }
        }

        if (!hasErrors) {
            this.props.updateUser({
                name: this.formValues.name.value,
                email: this.formValues.email.value,
                password: this.formValues.password.value,
            });

            this.createProfileOpened = false;
        }
    }

    componentWillUnmount() {
        this.createProfileOpenedSubscription.unsubscribe();
    }

    render() {
        return (
            <div className={"CreateAccount" + (this.createProfileOpened ? ' opened' : '')}>
                <Header toggleProfile={this.props.toggleProfile}/>
                <div className="content bg" style={{backgroundImage: 'url("bg.jpg")'}}>
                    <ul className="stepper">
                        <li className="step-wrapper active">
                            <div className="step"/>
                            <div className="text">Step 1</div>
                        </li>
                        <li className="line"/>
                        <li className="step-wrapper">
                            <div className="step"/>
                            <div className="text">Step 2</div>
                        </li>
                        <li className="line"/>
                        <li className="step-wrapper">
                            <div className="step"/>
                            <div className="text">Step 3</div>
                        </li>
                    </ul>

                    <div className="title">Create Account</div>

                    <div className="form">
                        <div className="control-wrapper">
                            <Control formControl={this.formValues.name} type="text"
                                     icon='<i class="fa fa-user" aria-hidden="true"></i>'
                                     ref={this.formValues.name.ref}/>
                        </div>
                        <div className="control-wrapper">
                            <Control formControl={this.formValues.email} type="email"
                                     icon='<i class="fa fa-envelope" aria-hidden="true"></i>'
                                     ref={this.formValues.email.ref}/>
                        </div>
                        <div className="control-wrapper">
                            <Control formControl={this.formValues.password} type="password"
                                     icon='<i class="fa fa-lock" aria-hidden="true"></i>'
                                     ref={this.formValues.password.ref}/>
                        </div>
                        <div className="control-wrapper submit-button" style={{marginTop: '56px'}}>
                            <button className="button" onClick={this.handleClick.bind(this)}>Continue</button>
                        </div>
                        <div className="tandc-wrapper d-flex justify-content-center">
                            <a className="tandc" href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
