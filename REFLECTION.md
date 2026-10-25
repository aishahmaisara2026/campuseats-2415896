## Reflection Question

1- What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

Imperative UI require us to write sequential instruction telling the browser how to change the DOM manually by managing every DOM approach explicitly. Meanwhile, declarative AI require us to describe what the UI should look like based on the current data or state using JSX. This is where react automatically figures out how to update and render the DOM to match the description of what has been write.

2- Why must a component name start with a capital letter?

In React JSX, lowercase tag names are treated as standard HTML elements. Therefore, component names must start with capital letter to let React JSX tranformer knows it is a custom component and not buitl-in HTML tag.

3- What does a fragment <>...</> do, and why not just use a <div>?

A fragment (<>...</>) let grouping multiple adjacent JSX elements together without adding extra node to the HTML DOM tree. Using <div> wraps your elements in an extra HTML tag, which can disturb CSS styling and add unnecessary clutter to the DOM structure.

4- Name one benefit of splitting the UI into small components.

Reusability as it allow small components to be reused across different parts of an application without duplicating code. It also makes the code easier to read, test and debug since each component handles a single specific responsibility. 