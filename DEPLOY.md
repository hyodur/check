# 🚀 Vercel 배포 가이드

## 📋 배포 단계별 안내

### 1단계: Vercel 계정 만들기 ✅ (이미 완료!)

GitHub 코드가 이미 푸시되었습니다!
- ✅ GitHub 저장소: `https://github.com/hyodur/check`
- ✅ 브랜치: `main`
- ✅ 프로젝트 폴더: `homework-tracker`

---

### 2단계: Vercel에서 프로젝트 배포하기

#### 2-1. Vercel 웹사이트 접속
1. 브라우저에서 [vercel.com](https://vercel.com) 접속
2. **"Sign Up"** 또는 **"Log In"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 계정으로 로그인

#### 2-2. 새 프로젝트 만들기
1. Vercel 대시보드에서 **"Add New"** 버튼 클릭
2. **"Project"** 선택
3. GitHub 저장소 목록에서 **"check"** 찾기
   - 만약 안 보이면 **"Adjust GitHub App Permissions"** 클릭하여 권한 허용
4. **"Import"** 버튼 클릭

#### 2-3. 프로젝트 설정 (중요!)
배포 설정 화면에서 다음과 같이 입력:

```
Project Name: homework-tracker (또는 원하는 이름)
Framework Preset: Create React App (자동 인식됨)
Root Directory: homework-tracker  ⚠️ 반드시 입력!
Build Command: npm run build (자동)
Output Directory: build (자동)
Install Command: npm install (자동)
```

**⚠️ 중요**: **Root Directory**에 `homework-tracker`를 꼭 입력해주세요!
- 이 설정을 안 하면 배포 실패합니다
- 우리 프로젝트가 저장소의 하위 폴더에 있기 때문입니다

#### 2-4. 환경 변수 (필요 없음)
- 환경 변수 설정은 건너뛰어도 됩니다
- 바로 **"Deploy"** 버튼 클릭!

---

### 3단계: 배포 진행 및 완료

1. **배포 시작** 🚀
   - "Deploy" 버튼 클릭 후 자동으로 빌드 시작
   - 진행 상황을 실시간으로 볼 수 있습니다

2. **배포 중** ⏳ (약 1~2분 소요)
   - Building... (코드 빌드)
   - Optimizing... (최적화)
   - Deploying... (배포)

3. **배포 완료!** 🎉
   - 축하 화면과 함께 URL이 표시됩니다
   - 예: `https://homework-tracker-abc123.vercel.app`
   - 또는 `https://your-name-homework-tracker.vercel.app`

4. **URL 확인 및 접속**
   - 생성된 URL을 클릭하면 바로 앱 사용 가능!
   - 이 URL을 학생들과 공유하세요

---

## 🎯 배포 후 사용법

### 영구 URL로 접속
- Vercel이 제공하는 URL은 영구적입니다
- 언제든지 같은 주소로 접속 가능
- 북마크해두고 사용하세요!

### 자동 재배포
- GitHub에 코드를 푸시하면 **자동으로 재배포**됩니다
- 수정사항이 있으면:
  1. 코드 수정
  2. `git add .`
  3. `git commit -m "수정 내용"`
  4. `git push`
  5. Vercel이 자동으로 감지하고 재배포 (약 1~2분)

### 여러 버전 관리
- 각 커밋마다 고유한 미리보기 URL 생성
- 메인 URL은 항상 최신 버전

---

## 💰 비용 안내

### 무료 플랜 (Hobby)
✅ **완전 무료!**
- 무제한 배포
- 100GB 대역폭/월
- 자동 HTTPS
- GitHub 연동
- `.vercel.app` 도메인

→ **학급용으로 충분합니다!**

### 유료가 되는 경우
- 월 100GB 대역폭 초과 (학급용으로는 불가능)
- 팀 협업 기능 필요 시 (Pro 플랜 $20/월)
- 상업적 대규모 서비스

→ **교육용으로는 절대 유료 될 일 없습니다!**

---

## 🔧 문제 해결

### Root Directory 에러
```
Error: No package.json found
```
→ **해결**: Root Directory에 `homework-tracker` 입력했는지 확인

### 빌드 에러
```
Build failed
```
→ **해결**: 
1. GitHub 저장소에 최신 코드가 푸시되었는지 확인
2. Vercel에서 "Redeploy" 클릭

### URL 접속 안 됨
→ **해결**:
1. 배포 완료되었는지 확인 (1~2분 대기)
2. 브라우저 캐시 삭제 후 재접속
3. 시크릿 모드로 접속 시도

---

## 📱 배포 완료 후 해야 할 일

### ✅ 체크리스트
- [ ] Vercel 배포 완료
- [ ] 생성된 URL 접속 테스트
- [ ] 학생 등록 테스트
- [ ] 숙제 추가 테스트
- [ ] 상태 변경 테스트
- [ ] 로컬 스토리지 저장 확인
- [ ] URL 북마크 저장
- [ ] 학생들에게 URL 공유

### 📚 학생들과 공유하기
생성된 URL을:
- 학급 게시판에 공지
- 클래스룸이나 메신저로 공유
- QR 코드로 만들어서 교실에 부착

---

## 🎉 축하합니다!

이제 언제 어디서든 접속 가능한 학급 숙제 관리 시스템을 갖게 되었습니다!

**생성된 URL 예시:**
```
https://homework-tracker.vercel.app
```

이 주소를 학생들과 공유하세요! 😊

---

**문의사항이나 도움이 필요하시면 언제든지 알려주세요!**
