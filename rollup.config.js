import typescript from "rollup-plugin-typescript2"
import postcss from "rollup-plugin-postcss"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
  input: "src/index.ts", // 진입점
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(), // peer dependencies 제외
    resolve(), // Node 모듈 해석
    commonjs(), // CommonJS 모듈 변환
    typescript({
      useTsconfigDeclarationDir: true
    }),
    postcss() // CSS 처리
  ]
}
