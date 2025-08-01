// stores/useTodoStore.ts
import { create } from 'zustand'
import { type TodoType } from '@/types/todo'

const TodoMockData = [
  { id: 1, content: 'React 기초 메일 1시간 강의 듣기' },
  { id: 2, content: '모던 자비스크립트 Deep Dive 10페이지 보기' },
]

interface TodoState {
  todos: TodoType[]
  addTodo: (content: string) => void
  removeTodo: (id: number) => void
  resetTodos: () => void
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: TodoMockData,
  addTodo: (content) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), content }],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  resetTodos: () => set({ todos: TodoMockData }),
}))
