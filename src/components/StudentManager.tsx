import React, { useState } from 'react';
import { Student } from '../types';
import './StudentManager.css';

interface Props {
  students: Student[];
  onAddStudent: (name: string) => void;
  onDeleteStudent: (id: string) => void;
  onAddMultipleStudents: (names: string[]) => void;
}

const StudentManager: React.FC<Props> = ({ students, onAddStudent, onDeleteStudent, onAddMultipleStudents }) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [bulkStudentNames, setBulkStudentNames] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      onAddStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bulkStudentNames.trim()) {
      const names = bulkStudentNames
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
      
      if (names.length > 0) {
        onAddMultipleStudents(names);
        setBulkStudentNames('');
        setShowBulkInput(false);
      }
    }
  };

  return (
    <div className="student-manager">
      <h2>👥 학생 관리</h2>
      
      <div className="input-mode-toggle">
        <button
          type="button"
          className={!showBulkInput ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setShowBulkInput(false)}
        >
          한 명씩 추가
        </button>
        <button
          type="button"
          className={showBulkInput ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setShowBulkInput(true)}
        >
          여러 명 한번에 추가
        </button>
      </div>

      {!showBulkInput ? (
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
      ) : (
        <form onSubmit={handleBulkSubmit} className="add-student-form bulk">
          <textarea
            value={bulkStudentNames}
            onChange={(e) => setBulkStudentNames(e.target.value)}
            placeholder="학생 이름을 한 줄에 한 명씩 입력하세요&#10;예:&#10;김철수&#10;이영희&#10;박민수"
            className="student-textarea"
            rows={8}
          />
          <button type="submit" className="btn-primary">
            ➕ 일괄 추가
          </button>
        </form>
      )}

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
