document.addEventListener("DOMContentLoaded", function() {
    // 1. 공통 CSS 스타일 (생략 없이 동일하게 유지하되 로고 부분만 수정)
    const styleHTML = `
        <style>
            body { margin: 0; padding-top: 55px; }
            .easytools-header { position: fixed; top: 0; left: 0; width: 100%; height: 55px; background: #ffffff; border-bottom: 1px solid #eeeeee; display: flex; align-items: center; padding: 0 20px; box-sizing: border-box; z-index: 9999; font-family: 'Pretendard', sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
            
            .easytools-logo { flex-shrink: 0; }
            /* 🚀 로고 폰트 사이즈 살짝 키우고 영문 폰트에 맞게 미세조정 */
            .easytools-logo a { font-weight: 800; font-size: 20px; color: #4A90E2; text-decoration: none; letter-spacing: -0.5px; }
            
            .easytools-nav { display: flex; gap: 24px; margin-left: 40px; flex: 1; }
            .easytools-dropdown { position: relative; display: inline-block; height: 55px; line-height: 55px; }
            .easytools-dropdown > a { text-decoration: none; color: #333; font-weight: 600; font-size: 15px; display: block; padding: 0 5px; }
            
            .easytools-dropdown-content { display: none; position: absolute; top: 55px; left: 50%; transform: translateX(-50%); background-color: #ffffff; min-width: 210px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.08); border: 1px solid #eee; border-radius: 8px; overflow: hidden; z-index: 10000; line-height: 1.5; }
            .easytools-dropdown-content a { color: #555; padding: 12px 20px; text-decoration: none; display: block; font-size: 14px; text-align: left; border-bottom: 1px solid #f9f9f9; transition: background 0.2s; }
            .easytools-dropdown-content a:hover { background-color: #f1f8ff; color: #4A90E2; font-weight: 600; }
            .easytools-dropdown-content a:last-child { border-bottom: none; }
            
            @media (hover: hover) {
                .easytools-dropdown:hover .easytools-dropdown-content { display: block; }
            }
            .easytools-dropdown.active .easytools-dropdown-content { display: block; }
            
            @media (max-width: 768px) {
                .easytools-header { padding: 0 15px; }
                .easytools-nav { margin-left: 20px; gap: 18px; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; padding-right: 20px; scrollbar-width: none; }
                .easytools-nav::-webkit-scrollbar { display: none; }
                .easytools-dropdown-content { position: fixed; left: 0; top: 55px; width: 100%; transform: none; border-radius: 0; border-left: none; border-right: none; box-shadow: 0px 8px 12px rgba(0,0,0,0.1); }
            }
            
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
                <a href="https://easytools.kr">EasyTools</a> </div>
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

    // 3. 🚀 푸터 HTML (약관 링크 실제 연결)
    const footerHTML = `
        <footer class="easytools-footer">
            <div class="easytools-footer-links">
                <a href="/terms.html">이용약관</a>
                <span style="color:#ddd">|</span>
                <a href="/privacy.html">개인정보처리방침</a>
                <span style="color:#ddd">|</span>
                <a href="mailto:contact@easytools.kr?subject=[EasyTools 문의]">문의하기</a>
            </div>
            <p><strong>EasyTools</strong> | 일상 속 복잡한 계산과 진단을 가장 심플하게 해결합니다.</p>
            <p style="color:#999; font-size:12px;">본 서비스의 계산 결과는 모의 계산용 참고 자료이며 법적 효력이 없습니다.</p>
            <p>© 2026 EasyTools. All rights reserved.</p>
        </footer>
    `;

    // 문서의 구조에 스타일, 헤더, 푸터 주입
    document.head.insertAdjacentHTML('beforeend', styleHTML);
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 모바일 터치 이벤트 제어 로직 (동일)
    const dropdowns = document.querySelectorAll('.easytools-dropdown');

    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('a');
        
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            dropdowns.forEach(d => {
                if(d !== dropdown) {
                    d.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        });
    });

    document.addEventListener('click', function() {
        dropdowns.forEach(d => d.classList.remove('active'));
    });
});
