import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { invokeApig, s3Upload } from "../../libs/awsLib";
import LoaderButton from "../../components/LoaderButton";
import uuid from 'uuid'
import config from "../../config";
import "./NewNote.css";
export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      content: [
        {
          _id: uuid.v1(),
          title: '',
          body: '',
          owner: null
        },
        {
          _id: uuid.v1(),
          title: '',
          body: '',
          owner: null
        },
      ]
    };
  }
  validateForm() {
    return this.state.content.length > 0;
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
    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;
      await this.createNote({
        content: this.state.content,
        attachment: uploadedFilename
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  displayContent() {
    return this.state.content.map(({ _id, title, body }) => {
      return (
        <FormGroup controlId="content" className='sub-content'>
          
            <FormControl
              onChange={this.handleChange} // modify handle change to work for title and body and function by id
              value={title}
              componentClass='text'
            />

            <FormControl
              onChange={this.handleChange}
              value={body}
              componentClass="textarea"
            />
        
        </FormGroup>
      )
    })
  }

  createNote(note) {
    return invokeApig({
      path: "/notes",
      method: "POST",
      body: note
    });
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
        {this.displayContent()}
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
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
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}