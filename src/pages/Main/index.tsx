import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
    <Link to={'/virtual'}>가상 스크롤 + 무한 스크롤</Link> <br />
    <Link to={'/normal'}>무한 스크롤</Link>
    </>
  )
}
export default Main;