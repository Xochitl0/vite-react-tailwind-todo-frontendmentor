import { useEffect, useState } from "react";
import Header from "./components/icons/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const App = () => {
    const [todos, setTodos] = useState(initialStateTodos);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        };

        setTodos([...todos, newTodo]);
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const computedItemLeft = todos.filter((todo) => !todo.completed).length;
    const clearCompleted = (params) => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const [filter, setFilter] = useState("all");
    const changeFilter = (filter) => setFilter(filter);

    const filterTodos = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos;
        }
    };

    return (
        <div className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
            <Header />
            <main className="container md:max-w-xl mt-8 mx-auto px-4 ">
                <TodoCreate createTodo={createTodo} />
                <TodoList
                    todos={filterTodos()}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                />
                <TodoComputed
                    computedItemLeft={computedItemLeft}
                    clearCompleted={clearCompleted}
                />
                <TodoFilter changeFilter={changeFilter} filter={filter} />
            </main>

            <footer className="text-center mt-8 dark:text-gray-400">
                Drag and drop to reorder list
            </footer>
        </div>
    );
};
export default App;
