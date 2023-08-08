# ModalC Component
ModalC is a flexible and customizable modal component for React. It provides a simple way to display modals with various animations, sizes, and features. This component aims to streamline the process of creating and managing modals in your React applications.

## Installation
You can install the ModalC component using your package manager of choice:

```bash
npm install modalc
# or
yarn add modalc
```

## Basic Usage
To use the ModalC component in your application, you'll need to import it and render it with the appropriate props:

```jsx
import React from "react";
import ModalC, { useModal } from "modalc";

const App = () => {
  const modal = useModal();

  return (
    <div>
      <button onClick={modal.open}>Open Modal</button>
      <ModalC
        visible={modal.visible}
        onClose={modal.close}
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={modal.close}>Close Modal</button>
      </ModalC>
    </div>
  );
};

export default App;
```

## Props
### ModalC Props
- visible (boolean, default: false): Whether the modal is visible.
- onClose (function): Callback function when the modal is closed.
- animation (string, default: "fade"): Animation type for the modal (e.g., "zoom", "fade").
- showCloseButton (boolean, default: true): Whether to show the close button.
- width (number, default: 400): Width of the modal.
- height (number, default: 240): Height of the modal.
- size (string, default: "sm"): Size of the modal ("sm", "md", "lg", "xl").
- duration (number, default: 300): Duration of the animation in milliseconds.
- customStyles (React.CSSProperties): Additional custom styles for the modal.
- id (string): ID for the modal element.
- children (React.ReactNode): Content of the modal.

### useModal Hook
A custom hook that provides functionality to control the modal's visibility.

isOpen (boolean, optional): Initial visibility state of the modal.
Returns an object with the following properties:

- open (function): Open the modal.
- close (function): Close the modal.
- visible (boolean): Current visibility state of the modal.
  
## Advanced Usage
The ModalC component allows for more advanced customization by providing various props to control animation, size, styles, and more. You can customize the appearance and behavior of the modal to match your application's design and requirements.

```jsx
import React from "react";
import ModalC, { useModal } from "modalc";
import "modalc/dist/modalc.css";

const App = () => {
  const modal = useModal();

  return (
    <div>
      <button onClick={modal.open}>Open Modal</button>
      <ModalC
        visible={modal.visible}
        onClose={modal.close}
        animation="zoom"
        showCloseButton={false}
        width={600}
        height={400}
        size="md"
        duration={500}
        customStyles={{ background: "rgba(0, 0, 0, 0.7)" }}
      >
        <h2>Custom Modal</h2>
        <p>This is a customized modal with advanced options.</p>
        <button onClick={modal.close}>Close</button>
      </ModalC>
    </div>
  );
};

export default App;
```

## License
This project is licensed under the MIT License.