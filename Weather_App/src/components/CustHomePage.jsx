import Main from "./CustMain";


const HomePage = ({page}) =>{
    return (
        <div>
            <h1 className="py-2">Che tempo che fa?</h1>
             <Main page={page}/>
        </div>
    )
}

export default HomePage