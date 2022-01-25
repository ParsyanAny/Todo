import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemAddForm from '../item-add-form';
import ItemStatusFilter from '../item-status-filter'
import TodoList from '../todo-list';
import "./app.css";


export default class App extends Component {
    max = 100;
    state = {
        term: "",
        filter: "all", //all, active, done
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Build Awesome App"),
            this.createTodoItem("Learn JSX")],
    }
    createTodoItem(label) {
        return {
            label: label,
            important: false,
            id: this.max++
        }
    }
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const elIndex = todoData.findIndex(el => el.id == id);
            const newTodoData = [
                ...todoData.slice(0, elIndex),
                ...todoData.slice(elIndex + 1)];
            return { todoData: newTodoData }
        })
    }
    onItemAdded = (itemName) => {
        this.setState(({ todoData }) => {
            const newEl = this.createTodoItem(itemName);
            const newTodoData = [...todoData, newEl];
            console.log(todoData.length)
            return { todoData: newTodoData }
        })
    }
    changeToggleProperty(arr, id, propName) {
        const elIndex = arr.findIndex(el => el.id == id);
        const oldItem = arr[elIndex];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, elIndex),
            newItem,
            ...arr.slice(elIndex + 1)];
    }
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.changeToggleProperty(todoData, id, "important")
            }
        })
    }
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.changeToggleProperty(todoData, id, "done")
            }
        });
    }
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }
    onSearchChange = (term) => {
        this.setState({ term });
    }
    onFilterChange = (filter) => {
        this.setState({ filter });
    }
    filterItems(todoItems, filter) {

        switch (filter) {
            case "all":
                return todoItems;
            case "done":
                return todoItems.filter(item => item.done);
            case "active":
                return todoItems.filter(item => !item.done);
            default:
                return todoItems;
        }
    }
    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filterItems(
            this.search(todoData, term), filter);
        const todoCount = todoData
            .filter(item => !item.done).length;
        const doneCount = todoData
            .filter(item => item.done).length;

        return (
            <div className="app-main">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel 
                        className="search-panel"
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                        className="item-status-filter"
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />
                <ItemAddForm
                    onItemAdded={this.onItemAdded} />
            </div>
        )
    }
}