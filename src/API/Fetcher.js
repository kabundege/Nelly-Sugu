export const Fetcher = async (url,method,body) => {
    const res =  await fetch(url,{
        method,
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"  
        },
        body
    })
    return res.json()
}