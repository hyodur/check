// 타입 정의
export interface Student {
  id: string;
  name: string;
}

export interface HomeworkStatus {
  studentId: string;
  status: 'pending' | 'completed' | 'absent'; // 대기, 완료, 결석
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  createdAt: string;
  statuses: HomeworkStatus[];
}

export interface ClassData {
  students: Student[];
  homeworks: Homework[];
}
