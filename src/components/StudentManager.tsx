import React, { useState } from 'react';
import { Student } from '../types';
import './StudentManager.css';

interface Props {
  students: Student[];
  onAddStudent: (name: string) => void;
  onDeleteStudent: (id: string) => void;
}

const StudentManager: React.FC<Props> = ({ students, onAddStudent, onDeleteStudent }) => {
  const [newStudentName, setNewStudentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      onAddStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  return (
    <div className="student-manager">
      <h2>👥 학생 관리</h2>
      
      <form onSubmit={handleSubmit} className="add-student-form">
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="학생 이름을 입력하세요"
          className="student-input"
        />
        <button type="submit" className="btn-primary">
          ➕ 학생 추가
        </button>
      </form>

      <div className="student-list">
        <h3>등록된 학생 ({students.length}명)</h3>
        {students.length === 0 ? (
          <p className="empty-message">등록된 학생이 없습니다.</p>
        ) : (
          <ul>
            {students.map(student => (
              <li key={student.id} className="student-item">
                <span className="student-name">{student.name}</span>
                <button
                  onClick={() => onDeleteStudent(student.id)}
                  className="btn-danger"
                  title="삭제"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentManager;
