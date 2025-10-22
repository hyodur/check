import React, { useState } from 'react';
import { Student, Homework } from '../types';
import './HomeworkTracker.css';

interface Props {
  students: Student[];
  homeworks: Homework[];
  onStatusChange: (homeworkId: string, studentId: string, newStatus: 'pending' | 'completed' | 'absent') => void;
  onDeleteHomework: (homeworkId: string) => void;
}

const HomeworkTracker: React.FC<Props> = ({ students, homeworks, onStatusChange, onDeleteHomework }) => {
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);

  if (students.length === 0) {
    return (
      <div className="homework-tracker">
        <div className="empty-state">
          <h2>👥 학생을 먼저 등록해주세요</h2>
          <p>"학생 관리" 탭에서 학생들을 추가할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  if (homeworks.length === 0) {
    return (
      <div className="homework-tracker">
        <div className="empty-state">
          <h2>✏️ 숙제를 추가해주세요</h2>
          <p>"숙제 관리" 탭에서 숙제를 추가할 수 있습니다.</p>
        </div>
      </div>
    );
  }

  const getStatusCount = (homework: Homework) => {
    const completed = homework.statuses.filter(s => s.status === 'completed').length;
    const absent = homework.statuses.filter(s => s.status === 'absent').length;
    const pending = homework.statuses.filter(s => s.status === 'pending').length;
    return { completed, absent, pending, total: homework.statuses.length };
  };

  const handleStudentClick = (homeworkId: string, studentId: string, currentStatus: 'pending' | 'completed' | 'absent') => {
    // pending -> completed -> absent -> pending 순환
    let newStatus: 'pending' | 'completed' | 'absent';
    if (currentStatus === 'pending') {
      newStatus = 'completed';
    } else if (currentStatus === 'completed') {
      newStatus = 'absent';
    } else {
      newStatus = 'pending';
    }
    onStatusChange(homeworkId, studentId, newStatus);
  };

  const handleDeleteHomework = (homeworkId: string) => {
    if (window.confirm('이 숙제를 삭제하시겠습니까?')) {
      onDeleteHomework(homeworkId);
      if (selectedHomework === homeworkId) {
        setSelectedHomework(null);
      }
    }
  };

  const selectedHw = homeworks.find(h => h.id === selectedHomework) || homeworks[0];

  return (
    <div className="homework-tracker">
      <h2>📊 숙제 현황 추적</h2>

      <div className="homework-selector">
        <label htmlFor="homework-select">숙제 선택:</label>
        <select
          id="homework-select"
          value={selectedHw.id}
          onChange={(e) => setSelectedHomework(e.target.value)}
          className="homework-dropdown"
        >
          {homeworks.map(hw => {
            const counts = getStatusCount(hw);
            return (
              <option key={hw.id} value={hw.id}>
                [{hw.subject}] {hw.title} ({counts.completed}/{counts.total}명 완료)
              </option>
            );
          })}
        </select>
      </div>

      {selectedHw && (
        <div className="homework-detail">
          <div className="homework-header">
            <div>
              <h3>
                <span className="subject-badge">{selectedHw.subject}</span>
                {selectedHw.title}
              </h3>
              <p className="homework-date">
                생성일: {new Date(selectedHw.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <button
              onClick={() => handleDeleteHomework(selectedHw.id)}
              className="btn-danger"
              title="숙제 삭제"
            >
              🗑️ 삭제
            </button>
          </div>

          <div className="status-summary">
            {(() => {
              const counts = getStatusCount(selectedHw);
              return (
                <>
                  <div className="status-item completed">
                    ✅ 완료: {counts.completed}명
                  </div>
                  <div className="status-item pending">
                    ⏳ 대기: {counts.pending}명
                  </div>
                  <div className="status-item absent">
                    🏥 결석: {counts.absent}명
                  </div>
                </>
              );
            })()}
          </div>

          <div className="legend">
            <p><strong>사용법:</strong> 학생 이름을 클릭하면 상태가 변경됩니다</p>
            <div className="legend-items">
              <span className="legend-item">⏳ 대기 중</span>
              <span className="legend-item">✅ 완료</span>
              <span className="legend-item">🏥 결석</span>
            </div>
          </div>

          <div className="students-grid">
            {selectedHw.statuses.map(status => {
              const student = students.find(s => s.id === status.studentId);
              if (!student) return null;

              return (
                <button
                  key={status.studentId}
                  className={`student-card ${status.status}`}
                  onClick={() => handleStudentClick(selectedHw.id, status.studentId, status.status)}
                  title={`클릭하여 상태 변경`}
                >
                  <div className="student-avatar">
                    {status.status === 'completed' && '✅'}
                    {status.status === 'pending' && '⏳'}
                    {status.status === 'absent' && '🏥'}
                  </div>
                  <div className="student-info">
                    <span className="student-name">{student.name}</span>
                    <span className="status-label">
                      {status.status === 'completed' && '완료'}
                      {status.status === 'pending' && '대기중'}
                      {status.status === 'absent' && '결석'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkTracker;
