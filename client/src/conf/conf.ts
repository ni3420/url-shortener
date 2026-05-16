interface ENVData{
    port:string
}

export const conf:ENVData={
    port:String(import.meta.env.VITE_PORT)
}