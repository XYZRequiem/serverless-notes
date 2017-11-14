import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import uuid4 from 'uuid'

function Therapist(name, title, age, rate, appointments, address, rating, education, issues, expertise, isDoctor) {
    this.name = name
    this.title = title
    this.age = age
    this.rate = rate
    this.appointments = appointments
    this.address = address
    this.rating = rating
    this.education = education
    this.issues = issues
    this.expertise = expertise
    this.isDoctor = isDoctor
}

// name, title, age, rate, appointments, address, rating, education, issues, expertise, isDoctor

const therapists = [
    new Therapist(
        'Chris S. Polizzi', 
        'Clinical Psychologist', 
        25, 
        80, 
        [
            {time: 0, patient: 'Fiachra'},
            {time: 1, patient: 'Antoine'}
        ],
        { number: 57, street: 'Spadina Ave.', city: 'Toronto', state: 'ON', postal: 'M5V 2J2'},
        {
            average: 4.57, 
            votes: 100, 
            reviews: ['fakeUserId']
        },
        [
            { degree: 'Ph.D', school: 'University of Chicago', yearEarned: 1979},
            { degree: 'M.A.', school: 'University of Chicago', yearEarned: 1974},
            { degree: 'B.A.', school: 'University of Michigan', yearEarned: 1969},
        ],
        ['Adoption', 'Anxiety', 'Coping Skills', 'Divorce', 'Grief', 'Marital and Premarital', 'Multicultural Relationship Issues', 'Self Esteem', 'Spirituality', 'Transgender'],
        ['Research on Person-Centered Groups', 'Client-Centered or Humanistic Approaches to Therapy with Severe Developmentally-Based Disorders', 'Gay-Lasbian Issues', 'Spirituality'],
        true,
    ),
    new Therapist(
        'John A. McDonald', 
        'Clinical Psychologist', 
        40, 
        80, 
        [
            {time: 0, patient: 'Fiachra'},
            {time: 1, patient: 'Antoine'}
        ],
        { number: 57, street: 'Spadina Ave.', city: 'Toronto', state: 'ON', postal: 'M5V 2J2'},
        {
            average: 4.57, 
            votes: 100, 
            reviews: ['fakeUserId']
        },
        [
            { degree: 'Ph.D', school: 'University of Chicago', yearEarned: 1979},
            { degree: 'M.A.', school: 'University of Chicago', yearEarned: 1974},
            { degree: 'B.A.', school: 'University of Michigan', yearEarned: 1969},
        ],
        ['Adoption', 'Anxiety', 'Coping Skills', 'Divorce', 'Grief', 'Marital and Premarital', 'Multicultural Relationship Issues', 'Self Esteem', 'Spirituality', 'Transgender'],
        ['Research on Person-Centered Groups', 'Client-Centered or Humanistic Approaches to Therapy with Severe Developmentally-Based Disorders', 'Gay-Lasbian Issues', 'Spirituality'],
        true,
    ),
]

console.log('therapists', therapists)
ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
