import React, { useState } from 'react';
import './HomeworkManager.css';

interface Props {
  onAddHomework: (subject: string, title: string) => void;
}

const HomeworkManager: React.FC<Props> = ({ onAddHomework }) => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && title.trim()) {
      onAddHomework(subject.trim(), title.trim());
      setSubject('');
      setTitle('');
    }
  };

  const subjects = ['국어', '수학', '영어', '과학', '사회', '기타'];

  return (
    <div className="homework-manager">
      <h2>✏️ 숙제 추가</h2>
      
      <form onSubmit={handleSubmit} className="add-homework-form">
        <div className="form-group">
          <label htmlFor="subject">과목</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="homework-select"
            required
          >
            <option value="">과목을 선택하세요</option>
            {subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">숙제 제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 1~10쪽 문제 풀기"
            className="homework-input"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          ➕ 숙제 추가
        </button>
      </form>

      <div className="homework-info">
        <h3>💡 사용 방법</h3>
        <ol>
          <li>과목과 숙제 제목을 입력하여 새 숙제를 추가하세요.</li>
          <li>"숙제 현황" 탭에서 학생들이 직접 완료 표시를 할 수 있습니다.</li>
          <li>모든 학생이 완료하면 숙제를 삭제할 수 있습니다.</li>
        </ol>
      </div>
    </div>
  );
};

export default HomeworkManager;
