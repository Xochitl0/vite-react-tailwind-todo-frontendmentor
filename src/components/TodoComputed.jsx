const TodoComputed = ({ computedItemLeft, clearCompleted }) => {
    return (
        <section className="flex justify-between dark:bg-gray-800 bg-white py-4 px-4 rounded-b-md">
            <span className="text-gray-400 ">
                {" "}
                {computedItemLeft} items left
            </span>
            <button className="text-gray-400" onClick={clearCompleted}>
                Clear Completed
            </button>
        </section>
    );
};

export default TodoComputed;
