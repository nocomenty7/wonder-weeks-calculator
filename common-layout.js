document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통 CSS 스타일 동적 삽입
    const styleHTML = `
        <style>
            body { margin: 0; padding-top: 55px; }
            .easytools-header { position: fixed; top: 0; left: 0; width: 100%; height: 55px; background: #ffffff; border-bottom: 1px solid #eeeeee; display: flex; align-items: center; padding: 0 20px; box-sizing: border-box; z-index: 9999; font-family: 'Pretendard', sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
            
            /* 로고 영역 고정 */
            .easytools-logo { flex-shrink: 0; }
            .easytools-logo a { font-weight: 800; font-size: 18px; color: #4A90E2; text-decoration: none; }
            
            /* 네비게이션 영역 (기본 PC) */
            .easytools-nav { display: flex; gap: 24px; margin-left: 40px; flex: 1; }
            .easytools-dropdown { position: relative; display: inline-block; height: 55px; line-height: 55px; }
            .easytools-dropdown > a { text-decoration: none; color: #333; font-weight: 600; font-size: 15px; display: block; padding: 0 5px; }
            
            /* 드롭다운 콘텐츠 (기본 PC) */
            .easytools-dropdown-content { display: none; position: absolute; top: 55px; left: 50%; transform: translateX(-50%); background-color: #ffffff; min-width: 210px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.08); border: 1px solid #eee; border-radius: 8px; overflow: hidden; z-index: 10000; line-height: 1.5; }
            .easytools-dropdown-content a { color: #555; padding: 12px 20px; text-decoration: none; display: block; font-size: 14px; text-align: left; border-bottom: 1px solid #f9f9f9; transition: background 0.2s; }
            .easytools-dropdown-content a:hover { background-color: #f1f8ff; color: #4A90E2; font-weight: 600; }
            .easytools-dropdown-content a:last-child { border-bottom: none; }
            
            /* PC 마우스 오버 효과 (터치 기기에서는 무시됨) */
            @media (hover: hover) {
                .easytools-dropdown:hover .easytools-dropdown-content { display: block; }
            }
            
            /* 터치(클릭) 시 열림 클래스 적용 */
            .easytools-dropdown.active .easytools-dropdown-content { display: block; }
            
            /* 모바일 환경 완벽 대응 (가로 스크롤 및 풀위드 드롭다운) */
            @media (max-width: 768px) {
                .easytools-header { padding: 0 15px; }
                /* 타이틀 우측에 여백 확보 및 부드러운 가로 스크롤 적용 */
                .easytools-nav { margin-left: 20px; gap: 18px; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; padding-right: 20px; scrollbar-width: none; }
                .easytools-nav::-webkit-scrollbar { display: none; /* 스크롤바 숨김 */ }
                
                /* 모바일에서는 드롭다운 메뉴가 가로 스크롤에 잘리지 않도록 화면 전체 너비로 고정 */
                .easytools-dropdown-content { position: fixed; left: 0; top: 55px; width: 100%; transform: none; border-radius: 0; border-left: none; border-right: none; box-shadow: 0px 8px 12px rgba(0,0,0,0.1); }
            }
            
            /* 푸터 스타일 */
            .easytools-footer { background: #f9f9f9; padding: 30px 20px; text-align: center; font-size: 13px; color: #777; border-top: 1px solid #eeeeee; line-height: 1.8; font-family: 'Pretendard', sans-serif; }
            .easytools-footer-links { margin-bottom: 12px; }
            .easytools-footer-links a { color: #555; text-decoration: none; font-weight: 600; margin: 0 10px; }
            .easytools-footer-links a:hover { color: #4A90E2; text-decoration: underline; }
            .easytools-footer p { margin: 4px 0; }
        </style>
    `;

    // 2. 슬림 헤더 HTML 구조 동적 삽입
    const headerHTML = `
        <header class="easytools-header">
            <div class="easytools-logo">
                <a href="https://easytools.kr">EasyTools</a>
            </div>
            <nav class="easytools-nav">
                <div class="easytools-dropdown">
                    <a href="#">금융·부동산 ▾</a>
                    <div class="easytools-dropdown-content">
                        <a href="https://stocktax.easytools.kr">해외주식 양도소득세</a>
                        <a href="https://fire.easytools.kr">조기 은퇴(FIRE) 계산기</a>
                        <a href="https://rent-compare.easytools.kr">전세 vs 월세 비교</a>
                        <a href="https://child-invest.easytools.kr">자녀 증여·복리 계산기</a>
                    </div>
                </div>
                <div class="easytools-dropdown">
                    <a href="#">세금·복지 ▾</a>
                    <div class="easytools-dropdown-content">
                        <a href="https://leave-salary.easytools.kr">2026 육아휴직 급여</a>
                        <a href="https://tax-couple.easytools.kr">맞벌이 연말정산 비율</a>
                        <a href="https://median-income.easytools.kr">2026 가구 중위소득</a>
                        <a href="https://health-dependent.easytools.kr">건보료 피부양자 진단</a>
                    </div>
                </div>
                <div class="easytools-dropdown">
                    <a href="#">육아 ▾</a>
                    <div class="easytools-dropdown-content">
                        <a href="https://easytools.kr/wonder">원더윅스 계산기</a>
                        <a href="https://growth.easytools.kr">아이 예상 키·성장표</a>
                    </div>
                </div>
                <div class="easytools-dropdown">
                    <a href="#">생활·건강 ▾</a>
                    <div class="easytools-dropdown-content">
                        <a href="https://seasonal.easytools.kr">사계절 제철 음식</a>
                        <a href="https://pet-age.easytools.kr">반려동물 나이 환산</a>
                        <a href="https://alcohol.easytools.kr">알코올 해소(숙취) 시간</a>
                        <a href="https://sleep.easytools.kr">수면 사이클 기상 시간</a>
                        <a href="https://calorie.easytools.kr">운동 ↔ 야식 칼로리 환산</a>
                    </div>
                </div>
            </nav>
        </header>
    `;

    // 3. 필수 링크가 포함된 푸터 HTML 구조 동적 삽입
    const footerHTML = `
        <footer class="easytools-footer">
            <div class="easytools-footer-links">
                <a href="#">이용약관</a>
                <span style="color:#ddd">|</span>
                <a href="#">개인정보 처리방침</a>
                <span style="color:#ddd">|</span>
                <a href="mailto:contact@easytools.kr?subject=[EasyTools 문의]">문의하기</a>
            </div>
            <p><strong>EasyTools</strong> | 일상 속 복잡한 계산과 진단을 가장 심플하게 해결합니다.</p>
            <p style="color:#999; font-size:12px;">본 서비스의 계산 결과는 모의 계산용 참고 자료이며 법적 효력이 없습니다.</p>
            <p>© 2026 EasyTools.kr All rights reserved.</p>
        </footer>
    `;

    // 문서의 구조에 스타일, 헤더, 푸터 주입
    document.head.insertAdjacentHTML('beforeend', styleHTML);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // ==========================================
    // 4. 모바일 터치(클릭) 이벤트 제어 로직 추가
    // ==========================================
    const dropdowns = document.querySelectorAll('.easytools-dropdown');

    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('a');
        
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 이동(#) 방지
            e.stopPropagation(); // 문서 전체 클릭 이벤트로 전파 방지

            // 내가 클릭한 메뉴 외에 다른 메뉴가 열려있다면 닫기
            dropdowns.forEach(d => {
                if(d !== dropdown) {
                    d.classList.remove('active');
                }
            });

            // 현재 터치한 메뉴 열기/닫기 토글
            dropdown.classList.toggle('active');
        });
    });

    // 메뉴 바깥 화면(Body)의 아무 곳이나 터치하면 열려있던 메뉴 닫기
    document.addEventListener('click', function() {
        dropdowns.forEach(d => d.classList.remove('active'));
    });
});
