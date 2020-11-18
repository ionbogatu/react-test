import React from 'react';
import './App.scss';
import Header from "../components/header/Header";
import Main from '../components/main/Main';
import Stats from '../components/stats/Stats';
import Profile from '../components/profile/Profile';
import {BehaviorSubject} from 'rxjs';
import CreateAccount from "../components/create-account/CreateAccount";

class App extends React.Component {
    profileMenuOpened$ = new BehaviorSubject(false);
    createProfileOpened$ = new BehaviorSubject(false);
    user = null;

    toggleProfile() {
        if (this.user) {
            this.profileMenuOpened$.next(!this.profileMenuOpened$.getValue());
            this.createProfileOpened$.next(false);
        } else {
            this.profileMenuOpened$.next(false);
            this.createProfileOpened$.next(!this.createProfileOpened$.getValue());
        }
    }

    updateUser(newUser) {
        this.user = newUser;
        this.forceUpdate();
    }

    render() {
        return (
            <div className="position-relative overflow-hidden">
                <div className="position-relative">
                    <Header user={this.user} toggleProfile={this.toggleProfile.bind(this)}/>
                    <div className="position-relative">
                        <div className="position-relative">
                            <Main/>
                            <Stats/>
                        </div>
                        {
                            this.user ? <Profile user={this.user}
                                              profileMenuOpened$={this.profileMenuOpened$}
                                              toggleProfile={this.toggleProfile.bind(this)}
                                              updateUser={this.updateUser.bind(this)}/> :
                            null
                        }
                        {
                            !this.user ?
                            <CreateAccount createProfileOpened$={this.createProfileOpened$}
                                           toggleProfile={this.toggleProfile.bind(this)}
                                           updateUser={this.updateUser.bind(this)}/> :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
