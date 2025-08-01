// stores/useTodoStore.ts
import { create } from 'zustand'
import { type TodoType } from '@/types/todo'

export const TodoMockData: TodoType[] = [
  { id: 1, content: 'React 기초 메일 1시간 강의 듣기', isActive: false },
  {
    id: 2,
    content: '모던 자바스크립트 Deep Dive 10페이지 보기',
    isActive: false,
  },
]

interface TodoState {
  todos: TodoType[]
  addTodo: (content: string) => void
  toggleTodo: (id: number) => void
  removeCompletedTodos: () => void
  removeTodo: (id: number) => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: TodoMockData,
  addTodo: (content) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), content, isActive: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isActive: !todo.isActive } : todo
      ),
    })),
  removeCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.isActive),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}))
