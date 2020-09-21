import React, { Component } from "react";
import styles from "./AddAssumptionForm.module.css";
import TagsList from "../TagsList/TagList";
import { v4 as uuidv4 } from "uuid";
import { addAssumptions } from "../../API/axios";
import { withRouter } from "react-router-dom";

var sessionObj = null;

class AddAssumptionForm extends Component {
  constructor() {
    super();
    sessionObj = JSON.parse(sessionStorage.getItem("responseObj"));
    console.log(sessionObj.data._id);
    this.state = {
      title: "",
      description: "",
      detailDescription: "",
      titleCharacterLimit: "",
      descriptionCharacterLimit: "",
      detailDescriptionCharacterLimit: "",
      tagInput: "",
      inputFocus:true,
      labels: [],
      credits: [
        {
          reactor: sessionObj.data._id,
          credit: {
            support: true,
            count: 1,
          },
        },
      ],
      owner: sessionObj.data._id,
    };
  }

  handleFormInput = (e) => {
    var { name, value } = e.target;
    if(name === "title" && value.length > 100) {
      this.setState({
        titleCharacterLimit:"Maximam 100 characters are allowed"
      })
      
    }
    else if (name === "title" && value.length <= 100) {
     this.setState({
       titleCharacterLimit:""
     })
     
    }
    if(name === "description" && value.length > 2000) {
     this.setState({
       descriptionCharacterLimit:"Maximam 2000 characters are allowed"
     })
     
   }
   else if (name === "description" && value.length <= 2000) {
    this.setState({
      descriptionCharacterLimit:""
    })
    
   }
   if(name === "detailDescription" && value.length > 500) {
     this.setState({
       detailDescriptionCharacterLimit:"Maximam 500 characters are allowed"
     })
     
   }
   else if (name === "detailDescription" && value.length <= 500) {
    this.setState({
      detailDescriptionCharacterLimit:""
    })
    
   }
    this.setState({
      [name]: value,
    });
  };
  handleInputFocus = () => {
    this.setState({ inputFocus: true });
  };

  handleInputBlur = () => {
 
  
    this.setState({ 
      inputFocus: false,
    
    });
  };

  handleTagInput = (value) => {
    this.setState({
      tagInput: value,
    });
  };
  handleTagAdder = (e) => {
    var { labels, tagInput } = this.state;
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e.target.value);
      var tagExists = labels.findIndex(
        (tag) => tag.tagValue === e.target.value
      );
      if (tagExists !== -1) {
        return;
      }
      var tagAdded = {
        tagValue: e.target.value,
        tagId: uuidv4(),
      };
      this.setState((prevState) => ({
        labels: [...prevState.labels, tagAdded],
        tagInput: "",
      }));
      console.log(labels);
    }
  };

  handleTagsDelete = (tagId) => {
    this.setState((prevState) => ({
      labels: prevState.labels.filter((tag) => tag.tagId !== tagId),
    }));
  };

  validateAssumptionForm = () => {
    var {titleCharacterLimit,descriptionCharacterLimit,detailDescriptionCharacterLimit} = this.state;
    if(titleCharacterLimit === "" && descriptionCharacterLimit === "" && detailDescriptionCharacterLimit === "") {
      return true
    }
    else {
      return false
    }
  }

  handleAddAssumptionForm = (e) => {
    var {
      title,
      description,
      detailDescription,
      tagInput,
      labels,
      credits,
      owner,
    } = this.state;
    var { history } = this.props;
    e.preventDefault();
    if(this.validateAssumptionForm()) {
    var assumptionObj = {
      title: title,
      description: description,
      detailDescription: detailDescription,
      tagInput: tagInput,
      labels: labels,
      credits: credits,
      owner: owner,
    };
    addAssumptions(assumptionObj, () => {
      history.push("/timeline");
    });
    console.log(assumptionObj);
    console.log(assumptionObj.owner)
  }
};
  render() {
    var {
      title,
      description,
      detailDescription,
      tagInput,
      labels,
      titleCharacterLimit,
      descriptionCharacterLimit,
      detailDescriptionCharacterLimit,
      inputFocus
    } = this.state;

    return (
      <div className={`${styles.assumptionFormContainer}`}>
        <div className={`${styles.assumptionForm}`}>
          <div className={`${styles.assumptionFormFields}`}>
            <div className={`${styles.assumptionFormHeading} ${styles.flex}`}>
              <h1>Add Assumption Form</h1>
            </div>
            <form onSubmit={this.handleAddAssumptionForm}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={this.handleFormInput}
                  onFocus = {this.handleInputFocus}
                  onBlur = {this.handleInputBlur}
                  // maxLength = {100}
                  required
                />
                {(title !== "" && titleCharacterLimit !== "" )? (
                 <div class="alert alert-danger" role="alert" style = {{fontSize: "1.5rem"}}>
                 {titleCharacterLimit}
               </div>
                ):null}
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={this.handleFormInput}
                  onFocus = {this.handleInputFocus}
                  onBlur = {this.handleInputBlur}
                  required
                />
                 {(description !== "" && descriptionCharacterLimit !== "" )? (
                 <div class="alert alert-danger" role="alert" style = {{fontSize: "1.5rem"}}>
                 {descriptionCharacterLimit}
               </div>
                ):null}
              </div>
              <div className="form-group">
                <label>Detail Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Detail Description"
                  name="detailDescription"
                  value={detailDescription}
                  onChange={this.handleFormInput}
                  onFocus = {this.handleInputFocus}
                  onBlur = {this.handleInputBlur}
                  required
                />
                 {(detailDescription !== "" && detailDescriptionCharacterLimit !== "" )? (
                 <div class="alert alert-danger" role="alert" style = {{fontSize: "1.5rem"}}>
                 {detailDescriptionCharacterLimit}
               </div>
                ):null}
              </div>
              <div className="form-group">
                <label>Labels</label>
                <input
                  type="text"
                  className="form-control"
                  name="tagInput"
                  value={tagInput}
                  onChange={(e) => this.handleTagInput(e.target.value)}
                  onKeyPress={this.handleTagAdder}
                  placeholder="Add a Tag"
                />
              </div>
              <TagsList
                labels={labels}
                handleTagsDelete={this.handleTagsDelete}
              />
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.addBtn}`}
              >
                Submit
              </button>
            </form>
            {/* <form onSubmit={this.handleAddAssumptionForm}>
              <div className="title flex">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleFormInput}
                  required
                />
              </div>

              <div className="description flex">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleFormInput}
                  required
                />
              </div>

              <div className="detailDescription flex">
                <label htmlFor="">detail Description</label>
                <input
                  type="text"
                  name="detailDescription"
                  value={detailDescription}
                  onChange={this.handleFormInput}
                required
                />
              </div>

              <div className="labels flex">
                <label htmlFor="">labels</label>
                <input
                  type="text"
                  name="tagInput"
                  value={tagInput}
                  onChange={(e) => this.handleTagInput(e.target.value)}
                  onKeyPress={this.handleTagAdder}
                  placeholder="Add a tag"
                  required
                />
              </div>
              <div className="tagsAdded flex">
                <TagsList
                  labels={labels}
                  handleTagsDelete={this.handleTagsDelete}
                />
              </div>
              <div className="add-form-btn flex">
                <button type="submit" className="flex">
                  Add
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddAssumptionForm);
