import React, { Component } from "react";
import { invokeApig } from "../../libs/awsLib";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import LoaderButton from '../../components/LoaderButton'
import config from '../../config'
// import axios from 'axios'
export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.file = null;
        this.state = {
            note: null,
            content: ""
        };
    }

    async componentDidMount() {
        try {
            const results = await this.getNote();
            this.setState({
                note: results,
                content: results.content
            });
        } catch (e) {
            alert(e);
        }
    }
    getNote() {
        return invokeApig({
            path: `/notes/${this.props.match.params.id}`
        });
    }
    validateForm() {
        return this.state.content.length > 0;
    }
    formatFilename(str) {
        return str.length < 50
            ? str
            : str.substr(0, 20) + "..." + str.substr(str.length - 20,
                str.length);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleFileChange = event => {
        this.file = event.target.files[0];
    }
    handleSubmit = async event => {
        event.preventDefault();
        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert("Please pick a file smaller than 5MB");
            return;
        }
        this.setState({ isLoading: true });
    }
    handleDelete = async event => {
        event.preventDefault();
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );
        if (!confirmed) {
            return;
        }
        this.setState({ isDeleting: true });
    }
    handleMailSubmit = async event => {
        event.preventDefault()
        
        let {content, note} = this.state
        let {authEmail} = this.props
        let attachment = {
            filename: authEmail + 'My Lyric-Builder Attachment',
            path: note.attachment,
            contentType: 'image/jpeg'
            // contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
        
        let params = {
            toAddress: 'crazycroc101@gmail.com',
            subject: `'Lyric Builder Message' from ${authEmail}`,
            content: content,
            attachments: [attachment]
        }
       
        return invokeApig({
              path: `/note/${this.props.match.params.id}`,
              method: "POST",
              body: params
            });
          }

        // axios.post(`https://s4cj3cmnl6.execute-api.ca-central-1.amazonaws.com/prod/notes/${this.props.match.params.id}`, params)
        //     .then(res => {
        //         // console.log(res)
        //     })
        //     .catch(err => {
        //         // console.log(err)
        //     })
        // sendMail('crazycroc101@gmail.com', 'Scratch Note', this.state.content)
    // }

    render() {
        return (
            <div className="Notes">
                {this.state.note &&
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="content">
                            <FormControl
                                onChange={this.handleChange}
                                value={this.state.content}
                                componentClass="textarea"
                            />
                        </FormGroup>
                        {this.state.note.attachment &&
                            <FormGroup>
                                <ControlLabel>Attachment</ControlLabel>
                                <FormControl.Static>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={this.state.note.attachment}
                                    >
                                        {/* {this.formatFilename(this.state.note.attachment)} */}
                                        <img src={this.state.note.attachment} alt={"k"}/>
                                    </a>
                                </FormControl.Static>
                                
                            </FormGroup>}
                        <FormGroup controlId="file">
                            {!this.state.note.attachment &&
                                <ControlLabel>Attachment</ControlLabel>}
                            <FormControl onChange={this.handleFileChange} type="file"
                            />
                        </FormGroup>
                        <LoaderButton
                            block
                            bsStyle="primary"
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                            isLoading={this.state.isLoading}
                            text="Save"
                            loadingText="Saving…"
                        />
                        <LoaderButton
                            block
                            bsStyle="danger"
                            bsSize="large"
                            disabled={true}
                            isLoading={this.state.isDeleting}
                            onClick={this.handleDelete}
                            text="Delete"
                            loadingText="Deleting…"
                        />
                        <LoaderButton
                            block
                            bsStyle="danger"
                            bsSize="large"
                            isLoading={this.state.isDeleting}
                            onClick={this.handleMailSubmit}
                            text="Send"
                            loadingText="Mailing…"
                        />
                    </form>}
            </div>
        );
    }
}