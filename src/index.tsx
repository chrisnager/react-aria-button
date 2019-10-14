import { ReactEventHandler, KeyboardEventHandler, KeyboardEvent, HTMLProps, FC, createElement } from 'react';

function createHandleKeyPress(onClick: ReactEventHandler, onKeyPress?: KeyboardEventHandler): KeyboardEventHandler {
  return function handleKeyPress(event: KeyboardEvent) {
    if (event.key === ` `) event.preventDefault();
    if (typeof onKeyPress === `function`) onKeyPress(event);
    if ((event.key === ` ` || event.key === `Enter`) && typeof onClick === `function`) onClick(event);
  };
}

export interface AriaButtonProps extends HTMLProps<HTMLButtonElement> {
  // TODO: Provide a list of HTML element names
  tag?: string;
  onClick: ReactEventHandler;
  tabIndex?: number;
  onKeyPress?: KeyboardEventHandler;
}

const AriaButton: FC<AriaButtonProps> = ({ tag, onClick, tabIndex = 0, onKeyPress, ...rest }) => {
  // TODO: Think through how to implement `aria-pressed`
  const options = { onClick, tabIndex, ...rest, role: `button`, onKeyPress: createHandleKeyPress(onClick, onKeyPress) };
  return createElement(tag || `span`, options);
};

export default AriaButton;
