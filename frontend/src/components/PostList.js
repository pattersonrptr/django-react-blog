import React, { Component } from "react";
import Modal from "./Modal";
import {Post} from './Post';
import axios from "axios";


class PostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewCompleted: false,
            postList: [],
            modal: false,
            activeItem: {
                title: "",
                text: "",
                published_date: null,
            },
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    // Pega todos os posts
    refreshList = () => {
        axios
            .get("/api/posts/")
            .then((res) => this.setState({ postList: res.data }))
            .catch((err) => console.log(err));
    };


    // Controla o estado do modal
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    // Cria um Post se o item passado tiver id, do contrário edita o Post existente
    handleSubmit = (item) => {
        this.toggle();

        if (item.id) {
            axios
                .put(`/api/posts/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }
        axios
            .post("/api/posts/", item)
            .then((res) => this.refreshList());
    };

    // Deleta um Post
    handleDelete = (item) => {
        axios
            .delete(`/api/posts/${item.id}/`)
            .then((res) => this.refreshList());
    };

    // Cria um novo active item e 'abre' o modal
    createItem = () => {
        const item = { title: "", text: "", publish: null };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    // 'Abre' o modal para editar o item que é o activeItem
    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    // Verifica o estado de viewCompleted
    displayCompleted = (status) => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }

        return this.setState({ viewCompleted: false });
    };

    // Define as abas publicado e rascunho, as abas acionam o método displayCompleted() true or false
    renderTabList = () => {
        return (
            <div className="nav nav-tabs">
                <span
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
                >
                    Published
                </span>
                <span
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
                >
                    Draft
                </span>
            </div>
        );
    };

    // Renderiza todos os posts
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.postList.filter(
            (item) => (item.published_date ? true : false) === viewCompleted
        );

        return newItems.map((item) => (
            <li
                key={item.id}
                className="list-group-item align-items-center"
            >
                <Post
                    data={item}
                    is_published={this.state.viewCompleted}
                    handleDelete={() => this.handleDelete(item)}
                    handleEditItem={() => this.editItem(item)}
                />
            </li>
        ));
    };

    // renderiza as abas, os itens e o modal caso o estado do modal seja true
    render() {
        return (
            <main className="container">
                <h1 className="text-white text-uppercase text-center my-4">Simple Blog</h1>
                <div className="row">
                    <div className="col-md-12 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="mb-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.createItem}
                                >
                                    New Post
                                </button>
                            </div>

                            {this.renderTabList()}

                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>

                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
            );
        }
    }

export default PostList;