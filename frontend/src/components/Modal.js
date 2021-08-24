import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        console.log(name)
        console.log(value)
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        console.log(name)
        console.log(value)

        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Post Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                              type="text"
                              name="title"
                              value={this.state.activeItem.title}
                              onChange={this.handleChange}
                              placeholder="Enter Post Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Text</Label>
                            <Input
                            type="textarea"
                            name="text"
                            value={this.state.activeItem.text}
                            onChange={this.handleChange}
                            placeholder="Enter Post text"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label for="published">
                                <Input
                                type="checkbox"
                                name="publish"
                                checked={this.state.activeItem.published_date}
                                onChange={this.handleChange}
                                />
                                Publish
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
