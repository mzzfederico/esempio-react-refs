import { ADD_TODO, CHANGE_TEXT, COMPLETE_TODO, LOAD_TODOS } from "./constants";

export default function reducer(state, action) {
    const nuovoStato = Object.assign({}, state);

    /* { type: "LOAD_TODOS", todos: [...] } */
    if (action.type === LOAD_TODOS) {
      nuovoStato.todos = action.todos;
    }

    /* {type: "CHANGE_TEXT", text: "..." } */
    if (action.type === CHANGE_TEXT) {
      nuovoStato.inputValue = action.text;
    }

    /* {type: "ADD_TODO", date: "...." } */
    if (action.type === ADD_TODO) {
      nuovoStato.todos = nuovoStato.todos.concat({
        text: nuovoStato.inputValue, isComplete: false, date: action.date /* AGGIUNGERE TAG QUI */
      });
      nuovoStato.inputValue = "";
    }

    /* {type: "COMPLETE_TODO", todoDate: "...." } */
    if (action.type === COMPLETE_TODO) {
      nuovoStato.todos =nuovoStato.todos.map (
        todo => todo.date === action.todoDate
          ? { ...todo, isComplete: !todo.isComplete }
          : todo
      )
    }

    return nuovoStato;
  }