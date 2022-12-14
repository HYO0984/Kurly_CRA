import React, { useState, useEffect } from 'react';
import Postcode from 'react-daum-postcode';
import '../postcode.scss'

const MemberComponent = ({modal, modalShowFn,이용약관동의}) => {
  // console.log(이용약관동의); <=프롭스 확인
  const stylePost = {
    position:'fixed',
    top:'50%',
    left:'50%',
    width:'420px',
    hight:'500px',
    marginTop:'-210px',
    marginLeft:'-250px',
    backgrounf:'#fff',
    border:'1px solid #ccc',
    zIndex:'10'
  }

  const onCompletePost =(data)=>{
    // console.log(data);
    // console.log(data.address);
    // console.log(data.jibunAddress);
    // console.log(data.zonecode);

    setField({...field,주소1:data.address});
  }

  const [field, setField] = useState(
        {
          아이디중복확인OK:true, //로컬스토레이지 저장 후
          아이디: '',
          isShowId: false,
          isClassId: '',

          비밀번호: '',
          isShowPw: false,
          isClassPw1: '',
          isClassPw2: '',
          isClassPw3: '',

          비밀번호확인:'',
          isShowPwRe: false,
          isClassPwRe: '',

          이름: '',
        
          이메일: '',
          이메일확인: '', //true 이메일 정상, false 이메일 오류
          이메일중복확인OK:true, //로컬스토레이지 저장 후
          
          휴대폰: '',
          휴대폰확인: '',
          휴대폰인증번호확인OK:false,

          isDisabledHp: true,  //버튼사용불가
          isShowHp: false,
          minutes: 2,
          seconds: 59,
          인증번호: '',  //자동 랜덤 생성 번호
          setId: 0,
          인증확인번호: '', //폰으로 전송된 인증번호 입력
          isDisabledHpInput: false,
          isDisabledHpBtn: false,
          isClassHp1: false,
          isClassHp2: false,
          isShowHpSpan: true,

          주소1:'',
          주소2:'',
          isShowAddr:false,

          성별:'선택안함',

          생년:'',
          생월:'',
          생일:'',

          isShowBirthTxt:'',
          isShowError:false,
          //추가입력사항
          추가입력사항선택:'', //1.추가입력사항선택 : 라디오 버튼 선택항목
          isShowAddInput:false, //2. 추가입력사항 박스 show, hide
          추가입력사항:'',  //3.추가입력사항 :입력상자 입력값 추천인 또는 이벤트 명 저장

          //이용약관동의
          이용약관동의:[] ,//내용이 많아서 배열처리
          // 이용약관필수동의: 3 // 필수동의는 3개
        }
  );

  //아이디   
  //1. onChangeId
  const onFocusId=()=>{
    setField({...field, isShowId: true });
  }
  //2. onFocusId
  const onChangeId=(e)=>{
    const  regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}$/g;
    let imsi = '';

    if(regExp.test(e.target.value)){
      imsi = true;
    }    
    else {      
      imsi = false;
    }
    setField({...field, 아이디: e.target.value, isClassId: imsi });
    
  }
  // 아이디 확인 버튼 클릭 이벤트 : 모달창 띄우기
  const onClickIdOk=(e)=>{
      e.preventDefault();
      //모달창 띄우기 함수 호출 실행
      if(field.아이디===''){
        modalShowFn('아이디를 입력하세요!');
      }
      else{
        if(field.isClassId===false){ //정규표현식이 오류가 있다면
          modalShowFn('6자 이상의 영문 혹은 영문과 숫자를 조합만 가능합니다.');
        }
        else {  //저장된 상태관리 멤버변수와 로컬스토레이지(데이터베이스) 아이디를 비교 중복검색 한다.
          //1.로컬스토레이지 데이터 가져오기 localStroage.getItem() :임시배열에 저장하기(밀어넣기)
          let imsi = [];
          for(let i=0; i<localStorage.length; i++){
            // console.log(i) //1 2 3 4 5 ... index
            // console.log(localStorage.key(i))  // 0 1 2 3 4 5 id
            // console.log(localStorage.getItem( localStorage.key(i)))
                        //JSON.parse() 객체 변환
            // console.log(JSON.parse( localStorage.getItem( localStorage.key(i))))
            //임시배열에 데이터 밀어넣기
            imsi.push(JSON.parse( localStorage.getItem( localStorage.key(i))))
          }
          
          // 전송 버튼(submit) 섭밋 수행 후 중복검색한다. 
          // result = {false,flase,true....}
          let result =imsi.map((item)=>item.아이디 === field.아이디) //같으면 true 다르면 false
            // console.log('아이디중복검사:',result)
            // console.log(result.includes(true))
          if(result.includes(true)){
            modalShowFn('중복된 아이디 입니다.');
          }
          else{
            modalShowFn('사용가능한 아이디 입니다.');
          }

          //로컬스토레이지 데이터 가져오기
          // console.log(imsi);
          // console.log('아이디2번째 :', imsi[2].아이디);
          // imsi.map((item)=>{
          //   console.log(item.아이디)
          // })


        }
      }
  }


  


  //비밀번호 
  //1. onFocusPw
  const onFocusPw=()=>{
    setField({...field, isShowPw: true});
  }
  //2. onChangePw
  const onChangePw=(e)=>{
    const regExp1 = /.{10,}/; 
    const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
    const regExp3 = /(.)\1\1/; //긍정문:  숫자 연속사용 3개이상 \1\1

    let imsi1 = '';
    let imsi2 = '';
    let imsi3 = '';

    //조건1 : 10이상 긍정문 
    if(regExp1.test(e.target.value)){
      imsi1 = true;
    }
    else{
      imsi1 = false;
    }

    //조건2 : 영문필수, (숫자 또는 특수문자)필수 긍정문 
    if(regExp2.test(e.target.value)){
      imsi2 = true;
    }
    else{
      imsi2 = false;
    }

    //조건3 : 연속3자는 안된다. 긍정문 
    if(regExp3.test(e.target.value)){
      imsi3 = false; //3자이상이면 그런 입력오류 false
    }
    else{
      imsi3 = true;
    }

    //상태관리 멤버변수 지정하기
    setField(
      {
        ...field, 
        비밀번호: e.target.value, 
        isClassPw1: imsi1, 
        isClassPw2: imsi2, 
        isClassPw3: imsi3
      }
    );
  }

  //비밀번호 확인
  //1. onFocusPwRe
  const onFocusPwRe=()=>{
    setField({...field, isShowPwRe: true});
  }
  //2. onChangePwRe
  const onChangePwRe=(e)=>{
    let imsi = '';

    //입력된 비밀번호와 현재 입력된 비밀번호확인 값과 비교 같으면 true, 틀리면 false
    if(field.비밀번호 === e.target.value){
      imsi = true;
    }
    else{
      imsi = false;
    }
    setField({...field, 비밀번호확인: e.target.value, isClassPwRe: imsi});
  }


  //이름  
  //1. onChangeName
  const onChangeName=(e)=>{
    //영문, 한글, 공백만 입력 나머진 모두 삭제 
    const regExp = /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;
    let imsi = '';
        imsi = e.target.value.toString().replace(regExp,'');
        setField(
            {
              ...field, 
              이름: imsi
            }
        );
  }

  //이메일
  //1. onChangeEmail
  const onChangeEmail=(e)=>{
    const regExp = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    let imsi = '';
    if(regExp.test(e.target.value)){
       imsi = true;
    }
    else{
       imsi = false;
    }
    setField({...field, 이메일: e.target.value, 이메일확인: imsi });
  }
  //2. 이메일 확인 버튼 클릭 이벤트 : 모달창 띄우기
    const onClickEmailOk=(e)=>{
      e.preventDefault();
      //모달창 띄우기 함수 호출 실행
      if(field.이메일===''){
        modalShowFn('이메일을 입력하세요!');
      }
      else{
        modalShowFn('이메일를 확인했습니다. 다음 입력하세요!');
      }
        //1.로컬스토레이지 데이터 가져오기 localStroage.getItem() :임시배열에 저장하기(밀어넣기)
        let imsi = [];
        for(let i=0; i<localStorage.length; i++){
          imsi.push(JSON.parse( localStorage.getItem( localStorage.key(i))))
        }
        
        // 전송 버튼(submit) 섭밋 수행 후 중복검색한다. 
        // result = {false,flase,true....}
        let result =imsi.map((item)=>item.이메일 === field.이메일) //같으면 true 다르면 false
        if(result.includes(true)){
          modalShowFn('중복된 이메일 입니다.');
        }
        else{
          modalShowFn('사용가능한 이메일 입니다.');
        }

  }




  //휴대폰
  //1. 휴대폰 번호 입력 정규표현식 검증
  const onChangeHp=(e)=>{
    const regExp = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/g;  //10~11 휴대폰
    let imsi = '';

    if(regExp.test(e.target.value)){
      imsi = true;
    }
    else{
      imsi = false;
    }

    setField(
      {
        ...field, 
        휴대폰: e.target.value, 
        휴대폰확인: imsi, 
        isDisabledHp: !imsi
      }
    )

  }

  //2. 휴대폰 인증 버튼 클릭 인증번호 전송 이벤트
  const onClickHp=(e)=>{
    e.preventDefault();
    // 랜덤함수 Math.random() 랜덤숫자 0~1 사이숫자 6자  
    // Math.floor() 내림  / Math.ceil() 올림  / Math.round() 반올림
    // 6자리의 랜덤 숫자 만들기
    let num = Math.floor(Math.random()*900000+100000);
    setField({...field, isShowHp: true, 인증번호: num.toString()});    

    //모달창 띄우기 함수 호출 실행
    if(field.휴대폰===''){
      modalShowFn('휴대폰 번호를 입력하세요!');
    }
    else{
      modalShowFn(`휴대폰으로 인증번호(${num})가 전송되었습니다.`);
    }

  }
  
  //3. 타이머카운트함수
  const timerCount=()=>{
    let s  = 59; //59~0 초(1분)
    let m = 2;  //2분 2 1 0
    let setId = 0;

    setId = setInterval(()=>{
      s--;  //59 58 ... 0
      if(s<=0){
        s=59;
        m--;  // 2 1 0
        if(m<=0){
          clearInterval(setId);
          s=0;
          m=0;
        }
      }
      setField({...field,  seconds: s, minutes: m, setId: setId  });
    },1000);
  }

  //4. isShowHp : true 값 변경하고 랜더링 뒤 마우트 이루어지면 그떼 함수 실행하게함
  useEffect(()=>{
    field.isShowHp && timerCount();
  },[field.isShowHp]);


  //5. 인증확인번호 입력상자
  const onChangeHpNum=(e)=>{
      //입력시 곧바로 타이머 일시정지
      //그래야 인증확인번호 입력가능하게 만든다.
      clearInterval(field.setId);
      setField({...field, 인증확인번호: e.target.value});
  }

  //6. 인증번호확인 버튼 클릭 이벤트
  const onClickHpConfirm=(e)=>{
      e.preventDefault();
      //비교 인증번호 === 인증확인번호
      if(field.인증번호===field.인증확인번호){
        modalShowFn('인증이 확인되었습니다.');
        //인증확인번호 입력상자 사용불가 disabled=true
        //인증확인 버튼 사용불가 disabled=true        
        setField(
          {
            ...field, 
            isDisabledHpInput: true, 
            isDisabledHpBtn: true,
            isClassHp1: true,
            isClassHp2: true,
            인증확인번호: '',
            isShowHpSpan: false,
            휴대폰인증번호확인OK: true
          }
        );
      }
      else{
        modalShowFn('인증번호를 다시 확인하세요.');
      }
  }

  //주소 버튼 클릭 이벤트 상태관리
  const onClickAddr =(e)=>{
    e.preventDefault();
    setField({...field,isShowAddr:true})
  }


  //주소 입력 상자1 onChange 
  const onChangeArr1 =(e)=>{
    setField({...field,주소1 :e.target.value})
  }

  //주소 입력 상자2 onChange 

  const onChangeArr2 =(e)=>{
    setField({...field,주소2 :e.target.value}) 
  }


  //성별
  const onChangeGender =(e)=>{
    setField({...field, 성별:e.target.value})
  }

  //생년월일 이벤트
  const onChangeYear = (e)=>{
    const regExp = /[^0-9]/g;
    let imsi = e.target.value.trim().replace(regExp,'')
    setField({...field,생년:imsi})
  }
  const onChangeMonth = (e)=>{
    const regExp = /[^0-9]/g;
    let imsi = e.target.value.trim().replace(regExp,'')
    setField({...field,생월:imsi})
  }
  const onChangeDate = (e)=>{
    const regExp = /[^0-9]/g;
    let imsi = e.target.value.trim().replace(regExp,'')
    setField({...field,생일:imsi})
  }

  const birthDayCheck =()=>{
    
    //비구조화
    const{생년, 생월, 생일} = field;

    // 정규표현식
    const regExpYear = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g ;
    const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g;
    const regExpDate = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g ;

    //현재 년월일
    const nowYear = new Date().getFullYear(); //년 4자리
    const nowMonth = new Date().getMonth()+1; //월 0~11
    const nowDate = new Date().getDate(); //일

    //오늘
    const today = new Date( nowYear, nowMonth, nowDate );

    if(생년 ==='' && 생월 ==='' && 생일 ===''){
      return;
      }
    else{
      //생년 
      if(regExpYear.test(생년)===false){
        setField({...field,isShowError:true,isShowBirthTxt:'태어난 년도 4자리를 정확하게 입력해주세요.'})
      }
      else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
      }
      //생월
      if(regExpMonth.test(생월)===false){
        setField({...field,isShowError:true,isShowBirthTxt:'태어난 월을 정확하게 입력해주세요.'})
        return;
      }
      else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
      }
      //생일
      if(regExpDate.test(생일)===false){
        setField({...field,isShowError:true,isShowBirthTxt:'태어난 일을 정확하게 입력해주세요.'})
        return;
      }
      else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
      }

      const birthDay  = new Date(생년, 생월, 생일);  //생년월일
      const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);  //14세 미만 변수
      const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);  //14세 미만 변수
        //미래
        if( birthDay > today ){
        setField({...field,isShowError:true,isShowBirthTxt:'생년월일이 미래로 입력되었어요.'})
        return; 
        }
        else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
        }
        //14세 이상
        if( birthDay > nowYear14 ){
        setField({...field,isShowError:true,isShowBirthTxt:'만 14세 미만은 가입이 불가 합니다.'})
        return; 
        }
        else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
        }      
        //120초과
        if( birthDay < nowYear120 ){  //120세 초과 나이 120살 넘는 분들
        setField({...field,isShowError:true,isShowBirthTxt:'생년월일을 다시한번 확인해주세요.'})
        return; 
        }
        else{
        setField({...field,isShowBirthTxt:'',isShowError:false})
        }
      }
    }

    const onBlurBirth =()=>{
      // console.log('포커스아웃')
      birthDayCheck();
    }
    

    //추가입력사항 라디오버튼 (추천인,이벤트)
    const onChangeRadioAdd =(e)=>{
      // console.log(e.target.value)
      setField({...field,isShowAddInput:true, 추가입력사항선택:e.target.value})
    }
    //추가입력상자 : 추가 입력또는 이벤트 내용 저장
    const onChangeAddInput =(e)=>{
      // console.log(e.target.value)
      setField({...field, 추가입력사항: e.target.value})
    }
    //이용약관동의
    //1.전체 동의
    const onChangeServAll =(e)=>{
      //체크 되면
      if(e.target.checked){
        setField({...field, 이용약관동의: 이용약관동의})
      }
      else{
        setField({...field, 이용약관동의: [] })
      }
    }
    //2.체크박스 각 항목 체크시 멤버변수 이용약관동의:[] 배열에 저장하기
    //체크시 필수 체크
    const onChangeService=(e)=>{
      let imsi = [];
      const {이용약관동의} =field;
      if(e.target.checked){ //체크되면
          //sns 이메일
        if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){ //chk4
          setField({...field, 이용약관동의:[...field.이용약관동의, 'SNS','이메일','무료배송, 할인쿠폰 등 혜택/정보 수신 동의'] });
        }
        else if(field.이용약관동의.includes('SNS') && e.target.value==='이메일'){
          setField({...field, 이용약관동의:[...field.이용약관동의, '이메일','무료배송, 할인쿠폰 등 혜택/정보 수신 동의'] });
        }
        else if(field.이용약관동의.includes('이메일') && e.target.value==='SNS'){
          setField({...field, 이용약관동의:[...field.이용약관동의, 'SNS','무료배송, 할인쿠폰 등 혜택/정보 수신 동의'] });
        }
        else{
          setField({...field, 이용약관동의:[...field.이용약관동의, e.target.value] });
        }
      }
      else{//체크해제시는 배열에 저장된 체크해제된 해당 데이터 삭제 : 체크 해제된 데이터만 filter()
        if(e.target.value ==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){ //chk4
          imsi =  이용약관동의.filter((item)=>item !== e.target.value) //삭제1
          imsi = imsi.filter((item)=> item !== 'SNS')                       //삭제2
          imsi = imsi.filter((item)=> item !== '이메일')                     //삭제3
          setField({...field,이용약관동의:imsi})
        }
        else if(field.이용약관동의.includes('SNS')  && e.target.value === '이메일'){
          imsi =  이용약관동의.filter((item)=>item !=='이메일') //삭제1
          imsi =  imsi.filter((item)=>item !=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의') //삭제2
          setField({...field,이용약관동의:imsi})
        }
        else if(field.이용약관동의.includes('이메일')  && e.target.value === 'SNS'){
          imsi =  이용약관동의.filter((item)=>item !=='SNS') //삭제1
          imsi =  imsi.filter((item)=>item !=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의') //삭제2
          setField({...field,이용약관동의:imsi})
        }
        else{
          imsi= 이용약관동의.filter((item)=> item !== e.target.value); //삭제하고 나머지만 저장
          setField({...field, 이용약관동의: imsi });
        }
      }
    }

//섭밋(onSubmit) 전송 : 전송버튼 클릭 시 동작
//유효성 검증
//1. 로컬스토레이지에 저장(전송)
//2. 닷홈 비동기 전송방식 : AXIOS 전송 => 서버(PHP,MYSQL)와 정보 송수신(CRUD) 하기 위해 사용
const onSubmitMember =(e)=>{
  e.preventDefault();
  // 빈칸은 안된다(필수입력사항) -> 훅 (스테이트 멤버변수)
  const {아이디,비밀번호,비밀번호확인,이름,이메일,휴대폰,휴대폰확인,주소1,주소2,성별,생년,생월,생일,추가입력사항선택,추가입력사항,이용약관동의,아이디중복확인OK,이메일중복확인OK,휴대폰인증번호확인OK} = field;
  //필수 선택 3개

  //아이디 중복확인 OK 이메일 중복확인 OK 휴대폰인증번호확인OK
  if(아이디===''||비밀번호===''||비밀번호확인===''||이름===''||이메일===''||휴대폰===''||휴대폰확인===''||주소1===''||주소2===''|| 이용약관동의.length < 3||아이디중복확인OK===false|| 이메일중복확인OK===false||휴대폰인증번호확인OK===false){
    if(아이디===''){
      modalShowFn('아이디를 입력해주세요.');
    }
    else if(비밀번호===''){
      modalShowFn('비밀번호를 입력해주세요.');
    }
    else if(비밀번호확인===''){
      modalShowFn('비밀번호확인을 입력해주세요.');
    }
    else if(이름===''){
      modalShowFn('이름을 입력해주세요.');
    }
    else if(휴대폰===''){
      modalShowFn('휴대폰번호를 입력해주세요.');
    }
    else if(휴대폰확인===''){
      modalShowFn('휴대폰확인을 해주세요.');
    }
    else if(주소1===''){
      modalShowFn('주소를 검색 해주세요.');
    }
    else if(주소2===''){
      modalShowFn('상세주소를 입력해주세요.');
    }
    else if(이용약관동의.length < 3){
      modalShowFn('필수인 이용약관동의를 체크해주세요.');
    }
    else if( 아이디중복확인OK===false){
      modalShowFn('아이디 중복확인 해주세요.');
    }
    else if( 이메일중복확인OK===false){
      modalShowFn('이메일 중복확인 해주세요.');
    }
    else if( 휴대폰인증번호확인OK===false){
      modalShowFn('휴대폰 중복확인 해주세요.');
    }
    return;
  }
  else{

    //전송할 데이터를 임시배열에 저장하고,
    //로컬스토레이지에 임시배열을 한꺼번에 저장
    //약관동의 필수 선택사항 3개 확인하고 만약 3개 미만이면 리턴
    let cnt = 0;
    이용약관동의.map((item)=>{
      if(item.includes('필수')){
        cnt++;
      }
    })
    if(cnt<3){
      modalShowFn('필수인 이용약관동의를 체크해주세요.');
      return;
    }
    else{
      let imsi = {
        아이디:아이디,
        비밀번호:비밀번호,
        비밀번호확인:비밀번호확인,
        이름:이름,
        이메일:이메일,
        휴대폰:휴대폰,
        주소:`${주소1} ${주소2}`,
        성별:성별,
        생년월일:`${생년}-${생월}-${생일}`,
        추가입력사항:`${추가입력사항선택} : ${추가입력사항}` ,
        이용약관동의: 이용약관동의
      };
      //로컬스토레이지는 데이터저장시 객체 저장 할 수 없다. 그래서 문자열로 변환 저장한다. 
      localStorage.setItem(imsi.아이디, JSON.stringify(imsi)) ;
      
      //저장완료
      modalShowFn('마켓컬리 회원가입이 완료되었습니다');
  
      //저장완료하고 모든 멤버변수 초기화 한다.
      setField({
        ...field,
            아이디중복확인OK:true, //로컬스토레이지 저장 후
            아이디: '',
            isShowId: false,
            isClassId: '',
  
            비밀번호: '',
            isShowPw: false,
            isClassPw1: '',
            isClassPw2: '',
            isClassPw3: '',
  
            비밀번호확인:'',
            isShowPwRe: false,
            isClassPwRe: '',
  
            이름: '',
          
            이메일: '',
            이메일확인: '', //true 이메일 정상, false 이메일 오류
            이메일중복확인OK:true, //로컬스토레이지 저장 후
            
            휴대폰: '',
            휴대폰확인: '',
            휴대폰인증번호확인OK:false,
  
            isDisabledHp: true,  //버튼사용불가
            isShowHp: false,
            minutes: 2,
            seconds: 59,
            인증번호: '',  //자동 랜덤 생성 번호
            setId: 0,
            인증확인번호: '', //폰으로 전송된 인증번호 입력
            isDisabledHpInput: false,
            isDisabledHpBtn: false,
            isClassHp1: false,
            isClassHp2: false,
            isShowHpSpan: true,
  
            주소1:'',
            주소2:'',
            isShowAddr:false,
  
            성별:'선택안함',
  
            생년:'',
            생월:'',
            생일:'',
  
            isShowBirthTxt:'',
            isShowError:false,
            //추가입력사항
            추가입력사항선택:'', //1.추가입력사항선택 : 라디오 버튼 선택항목
            isShowAddInput:false, //2. 추가입력사항 박스 show, hide
            추가입력사항:'',  //3.추가입력사항 :입력상자 입력값 추천인 또는 이벤트 명 저장
  
            //이용약관동의
            이용약관동의:[] ,//내용이 많아서 배열처리
      });
    }
  }
}

  return (
    <section id="member">
      <div className="container">
        <div className="wrap">
            {/* <!-- 타이틀 --> */}
            <div className="title">
                <h2>회원가입</h2>
            </div>
            {/* <!-- 전송할 회원가입폼 --> */}
            <div className="content">
              <form onSubmit={onSubmitMember} id="member" name="member" method="post" action="response.php">
                <ul id="memberForm">
                  <li>
                    <h3><i>*</i><span>필수입력사항</span></h3>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>아이디</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputId" 
                      name="inputId" 
                      placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" 
                      maxLength="20" 
                      onChange={onChangeId}
                      onFocus={onFocusId}
                      value={field.아이디}
                      />
                      <button onClick={onClickIdOk} className="id-double-btn">중복확인</button>
                      {
                        field.isShowId && (
                          <div className="guide-text guide-id">
                            <p className={field.isClassId=== '' ? '' : (field.isClassId ? 'success' : 'error')}>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                            <p>아이디 중복확인</p>
                          </div>
                        )
                      }
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>비밀번호</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="password" 
                      id="inputPw" 
                      name="inputPw" 
                      placeholder="비밀번호를 입력해주세요" 
                      maxLength="20" 
                      onChange={onChangePw}
                      onFocus={onFocusPw}
                      value={field.비밀번호}
                      />
                      {
                        field.isShowPw && (
                          <div className="guide-text guide-pw">
                            <p className={field.isClassPw1===''?'':(field.isClassPw1?'success':'error')}>10자 이상 입력</p>
                            <p className={field.isClassPw2===''?'':(field.isClassPw2?'success':'error')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                            <p className={field.isClassPw3===''?'':(field.isClassPw3?'success':'error')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                          </div>
                        )
                      }
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>비밀번호확인</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="password" 
                      id="inputPwConfirm" 
                      name="inputPwConfirm" 
                      placeholder="비밀번호를 한번 더 입력해주세요" 
                      maxLength="20" 
                      onChange={onChangePwRe}                        
                      onFocus={onFocusPwRe}  
                      value={field.비밀번호확인}          
                      />
                      {
                        field.isShowPwRe && (
                          <div className="guide-text guide-password-confirm">
                            <p className={field.isClassPwRe===''?'':(field.isClassPwRe?'success':'error')}>동일한 비밀번호를 입력해주세요.</p>
                          </div>               
                        )     
                      }
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>이름</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputName" 
                      name="inputName" 
                      placeholder="이름을 입력해주세요" 
                      maxLength="30" 
                      onChange={onChangeName}
                      value={field.이름}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>이메일</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="email" 
                      id="inputEmail" 
                      className="" 
                      name="inputEmail" 
                      placeholder="예: marketkurly@kurly.com" 
                      maxLength="250" 
                      onChange={onChangeEmail}
                      value={field.이메일}
                      />
                      <button onClick={onClickEmailOk} className="email-double-btn">중복확인</button>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>휴대폰</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputPhone" 
                      name="inputPhone" 
                      placeholder="숫자만 입력해주세요" 
                      maxLength="11" 
                      onChange={onChangeHp}
                      value={field.휴대폰}
                      />
                      {/* 기본값은 버튼 사용 불가. disabled=true(사용불가)  disabled=false(사용) 버튼 색상도 활성화 */}
                      <button onClick={onClickHp}  disabled={field.isDisabledHp} className={field.isDisabledHp?"phone-btn":"phone-btn on"}>인증번호 받기</button>

                      {
                        field.isShowHp && (
                          <>
                            <input disabled={field.isDisabledHpInput} onChange={onChangeHpNum} type="text" id="inputPhoneok" className={field.isClassHp1?'ok':''} name="inputPhoneok" placeholder="인증번호를 입력해주세요" maxLength="6" value={field.인증확인번호} />
                            <button disabled={field.isDisabledHpBtn} onClick={onClickHpConfirm} className={field.isClassHp2?'phone-btn phone-ok-btn ok':'phone-btn phone-ok-btn'}>인증번호 확인</button>                                               
                            {
                              field.isShowHpSpan && (  
                                <span className="count-timer">{field.minutes}:{field.seconds<10?`0${field.seconds}`:field.seconds}</span>
                              )
                            }
                          </>
                        )
                      }
                      
                    </div>
                  </li>
                  <li className="address">
                    <div className="left">
                      <label><span>주소</span><i>*</i></label>
                    </div>
                    <div className="right">

                      {
                        field.isShowAddr && 
                        (
                          <>
                          <input onChange={onChangeArr1} value={field.주소1} type="text" id="inputAddress1" name="inputAddress1" placeholder="검색주소" />
                          <input onChange={onChangeArr2} value={field.주소2} type="text" id="inputAddress2" name="inputAddress2" placeholder="세부주소를 입력하세요" />
                          </>
                        )
                      }       

                      
                      <button onClick={onClickAddr} id="addressBtn" className="address-btn" title="주소검색"><span><img src="./images/ico_search.svg" alt="" /><i className="address-text">주소검색</i></span></button>
                      <div className="guide-text guide-transfer on">
                        <h4> </h4>
                      </div>
                      <p className="address-guidetext">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                    
                      {/* 카카오 주소검색 패키지 컴포넌트 모달창  */}

                      {
                        field.isShowAddr && (
                          <div>
                          <Postcode style={stylePost} onComplete={onCompletePost}/>
                          </div>
                        )
                      }

                    </div>
                  </li>

                  <li>
                    <div className="left">
                      <label><span>성별</span></label>
                    </div>
                    <div className="right gender">
                      <label htmlFor="male">
                        <input onChange={onChangeGender} checked={field.성별.includes('남자')}  type="radio" id="male" name="gender" value="남자" />
                        <span>남자</span>
                      </label>                    
                      <label htmlFor="female">
                        <input onChange={onChangeGender}  checked={field.성별.includes('여자')}  type="radio" id="female" name="gender" value="여자" />
                        <span>여자</span>
                      </label>                    
                      <label htmlFor="none">
                        <input  onChange={onChangeGender}  checked={field.성별.includes('선택안함')}  type="radio" id="none" name="gender" value="선택안함" />
                        <span>선택안함</span>
                      </label>                    
                    </div>
                  </li>

                  <li>
                    <div className="left">
                      <label><span>생년월일</span></label>
                    </div>
                    <div className="right">
                      <div className="date-box">
                        <ul>
                          <li>
                            <input 
                            type="text" 
                            id="year" 
                            name="year" 
                            placeholder="YYYY" 
                            maxLength="4"
                            onChange={onChangeYear}
                            onBlur={onBlurBirth}
                            value={field.생년}
                            />
                            </li>
                          <li><span>/</span></li>
                          <li>
                            <input 
                            type="text" 
                            id="month" 
                            name="month"  
                            placeholder="MM" 
                            maxLength='2'
                            onChange={onChangeMonth}
                            onBlur={onBlurBirth}
                            onFocus={onBlurBirth}
                            value={field.생월}
                            />
                            </li>
                          <li><span>/</span></li>
                          <li>
                            <input 
                            type="text" 
                            id="date" 
                            name="date"  
                            placeholder="DD" 
                            maxLength='2'
                            onChange={onChangeDate}
                            onBlur={onBlurBirth}
                            onFocus={onBlurBirth}
                            value={field.생일}
                            />
                            </li>
                        </ul>
                      </div>
                      <div className="guide-text guide-birthday-confirm">
                        {
                          field.isShowError &&
                          (
                        <p className="error">{field.isShowBirthTxt}</p>
                          )
                        }
                      </div>  
                    </div>
                  </li>

                  <li className="add-inpu-item">
                    <div className="left">
                      <label><span>추가입력 사항</span></label>
                    </div>
                    <div className="right gender add">
                      
                      <label htmlFor="add1">
                        <input onChange={onChangeRadioAdd} checked={field.추가입력사항선택.includes('추천인 아이디')} type="radio" id="add1" name="add" className="add-radio" value="추천인 아이디" />
                        <span>추천인 아이디</span>
                      </label>                    
                      <label htmlFor="add2">
                        <input onChange={onChangeRadioAdd} checked={field.추가입력사항선택.includes('참여 이벤트')}  type="radio" id="add2" name="add" className="add-radio" value="참여 이벤트" />
                        <span>참여 이벤트</span>
                      </label> 
                      {
                          field.isShowAddInput &&
                        (
                          <div className="add-input-box">
                          <input onChange={onChangeAddInput} type="text" id="inputAdd" name="inputAdd" placeholder="" value={field.추가입력사항} />
                          <p>
                            추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br />
                            가입 이후, 수정이 불가합니다.<br />
                            대소문자 및 띄어쓰기에 유의해주세요.
                          </p>
                        </div>  
                        )
                      }                     
                    </div>
                  </li>
                  <li>
                    <hr/>
                  </li>
                  
                  {/* <!-- 약관동의 : 체크박스 --> */}
                  <li className="check-box">
                    <div className="left">
                      <label><span>이용약관동의<i>*</i></span></label>
                    </div>
                    <div className="right service">

                      <ol>
                        <li>
                          <label htmlFor="chkAll">
                            <input onChange={onChangeServAll} checked={field.이용약관동의.length >= 7 ? true:false} type="checkbox" id="chkAll" name="chkAll"  value="전체동의합니다." />
                            <span>전체동의합니다.</span>
                          </label>
                          <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                        </li>
                        <li className="view-box">
                          <label htmlFor="chk1">
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('이용약관동의(필수)')} type="checkbox" id="chk1" name="chk1" className="chkbox-btn" value="이용약관동의(필수)" />
                            <span>이용약관동의<i>(필수)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li className="view-box">
                          <label htmlFor="chk2">
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보수집·이용(필수)')}  type="checkbox" id="chk2" name="chk2" className="chkbox-btn" value="개인정보수집·이용(필수)" />
                            <span>개인정보 수집·이용<i>(필수)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li className="view-box">
                          <label htmlFor="chk3">
                            <input onChange={onChangeService}  checked={field.이용약관동의.includes('개인정보수집·이용(선택)')} type="checkbox" id="chk3" name="chk3" className="chkbox-btn" value="개인정보수집·이용(선택)" />
                            <span>개인정보 수집·이용<i>(선택)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li>
                          <label htmlFor="chk4">
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')} type="checkbox" id="chk4" name="chk4" className="chkbox-btn" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의" />
                            <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의<i>(선택)</i></span>
                          </label>
                          <dl>
                              <dd>
                                <label htmlFor="chk5">
                                  <input onChange={onChangeService} checked={field.이용약관동의.includes('SNS')}  type="checkbox" id="chk5" name="chk5" className="chkbox-btn" value="SNS" />
                                  <span>SNS</span>
                                </label>
                                <label htmlFor="chk6">
                                  <input onChange={onChangeService} checked={field.이용약관동의.includes('이메일')}  type="checkbox" id="chk6" name="chk6" className="chkbox-btn" value="이메일" />
                                  <span>이메일</span>
                                </label>
                              </dd>
                              <dt>
                                  <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                              </dt>
                          </dl>
                        </li>
                        <li>
                          <label htmlFor="chk7">
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}  type="checkbox" id="chk7" name="chk7" className="chkbox-btn" value="본인은 만 14세 이상입니다.(필수)" />
                            <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>
                          </label>
                        </li>
                      </ol>                  
                    </div>              
                  </li>
                  <li className="bottom-line">
                    <hr />
                  </li>                
                  <li className="button-box">
                    <button type="submit" className="submit-btn">가입하기</button>
                  </li>
                </ul>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};
MemberComponent.defaultProps = {
이용약관동의 :[
'이용약관동의(필수)',
'개인정보수집·이용(필수)',
'개인정보수집·이용(선택)',
'무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
'SNS',
'이메일',
'본인은 만 14세 이상입니다.(필수)',
  ] 
}
export default MemberComponent;