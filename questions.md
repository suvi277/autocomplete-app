1. What is the difference between Component and PureComponent? Give
an example where it might break my app.
    Answer: The main difference between a Component and a PureComponent in React lies in how they handle re-renders. While a Component will re-render whenever there are changes in its parent or its own state/props, a PureComponent performs a shallow comparison of its props and state to determine if a re-render is necessary. This optimization helps improve performance by avoiding unnecessary re-renders. However, if the shallow comparison fails to detect changes in complex data structures like nested objects or arrays, it can lead to incorrect UI rendering. To mitigate this, it's important to ensure accurate comparisons or explore alternative optimization techniques like React.memo or functional components with hooks.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
    Answer: Using Context + ShouldComponentUpdate together can be risky because ShouldComponentUpdate depends on shallow comparisons to determine whether a component should re-render. When the context value changes, it may trigger updates to all components consuming that context, regardless of whether the actual data they depend on has changed. This can lead to unnecessary re-renders, negatively impacting performance.

3. Describe 3 ways to pass information from a component to its PARENT.
    Answer: 
        A. Callback Functions: This enable the child component to communicate with its parent by invoking a callback function passed as a prop and passing data back to the parent
        B. Props Drilling: It involves passing props from the parent component through intermediate child components until the desired child component is reached, enabling the parent component to access the state or data from multiple nested child components
        C. Context API: The Context API in React allows information to be shared and accessed across multiple components without passing props explicitly. The parent component can create a context and provide a context value. The child component can access this value using the useContext hook or the Consumer component. By using context, the child component can share information directly with the parent component or any other component that consumes the same context.

4. Give 2 ways to prevent components from re-rendering.
    Answer: 
        A. Use React.memo, by wrapping a functional component, this ensures that the component will only re-render if the props have actually changed
        B. Use memoization that caches the result of a function call based on its inputs, avoiding re-computation if the inputs remain unchanged, making it useful for optimizing expensive computations or data transformations within a component.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

    Answer: A fragment in React is a way to group multiple elements together without adding an extra wrapping element in the DOM. It is useful when you want to return multiple elements from a component without introducing unnecessary markup. While fragments help keep JSX code clean and concise, using them in certain scenarios, especially with CSS or layout libraries that rely on specific parent-child relationships, can potentially break the app due to unexpected layout or styling issues

    Example
    ```
    <>
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    </>
    ```

6. Give 3 examples of the HOC pattern.
    Answer: 
        withAuth: An withAuth HOC can be used to restrict access to certain components or routes based on authentication status. It wraps the target component and provides authentication-related functionality, such as checking if the user is logged in and redirecting if not.

        withLoading: The withLoading HOC can be used to display a loading indicator while data is being fetched asynchronously. It wraps the target component and manages the loading state, showing a loading spinner or placeholder until the data is ready to be rendered.

        withErrorHandling: The withErrorHandling HOC can be used to handle errors that occur within a component. It wraps the target component and adds error handling logic, such as catching errors, displaying an error message, or logging the error.

7. What's the difference in handling exceptions in promises, callbacks
and async...await?
    Answer: 
        Promises: In promise-based code, exceptions are typically handled using the .catch() method, which allows you to catch any errors that occur during the promise's execution. You can chain a .catch() after a promise to specify error handling logic. Promises use a chainable syntax, enabling you to handle both success and error cases separately.

        Callbacks: With callbacks, error handling is typically done by passing an additional parameter to the callback function to capture any potential errors. The convention is to pass the error as the first argument, followed by the result. The callback function is responsible for checking if an error occurred and handling it accordingly.

        Async/Await: The async and await keywords provide a more synchronous and readable way to handle exceptions in asynchronous code. Within an async function, you can use try and catch blocks to handle exceptions. The await keyword allows you to pause the execution and wait for a promise to resolve or reject. If an error occurs within the try block or the awaited promise rejects, execution jumps to the nearest catch block to handle the error.

8. How many arguments does setState take and why is it async.
    Answer: The setState function in React takes two arguments: the new state object or function and an optional callback. It is asynchronous to optimize performance by batching state updates and avoiding unnecessary re-renders. React schedules the state update and performs the necessary reconciliation process before rendering. The optional callback can be used to perform actions after the state has been updated and the component has been re-rendered.

9. List the steps needed to migrate a Class to Function Component.
    Answer: A. Rewrite component as a function.
            B. Remove `render()` method and return JSX directly.
            C. Remove lifecycle methods that are not applicable to function components.
            D. Use the `useState` hook to handle state.
            E. Convert class methods to regular functions or hooks.
            F. Replace `this.props` with function arguments.
            G. Remove constructor and `super()`.
            H. Update imports to reflect function component usage.

10. List a few ways styles can be used with components.
    Answer: A. Inline Styles
            B. CSS Modules
            C. CSS-in-JS Libraries
            D. Styled Components

11. How to render an HTML string coming from the server.
    Answer - To render an HTML string coming from the server in React, we can use the `dangerouslySetInnerHTML`, however, using dangerouslySetInnerHTML can pose security risks. So its better to use something to sanitize html such as `Dompurify`, `react-html-parser` etc.