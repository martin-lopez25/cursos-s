export interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface QuestionOption {
  letter: string;
  text: string;
}

export interface QuestionItem {
  id: string;
  courseId: string;
  moduleName: string;
  questionNumber: string;
  prompt: string;
  statements: string[];
  options: QuestionOption[];
  correctLetter: string;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActiveSection =
  | 'home'
  | 'bank'
  | 'module-one'
  | 'module-two'
  | 'module-three'
  | 'module-four';
