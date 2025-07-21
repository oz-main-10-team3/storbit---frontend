import js from '@eslint/js' // JavaScript 기본 규칙 세트
import tseslint from 'typescript-eslint' // TypeScript 전용 규칙 세트
import react from 'eslint-plugin-react' // React 컴포넌트 관련 규칙
import reactHooks from 'eslint-plugin-react-hooks' // React Hooks 관련 규칙
import reactRefresh from 'eslint-plugin-react-refresh' // Vite HMR 최적화 규칙
import prettier from 'eslint-config-prettier' // Prettier와 충돌하는 ESLint 규칙 비활성화
import globals from 'globals' // 글로벌 변수 정의 (window, document 등)

export default tseslint.config(
  // 1. 무시할 파일/폴더 설정
  {
    ignores: [
      'dist', // 빌드 결과물
      'node_modules', // 외부 패키지
      '*.config.js', // 설정 파일들 (vite.config.js 등)
      '*.config.ts', // TypeScript 설정 파일들
      'public', // 정적 자원 폴더
    ],
  },

  // 2. 기본 JavaScript 규칙 적용
  js.configs.recommended, // 일반적인 JavaScript 오류 방지 규칙들

  // 3. TypeScript 권장 규칙들 적용
  ...tseslint.configs.recommended, // TypeScript 기본 규칙

  // 4. 메인 설정 블록
  {
    // 적용할 파일 확장자 지정
    files: ['**/*.{ts,tsx}'],

    // 사용할 플러그인들 등록
    plugins: {
      react, // React 컴포넌트 관련
      'react-hooks': reactHooks, // React Hooks 관련
      'react-refresh': reactRefresh, // Vite HMR 관련
    },

    // 언어 및 파싱 설정
    languageOptions: {
      ecmaVersion: 2023, // 최신 JavaScript 문법 지원
      sourceType: 'module', // ES6 모듈 시스템 사용
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 문법 지원
        },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 사용 가능한 글로벌 변수들 정의
      globals: {
        ...globals.browser, // window, document, console 등 브라우저 API
        ...globals.es2023, // Promise, Array.prototype.at 등 최신 JS API
      },
    },

    // 플러그인별 추가 설정
    settings: {
      react: {
        version: 'detect', // 설치된 React 버전 자동 감지
      },
    },

    rules: {
      // ===== React 관련 기본 규칙들 =====
      ...react.configs.recommended.rules, // React 권장 규칙들
      ...react.configs['jsx-runtime'].rules, // React 17+ JSX Transform 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙들

      // ===== 기본적인 JavaScript/TypeScript 품질 규칙 =====
      'prefer-const': 'warn', // 재할당하지 않는 변수는 const 사용 권장 (경고만)

      'no-var': 'error', // var 키워드 사용 금지 (let, const만 사용)

      'no-unused-vars': 'off', // JavaScript 미사용 변수 규칙 비활성화 (TypeScript가 처리)

      '@typescript-eslint/no-unused-vars': [
        'warn', // 에러 대신 경고로 설정
        {
          argsIgnorePattern: '^_', // _로 시작하는 매개변수는 미사용 허용
          varsIgnorePattern: '^_', // _로 시작하는 변수는 미사용 허용
        },
      ],

      // ===== TypeScript 기본 규칙 =====
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용시 경고만 (에러 아님)
      '@typescript-eslint/explicit-function-return-type': 'off', // 함수 리턴 타입 명시 강제 안함
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈 경계 타입 명시 강제 안함

      // ===== React 기본 베스트 프랙티스 =====
      'react/prop-types': 'off', // PropTypes 사용 강제 안함 (TypeScript 사용)
      'react/react-in-jsx-scope': 'off', // React import 강제 안함 (React 17+)
      'react/jsx-uses-react': 'off', // React 사용 감지 안함 (React 17+)

      'react/jsx-boolean-value': 'warn', // boolean prop 축약 권장

      'react/jsx-fragments': 'warn', // Fragment 단축 문법 권장

      'react/jsx-no-useless-fragment': 'warn', // 불필요한 Fragment 경고

      // ===== 기본적인 코드 품질 =====
      'no-console': 'warn', // console.log 사용시 경고 (개발 중에는 필요할 수 있음)
      'no-debugger': 'warn', // debugger 문 사용시 경고 (에러 아님)
      'no-duplicate-imports': 'warn', // 중복 import 경고

      // ===== Vite HMR 최적화 =====
      'react-refresh/only-export-components': [
        'warn', // 경고 레벨로 설정
        {
          allowConstantExport: true, // 상수 export는 허용
        },
      ],
      // 설명: Vite의 Hot Module Replacement 최적화를 위한 규칙
    },
  },

  // 5. Prettier와 충돌하는 ESLint 규칙들 비활성화
  prettier // 포맷팅은 Prettier가 담당, ESLint는 코드 품질만 담당
)
