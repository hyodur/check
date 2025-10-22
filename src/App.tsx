import React, { useState, useEffect } from 'react';
import './App.css';
import { Student, Homework, ClassData } from './types';
import StudentManager from './components/StudentManager';
import HomeworkManager from './components/HomeworkManager';
import HomeworkTracker from './components/HomeworkTracker';

const STORAGE_KEY = 'homework-tracker-data';

function App() {
  const [classData, setClassData] = useState<ClassData>(() => {
    // 초기 로드 시 로컬 스토리지에서 데이터 읽기
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        console.log('저장된 데이터 로드:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
    return {
      students: [],
      homeworks: [],
    };
  });

  const [activeTab, setActiveTab] = useState<'tracker' | 'students' | 'homework'>('tracker');

  // 데이터 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(classData));
      console.log('데이터 저장됨:', classData);
    } catch (error) {
      console.error('데이터 저장 실패:', error);
    }
  }, [classData]);

  // 학생 추가
  const addStudent = (name: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
    };
    setClassData(prev => ({
      ...prev,
      students: [...prev.students, newStudent],
    }));
  };

  // 여러 학생 일괄 추가
  const addMultipleStudents = (names: string[]) => {
    const newStudents: Student[] = names.map((name, index) => ({
      id: (Date.now() + index).toString(),
      name,
    }));
    setClassData(prev => ({
      ...prev,
      students: [...prev.students, ...newStudents],
    }));
  };

  // 학생 삭제
  const deleteStudent = (id: string) => {
    setClassData(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id),
    }));
  };

  // 숙제 추가
  const addHomework = (subject: string, title: string) => {
    const newHomework: Homework = {
      id: Date.now().toString(),
      subject,
      title,
      createdAt: new Date().toISOString(),
      statuses: classData.students.map(student => ({
        studentId: student.id,
        status: 'pending',
      })),
    };
    setClassData(prev => ({
      ...prev,
      homeworks: [...prev.homeworks, newHomework],
    }));
  };

  // 숙제 삭제
  const deleteHomework = (id: string) => {
    setClassData(prev => ({
      ...prev,
      homeworks: prev.homeworks.filter(h => h.id !== id),
    }));
  };

  // 숙제 상태 변경
  const updateHomeworkStatus = (homeworkId: string, studentId: string, newStatus: 'pending' | 'completed' | 'absent') => {
    setClassData(prev => ({
      ...prev,
      homeworks: prev.homeworks.map(hw => {
        if (hw.id === homeworkId) {
          return {
            ...hw,
            statuses: hw.statuses.map(status =>
              status.studentId === studentId
                ? { ...status, status: newStatus }
                : status
            ),
          };
        }
        return hw;
      }),
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 학급 숙제 관리 시스템</h1>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'tracker' ? 'active' : ''}
          onClick={() => setActiveTab('tracker')}
        >
          📊 숙제 현황
        </button>
        <button
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          👥 학생 관리
        </button>
        <button
          className={activeTab === 'homework' ? 'active' : ''}
          onClick={() => setActiveTab('homework')}
        >
          ✏️ 숙제 관리
        </button>
      </nav>

      <main className="content">
        {activeTab === 'tracker' && (
          <HomeworkTracker
            students={classData.students}
            homeworks={classData.homeworks}
            onStatusChange={updateHomeworkStatus}
            onDeleteHomework={deleteHomework}
          />
        )}
        {activeTab === 'students' && (
          <StudentManager
            students={classData.students}
            onAddStudent={addStudent}
            onDeleteStudent={deleteStudent}
            onAddMultipleStudents={addMultipleStudents}
          />
        )}
        {activeTab === 'homework' && (
          <HomeworkManager
            onAddHomework={addHomework}
          />
        )}
      </main>
    </div>
  );
}

export default App;
