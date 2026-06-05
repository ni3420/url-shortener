import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env=loadEnv(mode,process.cwd(),"")
  
  
  return{
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      "/api":env.VITE_PORT || "http://localhost:8000"
    }
  },
 resolve:{
  alias:{
    "@":path.resolve(__dirname,"./src")
  },
 },
};
});
