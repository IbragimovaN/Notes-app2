export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Note {
  title: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  _id?: string;
}

export interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User, callback: () => void) => void;
  logout: (callback: () => void) => void;
}
