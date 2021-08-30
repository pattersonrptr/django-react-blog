import React, { Component } from "react";
import Modal from "./Modal";
import {Post} from './Post';
import axios from "axios";
import {connect} from 'react-redux'
import {getPosts, createPost, updatePost, deletePost} from '../store/actions/postsAction'


class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewCompleted: false,
            postList: [],
            modal: false,
            activeItem: {
                author: "",
                title: "",
                text: "",
                published_date: null,
            },
        };

        this.createItem = this.createItem.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    // Pega todos os posts
    refreshList = async () => {
        await this.props.getPosts()

        const {posts} = this.props.posts;

        this.setState({ postList: posts });
    };


    // Controla o estado do modal
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    // Cria um Post se o item passado tiver id, do contrário edita o Post existente
    handleSubmit = async (item) => {
        this.toggle();

        if (item.id) {
            await this.props.updatePost(item);
            this.refreshList();
            return;
        }

        await this.props.createPost(item);
        this.refreshList();
    };

    // Deleta um Post
    handleDelete = async (item) => {
        await this.props.deletePost(item);
        this.refreshList();
    };

    // Cria um novo active item e 'abre' o modal
    createItem = () => {
        const item = {
            author: this.props.user,
            title: "",
            text: "",
            publish: null
        };

        this.setState(
            {
                activeItem: item,
                modal: !this.state.modal
            }
        );
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
                    loggedUser={this.props.user}
                    is_published={this.state.viewCompleted}
                    handleDelete={() => this.handleDelete(item)}
                    handleEditItem={() => this.editItem(item)}
                />
            </li>
        ));
    };

    // renderiza as abas, os itens e o modal caso o estado do modal seja true
    render() {
        const {posts} = this.props.posts;


        return (
            <main className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-10 mx-auto p-0">
                        <div className="card p-3">

                            {this.props.user ? (
                                <div className="mb-4">
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.createItem}
                                    >
                                        New Post
                                    </button>
                                </div>
                            ) : null}

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

// export default PostList;
const mapStateToProps  = (state) => ({posts:state.posts});

export default connect(mapStateToProps, {getPosts, createPost, updatePost, deletePost})(PostList);
