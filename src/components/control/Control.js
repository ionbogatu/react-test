import React from 'react';
import './Control.scss';
import Switch from 'react-switch';

export function required(control) {
    if (!control.value) {
        control.errors['required'] = 'Acest camp este obligatoriu';
    } else {
        delete control.errors['required']
    }
}

export function email(control) {
    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(control.value)) {
        control.errors['email'] = 'Emailul nu este valid';
    } else {
        delete control.errors['email']
    }
}

export default class Control extends React.Component {
    iconRef;
    formControl;
    firstError;

    constructor(props) {
        super(props);

        if (props.formControl) {
            this.formControl = props.formControl;
            this.formControl.touched = false;
        }

        this.state = {
            checked: false
        };

        this.iconRef = React.createRef();
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        if (this.iconRef && this.iconRef.current) {
            this.iconRef.current.innerHTML = this.props.icon;
        }
    }

    handleChange(event) {
        if (this.formControl) {
            if (this.props.type === 'checkbox') {
                this.formControl.value = event;
            } else {
                this.formControl.value = event.target.value;
            }
        }

        this.forceUpdate();
    }

    handleBlur() {
        if (this.formControl) {
            this.formControl.touched = true;
        }

        this.validate();
    }

    handleMouseOver() {
        if (this.formControl && this.wrapper) {
            this.wrapper.current.classList.add('mouse-over');
        }
    }

    handleMouseOut() {
        if (this.formControl && this.wrapper) {
            this.wrapper.current.classList.remove('mouse-over');
        }
    }

    render() {
        let inputClass = 'd-none';
        let checkboxClass = 'd-none';

        if (this.props.type === 'checkbox') {
            checkboxClass = 'd-block';
        } else {
            inputClass = 'd-block';
        }

        return (
            <div className="Control">
                <div className={inputClass}> 
                    <div className={"wrapper" + (this.formControl?.errors && Object.keys(this.formControl?.errors).length ? ' error' : '')} ref={this.wrapper} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                        <div className={"icon" + (this.iconRef ? ' d-flex' : '')} ref={this.iconRef}></div>
                        <input
                            type={this.props.type}
                            placeholder={this.formControl?.placeholder}
                            value={this.formControl?.value}
                            name={this.formControl?.name}
                            onBlur={this.handleBlur.bind(this)}
                            onChange={this.handleChange.bind(this)}/>
                        {this.firstError ? (<div className="error-text" style={{textIndent: this.iconRef ? (this.iconRef.current.offsetWidth + this.iconRef.current.offsetLeft) : 0}}>{this.firstError}</div>) : ''}
                    </div>
                </div>
                <div className={checkboxClass}>
                    <Switch
                        disabled={this.formControl?.disabled}
                        onColor="#D3552A"
                        offColor="#D3552A"
                        offHandleColor="#BD4A25"
                        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                        activeBoxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={22}
                        handleDiameter={30}
                        checked={this.formControl?.value}
                        onChange={this.handleChange.bind(this)}
                        className="react-switch"
                    />
                </div>
            </div>
        );
    }

    validate() {
        this.firstError = null;

        if (this.formControl.errors === undefined) {
            this.formControl.errors = {};
        }

        for (const validator of this.formControl.validators) {
            if (typeof validator === 'function') {
                validator(this.formControl);
            }
        }

        let errorKeys = [];

        if (this.formControl.errors) {
            errorKeys = Object.keys(this.formControl.errors);
        }

        if (errorKeys.length) {
            this.firstError = this.formControl.errors[errorKeys[0]];
        }

        this.forceUpdate();
    }
}
